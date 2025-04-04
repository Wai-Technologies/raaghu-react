import React, { useState } from "react";
import "./rds-side-bar.css";
import RdsButton from "../rds-button";
import RdsIcon from "../rds-icon";
import Tooltip from "../rds-tooltip";
import { TooltipStyle } from "../rds-tooltip/rds-tooltip";

export interface NavItem {
  icon: string;
  label: string;
  action: string;
  colorVariant?: string;
  style?: string;
  stroke?: boolean;
}

export interface NavGroup {
  header?: string;
  items: NavItem[];
  className?: string;
}

export interface RdsSidebarProps {
  // Legacy props for backward compatibility
  labels?: string[];
  icons?: string[];
  // New more flexible props
  topItems?: NavItem[];
  middleGroups?: NavGroup[];
  bottomItems?: NavItem[];
  // Callbacks
  onButtonClick?: (action: string) => void;
  onToggle?: (isCollapsed: boolean) => void;
  // Initial state
  initialCollapsed?: boolean;
}

const RdsSidebar = (props: RdsSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(
    props.initialCollapsed || false
  );

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (props.onToggle) {
      props.onToggle(newCollapsedState);
    }
  };

  const handleButtonClick = (action: string) => {
    if (props.onButtonClick) {
      props.onButtonClick(action);
    }
  };

  // Default items based on the image
  const defaultTopItems: NavItem[] = [
    {
      icon: "new_chat",
      label: "New Chat",
      action: "new_chat",
      colorVariant: "light",
      style: "outline",
    },
  ];

  const defaultMiddleGroups: NavGroup[] = [
    {
      className: "recents-dashboard rounded-2 p-2 px-3",
      items: [{
        icon: "recents_icon", 
        label: "SAAS Dashboard",
        action: "saas_dashboard",
        colorVariant: "primary",
        style: "transparent",
        stroke: false,
      }],
    },
  ];

  const defaultBottomItems: NavItem[] = [
    {
      icon: "community",
      label: "Community",
      action: "community",
      colorVariant: "light",
      style: "transparent",
    },
    {
      icon: "chat_help",
      label: "Help",
      action: "help",
      colorVariant: "light",
      style: "transparent",
    },
    {
      icon: "activity",
      label: "Activity",
      action: "activity",
      colorVariant: "light",
      style: "transparent",
    },
    {
      icon: "chat_settings",
      label: "Settings",
      action: "settings",
      colorVariant: "light",
      style: "transparent",
    },
  ];

  // Support legacy props format if provided
  let topItems = props.topItems || defaultTopItems;
  let middleGroups = props.middleGroups || defaultMiddleGroups;
  let bottomItems = props.bottomItems || defaultBottomItems;

  // If legacy props are provided, convert them to the new format
  if (props.labels && props.icons) {
    const legacyItems: NavItem[] = props.labels.map((label, index) => {
      const icon = props.icons?.[index] || "";
      return {
        icon,
        label,
        action: label.toLowerCase().replace(/\s+/g, "_"),
        colorVariant: index === 0 ? "light" : index === 1 ? "dark" : "primary",
        style: index === 0 ? "outline" : "transparent",
        // Set stroke to false for specific icons
        stroke: !["saas_chat", "recents_icon", "recent"].includes(icon),
      };
    });

    if (legacyItems.length > 0) {
      topItems = [legacyItems[0]];
    }

    if (legacyItems.length > 1) {
      middleGroups = [
        {
          className: "recents-dashboard rounded-2 p-2 px-3",
          items: legacyItems.slice(1, 3),
        },
      ];
    }

    if (legacyItems.length > 3) {
      bottomItems = legacyItems.slice(3);
    }
  }

  const renderNavButton = (item: NavItem) => {
    // Always show tooltip regardless of sidebar state
    return (
      <Tooltip
        key={item.action}
        label={item.label}
        style={TooltipStyle.MiddleTopArrow}
      >
        <RdsButton
          class={`${isCollapsed ? "collapsed-button" : "wide-button"} ${item.icon === "recents_icon" || item.icon === "recent" ? "recent-icon" : ""}`}
          badgeLayout="Text_only"
          badgeState="default"
          badgeStyle={item.colorVariant || "primary"}
          colorVariant={item.colorVariant || "primary"}
          displayType="Icon + Text"
          icon={item.icon}
          label={isCollapsed ? "" : item.label}
          shape="rectangle"
          size="medium"
          state="hover"
          style={item.style || "transparent"}
          textCase="unset"
          onClick={() => handleButtonClick(item.action)}
          tooltip={true}
          tooltipPlacement={TooltipStyle.MiddleTopArrow}
          tooltipTitle={item.label}
        />
      </Tooltip>
    );
  };

  return (
    <div
      className={`background-color rds-sidebar ${
        isCollapsed ? "collapsed" : ""
      } d-flex flex-column justify-content-between vh-100 `}
    >
      <div className="d-flex flex-column justify-content-between vh-100 text">
        <div>
          {/* Collapse button with tooltip */}
          <div className={`icon-wrapper ms-2 ${isCollapsed ? "collapsed" : ""}`}>
            <Tooltip
              label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              style={TooltipStyle.MiddleTopArrow}
            >
              <RdsIcon
                colorVariant="primary"
                height="15px"
                isCursorPointer
                name={isCollapsed ? "interface_arrow_right" : "interface_arrow_left"}
                stroke
                width="10px"
                onClick={toggleSidebar}
              />
            </Tooltip>
          </div>

          {/* Top section (New Chat) */}
          <div className="chat-input-container">
            <div className="pb-3">{topItems.map(renderNavButton)}</div>
          </div>

          {/* Middle section (Recents header, SAAS Dashboard) */}
          {middleGroups.map((group, groupIndex) => (
            <div key={groupIndex} className={group.className || "my-3 button-sidebar"}>
              {group.header && !isCollapsed && (
                <div className="section-header px-2 py-1">
                  <span className="text-secondary fw-medium icon">
                    {group.header}
                  </span>
                </div>
              )}
              {group.items.map((item, index) => (
                <div key={index} className="dashboard">
                  {renderNavButton(item)}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom section (Community, Help, Activity, Settings) */}
        <div className="recents-dashboard rounded-2 p-2 mb-5 px-3" id="side-bar-icons">
          {bottomItems.map((item, index) => (
            <div
              key={index}
              id={`bottom-item-${item.action}`}
              className={`dashboard ${index === 0 ? "recents" : ""} bottom-item-${index}`}
            >
              {renderNavButton(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RdsSidebar;