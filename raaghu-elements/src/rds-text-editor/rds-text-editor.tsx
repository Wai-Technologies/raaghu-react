import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import RdsLabel from "../rds-label";
 
export interface RdsTextEditorProps {
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
    required?: boolean;
    labelClass?: string;
    State?:string;
}
 
const RdsTextEditor = (props: RdsTextEditorProps) => {
    const [value, setValue] = useState(props.value || "");
    const [isTouch, setIsTouch] = useState(false);
 
    useEffect(() => {
        setValue(props.value || "");
    }, [props.value]);
 
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
            <RdsLabel label={props.label} required={props.required} class={"mb-2" + props.labelClass}></RdsLabel>
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
            {props.required && (!value || value.trim() === "" || value==="<p><br></p>") && isTouch && (
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