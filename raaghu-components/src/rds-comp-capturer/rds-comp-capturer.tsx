import React, { useEffect, useRef, useState } from "react";
import { RdsBadge, RdsButton, RdsIcon, RdsInput, RdsModal, RdsTextArea } from "../rds-elements";
import { useReactMediaRecorder } from "react-media-recorder";
import html2canvas from "html2canvas";
import { handleError } from "./logger";

export interface RdsCompCaptureCeProps {
    ModalId: any;
    reset?: boolean;
    onCancel?: (event: any) => void;
    onSubmit?: (event: any, email: string, description: string, screenshots: Blob[], videos: Blob[]) => void;
    takeScreenshotButtonLabel?: string;
    recordScreenButtonLabel?: string;
    submitButtonLabel?: string;
    isModal: boolean;
    screenshotLimit?: number;
    videoLimit?: number;
}

// Define a type for the message objects
type ConsoleMessage = {
    type: "error" | "warn" | "log";
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
    const ScreenshotLimit = props.screenshotLimit || 3;
    const VideoLimit = props.videoLimit || 1;

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
        window.addEventListener("error", handleError);
        return () => {
            window.removeEventListener("error", handleError);
        };
    }, [screenshots, videos, handleError]);

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
        handleError;
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
        onStop: async (blobUrl, videoToAdd) => {
            if (videoToAdd && videoToAdd.size > 0 && videoToAdd.size / videoToAdd.type.length > 10 * 1024) {
                const videoName = `Video_${videos.length + 1}`;
                setVideos((existingVideosArray) => [...existingVideosArray, videoToAdd]);
                const videoData = await getBase64Image(videoToAdd);
                localStorage.setItem(videoName, videoData);
            } else {
                alert("Video length should be more than 10 seconds.");
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
        }, 120000);
        if (modalRef.current) {
            modalRef.current.hide();
        }
    };

    const handleStopRecording = () => {
        stopRecording();
        setIsRecording(false);
        handleBlurEffect(false);
        handleError;
    };

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.show();
        }
    }, [screenshots, videos, email, description, handleError]);
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
    // #endregion

    // #region RENDER/JSX MARKUP
    return (
        <>
            <RdsInput
                label="Bug Title"
                placeholder="Login Issue"
                inputType="text"
                onChange={(e) => setBugTitle(e.target.value)}
                value={bugTitle}
                name="bugTitle"
                required={true}
                labelPosition="top"
                dataTestId="bugTitle"
                id=""
                reset={inputReset}
                size="medium"
            />
            <RdsTextArea
                label="Describe the issue"
                placeholder="I am facing bug regarding..."
                isRequired={false}
                readonly={false}
                labelPosition="top"
                value={description}
                dataTestId="description"
                onChange={(e) => setDescription(e.target.value)}
            />
            <RdsModal
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
            >
                <form onSubmit={handleSubmit}>
                    <div className="text-start mb-1">
                        <RdsInput
                            customClasses="no-blur"
                            label="Bug Title"
                            placeholder="Login Issue"
                            inputType="text"
                            onChange={(e) => setBugTitle(e.target.value)}
                            value={bugTitle}
                            name="bugTitle"
                            required={true}
                            labelPosition="top"
                            dataTestId="bugTitle"
                            id=""
                            reset={inputReset}
                            size="medium"
                        />
                        <RdsInput
                            customClasses="no-blur"
                            label="Email"
                            placeholder="john.doe@gmail.com"
                            inputType="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            name="email"
                            required={true}
                            labelPosition="top"
                            dataTestId="email"
                            id=""
                            readonly={true}
                            reset={inputReset}
                            size="medium"
                            validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                            validationMsg="Please Enter Valid Email Address."
                        />
                        <RdsTextArea
                            label="Describe the issue"
                            placeholder="I am facing bug regarding..."
                            isRequired={false}
                            readonly={false}
                            labelPosition="top"
                            value={description}
                            dataTestId="description"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="d-flex justify-content gap-2" style={{ paddingBottom: "15px", marginTop: "15px" }}>
                            <RdsButton
                                id="captureScreenshotBtn"
                                class="me-2"
                                label={CaptureScreenshotLabel}
                                icon="camera"
                                type="button"
                                colorVariant={CaptureScreenshotColor}
                                size="small"
                                databsdismiss="modal"
                                dataTestId="captureScreenshotBtn"
                                onClick={handleCaptureScreenshot}
                                isDisabled={screenshots.length >= ScreenshotLimit || isSelecting}
                            />
                            <RdsButton
                                id="recordScreenBtn"
                                class="me-2"
                                label={RecordScreenLabel}
                                icon="camera-video"
                                type="button"
                                colorVariant={RecordScreenColor}
                                size="small"
                                databsdismiss="modal"
                                dataTestId="recordScreenBtn"
                                onClick={handleStartRecording}
                                isDisabled={videos.length >= VideoLimit || isRecording || status === "acquiring_media"}
                            />
                            {/* <RdsButton
                            id="submitBtn"
                            class="me-2"
                            label={SubmitButtonLabel}
                            icon="bi bi-send"
                            type="submit"
                            colorVariant={SubmitButtonColor}
                            size="small"
                            databsdismiss="modal"
                            dataTestId="submitBtn"
                            onClick={handleSubmit}
                        /> */}
                            {isRecording && (
                                <div>
                                    <RdsButton
                                        label="Stop Recording"
                                        type="button"
                                        colorVariant="danger"
                                        size="small"
                                        onClick={handleStopRecording}
                                    />
                                    {
                                        status && status !== "stopped" && (
                                            <div style={{ marginTop: "15px" }}>
                                                <RdsBadge
                                                    className="badge badge-success"
                                                    label="Recording..."
                                                    size="small"
                                                    badgeType="rectangle"
                                                />
                                            </div>
                                        )
                                    }
                                    {/* {
                                    status && status === "recording" && (
                                        <div>
                                            <p style={{ paddingRight: "7px"}}>Screen Recording Status:
                                                <RdsBadge
                                                    className="badge badge-success"
                                                    label="Recording..."
                                                    size="small"
                                                    badgeType="rectangle"
                                                />
                                            </p>
                                        </div>
                                    )
                                } */}
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
            </RdsModal>

            {isSelecting && (
                <div
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    style={{
                        width: "100%",
                        height: "100%",
                        cursor: "crosshair",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 9999,
                    }}
                >
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
