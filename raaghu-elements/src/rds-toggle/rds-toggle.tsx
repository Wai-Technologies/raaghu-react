import React, { useState } from "react";
import "./rds-toggle.css";

export interface RdsToggleProps {
    onClick?: React.MouseEventHandler<HTMLInputElement>;
    checked: boolean;
    style: "Style 1" | "Style 2" | "Style 3" | "Style 4" | "Style 5" | "Style 6" ;
    layout: "Switch + label" | "label + Switch" | "Top label + Switch" | "Bottom label + Switch"; 
    isChecked : boolean;
    isDisabled: boolean;
}

const RdsToggle = (props: RdsToggleProps) => {
    const [checked, setChecked] = useState(props.checked);

    // useEffect(() => {

    //     setChecked(props.checked);
    // }, [props.checked]);
    const onChangeHandler = () => {

        setChecked((prev) => !prev);
    };

    const classes = () => {
        let classes: string = "form-check-input";
        if (props.style === "Style 3") {
            classes = "form-check-input form-check-input-style3";
        } 
        return classes;
    };

    return (
        <>
            {props.layout === "Switch + label" ? (
                <> 
                    <div className="form-check form-switch">                        
                        <input className={classes()} type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={props.isChecked}></input>
                        <label className="form-check-label">{props.style === "Style 3" ? "style 3" : "Label"}</label>
                    </div>
                </>) 
                : (props.layout === "label + Switch" ? ( 
                    <> 
                        <div className="d-flex align-items-center">
                            <label className="form-check-label me-2" htmlFor="flexSwitchCheckDefault">Label</label>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={props.isChecked}></input>
                            </div>
                        </div>
                    </>)
                    : (props.layout === "Top label + Switch" ? ( 
                        <>
                            <div>
                                <label className="d-flex align-items-center form-check-label me-2" htmlFor="flexSwitchCheckDefault">Label</label>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"  checked={props.isChecked}></input>
                                </div>
                            </div>
                        </>)
                        : (props.layout === "Bottom label + Switch" ? (
                            <> 
                                <div>
                                    <div className="d-flex form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={props.isChecked}></input>
                                    </div>
                                    <label className="d-flex align-items-center form-check-label me-2" htmlFor="flexSwitchCheckDefault">Label</label>
                            
                                </div>
                            </>
                        )
                            :(<> 
                                <div className="form-check form-switch">                        
                                    <input className={classes()} type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={props.isChecked}></input>
                                    <label className="form-check-label">Label</label>
                                </div>
                            </>))))} 
        </> 
    );

};

export default RdsToggle;
