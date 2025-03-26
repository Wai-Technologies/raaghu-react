import React, { useState } from "react";
import "./rds-side-bar.css";
import RdsButton from "../rds-button";
import RdsIcon from "../rds-icon";

export interface RdsSidebarProps {
  labels?: string[];
}
const RdsSidebar = (props: RdsSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`background-color rds-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className={`icon-wrapper ${isCollapsed ? "collapsed" : ""}`}>
        <RdsIcon
          colorVariant="primary"
          height="15px"
          isCursorPointer
          name="collapsibe_expand"
          stroke
          width="15px"
          onClick={toggleSidebar}
        />
      </div>
      <div className="chat-input-container ">
        <div className="pb-3">
          <div className="recents">
            <RdsButton class="buttonWidth color"
              badgeLayout="Text_only"
              badgeState="default"
              badgeStyle="light"
              colorVariant="light"
              databstoggle="tooltip"
              displayType="Icon + Text"
              icon="new_chat"
              label={isCollapsed ? "" : (props.labels ? props.labels[0] : "New Chat")}
              shape="rectangle"
              size="medium"
              state="hover"
              style="outline"
              textCase="unset"
              tooltipTitle="This is tooltip"
            />
          </div>
        </div>
      </div>

      <div className="recents-dashboard">
        <div className="">
          <div className="recents">
            <RdsButton class="color"
              badgeLayout="Text_only"
              badgeState="default"
              badgeStyle="dark"
              colorVariant="dark"
              databstoggle="tooltip"
              displayType="Icon + Text"
              icon="recent"
              label={isCollapsed ? "" : (props.labels ? props.labels[1] : "Recent")}
              shape="rectangle"
              size="medium"
              state="hover"
              style="transparent"
              textCase="unset"
              tooltipTitle="This is tooltip"
            />
          </div>
          <div className="dashboard ">
            <RdsButton
              badgeLayout="Text_only"
              badgeState="default"
              badgeStyle="primary"
              colorVariant="primary"
              databstoggle="tooltip"
              displayType="Icon + Text"
              icon="saas_chat"
              label={isCollapsed ? "" : (props.labels ? props.labels[2] : "SAAS Dashboard")}
              shape="rectangle"
              size="medium"
              state="hover"
              style="transparent"
              textCase="unset"
              id="saas_chats"
              tooltipTitle="This is tooltip"
            />
          </div>
        </div>
      </div>
      <div className="h-100">
        <div className="recents-dashboard mt-7">
          <div className="recents">
            <RdsButton
              badgeLayout="Text_only"
              badgeState="default"
              badgeStyle="primary"
              colorVariant="primary"
              databstoggle="tooltip"
              displayType="Icon + Text"
              icon="community"
              label={isCollapsed ? "" : (props.labels ? props.labels[3] : "Community")}
              shape="rectangle"
              size="medium"
              state="hover"
              style="transparent"
              textCase="unset"
              tooltipTitle="This is tooltip"
            />
          </div>
          <div className="dashboard">
            <RdsButton
              badgeLayout="Text_only"
              badgeState="default"
              badgeStyle="primary"
              colorVariant="primary"
              databstoggle="tooltip"
              displayType="Icon + Text"
              icon="chat_help"
              label={isCollapsed ? "" : (props.labels ? props.labels[4] : "Help")}
              shape="rectangle"
              size="medium"
              state="hover"
              style="transparent"
              textCase="unset"
              tooltipTitle="This is tooltip"
            />
          </div>
          <div className="dashboard">
            <RdsButton
              badgeLayout="Text_only"
              badgeState="default"
              badgeStyle="primary"
              colorVariant="primary"
              databstoggle="tooltip"
              displayType="Icon + Text"
              icon="activity"
              label={isCollapsed ? "" : (props.labels ? props.labels[5] : "Activity")}
              shape="rectangle"
              size="medium"
              state="hover"
              style="transparent"
              textCase="unset"
              tooltipTitle="This is tooltip"
            />
          </div>
          <div className="dashboard">
            <RdsButton
              badgeLayout="Text_only"
              badgeState="default"
              badgeStyle="primary"
              colorVariant="primary"
              databstoggle="tooltip"
              displayType="Icon + Text"
              icon="chat_settings"
              label={isCollapsed ? "" : (props.labels ? props.labels[6] : "Settings")}
              shape="rectangle"
              size="medium"
              state="hover"
              style="transparent"
              textCase="unset"
              tooltipTitle="This is tooltip"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RdsSidebar;