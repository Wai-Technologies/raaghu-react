import React, { useState, useEffect } from "react";
import {
    RdsAlert,
    RdsNavtabs,
} from "../../../../../raaghu-elements/src/index";
import {
    RdsCompIdentityManagement,
    RdsCompEmail,
    RdsCompAccount,
    RdsCompFeatureManagement,
    RdsCompCMS,
    RdsCompAccountExternalProvider,
    RdsCompIdentityLdapManagement,
    RdsCompIdentityOauthManagement,
    RdsCompDeveloperMode
} from "../../../rds-components";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../libs/state-management/hooks";
import {
    fetchAccountGeneralSettings,
    fetchCaptchaSettings,
    fetchEmailSettings,
    fetchExternalProviderSettings,
    fetchFeaturesSettings,
    fetchIdentitySettings,
    fetchTwoFactorSettings,
    fetchLdapSettings,
    fetchOauthSettings,
    fetchContactSettings,
    restoreToDefaultFeaturesSettings,
    saveAccountCaptchaSettings,
    saveAccountExternalProviderSettings,
    saveAccountGeneralSettings,
    saveAccountTwoFactorSettings,
    saveEmailSettings,
    saveFeaturesSettings,
    saveIdentitySettings,
    saveLdapSettings,
    saveOauthSettings,
    saveContactSettings,
    putSendTestEmail
} from "../../../../libs/state-management/settings/settings-slice";
import { useTranslation } from "react-i18next";
import { getConfig, setConfig } from '../../../../rds_pages/host/config';

interface RdsCompSettingsProps { }

const Settings = (props: RdsCompSettingsProps) => {
    const { t } = useTranslation();
    const developerData = localStorage.getItem("REACT_APP_URL");

    const dispatch = useAppDispatch();
    const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
    const [activeNavTabId, setActiveNavTabId] = useState("0");
    const data = useAppSelector((state) => state.persistedReducer.settings);
    const [navtabsItems, setNavtabItems] = useState([
        { label: t("Emailing"), id: "0" },
        { label: t("Identity"), id: "1" },
        { label: t("Feature"), id: "4" },
        { label: t("Account"), id: "5" },
        { label: t("Account External Provider"), id: "6" },
        { label: t("CMS"), id: "7" },
        // { label: t("Developer Mode"), id: "8", }
    ]);

    const [emailSettings, setEmailSettings] = useState<any>({
        defaultFromDisplayName: "",
        defaultFromAddress: "",
        smtpHost: "",
        smtpPort: "",
        smtpEnableSsl: false,
        smtpUseDefaultCredentials: false,
        smtpUserName: "",
        smtpPassword: "",
        smtpDomain: "",
        targetEmail: ""
    });
    const [ldapData, setLdapData] = useState<any>({});
    const [oauthData, setOauthData] = useState<any>({
        enableOAuthLogin: false,
        clientId: "Raaghu_mvc_Web",
        clientSecret: "1q2w3E*",
        authority: "http://localhost:8080",
        scope: "address email phone profile roles",
        requireHttpsMetadata: false,
        validateEndpoints: false,
        validateIssuerName: false,
    });

    const [identitySettings, setIdentitySettings] = useState<any>({
        lockout: {
            allowedForNewUsers: false,
            lockoutDuration: 10,
            maxFailedAccessAttempts: "",
        },
        password: {
            requiredLength: "",
            requiredUniqueChars: "",
            requireDigit: false,
            requireNonAlphanumeric: false,
            requireUppercase: false,
            requireLowercase: false,
        },
        signIn: {
            requireConfirmedEmail: false,
            requireConfirmedPhoneNumber: false,
            enablePhoneNumberConfirmation: false,
        },
        user: {
            isEmailUpdateEnabled: false,
            isUserNameUpdateEnabled: false,
        },
    });

    const [accountGeneralSettings, setAccountGeneralSettings] = useState<any>({
        enableLocalLogin: false,
        isSelfRegistrationEnabled: false,
    });
    const [developerModeSettings, setDeveloperModeSettings] = useState<any>({})
    const [isTabVisible, setIsTabVisible] = useState(false);
    const [accountTwoFactorSettings, setAccountTwoFactSettings] = useState<any>({
        isRememberBrowserEnabled: false,
        twoFactorBehaviour: 1,
        usersCanChange: false,
    });
    const [accountCaptchaSettings, setAccountCaptchaSettings] = useState<any>({
        score: "",
        siteKey: "",
        siteSecret: "",
        useCaptchaOnLogin: false,
        useCaptchaOnRegistration: false,
        verifyBaseUrl: "",
        version: "",
    });
    const [externalProviderSettings, setExternalProviderSettings] = useState<any>([]);
    const [receiverEmailAddress, setReceiverEmailAddress] = useState(null)
    const [featureManagementData, setFeatureManagementData] = useState<any>({
        data: [],
        payload: []
    });

    const [sendTestEmailData, setSendTestEmailData] = useState<any>({
        senderEmailAddress: "noreply@abp.io",
        targetEmailAddress: "admin@abp.io",
        subject: "Test email 9958",
        body: "Test email body message here"
    })

    useEffect(() => {
        if (activeNavTabId === "0") {
            dispatch(fetchEmailSettings() as any);
        }
        else if (activeNavTabId === "1") {
            dispatch(fetchIdentitySettings() as any);
        }
        else if (activeNavTabId === "2") {
            dispatch(fetchLdapSettings() as any);
        }
        else if (activeNavTabId === "3") {
            dispatch(fetchOauthSettings() as any);
        }
        else if (activeNavTabId === "4") {

        }
        else if (activeNavTabId === "5") {
            dispatch(fetchAccountGeneralSettings() as any);
            dispatch(fetchTwoFactorSettings() as any);
            dispatch(fetchCaptchaSettings() as any);
        }
        else if (activeNavTabId === "7") {
            dispatch(fetchContactSettings() as any);
        }
    
    }, [activeNavTabId])

    useEffect(() => {
        dispatch(fetchExternalProviderSettings() as any);
        dispatch(fetchFeaturesSettings() as any);
    }, [dispatch]);

    useEffect(() => {
        if (data.emailSettings) {
            setEmailSettings(data.emailSettings);
        }
    }, [data.emailSettings]);

    useEffect(() => {
        if (data.sendTestEmailData) {
            setSendTestEmailData(data.sendTestEmailData);
        }
    }, [data.sendTestEmailData]);

    useEffect(() => {
        if (data.identitySettings) {
            setIdentitySettings(data.identitySettings);
        }
    }, [data.identitySettings]);

    useEffect(() => {
        if (data.accountGeneralSettings) {
            setAccountGeneralSettings(data.accountGeneralSettings);
        }
    }, [data.accountGeneralSettings]);

    useEffect(() => {
        if (developerModeSettings) {
            setDeveloperModeSettings(developerModeSettings);
        }
    }, [developerModeSettings]);

    useEffect(() => {
        if (data.accountTwoFactorSettings) {
            setAccountTwoFactSettings(data.accountTwoFactorSettings);
        }
    }, [data.accountTwoFactorSettings]);

    useEffect(() => {
        if (data.accountCaptchaSettings) {
            setAccountCaptchaSettings(data.accountCaptchaSettings);
        }
    }, [data.accountCaptchaSettings]);

    useEffect(() => {
        if (data.accountExternalProvider) {
            setExternalProviderSettings(data.accountExternalProvider.settings)
        }
    }, [data.accountExternalProvider]);

    useEffect(() => {
        if (data.featureIdentitySettings) {
            const tempFeaturePayload: any[] = [];
            data.featureIdentitySettings.groups.map((item: any) => {
                item.features.map((e: any) => {
                    let data: any = {};
                    if (e.value == "true" || e.value == "True") {
                        data = {
                            name: e.name,
                            value: true,
                        };
                    } else if (e.value == "False" || e.value == "false") {
                        data = {
                            name: e.name,
                            value: false,
                        };
                    } else {
                        data = {
                            name: e.name,
                            value: e.value,
                        };
                    }
                    tempFeaturePayload.push(data);
                });
            });
            let newtabs = [...navtabsItems];
            //LDAP
            const newItem1 = { label: t("Identity Ldap"), id: '2' };
            const existingItem1 = newtabs.find((item) => item.id === newItem1.id);
            const isLdap = data.featureIdentitySettings.groups[0]?.features[2]?.value;
            if ((isLdap == "true" || isLdap == "True") && !existingItem1) {
                newtabs = [...newtabs, newItem1];
            }
            if ((isLdap == "false" || isLdap == "False") && existingItem1) {
                newtabs = newtabs.filter((item) => item.id !== newItem1.id);
            }
            //OAUTH
            const newItem2 = { label: t("Identity Oauth"), id: "3" };
            const existingItem2 = newtabs.find((item) => item.id === newItem2.id);
            const isOauth = data.featureIdentitySettings.groups[0]?.features[3]?.value;
            if ((isOauth == "true" || isOauth == "True") && !existingItem2) {
                newtabs = [...newtabs, newItem2];
            }
            if ((isOauth == "false" || isOauth == "False") && existingItem2) {
                newtabs = newtabs.filter((item) => item.id !== newItem2.id);
            }
            newtabs.sort((a, b) => parseInt(a.id) - parseInt(b.id));

            setNavtabItems(newtabs);

            setFeatureManagementData({ ...featureManagementData, data: data.featureIdentitySettings.groups, payload: tempFeaturePayload })
        }
    }, [data.featureIdentitySettings]);

    useEffect(() => {
        if (data.identityLdapSettings) {
            setLdapData(data.identityLdapSettings);
        }
    }, [data.identityLdapSettings]);

    useEffect(() => {
        if (data.identityOauthSettings) {
            setOauthData(data.identityOauthSettings);
        }
    }, [data.identityOauthSettings]);

    useEffect(() => {
        if (data.contactSettings) {
            setReceiverEmailAddress(data.contactSettings.receiverEmailAddress);
        }
    }, [data.contactSettings]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert({ ...Alert, show: false });
        }, 3000);
        return () => clearTimeout(timer);
    }, [data.emailSettings,
    data.identitySettings,
    data.accountGeneralSettings,
    data.accountTwoFactorSettings,
    data.accountCaptchaSettings,
    data.accountExternalProvider,
    data.featureIdentitySettings,
    data.identityLdapSettings,
    data.identityOauthSettings,
    data.contactSettings,
    data.sendTestEmailData]);

    function restoreFeatures(data: any) {
        dispatch(restoreToDefaultFeaturesSettings(data) as any).then(() => {
            dispatch(fetchFeaturesSettings() as any);
        });
    }

    const handlerCmsSubmit = (receiverEmailAddress: any) => {
        dispatch(saveContactSettings({ receiverEmailAddress: receiverEmailAddress }) as any).then((res: any) => {
            if (res.type == "settings/saveContactSettings/rejected") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Contact Settings saved Successfully"),
                    color: "success",
                });
            }

            dispatch(fetchContactSettings() as any);
        });
    }
    const handlerLdapSubmit = (ldap: any) => {
        dispatch(saveLdapSettings(ldap) as any).then((res: any) => {
            if (res.type == "settings/saveContactSettings/rejected") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Ldap Settings saved Successfully"),
                    color: "success",
                });
            }
            dispatch(fetchLdapSettings() as any);
        });
    }
    const handlerOauthSubmit = (oauth: any) => {
        dispatch(saveOauthSettings(oauth) as any).then((res: any) => {
            if (res.type == "settings/saveContactSettings/rejected") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("OauthSettings saved Successfully"),
                    color: "success",
                });
            }
            dispatch(fetchOauthSettings() as any);
        });
    }
    const handlerFeaturesubmit = (data: any) => {

        const tempData: any[] = [];
        data.map((e: any) => {
            const item = {
                value: String(e.value),
                name: e.name
            };
            tempData.push(item);
        });
        // Filter out the elements that have changed (value is different)
        const updatedElements = tempData.filter((ele: any, index: any) => {
            const originalItem = featureManagementData.payload[index];
            return originalItem.value !== ele.value;
        });
        dispatch(saveFeaturesSettings({ features: updatedElements }) as any).then((res: any) => {
            if (res.type == "settings/saveFeaturesSettings/rejected") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Feature Settings saved Successfully"),
                    color: "success",
                });
            }
            dispatch(fetchFeaturesSettings() as any);
        });
    }
    const handlerExternalProviderSubmit = (externalProvider: any) => {

        dispatch(saveAccountExternalProviderSettings(externalProvider) as any).then((res: any) => {
            if (res.type == "settings/saveAccountExternalProviderSettings/rejected") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("External Provider Settings saved Successfully"),
                    color: "success",
                });
            }
            dispatch(fetchExternalProviderSettings() as any)
        })
    }
    const handleTestEmailRequest = (data: any) => {
        dispatch(putSendTestEmail(data) as any).then((res: any) => {
            if (res.type == "settings/putSendTestEmail/rejected") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Email Request Settings saved Successfully"),
                    color: "success",
                });
            }
            dispatch(fetchEmailSettings() as any);
        })
    }
    function handleEmailSubmit(formData: any) {
        dispatch(saveEmailSettings(formData) as any).then((res: any) => {
            if (res.type == "settings/saveEmailSettings/rejected") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Test Mail Send Successfully"),
                    color: "success",
                });
            }
            dispatch(saveEmailSettings(formData) as any);
        });

    }


    const handlerIdentitySubmit = (data: any) => {
        dispatch(saveIdentitySettings(data) as any).then((res: any) => {
            if (res.type == "settings/saveIdentitySettings/rejected") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Identity Settings saved Successfully"),
                    color: "success",
                });
            }
            dispatch(fetchIdentitySettings() as any);
        });
    }

    function handlerAccountSubmit(data: any) {
        dispatch(saveAccountGeneralSettings(data.accountGeneralData) as any).then((res: any) => {
            if (res.type == "settings/saveAccountGeneralSettings/rejected") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            } else if (res.type == "settings/saveAccountGeneralSettings/forbidden") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Invalid site key or site secret"),
                    color: "danger",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Settings saved Successfully"),
                    color: "success",
                });
            }
            dispatch(fetchAccountGeneralSettings() as any)
        });
        dispatch(saveAccountTwoFactorSettings(data.twoFactorData) as any).then(() => {
            dispatch(fetchTwoFactorSettings() as any)
        });
        dispatch(saveAccountCaptchaSettings(data.accountCaptchData) as any).then(() => {
            dispatch(fetchCaptchaSettings() as any)
        });
    }

    return (
        <div className="container-fluid p-0 m-0">
            <div className="row h-100">
                <div className="col-md-12">
                    <div className="card border-0 px-4 py-4 rounded-0 card-full-stretch">
                        <RdsNavtabs
                            navtabsItems={navtabsItems}
                            activeNavTabId={activeNavTabId}
                            type="tabs"
                            activeNavtabOrder={(activeNavTabId) => {
                                setActiveNavTabId(activeNavTabId);
                            }}>
                        </RdsNavtabs>
                        <div className="offset-md-4 col-md-4 mt-3 col-12 position-absolute bottom-0 mb-3 position-lg-relative custom-responsive-alert">
                            {Alert.show && (
                                <RdsAlert
                                    alertmessage={Alert.message}
                                    size="small"
                                    colorVariant={Alert.color}
                                ></RdsAlert>
                            )}
                        </div>
                        {activeNavTabId == "0" && (
                            <RdsCompEmail
                                onEmailDataSubmit={handleEmailSubmit}
                                onTestEmailRequest={handleTestEmailRequest}
                                emailSettings={emailSettings}
                                sendTestEmailData={sendTestEmailData} />
                        )}
                        {activeNavTabId == "1" && (
                            <RdsCompIdentityManagement
                                onIdentitySettingsSubmit={handlerIdentitySubmit}
                                lockoutSettings={identitySettings.lockout}
                                passwordSettings={identitySettings.password}
                                signSettings={identitySettings.signIn}
                                userSettings={identitySettings.user}
                            ></RdsCompIdentityManagement>
                        )}
                        {activeNavTabId == "2" && (<RdsCompIdentityLdapManagement ldapData={ldapData} onLdapSettingsSubmit={handlerLdapSubmit} />)}
                        {activeNavTabId == "3" && (<RdsCompIdentityOauthManagement oauthData={oauthData} onOauthDataSubmit={handlerOauthSubmit} />)}
                        {activeNavTabId == "4" && (
                            <RdsCompFeatureManagement
                                featureManagementData={featureManagementData}
                                onSubmit={handlerFeaturesubmit}
                            ></RdsCompFeatureManagement>
                        )}
                        {activeNavTabId == "5" && (
                            <RdsCompAccount
                                accountGeneralSettings={accountGeneralSettings}
                                accountTwoFactorSettings={accountTwoFactorSettings}
                                accountCaptchaSettings={accountCaptchaSettings}
                                onSubmit={(data: any) => {
                                    handlerAccountSubmit(data);
                                }}

                            ></RdsCompAccount>
                        )}
                        {activeNavTabId == "6" && (<RdsCompAccountExternalProvider accountExternalProvider={externalProviderSettings} onSubmit={handlerExternalProviderSubmit} />)}
                        {activeNavTabId == "7" && (<RdsCompCMS receiverEmailAddress={receiverEmailAddress} onSubmit={handlerCmsSubmit} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Settings;

