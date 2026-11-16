import { useEffect, useState, useRef, useMemo, useCallback, memo, type ChangeEvent, type HTMLAttributes, type Ref } from "react";
import clsx from 'clsx';
import "./rds-comp-chat.scss";
import RdsAvatar from "../../raaghu-elements/rds-avatar/rds-avatar";
import { SendOutlined as SendIcon, SentimentSatisfiedAltOutlined as EmojiIcon, ChatBubbleOutlineOutlined as ChatIcon, FilterListOutlined as FilterIcon, MoreVertOutlined as MoreIcon, ArrowBackIosNew as ArrowBackIcon } from "@mui/icons-material";
import RdsInput from "../../raaghu-elements/rds-input/rds-input";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import RdsCompEmojiGenerator from "../rds-comp-emoji-generator/rds-comp-emoji-generator";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import { extendedBreakpointTokens } from "../../raaghu-react-themes/tokens/design-tokens";
import { mergeLocaleText } from "../../raaghu-elements/shared/utils/locale-text";
import { DEFAULT_RDS_COMP_CHAT_LOCALE_TEXT, type RdsCompChatLocaleText } from "./rds-comp-chat-locale";

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
  /** User accent color. Preferred over `colorVariant`. */
  color?: string;
  /** @deprecated Use `color`. */
  colorVariant?: string;
  time: string;
  profilePic: string;
  messageStatus: string;
  comments: Comment[];
  profileType?: string;
  /** Shows the profile picture. Preferred over `withProfilePic`. */
  showProfilePic?: boolean;
  /** @deprecated Use `showProfilePic`. */
  withProfilePic?: boolean;
  style?: string;
}

export interface RdsCompChatProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  chatScreenEnabled?: boolean;
  /** @deprecated Use `chatScreenEnabled` instead. */
  isChatScreenEnabled?: boolean;
  userData: UserData[];
  onAddComment?: (comment: Comment) => void;
  /** @deprecated Use `onAddComment` instead. */
  handleAddComment?: (comment: Comment) => void;
  currentUserCommentBgColor?: string;
  currentUserCommentTextColor?: string;
  otherUserCommentBgColor?: string;
  otherUserCommentTextColor?: string;
  ref?: Ref<HTMLDivElement>;
  sx?: SxProps<Theme>;
  /** Overrides the built-in English UI text. */
  localeText?: Partial<RdsCompChatLocaleText>;
}

interface ChatMessageProps {
  comment: Comment;
  isCurrentUser: boolean;
  currentUserCommentBgColor: string;
  otherUserCommentBgColor: string;
  currentUserCommentTextColor: string;
  otherUserCommentTextColor: string;
  text: RdsCompChatLocaleText;
}

const ChatMessage = memo(({
  comment,
  isCurrentUser,
  currentUserCommentBgColor,
  otherUserCommentBgColor,
  currentUserCommentTextColor,
  otherUserCommentTextColor,
  text
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
          {comment.image && <img src={comment.image} alt={text.uploadedImageAlt} className="rds-comp-chat__comment-image" />}
          {comment.video && (
            <video src={comment.video} controls aria-label={text.sharedVideo} className="rds-comp-chat__comment-video">
              <track kind="captions" srcLang="en" label={text.englishCaptions} />
            </video>
          )}
        </div>
      </Box>
    </div>
  </div>
));
ChatMessage.displayName = "ChatMessage";

const avatarPropsFor = (user: UserData | undefined, userAvatarAlt: string) => {
  const name = user ? `${user.firstName} ${user.lastName}`.trim() : undefined;
  const showPic = user?.showProfilePic ?? user?.withProfilePic ?? true;
  return {
    name,
    description: user?.status || undefined,
    alt: name || userAvatarAlt,
    src: showPic ? user?.profilePic || undefined : undefined,
    status: user?.activeDotButton ? "online" as const : "offline" as const,
    statusPosition: "bottom" as const,
    displayStyle: "with-name" as const,
  };
};

const MOBILE_BREAKPOINT = parseInt(extendedBreakpointTokens.sm, 10);
const SMALL_MOBILE_BREAKPOINT = parseInt(extendedBreakpointTokens["mobile-sm"], 10);

const RdsCompChat = ({
  chatScreenEnabled: chatScreenEnabledProp,
  isChatScreenEnabled,
  userData,
  onAddComment: onAddCommentProp,
  handleAddComment: handleAddCommentProp,
  currentUserCommentBgColor = "var(--rds-primary-main)",
  currentUserCommentTextColor = "var(--rds-primary-contrast-text, var(--rds-neutral-0))",
  otherUserCommentBgColor = "var(--rds-neutral-300)",
  otherUserCommentTextColor,
  className,
  ref,
  sx,
  localeText,
  ...rest
}: RdsCompChatProps) => {
  const resolvedOtherUserCommentTextColor = otherUserCommentTextColor ?? "var(--rds-text-primary)";
  const text = useMemo(() => mergeLocaleText(DEFAULT_RDS_COMP_CHAT_LOCALE_TEXT, localeText), [localeText]);
  if (isChatScreenEnabled !== undefined) warnDeprecatedProp('RdsCompChat', 'isChatScreenEnabled', '`chatScreenEnabled`');
  if (handleAddCommentProp !== undefined) warnDeprecatedProp('RdsCompChat', 'handleAddComment', '`onAddComment`');
  const chatScreenEnabled = chatScreenEnabledProp ?? isChatScreenEnabled;
  const onAddComment = onAddCommentProp ?? handleAddCommentProp;

  const [state, setState] = useState({
    isMobile: window.innerWidth <= MOBILE_BREAKPOINT,
    isSmallMobile: window.innerWidth <= SMALL_MOBILE_BREAKPOINT,
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
      isMobile: window.innerWidth <= MOBILE_BREAKPOINT,
      isSmallMobile: window.innerWidth <= SMALL_MOBILE_BREAKPOINT,
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

  const showUserList = chatScreenEnabled && (!state.isMobile || !state.showChatWindow);
  const showChat = !chatScreenEnabled || (state.isMobile ? state.showChatWindow : true);
  const hasCommentText = state.commentText.trim().length > 0;

  return (
    <Box {...rest} ref={ref} className={clsx("rds-comp-chat", state.isMobile && "rds-comp-chat--mobile", className)} sx={sx}>
      {showUserList && (
        <div className="rds-comp-chat__screen">
          <div className="rds-comp-chat__screen-header">
            <div className="rds-comp-chat__screen-header-title">{text.title}</div>
            <div className="rds-comp-chat__screen-header-icon">
              <span className="rds-comp-chat__screen-header-icon-filter"><FilterIcon /></span>
              <span><ChatIcon /></span>
            </div>
          </div>
          <div className="rds-comp-chat__screen-main">
            {userData.map((item, index) => (
              <Box key={`${item.firstName}-${item.lastName}-${item.time}`} component="div" className={`rds-comp-chat__user-item ${state.selectedIndex === index ? "rds-comp-chat__user-item--selected" : ""}`} sx={{ position: "relative" }} role="button" tabIndex={0} aria-pressed={state.selectedIndex === index} onClick={() => handleUserSelect(index)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleUserSelect(index); } }}>
                <div className="rds-comp-chat__user-item-inner"><RdsAvatar {...avatarPropsFor(item, text.userAvatarAlt)} /></div>
                <div className="rds-comp-chat__user-time text-muted rds-comp-chat__user-time--absolute">{item.time}</div>
              </Box>
            ))}
          </div>
        </div>
      )}

      {showChat && (
        <div className={clsx("rds-comp-chat__window", !chatScreenEnabled && "rds-comp-chat__window--full-width")}>
          <div className="rds-comp-chat__window-header">
            {state.isMobile && chatScreenEnabled && (
              <button type="button" className="rds-comp-chat__back-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={() => updateState({ showChatWindow: false, selectedIndex: null })} aria-label={text.backToUserList}>
                <ArrowBackIcon fontSize="small" />
              </button>
            )}
            <div className={clsx("rds-comp-chat__window-header-title", state.isMobile && "rds-comp-chat__window-header-title--mobile")}>
              <RdsAvatar
                {...avatarPropsFor(state.currentUser, text.userAvatarAlt)}
                size={state.isSmallMobile ? "smallest" : state.isMobile ? "small" : "medium"}
              />
            </div>
            <div className="rds-comp-chat__window-header-options">
              <div
                className={clsx("nav-tabs", state.isMobile && "nav-tabs--mobile")}
                role="tablist"
                aria-label={text.chatSections}
              >
                {["chat", "media"].map(tab => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={state.activeTab === tab}
                    className={clsx(
                      "nav-link",
                      state.activeTab === tab && "active",
                      state.isMobile && "nav-link--mobile"
                    )}
                    onClick={() => updateState({ activeTab: tab as "chat" | "media" })}
                  >
                    {tab === "chat" ? text.tabChat : text.tabMedia}
                  </button>
                ))}
              </div>
              <span className="rds-comp-chat__window-header-more"><MoreIcon /></span>
            </div>
          </div>

          <div className="rds-comp-chat__window-main">
            {state.activeTab === "chat" ? (
              <>
                {state.commentList.map((comment, commentIndex) => {
                  const isCurrentUser = comment.firstName === state.currentUser?.firstName && comment.lastName === state.currentUser?.lastName;
                  return (
                    <ChatMessage
                      key={`${comment.firstName}-${comment.lastName}-${comment.comment}-${commentIndex}`}
                      comment={comment}
                      isCurrentUser={isCurrentUser}
                      currentUserCommentBgColor={currentUserCommentBgColor}
                      otherUserCommentBgColor={otherUserCommentBgColor}
                      currentUserCommentTextColor={currentUserCommentTextColor}
                      otherUserCommentTextColor={resolvedOtherUserCommentTextColor}
                      text={text}
                    />
                  );
                })}
                {state.currentUser?.messageStatus && <div className="rds-comp-chat__message-status">{state.currentUser.messageStatus}</div>}
              </>
            ) : (
              <section className="rds-comp-chat__media-grid" aria-label={text.mediaGallery}>
                {mediaItems.length === 0 ? <div className="text-muted">{text.noMediaAvailable}</div> : mediaItems.map((m) => (
                  <div className="rds-comp-chat__media-item" key={m.src}>
                    {m.type === "image" ? <img src={m.src} alt={text.mediaImageAlt} className="rds-comp-chat__comment-image" /> : (
                      <video src={m.src} controls aria-label={text.mediaVideo} className="rds-comp-chat__comment-video">
                        <track kind="captions" srcLang="en" label={text.englishCaptions} />
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
              <RdsButton color="primary" changeLeftIcon="add" showLeftIcon layout="icon-only" variant="filled" aria-label={text.attachFile} onClick={() => document.getElementById("fileUpload")?.click()} />
              <input id="fileUpload" className="rds-comp-chat__file-input" type="file" accept="image/*,video/*" aria-label={text.uploadFile} onChange={handleImageUpload} />
              <button type="button" className="rds-comp-chat__emoji-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} onClick={() => updateState({ showEmojiPicker: !state.showEmojiPicker })} aria-label={text.openEmojiPicker}><EmojiIcon /></button>
            </div>
            <div className="rds-comp-chat__footer-center">
              <div className="rds-comp-chat__input-send">
                <div className="rds-comp-chat__input-wrapper">
                  <RdsInput className="rds-comp-chat__rds-input" layout="text" placeholder={text.typeCommentPlaceholder} size="small" aria-label={text.typeComment} value={state.commentText} onChange={(e) => updateState({ commentText: e.target.value })} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAddComment(); } }} />
                  <button
                    type="button"
                    className={clsx("rds-comp-chat__send-icon", hasCommentText && "rds-comp-chat__send-icon--active")}
                    onClick={handleAddComment}
                    aria-label={text.send}
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
          <video ref={videoRef} className="rds-comp-chat__video-feed" aria-label={text.cameraPreview}>
            <track kind="captions" srcLang="en" label={text.englishCaptions} />
          </video>
          <button type="button" onClick={capturePhoto}>{text.capturePhoto}</button>
          <button type="button" onClick={() => { updateState({ showCamera: false }); stopVideoStream(); }}>{text.close}</button>
          <canvas ref={canvasRef} className="rds-comp-chat__canvas-hidden" />
        </div>
      )}
    </Box>
  );
};

RdsCompChat.displayName = "RdsCompChat";
export default RdsCompChat;
