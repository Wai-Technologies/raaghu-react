import React, { useEffect, useState } from "react";
import { colors } from "../../libs/types";
import "./rds-toast.css";
import RdsIcon from "../rds-icon/rds-icon";

export interface RdsToastProps {
    colorVariant?: colors;
    withIcon?: boolean;
    headerTitle?: string;
    message: string;
    delay?: number;
    autohide?: boolean;
    borderColor?: string;
    showHeader?: boolean;
    iconName?: string;
    layout: string;
    state: string;
    placeholder?: string;
    progressWidth?: number;
    filename?: string;
}
const RdsToast = (props: RdsToastProps) => {
    const statewiseColor = props.state === "info"? "dark" : props.state === "success" ? "primary" : props.state === "error" ? "danger" : "light";
    // const borderColor = props.borderColor ? "border-" + props.borderColor : "border";
    const borderColor = "border-left-" + statewiseColor;
    
    // const iconColorColor = props.state === "info"? "dark" : props.state === "success" ? "primary" : props.state === "error" ? "danger" : "dark";
    
    const [showState, setshowState] = useState("show");

    useEffect(() => {
        if (props.autohide) {
            var toastTimer = setTimeout(() => {
                setshowState("hide");
            }, props.delay || 3000);
        }

        return () => {
            clearTimeout(toastTimer);
        };
    });

    return (
        <>
            <div className="toast-container">
                <div
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    className={`toast fade ${props.layout != "chat" ?  "toast-comp": ""} ${props.state === "info" ? "toast-info" : props.state === "success"? "toast-success" : props.state === "error"? "toast-error" : "toast-basic"} ${showState} ${borderColor}`}
                    id="toastId"
                >
                    {props.showHeader && (
                        <div>
                            <div className="toast-header d-flex justify-content-between align-items-end pb-0">
                                <div className="me-2">
                                    {props.withIcon && (
                                        <RdsIcon
                                            name={props.iconName}
                                            stroke={true}
                                            
                                        ></RdsIcon>
                                    )}
                                </div>

                                <strong className="me-auto text-dark">
                                    {" "}
                                    {props.headerTitle}{" "}
                                </strong>
                                <button
                                    type="button"
                                    data-bs-dismiss="toast"
                                    aria-label="Close"
                                    className="btn-close btn-primary text-primary"
                                ></button>
                            </div>
                            <div className="toast-body">{props.message}</div>


                            <div className={`toast-footer justify-content-end align-items-end ${props.layout === "download" ? "d-block" : "d-none"}`}>
                                <div className="d-flex ml-4">
                                    <div className="progress w-100 ml-4" aria-valuenow={props.progressWidth} aria-valuemin={0} aria-valuemax={100}>
                                        <div className="progress-bar btn-primary" role="progressbar" 
                                            style={{ width: `${props.progressWidth}%`, textAlign: "center" }}
                                            aria-valuenow={props.progressWidth} 
                                            aria-valuemin={0} 
                                            aria-valuemax={100}></div>
                                    </div>
                                    <label className="progress-label ml-4">{props.progressWidth}%</label>
                                </div>
                                <label className="filename">{props.filename}</label>
                                <div className="d-flex toast-footer justify-content-end pb-1 pe-4">                                    
                                    <button type="button" className="btn text-primary btn-sm">Cancel</button>
                                    <button type="button" className="btn btn-primary btn-sm">Go To Downloads</button>
                                </div>
                            </div>

                            <div className={`toast-footer justify-content-end align-items-end pt-0 ${props.layout === "chat" ? "d-block" : "d-none"}`}>
                                <div className="d-flex ml-2 pl-2">
                                    <input type="text" className="form-control form-text pl-1" placeholder={props.placeholder} />
                                </div>
                                <div className="d-flex justify-justify-content-start mt-2">
                                    <button type="button" className="btn btn-primary btn-sm">Reply</button>
                                    <button type="button" className="btn text-primary btn-sm">Mark As Read</button>
                                </div>
                            </div>

                            <div className={`toast-footer justify-content-end align-items-end ${props.layout === "request" ? "d-block" : "d-none"}`}>
                                <div className="d-flex justify-content-end">
                                    <button type="button" className="btn text-primary btn-sm">Reject</button>
                                    <button type="button" className="btn btn-primary btn-sm">Accept</button>
                                </div>
                            </div>

                        </div>
                    )}

                    {!props.showHeader && (
                        <div className="m-1 toastbody ">
                            <div className="d-flex justify-content-between     align-items-center  ">
                                <div className="toast-body toastbody d-flex justify-content-between  align-items-end ">
                                    <div className="me-2">
                                        {props.withIcon && (
                                            <RdsIcon
                                                name={props.iconName}
                                                stroke={true}
                                                
                                            ></RdsIcon>
                                        )}
                                    </div>
                                    {props.message}
                                </div>
                                <button
                                    type="button"
                                    data-bs-dismiss="toast"
                                    aria-label="Close"
                                    className="btn-close btn-primary text-primary"
                                ></button>                                                                
                            </div>

                            <div className={`toast-footer pt-0 justify-content-end align-items-end ${props.layout === "download" ? "d-block" : "d-none"}`}>
                                <div className="d-flex ml-4">
                                    <div className="progress w-100" aria-valuenow={props.progressWidth} aria-valuemin={0} aria-valuemax={100}>
                                        <div className="progress-bar btn-primary" role="progressbar" 
                                            style={{ width: `${props.progressWidth}%`, textAlign: "center" }}
                                            aria-valuenow={props.progressWidth} 
                                            aria-valuemin={0} 
                                            aria-valuemax={100}></div>
                                    </div>
                                    <label className="progress-label justify-content-end ml-3">{props.progressWidth}%</label>
                                </div>
                                <label className="filename">{props.filename}</label>
                                <div className="d-flex toast-footer justify-content-end pe-4">
                                    <button type="button" className="btn text-primary btn-sm">Cancel</button>
                                    <button type="button" className="btn btn-primary btn-sm">Go To Downloads</button>
                                </div>
                            </div>

                            <div className={`toast-footer pt-0 justify-content-end align-items-end ${props.layout === "chat" ? "d-block" : "d-none"}`}>
                                <div className="d-flex">
                                    <input type="text" className="form-control form-text pl-1" placeholder={props.placeholder} />
                                </div>
                                <div className="d-flex toast-footer justify-justify-content-start pb-1 ps-2">
                                    <button type="button" className="btn btn-primary btn-sm">Reply</button>
                                    <button type="button" className="btn text-primary btn-sm">Mark As Read</button>
                                </div>
                            </div>
                            <div className={`pt-0 d-flex toast-footer justify-content-end align-items-end pb-1 pe-4 ${props.layout === "request" ? "d-block" : "d-none"}`}>
                                <button type="button" className="btn text-primary btn-sm">Reject</button>
                                <button type="button" className="btn btn-primary btn-sm">Accept</button>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
export default RdsToast;
