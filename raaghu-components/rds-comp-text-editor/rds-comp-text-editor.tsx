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
}

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
            <Label className={`rds-text-editor-label ${props.labelClass || ""}`}>
                {props.label}
                {props.isMandatory && <span className="text-danger">*</span>}
            </Label>
            <div
                id={props.id}
                className={`draft-editor-container ${props.State === "Selected" ? "editor-selected" : ""} ${props.State === "Error" ? "editor-error" : ""} ${props.State === "Active" ? "editor-active" : ""} ${props.State === "Disabled" ? "editor-disabled" : ""}`}
            >
                <Editor
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                    readOnly={props.readOnly || props.State === "Disabled"}
                    placeholder={props.placeholder}
                    ref={editorRef}
                    toolbarClassName="draft-toolbar"
                    wrapperClassName="draft-wrapper"
                    editorClassName="draft-editor"
                    toolbar={{
                        options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'history'],
                        inline: {
                            options: ['bold', 'italic', 'underline', 'strikethrough']
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
 
export default RdsCompTextEditor;