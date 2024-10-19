import React, { useEffect, useState } from "react";
import RdsIcon from "../rds-icon/rds-icon";
import useOutsideClick from "../rds-outside-click";
import RdsAvatar from "../rds-avatar";
import RdsDropdownList from "../rds-dropdown-list";
export interface RdsSideNavProps {
  isChatPermission: string;
  sideNavItems?: any;
  collapse?: boolean;
  toggleClass?: boolean;
  brandLogo?: string;
  layoutType?: string;
  listOneTitle?: string;
  listOne?: any;
  listTwoTitle?: string;
  listSecond?: any;
  profilePic?: string;
  brandName?: string;
  langaugeItems?: any[];
  themeItems?: any[];
  profileFirstName?: string;
  profileLastName?: string;
  profileEmail?: string;
  profileTitle?: string;
  role?: string;
  profileSize?: "smallest" | "small" | "large" | "medium" | "largest";
  colorVariantForActiveDot?: "primary" | "success" | "danger" | "warning" | "light" | "info" | "secondary" | "dark";
  onClick?: (event: React.MouseEvent<HTMLLIElement>, val: string) => void;
  toggleTheme?: React.MouseEventHandler<HTMLInputElement>;
  onClickThemeCheck?: (
    event: React.MouseEvent<HTMLLIElement>,
    val: string
  ) => void;
    chatsHandler?: (Event: React.MouseEvent<HTMLButtonElement>) => void;
    mobileViewLogoClick?: (Event: React.MouseEvent<HTMLButtonElement>) => void;

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
  const mainMenu = (props.sideNavItems || props.listOne) || [];
  const listTwo = props.listSecond || [];

  const labelObj: any = {};
  const [hoveredItem, setHoveredItem] = useState("");

  mainMenu.forEach((item: any) => {
    labelObj[item.key] = false;
  });
  const [hoverState, setHoverState] = useState(labelObj);
  const currentPath = window.location.pathname;

  const onCollapse = () => {
    if (!isLocked) {
      // Only toggle if not locked
      setcollapse(!collapse);
      localStorage.setItem("isMenuCollapse", !collapse + "");
      setMenuHover(collapse);
    }
  };

  useEffect(() => {
    setcollapse(collapse);
  }, []);

  useEffect(() => {
    if (window.location.pathname !== props.sideNavItems) {
      setMenuClick(false);
    }
  }, [window.location.pathname]);

  useEffect(() => {
    if (props.layoutType === "basic-expanded" || props.layoutType === "list-expanded") {
      setcollapse(false);
    }
  }, [props.layoutType]);

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
              isOnNavigate
                ? "active "
                : "") +
              (parent == menuKey
                ? "d-block "
                : level != 1 && parent != menuParentKey
                ? "d-none "
                : "")
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
                  tooltipTitle={item.label}
                  tooltip={(props.layoutType === "basic-collapsed" || props.layoutType === "list-collapsed" ) ? true : false}
                  tooltipPlacement="auto"
                  // classes={"me-2 " + (level === 1 ? "text-primary " : "")}
                ></RdsIcon>
              ) : (
                <RdsIcon
                  name={item.icon}
                  fill={false}
                  stroke={true}
                  height="20px"
                  width="20px"
                  classes="me-2 "
                  tooltipTitle={item.label}
                  tooltip={(props.layoutType === "basic-collapsed" || props.layoutType === "list-collapsed" ) ? true : false}
                  tooltipPlacement="auto"

                  // classes={"me-2 " + (level === 1 ? "text-primary " : "")}
                ></RdsIcon>
              )}
            </span>
            <span
              style={{ lineHeight: "initial" }}
              className={collapse ? "menuLabels" : ""}
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
  const onClickHandler = (e: any, val: any) => {
    if (props.onClick) {
      props.onClick(e, val);
    }
  };
  const onClicktheme = (e: any, val: string) => {
    if (props.onClickThemeCheck) {
      props.onClickThemeCheck(e, val);
    }
  };

  return (
    <>
    
    {(props.layoutType !="right-collapsed") &&(props.layoutType=="list-expanded" || props.layoutType=="basic-expanded" || props.layoutType=="basic-collapsed" || props.layoutType=="list-collapsed") && (  
      <div
        className={`aside`}
        id="aside"
        onMouseEnter={() => (props.layoutType === "basic-collapsed" || props.layoutType === "list-collapsed") ? setIsShown(false) : setIsShown(true)}
        onMouseLeave={() => (props.layoutType == "basic-expanded" || props.layoutType === "list-expanded") ? setIsShown(true) : setIsShown(false)}
      >
        <div
          className={` ${props.layoutType=='list-expanded' ?'sidenav-footer':''}  text-center cursor-pointer rounded-5 d-flex align-items-center justify-content-center py-1 p-1 ${
            props.toggleClass ? " show" : " hide"
          } ${collapse ? "toggle-sidebar-menu show" : "toggle"}`}
        >
         { props.layoutType=='list-expanded'  && ( <span className="collpase-button cursor-pointer d-flex lock-icon">
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
          </span>)}
        </div>
        <nav
          id="sidebar"
          ref={ref}
          className={`bd-links text-capitalize sidebar overflow-x-hidden overflow-y-auto pt-xxl-0 pt-xl-0 pt-lg-0 pt-md-0 pt-4 shadow px-1
               ${props.toggleClass ? " show" : " hide"} ${
            collapse ? "toggle-sidebar-menu show" : "toggle"
          }`}
        >
          <ul className="list-unstyled pt-3 ">
                  <li className="nav-logo">
                    <img className="cursor-pointer sidenav-mobile-logo p-1" src={props.brandLogo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
                  </li>
          </ul>
          {(props.layoutType == "list-expanded" || props.layoutType =="list-collapsed") &&( <div className="sidebar-search px-3 mb-4">
              <input
                type="text"
                placeholder="Search"
                className="form-control "
              />
            </div>)}
            
          <ul className="list-unstyled pd-md-0 mb-md-0 pt-0">
           {(props.layoutType == "list-expanded" || props.layoutType =="list-collapsed") && (   <li className="nav-section-title p-2">{props.listOneTitle}</li>)}
            {mainMenu.length != 0 ? displayMenu(mainMenu, "", 1) : ""}
          </ul>
          {(props.layoutType == "list-expanded" || props.layoutType =="list-collapsed") &&(
          <ul className="list-unstyled  pd-md-0  mb-md-0 pt-0">
            <li className="nav-section-title p-2">{props.listTwoTitle}</li>
            {listTwo.length != 0 ? displayMenu(listTwo, "", 1) : ""}
          </ul>
          )}

        <div className="sidebar-footer text-center mt-auto mb-2">
          
          { props.layoutType =="list-collapsed" && (
            <>
            <hr />
            <RdsAvatar
            activeDotBottom
            avtarWithName
            colorVariant={props.colorVariantForActiveDot}
            firstName={props.profileFirstName}
            lastName={props.profileLastName}
            profilePic={props.profilePic}
            role={props.role}
            size={props.profileSize}
                 />
            </>
          )}
              {props.layoutType == 'list-expanded'  && ( 
                <>
                <hr />
                <RdsAvatar
                    activeDotBottom
                    activeDotTop ={false}
                    activityChain = {false}
                    avtarWithName
                    colorVariant={props.colorVariantForActiveDot}
                    firstName={props.profileFirstName}
                    lastName={props.profileLastName}
                    profilePic= {props.profilePic}
                    role={props.role}
                    size={props.profileSize}
                  />
              </>
                  )}
            </div>
      
         
        </nav>
        </div>
    )}


    { props.layoutType =='right-collapsed' &&(
       <div>
       <nav className="w-25">
         <div className="d-flex flex-column align-items-center right-side-menu shadow w-25 pt-2">
           <div className="px-2 px-md-3 d-none d-lg-block mb-3">
           <RdsAvatar
           activeDotBottom
           avtarOnly
           colorVariant={props.colorVariantForActiveDot}
           firstName={props.profileFirstName}
           lastName={props.profileLastName}
           profilePic={props.profilePic}
           role={props.role}
           size={props.profileSize}
                />
           </div>
         
           <div
             className={`position-relative px-2 px-md-3 mb-3 
             }  col text-center d-flex align-items-center language`}
           >
             <RdsDropdownList
               placeholder={"EN"}
               iconFill={false}
               iconStroke={false}
               isPlaceholder={true}
               id={"languageDropdown"}
               listItems={props.langaugeItems}
               showIcon={false}
               onClick={onClickHandler}
               tooltip={true}
               tooltipTitle={"Select Language"}
               tooltipPlacement="bottom"
               isCode={true}
             ></RdsDropdownList>
             <div className="d-block d-none fs-8 text-center">Language</div>
           </div>
           <div
             className={`position-relative px-2 px-md-3 mb-3 col ${
               currentPath != "/" 
             }  ${
               props.isChatPermission && "border-end-custom"
             } border-2 d-flex justify-content-center align-items-center text-center`}
           >
             <div className="py-xxl-0 py-xl-0 py-lg-0 py-1 d-flex align-items-center justify-content-center">
               <span className="cursor-pointer" onClick={props.chatsHandler}>
                 <RdsIcon
                   iconPath={
                     "./assets/lottie-files/outlined/dual-color/chatting.json"
                   }
                   tooltip={true}
                   tooltipTitle={"Chat"}
                   tooltipPlacement="bottom"
                   width="28px"
                   height="28px"
                   type="lottie"
                   isHovered
                 ></RdsIcon>
               </span>
             </div>
           </div>
       
           <div className="d-block d-none fs-8 text-center">Chat</div>
       
           <div
             className={`position-relative px-2 px-md-3 d-flex
             } justify-content-center d-lg-none d-md-none col text-center  border-2 align-items-center`}
           >
             <div className="rounded-circle mbhome bg-primary">
               <RdsIcon
                 name="home"
                 fill={false}
                 stroke={true}
                 height="18px"
                 width="18px"
                 colorVariant="light"
                 onClick={props.mobileViewLogoClick}
               ></RdsIcon>
             </div>
           </div>
           <div className="position-relative px-2 px-md-3 col text-center mb-3">
             <RdsDropdownList
               iconPath={"/assets/lottie-files/outlined/dual-color/sun.json"}
               labelIconWidth="30px"
               labelIconHeight="26px"
               isIconPlaceholder={true}
               isPlaceholder={false}
               placeholder={"/assets/lottie-files/outlined/dual-color/sun.json"}
               id={"themeDropdown"}
               listItems={props.themeItems}
               onClick={onClicktheme}
               showIcon={true}
               tooltip={true}
               tooltipTitle={"Select Theme"}
               tooltipPlacement="bottom"
             />
             <div className="d-block d-none fs-8 text-center">Light</div>
           </div>
          
       
           <div className="position-relative px-2 px-md-3 d-block d-lg-none col text-center profile-off">
           <RdsAvatar
              activeDotBottom
              avtarOnly
              colorVariant={props.colorVariantForActiveDot}
              firstName={props.profileFirstName}
              lastName={props.profileLastName}
              profilePic={props.profilePic}
              role={props.role}
              size={props.profileSize}
                />
       
             <div className="d-block d-none fs-8 text-center">Profile</div>
           </div>
         </div>
       </nav>
       </div>
    )}
    </>
  );
};

export default RdsSideNav;
