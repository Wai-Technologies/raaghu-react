import React, { useState, useEffect, useRef } from "react";
import "./rds-profile-dropdown.css";

export interface RdsProfileDropdownProps {
    profileImage: string;
    listOptions: string[];
    footer: string;
}

const RdsProfileDropdown = (props: RdsProfileDropdownProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="profile-dropdown-container">
            <div className="profile-avatar-container">
                <img
                    src={props.profileImage}
                    alt="Profile"
                    className="profile-avatar"
                    onClick={toggleDropdown}
                />
            </div>
            {isDropdownOpen && (
                <div id="profile-dropdown">
                    <ul className="dropdown-menu show menu-color">
                        {props.listOptions.map((option, index) => (
                            <li key={index}>{option}</li>
                        ))}
                        <hr className="m-0 border-gray-300"/>
                        <li className="highlight-option">{props.footer}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RdsProfileDropdown;
