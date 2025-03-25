import React, { Fragment } from "react";
import "./rds-avatar.css";

import validator from "validator";
import { colors } from "../../libs/types";
import RdsIcon from "../rds-icon/rds-icon";

export enum AvatarSize {
  smallest = "smallest",
  small = "small",
  medium = "medium",
  large = "large",
  largest = "largest"
}

export enum AvatarBorder {
  solid = "solid",
  dotted = "dotted",
  dashed = "dashed",
  NoBorder = "NoBorder"
}

export enum AvatarStyle {
  withname = "withname",
  nameonbottom = "nameonbottom",
  stacking = "stacking"
}

export interface RdsAvatarProps {
  avatars?: RdsAvatarProps[];
  profilePic?: string;
  withProfilePic?: boolean;
  firstName?: string;
  lastName?: string;
  role?: string;
  colorVariant?: colors;
  title?: string;
  size?: AvatarSize;
  verticallyAlligned?: boolean;
  roundedAvatar?: boolean;
  roundedPills?: boolean;
  height?: string;
  isTitle?: boolean;
  profileContentAlign?: boolean;
  width?: string;
  customClass?: string;
  avtarOnly?: boolean;
  avtarWithName?: boolean;
  nameOnBottom?: boolean;
  stackingAvatar?: boolean;
  activeDotTop?: boolean;
  activeDotBottom?: boolean;
  maxVisibleAvatars?: number;
  activityRing?: boolean;
  type?: string;
  iconName?: string;
  border?: AvatarBorder;
  showName?: boolean;
  style?: AvatarStyle;
  showNameDesignation?: boolean;
}

const RdsAvatar = (props: RdsAvatarProps) => {
  const { profilePic } = props;
  const tAlign = props.title;
  const Align = `${props.hasOwnProperty("titleAlign") ? tAlign : "horizontal"}`;
  const Aligned = `${
    Align === "horizontal"
      ? `${props.customClass} d-flex align-items-center`
      : "block"
  }`;

  const profileClass = () => {
    let profileClass: string = `${props.customClass} d-flex align-items-center`;
    if (props.withProfilePic && props.profileContentAlign) {
      profileClass = "d-flex";
    }
    return profileClass;
  };

  const classes = () => {
    let classes: string = "";
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
      const size =
        "avatar-" +
        `${
          props.size === "smallest"
            ? "smallest "
            : props.size === "small"
            ? "sm "
            : props.size === "medium"
            ? "md "
            : props.size === "large"
            ? "lg "
            : props.size === "largest"
            ? "largest "
            : ""
        }`;
      classes += " " + size;
    }
    if (
      (props.avtarOnly || props.style==="withname" || props.style==="nameonbottom") &&
      props.style!=="stacking"
    ) {
      classes += ` rounded-circle ${
        props.activityRing ? "border border-2" : ""
      } border-${props.activityRing ? props.colorVariant : ""} `;
    }
    if (
      props.avtarOnly ||
      props.style==="withname" ||
      props.style==="nameonbottom" ||
      props.style==="stacking"
    ) {
      classes += " rounded-circle ";
    }
    return classes.trim();
  };

  const profileName = () => {
    let classes: string = "";
    if (props.firstName == "" && props.lastName == "") {
      classes = "d-flex";
    }

    return classes;
  };

  const getBorderClasses = (border: any) => {
    switch (border) {
      case "solid":
        return " avatar-solid rounded-5";
      case "dotted":
        return " avatar-dotted rounded-5";
      case "dashed":
        return " avatar-dashed rounded-5";
      case "NoBorder":
        return " none ";
    }
    return " ";
  };

  // Function to get icon size based on the size prop
  const getIconSize = (size: any) => {
    switch (size) {
      case "smallest":
        return { height: "10px", width: "10px" };
      case "small":
        return { height: "15px", width: "15px" };
      case "medium":
        return { height: "20px", width: "20px" };
      case "large":
        return { height: "25px", width: "25px" };
      case "largest":
        return { height: "30px", width: "30px" };
      default:
        return { height: "20px", width: "20px" };
    }
  };

  const iconSize = getIconSize(props.size);

  const FL = props.firstName || "";
  const LL = props.lastName || "";
  const userRole = props.role || "";
  const backcolor = props.colorVariant || "primary";

  //const WPP = props.type==="image" || false;
  const WPP = props.withProfilePic || false;
  const src = props.profilePic || " ";
  const avtarOnly = props.avtarOnly || false;
  //const avtarWithName = props.avtarWithName || false;
  const avtarWithName = props.style === "withname" || false;
  //const nameOnBottom = props.nameOnBottom || false;
  const nameOnBottom = props.style==="nameonbottom" || false;
  //const stackingAvatar = props.stackingAvatar || false;
  const stackingAvatar = (props.style==="stacking" || false);
  const withIcon = props.iconName ? true : false;

  const validate: boolean = validator.isURL(src);

  const defaultPP =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0m5Cy4lXCbuyG54L0vuo3i5-ALavHe9KmhWA_wDM&s";

  const withPP = `${
    props.hasOwnProperty("profilePic") && validate === true
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
              <img id="stackingavtar"
                src={avatar.profilePic || defaultPP}
                className={classes() + getBorderClasses(props.border) +"rounded-3"}
                alt="profile-default"
              />
            </div>
        ))}
        {remainingCount > 0 && (
          <div id="stackingavtarplusindicator"
            className={`${
              props.size === "smallest"
                ? "plus-indecator-smallest"
                : props.size === "small"
                ? "plus-indecator-sm"
                : props.size === "medium"
                ? "plus-indecator-md"
                : props.size === "large"
                ? "plus-indecator-lg"
                : props.size === "largest"
                ? "plus-indecator-largest"
                : ""
            }`}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    );
  };

  return (
    <Fragment>
      <div className={`${Aligned}`}>
        {WPP === false &&
          hasName &&
          !avtarOnly &&
          !avtarWithName &&
          !nameOnBottom &&
          !stackingAvatar &&
          !props.isTitle && (
            <div
              className={
                `d-flex justify-content-center bg-light align-items-center avatar rounded-circle ` +
                classes() +
                getBorderClasses(props.border)
              }
            >
              <div className="avatar-initials flex-shrink-0 d-flex align-items-center">
                <div className="fw-bold ">
                  {fLetter}
                  {lLetter}
                </div>
              </div>
            </div>
          )}
        {props.isTitle && (
          <div className={` flex-grow-0 + ${Aligned}`}>
            <div
              className={
                `d-flex justify-content-center bg-light me-2 mb-2 align-items-center avatar rounded-circle ` +
                classes() +
                getBorderClasses(props.border)
              }
            >
              <span className="fw-bold ">
                {fLetter}
                {lLetter}
              </span>
            </div>
            <div>
              props.showName ? (
              <span className="fw-bold ">
                {titleFirstName}
                {titleLastName}
              </span>
              ) : (
              )
                <br />
              <span>{titleRole}</span>
            </div>
          </div>
        )}
        {WPP === false && !hasName && !stackingAvatar && !withIcon && (
          <div className={`flex-grow-0 align-items-center ${Aligned}`}>
            <img
              src={defaultPP}
              className={classes() + getBorderClasses(props.border) + " rounded-3"}
              alt="profile-default"
            />
          </div>
        )}
        {WPP === true && !stackingAvatar && (
          <div className={profileClass()}>
            <div className={`flex-grow-0 gap-2 ${Aligned}`}>
              <img
                src={withPP}
                className={
                  `avatar rounded-circle ` + classes() + getBorderClasses(props.border)
                }
                alt="profile"
              />
              
                <span
                  className={
                    "avatar-initials flex-grow-1 align-items-center ms-2 fw-bold text-decoration-none" +
                    profileName()
                  }
                >
                  <div>
                    <span>
                      {titleFirstName}
                      {titleLastName}
                    </span>
                    <p className="mb-0 text-muted">{titleRole}</p>
                  </div>
                </span>
            </div>
          </div>
        )}

        {(avtarOnly || avtarWithName) && !stackingAvatar && (
          <>
            {props.type === "initials" ? (
              <div
                className={
                  `d-flex justify-content-center bg-light align-items-center avatar rounded-circle ` +
                  classes() +
                  getBorderClasses(props.border)
                }
              >
                <div className="avatar-initials flex-shrink-0 d-flex align-items-center">
                  <div className="fw-bold">
                    {fLetter}
                    {lLetter}
                  </div>

                  {props.activeDotTop && (
                    <div
                      className={`dot ${
                        props.size === "smallest"
                          ? "top-dot-smallest"
                          : props.size === "small"
                          ? "top-dot-sm"
                          : props.size === "medium"
                          ? "top-dot-md"
                          : props.size === "large"
                          ? "top-dot-lg"
                          : props.size === "largest"
                          ? "top-dot-largest"
                          : ""
                      } bg-${props.colorVariant}`}
                    ></div>
                  )}
                  {props.activeDotBottom && (
                    <div
                      className={`dot ${
                        props.size === "smallest"
                          ? "bottom-dot-smallest"
                          : props.size === "small"
                          ? "bottom-dot-sm"
                          : props.size === "medium"
                          ? "bottom-dot-md"
                          : props.size === "large"
                          ? "bottom-dot-lg"
                          : props.size === "largest"
                          ? "bottom-dot-largest"
                          : ""
                      } bg-${props.colorVariant}`}
                    ></div>
                  )}
                </div>
              </div>
            ) : props.type === "icon" ? (
              <div
                className={
                  `d-flex justify-content-center align-items-center avatar rounded-circle ` +
                  classes() +
                  getBorderClasses(props.border)
                }
              >
                <RdsIcon
                  name="user_identity"
                  fill={false}
                  stroke={false}
                  height={iconSize.height}
                  width={iconSize.width}
                ></RdsIcon>
                {props.activeDotTop && (
                  <div
                    className={`dot ${
                      props.size === "smallest"
                        ? "top-dot-smallest"
                        : props.size === "small"
                        ? "top-dot-sm"
                        : props.size === "medium"
                        ? "top-dot-md"
                        : props.size === "large"
                        ? "top-dot-lg"
                        : props.size === "largest"
                        ? "top-dot-largest"
                        : ""
                    } bg-${props.colorVariant}`}
                  ></div>
                )}
                {props.activeDotBottom && (
                  <div
                    className={`dot ${
                      props.size === "smallest"
                        ? "bottom-dot-smallest"
                        : props.size === "small"
                        ? "bottom-dot-sm"
                        : props.size === "medium"
                        ? "bottom-dot-md"
                        : props.size === "large"
                        ? "bottom-dot-lg"
                        : props.size === "largest"
                        ? "bottom-dot-largest"
                        : ""
                    } bg-${props.colorVariant}`}
                  ></div>
                )}
              </div>
            ) : (
              <div
                className={`flex-grow-0 align-items-center ${Aligned}`}
                style={{ position: "relative" }}
              >
                <img
                  src={withPP}
                  className={classes() + getBorderClasses(props.border)}
                  alt="profile-default"
                  style={{ padding: "2px" }}
                />

                {props.activeDotTop && (
                  <div
                    className={`dot ${
                      props.size === "smallest"
                        ? "top-dot-smallest"
                        : props.size === "small"
                        ? "top-dot-sm"
                        : props.size === "medium"
                        ? "top-dot-md"
                        : props.size === "large"
                        ? "top-dot-lg"
                        : props.size === "largest"
                        ? "top-dot-largest"
                        : ""
                    } bg-${props.colorVariant}`}
                  ></div>
                )}
                {props.activeDotBottom && (
                  <div
                    className={`dot ${
                      props.size === "smallest"
                        ? "bottom-dot-smallest"
                        : props.size === "small"
                        ? "bottom-dot-sm"
                        : props.size === "medium"
                        ? "bottom-dot-md"
                        : props.size === "large"
                        ? "bottom-dot-lg"
                        : props.size === "largest"
                        ? "bottom-dot-largest"
                        : ""
                    } bg-${props.colorVariant}`}
                  ></div>
                )}
              </div>
            )}

            {avtarWithName && props.showName===true && props.showNameDesignation===true ? (
              <span
                className={
                  `avatar-initials flex-grow-1 align-items-center ms-2 fw-bold text-decoration-none ${
                    props.type === "initials" || props.type === "icon"
                      ? "ps-2"
                      : ""
                  }  ${
                    props.size === "smallest"
                      ? "textTopSmall"
                      : props.size === "small"
                      ? "textTopSm"
                      : props.size === "medium"
                      ? "textTopMd"
                      : props.size === "large"
                      ? "textTopLg"
                      : props.size === "largest"
                      ? "textTopLarge"
                      : ""
                  }` + profileName()
                }
              >
                <div>
                  <span>
                    {titleFirstName}
                    {titleLastName}
                  </span>
                  <p className="mb-0 text-muted">
                    {titleRole}
                    
                  </p>
                </div>
              </span>
            ): avtarWithName && props.showName===true && props.showNameDesignation===false ? (
              <span
                className={
                  `avatar-initials flex-grow-1 align-items-center ms-2 fw-bold text-decoration-none ${
                    props.type === "initials" || props.type === "icon"
                      ? "ps-2"
                      : ""
                  }  ${
                    props.size === "smallest"
                      ? "textTopSmall"
                      : props.size === "small"
                      ? "textTopSm"
                      : props.size === "medium"
                      ? "textTopMd"
                      : props.size === "large"
                      ? "textTopLg"
                      : props.size === "largest"
                      ? "textTopLarge"
                      : ""
                  }` + profileName()
                }
              >
                <div>
                  <span>
                    {titleFirstName}
                    {titleLastName}
                  </span>
                </div>
              </span>
            ): avtarWithName && props.showName===false && props.showNameDesignation===true ? (
              <span
                className={
                  `avatar-initials flex-grow-1 align-items-center ms-2 fw-bold text-decoration-none ${
                    props.type === "initials" || props.type === "icon"
                      ? "ps-2"
                      : ""
                  }  ${
                    props.size === "smallest"
                      ? "textTopSmall"
                      : props.size === "small"
                      ? "textTopSm"
                      : props.size === "medium"
                      ? "textTopMd"
                      : props.size === "large"
                      ? "textTopLg"
                      : props.size === "largest"
                      ? "textTopLarge"
                      : ""
                  }` + profileName()
                }
              >
                <div>
                  <p className="mb-0 text-muted">
                    {titleRole}
                  </p>
                </div>
              </span>
            ): (
              <></>
            )}
          </>
        )}

        {nameOnBottom && !stackingAvatar && (
          <>
            <div className="card text-center border-0 d-flex flex-column align-items-center position-relative">
              <div className="card-body d-flex flex-column align-items-center position-relative">
                <div className="avatar-wrapper position-relative d-flex align-items-center justify-content-center">
                  {props.type === "initials" ? (
                    <div
                      className={
                      `avatar rounded-circle d-flex align-items-center justify-content-center ` +
                      classes() +
                      getBorderClasses(props.border)
                    }
                    >
                    <div className="avatar-initials fw-bold">{fLetter}{lLetter}</div>
                    </div>
                  ) : props.type === "icon" ? (
                    <div
                      className={
                      `avatar rounded-circle d-flex align-items-center justify-content-center ` +
                      classes() +
                      getBorderClasses(props.border)
                    }
                    >
                    <RdsIcon
                      name="user_identity"
                      fill={false}
                      stroke={false}
                      height={iconSize.height}
                      width={iconSize.width}
                    />
                    </div>
                  ) : (
                    <img
                      alt="Profile"
                      src={withPP}
                      className={`avatar rounded-circle ` + classes() + getBorderClasses(props.border)}
                      style={{ padding: "2px" }}
                    />
                  )}

                  {/* Top Active Dot - Positioned Top-Right */}
                  {props.activeDotTop && (
                    <div
                      className={`dot position-absolute ${
                      props.size === "smallest"
                      ? "top-dot-smallest"
                      : props.size === "small"
                      ? "top-dot-sm"
                      : props.size === "medium"
                      ? "top-dot-md"
                      : props.size === "large"
                      ? "top-dot-lg"
                      : props.size === "largest"
                      ? "top-dot-largest"
                      : ""
                      } bg-${props.colorVariant}`}
                    ></div>
                  )}

                  {/* Bottom Active Dot - Positioned Bottom-Right */}
                  {props.activeDotBottom && (
                    <div
                      className={`dot position-absolute ${
                      props.size === "smallest"
                      ? "bottom-dot-smallest"
                      : props.size === "small"
                      ? "bottom-dot-sm"
                      : props.size === "medium"
                      ? "bottom-dot-md"
                      : props.size === "large"
                      ? "bottom-dot-lg"
                      : props.size === "largest"
                      ? "bottom-dot-largest"
                      : ""
                      } bg-${props.colorVariant}`}
                    ></div>
                  )}
                </div>

                {/* Name and Role */}
                {props.showName===true && props.showNameDesignation===true ? (
                  <span className={`avatar-initials text-center fw-bold mt-2 ${
                    props.size === "smallest"
                      ? "textTopSmall"
                      : props.size === "small"
                      ? "textTopSm"
                      : props.size === "medium"
                      ? "textTopMd"
                      : props.size === "large"
                      ? "textTopLg"
                      : props.size === "largest"
                      ? "textTopLarge"
                      : ""
                    }` + profileName()}>
                    <h5 className="card-title mb-1 fw-bold">{titleFirstName} {titleLastName}</h5>
                    <p className="card-text text-muted">{titleRole}</p>
                  </span>
                  ) : props.showName===true && props.showNameDesignation===false ? (
                  <span className={`avatar-initials text-center fw-bold mt-2 ${
                    props.size === "smallest"
                      ? "textTopSmall"
                      : props.size === "small"
                      ? "textTopSm"
                      : props.size === "medium"
                      ? "textTopMd"
                      : props.size === "large"
                      ? "textTopLg"
                      : props.size === "largest"
                      ? "textTopLarge"
                      : ""
                    }` + profileName()}>
                    <h5 className="card-title mb-1 fw-bold">{titleFirstName} {titleLastName}</h5>
                  </span>
                  ) : props.showName===false && props.showNameDesignation===true ? (
                  <span className={`avatar-initials text-center fw-bold mt-2 ${
                    props.size === "smallest"
                    ? "textTopSmall"
                    : props.size === "small"
                    ? "textTopSm"
                    : props.size === "medium"
                    ? "textTopMd"
                    : props.size === "large"
                    ? "textTopLg"
                    : props.size === "largest"
                    ? "textTopLarge"
                    : ""
                  }` + profileName()}>
                  <p className="card-text text-muted">{titleRole}</p>
                </span>): (
                  <></>
                )}
              </div>
            </div>
          </>
        )}

        {withIcon && props.type !== "image" && (
          <div className={`d-flex justify-content-center align-items-center avatar rounded-circle ` + classes() + getBorderClasses(props.border)}>
            <RdsIcon
              name={props.iconName}
              fill={false}
              stroke={true}
              height={iconSize.height}
              width={iconSize.width}
            ></RdsIcon>
          </div>
        )}
         {stackingAvatar && (
            <>
              <div
                className="card text-center border-0 stacking-avatar"
              >
                {props.style==="stacking" && props.avatars && renderAvatars(props.avatars, props.maxVisibleAvatars || 3)}
              </div>

            </>
          )}
      </div>
      
    </Fragment>
  );
};

export default RdsAvatar;
