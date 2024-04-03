import React, { useEffect, useState } from "react";
import RdsCompRegister from "../../../../../raaghu-components/src/rds-comp-register";
import { useAppDispatch, useAppSelector } from "../../../../libs/state-management/hooks";
import { registerData } from "../../../../libs/state-management/register/register-slice";
import { useNavigate } from "react-router-dom";
import {
    callLoginAction,
    changeLanguageAction,
} from "../../../../libs/public.api";

const Register = (props: any) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loginHandler: any = (isLoginClicked: boolean) => {
        navigate("/login");
    };
    const [_currentLanguage, _setCurrentLanguage] = useState(localStorage.getItem("currentLang") || "en");
    const [_currentLanguageIcon, setCurrentLanguageIcon] = useState("en");
    const [_currentLanguageLabel, setCurrentLanguageLabel] = useState("English");
    const [languageData, setLanguageData] = useState<any[]>([]);

    useEffect(() => {
        dispatch(registerData(null) as any);
    }, []);


    const registerHandler = (emailAddress: any, password: any, userName: any, appName: any, returnUrl?: string) => {
        dispatch(registerData({ emailAddress, password, userName, appName, returnUrl }) as any).then((res: any) => {
        });
    };
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
                                    <div className="login-border-bottom mb-4 pb-1 mt-3 raaghu-logo">
                                        <div className="text-center">
                                            <img src="./assets/raaghu_text_logo.svg" height={"68px"} width={"161px"}></img>
                                        </div>
                                    </div>
                                    <RdsCompRegister
                                        getvalidTenantName={""}
                                        emailAddress={""} password={""}
                                        userName={""}
                                        onLogin={loginHandler}
                                        onRegister={registerHandler}
                                        currentTenant={undefined}
                                        validTenant={undefined} appName={""} languageData={languageData}
                                        languageLabel={_currentLanguageLabel}
                                        onClickHandler={onClickHandler}                               ></RdsCompRegister>

                                </div>
                            </div>
                            <div
                                className="col-xxl-6 col-xl-6 col-12 order-1 h-100 order-sm-2 rounded-end position-relative align-items-center p-0 login-card-height d-xxl-block d-xl-block d-lg-none d-none"
                                style={{
                                    backgroundImage: "url(../assets/bg_1.png)",
                                    backgroundSize: "cover",
                                    backgroundPosition: "bottom",
                                    backgroundRepeat: "no-repeat",
                                    backgroundColor: "#000;",
                                }}
                            >
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
export default Register;
