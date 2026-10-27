import { isValidElement, useCallback, useId, useMemo, useRef, useState, type ChangeEvent, type HTMLAttributes, type ReactNode, type Ref } from "react";
import clsx from "clsx";
import type { RdsBadgeProps } from "../../raaghu-elements/rds-badge/rds-badge";
import RdsBadge from "../../raaghu-elements/rds-badge/rds-badge";
import RdsModal from "../../raaghu-elements/rds-modal/rds-modal";
import "./rds-comp-ai-attachment.scss";
import RdsInput from "../../raaghu-elements/rds-input/rds-input";
import RdsCompAiFabMenu, { type RdsCompAiFabMenuIcon } from "../rds-comp-ai-fab-menu/rds-comp-ai-fab-menu";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { registerMaterialIcons } from "../../raaghu-components/rds-comp-ai-icon/rds-comp-ai-icon";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

export interface RdsCompAiAttachmentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children" | "onChange"> {
  /** Built-in icon name or a custom icon element for the menu trigger. */
  icon?: RdsCompAiFabMenuIcon;
  /** @deprecated Use `icon` instead. */
  menuIcon?: RdsCompAiFabMenuIcon;
  /** @deprecated Use `slotProps.dialog.title` instead. */
  modalTitle?: string;
  /** @deprecated Use `slotProps.dialog.hintText` instead. */
  hintText?: string;
  /** @deprecated Use `slotProps.dialog.placeholder` instead. */
  inputPlaceholder?: string;
  /** Badge content next to the upload item; shown when given. */
  badge?: ReactNode;
  /** @deprecated Use `badge` instead. */
  showBadge?: boolean;
  /** @deprecated Use `badge` instead. */
  badgeLabel?: string;
  /** Props passed to the badge; `color` sets its color variant. */
  badgeProps?: RdsCompAiAttachmentBadgeProps;
  /** @deprecated Use `badgeProps.color` instead. */
  badgeColor?: RdsBadgeProps["colorVariant"];
  /** @deprecated Use `slotProps.menu.uploadText` instead. */
  uploadText?: string;
  /** @deprecated Use `slotProps.menu.importText` instead. */
  importText?: string;
  /** @deprecated Use `slotProps.dialog.text` instead. */
  modalText?: string;
  /** Texts of the menu items and the Figma dialog. */
  slotProps?: RdsCompAiAttachmentSlotProps;
  /** @deprecated Has no effect. */
  image?: string;
  /** User the uploaded image comment is attributed to. */
  currentUser?: AttachmentCurrentUser;
  /** @deprecated Use `currentUser` instead. */
  userData?: UserData[];
  /** Called with the selected image file. */
  onFileSelect?: (file: File) => void;
  /** Called on every change of the Figma URL field. */
  onFigmaUrlChange?: (value: string) => void;
  /** @deprecated Use `onFigmaUrlChange` instead (it fires on every change). */
  onFigmaSubmit?: (value: string) => void;
  /** Called with the comment built from an uploaded image. */
  onAddComment?: (comment: Comment) => void;
  /** @deprecated Use `onAddComment` instead. */
  handleAddComment?: (comment: Comment) => void;
  /** Side the menu opens to. */
  placement?: "start" | "end";
  /** @deprecated Use `placement` instead. */
  menuAlignment?: "left" | "right";
  /** Ref to the root element. */
  ref?: Ref<HTMLDivElement>;
  sx?: SxProps<Theme>;
}

export type RdsCompAiAttachmentBadgeProps = Omit<Partial<RdsBadgeProps>, "color"> & {
  color?: RdsBadgeProps["colorVariant"];
};

export interface RdsCompAiAttachmentSlotProps {
  menu?: { uploadText?: string; importText?: string };
  dialog?: { title?: string; text?: string; hintText?: string; placeholder?: string };
}

/** @deprecated Use `RdsCompAiAttachmentProps` */
export type RdsCompAiAttachementProps = RdsCompAiAttachmentProps;

/** Fields this component reads for comment attribution. */
export type AttachmentCurrentUser = {
  firstName: string;
  lastName: string;
};

/**
 * @deprecated Prefer {@link AttachmentCurrentUser} via `currentUser`.
 * Only `firstName` / `lastName` are used here; the rest mirror chat user shapes.
 */
export interface UserData extends AttachmentCurrentUser {
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

const DEPRECATED_PROPS = {
  menuIcon: "`icon`",
  modalTitle: "`slotProps.dialog.title`",
  hintText: "`slotProps.dialog.hintText`",
  inputPlaceholder: "`slotProps.dialog.placeholder`",
  showBadge: "`badge`",
  badgeLabel: "`badge`",
  badgeColor: "`badgeProps.color`",
  uploadText: "`slotProps.menu.uploadText`",
  importText: "`slotProps.menu.importText`",
  modalText: "`slotProps.dialog.text`",
  userData: "`currentUser`",
  menuAlignment: "`placement`",
  image: "nothing (no effect)",
  onFigmaSubmit: "`onFigmaUrlChange`",
  handleAddComment: "`onAddComment`",
} as const;

const PLACEMENT_ALIGNMENT = { start: "left", end: "right" } as const;

/** Attachment menu for the AI chat: upload from Figma (modal) or import an image from the device. */
const RdsCompAiAttachment = (props: RdsCompAiAttachmentProps) => {
  const {
    icon,
    menuIcon,
    modalTitle,
    hintText,
    inputPlaceholder,
    badge,
    showBadge,
    badgeLabel,
    badgeProps,
    badgeColor,
    uploadText,
    importText,
    modalText,
    slotProps,
    image,
    currentUser,
    userData,
    onFileSelect,
    onFigmaUrlChange,
    onFigmaSubmit,
    onAddComment,
    handleAddComment,
    placement,
    menuAlignment,
    className,
    ref,
    sx,
    ...rest
  } = props;
  for (const [name, replacement] of Object.entries(DEPRECATED_PROPS)) {
    if (props[name as keyof typeof DEPRECATED_PROPS] !== undefined) warnDeprecatedProp("RdsCompAiAttachment", name, replacement);
  }

  const [showModal, setShowModal] = useState(false);
  const [figmaUrl, setFigmaUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const addComment = onAddComment ?? handleAddComment;
  const figmaUrlChange = onFigmaUrlChange ?? onFigmaSubmit;
  const user = currentUser ?? userData?.[0];
  const alignment = placement ? PLACEMENT_ALIGNMENT[placement] : menuAlignment ?? "left";
  const resolvedUploadText = slotProps?.menu?.uploadText ?? uploadText;
  const resolvedImportText = slotProps?.menu?.importText ?? importText;
  const dialog = slotProps?.dialog;
  const badgeContent = badge !== undefined ? badge : showBadge ? badgeLabel || "" : null;

  const handleFileUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file?.type.startsWith("image/")) return;
      onFileSelect?.(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newComment: Comment = {
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          comment: "",
          image: base64String,
        };

        addComment?.(newComment);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };
      reader.readAsDataURL(file);
    },
    [addComment, onFileSelect, user]
  );

  const openModal = useCallback(() => setShowModal(true), []);

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
      figmaUrlChange?.(e.target.value);
    },
    [figmaUrlChange]
  );

  const listItems = useMemo(() => {
    const { color, ...badgeRest } = badgeProps ?? {};
    return [
      {
        key: "new",
        onClick: openModal,
        label: (
          <span className="rds-comp-ai-attachment__reset-btn">
            <span className="rds-comp-ai-attachment__upload-row">
              <span className="rds-comp-ai-attachment__upload-text">{resolvedUploadText}</span>
              {badgeContent != null && badgeContent !== false && (
                <RdsBadge
                  layout="text"
                  shape="rectangle"
                  size="small"
                  styleType="primary"
                  {...badgeRest}
                  colorVariant={color ?? badgeRest.colorVariant ?? (badgeColor || "primary")}
                  {...(isValidElement(badgeContent) ? { startIcon: badgeContent } : { badgeContent })}
                />
              )}
            </span>
          </span>
        ),
      },
      {
        key: "refresh",
        onClick: handleImportClick,
        label: (
          <span className="rds-comp-ai-attachment__reset-btn">{resolvedImportText}</span>
        ),
      },
    ];
  }, [openModal, resolvedUploadText, badgeContent, badgeProps, badgeColor, handleImportClick, resolvedImportText]);

  return (
    <Box {...rest} ref={ref} className={clsx("rds-comp-ai-attachment__dropdown", className)} sx={sx}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="rds-comp-ai-attachment__file-input"
        style={{ display: "none" }}
        onChange={handleFileUpload}
        aria-label="Upload attachment"
      />

      <RdsCompAiFabMenu
        icon={icon ?? menuIcon}
        variant="text"
        dense
        bordered
        placement={alignment}
        items={listItems}
      />

      {showModal && (
        <RdsModal
          isOpen={showModal}
          onClose={closeModal}
          title={dialog?.title ?? modalTitle}
          actions={null}
          showCloseButton={true}
        >
          <p className="text-muted rds-comp-ai-attachment__import-size">{dialog?.text ?? modalText}</p>
          <RdsInput
            helperText={dialog?.hintText ?? hintText}
            id={inputId}
            placeholder={dialog?.placeholder ?? inputPlaceholder}
            layout="text"
            name="Enter Figma URL"
            value={figmaUrl}
            onChange={handleFigmaInputChange}
          />
        </RdsModal>
      )}
    </Box>
  );
};

RdsCompAiAttachment.displayName = "RdsCompAiAttachment";
export default RdsCompAiAttachment;
