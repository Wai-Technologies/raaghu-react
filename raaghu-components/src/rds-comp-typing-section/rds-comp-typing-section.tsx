import React, { useState, useEffect } from "react";
import { RdsInput, RdsIcon, RdsButton, RdsAttachement } from "../rds-elements";
import './rds-comp-typing-section.css';
import { Comment as AttachmentComment } from "../../../raaghu-elements/src/rds-attachement/rds-attachement";
import { TooltipStyle } from "../../../raaghu-elements/src/rds-tooltip/rds-tooltip";

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
        <div className="d-flex flex-column typing-section">
            <div className="input-wrapper">
                <div className={`input-with-image ${isMobile ? 'pr-3' : ''}`}>
                    <textarea
                        className={`form-controls w-100 input-box-typing-section type-section-border text-${colorVariant} border-${colorVariant}`}
                        placeholder={!enhancedImage ? placeholderText || "Placeholder Text" : ""}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        title="Enter your prompt here"
                    />
                    <div className={`d-flex ${isMobile ? "flex-column align-items-center" : "gap-2 ms-2 mb-2"}`}>
                        <div id="typing-btn">
                            <RdsButton
                                badgeLayout="Text_only"
                                badgeState="default"
                                badgeStyle="primary"
                                colorVariant="primary"
                                data-bs-toggle="tooltip"
                                displayType="Icon + Text"
                                iconStroke
                                icon="plus"
                                label="Project"
                                shape="rectangle"
                                size="medium"
                                state="default"
                                style="filled"
                                textCase="unset"
                            />
                        </div>
                        <div id="typing-btn-outline">
                            <RdsButton
                                size="medium"
                                shape="rectangle"
                                state="default"
                                badgeLayout="Icon + Text"
                                style="outline"
                                badgeState="default"
                                badgeStyle="primary"
                                colorVariant="primary"
                                data-bs-toggle="tooltip"
                                displayType="Icon + Text"
                                icon="figma_colored"
                                label="Import From Figma"
                                textCase="unset"
                                tooltipPlacement={
                                    TooltipStyle.LeftArrow
                                }
                                tooltipTitle="This is tooltip"
                            />
                        </div>
                    </div>
                    <div id="typing-section" className={`d-flex ${isMobile ? "flex-column align-items-center" : "gap-2 align-self-end me-3 mb-3"}`}>
                        {!isMobile &&
                            <RdsAttachement
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
                                onFileSelect={handleFileSelect} // Updated to use the modified function
                                showBadge
                                uploadText="Upload From Figma"
                            />
                        }
                        {!isMobile && (
                            <>
                                <div className="btn-transition">
                                    <RdsButton
                                        badgeLayout="Text_only"
                                        badgeState="default"
                                        badgeStyle="primary"
                                        colorVariant="primary"
                                        data-bs-toggle="tooltip"
                                        displayType="Icon Only"
                                        icon="uparrow"
                                        label=""
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
                            </>
                        )}
                    </div>
                    {isMobile && (
                        <div className="d-flex gap-2 position-absolute mt-3 end-0 me-2">
                            <RdsIcon
                                colorVariant="primary"
                                height="20px"
                                isCursorPointer
                                name="mic"
                                stroke
                                width="20px"
                                onClick={handleMicClick}
                            />
                            <RdsButton
                                badgeLayout="Text_only"
                                badgeState="default"
                                badgeStyle="primary"
                                colorVariant="primary"
                                data-bs-toggle="tooltip"
                                displayType="Icon Only"
                                icon="uparrow"
                                label=""
                                shape="rectangle"
                                size="medium"
                                state="default"
                                style="filled"
                                textCase="unset"
                                onClick={handleSent}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RdsCompTypingSection;