import React, { useState, useEffect } from "react"; 
import RdsIcon from "../rds-icon";
import "./rds-alert.css";
import RdsButton from "../rds-button";

// Define Enums for type, border, position, and displayType
export enum AlertType {
  info = "info",
  success = "success",
  warning = "warning",
  error = "error",
}


export enum AlertBorder {
  none = "none",
  single = "single",
  left_border = "left border",
}

export enum AlertPosition {
  top = "top",
  bottom = "bottom",
}

export enum AlertDisplayType {
  singleline = "singleline",
  multiline = "multiline",
}

export interface RdsAlertProps {
  type: AlertType; // Use enum instead of string literal
  showDismiss?: boolean;
  icon?: string;
  iconFill?: boolean;
  iconStroke?: boolean;
  iconHeight?: string;
  iconWidth?: string;
  showIcon?: boolean;
  linkUrl?: string;
  description?: string;
  showDescription?: boolean;
  border?: AlertBorder; // Use enum for border
  delay?: number;
  position?: AlertPosition; // Use enum for position
  onDismiss?: React.MouseEventHandler<HTMLButtonElement>;
  reset?: boolean;
  sticky?: boolean;
  size?: string;
  showLink?: boolean;
  showButtons?: boolean;
  showPrimary?: boolean;
  showSecondary?: boolean;
  showTitle?: boolean;
  title?: string;
  displayType?: AlertDisplayType; // Use enum for displayType
  multiline?: boolean;
  message?: string;
}


const RdsAlert = (props: RdsAlertProps) => {
  const [clicked, setClicked] = useState(false);
  const delay = props.delay; 
  const handler = "delay" in props; 
  const { multiline = false } = props;  // Destructure `multiline` here

  // useEffect(() => {
  //   if (handler) {
  //     setTimeout(() => {
  //       setClicked(true);
  //     }, delay);
  //   }
  // }, [handler, delay]);

  useEffect(() => {
    setClicked(false);
  }, [props.reset]);

  const closeHandler = (e: any) => {
    props.onDismiss && props.onDismiss(e);
    setClicked(true);
  };

  const delayClass = clicked ? "d-none" : "w-100";
  const colorType =
    props.type === "success"
      ? "primary"
      : props.type === "warning"
      ? "warning"
      : props.type === "error"
      ? "danger"
      : "neutral";

  const classes = () => {
    let defaultClass = "";
    if (props.showDismiss) {
      defaultClass = "alert-dismissible";
    }

    if (props.sticky) {
      const position =
        props.position === "top"
          ? "position-absolute top-0 start-0 fullWidth z-index"
          : "position-absolute bottom-0 start-0 fullWidth z-index";
      defaultClass += ` ${position}`;
    }

    if (props.border === "none") {
      defaultClass += " shadow";
    }

    if (props.border === "single") {
      defaultClass += ` border-${props.type === "info" ? "dark" : colorType}`;
    }

    if (props.border === "left border") {
      defaultClass += ` border-${
        props.type === "info" ? "dark" : colorType
      } alert-left-border ${colorType}`;
    }

    const sizeClass =
      props.size === "small"
        ? "alert-sm"
        : props.size === "large"
        ? "alert-lg"
        : "alert-md";
    defaultClass += ` ${sizeClass}`;
    return defaultClass;
  };

  return (
    <div
      className={`alert alert-${colorType} justify-content-between align-items-top z-0 position-relative d-lg-flex d-md-flex d-sm-block px-3 ${classes()} ${delayClass}`}
      role="alert"
    >
      {/* Render single-line alert */}
      {!multiline && (
        <>
          <span className="custom-alert-message wordbreak d-flex align-items-top">
            <div className="d-flex">
            {props.icon && props.showIcon && (
              <RdsIcon
                name={props.icon || " "}
                fill={props.iconFill}
                stroke={props.iconStroke}
                height={props.iconHeight}
                width={props.iconWidth}
                colorVariant={colorType}
                classes="me-2"
              />
            )}
              {props.title && props.showTitle && <strong>{props.title}</strong>}
            </div>
            <div>
            {props.description && props.showDescription && (
                <span> {props.description} </span>
              )}
            </div>
          </span>
          <span className="d-flex me-3">
            <div className="d-flex gap-2 alertBtns pe-1 align-items-center">
              {props.showLink && (
                <a
                  className="text-decoration-underline ms-2 cursor-pointer"
                  href={props.linkUrl}
                >
                  Link
                </a>
              )}
              {props.showSecondary && (
                <button
                  type="button"
                  className={`border-0 bg-transparent ${
                    props.type === "error" ? "text-danger" : "text-primary"
                  }`}
                  onClick={(e: any) => closeHandler(e)}
                >
                  Cancel
                </button>
              )}
              {props.showPrimary && (
                <RdsButton
                  colorVariant={props.type === "error" ? "danger" : "primary"}
                  onClick={(e: any) => closeHandler(e)}
                  label="Okay"
                />
              )}
              <div
                className={`d-flex align-items-center justify-content-end gap-2 alert-close alert-${props.size}`}
              >
                {props.showDismiss && (
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

      {/* Render multi-line alert */}
      {multiline && (
        <>
          <span className="custom-alert-message wordbreak align-items-baseline d-flex align-items-center flex-column flex-md-row">
            {props.icon && props.showIcon && (
              <div className=" d-flex" id="rdicon">
                <RdsIcon
                  name={props.icon || " "}
                  fill={props.iconFill}
                  stroke={props.iconStroke}
                  height={props.iconHeight}
                  width={props.iconWidth}
                  colorVariant={colorType}
                  classes="me-2"
                />
                {props.title && props.showTitle && <strong>{props.title}</strong>}
              </div>
            )}
            <div className="flex-grow-1">
              {!props.icon && props.title && props.showTitle && <strong>{props.title}</strong>}
              {props.description && props.showDescription && (
                <p>{props.description}</p>
              )}
              {props.showLink && (
                <a
                  className="text-decoration-underline mt-4 mt-md-6 cursor-pointer"
                  href={props.linkUrl}
                  id="alertlinks"
                >
                  Link
                </a>
              )}
            </div>
          </span>
          <span>
            <div className="d-flex align-items-top justify-content-end gap-2 alert-close pe-2">
              {props.showDismiss && (
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
            <div className="d-flex align-items-flex-end mt-5 gap-2 alertBtns">
              {props.showSecondary && (
                <button
                  className={`border-0 bg-transparent ${
                    props.type === "error" ? "text-danger" : "text-primary"
                  }`}
                  onClick={(e: any) => closeHandler(e)}
                >
                  Cancel
                </button>
              )}
              {props.showPrimary && (
                <RdsButton
                  colorVariant={props.type === "error" ? "danger" : "primary"}
                  onClick={(e: any) => closeHandler(e)}
                  label="Okay"
                />
              )}
            </div>
          </span>
        </>
      )}
    </div>
  );
};

export default RdsAlert;
