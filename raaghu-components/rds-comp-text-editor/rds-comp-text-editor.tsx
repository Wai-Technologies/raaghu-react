import React, { useEffect, useState, useRef } from "react";
import { InputLabel as Label } from "@mui/material";
import "./rds-comp-text-editor.scss";
import { sanitizeEditorHtml } from "./sanitize-html";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";

export interface RdsCompTextEditorProps {
    id?: string;
    onChange?(value: string, delta: unknown, source: unknown, editor: unknown): void;
    placeholder?: string;
    readOnly?: boolean;
    value?: string;
    label?: string;
    isMandatory?: boolean;
    labelClass?: string;
    /** Disables the editor (read-only with disabled styling). */
    disabled?: boolean;
    /** Shows the editor in its selected style. */
    selected?: boolean;
    /** Shows the editor in its error style. */
    error?: boolean;
    /** Shows the editor in its active (focused) style. */
    active?: boolean;
    /** @deprecated Use `disabled`, `selected`, `error` or `active` instead. */
    State?: string;
    showTitle?: boolean;
    rows?: number;
    resizable?: boolean;
}

interface DraftContentState {
    getPlainText(): string;
}

interface DraftEditorStateInstance {
    getCurrentContent(): DraftContentState;
}

interface EditorDeps {
    EditorState: {
        createEmpty(): DraftEditorStateInstance;
        createWithContent(content: DraftContentState): DraftEditorStateInstance;
    };
    convertToRaw: (contentState: DraftContentState) => unknown;
    ContentState: {
        createFromBlockArray(contentBlocks: unknown[]): DraftContentState;
        createFromText(text: string): DraftContentState;
    };
    Editor: React.ComponentType<Record<string, unknown>>;
    draftToHtml: (rawContent: unknown) => string;
    htmlToDraft: (html: string) => { contentBlocks: unknown[] } | null;
}

const RdsCompTextEditor = (props: RdsCompTextEditorProps) => {
    const [deps, setDeps] = useState<EditorDeps | null>(null);
    const [editorState, setEditorState] = useState<DraftEditorStateInstance | null>(null);
    const [isTouch, setIsTouch] = useState(false);
    const editorRef = useRef<unknown>(null);
    const lastEmittedRef = useRef<string | undefined>(undefined);

    const rows = typeof props.rows === 'number' && props.rows > 0 ? props.rows : 6;
    const lineHeightVar = 'var(--rds-line-height-body, 26px)';
    const editorMinHeight = `calc(${rows} * ${lineHeightVar})`;
    const isResizable = props.resizable !== false;

    useEffect(() => {
        Promise.all([
            import('draft-js'),
            import('react-draft-wysiwyg'),
            import('draftjs-to-html'),
            import('html-to-draftjs'),
            // @ts-expect-error no type declarations for CSS side-effect import
            import('react-draft-wysiwyg/dist/react-draft-wysiwyg.css'),
        ]).then(([draftJs, wysiwyg, draftToHtmlMod, htmlToDraftMod]) => {
            const { EditorState, convertToRaw, ContentState } = draftJs as unknown as { EditorState: EditorDeps['EditorState']; convertToRaw: EditorDeps['convertToRaw']; ContentState: EditorDeps['ContentState'] };
            const { Editor } = wysiwyg as unknown as { Editor: EditorDeps['Editor'] };
            const draftToHtml = ((draftToHtmlMod as Record<string, unknown>).default ?? draftToHtmlMod) as EditorDeps['draftToHtml'];
            const htmlToDraft = ((htmlToDraftMod as Record<string, unknown>).default ?? htmlToDraftMod) as EditorDeps['htmlToDraft'];

            setDeps({ EditorState, convertToRaw, ContentState, Editor, draftToHtml, htmlToDraft });
        });
    }, []);

    useEffect(() => {
        if (!deps) return;
        if (props.value !== undefined && props.value === lastEmittedRef.current) return;
        const { EditorState, ContentState, htmlToDraft } = deps;
        const contentBlock = props.value ? htmlToDraft(sanitizeEditorHtml(props.value)) : null;

        if (contentBlock) {
            setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(contentBlock.contentBlocks)));
        } else if (props.showTitle) {
            setEditorState(EditorState.createWithContent(ContentState.createFromText('')));
        } else {
            setEditorState(EditorState.createEmpty());
        }
    }, [props.value, props.showTitle, deps]);

    const handleEditorChange = (state: DraftEditorStateInstance) => {
        if (!deps) return;
        setEditorState(state);
        setIsTouch(true);
        if (props.onChange) {
            const { convertToRaw, draftToHtml } = deps;
            const htmlContent = sanitizeEditorHtml(draftToHtml(convertToRaw(state.getCurrentContent())));
            lastEmittedRef.current = htmlContent;
            props.onChange(htmlContent, { ops: [{ insert: htmlContent }] }, "user", editorRef.current);
        }
    };

    const isEmpty = () => {
        if (!deps || !editorState) return true;
        return editorState.getCurrentContent().getPlainText().trim() === '';
    };

    if (props.State !== undefined) {
        warnDeprecatedProp("RdsCompTextEditor", "State", "`disabled`, `selected`, `error` or `active`");
    }
    const isDisabled = props.disabled ?? props.State === "Disabled";
    const isSelected = props.selected ?? props.State === "Selected";
    const isError = props.error ?? props.State === "Error";
    const isActive = props.active ?? props.State === "Active";

    const stateClass = [
        isSelected  && "rds-comp-text-editor--selected",
        isError     && "rds-comp-text-editor--error",
        isActive    && "rds-comp-text-editor--active",
        isDisabled  && "rds-comp-text-editor--disabled",
        isResizable && "rds-comp-text-editor--resizable",
    ].filter(Boolean).join(" ");

    return (
        <>
            {props.showTitle && props.label && (
                <Label className={`rds-comp-text-editor-label ${props.labelClass || ""}`}>
                    {props.label}
                    {props.isMandatory && <span className="text-danger">*</span>}
                </Label>
            )}
            <div id={props.id} className={`rds-comp-text-editor ${stateClass}`}>
                {!deps || !editorState ? (
                    <div
                        className="rds-comp-text-editor__skeleton"
                        style={{ minHeight: editorMinHeight }}
                        aria-busy="true"
                        aria-label="Loading editor"
                    />
                ) : (
                    <deps.Editor
                        key={props.placeholder}
                        editorState={editorState}
                        onEditorStateChange={handleEditorChange}
                        readOnly={props.readOnly || isDisabled}
                        placeholder={props.placeholder}
                        ref={editorRef}
                        toolbarClassName="rds-comp-text-editor__toolbar"
                        wrapperClassName="rds-comp-text-editor__wrapper"
                        editorClassName="rds-comp-text-editor__content"
                        editorStyle={{ minHeight: editorMinHeight, resize: isResizable ? 'vertical' : 'none', overflow: 'auto' }}
                        toolbar={{
                            options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'image', 'history'],
                            inline: { options: ['bold', 'italic', 'underline', 'strikethrough'] },
                            image: {
                                urlEnabled: true,
                                uploadEnabled: true,
                                alignmentEnabled: true,
                                uploadCallback: (file: File) => new Promise((resolve) => {
                                    const reader = new FileReader();
                                    reader.onload = () => resolve({ data: { link: reader.result as string } });
                                    reader.readAsDataURL(file);
                                }),
                                previewImage: true,
                                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png',
                                alt: { present: true, mandatory: false },
                            },
                        }}
                    />
                )}
            </div>
            {props.isMandatory && isEmpty() && isTouch && (
                <div className="form-control-feedback">
                    <span className="text-danger">{props.label} is required</span>
                </div>
            )}
        </>
    );
};
RdsCompTextEditor.displayName = "RdsCompTextEditor";
export default RdsCompTextEditor;
