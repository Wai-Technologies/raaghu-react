import React, { useEffect, useState } from "react";
import {
    RdsButton,
    RdsCheckbox,
    RdsInput,
    RdsLabel,
    RdsSelectList,
    RdsNavtabs
} from "../../../raaghu-elements/src";

export interface RdsCompAccountProps {
    accountGeneralSettings: any;
    accountTwoFactorSettings: any;
    accountCaptchaSettings: any;
    developerModeSettings?: any;
    onSubmit: any;
    reset?: boolean;
    onShow?: (data: any) => void;
    onShowDeveloperMode?: (name: any, value: any) => void;
}
const RdsCompAccount = (props: RdsCompAccountProps) => {
    const [activeNavTabId, setActiveNavTabId] = useState("0");
    const [inputReset, setInputReset] = useState(false);

    const [accountGeneralData, setAccountGeneralData] = useState<any>(
        props.accountGeneralSettings
    );

    const handlerChangeGeneral = (value: any, name: any) => {
        setAccountGeneralData({ ...accountGeneralData, [name]: value });
    };
 
    const navtabsItems = [
        { label: "Account Settings General", id: "0" },
        { label: "Account Settings Two Factor", id: "1" },
        { label: "Captcha", id: "2" },
    ];
    const versionList = [
        { option: "2", value: 2 },
        { option: "3", value: 3 },
    ];
    const twoFactList = [
        { option: "Optional", value: 0 },
        { option: "Disabled", value: 1 },
        { option: "Forced", value: 2 },
    ];

    useEffect(() => {
        setAccountGeneralData(props.accountGeneralSettings);
    }, [props.accountGeneralSettings]);

 useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSubmit && props.onSubmit(accountGeneralData);
        setInputReset(!inputReset);
        setAccountGeneralData({
            isSelfRegistrationEnabled: false,
            enableLocalLogin: false,
            twoFactorBehaviour: "",
            isRememberBrowserEnabled: false,
            useCaptchaOnLogin: false,
            useCaptchaOnRegistration: false,
            verifyBaseUrl: "",
            version: "",
            siteKey: "",
            siteSecret: "",
            score: ""
        });        
    }

    const isBaseUrlValid = (baseUrl: any) => {
        if (!baseUrl || baseUrl.length === 0 || !/^(ftp|http|https):\/\/[^ "]+$/.test(baseUrl)) {
            return false;
        }
        return true;
    };

    const isSiteKeyValid = (siteKey: any) => {
        if (!siteKey || siteKey.length === 0|| !/^(ftp|http|https):\/\/[^ "]+$/.test(siteKey)) {
            return false;
        }
        return true;
    };

    const isFormValid=isBaseUrlValid(accountGeneralData?.verifyBaseUrl) && isSiteKeyValid(accountGeneralData?.siteKey);
   
    return (
        <form>
          <div className="custom-content-scroll">
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
                            <RdsLabel label="General Settings" size="14px"></RdsLabel>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <RdsCheckbox
                                    label="Is Self Registration Enabled"
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
                                    label="Authentication With a Local Account"
                                    onChange={(e) => {
                                        handlerChangeGeneral(e.target.checked, "enableLocalLogin");
                                    }}
                                    checked={accountGeneralData?.enableLocalLogin}
                                    dataTestId="auth-local-account"
                                ></RdsCheckbox>
                            </div>
                        </div>
                    </>)
                    }
                    {activeNavTabId === "1" && (<>     <div className="fw-medium mb-3">
                        <RdsLabel label="Two Factor Authentication" size="14px"></RdsLabel>
                    </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-6 col-12 mb-3">
                            <RdsSelectList
                                id="Fea"
                                label="Two Factor"
                                placeholder="Select Option"
                                selectItems={twoFactList}
                                selectedValue={accountGeneralData?.twoFactorBehaviour}
                                onChange={(item: any) => {
                                    handlerChangeGeneral(item.value, "twoFactorBehaviour");
                                }}
                                dataTestId="twofactList"
                            ></RdsSelectList>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <RdsCheckbox
                                    label="Remember Browser"
                                    checked={accountGeneralData?.isRememberBrowserEnabled}
                                    onChange={(e) => {
                                        handlerChangeGeneral(e.target.checked, "isRememberBrowserEnabled");
                                    }}
                                    dataTestId="remember-browser"
                                ></RdsCheckbox>
                            </div>
                        </div></>)}
                    {activeNavTabId === "2" && (<>
                        <div className="">
                            <div className="fw-medium mb-3">
                                <RdsLabel label="Captcha" size="14px"></RdsLabel>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <RdsCheckbox
                                        label="Use Security Image Questions(Captcha) On Login"
                                        checked={accountGeneralData?.useCaptchaOnLogin}
                                        onChange={(e) => {
                                            handlerChangeGeneral(e.target.checked, "useCaptchaOnLogin");
                                        }}
                                        dataTestId="use-captcha-login"
                                    ></RdsCheckbox>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <RdsCheckbox
                                        label="Use Security Image Questions(Captcha) On Registration"
                                        checked={accountGeneralData?.useCaptchaOnRegistration}
                                        onChange={(e) => {
                                            handlerChangeGeneral(e.target.checked, "useCaptchaOnRegistration");
                                        }}
                                        dataTestId="use-captcha-reg"
                                    ></RdsCheckbox>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-12 mb-3">
                                    <div className="form-group ">
                                        <RdsInput
                                            size="medium"
                                            inputType="text"
                                            label="Verify BaseUrl"
                                            placeholder="Enter URL"
                                            customClasses="form-control"
                                            value={accountGeneralData?.verifyBaseUrl}
                                            onChange={(e) => {
                                                handlerChangeGeneral(e.target.value, "verifyBaseUrl");
                                            }}
                                            required={true}
                                            dataTestId="url"
                                            validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/}    
                                            validationMsg="Please Enter valid url (https or http)"
                                        ></RdsInput>
                                    </div>
                                </div>
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-12 mb-3">

                                    <RdsSelectList
                                        id="dis"
                                        label="Version"
                                        placeholder="Select Version"
                                        selectItems={versionList}
                                        selectedValue={accountGeneralData?.version}
                                        onChange={(item: any) => {
                                            handlerChangeGeneral(item.value, "version");
                                        }}
                                        dataTestId="version-list"
                                    ></RdsSelectList>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-12 mb-3">
                                    <div className="form-group ">
                                        <RdsInput
                                            name="sitekey"
                                            labelPosition="top"
                                            label="Site Key"
                                            placeholder="Enter URL"
                                            customClasses="form-control"
                                            value={accountGeneralData?.siteKey}
                                            onChange={(e) => {
                                                handlerChangeGeneral(e.target.value, "siteKey");
                                            }}
                                            required={true}
                                            dataTestId="site-key-url"
                                            validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/} 
                                            validationMsg="Please Enter valid url (https or http)"
                                        ></RdsInput>
                                    </div>
                                </div>
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-12 mb-3">
                                    <RdsInput
                                        name="siteSecret"
                                        labelPosition="top"
                                        label="Site Secret"
                                        placeholder="Enter Secret"
                                        customClasses="form-control"
                                        value={accountGeneralData?.siteSecret}
                                        onChange={(e) => handlerChangeGeneral(e.target.value, "siteSecret")}
                                        dataTestId="enter-secret"
                                    ></RdsInput>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-12 mb-3">
                                    <div className="form-group ">
                                        <RdsInput
                                            name="score"
                                            size="medium"
                                            label="Score"
                                            placeholder="Enter Score"
                                            customClasses="form-control"
                                            value={accountGeneralData?.score}
                                            onChange={(e) => {
                                                handlerChangeGeneral(e.target.value, "score");
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
          </div>
          <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                        <RdsButton
                    label="Save"
                    type="submit"
                    colorVariant="primary"
                    onClick={(e: any) => emitSaveData(e)}
                    size="small"
                    dataTestId="save"
                    isDisabled={!isFormValid}
                ></RdsButton>
            </div>
        </form >
    );
};

export default RdsCompAccount;
