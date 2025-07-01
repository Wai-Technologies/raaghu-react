import React, { useState, useEffect } from "react";
import { RdsInput, RdsButton, RdsDropdown, RdsDropdownList, RdsFabMenu } from "../rds-elements";
import './rds-comp-typing-section.css';
import RdsCompAttachement, { Comment as AttachmentComment } from "../rds-comp-attachement/rds-comp-attachement";
import { TooltipStyle } from "../../../raaghu-elements/src/rds-tooltip/rds-tooltip";
import { DisplayType, Layout, Shape, State, Style } from "../../../raaghu-elements/src/rds-dropdown/rds-dropdown";
import { TooltipPlacement } from "../../../raaghu-elements/src/rds-input/rds-input";
import { DropdownSize, DropdownState, DropdownStyle } from "../../../raaghu-elements/src/rds-dropdown-list/rds-dropdown-list";
import Picker from 'emoji-picker-react';
import RdsCompIcon from "../rds-comp-icon";

export interface RdsTypingAltProps {
    colorVariant?: string;
    placeholderText?: string;
    icon_name: string;
    onSend?: (inputText: string, image?: string) => void;
    onAddComment?: (comment: AttachmentComment) => void;
    previewImage?: string;
    type?: string;
    warningMsg?: boolean;
    advancedControls?: boolean;
    isTheme?: boolean;
    warningText?: string;
}

declare global {
    interface Window {
        webkitSpeechRecognition: any;
    }
}

const RdsCompTypingSection = (props: RdsTypingAltProps) => {
    const { colorVariant, placeholderText, icon_name, onSend, onAddComment, previewImage } = props;
    const [inputText, setInputText] = useState<string>("");
    const [prevInputText, setPrevInputText] = useState<string>("");
    const [showEnhancer, setShowEnhancer] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [showWarning, setShowWarning] = useState<boolean>(true);
    const [showAdvancedControls, setShowAdvancedControls] = useState<boolean>(true);
    const [attachmentComment, setAttachmentComment] = useState<AttachmentComment | null>(null);
    const [enhancedImage, setEnhancedImage] = useState<string | null>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

  useEffect(() => {
    if (props.warningMsg !== undefined) {
      setShowWarning(props.warningMsg);
    }
  }, [props.warningMsg]);

  useEffect(() => {
    if (props.advancedControls !== undefined) {
      setShowAdvancedControls(props.advancedControls);
    }
  }, [props.advancedControls]);

    const handleEnhancerClick = () => {
        setInputText(prevInputText);
        setEnhancedImage(attachmentComment?.image || null);
        setShowEnhancer(false);
    };

    const handleMicClick = () => {
        if (!('webkitSpeechRecognition' in window)) {
            console.log("Speech recognition not supported");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => {
            console.log("Speech recognition started");
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInputText(transcript);
        };

        recognition.start();
    };

    const handleSent = () => {
        setPrevInputText(inputText);
        onSend && onSend(inputText, enhancedImage || previewImage);
        setInputText("");
        setEnhancedImage(null);
        setShowEnhancer(true);
    };

    const handleFileSelect = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setEnhancedImage(reader.result as string); // Set the preview image
            setInputText(""); // Clear the input text
        };
        reader.readAsDataURL(file);
    };

    const handleAddComment = (comment: AttachmentComment) => {
        setAttachmentComment(comment);
        onAddComment && onAddComment(comment);
    };

    const handleCloseWarning = () => {
      setShowWarning(false);
    };

    const handleCloseAdvancedControls = () => {
      setShowAdvancedControls(false);
    };

    const handleFigmaSubmit = (value: string) => {
        onAddComment && onAddComment({ image: value } as AttachmentComment);
    };

    return (
      <>
        {props.type === "default" && (
          <div className="border-radius transperent">
            <div className="d-flex flex-column typing-section px-1 pt-1">
              <div className="input-wrapper position-relative">
                <div className={`input-with-image ${isMobile ? "pr-3" : ""}`}>
                  <textarea
                    className="form-controls w-100 input-box-typing-section type-section-border  border-primary"
                    placeholder={
                      !enhancedImage
                        ? placeholderText || "Placeholder Text"
                        : ""
                    }
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    title="Enter your prompt here"
                  />

                  <div className="mt-1 position-absolute top-0 end-0 ">
                    <RdsCompIcon
                      classes="gradient-text"
                      height="20px"
                      isCursorPointer
                      name="sparkle"
                      width="20px"
                      tooltip
                      tooltipTitle="Enhance Prompt"
                    />
                  </div>
                </div>
                <div
                  className={`d-flex ${
                    isMobile
                      ? "justify-content-end mt-3"
                      : "justify-content-end"
                  } gap-1`}
                >
                  <div className="attach" id="Premium">
                    <RdsCompAttachement
                      badgeColor="success"
                      badgeLabel="Premium"
                      handleAddComment={handleAddComment}
                      hintText="Hint Text"
                      importText="Import From This Device"
                      inputPlaceholder="Enter URL"
                      menuIcon="attach"
                      modalText="Ask AI Pundit to turn your designs into code by attaching a link to a desired section or frame in your Figma file."
                      modalTitle="Import From Figma"
                      onFigmaSubmit={handleFigmaSubmit}
                      onFileSelect={handleFileSelect}
                      showBadge
                      uploadText="Upload From Figma"
                    />
                  </div>
                  <div className="btn-transition size">
                    <RdsButton
                      class="send-icon"
                      badgeLayout="Text_only"
                      badgeState="default"
                      badgeStyle="primary"
                      colorVariant="primary"
                      data-bs-toggle="tooltip"
                      displayType="Icon Only"
                      icon="send"
                      shape="rectangle"
                      size="medium"
                      state="default"
                      style="filled"
                      textCase="unset"
                      tooltip
                      tooltipPlacement={TooltipStyle.MiddleTopArrow}
                      tooltipTitle="Send"
                      onClick={handleSent}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`${
                  isMobile ? "d-flex flex-column gap-3" : "d-flex gap-3"
                } mt-3 mb-1`}
              >
                <div className="action-button-item plus_chat project">
                  <RdsButton
                    badgeLayout="Text_only"
                    badgeState="default"
                    badgeStyle="primary"
                    colorVariant="primary"
                    displayType="Icon + Text"
                    icon="plus_chat"
                    label="New Project"
                    shape="rectangle"
                    size="medium"
                    state="default"
                    style="filled"
                    textCase="unset"
                  />
                </div>
                <div className="action-button-item ">
                  <RdsButton
                    size="medium"
                    shape="rectangle"
                    state="default"
                    badgeLayout="Icon + Text"
                    style="outline"
                    badgeState="default"
                    badgeStyle="primary"
                    displayType="Icon + Text"
                    icon="figma_icon"
                    label="Import From Figma"
                    textCase="unset"
                  />
                </div>
                <div
                  id="chat"
                  className={`action-button-item typing chat-section  ${
                    !isMobile ? "ms-auto" : "me-auto"
                  }`}
                >
                  <RdsDropdown
                    buttonIcon="plus"
                    colorVariant="primary"
                    displayType={DisplayType.Dropdown}
                    iconStroke
                    id="1"
                    label="Select Frontend"
                    layout={Layout.TextOnly}
                    listItems={[
                      {
                        id: "1",
                        label: "Raaghu",
                      },
                    ]}
                    shape={Shape.Rectangle}
                    showChevron
                    size="medium"
                    state={State.Default}
                    style={Style.Transparent}
                    darkDropdown={false}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {props.type === "advanced" && (
          <div className="advanced-typing-section">
            <div
              className="warning-container"
              style={{ height: "25px", marginBottom: "8px" }}
            >
              {props.warningMsg && showWarning && (
                <div className="prompt-warning">
                  <div className="text">{props.warningText}</div>
                  <div className="text">
                    <RdsCompIcon
                      classes="gradient-text"
                      height="20px"
                      isCursorPointer
                      name="new_close_circle"
                      width="20px"
                      onClick={handleCloseWarning}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="input-wrapper position-relative">
              <div className={`input-with-image ${isMobile ? "pr-3" : ""}`}>
                <textarea
                  className="form-controls w-100 input-box-typing-section type-section-border text-primary border-primary"
                  placeholder={
                    !enhancedImage
                      ? placeholderText || "Write a prompt here"
                      : ""
                  }
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  title="Enter your prompt here"
                />

                <div className="mt-1 position-absolute top-0 end-0 ">
                  <RdsCompIcon
                    classes=""
                    height="20px"
                    isCursorPointer
                    name="new_star"
                    width="20px"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between mt-3 gap-2">
                <div
                  id="advanced-prompt"
                  className="d-flex align-items-center gap-2"
                >
                  <RdsDropdown
                    buttonIcon="new_file"
                    colorVariant="primary"
                    displayType={DisplayType.Dropdown}
                    iconStroke
                    id="dropdown"
                    label="Import"
                    layout={Layout.IconBefore}
                    listItems={[
                      {
                        id: "1",
                        label: "Import from Figma",
                        icon: "figma_icon",
                      },
                      {
                        id: "2",
                        label: "Import from Github",
                        icon: "new_github",
                      },
                      {
                        id: "3",
                        label: "Attach Image File",
                        icon: "attach",
                      },
                    ]}
                    shape={Shape.Rectangle}
                    showChevron
                    size="medium"
                    state={State.Default}
                    style={Style.Primary}
                    darkDropdown={false}
                  />
                  <RdsButton
                    badgeLayout="Text_only"
                    badgeState="default"
                    badgeStyle="primary"
                    colorVariant="primary"
                    databstoggle="tooltip"
                    displayType="Icon + Text"
                    icon="new_design"
                    label="New Project"
                    shape="rectangle"
                    size="medium"
                    state="default"
                    style="transparent"
                    textCase="unset"
                  />
                </div>

                <div
                  className={`d-flex ${
                    isMobile
                      ? "justify-content-end mt-3"
                      : "justify-content-end"
                  } gap-2`}
                >
                  <div className="setting-container" id="Premium">
                    <RdsCompIcon
                      classes="setting-svg"
                      height="20px"
                      isCursorPointer
                      name="new_setting"
                      width="20px"
                    />
                  </div>
                  <div className="btn-transition size">
                    <RdsButton
                      class="send-icon"
                      badgeLayout="Text_only"
                      badgeState="default"
                      badgeStyle="primary"
                      colorVariant="primary"
                      data-bs-toggle="tooltip"
                      displayType="Icon Only"
                      icon="send"
                      shape="rectangle"
                      size="medium"
                      state="default"
                      style="filled"
                      textCase="unset"
                      tooltip
                      tooltipPlacement={TooltipStyle.MiddleTopArrow}
                      tooltipTitle="Send"
                      onClick={handleSent}
                    />
                  </div>
                </div>
              </div>
            </div>
            {props.advancedControls && showAdvancedControls && (
              <div className="advanced-control-container">
                <div className="advanced-control-header">
                  <div className="d-flex align-items-center gap-2">
                    <div>
                      <RdsCompIcon
                        height="20px"
                        isCursorPointer
                        name="new_settings"
                        width="20px"
                        fill={false}
                      />
                    </div>
                    <div className="advanced-control-header-text">
                      Advanced Controls
                    </div>
                  </div>
                  <div>
                    <RdsCompIcon
                      height="16px"
                      isCursorPointer
                      name="close"
                      width="16px"
                      stroke={true}
                      onClick={handleCloseAdvancedControls}
                    />
                  </div>
                </div>
                <div className="advanced-control-body d-flex align-items-center col-12">
                  <div className="col-3 pe-3">
                    <RdsDropdownList
                      borderDropdown
                      isPlaceholder
                      listItems={[
                        {
                          label: "Platform 1",
                          val: "platform-1",
                        },
                        {
                          label: "Platform 2",
                          val: "platform-2",
                        },
                      ]}
                      placeholder="Select Platforms"
                      showTitle
                      size={DropdownSize.Default}
                      state={DropdownState.Default}
                      style={DropdownStyle.Default}
                      title="Platforms"
                    />
                  </div>
                  <div className="col-3 pe-3">
                    <RdsDropdownList
                      borderDropdown
                      isPlaceholder
                      listItems={[
                        {
                          label: "EN(US)",
                          val: "en-us",
                        },
                        {
                          label: "EN(India)",
                          val: "en-ind",
                        },
                      ]}
                      placeholder="Select Language"
                      showTitle
                      size={DropdownSize.Default}
                      state={DropdownState.Default}
                      style={DropdownStyle.Default}
                      title="Language"
                    />
                  </div>
                  {props.isTheme && (
                    <div className="col-3 pe-3">
                      <RdsDropdownList
                        borderDropdown
                        isPlaceholder
                        listItems={[
                          {
                            label: "Theme 1",
                            val: "theme-1",
                          },
                          {
                            label: "Theme 2",
                            val: "theme-2",
                          },
                        ]}
                        placeholder="Select Theme"
                        showTitle
                        size={DropdownSize.Default}
                        state={DropdownState.Default}
                        style={DropdownStyle.Default}
                        title="Theme"
                      />
                    </div>
                  )}
                  <div className="col-3">
                    <RdsDropdownList
                      borderDropdown
                      isPlaceholder
                      listItems={[
                        {
                          label: "Type 1",
                          val: "type-1",
                        },
                        {
                          label: "Type 2",
                          val: "type-2",
                        },
                      ]}
                      placeholder="Select Type"
                      showTitle
                      size={DropdownSize.Default}
                      state={DropdownState.Default}
                      style={DropdownStyle.Default}
                      title="Type"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {props.type === "chat" && (
          <div className="chat-window-footer">
            <div className="emoji-popup">
              <Picker />
            </div>
            <span className="ms-3 me-2 mb-3 mt-2">
              <RdsFabMenu
                className="fab-menu-btn"
                colorVariant="primary"
                menuIcon="plus"
                listItems={[
                  {
                    icon: "attachment",
                    iconHeight: "20px",
                    iconWidth: "20px",
                    key: "new",
                    some: "value",
                    value: "Attach File",
                    onClick: () =>
                      document.getElementById("fileUpload")?.click(),
                  },
                  {
                    icon: "video",
                    iconHeight: "20px",
                    iconWidth: "20px",
                    key: "refresh",
                    some: "video",
                    value: "Record Video",
                  },
                  {
                    icon: "camera",
                    iconHeight: "20px",
                    iconWidth: "20px",
                    key: "export",
                    some: "camera",
                    value: "Take Photo",
                  },
                ]}
              />
            </span>
            <span>
              <input
                id="fileUpload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
              />
            </span>
            <span className="me-2 mb-3 mt-2">
              <RdsCompIcon
                name="smileys"
                fill={false}
                stroke={true}
                colorVariant="neutral"
                isCursorPointer={true}
                // width="30px"
                height="30px"
              />
            </span>
            <span className="w-100 d-flex input-box-chat p-1">
              <span className="w-100 position-relative" id="password-icon">
                <RdsInput
                  showTitle={false}
                  inputType="text"
                  placeholder="Type comment..."
                  name="Comment"
                />
                <span className="position-absolute end-0 top-50 translate-middle-y pe-2 pb-2">
                  <RdsCompIcon
                    name="send_email"
                    fill={false}
                    stroke={true}
                    colorVariant="primary"
                    isCursorPointer={true}
                  />
                </span>
              </span>
            </span>
          </div>
        )}
      </>
    );
};

export default RdsCompTypingSection;