import React, { ReactNode } from "react";
import { fontWeight } from "../../../raaghu-elements/libs";
import "./rds-comp-label.css";

export interface RdsCompLabelProps {
    children?: ReactNode;
    label?: string;
    multiline?: boolean;
    size?: string;
    class?: string;
    italic?: boolean;
    fontWeight?: fontWeight;
    required?: boolean;
    id?: any
    onClick?: React.MouseEventHandler<HTMLElement>;


}

const RdsCompLabel = (props: RdsCompLabelProps) => {

    const isItalic = props.italic ? ' fst-italic' : ''
    const fontWeight = "fw-" + props.fontWeight

    return (<>
        <p className={`d-flex p-0 m-0 ${props.multiline ? ' text-break' : ' singleLine'}   ${props.class? props.class : ""}`}>
            <label className={`form-label mb-0 ${fontWeight} ${isItalic}`} htmlFor={props?.id}
                onClick={props.onClick}>{props.label}</label>
            {props.required && (
                <span className="text-danger ms-1">*</span>
            )}

        </p>

    </>
    );
};

export default RdsCompLabel;
