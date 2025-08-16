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
import { startCamera, stopCamera, capturePhoto, Comment, updateState, onUserSelect, addComment, handleAddComment as handleAddCommentUtil, handleImageUpload as handleImageUploadUtil } from "./rds-comp-chat-utils";

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
  const emojiButtonRef = useRef<HTMLSpanElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const updateStateFn = updateState(setState);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        updateStateFn({ showEmojiPicker: false });
      }
    };
    if (state.showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [state.showEmojiPicker]);

  const handleUserSelect = (index: number) => {
    onUserSelect(index, props, setCurrentUser, updateStateFn);
  };

  const handleAddComment = () => {
    handleAddCommentUtil(state, currentUser, (comment: Comment) => addComment(comment, state, updateStateFn, props.handleAddComment), updateStateFn);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUploadUtil(event, currentUser, (comment: Comment) => addComment(comment, state, updateStateFn, props.handleAddComment));
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
                onClick={() => handleUserSelect(index)}
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
              <RdsCompNavtabs layout="Horizontal" type="tabs" id="chat" activeNavTabId="chat" navtabsItems={navTabsItems} />
            </span>
            <span><MoreIcon /></span>
          </div>
        </div>
        
        <div className="rds-comp-chat__window-main">
          {state.commentList.map((comment, index) => {
            const isCurrentUser = comment.firstName === currentUser.firstName && comment.lastName === currentUser.lastName;
            return (
              <div key={index} className={`comment-box rds-comp-chat__message ${ isCurrentUser ? "rds-comp-chat__message--current-user" : "rds-comp-chat__message--other-user" }`}
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
            <EmojiIcon onClick={() => updateStateFn({ showEmojiPicker: !state.showEmojiPicker })} />
          </span>
          <span className="w-100 d-flex input-box-chat">
            <span className="w-100 position-relative rds-comp-chat__input-send mt-2">
              <RdsInput layout="text" placeholder="Type comment..." showTitle={false} size="small" onChange={(e) => updateStateFn({ commentText: e.target.value })} />
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
          <button
            onClick={() =>
              capturePhoto(
                canvasRef,
                videoRef,
                (comment: Comment) => addComment(comment, state, updateStateFn, props.handleAddComment),
                currentUser,
                updateStateFn,
                () => stopCamera(videoRef)
              )
            }
          >
            Capture Photo
          </button>
          <button onClick={() => { updateStateFn({ showCamera: false }); stopCamera(videoRef); }}>Close</button>
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
      )}
    </div>
  );
};

export default RdsCompChat;
