import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css";
import RdsLabel from "../rds-label";
import "../../../raaghu-react-themes/src/styles/quillEditor.scss";
//import "./rds-text-editor.css";
 
export interface RdsTextEditorProps {
    bounds?: string | HTMLElement; //Bounds for the editor.
    children?: React.ReactElement<any>; //Children elements to be rendered inside the editor.
    className?: string; //Class name for the editor.
    defaultValue?: any; //Default value for the editor.
    formats?: string[]; //Array of formats to be supported by the editor.
    id?: string; //Id for the editor.
    modules?: any; //Modules configuration for the editor.
    onChange?(value: string, delta: any, source: any, editor: any): any;
    placeholder?: string; //Placeholder for the editor.
    preserveWhitespace?: boolean; //Preserve whitespace in the editor.
    readOnly?: boolean; //Read only mode for the editor.
    style?: React.CSSProperties; //Style for the editor.
    tabIndex?: number; //Tab index for the editor.
    theme?: string; //Theme for the editor.
    value?: string; //Value for the editor.
    label?: string; //Label for the editor.
    isMandatory?: boolean; //Determines whether the label is mandatory.
    labelClass?: string; //Class for the label.
    State?:string; //State of the editor.
    showTitle?: boolean; //Determines whether to show the title.
}
 
const RdsTextEditor = (props: RdsTextEditorProps) => {
    const [value, setValue] = useState(props.showTitle ? "Enter Description" : props.value || "");
    const [isTouch, setIsTouch] = useState(false);
 
    useEffect(() => {
        if (props.showTitle && (!props.value || props.value.trim() === "")) {
            setValue("Enter Description");
        } else {
            setValue(props.value || "");
        }
    }, [props.value, props.showTitle]);
 
    const handleChange = (value: string, delta: any, source: any, editor: any) => {
        setValue(value);
        setIsTouch(true);
        if (props.onChange) {
            props.onChange(value, delta, source, editor);
        }
    };
 
    const defaultModules = {
        toolbar: {
            container: [
                [{ font: [] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ align: [] }],
                ["link", "image"],
                ["clean"],
            ],
        },
    };
    const modules = props.modules || defaultModules;
 
    return (
        <>
            <RdsLabel label={props.label} required={props.isMandatory} class={"mb-2 " + props.labelClass}></RdsLabel>
            <ReactQuill
            theme="snow"
            bounds={props.bounds}
            children={props.children}
            className={`${props.State === "Selected" ? "editor-selected" : ""} ${props.State === "Error" ? "editor-error" : ""} ${props.State === "Active" ? "editor-active" : ""} ${props.State === "Disabled" ? "editor-disabled" : ""}`}
            defaultValue={props.defaultValue}
            value={value}  
            formats={props.formats}
            id={props.id}
            modules={modules}
            onChange={handleChange}
            placeholder={props.placeholder}
            preserveWhitespace={props.preserveWhitespace}
            readOnly={props.readOnly}
            tabIndex={props.tabIndex}
            />
            {props.isMandatory && (!value || value.trim() === "" || value === "<p><br></p>") && isTouch && (
                <div className="form-control-feedback">
                    <span className="text-danger">
                        {props.label} is required
                    </span>
                </div>
            )}
        </>
    );
    
};
 
export default RdsTextEditor;