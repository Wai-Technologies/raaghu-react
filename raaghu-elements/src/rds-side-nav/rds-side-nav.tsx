import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import RdsIcon from "../rds-icon/rds-icon";
import { useTranslation } from "react-i18next";
import useOutsideClick from "../rds-outside-click";

export interface RdsSideNavProps {
    sideNavItems: any;
    toggleTheme?: React.MouseEventHandler<HTMLInputElement>;
    collapse?: boolean;
    toggleClass?: boolean;
}

const RdsSideNav = (props: RdsSideNavProps) => {

    const { t } = useTranslation();
    const [collapse, setcollapse] = useState(true);
    const [isMenuHover, setMenuHover] = useState(true);
    const [isMenuClick, setMenuClick] = useState(false);
    const [menuParentKey, setMenuParentKey] = useState("");
    const [menuKey, setMenuKey] = useState("");
    const [menuNodeKey, setMenuNodeKey] = useState("");
    const [isShowOne, setShowOne] = useState(false);
    const [isShowTwo, setShowTwo] = useState(false);
    const [isOnNavigate, setOnNavigate] = useState(false);
    const mainMenu = props.sideNavItems;
    const labelObj: any = {};
    const [hoveredItem, setHoveredItem] = useState(""); 



    mainMenu.forEach((item: any) => {
        labelObj[item.key] = false;
    });
    const [hoverState, setHoverState] = useState(labelObj);

    const onCollapse = () => {
        setcollapse(!collapse);
        localStorage.setItem("isMenuCollapse", !collapse + "");
        setMenuHover(collapse);
    };

    useEffect(() => {
        setcollapse(collapse);
    }, []);

    useEffect(() => {


        if (window.location.pathname !== props.sideNavItems) {
            setMenuClick(false);
        }

    }, [window.location.pathname])


    const setIsShown = (event: boolean) => {
        if (event && isMenuHover) {
            setcollapse(false);
        } else if (!event && isMenuHover) {
            setcollapse(true);
            setShowOne(false);
            setShowTwo(false);
        }
        localStorage.setItem("isMenuCollapse", collapse + "");
    };

    const useLocationChange = (action: any) => {
        const location = useLocation();
        React.useEffect(() => {
            action(location);
        }, [location, mainMenu]);
    };

    useLocationChange((location: any) => {
        function copy(o: any) {
            return Object.assign({}, o);
        }

        if (!isMenuClick) {
            if (mainMenu.length != 0) {
                const item = mainMenu.map(copy).filter(function f(o: any) {
                    if (o.path && o.path.indexOf(location.pathname) != -1) {
                        setMenuNodeKey(o.key);
                        return true;
                    }
                    if (o.children) {
                        return (o.children = o.children.map(copy).filter(f)).length;
                    }
                    return false;
                });

                if (item?.length <= 0) {
                    setMenuNodeKey("");
                    setMenuParentKey("");
                    setMenuKey("");
                } else {
                    if (item[0].children) {
                        if (item[0].children[0].children) {
                            setMenuParentKey(item[0].key);
                            setMenuKey(item[0].children[0].key);
                            setMenuNodeKey(item[0].children[0].children[0].key);
                        } else {
                            setMenuKey(item[0].key);
                            setMenuNodeKey(item[0].children[0].key);
                        }

                    } else {
                        setMenuNodeKey(item[0].key);
                    }
                    setOnNavigate(true);
                }
            }
        }
    });

    const ref = useOutsideClick(() => {
        if (collapse) {
            setShowOne(false);
            setShowTwo(false);
        }
        if (window.innerWidth < 768) {
            setcollapse(false);
            localStorage.setItem("isMenuCollapse", false + "");
        }
    });

    const onMenuClick = (item: any, parent: any, level: number, isNavigate: boolean) => {
        setMenuClick(true);
        if (isNavigate) {
            setMenuNodeKey(item.key);
            setShowOne(false);
            if (window.innerWidth < 768) {
                setcollapse(!collapse);
                localStorage.setItem("isMenuCollapse", !collapse + "");
            }
            setShowTwo(false);
            if (level == 1) {
                setMenuParentKey("");
                setMenuKey("");
            }
        } else {
            if (menuKey == item.key && !collapse) {
                if (!parent) setMenuParentKey("");
                setMenuKey("");
            } else if (menuParentKey == item.key && !collapse) {
                setMenuParentKey("");
                setMenuKey("");
            } else {
                if (!parent) setMenuParentKey("");
                setMenuKey(item.key);
            }
            if (parent) {
                setMenuParentKey(parent);
            }
            if (level == 1 && menuParentKey == "") {
                if (menuKey == item.key)
                    setShowOne(!isShowOne);
                else
                    setShowOne(true);
            } else if (level > 1) {
                if (parent == menuKey || item.key == menuKey) {
                    setShowTwo(!isShowTwo);
                }
            }
        }
    };

    // Function to handle mouse enter on an li item
    const handleMouseEnter = (itemKey: string) => {
        setHoveredItem(itemKey);
    };

    // Function to handle mouse leave on an li item
    const handleMouseLeave = () => {
        setHoveredItem("");
    };

    const displayMenu = (items: any, parent: any, level: number) => {

        return (
            items.map((item: any) => (
                <>
                    <li onMouseEnter={() => handleMouseEnter(item.key)}
                        onMouseLeave={handleMouseLeave} className="pe-xxl-0 pe-xl-0 pe-lg-0 pe-md-0 pe-0" value={item.key + "_" + parent} onClick={() => onMenuClick(item, parent, level, !item.children)}>
                        <Link to={item.path} className={"align-items-center d-inline-flex text-decoration-none cursor-pointer"
                            + (collapse ? level == 1 ? " ps-3 pe-2 " : "pe-2 " : " ps-3 pe-1 ")
                            + (item.children ? "child " : "")
                            + (level == 2 ? " ps-4 ms-xxl-2 ms-xl-2 ms-lg-2 ms-md-2 sidebar-childmenu " : (level == 3 ? " ps-xxl-4 ps-xl-4 ps-lg-4 ps-md-4 ps-5 ms-xxl-3 ms-xl-3 ms-lg-3 ms-md-3 sidebar-childmenu " : ""))
                            // + ((level == 2 && !collapse) ? " ps-xxl-4 ps-xl-4 ps-lg-4 ps-md-4 ps-1 " : ((level == 3 && !collapse) ? " ps-xxl-5 ps-xl-5 ps-lg-5 ps-md-5 ps-1 " : ""))
                            // + ((level == 2 && collapse) ? " ps-xxl-1 ps-xl-1 ps-lg-1 ps-md-1 ps-0 " : ((level == 3 && collapse) ? " ps-xxl-1 ps-xl-1 ps-lg-1 ps-md-1 ps-0 " : ""))
                            + ((item.key == menuKey || item.key == menuParentKey || item.key == menuNodeKey) && isOnNavigate ? "active " : "")
                            + ((parent == menuKey)
                                ? "d-block "
                                : ((level != 1 && parent != menuParentKey)
                                    ? "d-none " : ""))
                        } aria-expanded={((item.key == menuKey || item.key == menuParentKey) ? "true" : "false")}>
                            <span>
                                {item.iconPath ?
                                    <RdsIcon
                                        iconPath={item.iconPath}
                                        
                                        fill={false}
                                        stroke={true}
                                        height="24px"
                                        width="24px"
                                        classes="me-2"
                                        type="lottie" isHovered={hoveredItem === item.key}
                                    // classes={"me-2 " + (level === 1 ? "text-primary " : "")}
                                    ></RdsIcon>
                                    :
                                    <RdsIcon
                                        name={item.icon}
                                        fill={false}
                                        stroke={true}

                                        height="20px"

                                        width="20px"

                                        classes="me-2 "



                                    // classes={"me-2 " + (level === 1 ? "text-primary " : "")}

                                    ></RdsIcon>
                                }
                            </span>
                            <span style={{ lineHeight: 'initial' }} className={collapse ? 'menuLabels' : ''}>{t(item.label)}</span>
                        </Link>
                    </li>
                    {
                        item.children && <ul className={((collapse)
                            ? "list-unstyled ps-2 dropdown-menu "
                            : "list-unstyled")
                            + ((collapse && (level >= 1 && item.key == menuKey))
                                ? (isShowOne ? "show " : "")
                                : ((collapse && (level >= 1 && item.key == menuParentKey))
                                    ? (isShowTwo ? "show " : "")
                                    : ""))}>
                            {
                                displayMenu(item.children, item.key, level + 1)
                            }
                        </ul>
                    }
                </>
            ))
        );
    };

    return (
        <>
            <nav
                id="sidebar" ref={ref}
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
                className={`bd-links text-capitalize sidebar overflow-x-hidden overflow-y-auto pt-xxl-0 pt-xl-0 pt-lg-0 pt-md-0 pt-4 shadow
               ${props.toggleClass ? " show" : " hide"} ${collapse ? "toggle-sidebar-menu show" : "toggle"}`}>
                <ul className="list-unstyled pb-5 pd-md-0 mb-5 mb-md-0">
                    {
                        mainMenu.length != 0 ? displayMenu(mainMenu, "", 1) : ""
                    }
                </ul>
                <div className={`sidenav-footer text-center cursor-pointer rounded-5 d-flex align-items-center justify-content-center py-1 p-1 d-xxl-none d-xl-none d-lg-none d-md-none ${collapse ? "" : ""}`}>
                    <span className="collpase-button cursor-pointer d-flex">
                        <RdsIcon
                            name="chevron_right_arrow"
                            height="10px"
                            width="10px"
                            stroke={true}
                            fill={false}
                            strokeWidth="1"
                            onClick={onCollapse}
                            colorVariant="white"
                        ></RdsIcon>
                    </span>
                </div>
            </nav>
        </>
    );
};

export default RdsSideNav;
