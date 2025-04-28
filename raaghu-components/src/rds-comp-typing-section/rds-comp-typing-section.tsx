import React, { useState, useEffect } from "react";
import { RdsInput, RdsIcon, RdsButton, RdsAttachement, RdsSelectList, RdsDropdown } from "../rds-elements";
import './rds-comp-typing-section.css';
import { Comment as AttachmentComment } from "../../../raaghu-elements/src/rds-attachement/rds-attachement";
import { TooltipStyle } from "../../../raaghu-elements/src/rds-tooltip/rds-tooltip";
import { DisplayType, Layout, Shape, State, Style } from "../../../raaghu-elements/src/rds-dropdown/rds-dropdown";
import { TooltipPlacement } from "../../../raaghu-elements/src/rds-input/rds-input";

export interface RdsTypingAltProps {
    colorVariant?: string;
    placeholderText?: string;
    icon_name: string;
    onSend?: (inputText: string, image?: string) => void;
    onAddComment?: (comment: AttachmentComment) => void;
    previewImage?: string;
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

    const handleFigmaSubmit = (value: string) => {
        onAddComment && onAddComment({ image: value } as AttachmentComment);
    };

    return (
        <div className ="border-radius transperent">
        <div className="d-flex flex-column typing-section">
          

<div className="input-wrapper position-relative">
    <div className={`input-with-image ${isMobile ? 'pr-3' : ''}`}>
        <textarea
            className={`form-controls w-100 input-box-typing-section type-section-border text-${colorVariant} border-${colorVariant}`}
            placeholder={!enhancedImage ? placeholderText || "Placeholder Text" : ""}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            title="Enter your prompt here"
        />
        
        <div className="mt-1 position-absolute top-0 end-0">
            <RdsIcon 
                classes="gradient-text"
              
                height="20px"
                isCursorPointer
                name="sparkle"
                width="20px"
            />
        </div>
    </div>

    {/* Mobile and Desktop Send/Attach Buttons */}
    <div className={`d-flex ${isMobile ? 'justify-content-end mt-3' : 'justify-content-end  mb-3'} gap-2`}>
        <div className="attach" id="Premium">
            <RdsAttachement 
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
        <div className="btn-transition ">
            <RdsButton class="send-icon"
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
            <div className={`${isMobile ? 'd-flex flex-column gap-3' : 'd-flex gap-3'} mt-3`}>
                    <div className="action-button-item ">
                        <RdsButton
                            badgeLayout="Text_only"
                            badgeState="default"
                            badgeStyle="primary"
                            colorVariant="primary"
                            displayType="Icon + Text"
                            iconStroke
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
                            colorVariant="primary"
                            displayType="Icon + Text"
                            icon="figma_icon"
                            label="Import From Figma"
                            textCase="unset"
                           
                        />
                    </div>
                    <div id= "chat" className={`action-button-item typing chat-section  ${!isMobile ? 'ms-auto' : 'me-auto'}`}>
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
                                    id: '1',
                                    label: 'Raaghu',
                                    path: ''
                                },
                               
                            ]}                           
                            shape={Shape.Rectangle}
                            showChevron
                            size="medium"
                            state={State.Default}
                            style={Style.Transparent} darkDropdown={false}      
                            />
                    </div>
                </div>
                    {/* </div> */}
        </div>
        </div>
    );
};

export default RdsCompTypingSection;