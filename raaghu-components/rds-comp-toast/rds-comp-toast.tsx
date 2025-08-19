import { useEffect, useState } from "react";
import "./rds-comp-toast.scss";
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import RdsProgress from '../../raaghu-elements/rds-progress/rds-progress';

export enum ToastLayout {
    Text = "text",
    Download = "download",
    Chat = "chat",
    Request = "request"
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

  export interface RdsCompToastProps {
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
const RdsCompToast = (props: RdsCompToastProps) => {
    const statewiseColor = props.state === "info" ? "dark" : props.state === "success" ? "primary" : props.state === "error" ? "danger" : "light";
    const borderColor = `rds-comp-toast--border-${statewiseColor}`;

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

    const getPositionClasses = () => {
        switch (props.position) {
            case 'topLeft': return 'rds-comp-toast__container--top-left';
            case 'topCenter': return 'rds-comp-toast__container--top-center';
            case 'topRight': return 'rds-comp-toast__container--top-right';
            case 'middleLeft': return 'rds-comp-toast__container--middle-left';
            case 'middleCenter': return 'rds-comp-toast__container--middle-center';
            case 'middleRight': return 'rds-comp-toast__container--middle-right';
            case 'bottomLeft': return 'rds-comp-toast__container--bottom-left';
            case 'bottomCenter': return 'rds-comp-toast__container--bottom-center';
            case 'bottomRight': return 'rds-comp-toast__container--bottom-right';
            default: return 'rds-comp-toast__container--top-left';
        }
    };

    return (
        <div className={`rds-comp-toast__container ${getPositionClasses()}`}>
            <div
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                className={`rds-comp-toast rds-comp-toast--${props.state} rds-comp-toast--${props.layout} ${borderColor} ${showState === "show" ? "rds-comp-toast--visible" : "rds-comp-toast--hidden"}`}
                id="toastId">
                {props.showHeader && (
                    <div className="rds-comp-toast__header">
                        <div className="rds-comp-toast__header-content">
                            <div className="rds-comp-toast__leading-icon">
                                {props.showLeading && (
                                    <span className={`rds-comp-toast__icon rds-comp-toast__icon--${props.leadingIcon}`}></span>
                                )}
                            </div>

                            <strong className="rds-comp-toast__title">
                                {props.headerText}
                            </strong>

                            <div className="rds-comp-toast__header-actions">
                                {props.layout === "chat" && props.chatTime && (
                                    <span className="rds-comp-toast__chat-time">{props.chatTime}</span>
                                )}
                                {props.showDismiss && props.layout !== "chat" && (
                                    <button
                                        type="button"
                                        className="rds-comp-toast__close-btn"
                                        aria-label="Close"
                                        onClick={() => setshowState("hide")}>
                                        <span className="rds-comp-toast__close-icon" aria-hidden="true">&times;</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {props.showSubText && (
                            <div className="rds-comp-toast__body">
                                {props.subText}
                            </div>
                        )}

                        {/* Download Layout Footer */}
                        {props.layout === "download" && (
                            <div className="rds-comp-toast__footer rds-comp-toast__footer--download">
                                <div className="rds-comp-toast__progress">
                                    <RdsProgress
                                        style="line"
                                        type="linear"
                                        value={props.progressWidth}
                                        variant="determinate"
                                        color="primary"
                                        showLabel={true}
                                        label={`${props.progressWidth}%`}
                                    />
                                </div>
                                <div className="rds-comp-toast__filename">{props.filename}</div>
                                <div className="rds-comp-toast__actions">
                                    <RdsButton className="rds-comp-toast__action-btn" style="transparent" inputSize="small">Cancel</RdsButton>
                                    <RdsButton className="rds-comp-toast__action-btn" style="filled" inputSize="small">Go To Downloads</RdsButton>
                                </div>
                            </div>
                        )}

                        {/* Chat Layout Footer */}
                        {props.layout === "chat" && (
                            <div className="rds-comp-toast__footer rds-comp-toast__footer--chat">
                                <div className="rds-comp-toast__input-group">
                                    <input 
                                        type="text" 
                                        className="rds-comp-toast__input" 
                                        placeholder={props.placeholder} />
                                </div>
                                <div className="rds-comp-toast__actions">
                                    <RdsButton className="rds-comp-toast__action-btn" style="filled" inputSize="small">Reply</RdsButton>
                                    <RdsButton className="rds-comp-toast__action-btn" style="transparent" inputSize="small">Mark As Read</RdsButton>
                                </div>
                            </div>
                        )}

                        {/* Request Layout Footer */}
                        {props.layout === "request" && (
                            <div className="rds-comp-toast__footer rds-comp-toast__footer--request">
                                <div className="rds-comp-toast__actions">
                                    <RdsButton className="rds-comp-toast__action-btn" style="transparent" inputSize="small">Reject</RdsButton>
                                    <RdsButton className="rds-comp-toast__action-btn" style="filled" inputSize="small">Accept</RdsButton>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {!props.showHeader && (
                    <div className="rds-comp-toast__content">
                        <div className="rds-comp-toast__body-simple">
                            {props.showLeading && (
                                <div className="rds-comp-toast__leading-icon">
                                    <span className={`rds-comp-toast__icon rds-comp-toast__icon--${props.leadingIcon}`}></span>
                                </div>
                            )}
                            
                            <div className="rds-comp-toast__text">
                                {props.showSubText && props.subText}
                            </div>
                            
                            {props.showDismiss && (
                                <button
                                    type="button"
                                    className="rds-comp-toast__close-btn"
                                    aria-label="Close"
                                    onClick={() => setshowState("hide")} >
                                    <span className="rds-comp-toast__close-icon" aria-hidden="true">&times;</span>
                                </button>
                            )}
                        </div>

                        {/* Download Layout Footer - Simple */}
                        {props.layout === "download" && (
                            <div className="rds-comp-toast__footer rds-comp-toast__footer--download">
                                <div className="rds-comp-toast__progress">
                                    <RdsProgress
                                        style="line"
                                        type="linear"
                                        value={props.progressWidth}
                                        variant="determinate"
                                        color="primary"
                                        showLabel={true}
                                        label={`${props.progressWidth}%`}
                                    />
                                </div>
                                <div className="rds-comp-toast__filename">{props.filename}</div>
                                <div className="rds-comp-toast__actions">
                                    <RdsButton style="transparent" inputSize="small">Cancel</RdsButton>
                                    <RdsButton style="filled" inputSize="small">Go To Downloads</RdsButton>
                                </div>
                            </div>
                        )}

                        {/* Chat Layout Footer - Simple */}
                        {props.layout === "chat" && (
                            <div className="rds-comp-toast__footer rds-comp-toast__footer--chat">
                                <div className="rds-comp-toast__input-group">
                                    <input 
                                        type="text" 
                                        className="rds-comp-toast__input" 
                                        placeholder={props.placeholder} 
                                    />
                                </div>
                                <div className="rds-comp-toast__actions">
                                    <RdsButton style="filled" inputSize="small">Reply</RdsButton>
                                    <RdsButton style="transparent" inputSize="small">Mark As Read</RdsButton>
                                </div>
                            </div>
                        )}

                        {/* Request Layout Footer - Simple */}
                        {props.layout === "request" && (
                            <div className="rds-comp-toast__footer rds-comp-toast__footer--request">
                                <div className="rds-comp-toast__actions">
                                    <RdsButton style="transparent" inputSize="small">Reject</RdsButton>
                                    <RdsButton style="filled" inputSize="small">Accept</RdsButton>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
RdsCompToast.displayName = "RdsCompToast";
export default RdsCompToast;