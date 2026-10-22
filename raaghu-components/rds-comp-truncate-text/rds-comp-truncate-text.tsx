import { useState, type CSSProperties } from "react";
import clsx from "clsx";
import "./rds-comp-truncate-text.scss";
import RdsTooltip from "../../raaghu-elements/rds-tooltip/rds-tooltip";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";

export interface RdsCompTruncateTextProps {
  /** @deprecated Use `children` instead. */
  text?: string;
  /** Text to display (preferred over `text`). */
  children?: string;
  maxLength?: number;
  /** @deprecated Use `maxLines` instead. */
  lines?: number;
  maxLines?: number;
  /** Force the tooltip on or off. */
  showTooltip?: boolean;
}

const RdsCompTruncateText = ({
  text,
  children,
  maxLength = 100,
  lines: linesProp,
  maxLines,
  showTooltip: showTooltipProp,
}: RdsCompTruncateTextProps) => {
  if (text !== undefined) warnDeprecatedProp('RdsCompTruncateText', 'text', '`children`');
  if (linesProp !== undefined) warnDeprecatedProp('RdsCompTruncateText', 'lines', '`maxLines`');
  const lines = maxLines ?? linesProp ?? 1;
  const content = children ?? text ?? '';
  const [isActive, setIsActive] = useState(false);
  const resolvedMaxLength = Math.max(0, maxLength);

  const tooltipEnabled = showTooltipProp ?? true;
  const isLong = content.length > resolvedMaxLength;
  const isTruncated = isLong;

  const activate = () => {
    if (tooltipEnabled) setIsActive(true);
  };
  const deactivate = () => {
    if (tooltipEnabled) setIsActive(false);
  };

  const displayText = isTruncated ? `${content.slice(0, resolvedMaxLength)}...` : content;

  const className = clsx(
    "rds-comp-truncate-text",
    lines > 1 && lines <= 5 && `rds-comp-truncate-text--lines-${lines}`
  );
  const spanStyle: CSSProperties | undefined =
    lines > 5
      ? { display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden", WebkitLineClamp: lines }
      : undefined;

  const showTooltip = tooltipEnabled && isActive && isLong;

  return (
    <div
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onFocus={activate}
      onBlur={deactivate}
      tabIndex={isTruncated ? 0 : undefined}
      className={className}
    >
      {showTooltip ? (
        <RdsTooltip label={content} title={content} style="bottom" arrow>
          <span style={spanStyle}>{displayText}</span>
        </RdsTooltip>
      ) : (
        <span style={spanStyle}>{displayText}</span>
      )}
    </div>
  );
};

RdsCompTruncateText.displayName = "RdsCompTruncateText";
export default RdsCompTruncateText;
