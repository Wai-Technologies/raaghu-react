import React from "react";
import "./rds-comp-message-box.css"; // Import custom styles
import { RdsAvatar, RdsLabel } from "../rds-elements";
import { AvatarSize, AvatarStyle } from "../../../raaghu-elements/src/rds-avatar/rds-avatar";

export interface RdsMessageBoxProps {
  isImage?: boolean;
  message?: string;
  src?: string;
  avtar?: string;
}

const RdsMessageBox = (props: RdsMessageBoxProps) => {
  return (
    <div className="message-box-container">
      {props.isImage ? (
        <div className="p-2">
          <div className="d-flex align-items-center">
            <RdsAvatar
              size={AvatarSize.medium}
              type="image"
              style={AvatarStyle.withname}
              activityRing={false}
              activeDotTop={false}
              activeDotBottom={false}
              showName={false}
              showNameDesignation={false}
              firstName="Wai"
              lastName="Technologies"
              role="Developer"
              colorVariant="primary"
              profilePic={props.avtar}
              maxVisibleAvatars={3}
            />
            <RdsLabel class="m-2" label={props.message} />
          </div>
          <div className="ms-5">
            <img src={props.src} alt="image" className="responsive-image" />
          </div>
        </div>
      ) : (
        <div className="chat-container d-flex align-items-center p-2">
          <RdsAvatar
            size={AvatarSize.medium}
            type="image"
            style={AvatarStyle.withname}
            activityRing={false}
            activeDotTop={false}
            activeDotBottom={false}
            showName={false}
            showNameDesignation={false}
            firstName="Wai"
            lastName="Technologies"
            role="Developer"
            colorVariant="primary"
            profilePic={props.avtar}
            maxVisibleAvatars={3}
          />
          <RdsLabel class="m-2" label={props.message} />
        </div>
      )}
    </div>
  );
};

export default RdsMessageBox;