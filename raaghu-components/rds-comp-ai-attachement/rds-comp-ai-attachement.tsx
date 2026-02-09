import React, { useState, useRef } from "react";
import RdsBadge from "../../raaghu-elements/rds-badge/rds-badge";
import RdsModal from "../../raaghu-elements/rds-modal/rds-modal";
import "./rds-comp-ai-attachement.scss";
import RdsInput from "../../raaghu-elements/rds-input/rds-input";
import RdsCompAiFabMenu from "../rds-comp-ai-fab-menu/rds-comp-ai-fab-menu";
import AttachmentIcon from '@mui/icons-material/Attachment';
import { registerMaterialIcons } from "../../raaghu-components/rds-comp-ai-icon/rds-comp-ai-icon";

export interface RdsCompAiAttachementProps {
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

registerMaterialIcons({ 'attachment_icon': AttachmentIcon });

const RdsCompAiAttachement = (props: RdsCompAiAttachementProps) => {
    const [showModal, setShowModal] = useState(false);
    const [figmaUrl, setFigmaUrl] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [commentList, setCommentList] = useState<Comment[]>(
        props.userData?.[0]?.comments || []
    );

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;

                const newComment: Comment = {
                    firstName: props.userData?.[0]?.firstName || "",
                    lastName: props.userData?.[0]?.lastName || "",
                    comment: "",
                    image: base64String,
                };

                setCommentList([...commentList, newComment]);
                if (props.handleAddComment) {
                    props.handleAddComment(newComment);
                }

                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            };
            reader.readAsDataURL(file);
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

    const closeModal = () => {
        setShowModal(false);
        setFigmaUrl(""); 
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileUpload}
            />

            <div className="rds-comp-ai-attachement__dropdown">
                <RdsCompAiFabMenu
                    menuIcon={props.menuIcon}
                    backgroundType="none"
                    id="attachment-text"
                    isShowBorder={true}
                    alignment={props.menuAlignment || "left"}
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
                                    <span className="rds-comp-ai-attachement__upload-text">{props.uploadText}</span>
                                    {props.showBadge && (
                                        <RdsBadge
                                            colorVariant={props.badgeColor as any || "primary"}
                                            layout="text"
                                            shape="rectangle"
                                            badgeContent={props.badgeLabel || ""}
                                            size="small"
                                            state="default"
                                            styleType="primary"
                                        />
                                    )}
                                </button>
                            ),
                        },
                        {
                            key: "refresh",
                            value: (
                                <button
                                    onClick={() => fileInputRef.current?.click()}
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
            </div>

            {showModal && (
                    <RdsModal
                        isOpen={showModal}
                        onClose={closeModal}
                        title={props.modalTitle}
                        actions={null}
                        showCloseButton={true}
                    >
                        <p className="text-muted rds-comp-ai-attachement__import-size">{props.modalText}</p>
                        <RdsInput
                            hintText={props.hintText}
                            id="default-input"
                            placeholder={props.inputPlaceholder}
                            layout="text"
                            name="Enter Figma URL"
                            state="default"
                            style="default"
                            value={figmaUrl}
                            onChange={(e) => {
                                setFigmaUrl(e.target.value);
                                props.onFigmaSubmit?.(e.target.value);
                            }}
                        />
                    </RdsModal>
            )}
        </>
    );
};

RdsCompAiAttachement.displayName = "RdsCompAiAttachement"
export default RdsCompAiAttachement;