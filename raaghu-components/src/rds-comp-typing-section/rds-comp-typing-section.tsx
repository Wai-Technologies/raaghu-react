import React, { useState, useEffect } from "react";
import { RdsInput, RdsIcon, RdsButton, RdsAttachement } from "../rds-elements";
import './rds-comp-typing-section.css';
import { Comment as AttachmentComment } from "../../../raaghu-elements/src/rds-attachement/rds-attachement";

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

    const handleAddComment = (comment: AttachmentComment) => {
        setAttachmentComment(comment);
        onAddComment && onAddComment(comment);
    };

    const handleFigmaSubmit = (value: string) => {
        console.log("Figma URL submitted:", value);
        onAddComment && onAddComment({ image: value } as AttachmentComment);
    };

    return (
        <div className="d-flex flex-column typing-section">
            <div className="input-wrapper">
                <div className={`input-with-image ${isMobile ? 'pr-3' : ''}`}>
                    {showEnhancer &&
                        <span className="mt-2">
                            <RdsIcon
                                colorVariant="primary"
                                height="40px"
                                isCursorPointer
                                name={icon_name}
                                stroke
                                width="40px"
                                onClick={handleEnhancerClick}
                            />
                        </span>
                    }
                    {(previewImage || enhancedImage) && (
                        <div className="preview-image-container">
                            <img src={previewImage || enhancedImage || ''} alt="Preview" className="preview-image" />
                        </div>
                    )}
                    <textarea
                        className={`form-controls input-box-typing-section  type-section-border text-${props.colorVariant} border-${props.colorVariant} mt-2`}
                        placeholder={props.placeholderText || "Placeholder Text"}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        title="Enter your prompt here"
                    />
                    <div className={`d-flex ${isMobile ? 'flex-column align-items-center' : 'gap-3 mt-3 mr-3 me-2'}`}>
                        {!isMobile &&<div className="attachement-web">
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
                            showBadge
                            uploadText="Upload From Figma"
                        />
                        </div> }
                        {!isMobile && (
                            <>
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
                                    databstoggle="tooltip"
                                    displayType="Icon + Text"
                                    iconStroke={true}
                                    icon="plus"
                                    label="Project"
                                    shape="rectangle"
                                    size="medium"
                                    state="default"
                                    style="filled"
                                    textCase="unset"
                                    onClick={() => console.log("Project Button clicked")}
                                />
                                <RdsButton
                                    badgeLayout="Text_only"
                                    badgeState="default"
                                    badgeStyle="primary"
                                    colorVariant="primary"
                                    databstoggle="tooltip"
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
                                databstoggle="tooltip"
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
                    {isMobile &&
                        <div id="left-bottom-corner">
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
                            showBadge
                            uploadText="Upload From Figma"
                        />
                        </div>}
                </div>
            </div>
        </div>
    );
};

export default RdsCompTypingSection;