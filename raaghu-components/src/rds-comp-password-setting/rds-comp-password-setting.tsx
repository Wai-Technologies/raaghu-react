import React, { useEffect, useState } from "react";
import { RdsButton, RdsInput } from "../rds-elements";

export interface RdsCompPasswordSettingProps {
    passwordSettingData?: any;
    reset?: boolean;
    onSaveHandler?: (data: any) => void;
 }

const RdsCompPasswordSetting = (props: RdsCompPasswordSettingProps) => {
    const [formData, setFormData] = useState(props.passwordSettingData);
    const [inputReset, setInputReset] = useState(props.reset);
    const [error1, setError1] = useState("");
    const [error2, setError2] = useState("");
    const [error3, setError3] = useState("");
    
    useEffect(() => {
        setFormData(props.passwordSettingData);
      }, [props.passwordSettingData]);

    useEffect(() => {
        setInputReset(props.reset);
    }, [props.reset]);
   
    const handleDataChanges = (value: any, key: string) => {
        setFormData({ ...formData, [key]: value });
        switch (key) {
                case "curPass":
                    if (!isCurPassValid(value)) {
                        setError1("Current Password is invalid");
                    } else {
                        setError1("");
                    }
                    break;
                case "newPass":
                    if (!isNewPassValid(value)) {
                        setError2("New password is invalid");
                    } else {
                        setError2("");
                    }
                    break;
                case "curNewPass":
                    if (!isCurNewPassValid(value)) {
                        setError3("Password mismatch found");
                    } else {
                        setError3("");
                    }
                    break;
                default:
                    break;
            }
    };

    const isCurPassValid = (curPass: any) => {
        return curPass && curPass.length > 8;
    };

    const isNewPassValid = (newPass: any) => {
        return newPass && newPass.length > 8;
    };

    const isCurNewPassValid = (curNewPass: any) => {
        return curNewPass && curNewPass === formData.newPass && curNewPass.length > 8;
    };

    const isFormValid =
        isCurNewPassValid(formData?.curNewPass) &&
        isCurPassValid(formData?.curPass) &&
        isNewPassValid(formData?.newPass);
    
        const emitSaveData = (event: any) => {
            event.preventDefault();
            props.onSaveHandler && props.onSaveHandler(formData);
            setInputReset(!inputReset);
            setFormData({
                curPass: "",
                newPass: "",
                curNewPass: ""
            });
        };
    
    return (
        <>
            <div>
                <form>
                <div className="custom-content-scroll">
                    <div className="fw-normal mt-1 mb-3">
                        <RdsInput
                            label="Current password"
                            reset={inputReset}
                            required={true}
                            placeholder="Current password"
                            inputType="password"
                            onChange={(e) => {
                              handleDataChanges(e.target.value, "curPass");
                            }}
                            value={formData?.curPass}
                            name={"curPass"}
			                dataTestId="current-password"
                            showIcon= {true}
                        ></RdsInput>
                        {error1 && <span className="text-danger">{error1}</span>}
                    </div>
                    <div className=" fw-normal mb-3">
                        <RdsInput
                            label="New password"
                            reset={inputReset}
                            required={true}
                            placeholder="New password"
                            inputType="password"
                            onChange={(e) => {
                              handleDataChanges(e.target.value, "newPass");
                            }}
                            value={formData?.newPass}
                            name={"newPass"}
                            showIcon= {true}
			                dataTestId="new-password"
                        ></RdsInput>
                        {error2 && <span className="text-danger">{error2}</span>}
                    </div>
                    <div className=" fw-normal mb-3">
                        <RdsInput
                            label="Confirm new password"
                            reset={inputReset}
                            required={true}
                            placeholder="Confirm new password"
                            inputType="password"
                            onChange={(e) => {
                              handleDataChanges(e.target.value, "curNewPass");
                            }}
                            value={formData?.curNewPass}
                            name={"curNewPass"}
                            showIcon= {true}
			                dataTestId="confirm-password"
                        ></RdsInput>
                        {error3 && <span className="text-danger">{error3}</span>}
                    </div>
                    <div>
                        <h5 className="fw-bolder">Where you are logged in</h5>
                        <p className="fw-normal">
                            We wll alert you via olivia@rdssysteminc.com if there is any
                            unusual activity on your account.
                        </p>
                    </div>
                    </div>
                    <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                           <RdsButton
                                label="Cancel"
                                colorVariant="primary"
                                block={true}
                                type="button"
                                isOutline={true}
                                dataTestId="cancel"
                            />
                            <RdsButton
                                label="Save"
                                colorVariant="primary"
                                isDisabled={!isFormValid}
                                block={true}
                                type="submit"
                                dataTestId="save"
                                onClick={(e: any) => emitSaveData(e)}
                            />
                    </div>                    
                </form>
            </div>
        </>
    );
};
export default RdsCompPasswordSetting;
