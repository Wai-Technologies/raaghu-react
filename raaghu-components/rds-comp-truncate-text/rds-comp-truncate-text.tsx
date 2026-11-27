import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import "./rds-comp-truncate-text.scss";
import RdsTooltip from "../../raaghu-elements/rds-tooltip/rds-tooltip";
import { joinClassNames, type RdsStylingProps } from "../../raaghu-elements/shared/utils/styling-props";

export enum TruncateTextState {
  Default = "Default",
  Hover = "Hover",
}
export interface RdsCompTruncateTextProps extends RdsStylingProps {
  text: string;
  maxLength?: number;
  state?: TruncateTextState;
  lines?: number;
}

const RdsCompTruncateText = React.forwardRef<HTMLDivElement, RdsCompTruncateTextProps>(function RdsCompTruncateText({
  text,
  maxLength = 100,
  state = TruncateTextState.Default,
  lines = 1,
  className,
  sx,
  style,
}, ref) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (state === TruncateTextState.Hover) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (state === TruncateTextState.Hover) setIsHovered(false);
  };

  const displayText = useMemo(() => {
    if (state === TruncateTextState.Default) return text;
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  }, [text, maxLength, state]);

  const classList = ['rds-comp-truncate-text'];
  if (lines && lines > 1 && lines <= 5) {
    classList.push(`rds-comp-truncate-text--lines-${lines}`);
  }

  return (
    <Box
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={joinClassNames(...classList, className)}
      tabIndex={0}
      role="text"
      aria-label={text}
      sx={sx}
      style={style}
    >
      {state === TruncateTextState.Hover && isHovered && text.length > maxLength ? (
        <RdsTooltip label={text} title={text} style="bottom" arrow>
          <span>{displayText}</span>
        </RdsTooltip>
      ) : (
        <span>{displayText}</span>
      )}
    </Box>
  );
});
RdsCompTruncateText.displayName = "RdsCompTruncateText";
export default RdsCompTruncateText;
