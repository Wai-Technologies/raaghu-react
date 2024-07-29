import React, { useState, useEffect } from "react";
// import { colors, size } from "../../libs/types";
import RdsIcon from "../rds-icon";
import "./rds-alert-advanced.css";
import RdsButton from "../rds-button";

export interface RdsAlertAdvancedProps {
  dismisable?: boolean;
  linkbutton?: boolean;
  cancelbutton?: boolean;
  okaybutton?: boolean;
  alertmessage: string;
  alertheading?: string;
  colorVariant: string;
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
  withBorder?: boolean;
  withLeftBorder?: boolean;
}

const RdsAlert = (props: RdsAlertAdvancedProps) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setClicked(false);
  }, [props.reset]);
  const closeHandler = (e: any) => {
    props.onDismiss && props.onDismiss(e);
    setClicked(true);
  };

  const delayClass = `${clicked == true ? " d-none " : "w-100 "}`;

  const classes = () => {
    let defaultClass: string = "";
    if (props.dismisable) {
      defaultClass = " alert-dismissible ";
    }

    if (props.sticky) {
      const position = `${
        props.position === "top"
          ? " position-absolute top-0 start-0 fullWidth z-index"
          : " position-absolute bottom-0 start-0 fullWidth z-index"
      }`;
      defaultClass = defaultClass + defaultClass + position;
    }

    if (props.withLeftBorder) {
      defaultClass = defaultClass + " alert-left-border " + props.colorVariant;
    }

    const sizeClass = `${
      props.size === "small"
        ? " alert-sm"
        : props.size === "large"
        ? " alert-lg"
        : " alert-md"
    }`;
    defaultClass = defaultClass + sizeClass;
    return defaultClass;
  };
  return (
    <>
      <div
        className={
          "alert" +
          (props.withBorder ? " alert-" : " alert-advance-") +
          props.colorVariant +
          " d-flex justify-content-between align-items-center z-0" + (props.withBorder ? "" : " shadow") +
          classes() +
          ` ${delayClass} ${props.withLeftBorder ? "alert-left-border" : ""}`
        }
        role="alert"
      >
        <span className="wordbreak d-flex align-items-center">
          {props.hasOwnProperty("icon") && (
            <RdsIcon
              name={props.icon || " "}
              fill={props.iconFill}
              stroke={props.iconStroke}
              height={props.iconHeight}
              width={props.iconWidth}
              colorVariant={props.colorVariant}
              classes="me-2"
            />
          )}
          {props.alertheading && <strong>{props.alertheading}</strong>}
          {props.alertmessage}
          {props.linkbutton === true && (
            <a className="ms-2" href="#">Link</a>
          )}
        </span>
        <span>
          {props.cancelbutton === true && (
            <RdsButton
              colorVariant="primary"
              isOutline
              label="Cancel"
              onClick={(e: any) => closeHandler(e)}
              size="small"
            />
          )}
          &nbsp; &nbsp;
          {props.okaybutton === true && (
            <RdsButton colorVariant="primary" onClick={(e: any) => closeHandler(e)} label="Okay" size="small" />
          )}
          &nbsp; &nbsp;
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
        </span>
      </div>
    </>
  );
};

export default RdsAlert;
