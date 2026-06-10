import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from 'clsx';
import { InputLabel as Label } from "@mui/material";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./rds-comp-text-editor.scss";

export interface RdsCompTextEditorProps {
    id?: string;
    onChange?(value: string, delta: any, source: any, editor: any): any;
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
        createEditorStateFromValue(value, showTitle)
    );
    const [isTouch, setIsTouch] = useState(false);
    const editorRef = useRef<Editor | null>(null);

    const computedRows = typeof rows === "number" && rows > 0 ? rows : 6;
    const lineHeightVar = "var(--rds-line-height-body, 26px)";
    const editorMinHeight = `calc(${computedRows} * ${lineHeightVar})`;
    const isResizable = resizable !== false;

    useEffect(() => {
        setEditorState(createEditorStateFromValue(value, showTitle));
    }, [value, showTitle]);

    const handleEditorChange = useCallback((state: EditorState) => {
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
                    editorStyle={{
                        minHeight: editorMinHeight,
                        resize: isResizable ? "vertical" : "none",
                        overflow: "auto",
                    }}
                    toolbar={{
                        options: ["inline", "blockType", "list", "textAlign", "link", "image", "history"],
                        inline: { options: ["bold", "italic", "underline", "strikethrough"] },
                        image: {
                            urlEnabled: true,
                            uploadEnabled: true,
                            alignmentEnabled: true,
                            uploadCallback: (file: File) =>
                                new Promise((resolve) => {
                                    const reader = new FileReader();
                                    reader.onload = () => resolve({ data: { link: reader.result as string } });
                                    reader.readAsDataURL(file);
                                }),
                            previewImage: true,
                            inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                            alt: { present: true, mandatory: false },
                        },
                    }}
                />
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
