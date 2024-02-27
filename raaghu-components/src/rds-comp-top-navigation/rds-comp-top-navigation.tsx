import React, { useState, useEffect } from "react";
import RdsCompProfile from "../rds-comp-profile/rds-comp-profile";
import {
  RdsIcon,
  RdsOffcanvas,
  RdsBreadcrumb,
  RdsDropdownList
} from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompTopNavigationProps {
  ShowProfileSection?: boolean;
  onClick?: (event: React.MouseEvent<HTMLLIElement>, val: string) => void;
  onChatClickHandler?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  toggleTheme?: React.MouseEventHandler<HTMLInputElement>;
  onClickThemeCheck?: (
    event: React.MouseEvent<HTMLLIElement>,
    val: string
  ) => void;
  notifications?: any[];
  languageItems: any[];
  themeItems: any[];
  toggleItems: any[];
  elementList: any[];
  componentsList: any[];
  navbarTitle?: string;
  brandName?: string;
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

const RdsCompTopNavigation = (props: RdsCompTopNavigationProps) => {
  const { t } = useTranslation();
  const [logoImage, setLogoImage] = useState(props.logo);
  const [breacrumItem, setBreadCrumItem] = useState(props.breacrumItem);
  const [path, setPath] = useState({
    elem: "/elements",
    compo: "/components",
    chart: "/charts",
    icon: "",
  });

  const labelObj: any = {};
  const [hoverState, setHoverState] = useState(labelObj);
  const [navtitle, setNavtitle] = useState(props.navbarTitle);
  const [resetDrop, setResetDrop] = useState(false);

  const currentPath = window.location.pathname;

  useEffect(() => {
    setHoverState(labelObj);
  }, []);

  const navtabItems = [
    {
      label: "My Account",
      icon: "manage_authority",
      subText: "Manage authority accounts",
      id: "nav-MyAccount",
      navigateTo: "/my-account",
      iconPath: "./assets/lottie-files/outlined/dual-color/myaccount.json",
    },
    {
      label: "My Security Logs",
      icon: "login_attempts",
      subText: "See recent login attempts",
      id: "nav-SecuityLogs",
      navigateTo: "/security-Logs",
      iconPath:
        "./assets/lottie-files/outlined/dual-color/ProtectedAccount.json",
    },
    {
      label: "Personal Data",
      icon: "my_settings",
      subText: "Change your account settings",
      id: "nav-PersonalData",
      navigateTo: "/personal-data",
      iconPath: "./assets/lottie-files/outlined/dual-color/personal-data.json",
    },
  ];

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

  useEffect(() => {
    setLogoImage(props.logo);
  }, [props.logo]);

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

  const [expanded, setExpanded] = useState(true);
  //side effect for the path
  useEffect(() => {
    if (navtitle == "Component") {
    }
    if (navtitle == "Element") {
    }
    if (navtitle == "Chart") {
    }
    if (navtitle == "Icon") {
    }
  }, [path]);

  const themeItems = [
    {
      id: 0,
      label: t("Light"),
      val: "Light",
      iconWidth: "30px",
      iconHeight: "30px",
      iconPath: "/assets/lottie-files/outlined/dual-color/sun.json",
    },
    {
      id: 1,
      label: t("Dark"),
      val: "Dark",
      iconWidth: "30px",
      iconHeight: "30px",
      iconPath: "/assets/lottie-files/outlined/dual-color/moon.json",
    },
    {
      id: 2,
      label: t("Semi Dark"),
      val: "Semi Dark",
      iconWidth: "30px",
      iconHeight: "30px",
      iconPath: "/assets/lottie-files/outlined/dual-color/semi-dark.json",
    },
  ];

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

  const handlerLogoClick = () => {
    setBreadCrumItem([]);
  };

  const profileLinkListHandler: any = (
    id: string,
    navigateTo: string,
    label: string
  ) => {
    props.onProfileLinkTopNav(id, navigateTo, label);
  };

  return (
    <div>
      <nav className="navbar d-flex justify-content-between p-2 min-width align-items-center justify-content-md-end justify-content-lg-between shadow">
        <div
          onClick={handlerLogoClick}
          id="raaghuLogo"
          className="d-xxl-none d-xl-none d-lg-none d-md-none d-block"
        >
          <img
            className="cursor-pointer sidenav-mobile-logo"
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

        <div className="d-flex align-items-center mx-4 ms-2 mt-5 mt-md-0 d-xxl-block d-xl-block d-lg-block d-none">
          <div>
            {breacrumItem?.length == 0 && (
              <div className="text-bold text-primary">{navtitle}</div>
            )}
            {breacrumItem?.length > 0 && (
              <div className="mob-description ">
                <>
                  <RdsBreadcrumb breadItems={breacrumItem}></RdsBreadcrumb>
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
          <div className="position-relative px-2 px-md-3 col text-center  ">
            <RdsDropdownList
              iconPath={"/assets/lottie-files/outlined/dual-color/sun.json"}
              labelIconWidth="30px"
              labelIconHeight="26px"
              isIconPlaceholder={true}
              isPlaceholder={false}
              placeholder={"/assets/lottie-files/outlined/dual-color/sun.json"}
              id={"themeDropdown"}
              listItems={themeItems}
              onClick={onClicktheme}
              showIcon={true}
              tooltip={true}
              tooltipTitle={"Select Theme"}
              tooltipPlacement="bottom"
            />
            <div className="d-block d-none fs-8 text-center">Light</div>
          </div>

          <div
            className={`position-relative px-2 px-md-3 col ${
              currentPath != "/" && "border-start-custom"
            }  ${
              props.isChatPermission && "border-end-custom"
            } border-2 d-flex justify-content-center align-items-center text-center`}
          >
            <div className="py-xxl-0 py-xl-0 py-lg-0 py-1 d-flex align-items-center justify-content-center">
              <span className="cursor-pointer" onClick={props.chatsHandler}>
                <RdsIcon
                  iconPath={"./assets/lottie-files/outlined/dual-color/chatting.json"}
                  tooltip={true}
                  tooltipTitle={"Chat"}
                  tooltipPlacement="bottom"
                  width="28px"
                  height="28px"
                  type="lottie"
                  isHovered
                ></RdsIcon>
              </span>
            </div>{" "}
          </div>

          <div className="d-block d-none fs-8 text-center">Chat</div>

          <div
            className={`position-relative px-2 px-md-3 d-flex ${
              !props.ShowProfileSection && "border-start-custom"
            } justify-content-center d-lg-none d-md-none col text-center border-end-custom border-2 align-items-center`}
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

          <div
            className={`position-relative px-2 px-md-3 ${
              !props.ShowProfileSection && "border-start-custom"
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
              tooltipTitle={"Select Language"}
              tooltipPlacement="bottom"
              isCode={true}
            ></RdsDropdownList>
            <div className="d-block d-none fs-8 text-center">Language</div>
          </div>

          <div className="position-relative px-2 px-md-3 d-block d-lg-none col text-center profile-off">
            <RdsOffcanvas
              className="pb-0 m-auto"
              placement="end"
              offcanvaswidth={307}
              offId="Profile1"
              offcanvasbutton={
                <div className="d-flex align-items-center justify-content-center cursorpointer">
                  <img
                    className="avatar bg-light avatar-sm rounded rounded-circle mb-0"
                    src={profilePic}
                  ></img>
                </div>
              }
              backDrop={true}
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
            <RdsOffcanvas
              className="pb-0"
              placement="end"
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
                    ></RdsIcon>
                  </span>
                </div>
              }
              backDrop={true}
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
          </div>
        </div>
      </nav>
    </div>
  );
};

export default RdsCompTopNavigation;
