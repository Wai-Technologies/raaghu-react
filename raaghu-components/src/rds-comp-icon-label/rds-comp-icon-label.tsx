import React, { ReactNode } from "react";
import "./rds-comp-icon-label.css";
import RdsCompIcon from "../rds-comp-icon/rds-comp-icon";
import RdsCompLabel from "../rds-comp-label/rds-comp-label";
import { fontWeight } from "../../../raaghu-elements/libs";

export interface RdsCompIconLabelProps {
    children?: ReactNode;
    label?: string;
    icon?: string;
    size: string;
    fill?: boolean;
    iconposition?: string;
    colorVariant?: string;
    multiline?: boolean;
    class?: string;
    italic?: boolean;
    fontWeight?: fontWeight;
    required?: boolean;
    id?: any;
    onClick?: React.MouseEventHandler<HTMLElement>;
    withIcon?: boolean;
    custom?: boolean;
}

const RdsCompIconLabel = (props: RdsCompIconLabelProps) => {
    const isItalic = props.italic ? ' fst-italic' : ''
    const fontWeightClass = props.fontWeight ? "fw-" + props.fontWeight : ""

    const classes = () => {
        let classes: string = 'd-flex';
        if (props.size) {
            const size = `${props.size === 'small' ? "d-flex form-select-sm" : props.size === 'medium' ? "d-flex form-select-md" : "d-flex form-select-lg"}`;
            classes = size;
        }
        return classes;
    }


    const inputClass = () => {
        let positionClass: string = 'd-flexLabelIcon gap-2';
        if (props.iconposition === 'left') {
            positionClass = 'd-flex gap-2';
        }
        else if (props.iconposition === 'right') {
            positionClass = 'd-flex flex-row-reverse gap-2 justify-content-end';
        }
        return positionClass;
    }

    return (
        <>
    {
    props.withIcon && (
            <div className={inputClass()}>
                <RdsCompIcon
                    classes={classes()}
                    name={props.icon}
                    fill={props.fill}
                    stroke={true}
                    colorVariant={props.colorVariant}
                    isCursorPointer={true}
                />
                <RdsCompLabel label={props.label} size={classes()} class={"align-items-center " + classes()} />
            </div>
        )
    }
    {
        props.custom && (
            <p className={`d-flex p-0 m-0 ${props.multiline ? ' text-break' : ' singleLine'} ${props.class ? props.class : ""}`}>
                <label className={`form-label mb-0 ${fontWeightClass} ${isItalic}`} htmlFor={props?.id}
                    onClick={props.onClick}>{props.label}</label>
                {props.required && (
                    <span className="text-danger ms-1">*</span>
                )}
        </p>
        )
    }
        </>
    );
};

export default RdsCompIconLabel;
