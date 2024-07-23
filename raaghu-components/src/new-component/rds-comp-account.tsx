import React, { useEffect, useState } from "react";
import {
    RdsButton,
    RdsCheckbox,
    RdsInput,
    RdsLabel,
    RdsSelectList,
    RdsNavtabs
} from "../../../samplesolution-elements/src";
import { useTranslation } from "react-i18next";

export interface RdsCompAccountProps {
    accountGeneralSettings: any;
    accountTwoFactorSettings: any;
    accountCaptchaSettings: any;
    developerModeSettings?: any;
    onSubmit: any;
    onShow?: (data: any) => void;
    onShowDeveloperMode?: (name: any, value: any) => void;
}
const RdsCompAccount = (props: RdsCompAccountProps) => {
    const [activeNavTabId, setActiveNavTabId] = useState("0");

    const [accountGeneralData, setAccountGeneralData] = useState<any>(
        props.accountGeneralSettings
    );
    const [developerModeData, setDeveloperModeData] = useState<any>(
        props.developerModeSettings
    );
    const [twoFactorData, settwoFactorData] = useState(
        props.accountTwoFactorSettings
    );
    const [accountCaptchData, setaccountCaptchaData] = useState(
        props.accountCaptchaSettings
    );

    const { t } = useTranslation();

    const navtabsItems = [
        { label: t("AbpAccount.AccountSettingsGeneral"), id: "0" },
        { label: t("AbpAccount.AccountSettingsTwoFactor"), id: "1" },
        { label: t("AbpAccount.Captcha"), id: "2" },
    ];
    const versionList = [
        { option: "2", value: 2 },
        { option: "3", value: 3 },
    ];
    const twoFactList = [
        { option: t("AbpIdentity.Feature:TwoFactor.Optional"), value: 0 },
        { option: t("AbpIdentity.Feature:TwoFactor.Disabled"), value: 1 },
        { option: t("AbpIdentity.Feature:TwoFactor.Forced"), value: 2 },
    ];

    const handlerSubmit = (event: any) => {
        event.preventDefault();
        props.onSubmit && props.onSubmit({
            accountCaptchData: accountCaptchData,
            accountGeneralData: accountGeneralData,
            twoFactorData: twoFactorData,
            developerMode: developerModeData
        }
        );
    };

    function onClickValue(value: any, name: any) {
        console.log("name-", name, "value one-", value);
    }
    const handlerChangeGeneral = (value: any, name: any) => {
        setAccountGeneralData({ ...accountGeneralData, [name]: value });
    };
    const handlerChangeTwoFact = (value: any, name: any) => {
        settwoFactorData({ ...twoFactorData, [name]: value });
    }
    const handlerChangeCaptcha = (value: any, name: any) => {
        setaccountCaptchaData({ ...accountCaptchData, [name]: value });
    };

    useEffect(() => {
        setAccountGeneralData(props.accountGeneralSettings);
    }, [props.accountGeneralSettings]);

    useEffect(() => {
        settwoFactorData(props.accountTwoFactorSettings);
    }, [props.accountTwoFactorSettings]);

    useEffect(() => {
        setaccountCaptchaData(props.accountCaptchaSettings);
    }, [props.accountCaptchaSettings]);


    return (
        <form onSubmit={handlerSubmit}>
            <div className="row pt-xxl-3 pt-xl-3 pt-lg-3 pt-md-3 pt-0 ">
                <div className="col-xxl-3 col-xl-3 col-lg-3 col-12 d-xxl-block d-xl-block d-lg-block d-md-table d-flex pb-0 border-end pe-xxl-4 pe-xl-4 pe-lg-4 pe-md-4 pe-0">
                    <RdsNavtabs
                        navtabsItems={navtabsItems}
                        type="vertical"
                        fill={false}
                        justified={false}
                        activeNavTabId={activeNavTabId}
                        activeNavtabOrder={(activeNavTabId) => {
                            setActiveNavTabId(activeNavTabId);
                        }}
                    />
                </div>

                <div className="col-xxl-9 col-xl-9 col-lg-9 col-12 pb-0 ps-xxl-4 ps-xl-4 ps-lg-4 ps-md-4 ps-0">
                    {activeNavTabId === "0" && (<>
                        <div className="fw-medium mb-3">
                            <RdsLabel label={t("General Settings") || ""} size="14px"></RdsLabel>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <RdsCheckbox
                                    label={t("AbpAccount.DisplayName:IsSelfRegistrationEnabled") || ""}
                                    onChange={(e: any) => {
                                        handlerChangeGeneral(e.target.checked, "isSelfRegistrationEnabled");
                                    }}
                                    checked={accountGeneralData?.isSelfRegistrationEnabled}
                                    dataTestId="enable-self-reg"
                                ></RdsCheckbox>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <RdsCheckbox
                                    label={t("Authentication With a Local Account") || ""}
                                    onChange={(e) => {
                                        handlerChangeGeneral(e.target.checked, "enableLocalLogin");
                                    }}
                                    checked={accountGeneralData?.enableLocalLogin}
                                    dataTestId="auth-local-account"
                                ></RdsCheckbox>
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-md-12 mb-3">
                                <RdsCheckbox
                                    label={t("Enable Developer Mode") || ""}
                                    onChange={(e) => {
                                        props.onShowDeveloperMode(e.target.checked, "developerMode");
                                        // Include any additional logic here if needed
                                    }}
                                    checked={developerModeData?.developerMode}
                                    dataTestId="developer-mode"
                                // ...
                                />
                            </div>
                        </div> */}

                    </>)
                    }
                    {activeNavTabId === "1" && (<>     <div className="fw-medium mb-3">
                        <RdsLabel label={t("AbpAccount.TwoFactorAuthentication") || ""} size="14px"></RdsLabel>
                    </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-6 col-12 mb-3">
                            <RdsSelectList
                                id="AbpIdentity.Fea"
                                label={t("AbpIdentity.Feature:TwoFactor") || ""}
                                placeholder={t("Select Option") || ""}
                                selectItems={twoFactList}
                                selectedValue={twoFactorData?.twoFactorBehaviour}
                                onChange={(item: any) => {
                                    handlerChangeTwoFact(item.value, "twoFactorBehaviour");
                                }}
                                dataTestId="twofactList"
                            ></RdsSelectList>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <RdsCheckbox
                                    label={t("AbpAccount.RememberBrowser") || ""}
                                    checked={twoFactorData?.isRememberBrowserEnabled}
                                    onChange={(e) => {
                                        handlerChangeTwoFact(e.target.checked, "isRememberBrowserEnabled");
                                    }}
                                    dataTestId="remember-browser"
                                ></RdsCheckbox>
                            </div>
                        </div></>)}
                    {activeNavTabId === "2" && (<>
                        <div className="">
                            <div className="fw-medium mb-3">
                                <RdsLabel label={t("AbpAccount.Captcha") || ""} size="14px"></RdsLabel>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <RdsCheckbox
                                        label={t("Use Security Image Questions(Captcha) On Login") || ""}
                                        checked={accountCaptchData?.useCaptchaOnLogin}
                                        onChange={(e) => {
                                            handlerChangeCaptcha(e.target.checked, "useCaptchaOnLogin");
                                        }}
                                        dataTestId="use-captcha-login"
                                    ></RdsCheckbox>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <RdsCheckbox
                                        label={t("Use Security Image Questions(Captcha) On Registration") || ""}
                                        checked={accountCaptchData?.useCaptchaOnRegistration}
                                        onChange={(e) => {
                                            handlerChangeCaptcha(e.target.checked, "useCaptchaOnRegistration");
                                        }}
                                        dataTestId="use-captcha-reg"
                                    ></RdsCheckbox>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-12 identityInput mb-3">
                                    <div className="form-group ">
                                        <RdsInput
                                            size="medium"
                                            inputType="text"
                                            label={t("AbpAccount.DisplayName:VerifyBaseUrl") || ""}
                                            placeholder={t("Enter URL") || ""}
                                            customClasses="form-control"
                                            value={accountCaptchData?.verifyBaseUrl}
                                            onChange={(e) => {
                                                handlerChangeCaptcha(e.target.value, "verifyBaseUrl");
                                            }}
                                            dataTestId="url"
                                        ></RdsInput>
                                    </div>
                                </div>
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-12 identityInput mb-3">

                                    <RdsSelectList
                                        id="AbpIdentity.dis"
                                        label={t("AbpAccount.DisplayName:Version") || ""}
                                        placeholder={t("Select Version") || ""}
                                        selectItems={versionList}
                                        selectedValue={accountCaptchData?.version}
                                        onChange={(item: any) => {
                                            handlerChangeCaptcha(item.value, "version");
                                        }}
                                        dataTestId="version-list"
                                    ></RdsSelectList>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-12 identityInput mb-3">
                                    <div className="form-group ">
                                        <RdsInput
                                            name="sitekey"
                                            labelPosition="top"
                                            label={t("AbpAccount.DisplayName:SiteKey") || ""}
                                            placeholder={t("Enter URL") || ""}
                                            customClasses="form-control"
                                            value={accountCaptchData?.siteKey}
                                            onChange={(e) => {
                                                handlerChangeCaptcha(e.target.value, "siteKey");
                                            }}
                                            dataTestId="site-key-url"
                                        ></RdsInput>
                                    </div>
                                </div>
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-12 identityInput mb-3">
                                    <RdsInput
                                        name="siteSecret"
                                        labelPosition="top"
                                        label={t("AbpAccount.DisplayName:SiteSecret") || ""}
                                        placeholder={t("Enter Secret") || ""}
                                        customClasses="form-control"
                                        value={accountCaptchData?.siteSecret}
                                        onChange={(e) => handlerChangeCaptcha(e.target.value, "siteSecret")}
                                        dataTestId="enter-secret"
                                    ></RdsInput>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-12 identityInput mb-3">
                                    <div className="form-group ">
                                        <RdsInput
                                            name="score"
                                            size="medium"
                                            label={t("AbpAccount.DisplayName:Score") || ""}
                                            placeholder={t("Enter Score") || ""}
                                            customClasses="form-control"
                                            value={accountCaptchData?.score}
                                            onChange={(e) => {
                                                handlerChangeCaptcha(e.target.value, "score");
                                            }}
                                            dataTestId="score"
                                        ></RdsInput>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>)}

                </div>
            </div >
            <div className="mt-xxl-4 pb-4 mb-xxl-0 mb-xl-0 mb-lg-0 mb-md-0 mb-3 bg-transparent fixed-bottem d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons mt-xl-4 mt-lg-4 mt-md-4 mt-0 pt-2 col-xxl-4 col-xl-4 col-lg-6 col-12 position-absolute">
                <RdsButton
                    label={t("AbpUi.Save") || ""}
                    type="submit"
                    colorVariant="primary"
                    size="small"
                    dataTestId="save"
                ></RdsButton>
            </div>

        </form >
    );
};

export default RdsCompAccount;
