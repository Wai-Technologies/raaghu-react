/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import "../../../raaghu-react-themes/src/styles/toggle.scss";

export interface RdsToggleProps {
    onClick?: React.MouseEventHandler<HTMLInputElement>; // Click event for the toggle
    checked: boolean; // Checked/Unchecked state for the toggle
    style?: "Style 1" | "Style 2" | "Style 3" | "Style 4" | "Style 5" | "Style 6" ; // Different styles for the toggle
    layout?: "Switch + label" | "label + Switch" | "Top label + Switch" | "Bottom label + Switch"; // Different layouts for the toggle
    state?: "On" | "Off" | "Disabled On" | "Disabled Off"; // Different states for the toggle
    showLabel?: boolean; // Show/Hide label for the toggle
    label?: string; // Label for the toggle
}

const RdsToggle = (props: RdsToggleProps) => {
    const [checked, setChecked] = useState(props.checked);
    const [styleClass, setStyleClass] = useState(props.style);
    // useEffect(() => {

    //     setChecked(props.checked);
    // }, [props.checked]);
    
    useEffect(() => {
        setStyleClass(props.style);
    }, [props.style]);

    const onChangeHandler = () => {

        setChecked((prev) => !prev);
    };

    const classes = () => {
        let classes: string = "form-check-input";
       /*  if (props.style === "") {
            classes = "form-check-input form-check-input-style3";
        }  */
        return classes;
    };
    const rootClasses = () => {
        let classList = "position-ralative form-check form-switch";
        classList += ` ${styleClass?.toLowerCase().replace(/\s+/g, "-")}`;
        if (props.state === "Disabled On" || props.state === "Disabled Off") {
            classList += " disabled";
        }
        return classList;
    };

    const isChecked = props.state === "On" || props.state === "Disabled On";

    return (
        <>
            {props.layout === "Switch + label" && (
                <>
                    <div className={rootClasses()}>
                    {(props.style === "Style 5" || props.style === "Style 6") && ( <span className={isChecked ? "on" : "off"}> {isChecked ? "on" : "off"} </span>)}
                        {(props.style === "Style 2" || props.style === "Style 4") && (<span className={isChecked ? "input-custom checked" : "input-custom"}></span>)}
                        <input className={classes()} type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={isChecked}></input>
                        {props.showLabel && (
                            <label className="form-check-label ms-2">
                                {props.label || (props.style === "Style 3" ? "style 3" : "Label")}
                            </label>
                        )}
                    </div>
                </>)}

            {props.layout === "label + Switch" && (
                <>
                    <div className="d-flex align-items-center">
                        {props.showLabel && (
                            <label className="form-check-label me-2" htmlFor="flexSwitchCheckDefault">
                                {props.label || "Label"}
                            </label>
                        )}
                        <div className={rootClasses()}>
                        <span className="position-relative">
                                {(props.style === "Style 5" || props.style === "Style 6") && (<span className={isChecked ? "on left" : "off left"}>{isChecked ? "on" : "off"}</span>)}
                                {(props.style === "Style 2" || props.style === "Style 4") && (<span className={isChecked ? "input-custom checked" : "input-custom"}></span>)}
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={isChecked}></input>
                            </span>
                        </div>
                    </div>
            </>)}

            {props.layout === "Top label + Switch" && (
                <>
                    <div>
                        {props.showLabel && (
                            <label className="d-flex align-items-center form-check-label me-2" htmlFor="flexSwitchCheckDefault">
                                {props.label || "Label"}
                            </label>
                        )}
                        <div className={rootClasses()}>
                        {(props.style === "Style 5" || props.style === "Style 6") && (<span className={isChecked ? "on" : "off"}>{isChecked ? "on" : "off"}</span>)}
                            {(props.style === "Style 2" || props.style === "Style 4") && (<span className={isChecked ? "input-custom checked" : "input-custom"}></span>)}
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={isChecked}></input>
                        </div>
                    </div>
                </>)}

            {props.layout === "Bottom label + Switch" && (
                <>
                    <div>
                        <div className={rootClasses()}>
                        {(props.style === "Style 5" || props.style === "Style 6") && (<span className={isChecked ? "on" : "off"}>{isChecked ? "on" : "off"}</span>)}
                            {(props.style === "Style 2" || props.style === "Style 4") && (<span className={isChecked ? "input-custom checked" : "input-custom"}></span>)}
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={isChecked}></input>
                        </div>
                        {props.showLabel && (
                            <label className="d-flex align-items-center form-check-label me-2" htmlFor="flexSwitchCheckDefault">
                                {props.label || "Label"}
                            </label>
                        )}
                    </div>
                </>
            )}
        </>
    );

};

export default RdsToggle;
