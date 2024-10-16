import React, { Fragment, useState } from "react";
import "./rds-button.css";
import { RdsButtonProps } from "./rds-button.types";
import Tooltip from "../rds-tooltip/rds-tooltip";
import RdsIcon from "../rds-icon";

const RdsButton = (props: RdsButtonProps) => {

    const [spinner, setSpinnerClass] = useState("");
    const btnType = props.type === "submit" ? "submit" : "button";
    const [turnSpinnerOff, setTurnSpinnerOff] = useState<any>(0);

    const buttonClick = (evt: any) => {
        const allBackdrops = document.querySelectorAll(".offcanvas-backdrop");
        if (allBackdrops.length > 1) {
            for (let i = 0; i < allBackdrops.length - 1; i++) {
                allBackdrops[i].remove();
            }
        }
        if (props.showLoadingSpinner) {

            setSpinnerClass(" spinner disabled ");
            setTurnSpinnerOff(1);

            setTimeout(() => {
                setSpinnerClass("");
                setTurnSpinnerOff(0);
            }, 2000);
        }
        props.onClick != undefined && props.onClick(evt);

    };

    const classesButton = () => {
        let defaultClass: string = " position-relative align-items-center ";
        const sizeClass = "btn-" + (props.size === "small" ? "sm " : props.size === "medium" ? "md " : props.size === "large" ? "lg " : "md ");
        defaultClass = defaultClass + sizeClass;

        if (props.icon) {
            const buttonIconClass = " d-flex btn-icon justify-content-center gap-2 ";
            defaultClass = defaultClass + buttonIconClass;
        }

        if (props.isFabIcon) {
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
        if (props.isRoundedButton) {
            defaultClass = defaultClass + " rounded-pill ";
        }
        if (props.class === " btn-link ") {
            defaultClass = defaultClass + " btn-link ";
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
        {props.tooltip ? (
            < Tooltip text={props.tooltipTitle} place={props.tooltipPlacement}>
                <button className={`btn ` + `${props.isOutline ? "btn-outline-" + props.colorVariant : "btn-" + props.colorVariant}` + classesButton() + spinner}
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
            <button className={`btn ` + `${props.isOutline ? "btn-outline-" + props.colorVariant : "btn-" + props.colorVariant}` + classesButton() + spinner}
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