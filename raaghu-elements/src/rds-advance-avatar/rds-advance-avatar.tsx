import React, { Fragment } from "react";
import "./rds-advance-avatar.css";
import validator from "validator";
import { colors } from "../../libs";

export interface RdsAdvanceAvatarProps {
    profilePic?: string;
    withProfilePic?: boolean;
    firstName?: string;
    lastName?: string;
    role?: string;
    titleAlign?: string;
    size?: "smallest" | "small" | "medium" | "large" | "largest";
    activityChain?: boolean;
    activeDotTop?: boolean;
    activeDotBottom?: boolean;
    colorVariant?: string; 
    customClass?:string;
}

const RdsAdvanceAvatar = (props: RdsAdvanceAvatarProps) => {
    const tAlign = props.titleAlign;
    const Align = `${props.hasOwnProperty("titleAlign") ? tAlign : "horizontal"}`;
    const Aligned = `${Align === "horizontal" ? `${props.customClass} d-flex align-items-center` : "block"}`;

    const {  withProfilePic} = props;
    
    const classes = () => {
        let className = 'rounded-circle';
        if (props.size) {
            const size = 'avatar-' + 
                (props.size === 'smallest' ? 'xs' :
                props.size === 'small' ? 'sm' :
                props.size === 'largest' ? 'xl' :
                props.size === 'large' ? 'lg' : 'md');
            className += ' ' + size;
        }
        return className;
    };

    const profileNameClass = () => (!props.firstName && !props.lastName) ? "d-flex" : '';

    const FL = props.firstName || "";
    const LL = props.lastName || "";
    const userRole = props.role || "";

    const src = props.profilePic || "";
    const isValidURL = validator.isURL(src);
    const defaultPP = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0m5Cy4lXCbuyG54L0vuo3i5-ALavHe9KmhWA_wDM&s";
    const profilePicURL = isValidURL ? src : defaultPP;

    const hasName = FL.length !== 0 || LL.length !== 0;
    const initials = (FL[0] || "").toUpperCase() + (LL[0] || "").toUpperCase();

    return (
        <Fragment>
                {!withProfilePic ? (
                      <div className={`${classes()} ${Aligned}`}>
                        <div className={`${props.activityChain?"avatar-ring ":"hidden-ring avatar-ring "} d-flex  align-items-center  p-1 border-2 ${props.activityChain ? `border border-${props.colorVariant}` : ''}`}>
                        {props.activeDotTop && 
                        <div className={`dot-one bg-${props.colorVariant}`}></div>}
                        {props.activeDotBottom && <div className={`dot-two bg-${props.colorVariant}`}></div>}

                            {withProfilePic ? (
                                <img src={profilePicURL} className="avatar-inner" alt="profile" />
                               ) : (
                            <div className="avatar-inner  d-flex align-items-center justify-content-center">
                                <div className="fw-bold">
                                    {hasName ? initials : <img src={defaultPP} className={`avatar-inner ${classes()}`} alt="profile-default" />}
                                </div>
                            </div>
                          )}
                      </div>
                    </div>
                // </div>
                ) : (
                      <div className={props.withProfilePic ? "align-items-center" : "justify-content-center align-items-center"}>
                        <div className={`${classes()} ${Aligned}` }>
                            <div className={`${props.activityChain?"avatar-ring ":"hidden-ring avatar-ring "} d-flex  align-items-center p-1 border-2 me-2 ${props.activityChain ? `border border-${props.colorVariant}` : ''}`}>
                            {props.activeDotTop && <div className={`dot-one bg-${props.colorVariant}`}></div>}
                            {props.activeDotBottom && <div className={`dot-two bg-${props.colorVariant}`}></div>}

                                <img src={profilePicURL} className="avatar-inner" alt="profile" />
                            </div>
                            {hasName && (
                                <span className={`avatar-initials fw-bold me-2 ${profileNameClass()}`}>
                                    <div className="nowrap">
                                        <span>{FL} {LL}</span>
                                        {userRole && <p className="mb-0 text-muted">{userRole}</p>}
                                    </div>
                                </span>
                            )}
                        </div>
                    </div>
                )}
        </Fragment>
    );
};

export default RdsAdvanceAvatar;
