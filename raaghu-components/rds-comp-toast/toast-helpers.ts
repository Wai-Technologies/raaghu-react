import { useCallback, useEffect, useRef, useState } from "react";
import { ToastLayout, ToastLeadingIcon, ToastPosition, ToastState } from "./rds-comp-toast";

export const getStateClass = (state: ToastState): string => {
    const stateClass: Record<ToastState, string> = {
        [ToastState.Info]: "info",
        [ToastState.Success]: "success",
        [ToastState.Error]: "error",
        [ToastState.Basic]: "basic",
    };
    return stateClass[state] ?? stateClass[ToastState.Basic];
};

export const getLayoutClass = (layout: ToastLayout): string => {
    const layoutClass: Record<ToastLayout, string> = {
        [ToastLayout.Download]: "download",
        [ToastLayout.Chat]: "chat",
        [ToastLayout.Request]: "request",
        [ToastLayout.Text]: "text",
    };
    return layoutClass[layout] ?? layoutClass[ToastLayout.Text];
};

export const getLeadingIconClass = (leadingIcon: ToastLeadingIcon): string => {
    const iconClass: Record<ToastLeadingIcon, string> = {
        [ToastLeadingIcon.Plus]: "plus",
        [ToastLeadingIcon.Circle]: "circle",
    };
    return iconClass[leadingIcon] ?? iconClass[ToastLeadingIcon.Circle];
};

export const getPositionClasses = (position?: ToastPosition) => {
    const positionClass: Record<ToastPosition, string> = {
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

export const useToastTimer = (autohide?: boolean, delay?: number) => {
    const [showState, setShowState] = useState("show");
    const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const remainingRef = useRef<number>(delay ?? 3000);
    const startTimeRef = useRef<number>(0);

    const startTimer = useCallback((duration: number) => {
        startTimeRef.current = Date.now();
        timerRef.current = setTimeout(() => setShowState("hide"), duration);
    }, []);

    const pauseTimer = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            remainingRef.current -= Date.now() - startTimeRef.current;
        }
    }, []);

    const resumeTimer = useCallback(() => {
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
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [autohide, delay, startTimer]);

    return {
        showState,
        setShowState,
        pauseTimer,
        resumeTimer,
    };
};
