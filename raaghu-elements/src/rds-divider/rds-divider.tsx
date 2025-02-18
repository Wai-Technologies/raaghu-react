import React from "react";
import "./rds-divider.css";
import RdsIcon from "../rds-icon";

export interface RdsDividerProps {
  colorVariant: string;
  icon?: string;
  iconFill?: boolean;
  iconStroke?: boolean;
  iconHeight?: string;
  iconWidth?: string;
  dividerMessage?: string;
  size?: string;
  textalign?: string;
  withdashed?: boolean;
  iconShow: boolean;
}

const RdsDivider = (props: RdsDividerProps) => {

  return (
    <div className={`separator ${props.colorVariant} border-${props.size} divider ${props.textalign} separator-${props.withdashed ? "dashed" : "solid"} `}>
      {props.iconShow && props.hasOwnProperty("icon") && (
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
      {<span className={`text-${props.colorVariant}`}>{props.dividerMessage}</span>}
    </div>
  );
};

export default RdsDivider;