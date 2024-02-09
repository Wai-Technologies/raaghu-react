import React, { useState, Fragment, useEffect } from "react";
// import { colors, size } from "../../libs/types";
// import RdsIcon from "../rds-icon";
import "./rds-alert.css";
export interface RdsAlertProps {
    dismisable?: boolean;
    alertmessage: string;
    colorVariant: string;
    delay?: number;
    icon?: string;
    iconFill?: boolean;
    iconStroke?: boolean;
    iconHeight?: string;
    iconWidth?: string;
    position?: "top" | "bottom";
    onDismiss?: React.MouseEventHandler<HTMLButtonElement>;
    reset?: boolean;
    sticky?: boolean;
    size?: string;
}

const RdsAlert = (props: RdsAlertProps) => {
    const [clicked, setClicked] = useState(false);
    const delay = props.delay;
    const handler = props.hasOwnProperty("delay");

    useEffect(() => {
        if (handler == true) {
            setTimeout(() => {
                setClicked(true);
            }, delay);
        }
    });
    useEffect(() => {
        setClicked(false);
    }, [props.reset]);
    const closeHandler = (e: any) => {
        props.onDismiss && props.onDismiss(e);
        setClicked(true);
    };

    const delayClass = `${clicked == true ? " d-none " : "w-100 "}`;

    const classes = () => {

        let defaultClass: string = '';
        if (props.dismisable) {
            defaultClass = " alert-dismissible ";
        }

        if (props.sticky) {
            const position = `${props.position === 'top' ? ' position-absolute top-0 start-0 fullWidth z-index' : ' position-absolute bottom-0 start-0 fullWidth z-index'}`;
            defaultClass = defaultClass + defaultClass + position;
        }

        const sizeClass = `${props.size === 'small' ? ' alert-sm' : props.size === 'large' ? ' alert-lg' : ' alert-md'}`;
        defaultClass = defaultClass + sizeClass;
        return defaultClass;
    }
    return (
        <Fragment>
            <div className={"alert alert-" + (props.colorVariant) +" d-flex justify-content-between align-items-center z-0 " + classes() +  ` ${delayClass}`} role="alert">
                <span className="wordbreak d-flex align-items-center">
                    {/* {props.hasOwnProperty("icon") && (
                        <RdsIcon
                            name={props.icon || " "}
                            fill={props.iconFill}
                            stroke={props.iconStroke}
                            height={props.iconHeight}
                            width={props.iconWidth}
                            colorVariant={props.colorVariant}
                            classes="me-2"
                        />
                    )} */}
                    {props.alertmessage}
                </span>
                {props.dismisable === true && (
                    <button
                        type="button"
                        className="btn-close ms-2"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        onClick={(e: any) => closeHandler(e)}
                    ></button>
                )}
            </div>
        </Fragment>
    );
};

export default RdsAlert;
