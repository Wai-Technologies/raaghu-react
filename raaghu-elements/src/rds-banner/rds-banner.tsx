import React from "react";
import "./rds-banner.css";
import RdsIcon from "../rds-icon";

export interface RdsBannerProps {
  bannerText?: string;
  sticky?: boolean;
  position?: "top" | "bottom";
  colorVariant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  icon?: string;
closeButton?: boolean;
 textAlign: "start" | "end" | "center" ;
 iconHeight: string ;
 iconWidth: string ;
 iconStroke: boolean ;
 iconFill: boolean ;
}

const RdsBanner = (props: RdsBannerProps) => {
 
    const iconColor = props.colorVariant != "light" ? "light" : "dark";
    const iconStroke=props.iconStroke===false?false:true; 
    const position =props.position === "top"? " fixed-top": " fixed-bottom bottom-0";
    const textAlign =props.textAlign?"justify-content-" + props.textAlign:"";
    const sticky= (props.sticky===true?`m-auto ${position} ` : "");
    const bgColor = props.colorVariant?"alert-" + `${props.colorVariant} text-dark`:"";
    const classes = ` ${textAlign} ${sticky} ${bgColor} `;
    return (
        <>
            <div className={`alert d-flex align-items-center fade show ${classes}`} role="alert" >
                <span className="ps-2 d-flex align-items-center">
                    {props.icon && <RdsIcon classes="fs-6 me-2" colorVariant={iconColor} name={props.icon} width={props.iconWidth||"20px"} height={props.iconHeight||"20px"} fill={props.iconFill||false}  stroke={iconStroke} ></RdsIcon>}
                    {props.bannerText}
                </span>
            </div></>
    );
};

export default RdsBanner;

