import React, { useEffect, useRef, useState } from "react";
import { RdsButton, RdsInput, RdsModal, RdsTextArea } from "../rds-elements";
import { useReactMediaRecorder } from "react-media-recorder";
import html2canvas from "html2canvas";
import { getConsoleLogs, getNetworkLogs, getErrorLogs } from "./logger";

export interface RdsCompCaptureCeProps {
    ModalId: any;
    reset?: boolean;
    cancelBtnLabel?: string;
    submitBtnLabel?: string;
    cancelBtnColor?: string;
    submitBtnColor?: string;
    onCancel?: (event: any) => void;
    onSubmit?: (event: any, email: string, description: string, screenshots: Blob[], videos: Blob[]) => void;
    captureScreenshotLabel?: string;
    recordScreenLabel?: string;
    captureScreenshotColor?: string;
    recordScreenColor?: string;
}

const RdsCompCaptureCe: React.FC<RdsCompCaptureCeProps> = (props) => {
    // #region VARIABLES
    const CaptureScreenshotLabel = props.captureScreenshotLabel || "Mark the bug";
    const CaptureScreenshotColor = props.captureScreenshotColor || "outline-primary";
    const RecordScreenLabel = props.recordScreenLabel || "Record screen";
    const RecordScreenColor = props.recordScreenColor || "outline-primary";

    const [email, setEmail] = useState("");
    // const [imageOrVideo, setImageOrVideo] = useState("");
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
    // #endregion

    // #region SCREENSHOTS FUNCTIONS
    useEffect(() => {
        setInputReset((prevReset) => !prevReset);
    }, [props.reset]);

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
        if (screenshots.length >= 3) return;
        if (modalRef.current) {
            modalRef.current.hide();
        }
        setIsSelecting(true);
        // console.log("Netwrok Logs", getNetworkLogs());
        // console.log("Console Logs", getConsoleLogs());
        // console.log("Error Logs", getErrorLogs());
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
        });
    };

    const handleDeleteScreenshot = (index: number) => {
        setScreenshots((prev) => prev.filter((_, i) => i !== index));
        if (screenshots.length > 1) {
            setSelectedScreenshot(screenshots[screenshots.length - 2]);
        } else {
            setSelectedScreenshot(null);
        }
    };
    // #endregion

    // #region VIDEOS FUNCTIONS
    const handleDeleteVideo = (index: number) => {
        setVideos((prev) => prev.filter((_, i) => i !== index));
        if (videos.length > 1) {
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
            const videoName = `Video_${videos.length + 1}`;
            setVideos((existingVideosArray) => [...existingVideosArray, videoToAdd]);
            const videoData = await getBase64Image(videoToAdd);
            localStorage.setItem(videoName, videoData);
        },
    });

    const handleStartRecording = () => {
        if (videos.length >= 2) return;
        startRecording();
        setIsRecording(true);
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
    };

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.show();
        }
    }, [screenshots, videos, getConsoleLogs(), getNetworkLogs(), getErrorLogs()]);
    //#endregion

    // #region COMMON FUNCTION
    const handleSubmit = (event: any) => {
        event.preventDefault();
        props.onSubmit && props.onSubmit(event, email, description, screenshots, videos);
        setEmail("");
        setDescription("");
        setScreenshots([]);
        setVideos([]);
        if (modalRef.current) {
            modalRef.current.hide();
        }
    };

    const handleScreenshotOrVideoClick = (e: any, index?: number, video?: Blob | undefined, screenshot?: Blob | undefined) => {
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
            <div>
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
                                reset={inputReset}
                                size="medium"
                                validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                                validationMsg="Please Enter Valid Email Address."
                            />
                            <RdsTextArea
                                label="Description"
                                placeholder="Enter Description"
                                isRequired={true}
                                readonly={false}
                                labelPosition="top"
                                value={description}
                                dataTestId="description"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <div className="d-flex justify-content gap-2" style={{ paddingBottom: "15px" }}>
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
                                    isDisabled={screenshots.length >= 3}
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
                                    isDisabled={videos.length >= 2}
                                />
                            </div>
                            {screenshots.length >= 3 && (
                                <div style={{ color: "red", marginBottom: "10px" }}>
                                    Maximum limit for screenshots is 3.
                                </div>
                            )}
                            {videos.length >= 2 && (
                                <div style={{ color: "red", marginBottom: "10px" }}>
                                    Maximum limit for videos is 2.
                                </div>
                            )}
                            <div className="mb-1">
                                <div className="d-flex flex-wrap gap-3">
                                    {screenshots.map((screenshot, index) => (
                                        <div key={index} style={{ background: "#f7f7f7", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center", padding: "7px" }}>
                                            <div id="screenshotDiv" onClick={(e) => handleScreenshotOrVideoClick(e, index, undefined, screenshot)}>
                                                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingRight: "7px" }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                                                        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                                                        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                                                    </svg>
                                                </span>
                                                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingRight: "7px" }}>{`Screenshot_${index + 1}`}</span>
                                            </div>
                                            <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <button id="deleteScreenshot" type="button" className="btn-close btn-danger" style={{ width: "7px", height: "7px" }} onClick={() => handleDeleteScreenshot(index)} />
                                            </span>
                                        </div>
                                    ))}
                                    {videos.map((video, index) => (
                                        <div key={index} style={{ background: "#f7f7f7", borderRadius: "5px", display: "flex", alignItems: "center", justifyContent: "center", padding: "7px" }}>
                                            <div id="videoDiv" onClick={(e) => handleScreenshotOrVideoClick(e, index, video, undefined)}>
                                                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingRight: "7px" }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-video" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z" />
                                                    </svg>
                                                </span>
                                                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingRight: "7px" }}>{`Video_${index + 1}`}</span>
                                            </div>
                                            <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <button id="deleteVideo" type="button" className="btn-close btn-danger" style={{ width: "7px", height: "7px" }} onClick={() => handleDeleteVideo(index)} />
                                            </span>
                                        </div>
                                    ))}
                                    {
                                        selectedVideo &&
                                        <div id="videoArea" className="mb-1">
                                            <video src={URL.createObjectURL(selectedVideo)} autoPlay controls loop width="465px"></video>
                                        </div>
                                    }
                                    {
                                        selectedScreenshot  &&
                                        <div id="screenshotArea" className="mb-1">
                                            <img src={URL.createObjectURL(selectedScreenshot)} style={{ width: "465px", height: "247.03px", background: "black" }} ></img>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </form>
                </RdsModal>
            </div>

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
