import React, { useState } from "react";
import RdsCompAiMessageBox from "../rds-comp-ai-message-box/rds-comp-ai-message-box";
import RdsCompAiTypingSection from "../rds-comp-ai-typing-section/rds-comp-ai-typing-section";
import { Comment as AttachmentComment } from "../rds-comp-ai-attachement/rds-comp-ai-attachement";
import RdsCompAiChatHeader from "../rds-comp-ai-chat-header/rds-comp-ai-chat-header";
import "./rds-comp-ai-chat-bot.scss";

export interface RdsCompAiChatBotProps {
    aiLogoUrl: string;
    userAvatarUrl?: string;
    placeholderText?: string;
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    icon_name: string;
}

export interface Message {
    id: number;
    text: string;
    image?: string;
    sender: boolean;
}

const RdsCompAiChatBot = (props: RdsCompAiChatBotProps) => {
    const { aiLogoUrl, userAvatarUrl, placeholderText, messages, setMessages, icon_name } = props;
    const [inputText, setInputText] = useState<string>("");
    const [inputImage, setInputImage] = useState<string | null>(null);

    const handleSendMessage = async (messageText: string, image?: string) => {
        if (messageText || inputText || image) {
            const newMessage: Message = {
                id: messages.length + 1,
                text: messageText || inputText,
                image: image || inputImage || undefined,
                sender: false,
            };
            setMessages([...messages, newMessage]);
            setInputText("");
            setInputImage(null);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                setInputImage(reader.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleAddComment = (comment: AttachmentComment) => {
        if (!comment.image) {
            return;
        }
        if (comment.image.startsWith("http")) {
            setInputImage(comment.image);
            return;
        }
        const byteString = atob(comment.image.split(',')[1]);
        const mimeString = comment.image.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });

        const syntheticEvent = {
            target: {
                files: [blob]
            }
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        handleImageChange(syntheticEvent);
    };

    return (
        <div className="rds-ai-chat-bot">
            <div className="rds-ai-chat-bot__messages">
                <RdsCompAiChatHeader
                    logoUrl={aiLogoUrl}
                    title="New Chat Started"
                />
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`rds-ai-chat-bot__message ${message.sender ? "rds-ai-chat-bot__message--sender" : "rds-ai-chat-bot__message--receiver"}`}
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
                        colorVariant="#353535"
                        onSend={handleSendMessage}
                        placeholderText={placeholderText || "Ask me anything"}
                        icon_name={icon_name}
                        onAddComment={handleAddComment}
                        previewImage={inputImage || undefined}
                    />
                </div>
            </div>
        </div>
    );
};

RdsCompAiChatBot.displayName = "RdsCompAiChatBot"
export default RdsCompAiChatBot;