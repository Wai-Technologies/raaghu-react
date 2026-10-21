import clsx from "clsx";
import { useCallback, useState, type Dispatch, type HTMLAttributes, type Ref, type SetStateAction } from "react";
import RdsCompAiMessageBox from "../rds-comp-ai-message-box/rds-comp-ai-message-box";
import RdsCompAiTypingSection from "../rds-comp-ai-typing-section/rds-comp-ai-typing-section";
import type { Comment as AttachmentComment } from "../rds-comp-ai-attachment/rds-comp-ai-attachment";
import RdsCompAiChatHeader from "../rds-comp-ai-chat-header/rds-comp-ai-chat-header";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import "./rds-comp-ai-chat-bot.scss";

export interface RdsCompAiChatBotProps extends Omit<HTMLAttributes<HTMLDivElement>, "id" | "children" | "title"> {
  aiLogoUrl: string;
  userAvatarUrl?: string;
  placeholderText?: string;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  /** @deprecated Has no effect. */
  iconName?: string;
  /** Title of the chat header. */
  title?: string;
  /** Ref to the root element. */
  ref?: Ref<HTMLDivElement>;
}

export interface Message {
  id: number;
  text: string;
  image?: string;
  sender: boolean;
}

/** AI chat: header, message list and the typing section. */
const RdsCompAiChatBot = ({
  aiLogoUrl,
  userAvatarUrl,
  placeholderText,
  messages,
  setMessages,
  iconName,
  title = "New Chat Started",
  className,
  ref,
  ...rest
}: RdsCompAiChatBotProps) => {
  if (iconName !== undefined) warnDeprecatedProp("RdsCompAiChatBot", "iconName", "nothing (no effect)");

  const [inputImage, setInputImage] = useState<string | null>(null);

  const handleSendMessage = useCallback(
    (messageText: string, image?: string) => {
      if (!messageText && !image) return;

      const newMessage: Message = {
        id: messages.length + 1,
        text: messageText,
        image: image || inputImage || undefined,
        sender: false,
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputImage(null);
    },
    [inputImage, messages.length, setMessages]
  );

  // Accepts an http(s) URL or a data URL; anything else (e.g. a partly typed Figma URL) is ignored.
  const handleAddComment = useCallback((comment: AttachmentComment) => {
    const image = comment.image;
    if (image && (image.startsWith("http") || /^data:[^,]*;base64,/.test(image))) {
      setInputImage(image);
    }
  }, []);

  return (
    <div {...rest} ref={ref} className={clsx("rds-ai-chat-bot", className)}>
      <div className="rds-ai-chat-bot__messages" role="log" aria-live="polite">
        <RdsCompAiChatHeader
          logoUrl={aiLogoUrl}
          title={title}
          size="medium"
        />
        {messages.map((message) => (
          <div
            key={message.id}
            className={clsx(
              "rds-ai-chat-bot__message",
              message.sender
                ? "rds-ai-chat-bot__message--sender"
                : "rds-ai-chat-bot__message--receiver"
            )}
          >
            <RdsCompAiMessageBox
              avatar={message.sender ? aiLogoUrl : userAvatarUrl}
              isImage={!!message.image}
              src={message.image}
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
            placeholder={placeholderText || "Ask me anything"}
            onAddComment={handleAddComment}
            previewImage={inputImage || undefined}
            iconName={iconName}
          />
        </div>
      </div>
    </div>
  );
};

RdsCompAiChatBot.displayName = "RdsCompAiChatBot";
export default RdsCompAiChatBot;
