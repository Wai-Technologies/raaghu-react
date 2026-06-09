import React, { useEffect, useState, useRef } from "react";
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

const RdsCompTextEditor = (props: RdsCompTextEditorProps) => {
    const [editorState, setEditorState] = useState(() =>
        createEditorStateFromValue(props.value, props.showTitle)
    );
    const [isTouch, setIsTouch] = useState(false);
    const editorRef = useRef<any>(null);

    const rows = typeof props.rows === "number" && props.rows > 0 ? props.rows : 6;
    const lineHeightVar = "var(--rds-line-height-body, 26px)";
    const editorMinHeight = `calc(${rows} * ${lineHeightVar})`;
    const isResizable = props.resizable !== false;

    useEffect(() => {
        setEditorState(createEditorStateFromValue(props.value, props.showTitle));
    }, [props.value, props.showTitle]);

    const handleEditorChange = (state: any) => {
        setEditorState(state);
        setIsTouch(true);
        if (props.onChange) {
            const htmlContent = draftToHtml(convertToRaw(state.getCurrentContent()));
            props.onChange(htmlContent, { ops: [{ insert: htmlContent }] }, "user", editorRef.current);
        }
    };

    const isEmpty = () => editorState.getCurrentContent().getPlainText().trim() === "";

    const stateClass = [
        props.State === "Selected" && "rds-comp-text-editor--selected",
        props.State === "Error" && "rds-comp-text-editor--error",
        props.State === "Active" && "rds-comp-text-editor--active",
        props.State === "Disabled" && "rds-comp-text-editor--disabled",
        isResizable && "rds-comp-text-editor--resizable",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <>
            {props.showTitle && props.label && (
                <Label className={`rds-comp-text-editor-label ${props.labelClass || ""}`}>
                    {props.label}
                    {props.isMandatory && <span className="text-danger">*</span>}
                </Label>
            )}
            <div id={props.id} className={`rds-comp-text-editor ${stateClass}`}>
                <Editor
                    key={props.placeholder}
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                    readOnly={props.readOnly || props.State === "Disabled"}
                    placeholder={props.placeholder}
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
