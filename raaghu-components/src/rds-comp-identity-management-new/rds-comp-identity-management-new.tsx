import React, { useState, useEffect } from "react";
import { RdsButton, RdsCheckbox, RdsInput, RdsLabel } from "../rds-elements";
import { useTranslation } from "react-i18next";
import { set } from "date-fns";
import { InputSize } from "../../../raaghu-elements/src/rds-input/rds-input";
export interface RdsCompIdentityManagementProps {
    onIdentitySettingsSubmit: any;
    lockoutSettings: any;
    passwordSettings: any;
    onSaveHandler?: (data: any) => void;
    signSettings: any;
    userSettings: any;
}

const RdsCompIdentityManagement = (props: RdsCompIdentityManagementProps) => {
    const [lockoutSettings, setLockoutSettings] = useState(props.lockoutSettings);
    const [passwordSettings, setPasswordSettings] = useState(props.passwordSettings);
    const [signSettings, setSignSettings] = useState(props.signSettings);

    const [userSettings, setUserSettings] = useState(props.userSettings);

    useEffect(() => {
        setLockoutSettings(props.lockoutSettings);
        setPasswordSettings(props.passwordSettings);
        setSignSettings(props.signSettings);
        setUserSettings(props.userSettings);
    }, [props]);
    const handlePasswordChange = (value: any, key: any) => {
        setPasswordSettings({ ...passwordSettings, [key]: value });
    }
    function emitSaveData(event: any) {
        event.preventDefault();
      props.onSaveHandler && props.onSaveHandler({ lockout: lockoutSettings, user: userSettings, signIn: signSettings, password: passwordSettings });
      setPasswordSettings({
            requiredLength: "",
            requiredUniqueChars: "",
            requireNonAlphanumeric: false,
            requireUppercase: false,
            requireLowercase: false,
            requireDigit: false,
            forceUsersToPeriodicallyChangePassword: false,
            passwordChangePeriodDays: "",
            allowedForNewUsers: false,
            lockoutDuration: "",
            maxFailedAccessAttempts: "",
            requireConfirmedEmail: false,
            enablePhoneNumberConfirmation: false,
            requireConfirmedPhoneNumber: false,
            isEmailUpdateEnabled: false,
            isUserNameUpdateEnabled: false
        });
    }



    return (

        <div className="pt-3">
            <div className="overflow-x-hidden overflow-y-auto">
                <form>
                <div className="custom-content-scroll">
                    {/* Password Settings */}
                    <div className="mb-3 fw-medium">
                        <RdsLabel label="Password Settings"></RdsLabel>
                    </div>
                    <div className="row">
                        <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                            <div className="form-group">
                                <RdsInput
                                    size={InputSize.Medium}   
                                    inputType="text"
                                    isDisabled={false}
                                    name="Required Length"
                                    label={true}
                                    fontWeight={"normal"}
                                    readonly={false}
                                    placeholder="Enter Length"
                                    value={passwordSettings?.requiredLength}
                                    onChange={(e: any) => {
                                        handlePasswordChange(e.target.value, "requiredLength");
                                    }}
                                    dataTestId="required-length"
                                ></RdsInput>
                                {/* <small className="text-secondary-50">Required Length</small> */}
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 ">
                            <div className="form-group">
                                <RdsInput
                                     size={InputSize.Medium}  
                                    inputType="text"
                                    isDisabled={false}
                                    readonly={false}
                                    name="Required Unique Chars"
                                    label={true}
                                    fontWeight={"normal"}
                                    placeholder="Enter Number"
                                    value={passwordSettings?.requiredUniqueChars}
                                    onChange={(e: any) => handlePasswordChange(e.target.value, "requiredUniqueChars")}
                                    dataTestId="required-special-char"
                                ></RdsInput>
                                {/* <small className="text-secondary-50">Required Unique Chars</small> */}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsCheckbox
                                labelText="Require NonAlphanumeric"
                                checked={passwordSettings?.requireNonAlphanumeric}
                                onChange={(e: any) => handlePasswordChange(e.target.checked, "requireNonAlphanumeric")}
                                dataTestId="required-non-alpha-num-char"
                            ></RdsCheckbox>
                            {/* <small className="text-secondary-50">Require NonAlphanumeric</small> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsCheckbox
                                labelText="Require Uppercase"
                                checked={passwordSettings?.requireUppercase}
                                onChange={(e: any) => handlePasswordChange(e.target.checked, "requireUppercase")}
                                dataTestId="required-upper-case"
                            ></RdsCheckbox>
                            {/* <small className="text-secondary-50">Require Uppercase</small> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsCheckbox
                                labelText="Require Lowercase"
                                checked={passwordSettings?.requireLowercase}
                                onChange={(e: any) => handlePasswordChange(e.target.checked, "requireLowercase")}
                                dataTestId="required-lower-case"
                            ></RdsCheckbox>
                            {/* <small className="text-secondary-50">Require Lowercase</small> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsCheckbox
                                labelText="Require Digit"
                                checked={passwordSettings?.requireDigit}
                                onChange={(e: any) => handlePasswordChange(e.target.checked, "requireDigit")}
                                dataTestId="required-numbers"
                            ></RdsCheckbox>
                            {/* <small className="text-secondary-50">Require Digit</small> */}
                        </div>
                    </div>
                    {/*Password renewing settings */}
                    <div className="mb-3 fw-medium">
                        <RdsLabel label="Password Renewing Settings"></RdsLabel>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsCheckbox
                                labelText="Force Users To Periodically Change Password"
                                checked={passwordSettings?.forceUsersToPeriodicallyChangePassword}
                                onChange={(e: any) => handlePasswordChange(e.target.checked, "forceUsersToPeriodicallyChangePassword")}
                                dataTestId="enable-new-user"
                            ></RdsCheckbox>
                            {/* <small className="text-secondary-50">Force Users To Periodically ChangePassword</small> */}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                            <div className="form-group">
                                <RdsInput
                                     size={InputSize.Medium} 
                                    inputType="text"
                                    isDisabled={false}
                                    name="Password Change PeriodDays"
                                    label={true}
                                    fontWeight={"normal"}
                                    readonly={false}
                                    placeholder="Enter Length"
                                    value={passwordSettings?.passwordChangePeriodDays}
                                    onChange={(e: any) => {
                                        handlePasswordChange(e.target.value, "passwordChangePeriodDays");
                                    }}
                                    dataTestId="password-change-period-days"
                                ></RdsInput>
                                {/* <small className="text-secondary-50">Password Change Period Days</small> */}
                            </div>
                        </div>
                    </div>
                    {/* Lockout Settings */}
                    <div className="mb-3 fw-medium">
                        <RdsLabel label="Lockout Settings"></RdsLabel>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsCheckbox
                                labelText="Allowed For New Users"
                                checked={passwordSettings?.allowedForNewUsers}
                                onChange={(e: any) => handlePasswordChange(e.target.checked, "allowedForNewUsers")}
                                dataTestId="enable-new-user"
                            ></RdsCheckbox>
                            {/* <small className="text-secondary-50">Allowed For New Users</small> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                            <div className="form-group ">
                                <RdsInput
                                    fontWeight={"normal"}
                                    size={InputSize.Medium}
                                    inputType="number"
                                    isDisabled={false}
                                    readonly={false}
                                    name="Lockout Duration"
                                    label={true}
                                    placeholder="Enter Length"
                                    value={passwordSettings?.lockoutDuration}
                                    onChange={(e: any) => handlePasswordChange(e.target.value, "lockoutDuration")}
                                    dataTestId="lockout-duration"
                                ></RdsInput>
                                {/* <small className="text-secondary-50">Allowed For New Users</small> */}
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                            <div className="form-group">
                                <RdsInput
                                    fontWeight={"normal"}
                                    size={InputSize.Medium}  
                                    inputType="text"
                                    isDisabled={false}
                                    name="Max Failed Access Attempts"
                                    label={true}
                                    readonly={false}
                                    placeholder="Enter Name"
                                    value={passwordSettings?.maxFailedAccessAttempts}
                                    onChange={(e: any) => handlePasswordChange(e.target.value, "maxFailedAccessAttempts")}
                                    dataTestId="max-failed-attempts"
                                ></RdsInput>
                                {/* <small className="text-secondary-50">Max Failed Access Attempts</small> */}
                            </div>
                        </div>
                    </div>

                    {/* Signin Settings */}
                    <div className=" mb-3 fw-medium">
                        <RdsLabel label="SignInSettings"></RdsLabel>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsCheckbox
                                labelText="Require Confirmed Email"
                                checked={passwordSettings?.requireConfirmedEmail}
                                onChange={(e: any) => handlePasswordChange(e.target.checked, "requireConfirmedEmail")}
                                dataTestId="required-confirmed-email"
                            ></RdsCheckbox>
                            {/* <small className="text-secondary-50">Require Confirmed Email</small> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsCheckbox
                                labelText="Enable Phone Number Confirmation"
                                checked={passwordSettings?.enablePhoneNumberConfirmation}
                                onChange={(e: any) => handlePasswordChange(e.target.checked, "enablePhoneNumberConfirmation")}
                                dataTestId="allow-user-conf-phone"
                            ></RdsCheckbox>
                            {/* <small className="text-secondary-50">Enable Phone Number Confirmation</small> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsCheckbox
                                labelText="Require Confirmed Phone Number"
                                checked={passwordSettings?.requireConfirmedPhoneNumber}
                                onChange={(e: any) => handlePasswordChange(e.target.checked, "requireConfirmedPhoneNumber")}
                                dataTestId="required-conf-phone"
                            ></RdsCheckbox>
                            {/* <small className="text-secondary-50">Require Confirmed Phone Number</small> */}
                        </div>
                    </div>
                    {/* User Settings */}
                    <div className="mb-3 fw-medium">
                        <RdsLabel label="UserSettings"></RdsLabel>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsCheckbox
                                labelText="Is Email Update Enabled"
                                checked={passwordSettings?.isEmailUpdateEnabled}
                                onChange={(e: any) => handlePasswordChange(e.target.checked, "isEmailUpdateEnabled")}
                                dataTestId="allow-user-change-email"
                            ></RdsCheckbox>
                            {/* <small className="text-secondary-50">Is Email Update Enabled</small> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsCheckbox
                                labelText="Is User Name Update Enabled"
                                checked={passwordSettings?.isUserNameUpdateEnabled}
                                onChange={(e: any) => handlePasswordChange(e.target.checked, "isUserNameUpdateEnabled")}
                                dataTestId="allow-user-change-username"
                            ></RdsCheckbox>
                            {/* <small className="text-secondary-50">Enable Phone Number Confirmation</small> */}
                        </div>
                    </div>
                    </div>
                    <div  className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
                <RdsButton
                    label="Save"
                    type="submit"
                    colorVariant="primary"
                    size="small"
                    dataTestId="save"
                    onClick={(e: any) => emitSaveData(e)}
                    //onClick={() => { props.onIdentitySettingsSubmit({ lockout: lockoutSettings, user: userSettings, signIn: signSettings, password: passwordSettings }); }}
                ></RdsButton>
                  </div>
                </form>
            </div>
        </div>  
    );
};

export default RdsCompIdentityManagement;
