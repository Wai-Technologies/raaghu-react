import clsx from "clsx";
import type { ElementType, HTMLAttributes, Ref } from "react";
import "./rds-comp-ai-chat-header.scss";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
export { ChatHeaderSize } from './rds-comp-ai-chat-header-types';
import type { ChatHeaderSize } from './rds-comp-ai-chat-header-types';
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

/** Props for {@link RdsCompAiChatHeader}. */
export interface RdsCompAiChatHeaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** URL of the logo shown before the title. */
  avatarSrc?: string;
  /** @deprecated Use `avatarSrc` instead. */
  logoUrl?: string;
  /** Alt text of the logo. Default "Logo". */
  logoAlt?: string;
  /** Header title text. */
  title?: string;
  /** Size of the title and logo. Default `'medium'`. */
  size?: ChatHeaderSize;
  /** Element used for the title. Default `'h3'`. */
  component?: ElementType;
  /** Ref forwarded to the root `<div>`. */
  ref?: Ref<HTMLDivElement>;
  sx?: SxProps<Theme>;
}

const RdsCompAiChatHeader = ({
  avatarSrc,
  logoUrl,
  logoAlt = "Logo",
  title,
  size = "medium",
  component: Heading = "h3",
  className,
  ref,
  sx,
  ...rest
}: RdsCompAiChatHeaderProps) => {
  if (logoUrl !== undefined) warnDeprecatedProp("RdsCompAiChatHeader", "logoUrl", "`avatarSrc`");
  const logoSrc = avatarSrc ?? logoUrl;
  return (
  <Box {...rest} ref={ref} className={clsx("rds-comp-ai-chat-header", className)} sx={sx}>
    {logoSrc && (
      <img
        src={logoSrc}
        alt={logoAlt}
        className={clsx("rds-comp-ai-chat-header__logo", `rds-comp-ai-chat-header__logo--${size}`)}
      />
    )}
    <Heading className={clsx("rds-comp-ai-chat-header__text", `rds-comp-ai-chat-header__text--${size}`)}>
      {title}
    </Heading>
  </Box>
  );
};

RdsCompAiChatHeader.displayName = "RdsCompAiChatHeader";
export default RdsCompAiChatHeader;
