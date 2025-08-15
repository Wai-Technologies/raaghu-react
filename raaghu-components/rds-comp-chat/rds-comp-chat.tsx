import React, { useEffect, useState, useRef } from "react";
import "./rds-comp-chat.scss";
import RdsAvatar from "../../raaghu-elements/rds-avatar/rds-avatar";
import { 
  SendOutlined as SendIcon, 
  SentimentSatisfiedAltOutlined as EmojiIcon,
  ChatBubbleOutlineOutlined as ChatIcon,
  FilterListOutlined as FilterIcon,
  MoreVertOutlined as MoreIcon 
} from "@mui/icons-material";
import RdsInput from "../../raaghu-elements/rds-input/rds-input";
import RdsCompNavtabs from "../rds-comp-navtabs/rds-comp-navtabs";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";

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

export interface RdsCompChatProps {
  isChatScreenEnabled: boolean;
  userData: UserData[];
  handleAddComment: (comment: Comment) => void;
  currentUserCommentBgColor?: string;
  currentUserCommentTextColor?: string;
  otherUserCommentBgColor?: string;
  OtherUserCommentTextColor?: string;
}

const RdsCompChat = (props: RdsCompChatProps) => {
  const {
    currentUserCommentBgColor = "#7825E9",
    currentUserCommentTextColor = "FEF7FF",
    otherUserCommentBgColor = "#D6D6D6",
    OtherUserCommentTextColor = "#202020",
  } = props;

  const [state, setState] = useState({
    commentText: "",
    showEmojiPicker: false,
    selectedIndex: null as number | null,
    commentList: props.userData[0]?.comments || [],
    showCamera: false,
    showVideoRecorder: false,
    isRecording: false,
    recordedChunks: [] as Blob[]
  });

  const [currentUser, setCurrentUser] = useState(props.userData[0]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const emojiButtonRef = useRef<HTMLSpanElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const updateState = (updates: Partial<typeof state>) => 
    setState(prev => ({ ...prev, ...updates }));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        updateState({ showEmojiPicker: false });
      }
    };
    if (state.showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [state.showEmojiPicker]);

  const onUserSelect = (index: number) => {
    if (index >= 0 && index < props.userData.length) {
      setCurrentUser(props.userData[index]);
      updateState({ 
        commentList: props.userData[index].comments || [], 
        selectedIndex: index 
      });
    }
  };

  const addComment = (newComment: Comment) => {
    const updatedComments = [...state.commentList, newComment];
    updateState({ commentList: updatedComments });
    props.handleAddComment?.(newComment);
  };

  const handleAddComment = () => {
    if (state.commentText.trim()) {
      addComment({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        comment: state.commentText,
      });
      updateState({ commentText: "" });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        addComment({
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          comment: "",
          image: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      return stream;
    } catch (error) {
      console.error("Camera error:", error);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
  };

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context?.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      
      addComment({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        comment: "",
        image: canvasRef.current.toDataURL("image/png"),
      });
      updateState({ showCamera: false });
      stopCamera();
    }
  };

  const navTabsItems = [
    { id: "chat", label: "Chat", tablink: "#nav-chat" },
    { id: "media", label: "Media", tablink: "#nav-media" }
  ];

  return (
    <div className="rds-comp-chat">
      {props.isChatScreenEnabled && (
        <div className="rds-comp-chat__screen">
          <div className="rds-comp-chat__screen-header">
            <div className="rds-comp-chat__screen-header-title">Chat</div>
            <div className="rds-comp-chat__screen-header-icon">
              <span style={{ marginRight: "9px" }}><FilterIcon /></span>
              <span><ChatIcon /></span>
            </div>
          </div>
          <div className="rds-comp-chat__screen-main">
            {props.userData.map((item, index) => (
              <div
                key={index}
                className={`d-flex align-items-center justify-content-between my-2 mx-1 p-2 rds-comp-chat__user-item ${
                  state.selectedIndex === index ? "rds-comp-chat__user-item--selected" : ""
                }`}
                onClick={() => onUserSelect(index)}
              >
                <div className="d-flex align-items-center">
                  <RdsAvatar
                    alt="User Avatar"
                    designation="Designation"
                    displayStyle="with-name"
                    name="Jane Doe"
                    showDesignation
                    showName
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  />
                </div>
                <div className="text-muted" style={{ fontSize: "12px" }}>
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className={`rds-comp-chat__window ${!props.isChatScreenEnabled ? "rds-comp-chat__window--full-width" : ""}`}>
        <div className="rds-comp-chat__window-header d-md-flex">
          <div className="rds-comp-chat__window-header-title d-flex align-items-center">
            <RdsAvatar
              alt="User Avatar"
              designation="Designation"
              displayStyle="with-name"
              name="Jane Doe"
              showDesignation
              showName
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            />
          </div>
          <div className="rds-comp-chat__window-header-options justify-content-between">
            <span>
              <RdsCompNavtabs
                layout="Horizontal"
                type="tabs"
                id="chat"
                activeNavTabId="chat"
                navtabsItems={navTabsItems}
              />
            </span>
            <span><MoreIcon /></span>
          </div>
        </div>
        
        <div className="rds-comp-chat__window-main">
          {state.commentList.map((comment, index) => {
            const isCurrentUser = comment.firstName === currentUser.firstName && comment.lastName === currentUser.lastName;
            return (
              <div
                key={index}
                className={`comment-box rds-comp-chat__message ${
                  isCurrentUser ? "rds-comp-chat__message--current-user" : "rds-comp-chat__message--other-user"
                }`}
              >
                <div className={`d-flex ${isCurrentUser ? "flex-row-reverse" : ""}`}>
                  <div
                    className="rds-comp-chat__comment-content"
                    style={{
                      backgroundColor: isCurrentUser ? currentUserCommentBgColor : otherUserCommentBgColor,
                      color: isCurrentUser ? currentUserCommentTextColor : OtherUserCommentTextColor,
                    }}
                  >
                    <div className="comment-text">
                      {comment.comment}
                      {comment.image && <img src={comment.image} alt="uploaded" className="rds-comp-chat__comment-image" />}
                      {comment.video && <video src={comment.video} controls className="rds-comp-chat__comment-video" />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {currentUser.messageStatus && (
            <div className="text-muted float-end me-2">{currentUser.messageStatus}</div>
          )}
        </div>
        
        <div className="rds-comp-chat__window-footer">
          {state.showEmojiPicker && (
            <div className="rds-comp-chat__emoji-popup" ref={emojiPickerRef}>
              {/* <Picker onEmojiClick={onEmojiClick} /> */}
            </div>
          )}
          <span className="me-2 mt-2">
            <RdsButton color="primary" icon="add" layout="icon-only" style="filled" />
          </span>
          <input id="fileUpload" type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
          <span className="me-2 mt-2" ref={emojiButtonRef}>
            <EmojiIcon onClick={() => updateState({ showEmojiPicker: !state.showEmojiPicker })} />
          </span>
          <span className="w-100 d-flex input-box-chat">
            <span className="w-100 position-relative rds-comp-chat__input-send mt-2">
              <RdsInput
                layout="text"
                placeholder="Type comment..."
                showTitle={false}
                size="small"
                onChange={(e) => updateState({ commentText: e.target.value })}
              />
              <span className="position-absolute end-0 top-50 translate-middle-y pe-2 pb-2">
                <SendIcon onClick={handleAddComment} />
              </span>
            </span>
          </span>
        </div>
      </div>
      
      {state.showCamera && (
        <div className="rds-comp-chat__camera-modal">
          <video ref={videoRef} className="rds-comp-chat__video-feed" />
          <button onClick={capturePhoto}>Capture Photo</button>
          <button onClick={() => { updateState({ showCamera: false }); stopCamera(); }}>Close</button>
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      )}
    </div>
  );
};

export default RdsCompChat;
