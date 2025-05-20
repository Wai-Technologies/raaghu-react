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
    const [curPass, setCurPass] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newConfirmPassoword, setNewConfirmPassoword] =useState("");
    const [isValidConfirmNewPass, setIsValidConfirmNewPass] = useState(true);
    const [isValidConfirmPass, setIsValidConfirmPass] = useState(true);
    const [curPassError, setCurPassError] = useState("");
    const [newPassError, setNewPassError] = useState("");
    const [curNewPassError, setCurNewPassError] = useState("");
    
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
                    !isCurPassValid(value) ? setCurPassError("Password must be alphanumeric and at least 8 characters long") : setCurPassError("");
                    break;
                case "newPass":
                    isCurrNewPassDifferent(value) ? setNewPassError("Current Password and New Password cannot be same") : (!isNewPassValid(value) ? setNewPassError("Password must be alphanumeric and at least 8 characters long") : setNewPassError(""));
                    break;
                case "curNewPass":
                    !isCurNewPassValid(value) ? setCurNewPassError("New Password and Confirm New Password do not match. Please try again.") : setCurNewPassError("");
                    break;
                default:
                    break;
            }
    };

    const isCurPassValid = (curPass: any) => {
        return curPass && curPass.length >= 8;
    };

    const isCurrNewPassDifferent = (newPass: any) => {
        return newPass === formData?.curPass ;
    }

    const isNewPassValid = (newPass: any) => {
        return newPass && newPass.length >= 8;
    };

    const isCurNewPassValid = (curNewPass: any) => {
        return curNewPass && curNewPass === formData.newPass && curNewPass.length >= 8;
    };

    useEffect(() => {
        (newPassword && newPassword !== curPass && newPassword.length >= 8) ? setIsValidConfirmNewPass(true) : setIsValidConfirmNewPass(false);
    },[newPassword]);

    useEffect(() => {
        (newConfirmPassoword && newConfirmPassoword === newPassword && newConfirmPassoword.length >= 8) ? setIsValidConfirmPass(true) : setIsValidConfirmPass(false);
    },[newConfirmPassoword, newPassword]);

    const isFormValid =
        isCurNewPassValid(formData?.curNewPass) &&
        isCurPassValid(formData?.curPass) &&
        isNewPassValid(formData?.newPass) && isCurNewPassValid(formData?.curNewPass) && isValidConfirmNewPass && isValidConfirmPass;
    
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
                            name="Current Password"
                            label={true}
                            reset={inputReset}
                            required={true}
                            placeholder="Current password"
                            inputType="password"
                            onChange={(e) => {
                              setCurPass(e.target.value);
                              handleDataChanges(e.target.value, "curPass");
                            }}
                            value={formData?.curPass}
                            
			                dataTestId="current-password"
                            showIcon= {true}
                            validatonPattern={/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/}
                            validationMsg={curPassError}
                        ></RdsInput>                       
                    </div>
                    <div className=" fw-normal mb-3">
                        <RdsInput
                            name="New password"
                            label={true}
                            reset={inputReset}
                            required={true}
                            placeholder="New password"
                            inputType="password"
                            onChange={(e) => {
                              setNewPassword(e.target.value);
                              handleDataChanges(e.target.value, "newPass");
                            }}
                            value={formData?.newPass}
                            
                            showIcon= {true}
			                dataTestId="new-password"
                            validatonPattern={/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/}
                            isValidConfirmPass={isValidConfirmNewPass}
                            validationMsg={newPassError}
                        ></RdsInput>                       
                    </div>
                    <div className=" fw-normal mb-3">
                        <RdsInput
                            name="Confirm new password"
                            label={true}
                            reset={inputReset}
                            required={true}
                            placeholder="Confirm new password"
                            inputType="password"
                            onChange={(e) => {
                              setNewConfirmPassoword(e.target.value);
                              handleDataChanges(e.target.value, "curNewPass");
                            }}
                            value={formData?.curNewPass}                            
                            showIcon= {true}
			                dataTestId="confirm-password"
                            validationMsg={curNewPassError}
                            isValidConfirmPass={isValidConfirmPass}
                        ></RdsInput>                     
                    </div>
                    <div>
                        <h5 className="fw-bolder">Where you are logged in,</h5>
                        <p className="fw-normal">
                        We will alert you via olivia@rdssysteminc.com if there is any unusual activity on your account.
                        </p>
                    </div>
                    </div>
                    <div className="mt-3 d-flex pb-3 ps-4 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2 p-4">
                           <RdsButton
                                label="Cancel"
                                colorVariant="primary"
                                block={false}
                                type="button"
                                size="small"
                                isOutline={true}
                                dataTestId="cancel"
                            />
                            <RdsButton
                                label="Save"
                                colorVariant="primary"
                                isDisabled={!isFormValid}
                                size="small"
                                block={false}
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
