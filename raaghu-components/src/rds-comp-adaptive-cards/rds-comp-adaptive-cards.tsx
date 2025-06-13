import React from "react";
import "./rds-comp-adaptive-cards.css";
import {
  RdsAvatar,
  RdsBadge,
  RdsButton,
  RdsDropdown,
  RdsDropdownList,
  RdsIcon,
  RdsLabel,
  RdsRadioButton,
} from "../rds-elements";
import {
  DropdownSize,
  DropdownState,
  DropdownStyle,
} from "../../../raaghu-elements/src/rds-dropdown-list/rds-dropdown-list";
import {
  AvatarSize,
  AvatarStyle,
} from "../../../raaghu-elements/src/rds-avatar/rds-avatar";
import {
  DisplayType,
  Layout,
  Shape,
  Style,
} from "../../../raaghu-elements/src/rds-dropdown/rds-dropdown";
import RdsInput, {
  InputSize,
  LabelPosition,
} from "../../../raaghu-elements/src/rds-input/rds-input";
import { State } from "../rds-comp-grid/rds-comp-grid";
import {
  RdsRadioButtonLayout,
  RdsRadioButtonState,
} from "../../../raaghu-elements/src/rds-radio-button/rds-radio-button";

export interface RdsCompAdaptiveCardsProps {
  title?: boolean;
  titleIcon: boolean;
  cardTitle?: string;
  showBtn1?: boolean;
  showBtn2?: boolean;
  btn1style?: string;
  btn2style?: string;
  btn1Label?: string;
  btn2Label?: string;
  smallText?: string;
  cardText?: string;
  type?: string;
  closeIcon: boolean;
  label?: string;
  inputForm?: boolean;
  block?: boolean;
  homeTeam?: string,
  awayTeam?: string,
  tournament?: string,
  score?: string,
  time?: string,
}

const RdsCompAdaptiveCards = (props: RdsCompAdaptiveCardsProps) => {
  const imageList = [
    "/assets/Image1.png",
    "/assets/Image2.png",
    "/assets/Image3.png",
    "/assets/Image4.png",
    "/assets/Image5.png",
    "/assets/Image6.png",
    "/assets/Image7.png",
    "/assets/Image8.png",
    "/assets/Image9.png",
    "/assets/Image10.png",
    "/assets/Image11.png",
    "/assets/Image12.png",
  ];

  return (
    <>
      <div>
        {props.type === "ImageGallery" ? (
          <div className="adaptive-image-container">
            <div className="adaptive-card-header">
              <div className="adaptive-card-title">{props.cardTitle}</div>
            </div>
            <div className="">
              <div className="adaptive-card-small-text">{props.smallText}</div>
            </div>
            <div className="adaptive-image-body">
              {imageList.map((src, index) => (
                <img key={index} src={src} alt={`image${index + 1}`} />
              ))}
            </div>
          </div>
        ) : props.type === "FootballScorecard" ? (
          <div className="adaptive-scorecard-container">
            <div className="adaptive-scorecard-header-container">
              <div className="adaptive-scorecard-header">
                <div>
                  <img
                    src="assets/scorecard1.png"
                    alt="home-team"
                    height="30px"
                    width="26px"
                  />
                </div>
                <div className="adaptive-scorecard-text">{props.tournament}</div>
                <div className="adaptive-badge">
                  <img
                    src="assets/icons/dot.svg"
                    alt="home-team"
                    height="4px"
                    width="4px"
                  />
                  Live
                </div>
              </div>
              <div className="adaptive-scorecard-subtext">30th Apr 2025</div>
              <div className="adaptive-scorecard-subtext">Final</div>
            </div>
            <div className="adaptive-scorecard-body">
              <div className="team-wrapper">
                <div className="team-container">
                  <img
                    src="assets/scorecard1.png"
                    alt="home-team"
                    height="112px"
                    width="110px"
                  />
                </div>
                <div className="team-name">{props.homeTeam}</div>
                <div className="team-status">Home</div>
              </div>

              <div className="team-scorecard">
                <div className="match-score">{props.score}</div>
                <div className="timer-container">
                  <div className="match-timer">{props.time}</div>
                </div>
              </div>

              <div className="team-wrapper">
                <div className="team-container">
                  <img
                    src="assets/scorecard2.png"
                    alt="away-team"
                    height="125px"
                    width="225px"
                  />
                </div>
                <div className="team-name">{props.awayTeam}</div>
                <div className="team-status">Away</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="adaptive-card-container">
            <div className="adaptive-card-header mb-2">
              <div className="d-flex align-items-center gap-2">
                {props.titleIcon && (
                  <RdsIcon
                    colorVariant="dark"
                    height="18px"
                    isCursorPointer
                    name="circle"
                    stroke
                    width="18px"
                  />
                )}
                {props.title && (
                  <div className="adaptive-card-title">{props.cardTitle}</div>
                )}
              </div>
              {props.closeIcon && (
                <RdsIcon
                  colorVariant="dark"
                  height="16px"
                  isCursorPointer
                  name="close"
                  stroke
                  width="16px"
                />
              )}
            </div>
            <>
              {props.type == "Default" && (
                <div className="adaptive-card-body text-muted">
                  Instance Slot
                </div>
              )}

              {props.type == "CalenderReminder" && (
                <>
                  <div className="my-2">
                    <RdsLabel fontWeight="normal" label={props.label} />
                    <div className="adaptive-card-small-text">
                      {props.smallText}
                    </div>
                  </div>
                  {props.inputForm ? (
                    <form>
                      <RdsInput
                        fontWeight="normal"
                        id="default-input"
                        inputType="text"
                        label
                        labelPosition={LabelPosition.Top}
                        name="Name (Last, First)"
                        placeholder="Enter Name"
                        required
                        size={InputSize.Medium}
                        state="default"
                        style="Default"
                      />
                      <RdsInput
                        fontWeight="normal"
                        id="default-input"
                        inputType="text"
                        label
                        labelPosition={LabelPosition.Top}
                        name="Email"
                        placeholder="Enter Email"
                        required
                        size={InputSize.Medium}
                        state="default"
                        style="Default"
                      />
                      <RdsInput
                        fontWeight="normal"
                        id="default-input"
                        inputType="phone number"
                        label
                        labelPosition={LabelPosition.Top}
                        name="Phone Number"
                        placeholder="Enter Phone Number"
                        required
                        size={InputSize.Medium}
                        state="default"
                        style="Default"
                      />
                    </form>
                  ) : (
                    <RdsDropdownList
                      showTitle
                      size={DropdownSize.Default}
                      state={DropdownState.Default}
                      style={DropdownStyle.Default}
                      borderDropdown
                      icon="dropdown_icon"
                      iconHeight="1px"
                      iconWidth="1px"
                      isPlaceholder
                      placeholder="Placeholder"
                      title="Snooze for"
                      listItems={[
                        { label: "5 Minutes", val: "5min" },
                        { label: "15 Minutes", val: "15min" },
                        { label: "30 Minutes", val: "30min" },
                      ]}
                    />
                  )}
                </>
              )}

              {props.type == "ActivityUpdateCard" && (
                <div>
                  <RdsAvatar
                    colorVariant="primary"
                    firstName="Jane"
                    lastName="Doe"
                    maxVisibleAvatars={1}
                    profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"
                    role="Created Wed, 30 Apr 2025"
                    showName
                    showNameDesignation
                    size={AvatarSize.medium}
                    style={AvatarStyle.withname}
                    type="image"
                  />
                  <div className="adaptive-card-text my-2">
                    {props.cardText}
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <RdsRadioButton
                      displayType="Default"
                      itemList={[
                        {
                          checked: true,
                          id: 1,
                          label: "Sub - Title 1: Description",
                          name: "radio_button",
                        },
                        {
                          checked: true,
                          id: 2,
                          label: "Sub - Title 2: Description",
                          name: "radio_button",
                        },
                      ]}
                      layout={RdsRadioButtonLayout.IconWithLabel}
                      state={RdsRadioButtonState.Default}
                      value={""}
                    />
                  </div>
                </div>
              )}

              {props.type == "RestaurantOrder" && (
                <form>
                  <RdsDropdownList
                    showTitle
                    size={DropdownSize.Default}
                    state={DropdownState.Default}
                    style={DropdownStyle.Default}
                    borderDropdown
                    icon="dropdown_icon"
                    iconHeight="1px"
                    iconWidth="1px"
                    isPlaceholder
                    placeholder="Please Choose"
                    title="Which entree would you like?"
                    listItems={[
                      { label: "Option 1", val: "option 1" },
                      { label: "Option 2", val: "option 2" },
                      { label: "Option 3", val: "option 3" },
                    ]}
                    isMandatory
                    multiSelect
                  />
                  <RdsDropdownList
                    showTitle
                    size={DropdownSize.Default}
                    state={DropdownState.Default}
                    style={DropdownStyle.Default}
                    borderDropdown
                    icon="dropdown_icon"
                    iconHeight="1px"
                    iconWidth="1px"
                    isPlaceholder
                    placeholder="Please Choose"
                    title="Which side would you like?"
                    listItems={[
                      { label: "Option 1", val: "option 1" },
                      { label: "Option 2", val: "option 2" },
                      { label: "Option 3", val: "option 3" },
                    ]}
                    isMandatory
                    multiSelect
                  />
                  <RdsDropdownList
                    showTitle
                    size={DropdownSize.Default}
                    state={DropdownState.Default}
                    style={DropdownStyle.Default}
                    borderDropdown
                    icon="dropdown_icon"
                    iconHeight="1px"
                    iconWidth="1px"
                    isPlaceholder
                    placeholder="Please Choose"
                    title="Which drink would you like?"
                    listItems={[
                      { label: "Option 1", val: "option 1" },
                      { label: "Option 2", val: "option 2" },
                      { label: "Option 3", val: "option 3" },
                    ]}
                    isMandatory
                    multiSelect
                  />
                </form>
              )}
            </>
            <div className="adaptive-card-footer mt-2">
              {props.showBtn1 &&
                (props.type == "ActivityUpdateCard" ? (
                  <RdsDropdown
                    buttonIcon="plus"
                    colorVariant="primary"
                    displayType={DisplayType.Dropdown}
                    iconStroke
                    id="1"
                    label="Button"
                    layout={Layout.TextOnly}
                    listItems={[
                      { id: "1", label: "Option 1", path: "" },
                      { id: "2", label: "Option 2", path: "" },
                      { id: "3", label: "Option 3", path: "" },
                    ]}
                    profileImage="https://www.svgrepo.com/show/497407/profile-circle.svg"
                    selectIcon="circle"
                    shape={Shape.Rectangle}
                    showChevron
                    size="medium"
                    state={State.Default}
                    style={Style.Outline}
                    darkDropdown={false}
                  />
                ) : (
                  <RdsButton
                    size="medium"
                    shape="rectangle"
                    state="default"
                    style={props.btn1style}
                    badgeState="default"
                    badgeStyle="primary"
                    displayType="Text Only"
                    colorVariant="primary"
                    label={props.btn1Label}
                    textCase="unset"
                    block={props.block}
                  />
                ))}

              {props.showBtn2 && (
                <RdsButton
                  size="medium"
                  shape="rectangle"
                  state="default"
                  style={props.btn2style}
                  badgeState="default"
                  badgeStyle="primary"
                  displayType="Text Only"
                  colorVariant="primary"
                  label={props.btn2Label}
                  textCase="unset"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RdsCompAdaptiveCards;
