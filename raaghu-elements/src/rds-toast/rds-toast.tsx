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
    iconColorvariant?: string;
    iconHeight?: string;
    iconWidth?: string;
    iconFill?: boolean;
}
const RdsToast = (props: RdsToastProps) => {
    const borderColor = "border border-" + props.borderColor || " ";
    const bg = " bg-" + props.colorVariant || "light";
    const [state, setState] = useState("show");

    useEffect(() => {
        if (props.autohide) {
            var toastTimer = setTimeout(() => {
                setState("hide");
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
                    className={`toast fade ${state} ${bg} ${borderColor}`}
                    id="toastId"
                >
                    {props.showHeader && (
                        <div>
                            <div className="toast-header p-2 d-flex justify-content-between align-items-end">
                                <div className="me-2">
                                    {props.withIcon && (
                                        <RdsIcon
                                            name={props.iconName}
                                            colorVariant={props.iconColorvariant}
                                            height={props.iconHeight}
                                            width={props.iconWidth}
                                            stroke={true}
                                            fill={props.iconFill}
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
                                    className="btn-close"
                                ></button>
                            </div>
                            <div className="toast-body">{props.message}</div>
                        </div>
                    )}

                    {!props.showHeader && (
                        <div className="m-1 toastbody ">
                            <div className="d-flex justify-content-between     align-items-baseline  ">
                                <div className="toast-body toastbody d-flex justify-content-between  align-items-end ">
                                    <div className="me-2">
                                        {props.withIcon && (
                                            <RdsIcon
                                                name={props.iconName}
                                                colorVariant={props.iconColorvariant}
                                                height={props.iconHeight}
                                                width={props.iconWidth}
                                                stroke={true}
                                                fill={props.iconFill}
                                            ></RdsIcon>
                                        )}
                                    </div>
                                    {props.message}
                                </div>
                                <button
                                    type="button"
                                    data-bs-dismiss="toast"
                                    aria-label="Close"
                                    className="btn-close"
                                ></button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
export default RdsToast;
