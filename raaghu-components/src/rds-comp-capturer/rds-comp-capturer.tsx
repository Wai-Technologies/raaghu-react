import React, { useEffect, useRef, useState } from "react";
import { RdsBadge, RdsButton, RdsIcon, RdsInput, RdsModal, RdsTextArea } from "../rds-elements";
import { useReactMediaRecorder } from "react-media-recorder";
import html2canvas from "html2canvas";
// import { handleError } from "./logger";

export interface RdsCompCaptureCeProps {
    ModalId: any;
    reset?: boolean;
    onCancel?: (event: any) => void;
    onSubmit?: (event: any, email: string, description: string, screenshots: Blob[], videos: Blob[]) => void;
    takeScreenshotButtonLabel?: string;
    recordScreenButtonLabel?: string;
    submitButtonLabel?: string;
    uploadButtonLabel?: string;
    isModal: boolean;
    screenshotLimit?: number;
    email?: string;

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

// Define a type for the message objects
type ConsoleMessage = {
    type: "error" | "warn" | "log" | "fetch";
    message: any; // Consider using a more specific type than 'any' if possible
};

// Create a global array to store all console messages
const consoleMessages: ConsoleMessage[] = [];

// Override console.error
const originalConsoleError = console.error;
console.error = function (...args) {
    consoleMessages.push({ type: "error", message: args });
    originalConsoleError.apply(console, args);
};

// Override console.warn
const originalConsoleWarn = console.warn;
console.warn = function (...args) {
    consoleMessages.push({ type: "warn", message: args });
    originalConsoleWarn.apply(console, args);
};

const originalFetchLog = window.fetch;
window.fetch = async (...args) => {
    try {
        const response = await originalFetchLog(...args);
        // Log successful fetch call
        consoleMessages.push({ type: "log", message: `Fetch successful: ${args[0]}` });
        return response;
    } catch (error) {
        // Log fetch error
        consoleMessages.push({ type: "error", message: `Fetch error: ${args[0]}, Error: ${error}` });
        throw error;
    }
};

// Override console.log
const originalConsoleLog = console.log;
console.log = function (...args) {
    consoleMessages.push({ type: "log", message: args });
    originalConsoleLog.apply(console, args);
};

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

    // Video Settings
    const VideoLimit = props.videoLimit || 1;
    const VideoWidth = props.videoWidth || 7680;
    const VideoHeight = props.videoHeight || 4320;
    const VideoMimeType = props.videoMimeType || "video/mp4";
    const VideoAudioBitsPerSecond = props.videoAudioBitsPerSecond || 128000;
    const VideoVideoBitsPerSecond = props.videoVideoBitsPerSecond || 5000000;
    const VideoSizeInMb = props.VideoSizeInMb || 20;
    const VideoMinDuration = props.videoMinDuration || 5;
    const VideoMaxDuration = props.videoMaxDuration || 120;

    const [email, setEmail] = useState("");
    const [bugTitle, setBugTitle] = useState("");
    const [inputReset, setInputReset] = useState(false);
    const [description, setDescription] = useState("");
    const [screenshots, setScreenshots] = useState<Blob[]>([]);
    const [videos, setVideos] = useState<Blob[]>([]);
    const [selectedScreenshot, setSelectedScreenshot] = useState<Blob | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<Blob | null>(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
    const [showSelection, setShowSelection] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const modalRef = useRef<any>(null);
    const isItModal = props.isModal;
    // #endregion

    // #region SCREENSHOTS FUNCTIONS
    useEffect(() => {
        setInputReset((prevReset) => !prevReset);
    }, [props.reset]);

    useEffect(() => {
        // debugger;
        window.addEventListener("error", /*handleError*/ originalConsoleError);
        return () => {
            window.removeEventListener("error", /*handleError*/originalConsoleError);
        };
    }, [screenshots, videos, /*handleError*/ originalConsoleError]);

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
        // handleError;
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
        // Log all stored console messages
        consoleMessages.forEach(msg => {
            switch (msg.type) {
            case "error":
                originalConsoleError.apply(console, msg.message);
                break;
            case "warn":
                originalConsoleWarn.apply(console, msg.message);
                break;
            case "log":
                originalConsoleLog.apply(console, msg.message);
                break;
            case "fetch":
                originalFetchLog.apply(console, msg.message);
                break;
            default:
                break;
            }
        }); // This closing bracket was missing
        if (modalRef.current) {
            modalRef.current.hide();
        }
        setIsSelecting(true);
    };

    const captureSelectedArea = ({ x, y, width, height }: { x: number; y: number; width: number; height: number }) => {
        html2canvas(document.body, {
            x,
            y,
            width,
            height,
            scrollX: -window.scrollX,
            scrollY: -window.scrollY,
            windowWidth: document.documentElement.offsetWidth,
            windowHeight: document.documentElement.offsetHeight,
        }).then((canvas) => {
            canvas.toBlob(async (blob) => {
                if (blob) {
                    const screenshotName = `Screenshot_${screenshots.length + 1}`;
                    setScreenshots((prevScreenshots) => [...prevScreenshots, blob]);
                    const imgData = await getBase64Image(blob);
                    localStorage.setItem(screenshotName, imgData);
                    document.getElementById("feedback")?.click();
                }
            });

            // const tempCanvas = document.createElement("canvas");
            // const tempCtx = tempCanvas.getContext("2d");

            // tempCanvas.width = canvas.width;
            // tempCanvas.height = canvas.height;

            // tempCtx.filter = "blur(5px)"; // Apply blur effect
            // tempCtx.drawImage(canvas, 0, 0);

            // tempCanvas.toBlob(async (blob) => {
            //     if (blob) {
            //         const screenshotName = `Screenshot_${screenshots.length + 1}`;
            //         setScreenshots((prevScreenshots) => [...prevScreenshots, blob]);
            //         const imgData = await getBase64Image(blob);
            //         localStorage.setItem(screenshotName, imgData);
            //         document.getElementById("feedback")?.click();
            //     }
            // });
        });
        originalConsoleError;
        originalConsoleWarn;
        originalConsoleLog;
        originalFetchLog;
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
    const handleDeleteVideo = (index: number) => {
        setVideos((prev) => prev.filter((_, i) => i !== index));
        if (videos.length > VideoLimit) {
            setSelectedVideo(videos[videos.length - 2]);
        } else {
            setSelectedVideo(null);
        }
    };

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
                    const videoName = `Video_${videos.length + 1}`;
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
        if (modalRef.current) {
            modalRef.current.hide();
        }
    };

    const handleStopRecording = () => {
        stopRecording();
        setIsRecording(false);
        handleBlurEffect(false);
        // handleError;
        originalConsoleError;
        originalConsoleWarn;
        originalConsoleLog;
        originalFetchLog;
    };

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.show();
        }
        originalConsoleWarn;
        originalConsoleError;
        originalConsoleLog;
        originalFetchLog;
    }, [screenshots, videos, email, description, /*handleError,*/ originalConsoleError, originalConsoleWarn, originalConsoleLog, originalFetchLog]);
    //#endregion

    // #region COMMON FUNCTION
    const handleBlurEffect = (apply: boolean) => {
        if (apply) {
            document.body.classList.add("blur-controls");
        } else {
            document.body.classList.remove("blur-controls");
        }
    };

    useEffect(() => {
        if (isSelecting || isRecording) {
            handleBlurEffect(true); // Apply blur effect
        } else {
            handleBlurEffect(false); // Remove blur effect
        }
        return () => handleBlurEffect(false); // Clean up on unmount
    }, [isSelecting, isRecording]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        props.onSubmit && props.onSubmit(event, email, description, screenshots, videos);
        setBugTitle("");
        setEmail("");
        setDescription("");
        setScreenshots([]);
        setVideos([]);
        if (modalRef.current) {
            modalRef.current.hide();
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
                if (modalRef.current) {
                    modalRef.current.show();
                }
            }
        };

        // Add event listener
        document.addEventListener("keydown", handleKeyDown);

        // Cleanup function to remove event listener
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    function handleImageVideoUpload(e: any) {
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
                    setScreenshots((prevScreenshots) => [...prevScreenshots, file]);
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
                            alert(`Video is too long. It must be less than ${(VideoMaxDuration * 1000) / 60000 } minutes.`);
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
    }

    // TODO: IMPLEMENT ESCAPE AND CANCEL BUTTON FUNCTIONALITY
    // useEffect(() => {
    //     const handleKeyDown = (event: KeyboardEvent) => {
    //         if (event.key === "Escape") {
    //             // Existing screenshot logic
    //             setScreenshots([]);
    //             setSelectedScreenshot(null);
    //             setShowSelection(false);
    //             setIsSelecting(false);
    //             if (modalRef.current) {
    //                 modalRef.current.show();
    //             }
    
    //             // New recording logic
    //             if (isRecording) {
    //                 stopRecording(); // You need to implement this function
    //                 setIsRecording(false); // Assuming you have a state to track recording status
    //             }
    //         }
    //     };
    
    //     // Add event listener for keydown
    //     document.addEventListener("keydown", handleKeyDown);
    
    //     // Cleanup function to remove event listener
    //     return () => {
    //         document.removeEventListener("keydown", handleKeyDown);
    //     };
    // }, [isRecording]); // Add isRecording to the dependency array if it's part of your state
    // #endregion

    // #region RENDER/JSX MARKUP
    return (
        <>
            <RdsInput
                label="SAMPLE INPUT (WILL BE REMOVED)"
                placeholder="SAMPLE INPUT (WILL BE REMOVED)"
                inputType="text"
                onChange={(e) => setBugTitle(e.target.value)}
                value={bugTitle}
                name="bugTitle"
                required={true}
                labelPosition="top"
                dataTestId="sampleInput"
                id=""
                reset={inputReset}
                size="medium"
            />
            <RdsTextArea
                label="SAMPLE TEXTAREA (WILL BE REMOVED)"
                placeholder="SAMPLE TEXTAREA (WILL BE REMOVED)"
                isRequired={false}
                readonly={false}
                labelPosition="top"
                value={description}
                dataTestId="sampleTextArea"
                onChange={(e) => setDescription(e.target.value)}
            />
            {/* <RdsModal
                modalId="feedbackModal"
                modalAnimation="modal fade"
                showModalFooter={true}
                showModalHeader={true}
                scrollable={false}
                verticallyCentered={false}
                modalbutton={
                    <div className="d-flex justify-content gap-2" style={{ paddingBottom: "15px" }}>
                        <RdsButton
                            id="feedback"
                            class="me-2"
                            tooltipTitle=""
                            type="button"
                            label="Feedback"
                            colorVariant="outline-primary"
                            size="small"
                            databsdismiss="modal"
                            dataTestId="feedback"
                            onClick={() => {
                                if (modalRef.current) {
                                    modalRef.current.show();
                                }
                            }}
                        />
                        {isRecording && (
                            <div>
                                <RdsButton
                                    label="Stop Recording"
                                    type="button"
                                    colorVariant="danger"
                                    size="small"
                                    onClick={handleStopRecording}
                                />
                                <p>{status}</p>
                            </div>
                        )}
                    </div>
                }
                modalTitle="Feedback"
                cancelButtonName="CANCEL"
                saveChangesName="SUBMIT"
                modalBackdrop="static"
            > */}
            <form onSubmit={handleSubmit}>
                <div className="text-start mb-1">
                    <RdsInput name="bugTitle" id="bugTitle" placeholder="Login Issue" label="Bug Title" customClasses="no-blur"  inputType="text" onChange={(e) => setBugTitle(e.target.value)} value={bugTitle} required={true} labelPosition="top" dataTestId="bugTitle" reset={inputReset} size="medium" />
                    <RdsInput name="email" id="bugReportersEmail" placeholder="john.doe@gmail.com" label="Email" customClasses="no-blur" inputType="email" onChange={(e) => setEmail(e.target.value)} value={EmailValue} required={true} labelPosition="top" dataTestId="email" readonly={true} reset={inputReset} size="medium" validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i} validationMsg="Please Enter Valid Email Address." />
                    <RdsTextArea id="bugDescription" placeholder="I am facing bug regarding..." label="Describe the issue" isRequired={false} readonly={false} labelPosition="top" value={description} dataTestId="description" onChange={(e) => setDescription(e.target.value)} />
                    <div className="d-flex justify-content gap-2" style={{ paddingBottom: "15px", marginTop: "15px" }}>
                        <RdsButton id="captureScreenshotButton" icon="camera" type="button" label={CaptureScreenshotLabel} class="me-2" size="small" colorVariant={CaptureScreenshotColor} databsdismiss="modal" dataTestId="captureScreenshotButton" onClick={handleCaptureScreenshot} isDisabled={screenshots.length >= ScreenshotLimit || isSelecting} />
                        <RdsButton id="recordScreenButton" icon="camera-video" type="button" label={RecordScreenLabel} class="me-2" size="small" colorVariant={RecordScreenColor} databsdismiss="modal" dataTestId="recordScreenButton" onClick={handleStartRecording} isDisabled={videos.length >= VideoLimit || isRecording || status === "acquiring_media"} />
                        <div>
                            <label id="imageVideoUploadButton" htmlFor="upload" className="btn btn-sm btn-outline-primary" style={{ pointerEvents: (screenshots.length >= ScreenshotLimit && videos.length >= VideoLimit) ? "none" : undefined, opacity: (screenshots.length >= ScreenshotLimit && videos.length >= VideoLimit) ? 0.65 : 1.0 }}>
                                {UploadButtonLabel}
                            </label>
                            <input id="upload" type="file" style={{ display: "none" }} accept="image/*,video/*" disabled={screenshots.length >= ScreenshotLimit && videos.length >= VideoLimit} onChange={(e) => { handleImageVideoUpload(e); }} />
                        </div>
                        {/* <RdsButton id="submitButton" icon="bi bi-send" type="submit" label={SubmitButtonLabel} class="me-2" size="small" colorVariant={SubmitButtonColor} databsdismiss="modal" dataTestId="submitButton" onClick={handleSubmit} /> */}
                        {isRecording && (
                            <div>
                                <RdsButton id="stopRecordingButton" type="button" label="Stop Recording" size="small" colorVariant="danger" onClick={handleStopRecording} />
                                {
                                    status && status !== "stopped" && (
                                        <div style={{ marginTop: "15px" }}>
                                            <RdsBadge className="badge badge-success" label="Recording..." size="small" badgeType="rectangle" />
                                        </div>
                                    )
                                }
                            </div>
                        )}
                    </div>
                    {screenshots.length >= ScreenshotLimit && (
                        <div style={{ color: "red", marginBottom: "10px" }}>
                            Maximum limit for screenshots is {ScreenshotLimit}.
                        </div>
                    )}
                    {videos.length >= VideoLimit && (
                        <div style={{ color: "red", marginBottom: "10px" }}>
                            Maximum limit for videos is {VideoLimit}.
                        </div>
                    )}
                    <div className="mb-2">
                        <div className="d-flex flex-wrap gap-3" style={{ marginBottom: "15px" }}>
                            {screenshots.map((screenshot, index) => (
                                <div key={index} style={{ background: "#fff", borderRadius: "5px", display: "flex", alignItems: "center", padding: "4px", paddingLeft: "7px", paddingRight: "7px", width: "auto", border: selectedScreenshot === screenshot ? "2px solid #7e2eef" : "2px solid #f3e4fd" }}>
                                    <div id="screenshotDiv" onClick={(e) => handleScreenshotOrVideoClick(e, index, undefined, screenshot)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                                            <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                                            <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                                        </svg>
                                        <span style={{ paddingLeft: "7px", paddingRight: "7px"/*, color: selectedScreenshot === screenshot ? "white" : "black"*/ }}>{`Screenshot_${index + 1}`}</span>
                                    </div>
                                    <button id="deleteScreenshot" type="button" className="btn-close btn-danger" style={{ width: "7px", height: "7px" }} onClick={() => handleDeleteScreenshot(index)} />
                                </div>
                            ))}
                            {videos.map((video, index) => (
                                <div key={index} style={{ background: "#fff", borderRadius: "5px", display: "flex", alignItems: "center", padding: "4px", paddingLeft: "7px", paddingRight: "7px", width: "auto", border: selectedVideo === video ? "2px solid #7e2eef" : "2px solid #f3e4fd" }}>
                                    <div id="videoDiv" onClick={(e) => handleScreenshotOrVideoClick(e, index, video, undefined)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-video" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z" />
                                        </svg>
                                        <span style={{ paddingLeft: "7px", paddingRight: "7px"/*, color: selectedVideo === video ? "white" : "black"*/ }}>{`Video_${index + 1}`}</span>
                                    </div>
                                    <button id="deleteVideo" type="button" className="btn-close btn-danger" style={{ width: "7px", height: "7px" }} onClick={() => handleDeleteVideo(index)} />
                                </div>
                            ))}
                        </div>
                        {
                            selectedVideo &&
                            <div id="videoArea" className="video-responsive">
                                <video autoPlay controls loop src={URL.createObjectURL(selectedVideo)}></video>
                            </div>
                        }
                        {
                            selectedScreenshot &&
                            <div id="screenshotArea">
                                <img className="img-fluid rounded" src={URL.createObjectURL(selectedScreenshot)} style={{ background: "black", height: "auto", width: "100%" }}></img>
                            </div>
                        }
                    </div>
                </div>
            </form>
            {/* </RdsModal> */}

            {isSelecting && (
                <div onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} style={{ width: "100%", height: "100%", cursor: "crosshair", position: "absolute", top: 0, left: 0, zIndex: 9999 }}>
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
`;

document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
