import React from "react";
import "./rds-chat-header.css";
export interface RdsChatHeaderProps {
  logoUrl?: string;
  title?: string;
}

const RdsChatHeader = (props: RdsChatHeaderProps) => {
    return (
      <div className="chat-header">
        <img src={props.logoUrl} alt="Logo" />
        <h3>{props.title}</h3>
      </div>
    );
  };
  

export default RdsChatHeader;