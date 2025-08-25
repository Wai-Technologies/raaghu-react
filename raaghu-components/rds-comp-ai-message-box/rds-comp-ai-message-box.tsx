import React from "react";
import "./rds-comp-ai-message-box.scss";
import RdsAvatar from "../../raaghu-elements/rds-avatar/rds-avatar";
// import RdsCompLabel from "../rds-comp-label";

export interface RdsCompAiMessageBoxProps {
  isImage?: boolean;
  message?: string;
  src?: string;
  avtar?: string;
}

const RdsCompAiMessageBox = (props: RdsCompAiMessageBoxProps) => {
  return (
    <div className="message-box-container">
      <div className="p-2">
        <div className="d-flex">
          <RdsAvatar
            alt="User Avatar"
            displayStyle="with-name"
            showDesignation
            showName={false}
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            subText={props.message}
            title="Jane Doe"
          />
        </div>
        {props.isImage && (
          <div className="imageDiv">
            <img src={props.src} alt="image" className="responsive-image" />
          </div>
        )}
      </div>
    </div>
  );
};

export default RdsCompAiMessageBox;