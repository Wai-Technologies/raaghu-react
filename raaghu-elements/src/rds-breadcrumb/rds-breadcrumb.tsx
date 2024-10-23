import React, { useEffect, useState } from "react";
import "./rds-breadcrumb.css";
import RdsIcon from "../rds-icon";

export interface BreadcrumbProps {
  breadcrumbItems: any[];
  text: string;
  style?: "Pill Background" | "Square Background" | "Without Background";
  separator?: ">" | "/" | "→" | "»" | "|" | "-";
  level?: "Level 1" | "Level 2" | "Level 3" | "Level 4" | "Level 5";
  icon?: string;
  showIcon?: boolean;
}

const RdsBreadcrumb = (props: BreadcrumbProps) => {
  const [data, setData] = useState(props.breadcrumbItems);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

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
    setData(
      data.map((item) => ({
        ...item,
        active: key === item.id && !item.disabled ? !item.active : false,
      }))
    );
  };

  const styleClass =
    props.style === "Pill Background"
      ? "breadcrumb-pill"
      : props.style === "Square Background"
      ? "breadcrumb-square"
      : "";

  const roundedClass =
    props.style === "Pill Background"
      ? "rounded-5 px-2"
      : props.style === "Square Background"
      ? "rounded-2 px-2"
      : "";

  return (
    <nav aria-label="breadcrumb">
      <ol className={`breadcrumb m-0 ${styleClass}`}>
        {displayedItems.map((breadItem, index) => {
          const isLastItem = index === displayedItems.length - 1;

          // Determine item class names based on state
          const itemClassNames = `breadcrumb-item ${
            breadItem.active ? "active" : ""
          } ${isLastItem ? "text-primary" : ""} ${
            isLastItem && props.style !== "Without Background" ? "bg-primary-subtle" : ""
          } ${!isLastItem && breadItem.active && props.style !== "Without Background" ? "breadcrumb-no-bg" : ""} ${roundedClass} ${
            props.style === "Without Background" ? "ms-2 me-2" : ""
          }`; // Adjust class based on hover and state

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
                    />
                  </span>
                )}
                <a
                  href={breadItem.route}
                  className="text-decoration-none"
                  onClick={(e) => e.preventDefault()}
                  aria-disabled="true"
                >
                  {props.text}
                </a>
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
