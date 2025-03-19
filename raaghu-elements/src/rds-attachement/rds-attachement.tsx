import React, { useState, useRef } from "react";
import RdsFabMenu from "../rds-fab-menu";
import RdsBadge from "../rds-badge/rds-badge";
import RdsModal from "../rds-modal/rds-modal";
import "./rds-attachement.css";
import RdsInput from "../rds-input/rds-input";

export interface RdsAttachementProps {
  menuIcon?: string;
  modalTitle?: string;
  hintText?: string;
  inputPlaceholder?: string;
  showBadge?: boolean;
  badgeLabel?: string;
  badgeColor?: string;
  uploadText?: string;
  importText?: string;
  modalText?: string;
  image?: string;
  userData?: UserData[];
  onFileSelect?: (file: File) => void;
  onFigmaSubmit?: (value: string) => void;
  handleAddComment: (comment: Comment) => void;
}

export interface UserData {
  firstName: string;
  lastName: string;
  activeDotButton: boolean;
  status: string;
  size: string;
  colorVariant: string;
  time: string;
  profilePic: string;
  messageStatus: string;
  comments: Comment[];
}

export interface Comment {
  firstName: string;
  lastName: string;
  comment: string;
  image?: string;
}

const RdsAttachement = (props: RdsAttachementProps) => {
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [commentText, setCommentText] = useState<string>("");
  const firstUser = props.userData && props.userData.length > 0 ? props.userData[0] : null;
  const [commentList, setCommentList] = useState<Comment[]>(firstUser?.comments || []);
  const [currentUser, setCurrentUser] = useState<any>(props.userData ? props.userData[0] : null);

  // ✅ Single handler for Base64 conversion
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string; // Base64 string
        console.log("Base64 Image:", base64String);  // ✅ Prints Base64 in console

        const newComment: Comment = {
          firstName: currentUser?.firstName || "",
          lastName: currentUser?.lastName || "",
          comment: "",
          image: base64String, // Store Base64 string in the comment
        };

        setCommentList([...commentList, newComment]);
        if (props.handleAddComment) {
          props.handleAddComment(newComment);
        }
      };
      reader.readAsDataURL(file);  // Convert image to Base64
    } else {
      console.error("Please select a valid image file.");
    }
  };

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShowModal(true);

    if (showModal) {
      const fabMenu = document.querySelector(".fab-dropdown");
      if (fabMenu && fabMenu.classList.contains("show")) {
        fabMenu.classList.remove("show");
      }
    }
  };

  return (
    <>
      {/* ✅ Single input field for image upload */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />

      <span className="mb-3 mt-2">
        <RdsFabMenu
          menuIcon={props.menuIcon}
          id="attachment-text"
          className="dropdown-menu dropdown-menu-list fab-dropdown shadow mb-1 border border-primary"
          isShowBorder={true}
          listItems={[
            {
              key: "new",
              value: (
                <button
                  onClick={openModal}
                  style={{
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    color: "inherit",
                    font: "inherit",
                    padding: 0,
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#modal1234"
                >
                  <span className="me-2">{props.uploadText}</span>
                  {props.showBadge && (
                    <RdsBadge
                      colorVariant={props.badgeColor}
                      iconName="notification"
                      isIconshow
                      label={props.badgeLabel || ""}
                      layout="Text_only"
                      shape="rectangle"
                      size="small"
                      state="default"
                      style="primary"
                    />
                  )}
                </button>
              ),
            },
            {
              key: "refresh",
              value: (
                <button
                  onClick={() => fileInputRef.current?.click()}  // Trigger hidden file input
                  style={{
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    color: "inherit",
                    font: "inherit",
                    padding: 0,
                  }}
                >
                  {props.importText}
                </button>
              ),
            },
          ]}
        />
      </span>

      {showModal && (
        <RdsModal
          cancelButtonName="Cancel"
          modalAnimation="modal-fade"
          modalId="modal1234"
          modalTitle={props.modalTitle}
          modalbutton={null}
          saveChangesName="Next"
          showModalFooter
          showModalHeader
          size="medium"
        >
          <p className="text-muted import-size">{props.modalText}</p>
          <RdsInput
            HintText={props.hintText}
            fontWeight="normal"
            id="default-input"
            placeholder={props.inputPlaceholder}
            inputType="text"
            label
            name="Enter Figma URL"
            state="default"
            style="Default"
            value=""
            onChange={(e) => props.onFigmaSubmit?.(e.target.value)}
          />
        </RdsModal>
      )}
    </>
  );
};

export default RdsAttachement;
