import clsx from "clsx";
import { useCallback, type ReactNode, type SyntheticEvent } from "react";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import "./rds-comp-toast.scss";
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import RdsProgress from '../../raaghu-elements/rds-progress/rds-progress';
import {
        type RdsCompToastProps,
        ToastLayout,
        ToastLeadingIcon,
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
    action?: ReactNode;
    layout: RdsCompToastProps["layout"];
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
                        value={progressWidth}
                        variant="determinate"
                        color="primary"
                        showLabel={true}
                        label={`${progressWidth}%`}
                    />
                </div>
                <div className="rds-comp-toast__filename">{filename}</div>
                <div className="rds-comp-toast__actions">
                    {action ?? (<>
                    <RdsButton className={buttonClassName} style="transparent" textCase="capitalize" size="small">Cancel</RdsButton>
                    <RdsButton className={buttonClassName} style="filled" textCase="capitalize" size="small">Go To Downloads</RdsButton>
                    </>)}
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
                        aria-label={placeholder || 'Toast reply input'}
                    />
                </div>
                <div className="rds-comp-toast__actions">
                    {action ?? (<>
                    <RdsButton className={buttonClassName} style="filled" textCase="capitalize" size="small">Reply</RdsButton>
                    <RdsButton className={buttonClassName} style="transparent" textCase="capitalize" size="small">Mark As Read</RdsButton>
                    </>)}
                </div>
            </div>
        );
    }
    if (layout === ToastLayout.Request) {
        return (
            <div className="rds-comp-toast__footer rds-comp-toast__footer--request">
                <div className="rds-comp-toast__actions">
                    {action ?? (<>
                    <RdsButton className={buttonClassName} style="transparent" textCase="capitalize" size="small">Reject</RdsButton>
                    <RdsButton className={buttonClassName} style="filled" textCase="capitalize" size="small">Accept</RdsButton>
                    </>)}
                </div>
            </div>
        );
    }
    if (action) {
        return (
            <div className="rds-comp-toast__footer">
                <div className="rds-comp-toast__actions">{action}</div>
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
    const legacyShowHeader = typeof props['showHeader'] === 'boolean' ? (props['showHeader'] as boolean) : undefined;
    const legacyShowLeading = typeof props['showLeading'] === 'boolean' ? (props['showLeading'] as boolean) : undefined;
    const legacyShowDismiss = typeof props['showDismiss'] === 'boolean' ? (props['showDismiss'] as boolean) : undefined;
    const legacyShowSubText = typeof props['showSubText'] === 'boolean' ? (props['showSubText'] as boolean) : undefined;

    const showHeader = props.chrome?.header ? props.chrome.header === 'visible' : (legacyShowHeader ?? false);
    const showLeading = props.chrome?.leading ? props.chrome.leading === 'visible' : (legacyShowLeading ?? false);
    const showDismiss = props.chrome?.dismiss ? props.chrome.dismiss === 'visible' : (legacyShowDismiss ?? false);
    const showSubText = props.chrome?.subText ? props.chrome.subText === 'visible' : (legacyShowSubText ?? false);

    if (props.headerText !== undefined) warnDeprecatedProp('RdsCompToast', 'headerText', '`title`');
    if (props.subText !== undefined) warnDeprecatedProp('RdsCompToast', 'subText', '`message`');
    if (props.delay !== undefined) warnDeprecatedProp('RdsCompToast', 'delay', '`autoHideDuration`');
    if (props.autohide !== undefined) warnDeprecatedProp('RdsCompToast', 'autohide', '`autoHideDuration`');
    const titleText = props.title ?? props.headerText;
    const messageText = props.message ?? props.subText;
    const { autoHideDuration } = props;
    const effectiveAutohide = autoHideDuration !== undefined ? autoHideDuration !== null : props.autohide;
    const effectiveDelay = typeof autoHideDuration === 'number' ? autoHideDuration : props.delay;

    const _stateClass = getStateClass(props.state);
    const borderColor = `rds-comp-toast--border-${BORDER_TOKEN_MAP[_stateClass] || 'light'}`;

    const { onClose } = props;
    const handleTimeout = useCallback(() => onClose?.(null, 'timeout'), [onClose]);
    const { showState: innerState, setShowState, pauseTimer, resumeTimer } = useToastTimer(effectiveAutohide, effectiveDelay, handleTimeout);
    const showState = props.open !== undefined ? (props.open ? "show" : "hide") : innerState;
    const hideToast = useCallback((event: SyntheticEvent) => {
        setShowState("hide");
        onClose?.(event, 'closeClick');
    }, [setShowState, onClose]);

    return (
        <div className={clsx("rds-comp-toast__container", getPositionClasses(props.position))}>
            <div
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                className={clsx(
                  "rds-comp-toast",
                  `rds-comp-toast--${_stateClass}`,
                  `rds-comp-toast--${getLayoutClass(props.layout)}`,
                  borderColor,
                  showState === "show" ? "rds-comp-toast--visible" : "rds-comp-toast--hidden"
                )}
                id="toastId"
                onMouseEnter={effectiveAutohide && props.pauseOnHover ? pauseTimer : undefined}
                onMouseLeave={effectiveAutohide && props.pauseOnHover ? resumeTimer : undefined}
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
                                {titleText}
                            </strong>

                            <div className="rds-comp-toast__header-actions">
                                {props.layout === ToastLayout.Chat && props.chatTime && (
                                    <span className="rds-comp-toast__chat-time">{props.chatTime}</span>
                                )}
                                {showDismiss && props.layout !== ToastLayout.Chat && (
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
                                {messageText}
                            </div>
                        )}

                        <ToastFooter
                            layout={props.layout}
                            action={props.action}
                            progressWidth={props.progressWidth}
                            filename={props.filename}
                            placeholder={props.placeholder}
                            includeButtonClassName={true}
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
                                {showSubText && messageText}
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
                            action={props.action}
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