import clsx from "clsx";
import { memo, useCallback, useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import "./rds-comp-ai-fab-menu.scss";
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
  icon?: string;
  iconWidth?: string;
  iconHeight?: string;
  onClick?: () => void;
}

export interface RdsCompAiFabMenuProps {
  colorVariant?: "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "dark" | "light";
  size?: "small" | "medium" | "large";
  menuIcon?: string;
  menuiconWidth?: string;
  menuiconHeight?: string;
  listItems: RdsCompAiFabMenuItem[];
  className?: string;
  id?: string;
  isShowBorder?: boolean;
  isRectangular?: boolean;
  backgroundType?: "circular" | "rectangular" | "none";
  alignment?: "left" | "right";
  onClick?: () => void;
}

const resolveBackgroundType = (
  backgroundType: RdsCompAiFabMenuProps["backgroundType"],
  isRectangular?: boolean
): NonNullable<RdsCompAiFabMenuProps["backgroundType"]> => {
  if (backgroundType) return backgroundType;
  return isRectangular ? "rectangular" : "circular";
};

const RdsCompAiFabMenu = ({
  colorVariant = "primary",
  size,
  menuIcon = "list",
  listItems,
  className = "",
  id,
  isShowBorder,
  isRectangular,
  backgroundType,
  alignment = "left",
}: RdsCompAiFabMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const resolvedBackgroundType = resolveBackgroundType(backgroundType, isRectangular);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  useEffect(() => {
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
  }, []);

  const handleItemClick = useCallback(
    (onClick?: () => void) => (event: MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      onClick?.();
      setIsMenuOpen(false);
    },
    []
  );

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
        >
          {listItems.map((listItem) => (
            <a
              key={listItem.key}
              role="menuitem"
              className={clsx(
                "rds-fab-menu__item",
                id === "attachment-text" && "rds-fab-menu__item--compact"
              )}
              onClick={handleItemClick(listItem.onClick)}
              tabIndex={0}
            >
              <RdsCompAiIcon
                name={listItem.icon}
                height={listItem.iconHeight}
                width={listItem.iconWidth}
                fill={false}
                stroke={true}
                position="top-left"
              />
              <span className="rds-fab-menu__item-text">{listItem.value}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const MemoizedRdsCompAiFabMenu = memo(RdsCompAiFabMenu);
MemoizedRdsCompAiFabMenu.displayName = "RdsCompAiFabMenu";
export default MemoizedRdsCompAiFabMenu;
