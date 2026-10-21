import clsx from "clsx";
import { useEffect, useId, useRef, useState, type ReactNode, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent } from "react";
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

export interface RdsCompAiFabMenuItem {
  key: string;
  value: ReactNode;
  /** Icon name (string) or a custom node rendered as-is. */
  icon?: string | ReactNode;
  iconWidth?: string;
  iconHeight?: string;
  onClick?: () => void;
}

export interface RdsCompAiFabMenuProps {
  colorVariant?: "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "dark" | "light";
  size?: "small" | "medium" | "large";
  menuIcon?: string;
  /** @deprecated Has no effect. */
  menuiconWidth?: string;
  /** @deprecated Has no effect. */
  menuiconHeight?: string;
  listItems: RdsCompAiFabMenuItem[];
  className?: string;
  id?: string;
  /** Use the compact item style (defaults to `id === "attachment-text"`). */
  dense?: boolean;
  /** Accessible name of the trigger button. */
  "aria-label"?: string;
  isShowBorder?: boolean;
  isRectangular?: boolean;
  backgroundType?: "circular" | "rectangular" | "none";
  alignment?: "left" | "right";
  /** @deprecated Has no effect. */
  onClick?: () => void;
}

const resolveBackgroundType = (
  backgroundType: RdsCompAiFabMenuProps["backgroundType"],
  isRectangular?: boolean
): NonNullable<RdsCompAiFabMenuProps["backgroundType"]> => {
  if (backgroundType) return backgroundType;
  return isRectangular ? "rectangular" : "circular";
};

function RdsCompAiFabMenu({
  colorVariant = "primary",
  size,
  menuIcon = "list",
  listItems,
  className = "",
  id,
  dense,
  "aria-label": ariaLabel = "Open menu",
  isShowBorder,
  isRectangular,
  backgroundType,
  alignment = "left",
  menuiconWidth,
  menuiconHeight,
  onClick,
}: RdsCompAiFabMenuProps) {
  if (menuiconWidth !== undefined) warnDeprecatedProp("RdsCompAiFabMenu", "menuiconWidth", "nothing (no effect)");
  if (menuiconHeight !== undefined) warnDeprecatedProp("RdsCompAiFabMenu", "menuiconHeight", "nothing (no effect)");
  if (onClick !== undefined) warnDeprecatedProp("RdsCompAiFabMenu", "onClick", "nothing (no effect)");

  const menuId = useId();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const resolvedBackgroundType = resolveBackgroundType(backgroundType, isRectangular);

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
    colorVariant === "dark" || colorVariant === "primary" || colorVariant === "danger"
      ? "light"
      : "dark";
  // When there is no background (transparent button), a "light" icon is invisible on light
  // theme backgrounds. Use "primary" so the icon inherits the button's primary foreground color.
  const resolvedIconColorVariant =
    resolvedBackgroundType === "none" ? "primary" : iconColorVariant;

  return (
    <div
      className={clsx(
        "rds-fab-menu",
        alignment === "right" && "rds-fab-menu--right",
        isMenuOpen && "rds-fab-menu--open"
      )}
      data-alignment={alignment}
      data-open={isMenuOpen}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={buttonRef}
        className={clsx(
          "rds-fab-menu__button",
          `rds-fab-menu__button--${colorVariant}`,
          size && `rds-fab-menu__button--${size}`,
          `rds-fab-menu__button--${resolvedBackgroundType}`,
          className
        )}
        type="button"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen ? "true" : "false"}
        aria-haspopup="menu"
        aria-controls={isMenuOpen ? menuId : undefined}
        aria-label={ariaLabel}
        data-testid="fab-menu-btn"
      >
        <RdsCompAiIcon
          name={menuIcon}
          fill={false}
          stroke={true}
          height="24px"
          width="24px"
          colorVariant={resolvedIconColorVariant}
        />
      </button>
      <div
        className={clsx(
          "rds-fab-menu__dropdown-container",
          `rds-fab-menu__dropdown-container--${alignment}`,
          isMenuOpen && "rds-fab-menu__dropdown-container--open"
        )}
        ref={menuRef}
      >
        <div
          className={clsx(
            "rds-fab-menu__dropdown",
            isShowBorder && "rds-fab-menu__dropdown--bordered",
            isMenuOpen && "rds-fab-menu__dropdown--open"
          )}
          role="menu"
          id={menuId}
        >
          {listItems.map((listItem) => (
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
              <span className="rds-fab-menu__item-text">{listItem.value}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

RdsCompAiFabMenu.displayName = "RdsCompAiFabMenu";
export default RdsCompAiFabMenu;
