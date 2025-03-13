import React, { useEffect, useState } from "react";
import { RdsButton, RdsCheckbox, RdsInput, RdsLabel } from "../rds-elements";

export interface RdsCompEmailSettingsProps {
    emailSettings: any;
    displayType: "basic" | "advanced";
    onSaveHandler?: (data: any) => void;
}

const RdsCompEmailSettings = (props: RdsCompEmailSettingsProps) => {
    const [formData, setFormData] = useState(props.emailSettings);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setFormData(props.emailSettings);
    }, [props.emailSettings]);

    const handleDataChanges = (value: any, key: string) => {
        setFormData({ ...formData, [key]: value });
        if (key === 'confirmEmail' && value !== formData.newEmail) {
            setErrorMessage('New Email and Confirm New Email do not match');
        } else {
            setErrorMessage('');
        }
    };

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(formData);
        setFormData({
            currentEmail: "",
            newEmail: "",
            confirmEmail: ""
        });
    }

    function emitSaveData1(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(formData);
        setFormData({
            displayName: "",
            address: "",
            host: "",
            port: "",
            enableSSL: false,
            defaultCredentials: false
        });
    }

    return (
        <>
        {props.displayType === "basic" && (
        <form>
        <div className="form-group px-2 ps-2  row align-items-center">
            <div className="col-12 col-sm-4 col-md-3 pt-4 text-sm-end">
                <RdsLabel label="Current Email" class="control-label"></RdsLabel>
            </div>
            <div className="col-12 col-sm-8 col-md-9">
                <RdsInput
                    name="Surrent Email"
                    placeholder="Enter Current Email"
                    customClasses="form-control"
                    inputType="email"
                    onChange={(e) => handleDataChanges(e.target.value, "currentEmail")}
                    value={formData?.currentEmail}
                    dataTestId="current-email"
                ></RdsInput>
            </div>
        </div>
    
        <div className="form-group px-2 ps-2 row align-items-center">
            <div className="col-12 col-sm-4 col-md-3 pt-4 text-sm-end">
                <RdsLabel label="New Email" class="control-label"></RdsLabel>
            </div>
            <div className="col-12 col-sm-8 col-md-9">
                <RdsInput
                    name="New Email"
                    placeholder="Enter New Email"
                    customClasses="form-control"
                    inputType="email"
                    onChange={(e) => handleDataChanges(e.target.value, "newEmail")}
                    value={formData?.newEmail}
                    dataTestId="new-email"
                ></RdsInput>
            </div>
        </div>
    
        <div className="form-group px-2 ps-2  row align-items-center mb-5">
            <div className="col-12 col-sm-4 col-md-3 pt-4 text-sm-end">
                <RdsLabel label="Confirm New Email" class="control-label"></RdsLabel>
            </div>
            <div className="col-12 col-sm-8 col-md-9">
                <RdsInput
                    name="Confirm New Email"
                    placeholder="Confirm New Email"
                    customClasses="form-control"
                    inputType="email"
                    onChange={(e) => handleDataChanges(e.target.value, "confirmEmail")}
                    value={formData?.confirmEmail}
                    dataTestId="confirm-email"
                ></RdsInput>
                <div className="form-control-feedback">
                    {errorMessage && <span className="text-danger">{errorMessage}</span>}
                </div>
            </div>
        </div>
    
        <div className="mt-3 d-flex pb-3 ps-4 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2 p-4">
            <RdsButton
                type="button"
                colorVariant="primary"
                label="Cancel"
                isOutline={true}
                size="small"
                dataTestId="cancel"
            ></RdsButton>
            <RdsButton
                type="submit"
                colorVariant="primary"
                label="Save"
                size="small"
                dataTestId="submit"
                onClick={(e) => emitSaveData(e)}
            ></RdsButton>
        </div>
    </form>
    
        )}

        {props.displayType === "advanced" && (
            <form className="RdsCompEmailSettingsNew__form">
            <div className="row">
                <div className="col-md-6 col-sm-6 col-lg-6 mt-2">
                    <div className="form-group">
                        <RdsInput
                            name="Default From Display Name"
                            label={true}
                            placeholder="Enter Display Name"
                            customClasses="form-control"
                            inputType="text"
                            onChange={(e) => handleDataChanges(e.target.value, "displayName")}
                            value={formData?.displayName}
                            dataTestId='display-name'
                        ></RdsInput>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 col-lg-6 mt-2">
                    <RdsInput
                        name="Default From Address"
                        label={true}
                        placeholder="Enter Email Address"
                        customClasses="form-control"
                        dataTestId='address'
                        inputType="email"
                        onChange={(e) => handleDataChanges(e.target.value, "address")}
                        value={formData?.address}
                        validatonPattern={/^[A-Z0-0._%+-]+@[A-Z0-0.-]+\.[A-Z]{2,}$/i}
                        validationMsg="Please Enter Valid Email Address."
                    ></RdsInput>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 col-sm-6 col-lg-6 mt-2">
                    <div className="form-group">
                        <RdsInput
                            name="Host"
                            label={true}
                            placeholder="127.0.0.1"
                            customClasses="form-control"
                            dataTestId='host'
                            onChange={(e) => handleDataChanges(e.target.value, "host")}
                            value={formData?.host}
                        ></RdsInput>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 col-lg-6 mt-2">
                    <RdsInput
                        name="Port"
                        label={true}
                        placeholder="25"
                        customClasses="form-control"
                        dataTestId='port'
                        onChange={(e) => handleDataChanges(e.target.value, "port")}
                        value={formData?.port}
                    ></RdsInput>
                </div>
            </div>

            <div className="row mt-3">
            <div className="col-lg-12 col-md-12 col-sm-12 fs-small-size">
                    <RdsCheckbox
                        labelText="Enable SSL"
                        onChange={(e) => handleDataChanges(e.target.checked, "enableSSL")}
                        checked={formData?.enableSSL}
                        dataTestId='enable-ssl'
                    ></RdsCheckbox>
                </div>
            </div>

            <div className="row mt-3">
            <div className="col-lg-12 col-md-12 col-sm-12 fs-small-size">
                    <RdsCheckbox
                        labelText="Use Default Credentials"
                        onChange={(e) => handleDataChanges(e.target.checked, "defaultCredentials")}
                        checked={formData?.defaultCredentials}
                        dataTestId='default-credentials'
                    ></RdsCheckbox>
                </div>
            </div>
            <div className="mt-3 d-flex pb-3 ps-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2 p-4">
                <RdsButton
                    type="button"
                    colorVariant="primary"
                    label="Cancel"
                    isOutline={true}
                    size="small"
                    dataTestId="cancel"
                ></RdsButton>
                <RdsButton
                    type="submit"
                    colorVariant="primary"
                    label="Save"
                    size="small"
                    dataTestId="submit"
                    onClick={(e) => emitSaveData1(e)}
                ></RdsButton>
            </div>
            </form>
        )}
        </>
    );
};

export default RdsCompEmailSettings;
