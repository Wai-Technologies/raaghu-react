import React from "react";
import "./rds-button-group.css";
import { colors } from "../../libs/types";
import RdsIcon from "../rds-icon";
export interface RdsButtonGroupProps {
    vertical: boolean;
    isOutline: boolean;
    colorVariant?: colors;
    size: string;
    role: "checkbox" | "radio" | "button";
    buttonGroupItems: any[];
    checked?: boolean;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
    onButtonClick?: (event: React.MouseEvent<HTMLButtonElement>, id?: any) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
}
 
const RdsButtonGroup = (props: RdsButtonGroupProps) => {
    const size =
        props.size == "small"
            ? "btn-group-sm"
            : props.size == "large"
                ? "btn-group-lg"
                : "";
 
    const outlineColorVariant = `${props.isOutline === true
            ? "btn btn-outline-" + props.colorVariant
            : "btn btn-" + props.colorVariant
        }`;
 
 
    return (
        <>
            {props.role != "button" && (
                <div
                    className={`${props.vertical == true ? "btn-group-vertical" : "btn-group member-count"
                        } ${size}`}
                    role="group"
                    aria-label="Basic button toggle button group"
                >
                    {props.buttonGroupItems.map((buttonGroupItem) => (
                        <>
                            <input
                                type={props.role}
                                className={`${props.role == "checkbox" || props.role == "radio"
                                        ? "btn-check"
                                        : "btn btn-primary"
                                    }`}
                                name={props.role == "radio" ? `${buttonGroupItem.name}` : ""}
                                id={buttonGroupItem.id}
                                autoComplete="off"
                                checked={buttonGroupItem.checked}
                                onClick={props.onClick}
                            ></input>
                            <label
                                className={outlineColorVariant}
                                htmlFor={buttonGroupItem.id}
                            >
                                {buttonGroupItem.label}
                            </label>
                        </>
                    ))}
                </div>
            )}
 
            {props.role == "button" && (
                <div
                    className={`${props.vertical == true ? "btn-group-vertical" : "btn-group"
                        } ${size} hover-button`}
                    role="group"
                    aria-label="Basic outlined example"
 
                >
                    {props.buttonGroupItems.map((buttonGroupItem, idx) => (
                        <button type="button" className={outlineColorVariant + buttonGroupItem.icon && buttonGroupItem.label === "" || null ? ' btn-icon ' + outlineColorVariant : outlineColorVariant}
                            onClick={(e) => { props.onButtonClick && props.onButtonClick(e, buttonGroupItem.id) }}
                            key={buttonGroupItem.id} id={buttonGroupItem.id}
                            data-bs-dismiss={buttonGroupItem.databsdismiss}
                            data-bs-target={buttonGroupItem.databstarget}
                            data-bs-toggle={buttonGroupItem.databstoggle}
                            aria-controls={buttonGroupItem.ariacontrols}
                        >
                            {buttonGroupItem.label}
                            <span className="d-inline-block ms-1 me-1 "
                            >
                                <RdsIcon
                                    name={buttonGroupItem.icon}
                                    width={buttonGroupItem.iconWidth}
                                    height={buttonGroupItem.iconHeight}
                                    fill={buttonGroupItem.iconFill}
                                    stroke={buttonGroupItem.iconStroke}
                                // isAnimate={false}
                                />
                            </span>
 
                        </button>
 
 
                    ))}
                </div>
            )}
 
 
 
        </>
    );
};
 
export default RdsButtonGroup;
 