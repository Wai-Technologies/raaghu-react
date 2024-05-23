import React, { Fragment, useState } from "react";
import { colors, placements } from "../../libs/types";
import RdsButton from "../rds-button/rds-button";
import "./rds-counter.css";

export interface RdsCounterProps {
    counterValue: number;
    label?: string;
    min: number;
    max: number;
    width: number;
    colorVariant?: colors;
    position?: placements;
    onCounterChange?: (newValue: number) => void;
}

const RdsCounter = (props: RdsCounterProps) => {
    const initialCounterValue: number = props.counterValue ? props.counterValue : 0;

    // This state hook represents counter value
    const [counterValue, setCounterValue] = useState(initialCounterValue);
    const onMinusClick = () => {
        if (counterValue > props.min) {
            const newValue = counterValue - 1;
            setCounterValue(newValue);
            props.onCounterChange && props.onCounterChange(newValue);
        }
    };

    const onPlusClick = () => {
        if (counterValue < props.max) {
            const newValue = counterValue + 1;
            setCounterValue(newValue);
            props.onCounterChange && props.onCounterChange(newValue);
        }
    };

    const classes = () => {
        let defaultClass: string = '';
        if (props.position === 'top') {
            defaultClass = 'top-0';
        }
        else if (props.position === 'bottom') {
            defaultClass = 'd-flex flex-column-reverse';
        }
        else if (props.position === 'left') {
            defaultClass = 'd-flex align-items-baseline gap-3';
        }
        else if (props.position === 'right') {
            defaultClass = 'align-items-baseline d-flex flex-row-reverse gap-3 justify-content-end';
        }
        return defaultClass;
    }

    const inputClasses = () => {
        var inputClass: string = 'input-group mt-1';
        if (props.position === 'top') {
            inputClass = inputClass + ' mt-2';
        }
        else if (props.position === 'bottom') {
            inputClass = inputClass + ' mb-2';
        }
        return inputClass;
    }

    return (
        <Fragment>
            <div className="row">   
                <div className="position-relative ms-0">
                    <div className={classes()}>
                        <label>{props.label}</label>
                        <div className={inputClasses()} style={{ width: props.width }}>
                            <RdsButton
                                colorVariant={props.colorVariant}
                                icon="minus"
                                onClick={onMinusClick}>
                            </RdsButton>
                            <input type="text" className="form-control text-center" value={counterValue} min={props.min} max={props.max} />
                            <RdsButton
                                colorVariant={props.colorVariant}
                                icon="plus"
                                onClick={onPlusClick}>
                            </RdsButton>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default RdsCounter;
