import React from "react";
import "./rds-community-file-widget.css";
import RdsAvatar from "../rds-avatar";
import RdsIcon from "../rds-icon";
import { AvatarSize, AvatarStyle } from "../rds-avatar/rds-avatar";

export interface RdsCommunityFileWidgetProps {
    cardImage?: string;
    avtar?: string;
    userName?: string;
    followers?: string;
    viewDetails?: string;
    openInChat?: string;
    userTab?: string;
}

const RdsCommunityFileWidget = (props: RdsCommunityFileWidgetProps) => {
  return (
    <div className="community-widget">
      <div className="community-card">
        {/* Wrap image inside a div for hover effect */}
        <div className="image-container">
          <img
            src={props.cardImage}
            className="card-img-top"
            alt="..."
          />
          <div className="image-overlay"></div>
          <div className="hover-buttons">
            <button className="hover-btn">{props.viewDetails}</button>
            <button className="hover-btn">{props.openInChat}</button>
          </div>
        </div>
        <div className="community-card-body">
          <div className="avatar-section">
            <RdsAvatar
              showNameDesignation={false}
              size={AvatarSize.medium}
              type="image"
              style={AvatarStyle.withname}
              firstName="Jane"
              lastName="Doe"
              colorVariant="primary"
              profilePic={props.avtar}
            />
            <div className="user-info">
              <p className="user-name">{props.userName}</p>
              <div className="followers-info">
                <RdsIcon
                  name={props.userTab}
                  colorVariant="primary"
                  width="13px"
                  height="12px"
                />
                <span className="followers-text">{props.followers}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RdsCommunityFileWidget;
