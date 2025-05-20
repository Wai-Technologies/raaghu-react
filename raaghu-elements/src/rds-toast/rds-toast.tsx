import React, { useEffect, useState } from "react";
import { colors } from "../../libs/types";
import "./rds-toast.css";
import RdsIcon from "../rds-icon/rds-icon";
import { toaster_placements } from "../../libs/types/placement";

export enum ToastLayout {
    Text = "text",
    Download = "download",
    Chat = "chat",
    Request = "request",
    Padded = "Padded",
  }
  
  export enum ToastState {
    Basic = "basic",
    Info = "info",
    Success = "success",
    Error = "error",
  }
  
  export enum ToastLeadingIcon {
    Circle = "circle",
    Plus = "plus",
  }
  
  export enum ToastPosition {
    TopLeft = "topLeft",
    TopCenter = "topCenter",
    TopRight = "topRight",
    MiddleLeft = "middleLeft",
    MiddleCenter = "middleCenter",
    MiddleRight = "middleRight",
    BottomLeft = "bottomLeft",
    BottomCenter = "bottomCenter",
    BottomRight = "bottomRight",
  }  

  export interface RdsToastProps {
    colorVariant?: colors; // color variant of Toast
    headerText?: string; // Header text of Toast
    subText: string; // Subtext of Toast
    delay?: number; // Delay Time of Toast
    autohide?: boolean; // Autohide of Toast
    borderColor?: string; // Border color of Toast
    showHeader?: boolean; // Show/Hide Header of Toast
    layout: ToastLayout; // Layout Types of Toast
    state: ToastState; // state of Toast
    placeholder?: string; // Placeholder text of Toast
    progressWidth?: number; // Progress Bar width of Toast
    filename?: string; // Filename of Toast
    position?: ToastPosition; // Position of Toast
    showSubText?: boolean; // Show/Hide Subtext of Toast
    showDismiss?: boolean; // Show/Hide Dismiss button of Toast
    showLeading: boolean; // Show/Hide Leading Icon of Toast
    leadingIcon: ToastLeadingIcon; // Leading Icon of Toast
    chatTime?: string; // Chat Time of Toast
  }
const RdsToast = (props: RdsToastProps) => {
    const statewiseColor = props.state === "info" ? "dark" : props.state === "success" ? "primary" : props.state === "error" ? "danger" : "light";
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

    const classes = () => {
        switch (props.position) {
            case 'topLeft': return '';
            case 'topCenter': return 'top-0 start-50 translate-middle-x';
            case 'topRight': return 'top-0 end-0';
            case 'middleLeft': return 'top-50 start-0 translate-middle-y';
            case 'middleCenter': return 'top-50 start-50 translate-middle';
            case 'middleRight': return 'top-50 end-0 translate-middle-y';
            case 'bottomLeft': return 'bottom-0 start-0';
            case 'bottomCenter': return 'bottom-0 start-50 translate-middle-x';
            case 'bottomRight': return 'bottom-0 end-0';
            default: return '';
        }
    };

    return (
        <>
            <div className={`toast-container position-fixed ${classes()}`}>
                <div
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    className={`toast fade ${props.layout != "chat" ? "toast-comp" : ""} ${props.state === "info" ? "toast-info" : props.state === "success" ? "toast-success" : props.state === "error" ? "toast-error" : "toast-basic"} ${showState} ${borderColor}`}
                    id="toastId"
                >
                    {props.showHeader && (
                        <div>
                            <div className="toast-header d-flex justify-content-between align-items-end pb-0">
                            <div className={props.showLeading ? "me-2" : ""}>
                                    {props.showLeading && (
                                        <RdsIcon
                                            name={props.leadingIcon}
                                            stroke={true}
                                            height="20px"
                                            isCursorPointer
                                            width="20px"
                                        ></RdsIcon>
                                    )}
                                </div>

                                <strong className="me-auto ps-1 text-dark">
                                    {" "}
                                    {props.headerText}{" "}
                                </strong>
                                {props.showDismiss && props.layout !== "chat" && 
                                    <button
                                        type="button"
                                        data-bs-dismiss="toast"
                                        aria-label="Close"
                                        className="btn-close"
                                    ></button>
                                }
                                {
                                   props.layout == "chat" && <span>{props.chatTime}</span>
                                }
                            </div>
                            <div className="toast-body ms-3 ps-4 text-body">{props.showSubText && props.subText}</div>


                            <div className={`toast-footer justify-content-end p-2 align-items-end ms-3 ps-4 ${props.layout === "download" ? "d-block" : "d-none"}`}>
                                <div className="d-flex text-body ml-4">
                                    <div className="progress w-100 ml-4 mt-1" aria-valuenow={props.progressWidth} aria-valuemin={0} aria-valuemax={100}>
                                        <div className="progress-bar btn-primary" role="progressbar"
                                            style={{ width: `${props.progressWidth}%`, textAlign: "center" }}
                                            aria-valuenow={props.progressWidth}
                                            aria-valuemin={0}
                                            aria-valuemax={100}></div>
                                    </div>
                                    <label className="progress-label ml-4 px-1">{props.progressWidth}%</label>
                                </div>
                                <label className="filename text-body">{props.filename}</label>
                                <div className="d-flex toast-footer justify-content-end pb-1 pe-4 gap-2">
                                    <button type="button" className="btn text-primary btn-sm">Cancel</button>
                                    <button type="button" className="btn btn-primary btn-sm">Go To Downloads</button>
                                </div>
                            </div>

                            <div className={`toast-footer justify-content-end align-items-end ms-3 ps-4 pt-0 ${props.layout === "chat" ? "d-block" : "d-none"}`}>
                                <div className="d-flex ml-2 pl-2">
                                    <input type="text" className="form-control form-text pl-1" placeholder={props.placeholder} />
                                </div>
                                <div className="d-flex justify-justify-content-start mt-2 gap-2">
                                    <button type="button" className="btn btn-primary btn-sm">Reply</button>
                                    <button type="button" className="btn text-primary btn-sm">Mark As Read</button>
                                </div>
                            </div>

                            <div className={`toast-footer justify-content-end align-items-end ${props.layout === "request" ? "d-block" : "d-none"}`}>
                                <div className="d-flex justify-content-end gap-2">
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
                                <div className={props.showLeading ? "me-2" : ""}>
                                        {props.showLeading && (
                                            <RdsIcon
                                                name={props.leadingIcon}
                                                stroke={true}

                                            ></RdsIcon>
                                        )}
                                    </div>
                                    {props.showSubText && props.subText}
                                </div>
                                {props.showDismiss && 
                                    <button
                                        type="button"
                                        data-bs-dismiss="toast"
                                        aria-label="Close"
                                        className="btn-close"
                                    ></button>
                               }
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
                                <div className="d-flex toast-footer justify-content-end pe-4 gap-2">
                                    <button type="button" className="btn text-primary btn-sm">Cancel</button>
                                    <button type="button" className="btn btn-primary btn-sm">Go To Downloads</button>
                                </div>
                            </div>

                            <div className={`toast-footer pt-0 justify-content-end align-items-end ${props.layout === "chat" ? "d-block" : "d-none"}`}>
                                <div className="d-flex">
                                    <input type="text" className="form-control form-text pl-1" placeholder={props.placeholder} />
                                </div>
                                <div className="d-flex toast-footer justify-justify-content-start pb-1 ps-2 gap-2">
                                    <button type="button" className="btn btn-primary btn-sm">Reply</button>
                                    <button type="button" className="btn text-primary btn-sm">Mark As Read</button>
                                </div>
                            </div>
                            <div className={`pt-0 d-flex toast-footer justify-content-end align-items-end pb-1 pe-4 gap-2 ${props.layout === "request" ? "d-block" : "d-none"}`}>
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
