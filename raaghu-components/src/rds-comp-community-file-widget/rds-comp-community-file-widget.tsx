import React from "react";
import "./rds-comp-community-file-widget.css";
import RdsAvatar from "../../../raaghu-elements/src/rds-avatar";
import { AvatarSize, AvatarStyle } from "../../../raaghu-elements/src/rds-avatar/rds-avatar";

export interface RdsCompCommunityFileWidgetProps {
    cardImage?: string;
    avtar?: string;
    userName?: string;
    viewDetails?: string;
    openInChat?: string;
}

const RdsCompCommunityFileWidget = (props: RdsCompCommunityFileWidgetProps) => {
  return (
    <div className="community-widget">
      <div className="community-card">
        <div className="image-container">
          <img
            src={props.cardImage}
            className="card-img-top"
            alt="..."
          />
          <div className="image-overlay"></div>      
          <div className="avatar-section">
            <RdsAvatar
              activeDotTop
              firstName="Jane"
              lastName="Doe"
              colorVariant="primary"
              profilePic={props.avtar}
              size={AvatarSize.medium}
              style={AvatarStyle.withname}
              type="image"
            />
            <div className="user-info">
              <p className="user-name">{props.userName}</p>
            </div>
          </div>
          
          <div className="community-hover-button">
            <button className="hover-btn open-chat-btn">{props.openInChat}</button>
            <button className="hover-btn view-details-btn">{props.viewDetails}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RdsCompCommunityFileWidget;