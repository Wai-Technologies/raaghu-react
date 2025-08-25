// RDS AI Pundit Chat Component
import React, { useEffect, useState } from 'react';
import './rds-comp-ai-typing-section.scss';
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import RdsAutocomplete from '../../raaghu-elements/rds-autocomplete/rds-autocomplete';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import SendIcon from '@mui/icons-material/Send';
import RdsCompAiAttachement, { Comment as AttachmentComment } from '../../raaghu-components/rds-comp-ai-attachement/rds-comp-ai-attachement';
import RdsCompAiIcon, { registerMaterialIcons } from '../rds-comp-ai-icon/rds-comp-ai-icon';

export interface RdsCompAiTypingSectionProps {
  colorVariant?: string;
  placeholderText?: string;
  icon_name: string;
  onSend?: (inputText: string, image?: string) => void;
  onAddComment?: (comment: AttachmentComment) => void;
  previewImage?: string;
  type?: string;
  warningMsg?: boolean;
}
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

const RdsCompAiTypingSection: React.FC<RdsCompAiTypingSectionProps> = ({
  colorVariant,
  placeholderText,
  icon_name,
  onSend,
  previewImage,
  type,
  warningMsg,
  onAddComment
}) => {
  const [inputText, setInputText] = useState<string>("");
  const [prevInputText, setPrevInputText] = useState<string>("");
  const [showEnhancer, setShowEnhancer] = useState<boolean>(false);
  const [attachmentComment, setAttachmentComment] = useState<AttachmentComment | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(true);
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
            registerMaterialIcons({
                'enhance': AutoAwesomeOutlinedIcon,
            });
        }, []);

  useEffect(() => {
    if (warningMsg !== undefined) {
      setShowWarning(warningMsg);
    }
  }, [warningMsg]);

    const handleEnhancerClick = () => {
        setInputText(prevInputText);
        setEnhancedImage(attachmentComment?.image || null);
        setShowEnhancer(false);
    };

    const handleMicClick = () => {
    if (!('webkitSpeechRecognition' in window)) {
      return;
    }

        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

  recognition.onstart = () => {
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

    const handleFigmaSubmit = (value: string) => {
        onAddComment && onAddComment({ image: value } as AttachmentComment);
    };

  return (
    <div className="rds-comp-ai-chat-bot">
      <div className="rds-comp-ai-chat-bot__input-wrapper">
        <div className={`rds-comp-ai-chat-bot__input-with-image${ isMobile ? " rds-comp-ai-chat-bot__input-with-image--mobile" : "" }`} >
          <textarea
            className="rds-comp-ai-chat-bot__input-box rds-comp-ai-chat-bot__input-box--muted-placeholder"
            placeholder={
              !enhancedImage ? placeholderText || "Placeholder Text" : ""
            }
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            title="Enter your prompt here"
          />
          {!inputText && (
            <span className="rds-comp-ai-chat-bot__input-icon">
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
        <div className={`rds-comp-ai-chat-bot__actions${ isMobile ? " rds-comp-ai-chat-bot__actions--mobile" : "" }`}>
          <div className="rds-comp-ai-chat-bot__action-icons">
            <div className="rds-comp-ai-chat-bot__attach" id="Premium">
              <button>
                <RdsCompAiAttachement
                  badgeColor="success"
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
                />
              </button>
            </div>
            <div className="rds-comp-ai-chat-bot__send">
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
      <div className="rds-comp-ai-chat-bot__button-sections">
        <div className="rds-comp-ai-chat-bot__project-actions">
          <div className="rds-comp-ai-chat-bot__action-button rds-comp-ai-chat-bot__action-button--project">
            <RdsButton
              color="primary"
              changeLeftIcon="add"
              showLeftIcon
              text="New Project"
              style="filled"
              size="medium"
            />
          </div>
          <div className="rds-comp-ai-chat-bot__action-button rds-comp-ai-chat-bot__action-button--figma">
            <RdsButton
              color="primary"
              changeLeftIcon="add"
              showLeftIcon
              text="Import From Figma"
              style="outlined"
            />
          </div>
        </div>
        <div className="rds-comp-ai-chat-bot__autocomplete">
          <RdsAutocomplete
            controlStyle="default"
            helperText="Select one of the available options"
            isMandatory
            label=""
            options={[{ label: "Raaghu", value: 1 }]}
            placeholder="Select Frontend"
          />
        </div>
      </div>
    </div>
  );
};

RdsCompAiTypingSection.displayName = 'RdsCompAiTypingSection';
export default RdsCompAiTypingSection;