import React, { Fragment } from "react";
import { colors } from "../../libs/types";
import RdsAvatar from "../rds-avatar";

import "./rds-card.css";
import RdsButton from "../rds-button";
import RdsIcon from "../rds-icon";

export interface RdsCardProps {
    buttonLabel?: string;
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
    
}

const RdsCard = (props: RdsCardProps) => {
    const btnColor = "btn btn-md btn-" + (props.colorVariant || "primary");
    const isCenter = props.centerAlign || false;
    console.log("props.borderColor",    `text-color-${props.colorVariant}`);
    const borderColor = `border border-${props.borderColor}`;
 
    return (
      <Fragment>
        <div
          className={`card  ${
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
                      ></RdsAvatar>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {props.isImage || props.isAvatar || !props.iconShow ? (
            <div className="card-body">
              <RdsIcon
                colorVariant={props.colorVariant}
                height="20px"
                isCursorPointer
                stroke
                width="20px"
              />
              <br></br>
              {props.showTitle && (
                <h5 className={`${isCenter ? "" : "mt-3"} `}>
                  {props.cardTitle}
                </h5>
              )}
              {props.showSubTitle && (
                <h6
                  className={`${
                    props.state === "Selected"
                      ? `text-color-${props.colorVariant}`
                      : ""
                  }`}
                >
                  {props.cardSubTitle}
                </h6>
              )}<br></br>
              <p>{props.cardText}</p>
            </div>
          ) : (
            <>
              {/* <div className="card-body">
                        <RdsIcon
                            colorVariant="primary"
                            height="20px"
                            isCursorPointer
                            name="users"
                            stroke
                            width="20px"
                            />
                            <br></br>
                            <h5>{props.cardTitle}</h5>
                            <h6>{props.cardSubTitle}</h6>
                        </div> */}

              <div className="card-body">
                <RdsIcon
                  colorVariant={props.colorVariant}
                  height="20px"
                  isCursorPointer
                  name={props.iconName}
                  stroke
                  width="20px"
                />

                {props.showTitle && (
                  <h5 className={`${isCenter ? "" : "mt-3"}`}>
                    {props.cardTitle}
                  </h5>
                )}
                {props.showSubTitle && (
                  <h6
                    className={`${isCenter ? "" : "mt-3"} ${
                      props.state === "Selected" ? `text-color-${props.colorVariant}` : ""
                    }`}
                  >
                    {props.cardSubTitle}
                  </h6>
                )}<br></br>
                <p>{props.cardText}</p>
              </div>
            </>
          )}

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
              <RdsButton
                class="btn-link"
                label={props.buttonLabel + " >"}
              
              />
              <br></br>
              <RdsButton
                class="btn-link"
                label={props.buttonLabel + " >"}
               
              />
            </div>
          )}
        </div>
      </Fragment>
    );
};

export default RdsCard;
