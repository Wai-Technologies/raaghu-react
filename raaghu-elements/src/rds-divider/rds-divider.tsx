import React from "react";
import "./rds-divider.css";
import RdsIcon from "../rds-icon";

export interface RdsDividerProps {
  Style: string;
  icon?: string;
  iconFill?: boolean;
  iconStroke?: boolean;
  iconHeight?: string;
  iconWidth?: string;
  dividerMessage?: string;
  size?: string;
  textalign?: string;
  withdashed?: boolean;
  iconShow?: boolean;
  layout?: string;
}

const RdsDivider = (props: RdsDividerProps) => {

  return ( props.layout==="horizontal" ? (
    <div className={`separator ${props.Style} border-${props.size} divider ${props.textalign} separator-${props.withdashed ? "dashed" : "solid"} `}>
      {props.iconShow && props.hasOwnProperty("icon") && (
      <RdsIcon
        name={props.icon || " "}
        fill={props.iconFill}
        stroke={props.iconStroke}
        height={props.iconHeight}
        width={props.iconWidth}
        colorVariant={props.Style}
        classes="me-2"
      />
      )}
      {<span className={`text-${props.Style}`}>{props.dividerMessage}</span>}
    </div>
  ) : 
  <div className={`vseparator ${props.Style} border-${props.size} vseparator-${props.withdashed ? "dashed" : "solid"} `}>
    </div>
  );
};

export default RdsDivider;