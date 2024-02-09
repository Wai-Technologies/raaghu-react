import React, { useState, Fragment, useEffect, forwardRef, ForwardRefRenderFunction } from "react";
import "./rds-checkbox.css";

export interface RdsCheckboxProps {
    label: string;
    labelClass?: string;
    checked: any;
    isDisabled?: boolean;
    classes?: string;
    isSwitch?: boolean;
    withlabel?: boolean;
    name?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
    state?: "Checkbox" | "Indeterminate" | "ErrorCheckbox";
    //errorMessage?: string;
    id?: string;
    dataTestId?: string;
    isInputGroup?: boolean;
    choiceId?: any;
}

const RdsCheckbox: ForwardRefRenderFunction<HTMLInputElement, RdsCheckboxProps> = (
    props,
    ref
) => {

    const [check, setcheck] = useState(props.checked);
    const [labelChecked, setLabelChecked] = useState(props.checked);

    useEffect(() => {
        setcheck(props.checked);
        setLabelChecked(props.checked);

    }, [props.checked]);


    const classes = () => {
        let classes: string = 'form-check';
        if (props.isSwitch != true) {
            classes = "form-check mb-1 d-xxl-flex d-xl-flex d-lg-flex d-md-flex d-block";
        } else {
            classes = "form-switch"
        }
        if (props.isInputGroup === true) {
            classes = "input-group-text";
        }
        return classes
    }

    // const SWITCH = `${props.isSwitch !== true ? " form-check d-xxl-flex d-xl-flex d-lg-flex d-md-flex  d-block " : " form-switch "
    // }`;ḍ

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCheck = event.target.checked;
        setcheck(newCheck);
        setLabelChecked(newCheck);
        if (props.onChange) {
            props.onChange(event);
        }
    };

    const checkedValue = props.choiceId && props.choiceId!.filter((item: any) => item == props.id);
    const checked = check || (checkedValue?.length !== undefined && checkedValue?.length !== 0) ? true : undefined;

    return (
        <Fragment>
            <div>
                <div className={classes()}>
                    <input
                        type="checkbox"
                        className={
                            props.state == "Indeterminate"
                                ? "form-check-input form-check-input-intermediate"
                                : props.state == "ErrorCheckbox"
                                    ? " form-check-input form-check-input-error"
                                    : "form-check-input"
                        }
                        value={props.checked}
                        disabled={props.isDisabled}
                        checked={checked}
                        id={`${props.id}${props.label}`}
                        name={props.id}
                        onChange={handleCheckboxChange}
                        data-testid={props.dataTestId}
                        ref={ref}
                    />

                    {props.withlabel == false ? (
                        <></>
                    ) : (
                        <label
                            className={` form-check-label me-2 ms-2  ${props.labelClass} `}
                            htmlFor={`${props.id}${props.label}`}
                        >
                            {props.label}
                        </label>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default forwardRef(RdsCheckbox);
