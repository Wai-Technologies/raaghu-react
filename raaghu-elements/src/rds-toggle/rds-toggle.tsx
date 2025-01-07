/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import "./rds-toggle.css";

export interface RdsToggleProps {
    onClick?: React.MouseEventHandler<HTMLInputElement>;
    checked: boolean;
    style?: "Style 1" | "Style 2" | "Style 3" | "Style 4" | "Style 5" | "Style 6" ;
    layout?: "Switch + label" | "label + Switch" | "Top label + Switch" | "Bottom label + Switch"; 
    isChecked? : boolean;
    isDisabled?: boolean;
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
        if (props.isDisabled) {
            classList += " disabled";
        }
        return classList;
    };
    return (
        <>
            {props.layout === "Switch + label" && (
                <>
                    <div className={rootClasses()}>
                        
                    {(props.style === "Style 5" || props.style === "Style 6") && <span className={props.isChecked ? "on" : "off"}>
                                    {props.isChecked ? "on" : "off"}
                        </span>}
                        {(props.style === "Style 2" || props.style === "Style 4") && <span className={props.isChecked ? "input-custom  checked" : "input-custom"}></span>}
                        <input className={classes()} type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={props.isChecked}></input>
                        <label className="form-check-label ms-2">{props.style === "Style 3" ? "style 3" : "Label"}</label>
                    </div>
                </>)}

            {props.layout === "label + Switch" && (
                <>
                    <div className="d-flex align-items-center">
                        <label className="form-check-label me-2" htmlFor="flexSwitchCheckDefault">Label</label>
                        <div className={rootClasses()}>
                            <span className="position-relative">
                        {(props.style === "Style 5" || props.style === "Style 6") && <span className={props.isChecked ? "on left" : "off left"}>
                                    {props.isChecked ? "on" : "off"}
                                </span>}
                                {(props.style === "Style 2" || props.style === "Style 4") && <span className={props.isChecked ? "input-custom  checked" : "input-custom"}></span>}

                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={props.isChecked}></input>
                        </span>
                        </div>
                    </div>
            </>)}

            {props.layout === "Top label + Switch" && (
                <>
                    <div>
                        <label className="d-flex align-items-center form-check-label me-2" htmlFor="flexSwitchCheckDefault">Label</label>
                        <div className={rootClasses()}>
                        {(props.style === "Style 5" || props.style === "Style 6") && <span className={props.isChecked ? "on" : "off"}>
                                    {props.isChecked ? "on" : "off"}
                                </span>}
                                {(props.style === "Style 2" || props.style === "Style 4") && <span className={props.isChecked ? "input-custom  checked" : "input-custom"}></span>}

                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={props.isChecked}></input>
                        </div>
                    </div>
                </>)}

            {props.layout === "Bottom label + Switch" && (
                <>
                    <div>
                        <div className={rootClasses()}>
                        {(props.style === "Style 5" || props.style === "Style 6") && <span className={props.isChecked ? "on" : "off"}>
                                    {props.isChecked ? "on" : "off"}
                                </span>}
                                {(props.style === "Style 2" || props.style === "Style 4") && <span className={props.isChecked ? "input-custom  checked" : "input-custom"}></span>}

                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={props.isChecked}></input>
                        </div>
                        <label className="d-flex align-items-center form-check-label me-2" htmlFor="flexSwitchCheckDefault">Label</label>

                    </div>
                </>
            )}

        </> 
    );

};

export default RdsToggle;
