import React, { useEffect, useState } from "react";
import { RdsCompLogin } from "../../../rds-components";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../libs/state-management/hooks";
import {
    configurationService, localizationService, validateTenantByName, authCodeService
} from "../../../../../raaghu-react-core/src/index"
import {
    callLoginAction,
    changeLanguageAction,
    invalidCredentialAction,
} from "../../../../libs/public.api";
import { useTranslation } from "react-i18next";
import { RdsLabel } from "../../../rds-elements";
import { useNavigate } from "react-router-dom";
export interface LoginProps {
    onForgotPassword: (isForgotPasswordClicked?: boolean) => void;
}

const Login = (_props: LoginProps) => {
    const navigate = useNavigate();
    const [_currentLanguage, _setCurrentLanguage] = useState(localStorage.getItem("currentLang") || "en");
    const [_currentLanguageIcon, setCurrentLanguageIcon] = useState("en");
    const [_currentLanguageLabel, setCurrentLanguageLabel] = useState("English");
    const [languageData, setLanguageData] = useState<any[]>([]);
    const [Alert, setAlert] = useState({
        show: false,
        message: "",
        color: "",
    });
    const [showAlert, setShowAlert] = useState(false);
    const dispatch = useAppDispatch() as any;
    const { i18n } = useTranslation();
    const loginData = useAppSelector((state) => state.persistedReducer.host);
    const currLanguage = useAppSelector((state) => state.persistedReducer.host?.currentLanguage)

    useEffect(() => {
        if (loginData?.invalidCredential?.invalid == true) {
            setAlert({
                ...Alert,
                message: loginData.invalidCredential?.message || "  Invalid user name or password ",
                show: loginData.invalidCredential?.invalid,
                color: "danger"
            });
        }

    }, [loginData?.invalidCredential]);


    useEffect(() => {
        if (localStorage.getItem("expiresIn") == "") {
            console.log(Alert)
            setAlert({
                ...Alert,
                message: "Session timeout! Please login again",
                show: true,
                color: "danger"
            })
            localStorage.removeItem("expiresIn")
        }
    }, [])

    useEffect(() => {
        dispatch(callLoginAction(null) as any);
        dispatch(invalidCredentialAction({ invalid: false, message: "" }) as any);
    }, []);

    useEffect(() => {
        // Set a 2-second timer to update the state
        const timer = setTimeout(() => {
            setAlert({ ...Alert, show: false });
        }, 4000);

        // Clean up the timer when the component unmounts or when the state changes
        return () => clearTimeout(timer);
    }, [showAlert])

    function loginHandler(email: any, password: any, rememberMe: boolean) {
        authCodeService("code",                               // response_Type
            localStorage.getItem("REACT_APP_CLIENT_ID") || "",    // client_Id
            localStorage.getItem("REACT_APP_URL") + "/dashboard",             // redirect_Url
            localStorage.getItem("REACT_APP_SCOPE") || "",
            "/").then((res: any) => {
                if (res.status === 200) {
                    window.location.href = res.url;
                }
            }).catch((error: any) => {
                console.log(error)
            })

        if (rememberMe) {
            localStorage.setItem("rememberMe", "true");
        } else {
            localStorage.setItem("rememberMe", "false");
        }
    }

    const [validateTenantName, setValidateTenantName] = useState("AbpUiMultiTenancy.NotSelected");
    function validateTenant(data: any) {
        if (data) {
            validateTenantByName(data).then((res: any) => {
                console.log(res.tenantId);
                if (res.isActive) {
                    setValidateTenantName(data);
                    localStorage.setItem("__tenant", res.tenantId);
                    setAlert({
                        ...Alert,
                        message: "switched to Tenant",
                        show: true,
                        color: "success",
                    });
                    setShowAlert((prev) => !prev)
                } else {
                    setValidateTenantName("AbpUiMultiTenancy.NotSelected");
                    localStorage.setItem("__tenant", "");
                    setAlert({
                        ...Alert,
                        message: "Error: Switched back to Admin",
                        show: true,
                        color: "danger",
                    });
                    setShowAlert((prev) => !prev)
                }
            }
            ).catch((err: any) => {
                setValidateTenantName("AbpUiMultiTenancy.NotSelected");
                sessionStorage.setItem("__tenant", "");
                setAlert({
                    ...Alert,
                    message: "Error: Switched back to Admin",
                    show: true,
                    color: "danger",
                });
                setShowAlert((prev) => !prev)
            });
        } else {
            setValidateTenantName("AbpUiMultiTenancy.NotSelected");
            localStorage.setItem("__tenant", "");
            setAlert({
                ...Alert,
                message: "Switched back to Admin",
                show: true,
                color: "success",
            });
            setShowAlert((prev) => !prev)
        }
    }
    const forgotPasswordHandler: any = (isForgotPasswordClicked: boolean) => {
        navigate("/forgot-password");
    };
    const registerHandler: any = (isRegisterClicked: boolean) => {
        navigate("/register");
    };
    const { t } = useTranslation();
    const handlerDismissAlert = () => {
        dispatch(
            invalidCredentialAction({
                invalid: false,
                message: "",
            }) as any
        );
    };
    const emailHandler = () => {
        handlerDismissAlert();
    };
    const passwordHandler = () => {
        handlerDismissAlert();
    };

    const configLocalization = () => {
        configurationService(currLanguage).then(async (res: any) => {
            if (currLanguage == "ar") {
                document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
            }
            else {
                document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
            }
            localStorage.setItem("cultureListFromConfiguration", JSON.stringify(res.localization?.languages));
            const tempdata: any[] = await res.localization?.languages?.map(
                (item: any) => {
                    return {
                        label: item.displayName,
                        val: item.cultureName,
                        icon:
                            item.flagIcon !== null && item.flagIcon !== "gb"
                                ? item.flagIcon
                                : (item.uiCultureName == "en-GB" ? "gb" : (item.uiCultureName == "zh-Hans" || item.uiCultureName == "zh-Hant" ? "zh" : (item.uiCultureName === "pt-BR" ? "pt" : item.uiCultureName))),
                        iconWidth: "20px",
                        iconHeight: "20px",
                    };
                }
            );

            const index = tempdata.findIndex((item: any) => item.val === currLanguage);
            setCurrentLanguageLabel(tempdata[index]?.val.toUpperCase());
            setCurrentLanguageIcon(tempdata[index]?.icon);
            setLanguageData(tempdata);

            localizationService(res.localization.currentCulture.cultureName).then((resp: any) => {
                let data2 = {};
                const translation = resp?.resources;
                if (translation) {
                    Object.keys(translation).forEach((key) => {
                        Object.keys(translation[key].texts).map((k1) => {
                            const k2 = key + "." + k1;
                            const value1 = translation[key].texts[k1];
                            data2 = { ...data2, [k2]: value1 };
                        });
                    });
                    i18n.changeLanguage(currLanguage);
                }
            });
        });
    };
    useEffect(() => {
        configLocalization();
    }, [currLanguage]);


    const onClickHandler = (e: any, val: any) => {
        dispatch(changeLanguageAction(val) as any);
    };

    return (
        <>
            <div>
                <div className="align-items-center d-flex justify-content-center m-auto login vh-100">
                    <div className="container-fluid">
                        <div className="bg-login align-items-center h-100 row rounded-3 overflow-x-hidden thin-scroll overflow-y-scroll">
                            <div className="col-xxl-6 col-xl-6 col-lg-12 col-12">
                                <div className="mx-auto pb-3 pt-3 px-3 px-lg-5 px-md-5 px-xl-5 px-xxl-5 rounded-4 shadow-md-lg w-75 w-xs-100">
                                    <div>
                                        <div className="login-border-bottom mb-4 pb-1 raaghu-logo">
                                            <div className="text-center">
                                                <img src="./assets/raaghu_text_logo.svg" height={"68px"} width={"161px"}></img>
                                            </div>
                                        </div>
                                        <RdsCompLogin
                                            email={"" || loginData?.callLogin?.email}
                                            password={"" || loginData?.callLogin?.password}
                                            onLogin={loginHandler}
                                            onEmailChange={emailHandler}
                                            onPasswordChange={passwordHandler}
                                            error={Alert}
                                            onDismissAlert={handlerDismissAlert}
                                            onForgotPassword={forgotPasswordHandler}
                                            validTenant={validateTenant}
                                            getvalidTenantName={validateTenantName}
                                            currentTenant={""}
                                            onRegister={registerHandler}
                                            languageData={languageData}
                                            languageLabel={_currentLanguageLabel}
                                            onClickHandler={onClickHandler} />
                                        <div className="d-flex justify-content-center pt-2 pt-lg-3 pt-xl-3 pt-xxl-3">
                                            <RdsLabel
                                                class="bottom-0 position-lg-relative position-absolute pt-xxl-0 pt-xl-0 pt-lg-4 pt-md-4 pt-4 mb-4"
                                                label="©2023 WAi Technologies. All rights reserved"
                                                size="0.7rem"></RdsLabel>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xxl-6 col-xl-6 col-12 order-1 h-100 order-sm-2 rounded-end position-relative align-items-center p-0 login-card-height d-xxl-block d-xl-block d-lg-none d-none"
                                style={{
                                    backgroundImage: "url(../assets/bg_1.png)",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundColor: "#000;",
                                }}>
                                <video id="myVideo" className="video" autoPlay muted loop>
                                    <source src="../assets/Comp1.mp4" type="video/mp4" />
                                </video>
                                <div className="raghu1">
                                    <img src="../assets/fg_raaghu.png"></img>
                                </div>
                                <div className="wrap">
                                    <div className="c"></div>
                                    <div className="c"></div>
                                    <div className="c"></div>
                                    <div className="c"></div>
                                    <div className="c"></div>
                                    <div className="c"></div>
                                    <div className="c"></div>
                                    <div className="c"></div>
                                    <div className="c"></div>
                                    <div className="c"></div>
                                    <div className="c"></div>
                                    <div className="c"></div>
                                    <div className="c"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
