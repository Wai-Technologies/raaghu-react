import React, { ReactNode, useState } from "react";

export interface RdsDropdownProps {
    colorVariant: string;
    size: string;
    darkDropdown: boolean;
    label: string;
    displayType?: 'dropdown' | 'split';
    listItems: any[];
    id: string;
}

const RdsDropdown = (props: RdsDropdownProps) => {

    const [show, setShow] = useState(false);
    let size: "btn-sm" | "btn-lg" | undefined = undefined;
    if (props.size == "small") {
        size = "btn-sm";
    } else if (props.size == "large") {
        size = "btn-lg";
    }

    const toggleShow = () => {
        setShow(!show);
    };

    return (
        <>
            {props.displayType === 'dropdown' && (
                <div className="dropdown">
                    <button className={`btn btn-${props.colorVariant} ${size} dropdown-toggle ${show ? 'show' : ''}`}
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false" onClick={toggleShow}>
                        {props.label}
                    </button>
                    <ul className={`dropdown-menu ${show ? 'show' : ''} ${props.darkDropdown ? 'dropdown-menu-dark' : ' '}`} aria-labelledby="dropdownMenuButton1">
                        {props.listItems.map((listItem) => (
                            <li id={listItem.id} role="menuitem">
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
                    <button type="button" className={`btn btn-${props.colorVariant}  ${size}`}> {props.label}</button>
                    <button type="button" className={`btn btn-${props.colorVariant}  ${size} dropdown-toggle dropdown-toggle-split ${show ? 'show' : ''}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false" onClick={toggleShow}>
                        <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul className={`dropdown-menu ${show ? 'show customClassUL' : ''} ${props.darkDropdown ? 'dropdown-menu-dark' : ' '}`}>
                        {props.listItems.map((listItem) => (
                            <li id={listItem.id} role="menuitem">
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
