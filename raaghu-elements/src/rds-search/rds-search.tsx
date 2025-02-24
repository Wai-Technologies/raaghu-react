import React from "react";
import RdsIcon from "../rds-icon";
import "./rds-search.css";
import { placements } from "../../libs";

export interface RdsSearchProps {
    placeholder: string;
    size: string;
    iconPosition?: "left" | "right",
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress?: (event: React.KeyboardEvent) => void;
    onKeyUp?: any
    onSearchClick?: () => void;
    dataTestId?: string;
    label?: string;
    labelPosition?: placements;
    id?: string;
}

const RdsSearch = (props: RdsSearchProps) => {
    const classes = () => {
        let inputClass: string = 'form-group';
        if (props.size == 'small') {
            inputClass = inputClass + ' input-group-sm';
        }
        if (props.size == "medium") {
            inputClass = inputClass + ' input-group-md';
        }
        if (props.size == "large") {
            inputClass = inputClass + ' input-group-lg';
        }
        return inputClass;
    }

    const labelClass = () => {
        let labelPositionClass: string = '';
        if (props.labelPosition === 'bottom') {
            labelPositionClass = ' d-flex flex-column-reverse';
        }
        if (props.labelPosition === 'left') {
            labelPositionClass = ' d-flex align-items-center gap-2';
        }
        if (props.labelPosition === 'right') {
            labelPositionClass = ' d-flex align-items-center gap-2 flex-row-reverse';
        }
        if (props.size === 'small') {
            labelPositionClass = labelPositionClass + ' form-control-sm px-0 py-0';
        }
        if (props.size === 'large') {
            labelPositionClass = labelPositionClass + ' form-control-lg';
        }
        return labelPositionClass;
    }

    return (
        <div className={`form-label ` + labelClass()} >{props.label}
            {/* <div className={labelClass()}> */}
            {/* <label>{props.label}</label> */}
            <div className={`input-group border mt-1 rounded ` + classes()} id={props.id}>
                {props.iconPosition === 'left' && (
                    <span className="input-group-text border-0">
                        <RdsIcon name="search" fill={false} stroke={true} isCursorPointer={true} ></RdsIcon>
                    </span>)}
                <input className={`form-control border-bottom-0 border-top-0 border-end-0` + (props.iconPosition === 'left' ? ' border-end-0' : ' border-start-0')} type="search"
                    defaultValue={props.value}
                    placeholder={props.placeholder}
                    id={props.id}
                    aria-label={'aria-label-' + props.label}
                    aria-describedby={'aria-describedby' + props.label}
                    onChange={props.onChange}
                    onKeyDown={props.onKeyPress}
                    onKeyUp={props.onKeyUp}
                    data-testid={props.dataTestId} />
                {props.iconPosition === 'right' && (
                    <span className="input-group-text border-0">
                        <RdsIcon
                            name="search"
                            fill={false}
                            stroke={true}
                            isCursorPointer={true}
                        ></RdsIcon>
                    </span>)}
            </div>
            {/* </div> */}
        </div>
    );
};

export default RdsSearch;
