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
    buttonIcon?: string;
    iconFill?: boolean;
    iconStroke?: boolean;
    disable?: boolean;
    layout: 'Textonly' | 'IconBefore' | 'onlyIcon';
    isSelected?: boolean;
    selectIcon: string;
    profileImage?: string;
}

const RdsDropdown = (props: RdsDropdownProps) => {
    const [show, setShow] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    let size: "btn-sm" | "btn-lg" | undefined = undefined;
    if (props.size === "small") {
        size = "btn-sm";
    } else if (props.size === "large") {
        size = "btn-lg";
    }

    const toggleShow = () => {
        if (!props.disable) {
            setShow(!show);
        }
    };

    const handleCheckboxChange = (itemId: string) => {
        setSelectedItems(prevSelectedItems =>
            prevSelectedItems.includes(itemId)
                ? prevSelectedItems.filter(id => id !== itemId)
                : [...prevSelectedItems, itemId]
        );
    };

    const renderContent = () => {
        switch (props.layout) {
            case "IconBefore":
                return (
                    <>
                        {props.buttonIcon && (
                            <span className="icon-before">
                                <RdsIcon name={props.buttonIcon} fill={props.iconFill} stroke={props.iconStroke} />
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
                        {props.buttonIcon && (
                            <span className="only-icon">
                                <RdsIcon name={props.buttonIcon} fill={props.iconFill} stroke={props.iconStroke} />
                            </span>
                        )}
                    </>
                );
            default:
                return <span>{props.label}</span>;
        }
    };

    const buttonClass = `btn btn-${props.colorVariant} ${size}`;

    return (
        <>
            {props.displayType === 'dropdown' && (
                <div className="dropdown">
                    <button className={`${buttonClass} dropdown-toggle ${show ? 'show' : ''}`}
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        onClick={toggleShow}
                        disabled={props.disable}>
                        {renderContent()}
                    </button>
                    <ul className={`dropdown-menu ${show ? 'show' : ''} ${props.darkDropdown ? 'dropdown-menu-dark' : ''}`} aria-labelledby="dropdownMenuButton1">
                        {props.listItems.map((listItem) => (
                            <li id={listItem.id} role="menuitem" key={listItem.id} style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                                {props.isSelected && (
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(listItem.id)}
                                        onChange={() => handleCheckboxChange(listItem.id)}
                                        className="me-1"
                                    />

                                )}
                                {props.isSelected && (
                                    <img src={props.profileImage} className="me-1" alt="" height={20} width={20} />)}
                                {props.isSelected && (
                                    <RdsIcon
                                        colorVariant="dark"
                                        fill
                                        height="20px"
                                        isCursorPointer
                                        name={props.selectIcon}
                                        stroke={false}
                                        width="20px"
                                    />)}
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
                    <button type="button" className={buttonClass} disabled={props.disable}>
                        {renderContent()}
                    </button>
                    <button type="button" className={`${buttonClass} dropdown-toggle dropdown-toggle-split ${show ? 'show' : ''}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        onClick={toggleShow}
                        disabled={props.disable}>
                        <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul className={`dropdown-menu ${show ? 'show customClassUL' : ''} ${props.darkDropdown ? 'dropdown-menu-dark' : ''}`}>
                        {props.listItems.map((listItem) => (
                            <li id={listItem.id} role="menuitem" key={listItem.id} style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                                {props.isSelected && (
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(listItem.id)}
                                        onChange={() => handleCheckboxChange(listItem.id)}
                                        className="me-1"
                                    />

                                )}
                                {props.isSelected && (
                                    <img src={props.profileImage} className="me-1" alt="" height={20} width={20} />)}
                                {props.isSelected && (
                                    <RdsIcon
                                        colorVariant="dark"
                                        fill
                                        height="20px"
                                        isCursorPointer
                                        name={props.selectIcon}
                                        stroke={false}
                                        width="20px"
                                    />)}
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