import React from "react";
import "./rds-comp-ai-message-box.scss";
import RdsAvatar from "../../raaghu-elements/rds-avatar/rds-avatar";

export interface RdsCompAiMessageBoxProps {
  isImage?: boolean;
  message?: string;
  src?: string;
  avtar?: string;
  avatar?: string;
}

const RdsCompAiMessageBox = (props: RdsCompAiMessageBoxProps) => {
  const avatarSrc =
    props.avatar ??
    props.avtar ??
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face";

  const imageSrc =
    props.src ??
    "https://via.placeholder.com/480x320.png?text=Image+placeholder";

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
            subText={props.message}
            title="Jane Doe"
          />
        </div>
        {props.isImage && (
          <div className="rds-comp-ai-message-box__image-wrapper">
            <img
              src={imageSrc}
              alt="message image"
              className="rds-comp-ai-message-box__image"
            />
          </div>
        )}
      </div>
    </div>
  );
};
RdsCompAiMessageBox.displayName = "RdsCompAiMessageBox";
export default RdsCompAiMessageBox;