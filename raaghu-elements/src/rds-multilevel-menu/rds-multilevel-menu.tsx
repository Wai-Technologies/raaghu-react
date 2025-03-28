import React, { useState } from "react";
import RdsIcon from "../rds-icon";
import "../../../raaghu-react-themes/src/styles/multilevel-menu.scss";

export enum MenuSize {
  Default = "default",
  Large = "large",
}

export enum MenuType {
  Selectable = "selectable",
  Expandable = "expandable",
}

export enum MenuState {
  Default = "default",
  Hover = "hover",
  Selected = "selected",
}

export interface RdsMultilevelMenuProps {
  size?: MenuSize; // size of the menu
  type?: MenuType; // type of the menu
  state?: MenuState; // state of the menu
}

const defaultItems = [
  { id: "1", label: "Option", shortcut: "shortcut" },
  { id: "2", label: "Option", shortcut: "shortcut" },
  {
    id: "3", label: "Option", shortcut: "shortcut", submenu: true,
    children: [
      { id: "3-1", label: "Option", shortcut: "shortcut" },
      { id: "3-2", label: "Option", shortcut: "shortcut", submenu: true },
      { id: "3-3", label: "Option", shortcut: "shortcut" },
    ]
  },
  { id: "4", label: "Option", shortcut: "shortcut" },
  { id: "5", label: "Option", shortcut: "shortcut" },
  { id: "6", label: "Option", shortcut: "shortcut" },
];

const largeItem = [
  { id: "1", label: "Option", shortcut: "shortcut" },
  { id: "2", label: "Option", shortcut: "shortcut" },
  {
    id: "3", label: "Option", shortcut: "shortcut", submenu: true,
    children: [
      { id: "3-1", label: "Option", shortcut: "shortcut" },
      { id: "3-2", label: "Option", shortcut: "shortcut", submenu: true },
      { id: "3-3", label: "Option", shortcut: "shortcut" },
    ]
  },
  { id: "4", label: "Option", shortcut: "shortcut" },
  { id: "5", label: "Option", shortcut: "shortcut" },
  { id: "6", label: "Option", shortcut: "shortcut" },
  {
    id: "7", label: "Option", shortcut: "shortcut", submenu: true,
    children: [
      { id: "7-1", label: "Option", shortcut: "shortcut" },
      { id: "7-2", label: "Option", shortcut: "shortcut", submenu: true },
      { id: "7-3", label: "Option", shortcut: "shortcut" },
    ]
  },
  { id: "8", label: "Option", shortcut: "shortcut" },
];

const RdsMultilevelMenu = (props: RdsMultilevelMenuProps) => {
  const { type, size = "default", state = "default" } = props;
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleMenuOpen = (id: string) => {
    setExpandedItems((prev) => {
      const newState: { [key: string]: boolean } = {};
      newState[id] = !prev[id];
      return newState;
    });
    setSelectedItem(id);
  };

  const handleMouseEnter = (id: string) => {
    setHoveredItem(id);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleItemClick = (id: string) => {
    setSelectedItem(id);
    setExpandedItems({});
  };

  const itemsList = size === "large" ? largeItem : defaultItems;

  return (
    <div className="row">
      <ul className="shadow col-4 m-2 rounded" style={{ listStyleType: "none", padding: 0, minWidth: "200px" }}>
        {itemsList.map((item) => {
          const isHovered = hoveredItem === item.id;
          const isSelected = selectedItem === item.id;

          return (
            <div key={item.id}>
              <li
                className={`cursor-pointer d-flex justify-content-between align-items-center p-2 position-relative 
          ${isHovered ? "menu-hover" : ""}
          ${isSelected ? "menu-selected" : ""}`}
                style={{ transition: "background-color 0.2s" }}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleItemClick(item.id)}
              >
                <label style={{ cursor: "pointer" }}>
                  <span>{item.label}</span>
                </label>
                {type === "expandable" && item.submenu ? (
                  <span onClick={(e) => { e.stopPropagation(); handleMenuOpen(item.id); }} style={{ cursor: "pointer" }}>
                    <RdsIcon
                      name={"chevron_right"}
                      fill={false}
                      stroke={true}
                      colorVariant="dark"
                      isCursorPointer={true}
                      width="18px"
                      height="18px"
                    />
                  </span>
                ) : (
                  <span>{item.shortcut}</span>
                )}

                {/* Submenu */}
                {expandedItems[item.id] && item.children && (
                  <ul
                    className="shadow rounded position-absolute"
                    style={{
                      listStyleType: "none",
                      padding: "0px",
                      top: "0%",
                      left: "105%",
                      minWidth: "100%",
                      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    {item.children.map((child) => {
                      const isChildHovered = hoveredItem === child.id;
                      const isChildSelected = selectedItem === child.id;
                      return (
                        <div key={child.id}>
                          <li
                            className={`cursor-pointer d-flex justify-content-between align-items-center p-2
                      ${isChildHovered ? "menu-hover" : ""}
                      ${isChildSelected ? "menu-selected" : ""}`}
                            style={{ transition: "background-color 0.2s" }}
                            onMouseEnter={() => handleMouseEnter(child.id)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleItemClick(child.id)}
                          >
                            <label style={{ cursor: "pointer" }}>
                              <span>{child.label}</span>
                            </label>
                            {type === "expandable" && child.submenu ? (
                              <span onClick={(e) => { e.stopPropagation(); handleMenuOpen(child.id); }} style={{ cursor: "pointer" }}>
                                <RdsIcon
                                  name={"chevron_right"}
                                  fill={false}
                                  stroke={true}
                                  colorVariant="dark"
                                  isCursorPointer={true}
                                  width="18px"
                                  height="18px"
                                />
                              </span>
                            ) : (
                              <span>{child.shortcut}</span>
                            )}
                          </li>
                          {item.children && child !== item.children[item.children.length - 1] && (
                            <hr className="m-0 border-gray-300" />
                          )}
                        </div>
                      );
                    })}
                  </ul>
                )}
              </li>
              {item !== itemsList[itemsList.length - 1] && <hr className="m-0 border-gray-300" />}
            </div>
          );
        })}

      </ul>
    </div>
  );
};

export default RdsMultilevelMenu;