import React, { useState, useEffect } from "react";
import { RdsButton, RdsCheckbox, RdsInput, RdsLabel } from "../rds-elements";
import { useTranslation } from "react-i18next";


export interface RdsCompIdentityOauthManagementProps {
    oauthData: any;
    onOauthDataSubmit?: any
}
const RdsCompIdentityOauthManagement = (props: RdsCompIdentityOauthManagementProps) => {
    const [oauth, setOauth] = useState(props.oauthData);

    useEffect(() => {
        setOauth(props.oauthData);
    }, [props.oauthData]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
    };
    const handleChangeform = (value: any, key: any) => {
        setOauth({ ...oauth, [key]: value });
    }

    return (
        <div className="pt-3">
            <form onSubmit={handleSubmit}>
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
                                placeholder=""
                                customClasses="form-control"
                                onChange={(e: any) => handleChangeform(e.target.value, "clientId")}
                                dataTestId="client-id"
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
                <div className="mt-xxl-4 mb-xxl-0 mb-xl-0 mb-lg-0 mb-md-0 pb-4 bg-transparent fixed-bottem d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons mt-xl-4 mt-lg-4 mt-md-4 mt-0 pt-2 col-xxl-4 col-xl-4 col-lg-6 col-12 position-absolute">
                    <RdsButton
                        label="Save"
                        type="submit"
                        colorVariant="primary"
                        size="small"
                        dataTestId="save"
                        onClick={() => { props.onOauthDataSubmit(oauth) }}
                    ></RdsButton>
                </div>

            </form>
        </div>
    );
};

export default RdsCompIdentityOauthManagement;