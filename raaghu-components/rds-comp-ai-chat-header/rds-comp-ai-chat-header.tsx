import clsx from "clsx";
import { forwardRef, memo } from "react";
import Box from "@mui/material/Box";
import { joinClassNames, type RdsStylingProps } from "../../raaghu-elements/shared/utils/styling-props";
import "./rds-comp-ai-chat-header.scss";
export { ChatHeaderSize } from './rds-comp-ai-chat-header-types';
import { ChatHeaderSize } from './rds-comp-ai-chat-header-types';

export interface RdsCompAiChatHeaderProps extends RdsStylingProps {
  logoUrl?: string;
  title?: string;
  size?: ChatHeaderSize;
}

const RdsCompAiChatHeader = memo(forwardRef<HTMLDivElement, RdsCompAiChatHeaderProps>(function RdsCompAiChatHeader({
  logoUrl,
  title,
  size = ChatHeaderSize.Medium,
  className,
  sx,
  style,
}, ref) { return (
  <Box ref={ref} className={joinClassNames("rds-comp-ai-chat-header", className)} sx={sx} style={style}>
    {logoUrl && (
      <img
        src={logoUrl}
        alt="Logo"
        className={clsx("rds-comp-ai-chat-header__logo", `rds-comp-ai-chat-header__logo--${size}`)}
      />
    )}
    <h3 className={clsx("rds-comp-ai-chat-header__text", `rds-comp-ai-chat-header__text--${size}`)}>
      {title}
    </h3>
  </Box>
); }));

RdsCompAiChatHeader.displayName = "RdsCompAiChatHeader";
export default RdsCompAiChatHeader;
