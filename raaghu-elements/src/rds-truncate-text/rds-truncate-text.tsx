import React, { useState } from "react";
import "./rds-truncate-text.css";
import Tooltip from "../rds-tooltip"; 
import { TooltipStyle } from "../rds-tooltip/rds-tooltip";

export enum TruncateTextState {
  Default = "default",
  Hover = "hover",
}

export interface RdsTruncateTextProps {
  text: string; // Full text
  maxLength: number; // Maximum characters before truncation
  state: TruncateTextState; // Control behavior (default or hover)
}

const RdsTruncatedText: React.FC<RdsTruncateTextProps> = ({ text, maxLength, state }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (state === "hover") setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (state === "hover") setIsHovered(false);
  };

  // If state is "default", show full text
  const displayText = state === "default" ? text : text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return (
    <div className="rds-truncate-text" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {state === "hover" && isHovered && text.length > maxLength ? (
        <Tooltip style={TooltipStyle.MiddleTopArrow} label={text}>
          <span>{displayText}</span>
        </Tooltip>
      ) : (
        <span>{displayText}</span>
      )}
    </div>
  );
};

export default RdsTruncatedText;
