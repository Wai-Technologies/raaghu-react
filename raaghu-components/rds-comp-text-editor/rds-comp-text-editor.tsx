import React, { useEffect, useState, forwardRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./rds-comp-text-editor.scss";
import MuiTextEditor from "./mui-text-editor";

const QuillWrapper = forwardRef<any, any>((props, ref) => {
  // Create a container ref to avoid ReactQuill's direct DOM access
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Error handling wrapper
  const [hasError, setHasError] = React.useState(false);
  // Force fallback mode for React 18+ compatibility
  // Set this to true to always use MUI-based editor instead of ReactQuill
  const [forceFallback] = React.useState(true);

  React.useEffect(() => {
    // Reset error state when props change
    setHasError(false);
  }, [props.value]);
  
  // Fallback for error scenarios or forced fallback
  if (hasError || forceFallback) {
    // Extract state classes from props to pass to MUI editor
    const editorState = props.className?.split(' ')
      .find(cls => cls.startsWith('editor-'))
      || '';
    
    return (
      <div className="quill-error-fallback">
        <MuiTextEditor
          value={props.value || ''} 
          onChange={(value) => props.onChange && props.onChange(value, null, 'user', null)}
          placeholder={props.placeholder}
          disabled={props.readOnly}
          className={`${props.className || ''} ${editorState}`}
          minRows={8}
          maxRows={20}
        />
      </div>
    );
  }
  
  try {
    return (
      <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
        {/* Use type casting to fix ReactQuill typing issues */}
        {React.createElement(ReactQuill as any, { ref, ...props })}
      </div>
    );
  } catch (error) {
    console.error('Error rendering ReactQuill:', error);
    setHasError(true);
    return null; // Will render the fallback on next render
  }
});

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
        const normalizedValue = value === "<p><br></p>" ? "" : value; // Normalize empty value
        setValue(normalizedValue);
        setIsTouch(true);
        if (props.onChange) {
            props.onChange(normalizedValue, delta, source, editor);
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
            {props.label && (
              <label className={`mb-2 ${props.labelClass || ""}`}>
                  {props.label}
                  {props.isMandatory && <span style={{ color: "red" }}> *</span>}
              </label>
            )}
            <QuillWrapper
            theme="snow"
            bounds={props.bounds}
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
            >
                {props.children}
            </QuillWrapper>
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

export default RdsCompTextEditor;