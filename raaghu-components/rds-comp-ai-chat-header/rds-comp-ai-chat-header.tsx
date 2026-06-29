import clsx from "clsx";
import { memo } from "react";
import "./rds-comp-ai-chat-header.scss";
export { ChatHeaderSize } from './rds-comp-ai-chat-header-types';
import { ChatHeaderSize } from './rds-comp-ai-chat-header-types';

export interface RdsCompAiChatHeaderProps {
  logoUrl?: string;
  title?: string;
  size?: ChatHeaderSize;
}

const RdsCompAiChatHeader = memo(({
  logoUrl,
  title,
  size = ChatHeaderSize.Medium,
}: RdsCompAiChatHeaderProps) => (
  <div className="rds-comp-ai-chat-header">
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
  </div>
));

RdsCompAiChatHeader.displayName = "RdsCompAiChatHeader";
export default RdsCompAiChatHeader;
