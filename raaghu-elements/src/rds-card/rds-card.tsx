import React, { Fragment } from "react";
import { colors } from "../../libs/types";
import RdsAvatar from "../rds-avatar";

import "./rds-card.css";
import RdsButton from "../rds-button";
import RdsIcon from "../rds-icon";
import RdsLabel from "../rds-label";


export interface RdsCardProps {
    buttonLabel1?: string;
    buttonLabel2?: string;
    colorVariant?: colors;
    cardTitle?: string;
    cardSubTitle?: string;
    cardText?: string;
    showFooter?: boolean;
    showTitle?: boolean;
    showSubTitle?: boolean;
    isImage?: boolean;
    imageUrl?: string;
    src?: string;
    style?:string;
    state?: string;
    centerAlign?: boolean;
    isAvatar?: boolean;
    borderColor?: colors;
    isDisabled ? : boolean
    iconName ? : string ;
    isBordered ? : boolean ;
    isFilled ? : boolean ;
   iconShow ? : boolean;
  titlePosition ? : string;
  showCalender ? : boolean;
  showLinkButton ? : boolean;
  title ? : string;
  showFooterLabel ? : boolean;
  footerLabelText ? : string;
  showFooterButton ? : boolean;
  subTitle?: string;
}

const RdsCard = (props: RdsCardProps) => {
  const btnColor = "btn btn-md btn-" + (props.colorVariant || "primary");
  const isCenter = props.centerAlign || false;
  const borderColor = `border border-${props.borderColor}`;

  const renderTitleAndSubtitle = () => (
    <>
      {props.showTitle && (
        <h5 className={`${isCenter ? "" : "mt-3"}`}>
          {props.cardTitle}
        </h5>
      )}
      {props.showSubTitle && (
        <h6
          className={`${
            props.state === "Selected" ? `text-color-${props.colorVariant}` : ""
          }`}
        >
          {props.cardSubTitle}
        </h6>
      )}
    </>
  );

  return (
    <Fragment>
      <div
        className={`card ${
          props.isDisabled || props.state === "Disabled"
            ? "card-disabled"
            : ""
        } 
         ${
           props.style === "Outlined" ? `card-bordered ${borderColor}` : ""
         } ${props.style === "Filled" ? "card-filled" : ""} ${
          props.state === "Hovered" ? "card-hovered" : ""
        } ${props.state === "Selected" ? "card-selected" : ""}`}
      >
        <div className="headerClass">
          {props.isImage === true ? (
            <div className="position-relative">
              <img
                src={props.imageUrl}
                id="backImg"
                className="card-img-top"
                alt="..."
              />
              {isCenter === true ? (
                <>
                  {props.isAvatar === true && (
                    <div>
                      <div className="position-relative avatar-pic2 d-flex justify-content-center">
                        <RdsAvatar
                          withProfilePic={true}
                          roundedAvatar={true}
                          profilePic={props.src}
                          size="small"
                        ></RdsAvatar>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {props.isAvatar === true && (
                    <div>
                      <div className="position-absolute avatar-pic">
                        <RdsAvatar
                          withProfilePic={true}
                          roundedAvatar={true}
                          profilePic={props.src}
                           size="small"
                        ></RdsAvatar>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <>
              {props.isAvatar === true && (
                <div>
                  <div className="avatar-pic position-relative mb-3">
                    <RdsAvatar
                      withProfilePic={true}
                      roundedAvatar={true}
                      profilePic={props.src}
                      size="small"
                    ></RdsAvatar>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        {props.showTitle === false && props.showSubTitle === false && props.showCalender === true && (
          <div className="headerClass mt-3 ms-3">
            <div className="d-flex align-items-center">
            {props.iconShow && (
              <RdsIcon
                colorVariant={props.colorVariant}
                height="20px"
                isCursorPointer
                name={props.iconName}
                stroke
                width="20px"
              />
            )}
              <h6 className="ms-2 mb-0">
                <label className="text-muted">{props.title}</label>
              </h6>
            </div>
            <span className="mt-1 fs-4 mb-2">
              <RdsLabel label={props.subTitle } fontWeight="bold" />
            </span>
          </div>
        )}
        {props.showTitle === false && props.showSubTitle === false ? (
          props.showFooter === true && (
            <div
            className={`card-footer ${
              props.style === "Filled" ? "card-filled" : ""
            } ${
              props.isDisabled || props.state === "Disabled"
                ? "card-disabled"
                : ""
            } ${props.state === "Hovered" ? "card-hovered" : ""} ${
              props.state === "Selected" ? "card-selected" : ""
            }`}
          >
            {props.showLinkButton === true && (
              <div>
                <RdsButton class=" btn-link " label={props.buttonLabel1 + " >"} />
                <br />
                <RdsButton class=" btn-link " label={props.buttonLabel2 + " >"} />
              </div>
            )}
            {props.showLinkButton === false && (
              <div
                className="d-flex justify-content-between align-items-center"                
              >
                {props.showFooterLabel === true && (
                <label className={` fs-4 fw-medium text-${props.colorVariant}`}  >{props.footerLabelText}</label>
                )}
                {props.showFooterButton === true && (
                <div>
                  <RdsButton
                    label={props.buttonLabel1}
                    colorVariant={props.colorVariant}
                  ></RdsButton>
                </div>
                )}
              </div>
            )}
          </div>
          )
        ) : (
          <div>
          <div className="card-body">
            {props.titlePosition === "bottom" && (
              <>
                {props.iconShow && (
                  <RdsIcon
                    colorVariant={props.colorVariant}
                    height="20px"
                    isCursorPointer
                    name={props.iconName}
                    stroke
                    width="20px"
                  />
                )}
                <br />
                {renderTitleAndSubtitle()}
              </>
            )}
            {props.titlePosition === "left" && (
              <div className="d-flex align-items-center">
                <div className="d-flex flex-column">
                  {renderTitleAndSubtitle()}
                </div>
                {props.iconShow && (
                  <RdsIcon
                    colorVariant={props.colorVariant}
                    height="20px"
                    isCursorPointer
                    name={props.iconName}
                    stroke
                    width="20px"
                    classes="ms-2"
                  />
                )}
              </div>
            )}
            {props.titlePosition === "right" && (
              <div className="d-flex align-items-center">
                {props.iconShow && (
                  <RdsIcon
                    colorVariant={props.colorVariant}
                    height="20px"
                    isCursorPointer
                    name={props.iconName}
                    stroke
                    width="20px"
                    classes="me-2"
                  />
                )}
                <div className="d-flex flex-column">
                  {renderTitleAndSubtitle()}
                </div>
              </div>
            )}
            {props.titlePosition === undefined && (
              <>
                {props.iconShow && (
                  <RdsIcon
                    colorVariant={props.colorVariant}
                    height="20px"
                    isCursorPointer
                    name={props.iconName}
                    stroke
                    width="20px"
                  />
                )}
                {renderTitleAndSubtitle()}
              </>
            )}
            <br />
            <p>{props.cardText}</p>
          </div>
          {props.showFooter === true && (
            <div
              className={`card-footer ${
                props.style === "Filled" ? "card-filled" : ""
              } ${
                props.isDisabled || props.state === "Disabled"
                  ? "card-disabled"
                  : ""
              } ${props.state === "Hovered" ? "card-hovered" : ""} ${
                props.state === "Selected" ? "card-selected" : ""
              }`}
            >
              {props.showLinkButton === true && (
                <div>
                  <RdsButton class=" btn-link " label={props.buttonLabel1 + " >"} />
                  <br />
                  <RdsButton class=" btn-link " label={props.buttonLabel2 + " >"} />
                </div>
              )}
              {props.showLinkButton === false && (
                <div
                  className="d-flex justify-content-between align-items-center"
                  
                >
                  {props.showFooterLabel === true && (
                  <label className={` fs-4 fw-medium text-${props.colorVariant}`}  >{props.footerLabelText}</label>
                  )}
                  {props.showFooterButton === true && (
                  <div>
                    <RdsButton
                      label={props.buttonLabel1}
                      colorVariant={props.colorVariant}
                    ></RdsButton>
                  </div>
                  )}
                </div>
              )}
            </div>
          )}
       </div> )}
      </div>
    </Fragment>
  );
};

export default RdsCard;