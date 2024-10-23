import React, { useEffect, useState } from "react";
import RdsIcon from "../rds-icon/rds-icon";
import useOutsideClick from "../rds-outside-click";
import RdsAvatar from "../rds-avatar";
import RdsSearch from "../rds-search";

export interface RdsSideNavProps {
  sideNavItems: any;
  toggleTheme?: React.MouseEventHandler<HTMLInputElement>;
  collapse?: boolean;
  toggleClass?: boolean;
  layout?: string;
  showUserProfile?: boolean;
  logo?: string;
}

const RdsSideNav = (props: RdsSideNavProps) => {
    const [isLocked, setIsLocked] = useState(false);

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
    const [menuToShow, filterMenus] = useState(mainMenu);
    const [searchQuery, setSearchQuery] = useState("");

    const addFilter = (value: string) => {
        setSearchQuery(value);
    
        if (value) {
            const filteredProducts = mainMenu.filter((menuItem: { label: string, children?: any[] }) =>
                filterMenuItem(menuItem, value.toLowerCase())
            );
            filterMenus(filteredProducts);
        } else {
            filterMenus(mainMenu);
        }
    };
    
    const filterMenuItem = (menuItem: { label: string, children?: any[] }, query: string): boolean => {
        if (menuItem.label.toLowerCase().includes(query)) {
            return true;
        }
    
        if (menuItem.children) {
            return menuItem.children.some(child => filterMenuItem(child, query));
        }
    
        return false;
    };


    mainMenu.forEach((item: any) => {
        labelObj[item.key] = false;
    });
    
    useEffect(() => {
        setcollapse(collapse);
    }, []);

    useEffect(() => {
        if (window.location.pathname !== props.sideNavItems) {
            setMenuClick(false);
        }
    }, [window.location.pathname]);

    const setIsShown = (event: boolean) => {
        if (!isLocked) {
            if (event && isMenuHover) {
                setcollapse(false);
            } else if (!event && isMenuHover) {
                setcollapse(true);
                setShowOne(false);
                setShowTwo(false);
            }
            localStorage.setItem("isMenuCollapse", collapse + "");
        }
    };

    const useLocationChange = (action: any) => {
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

    const onMenuClick = (
        item: any,
        parent: any,
        level: number,
        isNavigate: boolean
    ) => {
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
                if (menuKey == item.key) setShowOne(!isShowOne);
                else setShowOne(true);
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

    function handleLinkClick(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        path: string
    ): void {
        event.preventDefault();
        console.log("path", path);
        window.history.pushState(null, "", path);
    }

    const displayMenu = (items: any, parent: any, level: number) => {
        return items.map((item: any) => (
            <>
                <li
                    onMouseEnter={() => handleMouseEnter(item.key)}
                    onMouseLeave={handleMouseLeave}
                    className="pe-xxl-0 pe-xl-0 pe-lg-0 pe-md-0 pe-0"
                    value={item.key + "_" + parent}
                    onClick={() => onMenuClick(item, parent, level, !item.children)}
                >
                    <a
                        href={item.path}
                        onClick={(e) => handleLinkClick(e, item.path)}
                        className={
                            "align-items-center d-inline-flex text-decoration-none cursor-pointer" +
                          (collapse
                              ? level == 1
                                  ? " ps-3 pe-2 "
                                  : "pe-2 "
                              : " ps-3 pe-1 ") +
                          (item.children ? "child " : "") +
                          (level == 2
                              ? " ps-4 ms-xxl-2 ms-xl-2 ms-lg-2 ms-md-2 sidebar-childmenu "
                              : level == 3
                                  ? " ps-xxl-4 ps-xl-4 ps-lg-4 ps-md-4 ps-5 ms-xxl-3 ms-xl-3 ms-lg-3 ms-md-3 sidebar-childmenu "
                                  : "") + 
                          (level == 2 && !collapse
                              ? " ps-xxl-4 ps-xl-4 ps-lg-4 ps-md-4 ps-1 "
                              : level == 3 && !collapse
                                  ? " ps-xxl-5 ps-xl-5 ps-lg-5 ps-md-5 ps-1 "
                                  : "") +
                          (level == 2 && collapse
                              ? " ps-xxl-1 ps-xl-1 ps-lg-1 ps-md-1 ps-0 "
                              : level == 3 && collapse
                                  ? " ps-xxl-1 ps-xl-1 ps-lg-1 ps-md-1 ps-0 "
                                  : "") +
                          ((item.key == menuKey ||
                            item.key == menuParentKey ||
                            item.key == menuNodeKey) &&
                          isOnNavigate ? "active " : "") +
                          (parent == menuKey? "d-block " : level != 1 && parent != menuParentKey? "d-none ": "")
                        }
                        aria-expanded={
                            item.key == menuKey || item.key == menuParentKey
                                ? "true"
                                : "false"
                        }
                    >
                        <span>
                            {item.iconPath ? (
                                <RdsIcon
                                    iconPath={item.iconPath}
                                    fill={false}
                                    stroke={true}
                                    height="24px"
                                    width="24px"
                                    classes="me-2"
                                    type="lottie"
                                    isHovered={hoveredItem === item.key}
                                ></RdsIcon>
                            ) : (
                                <RdsIcon
                                    name={item.icon}
                                    fill={false}
                                    stroke={true}
                                    height="20px"
                                    width="20px"
                                    classes="me-2 "
                                ></RdsIcon>
                            )}
                        </span>
                        <span style={{ lineHeight: "initial" }} className={collapse ? "menuLabels" : ""}
                        >
                            {item.label}
                        </span>
                    </a>
                </li>
                {item.children && (
                    <ul
                        className={
                            (collapse
                                ? "list-unstyled ps-2 dropdown-menu "
                                : "list-unstyled") +
                            (collapse && level >= 1 && item.key == menuKey
                                ? isShowOne
                                    ? "show "
                                    : ""
                                : collapse && level >= 1 && item.key == menuParentKey
                                    ? isShowTwo
                                        ? "show "
                                        : ""
                                    : "")
                        }
                    >
                        {displayMenu(item.children, item.key, level + 1)}
                    </ul>
                )}
            </>
        ));
    };

    return (
        <>
            <div
                className={`${props.layout === "RightSideNav" ? "right-nav" : "aside"}`}
                id="aside"
                onMouseEnter={props.layout !== "RightSideNav" ? () => setIsShown(true) : undefined}
                onMouseLeave={props.layout !== "RightSideNav" ? () => setIsShown(false) : undefined}
            >

                {props.layout != "RightSideNav" && (
                    <div className="aside-right">
                    <div
                        className={`sidenav-footer text-center cursor-pointer rounded-5 d-flex align-items-center justify-content-center py-1 p-1 ${
                            props.toggleClass ? " show" : " hide"
                        } ${collapse ? "toggle-sidebar-menu show" : "toggle"}`}
                    >
                        <span className="collpase-button cursor-pointer d-flex lock-icon">
                            <RdsIcon
                                name={!isLocked ? "unlock" : "lock_nav"}
                                height="21px"
                                width="21px"
                                stroke={true}
                                fill={false}
                                strokeWidth="1.2"
                                colorVariant="white"
                                onClick={() => setIsLocked(!isLocked)}
                            ></RdsIcon>
                        </span>
                    </div>
                    </div>
                )}
                
                <nav
                    id="sidebar"
                    ref={ref}
                    className={`bd-links text-capitalize sidebar overflow-x-hidden overflow-y-auto pt-xxl-0 pt-xl-0 pt-lg-0 pt-md-0 pt-4 shadow px-1
                        ${props.toggleClass ? " show" : " hide"} ${collapse ? "toggle-sidebar-menu show" : "toggle" } ${props.layout === "LeftSideNavList" ? "d-flex flex-column justify-content-between":""} `}
                >
                    <div>
                        {props.layout != "RightSideNav" && (
                            <>  
                                <br></br>
                                <img src={props.logo!= "" ? props.logo : ""} className="ps-2" alt={props.logo != ""? "Raaghu Side Navigation" : ""} 
                                    style={{ height:"30px" }}></img>
                            </>
                        )}

                        {props.layout === "RightSideNav" && props.showUserProfile && (
                            <div className="align-items-align-items-start left-space">
                                <RdsAvatar
                                    firstName="Wai"
                                    lastName="Technologies"
                                    profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"
                                    role="Developer"
                                    size="small"
                                    titleAlign="horizontal"
                                    withProfilePic
                                />
                            </div>
                        )}

                        {props.layout === "LeftSideNavList" && !props.collapse && (
                            <div className="LeftSideNavList"><RdsSearch 
                                label=""
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => addFilter(e.target.value)}
                                iconPosition="right"
                                size="small"
                            />
                            </div>
                        )}
                        {props.layout === "LeftSideNavList" && props.collapse && (
                            <RdsIcon 
                                name="search"
                                colorVariant="primary"
                            />
                        )}

                        <ul className="list-unstyled pb-5 pd-md-0 mb-5 mb-md-0 pt-3 mb-auto">
                            {menuToShow.length != 0 ? displayMenu(menuToShow, "", 1) : ""}
                        </ul>

                    </div>
                    {props.layout === "LeftSideNavList" && props.showUserProfile && (
                        <ul className="align-items-end left-space-listing pb-0">
                            <RdsAvatar
                                firstName="Wai"
                                lastName="Technologies"
                                profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"
                                role="Developer"
                                size="small"
                                titleAlign="horizontal"
                                withProfilePic
                            />
                        </ul>
                    )}
                </nav>                
            </div>
        </>
    );
};

export default RdsSideNav;
