import { useEffect, useState, useRef, useMemo, useCallback, memo, type ChangeEvent } from "react";
import clsx from 'clsx';
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

interface ChatMessageProps {
  comment: Comment;
  isCurrentUser: boolean;
  currentUserCommentBgColor: string;
  otherUserCommentBgColor: string;
  currentUserCommentTextColor: string;
  otherUserCommentTextColor: string;
}

const ChatMessage = memo(({
  comment,
  isCurrentUser,
  currentUserCommentBgColor,
  otherUserCommentBgColor,
  currentUserCommentTextColor,
  otherUserCommentTextColor
}: ChatMessageProps) => (
  <div className={clsx(
    "comment-box",
    "rds-comp-chat__message",
    isCurrentUser ? "rds-comp-chat__message--current-user" : "rds-comp-chat__message--other-user"
  )}>
    <div className={clsx("rds-comp-chat__message-row", isCurrentUser && "rds-comp-chat__message-row--reverse")}>
      <Box component="div" className="rds-comp-chat__comment-content" sx={{ backgroundColor: isCurrentUser ? currentUserCommentBgColor : otherUserCommentBgColor, color: isCurrentUser ? currentUserCommentTextColor : otherUserCommentTextColor }}>
        <div className="comment-text">
          {comment.comment}
          {comment.image && <img src={comment.image} alt="uploaded" className="rds-comp-chat__comment-image" />}
          {comment.video && (
            <video src={comment.video} controls aria-label="Shared video" className="rds-comp-chat__comment-video">
              <track kind="captions" srcLang="en" label="English captions" />
            </video>
          )}
        </div>
      </Box>
    </div>
  </div>
));
ChatMessage.displayName = "ChatMessage";

const AVATAR_PROPS = { alt: "User Avatar", subText: "Designation", displayStyle: "with-name" as const, title: "Jane Doe", showDesignation: true, activeDotBottom: true, showName: true, src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" };

const RdsCompChat = ({
  isChatScreenEnabled,
  userData,
  handleAddComment: onAddComment,
  currentUserCommentBgColor = "var(--rds-secondary-main)",
  currentUserCommentTextColor = "var(--rds-neutral-0)",
  otherUserCommentBgColor = "var(--rds-neutral-300)",
  OtherUserCommentTextColor = "var(--rds-text-primary)"
}: RdsCompChatProps) => {

  const [state, setState] = useState({
    isMobile: window.innerWidth <= 600,
    isSmallMobile: window.innerWidth <= 320,
    showChatWindow: false,
    commentText: "",
    showEmojiPicker: false,
    selectedIndex: null as number | null,
    commentList: userData[0]?.comments || [],
    showCamera: false,
    activeTab: "chat" as "chat" | "media",
    currentUser: userData[0]
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const updateState = useCallback((updates: Partial<typeof state>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  useEffect(() => {
    const handleResize = () => updateState({
      isMobile: window.innerWidth <= 600,
      isSmallMobile: window.innerWidth <= 320,
    });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateState]);

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
  }, [state.showEmojiPicker, updateState]);

  const handleUserSelect = useCallback((index: number) => {
    if (index >= 0 && index < userData.length) {
      updateState({
        currentUser: userData[index],
        commentList: userData[index].comments || [],
        selectedIndex: index,
        showChatWindow: state.isMobile
      });
    }
  }, [state.isMobile, updateState, userData]);

  const addComment = useCallback((newComment: Comment) => {
    const updatedComments = [...state.commentList, newComment];
    updateState({ commentList: updatedComments });
    onAddComment?.(newComment);
  }, [onAddComment, state.commentList, updateState]);

  const handleAddComment = useCallback(() => {
    if (state.commentText.trim() && state.currentUser) {
      addComment({
        firstName: state.currentUser.firstName,
        lastName: state.currentUser.lastName,
        comment: state.commentText,
      });
      updateState({ commentText: "" });
    }
  }, [addComment, state.commentText, state.currentUser, updateState]);

  const handleEmojiSelect = useCallback((emoji: string) => {
    setState((prev) => ({
      ...prev,
      commentText: prev.commentText + emoji,
      showEmojiPicker: false
    }));
  }, []);

  const handleImageUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file?.type.startsWith("image/") && state.currentUser) {
      const reader = new FileReader();
      reader.onloadend = () =>
        addComment({
          firstName: state.currentUser!.firstName,
          lastName: state.currentUser!.lastName,
          comment: "",
          image: reader.result as string,
        });
      reader.readAsDataURL(file);
    }
  }, [addComment, state.currentUser]);

  const stopVideoStream = useCallback(() => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
  }, []);

  const capturePhoto = useCallback(() => {
    if (canvasRef.current && videoRef.current && state.currentUser) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context?.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      addComment({
        firstName: state.currentUser.firstName,
        lastName: state.currentUser.lastName,
        comment: "",
        image: canvasRef.current.toDataURL("image/png"),
      });
      updateState({ showCamera: false });
      stopVideoStream();
    }
  }, [addComment, state.currentUser, stopVideoStream, updateState]);

  const mediaItems = useMemo(() => {
    const items: { type: "image" | "video"; src: string }[] = [];
    userData.forEach(user => user.comments?.forEach(c => {
      if (c.image) items.push({ type: "image", src: c.image });
      if (c.video) items.push({ type: "video", src: c.video });
    }));
    return items;
  }, [userData]);

  const showUserList = isChatScreenEnabled && (!state.isMobile || !state.showChatWindow);
  const showChat = !isChatScreenEnabled || (state.isMobile ? state.showChatWindow : true);
  const hasCommentText = state.commentText.trim().length > 0;

  return (
    <div className={clsx("rds-comp-chat", state.isMobile && "rds-comp-chat--mobile")}>
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
            {userData.map((item, index) => (
              <Box key={`${item.firstName}-${item.lastName}-${item.time}`} component="div" className={`rds-comp-chat__user-item ${state.selectedIndex === index ? "rds-comp-chat__user-item--selected" : ""}`} sx={{ position: "relative" }} onClick={() => handleUserSelect(index)}>
                <div className="rds-comp-chat__user-item-inner"><RdsAvatar {...AVATAR_PROPS} /></div>
                <div className="rds-comp-chat__user-time text-muted rds-comp-chat__user-time--absolute">{item.time}</div>
              </Box>
            ))}
          </div>
        </div>
      )}

      {showChat && (
        <div className={clsx("rds-comp-chat__window", !isChatScreenEnabled && "rds-comp-chat__window--full-width")}>
          <div className="rds-comp-chat__window-header">
            {state.isMobile && isChatScreenEnabled && (
              <button type="button" className="rds-comp-chat__back-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={() => updateState({ showChatWindow: false, selectedIndex: null })} aria-label="Back to user list">
                <ArrowBackIcon fontSize="small" />
              </button>
            )}
            <div className={clsx("rds-comp-chat__window-header-title", state.isMobile && "rds-comp-chat__window-header-title--mobile")}>
              <RdsAvatar
                {...AVATAR_PROPS}
                size={state.isSmallMobile ? "smallest" : state.isMobile ? "small" : "medium"}
              />
            </div>
            <div className="rds-comp-chat__window-header-options">
              <div
                className={`nav-tabs${state.isMobile ? " nav-tabs--mobile" : ""}`}
                role="tablist"
                aria-label="Chat sections"
              >
                {["chat", "media"].map(tab => (
                  <button key={tab} type="button" role="tab" aria-selected={state.activeTab === tab} className={`nav-link ${state.activeTab === tab ? "active" : ""}${state.isMobile ? " nav-link--mobile" : ""}`} onClick={() => updateState({ activeTab: tab as "chat" | "media" })}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              <span className="rds-comp-chat__window-header-more"><MoreIcon /></span>
            </div>
          </div>

          <div className="rds-comp-chat__window-main">
            {state.activeTab === "chat" ? (
              <>
                {state.commentList.map((comment) => {
                  const isCurrentUser = comment.firstName === state.currentUser?.firstName && comment.lastName === state.currentUser?.lastName;
                  return (
                    <ChatMessage
                      key={`${comment.firstName}-${comment.lastName}-${comment.comment}`}
                      comment={comment}
                      isCurrentUser={isCurrentUser}
                      currentUserCommentBgColor={currentUserCommentBgColor}
                      otherUserCommentBgColor={otherUserCommentBgColor}
                      currentUserCommentTextColor={currentUserCommentTextColor}
                      otherUserCommentTextColor={OtherUserCommentTextColor}
                    />
                  );
                })}
                {state.currentUser?.messageStatus && <div className="rds-comp-chat__message-status">{state.currentUser.messageStatus}</div>}
              </>
            ) : (
              <section className="rds-comp-chat__media-grid" aria-label="Media gallery">
                {mediaItems.length === 0 ? <div className="text-muted">No media available</div> : mediaItems.map((m) => (
                  <div className="rds-comp-chat__media-item" key={m.src}>
                    {m.type === "image" ? <img src={m.src} alt="media" className="rds-comp-chat__comment-image" /> : (
                      <video src={m.src} controls aria-label="Media video" className="rds-comp-chat__comment-video">
                        <track kind="captions" srcLang="en" label="English captions" />
                      </video>
                    )}
                  </div>
                ))}
              </section>
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
                  <RdsInput className="rds-comp-chat__rds-input" layout="text" placeholder="Type comment..." size="small" aria-label="Type comment" value={state.commentText} onChange={(e) => updateState({ commentText: e.target.value })} onKeyDown={(e: KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAddComment(); } }} />
                  <button
                    type="button"
                    className={clsx("rds-comp-chat__send-icon", hasCommentText && "rds-comp-chat__send-icon--active")}
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
      )}

      {state.showCamera && (
        <div className="rds-comp-chat__camera-modal">
          <video ref={videoRef} className="rds-comp-chat__video-feed" aria-label="Camera preview">
            <track kind="captions" srcLang="en" label="English captions" />
          </video>
          <button type="button" onClick={capturePhoto}>Capture Photo</button>
          <button type="button" onClick={() => { updateState({ showCamera: false }); stopVideoStream(); }}>Close</button>
          <canvas ref={canvasRef} className="rds-comp-chat__canvas-hidden" />
        </div>
      )}
    </div>
  );
};

RdsCompChat.displayName = "RdsCompChat";
export default RdsCompChat;
