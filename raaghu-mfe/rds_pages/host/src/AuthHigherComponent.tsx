/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as openApi from "../../../libs/proxy/core/OpenAPI";
import "./App.scss";
import {
  localizationService,
  sessionService,
  userConfigurationService,
  userImpersonationService,
} from "../../../../raaghu-react-core/src/index";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../libs/state-management/hooks";
import {
  invalidCredentialAction,
  callLoginAction,
  getProfilePictureHost,
  fetchConfiguration,
} from "../../../libs/state-management/public.api";
import { getFormsSettings } from "../../../libs/state-management/forms/forms-slice";
import { logoutRequest } from "../../../libs/public.api";
import {
  authCodeService,
  implicitTokenService,
} from "../../../../raaghu-react-core/src";
import { formsChildren, getLabelForPath } from "./data";
import Main from "./Main";
import sideNavItems from "./sideNav";

export interface MainProps {
  toggleTheme?: React.MouseEventHandler<HTMLInputElement>;
}

interface MenuItem {
  key: string;
  label: string;
  icon?: string;
  path?: string;
  subTitle?: string;
  permission?: string;
  iconPath?: string;
  width?: string;
  height?: string;
  children?: MenuItem[];
  id?: string;
}
const AuthHigherComponent = (props: MainProps) => {
  localStorage.setItem(
    "REACT_APP_API_URL",
    process.env.REACT_APP_API_URL || ""
  );
  const [afterLogOutPath, setAfterLogOutPath] = useState(
    `${localStorage.getItem("REACT_APP_GRANT_TYPE") == "password"
      ? "/login"
      : "/"
    }`
  );
  const [languageData, setLanguageData] = useState<any[]>([]);
  const [themes, setThemes] = useState("light");
  const [currLangLabel, setCurrLangLabel] = useState("");
  const [currLanguageIcon, setCurrLanguageIcon] = useState("");
  const [auth, setauth] = useState(false);
  const [request, setRequest] = useState(false);
  const isImpersonation = localStorage.getItem("isImpersonation") || "false";
  const UserId = localStorage.getItem("impersonatorUserId") || "";
  const [isImpersonationButton, setIsImpersonationButton] = useState(false);
  const currentPath = window.location.pathname;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const dataHost = useAppSelector(
    (state) => state.persistedReducer.host.callLogin
  );
  const currLanguage = useAppSelector(
    (state) => state.persistedReducer.host.currentLanguage || "en"
  );
  const currTheme = useAppSelector(
    (state) => state.persistedReducer.host?.theme || "light"
  );

  const RolesPermission = useAppSelector(
    (state) => state.persistedReducer?.permissions.isChangePermission || false
  );

  const authVerification = async () => {
    if (localStorage.getItem("REACT_APP_GRANT_TYPE") !== "authorization_code") {
      configLocalization();
    }
    let accessToken = localStorage.getItem("accessToken") || null;
    const loginAccessDate =
      localStorage.getItem("loginAccessDate") || Date.now();
    let expirationTime = localStorage.getItem("expiresIn") || "1";
    const refreshToken = localStorage.getItem("refreshToken") || "";
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    const userId = localStorage.getItem("userId") || null;
    const userName = localStorage.getItem("userName") || null;
    const userEmail = localStorage.getItem("userEmail") || null;
    const auth = localStorage.getItem("auth");
    const urlParams =
      localStorage.getItem("REACT_APP_GRANT_TYPE") === "authorization_code"
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams(window.location.href);

    const code = urlParams.get("code");
    const stateParam = urlParams.get("state");
    const loginAccessDateString =
      localStorage.getItem("loginAccessDate") || new Date().toString();

    const expiresInString =
      (localStorage.getItem("REACT_APP_GRANT_TYPE") !== "implicit"
        ? localStorage.getItem("expiresIn")
        : urlParams.get("expires_in")) || "0";

    const loginAccessDateAndTime: Date = new Date(loginAccessDateString);
    const expiresIn: number = parseInt(expiresInString);

    const currentTime: Date = new Date();

    const expirationFinalTime: Date = new Date(
      loginAccessDateAndTime.getTime() + expiresIn * 1000
    );
    let ReturnUrl;
    if (stateParam) {
      const parts = stateParam.split(";");
      ReturnUrl = parts[1];
    }
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessTokenImplicit =
      hashParams.get("access_token") ||
      localStorage.getItem("accessToken") ||
      "";
    const tokenTypeImplicit = hashParams.get("token_type") || "";
    const expiresInImplicit = hashParams.get("expires_in") || "";
    const refreshTokenImplicit = hashParams.get("refresh_token") || "";
    const storedState = localStorage.getItem("state") || "";
    const state = urlParams.get("state") || "";
    const estExpiryTime = parseInt(expirationTime) * 12000;
    const accesstokenexpired = Date.now() - new Date(loginAccessDate).getTime();

    if (
      accessTokenImplicit !== null &&
      accessTokenImplicit !== undefined &&
      !accessTokenImplicit &&
      accessTokenImplicit !== ""
    ) {
      localStorage.setItem("accessToken", accessTokenImplicit);
    }

    if (
      (expiresInImplicit !== null ||
        expiresInImplicit !== undefined ||
        !expiresInImplicit) &&
      localStorage.getItem("REACT_APP_GRANT_TYPE") !== "authorization_code"
    ) {
      localStorage.setItem("accessToken", accessTokenImplicit);
      if (!localStorage.getItem("expiresIn")) {
        localStorage.setItem("expiresIn", expiresInImplicit);
      }
      setauth(true);
      await configLocalization();
    }

    accessToken = localStorage.getItem("accessToken") || null;
    expirationTime = localStorage.getItem("expiresIn") || "1";

    if (
      accessToken &&
      expirationTime !== "1" &&
      userId !== "null" &&
      userName !== "null" &&
      userEmail !== "null"
    ) {
      if (auth && estExpiryTime > accesstokenexpired) {
        setauth(true);
        if (
          currentPath !== "/register" &&
          currentPath !== "/forgot-password" &&
          currentPath !== "/" &&
          currentPath !== "/changepassword" &&
          currentPath !== afterLogOutPath
        ) {
          navigate(currentPath);
        } else {
          document.title = "Home";

          navigate("/");
        }
      }

      const loginAccessDateString =
        localStorage.getItem("loginAccessDate") || new Date().toString();

      const expiresInString = localStorage.getItem("expiresIn") || "0";
      const loginAccessDate: Date = new Date(loginAccessDateString);
      const expiresIn: number = parseInt(expiresInString);
      const currentTime: Date = new Date();
      const timeRemaining = Math.floor(
        (currentTime.getTime() - loginAccessDate.getTime()) / 60000
      );
      const refreshTokenCallTime = expiresIn / 60 - timeRemaining;

      if (
        (localStorage.getItem("REACT_APP_GRANT_TYPE") == "password"
          ? rememberMe
          : true) &&
        refreshTokenCallTime < 10
      ) {
        try {
          const data = await tokenRefresh();
          localStorage.setItem("accessToken", data.access_token);
          localStorage.setItem("refreshToken", data.refresh_token);
          openApi.OpenAPI.TOKEN = data.access_token;
          localStorage.setItem("loginAccessDate", Date());
          localStorage.setItem("expiresIn", data.expires_in);
          localStorage.setItem("userId", data.currentUser.id);
          dispatch(getProfilePictureHost(data.currentUser.id) as any);

          if (
            currentPath !== "/register" &&
            currentPath !== "/forgot-password" &&
            currentPath !== "/" &&
            currentPath !== "/changepassword" &&
            currentPath !== afterLogOutPath
          ) {
            navigate(currentPath);
          } else {
            document.title = "Home";

            navigate("/");
          }
          return;
        } catch (error) {
          console.error(error);
        }
      } else if (estExpiryTime < accesstokenexpired) {
        removeLocalStorage();
        navigate(afterLogOutPath);
        return;
      }
    } else if (code) {
      try {
        const res = await sessionService(
          process.env.REACT_APP_URL || "",
          localStorage.getItem("REACT_APP_GRANT_TYPE") || "",
          undefined,
          undefined,
          localStorage.getItem("REACT_APP_CLIENT_ID") || "",
          undefined,
          code,
          localStorage.getItem("REACT_APP_URL") || "",
          localStorage.getItem("codeVerifier") || ""
        );

        if (res.access_token) {
          setauth(true);
          dispatch(invalidCredentialAction({ invalid: false, message: "" }));
          localStorage.setItem("auth", JSON.stringify(true));
          localStorage.setItem("accessToken", res.access_token);
          localStorage.setItem("refreshToken", res.refresh_token);

          localStorage.setItem("expiresIn", res.expires_in);
          localStorage.setItem("loginAccessDate", Date());
          document.title = "Home";
          setCurrentTitle("Home");

          configLocalization();

          if (localStorage.getItem("accessToken")) {
            if (ReturnUrl != "/") {
              navigate(`${ReturnUrl}`);
            } else {
              navigate("/");
            }
          }
          return;
        }
      } catch (error) {
        dispatch(
          invalidCredentialAction({
            invalid: true,
            message: "",
          })
        );
      }
    }

    // Handle the case when none of the conditions above are met
    else if (currentTime > expirationFinalTime) {
      removeLocalStorage();
      if (afterLogOutPath == "/") {
        if (
          (localStorage.getItem("accessToken") == "" ||
            localStorage.getItem("accessToken") == null) &&
          currentPath != "/"
        ) {
          if (currentPath != "/pagenotfound") {
            if (
              localStorage.getItem("REACT_APP_GRANT_TYPE") ==
              "authorization_code" &&
              !request
            ) {
              if (location.pathname !== "/pagenotfound") {
                setRequest(true);
                authCodeService(
                  "code", // response_Type
                  localStorage.getItem("REACT_APP_CLIENT_ID") || "", // client_Id
                  localStorage.getItem("REACT_APP_URL") || "", // redirect_Url
                  localStorage.getItem("REACT_APP_SCOPE") || "", //scope
                  `${currentPath}`
                )
                  .then((res: any) => {
                    if (res.status === 200) {
                      localStorage.setItem("accessToken", "");

                      window.location.href = res.url;
                    }
                  })
                  .catch((error: any) => {
                    setRequest(false);
                    console.log(error);
                  });
              }
            } else if (
              localStorage.getItem("REACT_APP_GRANT_TYPE") == "implicit" &&
              !request
            ) {
              setRequest(true);
              implicitTokenService(
                "token", // response_Type
                localStorage.getItem("REACT_APP_CLIENT_ID") || "", // client_Id
                localStorage.getItem("REACT_APP_URL") || "", // redirect_Url
                localStorage.getItem("REACT_APP_SCOPE") || "",
                `${currentPath}`
              )
                .then((res: any) => {
                  if (res.status === 200) {
                    localStorage.setItem("accessToken", "");
                    window.location.href = res.url;
                  }
                })
                .catch((error: any) => {
                  setRequest(false);
                  console.log(error);
                });
            } else if (
              localStorage.getItem("REACT_APP_GRANT_TYPE") == "hybrid" &&
              !request
            ) {
              setRequest(true);
              authCodeService(
                "code id_token token", // response_Type
                localStorage.getItem("REACT_APP_CLIENT_ID") || "", // client_Id
                localStorage.getItem("REACT_APP_URL") || "", // redirect_Url
                localStorage.getItem("REACT_APP_SCOPE") || "",
                `${currentPath}`
              )
                .then((res: any) => {
                  if (res.status === 200) {
                    localStorage.setItem("accessToken", "");
                    window.location.href = res.url;
                  }
                })
                .catch((error: any) => {
                  setRequest(false);
                  console.log(error);
                });
            }

            navigate("/pagenotfound");
          } else {
          }
        } else {
          navigate("/");
        }
      } else {
        if ("/register") {
          navigate("/register");
        } else if ("/forgot-password") {
          navigate("/forgot-password");
        } else if ("/changepassword") {
          navigate("/changepassword");
        } else {
          navigate("/login");
        }
      }
    }
  };

  async function tokenRefresh() {
    const url = process.env.REACT_APP_URL + "/connect/token";
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("client_id", "raaghu");
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      params.append("refresh_token", refreshToken);
    }
    const token = localStorage.getItem("accessToken");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: params,
    });
    const data = await response.json();
    return data;
  }

  //Remember me
  const { t, i18n } = useTranslation();
  const MainMenuWithFormsChildren = sideNavItems.map((menuItem: any) => {
    if (menuItem.key === "5") {
      // Check if the key matches the "Forms" menu item
      return {
        ...menuItem,
        children: [...(menuItem.children || []), ...formsChildren],
      };
    }
    return menuItem;
  });

  function findBreadcrumb(
    menuArray: MenuItem[],
    currentPath: string,
    i18n: any
  ): MenuItem[] {
    for (const menuItem of menuArray) {
      if (menuItem.path === currentPath) {
        return [menuItem];
      } else if (menuItem.children) {
        const subBreadcrumb: MenuItem[] = findBreadcrumb(
          menuItem.children,
          currentPath,
          i18n
        );
        if (subBreadcrumb.length > 0) {
          return [menuItem, ...subBreadcrumb];
        }
      }
    }
    return [];
  }

  function showBreadCrumb(currentPath: string, i18n: any) {
    const menus: MenuItem[] = MainMenuWithFormsChildren;
    let breadcrumbData: MenuItem[] = [];
    i18n.changeLanguage(currLanguage);
    if (currentPath === "/") {
      const homeLabel = i18n.t("Home");
      breadcrumbData = [
        {
          key: "Home",
          label: homeLabel,
        },
      ];
      setCurrentTitle(homeLabel);
      document.title = homeLabel;

      setBreadCrumbItem(breadcrumbData);
      return;
    }
    if (currentPath.includes("/forms/forms-view")) {
      const breadcrumbforForms = [
        {
          height: "30px",
          icon: "",
          iconPath: "./assets/lottie-files/outlined/dual-color/forms.json",
          key: "5",
          label: "Forms.Menu:Forms",
          path: "/forms",
          permission: "Forms.Form",
          subTitle: "Forms",
          width: "30px",
          children: [
            {
              key: "5-0",
              label: "View",
              path: "/forms-view/:id",
              permission: "Forms.Form",
            },
          ],
        },
        {
          key: "5-0",
          label: "View",
          path: "/forms-view/:id",
          permission: "Forms.Form",
        }
      ]
      let finalFormsBreadcrumb: any;
      if (breadcrumbforForms && breadcrumbforForms.length) {
        finalFormsBreadcrumb = breadcrumbforForms.map((res) => ({
          ...res,
          label: res.label,
          icon: "",
        }))
      };
      const lastBreadcrumbLabel = i18n.t(
        finalFormsBreadcrumb[finalFormsBreadcrumb.length - 1].label
      );
      setCurrentTitle(lastBreadcrumbLabel);
      document.title = lastBreadcrumbLabel;
      setBreadCrumbItem(finalFormsBreadcrumb);
    } else {
      breadcrumbData = findBreadcrumb(menus, currentPath, i18n);
      if (breadcrumbData.length === 0) {
        breadcrumbData = handleSpecialPaths(currentPath, i18n);
      }
      if (breadcrumbData && breadcrumbData.length) {
        breadcrumbData = breadcrumbData.map((res) => ({
          ...res,
          label: res.label,
          icon: "",
        }));
        const lastBreadcrumbLabel = i18n.t(
          breadcrumbData[breadcrumbData.length - 1].label
        );
        setCurrentTitle(lastBreadcrumbLabel);
        document.title = lastBreadcrumbLabel;
        setBreadCrumbItem(breadcrumbData);
      }
    }


  }

  function handleSpecialPaths(currentPath: string, i18n: any): MenuItem[] {
    if (currentPath === "/security-Logs") {
      document.title = "Security Logs";
      const navtitl = i18n.t("AbpAccount.MySecurityLogs");
      setCurrentTitle(navtitl);
      return [
        {
          key: "special-security-Logs",
          label: navtitl,
          path: "/security-Logs",
          icon: "",
        },
      ];
    } else if (currentPath === "/my-account") {
      document.title = "My Account";
      const navtitl = i18n.t("AbpAccount.MyAccount");
      setCurrentTitle(navtitl);
      return [
        {
          key: "special-my-account",
          label: navtitl,
          path: "/my-account",
          icon: "",
        },
      ];
    } else if (currentPath === "/personal-data") {
      document.title = "Personal Data";
      const navtitl = i18n.t("AbpGdpr.PersonalData");
      setCurrentTitle(navtitl);
      return [
        {
          key: "special-personal-data",
          label: navtitl,
          path: "/personal-data",
          icon: "",
        },
      ];
    } else if (currentPath === "/forms/forms-view/new-form") {
      document.title = "New Form";
      const navtitl = i18n.t("New Form");
      setCurrentTitle(navtitl);
      return [
        {
          key: "new-from",
          label: navtitl,
          path: "/forms/forms-view/new-form",
          icon: "",
        },
      ];
    } else if (currentPath === "/forms-view/:id") {
      document.title = "View Form";
      const navtitl = i18n.t("View Form");
      setCurrentTitle(navtitl);
      return [
        {
          key: "new-from",
          label: navtitl,
          path: "/forms-view/:id",
          icon: "",
        },
      ];
    }
    else if (currentPath === "/chats") {
      document.title = "Chats"
      const navtitl = i18n.t("Chats");
      setCurrentTitle(navtitl);
    }

    return [];
  }

  const removeLocalStorage = async () => {
    localStorage.setItem("accessToken", "");
    localStorage.removeItem("auth");
    localStorage.setItem("userId", "");
    localStorage.setItem("__tenant", "");
    localStorage.setItem("refreshToken", "");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("loginAccessDate");
    localStorage.removeItem("rememberMe");
    localStorage.removeItem("codeChallenge");
    localStorage.removeItem("codeVerifier");
    localStorage.setItem("userEmail", "");
    localStorage.setItem("name", "");
    localStorage.setItem("userName", "");
    localStorage.setItem("refreshToken", "");
    setauth(false);
  };

  const configLocalization = async () => {
    try {
      const result = await dispatch(fetchConfiguration(currLanguage) as any);

      if (result.type === "configuration/fetchConfiguration/fulfilled") {
        const res = result.payload;

        showBreadCrumb(currentPath, i18n);
        if (res.currentTenant.name) {
          localStorage.setItem("name", res.currentTenant.name);
        } else {
          localStorage.setItem("name", res.currentUser.name);
        }
        // const urlParams = new URLSearchParams(window.location.href);
        localStorage.setItem("userEmail", res.currentUser.email);

        const urlParams =
          localStorage.getItem("REACT_APP_GRANT_TYPE") === "authorization_code"
            ? new URLSearchParams(window.location.search)
            : new URLSearchParams(window.location.href);

        if (
          localStorage.getItem("REACT_APP_GRANT_TYPE") !== "implicit" &&
          !res.currentUser.isAuthenticated &&
          !urlParams.has("code") &&
          location.pathname !== "/register" &&
          location.pathname !== "/forgot-password" &&
          !localStorage.getItem("accessToken")
        ) {
          navigate("/");
        } else {
          if (res.currentUser.isAuthenticated) {
            setauth(true);
          }
          else {
            navigate("/");
          }
        }

        localStorage.setItem("userId", res.currentUser.id);
        await dispatch(getProfilePictureHost(res.currentUser.id) as any);
        if (currLanguage === "ar") {
          document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
        } else {
          document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
        }
        localStorage.setItem(
          "cultureListFromConfiguration",
          JSON.stringify(res.localization?.languages)
        );

        const tempdata: any[] = await Promise.all(
          res.localization?.languages?.map(async (item: any) => {
            return {
              label: item.displayName,
              val: item.cultureName,
              icon:
                item.flagIcon !== null && item.flagIcon !== "gb"
                  ? item.flagIcon
                  : item.uiCultureName === "en-GB"
                    ? "gb"
                    : item.uiCultureName === "zh-Hans" ||
                      item.uiCultureName === "zh-Hant"
                      ? "zh"
                      : item.uiCultureName === "pt-BR"
                        ? "pt"
                        : item.uiCultureName,
              iconWidth: "20px",
              iconHeight: "20px",
            };
          })
        );

        const index = tempdata.findIndex(
          (item: any) => item.val === currLanguage
        );
        setCurrLangLabel(tempdata[index]?.val.toUpperCase());
        setCurrLanguageIcon(tempdata[index]?.icon);
        setLanguageData(tempdata);

        const resp = await localizationService(
          res.localization.currentCulture.cultureName
        );

        let data2 = {};

        const localJsonData = require("../src/assets/i18n/" +
          currLanguage +
          ".json");

        const translation = resp?.resources;

        if (translation) {
          Object.keys(translation).forEach((key) => {
            Object.keys(translation[key].texts).map((k1) => {
              const k2 = key + "." + k1;
              const value1 = translation[key].texts[k1];
              data2 = { ...data2, [k2]: value1 };
            });
          });

          const resourceJsonData = Object.assign({}, data2, localJsonData);

          i18n.addResourceBundle(
            currLanguage,
            "translation",
            resourceJsonData,
            true,
            true
          );

          i18n.changeLanguage(currLanguage);
        }
      }
    } catch (error) {
      // Handle errors here
      console.error("Error in configLocalization:", error);
    }
  };

  // OnClickHandler for side nav to reflect title and subtitle

  const displayName = getLabelForPath(currentPath, sideNavItems);
  const [currentTitle, setCurrentTitle] = useState(displayName);
  const [breacrumbItem, setBreadCrumbItem] = useState<any[]>([]);

  const logout = () => {
    let selectedTheme = localStorage.getItem("theme");
    localStorage.setItem("theme", selectedTheme!);
    dispatch(logoutRequest() as any).then(() => {
      // Clear user-related data and perform the logout
      removeLocalStorage();
      if (localStorage.getItem("abpSession")) {
        localStorage.setItem("isImpersonation", "false");
        localStorage.removeItem("abpSession");
      }
      setBreadCrumbItem([{ label: "Home", path: "/" }]);
      document.title = "Home";
      navigate(afterLogOutPath);
    });

    localStorage.setItem(
      "REACT_APP_API_URL",
      process.env.REACT_APP_API_URL || ""
    );
  };

  document.documentElement.setAttribute("theme", themes);

  const handlerLogoClick = () => {
    document.title = "Home";

    navigate("/");
    setCurrentTitle("Home");
  };

  function chatsHandler() {
    document.title = "Chats";
    navigate("/chats");
    setCurrentTitle("Chats");
    setBreadCrumbItem([]);
  }

  function backToMyAccount() {
    userImpersonationService(
      "Impersonation",
      localStorage.getItem("REACT_APP_CLIENT_ID") || "",
      localStorage.getItem("REACT_APP_SCOPE") || "",
      UserId
    ).then(async (res: any) => {
      if (res.access_token) {
        localStorage.setItem("accessToken", res.access_token);
        localStorage.setItem("refreshToken", res.refresh_token);
        localStorage.setItem("expiresIn", res.expires_in);
        localStorage.setItem("loginAccessDate", Date());
        localStorage.setItem("auth", JSON.stringify(true));
        await userConfigurationService().then(async (res: any) => {
          if (res.currentUser.impersonatorUserId != null) {
            localStorage.setItem("isImpersonatorUserId", "true");
            localStorage.setItem(
              "impersonatorUserId",
              res.currentUser.impersonatorUserId
            );
          }
          return res;
        });
        localStorage.setItem("isImpersonation", "false");
        localStorage.removeItem("abpSession");
        localStorage.removeItem("name");
        window.location.href = "/";
        setCurrentTitle("Home");
        setBreadCrumbItem([]);
      }
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = configLocalization();
      console.log("this is response!!", res);
    };
    fetchData();
    authVerification();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      configLocalization();
      if (location.pathname.startsWith("/forms/forms-response/")) {
        const id = location.pathname.substring(
          location.pathname.lastIndexOf("/") + 1
        );
        if (id) {
          handleVerification(id);
        }
      } else if (
        location.pathname !== afterLogOutPath &&
        location.pathname !== "/" &&
        location.pathname !== "/register" &&
        location.pathname !== "/forgot-password" &&
        location.pathname !== "/pagenotfound"
      ) {
        if (!request) {
          authVerification();
        }
      }
    };

    fetchData();
  }, [window.location.pathname, currLanguage, RolesPermission]);

  const handleVerification = async (id: any) => {
    if (id) {
      try {
        const res: any = await dispatch(getFormsSettings(id));
        if (res?.payload?.requiresLogin) {
          authVerification();
        } else {
          navigate(location.pathname);
        }
      } catch (error) {
        // Handle any errors that might occur during dispatch or authentication verification
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    if (isImpersonation == "true") {
      setIsImpersonationButton(true);
    }
    if (location.pathname.startsWith("/forms/forms-response/")) {
      const id = location.pathname.substring(
        location.pathname.lastIndexOf("/") + 1
      );
      if (id) {
        handleVerification(id);
      }
    } else {
      const fetchData = async () => {
        configLocalization();
        authVerification();
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    setThemes(currTheme);
    localStorage.setItem("theme", currTheme);
  }, [currTheme]);

  useEffect(() => {
    configLocalization();
    if (location.pathname == "/chats") {
      document.title = "Chats";
      const navtitl = t("Chats") || "";
      setCurrentTitle(navtitl);
    }
    showBreadCrumb(currentPath, i18n);
  }, [location.pathname, currLanguage]);

  useEffect(() => {
    localStorage.setItem(
      "REACT_APP_API_URL",
      process.env.REACT_APP_API_URL || ""
    );
    localStorage.setItem(
      "REACT_APP_GRANT_TYPE",
      process.env.REACT_APP_GRANT_TYPE || ""
    );
    localStorage.setItem(
      "REACT_APP_CLIENT_ID",
      process.env.REACT_APP_CLIENT_ID || ""
    );
    localStorage.setItem("REACT_APP_SCOPE", process.env.REACT_APP_SCOPE || "");
    localStorage.setItem("REACT_APP_URL", process.env.REACT_APP_URL || "");
    if (dataHost && dataHost.email != "" && dataHost.password != "") {
      localStorage.setItem("datahostEmail", dataHost.email);
      sessionService(
        process.env.REACT_APP_URL || "",
        localStorage.getItem("REACT_APP_GRANT_TYPE") || "",
        dataHost.email,
        dataHost.password,
        localStorage.getItem("REACT_APP_CLIENT_ID") || "",
        localStorage.getItem("REACT_APP_SCOPE") || "",
        undefined,
        undefined,
        undefined
      )
        .then(async (res: any) => {
          if (res.access_token) {
            dispatch(invalidCredentialAction({ invalid: false, message: "" }));
            localStorage.setItem("auth", JSON.stringify(true));
            localStorage.setItem("accessToken", res.access_token);
            localStorage.setItem("refreshToken", res.refresh_token);
            localStorage.setItem("expiresIn", res.expires_in);
            localStorage.setItem("loginAccessDate", Date());

            configLocalization();
            navigate("/");
            document.title = "Home";
            setCurrentTitle("Home");
          }
        })
        .catch((_error: any) => {
          dispatch(
            invalidCredentialAction({
              invalid: true,
              //message: error.response.data.error_description,
              message: "",
            })
          );
        });
      dispatch(callLoginAction(null) as any);
    }
  }, [dataHost]);

  return (
    <>
      <Main
        auth={auth}
        handlerLogoClick={handlerLogoClick}
        chatsHandler={chatsHandler}
        backToMyAccount={backToMyAccount}
        logout={logout}
        isImpersonation={isImpersonation}
        isImpersonationButton={isImpersonationButton}
        currentTitle={currentTitle}
        languageData={languageData}
        currLanguageIcon={currLanguageIcon}
        breacrumbItem={breacrumbItem}
        currLangLabel={currLangLabel}
      />
    </>
  );
};
export default AuthHigherComponent;
