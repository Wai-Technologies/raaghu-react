import React, { useEffect, useState } from "react";
import { RdsButton, RdsInput, RdsLabel } from "../rds-elements";

export interface RdsCompEmailSettingsProps {
    emailSettings: any;
    onSaveHandler?: (data: any) => void;
}

const RdsCompEmailSettings = (props: RdsCompEmailSettingsProps) => {
    const [formData, setFormData] = useState(props.emailSettings);

    useEffect(() => {
        setFormData(props.emailSettings);
      }, [props.emailSettings]);
    
      const handleDataChanges = (value: any, key: string) => {
        setFormData({ ...formData, [key]: value });
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
                            onChange={(e) => {
                              handleDataChanges(e.target.value, "currentEmail");
                            }}
                            value={formData?.currentEmail}
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
                            onChange={(e) => {
                              handleDataChanges(e.target.value, "newEmail");
                            }}
                            value={formData?.newEmail}
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
                            onChange={(e) => {
                              handleDataChanges(e.target.value, "confirmEmail");
                            }}
                            value={formData?.confirmEmail}
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
                            label="Cancel"
                            isOutline={true}
                            size="small"
                            dataTestId="cancel"
                        ></RdsButton>
                    </div>
                    <div className="me-2 mb-2">
                        <RdsButton
                            type="submit"
                            colorVariant="primary"
                            label="Save"
                            size="small"
                            dataTestId="submit"
                            onClick={(e: any) => emitSaveData(e)}
                        ></RdsButton>
                    </div>
                </div>
            </form>
        </>
    );
};

export default RdsCompEmailSettings;
