import React, { Fragment, useState, useEffect } from "react";
import "./rds-button.css";
import { RdsButtonProps } from "./rds-button.types";
import Tooltip from "../rds-tooltip/rds-tooltip"; 
import RdsIcon from "../rds-icon";

const RdsButton = (props: RdsButtonProps) => {

    const [spinner, setSpinnerClass] = useState("");
    const btnType = props.type === "submit" ? "submit" : "button";
    const [turnSpinnerOff, setTurnSpinnerOff] = useState<any>(0);
    const [isSelected, setIsSelected] = useState(false);
    useEffect(() => {
        if (props.state !== "selected") {
            setIsSelected(false);
        }
    }, [props.state]);
    //The if statement below will make the style disabled if other component calls button and gives isDisabled as argument
    if(props.isDisabled){
        props.style==="disabled";
    };
    const buttonClick = (evt: any) => {
        const allBackdrops = document.querySelectorAll(".offcanvas-backdrop");
        if (allBackdrops.length > 1) {
            for (let i = 0; i < allBackdrops.length - 1; i++) {
                allBackdrops[i].remove();
            }
        }
        // below if statement added to toggle the setIsSelected 
        if (props.state === "selected") {
            setIsSelected((prev) => !prev); 
        }
        if (props.showLoadingSpinner) {
            setSpinnerClass(" spinner");
            setTurnSpinnerOff(1);

            setTimeout(() => {
                setSpinnerClass("");
                setTurnSpinnerOff(0);
            }, 2000);
            `btn-${(props.colorVariant || "primary:selected").toLowerCase()} selected `;
        }
        props.onClick != undefined && props.onClick(evt);
    };

    const classesButton = () => {
        let defaultClass: string = " position-relative align-items-center ";
        const sizeClass = "btn-" + (props.size === "small" ? "sm " : props.size === "medium" ? "md " : props.size === "large" ? "lg " : " ");
        defaultClass = defaultClass + sizeClass;

        if (props.icon) {
            const buttonIconClass = " d-flex btn-icon justify-content-center gap-2 ";
            defaultClass = defaultClass + buttonIconClass;
        }

        if(props.isFabIcon) {
            const roundedClass = " btn-icon rounded-pill ";
            defaultClass = defaultClass + roundedClass;
        }

        if (props.block) {
            defaultClass = defaultClass + " w-100 ";
        }

        if (props.icon && props.label) {
            const iconLabelClass = defaultClass.replace("btn-icon", "");
            defaultClass = iconLabelClass;
        }
        if (props.shape==="pill") {
            defaultClass = defaultClass + " rounded-pill ";
        }else{
            defaultClass;
        }
        if (props.class === " btn-link ") {
            defaultClass = defaultClass + " btn-link ";
        }
        if (props.colorVariant === "light" && props.isBanerButton) {
            defaultClass = defaultClass + " text-primary border-primary";
        }
        if(props.style === "filled"){
            if (props.state === "hover") {
                defaultClass += `btn hover `; 
            } else if (props.state === "disabled") {
                defaultClass += `btn disabled`; 
            } else if (isSelected&&props.state==="selected") {
                defaultClass += ` btn selected `;
            }
            else{
                defaultClass;
            }
        }
        else if(props.style === "outline"){
            defaultClass += `btn ${
                props.state === "hover" ? "outline-hover " :
                props.state === "disabled" ? "disabled outline-selected" :
                isSelected ? "outline-selected" : "btn-outline-primary"
            }`;
        }
        else if(props.style === "transparent") {
            defaultClass += `btn ${
                props.state === "hover" ? "transparent-hover " :
                props.state === "disabled" ? "disabled btn-transparent-primary" :
                isSelected ? "transparent-selected" : "btn-transparent-primary"
            }`;
        }

        return defaultClass;
    };

    const iconClasses = () => {
        let iconSpan: string = "";
        if (props.icon) {
            const iconClass = " d-inline-block position-relative alignClass ";
            iconSpan = iconClass;
        }

        return iconSpan;
    };

    return (<Fragment>
        {  
           props.tooltip && props.label === "" ? (
            < Tooltip label={props.tooltipTitle} style={props.tooltipPlacement}>
                <button className={`btn ${
                props.style === "outline" && props.state === "default"
                  ? `btn-outline-${props.colorVariant}`
                  : props.style === "outline"? `btn-outline-${props.state}`
                  : props.style === "transparent" && props.state === "default"
                  ? `transparent-${props.colorVariant}`
                  : props.style === "transparent" && props.state === "selected"
                  ? "btn transparent-selected"
                  : props.style === "transparent" 
                  ? `transparent-${props.state}`
                  : `btn-${props.colorVariant}`
              } ${classesButton()} ${spinner} ${
                props.textCase ? `text-${props.textCase}` : ""
              }`}
                    disabled={props.isDisabled}
                    type={btnType}
                    form={props.formName}
                    key={turnSpinnerOff}
                    data-bs-dismiss={props.databsdismiss}
                    data-bs-target={props.databstarget}
                    data-bs-toggle={props.databstoggle}
                    aria-controls={props.ariacontrols}
                    id={props.id}
                    data-testid={props.dataTestId}
                    onClick={buttonClick}>
                    {props.icon && (
                        <span className={iconClasses()}>
                            <RdsIcon
                                name={props.icon}
                                fill={props.iconFill}
                                stroke={props.iconStroke} />
                        </span>
                    )}
                    {props.label && (
                        <span>{props.label}</span>
                    )}

                    {<>{props.children}</>}
                </button>
            </Tooltip>
        ) :
            <button className={`btn ${
                props.style === "outline" && props.state === "default"
                  ? `btn-outline-${props.colorVariant}`
                  : props.style === "outline"? `btn-outline-${props.state}`
                  : props.style === "transparent" && props.state === "default"
                  ? `transparent-${props.colorVariant}`
                  : props.style === "transparent" && props.state === "selected"
                  ? "btn transparent-selected"
                  : props.style === "transparent" 
                  ? `transparent-${props.state}`
                  : `btn-${props.colorVariant}`
              } ${classesButton()} ${spinner} ${
                props.textCase ? `text-${props.textCase}` : ""
              }`}
                disabled={props.isDisabled}
                type={btnType}
                form={props.formName}
                key={turnSpinnerOff}
                data-bs-dismiss={props.databsdismiss}
                data-bs-target={props.databstarget}
                data-bs-toggle={props.databstoggle}
                aria-controls={props.ariacontrols}
                id={props.id}
                data-testid={props.dataTestId}
                onClick={buttonClick}>
                {props.icon && (
                    <span className={iconClasses()}>
                        <RdsIcon
                            name={props.icon}
                            fill={props.iconFill}
                            stroke={props.iconStroke} />
                    </span>
                )}
                {props.label && (
                    <span>{props.label}</span>
                )}
            </button>
        }

    </Fragment>
    );
};

export default RdsButton;