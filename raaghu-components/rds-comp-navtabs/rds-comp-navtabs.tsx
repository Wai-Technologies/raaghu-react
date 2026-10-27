import clsx from "clsx";
import { type CSSProperties, type MouseEvent, type ReactNode, type Ref, useCallback, useMemo, useState } from "react";
import { Box, type SxProps, type Theme } from "@mui/material";
import "./rds-comp-navtabs.scss";
import RdsBadge from "../../raaghu-elements/rds-badge/rds-badge";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";

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

export type RdsCompNavTabItem = {
  label: string;
  tablink?: string;
  ariacontrols?: string;
  /** Icon shown when `iconOnly` is set (string glyph/class or React node). */
  icon?: ReactNode;
  subText?: string;
  disabled?: boolean;
  id: string | number;
  count?: number;
  /** Accent color for the tab badge/count. `danger` is accepted as an alias of `error` via consumers. */
  color?: "primary" | "secondary" | "tertiary" | "danger" | "error" | "warning" | "light" | "success";
  /** @deprecated Use `color`. */
  colorVariant?: "primary" | "secondary" | "tertiary" | "danger" | "error" | "warning" | "light" | "success";
};

export interface RdsCompNavtabsProps {
  children?: ReactNode;
  /** Tab definitions. */
  items?: RdsCompNavTabItem[];
  /** @deprecated Use `items` instead. */
  navtabsItems?: RdsCompNavTabItem[];
  type: "default" | "tabs";
  fill?: boolean;
  justified?: boolean;
  /** Controlled active tab id. */
  value?: string | number;
  /** Uncontrolled initial active tab id. */
  defaultValue?: string | number;
  /** Called when a tab is selected. */
  onChange?: (event: MouseEvent<HTMLButtonElement> | null, value: string | number) => void;
  /** @deprecated Use `onChange` instead. */
  activeNavtabOrder?: (id: string | number | undefined) => void;
  /** @deprecated Use `value` instead. */
  activeNavTabId?: string | number;
  nextPressed?: boolean;
  /** @deprecated Use `nextPressed` instead. */
  isNextPressed?: boolean;
  onClick?: MouseEvent<HTMLElement>;
  layout?: string;
  variant?: string;
  /** @deprecated Passing a variant string is deprecated; use `variant`. Pass CSSProperties for inline styles. */
  style?: string | CSSProperties;
  iconOnly?: boolean;
  id?: string;
  sx?: SxProps<Theme>;
  ref?: Ref<HTMLDivElement>;
  className?: string;
}

const RdsCompNavtabs = ({
  children,
  items,
  navtabsItems,
  type,
  fill,
  justified,
  value,
  defaultValue,
  onChange,
  activeNavtabOrder,
  activeNavTabId: activeNavTabIdProp,
  layout,
  variant: variantProp,
  style,
  isNextPressed,
  iconOnly,
  id,
  className,
  sx,
  ref,
}: RdsCompNavtabsProps) => {
  const legacyVariant = typeof style === "string" ? style : undefined;
  if (legacyVariant !== undefined) warnDeprecatedProp("RdsCompNavtabs", "style", "`variant`");
  if (isNextPressed !== undefined) warnDeprecatedProp("RdsCompNavtabs", "isNextPressed", "`nextPressed`");
  if (navtabsItems !== undefined) warnDeprecatedProp("RdsCompNavtabs", "navtabsItems", "`items`");
  if (activeNavTabIdProp !== undefined) warnDeprecatedProp("RdsCompNavtabs", "activeNavTabId", "`value`");
  if (activeNavtabOrder !== undefined) warnDeprecatedProp("RdsCompNavtabs", "activeNavtabOrder", "`onChange`");
  const variant = variantProp ?? legacyVariant;
  const navtabsItemsResolved = items ?? navtabsItems ?? [];
  const [internalActiveNavTabId, setInternalActiveNavTabId] = useState<string | number | undefined>(
    value ?? activeNavTabIdProp ?? defaultValue ?? navtabsItemsResolved[0]?.id
  );
  const isControlled = value !== undefined || activeNavTabIdProp !== undefined;
  const activeNavTabId = isControlled ? (value ?? activeNavTabIdProp) : internalActiveNavTabId;

  const handleTabClick = useCallback((event: MouseEvent<HTMLButtonElement>, tabId: string | number) => {
    if (!isControlled) {
      setInternalActiveNavTabId(tabId);
    }
    onChange?.(event, tabId);
    activeNavtabOrder?.(tabId);
  }, [activeNavtabOrder, isControlled, onChange]);

  const getNavClasses = useCallback(() => {
    const isHorizontalStyle = HORIZONTAL_STYLES.has(variant || "");
    const extraClasses = STYLE_EXTRA_CLASSES[variant || ""] ?? ["nav-tabs"];

    const isVerticalLayout = typeof layout === "string" && layout.toLowerCase() === "vertical";

    return clsx(
      "rds-comp-navtabs__nav", "nav", "fit-content", "mobile-ul-tabs", "navtabs-icon-align", "nav-tabs",
      id !== "chat" && "d-md-block",
      isHorizontalStyle && ["d-flex", "flex-row", "rds-comp-navtabs__nav--horizontal"],
      ...extraClasses,
      type === "tabs" && "text-primary",
      isVerticalLayout && ["col-12", "d-block", "rds-comp-navtabs__nav--vertical"],
      fill && "nav-fill",
      justified && "nav-justified",
      iconOnly && ["nav-icon-only", "rds-comp-navtabs__nav--icon-align"]
    );
  }, [fill, iconOnly, id, justified, layout, variant, type]);

  const getNavLinkClasses = useCallback((navtabsItem: { id: unknown; disabled?: boolean }) => {
    const isActive = navtabsItem.id === activeNavTabId;
    const isActiveSelected = isActive && ACTIVE_SELECTED_STYLES.has(variant || "");
    const isVerticalLayout = typeof layout === "string" && layout.toLowerCase() === "vertical";

    return clsx(
      "nav-link", "pe-auto", "mt-2", "rds-comp-navtabs__nav-link",
      type === "tabs" && "rounded-0",
      isVerticalLayout && "rounded-2",
      isActive && "rds-comp-navtabs__nav-link--active",
      isActiveSelected && ["selected", "rds-comp-navtabs__nav-link--selected"],
      isActive && !isActiveSelected && type === "tabs" && ["border-bottom", "border-primary", "border-3", "text-primary"],
      isActive && !isActiveSelected && type !== "tabs" && "active",
      !isActive && ["inactive", "rds-comp-navtabs__nav-link--inactive"],
      navtabsItem.disabled && "disabled"
    );
  }, [activeNavTabId, layout, variant, type]);

  const navClasses = useMemo(() => getNavClasses(), [getNavClasses]);

  if (navtabsItemsResolved.length === 0) {
    return null;
  }

  return (
    <Box ref={ref} className={clsx("rds-comp-navtabs", className)} sx={sx} style={typeof style === "object" ? style : undefined}>
      <ul
        className={navClasses}
        id={id}
      >
        {navtabsItemsResolved.map((navtabsItem) => (
          <li
            className={clsx(
              "nav-item py-0 cursor-pointer rds-comp-navtabs__nav-item",
              navtabsItem.disabled && "rds-comp-navtabs__nav-item--disabled"
            )}
            key={navtabsItem.id}
          >
            <button
              type="button"
              className={getNavLinkClasses(navtabsItem)}
              aria-current="page"
              aria-label={iconOnly ? navtabsItem.label : undefined}
              aria-controls={navtabsItem.ariacontrols}
              disabled={Boolean(navtabsItem.disabled)}
              onClick={(event) => handleTabClick(event, navtabsItem.id)}
            >
              {iconOnly ? (
                navtabsItem.icon != null && navtabsItem.icon !== "" && (
                  <span className="rds-comp-navtabs__icon" aria-hidden>
                    {navtabsItem.icon}
                  </span>
                )
              ) : (
                <span className="fw-medium px-3 rds-comp-navtabs__label">{navtabsItem.label}</span>
              )}
              {navtabsItem.count != null && navtabsItem.count > 0 && (
                <span className="rds-comp-navtabs__badge">
                  <RdsBadge
                    shape="pill"
                    size="small"
                    color={navtabsItem.color ?? navtabsItem.colorVariant}
                    badgeContent={navtabsItem.count}
                    className=""
                  />
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      {children}
    </Box>
  );
};
RdsCompNavtabs.displayName = "RdsCompNavtabs";
export default RdsCompNavtabs;