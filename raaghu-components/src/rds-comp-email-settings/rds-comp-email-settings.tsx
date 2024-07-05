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

    return (
        <>
        {props.displayType == "basic" && (
            <form>
                <div className="form-group px-4 row mb-3">
                    <div className="col-sm-3 pt-2">
                        <RdsLabel label="Current Email" class="control-label"></RdsLabel>
                    </div>
                    <div className="col-sm-9">
                        <RdsInput
                            placeholder="Enter Current Email"
                            customClasses="form-control"
                            inputType="email"
                            onChange={(e) => {
                                handleDataChanges(e.target.value, "currentEmail");
                            }}
                            value={formData?.currentEmail}
                            dataTestId="current-email"
                        ></RdsInput>
                    </div>
                </div>

                <div className="form-group px-4 row mb-3">
                    <div className="col-sm-3 pt-2">
                        <RdsLabel label="New Email" class="control-label"></RdsLabel>
                    </div>
                    <div className="col-sm-9">
                        <RdsInput
                            placeholder="Enter New Email"
                            customClasses="form-control"
                            inputType="email"
                            onChange={(e) => {
                                handleDataChanges(e.target.value, "newEmail");
                            }}
                            value={formData?.newEmail}
                            dataTestId="new-email"
                        ></RdsInput>
                    </div>
                </div>

                <div className="form-group px-4 row mb-5">
                    <div className="col-sm-3 pt-2">
                        <RdsLabel
                            label="Confirm New Email"
                            class="control-label"
                        ></RdsLabel>
                    </div>
                    <div className="col-sm-9">
                        <RdsInput
                            placeholder="Confirm New Email"
                            customClasses="form-control"
                            inputType="email"
                            onChange={(e) => {
                                handleDataChanges(e.target.value, "confirmEmail");
                            }}
                            value={formData?.confirmEmail}
                            dataTestId="confirm-email"
                        ></RdsInput>
                        <div className="form-control-feedback">
                            {errorMessage && (<span className="text-danger">{errorMessage}</span>)}
                        </div>
                    </div>
                </div>

                <hr></hr>
                <div className="mt-3 d-flex pb-3 ms-4 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2">
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
                        onClick={(e: any) => emitSaveData(e)}
                    ></RdsButton>
                </div>
            </form>
        )}

        {props.displayType === "advanced" && (
            <form className="RdsCompEmailSettingsNew__form">
            <div className="row mb-3">
                <div className="col-md-6 col-sm-6 col-lg-6">
                    <div className="form-group">
                        <RdsLabel
                            label="Default From Display Name"
                            class="mb-1"
                            size="14px"
                        ></RdsLabel>
                        <RdsInput
                            placeholder="Enter Display Name"
                            customClasses="form-control"
                            inputType="email"
                            dataTestId='display-name'
                        ></RdsInput>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 col-lg-6">
                    <RdsLabel
                        label="Default From Address"
                        class="mb-1"
                        size="14px"
                    ></RdsLabel>
                    <RdsInput
                        placeholder="Enter Email Address"
                        customClasses="form-control"
                        dataTestId='address'
                    ></RdsInput>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-6 col-sm-6 col-lg-6">
                    <div className="form-group">
                        <RdsLabel label="Host" class="mb-1" size="14px"></RdsLabel>
                        <RdsInput
                            placeholder="127.0.0.1"
                            customClasses="form-control"
                            dataTestId='host'
                        ></RdsInput>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 col-lg-6">
                    <RdsLabel label="Port" class="mb-1" size="14px"></RdsLabel>
                    <RdsInput
                        placeholder="25"
                        customClasses="form-control"
                        dataTestId='port'
                    ></RdsInput>
                </div>
            </div>

            <div className="row mb-3">
                <div
                    className="col-lg-12 col-md-12 col-sm-12 fs-small-size"
                >
                    <RdsCheckbox label="Enable SSL" checked={false} dataTestId='enable-ssl'></RdsCheckbox>
                </div>
            </div>

            <div className="row mb-3">
                <div
                    className="col-lg-12 col-md-12 col-sm-12 fs-small-size"
                >
                    <RdsCheckbox
                        label="Use Default Credentials"
                        checked={false}
                        dataTestId='default-credentials'
                    ></RdsCheckbox>
                </div>
            </div>
            </form>
        )}
        </>
    );
};

export default RdsCompEmailSettings;
