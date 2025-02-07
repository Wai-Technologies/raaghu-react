import React, { useEffect, useState } from "react";
import "./rds-breadcrumb.css";
import RdsIcon from "../rds-icon";

export interface BreadcrumbProps {
  breadcrumbItems: any[];
  title?: string;
  style?: "Pill Background" | "Square Background" | "Without Background";
  separator?: ">" | "/" | "→" | "»" | "|" | "-" | "+";
  onBreadcrumbClick?: (id: number) => void;
  topnavPlusIcon?: boolean;
  level?: "Level 1" | "Level 2" | "Level 3" | "Level 4" | "Level 5";
  icon?: string;
  showIcon?: boolean;
  state?: "Default"| "Hover"| "Selected";
}
const handleIconClick = (icon: any) => {
  console.log(`Icon ${icon} clicked`);
};
const RdsBreadcrumb = (props: BreadcrumbProps) => {
  const [data, setData] = useState(() => {
    const initialData = props.breadcrumbItems.map((item, index) => ({
      ...item,
      active: index === props.breadcrumbItems.length - 1, // Set the last item as active by default
    }));
    return initialData;
  });  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  useEffect(() => {
    setData(props.breadcrumbItems);
  }, [props.breadcrumbItems]);

  const levelMap = {
    "Level 1": 1,
    "Level 2": 2,
    "Level 3": 3,
    "Level 4": 4,
    "Level 5": 5,
  };

  const displayedItems = props.level ? data.slice(0, levelMap[props.level]) : data;

  const onClickHandler = (key: number) => {
    if (props.onBreadcrumbClick) {
      props.onBreadcrumbClick(key);
    }
    setData(
      data.map((item) => ({
        ...item,
        active: key === item.id && !item.disabled ? !item.active : false,
      }))
    );
  };
  const styleClass =
  props.style === "Pill Background"
    ? "breadcrumb-pill background-filled"
    : props.style === "Square Background"
    ? "breadcrumb-square background-filled"
    : "";

    const roundedClass =
    props.style === "Pill Background"
      ? "rounded-5 px-2"
      : props.style === "Square Background"
      ? "rounded-2 px-2"
      : "";
  
      return (
        <nav aria-label="breadcrumb">
          <ol className={`breadcrumb m-0  ${props.topnavPlusIcon ? "m-2": ""} `} >
            {displayedItems.map((breadItem, index) => {
              const isLastItem = index === displayedItems.length - 1;
              const isAnyOtherItemActive = displayedItems.some((item, idx) => item.active && idx !== index);
      
              const isHovered = hoveredItem === breadItem.id;
 
              const itemClassNames = `breadcrumb-item 
              ${breadItem.active ? `active ${styleClass}` : ""}
              ${isHovered && props.state === "Hover" ? "breadcrumb-hover" : ""}
              ${breadItem.active && props.state === "Selected" ? "breadcrumb-selected" : ""}
              ${!breadItem.active && !isHovered ? "breadcrumb-default" : ""}
              ${isLastItem && props.style === "Pill Background" && props.state !== "Hover" && props.state !== "Selected" ? "breadcrumb-pill background-filled" : ""}
              ${isLastItem && props.style === "Square Background" && props.state !== "Hover" && props.state !== "Selected" ? "breadcrumb-square background-filled" : ""}
              ${isLastItem && props.style === "Without Background" ? "breadcrumb-no-background ms-2 me-2" : ""}
              ${isLastItem && isAnyOtherItemActive ? roundedClass : roundedClass}
            `;
              
          return (
            <React.Fragment key={breadItem.id}>
              <li
                className={itemClassNames}
                onClick={() => onClickHandler(breadItem.id)}
                onMouseEnter={() => setHoveredItem(breadItem.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {props.showIcon && props.icon && (
                  <span className="me-2">
                    <RdsIcon
                      name={props.icon}
                      fill={breadItem.iconFill}
                      stroke={breadItem.iconstroke}
                      width={breadItem.iconWidth}
                      height={breadItem.iconHeight}
                      colorVariant={breadItem.active ? breadItem.iconColor : ""}
                      isCursorPointer={true}
                      onClick={() => handleIconClick(breadItem.icon)}
                    />
                  </span>
                )}
                <a
                  href={breadItem.route}
                  className="text-decoration-none"
                  onClick={(e) => e.preventDefault()}
                  aria-disabled="true"
                >
                  {props.title || breadItem.label}
                </a>
                {(props.topnavPlusIcon && <span className="ps-2">
                <RdsIcon
                      name="plus"
                      fill={breadItem.iconFill}
                      stroke={breadItem.iconstroke}
                      width={breadItem.iconWidth}
                      height={breadItem.iconHeight}
                      colorVariant={breadItem.active ? breadItem.iconColor : ""}
                      isCursorPointer={true}
                      onClick={() => handleIconClick(breadItem.icon)}
                    />
                </span>)}
              </li>
              {!isLastItem && <li className="breadcrumb-separator">{props.separator}</li>}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default RdsBreadcrumb;
