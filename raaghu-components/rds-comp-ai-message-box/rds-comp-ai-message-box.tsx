import { memo, useMemo } from "react";
import "./rds-comp-ai-message-box.scss";
import RdsAvatar from "../../raaghu-elements/rds-avatar/rds-avatar";

export interface RdsCompAiMessageBoxProps {
  isImage?: boolean;
  message?: string;
  src?: string;
  avtar?: string;
  avatar?: string;
  name?: string;
}

const RdsCompAiMessageBox = memo(({
  isImage,
  message,
  src,
  avtar,
  avatar,
  name = "Jane Doe",
}: RdsCompAiMessageBoxProps) => {
  const avatarSrc = useMemo(() => avatar ?? avtar, [avatar, avtar]);
  const imageSrc = src;

  return (
    <div className="rds-comp-ai-message-box">
      <div className="rds-comp-ai-message-box__container">
        <div className="rds-comp-ai-message-box__row">
          <RdsAvatar
            alt="User Avatar"
            displayStyle="with-name"
            showDesignation
            showName={false}
            src={avatarSrc}
            subText={message}
            title={name}
          />
        </div>
        {isImage && imageSrc && (
          <div className="rds-comp-ai-message-box__image-wrapper">
            <img src={imageSrc} alt="message image" className="rds-comp-ai-message-box__image" />
          </div>
        )}
      </div>
    </div>
  );
});

RdsCompAiMessageBox.displayName = "RdsCompAiMessageBox";
export default RdsCompAiMessageBox;
