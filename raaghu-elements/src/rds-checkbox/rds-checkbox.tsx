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
    type?: "Square" | "Circular";
    state?: "Checkbox" | "Indeterminate" | "ErrorCheckbox";
    //errorMessage?: string;
    id?: string;
    dataTestId?: string;
    isInputGroup?: boolean;
    choiceId?: any;
    labelPosition?: "left" | "right";
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
        let classes: string = "form-check";
        if (props.isSwitch != true) {
            classes = "form-check mb-1 d-xxl-flex d-xl-flex d-lg-flex d-md-flex d-block mt-2";
        } else {
            classes = "form-switch";
        }
        if (props.isInputGroup === true) {
            classes = "input-group-text";
        }
        if(props.state === "Indeterminate"){
            classes = "ps-0 d-flex";
        }
        return classes;
    };

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

    const renderLabel = () => (
        props.withlabel == false ? (
            <></>
        ) : (
            <label className={`form-check-label  ms-2 ${props.labelClass}`} htmlFor={`${props.id}${props.label}`}>
                {props.label}
            </label>
        )
    );

    return (
        <>
            {props.type === "Circular" && props.state != "Indeterminate" ? (
                <> 
                    <Fragment>
                        <div>
                            <div className="rds-checkbox {classes()}">
                                {props.labelPosition === "left" && renderLabel()}
                                <input
                                    type="checkbox"
                                    className={
                                        props.state == "ErrorCheckbox"
                                            ? " form-check-input form-check-input-error form-check-input-type-circular"
                                            : "form-check-input form-check-input-type-circular"
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

                                {props.labelPosition === "right" && renderLabel()}
                               

                            </div>
                        </div>
                    </Fragment>
                </>) 
                : (props.type === "Circular" && props.state === "Indeterminate" ? ( 
                    <> 
                        <Fragment>
                            <div>
                                <div className="rds-checkbox {classes()}">
                                    {props.labelPosition === "left" && renderLabel()}
                                    <span className= "form-check-input-type-circular-indeterminate">
                                        <input
                                            type="checkbox"
                                            className={
                                                props.state == "Indeterminate"
                                                    ? "form-check-input form-check-input-intermediate form-check-input-type-circular"
                                                    : "form-check-input form-check-input-indeterminate form-check-input-type-circular"
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
                                    </span>
                                
                                    {props.labelPosition === "right" && renderLabel()}

                                </div>
                            </div>
                        </Fragment>  
                    </>)
                    : (props.type === "Square" && props.state === "Indeterminate" ? ( 
                        <> 
                            <Fragment>
                                <div>
                                    <div className="rds-checkbox {classes()}">
                                        {props.labelPosition === "left" && renderLabel()}
                                        <span className="form-check-input-type-square-indeterminate">
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
                                                ref={ref}/>
                                        </span>                            
                                        {props.labelPosition === "right" && renderLabel()}

                                    </div>
                                </div>
                            </Fragment>
                        </>)
                        : (<> 
                            <Fragment>
                                <div>
                                    <div className="rds-checkbox {classes()}">
                                        {props.labelPosition === "left" && renderLabel()}
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

{(props.labelPosition || "right") === "right" && renderLabel()}

                                    </div>
                                </div>
                            </Fragment>

                        </>)))} 
        </>        
    );
};

export default forwardRef(RdsCheckbox);