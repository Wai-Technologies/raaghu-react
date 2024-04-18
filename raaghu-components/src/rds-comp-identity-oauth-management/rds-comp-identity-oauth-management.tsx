import React, { useState, useEffect } from "react";
import { RdsButton, RdsCheckbox, RdsInput, RdsLabel } from "../rds-elements";
import { useTranslation } from "react-i18next";


export interface RdsCompIdentityOauthManagementProps {
    oauthData: any;
    onOauthDataSubmit?: any
    reset?: boolean;
}
const RdsCompIdentityOauthManagement = (props: RdsCompIdentityOauthManagementProps) => {
    const [oauth, setOauth] = useState(props.oauthData);
    const [inputReset, setInputReset] = useState(false);


    useEffect(() => {
        setOauth(props.oauthData);
    }, [props.oauthData]);

    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);

    const handleChangeform = (value: any, key: any) => {
        setOauth({ ...oauth, [key]: value });
    }
    
    function emitSaveData(event: any) {
        event.preventDefault();
        props.onOauthDataSubmit && props.onOauthDataSubmit(oauth);
        setInputReset(!inputReset);
        setOauth({
            enableOAuthLogin: false,
            clientId: "",
            clientSecret: "",
            authority: "",
            scope: "",
            requireHttpsMetadata: false,
            validateEndpoints: false,
            validateIssuerName: false
        });
    }

    return (
        <div className="pt-3">
            <form>
                <div className="custom-content-scroll">
                <div className="mb-3 fw-medium">
                    <RdsLabel label="OAuth Login Settings"></RdsLabel>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                    <RdsCheckbox
                        label="Enable OAuth Login"
                        onChange={(e: any) => { handleChangeform(e.target.checked, "enableOAuthLogin"); }}
                        checked={oauth?.enableOAuthLogin}
                        dataTestId="use-default-credential"
                    ></RdsCheckbox>
                </div>
                <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 mb-3">
                        <div className="form-group">
                            <RdsInput
                                value={oauth?.clientId}
                                name="clientId"
                                required={true}
                                label="ClientId"
                                placeholder="Enter Client Id"
                                customClasses="form-control"
                                onChange={(e: any) => handleChangeform(e.target.value, "clientId")}
                                dataTestId="client-id"
                                reset={inputReset}
                            ></RdsInput>
                        </div>
                    </div>
                    <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 mb-3">
                        <RdsInput
                            placeholder="389"
                            customClasses="form-control"
                            inputType="text"
                            label="ClientSecret"
                            name="clientSecret"
                            value={oauth?.clientSecret}
                            onChange={(e: any) => handleChangeform(e.target.value, "clientSecret")}
                            dataTestId="client-secret"
                        ></RdsInput>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 mb-3">
                        <div className="form-group">
                            <RdsInput
                                value={oauth?.authority}
                                name="authority"
                                required={true}
                                label="Authority"
                                placeholder="Enter Base Domain Component"
                                customClasses="form-control"
                                onChange={(e: any) => handleChangeform(e.target.value, "authority")}
                                dataTestId="base-domain"
                                reset={inputReset}
                            ></RdsInput>
                        </div>
                    </div>
                    <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 mb-3">
                        <RdsInput
                            placeholder="Scope"
                            customClasses="form-control"
                            inputType="text"
                            label="Enter Scope"
                            name="scope"
                            value={oauth?.scope}
                            onChange={(e: any) => handleChangeform(e.target.value, "scope")}
                            dataTestId="scope"
                        ></RdsInput>
                    </div>
                    <div className="offset-xxl-4 offset-xl-4 offset-lg-4"></div>
                </div>
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <RdsCheckbox
                            label="Require Https Metadata"
                            checked={oauth?.requireHttpsMetadata}
                            onChange={(e: any) => handleChangeform(e.target.checked, "requireHttpsMetadata")}
                            dataTestId="requireHttpsMetadata"
                        ></RdsCheckbox>
                    </div>
                    <div className="col-md-12 mb-3">
                        <RdsCheckbox
                            label="Validate End points"
                            checked={oauth?.validateEndpoints}
                            onChange={(e: any) => handleChangeform(e.target.checked, "validateEndpoints")}
                            dataTestId="validateEndpoints"
                        ></RdsCheckbox>
                    </div>
                    <div className="col-md-12 mb-3">
                        <RdsCheckbox
                            label="Validate Issuer Name"
                            checked={oauth?.validateIssuerName}
                            onChange={(e: any) => handleChangeform(e.target.checked, "validateIssuerName")}
                            dataTestId="validateIssuerName"
                        ></RdsCheckbox>
                    </div>
                </div>
                </div>
                <div  className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                    <RdsButton
                        label="Save"
                        type="submit"
                        colorVariant="primary"
                        size="small"
                        dataTestId="save"
                        onClick={(e: any) => emitSaveData(e)}
                    ></RdsButton>
                </div>
             
            </form>
        </div>
    );
};

export default RdsCompIdentityOauthManagement;