import clsx from "clsx";
import { memo, useCallback, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import "./rds-comp-ai-typing-section.scss";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import RdsAutocomplete, { type RdsAutocompleteProps } from "../../raaghu-elements/rds-autocomplete/rds-autocomplete";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import RdsCompAiAttachment, {
  type Comment as AttachmentComment,
} from "../rds-comp-ai-attachment/rds-comp-ai-attachment";
import RdsCompAiIcon, { registerMaterialIcons } from "../rds-comp-ai-icon/rds-comp-ai-icon";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";

export interface RdsCompAiTypingSectionOption {
  label: string;
  value: string | number;
}

export interface RdsCompAiTypingSectionProps {
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
  onAddComment?: (comment: AttachmentComment) => void;
  /** Image sent with the prompt when no image was picked. */
  imageSrc?: string;
  /** @deprecated Use `imageSrc` instead. */
  previewImage?: string;
  /** @deprecated Has no effect. */
  type?: string;
  /** @deprecated Use `slotProps.autocomplete.sx` instead. */
  autoCompleteMaxWidth?: string;
  /** Props passed to inner slots; `autocomplete.sx` is merged into the frontend selector. */
  slotProps?: { autocomplete?: Partial<RdsAutocompleteProps<RdsCompAiTypingSectionOption>> };
  /** Called when the "New Project" button is clicked. */
  onNewProjectClick?: () => void;
  /** Called when the "Import From Figma" button is clicked. */
  onImportFromFigmaClick?: () => void;
  /** Options of the frontend selector (defaults to Raaghu). */
  autocompleteOptions?: RdsCompAiTypingSectionOption[];
}

const DEFAULT_AUTOCOMPLETE_OPTIONS: RdsCompAiTypingSectionOption[] = [{ label: "Raaghu", value: 1 }];

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
    <div className="rds-comp-ai-typing-section">
      <div className="rds-comp-ai-typing-section__input-wrapper">
        <div
          className={clsx(
            "rds-comp-ai-typing-section__input-with-image",
            isMobile && "rds-comp-ai-typing-section__input-with-image--mobile"
          )}
        >
          <textarea
            className="rds-comp-ai-typing-section__input-box rds-comp-ai-typing-section__input-box--muted-placeholder"
            placeholder={!enhancedImage ? resolvedPlaceholder || "Placeholder Text" : ""}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            title="Enter your prompt here"
            aria-label="Prompt input"
          />
          {!inputText && (
            <span className="rds-comp-ai-typing-section__input-icon">
              <RdsCompAiIcon
                colorVariant="primary"
                height="24px"
                name="enhance"
                stroke
                width="24px"
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
                badge="Premium"
                badgeProps={{ color: "primary" }}
                onAddComment={handleAddComment}
                icon="attachment_icon"
                onFigmaUrlChange={handleFigmaSubmit}
                onFileSelect={handleFileSelect}
                placement="end"
                slotProps={ATTACHMENT_SLOT_PROPS}
              />
            </div>
            <div className="rds-comp-ai-typing-section__send">
              <RdsButton
                color="primary"
                changeLeftIcon="add"
                showLeftIcon
                style="filled"
                layout="icon-only"
                onClick={handleSent}
                aria-label="Send"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="rds-comp-ai-typing-section__button-sections">
        <div className="rds-comp-ai-typing-section__project-actions">
          <div className="rds-comp-ai-typing-section__action-button rds-comp-ai-typing-section__action-button--project">
            <RdsButton
              color="primary"
              changeLeftIcon="add"
              showLeftIcon
              text="New Project"
              onClick={onNewProjectClick}
              style="filled"
              size={isMobile ? "small" : "medium"}
            />
          </div>
          <div className="rds-comp-ai-typing-section__action-button rds-comp-ai-typing-section__action-button--figma">
            <RdsButton
              color="primary"
              changeLeftIcon="add"
              showLeftIcon
              text="Import From Figma"
              onClick={onImportFromFigmaClick}
              style="outlined"
              size={isMobile ? "small" : "medium"}
            />
          </div>
        </div>
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
      </div>
    </div>
  );
};

const RdsCompAiTypingSection = memo(RdsCompAiTypingSectionComponent);
RdsCompAiTypingSection.displayName = "RdsCompAiTypingSection";
export default RdsCompAiTypingSection;
