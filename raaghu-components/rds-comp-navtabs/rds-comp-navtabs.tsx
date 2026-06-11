import React, { ReactNode, useEffect, useState } from "react";
import "./rds-comp-navtabs.scss";
import RdsBadge from "../../raaghu-elements/rds-badge/rds-badge"; 

export interface RdsCompNavtabsProps {
  children?: ReactNode;
  navtabsItems: {
    label: string;
    tablink?: string;
    ariacontrols?: string;
    icon?: string;
    subText?: string;
    disabled?: boolean;
    id: string | number;
    count?: number; 
    colorVariant?: "primary" | "secondary" | "tertiary" | "danger" | "warning" | "light" | "success";  
  }[];
  type: "default" | "tabs";
  fill?: boolean;
  justified?: boolean;
  activeNavtabOrder?: (id: string | number | undefined) => void;
  activeNavTabId?: string | number;
  isNextPressed?: boolean;
  onClick?: React.MouseEvent<HTMLElement>;
  layout?: string;
  style?: string;
  iconOnly?: boolean;
  id?: string;
}

const RdsCompNavtabs = (props: RdsCompNavtabsProps) => {
  const [activeNavTabId, setActiveNavTabId] = useState(props.activeNavTabId);
  const [navStyle, setNavStyle] = useState<string | undefined>(props.style);

  useEffect(() => {
    if (props.layout === "Vertical") {
      setNavStyle("Vertical -Alt Right Line");
    } else if (props.layout === "Horizontal") {
      setNavStyle("Bottom Select");
    }
  }, [props.layout]);
  
  useEffect(() => {
    props.activeNavtabOrder && props.activeNavtabOrder(activeNavTabId);
  }, [activeNavTabId]);

  useEffect(() => {
    setActiveNavTabId(props.activeNavTabId);
  }, [props.activeNavTabId]);

  if (!props.navtabsItems || props.navtabsItems.length === 0) {
    return null;
  }

  const getNavClasses = () => {
    const horizontalStyles = [
      "Bottom Select",
      "Top Select",
      "Bottom Select Alt",
      "Top Select Alt",
      "Background Filled",
      "Pill"
    ];
    
    const isHorizontalStyle = horizontalStyles.includes(props.style || "");
    const classes = ["rds-comp-navtabs__nav", "nav", "fit-content", "mobile-ul-tabs", "navtabs-icon-align", "nav-tabs"];
    
    if (props.id !== "chat") {
      classes.push("d-md-block");
    }
    
    if (isHorizontalStyle) {
      classes.push("d-flex", "flex-row", "rds-comp-navtabs__nav--horizontal");
    }
    
    switch (props.style) {
      case "Top Select":
        classes.push("top-select", "rds-comp-navtabs__nav--top-select");
        break;
      case "Bottom Select":
        classes.push("bottom-select", "rds-comp-navtabs__nav--bottom-select");
        break;
      case "Bottom Select Alt":
        classes.push("bottom-select-alt", "rds-comp-navtabs__nav--bottom-select-alt");
        break;
      case "Top Select Alt":
        classes.push("top-select-alt", "rds-comp-navtabs__nav--top-select-alt");
        break;
      case "Background Filled":
        classes.push("background-filled", "rds-comp-navtabs__nav--background-filled");
        break;
      case "Pill":
        classes.push("nav-pills", "rds-comp-navtabs__nav--pills");
        break;
      case "Select Tabs":
        classes.push("select-tabs");
        break;
      case "Vertical -Alt Right Line":
        classes.push("vertical-alt-right-line", "rds-comp-navtabs__nav--vertical-alt-right-line");
        break;
      case "Vertical -Alt Left Line":
        classes.push("vertical-alt-left-line", "rds-comp-navtabs__nav--vertical-alt-left-line");
        break;
      case "Vertical -Left Line":
        classes.push("vertical-left-line", "rds-comp-navtabs__nav--vertical-left-line");
        break;
      case "Vertical -Right Line":
        classes.push("vertical-right-line", "rds-comp-navtabs__nav--vertical-right-line");
        break;
      case "Vertical -Left Filled":
        classes.push("vertical-leftFilled", "rds-comp-navtabs__nav--vertical-left-filled");
        break;
      case "Vertical -Pointer":
        classes.push("vertical-pointer", "rds-comp-navtabs__nav--vertical-pointer");
        break;
      case "Vertical -Flap":
        classes.push("vertical-flap", "rds-comp-navtabs__nav--vertical-flap");
        break;
      case "pills":
        classes.push("nav-pills", "rds-comp-navtabs__nav--pills");
        break;
      case "tabs":
        classes.push("flex-lg-row", "flex-md-row", "flex-xl-row", "flex-xxl-row", "justify-content-start", "nav-tabs", "pb-0", "pb-lg-0", "pb-md-0", "pb-xl-0", "pb-xxl-0");
        break;
      default:
        classes.push("nav-tabs");
    }

    if (props.type === "tabs") {
      classes.push("text-primary");
    }

    if (props.layout === "vertical") {
      classes.push("col-12", "d-block", "rds-comp-navtabs__nav--vertical");
    }

    if (props.fill) {
      classes.push("nav-fill");
    }
    if (props.justified) {
      classes.push("nav-justified");
    }
    if (props.iconOnly) {
      classes.push("nav-icon-only", "rds-comp-navtabs__nav--icon-align");
    }

    return classes.join(" ");
  };

  const getNavLinkClasses = (navtabsItem: RdsCompNavtabsProps['navtabsItems'][number]) => {
    const classes = ["nav-link", "pe-auto", "mt-2", "rds-comp-navtabs__nav-link"];
    
    if (props.type === "tabs") {
      classes.push("rounded-0");
    } else if (props.layout === "Vertical") {
      classes.push("rounded-2");
    }

    if (navtabsItem.id === activeNavTabId) {
      classes.push("rds-comp-navtabs__nav-link--active");
      
      const activeStyles = [
        "Top Select", "Bottom Select", "Bottom Select Alt", "Top Select Alt",
        "Background Filled", "Pill", "Select Tabs", "Vertical -Alt Right Line",
        "Vertical -Alt Left Line", "Vertical -Left Line", "Vertical -Right Line",
        "Vertical -Left Filled", "Vertical -Pointer", "Vertical -Flap"
      ];
      
      if (activeStyles.includes(props.style || "")) {
        classes.push("selected", "rds-comp-navtabs__nav-link--selected");
      } else if (props.type === "tabs") {
        classes.push("border-bottom", "border-primary", "border-3", "text-primary");
      } else {
        classes.push("active");
      }
    } else {
      classes.push("inactive", "rds-comp-navtabs__nav-link--inactive");
    }

    if (navtabsItem.disabled) {
      classes.push("disabled");
    }

    return classes.join(" ");
  };

  return (
    <div className="rds-comp-navtabs">
      <ul
        className={getNavClasses()}
        id={props.id === "features" ? "features" : ""}
      >
        {props.navtabsItems.map((navtabsItem) => (
          <li
            className={`nav-item py-0 cursor-pointer rds-comp-navtabs__nav-item ${navtabsItem.disabled ? 'rds-comp-navtabs__nav-item--disabled' : ''}`}
            key={navtabsItem.id}
          >
            <a
              className={getNavLinkClasses(navtabsItem)}
              aria-current="page"
              data-bs-target={navtabsItem.tablink}
              aria-controls={navtabsItem.ariacontrols}
              onClick={() => setActiveNavTabId(navtabsItem.id)}
            >
              {!props.iconOnly && (
                <span className="fw-medium px-3 rds-comp-navtabs__label">{navtabsItem.label}</span>
              )}
              {navtabsItem.count && navtabsItem.count > 0 && (
                <span className="rds-comp-navtabs__badge">
                  <RdsBadge 
                    shape="pill" 
                    size="small" 
                    colorVariant={navtabsItem.colorVariant}
                    className="" 
                  />
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
      {props.children}
    </div>
  );
};
RdsCompNavtabs.displayName = "RdsCompNavtabs";
export default RdsCompNavtabs;