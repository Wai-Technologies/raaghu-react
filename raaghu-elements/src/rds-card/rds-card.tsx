import React, { Fragment, ReactNode, useState } from "react";
import { colors } from "../../libs/types";
import RdsAvatar from "../rds-avatar";
import "./rds-card.css";
import RdsButton from "../rds-button";
import RdsIcon from "../rds-icon";
import RdsLabel from "../rds-label";
import RdsBadge from "../rds-badge";
import RdsTag from "../rds-tag";
import RdsInput from "../rds-input";
import RdsBigNumber from "../rds-big-number";
export interface RdsCardProps {
  buttonLabel1?: string;
  buttonLabel2?: string;
  buttonLabel3?: string;
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
  style?: string;
  state?: string;
  centerAlign?: boolean;
  isAvatar?: boolean;
  borderColor?: colors;
  isDisabled?: boolean;
  iconName?: string;
  isBordered?: boolean;
  isFilled?: boolean;
  showIcon?: boolean;
  layout?: "Vertical" | "Horizontal";
  showCalender?: boolean;
  showLinkButton?: boolean;
  title?: string;
  showFooterLabel?: boolean;
  footerLabelText?: string;
  showFooterButton?: boolean;
  subTitle?: string;
  showIndicator?: boolean;
  type?: "Card With Image" | "Card With Ring Chart" | "Card With Map" | "Card With Graph" | "Example-Badges" | "Card With Button" | "Card With Link Button" | "Example-Avatar" | "Example-Tags" |"Card With Boolean Chart" | "Card With Line Chart" | "Card With DataTable" | "Card With Chart" | "Card With Table";
  showTitleAndSubText?: boolean;
  initialFirstName?: string;
  initialLastName?: string;
  role?: string;
  profilePic?: string;
  onEditClick?: () => void;
  onSavedClick?: () => void;
  isEditing?: boolean;
  children?: ReactNode;
  showCardText?: boolean;
}

const RdsCard = (props: RdsCardProps) => {
  const btnColor = "btn btn-md btn-" + (props.colorVariant || "primary");
  const isCenter = props.centerAlign || false;
  const borderColor = `border border-${props.borderColor}`;
  const [isEditing, setIsEditing] = useState(props.isEditing || false);
  const [cardTitle, setCardTitle] = useState(props.cardTitle);
  const [cardSubTitle, setCardSubTitle] = useState(props.cardSubTitle);
  const [firstName, setFirstName] = useState(props.initialFirstName || "John");
  const [lastName, setLastName] = useState(props.initialLastName || "Doe");
  const [role, setRole] = useState(props.role || "Developer");
  const [profilePic, setProfilePic] = useState(props.profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU");
  const [showEdit, setShowEdit] = useState(false);
  // Define left border styling when showIndicator is true
  const indicatorClass = props.showIndicator
    ? `border-start border-${props.colorVariant || "primary"}`
    : "";

  const renderTitleAndSubtitle = () => {
    if (!props.showTitleAndSubText) return null;

    return (
      <>
        {props.showTitle && (
          <h5 className={`${isCenter ? "" : "mt-3"}`}>{cardTitle}</h5>
        )}
        {props.showSubTitle && (
          <h6
            className={`${props.state === "Selected" ? `text-color-${props.colorVariant}` : ""
              }`}
          >
            {cardSubTitle}
          </h6>
        )}
      </>
    );
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setShowEdit(true);
    if(props.onEditClick) {
      props.onEditClick();
    }
  };

  const handleSaveClick = () => {
    setCardTitle(cardTitle);
    setCardSubTitle(cardSubTitle);
    setFirstName(firstName);
    setLastName(lastName);
    setRole(role);
    setIsEditing(false);
    setShowEdit(false);
    if (props.onSavedClick) {
      props.onSavedClick();
    }
  };

  return (
    <Fragment>
      <div
        className={`card ${props.isDisabled || props.state === "Disabled"
            ? "card-disabled"
            : ""
          } 
         ${props.style === "Outlined" ? `card-bordered ${borderColor}` : ""
          } ${props.style === "Filled" ? "card-filled" : ""} ${props.state === "Hovered" ? "card-hovered" : ""
          } ${props.state === "Selected" ? "card-selected" : ""}
          ${indicatorClass}`}
      >
        <div className="headerClass mx-3 mt-3 ">
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

        {props.showTitle === false && props.showSubTitle === false && props.showCalender === true && (
          <div className="headerClass mt-3 ms-3">
            <div className="d-flex align-items-center">
              {props.showIcon && (
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
              <RdsLabel label={props.subTitle} fontWeight="bold" />
            </span>
          </div>
        )}
        {props.showTitle === false && props.showSubTitle === false ? (
          props.showFooter === true && (
            <div
              className={`card-footer ${props.style === "Filled" ? "card-filled" : ""
                } ${props.isDisabled || props.state === "Disabled"
                  ? "card-disabled"
                  : ""
                } ${props.state === "Hovered" ? "card-hovered" : ""} ${props.state === "Selected" ? "card-selected" : ""
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
                <div className="row">
                  <div className="col-md-10">
                    {props.layout === "Vertical" && (
                      <>
                        {props.showIcon && (
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
                    {props.layout === "Horizontal" && (
                      <div className="d-flex align-items-center">
                        {props.showIcon && (
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
                  </div>
                  <div className="col-md-2 justify-content-end align-items-end text-end mt-3">
                    {props.type === "Example-Avatar" && props.isEditing && (
                      <RdsIcon
                        name="pencil"
                        height="20px"
                        width="20px"
                        colorVariant="primary"
                        onClick={handleEditClick}
                      />
                    )}
                  </div>
                </div>
              {props.layout === undefined && (
                <>
                  {props.showIcon && (
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
              {props.type === "Card With Image" && props.imageUrl && <img src={props.imageUrl} className="card-img-top" alt="Card Image" />}
              {props.children}
              {props.type === "Example-Badges" && (
                <div className="d-flex justify-content-start align-items-center gap-1">
                  <RdsBadge
                    badgeType="box"
                    colorVariant="primary"
                    iconName="notification"
                    iconPosition="right"
                    isIconshow
                    label="Design System"
                    layout="Text_only"
                    size="small"
                    style="tertiary"
                  />
                  <RdsBadge
                    badgeType="box"
                    colorVariant="primary"
                    iconName="notification"
                    iconPosition="right"
                    isIconshow
                    label="Javascript"
                    layout="Text_only"
                    size="small"
                    style="primary"
                  />              </div>
              )}
              {props.type === "Example-Tags" && (
                <div className="d-flex justify-content-start align-items-center gap-1">
                  <RdsTag tagType={"round"} role={"basic"} colorVariant={"primary"} />
                </div>
              )}
              {props.type === "Example-Avatar" && (
                <div className="d-flex justify-content-start align-items-center gap-1">
                    <RdsAvatar
                      activityChain
                      avtarWithName
                      colorVariant="primary"
                      firstName={firstName}
                      lastName={lastName}
                      profilePic={profilePic}
                      role={role}
                      size="large"
                      type="image"
                    />
                </div>
              )}
              {props.type === "Example-Avatar" && showEdit &&(
                <div>
                  <RdsInput
                    value={cardTitle}
                    onChange={(e) => setCardTitle(e.target.value)}
                    placeholder="Card Title"
                  />
                  <RdsInput
                    value={cardSubTitle}
                    onChange={(e) => setCardSubTitle(e.target.value)}
                    placeholder="Card Subtitle"
                  />
                  <RdsInput
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                  />
                  <RdsInput
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                  />
                  <RdsInput
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Role"
                  />
                  <RdsButton
                    label="Save"
                    colorVariant="primary"
                    onClick={handleSaveClick}
                  />
                </div>
              )}
              {props.showCardText && (
                <p>{props.cardText}</p>
              )}
            </div>
            {props.showFooter === true && (
              <div
                className={`card-footer ${props.style === "Filled" ? "card-filled" : ""
                  } ${props.isDisabled || props.state === "Disabled"
                    ? "card-disabled"
                    : ""
                  } ${props.state === "Hovered" ? "card-hovered" : ""} ${props.state === "Selected" ? "card-selected" : ""
                  }`}
              >
                {props.showLinkButton === true && props.type == "Card With Link Button" && (
                  <div>
                    <RdsButton class=" btn-link " label={props.buttonLabel1 + " >"} />
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
                {(props.type == "Card With Button" || props.type == "Card With Image") && (
                  <div className="d-flex justify-content-end align-items-center gap-1">
                    <RdsButton class="btn btn-sm " label={props.buttonLabel2} colorVariant={`outline-${props.colorVariant}`} />
                    <RdsButton class="btn btn-sm " label={props.buttonLabel3} colorVariant="primary" />
                  </div>
                )}
              </div>
            )}
          </div>)}
      </div>
    </Fragment>
  );
};

export default RdsCard;