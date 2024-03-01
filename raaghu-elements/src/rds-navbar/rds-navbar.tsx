import React from "react";
import "./rds-navbar.css";

export interface RdsNavbarProps {
    size?: string;
    navbarItems: any[];
    title?: string;
}

const RdsNavbar = (props: RdsNavbarProps) => {
    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-light bg-light ${props.size == "small" ? "py-0" : props.size == "large" ? "py-3" : ""}`} >
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        {props.title}
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav flex-row flex-wrap ms-md-auto">
                            {props.navbarItems.map((navbarItem) => (
                                <li className={`nav-item ${props.size == "small" ? "small" : props.size == "large" ? "large" : ""}`}>
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