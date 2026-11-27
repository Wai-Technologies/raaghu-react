import { useCallback, useEffect, useId, useRef, useState, type HTMLAttributes, type Ref } from "react";
import { Box, FormHelperText, InputLabel as Label, type SxProps, type Theme } from "@mui/material";
import clsx from 'clsx';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { $getRoot, $insertNodes, type EditorState, type LexicalEditor } from 'lexical';
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import { isSafeUrl, sanitizeEditorHtml } from "./sanitize-html";
import { editorTheme } from './editor-theme';
import { EditorToolbar } from './editor-toolbar';
import { ImageNode } from './image-node';
import { ImagePlugin } from './image-plugin';
import "./rds-comp-text-editor.scss";

export interface RdsCompTextEditorProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onChange"> {
    /** HTML id applied to the editor element. */
    id?: string;
    /** Called with the sanitized HTML value whenever the editor content changes. */
    onChange?(value: string, delta: unknown, source: unknown, editor: unknown): void;
    /** Placeholder text shown when the editor is empty. */
    placeholder?: string;
    /** Makes the editor non-editable. */
    readOnly?: boolean;
    /** Controlled HTML content of the editor. */
    value?: string;
    /** Initial HTML content when `value` is not provided. */
    defaultValue?: string;
    /** Label shown above the editor when `showTitle` is true. */
    label?: string;
    /** @deprecated Use `required` instead. */
    isMandatory?: boolean;
    /** Marks the field as required. */
    required?: boolean;
    /** Applies the error style; falls back to `state === 'Error'` when omitted. */
    error?: boolean;
    /** Disables the editor; falls back to `state === 'Disabled'` when omitted. */
    disabled?: boolean;
    /** Extra class name applied to the label. */
    labelClass?: string;
    /** Visual state: 'Selected', 'Active', 'Error' or 'Disabled'. */
    state?: string;
    /** Applies the active (focused) style. */
    focused?: boolean;
    /** Shows the label above the editor. */
    showTitle?: boolean;
    /** Number of visible text rows used to size the editor. */
    rows?: number;
    /** Whether the editor can be resized by the user. */
    resizable?: boolean;
    /** Upload handler for toolbar images. Return a public URL (or data URL). When omitted, files are read as base64 data URLs. */
    onImageUpload?: (file: File) => Promise<string> | string;
    /** MUI system styles applied to the root element. */
    sx?: SxProps<Theme>;
    /** Ref forwarded to the root element. */
    ref?: Ref<HTMLDivElement>;
}

const EXTERNAL_VALUE_TAG = 'rds-external-value';

function EditablePlugin({ editable }: { editable: boolean }): null {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        editor.setEditable(editable);
    }, [editor, editable]);
    return null;
}

function HtmlValuePlugin({ html, lastEmittedRef }: { html?: string; lastEmittedRef: { current: string | undefined } }): null {
    const [editor] = useLexicalComposerContext();
    const appliedRef = useRef<string | undefined>(undefined);

    useEffect(() => {
        if (html === undefined || html === appliedRef.current || html === lastEmittedRef.current) return;
        appliedRef.current = html;
        editor.update(() => {
            const root = $getRoot();
            root.clear();
            if (!html) return;
            const dom = new DOMParser().parseFromString(sanitizeEditorHtml(html), 'text/html');
            root.select();
            $insertNodes($generateNodesFromDOM(editor, dom));
        }, { tag: EXTERNAL_VALUE_TAG });
    }, [editor, html, lastEmittedRef]);

    return null;
}

function LinkValidationPlugin(): null {
    const [editor] = useLexicalComposerContext();
    useEffect(
        () =>
            editor.registerNodeTransform(LinkNode, (node) => {
                if (!isSafeUrl(node.getURL())) node.setURL('#');
            }),
        [editor],
    );
    return null;
}

const RdsCompTextEditor = ({
    id,
    onChange,
    placeholder,
    readOnly,
    value,
    defaultValue,
    label,
    isMandatory,
    required,
    error,
    disabled,
    labelClass,
    state,
    focused,
    showTitle,
    rows,
    resizable,
    onImageUpload,
    className,
    sx,
    ref,
    ...rest
}: RdsCompTextEditorProps) => {
    if (isMandatory !== undefined) warnDeprecatedProp('RdsCompTextEditor', 'isMandatory', '`required`');
    const isRequired = required ?? isMandatory;
    const isError = error ?? state === "Error";
    const isDisabled = disabled ?? state === "Disabled";
    const isEditable = !readOnly && !isDisabled;
    const uid = useId();
    const labelId = `${uid}-label`;
    const errorId = `${uid}-error`;

    const [initialDefault] = useState(defaultValue);
    const [isTouch, setIsTouch] = useState(false);
    const [isEmpty, setIsEmpty] = useState(!(value ?? defaultValue));
    const contentRef = useRef<HTMLDivElement>(null);
    const lastEmittedRef = useRef<string | undefined>(undefined);

    const computedRows = typeof rows === "number" && rows > 0 ? rows : 6;
    const editorMinHeight = `calc(${computedRows} * var(--rds-line-height-body))`;
    const isResizable = resizable !== false;
    const showRequiredError = Boolean(isRequired && isEmpty && isTouch);
    const hasLabel = Boolean(showTitle && label);

    const [initialConfig] = useState(() => ({
        namespace: 'RdsCompTextEditor',
        theme: editorTheme,
        onError: (err: Error) => {
            console.error('[RdsCompTextEditor]', err);
        },
        nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode, LinkNode, AutoLinkNode, ImageNode],
        editable: isEditable,
    }));

    const handleChange = useCallback(
        (editorState: EditorState, editor: LexicalEditor, tags: Set<string>) => {
            editorState.read(() => {
                setIsEmpty($getRoot().getTextContent().trim() === '');
                if (tags.has(EXTERNAL_VALUE_TAG)) return;
                setIsTouch(true);
                if (!onChange) return;
                const html = sanitizeEditorHtml($generateHtmlFromNodes(editor, null));
                lastEmittedRef.current = html;
                onChange(html, { ops: [{ insert: html }] }, 'user', contentRef.current);
            });
        },
        [onChange],
    );

    const contentProps = {
        className: "rds-comp-text-editor__content",
        "aria-multiline": true,
        "aria-required": isRequired || undefined,
        "aria-invalid": isError || showRequiredError || undefined,
        "aria-describedby": showRequiredError ? errorId : undefined,
        "aria-labelledby": hasLabel ? labelId : undefined,
        "aria-label": hasLabel ? undefined : label || "Rich text editor",
    };

    const stateClass = clsx(
        state === "Selected" && "rds-comp-text-editor--selected",
        isError && "rds-comp-text-editor--error",
        (focused || state === "Active") && "rds-comp-text-editor--active",
        isDisabled && "rds-comp-text-editor--disabled",
        isResizable && "rds-comp-text-editor--resizable"
    );

    return (
        <>
            {hasLabel && (
                <Label id={labelId} className={clsx("rds-comp-text-editor-label", labelClass)}>
                    {label}
                    {isRequired && <span className="rds-comp-text-editor__required" aria-hidden>*</span>}
                </Label>
            )}
            <Box
                {...rest}
                id={id}
                ref={ref}
                className={clsx("rds-comp-text-editor", stateClass, className)}
                sx={sx}
                {...(hasLabel ? { role: "group", "aria-labelledby": labelId } : {})}
            >
                <LexicalComposer initialConfig={initialConfig}>
                    <div className="rds-comp-text-editor__wrapper">
                        <EditorToolbar disabled={!isEditable} onImageUpload={onImageUpload} />
                        <RichTextPlugin
                            contentEditable={
                                <div
                                    ref={contentRef}
                                    className="rds-comp-text-editor__scroller"
                                    style={{ minHeight: editorMinHeight, resize: isResizable ? 'vertical' : 'none', overflow: 'auto' }}
                                    onBlur={() => setIsTouch(true)}
                                >
                                    {placeholder ? (
                                        <ContentEditable
                                            {...contentProps}
                                            aria-placeholder={placeholder}
                                            placeholder={<div className="rds-comp-text-editor__placeholder">{placeholder}</div>}
                                        />
                                    ) : (
                                        <ContentEditable {...contentProps} />
                                    )}
                                </div>
                            }
                            ErrorBoundary={LexicalErrorBoundary}
                        />
                        <OnChangePlugin ignoreSelectionChange onChange={handleChange} />
                        <EditablePlugin editable={isEditable} />
                        <HtmlValuePlugin html={value ?? initialDefault} lastEmittedRef={lastEmittedRef} />
                        <HistoryPlugin />
                        <ListPlugin />
                        <LinkPlugin validateUrl={isSafeUrl} />
                        <LinkValidationPlugin />
                        <ImagePlugin />
                    </div>
                </LexicalComposer>
            </Box>
            {showRequiredError && (
                <FormHelperText id={errorId} error role="alert" className="rds-comp-text-editor__error">
                    {label} is required
                </FormHelperText>
            )}
        </>
    );
};
RdsCompTextEditor.displayName = "RdsCompTextEditor";
export default RdsCompTextEditor;
