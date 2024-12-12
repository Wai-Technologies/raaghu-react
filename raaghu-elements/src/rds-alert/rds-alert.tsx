import React, { useState, useEffect } from "react";
import RdsIcon from "../rds-icon";
import "./rds-alert.css";
import RdsButton from "../rds-button";

export interface RdsAlertProps {
    type: "info" | "success" | "warning" | "error";    
    dismisable?: boolean;
    icon?: string;
    iconFill?: boolean;
    iconStroke?: boolean;
    iconHeight?: string;
    iconWidth?: string;
    message?: string;
    border?:"none" | "single" | "left border";
    delay?: number;
    position?: "top" | "bottom";
    onDismiss?: React.MouseEventHandler<HTMLButtonElement>;
    reset?: boolean;
    sticky?: boolean;
    size?: string;
    showlink?: boolean;
    showbutton?: boolean;
    title?: string;
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
                  " justify-content-between align-items-top z-0 position-relative d-lg-flex d-md-flex d-sm-block px-3 " + classes()}
                role="alert"
            >
                {props.displayType == "singleline" && (
                    <>
                        <span className="custom-alert-message wordbreak d-flex align-items-top">
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
                                {props.title && <strong>{props.title}</strong>}
                                <span className="ps-2"> {props.message} </span>
                                {props.showlink === true && (
                                    <a className=" text-decoration-underline ms-2" href="#">
                                      Link
                                    </a>
                                )}
                            </div>
                        </span>
                  
                        <span className="d-flex me-3">
                            <div className="d-flex gap-2 alertBtns pe-1 ">
                                {props.showbutton === true && (
                                    <button type="button" className="text-primary border-0 bg-transparent"> Cancel </button>
                                )}
                                {props.showbutton === true && (
                                    <RdsButton
                                        colorVariant="primary"
                                        onClick={(e: any) => closeHandler(e)}
                                        label="Okay"
                                    />
                                )}
                               <div className={`d-flex align-items-center justify-content-end gap-2 alert-close alert-${props.size}`}>
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
                        <span className="custom-alert-message wordbreak d-flex align-items-center flex-column flex-md-row">
                            {props.icon && (
                                <div className="align-items-center" id="rdicon">
                                    <RdsIcon
                                        name={props.icon || " "}
                                        fill={props.iconFill}
                                        stroke={props.iconStroke}
                                        height={props.iconHeight}
                                        width={props.iconWidth}
                                        colorVariant={colorType}
                                        classes="me-2 pt-3 "
                                    />
                                </div>
                            )}

                            <div className="flex-grow-1">
                                {props.title && <strong>{props.title}</strong>}
                                {props.message}
                                <p>{props.description}</p>
                                {props.showlink === true && (
                                    <a className="text-decoration-underline d-block mt-2 mt-md-4" href="#"  id="alertlinks">
                                        Link
                                    </a>
                                )}
                            </div>
                        </span>
                        <span>
                            <div className="d-flex align-items-top justify-content-end gap-2 alert-close pe-2">
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
                                {props.showbutton === true && (
                                    <button className="text-primary border-0 bg-transparent"> Cancel </button>
                                )}
                                {props.showbutton === true && (
                                    <RdsButton
                                        colorVariant="primary"
                                        onClick={(e: any) => closeHandler(e)}
                                        label="Okay"
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
