import React, { useState } from "react";
import "./rds-navbar.css";

export interface RdsNavbarProps {
    size?: string;
    navbarItems: any[];
    title?: string;
}

const RdsNavbar = (props: RdsNavbarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" >
                <div className={`container-fluid  bg-light ${props.size === "small" ? "py-1" : props.size === "large" ? "py-3" : "py-2"}`} >
                    <a className="navbar-brand" href="#">
                        {props.title}
                    </a>
                    <button
                        className="navbar-toggler mb-2"
                        type="button"
                        onClick={toggleCollapse}
                        aria-expanded={!isCollapsed}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
                        <ul className="navbar-nav flex-row flex-wrap ms-md-auto">
                            {props.navbarItems.map((navbarItem, index) => (
                                <li key={index} className={`nav-item ${props.size === "small" ? "small" : props.size === "large" ? "large" : ""}`}>
                                    <a className={`nav-link ${navbarItem.navclass}`} aria-current="page" href={navbarItem.href}>
                                        {navbarItem.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default RdsNavbar;
