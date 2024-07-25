import React, { useEffect, useRef, useState } from "react";
import { RdsBadge, RdsButton, RdsIcon, RdsInput, RdsModal, RdsTextArea } from "../rds-elements";
import { useReactMediaRecorder } from "react-media-recorder";
import * as htmlToImage from "html-to-image";
import "./rds-comp-capturer.css";
import { consoleErrors } from "./console-loggers/console-logger";

export interface RdsCompCaptureCeProps {
    // ModalId: any; // Will be needed for modal
    reset?: boolean;
    onCancel?: (event: any) => void;
    onSubmit?: (event: any, email: string, description: string, screenshots: Blob[], videos: Blob[]) => void;
    takeScreenshotButtonLabel?: string;
    recordScreenButtonLabel?: string;
    submitButtonLabel?: string;
    uploadButtonLabel?: string;
    // isModal: boolean; // Will be needed for modal
    screenshotLimit?: number;
    bugTitle?: string;
    description?: string;
    screenshots: Blob[], 
    videos: Blob[];
    isBlur?: boolean;
    onSaveHandler?: (data: any) => void;
    capturerFields?: any; 

    // Video Settings
    videoLimit?: number;
    videoWidth?: number;
    videoHeight?: number;
    videoMimeType?: string;
    videoAudioBitsPerSecond?: number;
    videoVideoBitsPerSecond?: number;
    VideoSizeInMb?: number;
    videoMinDuration?: number;
    videoMaxDuration?: number;
}

function getBase64Image(image: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = function () {
            const base64data = reader.result;
            if (typeof base64data === "string") {
                resolve(base64data);
            } else {
                reject("");
            }
        };
        reader.onerror = function () {
            reject("");
        };
    });
}

const RdsCompCaptureCe: React.FC<RdsCompCaptureCeProps> = (props) => {
    // #region VARIABLES
    const CaptureScreenshotLabel = props.takeScreenshotButtonLabel || "Take screenshot";
    const CaptureScreenshotColor = "outline-primary";
    const RecordScreenLabel = props.recordScreenButtonLabel || "Record screen";
    const RecordScreenColor = "outline-primary";
    const SubmitButtonLabel = props.submitButtonLabel || "Submit";
    const SubmitButtonColor = "outline-primary";
    const UploadButtonLabel = props.uploadButtonLabel || "Upload image/video";
    const UploadButtonColor = "outline-primary";
    const ScreenshotLimit = props.screenshotLimit || 3;
    const IsBlur = props.isBlur || false;

    // Video Settings
    const VideoLimit = props.videoLimit || 1;
    const VideoWidth = props.videoWidth || 7680;
    const VideoHeight = props.videoHeight || 4320;
    const VideoMimeType = props.videoMimeType || "video/webm";
    const VideoAudioBitsPerSecond = props.videoAudioBitsPerSecond || 128000;
    const VideoVideoBitsPerSecond = props.videoVideoBitsPerSecond || 5000000;
    const VideoSizeInMb = props.VideoSizeInMb || 20;
    const VideoMinDuration = props.videoMinDuration || 5;
    const VideoMaxDuration = props.videoMaxDuration || 120;

    const [screenshots, setScreenshots] = useState<Blob[]>([]);
    const [videos, setVideos] = useState<Blob[]>([]);
    const [selectedScreenshot, setSelectedScreenshot] = useState<Blob | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<Blob | null>(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
    const [showSelection, setShowSelection] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [capturerData, setCapturerData] = useState(props.capturerFields);
    const isDisabled = screenshots.length >= ScreenshotLimit && videos.length >= VideoLimit;
    const pointerOpacityClass = isDisabled ? "disabled-state" : "default-state";
    // #endregion

    // #region SCREENSHOTS FUNCTIONS
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsSelecting(true);
        setShowSelection(true);
        setStartPoint({ x: e.clientX, y: e.clientY });
        setEndPoint({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isSelecting) return;
        setEndPoint({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
        setShowSelection(false);
        const bounds = {
            x: Math.min(startPoint.x, endPoint.x),
            y: Math.min(startPoint.y, endPoint.y),
            width: Math.abs(startPoint.x - endPoint.x),
            height: Math.abs(startPoint.y - endPoint.y),
        };
        captureSelectedArea(bounds);
    };

    const selectionStyle = {
        position: "absolute" as const,
        left: `${Math.min(startPoint.x, endPoint.x)}px`,
        top: `${Math.min(startPoint.y, endPoint.y)}px`,
        width: `${Math.abs(startPoint.x - endPoint.x)}px`,
        height: `${Math.abs(startPoint.y - endPoint.y)}px`,
        border: "2px dashed red",
        pointerEvents: "none" as const,
        display: showSelection ? "block" : "none",
    };

    const handleCaptureScreenshot = () => {
        if (screenshots.length >= ScreenshotLimit) return;
        setIsSelecting(true);
    };

    const captureSelectedArea = async ({ x, y, width, height }: { x: number; y: number; width: number; height: number }) => {
        try {
            // Capture screenshot
            await htmlToImage.toBlob(document.body, {
                style: {
                    transform: `translate(${-x}px, ${-y}px)`,
                    width: `${document.documentElement.offsetWidth}px`,
                    height: `${document.documentElement.offsetHeight}px`,
                    position: "absolute",
                },
                type: "image/jpeg",
                width,
                height,
                quality: 1,
            }).then(async (screenshotToAdd) => {
                if (screenshotToAdd) {
                    setScreenshots((existingScreenshots) => [...existingScreenshots, screenshotToAdd]);
                    const screenshotName = ScreenshotLimit > 1 ? `SCREENSHOT_${screenshots.length + 1}` : "SCREENSHOT";
                    const imgData = await getBase64Image(screenshotToAdd);
                    localStorage.setItem(screenshotName, imgData);
                }
            });           
        } catch (error) {
            console.error("Error capturing screenshot:", error);
        } finally {
            // setIsSelecting(false);
            console.log("Console Error", consoleErrors);
        }
    };

    const handleDeleteScreenshot = (index: number) => {
        setScreenshots((prev) => prev.filter((_, i) => i !== index));
        if (screenshots.length > ScreenshotLimit) {
            setSelectedScreenshot(screenshots[screenshots.length - 2]);
        } else {
            setSelectedScreenshot(null);
        }
    };
    // #endregion

    // #region VIDEOS FUNCTIONS
    // eslint-disable-next-line prefer-const
    let { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
        screen: true,
        audio: false,
        video: {
            // Specify the resolution as 720p
            width: VideoWidth,
            height: VideoHeight
        },
        mediaRecorderOptions: {
            mimeType: VideoMimeType,
            audioBitsPerSecond: VideoAudioBitsPerSecond,
            videoBitsPerSecond: VideoVideoBitsPerSecond,
        },
        onStop: async (blobUrl, videoToAdd) => {
            // Validate the video size after recording
            if (videoToAdd && videoToAdd.size > 0) {
                if (videoToAdd.size <= VideoSizeInMb * 1024 * 1024) {
                    const videoName = VideoLimit > 1 ? `VIDEO_${videos.length + 1}` : "VIDEO";
                    setVideos((existingVideosArray) => [...existingVideosArray, videoToAdd]);
                    const videoData = await getBase64Image(videoToAdd);
                    localStorage.setItem(videoName, videoData);
                } else {
                    alert(`Video size should not be more than ${VideoSizeInMb} MB.`);
                }
            } else {
                alert(`Video length should be more than ${VideoMinDuration} seconds.`);
            }
        },
    });

    const handleStartRecording = () => {
        if (videos.length >= VideoLimit) return;
        startRecording();
        setIsRecording(true);
        handleBlurEffect(true);
        setTimeout(() => {
            handleStopRecording();
        }, VideoMaxDuration * 1000);
    };

    const handleStopRecording = () => {
        try {
            stopRecording();
            setIsRecording(false);
            handleBlurEffect(false);
        } catch (error) {
            console.error("Error stopping recording:", error);
        } finally {
            console.log("Console Error", consoleErrors);
        }
    };

    const handleDeleteVideo = (index: number) => {
        setVideos((prev) => prev.filter((_, i) => i !== index));
        if (videos.length > VideoLimit) {
            setSelectedVideo(videos[videos.length - 2]);
        } else {
            setSelectedVideo(null);
        }
    };
    //#endregion

    // #region COMMON FUNCTION
    useEffect(() => {
        if (isSelecting || isRecording) {
            handleBlurEffect(true);
        } else {
            handleBlurEffect(false);
        }
        return () => handleBlurEffect(false); // Clean up on unmount
    }, [isSelecting, isRecording]);

    const handleBlurEffect = (apply: boolean) => {
        if (apply) {
            if (IsBlur) {
                document.body.classList.add("blur-controls");
            }
        } else {
            document.body.classList.remove("blur-controls");
        }
    };

    const handleScreenshotOrVideoClick = (e: any, index?: number, video?: Blob | undefined, screenshot?: Blob | undefined) => {
        // e.stopPropagation();
        if (screenshot) {
            setSelectedScreenshot(screenshot);
            setSelectedVideo(null);
        } else if (video) {
            setSelectedVideo(video);
            setSelectedScreenshot(null);
        }
    };

    // ESCAPE KEY FUNCTIONALITY
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                if (screenshots.length > 0 || videos.length > 0) {
                    setScreenshots([]);
                    setVideos([]);
                }
                setSelectedScreenshot(null);
                setSelectedVideo(null);
                setShowSelection(false);
                setIsRecording(false);
                setIsSelecting(false);
                stopRecording();
            }
        };

        // Add event listener
        document.addEventListener("keydown", handleKeyDown);

        // Cleanup function to remove event listener
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    // #endregion

    // #region SUBMIT FUNCTIONALITY
    useEffect(() => {
        // This hook updates capturerData when screenshots change
        setCapturerData((existingData: any) => ({
            ...existingData,
            screenshots: screenshots,
            videos: videos,
            consoleErrors: consoleErrors,
        }));
    }, [screenshots, videos, consoleErrors]);

    useEffect(() => {
        setCapturerData(props.capturerFields);
    } , [props.capturerFields]);

    const handleDataChanges = (value: any, key: string) => {
        setCapturerData({ ...capturerData, [key]: value });
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(capturerData);
        setCapturerData({
            bugTitle: "",
            email: "",
            description: "",
            screenshots: [],
            videos: [],
        });
        console.log("Capturer Data: ", capturerData);
        // After successful submission, reset screenshots and videos
        setScreenshots([]);
        setVideos([]);
    };
    // #endregion

    // #region IMAGE/VIDEO UPLOAD
    const handleImageVideoUpload = (e: any) => {
        try {
            if (e.target.files) {
                const file = e.target.files[0];
                const type = file.type.split("/")[0];
    
                // Step 2: Check if video limit is reached
                if (type === "video" && videos.length >= VideoLimit) {
                    alert("You have reached your maximum video limit.");
                    e.target.value = ""; // Reset the input value
                    return; // Exit early
                }
    
                // Step 3: Check if screenshot limit is reached
                if (type === "image" && screenshots.length >= ScreenshotLimit) {
                    alert("You have reached your maximum screenshot limit.");
                    e.target.value = ""; // Reset the input value
                    return; // Exit early
                }
    
                // Existing logic for processing the file
                if (type === "image") {
                    if (screenshots.length < ScreenshotLimit) {
                        setScreenshots((existingScreenshots) => [...existingScreenshots, file]);
                    }
                } else if (type === "video") {
                    const video = document.createElement("video");
                    video.preload = "metadata";
                    video.src = URL.createObjectURL(file);
    
                    video.onloadedmetadata = () => {
                        URL.revokeObjectURL(video.src); // Clean up the URL object
    
                        const duration = video.duration;
                        const size = file.size;
                        if (size > VideoSizeInMb * 1024 * 1024) {
                            alert(`Video size should not be more than ${VideoSizeInMb} MB.`);
                            return;
                        } else {
                            if (duration < VideoMinDuration) {
                                alert(`Video is too short. It must be longer than ${VideoMinDuration} seconds.`);
                            } else if (duration > VideoMaxDuration) {
                                alert(`Video is too long. It must be less than ${(VideoMaxDuration * 1000) / 60000} minutes.`);
                            } else if (videos.length < VideoLimit) {
                                // If the video duration is within the limits, add it to the videos array
                                setVideos((prevVideos) => [...prevVideos, file]);
                            }
                        }
                    };
                }
                // Reset the input value
                e.target.value = "";
            }
        } catch (error) {
            console.error("Error uploading image/video:", error);
        } finally {
            console.log("Console Error", consoleErrors);
        }
    };
    // #endregion

    // #region RENDER/JSX MARKUP
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="text-start mb-1">
                    <RdsInput
                        name="bugTitle"
                        id="bugTitle"
                        placeholder="Login Issue"
                        label="Bug Title"
                        customClasses="no-blur"
                        inputType="text"
                        onChange={(e) => { handleDataChanges(e.target.value, "bugTitle"); }}
                        value={capturerData?.bugTitle}
                        required={true}
                        labelPosition="top"
                        dataTestId="bugTitle"
                        size="medium"
                    />
                    <RdsInput name="email" id="bugReportersEmail"
                        placeholder="john.doe@gmail.com"
                        label="Email"
                        customClasses="no-blur"
                        inputType="email"
                        onChange={(e) => { handleDataChanges(e.target.value, "email"); }}
                        value={capturerData?.email}
                        required={true}
                        labelPosition="top"
                        dataTestId="email"
                        size="medium"
                        validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                        validationMsg="Please Enter Valid Email Address."
                    />
                    <RdsTextArea
                        id="bugDescription"
                        placeholder="I am facing issue regarding..."
                        label="Describe the issue"
                        isRequired={false}
                        readonly={false}
                        labelPosition="top"
                        value={capturerData?.description}
                        dataTestId="description"
                        onChange={(e) => handleDataChanges(e.target.value, "description")}
                    />
                    <div className="common-container gap-nine-px ten-px-margin-top">
                        <RdsButton
                            id="captureScreenshotButton"
                            // icon={ <RdsIcon classes="padding-right" name="screenshot" /> }
                            // icon="screenshot"
                            type="button"
                            label={CaptureScreenshotLabel}
                            class="me-2"
                            size="small"
                            colorVariant={CaptureScreenshotColor}
                            databsdismiss="modal"
                            dataTestId="captureScreenshotButton"
                            onClick={handleCaptureScreenshot}
                            isDisabled={screenshots.length >= ScreenshotLimit || isSelecting}
                        />
                        <RdsButton
                            id="recordScreenButton"
                            // icon={ <RdsIcon classes="padding-right" name="record" /> }
                            // icon="record"
                            type="button"
                            label={RecordScreenLabel}
                            class="me-2"
                            size="small"
                            colorVariant={RecordScreenColor}
                            databsdismiss="modal"
                            dataTestId="recordScreenButton"
                            onClick={handleStartRecording}
                            isDisabled={videos.length >= VideoLimit || isRecording || status === "acquiring_media"}
                        />
                        <div>
                            <label
                                id="imageVideoUploadButton"
                                htmlFor="upload"
                                className={`btn btn-sm btn-outline-primary ${pointerOpacityClass}`}
                            >
                                {/* <RdsIcon classes="padding-right" name="upload_data" /> */}
                                {UploadButtonLabel}
                            </label>
                            <input
                                id="upload"
                                type="file"
                                className="display-none"
                                accept="image/*,video/*"
                                disabled={screenshots.length >= ScreenshotLimit && videos.length >= VideoLimit}
                                onChange={(e) => { handleImageVideoUpload(e); }}
                            />
                        </div>
                        <RdsButton
                            id="submitButton"
                            // icon={ <RdsIcon name="send_or_submit" /> }
                            // icon="send_or_submit"
                            type="submit"
                            label={SubmitButtonLabel}
                            class="me-2"
                            size="small"
                            colorVariant={SubmitButtonColor}
                            databsdismiss="modal"
                            dataTestId="submitButton"
                        />
                        {isRecording && (
                            <div>
                                <RdsButton
                                    id="stopRecordingButton"
                                    type="button"
                                    label="Stop Recording"
                                    size="small"
                                    colorVariant="danger"
                                    onClick={handleStopRecording}
                                />
                                {
                                    status && status !== "stopped" && (
                                        <div className="ten-px-margin-top">
                                            <RdsBadge
                                                className="badge badge-success"
                                                label="Recording..."
                                                size="small"
                                                badgeType="rectangle"
                                            />
                                        </div>
                                    )
                                }
                            </div>
                        )}
                    </div>
                    {screenshots.length >= ScreenshotLimit && (
                        <div className="ten-px-margin-top danger-color">
                            Maximum limit for screenshots is {ScreenshotLimit}.
                        </div>
                    )}
                    {videos.length >= VideoLimit && (
                        <div className="ten-px-margin-top danger-color">
                            Maximum limit for videos is {VideoLimit}.
                        </div>
                    )}
                    <div className="mb-2">
                        <div className="d-flex flex-wrap gap-nine-px ten-px-margin-top">
                            {screenshots.map((screenshot, index) => (
                                <div
                                    className={`image-video-container screenshot-video-label ${selectedScreenshot === screenshot ? "primary-color" : "screenshot-video-label-border-default-color"}`}
                                    key={index}
                                >
                                    <div id="screenshotDiv" onClick={(e) => handleScreenshotOrVideoClick(e, index, undefined, screenshot)}>
                                        <svg
                                            width="18"
                                            height="18"
                                            className="one-px-margin-bottom"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M5.57143 1C5.57143 1 4.00385 1.00002 2.42244 1.10353C1.71129 1.15008 1.1503 1.71098 1.10368 2.42213C1 4.00373 1 5.57143 1 5.57143M12.4286 1C12.4286 1 13.9962 1.00002 15.5776 1.10353C16.2887 1.15008 16.8497 1.71098 16.8963 2.42213C17 4.00373 17 5.57143 17 5.57143M12.4286 17C12.4286 17 13.9962 17 15.5776 16.8965C16.2887 16.8499 16.8497 16.289 16.8963 15.5779C17 13.9963 17 12.4286 17 12.4286M5.57143 17C5.57143 17 4.00385 17 2.42244 16.8965C1.71129 16.8499 1.1503 16.289 1.10368 15.5779C1 13.9963 1 12.4286 1 12.4286M6.46975 5.61497C6.0768 5.62941 5.73695 5.64606 5.45013 5.6627C4.76099 5.70267 4.21562 6.22823 4.15623 6.91596C4.10053 7.56118 4.04762 8.42556 4.04762 9.38095C4.04762 10.3363 4.10053 11.2007 4.15623 11.8459C4.21562 12.5337 4.76099 13.0592 5.45013 13.0992C6.23531 13.1448 7.41771 13.1905 9 13.1905C10.5823 13.1905 11.7647 13.1448 12.5499 13.0992C13.239 13.0592 13.7844 12.5337 13.8438 11.8459C13.8995 11.2007 13.9524 10.3363 13.9524 9.38095C13.9524 8.42556 13.8995 7.56118 13.8438 6.91596C13.7844 6.22823 13.239 5.70267 12.5499 5.6627C12.263 5.64606 11.9232 5.62941 11.5302 5.61497L11.1853 4.7616C11.033 4.38495 10.692 4.11859 10.2867 4.09029C9.96286 4.06766 9.52731 4.04762 9 4.04762C8.47269 4.04762 8.03714 4.06766 7.7133 4.09029C7.30804 4.11859 6.96701 4.38495 6.81474 4.7616L6.46975 5.61497ZM7.09524 9C7.09524 9.25014 7.14451 9.49783 7.24023 9.72892C7.33595 9.96002 7.47626 10.17 7.65313 10.3469C7.83 10.5237 8.03998 10.664 8.27108 10.7598C8.50218 10.8555 8.74986 10.9048 9 10.9048C9.25014 10.9048 9.49783 10.8555 9.72892 10.7598C9.96002 10.664 10.17 10.5237 10.3469 10.3469C10.5237 10.17 10.664 9.96002 10.7598 9.72892C10.8555 9.49783 10.9048 9.25014 10.9048 9C10.9048 8.74986 10.8555 8.50218 10.7598 8.27108C10.664 8.03998 10.5237 7.83 10.3469 7.65313C10.17 7.47626 9.96002 7.33595 9.72892 7.24023C9.49783 7.14451 9.25014 7.09524 9 7.09524C8.74986 7.09524 8.50218 7.14451 8.27108 7.24023C8.03998 7.33595 7.83 7.47626 7.65313 7.65313C7.47626 7.83 7.33595 8.03998 7.24023 8.27108C7.14451 8.50218 7.09524 8.74986 7.09524 9Z" stroke="#646464" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className="padding-left padding-right">
                                            {ScreenshotLimit > 1 ? `SCREENSHOT_${index + 1}` : "SCREENSHOT"}
                                        </span>
                                    </div>
                                    <span
                                        id="deleteScreenshot"
                                        className="screenshotDeleteButton two-px-margin-bottom"
                                        onClick={() => handleDeleteScreenshot(index)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-x-sm"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                        </svg>
                                    </span>
                                </div>
                            ))}
                            {videos.map((video, index) => (
                                <div 
                                    className={`image-video-container screenshot-video-label ${selectedVideo === video ? "primary-color" : "screenshot-video-label-border-default-color"}`}
                                    key={index}
                                >
                                    <div id="videoDiv" onClick={(e) => handleScreenshotOrVideoClick(e, index, video, undefined)}>
                                        <svg 
                                            width="18" 
                                            height="18" 
                                            className="one-px-margin-bottom"
                                            viewBox="0 0 18 18" 
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M8.30435 10.0435H1.69565C1.51115 10.0435 1.33421 9.97019 1.20375 9.83973C1.07329 9.70927 1 9.53232 1 9.34783V1.69565C1 1.51115 1.07329 1.33421 1.20375 1.20375C1.33421 1.07329 1.51115 1 1.69565 1H10.7391C10.9236 1 11.1006 1.07329 11.231 1.20375C11.3615 1.33421 11.4348 1.51115 11.4348 1.69565V7.58226M8.65217 13.1739C8.65217 14.1887 9.05528 15.1618 9.77281 15.8794C10.4903 16.5969 11.4635 17 12.4783 17C13.493 17 14.4662 16.5969 15.1837 15.8794C15.9012 15.1618 16.3043 14.1887 16.3043 13.1739C16.3043 12.1592 15.9012 11.186 15.1837 10.4685C14.4662 9.75093 13.493 9.34783 12.4783 9.34783C11.4635 9.34783 10.4903 9.75093 9.77281 10.4685C9.05528 11.186 8.65217 12.1592 8.65217 13.1739ZM10.7391 13.1739C10.7391 13.6352 10.9224 14.0775 11.2485 14.4037C11.5747 14.7298 12.017 14.913 12.4783 14.913C12.9395 14.913 13.3819 14.7298 13.708 14.4037C14.0342 14.0775 14.2174 13.6352 14.2174 13.1739C14.2174 12.7127 14.0342 12.2703 13.708 11.9442C13.3819 11.618 12.9395 11.4348 12.4783 11.4348C12.017 11.4348 11.5747 11.618 11.2485 11.9442C10.9224 12.2703 10.7391 12.7127 10.7391 13.1739ZM17 8.22226C16.9999 8.34079 16.9696 8.45734 16.9118 8.56085C16.8541 8.66436 16.7708 8.7514 16.67 8.8137C16.5691 8.876 16.4541 8.9115 16.3356 8.91683C16.2172 8.92217 16.0994 8.89716 15.9934 8.84417L13.2108 7.45287C13.0952 7.39513 12.9981 7.30638 12.9301 7.19654C12.8622 7.0867 12.8262 6.96011 12.8261 6.83095V4.21252C12.8262 4.08336 12.8622 3.95678 12.9301 3.84694C12.9981 3.7371 13.0952 3.64834 13.2108 3.59061L15.9934 2.1993C16.0994 2.14632 16.2172 2.12131 16.3356 2.12664C16.4541 2.13197 16.5691 2.16747 16.67 2.22978C16.7708 2.29208 16.8541 2.37911 16.9118 2.48262C16.9696 2.58613 16.9999 2.70268 17 2.82121V8.22226Z" stroke="#646464" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className="padding-left padding-right">
                                            { VideoLimit > 1 ? `VIDEO_${index + 1}` : "VIDEO" }
                                        </span>
                                    </div>
                                    <span 
                                        id="deleteVideo" 
                                        className="videoDeleteButton two-px-margin-bottom" 
                                        onClick={() => handleDeleteVideo(index)}
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width="16" 
                                            height="16" 
                                            fill="currentColor" 
                                            className="bi bi-x-sm" 
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                        </svg>
                                    </span>
                                </div>
                            ))}
                        </div>
                        {
                            selectedVideo &&
                            <div id="videoArea" className="video-responsive ten-px-margin-top">
                                <video 
                                    autoPlay 
                                    controls 
                                    loop 
                                    src={URL.createObjectURL(selectedVideo)} 
                                />
                            </div>
                        }
                        {
                            selectedScreenshot &&
                            <div id="screenshotArea">
                                <img 
                                    className="img-fluid rounded screenshotArea ten-px-margin-top" 
                                    src={URL.createObjectURL(selectedScreenshot)} 
                                />
                            </div>
                        }
                    </div>
                </div>
            </form>

            {isSelecting && (
                <div onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} className="image-capture-selector">
                    <div style={selectionStyle}></div>
                </div>
            )}
        </>
    );
    // #endregion
};

export default RdsCompCaptureCe;
