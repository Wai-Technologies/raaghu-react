import React from "react";
import "./rds-chat-header.css";

export enum ChatHeaderSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}
export interface RdsChatHeaderProps {
  logoUrl?: string;
  title?: string;
  size?: ChatHeaderSize;
}

const RdsChatHeader = (props: RdsChatHeaderProps) => {
  return (
    <div className="chat-header">
      {props.logoUrl && <img src={props.logoUrl} alt="Logo" className={`chat-logo ${props.size}`} />}
      <h3 className={`chat-header-text ${props.size}`}>{props.title}</h3>
    </div>
  );
};

export default RdsChatHeader;