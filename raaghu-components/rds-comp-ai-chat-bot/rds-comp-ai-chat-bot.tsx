import clsx from "clsx";
import { useCallback, useState, type Dispatch, type HTMLAttributes, type ReactNode, type Ref, type SetStateAction } from "react";
import RdsCompAiMessageBox from "../rds-comp-ai-message-box/rds-comp-ai-message-box";
import RdsCompAiTypingSection from "../rds-comp-ai-typing-section/rds-comp-ai-typing-section";
import type { Comment as AttachmentComment } from "../rds-comp-ai-attachment/rds-comp-ai-attachment";
import RdsCompAiChatHeader from "../rds-comp-ai-chat-header/rds-comp-ai-chat-header";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import "./rds-comp-ai-chat-bot.scss";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

export interface RdsCompAiChatBotProps extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children" | "title"> {
  /** Avatar of the assistant, also shown in the header. */
  assistantAvatar?: string;
  /** @deprecated Use `assistantAvatar` instead. */
  aiLogoUrl?: string;
  /** Avatar of the user. */
  userAvatar?: string;
  /** @deprecated Use `userAvatar` instead. */
  userAvatarUrl?: string;
  /** Placeholder of the prompt input. */
  placeholder?: string;
  /** @deprecated Use `placeholder` instead. */
  placeholderText?: string;
  messages: Message[];
  /** Called with the message the user sent. */
  onSend?: (message: Message) => void;
  /** Appends sent messages to `messages`. */
  setMessages?: Dispatch<SetStateAction<Message[]>>;
  /** @deprecated Has no effect. */
  iconName?: ReactNode;
  /** Title of the chat header. */
  title?: string;
  /** Ref to the root element. */
  ref?: Ref<HTMLDivElement>;
  sx?: SxProps<Theme>;
}

export interface Message {
  id: number;
  text: string;
  image?: string;
  /** Author of the message. */
  role?: "user" | "assistant";
  /** @deprecated Use `role` instead (`true` = assistant). */
  sender?: boolean;
}

const isAssistant = (message: Message) => (message.role ? message.role === "assistant" : !!message.sender);

/** AI chat: header, message list and the typing section. */
const RdsCompAiChatBot = ({
  assistantAvatar,
  aiLogoUrl,
  userAvatar,
  userAvatarUrl,
  placeholder,
  placeholderText,
  messages,
  onSend,
  setMessages,
  iconName,
  title = "New Chat Started",
  className,
  ref,
  sx,
  ...rest
}: RdsCompAiChatBotProps) => {
  if (iconName !== undefined) warnDeprecatedProp("RdsCompAiChatBot", "iconName", "nothing (no effect)");
  if (aiLogoUrl !== undefined) warnDeprecatedProp("RdsCompAiChatBot", "aiLogoUrl", "`assistantAvatar`");
  if (userAvatarUrl !== undefined) warnDeprecatedProp("RdsCompAiChatBot", "userAvatarUrl", "`userAvatar`");
  if (placeholderText !== undefined) warnDeprecatedProp("RdsCompAiChatBot", "placeholderText", "`placeholder`");
  if (messages.some((m) => m.sender !== undefined && m.role === undefined)) warnDeprecatedProp("RdsCompAiChatBot", "Message.sender", "`Message.role`");
  const assistantSrc = assistantAvatar ?? aiLogoUrl;
  const userSrc = userAvatar ?? userAvatarUrl;

  const [inputImage, setInputImage] = useState<string | null>(null);

  const handleSendMessage = useCallback(
    (messageText: string, image?: string) => {
      if (!messageText && !image) return;

      const newMessage: Message = {
        id: messages.length + 1,
        text: messageText,
        image: image || inputImage || undefined,
        role: "user",
        sender: false,
      };

      setMessages?.((prev) => [...prev, newMessage]);
      onSend?.(newMessage);
      setInputImage(null);
    },
    [inputImage, messages.length, onSend, setMessages]
  );

  const handleAddComment = useCallback((comment: AttachmentComment) => {
    const image = comment.image;
    if (image && (image.startsWith("http") || /^data:[^,]*;base64,/.test(image))) {
      setInputImage(image);
    }
  }, []);

  return (
    <Box {...rest} ref={ref} className={clsx("rds-ai-chat-bot", className)} sx={sx}>
      <div className="rds-ai-chat-bot__messages" role="log" aria-live="polite">
        <RdsCompAiChatHeader
          avatarSrc={assistantSrc}
          title={title}
          size="medium"
        />
        {messages.map((message) => (
          <div
            key={message.id}
            className={clsx(
              "rds-ai-chat-bot__message",
              isAssistant(message)
                ? "rds-ai-chat-bot__message--sender"
                : "rds-ai-chat-bot__message--receiver"
            )}
          >
            <RdsCompAiMessageBox
              avatar={isAssistant(message) ? assistantSrc : userSrc}
              imageSrc={message.image || undefined}
            >
              {message.text}
            </RdsCompAiMessageBox>
          </div>
        ))}
      </div>
      <div className="rds-ai-chat-bot__input-wrapper">
        <div className="rds-ai-chat-bot__input">
          <RdsCompAiTypingSection
            onSend={handleSendMessage}
            placeholder={(placeholder ?? placeholderText) || "Ask me anything"}
            onAddComment={handleAddComment}
            imageSrc={inputImage || undefined}
            iconName={iconName}
          />
        </div>
      </div>
    </Box>
  );
};

RdsCompAiChatBot.displayName = "RdsCompAiChatBot";
export default RdsCompAiChatBot;
