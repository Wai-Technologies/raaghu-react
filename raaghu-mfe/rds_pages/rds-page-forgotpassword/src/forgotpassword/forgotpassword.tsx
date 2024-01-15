import React, { useEffect, useState } from "react";
// To view for separetly forgot-password page please uncomment the below link
import {
    RootState,
    AppDispatch,
    changeLanguageAction,
    shouldSendPasswordResetCode,
} from "../../../../libs/public.api";
import { useSelector } from "react-redux";
import { RdsCompForgotPassword } from "../../../rds-components";
import { useTranslation } from "react-i18next";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../libs/state-management/hooks";
import { useNavigate } from "react-router-dom";
import { configurationService, localizationService, } from "../../../../../raaghu-react-core/src/index";
import { RdsLabel } from "../../../../../raaghu-elements/src";

export interface ForgotPasswordProps { }

const ForgotPassword = (props: ForgotPasswordProps) => {
    const navigate = useNavigate();
    const [_currentLanguage, _setCurrentLanguage] = useState(localStorage.getItem("currentLang") || "en");
    const [_currentLanguageIcon, setCurrentLanguageIcon] = useState("en");
    const [_currentLanguageLabel, setCurrentLanguageLabel] = useState("English");
    const [languageData, setLanguageData] = useState<any[]>([]);
    const forgotPasswordHandler = async (email?: string) => {
    };
    const dispatch = useAppDispatch() as any;
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const loginData = useAppSelector((state) => state.persistedReducer.host);
    const currLanguage = useAppSelector((state) => state.persistedReducer.host.currentLanguage)
    const resendHandler: any = (isForgotPasswordClicked: boolean) => {
        navigate("/forgot-password");
    };

    const onLoginHandler: any = (isLoginClicked: boolean) => {
        navigate("/");
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
            setCurrentLanguageLabel(tempdata[index]?.label);
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
                            </div>
                            <RdsCompForgotPassword languageLabel={_currentLanguageLabel} languageData={languageData} onForgotPassword={forgotPasswordHandler} onResend={resendHandler} onLogin={onLoginHandler} onClickHandler={onClickHandler} ></RdsCompForgotPassword>
                            <div className="d-flex justify-content-center pt-2 pt-lg-3 pt-xl-3 pt-xxl-3">
                                <RdsLabel
                                    class="bottom-0 position-lg-relative position-absolute pt-xxl-0 pt-xl-0 pt-lg-4 pt-md-4 pt-4 mb-4"
                                    label="©2023 WAi Technologies. All rights reserved"
                                    size="0.7rem"></RdsLabel>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-12 order-1 h-100 order-sm-2 rounded-end position-relative align-items-center p-0 login-card-height d-xxl-block d-xl-block d-lg-none d-none"
                        style={{ backgroundImage: "url(../assets/bg_1.png)", backgroundSize: "cover", backgroundPosition: "bottom", backgroundRepeat: "no-repeat", backgroundColor: "#000;" }}>
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

    );
};

export default ForgotPassword;
