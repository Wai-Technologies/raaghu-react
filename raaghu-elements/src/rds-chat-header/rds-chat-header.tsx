import React from "react";
import "./rds-chat-header.css";

export interface RdsChatHeaderProps {
  logoUrl?: string;
  title?: string;
}

const RdsChatHeader = ({ logoUrl, title }: RdsChatHeaderProps) => {
    return (
      <div className="chat-header">
        <img src={logoUrl} alt="Logo" />
        <h3>{title}</h3>
      </div>
    );
  };
  

export default RdsChatHeader;