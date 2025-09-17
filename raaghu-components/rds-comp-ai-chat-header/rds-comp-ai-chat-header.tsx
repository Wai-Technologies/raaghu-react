import React from "react";
import "./rds-comp-ai-chat-header.scss";

export enum ChatHeaderSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}
export interface RdsCompAiChatHeaderProps {
  logoUrl?: string;
  title?: string;
  size?: ChatHeaderSize;
}

const RdsCompAiChatHeader = (props: RdsCompAiChatHeaderProps) => {
  return (
    <div className="rds-comp-ai-chat-header">
      {props.logoUrl && (
        <img
          src={props.logoUrl}
          alt="Logo"
          className={`rds-comp-ai-chat-header__logo rds-comp-ai-chat-header__logo--${props.size}`}
        />
      )}
      <h3 className={`rds-comp-ai-chat-header__text rds-comp-ai-chat-header__text--${props.size}`}>{props.title}</h3>
    </div>
  );
};

RdsCompAiChatHeader.displayName = "RdsCompAiChatHeader"
export default RdsCompAiChatHeader;