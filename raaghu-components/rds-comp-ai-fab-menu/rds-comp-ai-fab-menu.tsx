import React, { useState, useEffect, useRef } from "react";
import "./rds-comp-ai-fab-menu.scss";
import RdsCompAiIcon, { registerMaterialIcons } from "../../raaghu-components/rds-comp-ai-icon/rds-comp-ai-icon";
import ListIcon from '@mui/icons-material/List';
import RefreshIcon from '@mui/icons-material/Refresh';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { resolveDeprecatedProp, warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import { normalizePaletteColor } from "../../raaghu-elements/shared/utils/palette-color";

registerMaterialIcons({
    'list': ListIcon,
    'refresh': RefreshIcon,
    'export': FileUploadIcon,
    'delete': DeleteIcon,
    'download': DownloadIcon,
});
export interface RdsCompAiFabMenuItem {
    key: string;
    value: React.ReactNode;
    icon?: string;
    iconWidth?: string;
    iconHeight?: string;
    onClick?: () => void;
}

type FabMenuColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'error' | 'dark' | 'light';

export interface RdsCompAiFabMenuProps {
    /** Button color. `'danger'` is deprecated; use `'error'`. */
    color?: FabMenuColor;
    /** @deprecated Use `color`. `'danger'` is deprecated; use `'error'`. */
    colorVariant?: FabMenuColor;
    size?: 'small' | 'medium' | 'large';
    menuIcon?: string;
    menuiconWidth?: string;
    menuiconHeight?: string;
    listItems: RdsCompAiFabMenuItem[];
    className?: string;
    id?: string;
    isShowBorder?: boolean;
    isRectangular?: boolean;
    backgroundType?: 'circular' | 'rectangular' | 'none';
    alignment?: 'left' | 'right';
    onClick?: () => void;
    'aria-label'?: string;
}

const RdsCompAiFabMenu = (props: RdsCompAiFabMenuProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const paletteColor = resolveDeprecatedProp(props.color, props.colorVariant, 'RdsCompAiFabMenu', 'colorVariant', '`color`') ?? 'primary';
    if (paletteColor === 'danger' || props.color === 'danger' || props.colorVariant === 'danger') {
        warnDeprecatedProp('RdsCompAiFabMenu', 'color="danger"', '`color: "error"`');
    }
    const resolvedColorVariant = normalizePaletteColor(paletteColor) ?? 'primary';
    
    const getBackgroundType = () => {
        if (props.backgroundType) {
            return props.backgroundType;
        }
        return props.isRectangular ? 'rectangular' : 'circular';
    };
    
    const backgroundType = getBackgroundType();
    const baseClasses = `rds-fab-menu__button rds-fab-menu__button--${resolvedColorVariant}`;
    const sizeClass = props.size ? `rds-fab-menu__button--${props.size}` : '';
    const backgroundClass = `rds-fab-menu__button--${backgroundType}`;
    const customClasses = `${baseClasses} ${sizeClass} ${backgroundClass} ${props.className || ''}`.trim();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleItemClick = (onClick?: () => void) => {
        return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.preventDefault();
            if (onClick) {
                onClick();
            }
            setIsMenuOpen(false);
        };
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!isMenuOpen) return;
        if (event.key === 'Escape') {
            event.preventDefault();
            setIsMenuOpen(false);
            buttonRef.current?.focus();
            return;
        }
        const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
        if (!items.length) return;
        const current = items.indexOf(document.activeElement as HTMLElement);
        let next: number | undefined;
        if (event.key === 'ArrowDown') next = current < 0 ? 0 : (current + 1) % items.length;
        else if (event.key === 'ArrowUp') next = current < 0 ? items.length - 1 : (current - 1 + items.length) % items.length;
        if (next !== undefined) {
            event.preventDefault();
            items[next].focus();
        }
    };

    const rootClass = `rds-fab-menu ${props.alignment === 'right' ? 'rds-fab-menu--right' : ''} ${isMenuOpen ? 'rds-fab-menu--open' : ''}`.trim();
    const dataAlignment = props.alignment || 'left';

    return (
    <div className={rootClass} data-alignment={dataAlignment} data-open={isMenuOpen} onKeyDown={handleKeyDown}>
            <button
                ref={buttonRef}
                className={customClasses}
                type="button"
                onClick={toggleMenu}
                aria-haspopup="menu"
                aria-expanded={isMenuOpen ? "true" : "false"}
                aria-label={props['aria-label'] ?? "Open menu"}
                data-testid="fab-menu-btn"
            >
                <RdsCompAiIcon
                    name={props.menuIcon || "list"}  
                    fill={false}
                    stroke={true}
                    height="var(--rds-spacing-lg)"
                    width="var(--rds-spacing-lg)"
                    colorVariant={resolvedColorVariant === 'dark' || resolvedColorVariant === 'primary' || resolvedColorVariant === 'error' ? 'light' : 'dark'}
                />
            </button>
            <div className={`rds-fab-menu__dropdown-container rds-fab-menu__dropdown-container--${props.alignment || 'left'} ${isMenuOpen ? 'rds-fab-menu__dropdown-container--open' : ''}`} ref={menuRef}>
                <div 
                    className={`rds-fab-menu__dropdown ${props.isShowBorder ? 'rds-fab-menu__dropdown--bordered' : ''} ${isMenuOpen ? 'rds-fab-menu__dropdown--open' : ''}`}
                    role="menu"
                >
                    {props.listItems.map((listItem) => (
                        <button
                            type="button"
                            key={listItem.key} 
                            role="menuitem"
                            className={`rds-fab-menu__item ${props.id === "attachment-text" ? 'rds-fab-menu__item--compact' : ''}`}
                            onClick={handleItemClick(listItem.onClick)}
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
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

RdsCompAiFabMenu.displayName = "RdsCompAiFabMenu"
export default RdsCompAiFabMenu;