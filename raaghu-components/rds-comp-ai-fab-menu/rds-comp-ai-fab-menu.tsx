import React, { useState, useEffect, useRef } from "react";
import "./rds-comp-ai-fab-menu.scss";
import RdsCompAiIcon, { registerMaterialIcons } from "../../raaghu-components/rds-comp-ai-icon/rds-comp-ai-icon";
import ListIcon from '@mui/icons-material/List';
import RefreshIcon from '@mui/icons-material/Refresh';
import GetAppIcon from '@mui/icons-material/GetApp';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

export interface RdsCompAiFabMenuProps {
    colorVariant?: string;
    size?: string;
    menuIcon?: string;
    menuiconWidth?: string;
    menuiconHeight?: string;
    listItems: any[];
    className?: string;
    id?: string;
    isShowBorder?: boolean;
    isRectangular?: boolean; // @deprecated - use backgroundType instead
    backgroundType?: 'circular' | 'rectangular' | 'none';
    alignment?: 'left' | 'right';
    onClick?: () => void;
}

const RdsCompAiFabMenu = (props: RdsCompAiFabMenuProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    
    useEffect(() => {
        registerMaterialIcons({
            'list': ListIcon,
            'refresh': RefreshIcon,
            'export': GetAppIcon,
            'delete': DeleteIcon,
            'download': DownloadIcon,
        });
    }, []);
    
    // Generate RDS classes following BEM naming convention
    // Determine background type with backward compatibility
    const getBackgroundType = () => {
        if (props.backgroundType) {
            return props.backgroundType;
        }
        // Backward compatibility: if isRectangular is true, use rectangular
        return props.isRectangular ? 'rectangular' : 'circular';
    };
    
    const backgroundType = getBackgroundType();
    const baseClasses = `rds-fab-menu__button rds-fab-menu__button--${props.colorVariant || 'primary'}`;
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
        return (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            event.preventDefault();
            if (onClick) {
                onClick();
            }
            setIsMenuOpen(false);
        };
    };

    return (
        <div className="rds-fab-menu">
            <button
                ref={buttonRef}
                className={customClasses}
                type="button"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen ? "true" : "false"}
                data-testid="fab-menu-btn"
            >
                <RdsCompAiIcon
                    name={props.menuIcon || "list"}  
                    fill={false}
                    stroke={true}
                    height="24px"
                    width="24px"
                    colorVariant={props.colorVariant === 'dark' || props.colorVariant === 'primary' || props.colorVariant === 'danger' ? 'light' : 'dark'}
                />
            </button>
            <div className={`rds-fab-menu__dropdown-container rds-fab-menu__dropdown-container--${props.alignment || 'left'} ${isMenuOpen ? 'rds-fab-menu__dropdown-container--open' : ''}`} ref={menuRef}>
                <div 
                    className={`rds-fab-menu__dropdown ${props.isShowBorder ? 'rds-fab-menu__dropdown--bordered' : ''} ${isMenuOpen ? 'rds-fab-menu__dropdown--open' : ''}`}
                    role="menu"
                >
                    {props.listItems.map((listItem) => (
                        <a 
                            key={listItem.key} 
                            role="link"  
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
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

RdsCompAiFabMenu.displayName = "RdsCompAiFabMenu"
export default RdsCompAiFabMenu;