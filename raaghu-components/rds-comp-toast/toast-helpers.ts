import { useCallback, useEffect, useRef, useState } from "react";
import { ToastLayout, ToastLeadingIcon, ToastPosition, ToastSeverity, type ToastAnchorOrigin } from "./rds-comp-toast.types";

export const getStateClass = (severity?: ToastSeverity | `${ToastSeverity}`): string => {
    const stateClass: Record<string, string> = {
        [ToastSeverity.Info]: "info",
        [ToastSeverity.Success]: "success",
        [ToastSeverity.Warning]: "warning",
        [ToastSeverity.Error]: "error",
        [ToastSeverity.Basic]: "basic",
    };
    return stateClass[severity ?? ToastSeverity.Basic] ?? stateClass[ToastSeverity.Basic];
};

export const getLayoutClass = (layout: ToastLayout | `${ToastLayout}`): string => {
    const layoutClass: Record<string, string> = {
        [ToastLayout.Download]: "download",
        [ToastLayout.Chat]: "chat",
        [ToastLayout.Request]: "request",
        [ToastLayout.Text]: "text",
    };
    return layoutClass[layout] ?? layoutClass[ToastLayout.Text];
};

export const getLeadingIconClass = (leadingIcon?: ToastLeadingIcon | `${ToastLeadingIcon}`): string => {
    const iconClass: Record<string, string> = {
        [ToastLeadingIcon.Plus]: "plus",
        [ToastLeadingIcon.Circle]: "circle",
    };
    return iconClass[leadingIcon ?? ToastLeadingIcon.Circle] ?? iconClass[ToastLeadingIcon.Circle];
};

export const getPositionClasses = (position?: ToastPosition | `${ToastPosition}`) => {
    const positionClass: Record<string, string> = {
        [ToastPosition.TopLeft]: "rds-comp-toast__container--top-left",
        [ToastPosition.TopCenter]: "rds-comp-toast__container--top-center",
        [ToastPosition.TopRight]: "rds-comp-toast__container--top-right",
        [ToastPosition.MiddleLeft]: "rds-comp-toast__container--middle-left",
        [ToastPosition.MiddleCenter]: "rds-comp-toast__container--middle-center",
        [ToastPosition.MiddleRight]: "rds-comp-toast__container--middle-right",
        [ToastPosition.BottomLeft]: "rds-comp-toast__container--bottom-left",
        [ToastPosition.BottomCenter]: "rds-comp-toast__container--bottom-center",
        [ToastPosition.BottomRight]: "rds-comp-toast__container--bottom-right",
    };
    return position ? positionClass[position] : positionClass[ToastPosition.TopLeft];
};

export const anchorToPosition = ({ vertical, horizontal }: ToastAnchorOrigin) =>
    `${vertical}${horizontal.charAt(0).toUpperCase()}${horizontal.slice(1)}` as `${ToastPosition}`;

export const resolveToastPosition = (
    anchorOrigin?: ToastAnchorOrigin,
    position?: ToastPosition | `${ToastPosition}`,
) => {
    const { vertical, horizontal } = anchorOrigin ?? {};
    if (vertical && horizontal) {
        return anchorToPosition({ vertical, horizontal });
    }
    return position;
};

export const useToastTimer = (
    autohide?: boolean,
    delay?: number,
    onTimeout?: () => void,
    open?: boolean,
) => {
    const onTimeoutRef = useRef(onTimeout);
    useEffect(() => {
        onTimeoutRef.current = onTimeout;
    }, [onTimeout]);
    const [showState, setShowState] = useState("show");
    const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const remainingRef = useRef<number>(delay ?? 3000);
    const startTimeRef = useRef<number>(0);
    const prevOpenRef = useRef(open);

    const clearTimer = useCallback(() => {
        if (timerRef.current !== undefined) {
            clearTimeout(timerRef.current);
            timerRef.current = undefined;
        }
    }, []);

    const startTimer = useCallback((duration: number) => {
        clearTimer();
        startTimeRef.current = Date.now();
        timerRef.current = setTimeout(() => {
            timerRef.current = undefined;
            setShowState("hide");
            onTimeoutRef.current?.();
        }, duration);
    }, [clearTimer]);

    const pauseTimer = useCallback(() => {
        if (timerRef.current === undefined) return;
        clearTimeout(timerRef.current);
        timerRef.current = undefined;
        remainingRef.current -= Date.now() - startTimeRef.current;
    }, []);

    const resumeTimer = useCallback(() => {
        if (timerRef.current !== undefined) return;
        if (remainingRef.current > 0) {
            startTimer(remainingRef.current);
        }
    }, [startTimer]);

    useEffect(() => {
        if (autohide) {
            remainingRef.current = delay ?? 3000;
            startTimer(remainingRef.current);
        }
        return () => {
            clearTimer();
        };
    }, [autohide, delay, startTimer, clearTimer]);

    useEffect(() => {
        const wasOpen = prevOpenRef.current;
        prevOpenRef.current = open;
        if (!autohide || open === undefined) return;
        if (wasOpen === false && open === true) {
            remainingRef.current = delay ?? 3000;
            setShowState("show");
            startTimer(remainingRef.current);
        }
        if (open === false) {
            clearTimer();
        }
    }, [open, autohide, delay, startTimer, clearTimer]);

    return {
        showState,
        setShowState,
        pauseTimer,
        resumeTimer,
    };
};
