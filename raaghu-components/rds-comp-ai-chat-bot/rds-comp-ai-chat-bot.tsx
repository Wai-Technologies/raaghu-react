// RDS AI Pundit Chat Component
import React, { useEffect, useState } from 'react';
import './rds-comp-ai-chat-bot.scss';
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import RdsAutocomplete from '../../raaghu-elements/rds-autocomplete/rds-autocomplete';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';

export interface RdsCompAiChatBotProps {
  colorVariant?: string;
  placeholderText?: string;
  icon_name: string;
  onSend?: (inputText: string, image?: string) => void;
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

const RdsCompAiChatBot: React.FC<RdsCompAiChatBotProps> = ({
  colorVariant,
  placeholderText,
  icon_name,
  onSend,
  previewImage,
  type,
  warningMsg,
  advancedControls,
  isTheme,
  warningText
}) => {
  const [inputText, setInputText] = useState<string>("");
  const [prevInputText, setPrevInputText] = useState<string>("");
  const [showEnhancer, setShowEnhancer] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(true);
  const [showAdvancedControls, setShowAdvancedControls] = useState<boolean>(true);
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
    if (warningMsg !== undefined) {
      setShowWarning(warningMsg);
    }
  }, [warningMsg]);

  useEffect(() => {
    if (advancedControls !== undefined) {
      setShowAdvancedControls(advancedControls);
    }
  }, [advancedControls]);

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
      setEnhancedImage(reader.result as string);
      setInputText("");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="rds-comp-ai-chat-bot">
      <div className="rds-comp-ai-chat-bot__input-wrapper">
        <div className={`rds-comp-ai-chat-bot__input-with-image${isMobile ? ' rds-comp-ai-chat-bot__input-with-image--mobile' : ''}`}>
          <textarea
            className="rds-comp-ai-chat-bot__input-box rds-comp-ai-chat-bot__input-box--muted-placeholder"
            placeholder={!enhancedImage ? placeholderText || "Placeholder Text" : ""}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            title="Enter your prompt here"
          />
          {!inputText && (
            <span className="rds-comp-ai-chat-bot__input-icon">
              <AutoAwesomeOutlinedIcon />
            </span>
          )}
        </div>
        <div className={`rds-comp-ai-chat-bot__actions${isMobile ? ' rds-comp-ai-chat-bot__actions--mobile' : ''}`}>
          <div className="rds-comp-ai-chat-bot__action-icons">
            <div className="rds-comp-ai-chat-bot__attach" id="Premium">
              <button>
                <AttachmentOutlinedIcon />
              </button>
            </div>
            <div className="rds-comp-ai-chat-bot__send">
              <RdsButton color="primary" icon="add" style="filled" layout='icon-only' />
            </div>
          </div>
        </div>
      </div>
      <div className="rds-comp-ai-chat-bot__button-sections">
        <div className="rds-comp-ai-chat-bot__project-actions">
          <div className="rds-comp-ai-chat-bot__action-button rds-comp-ai-chat-bot__action-button--project">
            <RdsButton
              color="primary"
              icon="add"
              label="New Project"
              style="filled"
              size='medium'
            />
          </div>
          <div className="rds-comp-ai-chat-bot__action-button rds-comp-ai-chat-bot__action-button--figma">
            <RdsButton
              color="primary"
              icon="add"
              label="Import From Figma"
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
            options={[
              {
                label: "Raaghu",
                value: 1,
              },
            ]}
            placeholder="Select Frontend"
          />
        </div>
      </div>
    </div>
  );
};

export default RdsCompAiChatBot;
