import React, { useEffect, useState } from "react";
import RdsIcon from "../rds-icon/rds-icon";
import useOutsideClick from "../rds-outside-click";
import RdsAvatar from "../rds-avatar";
import RdsSearch from "../rds-search";
import { useNavigate } from "react-router-dom";
import { AvatarSize } from "../rds-avatar/rds-avatar";
import { use } from "i18next";

export enum NavLayout {
    Raaghu = "Raaghu",
    List = "List",
    Toolbar = "Toolbar",
}

export enum NavType {
    Collapsed = "Collapsed",
    Expanded = "Expanded",
    Fixed = "Fixed",
}

export enum Platform {
    SideNavigationABPList = "Side Navigation-ABP List",
    SideNavigationANZList = "Side Navigation-ANZ List",
    Web = "Web",
    Mobile = "Mobile",
  }
  
  export interface RdsSideNavProps {
    sideNavItems: any;
    toggleTheme?: React.MouseEventHandler<HTMLInputElement>;
    collapse?: boolean;
    toggleClass?: boolean;
    layout?: string;
    showUserProfile?: boolean;
    logo?: string;
    navLayout?: NavLayout;
    navType?: NavType;
    platform?: Platform;
}

const RdsSideNav = (props: RdsSideNavProps) => {
    const [isLocked, setIsLocked] = useState(false);
    const [collapse, setCollapse] = useState(props.navType === "Collapsed");
    const [isMenuClick, setMenuClick] = useState(false);
    const [menuParentKey, setMenuParentKey] = useState("");
    const [menuKey, setMenuKey] = useState("");
    const [isShowOne, setShowOne] = useState(false);
    const [isShowTwo, setShowTwo] = useState(false);
    const mainMenu = props.sideNavItems;
    const labelObj: any = {};
    const [menuToShow, filterMenus] = useState(mainMenu);
    const [searchQuery, setSearchQuery] = useState("");
    const logo = props.logo ? props.logo : "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png";
    const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const navigatepage = useNavigate();

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
        setCollapse(props.navType === "Collapsed");
    }, [props.navType]);

    useEffect(() => {
        if (window.location.pathname !== props.sideNavItems) {
            setMenuClick(false);
        }
    }, [window.location.pathname]);

    useEffect(() => {
        console.log("props.sideNavItems", props.sideNavItems);
        filterMenus(props.sideNavItems);
    }, [props.sideNavItems]);

    useEffect(() => {
        if (props.navType === "Collapsed" || props.navType === "Fixed") {
            setCollapse(true);
        } else {
            setCollapse(false);
        }
    }, [props.navType]);

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
                        return true;
                    }
                    if (o.children) {
                        return (o.children = o.children.map(copy).filter(f)).length;
                    }
                    return false;
                });

                if (item?.length <= 0) {
                    setMenuParentKey("");
                    setMenuKey("");
                } else {
                    if (item[0].children) {
                        if (item[0].children[0].children) {
                            setMenuParentKey(item[0].key);
                            setMenuKey(item[0].children[0].key);
                        } else {
                            setMenuKey(item[0].key);
                        }
                    }
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
            setCollapse(false);
            localStorage.setItem("isMenuCollapse", false + "");
        }
    });

    const onMenuClick = (
        item: any,
        parent: any,
        level: number,
        isNavigate: boolean
    ) => {

        if (!item.children) {
            setActiveItem(item.key);
            setOpenMenus((prevOpenMenus) => {
                const newOpenMenus = { ...prevOpenMenus };
                Object.keys(newOpenMenus).forEach(key => {
                    if (key !== parent) {
                        newOpenMenus[key] = false;
                    }
                });
                return newOpenMenus;
            });
            return;
        }

        setOpenMenus((prevOpenMenus) => {
            const newOpenMenus = { [item.key]: !prevOpenMenus[item.key] };
            return newOpenMenus;
        });

        setActiveItem(item.key);

        setMenuClick(true);
        if (isNavigate) {
            setShowOne(false);
            if (window.innerWidth < 768) {
                setCollapse(!collapse);
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

    function handleLinkClick(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        path: string
    ): void {
        event.preventDefault();
        navigatepage(path);
    }

    const displayMenu = (items: any, parent: any, level: number) => {
        return items.map((item: any) => (
            <>
                <li
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
                                ? level === 1
                                    ? " ps-3 pe-2 "
                                    : "pe-2 "
                                : " ps-3 pe-1 ") +
                            (item.children ? "child " : "") +
                            (openMenus[item.key] ? "active " : "") +
                            (activeItem === item.key ? " active" : "")
                        }
                        aria-expanded={openMenus[item.key] ? "true" : "false"}
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
                {item.children && openMenus[item.key] && (
                    <ul
                        className={
                            (collapse
                                ? "list-unstyled ps-2 dropdown-menu "
                                : "list-unstyled")
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
                className={`${props.layout === "RightSideNav" ? "left-nav" : "aside"}`}
                id="aside"
            >
                {props.layout != "RightSideNav" && (
                    <div className="aside-right">
                        <div
                            className={`sidenav-footer text-center cursor-pointer rounded-5 d-flex align-items-center justify-content-center py-1 p-1 ${
                                props.toggleClass ? " show" : " hide"
                            } ${collapse ? "toggle-sidebar-menu show" : "toggle"}`}
                        >
                            <span className="collpase-button cursor-pointer d-flex lock-icon"
                                onMouseEnter={(e) => e.stopPropagation()}
                                onMouseLeave={(e) => e.stopPropagation()}>
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
                    className={`bd-links text-capitalize sidebar overflow-x-hidden overflow-y-auto pt-xxl-0 pt-xl-0 pt-lg-0 pt-md-0 pt-4 shadow px-1 side-navigation
                        ${props.toggleClass ? " show" : " hide"} ${collapse ? "toggle-sidebar-menu show" : "toggle" } ${props.layout === "LeftSideNavList" ? "d-flex flex-column justify-content-between":""} `}
                >
                    <div>
                        {props.layout != "RightSideNav" && (
                            <>
                                <br></br>
                                <img src={logo != "" ? logo : ""} className="ps-2" alt={logo != "" ? "Raaghu Side Navigation" : ""}
                                    style={{ height: "30px" }}></img>
                            </>
                        )}

                        {props.layout === "RightSideNav" && props.showUserProfile && (
                            <div className="align-items-align-items-start left-space mt-2">
                                <RdsAvatar
                                    firstName="Wai"
                                    lastName="Technologies"
                                    profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"
                                    role="Developer"
                                    size={AvatarSize.small}
                                    title="horizontal"
                                    withProfilePic
                                />
                            </div>
                        )}

                        {props.layout === "LeftSideNavList" && !props.collapse && (
                            <div className={`${collapse ? "LeftSideNavList" : "LeftSideNavListCollapse"}`}><RdsSearch
                                label=""
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => addFilter(e.target.value)}
                                iconPosition="right"
                                size="small"
                                id={`sidenavbar-search`}
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
                                size={AvatarSize.small}
                                title="horizontal"
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




// import React, { useEffect, useState } from "react";
// import RdsIcon from "../rds-icon/rds-icon";
// import useOutsideClick from "../rds-outside-click";
// import RdsAvatar from "../rds-avatar";
// import RdsSearch from "../rds-search";

// export interface RdsSideNavProps {
//   sideNavItems: any;
//   toggleTheme?: React.MouseEventHandler<HTMLInputElement>;
//   collapse?: boolean;
//   toggleClass?: boolean;
//   layout?: string;
//   showUserProfile?: boolean;
//   logo?: string;
// }

// const RdsSideNav = (props: RdsSideNavProps) => {
//     const [isLocked, setIsLocked] = useState(false);

//     const [collapse, setcollapse] = useState(true);
//     const [isMenuHover, setMenuHover] = useState(true);
//     const [isMenuClick, setMenuClick] = useState(false);
//     const [menuParentKey, setMenuParentKey] = useState("");
//     const [menuKey, setMenuKey] = useState(""); 
//     const [isShowOne, setShowOne] = useState(false);
//     const [isShowTwo, setShowTwo] = useState(false);  
//     const mainMenu = props.sideNavItems;
//     const labelObj: any = {};
//     const [hoveredItem, setHoveredItem] = useState("");
//     const [menuToShow, filterMenus] = useState(mainMenu);
//     const [searchQuery, setSearchQuery] = useState("");   
//     const logo = props.logo ? props.logo : "https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png";
//     const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
//     const [activeItem, setActiveItem] = useState<string | null>(null);
//     const addFilter = (value: string) => {
//         setSearchQuery(value);
    
//         if (value) {
//             const filteredProducts = mainMenu.filter((menuItem: { label: string, children?: any[] }) =>
//                 filterMenuItem(menuItem, value.toLowerCase())
//             );
//             filterMenus(filteredProducts);
//         } else {
//             filterMenus(mainMenu);
//         }
//     };
    
//     const filterMenuItem = (menuItem: { label: string, children?: any[] }, query: string): boolean => {
//         if (menuItem.label.toLowerCase().includes(query)) {
//             return true;
//         }
    
//         if (menuItem.children) {
//             return menuItem.children.some(child => filterMenuItem(child, query));
//         }
    
//         return false;
//     };


//     mainMenu.forEach((item: any) => {
//         labelObj[item.key] = false;
//     });
    
//     useEffect(() => {
//         setcollapse(collapse);
//     }, []);

//     useEffect(() => {
//         if (window.location.pathname !== props.sideNavItems) {
//             setMenuClick(false);
//         }
//     }, [window.location.pathname]);

//     const setIsShown = (event: boolean) => {
//         if (!isLocked) {
//             if (event && isMenuHover) {
//                 setcollapse(false);
//             } else if (!event && isMenuHover) {
//                 setcollapse(true);
//                 setShowOne(false);
//                 setShowTwo(false);
//             }
//             localStorage.setItem("isMenuCollapse", collapse + "");
//         }
//     };

//     const useLocationChange = (action: any) => {
//         React.useEffect(() => {
//             action(location);
//         }, [location, mainMenu]);
//     };

//     useLocationChange((location: any) => {
//         function copy(o: any) {
//             return Object.assign({}, o);
//         }

//         if (!isMenuClick) {
//             if (mainMenu.length != 0) {
//                 const item = mainMenu.map(copy).filter(function f(o: any) {
//                     if (o.path && o.path.indexOf(location.pathname) != -1) {
//                         return true;
//                     }
//                     if (o.children) {
//                         return (o.children = o.children.map(copy).filter(f)).length;
//                     }
//                     return false;
//                 });

//                 if (item?.length <= 0) {
//                      setMenuParentKey("");
//                     setMenuKey("");
//                 } else {
//                     if (item[0].children) {
//                         if (item[0].children[0].children) {
//                             setMenuParentKey(item[0].key);
//                             setMenuKey(item[0].children[0].key);
//                           } else {
//                             setMenuKey(item[0].key);
//                           }
//                     }
//                 }
//             }
//         }
//     });

//     const ref = useOutsideClick(() => {
//         if (collapse) {
//             setShowOne(false);
//             setShowTwo(false);
//         }
//         if (window.innerWidth < 768) {
//             setcollapse(false);
//             localStorage.setItem("isMenuCollapse", false + "");
//         }
//     });

//     const onMenuClick = (
//         item: any,
//         parent: any,
//         level: number,
//         isNavigate: boolean
//     ) => {       
       
//         if (!item.children) {
//             setActiveItem(item.key);
//             setOpenMenus((prevOpenMenus) => {
//                 const newOpenMenus = { ...prevOpenMenus };
//                 Object.keys(newOpenMenus).forEach(key => {
//                     if (key !== parent) {
//                         newOpenMenus[key] = false;
//                     }
//                 });
//                 return newOpenMenus;
//             });
//             return;
//         }

//         setOpenMenus((prevOpenMenus) => {
//             const newOpenMenus = { [item.key]: !prevOpenMenus[item.key] };
//             return newOpenMenus;
//         });

//         setActiveItem(item.key);

//         setMenuClick(true);
//         if (isNavigate) {
//               setShowOne(false);
//             if (window.innerWidth < 768) {
//                 setcollapse(!collapse);
//                 localStorage.setItem("isMenuCollapse", !collapse + "");
//             }
//             setShowTwo(false);
//             if (level == 1) {
//                 setMenuParentKey("");
//                 setMenuKey("");
//             }
//         } else {
//             if (menuKey == item.key && !collapse) {
//                 if (!parent) setMenuParentKey("");
//                 setMenuKey("");
//             } else if (menuParentKey == item.key && !collapse) {
//                 setMenuParentKey("");
//                 setMenuKey("");
//             } else {
//                 if (!parent) setMenuParentKey("");
//                 setMenuKey(item.key);
//             }
//             if (parent) {
//                 setMenuParentKey(parent);
//             }
//             if (level == 1 && menuParentKey == "") {
//                 if (menuKey == item.key) setShowOne(!isShowOne);
//                 else setShowOne(true);
//             } else if (level > 1) {
//                 if (parent == menuKey || item.key == menuKey) {
//                     setShowTwo(!isShowTwo);
//                 }
//             }
//         }
//     };

//     // Function to handle mouse enter on an li item
//     const handleMouseEnter = (itemKey: string) => {
//         setHoveredItem(itemKey);
//     };

//     // Function to handle mouse leave on an li item
//     const handleMouseLeave = () => {
//         setHoveredItem("");
//     };

//     function handleLinkClick(
//         event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
//         path: string
//     ): void {
//         event.preventDefault();
//         console.log("path", path);
//         window.history.pushState(null, "", path);
//     }

//     const displayMenu = (items: any, parent: any, level: number) => {
//         return items.map((item: any) => (
//             <>
//                 <li
//                     onMouseEnter={() => handleMouseEnter(item.key)}
//                     onMouseLeave={handleMouseLeave}
//                     className="pe-xxl-0 pe-xl-0 pe-lg-0 pe-md-0 pe-0"
//                     value={item.key + "_" + parent}
//                     onClick={() => onMenuClick(item, parent, level, !item.children)}
                   
//                 >
//                     <a
//                         href={item.path}
//                         onClick={(e) => handleLinkClick(e, item.path)}
//                         className={
//                             "align-items-center d-inline-flex text-decoration-none cursor-pointer" +
//                             (collapse
//                                 ? level === 1
//                                     ? " ps-3 pe-2 "
//                                     : "pe-2 "
//                                 : " ps-3 pe-1 ") +
//                             (item.children ? "child " : "") +
//                             (openMenus[item.key] ? "active " : "") +
//                             (activeItem === item.key ? " active" : "")
//                         }
//                         aria-expanded={openMenus[item.key] ? "true" : "false"}                       
//                     >
//                         <span>
//                             {item.iconPath ? (
//                                 <RdsIcon
//                                     iconPath={item.iconPath}
//                                     fill={false}
//                                     stroke={true}
//                                     height="24px"
//                                     width="24px"
//                                     classes="me-2"
//                                     type="lottie"
//                                     isHovered={hoveredItem === item.key}
//                                 ></RdsIcon>
//                             ) : (
//                                 <RdsIcon
//                                     name={item.icon}
//                                     fill={false}
//                                     stroke={true}
//                                     height="20px"
//                                     width="20px"
//                                     classes="me-2 "
//                                 ></RdsIcon>
//                             )}
//                         </span>
//                         <span style={{ lineHeight: "initial" }} className={collapse ? "menuLabels" : ""}
//                         >
//                             {item.label}
//                         </span>
//                     </a>
//                 </li>
//                 {item.children && openMenus[item.key] &&(
//                     <ul
//                         className={
//                             (collapse
//                                 ? "list-unstyled ps-2 dropdown-menu "
//                                 : "list-unstyled")                           
//                         }
//                     >
//                         {displayMenu(item.children, item.key, level + 1)}
//                     </ul>
//                 )}
//             </>
//         ));
//     };

//     return (
//         <>
//             <div
//                 className={`${props.layout === "RightSideNav" ? "right-nav" : "aside"}`}
//                 id="aside"
//                 onMouseEnter={props.layout !== "RightSideNav" ? () => setIsShown(true) : undefined}
//                 onMouseLeave={props.layout !== "RightSideNav" ? () => setIsShown(false) : undefined}
//             >

//                 {props.layout != "RightSideNav" && (
//                     <div className="aside-right">
//                     <div
//                         className={`sidenav-footer text-center cursor-pointer rounded-5 d-flex align-items-center justify-content-center py-1 p-1 ${
//                             props.toggleClass ? " show" : " hide"
//                         } ${collapse ? "toggle-sidebar-menu show" : "toggle"}`}
//                     >
//                         <span className="collpase-button cursor-pointer d-flex lock-icon"
//                             onMouseEnter={(e) => e.stopPropagation()}
//                             onMouseLeave={(e) => e.stopPropagation()}>
//                                 <RdsIcon
//                                 name={!isLocked ? "unlock" : "lock_nav"}
//                                 height="21px"
//                                 width="21px"
//                                 stroke={true}
//                                 fill={false}
//                                 strokeWidth="1.2"
//                                 colorVariant="white"
//                                 onClick={() => setIsLocked(!isLocked)}
//                             ></RdsIcon>
//                         </span>
//                     </div>
//                     </div>
//                 )}
                
//                 <nav
//                     id="sidebar"
//                     ref={ref}
//                     className={`bd-links text-capitalize sidebar overflow-x-hidden overflow-y-auto pt-xxl-0 pt-xl-0 pt-lg-0 pt-md-0 pt-4 shadow px-1
//                         ${props.toggleClass ? " show" : " hide"} ${collapse ? "toggle-sidebar-menu show" : "toggle" } ${props.layout === "LeftSideNavList" ? "d-flex flex-column justify-content-between":""} `}
//                 >
//                     <div>
//                         {props.layout != "RightSideNav" && (
//                             <>  
//                                 <br></br>
//                                 <img src={logo!= "" ? logo : ""} className="ps-2" alt={logo != ""? "Raaghu Side Navigation" : ""} 
//                                     style={{ height:"30px" }}></img>
//                             </>
//                         )}

//                         {props.layout === "RightSideNav" && props.showUserProfile && (
//                             <div className="align-items-align-items-start left-space">
//                                 <RdsAvatar
//                                     firstName="Wai"
//                                     lastName="Technologies"
//                                     profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"
//                                     role="Developer"
//                                     size="small"
//                                     titleAlign="horizontal"
//                                     withProfilePic
//                                 />
//                             </div>
//                         )}

//                         {props.layout === "LeftSideNavList" && !props.collapse && (
//                             <div className={`${collapse ? "LeftSideNavList" : "LeftSideNavListCollapse" }`}><RdsSearch 
//                                 label=""
//                                 placeholder="Search"
//                                 value={searchQuery}
//                                 onChange={(e) => addFilter(e.target.value)}
//                                 iconPosition="right"
//                                 size="small"
//                                 id={`sidenavbar-search`}
//                             />
//                             </div>
//                         )}
//                         {props.layout === "LeftSideNavList" && props.collapse && (
//                             <RdsIcon 
//                                 name="search"
//                                 colorVariant="primary"
//                             />
//                         )}

//                         <ul className="list-unstyled pb-5 pd-md-0 mb-5 mb-md-0 pt-3 mb-auto">
//                             {menuToShow.length != 0 ? displayMenu(menuToShow, "", 1) : ""}
//                         </ul>

//                     </div>
//                     {props.layout === "LeftSideNavList" && props.showUserProfile && (
//                         <ul className="align-items-end left-space-listing pb-0">
//                             <RdsAvatar
//                                 firstName="Wai"
//                                 lastName="Technologies"
//                                 profilePic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"
//                                 role="Developer"
//                                 size="small"
//                                 titleAlign="horizontal"
//                                 withProfilePic
//                             />
//                         </ul>
//                     )}
//                 </nav>                
//             </div>
//         </>
//     );
// };

// export default RdsSideNav;
