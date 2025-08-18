import React, { useState } from "react";
import "./rds-comp-truncate-text.scss";
import RdsTooltip from "../../raaghu-elements/rds-tooltip/rds-tooltip";

export enum TruncateTextState {
  Default = "Default",
  Hover = "Hover",
}

export interface RdsCompTruncateTextProps {
  text: string; // Full text
  maxLength: number; // Maximum characters before truncation
  state: TruncateTextState; // Control behavior (default or hover)
}

const RdsCompTruncateText: React.FC<RdsCompTruncateTextProps> = ({ text, maxLength, state }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (state === "Hover") setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (state === "Hover") setIsHovered(false);
  };

  // If state is "default", show full text
  const displayText = state === "Default" ? text : text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return (
    <div className="rds-comp-truncate-text" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {state === "Hover" && isHovered && text.length > maxLength ? (
      <RdsTooltip label={text} title={text} style="bottom" arrow>
          <span>{displayText}</span>
        </RdsTooltip>
      ) : (
        <span>{displayText}</span>
      )}
    </div>
  );
};
RdsCompTruncateText.displayName = "RdsCompTruncateText";
export default RdsCompTruncateText;