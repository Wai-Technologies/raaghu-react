import React, { useEffect, useState } from "react";
import "./rds-breadcrumb.css";
import RdsIcon from "../rds-icon";

export enum BreadcrumbStyle {
  PillBackground = "Pill Background",
  SquareBackground = "Square Background",
  WithoutBackground = "Without Background",
}

export enum BreadcrumbSeparator {
  GreaterThan = ">",
  Slash = "/",
  Arrow = "→",
  DoubleArrow = "»",
  Pipe = "|",
  Dash = "-",
  Plus = "+",
}

export enum BreadcrumbLevel {
  Level1 = "Level 1",
  Level2 = "Level 2",
  Level3 = "Level 3",
  Level4 = "Level 4",
  Level5 = "Level 5",
}

export enum BreadcrumbState {
  Default = "Default",
  Hover = "Hover",
  Selected = "Selected",
}

export interface BreadcrumbProps {
  breadcrumbItems: any[];
  title?: string;
  style?: BreadcrumbStyle;
  separator?: BreadcrumbSeparator;
  onBreadcrumbClick?: (id: number) => void;
  topnavPlusIcon?: boolean;
  level?: BreadcrumbLevel;
  icon?: string;
  showIcon?: boolean;
  state?: BreadcrumbState;
  borderColor?: string; // Add borderColor prop
  borderPlacement?: string; // Add border-placement prop
  titles?: string[]; // Array of titles for each breadcrumb level
  icons?: string[];  // Array of icons for each breadcrumb level
}

const handleIconClick = (icon: any) => {};

const RdsBreadcrumb = (props: BreadcrumbProps) => {
  const [data, setData] = useState(() => {
    
    const initialData = props.breadcrumbItems.map((item, index) => ({
      ...item,
      active: index === props.breadcrumbItems.length - 1, // Set the last item as active by default
    }));
    return initialData;
  });

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

  const displayedItems = props.level
    ? data.slice(0, levelMap[props.level]) // Slice based on level
    : data;

  // Modified click handler to deselect last item when another one is clicked
  const onClickHandler = (key: number) => {
    if (props.onBreadcrumbClick) {
      props.onBreadcrumbClick(key);
    }

    setData((prevData) =>
      prevData.map((item) => {
        // Deselect the last item when any other item is clicked
        // if (item.id === prevData[prevData.length - 1]?.id) {
        //   return { ...item, active: false }; // Deselect last item
        // }
        // Keep the clicked item active
        return { ...item, active: item.id === key };
      })
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
      <ol className={`breadcrumb m-0 ${props.topnavPlusIcon ? "m-2" : ""}`}>
        {displayedItems.map((breadItem, index) => {
          const isLastItem = index === displayedItems.length - 1;
          const isHovered = hoveredItem === breadItem.id;

          // Dynamically determine item class names based on state
          const itemClassNames = [
            'breadcrumb-item',
            breadItem.active ? 'active' : '',
            isHovered && props.state === 'Hover' ? 'breadcrumb-hover' : '',
            breadItem.active && props.state === 'Selected' ? 'breadcrumb-selected' : '',
            !breadItem.active && !isHovered ? 'breadcrumb-default' : '',
            isLastItem && props.style === 'Pill Background' ? 'breadcrumb-pill background-filled' : '',
            isLastItem && props.style === 'Square Background' ? 'breadcrumb-square background-filled' : '',
            isLastItem && props.style === 'Without Background' ? 'breadcrumb-no-background ms-2 me-2' : '',
            isLastItem ? roundedClass : '',
          ].filter(Boolean).join(' ');

          // Always apply border style to last item if borderColor and borderPlacement are set
          const itemStyle = breadItem.active && props.borderColor && props.borderPlacement
            ? (props.borderPlacement === 'top'
                ? { borderTop: `2px solid ${props.borderColor}` }
                : { borderBottom: `2px solid ${props.borderColor}` })
            : {};

          // Allow last item to be clickable regardless of state
          const isClickable = true;

          return (
            <React.Fragment key={breadItem.id}>
              <li
                className={itemClassNames}
                onClick={() => isClickable && onClickHandler(breadItem.id)}
                onMouseEnter={() => setHoveredItem(breadItem.id)}
                onMouseLeave={() => setHoveredItem(null)}
                style={itemStyle}
              >
                {(() => {
                  const resolvedIconName = props.icons && props.icons.length > index ? props.icons[index] : breadItem.icon || "IN";
                 
                  return (
                    props.showIcon && (
                      <span className="me-2">
                        <RdsIcon
                          name={resolvedIconName}
                          fill={breadItem.iconFill}
                          stroke={breadItem.iconstroke}
                          width={breadItem.iconWidth}
                          height={breadItem.iconHeight}
                          colorVariant={breadItem.active ? breadItem.iconColor : ""}
                          isCursorPointer={true}
                          onClick={() => handleIconClick(breadItem.icon)}
                        />
                      </span>
                    )
                  );
                })()}
                <a
                  href={breadItem.route}
                  className="text-decoration-none"
                  onClick={(e) => e.preventDefault()}
                  aria-disabled="true"
                >
                  {props.titles && props.titles[index] ? props.titles[index] : breadItem.label || "Default Value"} 
                </a>
                {props.topnavPlusIcon && (
                  <span className="ps-2">
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
                  </span>
                )}
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
