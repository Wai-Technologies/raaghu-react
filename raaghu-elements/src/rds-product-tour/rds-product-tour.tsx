/* eslint-disable indent */
import React from "react";
import "./rds-product-tour.css";
import RdsCarousel from "../rds-carousel/rds-carousel";
import RdsBadge from "../rds-badge";
import RdsInput from "../rds-input";
import RdsButton from "../rds-button";
import RdsDropdownList, { DropdownSize, DropdownState, DropdownStyle } from "../rds-dropdown-list/rds-dropdown-list";
import RdsTextArea from "../rds-text-area";
import RdsFileUploader from "../rds-file-uploader";
import { InputSize } from "../rds-input/rds-input";
import { FileUploaderState, FileUploaderStyle } from "../rds-file-uploader/rds-file-uploader";

export interface ProductTourProps {
    state?: "Image" | "Carousel" | "GIF" | "Form";
    topLeft?: boolean;
    topRight?: boolean;
    bottomLeft?: boolean;
    bottomRight?: boolean;
    header?: string;
    description?: string;
    stepsIndicator?: string;
    showDismiss?: boolean;
    showPrimaryButton?: boolean;
    showSecondaryButton?: boolean;
    showTertiaryButton?: boolean;
    showVisualPlaceholder?: boolean;
}

const RdsProductTour = (props: ProductTourProps) => {

    const slides = [
        {
            id: 1,
            imgUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
            name: props.header && props.header.trim() !== "" ? props.header : "Tour Title 1",
            subTitle: props.description && props.description.trim() !== "" ? props.description : "Tour Description 1"
        },
        {
            id: 2,
            imgUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
            name: props.header && props.header.trim() !== "" ? props.header : "Tour Title 2",
            subTitle: props.description && props.description.trim() !== "" ? props.description : "Tour Description 2"
        },
        {
            id: 3,
            imgUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
            name: props.header && props.header.trim() !== "" ? props.header : "Tour Title 3",
            subTitle: props.description && props.description.trim() !== "" ? props.description : "Tour Description 3"
        },
    ];

    return (
        <>
            {props.state == "Image" &&
                <div className="product-tour-container">
                    {/* Corner dots conditionally rendered based on props */}
                    {props.topLeft && <div className="corner-dot-top-left" />}
                    {props.bottomLeft && <div className="corner-dot-bottom-left" />}
                    {props.bottomRight && <div className="corner-dot-bottom-right" />}
                    {props.topRight && <div className="corner-dot-top-right" />}

                    {/* Close (X) button on top right, controlled by showDismiss */}
                    {props.showDismiss !== false && (
                        <button className="product-tour-close-btn" aria-label="Close">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="8" y1="8" x2="20" y2="20" stroke="white" strokeWidth="1.0" strokeLinecap="round" />
                                <line x1="20" y1="8" x2="8" y2="20" stroke="white" strokeWidth="1.0" strokeLinecap="round" />
                            </svg>
                        </button>
                    )}
                    {/* Image Section or Placeholder */}
                    {props.showVisualPlaceholder !== false ? (
                        <div className="product-tour-image-section">
                            <img
                                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                                alt="Tour Step"
                                className="product-tour-image"
                            />
                        </div>
                    ) : (
                        <div className="product-tour-image-section" style={{ height: "220px", background: "transparent" }} />
                    )}
                    {/* Info + Navigation Section */}
                    <div className="product-tour-info-nav-section">
                        <div className="product-tour-info">
                            <div className="product-tour-title">{props.header}</div>
                            <div className="product-tour-desc">
                                {props.description}
                            </div>
                        </div>
                        <div className="product-tour-navigation-row">
                            <div className="product-tour-stepcount">{props.stepsIndicator}</div>
                            <div className="product-tour-skip">
                                {props.showTertiaryButton !== false && "Skip"}
                            </div>
                            <div className="product-tour-arrows">
                                {props.showSecondaryButton !== false && (
                                    <button className="product-tour-arrow product-tour-arrow-prev">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13 16L8 10L13 4"
                                                stroke="#7C3AED"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                )}
                                {props.showPrimaryButton !== false && (
                                    <button className="product-tour-arrow product-tour-arrow-next">
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M7 4L12 10L7 16"
                                                stroke="#fff"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            }            {props.state == "Carousel" &&
                <div className="product-tour-carousel-outer" style={{ position: "relative" }}>
                    {/* Corner dots conditionally rendered based on props */}
                    {props.topLeft && <div className="corner-dot-top-left" />}
                    {props.topRight && <div className="corner-dot-top-right" />}
                    {props.bottomLeft && <div className="corner-dot-bottom-left" />}
                    {props.bottomRight && <div className="corner-dot-bottom-right" />}
                    {/* Close (X) button on top right, controlled by showDismiss */}
                    {props.showDismiss !== false && (
                        <button className="product-tour-carousel-close-btn" aria-label="Close">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="8" y1="8" x2="20" y2="20" stroke="#9E9E9E" strokeWidth="1.0" strokeLinecap="round" />
                                <line x1="20" y1="8" x2="8" y2="20" stroke="#9E9E9E" strokeWidth="1.0" strokeLinecap="round" />
                            </svg>
                        </button>
                    )}
                    {/* Carousel or Placeholder */}
                    <RdsCarousel
                        Indicators={true}
                        controls={false}
                        type="Circle"
                        style="With Title"
                        carouselItems={props.showVisualPlaceholder !== false ? slides : []}
                        state={"1"}
                    />

                    {/* Space between carousel and dots */}
                    <div className="product-tour-carousel-spacer" />
                    {/* Navigation row below carousel */}
                    <div className="product-tour-carousel-nav-row">
                        <div className="product-tour-carousel-stepcount">{props.stepsIndicator || "1/3"}</div>
                        <div className="product-tour-carousel-nav-group">
                            <button className="product-tour-carousel-skip"> {props.showTertiaryButton !== false && "Skip"}</button>
                            <div className="product-tour-carousel-arrows">
                                {props.showSecondaryButton !== false && (
                                    <button className="product-tour-carousel-arrow-prev">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13 16L8 10L13 4" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                )}
                                {props.showPrimaryButton !== false && (
                                    <button className="product-tour-carousel-arrow-next">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L12 10L7 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            }            {props.state == "GIF" &&
                <div className="product-tour-animation-container">
                    {/* Corner dots conditionally rendered based on props */}
                    {props.topLeft && <div className="corner-dot-top-left" />}
                    {props.topRight && <div className="corner-dot-top-right" />}
                    {props.bottomLeft && <div className="corner-dot-bottom-left" />}
                    {props.bottomRight && <div className="corner-dot-bottom-right" />}

                    {/* Close (X) button on top right, controlled by showDismiss */}
                    {props.showDismiss !== false && (
                        <button className="product-tour-close-btn" aria-label="Close">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="8" y1="8" x2="20" y2="20" stroke="#9E9E9E" strokeWidth="1.0" strokeLinecap="round" />
                                <line x1="20" y1="8" x2="8" y2="20" stroke="#9E9E9E" strokeWidth="1.0" strokeLinecap="round" />
                            </svg>
                        </button>
                    )}
                    {/* Animation/Progress Section or Placeholder */}
                    {props.showVisualPlaceholder !== false ? (
                        <div className="product-tour-animation-section">
                            <div className="product-tour-animation-progress">
                                <img
                                    src="/stories/assets/animation.gif"
                                    alt="Tour Animation GIF"
                                    className="product-tour-gif"
                                />
                            </div>
                        </div>
                    ) : (
                        <div style={{ height: "220px", width: "100%", background: "transparent" }} />
                    )}
                    {/* Info Section */}
                    <div className="product-tour-animation-info">
                        <h2 className="product-tour-animation-title">{props.header}</h2>
                        <p className="product-tour-animation-desc">
                            {props.description}
                        </p>
                    </div>

                    {/* Navigation Section */}
                    <div className="product-tour-animation-navigation">
                        <div className="product-tour-animation-stepcount">{props.stepsIndicator}</div>
                        <div className="product-tour-animation-controls">
                            <div className="product-tour-animation-skip">
                                {props.showTertiaryButton !== false && "Skip"}
                            </div>
                            <div className="product-tour-animation-nav-buttons">
                                {props.showSecondaryButton !== false && (
                                    <button className="product-tour-animation-nav-prev">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13 16L8 10L13 4" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                )}
                                {props.showPrimaryButton !== false && (
                                    <button className="product-tour-animation-nav-next">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 4L12 10L7 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            }
            {props.state == "Form" &&
                <div className="product-tour-form-container">
                    {/* Corner dots conditionally rendered based on props */}
                    {props.topLeft && <div className="corner-dot-top-left" />}
                    {props.topRight && <div className="corner-dot-top-right" />}
                    {props.bottomLeft && <div className="corner-dot-bottom-left" />}
                    {props.bottomRight && <div className="corner-dot-bottom-right" />}

                    {/* Close (X) button on top right, controlled by showDismiss */}
                    {props.showDismiss !== false && (
                        <button className="product-tour-close-btn" aria-label="Close">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="8" y1="8" x2="20" y2="20" stroke="#9E9E9E" strokeWidth="1.0" strokeLinecap="round" />
                                <line x1="20" y1="8" x2="8" y2="20" stroke="#9E9E9E" strokeWidth="1.0" strokeLinecap="round" />
                            </svg>
                        </button>
                    )}

                    {/* Header section */}
                    <div className="product-tour-form-header">
                        <div className="product-tour-form-title-container">
                            <h1 className="product-tour-form-subtitle">Getting Started Tour</h1>
                        </div>
                    </div>

                    {/* Form section */}
                    <div className="product-tour-form-content">
                        {/* Tour title and badge */}
                        <div className="product-tour-form-title-badge-row">
                            <h5 className="product-tour-form-title">{props.header}</h5>
                            <div className="mb-3">
                                <RdsBadge
                                    label="Badge"
                                    size="medium"
                                    colorVariant="primary"
                                    positioned={false}
                                    shape="pill"
                                    layout="Text_only"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <p className="product-tour-form-description">
                            {props.description}
                        </p>
                        {/* Tabs/Categories */}
                        <div className="product-tour-form-tabs-wrapper">
                            <div className="product-tour-form-tabs">
                                <div className="product-tour-form-tab">Designers</div>
                                <div className="product-tour-form-tab">Developers</div>
                                <div className="product-tour-form-tab">Managers</div>
                            </div>
                            <div className="product-tour-form-tabs-line"></div>
                        </div>

                        {/* Form inputs */}
                        <div className="product-tour-form-input-row">
                            <div className="product-tour-form-input-container">
                                <RdsInput
                                    placeholder="Enter Project Name"
                                    size={InputSize.Medium}
                                    inputType="text"
                                    readonly={false}
                                    isDisabled={false}
                                    name="projectName"
                                    showIcon
                                />
                            </div>
                            {/* <div style={{ marginTop: "14px" }}>
                                <RdsButton
                                    colorVariant="primary"
                                    size="medium"
                                    label="Create"
                                    style="outline"
                                    class="product-tour-create-button"
                                />
                            </div> */}
                        </div>
                        <div className="product-tour-form-input-row">
                            <div className="product-tour-form-input-container">
                                <div className="custom-dropdown-wrapper">
                                    <RdsDropdownList
                                        placeholder="Add Team Members"
                                        isPlaceholder={true}
                                        borderDropdown={true}
                                        style={DropdownStyle.Default}
                                        size={DropdownSize.Default}
                                        state={DropdownState.Default}
                                        showIcon={true}
                                        listItems={[
                                            { label: "Team Member 1", val: "member1" },
                                            { label: "Team Member 2", val: "member2" },
                                            { label: "Team Member 3", val: "member3" }
                                        ]}
                                    />

                                </div>
                            </div>
                            <RdsButton
                                colorVariant="primary"
                                size="medium"
                                label="Add"
                                isOutline={false}
                                style="outline"
                                class="product-tour-add-button"
                            />
                        </div>

                        <div className="product-tour-form-textarea-container">
                            <RdsTextArea
                                placeholder="Enter Project Description"
                                rows={3}
                            />
                        </div>
                        <div className="product-tour-form-button-right">
                            <RdsButton
                                colorVariant="primary"
                                size="medium"
                                label="Add"
                                isOutline={false}
                                style="outline"
                                class="product-tour-add-button"
                            />
                        </div>

                        {/* File uploader */}
                        <div className="product-tour-file-upload-container compact-mobile-uploader">
                            <RdsFileUploader
                                size="medium"
                                extensions="png, jpg, doc, pdf, ppt"
                                hintText="Maximum 5MB"
                                multiple={false}
                                placeholderImage="man-in-fashion-suit-template-for-web-vector.jpg"
                                showHint
                                showThumbnail
                                showTitle
                                placeholder="No File Chosen"
                                label="Choose File"
                                fileSizeLimitInMb={5}
                                state={FileUploaderState.Default}
                                style={FileUploaderStyle.Basic}
                            />
                        </div>
                        {/* Navigation row */}
                        <div className="product-tour-form-navigation">
                            <div className="product-tour-form-stepcount">{props.stepsIndicator}</div>
                            <div className="product-tour-form-navigation-actions">
                                {props.showTertiaryButton !== false && (
                                    <div className="product-tour-form-skip">Skip</div>
                                )}
                                <div className="product-tour-form-arrows">
                                    {props.showSecondaryButton !== false && (
                                        <button className="product-tour-form-arrow-prev">
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M13 16L8 10L13 4"
                                                    stroke="#7C3AED"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    )}
                                    {props.showPrimaryButton !== false && (
                                        <button className="product-tour-form-arrow-next">
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M7 4L12 10L7 16"
                                                    stroke="#fff"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};
export default RdsProductTour;
