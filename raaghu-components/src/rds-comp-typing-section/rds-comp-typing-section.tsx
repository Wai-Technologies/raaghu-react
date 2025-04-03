import React, { useState, useEffect } from "react";
import { RdsInput, RdsIcon, RdsButton } from "../rds-elements";
import './rds-comp-typing-section.css';

export interface RdsTypingAltProps {
    colorVariant?: string;
    placeholderText?: string;
    icon_name: string;
    onSend?: (inputText: string) => void;
}

declare global {
    interface Window {
        webkitSpeechRecognition: any;
    }
}

const RdsCompTypingSection = (props: RdsTypingAltProps) => {
    const [inputText, setInputText] = useState<string>("");
    const [prevInputText, setPrevInputText] = useState<string>("");
    const [showEnhancer, setShowEnhancer] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleEnhancerClick = () => {
        console.log("Enhancer icon clicked");
        setInputText(prevInputText);
    };

    const handleAttachmentClick = () => {
        console.log("Attachment icon clicked");
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

        recognition.onresult = (event : any) => {
            const transcript = event.results[0][0].transcript;
            setInputText(transcript);
            console.log("Speech recognition result: ", transcript);
        };

        recognition.onerror = (event: any) => {
            console.log("Speech recognition error: ", event.error);
        };

        recognition.onend = () => {
            console.log("Speech recognition ended");
        };

        recognition.start();
    };

    const handleProject = () => {
        console.log("Project Button clicked");
    };

    const handleSent = () => {
        setPrevInputText(inputText);
        props.onSend && props.onSend(inputText);
        setInputText("");
        setShowEnhancer(true);
    };

    return (<>
        <div className="d-flex flex-column">
            <div className="input-wrapper">
                <div className={`input-with-image ${isMobile ? 'pr-3' : ''}`}>
                {showEnhancer &&
                <span className="mt-2">
                    <RdsIcon
                    colorVariant="primary"
                    height="40px"
                    isCursorPointer
                    name={props.icon_name}
                    stroke
                    width="40px"
                    onClick={handleEnhancerClick}
                />
                </span>
                }
                    <textarea
                        className={`form-controls input-box-typing-section  type-section-border text-${props.colorVariant} border-${props.colorVariant} mt-2`}
                        placeholder={props.placeholderText || "Placeholder Text"}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        title="Enter your prompt here"
                    />
                    <div className={`d-flex ${isMobile ? 'flex-column align-items-center' : 'gap-3 mt-3 mr-3 me-2'}`}>
                    {!isMobile && <RdsIcon
                        colorVariant="primary"
                        height="20px"
                        isCursorPointer
                        name="attachment_new"
                        stroke
                        width="20px"
                        onClick={handleAttachmentClick}
                    />}
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
                                onClick={handleProject}
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
                            {!isMobile &&
                            <RdsButton
                                badgeLayout="Text_only"
                                badgeState="default"
                                badgeStyle="primary"
                                colorVariant="primary"
                                databstoggle="tooltip"
                                displayType="Icon + Text"
                                icon="plus"
                                label="Project"
                                shape="rectangle"
                                size="medium"
                                state="default"
                                style="filled"
                                textCase="unset"
                                onClick={handleProject}
                            />}
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
                    <div id="left-bottom-corner"><RdsIcon
                        colorVariant="primary"
                        height="20px"
                        isCursorPointer
                        name="attachment_new"
                        stroke
                        width="20px"
                        onClick={handleAttachmentClick}
                    /></div>}
                </div>
            </div>
        </div>
    </>);
};

export default RdsCompTypingSection;