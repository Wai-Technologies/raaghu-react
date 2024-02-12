import React from "react";
import { RdsButton, RdsInput, RdsLabel } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompEmailSettingsProps {
    emailSettings: any;
}

const RdsCompEmailSettings = (props: RdsCompEmailSettingsProps) => {

    const { t } = useTranslation();

    return (
        <>
            <form>
                <div className="form-group row mb-3">
                    <div className="col-sm-3 pt-1">
                        <RdsLabel label="Current Email" class="control-label"></RdsLabel>
                    </div>
                    <div className="col-sm-9">
                        <RdsInput
                            placeholder="Email Address"
                            customClasses="form-control"
                            inputType="email"
                            value={props.emailSettings.currentEmail}
                            dataTestId="current-email"
                        ></RdsInput>
                    </div>
                </div>

                <div className="form-group row mb-3">
                    <div className="col-sm-3 pt-1">
                        <RdsLabel label="New Email" class="control-label"></RdsLabel>
                    </div>
                    <div className="col-sm-9">
                        <RdsInput
                            placeholder="Email Address"
                            customClasses="form-control"
                            inputType="email"
                            value={props.emailSettings.newEmail}
                            dataTestId="new-email"
                        ></RdsInput>
                    </div>
                </div>

                <div className="form-group row mb-5">
                    <div className="col-sm-3 pt-1">
                        <RdsLabel
                            label="Confirm New Email"
                            class="control-label"
                        ></RdsLabel>
                    </div>
                    <div className="col-sm-9">
                        <RdsInput
                            placeholder="Email Address"
                            customClasses="form-control"
                            inputType="email"
                            value={props.emailSettings.confirmEmail}
                            dataTestId="confirm-email"
                        ></RdsInput>
                    </div>
                </div>

                <hr></hr>
                <div className="mt-5 d-flex justify-content-end">
                    <div className="me-3">
                        <RdsButton
                            type="button"
                            colorVariant="primary"
                            label={t("Cancel") || ""}
                            isOutline={true}
                            size="small"
                            dataTestId="cancel"
                        ></RdsButton>
                    </div>
                    <div className="me-2 mb-2">
                        <RdsButton
                            type="submit"
                            colorVariant="primary"
                            label={t("Save") || ""}
                            size="small"
                            dataTestId="submit"
                        ></RdsButton>
                    </div>
                </div>
            </form>
        </>
    );
};

export default RdsCompEmailSettings;
