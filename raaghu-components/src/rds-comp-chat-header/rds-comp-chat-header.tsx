import React from "react";
import "./rds-comp-chat-header.css";

export enum ChatHeaderSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}
export interface RdsCompChatHeaderProps {
  logoUrl?: string;
  title?: string;
  size?: ChatHeaderSize;
}

const RdsCompChatHeader = (props: RdsCompChatHeaderProps) => {
  return (
    <div className="chat-header">
      {props.logoUrl && <img src={props.logoUrl} alt="Logo" className={`chat-logo ${props.size}`} />}
      <h3 className={`chat-header-text ${props.size}`}>{props.title}</h3>
    </div>
  );
};

export default RdsCompChatHeader;