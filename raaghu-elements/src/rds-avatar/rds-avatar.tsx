import React, { Fragment } from "react";
import "./rds-avatar.css";

import validator from "validator";
import { colors } from "../../libs/types";

export interface RdsAvatarProps {
    profilePic?: string;
    withProfilePic?: boolean;
    firstName?: string;
    lastName?: string;
    role?: string;
    colorVariant: string;
    titleAlign?: string;
    size?: "smallest"|"small" | "large" | "medium"| "largest";
    verticallyAlligned?: boolean;
    roundedAvatar?: boolean;
    roundedPills?: boolean;
    height?: string;
    isTitle?: boolean;
    profileContentAlign?: boolean;
    width?: string;
    activityChain?: boolean;
    activeDotTop?: boolean;
    activeDotBottom?: boolean;
    customClass?:string;
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
            classes = " rounded ";
        }
        if (props.roundedAvatar && props.withProfilePic) {

            classes = " rounded-circle ";
        }
        if (!props.profileContentAlign) {
            classes = " mb-0 ";
        }

        if (props.size) {
            const size = 'avatar-' + `${props.size === 'smallest' ? 'xs' : props.size === 'small' ? 'sm' : props.size === 'large' ? 'lg' : props.size === 'largest' ? 'xl': 'md'}`;
            classes = ' ' + size;
        }
        return classes;
    }

        const profileName = () => (!props.firstName && !props.lastName) ? "d-flex" : '';

    const FL = props.firstName || "";
    const LL = props.lastName || "";
    const userRole = props.role || "";
    const backcolor = props.colorVariant || "primary";

    const WPP = props.withProfilePic || false;
    const src = props.profilePic || " ";

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

    return (
        <Fragment>
            <div className={`${Aligned}`}>
                {WPP === false && hasName && !props.isTitle && (
                    <div className={`d-flex justify-content-center bg-light align-items-center avatar rounded-circle ` + classes()}>
                        <div className={`${props.activityChain?"avatar-ring ":"hidden-ring avatar-ring "} d-flex   p-1 border-2 ${props.activityChain ? `border border-${props.colorVariant}` : ''}`}>
                            {props.activeDotTop && 
                           <div className={`dot-one bg-${props.colorVariant}`}></div>}
                            {props.activeDotBottom && <div className={`dot-two bg-${props.colorVariant}`}></div>}
                           <div className="avatar-initials flex-shrink-0 d-flex align-items-center">
                            <div className="fw-bold ">
                                {fLetter}{lLetter}
                            </div>
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
                {WPP === false && !hasName && (
                    <div className={`flex-grow-0 align-items-center ${Aligned}`}>
                        <img
                            src={defaultPP}
                            className={classes()}
                            alt="profile-default"
                        />
                    </div>
                )}
                {WPP === true && (
                    <div className={profileClass()}>
                        <div className={`${classes()} ${Aligned}` }>
                            <div className={`${props.activityChain?"avatar-ring ":"hidden-ring avatar-ring "} d-flex  align-items-center p-1 border-2 me-2 ${props.activityChain ? `border border-${props.colorVariant}` : ''}`}>
                            {props.activeDotTop && <div className={`dot-one bg-${props.colorVariant}`}></div>}
                            {props.activeDotBottom && <div className={`dot-two bg-${props.colorVariant}`}></div>}

                                <img src={withPP} className="avatar-inner" alt="profile" />
                            </div>
                            {hasName && (
                                <span className={`avatar-initials fw-bold me-2 ${profileClass()}`}>
                                    <div className="nowrap">
                                        <span>{FL} {LL}</span>
                                        {userRole && <p className="mb-0 text-muted">{userRole}</p>}
                                    </div>
                                </span>
                            )}
                        </div>
                    </div>
                )}


            </div>
        </Fragment>
    );
};

export default RdsAvatar;
