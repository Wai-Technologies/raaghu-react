import clsx from "clsx";
import { useCallback } from "react";
import "./rds-comp-toast.scss";
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import RdsProgress from '../../raaghu-elements/rds-progress/rds-progress';
import {
    getLeadingIconClass,
    getLayoutClass,
    getPositionClasses,
    getStateClass,
    useToastTimer,
} from "./toast-helpers";

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
    pauseOnHover?: boolean; // Pause auto-hide timer on mouse hover (WCAG 2.2.1)
  }
const ToastFooter = ({
    layout,
    progressWidth,
    filename,
    placeholder,
    includeButtonClassName,
}: {
    layout: ToastLayout;
    progressWidth?: number;
    filename?: string;
    placeholder?: string;
    includeButtonClassName: boolean;
}) => {
    const buttonClassName = includeButtonClassName ? "rds-comp-toast__action-btn" : undefined;
    if (layout === ToastLayout.Download) {
        return (
            <div className="rds-comp-toast__footer rds-comp-toast__footer--download">
                <div className="rds-comp-toast__progress">
                    <RdsProgress
                        style="line"
                        type="linear"
                        value={progressWidth}
                        variant="determinate"
                        color="primary"
                        showLabel={true}
                        label={`${progressWidth}%`}
                    />
                </div>
                <div className="rds-comp-toast__filename">{filename}</div>
                <div className="rds-comp-toast__actions">
                    <RdsButton className={buttonClassName} style="transparent" textCase="capitalize" size="small">Cancel</RdsButton>
                    <RdsButton className={buttonClassName} style="filled" textCase="capitalize" size="small">Go To Downloads</RdsButton>
                </div>
            </div>
        );
    }
    if (layout === ToastLayout.Chat) {
        return (
            <div className="rds-comp-toast__footer rds-comp-toast__footer--chat">
                <div className="rds-comp-toast__input-group">
                    <input
                        type="text"
                        className="rds-comp-toast__input"
                        placeholder={placeholder}
                    />
                </div>
                <div className="rds-comp-toast__actions">
                    <RdsButton className={buttonClassName} style="filled" textCase="capitalize" size="small">Reply</RdsButton>
                    <RdsButton className={buttonClassName} style="transparent" textCase="capitalize" size="small">Mark As Read</RdsButton>
                </div>
            </div>
        );
    }
    if (layout === ToastLayout.Request) {
        return (
            <div className="rds-comp-toast__footer rds-comp-toast__footer--request">
                <div className="rds-comp-toast__actions">
                    <RdsButton className={buttonClassName} style="transparent" textCase="capitalize" size="small">Reject</RdsButton>
                    <RdsButton className={buttonClassName} style="filled" textCase="capitalize" size="small">Accept</RdsButton>
                </div>
            </div>
        );
    }
    return null;
};

const BORDER_TOKEN_MAP: Record<string, string> = {
    basic: 'light',
    info: 'dark',
    success: 'primary',
    error: 'danger',
};

const RdsCompToast = (props: RdsCompToastProps) => {
    const _stateClass = getStateClass(props.state);
    const borderColor = `rds-comp-toast--border-${BORDER_TOKEN_MAP[_stateClass] || 'light'}`;

    const { showState, setShowState, pauseTimer, resumeTimer } = useToastTimer(props.autohide, props.delay);
    const hideToast = useCallback(() => setShowState("hide"), [setShowState]);

    return (
        <div className={clsx("rds-comp-toast__container", getPositionClasses(props.position))}>
            <div
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                className={clsx(
                  "rds-comp-toast",
                  `rds-comp-toast--${getStateClass(props.state)}`,
                  `rds-comp-toast--${getLayoutClass(props.layout)}`,
                  borderColor,
                  showState === "show" ? "rds-comp-toast--visible" : "rds-comp-toast--hidden"
                )}
                id="toastId"
                onMouseEnter={props.autohide && props.pauseOnHover ? pauseTimer : undefined}
                onMouseLeave={props.autohide && props.pauseOnHover ? resumeTimer : undefined}
            >
                {props.showHeader && (
                    <div className="rds-comp-toast__header">
                        <div className="rds-comp-toast__header-content">
                            <div className="rds-comp-toast__leading-icon">
                                {props.showLeading && props.layout !== ToastLayout.Chat && (
                                    <span className={clsx("rds-comp-toast__icon", `rds-comp-toast__icon--${getLeadingIconClass(props.leadingIcon)}`)}></span>
                                )}
                            </div>

                            <strong className="rds-comp-toast__title">
                                {props.headerText}
                            </strong>

                            <div className="rds-comp-toast__header-actions">
                                {props.layout === ToastLayout.Chat && props.chatTime && (
                                    <span className="rds-comp-toast__chat-time">{props.chatTime}</span>
                                )}
                                {props.showDismiss && props.layout !== ToastLayout.Chat && (
                                    <button
                                        type="button"
                                        className="rds-comp-toast__close-btn"
                                        aria-label="Close"
                                        onClick={hideToast}>
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

                        <ToastFooter
                            layout={props.layout}
                            progressWidth={props.progressWidth}
                            filename={props.filename}
                            placeholder={props.placeholder}
                            includeButtonClassName={true}
                        />
                    </div>
                )}

                {!props.showHeader && (
                    <div className="rds-comp-toast__content">
                        <div className="rds-comp-toast__body-simple">
                            {props.showLeading && props.layout !== ToastLayout.Chat && (
                                <div className="rds-comp-toast__leading-icon">
                                    <span className={clsx("rds-comp-toast__icon", `rds-comp-toast__icon--${getLeadingIconClass(props.leadingIcon)}`)}></span>
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
                                    onClick={hideToast} >
                                    <span className="rds-comp-toast__close-icon" aria-hidden="true">&times;</span>
                                </button>
                            )}
                        </div>
                        <ToastFooter
                            layout={props.layout}
                            progressWidth={props.progressWidth}
                            filename={props.filename}
                            placeholder={props.placeholder}
                            includeButtonClassName={false}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
ToastFooter.displayName = "ToastFooter";
RdsCompToast.displayName = "RdsCompToast";
export default RdsCompToast;