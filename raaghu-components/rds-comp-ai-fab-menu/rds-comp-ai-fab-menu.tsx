import clsx from "clsx";
import { useEffect, useId, useRef, useState, type ButtonHTMLAttributes, type CSSProperties, type HTMLAttributes, type ReactElement, type ReactNode, type Ref, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent } from "react";
import { Box, type SxProps, type Theme } from "@mui/material";
import "./rds-comp-ai-fab-menu.scss";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import RdsCompAiIcon, { registerMaterialIcons } from "../../raaghu-components/rds-comp-ai-icon/rds-comp-ai-icon";
import ListIcon from "@mui/icons-material/List";
import RefreshIcon from "@mui/icons-material/Refresh";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";

registerMaterialIcons({
  list: ListIcon,
  refresh: RefreshIcon,
  export: FileUploadIcon,
  delete: DeleteIcon,
  download: DownloadIcon,
});

export type RdsCompAiFabMenuIconName =
  | "users"
  | "person-outline"
  | "list"
  | "refresh"
  | "export"
  | "delete"
  | "download"
  | "attachment_icon"
  | "enhance";
export type RdsCompAiFabMenuIcon = RdsCompAiFabMenuIconName | (string & {}) | ReactElement;

export interface RdsCompAiFabMenuItem {
  key: string;
  label?: ReactNode;
  /** @deprecated Use `label` instead. */
  value?: ReactNode;
  /** Built-in icon name or a custom icon element. */
  icon?: RdsCompAiFabMenuIcon;
  iconWidth?: string;
  iconHeight?: string;
  onClick?: () => void;
}

export interface RdsCompAiFabMenuProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color" | "onClick" | "id" | "aria-label" | "children"> {
  /** Color of the trigger button. */
  color?: "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "dark" | "light";
  /** @deprecated Use `color` instead. */
  colorVariant?: "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "dark" | "light";
  /** Size of the trigger button. */
  size?: "small" | "medium" | "large";
  /** Built-in icon name or custom element shown on the trigger button. */
  icon?: RdsCompAiFabMenuIcon;
  /** @deprecated Use `icon` instead. */
  menuIcon?: RdsCompAiFabMenuIcon;
  /** @deprecated Has no effect. */
  menuiconWidth?: CSSProperties['width'];
  /** @deprecated Has no effect. */
  menuiconHeight?: CSSProperties['height'];
  /** Menu items shown in the dropdown. */
  items?: RdsCompAiFabMenuItem[];
  /** @deprecated Use `items` instead. */
  listItems?: RdsCompAiFabMenuItem[];
  /** Applied to the menu root. */
  className?: string;
  /** Props forwarded to the trigger button / dropdown panel. */
  slotProps?: {
    button?: ButtonHTMLAttributes<HTMLButtonElement>;
    /** Applied to the `role="menu"` dropdown panel (e.g. `style.minWidth`). */
    dropdown?: HTMLAttributes<HTMLDivElement>;
  };
  /** HTML id applied to the menu root. */
  id?: string;
  /** Use the compact item style (defaults to `id === "attachment-text"`). */
  dense?: boolean;
  /** Accessible name of the trigger button. */
  "aria-label"?: string;
  /** Adds a border to the trigger button. */
  bordered?: boolean;
  /** @deprecated Use `bordered` instead. */
  isShowBorder?: boolean;
  /** @deprecated Use `variant="rounded"` instead. */
  isRectangular?: boolean;
  /** Shape of the trigger button: circular, rounded or text. */
  variant?: "circular" | "rounded" | "text";
  /** @deprecated Use `variant` instead (`rectangular` is `rounded`, `none` is `text`). */
  backgroundType?: "circular" | "rectangular" | "none";
  /** Side the dropdown opens toward: left or right. */
  placement?: "left" | "right";
  /** @deprecated Use `placement` instead. */
  alignment?: "left" | "right";
  /** @deprecated Has no effect. */
  onClick?: () => void;
  /** MUI system styles applied to the menu root. */
  sx?: SxProps<Theme>;
  /** Ref to the menu root element. */
  ref?: Ref<HTMLDivElement>;
}

const VARIANT_TO_BACKGROUND = { circular: "circular", rounded: "rectangular", text: "none" } as const;

const resolveBackgroundType = (
  variant: RdsCompAiFabMenuProps["variant"],
  backgroundType: RdsCompAiFabMenuProps["backgroundType"],
  isRectangular?: boolean
): NonNullable<RdsCompAiFabMenuProps["backgroundType"]> => {
  if (variant) return VARIANT_TO_BACKGROUND[variant];
  if (backgroundType) return backgroundType;
  return isRectangular ? "rectangular" : "circular";
};

function RdsCompAiFabMenu({
  color,
  colorVariant,
  size,
  icon,
  menuIcon,
  items,
  listItems,
  className = "",
  slotProps,
  id,
  dense,
  "aria-label": ariaLabel = "Open menu",
  bordered,
  isShowBorder,
  isRectangular,
  variant,
  backgroundType,
  placement,
  alignment,
  menuiconWidth,
  menuiconHeight,
  onClick,
  sx,
  ref,
  onKeyDown,
  ...rest
}: RdsCompAiFabMenuProps) {
  const {
    className: buttonClassName,
    type: buttonType = "button",
    onClick: slotButtonOnClick,
    ...buttonSlotRest
  } = slotProps?.button ?? {};
  const {
    className: dropdownClassName,
    ...dropdownSlotRest
  } = slotProps?.dropdown ?? {};
  if (menuiconWidth !== undefined) warnDeprecatedProp("RdsCompAiFabMenu", "menuiconWidth", "nothing (no effect)");
  if (menuiconHeight !== undefined) warnDeprecatedProp("RdsCompAiFabMenu", "menuiconHeight", "nothing (no effect)");
  if (onClick !== undefined) warnDeprecatedProp("RdsCompAiFabMenu", "onClick", "nothing (no effect)");

  if (colorVariant !== undefined) warnDeprecatedProp("RdsCompAiFabMenu", "colorVariant", "`color`");
  if (menuIcon !== undefined) warnDeprecatedProp("RdsCompAiFabMenu", "menuIcon", "`icon`");
  if (listItems !== undefined) warnDeprecatedProp("RdsCompAiFabMenu", "listItems", "`items`");
  if (isShowBorder !== undefined) warnDeprecatedProp("RdsCompAiFabMenu", "isShowBorder", "`bordered`");
  if (isRectangular !== undefined) warnDeprecatedProp("RdsCompAiFabMenu", "isRectangular", "`variant=\"rounded\"`");
  if (backgroundType !== undefined) warnDeprecatedProp("RdsCompAiFabMenu", "backgroundType", "`variant`");
  if (alignment !== undefined) warnDeprecatedProp("RdsCompAiFabMenu", "alignment", "`placement`");

  const resolvedColor = color ?? colorVariant ?? "primary";
  const resolvedIcon = icon ?? menuIcon ?? "list";
  const resolvedItems = items ?? listItems ?? [];
  const resolvedBordered = bordered ?? isShowBorder;
  const resolvedPlacement = placement ?? alignment ?? "left";

  const menuId = useId();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const resolvedBackgroundType = resolveBackgroundType(variant, backgroundType, isRectangular);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleItemClick = (itemOnClick?: () => void) => (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    itemOnClick?.();
    setIsMenuOpen(false);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (!isMenuOpen) return;
    if (event.key === "Escape") {
      event.preventDefault();
      setIsMenuOpen(false);
      buttonRef.current?.focus();
      return;
    }
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []
    );
    if (!items.length) return;
    const current = items.indexOf(document.activeElement as HTMLElement);
    let next: number | undefined;
    if (event.key === "ArrowDown") next = current < 0 ? 0 : (current + 1) % items.length;
    else if (event.key === "ArrowUp") next = current < 0 ? items.length - 1 : (current - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      items[next].focus();
    }
  };

  const iconColorVariant =
    resolvedColor === "dark" || resolvedColor === "primary" || resolvedColor === "danger"
      ? "light"
      : "dark";
  const resolvedIconColorVariant =
    resolvedBackgroundType === "none" ? "primary" : iconColorVariant;

  return (
    <Box
      {...rest}
      ref={ref}
      className={clsx(
        "rds-fab-menu",
        resolvedPlacement === "right" && "rds-fab-menu--right",
        isMenuOpen && "rds-fab-menu--open",
        className
      )}
      sx={sx}
      data-alignment={resolvedPlacement}
      data-open={isMenuOpen}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={buttonRef}
        {...buttonSlotRest}
        className={clsx(
          "rds-fab-menu__button",
          `rds-fab-menu__button--${resolvedColor}`,
          size && `rds-fab-menu__button--${size}`,
          `rds-fab-menu__button--${resolvedBackgroundType}`,
          buttonClassName
        )}
        type={buttonType}
        onClick={(event) => {
          slotButtonOnClick?.(event);
          if (!event.defaultPrevented) toggleMenu();
        }}
        aria-expanded={isMenuOpen ? "true" : "false"}
        aria-haspopup="menu"
        aria-controls={isMenuOpen ? menuId : undefined}
        aria-label={ariaLabel}
        data-testid="fab-menu-btn"
      >
        {typeof resolvedIcon === "string" ? (
          <RdsCompAiIcon
            name={resolvedIcon}
            fill={false}
            stroke={true}
            height="var(--rds-size-lg)"
            width="var(--rds-size-lg)"
            color={resolvedIconColorVariant}
          />
        ) : (
          resolvedIcon
        )}
      </button>
      <div
        className={clsx(
          "rds-fab-menu__dropdown-container",
          `rds-fab-menu__dropdown-container--${resolvedPlacement}`,
          isMenuOpen && "rds-fab-menu__dropdown-container--open"
        )}
        ref={menuRef}
      >
        <div
          {...dropdownSlotRest}
          className={clsx(
            "rds-fab-menu__dropdown",
            resolvedBordered && "rds-fab-menu__dropdown--bordered",
            isMenuOpen && "rds-fab-menu__dropdown--open",
            dropdownClassName
          )}
          role="menu"
          id={menuId}
        >
          {resolvedItems.map((listItem) => (
            <button
              type="button"
              key={listItem.key}
              role="menuitem"
              className={clsx(
                "rds-fab-menu__item",
                (dense ?? id === "attachment-text") && "rds-fab-menu__item--compact"
              )}
              onClick={handleItemClick(listItem.onClick)}
            >
              {typeof listItem.icon === "string" || listItem.icon === undefined ? (
                <RdsCompAiIcon
                  name={listItem.icon}
                  height={listItem.iconHeight}
                  width={listItem.iconWidth}
                  fill={false}
                  stroke={true}
                  position="top-left"
                />
              ) : (
                listItem.icon
              )}
              <span className="rds-fab-menu__item-text">{listItem.label ?? listItem.value}</span>
            </button>
          ))}
        </div>
      </div>
    </Box>
  );
}

RdsCompAiFabMenu.displayName = "RdsCompAiFabMenu";
export default RdsCompAiFabMenu;
