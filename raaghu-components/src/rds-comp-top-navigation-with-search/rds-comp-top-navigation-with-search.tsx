import React, { useState, useEffect } from "react";
import {
    RdsIcon,
    RdsBreadcrumb,
    RdsDropdownList,
    RdsSearch,
    RdsOffcanvas
} from "../rds-elements";
import { useTranslation } from "react-i18next";
import RdsCompProfile from "../rds-comp-profile";
import { RdsOffcanvasBackDrop, RdsOffcanvasPlacement } from "../../../raaghu-elements/src/rds-offcanvas/rds-offcanvas";
export interface RdsCompTopNavigationWithSearchProps {
  ShowProfileSection?: boolean;
  onClick?: (event: React.MouseEvent<HTMLLIElement>, val: string) => void;
  onChatClickHandler?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  toggleTheme?: React.MouseEventHandler<HTMLInputElement>;
  onClickThemeCheck?: (
    event: React.MouseEvent<HTMLLIElement>,
    val: string
  ) => void;
  notifications?: any[];
  languageItems?: any[];
  themeItems: any[];
  toggleItems: any[];
  elementList: any[];
  componentsList: any[];
  navbarTitle?: string;
  brandName?: string;
  brandLogo?: string;
  profileTitle?: any;
  profileName?: string;
  profileEmail?: string;
  logo?: string;
  languageLabel: string;
  languageIcon?: string;
  width?: string;
  themeLabel: string;
  breacrumItem?: any;
  profilePic?: any;
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
  tenantName?: any;
  mobileViewLogoClick?: (Event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickHamburger?: (Event: React.MouseEvent<HTMLButtonElement>) => void;
  isLandingPage?: boolean;
  isChatPermission?: any;
  showUserName?: boolean;
  navbarSubTitle?: any;
}

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

const RdsCompTopNavigationWithSearch = (
    props: RdsCompTopNavigationWithSearchProps
) => {
    const { t } = useTranslation();
    const [logoImage, setLogoImage] = useState(props.logo);
    const [breacrumItem, setBreadCrumItem] = useState(props.breacrumItem);
    const [navtitle, setNavtitle] = useState(props.navbarTitle);
    const [resetDrop, setResetDrop] = useState(false);

    const onClickHandler = (e: any, val: any) => {
        if (props.onClick) {
            props.onClick(e, val);
        }
    };

    useEffect(() => {
        setLogoImage(props.logo);
    }, [props.logo, props.brandLogo]);

    //side effect for breadcrum
    useEffect(() => {
        setBreadCrumItem(props.breacrumItem);
    }, [props.breacrumItem]);

    const [profilePic, setProfilePic] = useState(
        "./assets/profile-picture-circle.svg"
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
            setBreadCrumItem([]);
        }
        setNavtitle(props.navbarTitle);
        if (
            (navtitle != "Element" &&
        navtitle != "Component" &&
        navtitle != "Chart") ||
      props.navbarTitle != navtitle
        ) {
            setResetDrop(!resetDrop);
        }
    }, [props.breacrumItem, props.navbarTitle]);

    const languageItems = [
        {
            label: "EN(US)",
            val: "en",
        },
        {
            label: "English(IND)",
            val: "en",
        },
        {
            label: "French",
            val: "fr",
        },
    ];

    const profileLinkListHandler: any = (
        id: string,
        navigateTo: string,
        label: string
    ) => {
        props.onProfileLinkTopNav(id, navigateTo, label);
    };

    return (
        <div>
            <nav className="navbar d-flex justify-content-between p-1 min-width align-items-center justify-content-md-end justify-content-lg-between shadow">
                <div id="raaghuLogo" className="d-block">
                    <img
                        className="cursor-pointer sidenav-logo mx-1"
                        src={logoImage}
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
                    <div>
                        {breacrumItem?.length == 0 && (
                            <>
                                <div>
                                    <span className="text-bold text-primary  ps-4">
                                        {navtitle}
                                    </span>
                                </div>
                            </>
                        )}
                        {breacrumItem?.length > 0 && (
                            <div className="mob-description ">
                                <>
                                    <RdsBreadcrumb breadcrumbItems={breacrumItem}></RdsBreadcrumb>
                                </>
                            </div>
                        )}
                    </div>
                </div>
                <div className="searchBackground">
                    <RdsSearch
                        iconPosition="right"
                        labelPosition="right"
                        placeholder="Search"
                        size="small"
                    />
                </div>       

                <div
                    className={
                        "d-flex align-items-center justify-content-between right-side-menu"
                    }
                >
                    <div
                        className={"position-relative px-2 px-md-4  col text-center d-flex align-items-center language"}
                    >
                        <RdsDropdownList
                            labelIcon={props.languageIcon}
                            labelIconWidth="18px"
                            labelIconHeight="18px"
                            placeholder={"EN"}
                            icon={props.languageIcon}
                            iconFill={false}
                            iconStroke={false}
                            isPlaceholder={true}
                            id={"languageDropdownTopNavigation"}
                            listItems={languageItems}
                            showIcon={false}
                            onClick={onClickHandler}
                            // tooltip={true}
                            // tooltipTitle={"Select Language"}
                            // tooltipPlacement="bottom"
                            isCode={true}

                        ></RdsDropdownList>
                        <div className="d-block d-none fs-8 text-center">Language</div>
                    </div>
                    {/* language----------------------------------------------------------------------------------------------- */}
                    <div
                        className={"position-relative px-2 px-md-3  col text-center d-flex align-items-center"}
                    >
                        <RdsIcon
                            name="star"
                            fill={false}
                            stroke={true}
                            height="18px"
                            width="18px"
                            onClick={props.mobileViewLogoClick}
                            isCursorPointer={true}
                        ></RdsIcon>
                    </div>
                    {/* star----------------------------------------------------------------------------------------------- */}

                    <div
                        className={"position-relative px-2 px-md-3 col text-center d-flex align-items-center"}
                    >
                        <RdsIcon
                            name="notification"
                            fill={false}
                            stroke={true}
                            height="18px"
                            width="18px"
                            onClick={props.mobileViewLogoClick}
                            isCursorPointer={true}
                        ></RdsIcon>
                    </div>
                    {/* notification----------------------------------------------------------------------------------------------- */}

                    <div
                        className={"position-relative px-2 px-md-3 col text-center d-flex align-items-center"}
                    >
                        <RdsIcon
                            name="question"
                            fill={false}
                            stroke={true}
                            height="18px"
                            width="18px"
                            onClick={props.mobileViewLogoClick}
                            isCursorPointer={true}
                        ></RdsIcon>
                    </div>
                    
                    {/* theme----------------------------------------------------------------------------------------------- */}
                    <div className="d-block d-none fs-8 text-center ">Profile</div>
                    <div className="px-2 px-md-3 d-none d-lg-block">  
                        <RdsOffcanvas
                            className="pb-0"
                            placement={RdsOffcanvasPlacement.End}
                            offcanvaswidth={307}
                            offId="Profile"
                            offcanvasbutton={
                                <div className="d-flex align-items-center cursorpointer">
                                    <img
                                        className="avatar bg-light avatar-sm rounded rounded-circle mb-0"
                                        src={profilePic}
                                    ></img>
                                    <div className="ms-2 fs-6">
                                        <div className="text-nowrap">Hi, {props.profileTitle} </div>
                                        <div className="text-nowrap text-muted">
                                            {props.profileEmail}
                                        </div>
                                    </div>
                                    <span className="ms-3">
                                        <RdsIcon
                                            name="chevron_down"
                                            height="11px"
                                            width="11px"
                                            fill={false}
                                            stroke={true}
                                            isCursorPointer={true}
                                        ></RdsIcon>
                                    </span>
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
                                onLogout={props.onLogout}
                                isImpersonation={props.isImpersonation}
                                backToMyAccount={props.backToMyAccount}
                                onProfileLink={profileLinkListHandler}
                                showUserName={true}
                            ></RdsCompProfile>
                        </RdsOffcanvas>
                        {/* home----------------------------------------------------------------------------------------------- */}
                    </div>
                </div>
               
            </nav>
        </div>
    );
};

export default RdsCompTopNavigationWithSearch;