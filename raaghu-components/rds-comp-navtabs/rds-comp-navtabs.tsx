import clsx from "clsx";
import { type ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import "./rds-comp-navtabs.scss";
import RdsBadge from "../../raaghu-elements/rds-badge/rds-badge";

const STYLE_EXTRA_CLASSES: Record<string, string[]> = {
  "Top Select": ["top-select", "rds-comp-navtabs__nav--top-select"],
  "Bottom Select": ["bottom-select", "rds-comp-navtabs__nav--bottom-select"],
  "Bottom Select Alt": ["bottom-select-alt", "rds-comp-navtabs__nav--bottom-select-alt"],
  "Top Select Alt": ["top-select-alt", "rds-comp-navtabs__nav--top-select-alt"],
  "Background Filled": ["background-filled", "rds-comp-navtabs__nav--background-filled"],
  "Pill": ["nav-pills", "rds-comp-navtabs__nav--pills"],
  "Select Tabs": ["select-tabs"],
  "Vertical -Alt Right Line": ["vertical-alt-right-line", "rds-comp-navtabs__nav--vertical-alt-right-line"],
  "Vertical -Alt Left Line": ["vertical-alt-left-line", "rds-comp-navtabs__nav--vertical-alt-left-line"],
  "Vertical -Left Line": ["vertical-left-line", "rds-comp-navtabs__nav--vertical-left-line"],
  "Vertical -Right Line": ["vertical-right-line", "rds-comp-navtabs__nav--vertical-right-line"],
  "Vertical -Left Filled": ["vertical-leftFilled", "rds-comp-navtabs__nav--vertical-left-filled"],
  "Vertical -Pointer": ["vertical-pointer", "rds-comp-navtabs__nav--vertical-pointer"],
  "Vertical -Flap": ["vertical-flap", "rds-comp-navtabs__nav--vertical-flap"],
  "pills": ["nav-pills", "rds-comp-navtabs__nav--pills"],
  "tabs": ["flex-lg-row", "flex-md-row", "flex-xl-row", "flex-xxl-row", "justify-content-start", "nav-tabs", "pb-0", "pb-lg-0", "pb-md-0", "pb-xl-0", "pb-xxl-0"],
};

const HORIZONTAL_STYLES = new Set([
  "Bottom Select", "Top Select", "Bottom Select Alt", "Top Select Alt", "Background Filled", "Pill",
]);

const ACTIVE_SELECTED_STYLES = new Set([
  "Top Select", "Bottom Select", "Bottom Select Alt", "Top Select Alt",
  "Background Filled", "Pill", "Select Tabs", "Vertical -Alt Right Line",
  "Vertical -Alt Left Line", "Vertical -Left Line", "Vertical -Right Line",
  "Vertical -Left Filled", "Vertical -Pointer", "Vertical -Flap",
]);

export interface RdsCompNavtabsProps {
  children?: ReactNode;
  navtabsItems: {
    label: string;
    tablink?: string;
    ariacontrols?: string;
    icon?: string;
    subText?: string;
    disabled?: boolean;
    id: any;
    count?: number; 
    colorVariant?: "primary" | "secondary" | "tertiary" | "danger" | "warning" | "light" | "success";  
  }[];
  type: "default" | "tabs";
  fill?: boolean;
  justified?: boolean;
  activeNavtabOrder?: (id: any) => void;
  activeNavTabId?: string | number;
  isNextPressed?: boolean;
  onClick?: MouseEvent<HTMLElement>;
  layout?: string;
  style?: string;
  iconOnly?: boolean;
  id?: string;
}

const RdsCompNavtabs = ({
  children,
  navtabsItems,
  type,
  fill,
  justified,
  activeNavtabOrder,
  activeNavTabId: activeNavTabIdProp,
  layout,
  style,
  iconOnly,
  id,
}: RdsCompNavtabsProps) => {
  const [activeNavTabId, setActiveNavTabId] = useState(activeNavTabIdProp);
  
  useEffect(() => {
    activeNavtabOrder && activeNavtabOrder(activeNavTabId);
  }, [activeNavTabId, activeNavtabOrder]);

  useEffect(() => {
    setActiveNavTabId(activeNavTabIdProp);
  }, [activeNavTabIdProp]);

  if (!navtabsItems || navtabsItems.length === 0) {
    return null;
  }

  const getNavClasses = useCallback(() => {
    const isHorizontalStyle = HORIZONTAL_STYLES.has(style || "");
    const extraClasses = STYLE_EXTRA_CLASSES[style || ""] ?? ["nav-tabs"];

    return clsx(
      "rds-comp-navtabs__nav", "nav", "fit-content", "mobile-ul-tabs", "navtabs-icon-align", "nav-tabs",
      id !== "chat" && "d-md-block",
      isHorizontalStyle && ["d-flex", "flex-row", "rds-comp-navtabs__nav--horizontal"],
      ...extraClasses,
      type === "tabs" && "text-primary",
      layout === "vertical" && ["col-12", "d-block", "rds-comp-navtabs__nav--vertical"],
      fill && "nav-fill",
      justified && "nav-justified",
      iconOnly && ["nav-icon-only", "rds-comp-navtabs__nav--icon-align"]
    );
  }, [fill, iconOnly, id, justified, layout, style, type]);

  const getNavLinkClasses = useCallback((navtabsItem: { id: unknown; disabled?: boolean }) => {
    const isActive = navtabsItem.id === activeNavTabId;
    const isActiveSelected = isActive && ACTIVE_SELECTED_STYLES.has(style || "");

    return clsx(
      "nav-link", "pe-auto", "mt-2", "rds-comp-navtabs__nav-link",
      type === "tabs" && "rounded-0",
      layout === "Vertical" && "rounded-2",
      isActive && "rds-comp-navtabs__nav-link--active",
      isActiveSelected && ["selected", "rds-comp-navtabs__nav-link--selected"],
      isActive && !isActiveSelected && type === "tabs" && ["border-bottom", "border-primary", "border-3", "text-primary"],
      isActive && !isActiveSelected && type !== "tabs" && "active",
      !isActive && ["inactive", "rds-comp-navtabs__nav-link--inactive"],
      navtabsItem.disabled && "disabled"
    );
  }, [activeNavTabId, layout, style, type]);

  const navClasses = useMemo(() => getNavClasses(), [getNavClasses]);

  return (
    <div className="rds-comp-navtabs">
      <ul
        className={navClasses}
        id={id === "features" ? "features" : ""}
      >
        {navtabsItems.map((navtabsItem) => (
          <li
            className={clsx(
              "nav-item py-0 cursor-pointer rds-comp-navtabs__nav-item",
              navtabsItem.disabled && "rds-comp-navtabs__nav-item--disabled"
            )}
            key={navtabsItem.id}
          >
            <a
              className={getNavLinkClasses(navtabsItem)}
              aria-current="page"
              data-bs-target={navtabsItem.tablink}
              aria-controls={navtabsItem.ariacontrols}
              onClick={() => setActiveNavTabId(navtabsItem.id)}
            >
              {!iconOnly && (
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
      {children}
    </div>
  );
};
RdsCompNavtabs.displayName = "RdsCompNavtabs";
export default RdsCompNavtabs;