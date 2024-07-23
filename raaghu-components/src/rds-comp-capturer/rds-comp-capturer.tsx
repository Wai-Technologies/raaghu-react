import React, { useEffect, useRef, useState } from "react";
import { RdsBadge, RdsButton, RdsIcon, RdsInput, RdsModal, RdsTextArea } from "../rds-elements";
import { useReactMediaRecorder } from "react-media-recorder";
import * as htmlToImage from "html-to-image";
import "./rds-comp-capturer.css";
import { consoleErrors, consoleWarnings, consoleInfo, consoleLog, consoleTrace } from "./console-loggers/console-logger";

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
    email?: string;
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
    const EmailValue = props.email || "";
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
                    const screenshotName = `SCREENSHOT_${screenshots.length + 1}`;
                    const imgData = await getBase64Image(screenshotToAdd);
                    localStorage.setItem(screenshotName, imgData);
                }
            });

            console.log("Console Errors: ", consoleErrors);
            console.log("Console Warnings: ", consoleWarnings);
            console.log("Console Info: ", consoleInfo);
            console.log("Console Log: ", consoleLog);
            console.log("Console Trace: ", consoleTrace);
            
        } catch (error) {
            console.error("Error capturing screenshot:", error);
        } finally {
            // setIsSelecting(false);
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
                    const videoName = `VIDEO_${videos.length + 1}`;
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
        stopRecording();
        setIsRecording(false);
        handleBlurEffect(false);
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
                setScreenshots([]);
                setVideos([]);
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
        setCapturerData((existingScreenshots) => ({
            ...existingScreenshots,
            screenshots: screenshots,
        }));
    }, [screenshots]);
    
    useEffect(() => {
        // This hook updates capturerData when videos change
        setCapturerData((existingVideos) => ({
            ...existingVideos,
            videos: videos,
        }));
    }, [videos]);

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
                        value={EmailValue}
                        required={true}
                        labelPosition="top"
                        dataTestId="email"
                        readonly={true}
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
                            // icon={ <RdsIcon name="screenshot" /> }
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
                            // icon={ <RdsIcon name="record" /> }
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
                                {/* <RdsIcon classes="seven-px-padding-right" name="upload_data" /> */}
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
                                        <span className="seven-px-padding-left seven-px-padding-right">
                                            {`SCREENSHOT_${index + 1}`}
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
                                        <span className="seven-px-padding-left seven-px-padding-right">
                                            {`VIDEO_${index + 1}`}
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

// Add CSS for responsive video
const styles = `
.blur-controls input:not(.no-blur),
.blur-controls textarea:not(.no-blur),
.blur-controls select:not(.no-blur) {
  filter: blur(5px);
}
.video-responsive {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 ratio */
  height: 0;
  overflow: hidden;
  max-width: 100%;
  background: #000;
  border-radius: 5px;
}
.video-responsive video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.image-video-container {
  background: #fff; /* Default background */
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 4px 7px;
  width: auto;
  transition: background-color 0.3s ease;
}
.image-video-container:hover {
  background-color: #7e2eef;
  cursor: pointer;
  color: #fff;
}
.image-video-container:hover svg,
.image-video-container:hover div svg,
.image-video-container:hover .screenshotDeleteButton svg {
  fill: #fff;
  color: #fff;
  stroke: #fff;
}
`;

document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
