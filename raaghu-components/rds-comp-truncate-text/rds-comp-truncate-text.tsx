import { useState, type CSSProperties } from "react";
import clsx from "clsx";
import "./rds-comp-truncate-text.scss";
import RdsTooltip from "../../raaghu-elements/rds-tooltip/rds-tooltip";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
export { TruncateTextState } from './rds-comp-truncate-text-types';
import { TruncateTextState } from './rds-comp-truncate-text-types';

export interface RdsCompTruncateTextProps {
  /** @deprecated Use `children` instead. */
  text?: string;
  /** Text to display (preferred over `text`). */
  children?: string;
  maxLength?: number;
  state?: TruncateTextState;
  lines?: number;
  /** Force the tooltip on/off; wins over the state-derived behaviour. */
  showTooltip?: boolean;
}

const RdsCompTruncateText = ({
  text,
  children,
  maxLength = 100,
  state = TruncateTextState.Default,
  lines = 1,
  showTooltip: showTooltipProp,
}: RdsCompTruncateTextProps) => {
  if (text !== undefined) warnDeprecatedProp('RdsCompTruncateText', 'text', '`children`');
  const content = children ?? text ?? '';
  const [isActive, setIsActive] = useState(false);

  const tooltipEnabled = showTooltipProp ?? state === TruncateTextState.Hover;
  const isLong = content.length > maxLength;
  const isTruncated = state !== TruncateTextState.Default && isLong;

  const activate = () => {
    if (tooltipEnabled) setIsActive(true);
  };
  const deactivate = () => {
    if (tooltipEnabled) setIsActive(false);
  };

  const displayText = isTruncated ? `${content.slice(0, maxLength)}...` : content;

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
