import { Suspense, lazy, useCallback, useMemo, useRef, useState } from "react";
import clsx from 'clsx';
import { InputLabel as Label } from "@mui/material";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = lazy(() =>
    import("react-draft-wysiwyg").then((m) => ({ default: m.Editor }))
) as React.ComponentType<any>;
import "./rds-comp-text-editor.scss";

export interface RdsCompTextEditorProps {
    id?: string;
    onChange?(value: string, delta: unknown, source: unknown, editor: unknown): void;
    placeholder?: string;
    readOnly?: boolean;
    value?: string;
    label?: string;
    isMandatory?: boolean;
    labelClass?: string;
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

const createEditorStateFromValue = (value?: string, showTitle?: boolean) => {
    if (value) {
        const contentBlock = htmlToDraft(value);
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
    label,
    isMandatory,
    labelClass,
    State,
    showTitle,
    rows,
    resizable,
}: RdsCompTextEditorProps) => {
    const [editorState, setEditorState] = useState(() =>
        createEditorStateFromValue('', false)
    );
    const prevValueRef = useRef(value);
    const prevShowTitleRef = useRef(showTitle);
    if (value !== prevValueRef.current || showTitle !== prevShowTitleRef.current) {
        prevValueRef.current = value;
        prevShowTitleRef.current = showTitle;
        setEditorState(createEditorStateFromValue(value, showTitle));
    }
    const [isTouch, setIsTouch] = useState(false);
    const editorRef = useRef<any>(null);

    const computedRows = typeof rows === "number" && rows > 0 ? rows : 6;
    const lineHeightVar = "var(--rds-line-height-body, 26px)";
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
                    new Promise<{ data: { link: string } }>((resolve) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve({ data: { link: reader.result as string } });
                        reader.readAsDataURL(file);
                    }),
                previewImage: true,
                inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                alt: { present: true, mandatory: false },
            },
        }),
        [],
    );

    const handleEditorChange = useCallback((state: any) => {
        setEditorState(state);
        setIsTouch(true);
        if (onChange) {
            const htmlContent = draftToHtml(convertToRaw(state.getCurrentContent()));
            onChange(htmlContent, { ops: [{ insert: htmlContent }] }, "user", editorRef.current);
        }
    }, [onChange]);

    const isEmpty = useMemo(() => editorState.getCurrentContent().getPlainText().trim() === "", [editorState]);

    const stateClass = clsx(
        State === "Selected" && "rds-comp-text-editor--selected",
        State === "Error" && "rds-comp-text-editor--error",
        State === "Active" && "rds-comp-text-editor--active",
        State === "Disabled" && "rds-comp-text-editor--disabled",
        isResizable && "rds-comp-text-editor--resizable"
    );

    return (
        <>
            {showTitle && label && (
                <Label className={clsx("rds-comp-text-editor-label", labelClass)}>
                    {label}
                    {isMandatory && <span className="text-danger">*</span>}
                </Label>
            )}
            <div id={id} className={clsx("rds-comp-text-editor", stateClass)}>
                <Suspense fallback={<div className="rds-comp-text-editor__loading" />}>
                    <Editor
                        key={placeholder}
                        editorState={editorState}
                        onEditorStateChange={handleEditorChange}
                        readOnly={readOnly || State === "Disabled"}
                        placeholder={placeholder}
                        ref={editorRef}
                        toolbarClassName="rds-comp-text-editor__toolbar"
                        wrapperClassName="rds-comp-text-editor__wrapper"
                        editorClassName="rds-comp-text-editor__content"
                        editorStyle={editorStyle}
                        toolbar={toolbarConfig}
                    />
                </Suspense>
            </div>
            {isMandatory && isEmpty && isTouch && (
                <div className="form-control-feedback">
                    <span className="text-danger">{label} is required</span>
                </div>
            )}
        </>
    );
};
RdsCompTextEditor.displayName = "RdsCompTextEditor";
export default RdsCompTextEditor;
