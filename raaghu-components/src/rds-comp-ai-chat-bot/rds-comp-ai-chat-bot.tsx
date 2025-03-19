import React, { useState } from "react";
import { RdsChatHeader } from "../rds-elements";
import RdsMessageBox from "../rds-comp-message-box";
import RdsCompTypingSection from "../rds-comp-typing-section";

export interface RdsAiChatBotProps {
    aiLogoUrl: string;
    userAvatarUrl?: string;
    placeholderText?: string;
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

interface Message {
    id: number;
    text: string;
    image?: string;
    sender: boolean; // true for sender, false for receiver
}

const RdsAiChatBot = (props: RdsAiChatBotProps) => {
    const { aiLogoUrl, userAvatarUrl, placeholderText, messages, setMessages } = props;
    const [inputText, setInputText] = useState<string>("");
    const [inputImage, setInputImage] = useState<string | null>(null);

    const handleSendMessage = async (messageText: any) => {
        console.log("Sending message...", messageText);
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

            // Send a default message from the sender
            // setTimeout(() => {
            //     const defaultMessage: Message = {
            //         id: messages.length + 2,
            //         text: "This is a default response from the sender.",
            //         sender: true,
            //     };
            //     setMessages((prevMessages) => [...prevMessages, defaultMessage]);
            // }, 1000);
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

    return (
        <>
            <div className="chat-box">
                <RdsChatHeader
                    logoUrl={aiLogoUrl}
                    title="New Chat Started"
                />
                <div className="chat-messages" style={{ paddingBottom: "80px" }}>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`chat-message ${message.sender ? "sender" : "receiver"}`}
                        >
                            <RdsMessageBox
                                avtar={`${message.sender ? aiLogoUrl : userAvatarUrl}`}
                                isImage={message.image ? true : false}
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
                        />
                        {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RdsAiChatBot;