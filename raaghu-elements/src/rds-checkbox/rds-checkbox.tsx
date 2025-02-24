import React, { useState, useEffect, forwardRef, ForwardRefRenderFunction, Fragment, useRef } from "react";
//import "./rds-checkbox.css";
import "../../../raaghu-react-themes/src/styles/checkbox.scss";

export interface RdsCheckboxProps {
    labeltext?: string; // Label text for the checkbox
    labelClass?: string; // Additional classes for the label
    checked?: any; // Checked state of the checkbox
    isDisabled?: boolean; // Disabled state of the checkbox
    classes?: string; // Additional classes for the checkbox
    isSwitch?: boolean; // Switch style checkbox
    showtext?: boolean; // Show text for the checkbox
    name?: string; // Name attribute for the checkbox input.
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
    style?: "Square" | "Circular"; // Style of the checkbox
    status?: "checked" | "unchecked" | "indeterminate"; // Status of the checkbox
    state?: "Default" | "Disabled" | "Hover"; // State of the checkbox
    id?: string; // Id for the checkbox
    dataTestId?: string; // Data test id for the checkbox
    isInputGroup?: boolean; // Input group checkbox
    choiceId?: any; // Choice id for the checkbox
    labelPosition?: "left" | "right"; // Label position for the checkbox
}

const RdsCheckbox = (props: RdsCheckboxProps) => {
  
    const [check, setCheck] = useState(props.checked);
    const [labelChecked, setLabelChecked] = useState(props.checked);
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setCheck(props.checked);
        setLabelChecked(props.checked);
    }, [props.checked]);

    const classes = () => {
        let classes: string = "form-check";
        if (props.isSwitch !== true) {
            classes = "form-check mb-1 d-xxl-flex d-xl-flex d-lg-flex d-md-flex d-block";
        } else {
            classes = "form-switch";
        }
        if (props.isInputGroup === true) {
            classes = "input-group-text";
        }
        if (props.status === "indeterminate") {
            classes = "ps-0 d-flex";
        }
        if (props.state === "Hover") {
            classes += " hover";
        }
        return classes;
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCheck = event.target.checked;
        setCheck(newCheck);
        setLabelChecked(newCheck);
        if (props.onChange) {
            props.onChange(event);
        }
    };

    const checkedValue = props.choiceId && props.choiceId!.filter((item: any) => item === props.id);
    const checked = check || (checkedValue?.length !== undefined && checkedValue?.length !== 0) ? true : undefined;

    const renderLabel = () => (
        props.showtext === false ? (
            <></>
        ) : (
            <label className={`form-check-label ps-2 ${props.labelClass}`} htmlFor={`${props.id}${props.labeltext}`}>
                {props.labeltext}
            </label>
        )
    );

    return (
        <>
            {props.style === "Circular" && props.status !== "indeterminate" ? (
                <Fragment>
                    <div>
                        <div className={`rds-checkbox ${classes()}`}>
                            {props.labelPosition === "left" && renderLabel()}
                            <input
                                type="checkbox"
                                className={
                                    props.status === "unchecked"
                                        ? "form-check-input form-check-input-error form-check-input-type-circular"
                                        : "form-check-input form-check-input-type-circular"
                                }
                                value={props.checked}
                                disabled={props.state === "Disabled" || props.isDisabled}
                                checked={props.status === "checked" ? true : props.status === "unchecked" ? false : undefined}
                                id={`${props.id}${props.labeltext}`}
                                name={props.id}
                                onChange={handleCheckboxChange}
                                data-testid={props.dataTestId}
                                ref={ref}
                            />
                            {props.labelPosition === "right" && renderLabel()}
                        </div>
                    </div>
                </Fragment>
            ) : props.style === "Circular" && props.status === "indeterminate" ? (
                <Fragment>
                    <div>
                        <div className={`rds-checkbox ${classes()}`}>
                            {props.labelPosition === "left" && renderLabel()}
                            <span className="form-check-input-type-circular-indeterminate">
                                <input
                                    type="checkbox"
                                    className="form-check-input form-check-input-intermediate form-check-input-type-circular"
                                    value={props.checked}
                                    disabled={props.state === "Disabled" || props.isDisabled}
                                    checked={checked}
                                    id={`${props.id}${props.labeltext}`}
                                    name={props.id}
                                    onChange={handleCheckboxChange}
                                    data-testid={props.dataTestId}
                                    ref={ref}
                                />
                            </span>
                            {props.labelPosition === "right" && renderLabel()}
                        </div>
                    </div>
                </Fragment>
            ) : props.style === "Square" && props.status === "indeterminate" ? (
                <Fragment>
                    <div>
                        <div className={`rds-checkbox ${classes()}`}>
                            {props.labelPosition === "left" && renderLabel()}
                            <span className="form-check-input-type-square-indeterminate">
                                <input
                                    type="checkbox"
                                    className="form-check-input form-check-input-intermediate"
                                    value={props.checked}
                                    disabled={props.state === "Disabled" || props.isDisabled}
                                    checked={checked}
                                    id={`${props.id}${props.labeltext}`}
                                    name={props.id}
                                    onChange={handleCheckboxChange}
                                    data-testid={props.dataTestId}
                                    ref={ref}
                                />
                            </span>
                            {props.labelPosition === "right" && renderLabel()}
                        </div>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <div>
                        <div className={`rds-checkbox ${classes()}`}>
                            {props.labelPosition === "left" && renderLabel()}
                            <input
                                type="checkbox"
                                className={
                                    props.status === "indeterminate"
                                        ? "form-check-input form-check-input-intermediate"
                                        : props.status === "unchecked"
                                        ? "form-check-input form-check-input-error"
                                        : "form-check-input"
                                }
                                value={props.checked}
                                disabled={props.state === "Disabled" || props.isDisabled}
                                checked={props.status === "checked"}
                                id={`${props.id}${props.labeltext}`}
                                name={props.id}
                                onChange={handleCheckboxChange}
                                data-testid={props.dataTestId}
                                ref={ref}
                            />
                            {props.labelPosition === "right" && renderLabel()}
                        </div>
                    </div>
                </Fragment>
            )}
        </>
    );
};

export default RdsCheckbox;