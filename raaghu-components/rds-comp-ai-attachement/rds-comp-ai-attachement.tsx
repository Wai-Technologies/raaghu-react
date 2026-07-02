import { useCallback, useRef, useState, type ChangeEvent, type MouseEvent } from "react";
import type { RdsBadgeProps } from "../../raaghu-elements/rds-badge/rds-badge";
import RdsBadge from "../../raaghu-elements/rds-badge/rds-badge";
import RdsModal from "../../raaghu-elements/rds-modal/rds-modal";
import "./rds-comp-ai-attachement.scss";
import RdsInput from "../../raaghu-elements/rds-input/rds-input";
import RdsCompAiFabMenu from "../rds-comp-ai-fab-menu/rds-comp-ai-fab-menu";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { registerMaterialIcons } from "../../raaghu-components/rds-comp-ai-icon/rds-comp-ai-icon";

export interface RdsCompAiAttachementProps {
  menuIcon?: string;
  modalTitle?: string;
  hintText?: string;
  inputPlaceholder?: string;
  showBadge?: boolean;
  badgeLabel?: string;
  badgeColor?: RdsBadgeProps["colorVariant"];
  uploadText?: string;
  importText?: string;
  modalText?: string;
  image?: string;
  userData?: UserData[];
  onFileSelect?: (file: File) => void;
  onFigmaSubmit?: (value: string) => void;
  handleAddComment?: (comment: Comment) => void;
  menuAlignment?: "left" | "right";
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

registerMaterialIcons({ attachment_icon: AttachmentIcon });

const RdsCompAiAttachement = ({
  menuIcon,
  modalTitle,
  hintText,
  inputPlaceholder,
  showBadge,
  badgeLabel,
  badgeColor,
  uploadText,
  importText,
  modalText,
  userData,
  onFigmaSubmit,
  handleAddComment,
  menuAlignment = "left",
}: RdsCompAiAttachementProps) => {
  const [showModal, setShowModal] = useState(false);
  const [figmaUrl, setFigmaUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setCommentList] = useState<Comment[]>(userData?.[0]?.comments || []);

  const handleFileUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file?.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newComment: Comment = {
          firstName: userData?.[0]?.firstName || "",
          lastName: userData?.[0]?.lastName || "",
          comment: "",
          image: base64String,
        };

        setCommentList((prev) => [...prev, newComment]);
        handleAddComment?.(newComment);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };
      reader.readAsDataURL(file);
    },
    [handleAddComment, userData]
  );

  const openModal = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShowModal(true);

    const fabMenu = document.querySelector(".fab-dropdown");
    if (fabMenu?.classList.contains("show")) {
      fabMenu.classList.remove("show");
    }
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setFigmaUrl("");
  }, []);

  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFigmaInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFigmaUrl(e.target.value);
      onFigmaSubmit?.(e.target.value);
    },
    [onFigmaSubmit]
  );

  const listItems = [
    {
      key: "new",
      value: (
        <button
          type="button"
          onClick={openModal}
          className="rds-comp-ai-attachement__reset-btn"
          data-bs-toggle="modal"
          data-bs-target="#modal1234"
        >
          <span className="rds-comp-ai-attachement__upload-row">
            <span className="rds-comp-ai-attachement__upload-text">{uploadText}</span>
            {showBadge && (
              <RdsBadge
                colorVariant={badgeColor || "primary"}
                layout="text"
                shape="rectangle"
                badgeContent={badgeLabel || ""}
                size="small"
                state="default"
                styleType="primary"
              />
            )}
          </span>
        </button>
      ),
    },
    {
      key: "refresh",
      value: (
        <button type="button" onClick={handleImportClick} className="rds-comp-ai-attachement__reset-btn">
          {importText}
        </button>
      ),
    },
  ];

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="rds-comp-ai-attachement__file-input"
        style={{ display: "none" }}
        onChange={handleFileUpload}
        aria-label="Upload attachment"
      />

      <div className="rds-comp-ai-attachement__dropdown">
        <RdsCompAiFabMenu
          menuIcon={menuIcon}
          backgroundType="none"
          id="attachment-text"
          isShowBorder={true}
          alignment={menuAlignment}
          listItems={listItems}
        />
      </div>

      {showModal && (
        <RdsModal
          isOpen={showModal}
          onClose={closeModal}
          title={modalTitle}
          actions={null}
          showCloseButton={true}
        >
          <p className="text-muted rds-comp-ai-attachement__import-size">{modalText}</p>
          <RdsInput
            hintText={hintText}
            id="default-input"
            placeholder={inputPlaceholder}
            layout="text"
            name="Enter Figma URL"
            state="default"
            style="default"
            value={figmaUrl}
            onChange={handleFigmaInputChange}
          />
        </RdsModal>
      )}
    </>
  );
};

RdsCompAiAttachement.displayName = "RdsCompAiAttachement";
export default RdsCompAiAttachement;
