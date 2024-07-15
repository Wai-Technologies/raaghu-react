import React, { useState, ReactNode } from "react";
import { RdsIcon } from "../rds-elements";
import "./rds-comp-collapsible-container.style.css";

export interface MenuItem {
  id?: string;
  name?: string;
  icon?: string;
  component?: ReactNode;
}

export interface RdsCompCollapsibleContainerProps {
  position: "right" | "left";
  menuItems: MenuItem[];
}

const RdsCompCollapsibleContainer = (
  props: RdsCompCollapsibleContainerProps
) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`wrapperContainer justify-content-md-start justify-content-xl-end ${props.position}`}
    >
      {props.position === "right" && (
        <div className="leftChevronPosition">
          <div className="chevron-container">
            <RdsIcon
              name={isCollapsed ? "chevron_left" : "chevron_right"}
              width="22px"
              height="11px"
              onClick={toggleCollapse}
              classes="collapse-button-for-container"
            />
          </div>
        </div>
      )}
      <div
        className={`container-collapse mb-4 mb-lg-0 ${
          isCollapsed ? "collapsed-container" : ""
        }`}
      >
        <div className="content">
          {Array.isArray(props.menuItems) &&
            props.menuItems.map((item, index) => (
              <div className="menu-item-collapsible-container" key={index}>
                {item.icon && (
                  <RdsIcon
                    name={item.icon}
                    width="20px"
                    height="20px"
                    fill={false}
                    classes="mx-3"
                    tooltip={true}
                    tooltipTitle={item.name}
                    tooltipPlacement="top"
                  />
                )}
                {!isCollapsed && item.name && <span>{item.name}</span>}
                <div className="px-3">{item.component && item.component}</div>
              </div>
            ))}
        </div>
      </div>
      {props.position === "left" && (
        <div className="rightChevronPosition">
          <div className="chevron-container">
            <RdsIcon
              name={isCollapsed ? "chevron_right" : "chevron_left"}
              width="22px"
              height="11px"
              onClick={toggleCollapse}
              classes="collapse-button-for-container"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RdsCompCollapsibleContainer;
