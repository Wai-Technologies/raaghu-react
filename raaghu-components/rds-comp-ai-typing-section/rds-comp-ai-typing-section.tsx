import clsx from "clsx";
import { memo, useCallback, useEffect, useMemo, useState, type CSSProperties, type HTMLAttributes, type ReactNode, type Ref } from "react";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import "./rds-comp-ai-typing-section.scss";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import RdsAutocomplete, { type RdsAutocompleteProps } from "../../raaghu-elements/rds-autocomplete/rds-autocomplete";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import Send from "@mui/icons-material/Send";
import RdsCompAiAttachment, {
  type Comment as AttachmentComment,
  type RdsCompAiAttachmentSlotProps,
} from "../rds-comp-ai-attachment/rds-comp-ai-attachment";
import RdsCompAiIcon, { registerMaterialIcons } from "../rds-comp-ai-icon/rds-comp-ai-icon";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";

export interface RdsCompAiTypingSectionOption {
  label: string;
  value: string | number;
}

export interface RdsCompAiTypingSectionProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** @deprecated Has no effect. */
  colorVariant?: string;
  /** Placeholder of the prompt input. */
  placeholder?: string;
  /** @deprecated Use `placeholder` instead. */
  placeholderText?: string;
  /** @deprecated Has no effect. */
  iconName?: ReactNode;
  /** Called with the prompt text (and image, if any) from the send button. */
  onSend?: (inputText: string, image?: string) => void;
  /** Called with the comment created from the attachment menu. */
  onAddComment?: (comment: AttachmentComment) => void;
  /** Image sent with the prompt when no image was picked. */
  imageSrc?: string;
  /** @deprecated Use `imageSrc` instead. */
  previewImage?: string;
  /** @deprecated Has no effect. */
  type?: string;
  /** @deprecated Use `slotProps.autocomplete.sx` instead. */
  autoCompleteMaxWidth?: string;
  /** Props passed to inner slots; `autocomplete.sx` is merged into the frontend selector and `attachment` overrides the attachment menu and dialog copy. */
  slotProps?: {
    autocomplete?: Partial<RdsAutocompleteProps<RdsCompAiTypingSectionOption>>;
    attachment?: RdsCompAiAttachmentSlotProps;
  };
  /** Called when the "New Project" button is clicked. The button is rendered only when provided. */
  onNewProjectClick?: () => void;
  /** Called when the "Import From Figma" button is clicked. The button is rendered only when provided. */
  onImportFromFigmaClick?: () => void;
  /** Options of the frontend selector. The selector is hidden when empty. */
  autocompleteOptions?: RdsCompAiTypingSectionOption[];
  /** Badge label on the attachment menu button. No badge is shown when omitted. */
  attachmentBadge?: string | null;
  /** Ref to the root element. */
  ref?: Ref<HTMLDivElement>;
  /** MUI system styles applied to the root element. */
  sx?: SxProps<Theme>;
}

const DEFAULT_AUTOCOMPLETE_OPTIONS: RdsCompAiTypingSectionOption[] = [];

registerMaterialIcons({
  enhance: AutoAwesomeOutlinedIcon,
});

const MOBILE_BREAKPOINT = 768;

const ATTACHMENT_SLOT_PROPS = {
  menu: { uploadText: "Upload From Figma", importText: "Import From This Device" },
  dialog: {
    title: "Import From Figma",
    text: "Ask AI Pundit to turn your designs into code by attaching a link to a desired section or frame in your Figma file.",
    hintText: "Hint Text",
    placeholder: "Enter URL",
  },
};

/** Prompt input of the AI chat, with the attachment menu, send button and project actions. */
const RdsCompAiTypingSectionComponent = ({
  colorVariant,
  placeholder,
  placeholderText,
  iconName,
  onSend,
  imageSrc,
  previewImage,
  onAddComment,
  type,
  autoCompleteMaxWidth,
  slotProps,
  onNewProjectClick,
  onImportFromFigmaClick,
  autocompleteOptions = DEFAULT_AUTOCOMPLETE_OPTIONS,
  attachmentBadge,
  className,
  ref,
  sx,
  ...rest
}: RdsCompAiTypingSectionProps) => {
  if (colorVariant !== undefined) warnDeprecatedProp("RdsCompAiTypingSection", "colorVariant", "nothing (no effect)");
  if (iconName !== undefined) warnDeprecatedProp("RdsCompAiTypingSection", "iconName", "nothing (no effect)");
  if (type !== undefined) warnDeprecatedProp("RdsCompAiTypingSection", "type", "nothing (no effect)");
  if (placeholderText !== undefined) warnDeprecatedProp("RdsCompAiTypingSection", "placeholderText", "`placeholder`");
  if (previewImage !== undefined) warnDeprecatedProp("RdsCompAiTypingSection", "previewImage", "`imageSrc`");
  if (autoCompleteMaxWidth !== undefined) warnDeprecatedProp("RdsCompAiTypingSection", "autoCompleteMaxWidth", "`slotProps.autocomplete.sx`");
  const resolvedPlaceholder = placeholder ?? placeholderText;
  const resolvedImage = imageSrc ?? previewImage;
  const { sx: autocompleteSx, ...autocompleteSlotProps } = slotProps?.autocomplete ?? {};
  const attachmentSlotProps = useMemo<RdsCompAiAttachmentSlotProps>(
    () => ({
      menu: { ...ATTACHMENT_SLOT_PROPS.menu, ...slotProps?.attachment?.menu },
      dialog: { ...ATTACHMENT_SLOT_PROPS.dialog, ...slotProps?.attachment?.dialog },
    }),
    [slotProps?.attachment]
  );
  const showNewProject = onNewProjectClick !== undefined;
  const showImportFromFigma = onImportFromFigmaClick !== undefined;
  const showProjectActions = showNewProject || showImportFromFigma;
  const showAutocomplete = autocompleteOptions.length > 0;
  const [inputText, setInputText] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSent = useCallback(() => {
    onSend?.(inputText, enhancedImage || resolvedImage);
    setInputText("");
    setEnhancedImage(null);
  }, [enhancedImage, inputText, onSend, resolvedImage]);

  const handleFileSelect = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setEnhancedImage(reader.result as string);
      setInputText("");
    };
    reader.readAsDataURL(file);
  }, []);

  const handleAddComment = useCallback(
    (comment: AttachmentComment) => {
      onAddComment?.(comment);
    },
    [onAddComment]
  );

  const handleFigmaSubmit = useCallback(
    (value: string) => {
      onAddComment?.({ image: value } as AttachmentComment);
    },
    [onAddComment]
  );

  const autocompleteStyle = useMemo(
    (): CSSProperties | undefined =>
      autoCompleteMaxWidth
        ? ({ "--ai-typing-autocomplete-max-width": autoCompleteMaxWidth } as CSSProperties)
        : undefined,
    [autoCompleteMaxWidth]
  );

  return (
    <Box {...rest} ref={ref} className={clsx("rds-comp-ai-typing-section", className)} sx={sx}>
      <div className="rds-comp-ai-typing-section__input-wrapper">
        <div
          className={clsx(
            "rds-comp-ai-typing-section__input-with-image",
            isMobile && "rds-comp-ai-typing-section__input-with-image--mobile"
          )}
        >
          <textarea
            className="rds-comp-ai-typing-section__input-box rds-comp-ai-typing-section__input-box--muted-placeholder"
            placeholder={!enhancedImage ? (resolvedPlaceholder ?? "") : ""}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            title="Enter your prompt here"
            aria-label="Prompt input"
          />
          {!inputText && (
            <span className="rds-comp-ai-typing-section__input-icon">
              <RdsCompAiIcon
                colorVariant="primary"
                height="var(--rds-size-lg)"
                name="enhance"
                stroke
                width="var(--rds-size-lg)"
              />
            </span>
          )}
        </div>
        <div
          className={clsx(
            "rds-comp-ai-typing-section__actions",
            isMobile && "rds-comp-ai-typing-section__actions--mobile"
          )}
        >
          <div className="rds-comp-ai-typing-section__action-icons">
            <div className="rds-comp-ai-typing-section__attach">
              <RdsCompAiAttachment
                badge={attachmentBadge ?? null}
                badgeProps={{ color: "primary" }}
                onAddComment={handleAddComment}
                icon="attachment_icon"
                onFigmaUrlChange={handleFigmaSubmit}
                onFileSelect={handleFileSelect}
                placement="end"
                slotProps={attachmentSlotProps}
              />
            </div>
            <div className="rds-comp-ai-typing-section__send">
              <RdsButton
                color="primary"
                changeLeftIcon={<Send />}
                showLeftIcon
                variant="filled"
                layout="icon-only"
                onClick={handleSent}
                aria-label="Send"
              />
            </div>
          </div>
        </div>
      </div>
      {(showProjectActions || showAutocomplete) && (
        <div className="rds-comp-ai-typing-section__button-sections">
          {showProjectActions && (
            <div className="rds-comp-ai-typing-section__project-actions">
              {showNewProject && (
                <div className="rds-comp-ai-typing-section__action-button rds-comp-ai-typing-section__action-button--project">
                  <RdsButton
                    color="primary"
                    changeLeftIcon="add"
                    showLeftIcon
                    text="New Project"
                    onClick={onNewProjectClick}
                    variant="filled"
                    size={isMobile ? "small" : "medium"}
                  />
                </div>
              )}
              {showImportFromFigma && (
                <div className="rds-comp-ai-typing-section__action-button rds-comp-ai-typing-section__action-button--figma">
                  <RdsButton
                    color="primary"
                    changeLeftIcon="add"
                    showLeftIcon
                    text="Import From Figma"
                    onClick={onImportFromFigmaClick}
                    variant="outlined"
                    size={isMobile ? "small" : "medium"}
                  />
                </div>
              )}
            </div>
          )}
          {showAutocomplete && (
            <div className="rds-comp-ai-typing-section__autocomplete" style={autocompleteStyle}>
              <RdsAutocomplete
                controlStyle="default"
                required={false}
                label=""
                options={autocompleteOptions}
                placeholder="Select Frontend"
                showHintText={false}
                showTitle={false}
                {...autocompleteSlotProps}
                sx={autocompleteSx}
              />
            </div>
          )}
        </div>
      )}
    </Box>
  );
};

const RdsCompAiTypingSection = memo(RdsCompAiTypingSectionComponent);
RdsCompAiTypingSection.displayName = "RdsCompAiTypingSection";
export default RdsCompAiTypingSection;
