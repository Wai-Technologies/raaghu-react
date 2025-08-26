import React, { useEffect, useState, useRef } from "react";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./rds-comp-text-editor.scss";
import { InputLabel as Label } from "@mui/material";
 
export interface RdsCompTextEditorProps {
    bounds?: string | HTMLElement;
    children?: React.ReactElement<any>;
    className?: string;
    defaultValue?: any;
    formats?: string[];
    id?: string;
    modules?: any;
    onChange?(value: string, delta: any, source: any, editor: any): any;
    placeholder?: string;
    preserveWhitespace?: boolean;
    readOnly?: boolean;
    style?: React.CSSProperties;
    tabIndex?: number;
    theme?: string;
    value?: string;
    label?: string;
    isMandatory?: boolean;
    labelClass?: string;
    State?:string;
    showTitle?: boolean;
    rows?: number; // Controls editor height similar to <textarea rows>
    resizable?: boolean; // Enables drag-to-resize (CSS resize)
}

const RdsCompTextEditor = (props: RdsCompTextEditorProps) => {
    const [editorState, setEditorState] = useState(() => {
        if (props.value) {
            const contentBlock = htmlToDraft(props.value);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                return EditorState.createWithContent(contentState);
            }
        }
        return EditorState.createEmpty();
    });
    const [isTouch, setIsTouch] = useState(false);
    const editorRef = useRef<any>(null);
    const rows = typeof props.rows === 'number' && props.rows > 0 ? props.rows : 6;
    const lineHeightPx = 26; // approximate readable line height
    const editorMinHeight = rows * lineHeightPx;
    const isResizable = props.resizable !== false; // default true

    useEffect(() => {
        if (props.value) {
            const contentBlock = htmlToDraft(props.value);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                setEditorState(EditorState.createWithContent(contentState));
            }
        } else if (props.showTitle) {
            const contentState = ContentState.createFromText('Enter Description');
            setEditorState(EditorState.createWithContent(contentState));
        } else {
            setEditorState(EditorState.createEmpty());
        }
    }, [props.value, props.showTitle]);

    const handleEditorChange = (state: EditorState) => {
        setEditorState(state);
        setIsTouch(true);
        
        if (props.onChange) {
            const htmlContent = draftToHtml(convertToRaw(state.getCurrentContent()));
            // Create delta-like object for backward compatibility
            const delta = { ops: [{ insert: htmlContent }] };
            const source = "user";
            props.onChange(htmlContent, delta, source, editorRef.current);
        }
    };

    const isEmpty = () => {
        const contentState = editorState.getCurrentContent();
        return contentState.getPlainText().trim() === '';
    };    return (
        <>
            <Label className={`rds-comp-text-editor-label ${props.labelClass || ""}`}>
                {props.label}
                {props.isMandatory && <span className="text-danger">*</span>}
            </Label>
            <div
                id={props.id}
                className={`rds-comp-text-editor ${props.State === "Selected" ? "rds-comp-text-editor--selected" : ""} ${props.State === "Error" ? "rds-comp-text-editor--error" : ""} ${props.State === "Active" ? "rds-comp-text-editor--active" : ""} ${props.State === "Disabled" ? "rds-comp-text-editor--disabled" : ""} ${isResizable ? "rds-comp-text-editor--resizable" : ""}`}
            >
                <Editor
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                    readOnly={props.readOnly || props.State === "Disabled"}
                    placeholder={props.placeholder}
                    ref={editorRef}
                    toolbarClassName="rds-comp-text-editor__toolbar"
                    wrapperClassName="rds-comp-text-editor__wrapper"
                    editorClassName="rds-comp-text-editor__content"
                    editorStyle={{ minHeight: editorMinHeight, resize: isResizable ? 'vertical' : 'none', overflow: 'auto' }}
                    toolbar={{
                        options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'image', 'history'],
                        inline: {
                            options: ['bold', 'italic', 'underline', 'strikethrough']
                        },
                        image: {
                            urlEnabled: true,
                            uploadEnabled: true,
                            alignmentEnabled: true,
                            uploadCallback: (file: File) => {
                                return new Promise((resolve) => {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        const base64Image = reader.result as string;
                                        resolve({ data: { link: base64Image } });
                                    };
                                    reader.readAsDataURL(file);
                                });
                            },
                            previewImage: true,
                            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                            alt: { present: true, mandatory: false }
                        }
                    }}
                />
            </div>
            {props.isMandatory && isEmpty() && isTouch && (
                <div className="form-control-feedback">
                    <span className="text-danger">
                        {props.label} is required
                    </span>
                </div>
            )}
        </>
    );
    
};
RdsCompTextEditor.displayName = "RdsCompTextEditor";
export default RdsCompTextEditor;