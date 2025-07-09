import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./rds-top-navigation.css";
import RdsOffcanvas, { RdsOffcanvasBackDrop, RdsOffcanvasPlacement } from "../../../raaghu-elements/src/rds-offcanvas/rds-offcanvas";
import RdsAvatar, { AvatarSize, AvatarStyle } from "../../../raaghu-elements/src/rds-avatar/rds-avatar";
import RdsBreadcrumb, { BreadcrumbSeparator } from "../../../raaghu-elements/src/rds-breadcrumb/rds-breadcrumb";
import { TooltipStyle } from "../rds-tooltip/rds-tooltip";
import RdsCompProfile from "../../../raaghu-components/src/rds-comp-profile";
import RdsDropdownList, { DropdownSize, DropdownState } from "../../../raaghu-elements/src/rds-dropdown-list/rds-dropdown-list";
import RdsCompIcon from "../../../raaghu-components/src/rds-comp-icon";
import RdsNotification, { NotificationLayout, NotificationStyle, NotificationType } from "../../../raaghu-elements/src/rds-notification/rds-notification";
import RdsCompSearch, { IconPosition } from "../../../raaghu-components/src/rds-comp-search/rds-comp-search";

export interface RdsTopNavigationProps {
  ShowProfileSection?: boolean; // Determines whether to show the profile section.
  onClick?: (event: React.MouseEvent<HTMLLIElement>, val: string) => void;
  onChatClickHandler?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  toggleTheme?: React.MouseEventHandler<HTMLInputElement>;
  onClickThemeCheck?: (
    event: React.MouseEvent<HTMLLIElement>,
    val: string
  ) => void;
  notifications?: any[]; // Array of notifications to display.
  languageItems?: any[]; // Array of language items to display.
  themeItems: any[]; // Array of theme items to display.
  toggleItems: any[]; // Array of toggle items to display.
  elementList: any[]; // Array of elements to display.
  componentsList: any[]; // Array of components to display.
  navbarTitle?: string; // Title to display in the navbar.
  brandName?: string; // Brand name to display in the navbar.
  brandLogo?: string; // Brand logo to display in the navbar.
  profileTitle?: any; // Profile title to display in the navbar.
  profileName?: string; // Profile name to display in the navbar.
  profileEmail?: string; // Profile email to display in the navbar.
  logo?: string; // Logo to display in the navbar.
  languageLabel: string; // Label for the language dropdown.
  languageIcon?: string; // Icon for the language dropdown.
  width?: string;  // Width of the navbar.
  themeLabel: string; // Label for the theme dropdown.
  breadcrumItem?: any; // Breadcrum item to display in the navbar.
  profilePic?: any; // Profile picture to display in the navbar.
  onLogout?: (Event: React.MouseEvent<HTMLButtonElement>) => void;
  onElementSelect?: (selectedElement: any) => void;
  isImpersonation?: any;
  backToMyAccount?: (Event: React.MouseEvent<HTMLButtonElement>) => void;
  onForgotPassword: (isForgotPasswordClicked?: boolean) => void;
  onProfileLinkTopNav: (
    id: string,
    navigateTo?: string,
    label?: string
  ) => void;
  chatsHandler?: (Event: React.MouseEvent<HTMLButtonElement>) => void;
  tenantName?: any; // Tenant name to display in the navbar.
  mobileViewLogoClick?: (Event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickHamburger?: (Event: React.MouseEvent<HTMLButtonElement>) => void;
  isLandingPage?: boolean; // Determines whether the page is a landing page.
  isChatPermission?: any; // Determines whether the user has chat permission.
  showUserName?: boolean; // Determines whether to show the user name.
  navbarSubTitle?: any; // Subtitle to display in the navbar.
  showLogo?: boolean; // Determines whether to show the logo.
  raaghuPortal?: boolean; // Determines whether the portal is a Raaghu portal.
  ecommerce1?: boolean; // Determines whether the portal is an ecommerce portal.
  navtabItems?: any; // Array of navtab items to display.
  colorVariant?: string; // Color variant to display in the navbar.
  firstName?: string; // First name to display in the navbar.
  lastName?: string; // Last name to display in the navbar.
  role?: string; // Role to display in the navbar.
  showSearch?: boolean; // Determines whether to show the search bar.
  ecommerce2?: boolean; // Determines whether the portal is an ecommerce portal.
  ecommerce3?: boolean;
  ecommerce4?: boolean;
  product1?: boolean; // Determines whether the portal is a product portal.
  product2?: boolean;
  product3?: boolean;
  product4?: boolean;
  entertainment1?: boolean; // Determines whether the portal is an entertainment portal.
  entertainment2?: boolean;
  entertainment3?: boolean;
  entertainment4?: boolean;
  professional1?: boolean; // Determines whether the portal is a professional portal.
  professional2?: boolean;
  professional3?: boolean;
  professional4?: boolean;
  professional5?: boolean;
  appshell3?: boolean; // Determines whether the portal is an appshell portal.
  listItems?: any; // Array of list items to display.
  socialMediaIcons?: any; // Array of social media icons to display.
  icons?: any; // Array of icons to display.
  navButtons?: any; // Array of nav buttons to display.
  top_nav_logo?: string; // Top navigation logo to display.
  style: any; // Style to display in the navbar.
  breadcrumbBorderColor?: string;
  breadcrumbBorderPlacement?: string;
}

const RdsTopNavigation = (props: RdsTopNavigationProps) => {
  const { t } = useTranslation();
  const [brandLogo, setBrandLogo] = useState("");
  const [breacrumItem, setBreadCrumItem] = useState(props.breadcrumItem);
  const [navtabItem, setNavtabItems] = useState(props.navtabItems);
  const [navtitle, setNavtitle] = useState(props.navbarTitle);
  const [resetDrop, setResetDrop] = useState(false);
  const currentPath = window.location.pathname;
  const [activeImage, setActiveImage] = useState<string | null>(null);  const [showSearchInput, setShowSearchInput] = useState(false);  const [searchInput, setSearchInput] = useState("");
  const [themeIcon, setThemeIcon] = useState("sun");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);

  // Notifications state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      status: 'success',
      time: '10 min ago',
      title: 'Notification Title',
      urlTitle: 'hello',
    },
    {
      id: 2,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard.',
      status: 'success',
      time: '10 min ago',
      title: 'Notification Title',
      urlTitle: 'hello'
    },
    {
      id: 3,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      status: 'success',
      time: '10 min ago',
      title: 'Notification Title',
      urlTitle: 'hello'
    },
    {
      id: 4,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      status: 'success',
      time: '10 min ago',
      title: 'Notification Title',
      urlTitle: 'hello'
    }
  ]);

  const navtabItems = [
    {
      label: "Linked Accounts",
      icon: "manage_linked",
      subText: "Manage linked accounts",
      id: "nav-LinkedAccounts",
      navigateTo: "/linked-accounts",
      iconPath: "manage_linked",
    },
    {
      label: "Authority Delegation",
      icon: "manage_authority",
      subText: "Manage authority delegation accounts",
      id: "nav-AuthorityDelegation",
      navigateTo: "/authority-delegation",
      iconPath: "manage_authority",
    },
    {
      label: "My Account",
      icon: "manage_authority",
      subText: "Manage authority accounts",
      id: "nav-MyAccount",
      navigateTo: "/my-account",
      iconPath: "profile_picture_square",
    },
    {
      label: "My Security Logs",
      icon: "login_attempts",
      subText: "See recent login attempts",
      id: "nav-SecuityLogs",
      navigateTo: "/security-Logs",
      iconPath: "setting",
    },
    {
      label: "Personal Data",
      icon: "my_settings",
      subText: "Change your account settings",
      id: "nav-PersonalData",
      navigateTo: "/personal-data",
      iconPath: "login_attempts",
    },
  ];

  const onClickHandler = (e: any, val: any) => {
    if (props.onClick) {
      props.onClick(e, val);
    }
  };

  const onClicktheme = (e: any, val: string) => {
    setThemeIcon(val);
    if (props.onClickThemeCheck) {
      props.onClickThemeCheck(e, val);
    }
  };

  const InlineProfileComponent = ({ profilePic, profileTitle, profileEmail, tenantName, onLogout, isImpersonation, backToMyAccount }: any) => (
    <div className="profile-dropdown-border">
      {/* Simple Profile Section with Light Purple Background */}    <div style={{ backgroundColor: '#d1c4e9' }}>      {/* My Profile Header Text */}
        <div className="pe-2 pt-2 pb-1" style={{ paddingLeft: '8px', marginBottom: '6px', textAlign: 'left' }}>
          <span className="fw-normal" style={{ fontSize: '14px' }}>My Profile</span>
        </div>

        {/* User Avatar and Info */}
        <div className="d-flex align-items-center px-2 pb-2">
          <RdsAvatar
            activeDotBottom
            activityRing
            avatars={[
              {
                profilePic: profilePic || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU'
              },
              {
                profilePic: profilePic || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU'
              },
              {
                profilePic: profilePic || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU'
              },
              {
                profilePic: profilePic || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU'
              },
              {
                profilePic: profilePic || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU'
              }
            ]}
            colorVariant="primary"
            firstName={profileTitle ? profileTitle.split(' ')[0] : "Jane"}
            lastName={profileTitle ? (profileTitle.split(' ')[1] || "Doe") : "Doe"}
            maxVisibleAvatars={3}
            profilePic={profilePic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU"}
            role={tenantName || "janedoe..."}
            showName
            showNameDesignation
            size={AvatarSize.medium}
            style={AvatarStyle.withname}
            type="image" />
        </div>
      </div>

      {/* Simple Menu Items with reduced padding */}
      <div>
        <div className="d-flex align-items-center px-3 py-2 custom-profile-cursor-pointer custom-profile-menu-item">
          <RdsCompIcon
            colorVariant="primary"
            height="18px"
            isCursorPointer
            name="profile_new"
            width="18px"
          />
          <span className="ms-3 fw-medium">My Profile</span>
        </div>

        <div className="profile-menu-separator"></div>

        <div className="d-flex align-items-center px-3 py-2 custom-profile-cursor-pointer custom-profile-menu-item">
          <RdsCompIcon
            colorVariant="primary"
            height="18px"
            isCursorPointer
            name="theme_new"
            width="18px"
          />
          <span className="ms-3 fw-medium">Theme</span>
        </div>

        <div className="profile-menu-separator"></div>

        <div className="d-flex align-items-center px-3 py-2 custom-profile-cursor-pointer custom-profile-menu-item">
          <RdsCompIcon
            colorVariant="primary"
            height="18px"
            isCursorPointer
            name="setting_new"
            width="18px"
          />
          <span className="ms-3 fw-medium">Setting</span>
        </div>

        <div className="profile-menu-separator"></div>

        <div className="d-flex align-items-center px-3 py-2 custom-profile-cursor-pointer custom-profile-menu-item">
          <RdsCompIcon
            colorVariant="primary"
            height="18px"
            isCursorPointer
            name="help_new"
            width="18px"
          />
          <span className="ms-3 fw-medium">Help</span>
        </div>

        <div className="profile-menu-separator"></div>

        <div className="d-flex align-items-center px-3 py-2 custom-profile-cursor-pointer custom-profile-menu-item" onClick={(e) => onLogout && onLogout(e as any)}>
          <RdsCompIcon
            colorVariant="primary"
            height="18px"
            isCursorPointer
            name="leave_logout"
            width="18px"
          />
          <span className="ms-3 fw-medium">Logout</span>
        </div>
      </div>
    </div>
  );


  useEffect(() => {
    const logo = props.top_nav_logo === 'custom logo' ? (props.brandLogo || "") : "assets/Raaghu-logo-mfe-black.png";
    setBrandLogo(logo);
  }, [props.brandLogo]);

  //side effect for breadcrum
  useEffect(() => {
    setBreadCrumItem(props.breadcrumItem);
  }, [props.breadcrumItem]);

  const [profilePic, setProfilePic] = useState(props.profilePic ||
    "/assets/profile-picture-circle.svg"
  );
  useEffect(() => {
    if (props.profilePic) {
      setProfilePic(props.profilePic);
    }
  }, [props.profilePic]);

  //side effect for the navtitle adn reset
  useEffect(() => {
    const navtitl = t("Dashboard") || "";
    if (props.navbarTitle === navtitl) {
      // setBreadCrumItem([]);
    }
    setNavtitle(props.navbarTitle);
    if (
      (navtitle != "Element" &&
        navtitle != "Component" &&
        navtitle != "Chart") ||
      props.navbarTitle != navtitle
    ) {
      setResetDrop(!resetDrop);
    }  }, [props.breadcrumItem, props.navbarTitle]);

  // Handle click outside notification dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isNotificationDropdownOpen && target && !target.closest('.notification-dropdown-container')) {
        setIsNotificationDropdownOpen(false);
      }
    };

    if (isNotificationDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationDropdownOpen]);

  const avatarBlankImage = "./assets/avatar-svg-blank.svg";
  const handleImageClick = (imageName: string) => {
    setActiveImage(imageName);
  };

  const handleCollapsebleIconClick = () => {
    // Add your logic here
    console.log("Collapse icon clicked");
  };

  const handleSearchClick = () => {
    // Add your logic here
    console.log("Search icon clicked");
  };
  const handleSearchMouseEnter = () => {
    setShowSearchInput(true);
  };
  const handleIconClick = (icon?: any) => {
    console.log("Icon clicked");
  };
  const handleNotificationClick = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
  };

  // Handle notification dismiss
  const handleNotificationDismiss = (notificationId: number) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== notificationId)
    );
  };

  const handleSearchMouseLeave = () => {
    setShowSearchInput(false);
  };
  // const themeItems = [
  //   {
  //     id: 0,
  //     label: t("Light"),
  //     val: "Light",
  //     iconWidth: "30px",
  //     iconHeight: "30px",
  //     iconPath: "/assets/lottie-files/outlined/dual-color/sun.json",
  //   },
  //   {
  //     id: 1,
  //     label: t("Dark"),
  //     val: "Dark",
  //     iconWidth: "30px",
  //     iconHeight: "30px",
  //     iconPath: "/assets/lottie-files/outlined/dual-color/moon.json",
  //   },
  //   {
  //     id: 2,
  //     label: t("Semi-Dark"),
  //     val: "semi-dark",
  //     iconWidth: "30px",
  //     iconHeight: "30px",
  //     iconPath: "/assets/lottie-files/outlined/dual-color/semi-dark.json",
  //   },
  // ];

  const languageItems = [
    {
      label: "EN (US)",
      val: "en",
    },
    {
      label: "English (IND)",
      val: "en",
    },
    {
      label: "French",
      val: "fr",
    },
  ];
  const listItems = props.listItems || [];
  const handlerLogoClick = () => {
    // setBreadCrumItem([]);
  };

  const profileLinkListHandler: any = (
    id: string,
    navigateTo: string,
    label: string
  ) => {
    props.onProfileLinkTopNav(id, navigateTo, label);
  };

  const handleBreadcrumbClick = (id: number) => {
    setBreadCrumItem(
      breacrumItem.map((item: any) => ({
        ...item,
        active: item.id === id,
      }))
    );
  };

  const signInClick = () => {
    console.log("Sign In clicked");
  };

  const onAvtarClick = () => {
    console.log("Avatar clicked");
  };
  const breadcrumMenu = props.breadcrumItem;
  const navtabs = props.navtabItems;

  const addFilter = (value: string) => {
    if (breacrumItem?.length > 0 || breacrumItem != undefined) {
      if (value) {
        const filteredItems = breacrumItem.filter((menuItem: { label: string, children?: any[] }) =>
          filterMenuItem(menuItem, value.toLowerCase())
        );
        setBreadCrumItem(filteredItems);
      } else {
        setBreadCrumItem(breadcrumMenu);
      }
    }
    else if (navtabItem?.length > 0 || navtabItem != undefined) {
      if (value) {
        const filteredItems = navtabItem.filter((menuItem: { label: string, children?: any[] }) =>
          filterMenuItem(menuItem, value.toLowerCase())
        );
        setNavtabItems(filteredItems);
      } else {
        setNavtabItems(navtabs);
      }
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

  const handleNavButtonClick = (id: any) => {
    console.log("Nav button clicked", id);
  };

  const renderTopbar = () => {
    if (props.style === "RaaghuPortal") {
      return (
        <div>
          <nav className="navbar d-flex justify-content-between p-2 min-width align-items-center justify-content-md-end justify-content-lg-between light-shadow">
            <div
              onClick={handlerLogoClick}
              id="raaghuLogo"
              className="d-xxl-none d-xl-none d-lg-none d-md-none d-block"
            >
              {props.showLogo && (
                props.top_nav_logo === "raaghu logo" ? (
                  <img className="cursor-pointer sidenav-logo raaghu-logo-size" src={brandLogo} alt="logo" />
                ) : (
                  <span className="custom-logo-text custom-logo-font">Your Logo</span>
                )
              )}
            </div>

            <button
              className="navbar-toggler d-xxl-none d-xl-none d-lg-none d-md-none d-block border-0"
              type="button"
              onClick={props.onClickHamburger}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="d-flex align-items-center mt-5 mt-md-0 d-xxl-block d-xl-block d-lg-block flex-grow-1 justify-content-center">
              <div className="d-flex align-items-center">
                <>
                  <div className="d-flex align-items-center">
                    {props.showLogo && (
                      props.top_nav_logo === "raaghu logo" ? (
                        <img className="cursor-pointer pe-4" src={brandLogo} alt="raaghu-logo" />
                      ) : (
                        <span className="custom-logo-text custom-logo-font">Your Logo</span>
                      )
                    )}
                    <ul className="nav-items-list list-unstyled d-flex align-items-center  mb-0">
                      {navtabItem?.map((item: any, index: number) => (
                        <li key={index} className="nav-item mx-3  ">
                          <a href={item.href} className="nav-link cursor-pointer">
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              </div>
            </div>

            <div
              className={
                "d-flex align-items-center justify-content-between right-side-menu px-3"
              }
            >
              <div className="position-relative px-2 px-md-3 d-block d-lg-none col text-center profile-off">
                <RdsOffcanvas
                  className="pb-5 m-auto"
                  placement={RdsOffcanvasPlacement.End}
                  offcanvaswidth={307}
                  offId="Profile1"
                  offcanvasbutton={
                    <div
                      className="d-flex align-items-center justify-content-center cursorpointer"
                      id="customAvtar"
                    >
                      <img
                        className="avatar bg-light avatar-sm rounded rounded-circle mb-0"
                        src={profilePic}
                      ></img>
                    </div>
                  }
                  backDrop={RdsOffcanvasBackDrop.True}
                  scrolling={false}
                  preventEscapeKey={false}
                  canvasTitle={""}
                >
                  <RdsCompProfile
                    navtabItems={navtabItems}
                    profilePic={profilePic}
                    userName={props.profileTitle}
                    userEmail={props.profileEmail}
                    userRole={props.tenantName}
                    onProfileLink={profileLinkListHandler}
                    onLogout={props.onLogout}
                    isImpersonation={props.isImpersonation}
                    backToMyAccount={props.backToMyAccount}
                    showUserName={true}
                  ></RdsCompProfile>
                </RdsOffcanvas>

                <div className="d-block d-none fs-8 text-center">Profile</div>
              </div>
              <div className="px-2 px-md-3 d-none d-lg-block">
                <div className="dropdown">
                  <button
                    className="btn d-flex align-items-center cursorpointer border-0 bg-transparent p-0"
                    type="button"
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    aria-expanded={isProfileDropdownOpen}
                  >
                      <img
                        className="avatar bg-light avatar-sm rounded rounded-circle mb-0"
                        src={profilePic}
                      ></img>
                      <div className="ms-2 fs-6">
                        <div className="text-nowrap text-start">
                          {props.profileTitle}{" "}
                        </div>
                        <div className="text-nowrap text-muted text-start">
                          {props.role}
                        </div>
                      </div>
                      <span className="ms-3"
                      style={{
                        transform: isProfileDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        display: 'inline-block'
                      }}
                    >
                        <RdsCompIcon
                          name="chevron_down"
                          height="11px"
                          width="11px"
                          fill={false}
                          stroke={true}
                        ></RdsCompIcon>
                      </span>
                  </button>
                  {isProfileDropdownOpen && (
                    <div className=" custom-profile-dropdown" style={{ position: 'absolute', top: '100%', right: 0, zIndex: 1000 }}>
                      <InlineProfileComponent
                        profilePic={profilePic}
                        profileTitle={props.profileTitle}
                        profileEmail={props.profileEmail}
                        tenantName={props.tenantName}
                        onLogout={props.onLogout}
                        isImpersonation={props.isImpersonation}
                        backToMyAccount={props.backToMyAccount}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      );
    }
    if (props.style === "With_Cart") {
      return (
        <div id="topnav">
          <nav className="navbar d-flex justify-content-between p-1 min-width align-items-center justify-content-md-between justify-content-lg-between light-shadow">
            <div id="raaghuLogo" className="d-block m-2">
              {props.showLogo && (
                props.top_nav_logo === "raaghu logo" ? (
                  <img className="cursor-pointer sidenav-logo mx-4" src={brandLogo} alt="logo" />
                ) : (
                  <span className="custom-logo-text custom-logo-font" >Your Logo</span>
                )
              )}
            </div>

            <button
              className="navbar-toggler d-xxl-none d-xl-none d-lg-none d-md-none d-block border-0"
              type="button"
              onClick={props.onClickHamburger}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="d-flex align-items-center mt-5 mt-md-0 d-xxl-block d-xl-block d-lg-block">
              <div>
                {breacrumItem?.length > 0 && (
                  <div>
                    <>
                      <RdsBreadcrumb borderColor={props.breadcrumbBorderColor} borderPlacement={props.breadcrumbBorderPlacement} breadcrumbItems={breacrumItem} onBreadcrumbClick={handleBreadcrumbClick} ></RdsBreadcrumb>
                    </>
                  </div>
                )}
              </div>
            </div>
            <div
              className={
                "d-flex align-items-center justify-content-between right-side-menu"
              }
            >              {(props.ecommerce1 &&                <div id="notification-list"
                  className={`position-relative px-2 px-md-3 col text-center d-flex align-items-center notification-dropdown-container ${isNotificationDropdownOpen ? 'dropdown-open' : ''}`}
                >                  <div className="position-relative">
                    <RdsCompIcon
                      name={isNotificationDropdownOpen ? "notification_dot" : "notification_new"}
                      stroke={true}
                      height="18px"
                      width="18px"
                      onClick={handleNotificationClick}
                      isCursorPointer={true} 
                      tooltip={true}
                      tooltipTitle={"Notification"}
                      tooltipPlacement="bottom"
                      style={TooltipStyle.MiddleTopArrow}                        
                    ></RdsCompIcon>
                  </div>{isNotificationDropdownOpen && (
                    <div className="position-absolute bg-white  rounded shadow-lg" style={{ 
                      top: '100%', 
                      right: 0, 
                      zIndex: 1000, 
                      width: '420px', 
                      maxHeight: '500px', 
                      overflowY: 'auto',
                      marginTop: '8px',
                      padding:'7px',
                      border:'1px solid #7d7d7d',
                      boxShadow: '2px 8px 16px 0px #3C3C3C1F',
                    }}>                      
                      {notifications.length === 0 ? (
                        <div className="p-3 text-center text-muted">
                          <p>No notifications</p>
                        </div>
                      ) : (                        <div className="mb-2">
                          {notifications.map((notification, index) => (
                            <RdsNotification
                              key={notification.id}
                              layout={NotificationLayout.Horizontal}
                              notifications={[{
                                description: notification.description,
                                status: notification.status,
                                time: notification.time,
                                title: notification.title,
                                urlTitle: notification.urlTitle,
                              }]}
                              showButton={index === 1} // Show button only for second notification
                              showDismissIcon
                              showPrimaryButton={index === 1} // Show primary button only for second notification
                              style={NotificationStyle.Default}
                              type={notification.id === 1 ? NotificationType.Success : NotificationType.Info}
                              onDismiss={() => handleNotificationDismiss(notification.id)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>)}
              {/* notification----------------------------------------------------------------------------------------------- */}

              {((props.ecommerce1) && <div
                className={"position-relative px-1 col text-center d-flex align-items-center cursor-pointer"} onClick={onAvtarClick}
              >
                <RdsAvatar
                  avtarOnly
                  colorVariant={props.colorVariant}
                  firstName={props.firstName}
                  lastName={props.lastName}
                  profilePic={profilePic}
                  role={props.role}
                  size={AvatarSize.medium}
                  title="horizontal"
                />
              </div>)}
            </div>

          </nav>
        </div>
      );
    }
    if (props.style === "With_Currency_Switcher") {
      return (
        <div id="topnav">
          <nav className="navbar d-flex justify-content-between p-0 min-width align-items-center justify-content-md-end justify-content-lg-between light-shadow">
            <div id="raaghuLogo" className="d-block m-2">
              {props.showLogo && (
                props.top_nav_logo === "raaghu logo" ? (
                  <img className="cursor-pointer sidenav-logo mx-4" src={brandLogo} alt="logo" />
                ) : (
                  <span className="custom-logo-text custom-logo-font">Your Logo</span>
                )
              )}
            </div>

            <button
              className="navbar-toggler d-xxl-none d-xl-none d-lg-none d-md-none d-block border-0"
              type="button"
              onClick={props.onClickHamburger}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="d-flex align-items-center mt-5 mt-md-0 d-xxl-block d-xl-block d-lg-block d-none">
              <div>
                {breacrumItem?.length > 0 && (
                  <div>
                    <>
                      <RdsBreadcrumb borderColor={props.breadcrumbBorderColor} borderPlacement={props.breadcrumbBorderPlacement} breadcrumbItems={breacrumItem} onBreadcrumbClick={handleBreadcrumbClick} ></RdsBreadcrumb>
                    </>
                  </div>
                )}
              </div>
            </div>
            <div
              className={
                "d-flex align-items-center justify-content-between right-side-menu"
              }
            >
              <div
                className={"position-relative px-2 px-md-3  col text-center d-flex align-items-center "}
              >
                {((props.showSearch && props.ecommerce2) && <div className="searchBackground right-side-menu" id="serachOption">
                  <RdsCompSearch
                    iconPosition={IconPosition.Right}
                    labelPosition="right"
                    placeholder="Search"
                    size="medium"
                    onChange={(e) => addFilter(e.target.value)}
                  />
                </div>)}
              </div>

              {(props.ecommerce2 && <div id="list-version"
                className={"position-relative  px-md-3 p-1 me-3 col text-center d-flex align-items-center language rounded dropdown-list"}
              >
                <RdsDropdownList
                  labelIconWidth="18px"
                  labelIconHeight="18px"
                  placeholder={props.listItems[0].label || "EN"}
                  icon={props.languageIcon}
                  iconFill={false}
                  iconStroke={false}
                  isPlaceholder={true}
                  id={"languageDropdownTopNavigation"}
                  listItems={listItems}
                  showIcon={false}
                  onClick={onClickHandler}
                  tooltip={true}
                  tooltipTitle="Select Language"
                  tooltipStyle={TooltipStyle.MiddleTopArrow}
                  tooltipPlacement="bottom"
                  isCode={true}
                  state={DropdownState.Default}
                  size={DropdownSize.Small}
                  borderDropdown={true}
                />
              </div>
              )}
              {/* dropdown----------------------------------------------------------------------------------------------- */}
              {(props.ecommerce2 && <div
                className={"position-relative  px-md-1  col text-center d-flex align-items-center language  border-start-custom"}
              >
                <img src={avatarBlankImage} className="px-md-2" alt="avtaar image" />
                <span className="px-md-1 signInOption cursor-pointer" onClick={signInClick}>Sign In</span>
              </div>
              )}
            </div>

          </nav>
          <div className="d-flex align-items-center mt-5 mt-md-0 d-xxl-none d-xl-none d-lg-none">
            <div>
              {breacrumItem?.length > 0 && (
                <div>
                  <>
                    <RdsBreadcrumb borderColor={props.breadcrumbBorderColor} borderPlacement={props.breadcrumbBorderPlacement} breadcrumbItems={breacrumItem} onBreadcrumbClick={handleBreadcrumbClick} ></RdsBreadcrumb>
                  </>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
    if (props.style === "With_Social_Media") {
      return (
        <div id="topnav">
          <nav className="navbar d-flex justify-content-between p-0 min-width align-items-center justify-content-md-end justify-content-lg-between light-shadow">
            <div id="raaghuLogo" className="d-block m-2">
              {props.showLogo && (
                props.top_nav_logo === "raaghu logo" ? (
                  <img className="cursor-pointer sidenav-logo mx-4" src={brandLogo} alt="logo" />
                ) : (
                  <span className="custom-logo-text custom-logo-font">Your Logo</span>
                )
              )}
            </div>

            <button
              className="navbar-toggler d-xxl-none d-xl-none d-lg-none d-md-none d-block border-0"
              type="button"
              onClick={props.onClickHamburger}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="d-flex align-items-center mt-5 mt-md-0 d-xxl-block d-xl-block d-lg-block d-none">
              <div>
                {breacrumItem?.length > 0 && (
                  <div className={` ${props.ecommerce3 ? "ps-4" : ""}`}>
                    <>
                      <RdsBreadcrumb borderColor={props.breadcrumbBorderColor} borderPlacement={props.breadcrumbBorderPlacement} breadcrumbItems={breacrumItem} onBreadcrumbClick={handleBreadcrumbClick} ></RdsBreadcrumb>
                    </>
                  </div>
                )}
              </div>
            </div>
            {((props.showSearch && props.ecommerce3) && <div className="searchBackground" id="serachOption">
              <RdsCompSearch
                iconPosition={IconPosition.Right}
                labelPosition="right"
                placeholder="Search"
                size="small"
                onChange={(e) => addFilter(e.target.value)}
              />
            </div>
            )}
            <div
              className={
                "d-flex align-items-center justify-content-between right-side-menu"
              }
            >

              {(props.ecommerce3 && <div
                className={`position-relative   col text-center d-flex align-items-center language  px-md-3} `}
              >
                {props.ecommerce3 && props.socialMediaIcons?.map((icon: any) => (
                  <img
                    key={icon.id}
                    src={icon.src}
                    alt={icon.alt}
                    className={`px-1 cursor-pointer ${activeImage === icon.id ? "active" : ""} `}
                    onClick={() => handleIconClick(icon)}
                  ></img>
                ))}
              </div>
              )}
              {/* dropdown----------------------------------------------------------------------------------------------- */}
              {(props.ecommerce3 && <div
                className={"position-relative  px-md-1  col text-center d-flex align-items-center language  border-start-custom"}
              >
                <img src={avatarBlankImage} className="px-md-2" alt="avtaar image" />
                <span className="px-md-1 signInOption cursor-pointer" onClick={signInClick}>Sign In</span>
              </div>
              )}
            </div>

          </nav>
          <div className="d-flex align-items-center mt-5 mt-md-0 d-xxl-none d-xl-none d-lg-none">
            <div>
              {breacrumItem?.length > 0 && (
                <div className={` ${props.ecommerce3 ? "ps-4" : ""}`}>
                  <>
                    <RdsBreadcrumb breadcrumbItems={breacrumItem} onBreadcrumbClick={handleBreadcrumbClick} ></RdsBreadcrumb>
                  </>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
    if (props.style === "With_Favorites") {
      return (
        <div id="topnav">
          <nav className="navbar d-flex justify-content-between p-0 min-width align-items-center justify-content-md-end justify-content-lg-between light-shadow">
            <div id="raaghuLogo" className="d-block m-2 ">
              {props.showLogo && (
                props.top_nav_logo === "raaghu logo" ? (
                  <img className="cursor-pointer sidenav-logo mx-4" src={brandLogo} alt="logo" />
                ) : (
                  <span className="custom-logo-text custom-logo-font">Your Logo</span>
                )
              )}
            </div>

            <button
              className="navbar-toggler d-xxl-none d-xl-none d-lg-none d-md-none d-block border-0"
              type="button"
              onClick={props.onClickHamburger}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="d-flex align-items-center mt-5 mt-md-0 d-xxl-block d-xl-block d-lg-block d-none breadcrumd-ps">
              <div>
                {breacrumItem?.length > 0 && (
                  <div>
                    <>
                      <RdsBreadcrumb borderColor={props.breadcrumbBorderColor} borderPlacement={props.breadcrumbBorderPlacement} breadcrumbItems={breacrumItem} onBreadcrumbClick={handleBreadcrumbClick} ></RdsBreadcrumb>
                    </>
                  </div>
                )}
              </div>
            </div>
            <div
              className={
                "d-flex align-items-center justify-content-between right-side-menu"
              }
            >
              <div
                className={"position-relative px-2 px-md-3  col text-center d-flex align-items-center "}
              >
                {((props.showSearch && props.ecommerce4) && <div className="searchBackground right-side-menu" id="serachOption">
                  <RdsCompSearch
                    iconPosition={IconPosition.Right}
                    labelPosition="right"
                    placeholder="Search"
                    size="medium"
                    onChange={(e) => addFilter(e.target.value)}
                  />
                </div>)}
              </div>

              {(props.ecommerce4 && <div
                className={`position-relative   col text-center d-flex align-items-center language ${props.ecommerce4 ? "" : "px-md-3"} `}
              >
                {props.ecommerce3 && props.socialMediaIcons?.map((icon: any) => (
                  <img
                    key={icon.id}
                    src={icon.src}
                    alt={icon.alt}
                    className={`px-1 cursor-pointer ${activeImage === icon.id ? "active" : ""} `}
                    onClick={() => handleIconClick(icon)}
                  ></img>
                ))}

                {props.ecommerce4 && props.icons?.map((icon: any) => (
                  <>
                    <span className={`px-2 cursor-pointer ${activeImage === icon.id ? "active" : ""} `}>
                      <RdsCompIcon
                        key={icon.id}
                        name={icon.name}
                        fill={false}
                        stroke={true}
                        height="18px"
                        width="18px"
                        onClick={() => handleIconClick(icon)}
                      ></RdsCompIcon>
                    </span>
                  </>
                ))}
              </div>
              )}


              {(props.ecommerce4 && <div
                className={"position-relative px-1 col text-center d-flex align-items-center cursor-pointer"} onClick={onAvtarClick}
              >
                <RdsAvatar
                  avtarOnly
                  colorVariant={props.colorVariant}
                  firstName={props.firstName}
                  lastName={props.lastName}
                  profilePic={profilePic}
                  role={props.role}
                  size={AvatarSize.medium}
                  title="horizontal"
                />
              </div>)}
            </div>

          </nav>
          <div className="d-flex align-items-center mt-5 mt-md-0 d-xxl-none d-xl-none d-lg-none breadcrumd-ps">
            <div>
              {breacrumItem?.length > 0 && (
                <div>
                  <>
                    <RdsBreadcrumb borderColor={props.breadcrumbBorderColor} borderPlacement={props.breadcrumbBorderPlacement} breadcrumbItems={breacrumItem} onBreadcrumbClick={handleBreadcrumbClick} ></RdsBreadcrumb>
                  </>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
    if (props.style === "For_Media_Portal") {
      return (
        <div id="topnav">
          <nav className="navbar d-flex justify-content-between p-0 min-width align-items-center light-shadow">
            <div className="d-flex align-items-center">
              <span className={`px-2 cursor-pointer active}`}>
                <RdsCompIcon
                  name="collapsable"
                  fill={false}
                  stroke={true}
                  height="18px"
                  width="18px"
                  onClick={() => handleCollapsebleIconClick()}
                ></RdsCompIcon>
              </span>
              {props.showLogo && (<div
                onClick={handlerLogoClick}
                id="raaghuLogo"
                className=""
              >
                {props.top_nav_logo === "raaghu logo" ? (
                  <img className="cursor-pointer sidenav-mobile-logo" src={brandLogo} alt="logo" />
                ) : (
                  <span className="custom-logo-text custom-logo-font">Your Logo</span>
                )}
              </div>
              )}
            </div>

            <button
              className="navbar-toggler d-xxl-none d-xl-none d-lg-none d-md-none d-block border-0"
              type="button"
              onClick={props.onClickHamburger}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="d-flex align-items-center flex-grow-1 justify-content-center">
              {props.showSearch && props.entertainment1 && (
                <div className="searchBackground" id="serachOption">
                  <RdsCompSearch
                    iconPosition={IconPosition.Right}
                    labelPosition="right"
                    placeholder="Search"
                    size="medium"
                  />
                </div>
              )}
            </div>

            <div className="d-flex align-items-center right-side-menu">
              {props.entertainment1 && props.icons?.map((icon: any) => (
                <span key={icon.id} className={`px-2 cursor-pointer ${activeImage === icon.id ? "active" : ""}`}>
                  <RdsCompIcon
                    name={icon.name}
                    fill={false}
                    stroke={true}
                    height="18px"
                    width="18px"
                    onClick={() => handleIconClick(icon)}
                  ></RdsCompIcon>
                </span>
              ))}
              {props.entertainment1 && (
                <div className="position-relative px-md-1 col text-center d-flex align-items-center language">
                  <img src={avatarBlankImage} className="px-md-2" alt="avatar image" />
                  <span className="px-md-1 signInOption cursor-pointer" onClick={signInClick}>Sign In</span>
                </div>
              )}
            </div>
          </nav>
        </div>
      );
    }
    if (props.style === "For_Streaming_Service") {
      return (
        <div id="topnav">
          <nav className="navbar d-flex justify-content-between p-0 min-width align-items-center light-shadow">
            <div className="d-flex align-items-center">
              {props.showLogo && (<div
                onClick={handlerLogoClick}
                id="raaghuLogo"
                className=""
              >
                {props.top_nav_logo === "raaghu logo" ? (
                  <img className="cursor-pointer sidenav-mobile-logo " src={brandLogo} alt="logo"  />
                ) : (
                  <span className="custom-logo-text custom-logo-font">Your Logo</span>
                )}
              </div>
              )}
              <div >
                {props.showSearch && props.entertainment2 && (
                  <div className="searchBackground ps-2" id="serachOption">
                    <RdsCompSearch
                      iconPosition={IconPosition.Right}
                      labelPosition="right"
                      placeholder="Search"
                      size="medium"
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              className="navbar-toggler d-xxl-none d-xl-none d-lg-none d-md-none d-block border-0"
              type="button"
              onClick={props.onClickHamburger}
            >
              <span className="navbar-toggler-icon"></span>
            </button>



            <div className="d-flex align-items-center right-side-menu">
              {props.entertainment2 && props.icons?.map((icon: any) => (
                <span key={icon.id} className={`px-2 cursor-pointer ${activeImage === icon.id ? "active" : ""}`} >
                  <RdsCompIcon
                    name={icon.name}
                    fill={false}
                    stroke={true}
                    height="18px"
                    width="18px"
                    onClick={() => handleIconClick(icon)}
                  ></RdsCompIcon>
                </span>
              ))}
              {props.entertainment2 && (
                <div className="position-relative px-md-1 col text-center d-flex align-items-center language cursor-pointer" onClick={onAvtarClick} >
                  <RdsAvatar
                    avtarOnly
                    colorVariant={props.colorVariant}
                    firstName={props.firstName}
                    lastName={props.lastName}
                    profilePic={profilePic}
                    role={props.role}
                    size={AvatarSize.medium}
                    title="horizontal"
                  />
                </div>
              )}
            </div>
          </nav>
        </div>
      );
    }
    if (props.style === "For_Music_App") {
      return (
        <div id="topnav">
          <nav className="navbar d-flex justify-content-between p-0 min-width align-items-center light-shadow">
            <div className="d-flex align-items-center">
              {props.showLogo && (<div
                onClick={handlerLogoClick}
                id="raaghuLogo"
                className=""
              >
                {props.top_nav_logo === "raaghu logo" ? (
                  <img className="cursor-pointer sidenav-mobile-logo" src={brandLogo} alt="logo" />
                ) : (
                  <span className="custom-logo-text custom-logo-font">Your Logo</span>
                )}
              </div>
              )}
              <div >

              </div>
            </div>

            <button
              className="navbar-toggler d-xxl-none d-xl-none d-lg-none d-md-none d-block border-0"
              type="button"
              onClick={props.onClickHamburger}
            >
              <span className="navbar-toggler-icon"></span>
            </button>



            <div className="d-flex align-items-center right-side-menu">
              {props.entertainment3 && props.icons?.map((icon: any) => (
                <span key={icon.id} className={`px-2 cursor-pointer ${activeImage === icon.id ? "active" : ""}`}>
                  <RdsCompIcon
                    name={icon.name}
                    fill={false}
                    stroke={true}
                    height="18px"
                    width="18px"
                    onClick={() => handleIconClick(icon)}
                  ></RdsCompIcon>
                </span>
              ))}
              {props.showSearch && props.entertainment3 && (
                <div className="searchBackground pe-2 ps-2" id="serachOption">
                  <RdsCompSearch
                    iconPosition={IconPosition.Right}
                    labelPosition="right"
                    placeholder="Search"
                    size="medium"
                  />
                </div>
              )}
              {props.entertainment3 && (
                <div className="position-relative px-md-1 col text-center d-flex align-items-center language cursor-pointer" onClick={onAvtarClick}>
                  <RdsAvatar
                    avtarOnly
                    colorVariant={props.colorVariant}
                    firstName={props.firstName}
                    lastName={props.lastName}
                    profilePic={profilePic}
                    role={props.role}
                    size={AvatarSize.medium}
                    title="horizontal"
                  />
                </div>
              )}
            </div>
          </nav>
        </div>
      );
    }
    if (props.style === "For_Video_Platform") {
      return (
        <div id="topnav">
          <nav className="navbar d-flex justify-content-between p-1 min-width align-items-center light-shadow">
            <div className="d-flex align-items-center">
              {props.showLogo && (<div
                onClick={handlerLogoClick}
                id="raaghuLogo"
                className=""
              >
                {props.top_nav_logo === "raaghu logo" ? (
                  <img className="cursor-pointer sidenav-mobile-logo" src={brandLogo} alt="logo" />
                ) : (
                  <span className="custom-logo-text custom-logo-font">Your Logo</span>
                )}
              </div>
              )}
              <div >

              </div>
            </div>

            <button
              className="navbar-toggler d-xxl-none d-xl-none d-lg-none d-md-none d-block border-0"
              type="button"
              onClick={props.onClickHamburger}
            >
              <span className="navbar-toggler-icon"></span>
            </button>



            <div className="d-flex align-items-center right-side-menu">
              {props.entertainment4 && props.icons?.map((icon: any) => (
                <span key={icon.id} className={`px-2 cursor-pointer ${activeImage === icon.id ? "active" : ""}`}>
                  <RdsCompIcon
                    name={icon.name}
                    fill={false}
                    stroke={true}
                    height="18px"
                    width="18px"
                    onClick={() => handleIconClick(icon)}
                  ></RdsCompIcon>
                </span>
              ))}
              {props.showSearch && props.entertainment4 && (
                <div
                  className="searchBackground pe-2 ps-2"
                  id={!showSearchInput ? "searchInput" : "serachOption"}
                  onMouseEnter={handleSearchMouseEnter}
                  onMouseLeave={handleSearchMouseLeave}
                >
                  {!showSearchInput && (<RdsCompIcon
                    name="search"
                    fill={false}
                    stroke={true}
                    height="18px"
                    width="18px"
                  />
                  )}
                  {showSearchInput && (
                    <RdsCompSearch
                      iconPosition={IconPosition.Right}
                      labelPosition="right"
                      placeholder="Search"
                      size="medium"
                    />
                  )}
                </div>
              )}
              {props.entertainment4 && (
                <div className="position-relative px-md-1 col text-center d-flex align-items-center language cursor-pointer" onClick={onAvtarClick}>
                  <RdsAvatar
                    avtarOnly
                    colorVariant={props.colorVariant}
                    firstName={props.firstName}
                    lastName={props.lastName}
                    profilePic={profilePic}
                    role={props.role}
                    size={AvatarSize.medium}
                    title="horizontal"
                  />
                </div>
              )}
            </div>
          </nav>
        </div>
      );
    }
    if (props.style === "For_Corporate") {
      return (
        <div id="topnav">
          <nav className="navbar d-flex justify-content-between p-0 min-width align-items-center light-shadow">
            <div className="d-flex align-items-center">
              {props.showLogo && (<div
                onClick={handlerLogoClick}
                id="raaghuLogo"
                className=""
              >
                {props.top_nav_logo === "raaghu logo" ? (
                  <img className="cursor-pointer sidenav-mobile-logo" src={brandLogo} alt="logo" />
                ) : (
                  <span className="custom-logo-text custom-logo-font">Your Logo</span>
                )}
              </div>
              )}
              <div >
                {props.showSearch && props.professional1 && (
                  <div className="searchBackground ps-2" id="serachOption">
                    <RdsCompSearch
                      iconPosition={IconPosition.Right}
                      labelPosition="right"
                      placeholder="Search"
                      size="medium"
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              className="navbar-toggler d-xxl-none d-xl-none d-lg-none d-md-none d-block border-0"
              type="button"
              onClick={props.onClickHamburger}
            >
              <span className="navbar-toggler-icon"></span>
            </button>



            <div className="d-flex align-items-center right-side-menu">
              {props.professional1 && props.icons?.map((icon: any) => (
                <span key={icon.id} className={`px-2 cursor-pointer ${activeImage === icon.id ? "active" : ""}`}>
                  <RdsCompIcon
                    name={icon.name}
                    fill={false}
                    stroke={true}
                    height="18px"
                    width="18px"
                    onClick={() => handleIconClick(icon)}
                  ></RdsCompIcon>
                </span>
              ))}
              {props.professional1 && (
                <>
                  <div className="position-relative px-md-1 col text-center d-flex align-items-center language ">
                    <img src={avatarBlankImage} className="px-md-2" alt="avatar image" />
                    <span className="px-md-1 signInOption cursor-pointer" onClick={signInClick}>Sign In</span>
                  </div>
                  <div className="border-end-custom p-0 ps-2" style={{ minHeight: '44px' }}>

                  </div>
                  <div className="position-relative px-md-1 col text-center d-flex align-items-center cursor-pointer ">
                    <span className="ps-2">
                      <RdsCompIcon
                        name="multiple_circle"
                        fill={false}
                        stroke={true}
                        height="18px"
                        width="18px"
                        onClick={() => handleIconClick()}
                      ></RdsCompIcon>
                    </span>
                  </div>
                  <div className="position-relative px-md-2 col text-center d-flex align-items-center cursor-pointer ">
                    <RdsCompIcon
                      name="blogs"
                      fill={false}
                      stroke={true}
                      height="18px"
                      width="18px"
                      onClick={() => handleIconClick()}
                    ></RdsCompIcon>
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      );
    }
    if (props.style === "With_Tabs") {
      return (
        <div id="topnav">
          <nav className="navbar d-flex justify-content-between p-0 min-width align-items-center light-shadow">
            <div className="d-flex align-items-center">
              {props.showLogo && (<div
                onClick={handlerLogoClick}
                id="raaghuLogo"
                className=""
              >
                {props.top_nav_logo === "raaghu logo" ? (
                  <img className="cursor-pointer sidenav-mobile-logo" src={brandLogo} alt="logo" />
                ) : (
                  <span className="custom-logo-text custom-logo-font">Your Logo</span>
                )}
              </div>
              )}
              <div >
                {props.showSearch && props.professional2 && (
                  <div className="searchBackground ps-2" id="serachOption">
                    <RdsCompSearch
                      iconPosition={IconPosition.Right}
                      labelPosition="right"
                      placeholder="Search"
                      size="medium"
                      value={searchInput}
                      onChange={(e) => addFilter(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              className="navbar-toggler d-xxl-none d-xl-none d-lg-none d-md-none d-block border-0"
              type="button"
              onClick={props.onClickHamburger}
            >
              <span className="navbar-toggler-icon"></span>
            </button>



            <div className="d-flex align-items-center right-side-menu">
              {props.professional2 && (
                <>
                  <ul className="nav-items-list list-unstyled  align-items-center mb-0 d-md-none d-lg-flex">
                    <div className="border-end-custom p-0 ps-2" style={{ minHeight: '44px' }}>
                    </div>
                    {navtabItem?.map((item: any, index: number) => (
                      <>
                        <li key={index} className="nav-item mx-3 ">
                          <a href={item.href} className="nav-link cursor-pointer" style={{ fontWeight: "bold" }}>
                            {item.label}
                          </a>
                        </li>
                        <div className="border-end-custom p-0 ps-2" style={{ minHeight: '44px' }}>
                        </div>
                      </>
                    ))}
                  </ul>
                  <div className="position-relative px-md-1 col text-center d-flex align-items-center language ">
                    <img src={avatarBlankImage} className="px-md-2" alt="avatar image" />
                    <span className="px-md-1 signInOption cursor-pointer" onClick={signInClick}>Sign In</span>
                  </div>


                </>
              )}
            </div>
          </nav>
          {props.professional2 && (
            <>
              <ul className="nav-items-list list-unstyled d-flex align-items-center mb-0 d-xxl-none d-xl-none d-lg-none">
                <div className="border-end-custom p-0 ps-2" style={{ minHeight: '24px' }}>
                </div>
                {navtabItem?.map((item: any, index: number) => (
                  <>
                    <li key={index} className="mt-2 mx-3 nav-item ">
                      <a href={item.href} className="nav-link cursor-pointer" style={{ fontWeight: "bold" }}>
                        {item.label}
                      </a>
                    </li>
                    <div className="border-end-custom p-0 ps-2" style={{ minHeight: '24px' }}>
                    </div>
                  </>
                ))}
              </ul>

            </>
          )}
        </div>
      );
    }
    if (props.style === "With_Language_Switcher") {
      return (
        <div id="topnav">
          <nav className="navbar d-flex justify-content-between p-0 min-width align-items-center light-shadow">
            <div className="d-flex align-items-center">
              {props.showLogo && (<div
                onClick={handlerLogoClick}
                id="raaghuLogo"
                className=""
              >
                {props.top_nav_logo === "raaghu logo" ? (
                  <img className="cursor-pointer sidenav-mobile-logo" src={brandLogo} alt="logo" />
                ) : (
                  <span className="custom-logo-text custom-logo-font">Your Logo</span>
                )}
              </div>
              )}
              <div >
                {props.showSearch && props.professional3 && (
                  <div className="searchBackground ps-2" id="serachOption">
                    <RdsCompSearch
                      iconPosition={IconPosition.Right}
                      labelPosition="right"
                      placeholder="Search"
                      size="medium"
                      value={searchInput}
                      onChange={(e) => addFilter(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              className="navbar-toggler d-xxl-none d-xl-none d-lg-none d-md-none d-block border-0"
              type="button"
              onClick={props.onClickHamburger}
            >
              <span className="navbar-toggler-icon"></span>
            </button>



            <div className="d-flex align-items-center right-side-menu">
              {props.professional3 && (
                <>
                  <ul className="nav-items-list list-unstyled align-items-center mb-0 d-md-none d-lg-flex">
                    <li className="nav-item mx-3 cursor-pointer  ">Home</li>

                    {props.professional3 && breacrumItem?.length > 0 && (
                      <div className="mob-description ">
                        <>
                          <RdsBreadcrumb
                            borderColor={props.breadcrumbBorderColor}
                            borderPlacement={props.breadcrumbBorderPlacement}
                            breadcrumbItems={breacrumItem}
                            separator={props.product1 ? BreadcrumbSeparator.GreaterThan : undefined}
                            topnavPlusIcon={true}
                          ></RdsBreadcrumb>
                        </>
                      </div>
                    )}
                    <li className="nav-item mx-3 cursor-pointer  ">About us</li>

                  </ul>
                  <div className="position-relative px-md-1 col text-center d-flex align-items-center language ">
                    <img src={avatarBlankImage} className="px-md-2" alt="avatar image" />
                    <span className="px-md-1 signInOption cursor-pointer" onClick={signInClick}>Sign In</span>
                  </div>


                </>
              )}
            </div>
          </nav>
          {props.professional3 && (
            <>
              <ul className="nav-items-list list-unstyled d-flex align-items-center mb-0 d-xxl-none d-xl-none d-lg-none">
                <li className="nav-item mx-3 cursor-pointer  d-flex align-items-center mt-2">Home</li>

                {props.professional3 && breacrumItem?.length > 0 && (
                  <div className="mob-description ">
                    <>
                      <RdsBreadcrumb
                        breadcrumbItems={breacrumItem}
                        separator={props.product1 ? BreadcrumbSeparator.GreaterThan : undefined}
                        topnavPlusIcon={true}
                      ></RdsBreadcrumb>
                    </>
                  </div>
                )}
                <li className="nav-item mx-3 cursor-pointer d-flex align-items-center mt-2">About us</li>

              </ul>

            </>
          )}
        </div>
      );
    }
    if (props.style === "With_Collapsible_Menu") {
      return (
        <div id="topnav">
          <nav className="navbar d-flex justify-content-between p-0 min-width align-items-center light-shadow">
            <div className="d-flex align-items-center">
              <span className={`px-2 cursor-pointer active}`}>
                <RdsCompIcon
                  name="collapsable"
                  fill={false}
                  stroke={true}
                  height="18px"
                  width="18px"
                  onClick={() => handleCollapsebleIconClick()}
                ></RdsCompIcon>
              </span>
              <div className="d-flex align-items-center">
                {props.showLogo && (<div
                  onClick={handlerLogoClick}
                  id="raaghuLogo"
                  className=""
                >
                  {props.top_nav_logo === "raaghu logo" ? (
                    <img className="cursor-pointer sidenav-mobile-logo" src={brandLogo} alt="logo" />
                  ) : (
                    <span className="custom-logo-text custom-logo-font">Your Logo</span>
                  )}
                </div>
                )}

              </div>
            </div>

            <button
              className="navbar-toggler d-xxl-none d-xl-none d-lg-none d-md-none d-block border-0"
              type="button"
              onClick={props.onClickHamburger}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {breacrumItem?.length > 0 && (
              <div className="d-flex align-items-center flex-grow-1 justify-content-center  d-md-none d-lg-flex">
                <div className={` ${props.professional4 ? "ps-4" : ""}`}>
                  <>
                    <RdsBreadcrumb borderColor={props.breadcrumbBorderColor} borderPlacement={props.breadcrumbBorderPlacement} breadcrumbItems={breacrumItem} onBreadcrumbClick={handleBreadcrumbClick} ></RdsBreadcrumb>
                  </>
                </div>
              </div>)}

            <div className="d-flex align-items-center right-side-menu">
              {props.showSearch && props.professional4 && (
                <div className="searchBackground" id="serachOption">
                  <RdsCompSearch
                    iconPosition={IconPosition.Right}
                    labelPosition="right"
                    placeholder="Search"
                    size="medium"
                  />
                </div>
              )}
              {props.professional4 && (
                <div className="position-relative px-md-2 col text-center d-flex align-items-center language">
                  <div className="">
                    {props.navButtons.map((button: any) =>
                      <button className={`btn btn-${button.btnBackground} text-${button.textColor} me-3 p-2`} onClick={() => handleNavButtonClick(button.id)} style={{ fontSize: '13px', fontWeight: '500' }}>{button.name}</button>)
                    }
                  </div>
                </div>
              )}
            </div>
          </nav>
          {breacrumItem?.length > 0 && (
            <div className="align-items-center flex-grow-1 justify-content-center d-xxl-none d-xl-none d-lg-none mt-2">
              <div className={` ${props.professional4 ? "ps-4" : ""}`}>
                <>
                  <RdsBreadcrumb breadcrumbItems={breacrumItem} onBreadcrumbClick={handleBreadcrumbClick} ></RdsBreadcrumb>
                </>
              </div>
            </div>)}
        </div>
      );
    }
    if (props.style === "With_Theme_Switcher") {
      return (
        <div id="topnav">
          <nav className="navbar d-flex justify-content-between p-0 min-width align-items-center light-shadow">
            <div className="d-flex align-items-center">
              {props.showLogo && (<div
                onClick={handlerLogoClick}
                id="raaghuLogo"
                className=""
              >
                {props.top_nav_logo === "raaghu logo" ? (
                  <img className="cursor-pointer sidenav-mobile-logo" src={brandLogo} alt="logo" />
                ) : (
                  <span className="custom-logo-text p-3 custom-logo-font">Your Logo</span>
                )}
              </div>
              )}

            </div>

            <button
              className="navbar-toggler d-xxl-none d-xl-none d-lg-none d-md-none d-block border-0"
              type="button"
              onClick={props.onClickHamburger}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="d-flex align-items-center flex-grow-1 justify-content-center d-none d-md-flex">
              {props.showSearch && props.professional5 && (
                <div className="searchBackground" id="serachOption">
                  <RdsCompSearch
                    iconPosition={IconPosition.Right}
                    labelPosition="right"
                    placeholder="Search"
                    size="medium"
                  />
                </div>
              )}
            </div>

            <div className="d-flex align-items-center right-side-menu top-nav" id="language-dropdown-list">
              <div
                className={`position-relative px-2 px-md-3 col text-center d-flex align-items-center language`}
              >
                <RdsDropdownList
                  placeholder={"EN"}
                  icon={props.languageIcon}
                  iconFill={false}
                  iconStroke={false}
                  isPlaceholder={true}
                  id={"languageDropdown"}
                  listItems={languageItems}
                  showIcon={false}
                  onClick={onClickHandler}
                  tooltip={true}
                  tooltipTitle="Select Language"
                  tooltipStyle={TooltipStyle.MiddleTopArrow}
                  tooltipPlacement="bottom"
                  isCode={true}
                  state={DropdownState.Default}
                  size={DropdownSize.Small}
                  borderDropdown={false}                ></RdsDropdownList>
                <div className="d-block d-none fs-8 text-center">Language</div>
              </div>             
                 
               {props.professional5 && props.icons?.filter((icon: any) => 
                !icon.name.includes('notification') // Filter out notification icons to prevent duplicates
              ).map((icon: any) => (
                <span key={icon.id} className={`px-3 cursor-pointer ${activeImage === icon.id ? "active" : ""}`}>
                  <RdsCompIcon
                    name={icon.name}
                    fill={false}
                    stroke={true}
                    height="18px"
                    width="18px"
                    onClick={() => handleIconClick(icon)}
                  ></RdsCompIcon>
                </span>
              ))}
{(props.professional5 &&                <div id="notification-list"
                  className={`position-relative px-2 px-md-3 col text-center d-flex align-items-center notification-dropdown-container ${isNotificationDropdownOpen ? 'dropdown-open' : ''}`}
                >                  <div className="position-relative">
                    <RdsCompIcon
                      name="notification_new"
                      stroke={true}
                      height="18px"
                      width="18px"
                      onClick={handleNotificationClick}
                      isCursorPointer={true} 
                      tooltip={true}
                      tooltipTitle={"Notification"}
                      tooltipPlacement="bottom"
                      style={TooltipStyle.MiddleTopArrow}                        
                    ></RdsCompIcon>
                  </div>{isNotificationDropdownOpen && (
                    <div className="position-absolute bg-white  rounded shadow-lg" style={{ 
                      top: '100%', 
                      right: 0, 
                      zIndex: 1000, 
                      width: '420px', 
                      maxHeight: '500px', 
                      overflowY: 'auto',
                      marginTop: '8px',
                      padding:'7px',
                      border:'1px solid #7d7d7d',
                      boxShadow: '2px 8px 16px 0px #3C3C3C1F',
                    }}>                      
                      {notifications.length === 0 ? (
                        <div className="p-3 text-center text-muted">
                          <p>No notifications</p>
                        </div>
                      ) : (                        <div className="mb-2">
                          {notifications.map((notification, index) => (
                            <RdsNotification
                              key={notification.id}
                              layout={NotificationLayout.Horizontal}
                              notifications={[{
                                description: notification.description,
                                status: notification.status,
                                time: notification.time,
                                title: notification.title,
                                urlTitle: notification.urlTitle,
                              }]}
                              showButton={index === 1} // Show button only for second notification
                              showDismissIcon
                              showPrimaryButton={index === 1} // Show primary button only for second notification
                              style={NotificationStyle.Default}
                              type={notification.id === 1 ? NotificationType.Success : NotificationType.Info}
                              onDismiss={() => handleNotificationDismiss(notification.id)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>)}  



              <div className="position-relative px-3 px-md-1 col text-center mx-1" id="theme-icon">
                <RdsDropdownList
                  labelIconWidth="30px"
                  iconFill={true}
                  iconStroke={true}
                  icon={themeIcon}
                  labelIconHeight="26px"
                  isIconPlaceholder={true}
                  showSelectedOption={false}
                  isPlaceholder={false}
                  id={"themeDropdown"}
                  listItems={props.themeItems}
                  onClick={onClicktheme}
                  showIcon={true}
                  tooltip={true}
                  tooltipTitle="Change Theme"
                  tooltipStyle={TooltipStyle.MiddleTopArrow}
                  tooltipPlacement="bottom"
                  borderDropdown={false}
                  
                  
                />
              </div>
              {props.professional5 && (
                <div className="position-relative px-md-1 col text-center d-flex align-items-center language custome-border-start">
                  <div className="position-relative  d-block d-lg-none col text-center profile-off">
                    <RdsOffcanvas
                      className="pb-5 m-auto"
                      placement={RdsOffcanvasPlacement.End}
                      offcanvaswidth={307}
                      offId="Profile1"
                      offcanvasbutton={
                        <div
                          className="d-flex align-items-center justify-content-center cursorpointer"
                          id="customAvtar"
                        >
                          <img
                            className="avatar bg-light avatar-sm rounded rounded-circle mb-0"
                            src={profilePic}
                          ></img>
                        </div>
                      }
                      backDrop={RdsOffcanvasBackDrop.True}
                      scrolling={false}
                      preventEscapeKey={false}
                      canvasTitle={""}
                    >
                      <RdsCompProfile
                        navtabItems={navtabItems}
                        profilePic={profilePic}
                        userName={props.profileTitle}
                        userEmail={props.profileEmail}
                        userRole={props.tenantName}
                        onProfileLink={profileLinkListHandler}
                        onLogout={props.onLogout}
                        isImpersonation={props.isImpersonation}
                        backToMyAccount={props.backToMyAccount}
                        showUserName={true}
                      ></RdsCompProfile>
                    </RdsOffcanvas>

                    <div className="d-block d-none fs-8 text-center">Profile</div>
                  </div>                  <div className=" d-none d-lg-block px-1">
                    <div className="dropdown">
                      <button
                        className="btn d-flex align-items-center cursorpointer border-0 bg-transparent p-0"
                        type="button"
                        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                        aria-expanded={isProfileDropdownOpen}
                      >
                        <img
                          className="avatar bg-light avatar-sm rounded rounded-circle mb-0"
                          src={profilePic}
                        />
                        <div className="fs-6">
                          <div className="text-nowrap text-start">
                            {props.profileTitle}{" "}
                          </div>
                          <div className="text-nowrap text-muted text-start">
                            {props.role}
                          </div>
                        </div>
                        <span
                          className="ms-2"
                          style={{
                            transform: isProfileDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease',
                            display: 'inline-block'
                          }}
                        >
                          <RdsCompIcon
                            name="chevron_down"
                            height="11px"
                            width="11px"
                            fill={false}
                            stroke={true}
                          />
                        </span>
                      </button>
                      {isProfileDropdownOpen && (
                        <div className="custom-profile-dropdown" style={{ position: 'absolute', top: '100%', right: 0, zIndex: 1000 }}>
                          <InlineProfileComponent
                            profilePic={profilePic}
                            profileTitle={props.profileTitle}
                            profileEmail={props.profileEmail}
                            tenantName={props.tenantName}
                            onLogout={props.onLogout}
                            isImpersonation={props.isImpersonation}
                            backToMyAccount={props.backToMyAccount}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      );
    }
    if (props.style === "App_Shell_3") {
      return (
        <div>
          <nav className="navbar d-flex justify-content-between p-1 min-width align-items-center justify-content-md-end justify-content-lg-between light-shadow">
            <div
              onClick={handlerLogoClick}
              id="raaghuLogo"
              className="d-xxl-none d-xl-none d-lg-none d-md-none d-block"
            >
              <img
                className="cursor-pointer sidenav-mobile-logo"
                src={brandLogo}
                alt="logo"
              ></img>
            </div>

            <button
              className="navbar-toggler d-xxl-none d-xl-none d-lg-none d-md-none d-block border-0"
              type="button"
              onClick={props.onClickHamburger}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="d-flex align-items-center mt-5 mt-md-0 d-xxl-block d-xl-block d-lg-block d-none">
              <div className="d-flex">
                <>
                  <div>
                    {props.showLogo && (
                      <img
                        className="cursor-pointer pe-4"
                        width={120}
                        src={brandLogo}
                        alt="raaghu-logo"
                      ></img>
                    )}

                  </div>
                </>

              </div>
            </div>
            <div
              className={
                "d-flex align-items-center justify-content-between right-side-menu"
              }
            >

              <div className="position-relative px-2 px-md-3 col text-center  " id="list-versions">
                <RdsDropdownList
                  labelIconWidth="30px"
                  iconFill={true}
                  iconStroke={true}
                  icon={themeIcon}
                  labelIconHeight="26px"
                  isIconPlaceholder={true}
                  showSelectedOption={false}
                  isPlaceholder={false}
                  id={"themeDropdown"}
                  listItems={props.themeItems}
                  onClick={onClicktheme}
                  showIcon={true}
                  tooltip={true}
                  tooltipTitle="Change Theme"
                  tooltipStyle={TooltipStyle.MiddleTopArrow}
                  tooltipPlacement="bottom"
                  borderDropdown={false}
                />
              </div>

              <div
                className={`position-relative px-2 px-md-3 col border-end-custom ${currentPath != "/" && "border-start-custom"
                  }  ${props.isChatPermission && "border-end-custom"
                  } border-2 d-flex justify-content-center align-items-center text-center`}
              >
                <div className="py-xxl-0 py-xl-0 py-lg-0 py-1 d-flex align-items-center justify-content-center">
                  <span className="cursor-pointer" onClick={props.chatsHandler}>
                    <RdsCompIcon
                      name="chatting"
                      tooltip={true}
                      tooltipTitle={"Chat"}
                      tooltipPlacement="bottom"
                      style={TooltipStyle.MiddleTopArrow}
                      width="18px"
                      height="18px"
                      type="lottie"
                      isHovered
                    ></RdsCompIcon>
                  </span>
                </div>{" "}
              </div>

              <div className="d-block d-none fs-8 text-center">Chat</div>

              <div
                className={`position-relative px-2 px-md-3 d-flex border-start-custom ${!props.ShowProfileSection && "border-start-custom"
                  } justify-content-center d-lg-none d-md-none col text-center border-end-custom border-2 align-items-center`}
              >
                <div className="rounded-circle mbhome bg-primary">
                  <RdsCompIcon
                    name="home"
                    fill={false}
                    stroke={true}
                    height="18px"
                    width="18px"
                    colorVariant="light"
                    onClick={props.mobileViewLogoClick}
                  ></RdsCompIcon>
                </div>
              </div>
              {props.appshell3 &&
                <div id="topnav">
                  <div
                    className={"position-relative  px-md-3 p-1 me-3 col text-center d-flex align-items-center border-end-custom "}
                  >
                    <RdsDropdownList
                      labelIconWidth="18px"
                      labelIconHeight="18px"
                      placeholder={props.listItems[0].label || "EN"}
                      icon={props.languageIcon}
                      iconFill={false}
                      iconStroke={false}
                      isPlaceholder={true}
                      id={"languageDropdownTopNavigation"}
                      listItems={listItems}
                      showIcon={false}
                      onClick={onClickHandler}
                      tooltip={true}
                      tooltipTitle="Select Language"
                      tooltipStyle={TooltipStyle.MiddleTopArrow}
                      tooltipPlacement="bottom"
                      isCode={true}
                      state={DropdownState.Default}
                      size={DropdownSize.Small}
                      borderDropdown={false}
                    ></RdsDropdownList>
                  </div>
                </div>
              }
              <div className="position-relative px-2 px-md-3 d-block d-lg-none col text-center profile-off">
                <RdsOffcanvas
                  className="pb-5 m-auto"
                  placement={RdsOffcanvasPlacement.End}
                  offcanvaswidth={307}
                  offId="Profile1"
                  offcanvasbutton={
                    <div
                      className="d-flex align-items-center justify-content-center cursorpointer"
                      id="customAvtar"
                    >
                      <img
                        className="avatar bg-light avatar-sm rounded rounded-circle mb-0"
                        src={profilePic}
                      ></img>
                    </div>
                  }
                  backDrop={RdsOffcanvasBackDrop.True}
                  scrolling={false}
                  preventEscapeKey={false}
                  canvasTitle={""}
                >
                  <RdsCompProfile
                    navtabItems={navtabItems}
                    profilePic={profilePic}
                    userName={props.profileTitle}
                    userEmail={props.profileEmail}
                    userRole={props.tenantName}
                    onProfileLink={profileLinkListHandler}
                    onLogout={props.onLogout}
                    isImpersonation={props.isImpersonation}
                    backToMyAccount={props.backToMyAccount}
                    showUserName={true}
                  ></RdsCompProfile>
                </RdsOffcanvas>

                <div className="d-block d-none fs-8 text-center">Profile</div>
              </div>
              <div className="px-2 px-md-3 d-none d-lg-block">
                <div className="dropdown">
                  <button
                    className="btn d-flex align-items-center cursorpointer border-0 bg-transparent p-0"
                    type="button"
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    aria-expanded={isProfileDropdownOpen}
                  >
                    <img
                      className="avatar bg-light avatar-sm rounded rounded-circle mb-0"
                      src={profilePic}
                    />
                    <div className="ms-2 fs-6">
                      <div className="text-nowrap text-start">
                        {props.profileTitle}{" "}
                      </div>
                      <div className="text-nowrap text-muted text-start">
                        {props.role}
                      </div>
                    </div>                    <span
                      className="ms-3"
                      style={{
                        transform: isProfileDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        display: 'inline-block'
                      }}
                    >
                      <RdsCompIcon
                        name="chevron_down"
                        height="11px"
                        width="11px"
                        fill={false}
                        stroke={true}
                      />
                    </span>
                  </button>
                  {isProfileDropdownOpen && (
                    <div className="custom-profile-dropdown" style={{ position: 'absolute', top: '100%', right: 0, zIndex: 1000 }}>
                      <InlineProfileComponent
                        profilePic={profilePic}
                        profileTitle={props.profileTitle}
                        profileEmail={props.profileEmail}
                        tenantName={props.tenantName}
                        onLogout={props.onLogout}
                        isImpersonation={props.isImpersonation}
                        backToMyAccount={props.backToMyAccount}
                      />
                    </div>
                  )}
                </div>
              </div>


            </div>
          </nav>
          {props.appshell3 && <nav className="navbar d-flex justify-content-between p-1 min-width align-items-center justify-content-md-end justify-content-lg-between light-shadow border-top d-none d-md-flex ">
            <div className="d-flex align-items-center justify-content-center flex-grow-1">
              <div className="d-flex justify-content-center w-100">
                {breacrumItem?.length > 0 && (
                  <div className="mob-description fs-6">
                    <RdsBreadcrumb
                      borderColor={props.breadcrumbBorderColor}
                      borderPlacement={props.breadcrumbBorderPlacement}
                      breadcrumbItems={breacrumItem}
                      separator={props.product1 ? BreadcrumbSeparator.GreaterThan : undefined}
                      topnavPlusIcon={props.product2 || props.product3}
                      showIcon={true}
                    ></RdsBreadcrumb>
                  </div>
                )}
              </div>
            </div>
          </nav>
          }

        </div>
      );

    }
    return (
      <>

        {(props.style === "Default" ||
          props.style === "ABP" ||
          props.style === "Basic_Navigation" ||
          props.style === "With_Social_Links" ||
          props.style === "With_Download_Button" ||
          props.style === "With_User_Avatar") && (

            <div>
              <nav className="navbar top-nav d-flex justify-content-between p-1 min-width align-items-center justify-content-lg-between light-shadow">
                <div
                  onClick={handlerLogoClick}
                  id="raaghuLogo"
                  className="d-xxl-none d-xl-none d-lg-none d-md-none d-block"
                >
                  <img
                    className="cursor-pointer sidenav-mobile-logo"
                    src={brandLogo}
                    alt="logo"
                  ></img>
                </div>

                <button
                  className="navbar-toggler d-xxl-none d-xl-none d-lg-none d-md-none d-block border-0 ms-auto"
                  type="button"
                  onClick={props.onClickHamburger}
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="d-flex align-items-center mt-md-0 d-xxl-block d-xl-block d-lg-block">
                  <div className="d-flex">
                    <>
                      {(!props.product1 && <div>
                        {props.showLogo && (
                          <img
                            className="cursor-pointer pe-4 d-md-flex d-none"
                            width={120}
                            src={brandLogo}
                            alt="raaghu-logo"
                          ></img>
                        )}
                        {/* {((!props.product4 && !props.entertainment1) && <span className="text-bold text-primary d-none d-md-flex ps-4">
                          { navtitle}
                        </span>)} */}
                        {((!props.product4 && !props.entertainment1 && !props.product2 && !props.product3 && !props.showLogo) && <span className="text-bold text-primary d-none d-md-flex ps-4">
                          {navtitle}
                        </span>)}
                      </div>)}
                    </>
                    {(props.product1 || props.product2 || props.product3) && breacrumItem?.length > 0 &&
                      (<div id="home-icon" className={`mob-description d-flex align-items-center mt-5 mt-md-0 d-xxl-block d-xl-block d-lg-block d-none${props.product3 ? ' product3' : ''}`}>
                        <>
                          <RdsBreadcrumb
                            borderColor={props.breadcrumbBorderColor}
                            borderPlacement={props.breadcrumbBorderPlacement}
                            breadcrumbItems={breacrumItem}
                            separator={props.product1 ? BreadcrumbSeparator.GreaterThan : undefined}
                            topnavPlusIcon={props.product2 || props.product3}
                            showIcon={true}
                          ></RdsBreadcrumb>
                        </>
                      </div>
                      )}
                  </div>
                </div>
                <div
                  className={
                    "d-flex px-2 align-items-center justify-content-between right-side-menu"
                  }
                >
                  {((!props.product1 && !props.product2 && !props.product3 && !props.product4 && !props.entertainment1) && <>
                    <div className="position-relative px-2 px-md-3 col text-center" id="dropdown-list-theme">
                      <RdsDropdownList
                        labelIconWidth="30px"
                        iconFill={true}
                        iconStroke={true}
                        icon={themeIcon}
                        labelIconHeight="26px"
                        isIconPlaceholder={true}
                        showSelectedOption={false}
                        isPlaceholder={false}
                        id={"themeDropdown"}
                        listItems={props.themeItems}
                        onClick={onClicktheme}
                        showIcon={true}
                        tooltip={true}
                        tooltipTitle="Select Theme"
                        tooltipStyle={TooltipStyle.MiddleTopArrow}
                        tooltipPlacement="bottom"
                        borderDropdown={false}
                      />
                      
                      {/* <div className="d-block d-none fs-8 text-center">Light</div> */}
                    </div>

                    <div
                      className={`position-relative px-2 px-md-3 col ${currentPath != "/" && "border-start-custom"
                        }  ${props.isChatPermission && "border-end-custom"
                        } border-2 d-flex justify-content-center align-items-center text-center`}
                    >
                      <div className="py-xxl-0 py-xl-0 py-lg-0 py-1 d-flex align-items-center justify-content-center">
                        <span className="cursor-pointer" onClick={props.chatsHandler}>
                          <RdsCompIcon
                            name="chatting"
                            tooltip={true}
                            tooltipTitle={"Notification"}
                            tooltipPlacement="bottom"
                            style={TooltipStyle.MiddleTopArrow}
                            width="18px"
                            height="18px"
                            type="lottie"
                            isHovered
                          ></RdsCompIcon>
                        </span>
                      </div>{" "}
                    </div>

                    <div className="d-block d-none fs-8 text-center">Chat</div>

                    <div
                      className={`position-relative px-2 px-md-3 d-flex ${!props.ShowProfileSection && "border-start-custom"
                        } justify-content-center d-lg-none d-md-none col text-center border-end-custom border-2 align-items-center`}
                    >
                      <div className="rounded-circle mbhome bg-primary">
                        <RdsCompIcon
                          name="home"
                          fill={false}
                          stroke={true}
                          height="18px"
                          width="18px"
                          colorVariant="light"
                          onClick={props.mobileViewLogoClick}
                        ></RdsCompIcon>
                      </div>
                    </div>

                    <div id="dropdown-list-language"
                      className={`position-relative px-2 px-md-4 ${!props.ShowProfileSection && "border-start-custom"
                        }  border-end-custom col text-center d-flex align-items-center language`}
                    >
                      <RdsDropdownList
                        placeholder={"EN"}
                        icon={props.languageIcon}
                        iconFill={false}
                        iconStroke={false}
                        isPlaceholder={true}
                        id={"languageDropdown"}
                        listItems={languageItems}
                        showIcon={false}
                        onClick={onClickHandler}
                        tooltip={true}
                        tooltipTitle="Select Language"
                        tooltipStyle={TooltipStyle.MiddleTopArrow}
                        tooltipPlacement="bottom"
                        isCode={true}
                        state={DropdownState.Default}
                        size={DropdownSize.Small}
                        borderDropdown={false}
                      ></RdsDropdownList>
                      <div className="d-block d-none fs-8 text-center">Language</div>
                    </div>
                  </>)}
                  {props.product1 && props.icons?.map((icon: any) => (
                    <span className={`px-2 cursor-pointer ${activeImage === icon.id ? "active" : ""} `}>
                      <RdsCompIcon
                        key={icon.id}
                        name={icon.name}
                        fill={false}
                        stroke={true}
                        height="18px"
                        width="18px"
                        colorVariant="dark"
                        onClick={() => handleIconClick(icon)}
                      ></RdsCompIcon>
                    </span>
                  ))}

                  {((!props.product2 && !props.product3 && !props.product4 && !props.entertainment1) && <>
                    <div className="position-relative px-2 px-md-4 d-block d-lg-none col text-center profile-off">
                      <RdsOffcanvas
                        className="pb-5 m-auto"
                        placement={RdsOffcanvasPlacement.End}
                        offcanvaswidth={307}
                        offId="Profile1"
                        offcanvasbutton={
                          <div
                            className="d-flex align-items-center justify-content-center cursorpointer"
                            id="customAvtar"
                          >
                            <img
                              className="avatar bg-light avatar-sm rounded rounded-circle mb-0"
                              src={profilePic}
                            ></img>
                          </div>
                        }
                        backDrop={RdsOffcanvasBackDrop.True}
                        scrolling={false}
                        preventEscapeKey={false}
                        canvasTitle={""}
                      >
                        <RdsCompProfile
                          navtabItems={navtabItems}
                          profilePic={profilePic}
                          userName={props.profileTitle}
                          userEmail={props.profileEmail}
                          userRole={props.tenantName}
                          onProfileLink={profileLinkListHandler}
                          onLogout={props.onLogout}
                          isImpersonation={props.isImpersonation}
                          backToMyAccount={props.backToMyAccount}
                          showUserName={true}
                        ></RdsCompProfile>
                      </RdsOffcanvas>

                      <div className="d-block d-none fs-8 text-center">Profile</div>
                    </div>
                    <div className="px-2 px-md-3 d-none d-lg-block">
                      <div className="dropdown">
                        <button
                          className="btn d-flex align-items-center cursorpointer border-0 bg-transparent p-0"
                          type="button"
                          onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                          aria-expanded={isProfileDropdownOpen}
                        >
                          <img
                            className="avatar bg-light avatar-sm rounded rounded-circle mb-0"
                            src={profilePic}
                          />
                          <div className="ms-2 fs-6">
                            <div className="text-nowrap text-start">
                              {props.profileTitle}{" "}
                            </div>
                            <div className="text-nowrap text-muted text-start">
                              {props.role}
                            </div>
                          </div>                          <span
                            className="ms-3"
                            style={{
                              transform: isProfileDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.2s ease',
                              display: 'inline-block'
                            }}
                          >
                            <RdsCompIcon
                              name="chevron_down"
                              height="11px"
                              width="11px"
                              fill={false}
                              stroke={true}
                            />
                          </span>
                        </button>
                        {isProfileDropdownOpen && (
                          <div className="custom-profile-dropdown" style={{ position: 'absolute', top: '100%', right: 0, zIndex: 1000 }}>
                            <InlineProfileComponent
                              profilePic={profilePic}
                              profileTitle={props.profileTitle}
                              profileEmail={props.profileEmail}
                              tenantName={props.tenantName}
                              onLogout={props.onLogout}
                              isImpersonation={props.isImpersonation}
                              backToMyAccount={props.backToMyAccount}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </>)}
                  {props.product2 &&
                    <div id="topnav">
                      <div 
                        className={"position-relative  px-md-3 p-1 me-3 col text-center d-flex align-items-center language rounded dropdown-list"}
                      >
                        <RdsDropdownList
                          labelIconWidth="18px"
                          labelIconHeight="18px"
                          placeholder={props.listItems[0].label || "EN"}
                          icon={props.languageIcon}
                          iconFill={false}
                          iconStroke={false}
                          isPlaceholder={true}
                          id={"languageDropdownTopNavigation"}
                          listItems={listItems}
                          showIcon={false}
                          onClick={onClickHandler}
                          tooltip={true}
                          tooltipTitle="Select Language"
                          tooltipStyle={TooltipStyle.MiddleTopArrow}
                          tooltipPlacement="bottom"
                          isCode={true}
                          state={DropdownState.Default}
                          size={DropdownSize.Small}
                        ></RdsDropdownList>
                      </div>
                    </div>
                  }
                  {(props.product2 || props.product3) && props.socialMediaIcons?.map((icon: any) => (
                    <img
                      key={icon.id}
                      src={icon.src}
                      alt={icon.alt}
                      className={`px-2 cursor-pointer ${activeImage === icon.id ? "active" : ""} `}
                      onClick={() => handleIconClick(icon)}
                    ></img>
                  ))}
                  {((props.product2 || props.product3) && <button className="btn btn-primary p-2 ms-3 me-2">Download</button>)}
                  <div
                    className={"position-relative px-2 px-md-1 col text-center d-flex align-items-center "}
                    id="topnav"
                  >
                    {((props.showSearch && (props.product4 || props.entertainment1)) && <div className="searchBackground right-side-menu" id="serachOption">
                      <RdsCompSearch
                        iconPosition={IconPosition.Right}
                        labelPosition="right"
                        placeholder="Search"
                        size="medium"
                      />
                    </div>)}
                  </div>
                  {(props.product4 && <div
                    className={`position-relative   col text-center d-flex align-items-center language ${(props.ecommerce4 || props.product4) ? "" : "px-md-3"} `}
                  >
                    {props.product4 && props.icons?.map((icon: any) => (
                      <>
                        <span className={`px-2 cursor-pointer ${activeImage === icon.id ? "active" : ""} `}>
                          <RdsCompIcon
                            key={icon.id}
                            name={icon.name}
                            fill={false}
                            stroke={true}
                            height="18px"
                            width="18px"
                            onClick={() => handleIconClick(icon)}
                          ></RdsCompIcon>
                        </span>
                      </>
                    ))}
                  </div>

                  )}
                  {(props.product4 && <div
                    className={"position-relative px-1 col text-center d-flex align-items-center"}
                  >
                    <RdsAvatar
                      avtarOnly
                      colorVariant={props.colorVariant}
                      firstName={props.firstName}
                      lastName={props.lastName}
                      profilePic={profilePic}
                      role={props.role}
                      size={AvatarSize.medium}
                      title="horizontal"
                    />
                  </div>)}
                </div>
              </nav>
              {props.product4 && <nav className="navbar d-flex justify-content-between p-1 min-width align-items-center justify-content-md-end justify-content-lg-between light-shadow border-top">
                <div className="d-flex align-items-center justify-content-center flex-grow-1">
                  <div className="d-flex justify-content-center w-100">
                    {breacrumItem?.length > 0 && (<div className="mob-description">
                      <RdsBreadcrumb
                        breadcrumbItems={breacrumItem}
                        borderColor={props.breadcrumbBorderColor}
                        borderPlacement={props.breadcrumbBorderPlacement}
                        separator={props.product1 ? BreadcrumbSeparator.GreaterThan : undefined}
                        topnavPlusIcon={props.product2 || props.product3}
                        showIcon={true}
                      ></RdsBreadcrumb>
                    </div>
                    )}
                  </div>
                </div>
              </nav>
              }

              {(props.product1 || props.product2 || props.product3) && breacrumItem?.length > 0 && (<div className="mob-description d-flex align-items-center mt-5 mt-md-0 d-xxl-none d-xl-none d-lg-none">
                <>
                  <RdsBreadcrumb
                    breadcrumbItems={breacrumItem}
                    borderColor={props.breadcrumbBorderColor}
                    borderPlacement={props.breadcrumbBorderPlacement}
                    separator={props.product1 ? BreadcrumbSeparator.GreaterThan : undefined}
                    topnavPlusIcon={props.product2 || props.product3}
                    showIcon={true}
                  ></RdsBreadcrumb>
                </>
              </div>
              )}
            </div>
          )}
      </>
    );
  };

  return <>{renderTopbar()}</>;
};

export default RdsTopNavigation;