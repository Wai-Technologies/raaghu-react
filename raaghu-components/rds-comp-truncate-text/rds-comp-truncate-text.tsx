import { useState, type CSSProperties, type HTMLAttributes, type Ref } from "react";
import { Box, type SxProps, type Theme } from "@mui/material";
import clsx from "clsx";
import "./rds-comp-truncate-text.scss";
import RdsTooltip from "../../raaghu-elements/rds-tooltip/rds-tooltip";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";

export interface RdsCompTruncateTextProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'> {
  /** @deprecated Use `children` instead. */
  text?: string;
  /** Text to display (preferred over `text`). */
  children?: string;
  /** Maximum number of characters shown before the text is cut with an ellipsis. @default 100 */
  maxLength?: number;
  /** @deprecated Use `maxLines` instead. */
  lines?: number;
  /** Maximum number of lines shown. @default 1 */
  maxLines?: number;
  /** Force the tooltip on or off. */
  showTooltip?: boolean;
  /** MUI system styles applied to the root element. */
  sx?: SxProps<Theme>;
  /** Ref forwarded to the root element. */
  ref?: Ref<HTMLDivElement>;
}

const RdsCompTruncateText = ({
  text,
  children,
  maxLength = 100,
  lines: linesProp,
  maxLines,
  showTooltip: showTooltipProp,
  className: classNameProp,
  sx,
  ref,
  ...rest
}: RdsCompTruncateTextProps) => {
  if (text !== undefined) warnDeprecatedProp('RdsCompTruncateText', 'text', '`children`');
  if (linesProp !== undefined) warnDeprecatedProp('RdsCompTruncateText', 'lines', '`maxLines`');
  const lines = maxLines ?? linesProp ?? 1;
  const content = children ?? text ?? '';
  const [isActive, setIsActive] = useState(false);
  const resolvedMaxLength = Math.max(0, maxLength);

  const tooltipEnabled = showTooltipProp ?? true;
  const isLong = content.length > resolvedMaxLength;

  const activate = () => {
    if (tooltipEnabled) setIsActive(true);
  };
  const deactivate = () => {
    if (tooltipEnabled) setIsActive(false);
  };

  const displayText = isLong ? `${content.slice(0, resolvedMaxLength)}...` : content;

  const className = clsx(
    "rds-comp-truncate-text",
    lines > 1 && lines <= 5 && `rds-comp-truncate-text--lines-${lines}`,
    classNameProp
  );
  const spanStyle: CSSProperties | undefined =
    lines > 5
      ? { display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden", WebkitLineClamp: lines }
      : undefined;

  const showTooltip = tooltipEnabled && isActive && isLong;

  return (
    <Box
      {...rest}
      ref={ref}
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onFocus={activate}
      onBlur={deactivate}
      tabIndex={isLong ? 0 : undefined}
      className={className}
      sx={sx}
    >
      {showTooltip ? (
        <RdsTooltip title={content} placement="bottom" arrow>
          <span style={spanStyle}>{displayText}</span>
        </RdsTooltip>
      ) : (
        <span style={spanStyle}>{displayText}</span>
      )}
    </Box>
  );
};

RdsCompTruncateText.displayName = "RdsCompTruncateText";
export default RdsCompTruncateText;
