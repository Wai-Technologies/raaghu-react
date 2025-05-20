import React, { Fragment, useState, useEffect } from "react";
import "./rds-button.css";
import { RdsButtonProps } from "./rds-button.types";
import Tooltip, { TooltipStyle } from "../rds-tooltip/rds-tooltip";
import RdsIcon from "../rds-icon";


const LocalTooltipStyle: Record<string, TooltipStyle> = {
    NoArrow: TooltipStyle.NoArrow,
    MiddleTopArrow: TooltipStyle.MiddleTopArrow,
    MiddleBottomArrow: TooltipStyle.MiddleBottomArrow,
    LeftArrow: TooltipStyle.LeftArrow,
    LeftTopArrow: TooltipStyle.LeftTopArrow,
    LeftBottomArrow: TooltipStyle.LeftBottomArrow, 
    RightArrow: TooltipStyle.RightArrow,
    RightTopArrow: TooltipStyle.RightTopArrow,
    RightBottomArrow: TooltipStyle.RightBottomArrow, 
};

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

    const buttonClick = (evt: any) => {
        const allBackdrops = document.querySelectorAll(".offcanvas-backdrop");
        if (allBackdrops.length > 1) {
            for (let i = 0; i < allBackdrops.length - 1; i++) {
                allBackdrops[i].remove();
            }
        }
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
        }
        props.onClick && props.onClick(evt);
    };
    const textCaseStyle = () => {
        switch (props.textCase) {
            case "uppercase":
                return { textTransform: "uppercase" } as React.CSSProperties;
            case "lowercase":
                return { textTransform: "lowercase" } as React.CSSProperties;
            case "capitalize":
                return { textTransform: "capitalize" } as React.CSSProperties;
            default:
                return {} as React.CSSProperties;
        }
    };
    const classesButton = () => {
        let defaultClass: string = " position-relative align-items-center ";
        const sizeClass = "btn-" + (props.size === "small" ? "sm " : props.size === "medium" ? "md " : props.size === "large" ? "lg " : " ");
        defaultClass += sizeClass;

        if (props.icon) {
            defaultClass += " d-flex btn-icon justify-content-center gap-2 ";
        }

        if (props.isFabIcon) {
            defaultClass += " btn-icon rounded-pill ";
        }

        if (props.block) {
            defaultClass += " w-100 ";
        }

        if (props.icon && props.label) {
            defaultClass = defaultClass.replace("btn-icon", "");
        }

        if (props.shape === "pill") {
            defaultClass += " rounded-pill ";
        }

        if (props.class === " btn-link ") {
            defaultClass += " btn-link ";
        }

        if (props.colorVariant === "light" && props.isBanerButton) {
            defaultClass += " text-primary border-primary";
        }

        if (props.style === "filled") {
            if (props.state === "hover") {
                defaultClass += `btn hover `;
            } else if (props.state === "disabled") {
                defaultClass += `btn disabled`;
            } else if (isSelected && props.state === "selected") {
                defaultClass += ` btn selected `;
            }
        } else if (props.style === "outline") {
            defaultClass += `btn ${
                props.state === "hover" ? "outline-hover " :
                props.state === "disabled" ? "disabled outline-selected" :
                isSelected ? "outline-selected" : "btn-outline-primary"
            }`;
        } else if (props.style === "transparent") {
            defaultClass += `btn ${
                props.state === "hover" ? "transparent-hover " :
                props.state === "disabled" ? "disabled btn-transparent-primary" :
                isSelected ? "transparent-selected" : "btn-transparent-primary"
            }`;
        }

        if (props.textCase) {
            defaultClass += ` text-${props.textCase.toLowerCase()}`;
        }

        return defaultClass;
    };

    const iconClasses = () => {
        let iconSpan: string = "";
        if (props.icon) {
            iconSpan = " d-inline-block position-relative alignClass ";
        }
        return iconSpan;
    };

    return (
        <Fragment>
      {props.tooltip ? (
    <Tooltip 
        label={props.tooltipTitle} 
        style={props.tooltipPlacement ? LocalTooltipStyle[props.tooltipPlacement] : LocalTooltipStyle.MiddleTopArrow}
    >
        <button
            className={`btn ${
                props.style === "outline" && props.state === "default"
                    ? `btn-outline-${props.colorVariant}`
                    : props.style === "outline"
                    ? `btn-outline-${props.state}`
                    : props.style === "transparent" && props.state === "default"
                    ? `transparent-${props.colorVariant}`
                    : props.style === "transparent" && props.state === "selected"
                    ? "btn transparent-selected"
                    : props.style === "transparent"
                    ? `transparent-${props.state}`
                    : `btn-${props.colorVariant}`
            } ${classesButton()} ${spinner}`}
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
            onClick={buttonClick}
        >
            {props.icon && (
                <span className={iconClasses()}>
                    <RdsIcon
                        name={props.icon}
                        fill={props.iconFill}
                        stroke={props.iconStroke}
                    />
                </span>
            )}
            {props.label && <span style={textCaseStyle()}>{props.label}</span>}
            {props.children}
        </button>
    </Tooltip>
) : (
    <button
        className={`btn ${
            props.style === "outline" && props.state === "default"
                ? `btn-outline-${props.colorVariant}`
                : props.style === "outline"
                ? `btn-outline-${props.state}`
                : props.style === "transparent" && props.state === "default"
                ? `transparent-${props.colorVariant}`
                : props.style === "transparent" && props.state === "selected"
                ? "btn transparent-selected"
                : props.style === "transparent"
                ? `transparent-${props.state}`
                : `btn-${props.colorVariant}`
        } ${classesButton()} ${spinner}`}
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
        onClick={buttonClick}
    >
        {props.icon && (
            <span className={iconClasses()}>
                <RdsIcon
                    name={props.icon}
                    fill={props.iconFill}
                    stroke={props.iconStroke}
                />
            </span>
        )}
        {props.label && <span style={textCaseStyle()}>{props.label}</span>}
    </button>
)}
        </Fragment>
    );
};

export default RdsButton;