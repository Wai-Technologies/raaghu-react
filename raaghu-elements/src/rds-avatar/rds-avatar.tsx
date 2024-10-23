import React, { Fragment } from "react";
import "./rds-avatar.css";

import validator from "validator";
import { colors } from "../../libs/types";

export interface RdsAvatarProps {
    avatars?: RdsAvatarProps[];
    profilePic?: string;
    withProfilePic?: boolean;
    firstName?: string;
    lastName?: string;
    role?: string;
    colorVariant?: colors;
    titleAlign?: string;
    size?: "smallest" | "small" | "large" | "medium" | "largest";
    verticallyAlligned?: boolean;
    roundedAvatar?: boolean;
    roundedPills?: boolean;
    height?: string;
    isTitle?: boolean;
    profileContentAlign?: boolean;
    width?: string;
    customClass?:string;
    avtarOnly?: boolean;
    avtarWithName?: boolean;
    nameOnBottom?: boolean;
    stackingAvatar?: boolean;
    activeDotTop?: boolean;
    activeDotBottom?: boolean;
    maxVisibleAvatars?: number;
    activityChain?: boolean;
}

const RdsAvatar = (props: RdsAvatarProps) => {
    const tAlign = props.titleAlign;
    const Align = `${props.hasOwnProperty("titleAlign") ? tAlign : "horizontal"}`;
    const Aligned = `${Align === "horizontal" ? `${props.customClass} d-flex align-items-center` : "block"}`;


    const profileClass = () => {
        let profileClass: string = `${props.customClass} d-flex align-items-center`;
        if (props.withProfilePic && props.profileContentAlign) {
            profileClass = "d-flex";
        }
        return profileClass;
    }

    const classes = () => {
        let classes: string = '';
        // const bgColor = 'bg-light' ;
        // classes = bgColor;
        if (props.roundedPills) {
            classes += " rounded ";
        }
        if (props.roundedAvatar && props.withProfilePic) {

            classes += " rounded-circle ";
        }
        if (!props.profileContentAlign) {
            classes += " mb-0 ";
        }
       
        if (props.size) {
            const size = 'avatar-' + `${props.size === 'smallest' ? 'smallest' : props.size === 'small' ? 'sm' : props.size === 'medium' ? 'md' : props.size === 'large' ? 'lg' : props.size === 'largest' ? 'largest' : ''}`;
            classes += ' ' + size;
        }
        if ((props.avtarOnly || props.avtarWithName || props.nameOnBottom)&& !props.stackingAvatar) {

            classes += ` rounded-circle ${props.activityChain ? 'border border-2' : ""} border-${props.activityChain ? props.colorVariant  : ""} `;
        }
        if (props.avtarOnly || props.avtarWithName || props.nameOnBottom ||props.stackingAvatar) {

            classes += " rounded-circle ";
        }
        return classes.trim();
    }

    const profileName = () => {
        let classes: string = '';
        if (props.firstName == "" && props.lastName == "") {
            classes = "d-flex";
        }

        return classes;
    }




    const FL = props.firstName || "";
    const LL = props.lastName || "";
    const userRole = props.role || "";
    const backcolor = props.colorVariant || "primary";

    const WPP = props.withProfilePic || false;
    const src = props.profilePic || " ";
    const avtarOnly = props.avtarOnly || false;
    const avtarWithName = props.avtarWithName || false;
    const nameOnBottom = props.nameOnBottom || false;
    const stackingAvatar = props.stackingAvatar || false;


    const validate: boolean = validator.isURL(src);

    const defaultPP =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0m5Cy4lXCbuyG54L0vuo3i5-ALavHe9KmhWA_wDM&s";

    const withPP = `${props.hasOwnProperty("profilePic") && validate === true
        ? props.profilePic
        : defaultPP
        }`;

    const hasName =
        (FL.length != 0 && props.hasOwnProperty("firstName") === true) ||
        (LL.length != 0 && props.hasOwnProperty("lastName") === true);

    const fLetter = FL.charAt(0).toUpperCase();
    const lLetter = LL.charAt(0).toUpperCase();
    const rLetter = userRole.charAt(0).toUpperCase();

    const titleFirstName = fLetter + FL.slice(1) + " ";
    const titleLastName = lLetter + LL.slice(1);
    const titleRole = rLetter + userRole.slice(1);

    const renderAvatars = (avatars: RdsAvatarProps[], maxVisible: number) => {
        const visibleAvatars = avatars.slice(0, maxVisible);
        const remainingCount = avatars.length - maxVisible;

        return (
            <div className="avatar-container">
                {visibleAvatars.map((avatar, index) => (
                    <div key={index} className="avatar">
                        <img  src={avatar.profilePic || defaultPP} className={classes()} alt="profile-default" />
                       
                    </div>
                ))}
                {remainingCount > 0 && (
                    <div className={`${props.size === 'smallest' ? 'plus-indecator-smallest' : props.size === 'small' ? 'plus-indecator-sm' : props.size === 'medium' ? 'plus-indecator-md' : props.size === 'large' ? 'plus-indecator-lg' : props.size === 'largest' ? 'plus-indecator-largest' : ''}`}>+{remainingCount}</div>
                )}
            </div>
        );
    };

    return (
        <Fragment>
            <div className={`${Aligned}`}>
                {WPP === false && hasName && !avtarOnly  && !avtarWithName && !nameOnBottom && !stackingAvatar && !props.isTitle && (
                    <div className={`d-flex justify-content-center bg-light align-items-center avatar rounded-circle ` + classes()}>
                        <div className="avatar-initials flex-shrink-0 d-flex align-items-center">
                            <div className="fw-bold ">
                                {fLetter}{lLetter}
                            </div>
                        </div>
                    </div>
                )}
                {props.isTitle && (
                    <div className={` flex-grow-0 ${Aligned}`}>
                        <div
                            className={`d-flex justify-content-center bg-light me-2 mb-2 align-items-center avatar rounded-circle ` + classes()}
                        >
                            <span className="fw-bold ">
                                {fLetter}
                                {lLetter}
                            </span>
                        </div>
                        <div>
                            <span className="fw-bold ">
                                {titleFirstName}
                                {titleLastName}
                            </span>
                            <br />
                            <span>{titleRole}</span>
                        </div>
                    </div>
                )}
                {WPP === false && !hasName && !stackingAvatar &&(
                    <div className={`flex-grow-0 align-items-center ${Aligned}`}>
                        <img
                            src={defaultPP}
                            className={classes()}
                            alt="profile-default"
                        />
                    </div>
                )}
                {WPP === true && !stackingAvatar &&(
                    <div className={profileClass()}>
                        <div className={`flex-grow-0 gap-2 ${Aligned}`}>
                            <img src={withPP} className={`avatar-sm rounded-circle ` + classes()} alt="profile" />
                            <span className={"avatar-initials flex-grow-1 align-items-center ms-2 fw-bold text-decoration-none" + profileName()}>
                                <div>
                                    <span>{titleFirstName}{titleLastName}</span>
                                    <p className="mb-0 text-muted">
                                        {titleRole}
                                    </p>
                                </div>
                            </span>
                        </div>
                    </div>
                )}

                {(avtarOnly || avtarWithName) && !stackingAvatar && (
                    <>
                    <div className={`flex-grow-0 align-items-center ${Aligned}`} style={{ position: "relative" }}>
                        <img
                            src={withPP}
                            className={classes()}
                            alt="profile-default"
                            style={{padding:'2px'}}
                        />
                        
                       {props.activeDotTop && (  <div className={`dot ${props.size === 'smallest' ? 'top-dot-smallest' : props.size === 'small' ? 'top-dot-sm' : props.size === 'medium' ? 'top-dot-md' : props.size === 'large' ? 'top-dot-lg' : props.size === 'largest' ? 'top-dot-largest' : ''} bg-${props.colorVariant}`}></div>)}
                       {props.activeDotBottom && (  <div className={`dot ${props.size === 'smallest' ? 'bottom-dot-smallest' : props.size === 'small' ? 'bottom-dot-sm' : props.size === 'medium' ? 'bottom-dot-md' : props.size === 'large' ? 'bottom-dot-lg' : props.size === 'largest' ? 'bottom-dot-largest' : ''} bg-${props.colorVariant}`}></div>)}                       
                    </div>
                    {avtarWithName && (
                         <span className={`avatar-initials flex-grow-1 align-items-center ms-2 fw-bold text-decoration-none ${props.size === 'smallest' ? 'textTopSmall' : props.size === 'small' ? 'textTopSm' : props.size === 'medium' ? 'textTopMd' : props.size === 'large' ? 'textTopLg' : props.size === 'largest' ? 'textTopLarge' : ''}` + profileName()} >
                         <div>
                             <span>{titleFirstName}{titleLastName}</span>
                             <p className="mb-0 text-muted">
                                 {titleRole}
                             </p>
                         </div>
                     </span>
                    )}
                    </>
                )}

                {nameOnBottom && !stackingAvatar && (
                        <>
                        <div
                        className="card text-center border-0"
                            >
                        <div className="card-body">
                            <img
                            alt="Profile"
                            src={withPP}
                                className={classes()}
                                style={{padding:'2px'}}
                    
                            />
                            {props.activeDotTop && (  <div className={`dot ${props.size === 'smallest' ? 'top-dot-smallest-name-on-top' : props.size === 'small' ? 'top-dot-sm-name-on-top' : props.size === 'medium' ? 'top-dot-md-name-on-top' : props.size === 'large' ? 'top-dot-lg-name-on-top' : props.size === 'largest' ? 'top-dot-largest-name-on-bottom' : ''} bg-${props.colorVariant}`}></div>)}
                            {props.activeDotBottom && (  <div className={`dot ${props.size === 'smallest' ? 'bottom-dot-smallest-name-on-bottom' : props.size === 'small' ? 'bottom-dot-sm-name-on-bottom' : props.size === 'medium' ? 'bottom-dot-md-name-on-bottom' : props.size === 'large' ? 'bottom-dot-lg-name-on-bottom' : props.size === 'largest' ? 'bottom-dot-largest-name-on-bottom' : ''} bg-${props.colorVariant}`}></div>)}               
                            <span className={`avatar-initials flex-grow-1 align-items-center ms-2 fw-bold text-decoration-none ${props.size === 'smallest' ? 'textTopSmall' : props.size === 'small' ? 'textTopSm' : props.size === 'medium' ? 'textTopMd' : props.size === 'large' ? 'textTopLg' : props.size === 'largest' ? 'textTopLarge' : ''}` + profileName()} >        
                            <h5 className="card-title mb-1 fw-bold mt-2">{titleFirstName}{titleLastName}</h5>
                            <p className="card-text text-muted">{titleRole}</p>
                            </span>
                        </div>
                        </div>

                        </>
                    )}

                {stackingAvatar && (
                        <>
                        <div
                        className="card text-center border-0"
                            >
                                {props.stackingAvatar && props.avatars && renderAvatars(props.avatars, props.maxVisibleAvatars || 3)}
                        </div>

                        </>
                    )}
                </div>
        </Fragment>
    );
};

export default RdsAvatar;
