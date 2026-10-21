import { memo } from "react";
import "./rds-comp-ai-message-box.scss";
import RdsAvatar from "../../raaghu-elements/rds-avatar/rds-avatar";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";

export interface RdsCompAiMessageBoxProps {
  Image?: boolean;
  /** @deprecated Use `children` instead. */
  message?: string;
  /** Message text (shown under the sender name). */
  children?: string;
  src?: string;
  /** @deprecated Use `avatar` instead. */
  avtar?: string;
  avatar?: string;
  /** Display name shown for the sender. */
  name?: string;
  /** Alt text for the avatar image. */
  avatarAlt?: string;
  /** Alt text for the attached image. */
  imageAlt?: string;
}

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face";
const DEFAULT_IMAGE =
  "https://via.placeholder.com/480x320.png?text=Image+placeholder";

const RdsCompAiMessageBox = memo(({
  Image,
  message,
  children,
  src,
  avtar,
  avatar,
  name = "Jane Doe",
  avatarAlt = "User Avatar",
  imageAlt = "",
}: RdsCompAiMessageBoxProps) => {
  if (avtar !== undefined) warnDeprecatedProp("RdsCompAiMessageBox", "avtar", "`avatar`");
  if (message !== undefined) warnDeprecatedProp("RdsCompAiMessageBox", "message", "`children`");
  const avatarSrc = avatar ?? avtar ?? DEFAULT_AVATAR;
  const imageSrc = src ?? DEFAULT_IMAGE;

  return (
    <div className="rds-comp-ai-message-box">
      <div className="rds-comp-ai-message-box__container">
        <div className="rds-comp-ai-message-box__row">
          <RdsAvatar
            alt={avatarAlt}
            displayStyle="with-name"
            showDesignation
            showName={false}
            src={avatarSrc}
            subText={children ?? message}
            title={name}
          />
        </div>
        {Image && (
          <div className="rds-comp-ai-message-box__image-wrapper">
            <img src={imageSrc} alt={imageAlt} className="rds-comp-ai-message-box__image" />
          </div>
        )}
      </div>
    </div>
  );
});

RdsCompAiMessageBox.displayName = "RdsCompAiMessageBox";
export default RdsCompAiMessageBox;
