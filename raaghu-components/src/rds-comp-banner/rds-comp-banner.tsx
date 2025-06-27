import React from "react";
import "./rds-comp-banner.css";
import RdsCompIcon from "../rds-comp-icon";
import RdsButton from "../../../raaghu-elements/src/rds-button/rds-button";
import RdsCompHeader from "../rds-comp-header";

export enum ColorVariant {
  Primary = "primary",
  Success = "success",
  Danger = "danger",
  Warning = "warning",
  Light = "light",
  Info = "info",
  Secondary = "secondary",
  Dark = "dark",
}

export enum Position {
  Top = "top",
  Bottom = "bottom",
}

export enum TextAlign {
  Start = "start",
  End = "end",
  Center = "center",
}

export interface RdsCompBannerProps {
  bannerText?: string;
  sticky?: boolean;
  position?: Position;
  colorVariant?: ColorVariant;
  icon?: string;
  closeButton?: boolean;
  textAlign?: TextAlign;
  iconHeight: string;
  iconWidth: string;
  iconStroke: boolean;
  iconFill: boolean;
  imageUrl?: string;
  raaghuBanner?: boolean;
  headingText?: string;
  titleText?: string;
  subTitleText?: string;
  firstButtonText?: string;
  secondButtonText?: string;
  showFirstButton?: boolean;
  showSecondButton?: boolean;
  firstButtonIcon?: string;
  secondButtonIcon?: string;
  showHyperlink?: boolean;
  hyperlink?: string;
  hyperlinkText?: string;
  hyperlinkIcon?: string;
}

const RdsCompBanner = (props: RdsCompBannerProps) => {
  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button clicked", e);
  };
  const iconColor = props.colorVariant != "light" ? "light" : "dark";
  const iconStroke = props.iconStroke === false ? false : true;
  const position =
    props.position === "top" ? " fixed-top" : " fixed-bottom bottom-0";
  const textAlign = props.textAlign ? "justify-content-" + props.textAlign : "";
  const sticky = props.sticky === true ? `m-auto ${position} ` : "";
  const bgColor = props.colorVariant
    ? "alert-" + `${props.colorVariant} text-dark`
    : "";
  const classes = ` ${textAlign} ${sticky} ${bgColor} `;
  const bannerImage = props.imageUrl
    ? props.imageUrl
    : "../../../stories/assets/raaghubannerimage.png";
  return (
    <>
      <span id="news-banner">
        {!props.raaghuBanner && (
          <div
            className={`alert d-flex align-items-center fade show ${classes}`}
            role="alert"
          >
            <span className="ps-2 d-flex align-items-center">
              {props.icon && (
                <RdsCompIcon
                  classes="fs-6 me-2"
                  colorVariant={iconColor}
                  name={props.icon}
                  width={props.iconWidth || "20px"}
                  height={props.iconHeight || "20px"}
                  fill={props.iconFill || false}
                  stroke={iconStroke}
                ></RdsCompIcon>
              )}
              {props.bannerText}
            </span>
          </div>
        )}
        {props.raaghuBanner && (
          <div
            className="challenge-banner p-3 rounded text-light"
            style={{
              backgroundImage: `url(${bannerImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="content bg-layer bg-dark">
              <RdsCompHeader size="h3" headerText={props.headingText}></RdsCompHeader>
              <RdsCompHeader size="h1" headerText={props.titleText}></RdsCompHeader>

              <RdsCompHeader size="h6" headerText={props.subTitleText}></RdsCompHeader>

          <div className="buttons w-100">
            {props.showFirstButton &&(<RdsButton
                        label={props.firstButtonText}
                        type="button"
                        colorVariant={props.colorVariant}
                        size="medium"
                        dataTestId={props.firstButtonText}
                         icon={props.firstButtonIcon}
                         iconFill={false}
                         iconStroke={true}
                         isBanerButton={true}
                         onClick={(e) => onButtonClick(e)}
                    ></RdsButton>)}
           {props.showSecondButton &&( <RdsButton
                        label={props.secondButtonText}
                        type="button"
                        colorVariant={props.colorVariant}
                        size="medium"
                        dataTestId={props.secondButtonText}
                        icon={props.secondButtonIcon}
                        iconFill={false}
                        iconStroke={true}
                        isBanerButton={true}
                        onClick={(e) => onButtonClick(e)}
                    ></RdsButton>)}
                     {props.showHyperlink &&( 
                      <div className="links">
                         
                        <a className="btn text-primary bg-light w-100 border-primary" href={props.hyperlink} target="_blank" rel="noopener noreferrer">
                        <span className="me-2">
                        <RdsCompIcon
                          colorVariant="primary"
                          name={props.hyperlinkIcon}
                          width="16px"
                          height="16px"
                          fill={false}
                          stroke={true}
                        ></RdsCompIcon>
                      </span>
                      {props.hyperlinkText}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </span>
    </>
  );
};

export default RdsCompBanner;
