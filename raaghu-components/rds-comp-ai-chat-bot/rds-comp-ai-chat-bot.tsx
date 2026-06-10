import clsx from "clsx";
import { useCallback, useState, type Dispatch, type SetStateAction, type ChangeEvent } from "react";
import RdsCompAiMessageBox from "../rds-comp-ai-message-box/rds-comp-ai-message-box";
import RdsCompAiTypingSection from "../rds-comp-ai-typing-section/rds-comp-ai-typing-section";
import { Comment as AttachmentComment } from "../rds-comp-ai-attachement/rds-comp-ai-attachement";
import RdsCompAiChatHeader, { ChatHeaderSize } from "../rds-comp-ai-chat-header/rds-comp-ai-chat-header";
import "./rds-comp-ai-chat-bot.scss";

export interface RdsCompAiChatBotProps {
  aiLogoUrl: string;
  userAvatarUrl?: string;
  placeholderText?: string;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  iconName: string;
}

export interface Message {
  id: number;
  text: string;
  image?: string;
  sender: boolean;
}

const RdsCompAiChatBot = ({
  aiLogoUrl,
  userAvatarUrl,
  placeholderText,
  messages,
  setMessages,
  iconName,
}: RdsCompAiChatBotProps) => {
  const [inputText, setInputText] = useState<string>("");
  const [inputImage, setInputImage] = useState<string | null>(null);

  const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const reader = new FileReader();
    reader.onload = () => {
      setInputImage(reader.result as string);
    };
    reader.readAsDataURL(e.target.files[0]);
  }, []);

  const handleSendMessage = useCallback(
    async (messageText: string, image?: string) => {
      if (!messageText && !inputText && !image) return;

      const newMessage: Message = {
        id: messages.length + 1,
        text: messageText || inputText,
        image: image || inputImage || undefined,
        sender: false,
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputText("");
      setInputImage(null);
    },
    [inputImage, inputText, messages.length, setMessages]
  );

  const handleAddComment = useCallback(
    (comment: AttachmentComment) => {
      if (!comment.image) return;

      if (comment.image.startsWith("http")) {
        setInputImage(comment.image);
        return;
      }

      const byteString = atob(comment.image.split(",")[1]);
      const mimeString = comment.image.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: mimeString });
      const syntheticEvent = {
        target: {
          files: [blob],
        },
      } as unknown as ChangeEvent<HTMLInputElement>;

      handleImageChange(syntheticEvent);
    },
    [handleImageChange]
  );

  return (
    <div className="rds-ai-chat-bot">
      <div className="rds-ai-chat-bot__messages">
        <RdsCompAiChatHeader
          logoUrl={aiLogoUrl}
          title="New Chat Started"
          size={ChatHeaderSize.Medium}
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
              avtar={`${message.sender ? aiLogoUrl : userAvatarUrl}`}
              isImage={!!message.image}
              message={message.text}
              src={message.image}
            />
          </div>
        ))}
      </div>
      <div className="rds-ai-chat-bot__input-wrapper">
        <div className="rds-ai-chat-bot__input">
          <RdsCompAiTypingSection
            colorVariant="var(--rds-text-secondary)"
            onSend={handleSendMessage}
            placeholderText={placeholderText || "Ask me anything"}
            iconName={iconName}
            onAddComment={handleAddComment}
            previewImage={inputImage || undefined}
          />
        </div>
      </div>
    </div>
  );
};

RdsCompAiChatBot.displayName = "RdsCompAiChatBot";
export default RdsCompAiChatBot;
