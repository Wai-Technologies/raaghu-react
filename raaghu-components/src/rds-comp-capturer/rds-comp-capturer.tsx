import React, { CSSProperties, useState, useEffect } from "react";
import { RdsButton, RdsCheckbox, RdsInput, RdsTextArea } from "../rds-elements";
import raaghuIcon from "./assets/icons/raaghu-icon.png";
import headerBackground from "./assets/icons/header-background.png";
import * as htmlToImage from "html-to-image";
import { consoleErrors } from "../rds-comp-capturer/console-loggers/console-logger";
import { BackIcon, BugIcon, CloseIcon, FeatureRequestIcon, HelpIcon, HomeIcon, InfoIcon, MessagesIcon, NewsIcon, PaperClipIcon, ReleaseUpdatesIcon, ScreenshotIcon, SendMessageIcon, SettingsIcon, UploadIcon, VideoIcon } from "./assets/svg-icons";
import "./rds-comp-capturer.css";
// import "./components/cards.css" ;
// import "./components/footer.css";
import Modal from "react-modal";
declare const InstallTrigger: any;

interface ExtendedCSSProperties extends CSSProperties {
    "--underline-color"?: string;
}

export interface RdsCompCapturerProps {
    username?: string;

    takeScreenshotButtonLabel?: string;
    recordScreenButtonLabel?: string;
    submitButtonLabel?: string;
    uploadButtonLabel?: string;

    email?: string;
    bugTitle?: string;
    description?: string;
    onSaveHandler?: (data: any) => void;
    capturerFields?: any;

    culture?: string;
    timeZone?: string;

    // Backend PermissiomaskData
    isMaskingEnabled?: boolean;
    hasBackendPermissions?: {
        homeLabel: boolean;
        messagesLabel: boolean;
        newsLabel: boolean;
        helpLabel: boolean;
        settingsLabel: boolean;
        reportIssue: boolean;
        featureRequest: boolean;
        sendMessage: boolean;
        releaseUpdates: boolean;
    };
}

export type CaptureBugUploadCreateDto = {
    upload: CaptureBugUploadDto;
    create: CaptureBugCreateDto;
};

export type CaptureBugUploadDto = {
    files?: Array<Blob>;
};

export type CaptureBugCreateDto = {
    bugId?: number;
    email: string;
    title: string;
    description?: string | null;
    captureDateTime?: Date | null;
    consoleError?: string | null;
    isAdvanceMasked?: boolean | null | undefined;
};

function getBase64Image(image: File): Promise<string> {
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

const RdsCompCapturer: React.FC<RdsCompCapturerProps> = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeCard, setActiveCard] = useState<string | null>(null);
    const username = props.username || "David";

    // #region VARIABLES
    const CaptureScreenshotLabel = props.takeScreenshotButtonLabel || "Screenshot";
    const CaptureScreenshotColor = "outline-primary";
    const RecordScreenLabel = props.recordScreenButtonLabel || "Record";
    const RecordScreenColor = "outline-primary";
    const SubmitButtonLabel = props.submitButtonLabel || "Submit";
    const SubmitButtonColor = "primary";
    const UploadButtonLabel = props.uploadButtonLabel || "Upload";
    const UploadButtonColor = "outline-primary";

    const ScreenshotLimit = 3;
    const Culture = props.culture || "en-IN";
    const TimeZone = props.timeZone || "Asia/Kolkata";
    const CopilotVersion = "V1.0.0";
    const VideoLimit = 1;
    const VideoWidth = 7680;
    const VideoHeight = 4320;
    const VideoMimeType = "video/mp4";
    const VideoAudioBitsPerSecond = 128000;
    const VideoVideoBitsPerSecond = 5000000;
    const VideoSizeInMb = 20;
    const VideoMinDuration = 5;
    const VideoMaxDuration = 120;

    const [screenshots, setScreenshots] = useState<File[]>([]);
    const [videos, setVideos] = useState<File[]>([]);
    const [selectedScreenshot, setSelectedScreenshot] = useState<File | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
    const [showSelection, setShowSelection] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [capturerData, setCapturerData] = useState(props.capturerFields);
    const [isMaskingEnabled, setIsMaskingEnabled] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    // const [maskingType, setMaskingType] = useState("none");
    const cardIds = { reportIssue: "reportIssue", featureRequest: "featureRequest", sendMessage: "sendMessage", releaseUpdates: "releaseUpdates" };
    const hasFooterPermission = { homeLabel: true, messagesLabel: false, newsLabel: false, helpLabel: false, settingsLabel: false };
    const hasCardPermission = { reportIssue: true, featureRequest: false, sendMessage: false, releaseUpdates: false };

    const [formData, setFormData] = useState<CaptureBugUploadCreateDto>({
        upload: {
            files: []
        },
        create: {
            bugId: 0,
            email: "",
            title: "",
            description: "",
            captureDateTime: null,
            consoleError: "",
            isAdvanceMasked: null,
        }
    });

    const uploadButtonStyle: ExtendedCSSProperties = {
        color: screenshots.length >= ScreenshotLimit && videos.length >= VideoLimit || props.isMaskingEnabled === true ? "#99a3f8" : "#5567F4",
        "--underline-color": screenshots.length >= ScreenshotLimit && videos.length >= VideoLimit || props.isMaskingEnabled === true ? "#99a3f8" : "#5567F4"
    };

    // const [] = useState<DTO>({
    //     container name
    //     connection string 
    //     Blob Service Endpoint
    //     BLOB SAS Token
    //     Token Start Date
    //     Token Expiry Date
    //     Role
    // });

    useEffect(() => {
        setFormData(props.capturerFields);
    }, [props.capturerFields]);
    // #endregion

    // #region MASKING FUNCTIONS
    const handleMaskingCheck = (e: any) => {
        const isChecked = e.target.checked;
        setIsMaskingEnabled(isChecked);
        // if (isChecked) {
        //     setMaskingType("basic");
        // } else {
        //     setMaskingType("none");
        // }
    };

    // const handleToggleChange = (e: any) => {
    //     setMaskingType((prevType) => {
    //         const newType = prevType === "basic" ? "advanced" : "basic";
    //         return newType;
    //     });
    // };

    // const handleElementSelect = (selectedOptions: any) => {
    // setSelectedElements(selectedOptions.map((option: { value: any; }) => option.value)); IMPORTANT: Uncomment this code if given basic and advance masking options
    // };

    // const options = elements.map(el => (el !== undefined  ? { value: el.tagName, label: el.tagName } : undefined)); IMPORTANT: Uncomment this code if given basic and advance masking options
    // #endregion

    // #region SCREENSHOTS
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
        setIsModalOpen(false);
    };

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

    const handleMouseUp = async () => {
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

    const captureSelectedArea = ({ x, y, width, height }: { x: number; y: number; width: number; height: number }) => {
        try {
            htmlToImage.toPng(document.body, {
                style: {
                    transform: `translate(${-x}px, ${-y}px)`,
                    width: `${document.documentElement.offsetWidth}px`,
                    height: `${document.documentElement.offsetHeight}px`,
                    position: "absolute",
                    filter: `${
                        isMaskingEnabled ? "blur(3px)" : "none"
                        // isMaskingEnabled ? (maskingType === "basic" ? "blur(3px)" : (maskingType === "advanced" ? document.body.classList.add("blur-controls") : "")) : "none" // IMPORTANT: Uncomment this code if given basic and advance masking options
                    }`,
                },
                type: "image/png",
                width,
                height,
                quality: 1,
            }).then(async (screenshotToAdd) => {
                if (screenshotToAdd) {
                    // Convert base64 string to Blob
                    const byteString = atob(screenshotToAdd.split(",")[1]);
                    const mimeString = screenshotToAdd.split(",")[0].split(":")[1].split(";")[0];
                    const ab = new ArrayBuffer(byteString.length);
                    const ia = new Uint8Array(ab);
                    for (let i = 0; i < byteString.length; i++) {
                        ia[i] = byteString.charCodeAt(i);
                    }
                    const blob = new Blob([ab], { type: mimeString });
                    const screenshotName = ScreenshotLimit > 1 ? `SCREENSHOT_${screenshots.length + 1}.png` : "SCREENSHOT.png";
                    const file = new File([blob], screenshotName, { type: mimeString });
                    setScreenshots((existingScreenshots) => [...existingScreenshots, file]);
                    // const screenshotData = await getBase64Image(screenshotToAdd);
                }
                setIsModalOpen(true);
                document.body.classList.remove("blur-controls");
            });
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
    const handleStartRecording = async () => {
        let stream: MediaStream | null = null;
    
        try {
            // Detect Firefox
            const isFirefox = typeof InstallTrigger !== "undefined";
    
            if (!navigator.mediaDevices.getDisplayMedia) {
                throw new Error("getDisplayMedia API is not supported in this browser.");
            }
    
            stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    width: VideoWidth,
                    height: VideoHeight,
                    frameRate: 30
                },
                audio: false
            });
    
            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: VideoMimeType,
                audioBitsPerSecond: VideoAudioBitsPerSecond,
                videoBitsPerSecond: VideoVideoBitsPerSecond,
            });
    
            const chunks: Blob[] = [];
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };
    
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: VideoMimeType });
                const videoName = new File([blob], `${VideoLimit > 1 ? `VIDEO_${videos.length + 1}.mp4` : "VIDEO.mp4"}`, { type: VideoMimeType });
                setVideos((prevVideos) => [...prevVideos, videoName]);
                setIsRecording(false);
    
                // Stop all tracks of the media stream
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
                setIsModalOpen(true);
    
                // Remove masking effect
                document.body.style.filter = "";
                document.body.classList.remove("blur-controls");
            };
    
            mediaRecorder.start();
            setIsRecording(true);
            setIsModalOpen(false);
    
            // Apply masking effect
            isMaskingEnabled ? document.body.style.filter = "blur(3px)" : "none";
            // isMaskingEnabled ? (maskingType === "basic" ? document.body.style.filter = "blur(3px)" : (maskingType === "advanced" ? document.body.classList.add("blur-controls") : "")) : (document.body.style.filter = "", document.body.classList.remove("blur-controls"));

            // Store mediaRecorder instance to stop it later
            setMediaRecorder(mediaRecorder);
            setMediaStream(stream);
    
            // Stop recording after the max duration
            setTimeout(() => {
                handleStopRecording(mediaRecorder);
            }, VideoMaxDuration * 1000);
    
        } catch (error) {
            console.error("Error starting screen recording:", error);
            alert("Screen recording is not supported in this browser. Please use a supported browser like Chrome or Edge.");
    
            // Stop all tracks of the media stream if it exists
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        }
    };
    
    const handleStopRecording = (mediaRecorder: MediaRecorder) => {
        try {
            if (mediaRecorder && mediaRecorder.state !== "inactive") {
                mediaRecorder.stop();
                setIsRecording(false);

                // Stop all tracks of the media stream
                if (mediaStream) {
                    mediaStream.getTracks().forEach(track => track.stop());
                }
            }
        } catch (error) {
            console.error("Error stopping recording:", error);
        } finally {
            document.body.style.filter = "";
            document.body.classList.remove("blur-controls");
        }
        setIsModalOpen(true);
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

    // #region FOOTER Data
    const footerData = [
        { id: "homeLabel", text: "Home", icon: <HomeIcon />, hasPermission: hasFooterPermission.homeLabel },
        { id: "messagesLabel", text: "Messages", icon: <MessagesIcon />, hasPermission: hasFooterPermission.messagesLabel },
        { id: "newsLabel", text: "News", icon: <NewsIcon />, hasPermission: hasFooterPermission.newsLabel },
        { id: "helpLabel", text: "Help", icon: <HelpIcon />, hasPermission: hasFooterPermission.helpLabel },
        { id: "settingsLabel", text: "Settings", icon: <SettingsIcon />, hasPermission: hasFooterPermission.settingsLabel },
    ];

    const colorStyle = {
        defaultColor: "#000",
        clickedColor: "#7e2eef",
        stroke: "#7e2eef",
    };

    const updateLabelStyles = (label: HTMLElement | null, isActive: boolean) => {
        if (label) {
            label.style.color = isActive ? colorStyle.clickedColor : colorStyle.defaultColor;
            const svgElement = label.querySelector("svg");
            if (svgElement) {
                svgElement.style.stroke = isActive ? colorStyle.clickedColor : colorStyle.defaultColor;
            }
        }
    };

    const handleItemClick = (e: any, itemId: string) => {
        const homeLabel = document.getElementById("homeLabel");
        const messagesLabel = document.getElementById("messagesLabel");
        const newsLabel = document.getElementById("newsLabel");
        const helpLabel = document.getElementById("helpLabel");
        const settingsLabel = document.getElementById("settingsLabel");

        updateLabelStyles(homeLabel, itemId === "homeLabel");
        updateLabelStyles(messagesLabel, itemId === "messagesLabel");
        updateLabelStyles(newsLabel, itemId === "newsLabel");
        updateLabelStyles(helpLabel, itemId === "helpLabel");
        updateLabelStyles(settingsLabel, itemId === "settingsLabel");

        e.stopPropagation();
    };

    useEffect(() => {
        if (activeCard === null) {
            const homeLabel = document.getElementById("homeLabel");
            updateLabelStyles(homeLabel, true);
        }
    }, [activeCard]);
    // #endregion

    // #region CARDS DATA
    const formattedDateForCard = new Date().toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric"
    }).replace(/ /g, " ");

    const cardData = [
        {
            id: "reportIssue",
            icon: <BugIcon />,
            title: "Report an issue",
            text: "Found a bug? Let us know.",
            hasPermission: hasCardPermission.reportIssue
        },
        {
            id: "featureRequest",
            icon: <FeatureRequestIcon />,
            title: "Request a feature",
            text: "What features would you like next?",
            hasPermission: hasCardPermission.featureRequest
        },
        {
            id: "sendMessage",
            icon: <SendMessageIcon />,
            title: "Send us a message",
            text: "What can we do for you?",
            hasPermission: hasCardPermission.sendMessage
        },
        {
            id: "releaseUpdates",
            icon: <ReleaseUpdatesIcon />,
            title: "Release updates",
            text: formattedDateForCard,
            hasPermission: hasCardPermission.releaseUpdates
        }
    ];
    const visibleCards = cardData.filter(card => card.hasPermission);
    // #endregion

    // #region COMMON FUNCTION
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).replace(/ /g, " ");
    const formattedDateWithParentheses = `(${formattedDate})`;
    
    const handleCardClick = (id: string) => {
        setActiveCard(id);
    };

    const handleScreenshotOrVideoClick = (e: any, index?: number, video?: File | undefined, screenshot?: File | undefined) => {
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
                // stopRecording();
            }
        };

        // Add event listener
        document.addEventListener("keydown", handleKeyDown);

        // Cleanup function to remove event listener
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setActiveCard(null);
    };

    const handleFormSubmitAndBackButtonClick = (event: any) => {
        event.preventDefault();
        // Handle form submission logic here
        setActiveCard(null);
    };

    // #endregion

    // #region SUBMIT FUNCTIONALITY
    useEffect(() => {
        // This hook updates capturerData when screenshots change
        setCapturerData((existingData: any) => ({
            ...existingData,
            screenshots: screenshots,
            videos: videos,
            consoleErrors: consoleErrors,
            captureDateTime: new Date(),
        }));
        setFormData({
            upload: {
                files: [...screenshots, ...videos]
            },
            create: {
                bugId: 0,
                email: capturerData?.email,
                title: capturerData?.bugTitle,
                description: capturerData?.description,
                captureDateTime: new Date(),
                consoleError: consoleErrors,
                isAdvanceMasked: isMaskingEnabled ? false : null,
                // isAdvanceMasked: isMaskingEnabled 
                //     ? (maskingType === "basic" ? false : (maskingType === "advanced" ? true : null)) 
                //     : null,
            }
        });
    }, [screenshots, videos, consoleErrors]);

    useEffect(() => {
        setCapturerData(props.capturerFields);
        setFormData(props.capturerFields);
    }, [props.capturerFields]);

    const handleDataChanges = (value: any, key: string) => {
        setCapturerData({ ...capturerData, [key]: value });
        setFormData({...capturerData, [key]: value});
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (screenshots.length === 0 && videos.length === 0) {
            alert("Please attach at least a screenshot or a video before submitting the form.");
        } else if (capturerData.bugTitle === "" || capturerData.bugTitle === undefined || capturerData.bugTitle === null) {
            alert("Please enter the issue title before submitting the form.");
        } else if (capturerData.email === "" || capturerData.email === undefined || capturerData.email === null) {
            alert("Please enter your email address before submitting the form.");
        } else {
            // props.onSaveHandler && props.onSaveHandler(capturerData);
            props.onSaveHandler && props.onSaveHandler(formData);
            console.log("Form Data: ", formData);
            console.log("Capturer Data: ", capturerData);
            setCapturerData({
                bugTitle: "",
                email: "",
                description: "",
                screenshots: [],
                videos: [],
            });
            // console.log("Capturer Data: ", capturerData);
            setScreenshots([]);
            setVideos([]);
            setSelectedScreenshot(null);
            setSelectedVideo(null);
        }
    };
    // #endregion

    // #region IMAGE/VIDEO UPLOAD
    const handleImageVideoUpload = (e: any) => {
        try {
            if (e.target.files) {
                const file = e.target.files[0];
                const type = file.type.split("/")[0];
                const fileType = file.type.split("/")[1];

                // // Convert file to Blob
                // const blob = new Blob([file], { type: file.type });

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
                        const screenshotName = ScreenshotLimit > 1 ? `SCREENSHOT_${screenshots.length + 1}.${fileType}` : `SCREENSHOT.${fileType}`;
                        const newFile = new File([file], screenshotName, { type: file.type });
                        setScreenshots((existingScreenshots) => [...existingScreenshots, newFile]);
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
                                const videoName = VideoLimit > 1 ? `VIDEO_${videos.length + 1}.${fileType}` : `VIDEO.${fileType}`;
                                const newFile = new File([file], videoName, { type: file.type });
                                setVideos((existingVideos) => [...existingVideos, newFile]);
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
            // console.log("Console Error", consoleErrors);
        }
    };
    // #endregion

    return (
        <>
            <>
                <RdsInput
                    name="bugTitle"
                    id="bugTitle"
                    placeholder="Login Issue"
                    label="Issue"
                    customClasses="no-blur mb-3"
                    inputType="text"
                    required={true}
                    labelPosition="top"
                    dataTestId="bugTitle"
                    size="medium"
                />
                <div className="mb-3"> {/* Remove this dive once STYLE or CLASS attribute is implemented in RdsTextArea */}
                    <RdsTextArea
                        id="bugDescription"
                        placeholder="I am facing issue regarding..."
                        label="Describe the issue"
                        rows={3}
                        isRequired={false}
                        readonly={false}
                        labelPosition="top"
                        dataTestId="description"
                    />
                </div>
                <RdsInput name="email" id="bugReportersEmail"
                    placeholder="john.doe@gmail.com"
                    label="Email"
                    customClasses="no-blur"
                    inputType="email"
                    required={true}
                    labelPosition="top"
                    dataTestId="email"
                    size="medium"
                    validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                    validationMsg="Please Enter Valid Email Address."
                />
            </>
            <div className="end-0 mbhome position-fixed top-0 top-50" style={{ transform: "rotate(-90deg)" }}>
                <button 
                    type="button" 
                    className="btn btn-primary cursor-pointer" 
                    onClick={handleModalOpen}
                    disabled={isModalOpen || isRecording || isSelecting}
                >
                    Feedback
                </button>
            </div>
            {
                isRecording && (
                    <div className="d-flex position-fixed top-0 end-0 align-items-baseline">
                        <div><div className="blinking-dot" /></div>
                        <div className="px-2"><span className="fade-in">recording</span></div>
                        <RdsButton id="stopRecordingButton" type="button" label="Stop Recording" size="small" colorVariant="danger" onClick={() => mediaRecorder && handleStopRecording(mediaRecorder)} />
                    </div>
                )
            }
            {isModalOpen && (
                <Modal
                    id="modal"
                    isOpen={isModalOpen}
                    onRequestClose={handleModalClose}
                    style={{
                        content: {
                            bottom: "20px",
                            right: "20px",
                            borderRadius: "15px",
                            maxHeight: "calc(100% - 10%)",
                        },
                    }}
                    overlayClassName="overlay"
                    role="dialog"
                    className={"p-0 m-auto shadow-lg position-fixed w-25 h-auto bg-white scrollable-content modal-slide-up"}
                    ariaHideApp={false}
                >
                    <div 
                        id="modalHeader" 
                        className={`modal-header h-25 align-items-baseline justify-content-between d-block ${activeCard === null ? "p-4" : ""}`}
                        style={{ backgroundImage: `url(${headerBackground})`, backgroundSize: "cover", backgroundPosition: "center" }}
                    >
                        { activeCard === null ? (
                            <>
                                <div className="d-flex justify-content-between">
                                    <div className="align-content-center bg-white rounded-circle cursor-pointer" style={{ height: "50px", width: "50px", objectFit: "cover" }} >
                                        <img src={raaghuIcon} alt="raaghu-copilot" style={{ width: "100%" }} className="p-2" /> 
                                    </div>
                                    <div style={{width: "30px", height: "30px", borderRadius: "5px"}} className="align-content-center headerIcon px-2 cursor-pointer" onClick={handleModalClose}>
                                        <CloseIcon stroke="#FFF"/>
                                    </div>
                                </div>
                                <div className="d-block text-white mt-3">
                                    <h3 className="modal-title">Hi {username}</h3>
                                    <h5 className="small mb-0">How can we help you today?</h5>
                                </div>
                            </>
                        ) : (
                            <div className="align-items-center d-flex p-3 text-white" style={{height: `${activeCard === "releaseUpdates" ? "10px" : ""}`}}>
                                <div style={{width: "30px", height: "30px", borderRadius: "5px"}} className="align-content-center headerIcon px-2 cursor-pointer" onClick={handleFormSubmitAndBackButtonClick}>
                                    <BackIcon />
                                </div>
                                <div className="flex-grow-1 mb-0 text-center" style={{fontSize: "unset"}}>
                                    {activeCard === cardIds.reportIssue ? "Report an issue".toUpperCase() : ""}
                                    {activeCard === cardIds.featureRequest ? "Request a feature".toUpperCase() : ""}
                                    {activeCard === cardIds.sendMessage ? "Send us a message".toUpperCase() : ""}
                                    {activeCard === cardIds.releaseUpdates ? (
                                        <>
                                            Raaghu Copilot 
                                            <br />
                                            <div style={{ fontSize: "xx-small" }}>{CopilotVersion} {formattedDateWithParentheses}</div>
                                        </>
                                    ) : ""}
                                </div>
                                <div style={{width: "30px", height: "30px", borderRadius: "5px"}} className="align-content-center headerIcon px-2 cursor-pointer" onClick={handleModalClose}>
                                    <CloseIcon stroke="#FFF"/>
                                </div>
                            </div>
                        )}
                    </div>
                    <div id="modalBody" className="modal-body" style={{ background: "#F5F7FA", height: (activeCard === null && visibleCards.length === 1 ) ? "325px" : (activeCard === null && visibleCards.length > 1 ) || activeCard === cardIds.reportIssue ? "" : activeCard === cardIds.releaseUpdates ? "505px" : "515px"}}>
                        {!activeCard ? (
                            <div className={`${visibleCards.length % 2 !== 0 ? "row d-flex p-4" : "row d-flex p-4"}`}>
                                {
                                    visibleCards.map((card, index) => {
                                        let className = "";

                                        if (visibleCards.length === 2) {
                                            className = "col-12 mb-4";
                                        } else {
                                            if (visibleCards.length % 2 !== 0) {
                                                if (index === visibleCards.length - 1) {
                                                    className = "col-12";
                                                } else {
                                                    className = "col-6 mb-4";
                                                }
                                            } else { 
                                                className = "col-6 mb-4";
                                            }
                                        }

                                        return (
                                            <div className={className} key={card.id}>
                                                <div id={card.id} className={`card w-100 h-auto cursor-pointer ${""}`} onClick={(e: React.MouseEvent<HTMLDivElement>) => handleCardClick(e.currentTarget.id)}>
                                                    <div className="card-body">
                                                        <h6>{card.icon}</h6>
                                                        <p className="card-title small text-truncate mb-1 w-100" title={card.title}>
                                                            <strong style={{fontSize:"16px"}}>{card.title}</strong>
                                                        </p>
                                                        <p className="card-text small text-muted text-truncate w-100" title={card.text}>{card.text}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        ) : (
                            <div className="p-4">
                                {(() => {
                                    switch (activeCard) {
                                    case cardIds.reportIssue:
                                        return (<div className="text-start mb-1">
                                            <RdsInput
                                                name="bugTitle"
                                                id="bugTitle"
                                                placeholder="Login Issue"
                                                label="Issue"
                                                customClasses="no-blur mb-3"
                                                inputType="text"
                                                onChange={(e) => { handleDataChanges(e.target.value, "bugTitle"); }}
                                                value={capturerData?.bugTitle}
                                                required={true}
                                                labelPosition="top"
                                                dataTestId="bugTitle"
                                                size="medium"
                                            />
                                            <div className="mb-3"> {/* Remove this dive once STYLE or CLASS attribute is implemented in RdsTextArea */}
                                                <RdsTextArea
                                                    id="bugDescription"
                                                    placeholder="I am facing issue regarding..."
                                                    label="Describe the issue"
                                                    rows={3}
                                                    isRequired={false}
                                                    readonly={false}
                                                    labelPosition="top"
                                                    value={capturerData?.description}
                                                    dataTestId="description"
                                                    onChange={(e) => handleDataChanges(e.target.value, "description")}
                                                />
                                            </div>
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
                                        </div>);
                                    case cardIds.featureRequest:
                                        return (<div className="text-start mb-1">
                                            <RdsInput
                                                name="featureEmail"
                                                id="featureEmail"
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
                                            <RdsInput
                                                name="featureTitle"
                                                id="featureTitle"
                                                placeholder="Video recording feature"
                                                label="Feature"
                                                customClasses="no-blur"
                                                inputType="text"
                                                onChange={(e) => { handleDataChanges(e.target.value, "featureTitle"); }}
                                                value={capturerData?.featureTitle}
                                                required={true}
                                                labelPosition="top"
                                                dataTestId="featureTitle"
                                                size="medium"
                                            />
                                            <RdsTextArea
                                                id="featureDescription"
                                                placeholder="I would like to have a feature that..."
                                                label="Feature description"
                                                rows={3}
                                                isRequired={false}
                                                readonly={false}
                                                labelPosition="top"
                                                value={capturerData?.featureDescription}
                                                dataTestId="featureDescription"
                                                onChange={(e) => handleDataChanges(e.target.value, "featureDescription")}
                                            />
                                        </div>);
                                    case cardIds.sendMessage:
                                        return (<div className="text-start mb-1">
                                            <RdsInput
                                                name="messageEmail"
                                                id="messageEmail"
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
                                            <RdsInput
                                                name="messageTitle"
                                                id="messageTitle"
                                                placeholder="New feature in the latest update!"
                                                label="Message"
                                                customClasses="no-blur"
                                                inputType="text"
                                                onChange={(e) => { handleDataChanges(e.target.value, "messageTitle"); }}
                                                value={capturerData?.messageTitle}
                                                required={true}
                                                labelPosition="top"
                                                dataTestId="messageTitle"
                                                size="medium"
                                            />
                                            <RdsTextArea
                                                id="messageDescription"
                                                placeholder="I am very pleased with the new feature..."
                                                label="Message description"
                                                rows={3}
                                                isRequired={false}
                                                readonly={false}
                                                labelPosition="top"
                                                value={capturerData?.messageDescription}
                                                dataTestId="messageDescription"
                                                onChange={(e) => handleDataChanges(e.target.value, "messageDescription")}
                                            />
                                        </div>);
                                    case cardIds.releaseUpdates:
                                        return (<></>);
                                    default:
                                        console.log("No card selected");
                                    }
                                })()}
                                {
                                    activeCard === cardIds.reportIssue ? (
                                        <>
                                            <div className="align-items-center justify-content-between d-flex gap-2 mb-3 flex-wrap">
                                                <RdsCheckbox
                                                    id="maskingCheckbox"
                                                    label="Hide Sensitive Data"
                                                    checked={props.isMaskingEnabled === true ? true : isMaskingEnabled}
                                                    onChange={(e) => handleMaskingCheck(e)}
                                                    isDisabled={props.isMaskingEnabled === true ? true : false}
                                                />
                                                <div className="uploadButton">
                                                    <label
                                                        id="imageVideoUploadButton"
                                                        htmlFor="upload"
                                                        className="upload-label cursor-pointer d-flex"
                                                    >
                                                        <PaperClipIcon stroke={`${screenshots.length >= ScreenshotLimit && videos.length >= VideoLimit || props.isMaskingEnabled === true ? "#99a3f8" : "#5567F4"}`} />
                                                        <span 
                                                            className="px-1 upload-text" 
                                                            style={uploadButtonStyle}
                                                        >{UploadButtonLabel}</span>
                                                    </label>
                                                    <input
                                                        id="upload"
                                                        type="file"
                                                        className="d-none"
                                                        accept="image/*,video/*"
                                                        disabled={screenshots.length >= ScreenshotLimit && videos.length >= VideoLimit || props.isMaskingEnabled === true}
                                                        onChange={(e) => { handleImageVideoUpload(e); }}
                                                    />
                                                </div>
                                                {/* {
                                                    //IMPORTANT: Uncomment this code if given basic and advance masking options
                                                    isMaskingEnabled && (
                                                        <>
                                                            <div className="tooltip-container">
                                                                <InfoIcon />
                                                                <div className="tooltip-text">
                                                                    Masking helps to obscure sensitive information.
                                                                    <br />
                                                                    <strong>Basic Masking:</strong> Applies a blur effect to the entire body.
                                                                    <br />
                                                                    <strong>Advanced Masking:</strong> Adds a blur effect to specific elements.
                                                                </div>
                                                            </div>
                                                            <div className="d-flex flex-wrap align-items-center">
                                                                <span className="toggle-label">Basic</span>
                                                                <label className="switch mx-3">
                                                                    <input type="checkbox" checked={maskingType === "advanced"} onChange={handleToggleChange}></input>
                                                                    <span className="slider round"></span>
                                                                </label>
                                                                <span className="toggle-label">Advance</span>
                                                            </div>
                                                        </>
                                                    )
                                                } */}
                                            </div>
                                            {/* {
                                                //IMPORTANT: Uncomment this code if given basic and advance masking options
                                                maskingType === "advanced" && (
                                                    <div className="multiselect mb-3">
                                                        <label>Select elements to mask:</label>
                                                        <Select
                                                            isMulti
                                                            options={options as Array<{ value: string; label: string }>}
                                                            value={options.filter(option => selectedElements.includes(option.value))}
                                                            onChange={handleElementSelect}
                                                            placeholder="Select elements to mask"
                                                            closeMenuOnSelect={false}
                                                        />
                                                    </div>
                                                )
                                            } */}
                                            <div className="button-container">
                                                <div className="button-wrapper">
                                                    <button
                                                        id="captureScreenshotButton"
                                                        type="button"
                                                        data-test-id="captureScreenshotButton"
                                                        onClick={handleCaptureScreenshot}
                                                        disabled={screenshots.length >= ScreenshotLimit || isSelecting}
                                                        className="btn btn-sm btn-outline-primary w-100"
                                                    >
                                                        <ScreenshotIcon />
                                                        <span className="mx-1">{CaptureScreenshotLabel}</span>
                                                    </button>
                                                </div>
                                                <div className="button-wrapper">
                                                    <button
                                                        id="recordScreenButton"
                                                        type="button"
                                                        data-test-id="recordScreenButton"
                                                        onClick={handleStartRecording}
                                                        disabled={videos.length >= VideoLimit || isRecording || status === "acquiring_media"}
                                                        className="btn btn-sm btn-outline-primary w-100"
                                                    >
                                                        <VideoIcon />
                                                        <span className="mx-1">{RecordScreenLabel}</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="d-grid gap-3 mt-3">
                                                {/* <div className={screenshots.length >= ScreenshotLimit && videos.length >= VideoLimit ? "opacity-75 mt-3 button-wrapper" : "opacity-100 mt-3 button-wrapper"}>
                                                    <label
                                                        id="imageVideoUploadButton"
                                                        htmlFor="upload"
                                                        className={`btn btn-medium btn-${UploadButtonColor} w-100`}
                                                    >
                                                        <UploadIcon />
                                                        <span>{UploadButtonLabel}</span>
                                                    </label>
                                                    <input
                                                        id="upload"
                                                        type="file"
                                                        className="d-none"
                                                        accept="image/*,video/*"
                                                        disabled={screenshots.length >= ScreenshotLimit && videos.length >= VideoLimit}
                                                        onChange={(e) => { handleImageVideoUpload(e); }}
                                                    />
                                                </div> */}
                                                <RdsButton
                                                    id="submitButton"
                                                    // icon={ <RdsIcon name="send_or_submit" /> }
                                                    // icon="send_or_submit"
                                                    type="submit"
                                                    label={SubmitButtonLabel}
                                                    class="me-2"
                                                    size="small"
                                                    colorVariant={SubmitButtonColor}
                                                    dataTestId="submitButton"
                                                    onClick={handleSubmit}
                                                />
                                            </div>
                                            <div className={`${screenshots.length >= ScreenshotLimit && videos.length >= VideoLimit ? "text-danger" : ""} small mt-2 d-flex`}>
                                                <InfoIcon stroke={`${screenshots.length >= ScreenshotLimit && videos.length >= VideoLimit ? "#EF3338" : "#646464"}`}/>
                                                <p className="px-1 mb-0">Attach up to {ScreenshotLimit} {screenshots.length > 1 ? "screenshots" : "screenshot"} and {VideoLimit} {videos.length > 1 ? "videos" : "video"}.</p>
                                            </div>
                                            <>
                                                <div className="d-flex flex-wrap align-content-start gap-2 mt-2">
                                                    {screenshots.map((screenshot, index) => (
                                                        <div
                                                            className={`image-video-container screenshot-video-label ${selectedScreenshot === screenshot ? "primary-color" : "screenshot-video-label-border-default-color"} border ${selectedScreenshot === screenshot ? "clicked" : ""}`}
                                                            key={index}
                                                        >
                                                            <div id="screenshotDiv" onClick={(e) => handleScreenshotOrVideoClick(e, index, undefined, screenshot)}>
                                                                <ScreenshotIcon />
                                                                <span className="padding-left padding-right">
                                                                    {ScreenshotLimit > 1 ? `SCREENSHOT_${index + 1}` : "SCREENSHOT"}
                                                                </span>
                                                            </div>
                                                            <span
                                                                id="deleteScreenshot"
                                                                className="screenshotDeleteButton two-px-margin-bottom"
                                                                onClick={() => handleDeleteScreenshot(index)}
                                                            >
                                                                <CloseIcon />
                                                            </span>
                                                        </div>
                                                    ))}
                                                    {videos.map((video, index) => (
                                                        <div
                                                            className={`image-video-container screenshot-video-label ${selectedVideo === video ? "primary-color" : "screenshot-video-label-border-default-color"} border ${selectedVideo === video ? "clicked" : ""}`}
                                                            key={index}
                                                        >
                                                            <div id="videoDiv" onClick={(e) => handleScreenshotOrVideoClick(e, index, video, undefined)}>
                                                                <VideoIcon />
                                                                <span className="padding-left padding-right">
                                                                    {VideoLimit > 1 ? `VIDEO_${index + 1}` : "VIDEO"}
                                                                </span>
                                                            </div>
                                                            <span
                                                                id="deleteVideo"
                                                                className="videoDeleteButton two-px-margin-bottom"
                                                                onClick={() => handleDeleteVideo(index)}
                                                            >
                                                                <CloseIcon />
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                                {
                                                    selectedVideo &&
                                                    <div id="videoArea" className="video-responsive mt-2">
                                                        <video
                                                            controls
                                                            loop
                                                            src={URL.createObjectURL(selectedVideo)}
                                                        />
                                                    </div>
                                                }
                                                {
                                                    selectedScreenshot &&
                                                    <div id="screenshotArea" className="screenshot-responsive mt-2">
                                                        <img
                                                            className="border img-fluid rounded screenshotArea"
                                                            src={URL.createObjectURL(selectedScreenshot)}
                                                        />
                                                    </div>
                                                }
                                            </>
                                        </>
                                    ) : activeCard === cardIds.featureRequest || activeCard === cardIds.sendMessage  ? (
                                        <div className="d-grid mt-7">
                                            <RdsButton
                                                id="submitButton"
                                                // icon={ <RdsIcon name="send_or_submit" /> }
                                                // icon="send_or_submit"
                                                type="submit"
                                                label={SubmitButtonLabel}
                                                class="me-2"
                                                size="small"
                                                colorVariant={SubmitButtonColor}
                                                dataTestId="submitButton"
                                                onClick={handleSubmit}
                                            />
                                        </div>
                                    ) : (<></>)
                                }
                            </div>
                        )}
                        
                    </div>
                    {!activeCard ? (
                        <div id="modalFooter" className="modal-footer d-flex justify-content-evenly w-100 sticky-bottom bg-white p-2">
                            {
                                footerData.map((data, index) => (
                                    data.hasPermission && (
                                        <div
                                            key={data.id}
                                            id={data.id}
                                            onClick={(e) => handleItemClick(e, data.id)}
                                            className="cursor-pointer footer-items"
                                        >
                                            <div className="d-flex justify-content-center mt-2">{data.icon}</div>
                                            <div className="d-flex mt-1 mb-1" style={{ fontSize: "small" }}>{data.text}</div>
                                        </div>
                                    )
                                ))
                            }
                        </div>
                    ) : activeCard === cardIds.reportIssue? (
                        <div className="bottom-0 p-4 pt-0 w-auto smaller" style={{ background: "#F5F7FA", fontSize: "smaller" }}>Still facing challenges? Contact us at <a className="text-primary cursor-pointer" onClick={() => window.location.href = "mailto:support@raaghu.ai"}>support@raaghu.ai</a></div>
                    ) : (<></>)}
                </Modal>
            )}
            {isSelecting && (
                <div onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} className="image-capture-selector">
                    <div style={selectionStyle}></div>
                </div>
            )}
        </>
    );
    // #endregion
};

export default RdsCompCapturer;
