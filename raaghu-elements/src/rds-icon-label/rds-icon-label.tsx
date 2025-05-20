import React from "react";
import "./rds-icon-label.css";
import RdsIcon from "../rds-icon/rds-icon";
import RdsLabel from "../rds-label/rds-label";

export interface RdsIconLabelProps {
    label?: string;
    icon?: string;
    size: string;
    fill?: boolean;
    iconposition?: string;
    colorVariant?: string;
}

const RdsIconLabel = (props: RdsIconLabelProps) => {
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
            <div className={inputClass()}>
                <RdsIcon
                    classes={classes()}
                    name={props.icon}
                    fill={props.fill}
                    stroke={true}
                    colorVariant={props.colorVariant}
                    isCursorPointer={true}
                />
                <RdsLabel label={props.label} size={classes()} class={"align-items-center " + classes()} />
            </div>
        </>
    );
};

export default RdsIconLabel;
