import React, { useState } from "react";
import RdsIcon from "../rds-icon";

export interface RdsDropdownProps {
    colorVariant: string;
    size: string;
    darkDropdown: boolean;
    label: string;
    displayType?: 'dropdown' | 'split';
    listItems: any[];
    id: string;
    icon?: string;
    iconFill?: boolean;
    iconStroke?: boolean;
    layout: 'Textonly' | 'IconBefore' | 'onlyIcon';  // New prop for layout
}

const RdsDropdown = (props: RdsDropdownProps) => {
    const [show, setShow] = useState(false);

    let size: "btn-sm" | "btn-lg" | undefined = undefined;
    if (props.size === "small") {
        size = "btn-sm";
    } else if (props.size === "large") {
        size = "btn-lg";
    }

    const toggleShow = () => {
        setShow(!show);
    };

    const renderContent = () => {
        switch (props.layout) {
            case "IconBefore":
                return (
                    <>
                        {props.icon && (
                            <span className="icon-before">
                                <RdsIcon name={props.icon} fill={props.iconFill} stroke={props.iconStroke} />
                            </span>
                        )}
                        {props.label && <span className="mx-1">{props.label}</span>}
                    </>
                );
            case "Textonly":
                return <span>{props.label}</span>;
            case "onlyIcon":
                return (
                    <>
                        {props.icon && (
                            <span className="only-icon">
                                <RdsIcon name={props.icon} fill={props.iconFill} stroke={props.iconStroke} />
                            </span>
                        )}
                    </>
                );
            default:
                return <span>{props.label}</span>;
        }
    };

    return (
        <>
            {props.displayType === 'dropdown' && (
                <div className="dropdown">
                    <button className={`btn btn-${props.colorVariant} ${size} dropdown-toggle ${show ? 'show' : ''}` }
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false" onClick={toggleShow}>
                        {renderContent()}
                    </button>
                    <ul className={`dropdown-menu ${show ? 'show' : ''} ${props.darkDropdown ? 'dropdown-menu-dark' : ''}`} aria-labelledby="dropdownMenuButton1">
                        {props.listItems.map((listItem) => (
                            <li id={listItem.id} role="menuitem" key={listItem.id}>
                                <a className="dropdown-item text-wrap" href={listItem.path}>
                                    {listItem.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {props.displayType === 'split' && (
                <div className="btn-group">
                    <button type="button" className={`btn btn-${props.colorVariant}  ${size}`}>
                        {renderContent()}
                    </button>
                    <button type="button" className={`btn btn-${props.colorVariant}  ${size} dropdown-toggle dropdown-toggle-split ${show ? 'show' : ''}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false" onClick={toggleShow}>
                        <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul className={`dropdown-menu ${show ? 'show customClassUL' : ''} ${props.darkDropdown ? 'dropdown-menu-dark' : ''}`}>
                        {props.listItems.map((listItem) => (
                            <li id={listItem.id} role="menuitem" key={listItem.id}>
                                <a className="dropdown-item text-wrap" href={listItem.path}>
                                    {listItem.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default RdsDropdown;
