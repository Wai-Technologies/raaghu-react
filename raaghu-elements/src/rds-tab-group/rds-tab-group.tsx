import React, { useState } from "react";
import "./rds-tab-group.css";
import RdsIcon from "../rds-icon";
import RdsLabel from "../rds-label";

export interface TabItem {
  label: string;
  children?: TabItem[]; // Nested tabs
}

export interface RdsTabGroupProps {
  level?: number; //tab level
  layout?: "Horizontal" | "Vertical"; // Layout type
  style?: string; // Tab style
  iconName?: string; //tab right icon
  iconSelect?: string; //tab left icon
  icon?: string;
}

// Mapping style prop to CSS classes
const styleClassesForHorizontal: { [key: string]: string } = {
  "Bottom Select": "bottom-select",
  "Top Select": "top-select",
  "Bottom Select Alt": "bottom-select-alt",
  "Top Select Alt": "top-select-alt",
  "Background Filled": "background-filled",
  "Pill": "pill-style",
  "Select Tabs": "select-tabs",

};

const styleClassesForVertical: { [key: string]: string } = {
  "Vertical-Alt Right Line": "vertical-alt-right-line",
  "Vertical-Alt Left Line": "vertical-alt-left-line",
  "Vertical-Left Line": "vertical-left-line",
  "Vertical-Right Line": "vertical-right-line",
  "Vertical-Left Filled": "vertical-left-filled",
  "Vertical-Pointer": "vertical-pointer",
  "Vertical-Flap": "vertical-flap",
};

const RdsTabGroup = (props: RdsTabGroupProps) => {
  const [activeTabs, setActiveTabs] = useState<string[]>([]);

  const onClickTab = (label: string) => {
    setActiveTabs((prev) =>
      prev.includes(label) ? prev.filter((tab) => tab !== label) : [...prev, label]
    );
  };

  // Generate tab list dynamically based on `level`
  const tabList: TabItem[] = Array.from({ length: props.level ?? 3 }, (_, i) => ({
    label: `Tab ${i + 1}`,
  }));

  // Recursive function to render nested tabs
  const renderTabs = (tabs: TabItem[], level = 0) => {
    return (
      <div
        style={{ marginLeft: props.layout === "Vertical" ? level * 20 : 0 }}
        // className={`tab-level ${props.style ? styleClassesForHorizontal[props.style] : ""}`}
        className={`tab-level ${props.layout === "Vertical" ? (props.style ? styleClassesForVertical[props.style] : "") : (props.style ? styleClassesForHorizontal[props.style] : "")}`}
      >
        {tabs.map((item, index) => (
          <div key={index} className={props.layout === "Horizontal" ? "d-inline-block" : ""}>
            <div
              className={`tab cursor-pointer px-3 py-2 ${activeTabs.includes(item.label) ? "active" : ""}`}
              onClick={() => onClickTab(item.label)}
            >
              {props.layout === "Vertical" && (
                <p className="mb-0 d-flex align-items-center">
                  <RdsIcon name={props.iconSelect} height="13px" width="13px" classes="mx-1" />
                  <RdsLabel label={item.label} />
                  <RdsIcon name={props.icon} height="11px" width="11px" classes="mx-2" />
                </p>
              )}
              {props.layout === "Horizontal" && (
                <p className="mb-0 d-flex align-items-center">
                  <RdsIcon name={props.iconName} height="13px" width="13px" classes="mx-1"/>
                  <RdsLabel label={item.label} />
                  <RdsIcon name={props.iconSelect} height="13px" width="13px" classes="mx-1" />
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
      {props.layout === "Horizontal" && (
        <div
          className={`d-flex ${props.layout === "Horizontal" ? "flex-row" : ""}`}
        >
          {renderTabs(tabList)}
        </div>
      )}
      {props.layout === "Vertical" && (
        <div
          className={`d-flex ${props.layout === "Vertical" ? "flex-column" : ""}VerticalWidth`}
        >
          {renderTabs(tabList)}
        </div>
      )}
    </>
  );
};

export default RdsTabGroup;
