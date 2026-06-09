import React, { useEffect, useState, useRef, useMemo } from "react";
import "./rds-comp-chat.scss";
import RdsAvatar from "../../raaghu-elements/rds-avatar/rds-avatar";
import { SendOutlined as SendIcon, SentimentSatisfiedAltOutlined as EmojiIcon, ChatBubbleOutlineOutlined as ChatIcon, FilterListOutlined as FilterIcon, MoreVertOutlined as MoreIcon, ArrowBackIosNew as ArrowBackIcon } from "@mui/icons-material";
import RdsInput from "../../raaghu-elements/rds-input/rds-input";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import RdsCompEmojiGenerator from "../rds-comp-emoji-generator/rds-comp-emoji-generator";
import Box from "@mui/material/Box";

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
  const { currentUserCommentBgColor = "var(--rds-secondary-main)", currentUserCommentTextColor = "var(--rds-neutral-0)", otherUserCommentBgColor = "var(--rds-neutral-300)", OtherUserCommentTextColor = "var(--rds-text-primary)" } = props;

  const [state, setState] = useState({
    isMobile: window.innerWidth <= 600,
    showChatWindow: false,
    commentText: "",
    showEmojiPicker: false,
    selectedIndex: null as number | null,
    commentList: props.userData[0]?.comments || [],
    showCamera: false,
    activeTab: "chat" as "chat" | "media",
    currentUser: props.userData[0]
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const updateState = (updates: Partial<typeof state>) => setState(prev => ({ ...prev, ...updates }));

  useEffect(() => {
    const handleResize = () => updateState({ isMobile: window.innerWidth <= 600 });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleUserSelect = (index: number) => {
    if (index >= 0 && index < props.userData.length) {
      updateState({
        currentUser: props.userData[index],
        commentList: props.userData[index].comments || [],
        selectedIndex: index,
        showChatWindow: state.isMobile
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
      addComment({ firstName: state.currentUser.firstName, lastName: state.currentUser.lastName, comment: state.commentText });
      updateState({ commentText: "" });
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    updateState({ 
      commentText: state.commentText + emoji,
      showEmojiPicker: false 
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => addComment({ firstName: state.currentUser.firstName, lastName: state.currentUser.lastName, comment: "", image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context?.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      addComment({ firstName: state.currentUser.firstName, lastName: state.currentUser.lastName, comment: "", image: canvasRef.current.toDataURL("image/png") });
      updateState({ showCamera: false });
      const stream = videoRef.current.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    }
  };

  const mediaItems = useMemo(() => {
    const items: { type: "image" | "video"; src: string }[] = [];
    props.userData.forEach(user => user.comments?.forEach(c => {
      if (c.image) items.push({ type: "image", src: c.image });
      if (c.video) items.push({ type: "video", src: c.video });
    }));
    return items;
  }, [props.userData]);

  const showUserList = props.isChatScreenEnabled && (!state.isMobile || !state.showChatWindow);
  const showChat = !props.isChatScreenEnabled || (state.isMobile ? state.showChatWindow : true);
  const avatarProps = { alt: "User Avatar", subText: "Designation", displayStyle: "with-name" as const, title: "Jane Doe", showDesignation: true, activeDotBottom: true, showName: true, src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" };

  return (
    <div className={`rds-comp-chat${state.isMobile ? " rds-comp-chat--mobile" : ""}`}>
      {showUserList && (
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
              <Box key={index} component="div" className={`rds-comp-chat__user-item ${state.selectedIndex === index ? "rds-comp-chat__user-item--selected" : ""}`} sx={{ position: "relative" }} onClick={() => handleUserSelect(index)}>
                <div className="rds-comp-chat__user-item-inner"><RdsAvatar {...avatarProps} /></div>
                <div className="rds-comp-chat__user-time text-muted rds-comp-chat__user-time--absolute">{item.time}</div>
              </Box>
            ))}
          </div>
        </div>
      )}

      {showChat && (
        <div className={`rds-comp-chat__window${!props.isChatScreenEnabled ? " rds-comp-chat__window--full-width" : ""}`}>
          <div className="rds-comp-chat__window-header">
            {state.isMobile && props.isChatScreenEnabled && (
              <button type="button" className="rds-comp-chat__back-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={() => updateState({ showChatWindow: false, selectedIndex: null })} aria-label="Back to user list">
                <ArrowBackIcon fontSize="small" />
              </button>
            )}
            <div className={`rds-comp-chat__window-header-title${state.isMobile ? " rds-comp-chat__window-header-title--mobile" : ""}`}>
              <RdsAvatar {...avatarProps} size={state.isMobile ? "small" : "medium"} />
            </div>
            <div className="rds-comp-chat__window-header-options">
              <nav className={`nav-tabs${state.isMobile ? " nav-tabs--mobile" : ""}`} role="tablist" aria-label="Chat Tabs">
                {["chat", "media"].map(tab => (
                  <button key={tab} type="button" role="tab" aria-selected={state.activeTab === tab} className={`nav-link ${state.activeTab === tab ? "active" : ""}${state.isMobile ? " nav-link--mobile" : ""}`} onClick={() => updateState({ activeTab: tab as "chat" | "media" })}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
              <span className="rds-comp-chat__window-header-more"><MoreIcon /></span>
            </div>
          </div>

          <div className="rds-comp-chat__window-main">
            {state.activeTab === "chat" ? (
              <>
                {state.commentList.map((comment, index) => {
                  const isCurrentUser = comment.firstName === state.currentUser?.firstName && comment.lastName === state.currentUser?.lastName;
                  return (
                    <div key={index} className={`comment-box rds-comp-chat__message ${isCurrentUser ? "rds-comp-chat__message--current-user" : "rds-comp-chat__message--other-user"}`}>
                      <div className={`rds-comp-chat__message-row ${isCurrentUser ? "rds-comp-chat__message-row--reverse" : ""}`}>
                        <Box component="div" className="rds-comp-chat__comment-content" sx={{ backgroundColor: isCurrentUser ? currentUserCommentBgColor : otherUserCommentBgColor, color: isCurrentUser ? currentUserCommentTextColor : OtherUserCommentTextColor }}>
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
                {state.currentUser?.messageStatus && <div className="rds-comp-chat__message-status">{state.currentUser.messageStatus}</div>}
              </>
            ) : (
              <div className="rds-comp-chat__media-grid" role="region" aria-label="Media gallery">
                {mediaItems.length === 0 ? <div className="text-muted">No media available</div> : mediaItems.map((m, i) => (
                  <div className="rds-comp-chat__media-item" key={i}>
                    {m.type === "image" ? <img src={m.src} alt={`media-${i}`} className="rds-comp-chat__comment-image" /> : <video src={m.src} controls className="rds-comp-chat__comment-video" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rds-comp-chat__window-footer">
            {state.showEmojiPicker && (
              <div className="rds-comp-chat__emoji-popup" ref={emojiPickerRef}>
                <RdsCompEmojiGenerator 
                  onEmojiSelect={handleEmojiSelect}
                  maxEmojis={40}
                />
              </div>
            )}
            <div className="rds-comp-chat__footer-left">
              <RdsButton color="primary" changeLeftIcon="add" showLeftIcon layout="icon-only" style="filled" aria-label="Attach file" onClick={() => document.getElementById("fileUpload")?.click()} />
              <input id="fileUpload" className="rds-comp-chat__file-input" type="file" accept="image/*,video/*" aria-label="Upload file" onChange={handleImageUpload} />
              <button type="button" className="rds-comp-chat__emoji-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={() => updateState({ showEmojiPicker: !state.showEmojiPicker })} aria-label="Open emoji picker"><EmojiIcon /></button>
            </div>
            <div className="rds-comp-chat__footer-center">
              <div className="rds-comp-chat__input-send">
                <div className="rds-comp-chat__input-wrapper">
                  <RdsInput className="rds-comp-chat__rds-input" layout="text" placeholder="Type comment..." size="small" value={state.commentText} onChange={(e) => updateState({ commentText: e.target.value })} onKeyDown={(e: React.KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAddComment(); } }} />
                  <button type="button" className="rds-comp-chat__send-icon" onClick={handleAddComment} aria-label="Send"><SendIcon /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {state.showCamera && (
        <div className="rds-comp-chat__camera-modal">
          <video ref={videoRef} className="rds-comp-chat__video-feed" />
          <button onClick={capturePhoto}>Capture Photo</button>
          <button onClick={() => { updateState({ showCamera: false }); const stream = videoRef.current?.srcObject as MediaStream; stream?.getTracks().forEach(track => track.stop()); }}>Close</button>
          <canvas ref={canvasRef} className="rds-comp-chat__canvas-hidden" />
        </div>
      )}
    </div>
  );
};

RdsCompChat.displayName = "RdsCompChat";
export default RdsCompChat;
