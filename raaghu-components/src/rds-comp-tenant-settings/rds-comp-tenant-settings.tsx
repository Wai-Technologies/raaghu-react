import React, { useEffect, useState } from "react";
import { RdsCheckbox, RdsInput, RdsButton } from "../rds-elements";
export interface RdsCompTenantSettingsProps {
    isTenantInfoValid?: boolean;
    tenantSettingInfo?: any;
    showEditData?: boolean;
    passwordValidation?: boolean;
    onCancel?: React.EventHandler<any>;
    onSaveHandler?: (data: any) => void;
    tenantSettingData?: any;
    reset?: boolean;
}

const RdsCompTenantSettings = (props: RdsCompTenantSettingsProps) => {
    const [formData, setFormData] = useState(props.tenantSettingData);
    const [hostDatabaseChecked, setHostDatabaseChecked] = useState(false);
    const [isRandomPasswordChecked, setIsRandomPasswordChecked] = useState(false);
    const [inputReset, setInputReset] = useState(false);
    const [errors, setErrors] = useState({
        password: "",
        cpassword: "",       
      });
    
      const isNewPassValid = (password: string) => {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        return pattern.test(password);
      };
    
      const isCurNewPassValid = (cpassword: string) => {
        return cpassword === formData.password;
      };

    useEffect(() => {
        setFormData(props.tenantSettingData);
    }, [props.tenantSettingData]);

    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);

    const handleDataChanges = (value: any, key: string) => {

          let errorMessage = "";
          if (key === "password") {
            errorMessage = isNewPassValid(value) ? "" : "Password is invalid";
          } else if (key === "cpassword") {
            errorMessage = isCurNewPassValid(value) ? "" : "Password mismatch found";
          }
          setErrors({ ...errors, [key]: errorMessage });

        setFormData({ ...formData, [key]: value });
    };

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(formData);
        setInputReset(!inputReset);
        setFormData({
            dcstring: "",
            password: "",
            cpassword: "",
            useHostDb: hostDatabaseChecked,
            isRandomPasswordChecked: isRandomPasswordChecked,
            shouldChangePasswordOnNextLogin: false,
            sendActivationPassword: false,
            activate: false
    });
    }
    
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] =
        useState(false);
    const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
        useState(false);
        const isConnectionStringValid = (dcstring: string) => {
            if (!dcstring || dcstring.length === 0) {
                return false;
            }
            return true;
        }
        const isPasswordValid = (password: string) => {
            if (!password || password.length === 0 || errors.password) {
                return false;
            }
            return true;
        }
        const isConfirmPasswordValid = (cpassword: string) => {
            if (!cpassword || cpassword.length === 0 || errors.cpassword) {
                return false;
            }
            return true;
        }
const isFormValid=isConnectionStringValid(formData?.dcstring) && isPasswordValid(formData?.password) && isConfirmPasswordValid(formData?.cpassword);
    return (
        <div>
            <div className="tab-content py-4">
                <form>
                    <div className="custom-content-scroll">
                    {props.showEditData && (
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group mb-3">
                                    <RdsCheckbox
                                        labelText="Use Host Database"
                                        dataTestId="host-database"                                        
                                        onChange={(e) => setHostDatabaseChecked(e.target.checked)}
                                        checked={hostDatabaseChecked} 
                                    ></RdsCheckbox>
                                </div>
                            </div>
                        </div>
                    )}
                    {!hostDatabaseChecked && (
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <RdsInput
                                        required={true}
                                        inputType="text"
                                        placeholder="Database Connection String"
                                        name="Database Connection String"
                                        label={true}                                       
                                        id="dcstring"
                                        dataTestId="connection-string"
                                        onChange={(e) => {
                                          handleDataChanges(e.target.value, "dcstring");
                                        }}
                                        value={formData?.dcstring}
                                        reset={inputReset}
                                    ></RdsInput>
                                </div>
                            </div>
                        </div>
                    )}
                    {!isRandomPasswordChecked && (
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <RdsInput
                                        inputType="password"
                                        placeholder="Enter Password"
                                        required={true}
                                        name="Password"
                                        label={true}                                        
                                        id={(errors.password && formData?.password)? "passwordfield":"password" }
                                        onBlur={() => setIsPasswordTouched(true)}
                                        onChange={(e) => {
                                          handleDataChanges(e.target.value, "password");
                                        }}
                                        value={formData?.password}
                                        dataTestId="password"
                                        showIcon= {true}
                                        reset={inputReset}
                                    ></RdsInput>
                                    {errors.password && formData?.password &&  <div className="form-control-feedback"><span className="text-danger">{errors.password}</span></div>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <RdsInput
                                        inputType="password"
                                        placeholder="Enter Confirm Password"
                                        required={true}
                                        name="Confirm Password"
                                        label={true}                                       
                                        id={(errors.cpassword &&  formData?.cpassword)? "passwordfield":"cpassword" }
                                        onFocus={() => setIsConfirmPasswordFocused(true)}
                                        onBlur={() => setIsConfirmPasswordTouched(true)}
                                        onChange={(e) => {
                                         handleDataChanges(e.target.value, "cpassword");
                                        }}
                                        value={formData?.cpassword}
                                        dataTestId="confirm-password"
                                        showIcon= {true}
                                        reset={inputReset}
                                    ></RdsInput>
                                    {errors.cpassword &&  formData?.cpassword && <div className="form-control-feedback"><span className="text-danger">{errors.cpassword}</span></div>}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="row">
                        {props.showEditData && (
                            <div className="col-md-12">
                                <div className="form-group mb-3">
                                    <RdsCheckbox
                                        labelText="Set Random Password"
                                        onChange={(e) =>
                                            setIsRandomPasswordChecked(e.target.checked)
                                        }
                                        checked={isRandomPasswordChecked} 
                                        dataTestId="random-password"
                                    ></RdsCheckbox>
                                </div>
                            </div>
                        )}
                        {props.showEditData && (
                            <div className="col-md-12">
                                <div className="form-group mb-3">
                                    <RdsCheckbox
                                        labelText="Should Change Password On Next Login"
                                        dataTestId="change-passord-on-next-login"
                                        onChange={(e) => {
                                            handleDataChanges(e.target.checked, "shouldChangePasswordOnNextLogin");
                                        }}
                                        checked={formData?.shouldChangePasswordOnNextLogin}
                                    ></RdsCheckbox>
                                </div>
                            </div>
                        )}
                        {props.showEditData && (
                            <div className="col-md-12">
                                <div className="form-group mb-3">
                                    <RdsCheckbox
                                        labelText="Send Activation Password"
                                        dataTestId="send-activation-password"
                                        onChange={(e) => {
                                            handleDataChanges(e.target.checked, "sendActivationPassword");
                                        }}
                                        checked={formData?.sendActivationPassword}
                                    ></RdsCheckbox>
                                </div>
                            </div>
                        )}
                        <div className="col-md-12">
                            <div className="form-group mb-3">
                                <RdsCheckbox labelText="Activate"
                                 dataTestId="activate"
                                 onChange={(e) => {
                                     handleDataChanges(e.target.checked, "activate");
                                 }}
                                 checked={formData?.activate}
                                 ></RdsCheckbox>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
                        <RdsButton
                            tooltipTitle={""}
                            type={"button"}
                            label="Cancel"
                            databsdismiss="offcanvas"
                            isOutline
                            colorVariant="primary"
                            size="small"
                            dataTestId="cancel"
                        ></RdsButton>
                        <RdsButton
                            tooltipTitle={""}
                            type={"button"}
                            label="Save"
                            size="small"
                            colorVariant="primary"
                            class="ms-2"
                            databsdismiss="offcanvas"
                            dataTestId="save"
                            onClick={(e: any) => emitSaveData(e)}
                            isDisabled={!isFormValid}
                        ></RdsButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RdsCompTenantSettings;
