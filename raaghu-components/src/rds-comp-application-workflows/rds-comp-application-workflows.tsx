import React, { useEffect, useState } from "react";
import { RdsCheckbox, RdsInput, RdsSelectList, RdsTextArea } from "../rds-elements";
import { useTranslation } from "react-i18next";
interface RdsCompApplicationWorkflowsProps {
    basicData?: any;
    typeList: any[];
    consentType: any[];
    handleSubmit: React.EventHandler<any>;
    editApplicationData?: any;
    reset?: boolean
}

const RdsCompApplicationWorkflows = (props: RdsCompApplicationWorkflowsProps) => {
    const { t } = useTranslation();
    const [basicApplicationData, setBasicApplicationData] = useState<any>(props.basicData);
    const [inputReset, setInputReset] = useState(props.reset)
    useEffect(() => {
        setInputReset(props.reset)
    }, [props.reset])
    const checkboxes = [basicApplicationData.allowAuthorizationCodeFlow, basicApplicationData.allowHybridFlow, basicApplicationData.allowPasswordFlow];
    const isAllowRefreshTokenFlowDisabled = checkboxes.length > 1 && !checkboxes.some((checkbox) => checkbox);

    const handleDataChanges = (value: any, key: string) => {

        setBasicApplicationData({ ...basicApplicationData, [key]: value });
        props.editApplicationData && props.editApplicationData({ ...basicApplicationData, [key]: value });
    }
    const handleTextAreaChange = (value: any, key: string) => {
        const lines = value.split("\n");
        setBasicApplicationData({ ...basicApplicationData, [key]: lines });
        props.editApplicationData && props.editApplicationData({ ...basicApplicationData, [key]: lines });
    }

    const isDivVisible = basicApplicationData.allowAuthorizationCodeFlow || basicApplicationData.allowImplicitFlow || basicApplicationData.allowHybridFlow;

    return (
        <>
            <div className="row">
                <div className="col-12 col-6 col-lg-6 col-md-6 col-xl4 col-xxl-6 mb-3 pt-3">
                    <RdsSelectList
                        id="abp.typ"
                        required={true}
                        label={t("AbpOpenIddict.Type") || ""}
                        placeholder={t("Select Consent Type") || ""}
                        selectItems={props.typeList}
                        selectedValue={basicApplicationData.type}
                        onChange={(item: any) => handleDataChanges(item.value, "type")}
                    ></RdsSelectList>
                </div>
                <div className="col-12 col-6 col-lg-6 col-md-6 col-xl4 col-xxl-6 mb-3 pt-3">
                    {basicApplicationData.type == 'confidential' && (

                        <RdsInput
                            reset={inputReset}
                            label={t("AbpOpenIddict.ClientSecret") || ""}
                            placeholder={t("Enter Client Secrete") || ""}
                            inputType="text"
                            onChange={(e) => handleDataChanges(e.target.value, "clientSecret")}
                            value={basicApplicationData.clientSecret}
                        ></RdsInput>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-12 col-md-12 col-xl-12 col-xxl-12 mb-3 ">
                    <div className="mb-3">
                        <RdsCheckbox
                            classes="py-2"
                            label={t("AbpOpenIddict.AllowAuthorizationCodeFlow") || ""}
                            onChange={e => { handleDataChanges(e.target.checked, "allowAuthorizationCodeFlow"); }}
                            checked={basicApplicationData.allowAuthorizationCodeFlow}
                            dataTestId="authorization-flow"
                        ></RdsCheckbox>
                    </div>
                    <div className="mb-3">
                        <RdsCheckbox
                            classes="py-2"
                            label={t("AbpOpenIddict.AllowImplicitFlow") || ""}
                            onChange={e => { handleDataChanges(e.target.checked, "allowImplicitFlow"); }}
                            dataTestId="implicit-flow"
                            checked={basicApplicationData.allowImplicitFlow}
                        ></RdsCheckbox>
                    </div>
                    <div className="mb-3">
                        <RdsCheckbox
                            classes="py-2"
                            label={t("AbpOpenIddict.AllowHybridFlow") || ""}
                            onChange={e => { handleDataChanges(e.target.checked, "allowHybridFlow"); }}
                            dataTestId="hybrid-flow"
                            checked={basicApplicationData.allowHybridFlow}
                        ></RdsCheckbox>
                    </div>

                    <div className="mb-3">
                        <RdsCheckbox
                            classes="py-2"
                            label={t("AbpOpenIddict.AllowPasswordFlow") || ""}
                            onChange={e => { handleDataChanges(e.target.checked, "allowPasswordFlow"); }}
                            checked={basicApplicationData.allowPasswordFlow}
                            dataTestId="password-flow"
                        ></RdsCheckbox>
                    </div>
                    <div className="mb-3">
                        <RdsCheckbox
                            classes="py-2"
                            label={t("AbpOpenIddict.AllowRefreshTokenFlow") || ""}
                            onChange={e => { handleDataChanges(e.target.checked, "allowRefreshTokenFlow"); }}
                            checked={basicApplicationData.allowRefreshTokenFlow}
                            isDisabled={isAllowRefreshTokenFlowDisabled}
                            dataTestId="refresh-flow"
                        ></RdsCheckbox>
                    </div>
                    <div className="mb-3">
                        <RdsCheckbox
                            classes="py-2"
                            label={t("AbpOpenIddict.AllowClientCredentialsFlow") || ""}
                            onChange={e => { handleDataChanges(e.target.checked, "allowClientCredentialsFlow"); }}
                            checked={basicApplicationData.allowClientCredentialsFlow}
                            isDisabled={basicApplicationData.type === "public"}
                            dataTestId="client-credential-flow"
                        ></RdsCheckbox>
                    </div>
                    <div className="mb-3">
                        <RdsCheckbox
                            classes="py-2"
                            label={t("AbpOpenIddict.AllowDeviceEndpoint") || ""}
                            onChange={e => { handleDataChanges(e.target.checked, "allowDeviceEndpoint"); }}
                            checked={basicApplicationData.allowDeviceEndpoint}
                            isDisabled={basicApplicationData.type === "public"}
                            dataTestId="device-endpoint"
                        ></RdsCheckbox>
                    </div>
                </div>
            </div>
            {/* {basicApplicationData.allowAuthorizationCodeFlow || basicApplicationData.allowImplicitFlow ||
                basicApplicationData.allowHybridFlow ? (<> */}
            <div>
                <div className="mb-3">
                    <RdsTextArea
                        reset={inputReset}
                        isMultiUrl={true}
                        label={t("AbpOpenIddict.RedirectUris") || ""}
                        placeholder="Enter Redirect Uris"
                        onChange={(e: any) => handleTextAreaChange(e.target.value, "redirectUris")}
                        value={basicApplicationData.redirectUris !== null ? basicApplicationData.redirectUris.join("\n") : basicApplicationData.redirectUris}
                        rows={3}
                        dataTestId="redirect-uri"
                        isDisabled={!isDivVisible}
                        required={false}
                        validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/}
                        validationMsg={t("AbpValidation.ThisFieldIsNotAValidFullyQualifiedHttpHttpsOrFtpUrl") || ''}

                    />
                </div>
                <div className="mb-3">
                    <RdsCheckbox
                        label={t("AbpOpenIddict.AllowLogoutEndpoint") || ""}
                        onChange={e => { handleDataChanges(e.target.checked, "allowLogoutEndpoint"); }}
                        checked={basicApplicationData.allowLogoutEndpoint}
                        dataTestId="logout-endpoint"
                        isDisabled={!isDivVisible}
                    ></RdsCheckbox>
                </div>
                <div className="row mb-3">
                    {/* {basicApplicationData.allowLogoutEndpoint && (
                            <> */}
                    <RdsTextArea
                        reset={inputReset}
                        isMultiUrl={true}
                        label={t("AbpOpenIddict.PostLogoutRedirectUris") || ""}
                        placeholder="Enter Post Logout Redirect Uris"
                        onChange={e => handleTextAreaChange(e.target.value, "postLogoutRedirectUris")}
                        value={basicApplicationData.postLogoutRedirectUris !== null ? basicApplicationData.postLogoutRedirectUris.join("\n") : basicApplicationData.postLogoutRedirectUris}
                        rows={3}
                        dataTestId="logout-redirect-uri"
                        isDisabled={!basicApplicationData.allowLogoutEndpoint}
                        required={false}
                        validatonPattern={/^(ftp|http|https):\/\/[^ "]+$/}
                        validationMsg={t("AbpValidation.ThisFieldIsNotAValidFullyQualifiedHttpHttpsOrFtpUrl") || ''}

                    />
                    {/* </>)
                        } */}
                </div>
                <div className="mb-3">
                    <RdsSelectList
                        classes="mb-3"
                        id="Abp.Cons"
                        label={t("AbpOpenIddict.ConsentType") || ""}
                        selectItems={props.consentType}
                        selectedValue={basicApplicationData.consentType}
                        onChange={(item: any) => { handleDataChanges(item.value, "consentType"); }}
                        dataTestId="consent-type"
                        isDisabled={isDivVisible}
                    ></RdsSelectList>
                </div>
            </div>
            {basicApplicationData.id && (
                <div className="row py-2">
                    <RdsCheckbox
                        label={t("Enabled") || ""}
                        checked={basicApplicationData.enabled}
                        dataTestId="enabled"
                    ></RdsCheckbox>
                </div>
            )}

        </>
    );
};

export default RdsCompApplicationWorkflows;
