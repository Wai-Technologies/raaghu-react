import React from "react";
import "./rds-checkbox-group.css";

export interface RdsCheckboxGroupProps {
    isSwitch?: boolean;
    isInline?: boolean;
    itemList: any;
    label?: string;
    id?: number;
    state?: "Checkbox" | "Indeterminate" | "ErrorCheckbox";
    errorMessage?: string;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
}

const RdsCheckboxGroup = (props: RdsCheckboxGroupProps) => {
    const Switch1 = `${props.isSwitch === true ? " mb-3 form-switch " : " mb-3 form-check "
        } `;
    const Inline1 = `${props.isInline === true && props.isSwitch == false
        ? " form-check-inline"
        : ""
        } `;
    const state = props.state || "Checkbox";

    return (
        <>
            <div key={props.id}>
                <div>
                    <label className="d-flex my-2 fw-semibold">{props.label}</label>

                    {state == "ErrorCheckbox" && (
                        <span className="error_Msg me-3"> {props.errorMessage}</span>
                    )}
                    {props.itemList.map((item: any, idx: any) => (
                        <div key={item.id} className={`${Switch1} ${Inline1}`}>
                            {item.title && (
                                <div className="item___title__checkbox__group">
                                    {item.title}
                                </div>
                            )}
                            <div>
                                <input
                                    type="checkbox"
                                    className={
                                        props.state == "Indeterminate"
                                            ? "form-check-input form-check-input-intermediate"
                                            : props.state == "ErrorCheckbox"
                                                ? "form-check-input form-check-input-error"
                                                : "form-check-input"


                                    }
                                    name={item.name}
                                    value={item.label}
                                    defaultChecked={item.checked}
                                    id={item.id}
                                    disabled={item.disabled}
                                    onClick={props.onClick}
                                />
                                <label htmlFor={item.id} className="ms-2 form-check-label">
                                    {item.label}
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default RdsCheckboxGroup;
