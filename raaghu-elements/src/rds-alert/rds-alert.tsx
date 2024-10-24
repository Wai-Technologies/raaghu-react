import React, { useState, useEffect } from "react";
import RdsIcon from "../rds-icon";
import "./rds-alert.css";
import RdsButton from "../rds-button";

export interface RdsAlertProps {
    type: "info" | "success" | "warning" | "error";    
    dismisable?: boolean;
    alertmessage?: string;
    border?:"none" | "single" | "left border";
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
    const colorType = props.type === "success" ? "primary" : props.type === "warning" ? "warning" : props.type === "error" ?  "danger" : "neutral";

    const classes = () => {

        let defaultClass: string = "";
        if (props.dismisable) {
            defaultClass = " alert-dismissible ";
        }       

        if (props.sticky) {
            const position = `${props.position === "top" ? " position-absolute top-0 start-0 fullWidth z-index" : " position-absolute bottom-0 start-0 fullWidth z-index"}`;
            defaultClass = defaultClass + defaultClass + position;
        }

        
        if (props.border === "none") {
            defaultClass = defaultClass + " shadow ";
        }
          
        if (props.border === "single") {
            defaultClass = defaultClass + " border-" + (props.type === "info" ? "dark" : colorType);
        }
  

        if (props.border === "left border") {
            defaultClass = defaultClass + "border-"+ (props.type === "info" ? "dark" : colorType) + " alert-left-border " + colorType;
        }
  
        const sizeClass = `${props.size === "small" ? " alert-sm" : props.size === "large" ? " alert-lg" : " alert-md"}`;
        defaultClass = defaultClass + sizeClass;
        return defaultClass;
    };
   
    return (
        <>
            <div
                className={
                    "alert alert-" + colorType +
                  " justify-content-between align-items-center z-0 position-relative d-lg-flex d-md-flex d-sm-block " + classes()}
                role="alert"
            >
                {props.displayType == "singleline" && (
                    <>
                        <span className="custom-alert-message wordbreak d-flex mb-sm-2">
                            {props.icon && (
                                <RdsIcon
                                    name={props.icon || " "}
                                    fill={props.iconFill}
                                    stroke={props.iconStroke}
                                    height={props.iconHeight}
                                    width={props.iconWidth}
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
                  
                        <span className="d-flex me-4">
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
                                <div className="d-flex align-items-top justify-content-end gap-2 mt-1 alert-close">
                                    {props.dismisable === true && (
                                        <RdsIcon
                                            colorVariant="primary"
                                            name="close"
                                            stroke={true}
                                            height="12px"
                                            width="12px"
                                            onClick={(e: any) => closeHandler(e)}
                                            isCursorPointer={true}
                                        />
                                    )}
                                </div>
                            </div>
                        </span>
                    </>
                )}
      
                {props.displayType == "multiline" && (
                    <>
                            <span className="custom-alert-message wordbreak d-flex">
                                {props.icon && (
                                    <div>
                                        <RdsIcon
                                            name={props.icon || " "}
                                            fill={props.iconFill}
                                            stroke={props.iconStroke}
                                            height={props.iconHeight}
                                            width={props.iconWidth}
                                            colorVariant={colorType}
                                            classes="me-2"
                                        />
                                        {props.linkbutton === true && (
                                            <a className="text-decoration-underline d-block mt-4" href="#">
                                                Link
                                            </a>
                                        )}
                                    </div>
                                )}
      
                            <div>
                                {props.alertheading && <strong>{props.alertheading}</strong>}
                                {props.alertmessage}
                                <p>{props.description}</p>
                            </div>
                        </span>
                        <span>
                            <div className="d-flex align-items-top justify-content-end gap-2 alert-close">
                                {props.dismisable === true && (
                                    <RdsIcon
                                        colorVariant="primary"
                                        name="close"
                                        stroke={true}
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
