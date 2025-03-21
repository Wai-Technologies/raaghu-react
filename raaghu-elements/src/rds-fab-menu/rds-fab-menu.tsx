import React, { useState, useEffect, useRef } from "react";
import "./rds-fab-menu.css";
import RdsIcon from "../rds-icon";

export interface RdsFabMenuProps {
    colorVariant?: string;
    size?: string;
    menuIcon?: string;
    menuiconWidth?: string;
    menuiconHeight?: string;
    listItems: any[];
    className?: string;
    id?: string;
    isShowBorder?: boolean;
    onClick?: () => void;
}

const RdsFabMenu = (props: RdsFabMenuProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const customClasses = `btn border-0 btn-${props.colorVariant} btn-icon fab-btn ${props.size == "small" ? "btn-sm" : props.size == "large" ? "btn-lg" : ""}`;

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

    const handleItemClick = (onClick: () => void) => {
        return (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            onClick();
            setIsMenuOpen(false);
        };
    };

    return (
        <div style={{ position: 'relative' }}>
            <button
                ref={buttonRef}
                className={customClasses}
                type="button"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen ? "true" : "false"}
                data-testid="fab-menu-btn"
            >
                <RdsIcon
                    name={props.menuIcon || "list"}  
                    fill={false}
                    stroke={true}
                    height="17px"
                    width="17px"
                    colorVariant={customClasses.includes('btn-dark') || customClasses.includes('btn-primary') || customClasses.includes('btn-danger') ? 'light' : 'dark'}
                ></RdsIcon>
            </button>
            <div id="fab-list" ref={menuRef}>
                <div className={`${props.isShowBorder ? props.className : "border-0 dropdown-menu dropdown-menu-list fab-dropdown shadow mb-1"} ${isMenuOpen ? " show" : ""}`}  role="menu">
                    {props.listItems.map((listItem) => (
                        <a key={listItem.key} role="link"  className={`dropdown-item fab-dropdown-item d-flex ${props.id === "attachment-text" ? "py-2" : "py-3"}`}
                        onClick={handleItemClick(listItem.onClick)}>
                            <RdsIcon name={listItem.icon} height={listItem.iconHeight} width={listItem.iconWidth} fill={false} stroke={true}></RdsIcon>
                            <span className="ms-3">{listItem.value}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RdsFabMenu;