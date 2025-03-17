import React, { useState, useEffect } from "react";
import { RdsInput, RdsIcon, RdsButton } from "../rds-elements";
import { LabelPosition, InputSize } from "../../../raaghu-elements/src/rds-input/rds-input";
import './rds-comp-typing-section.css';

export interface RdsTypingAltProps {
    colorVariant?: string;
    placeholderText?: string;
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
        console.log("Mic icon clicked");
    };

    const handleProject = () => {
        console.log("Project Button clicked");
    };

    const handleSent = () => {
        setPrevInputText(inputText);
        setInputText("");
        setShowEnhancer(true);
    };

    return (<>
        <div className="input-column">
            <div className="input-wrapper">
                <div className="input-with-image">
                {showEnhancer &&
                <span className="mt-2">
                    <RdsIcon
                    colorVariant="primary"
                    height="40px"
                    isCursorPointer
                    name="enhancer"
                    stroke
                    width="40px"
                    onClick={handleEnhancerClick}
                />
                </span>
                }
                    <textarea
                        className={`form-controls input-box text-${props.colorVariant} border-${props.colorVariant}`}
                        placeholder={props.placeholderText || "Placeholder Text"}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        title="Enter your prompt here"
                        style={{marginTop: "12px"}}
                    />
                    <div className={`icon-container ${isMobile ? 'mobile' : ''}`}>
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
                        <div className="mobile-icons">
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