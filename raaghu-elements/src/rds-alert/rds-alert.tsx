import React, { useState, useEffect } from "react";
import RdsIcon from "../rds-icon";
import "./rds-alert.css";
import RdsButton from "../rds-button";

export interface RdsAlertProps {
    dismisable?: boolean;
    alertmessage?: string;
    type: string;    
    border?:"none" | "single" | "left Border";
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
    linkbutton?: boolean;
    cancelbutton?: boolean;
    okaybutton?: boolean;
    alertheading?: string;
    withBorder?: boolean;
    //withLeftBorder?: boolean;
    displayType?: "singleline" | "multiline";
    description?: string;
  }

const RdsAlert = (props: RdsAlertProps) => {
    const [clicked, setClicked] = useState(false);
    const delay = props.delay;
    const handler = "delay" in props;

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
    const colorType = props.type === "success" ? "primary" : props.type === "warning" ? "warning" : props.type === "error" ?  "danger" : "";

    const classes = () => {

        let defaultClass: string = "";
        if (props.dismisable) {
            defaultClass = " alert-dismissible ";
        }       

        if (props.sticky) {
            const position = `${props.position === "top" ? " position-absolute top-0 start-0 fullWidth z-index" : " position-absolute bottom-0 start-0 fullWidth z-index"}`;
            defaultClass = defaultClass + defaultClass + position;
        }

        if (props.border === "left Border") {
            defaultClass = defaultClass + " alert-left-border " + colorType; //props.type;
        }
  
        const sizeClass = `${props.size === "small" ? " alert-sm" : props.size === "large" ? " alert-lg" : " alert-md"}`;
        defaultClass = defaultClass + sizeClass;
        return defaultClass;
    };

   
    return (
        <>
            <div
                className={
                    "alert alert-" +
                    //props.type +
                    colorType +
                  " d-flex justify-content-between align-items-center z-0" +
                  (props.border === "single" ? " border" : " shadow") +
                  classes() +
                  ` ${delayClass} ${props.border === "left Border" ? "alert-left-border" : ""}`
                }
                role="alert"
            >
                {props.displayType == "singleline" && (
                    <>
                        <span className="wordbreak d-flex">
                            {props.icon && (
                                <RdsIcon
                                    name={props.icon || " "}
                                    fill={props.iconFill}
                                    stroke={props.iconStroke}
                                    height={props.iconHeight}
                                    width={props.iconWidth}
                                    // colorVariant={props.type}
                                    colorVariant= "{colorType}"
                                    classes="me-2"
                                />
                            )}
      
                            <div>
                                {props.alertheading && <strong>{props.alertheading}</strong>}
                                {props.alertmessage}
                                {props.linkbutton === true && (
                                    <a className=" text-decoration-underline ms-2" href="#">
                                      Link
                                    </a>
                                )}
                            </div>
                        </span>
                  
                        <span>
                            <div className="d-flex gap-2 alertBtns">
                                {props.cancelbutton === true && (
                                    <button type="button" className="text-primary border-0 bg-transparent"> Cancel </button>
                                )}
                                {props.okaybutton === true && (
                                    <RdsButton
                                        colorVariant="primary"
                                        onClick={(e: any) => closeHandler(e)}
                                        label="Okay"
                                        size="small"
                                    />
                                )}
                                {props.dismisable === true && (
                                    <RdsIcon
                                        colorVariant="primary"
                                        name="close"
                                        stroke={false}
                                        height="12px"
                                        width="12px"
                                        onClick={(e: any) => closeHandler(e)}
                                        isCursorPointer={true}
                                    />
                                )}
                            </div>
                        </span>
                    </>
                )}
      
                {props.displayType == "multiline" && (
                    <>
                        <span className="wordbreak d-flex">
                            {props.icon && (
                                <RdsIcon
                                    name={props.icon || " "}
                                    fill={props.iconFill}
                                    stroke={props.iconStroke}
                                    height={props.iconHeight}
                                    width={props.iconWidth}
                                    // colorVariant={props.type}
                                    colorVariant= {colorType}
                                    classes="me-2"
                                />
                            )}
      
                            <div>
                                {props.alertheading && <strong>{props.alertheading}</strong>}
                                {props.alertmessage}
                                <p>{props.description}</p>
                                {props.linkbutton === true && (
                                    <a className="text-decoration-underline" href="#">
                                      Link
                                    </a>
                                )}
                            </div>
                        </span>
                        <span>
                            <div className="d-flex align-items-top justify-content-end gap-2">
                                {props.dismisable === true && (
                                    <RdsIcon
                                        colorVariant="primary"
                                        name="close"
                                        stroke={false}
                                        height="12px"
                                        width="12px"
                                        onClick={(e: any) => closeHandler(e)}
                                        isCursorPointer={true}
                                    />
                                )}
                            </div>
                            <div className="d-flex align-items-flex-end mt-4 gap-2 alertBtns">
                                {props.cancelbutton === true && (
                                    <button className="text-primary border-0 bg-transparent"> Cancel </button>
                                )}
                                {props.okaybutton === true && (
                                    <RdsButton
                                        colorVariant="primary"
                                        onClick={(e: any) => closeHandler(e)}
                                        label="Okay"
                                        size="small"
                                    />
                                )}
                            </div>
                        </span>
                    </>
                )}
            </div>
        </>
    );
};

export default RdsAlert;
