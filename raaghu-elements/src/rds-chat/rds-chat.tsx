import React from 'react';
import { useEffect, useState, useRef } from 'react';
import RdsIcon from '../rds-icon';
import RdsInput from '../rds-input';
import RdsNavtabs from '../rds-navtabs';
import RdsFabMenu from '../rds-fab-menu';
import RdsAvatar from '../rds-avatar';
import Picker from 'emoji-picker-react';
import './rds-chat.css';
import { AvatarSize } from '../rds-avatar/rds-avatar';

export interface Comment {
    firstName: string;
    lastName: string;
    comment: string;
    image?: string;
    video?: string;
}

export interface UserData {
    firstName: string;
    lastName: string;
    activeDotButton: boolean;
    status: string;
    size: string;
    colorVariant: string;
    time: string;
    profilePic: string;
    messageStatus: string;
    comments: Comment[];
    profileType?: string;
    withProfilePic?: boolean;
    style?: string;
}

export interface RdsChatProps {
    isChatScreenEnabled: boolean;
    userData: UserData[];
    handleAddComment: (comment: Comment) => void;
    currentUserCommentBgColor?: string;
    currentUserCommentTextColor?: string;
    otherUserCommentBgColor?: string;
    OtherUserCommentTextColor?: string;
}

const RdsChat = (props: RdsChatProps) => {
    const {
        currentUserCommentBgColor = '#7825E9',
        currentUserCommentTextColor = 'FEF7FF',
        otherUserCommentBgColor = '#D6D6D6',
        OtherUserCommentTextColor = '#202020',
    } = props;
    const [isChatScreenEnabled, setIsChatScreenEnabled] = React.useState(props.isChatScreenEnabled);
    const [commentText, setCommentText] = useState<string>('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [userData, setUserData] = useState<any>(props.userData);
    const [currentUser, setCurrentUser] = useState<any>(props.userData[0]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [commentList, setCommentList] = useState<Comment[]>(props.userData[0].comments || []);
    const [showCamera, setShowCamera] = useState(false);
    const [showVideoRecorder, setShowVideoRecorder] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const emojiButtonRef = useRef<HTMLSpanElement>(null);
    const emojiPickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsChatScreenEnabled(props.isChatScreenEnabled);
    }, [props.isChatScreenEnabled]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const pickerElement = emojiPickerRef.current;
            if (pickerElement && !pickerElement.contains(event.target as Node)) {
                setShowEmojiPicker(false);
            }
        };

        if (showEmojiPicker) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showEmojiPicker]);

    useEffect(() => {
        if (showEmojiPicker && emojiButtonRef.current && emojiPickerRef.current) {
            const buttonRect = emojiButtonRef.current.getBoundingClientRect();
            emojiPickerRef.current.style.bottom = `${window.innerHeight - buttonRect.top + 10}px`;
            emojiPickerRef.current.style.left = `${buttonRect.left}px`;
            emojiPickerRef.current.style.visibility = 'visible'; // Show the emoji picker after positioning
        }
    }, [showEmojiPicker]);

    const onEmojiClick = (emojiObject: any, event: any) => {
        setCommentText(prevText => prevText + emojiObject.emoji); // Append the selected emoji
        setShowEmojiPicker(false); // Close the emoji picker
    };

    const onUserSelect = (index: any) => {
        if (index >= 0 && index < userData.length) {
            setCurrentUser(userData[index]);
            setCommentList(userData[index].comments || []); // Load the comments for the selected user
            setSelectedIndex(index);
        } else {
            console.log('Invalid index');
        }
    }

    const handleAddComment = () => {
        if (commentText.trim() === '') return;

        const newComment: Comment = {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            comment: commentText, // Emoji and text will be added here
        };

        setCommentList([...commentList, newComment]);
        setCommentText(''); // Clear input after adding the comment
        if (props.handleAddComment) {
            props.handleAddComment(newComment); // Ensure the callback is defined before invoking
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newComment: Comment = {
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    comment: '',
                    image: reader.result as string,
                };

                setCommentList([...commentList, newComment]);
                if (props.handleAddComment) {
                    props.handleAddComment(newComment); // Ensure the callback is defined before invoking
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCapturePhoto = async () => {
        setShowCamera(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        } catch (error) {
            console.error('Error accessing the camera', error);
        }
    };

    const capturePhoto = () => {
        if (canvasRef.current && videoRef.current) {
            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context?.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

            const imageData = canvasRef.current.toDataURL('image/png');
            const newComment: Comment = {
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                comment: '',
                image: imageData,
            };

            setCommentList([...commentList, newComment]);
            setShowCamera(false);
            const stream = videoRef.current.srcObject as MediaStream;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop()); // Stop the video stream
        }
    };

    const handleRecordVideo = async () => {
        setShowVideoRecorder(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }

            const options = { mimeType: 'video/webm; codecs=vp9' };
            const mediaRecorder = new MediaRecorder(stream, options);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    setRecordedChunks((prev) => [...prev, event.data]);
                }
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing the camera', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            const stream = videoRef.current?.srcObject as MediaStream;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop()); // Stop the video stream
            setIsRecording(false);
        }
    };

    const saveVideo = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(blob);

        const newComment: Comment = {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            comment: '',
            video: videoUrl,
        };

        setCommentList([...commentList, newComment]);
        if (props.handleAddComment) {
            props.handleAddComment(newComment); // Ensure the callback is defined before invoking
        }
        setShowVideoRecorder(false);
        setRecordedChunks([]);
        stopRecording(); // Ensure the video stream is stopped
    };

    const closeVideoRecorder = () => {
        setShowVideoRecorder(false);
        stopRecording(); // Ensure the video stream is stopped
    };
    return (
        <div className='chat-container'>
            {isChatScreenEnabled &&
                <div className='chat-screen'>
                    <div className='chat-screen-header'>
                        <div className='chat-screen-header-title'>Chat</div>
                        <div className='chat-screen-header-icon'>
                            <span style={{ marginRight: '9px' }}><RdsIcon colorVariant="dark" height="16px" isCursorPointer name="filter" stroke width="16px" /></span>
                            <span><RdsIcon colorVariant="dark" height="16px" isCursorPointer name="message_bubble" stroke width="16px" /></span>
                        </div>
                    </div>
                    <div className='chat-screen-main'>
                        {userData.map((item: any, index: any) => {
                            return (
                                <div key={index} className={`d-flex align-items-center justify-content-between my-2 mx-1 p-2 ${selectedIndex === index ? 'selected' : ''}`} onClick={() => onUserSelect(index)}>
                                    <div className="d-flex align-items-center">
                                        <RdsAvatar activeDotBottom={item.activeDotButton} withProfilePic={item.withProfilePic} avtarWithName colorVariant="primary" firstName={item.firstName} lastName={item.lastName} profilePic={item.profilePic} role={item.status} size={AvatarSize.medium} type={item.profileType} style={item.style} />
                                    </div>
                                    <div className="text-muted" style={{ fontSize: '12px' }}>
                                        {item.time}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>}
            <div className={`chat-window ${!isChatScreenEnabled ? 'full-width' : ''}`}>
                <div className='chat-window-header d-md-flex'>
                    <div className="chat-window-header-title d-flex align-items-center">
                        <RdsAvatar activeDotBottom={currentUser.activeDotBottom} withProfilePic={currentUser.withProfilePic} avtarWithName colorVariant="primary" firstName={currentUser.firstName} lastName={currentUser.lastName} profilePic={currentUser.profilePic} role={currentUser.status} size={AvatarSize.medium} type={currentUser.profileType} style={currentUser.style} />
                    </div>
                    <div className='chat-window-header-options justify-content-between'>
                        <span>
                            <RdsNavtabs layout="Horizontal" type='tabs' id='chat' activeNavTabId="chat" navtabsItems={[
                                {
                                    id: 'chat',
                                    label: 'Chat',
                                    tablink: '#nav-chat'
                                },
                                {
                                    id: 'media',
                                    label: 'Media',
                                    tablink: '#nav-media'
                                },
                            ]}
                            />
                        </span>
                        <span><RdsIcon
                            name={"action_button"}
                            fill={false}
                            stroke={true}
                            height="20px"
                            width="20px"
                        ></RdsIcon></span>
                    </div>
                </div>
                <div className='chat-window-main'>
                    {commentList.map((comment, index) => {
                        const isCurrentUser = comment.firstName === currentUser.firstName && comment.lastName === currentUser.lastName;

                        return (
                            <div key={index} className={`comment-box ${isCurrentUser ? 'current-user' : 'other-user'}`}>
                                <div className={`d-flex ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                                    <div
                                        className="comment-content"
                                        style={{
                                            backgroundColor: isCurrentUser ? currentUserCommentBgColor : otherUserCommentBgColor,
                                            color: isCurrentUser ? currentUserCommentTextColor : OtherUserCommentTextColor,
                                        }}
                                    >
                                        <div className="comment-text">
                                            {comment.comment}
                                            {comment.image && <img src={comment.image} alt="uploaded" className="comment-image" />}
                                            {comment.video && <video src={comment.video} controls className="comment-video"></video>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {currentUser.messageStatus && <div className='text-muted float-end me-2'>{currentUser.messageStatus}</div>}
                </div>
                <div className='chat-window-footer'>
                    {showEmojiPicker && (
                        <div className="emoji-popup" ref={emojiPickerRef}>
                            <Picker onEmojiClick={onEmojiClick} />
                        </div>
                    )}
                    <span className="ms-3 me-2 mb-3 mt-2">
                        <RdsFabMenu className='fab-menu-btn'
                            colorVariant="primary"
                            menuIcon='plus'
                            listItems={[
                                {
                                    icon: 'attachment',
                                    iconHeight: '20px',
                                    iconWidth: '20px',
                                    key: 'new',
                                    some: 'value',
                                    value: 'Attach File',
                                    onClick: () => document.getElementById('fileUpload')?.click()
                                },
                                {
                                    icon: 'video',
                                    iconHeight: '20px',
                                    iconWidth: '20px',
                                    key: 'refresh',
                                    some: 'video',
                                    value: 'Record Video',
                                    onClick: handleRecordVideo
                                },
                                {
                                    icon: 'camera',
                                    iconHeight: '20px',
                                    iconWidth: '20px',
                                    key: 'export',
                                    some: 'camera',
                                    value: 'Take Photo',
                                    onClick: handleCapturePhoto
                                }
                            ]}
                        />
                    </span>
                    <span>
                        <input
                            id="fileUpload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                        />
                    </span>
                    <span className="me-2 mb-3 mt-2" ref={emojiButtonRef}>
                        <RdsIcon
                            name="smileys"
                            fill={false}
                            stroke={true}
                            colorVariant="neutral"
                            isCursorPointer={true}
                            // width="30px"
                            height="30px"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        />
                    </span>
                    <span className="w-100 d-flex input-box-chat p-1">
                        <span className="w-100 position-relative" id="password-icon">
                            <RdsInput
                                showTitle={false}
                                value={commentText}
                                inputType="text"
                                placeholder="Type comment..."
                                name="Comment"
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            <span className="position-absolute end-0 top-50 translate-middle-y pe-2 pb-2">
                                <RdsIcon
                                    name="send_email"
                                    fill={false}
                                    stroke={true}
                                    colorVariant="primary"
                                    isCursorPointer={true}
                                    onClick={handleAddComment}
                                />
                            </span>
                        </span>
                    </span>
                </div>
            </div>
            {showCamera && (
                <div className="camera-modal">
                    <video ref={videoRef} className="video-feed"></video>
                    <button onClick={capturePhoto}>Capture Photo</button>
                    <button onClick={() => setShowCamera(false)}>Close</button>
                    <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                </div>
            )}
            {showVideoRecorder && (
                <div className="camera-modal">
                    <video ref={videoRef} className="video-feed"></video>
                    {isRecording ? (
                        <button onClick={stopRecording}>Stop Recording</button>
                    ) : (
                        <button onClick={handleRecordVideo}>Start Recording</button>
                    )}
                    <button onClick={saveVideo}>Save Video</button>
                    <button onClick={closeVideoRecorder}>Close</button>
                </div>
            )}
        </div>
    )
}

export default RdsChat;