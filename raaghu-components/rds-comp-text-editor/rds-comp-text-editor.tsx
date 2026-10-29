import { Suspense, lazy, useCallback, useId, useMemo, useRef, useState, type CSSProperties, type HTMLAttributes, type Ref } from "react";
import { Box, FormHelperText, InputLabel as Label, type SxProps, type Theme } from "@mui/material";
import type { ComponentType } from "react";
import clsx from 'clsx';
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import { sanitizeEditorHtml } from "./sanitize-html";

type DraftWysiwygEditorProps = {
    editorState: ReturnType<typeof EditorState.createEmpty>;
    onEditorStateChange: (state: ReturnType<typeof EditorState.createEmpty>) => void;
    readOnly?: boolean;
    placeholder?: string;
    toolbar?: unknown;
    toolbarClassName?: string;
    wrapperClassName?: string;
    editorClassName?: string;
    editorStyle?: CSSProperties;
    ariaDescribedBy?: string;
    ref?: Ref<unknown>;
};

const Editor = lazy(() =>
    import("react-draft-wysiwyg").then((m) => ({ default: m.Editor }))
) as ComponentType<DraftWysiwygEditorProps>;
import "./rds-comp-text-editor.scss";

export interface RdsCompTextEditorProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onChange" | "style"> {
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

type DraftEditorState = ReturnType<typeof EditorState.createEmpty>;

const createEditorStateFromValue = (value?: string, showTitle?: boolean): DraftEditorState => {
    if (value) {
        const contentBlock = htmlToDraft(sanitizeEditorHtml(value));
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            return EditorState.createWithContent(contentState);
        }
    }
    if (showTitle) {
        return EditorState.createWithContent(ContentState.createFromText(""));
    }
    return EditorState.createEmpty();
};

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
    const uid = useId();
    const labelId = `${uid}-label`;
    const errorId = `${uid}-error`;

    const [editorState, setEditorState] = useState<DraftEditorState>(() =>
        createEditorStateFromValue(value ?? defaultValue, false)
    );
    const [prevValue, setPrevValue] = useState(value);
    const [prevShowTitle, setPrevShowTitle] = useState(showTitle);
    const [lastEmitted, setLastEmitted] = useState<string | undefined>(undefined);
    if (value !== prevValue || showTitle !== prevShowTitle) {
        setPrevValue(value);
        setPrevShowTitle(showTitle);
        if (value !== lastEmitted || showTitle !== prevShowTitle) {
            setLastEmitted(undefined);
            setEditorState(createEditorStateFromValue(value, showTitle));
        }
    }
    const [isTouch, setIsTouch] = useState(false);
    const editorRef = useRef<unknown>(null);

    const computedRows = typeof rows === "number" && rows > 0 ? rows : 6;
    const lineHeightVar = "var(--rds-line-height-body)";
    const editorMinHeight = `calc(${computedRows} * ${lineHeightVar})`;
    const isResizable = resizable !== false;

    const editorStyle = useMemo(
        () => ({
            minHeight: editorMinHeight,
            resize: isResizable ? "vertical" as const : "none" as const,
            overflow: "auto" as const,
        }),
        [editorMinHeight, isResizable],
    );

    const toolbarConfig = useMemo(
        () => ({
            options: ["inline", "blockType", "list", "textAlign", "link", "image", "history"],
            inline: { options: ["bold", "italic", "underline", "strikethrough"] },
            image: {
                urlEnabled: true,
                uploadEnabled: true,
                alignmentEnabled: true,
                uploadCallback: (file: File) =>
                    Promise.resolve(
                        onImageUpload
                            ? onImageUpload(file)
                            : new Promise<string>((resolve, reject) => {
                                const reader = new FileReader();
                                reader.onload = () => resolve(reader.result as string);
                                reader.onerror = () => reject(reader.error);
                                reader.readAsDataURL(file);
                            }),
                    ).then((link) => ({ data: { link } })),
                previewImage: true,
                inputAccept: "image/gif,image/jpeg,image/jpg,image/png",
                alt: { present: true, mandatory: false },
            },
        }),
        [onImageUpload],
    );

    const handleEditorChange = useCallback((state: DraftEditorState) => {
        setEditorState(state);
        setIsTouch(true);
        if (onChange) {
            const htmlContent = sanitizeEditorHtml(draftToHtml(convertToRaw(state.getCurrentContent())));
            setLastEmitted(htmlContent);
            onChange(htmlContent, { ops: [{ insert: htmlContent }] }, "user", editorRef.current);
        }
    }, [onChange]);

    const isEmpty = useMemo(() => editorState.getCurrentContent().getPlainText().trim() === "", [editorState]);

    const stateClass = clsx(
        state === "Selected" && "rds-comp-text-editor--selected",
        isError && "rds-comp-text-editor--error",
        (focused || state === "Active") && "rds-comp-text-editor--active",
        isDisabled && "rds-comp-text-editor--disabled",
        isResizable && "rds-comp-text-editor--resizable"
    );

    return (
        <>
            {showTitle && label && (
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
                {...(showTitle && label ? { role: "group", "aria-labelledby": labelId } : {})}
            >
                <Suspense fallback={<div className="rds-comp-text-editor__loading" />}>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={handleEditorChange}
                        readOnly={readOnly || isDisabled}
                        ariaDescribedBy={isRequired && isEmpty && isTouch ? errorId : undefined}
                        placeholder={placeholder}
                        ref={editorRef}
                        toolbarClassName="rds-comp-text-editor__toolbar"
                        wrapperClassName="rds-comp-text-editor__wrapper"
                        editorClassName="rds-comp-text-editor__content"
                        editorStyle={editorStyle}
                        toolbar={toolbarConfig}
                    />
                </Suspense>
            </Box>
            {isRequired && isEmpty && isTouch && (
                <FormHelperText id={errorId} error role="alert" className="rds-comp-text-editor__error">
                    {label} is required
                </FormHelperText>
            )}
        </>
    );
};
RdsCompTextEditor.displayName = "RdsCompTextEditor";
export default RdsCompTextEditor;
