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
    const initialCounterValue: number = props.counterValue ?? 0;

    // This state hook represents counter value
    const [counterValue, setCounterValue] = useState(initialCounterValue);

    const onMinusClick = () => {
        if (counterValue > props.min) {
            const newValue = counterValue - 1;
            setCounterValue(newValue);
            props.onCounterChange?.(newValue);
        }
    };

    const onPlusClick = () => {
        if (counterValue < props.max) {
            const newValue = counterValue + 1;
            setCounterValue(newValue);
            props.onCounterChange?.(newValue);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (!isNaN(newValue) && newValue >= props.min && newValue <= props.max) {
            setCounterValue(newValue);
            props.onCounterChange?.(newValue);
        }
    };

    const classes = () => {
        switch (props.position) {
            case 'top': return 'top-0';
            case 'bottom': return 'd-flex flex-column-reverse';
            case 'left': return 'd-flex align-items-baseline gap-3';
            case 'right': return 'align-items-baseline d-flex flex-row-reverse gap-3 justify-content-end';
            default: return '';
        }
    }

    const inputClasses = () => {
        let inputClass = 'input-group mt-1';
        if (props.position === 'top') {
            inputClass += ' mt-2';
        } else if (props.position === 'bottom') {
            inputClass += ' mb-2';
        }
        return inputClass;
    }

    return (
        <Fragment>
            <div className="row">
                <div className="position-relative ps-3 ms-0">
                    <div className={classes()}>
                        <label>{props.label}</label>
                        <div className={inputClasses()} style={{ width: props.width }}>
                            <RdsButton
                                colorVariant={props.colorVariant}
                                icon="minus"
                                onClick={onMinusClick}
                            />
                            <input
                                type="number"
                                className="form-control text-center"
                                value={counterValue}
                                onChange={handleInputChange}
                                min={props.min}
                                max={props.max}
                            />
                            <RdsButton
                                colorVariant={props.colorVariant}
                                icon="plus"
                                onClick={onPlusClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default RdsCounter;
