import clsx from "clsx";
import { memo, useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import "./rds-comp-ai-typing-section.scss";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import RdsAutocomplete from "../../raaghu-elements/rds-autocomplete/rds-autocomplete";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import RdsCompAiAttachement, {
  Comment as AttachmentComment,
} from "../../raaghu-components/rds-comp-ai-attachement/rds-comp-ai-attachement";
import RdsCompAiIcon, { registerMaterialIcons } from "../rds-comp-ai-icon/rds-comp-ai-icon";

export interface RdsCompAiTypingSectionProps {
  colorVariant?: string;
  placeholderText?: string;
  iconName: string;
  onSend?: (inputText: string, image?: string) => void;
  onAddComment?: (comment: AttachmentComment) => void;
  previewImage?: string;
  type?: string;
  autoCompleteMaxWidth?: string;
}

registerMaterialIcons({
  enhance: AutoAwesomeOutlinedIcon,
});

const MOBILE_BREAKPOINT = 768;

const RdsCompAiTypingSectionComponent = ({
  placeholderText,
  onSend,
  previewImage,
  onAddComment,
  autoCompleteMaxWidth,
}: RdsCompAiTypingSectionProps) => {
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

  const handleMicClick = useCallback(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const SpeechRecognitionCtor = window.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) return;
    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
    };

    recognition.start();
  }, []);

  const handleSent = useCallback(() => {
    onSend?.(inputText, enhancedImage || previewImage);
    setInputText("");
    setEnhancedImage(null);
  }, [enhancedImage, inputText, onSend, previewImage]);

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
            placeholder={!enhancedImage ? placeholderText || "Placeholder Text" : ""}
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
                isCursorPointer
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
            <div className="rds-comp-ai-typing-section__attach" id="Premium">
              <RdsCompAiAttachement
                badgeColor="primary"
                badgeLabel="Premium"
                handleAddComment={handleAddComment}
                hintText="Hint Text"
                importText="Import From This Device"
                inputPlaceholder="Enter URL"
                menuIcon="attachment_icon"
                modalText="Ask AI Pundit to turn your designs into code by attaching a link to a desired section or frame in your Figma file."
                modalTitle="Import From Figma"
                onFigmaSubmit={handleFigmaSubmit}
                onFileSelect={handleFileSelect}
                showBadge
                uploadText="Upload From Figma"
                menuAlignment="right"
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
              style="outlined"
              size={isMobile ? "small" : "medium"}
            />
          </div>
        </div>
        <div className="rds-comp-ai-typing-section__autocomplete" style={autocompleteStyle}>
          <RdsAutocomplete
            controlStyle="default"
            isMandatory={false}
            label=""
            options={[{ label: "Raaghu", value: 1 }]}
            placeholder="Select Frontend"
            showHintText={false}
            showTitle={false}
          />
        </div>
      </div>
    </div>
  );
};

const RdsCompAiTypingSection = memo(RdsCompAiTypingSectionComponent);
RdsCompAiTypingSection.displayName = "RdsCompAiTypingSection";
export default RdsCompAiTypingSection;
