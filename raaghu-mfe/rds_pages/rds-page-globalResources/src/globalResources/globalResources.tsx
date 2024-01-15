import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../libs/state-management/hooks";
import { RdsAlert, RdsButton, RdsNavtabs } from "../../../rds-elements";
import { RdsCompCodeMirror } from "../../../rds-components";
import { getGlobalResources, saveGlobalResources } from "../../../../libs/state-management/global-resources/globalResources-slice";
import { useTranslation } from "react-i18next";

const GlobalResources = () => {
    const { t } = useTranslation();
    // use state
    const [activeNavTabId, setActiveNavTabId] = useState("0");
    const [showTenantSettings, setShowTenantSettings] = useState(false);
    const [scriptStyleValue, setScriptStyleValue] = useState({ script: "", style: "" });
    const [Alert, setAlert] = useState({ show: false, message: "", color: "" });

    // variables
    const navtabsItems = [
        { label: t("CmsKit.Script"), tablink: "#script", id: "0" },
        { label: t("CmsKit.Style"), tablink: "#style", id: "1" },
    ];

    // dispatch and selector
    const dispatch = useAppDispatch();
    const globalResources = useAppSelector((state) => state.persistedReducer.globalResources);

    useEffect(() => {
        dispatch(getGlobalResources());
    }, [dispatch]);

    useEffect(() => {
        if (globalResources.globalResources) {
            setScriptStyleValue({ script: globalResources.globalResources.scriptContent, style: globalResources.globalResources.styleContent });
        }
    }, [globalResources.globalResources]);

    // functions
    function onSaveFunction(event: any) {
        event.preventDefault();
        dispatch(saveGlobalResources({ body: scriptStyleValue })).then((res: any) => {
            if (res.type == "GlobalResources/SaveGlobalResources/rejected") {
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
                    message: t("Saved Successfully"),
                    color: "success",
                });
            }
        });
    }
    const handlercodeChangesScript = (value: any) => {
        setScriptStyleValue({ ...scriptStyleValue, script: value });
    };
    const handlercodeChangesStyle = (editor: any, data: any, value: any) => {
        setScriptStyleValue({ ...scriptStyleValue, style: value });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert({ ...Alert, show: false });
        }, 3000);
        return () => clearTimeout(timer);
    });


    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                        <RdsNavtabs navtabsItems={navtabsItems} type="tabs" isNextPressed={showTenantSettings} activeNavTabId={activeNavTabId}
                            activeNavtabOrder={(activeNavTabId) => {
                                setActiveNavTabId(activeNavTabId);
                                setShowTenantSettings(false);
                            }}
                        />
                        <div className="row">
                        <div className="offset-md-4 col-md-4 mt-3 col-12 position-absolute bottom-0 mb-3 position-lg-relative custom-responsive-alert">
                                {Alert.show && (
                                    <RdsAlert
                                        alertmessage={Alert.message}
                                        size="small"
                                        colorVariant={Alert.color}
                                    ></RdsAlert>
                                )}                                
                            </div>
                            </div>
                        <div className="border border-1 border-opacity-10 mt-3 px-0 ">
                            {activeNavTabId == "0" && (
                                <RdsCompCodeMirror onBeforeChange={handlercodeChangesScript} code={scriptStyleValue.script}></RdsCompCodeMirror>
                            )}
                            {activeNavTabId == "1" && (
                                <RdsCompCodeMirror onBeforeChange={handlercodeChangesStyle} code={scriptStyleValue.style}></RdsCompCodeMirror>
                            )}

                            <div className="d-flex footer-buttons flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row mb-xxl-0 mb-xl-0 mb-lg-0 mb-md-0 mb-5">
                                <RdsButton type={"submit"} colorVariant="primary" label={t("CmsKit.SaveChanges") || ""}
                                    size="small"
                                    onClick={onSaveFunction} ></RdsButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GlobalResources;
