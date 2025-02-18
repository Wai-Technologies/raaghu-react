import React from "react";
import RdsIcon from "../rds-icon";

export interface RdsHeaderProps {
  colorVariant?: string;
  icon?: string;
  iconFill?: boolean;
  iconStroke?: boolean;
  iconHeight?: string;
  iconWidth?: string;
  iconPosition?: string;
  headerText?: string;
  size?: string;
  iconShow?: boolean;
}

const RdsHeader = (props: RdsHeaderProps) => {
  const HeaderTag = props.size || "h1"; 

  const getIconSize = () => {
    switch (HeaderTag) {
      case "h1":
        return { height: "2em", width: "2em" };
      case "h2":
        return { height: "1.75em", width: "1.75em" };
      case "h3":
        return { height: "1.5em", width: "1.5em" };
      case "h4":
        return { height: "1.25em", width: "1.25em" };
      case "h5":
        return { height: "1em", width: "1em" };
      case "h6":
        return { height: "0.75em", width: "0.75em" };
      default:
        return { height: "1em", width: "1em" };
    }
  };

  const renderIcon = () => (
    <RdsIcon
      name={props.icon || " "}
      fill={props.iconFill}
      stroke={props.iconStroke}
      height={getIconSize().height}
      width={getIconSize().width}
      colorVariant={props.colorVariant}
      classes="me-2 mb-2"
    />
  );

  return (
    <>
      <div
        className={`d-flex  ${
          props.iconPosition === "top" || props.iconPosition === "bottom"
            ? "flex-column"
            : ""
        }`}
      >
        {props.iconShow && props.iconPosition === "top" && renderIcon()}
        <div
          className={`d-flex align-items-center ${
            props.iconPosition === "left"
              ? "flex-row"
              : props.iconPosition === "right"
              ? ""
              : ""
          }`}
        >
          {props.iconShow && props.iconPosition === "left" && renderIcon()}
          {React.createElement(
            HeaderTag,
            { className: `text-${props.colorVariant} me-2` },
            props.headerText
          )}
          {props.iconShow && props.iconPosition === "right" && renderIcon()}
        </div>
        {props.iconShow && props.iconPosition === "bottom" && renderIcon()}
      </div>
    </>
  );
};

export default RdsHeader;
