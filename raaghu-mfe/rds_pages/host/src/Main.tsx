import React, { Suspense, useState, useEffect } from "react";
import { Route, useNavigate, Routes, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./App.scss";
import { getGrantedSideNavItems } from "../../../../raaghu-react-core/src/index";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../libs/state-management/hooks";
import {
  RdsCompSideNavigation,
  RdsCompTopNavigation,
} from "../../rds-components";
import {
  changeLanguageAction,
  setlogoImgAction,
  getProfilePictureHost,
} from "../../../libs/state-management/host/host-slice";
import {
  LoginCompo,
  ForgotPasswordCompo,
  ChangePasswordCompo,
  RegisterCompo,
  PageNotFoundCompo,
  FormsResponseCompo,
} from "./PageComponent";
import MainRoutes from "./MainRoutes";
import { getTranslatedThemeItems } from "./data";
import sideNavItems from "./sideNav";

export interface MainProps {
  toggleTheme?: React.MouseEventHandler<HTMLInputElement>;
  auth?: any;
  handlerLogoClick?: any;
  isImpersonation?: any;
  chatsHandler?: any;
  backToMyAccount?: any;
  logout?: any;
  isImpersonationButton?: any;
  currentTitle?: any;
  languageData?: any;
  currLanguageIcon?: any;
  breacrumbItem?: any;
  currLangLabel?: any;
}

const Main = (props: MainProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const [toggleClass, setToggleClass] = useState(false);
  const [logoImage, setLogoImage] = useState("/assets/raaghu_logs.svg");
  const [profilePic, setProfilePic] = useState(
    "/assets/profile-picture-circle.svg"
  );
  const auth = props.auth;
  const themeItems = getTranslatedThemeItems();
  const currLogo = useAppSelector(
    (state) => state.persistedReducer.host?.logoImg || logoImage
  );
  const profileName = localStorage.getItem("name");
  const onClickHandler = (_e: any, val: any) => {
    dispatch(changeLanguageAction(val) as any);
  };

  const picchangemonitor = useAppSelector(
    (state) => state.persistedReducer.myaccount.getProfilePicData
  );

  const dataHostPic = useAppSelector(
    (state) => state.persistedReducer.host.profilepic
  );

  function onClickHamburger() {
    setToggleClass((prevToggleClass) => !prevToggleClass); // Toggle the class
  }

  const mobileViewLogoClick = () => {
    navigate("/");
  };

  const topNavigationProfileHandler: any = (
    _id: string,
    navigateTo: string
  ) => {
    navigate(navigateTo);
  };

  const onClicktheme = (_e: any, val: any) => {
    if (val == "Light") {
      dispatch(
        setlogoImgAction({
          logoImg: "/assets/raaghu_logs.svg",
          theme: "light",
        }) as any
      );
    } else if (val == "Dark") {
      dispatch(
        setlogoImgAction({
          logoImg: "/assets/raaghu-logo-white-text.svg",
          theme: "dark",
        }) as any
      );
    } else if (val == "Semi Dark") {
      dispatch(
        setlogoImgAction({
          logoImg: "/assets/raaghu-logo-white-text.svg",
          theme: "semidark",
        }) as any
      );
      localStorage.setItem("theme", "semidark");
    }
  };

  function createImageFromBase64(
    base64String: string
  ): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = `data:image/png;base64,${base64String}`;
      img.addEventListener("load", () => {
        resolve(img);
      });
      img.addEventListener("error", (err) => {
        reject(err);
      });
    });
  }

  useEffect(() => {
    setLogoImage(currLogo);
  }, [currLogo]);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    dispatch(getProfilePictureHost(id) as any);
  }, [dispatch, picchangemonitor]);

  useEffect(() => {
    if (dataHostPic) {
      if (dataHostPic.type == 2) {
        createImageFromBase64(dataHostPic.fileContent).then((image) => {
          setProfilePic(image.src);
        });
      } else if (dataHostPic.type == 1) {
        setProfilePic("/assets/Avatar-rds-mascot.svg");
      } else {
        setProfilePic("/assets/profile-picture-circle.svg");
      }
    }
  }, [dataHostPic, picchangemonitor]);

  const componentsList = [
    {
      label: "Account",
      val: "Account",
    },
    {
      label: "AddressInput",
      val: "AddressInput",
    },
  ];

  return (
    <Suspense>
      <Routes>
        <Route path="/login" element={<LoginCompo />}></Route>
        <Route
          path="/forgot-password"
          element={<ForgotPasswordCompo />}
        ></Route>
        <Route path="/changepassword" element={<ChangePasswordCompo />}></Route>
        <Route path="/register" element={<RegisterCompo />} />
        <Route path="/pagenotfound" element={<PageNotFoundCompo />} />
        <Route
          path="/forms/forms-response/:id"
          element={<FormsResponseCompo />}
        />
      </Routes>
      <>
        {location.pathname != "/login" && 
          !location.pathname.includes("/forms/forms-response/")&&
          location.pathname != "/forgot-password" &&
          location.pathname != "/changepassword" &&
          location.pathname != "/pagenotfound" &&
          location.pathname != "/register" &&
          ((auth && (localStorage.getItem("userEmail") != null || 
            localStorage.getItem("userEmail") != "" || 
            localStorage.getItem("accessToken") != null || 
            localStorage.getItem("accessToken") != "")) || 
            !auth) && (
            <div className="flex-column flex-root">
              <div className="page d-flex flex-column flex-column-fluid">
                <div className="page d-flex flex-column-fluid align-items-stretch container-fluid px-0">
                  <div className="d-flex flex-column-fluid align-items-stretch container-fluid px-0">
                    <div className="aside ng-tns-c99-0" id="aside">
                      <div
                        onClick={props.handlerLogoClick}
                        id="raaghuLogo"
                        className="d-xxl-block d-xl-block d-lg-block d-md-block d-none"
                      >
                        <img
                          className="cursor-pointer sidenav-logo mx-1"
                          src={logoImage}
                          alt="logo"
                        ></img>
                      </div>

                      <div className="mt-6">
                        {auth && (<RdsCompSideNavigation
                          sideNavItems={getGrantedSideNavItems(sideNavItems)}
                          toggleTheme={props.toggleTheme}
                          toggleClass={toggleClass}
                        ></RdsCompSideNavigation>)}
                      </div>
                    </div>
                    <div
                      className="wrapper d-flex flex-column flex-row-fluid rds-scrollable-wrapper px-sm-0"
                      id="FixedHeaderOverFlow"
                    >
                      <div className="align-items-stretch position-sticky top-0 w-100 shadow-sm top-navigation-zindex">
                        {auth ? (
                          <RdsCompTopNavigation
                            ShowProfileSection={auth}
                            ProfileReplaceIconPath={"/assets/Download.svg"}
                            languageLabel={props.currLangLabel}
                            themeLabel="Theme"
                            profilePic={profilePic}
                            logo={logoImage}
                            breacrumItem={props.breacrumbItem}
                            languageIcon={props.currLanguageIcon}
                            languageItems={props.languageData}
                            componentsList={componentsList}
                            onClick={onClickHandler}
                            onClickThemeCheck={onClicktheme}
                            profileTitle={`${localStorage.getItem("userName")}`}
                            profileEmail={`${localStorage.getItem("userEmail")}`}
                            onLogout={props.logout}
                            themeItems={themeItems}
                            navbarTitle={t(props.currentTitle) || ""}
                            toggleItems={[]}
                            elementList={[]}
                            showUserName={true}
                            isImpersonation={props.isImpersonationButton}
                            backToMyAccount={props.backToMyAccount}
                            onForgotPassword={function (
                              _isForgotPasswordClicked?: boolean | undefined
                            ): void {
                              throw new Error("Function not implemented.");
                            }}
                            onProfileLinkTopNav={topNavigationProfileHandler}
                            chatsHandler={props.chatsHandler}
                            tenantName={profileName}
                            mobileViewLogoClick={mobileViewLogoClick}
                            onClickHamburger={onClickHamburger}
                            isLandingPage={false}
                            isChatPermission={true}
                          />
                        ) : (
                          <RdsCompTopNavigation
                            ShowProfileSection={auth}
                            ProfileReplaceIconPath={"/assets/Download.svg"}
                            languageLabel={props.currLangLabel}
                            themeLabel="Theme"
                            profilePic={profilePic}
                            logo={logoImage}
                            breacrumItem={props.breacrumbItem}
                            languageIcon={props.currLanguageIcon}
                            languageItems={props.languageData}
                            componentsList={componentsList}
                            onClick={onClickHandler}
                            onClickThemeCheck={onClicktheme}
                            profileTitle={`${localStorage.getItem("userName")}`}
                            profileEmail={`${localStorage.getItem("userEmail")}`}
                            onLogout={props.logout}
                            themeItems={themeItems}
                            navbarTitle={t(props.currentTitle) || ""}
                            toggleItems={[]}
                            elementList={[]}
                            showUserName={false}
                            isImpersonation={props.isImpersonationButton}
                            backToMyAccount={props.backToMyAccount}
                            onForgotPassword={function (
                              _isForgotPasswordClicked?: boolean | undefined
                            ): void {
                              throw new Error("Function not implemented.");
                            }}
                            onProfileLinkTopNav={topNavigationProfileHandler}
                            chatsHandler={props.chatsHandler}
                            tenantName={profileName}
                            mobileViewLogoClick={mobileViewLogoClick}
                            onClickHamburger={onClickHamburger}
                            isLandingPage={true}
                          />
                        )}
                      </div>
                      <div className={`layoutmargin mb-top-margin pb-xxl-0 pb-xl-0 pb-lg-0 pb-md-0 pb-5${window.location.pathname === '/' ? ' homeLayoutMargin' : ''}`}>
                        <MainRoutes isImpersonation={props.isImpersonation} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </>
    </Suspense>
  );
};

export default Main;
