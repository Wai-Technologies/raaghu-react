import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useMotionTokens } from "../../raaghu-react-themes/src/motion";
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
    headerText?: string;
    subText: string;
    delay?: number;
    autohide?: boolean;
    showHeader?: boolean;
    layout: ToastLayout;
    state: ToastState;
    placeholder?: string;
    progressWidth?: number;
    filename?: string;
    position?: ToastPosition;
    showSubText?: boolean;
    showDismiss?: boolean;
    showLeading: boolean;
    leadingIcon: ToastLeadingIcon;
    chatTime?: string;
    pauseOnHover?: boolean;
    animationDuration?: number;
  }
const RdsCompToast = (props: RdsCompToastProps) => {
    const shouldReduce = useReducedMotion();
    const motionTokens = useMotionTokens();
    const dur = typeof props.animationDuration === 'number' ? props.animationDuration / 1000 : motionTokens.base;

    const isBottom = props.position?.startsWith('bottom') ?? false;
    const slideY = isBottom ? 32 : -32;

    const getStateClass = (state: ToastState): string => {
        switch (state) {
            case ToastState.Info: return 'info';
            case ToastState.Success: return 'success';
            case ToastState.Error: return 'error';
            case ToastState.Basic:
            default: return 'basic';
        }
    };

    const getLayoutClass = (layout: ToastLayout): string => {
        switch (layout) {
            case ToastLayout.Download: return 'download';
            case ToastLayout.Chat: return 'chat';
            case ToastLayout.Request: return 'request';
            case ToastLayout.Text:
            default: return 'text';
        }
    };

    const getLeadingIconClass = (leadingIcon: ToastLeadingIcon): string => {
        switch (leadingIcon) {
            case ToastLeadingIcon.Plus: return 'plus';
            case ToastLeadingIcon.Circle:
            default: return 'circle';
        }
    };

    // Legacy border class mapping (keeps compatibility with existing tests/styles)
    const _stateClass = getStateClass(props.state);
    const borderTokenMap: Record<string, string> = {
        basic: 'light',
        info: 'dark',
        success: 'primary',
        error: 'danger',
    };
    const borderColor = `rds-comp-toast--border-${borderTokenMap[_stateClass] || 'light'}`;

    const [showState, setshowState] = useState("show");
    const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>();
    const remainingRef = useRef<number>(props.delay ?? 3000);
    const startTimeRef = useRef<number>(0);

    const startTimer = (duration: number) => {
        startTimeRef.current = Date.now();
        timerRef.current = setTimeout(() => setshowState("hide"), duration);
    };

    const pauseTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            remainingRef.current -= Date.now() - startTimeRef.current;
        }
    };

    const resumeTimer = () => {
        if (remainingRef.current > 0) startTimer(remainingRef.current);
    };

    useEffect(() => {
        if (props.autohide) {
            remainingRef.current = props.delay ?? 3000;
            startTimer(remainingRef.current);
        }
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [props.autohide, props.delay]);

    const getPositionClasses = () => {
        switch (props.position) {
            case ToastPosition.TopLeft: return 'rds-comp-toast__container--top-left';
            case ToastPosition.TopCenter: return 'rds-comp-toast__container--top-center';
            case ToastPosition.TopRight: return 'rds-comp-toast__container--top-right';
            case ToastPosition.MiddleLeft: return 'rds-comp-toast__container--middle-left';
            case ToastPosition.MiddleCenter: return 'rds-comp-toast__container--middle-center';
            case ToastPosition.MiddleRight: return 'rds-comp-toast__container--middle-right';
            case ToastPosition.BottomLeft: return 'rds-comp-toast__container--bottom-left';
            case ToastPosition.BottomCenter: return 'rds-comp-toast__container--bottom-center';
            case ToastPosition.BottomRight: return 'rds-comp-toast__container--bottom-right';
            default: return 'rds-comp-toast__container--top-left';
        }
    };

    return (
        <div className={`rds-comp-toast__container ${getPositionClasses()}`}>
            <AnimatePresence>
            {showState === "show" && (
            <motion.div
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                className={`rds-comp-toast rds-comp-toast--${getStateClass(props.state)} rds-comp-toast--${getLayoutClass(props.layout)} ${borderColor}`}
                id="toastId"
                initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: slideY }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: slideY }}
                transition={shouldReduce ? { duration: 0 } : { duration: dur, ease: [0.4, 0, 0.2, 1] }}
                onMouseEnter={props.autohide && props.pauseOnHover ? pauseTimer : undefined}
                onMouseLeave={props.autohide && props.pauseOnHover ? resumeTimer : undefined}
            >
                {props.showHeader && (
                    <div className="rds-comp-toast__header">
                        <div className="rds-comp-toast__header-content">
                            <div className="rds-comp-toast__leading-icon">
                                {props.showLeading && props.layout !== ToastLayout.Chat && (
                                    <span className={`rds-comp-toast__icon rds-comp-toast__icon--${getLeadingIconClass(props.leadingIcon)}`}></span>
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
                        {props.layout === ToastLayout.Download && (
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
                                    <RdsButton className="rds-comp-toast__action-btn" style="transparent" textCase="capitalize" size="small">Cancel</RdsButton>
                                    <RdsButton className="rds-comp-toast__action-btn" style="filled" textCase="capitalize" size="small">Go To Downloads</RdsButton>
                                </div>
                            </div>
                        )}

                        {props.layout === ToastLayout.Chat && (
                            <div className="rds-comp-toast__footer rds-comp-toast__footer--chat">
                                <div className="rds-comp-toast__input-group">
                                    <input 
                                        type="text" 
                                        className="rds-comp-toast__input" 
                                        placeholder={props.placeholder} />
                                </div>
                                <div className="rds-comp-toast__actions">
                                    <RdsButton className="rds-comp-toast__action-btn" style="filled" textCase="capitalize" size="small">Reply</RdsButton>
                                    <RdsButton className="rds-comp-toast__action-btn" style="transparent" textCase="capitalize" size="small">Mark As Read</RdsButton>
                                </div>
                            </div>
                        )}

                        {props.layout === ToastLayout.Request && (
                            <div className="rds-comp-toast__footer rds-comp-toast__footer--request">
                                <div className="rds-comp-toast__actions">
                                    <RdsButton className="rds-comp-toast__action-btn" style="transparent" textCase="capitalize" size="small">Reject</RdsButton>
                                    <RdsButton className="rds-comp-toast__action-btn" style="filled" textCase="capitalize" size="small">Accept</RdsButton>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {!props.showHeader && (
                    <div className="rds-comp-toast__content">
                        <div className="rds-comp-toast__body-simple">
                            {props.showLeading && props.layout !== ToastLayout.Chat && (
                                <div className="rds-comp-toast__leading-icon">
                                    <span className={`rds-comp-toast__icon rds-comp-toast__icon--${getLeadingIconClass(props.leadingIcon)}`}></span>
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

                        {props.layout === ToastLayout.Download && (
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
                                    <RdsButton style="transparent" textCase="capitalize" size="small">Cancel</RdsButton>
                                    <RdsButton style="filled" textCase="capitalize" size="small">Go To Downloads</RdsButton>
                                </div>
                            </div>
                        )}

                        {props.layout === ToastLayout.Chat && (
                            <div className="rds-comp-toast__footer rds-comp-toast__footer--chat">
                                <div className="rds-comp-toast__input-group">
                                    <input 
                                        type="text" 
                                        className="rds-comp-toast__input" 
                                        placeholder={props.placeholder} 
                                    />
                                </div>
                                <div className="rds-comp-toast__actions">
                                    <RdsButton style="filled" textCase="capitalize" size="small">Reply</RdsButton>
                                    <RdsButton style="transparent" textCase="capitalize" size="small">Mark As Read</RdsButton>
                                </div>
                            </div>
                        )}

                        {props.layout === ToastLayout.Request && (
                            <div className="rds-comp-toast__footer rds-comp-toast__footer--request">
                                <div className="rds-comp-toast__actions">
                                    <RdsButton style="transparent" textCase="capitalize" size="small">Reject</RdsButton>
                                    <RdsButton style="filled" textCase="capitalize" size="small">Accept</RdsButton>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
};
RdsCompToast.displayName = "RdsCompToast";
export default RdsCompToast;