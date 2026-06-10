import { useCallback, useEffect, useRef, useState } from "react";
import { ToastLayout, ToastLeadingIcon, ToastPosition, ToastState } from "./rds-comp-toast";

export const getStateClass = (state: ToastState): string => {
    switch (state) {
        case ToastState.Info: return "info";
        case ToastState.Success: return "success";
        case ToastState.Error: return "error";
        case ToastState.Basic:
        default: return "basic";
    }
};

export const getLayoutClass = (layout: ToastLayout): string => {
    switch (layout) {
        case ToastLayout.Download: return "download";
        case ToastLayout.Chat: return "chat";
        case ToastLayout.Request: return "request";
        case ToastLayout.Text:
        default: return "text";
    }
};

export const getLeadingIconClass = (leadingIcon: ToastLeadingIcon): string => {
    switch (leadingIcon) {
        case ToastLeadingIcon.Plus: return "plus";
        case ToastLeadingIcon.Circle:
        default: return "circle";
    }
};

export const getPositionClasses = (position?: ToastPosition) => {
    switch (position) {
        case ToastPosition.TopLeft: return "rds-comp-toast__container--top-left";
        case ToastPosition.TopCenter: return "rds-comp-toast__container--top-center";
        case ToastPosition.TopRight: return "rds-comp-toast__container--top-right";
        case ToastPosition.MiddleLeft: return "rds-comp-toast__container--middle-left";
        case ToastPosition.MiddleCenter: return "rds-comp-toast__container--middle-center";
        case ToastPosition.MiddleRight: return "rds-comp-toast__container--middle-right";
        case ToastPosition.BottomLeft: return "rds-comp-toast__container--bottom-left";
        case ToastPosition.BottomCenter: return "rds-comp-toast__container--bottom-center";
        case ToastPosition.BottomRight: return "rds-comp-toast__container--bottom-right";
        default: return "rds-comp-toast__container--top-left";
    }
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
