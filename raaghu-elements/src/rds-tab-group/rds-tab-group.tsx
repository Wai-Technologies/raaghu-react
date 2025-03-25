import React, { useState } from "react";
import "./rds-tab-group.css";
import RdsIcon from "../rds-icon";
import RdsLabel from "../rds-label";

export interface TabItem {
  label: string;
  children?: TabItem[]; // Nested tabs
}

export enum TabType {
  Horizontal = "Horizontal",
  Vertical = "Vertical",
}

export enum TabState {
  Default = "Default",
  Hover = "Hover",
  Selected = "Selected",
  Disabled = "Disabled",
}

export interface RdsTabGroupProps {
  level?: number; // Tab level
  type?: TabType; // Tab type
  layout?: string; // Tab layout
  leftIcon?: string; // Tab right icon
  rightIcon?: string; // Tab left icon
  icon?: string; // Tab icon
  state?: TabState; // Tab state
  showLeftIcon?: boolean; // Show left icon
  showRightIcon?: boolean; // Show right icon
  title?: string; // Tab title
}

// Mapping layout prop to CSS classes
const layoutClassesForHorizontal: { [key: string]: string } = {
  "Filled": "horizontal-filled",
  "Flap": "flap",
  "Pill": "pill",
  "Line Bottom": "line-bottom",
  "Line Bottom Solid": "line-bottom-solid",
  "Line Top": "line-top",
  "Line Top Solid": "line-top-solid"
};

const layoutClassesForVertical: { [key: string]: string } = {
  "Vertical-Flap": "vertical-flap",
  "Vertical-Pill": "vertical-pill",
  "Vertical-Left Line": "vertical-left-line",
  "Vertical Line-Left Solid": "vertical-line-left-solid",
  "Vertical-Right Line": "vertical-right-line",
  "Vertical Line-Right Solid": "vertical-line-right-solid",
};

const RdsTabGroup = (props: RdsTabGroupProps) => {
  const [activeTabs, setActiveTabs] = useState<string[]>([]);

  const onClickTab = (label: string) => {
    if (props.state !== TabState.Disabled) {
      setActiveTabs((prev) =>
        prev.includes(label) ? prev.filter((tab) => tab !== label) : [...prev, label]
      );
    }
  };

  // Generate tab list dynamically based on `level`
  const tabList: TabItem[] = Array.from({ length: props.level ?? 3 }, (_, i) => ({
    label: props.title ? `${props.title} ${i + 1}` : `Tab ${i + 1}`,
  }));

  // Recursive function to render nested tabs
  const renderTabs = (tabs: TabItem[], level = 0) => {
    return (
      <div
        style={{ marginLeft: props.type === TabType.Vertical ? level * 20 : 0 }}
        className={`tab-level ${props.state === TabState.Hover ? "tab-hover" : ""} ${props.layout === "Pill" ? "tab-pill" : ""} ${props.type === TabType.Vertical ? (props.layout ? layoutClassesForVertical[props.layout] : "") : (props.layout ? layoutClassesForHorizontal[props.layout] : "")}`}

      >
        {tabs.map((item, index) => (
          <div key={index} className={props.type === TabType.Horizontal ? "d-inline-block" : ""}>
            <div
              className={`tab cursor-pointer px-3 py-2 ${activeTabs.includes(item.label) ? "active" : ""} ${props.state?.toLowerCase()}`}
              onClick={() => onClickTab(item.label)}
            >
              {props.type === TabType.Vertical && (
                <p className="mb-0 d-flex align-items-center">
                  {props.showLeftIcon && (
                    <RdsIcon name={props.leftIcon} height="13px" width="13px" classes="mx-1" />
                  )}
                  <RdsLabel label={item.label} />
                  {props.showRightIcon && (
                    <RdsIcon name={props.rightIcon} height="11px" width="11px" classes="mx-2" />
                  )}
                </p>
              )}
              {props.type === TabType.Horizontal && (
                <p className="mb-0 d-flex align-items-center">
                  {props.showLeftIcon && (
                    <RdsIcon name={props.leftIcon} height="13px" width="13px" classes="mx-1"/>
                  )}
                  <RdsLabel label={item.label} />
                  {props.showRightIcon && (
                    <RdsIcon name={props.rightIcon} height="13px" width="13px" classes="mx-1" />
                  )}
                </p>
              )}
            </div>
            {activeTabs.includes(item.label) && item.children && renderTabs(item.children, level + 1)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {props.type === TabType.Horizontal && (
        <div className={`d-flex ${props.type === TabType.Horizontal ? "flex-row" : ""}`}>
          {renderTabs(tabList)}
        </div>
      )}
      {props.type === TabType.Vertical && (
        <div className={`d-flex ${props.type === TabType.Vertical ? "flex-column" : ""}VerticalWidth`}>
          {renderTabs(tabList)}
        </div>
      )}
    </>
  );
};

export default RdsTabGroup;