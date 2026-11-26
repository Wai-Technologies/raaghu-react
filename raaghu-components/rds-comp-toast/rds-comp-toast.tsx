import clsx from "clsx";
import { forwardRef, useCallback, type ReactNode, type SyntheticEvent } from "react";
import Box from "@mui/material/Box";
import "./rds-comp-toast.scss";
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import RdsProgress from '../../raaghu-elements/rds-progress/rds-progress';
import { resolveDeprecatedProp, warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import {
        type RdsCompToastProps,
        ToastLayout,
        ToastState,
} from "./rds-comp-toast.types";
import {
    getLeadingIconClass,
    getLayoutClass,
    getPositionClasses,
    getStateClass,
    useToastTimer,
} from "./toast-helpers";

const ToastFooter = ({
    layout,
    progressWidth,
    filename,
    placeholder,
    includeButtonClassName,
    action,
}: {
    layout: ToastLayout;
    progressWidth?: number;
    filename?: string;
    placeholder?: string;
    includeButtonClassName: boolean;
    action?: ReactNode;
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
                <div className="rds-comp-toast__actions">{action ?? (
                        <>
                    <RdsButton className={buttonClassName} style="transparent" textCase="capitalize" size="small">Cancel</RdsButton>
                    <RdsButton className={buttonClassName} style="filled" textCase="capitalize" size="small">Go To Downloads</RdsButton>
                        </>
                    )}</div>
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
                        aria-label={placeholder || 'Toast reply input'}
                    />
                </div>
                <div className="rds-comp-toast__actions">{action ?? (
                        <>
                    <RdsButton className={buttonClassName} style="filled" textCase="capitalize" size="small">Reply</RdsButton>
                    <RdsButton className={buttonClassName} style="transparent" textCase="capitalize" size="small">Mark As Read</RdsButton>
                        </>
                    )}</div>
            </div>
        );
    }
    if (layout === ToastLayout.Request) {
        return (
            <div className="rds-comp-toast__footer rds-comp-toast__footer--request">
                <div className="rds-comp-toast__actions">{action ?? (
                        <>
                    <RdsButton className={buttonClassName} style="transparent" textCase="capitalize" size="small">Reject</RdsButton>
                    <RdsButton className={buttonClassName} style="filled" textCase="capitalize" size="small">Accept</RdsButton>
                        </>
                    )}</div>
            </div>
        );
    }
    return null;
};

const BORDER_TOKEN_MAP: Record<string, string> = {
    basic: 'basic',
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
};

const RdsCompToast = forwardRef<HTMLDivElement, RdsCompToastProps>(function RdsCompToast(props, ref) {
    const legacyShowHeader = typeof props['showHeader'] === 'boolean' ? (props['showHeader'] as boolean) : undefined;
    const legacyShowLeading = typeof props['showLeading'] === 'boolean' ? (props['showLeading'] as boolean) : undefined;
    const legacyShowDismiss = typeof props['showDismiss'] === 'boolean' ? (props['showDismiss'] as boolean) : undefined;
    const legacyShowSubText = typeof props['showSubText'] === 'boolean' ? (props['showSubText'] as boolean) : undefined;

    const showHeader = props.chrome?.header ? props.chrome.header === 'visible' : (legacyShowHeader ?? false);
    const showLeading = props.chrome?.leading ? props.chrome.leading === 'visible' : (legacyShowLeading ?? false);
    const showDismiss = props.chrome?.dismiss ? props.chrome.dismiss === 'visible' : (legacyShowDismiss ?? false);
    const showSubText = props.chrome?.subText ? props.chrome.subText === 'visible' : (legacyShowSubText ?? false);

    if (props.severity !== undefined) warnDeprecatedProp('RdsCompToast', 'severity', '`color`');
    if (props.state !== undefined) warnDeprecatedProp('RdsCompToast', 'state', '`color`');
    const resolvedState =
      resolveDeprecatedProp(props.color, props.severity, 'RdsCompToast', 'severity', '`color`')
      ?? props.state
      ?? ToastState.Basic;
    const _stateClass = getStateClass(resolvedState);
    const borderColor = `rds-comp-toast--border-${BORDER_TOKEN_MAP[_stateClass] || 'light'}`;

    const { onClose } = props;
    const handleTimeout = useCallback(() => onClose?.(null, 'timeout'), [onClose]);
    const { showState: innerState, setShowState, pauseTimer, resumeTimer } = useToastTimer(props.autohide, props.delay, handleTimeout);
    const showState = props.open !== undefined ? (props.open ? "show" : "hide") : innerState;
    const hideToast = useCallback((event: SyntheticEvent) => {
        setShowState("hide");
        onClose?.(event, 'closeClick');
    }, [setShowState, onClose]);

    return (
        <Box ref={ref} className={clsx("rds-comp-toast__container", getPositionClasses(props.position), props.className)} sx={props.sx} style={props.style}>
            <div
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                className={clsx(
                  "rds-comp-toast",
                  `rds-comp-toast--${getStateClass(resolvedState)}`,
                  `rds-comp-toast--${getLayoutClass(props.layout)}`,
                  borderColor,
                  showState === "show" ? "rds-comp-toast--visible" : "rds-comp-toast--hidden"
                )}
                id="toastId"
                onMouseEnter={props.autohide && props.pauseOnHover ? pauseTimer : undefined}
                onMouseLeave={props.autohide && props.pauseOnHover ? resumeTimer : undefined}
            >
                {showHeader && (
                    <div className="rds-comp-toast__header">
                        <div className="rds-comp-toast__header-content">
                            <div className="rds-comp-toast__leading-icon">
                                {showLeading && props.layout !== ToastLayout.Chat && (
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
                                {showDismiss && (
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
                        
                        {showSubText && (
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
                            action={props.action}
                        />
                    </div>
                )}

                {!showHeader && (
                    <div className="rds-comp-toast__content">
                        <div className="rds-comp-toast__body-simple">
                            {showLeading && props.layout !== ToastLayout.Chat && (
                                <div className="rds-comp-toast__leading-icon">
                                    <span className={clsx("rds-comp-toast__icon", `rds-comp-toast__icon--${getLeadingIconClass(props.leadingIcon)}`)}></span>
                                </div>
                            )}
                            
                            <div className="rds-comp-toast__text">
                                {showSubText && props.subText}
                            </div>
                            
                            {showDismiss && (
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
                            action={props.action}
                        />
                    </div>
                )}
            </div>
        </Box>
    );
});
ToastFooter.displayName = "ToastFooter";
RdsCompToast.displayName = "RdsCompToast";
export default RdsCompToast;