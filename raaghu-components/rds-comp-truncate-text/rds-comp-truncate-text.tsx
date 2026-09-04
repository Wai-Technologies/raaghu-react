import { useCallback, useMemo, useState } from "react";
import clsx from "clsx";
import "./rds-comp-truncate-text.scss";
import RdsTooltip from "../../raaghu-elements/rds-tooltip/rds-tooltip";
export { TruncateTextState } from './rds-comp-truncate-text-types';
import { TruncateTextState } from './rds-comp-truncate-text-types';

export interface RdsCompTruncateTextProps {
  text: string;
  maxLength?: number;
  state?: TruncateTextState;
  lines?: number;
}

const RdsCompTruncateText = ({
  text,
  maxLength = 100,
  state = TruncateTextState.Default,
  lines = 1,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (state === TruncateTextState.Hover) {
      setIsHovered(true);
    }
  }, [state]);

  const handleMouseLeave = useCallback(() => {
    if (state === TruncateTextState.Hover) {
      setIsHovered(false);
    }
  }, [state]);

  const displayText = useMemo(() => {
    if (state === TruncateTextState.Default) return text;
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  }, [text, maxLength, state]);

  const className = useMemo(
    () => clsx("rds-comp-truncate-text", lines && lines > 1 && lines <= 5 && `rds-comp-truncate-text--lines-${lines}`),
    [lines]
  );

  const showTooltip =
    state === TruncateTextState.Hover && isHovered && text.length > maxLength;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      aria-label={text}
    >
      {showTooltip ? (
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
