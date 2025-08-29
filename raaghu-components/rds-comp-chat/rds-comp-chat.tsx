import React, { useEffect, useState, useRef, useMemo } from "react";
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
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import Box from "@mui/material/Box";
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
    currentUserCommentTextColor = "#FEF7FF",
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
  const [activeTab, setActiveTab] = useState<"chat" | "media">("chat");
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

  const mediaItems = useMemo(() => {
    const items: { type: "image" | "video"; src: string; comment?: Comment }[] = [];
    props.userData.forEach(user => {
      user.comments?.forEach(c => {
        if (c.image) items.push({ type: "image", src: c.image, comment: c });
        if (c.video) items.push({ type: "video", src: c.video, comment: c });
      });
    });
    return items;
  }, [props.userData]);

  return (
    <div className="rds-comp-chat">
      {props.isChatScreenEnabled && (
        <div className="rds-comp-chat__screen">
          <div className="rds-comp-chat__screen-header">
            <div className="rds-comp-chat__screen-header-title">Chat</div>
            <div className="rds-comp-chat__screen-header-icon">
              <span className="rds-comp-chat__screen-header-icon-filter"><FilterIcon /></span>
              <span><ChatIcon /></span>
            </div>
          </div>
          <div className="rds-comp-chat__screen-main">
            {props.userData.map((item, index) => (
              <Box
                key={index}
                component="div"
                className={`rds-comp-chat__user-item ${state.selectedIndex === index ? "rds-comp-chat__user-item--selected" : ""}`}
                sx={{ position: "relative" }}
                onClick={() => handleUserSelect(index)}
              >
                <div className="rds-comp-chat__user-item-inner">
                  <RdsAvatar
                    alt="User Avatar"
                    subText="Designation"
                    displayStyle="with-name"
                    title="Jane Doe"
                    showDesignation
                    showName
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  />
                </div>
                <div
                  className="rds-comp-chat__user-time text-muted rds-comp-chat__user-time--absolute"
                >
                  {item.time}
                </div>
              </Box>
            ))}
          </div>
        </div>
      )}
      
      <div className={`rds-comp-chat__window ${!props.isChatScreenEnabled ? "rds-comp-chat__window--full-width" : ""}`}>
        <div className="rds-comp-chat__window-header">
          <div className="rds-comp-chat__window-header-title">
            <RdsAvatar
              alt="User Avatar"
              subText="Designation"
              displayStyle="with-name"
              title="Jane Doe"
              showDesignation
              showName
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            />
          </div>
          <div className="rds-comp-chat__window-header-options">
            <nav className="nav-tabs" role="tablist" aria-label="Chat Tabs">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "chat"}
                className={`nav-link ${activeTab === "chat" ? "active" : ""}`}
                onClick={() => setActiveTab("chat")}
              >
                Chat
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "media"}
                className={`nav-link ${activeTab === "media" ? "active" : ""}`}
                onClick={() => setActiveTab("media")}
              >
                Media
              </button>
            </nav>
            <span className="rds-comp-chat__window-header-more"><MoreIcon /></span>
          </div>
        </div>
        
        <div className="rds-comp-chat__window-main">
          {activeTab === "chat" ? (
            <>
              {state.commentList.map((comment, index) => {
                const isCurrentUser = comment.firstName === currentUser?.firstName && comment.lastName === currentUser?.lastName;
                return (
                  <div key={index} className={`comment-box rds-comp-chat__message ${ isCurrentUser ? "rds-comp-chat__message--current-user" : "rds-comp-chat__message--other-user" }`}>
                    <div className={`rds-comp-chat__message-row ${isCurrentUser ? "rds-comp-chat__message-row--reverse" : ""}`}>
                      <Box
                        component="div"
                        className="rds-comp-chat__comment-content"
                        sx={{
                          backgroundColor: isCurrentUser ? currentUserCommentBgColor : otherUserCommentBgColor,
                          color: isCurrentUser ? currentUserCommentTextColor : OtherUserCommentTextColor,
                        }}
                      >
                        <div className="comment-text">
                          {comment.comment}
                          {comment.image && <img src={comment.image} alt="uploaded" className="rds-comp-chat__comment-image" />}
                          {comment.video && <video src={comment.video} controls className="rds-comp-chat__comment-video" />}
                        </div>
                      </Box>
                    </div>
                  </div>
                );
              })}
              {currentUser?.messageStatus && (
                <div className="rds-comp-chat__message-status">{currentUser.messageStatus}</div>
              )}
            </>
          ) : (
            <div className="rds-comp-chat__media-grid" role="region" aria-label="Media gallery">
              {mediaItems.length === 0 && <div className="text-muted">No media available</div>}
              {mediaItems.map((m, i) => (
                <div className="rds-comp-chat__media-item" key={i}>
                  {m.type === "image" ? (
                    <img src={m.src} alt={`media-${i}`} className="rds-comp-chat__comment-image" />
                  ) : (
                    <video src={m.src} controls className="rds-comp-chat__comment-video" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="rds-comp-chat__window-footer">
          {state.showEmojiPicker && (
            <div className="rds-comp-chat__emoji-popup" ref={emojiPickerRef}>
              {/* <Picker onEmojiClick={onEmojiClick} /> */}
            </div>
          )}

          <div className="rds-comp-chat__footer-left">
            <RdsButton
              color="primary"
              changeLeftIcon="add"
              showLeftIcon
              layout="icon-only"
              style="filled"
              onClick={() => document.getElementById("fileUpload")?.click()}
            />
            <input
              id="fileUpload"
              className="rds-comp-chat__file-input"
              type="file"
              accept="image/*,video/*"
              onChange={handleImageUpload}
            />
            <span className="rds-comp-chat__emoji-btn" ref={emojiButtonRef} onClick={() => updateStateFn({ showEmojiPicker: !state.showEmojiPicker })}>
              <EmojiIcon />
            </span>
          </div>
          <div className="rds-comp-chat__footer-center">
            <div className="rds-comp-chat__input-send">
              <div className="rds-comp-chat__input-wrapper">
                <RdsInput
                  className="rds-comp-chat__rds-input"
                  layout="text"
                  placeholder="Type comment..."
                  size="small"
                  value={state.commentText}
                  onChange={(e) => updateStateFn({ commentText: e.target.value })}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleAddComment();
                    }
                  }}
                />
                <button
                  type="button"
                  className="rds-comp-chat__send-icon"
                  onClick={handleAddComment}
                  aria-label="Send"
                >
                  <SendIcon />
                </button>
              </div>
            </div>
          </div>
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
          <canvas ref={canvasRef} className="rds-comp-chat__canvas-hidden" />
        </div>
      )}
    </div>
  );
};
RdsCompChat.displayName = "RdsCompChat";
export default RdsCompChat;
