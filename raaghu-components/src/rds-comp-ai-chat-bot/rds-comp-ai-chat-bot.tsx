import React, { useState, useEffect } from "react";
import { RdsChatHeader } from "../rds-elements";
import RdsMessageBox from "../rds-comp-message-box";
import RdsCompTypingSection from "../rds-comp-typing-section/rds-comp-typing-section";
import { Comment as AttachmentComment } from "../../../raaghu-elements/src/rds-attachement/rds-attachement";

export interface RdsAiChatBotProps {
    aiLogoUrl: string;
    userAvatarUrl?: string;
    placeholderText?: string;
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
    icon_name: string;
}

interface Message {
    id: number;
    text: string;
    image?: string;
    sender: boolean;
}

const RdsAiChatBot = (props: RdsAiChatBotProps) => {
    const { aiLogoUrl, userAvatarUrl, placeholderText, messages, setMessages, icon_name } = props;
    const [inputText, setInputText] = useState<string>("");
    const [inputImage, setInputImage] = useState<string | null>(null);

    const handleSendMessage = async (messageText: string) => {
        if (messageText || inputText || inputImage) {
            const newMessage: Message = {
                id: messages.length + 1,
                text: messageText || inputText,
                image: inputImage || undefined,
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
            console.error("Comment image is undefined");
            return;
        }
        // Convert base64 to binary data
        const byteString = atob(comment.image.split(',')[1]);
        const mimeString = comment.image.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });

        // Create a synthetic event to pass to handleImageChange
        const syntheticEvent = {
            target: {
                files: [blob]
            }
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        handleImageChange(syntheticEvent);
    };

    return (
        <div className="chat-box">
            <RdsChatHeader
                logoUrl={aiLogoUrl}
                title="New Chat Started"
            />
            <div className="chat-messages" style={{ paddingBottom: "80px", height: "70vh" }}>
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`chat-message ${message.sender ? "sender" : "receiver"}`}
                    >
                        <RdsMessageBox
                            avtar={`${message.sender ? aiLogoUrl : userAvatarUrl}`}
                            isImage={!!message.image}
                            message={message.text}
                            src={message.image}
                        />
                    </div>
                ))}
            </div>
            <div className="chat-input-wrapper" style={{ position: "fixed", bottom: 10, width: "100%", padding: "10px", marginLeft: "-10px" }}>
                <div className="chat-input">
                    <RdsCompTypingSection
                        colorVariant="#353535"
                        onSend={handleSendMessage}
                        placeholderText={placeholderText || "Ask me anything"}
                        icon_name={icon_name}
                        onAddComment={handleAddComment}
                        previewImage={inputImage || undefined} // Pass the preview image
                    />
                </div>
            </div>
        </div>
    );
};

export default RdsAiChatBot;