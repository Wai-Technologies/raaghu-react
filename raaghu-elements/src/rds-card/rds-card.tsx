import React, { Fragment } from "react";
import { colors } from "../../libs/types";
import RdsAvatar from "../rds-avatar";

import "./rds-card.css";
import RdsButton from "../rds-button";
import RdsIcon from "../rds-icon";
import { isDisabled } from "@testing-library/user-event/dist/types/utils";

export interface RdsCardProps {
    buttonLabel?: string;
    colorVariant?: colors;
    cardTitle?: string;
    cardSubTitle?: string;
    cardText?: string;
    showFooter?: boolean;
    isImage?: boolean;
    imageUrl?: string;
    src?: string;
    centerAlign?: boolean;
    isAvatar?: boolean;
    borderColor?: colors;
    isDisabled ? : boolean
    iconName ? : string ;
    isBordered ? : boolean ;
    isFilled ? : boolean ;
    
}

const RdsCard = (props: RdsCardProps) => {
    const btnColor = "btn btn-md btn-" + (props.colorVariant || "primary");
    const isCenter = props.centerAlign || false;
    const borderColor = `border border-${props.borderColor}`;

    return (
        <Fragment>
           <div className={`card ${props.borderColor ? props.borderColor : ""} ${props.isDisabled ? 'card-disabled' : ""} ${props.isBordered ? 'card-bordered' : ""} ${props.isFilled ? 'card-filled' : ""}`}>

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

                {props.isImage || props.isAvatar ? (
                    <div className="card-body">
                        <RdsIcon
                            colorVariant="primary"
                            height="20px"
                            isCursorPointer                           
                            stroke
                            width="20px"
                            />
                            <br></br>
                        <h5 className={`${isCenter ? "" : "mt-3"}`}>{props.cardTitle}</h5>
                        <h6>{props.cardSubTitle}</h6>
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
                            colorVariant="primary"
                            height="20px"
                            isCursorPointer
                            name={props.iconName}
                            stroke
                            width="20px"
                            />

                        <h5 className={`${isCenter ? "" : "mt-3"}`}>{props.cardTitle}</h5>
                        <h6 className={`${isCenter ? "" : "mt-3"}`}>{props.cardSubTitle}</h6>
                        <p>{props.cardText}</p>
                    </div>
                    </>
                )}
              
                   {props.showFooter === true && (
                   <div className={`card-footer ${props.isFilled ? 'card-filled' : ""}`}>
                    <RdsButton
                    class="btn-link"
                    label="Link Button >"
                    />  
                    <br></br> 
                     <RdsButton
                    class="btn-link"
                    label="Link Button >"
                    />                                         
                    </div>
                    
                )}
            </div>
        </Fragment>
    );
};

export default RdsCard;
