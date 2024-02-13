import React, { useState } from "react";
import { RdsCheckbox, RdsInput, RdsButton } from "../rds-elements";
import { useTranslation } from "react-i18next";
export interface RdsCompTenantSettingsProps {
    isTenantInfoValid?: boolean;
    tenantSettingInfo?: any;
    showEditData?: boolean;
    passwordValidation?: boolean;
    onCancel?: React.EventHandler<any>;
}

const RdsCompTenantSettings = (props: RdsCompTenantSettingsProps) => {


    const [hostDatabaseChecked, setHostDatabaseChecked] = useState(false);
    const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    const [enteredPassword, setEnteredPassword] = useState("");
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const isEnteredPasswordEmpty = enteredPassword === "";
    const isEnteredPasswordInvalid = !passwordRegex.test(enteredPassword);
    const isPasswordInputEmptyAndTouched =
        isPasswordTouched && isEnteredPasswordEmpty;
    const isPasswordInputInvalid =
        isEnteredPasswordInvalid && isEnteredPasswordEmpty;

    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
    const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] =
        useState(false);
    const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
        useState(false);
    const isEnteredConfirmPasswordEmpty = enteredConfirmPassword === "";
    const isEnteredConfirmPasswordInvalid = !passwordRegex.test(
        enteredConfirmPassword
    );
    const isConfirmPasswordInputEmptyAndTouched =
        isConfirmPasswordTouched && isEnteredConfirmPasswordEmpty;
    const isConfirmPasswordInputInvalid =
        isEnteredConfirmPasswordInvalid && isEnteredConfirmPasswordEmpty;
    const isPasswordMatch =
        isConfirmPasswordFocused && !isEnteredConfirmPasswordEmpty
            ? enteredPassword === enteredConfirmPassword
            : true;
    const [isRandomPasswordChecked, setIsRandomPasswordChecked] = useState(false);
    return (
        <div>
            <div className="tab-content py-4">
                <form>
                    {props.showEditData && (
                        <div className="row">
                            <div className="col-md-12 sm-p-0">
                                <div className="form-group mb-3">
                                    <RdsCheckbox
                                        label="Use Host Database"
                                        onChange={(e) => setHostDatabaseChecked(e.target.checked)}
                                        checked={false}
                                        dataTestId="host-database"
                                    ></RdsCheckbox>
                                </div>
                            </div>
                        </div>
                    )}
                    {!hostDatabaseChecked && (
                        <div className="row mb-3">
                            <div className="col-md-6 sm-p-0">
                                <div className="form-group mb-3">
                                    <RdsInput
                                        required={true}
                                        inputType="text"
                                        placeholder="Database Connection String"
                                        label="Database Connection String"
                                        name="dcstring"
                                        id="dcstring"
                                        dataTestId="connection-string"
                                    ></RdsInput>
                                </div>
                            </div>
                        </div>
                    )}
                    {!isRandomPasswordChecked && (
                        <div className="row mb-3">
                            <div className="col-md-6 sm-p-0">
                                <div className="form-group mb-3">
                                    <RdsInput
                                        inputType="password"
                                        placeholder="Password"
                                        required={true}
                                        label="Password"
                                        name="password"
                                        id="password"
                                        onBlur={() => setIsPasswordTouched(true)}
                                        onChange={(e) => setEnteredPassword(e.target.value)}
                                        dataTestId="password"
                                        showIcon= {true}
                                    ></RdsInput>
                                    {isPasswordInputEmptyAndTouched && (
                                        <span className="red-color-error">
                                            Password is required
                                        </span>
                                    )}
                                    {isEnteredPasswordInvalid && !isEnteredPasswordEmpty && (
                                        <span className="red-color-error" role="alert">
                                            Password should be between 8 to 15 characters which
                                            contain atleast one lowercase letter, one uppercase
                                            letter, one numeric digit, and one special character.
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6 sm-p-0">
                                <div className="form-group mb-3">
                                    <RdsInput
                                        inputType="password"
                                        placeholder="Confirm Password"
                                        required={true}
                                        label="Confirm Password"
                                        name="cpassword"
                                        id="cpassword"
                                        onFocus={() => setIsConfirmPasswordFocused(true)}
                                        onBlur={() => setIsConfirmPasswordTouched(true)}
                                        onChange={(e) => setEnteredConfirmPassword(e.target.value)}
                                        dataTestId="confirm-password"
                                        showIcon= {true}
                                    ></RdsInput>
                                    {isConfirmPasswordInputEmptyAndTouched && (
                                        <span className="red-color-error">
                                            Password is required
                                        </span>
                                    )}

                                    {!isPasswordMatch && (
                                        <span className="red-color-error">
                                            Password mismatch found
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="row">
                        {props.showEditData && (
                            <div className="col-md-12 sm-p-0">
                                <div className="form-group mb-3">
                                    <RdsCheckbox
                                        label="Set Random Password"
                                        onChange={(e) =>
                                            setIsRandomPasswordChecked(e.target.checked)
                                        }
                                        checked={false}
                                        dataTestId="random-password"
                                    ></RdsCheckbox>
                                </div>
                            </div>
                        )}
                        {props.showEditData && (
                            <div className="col-md-12 sm-p-0">
                                <div className="form-group mb-3">
                                    <RdsCheckbox
                                        label="Should Change Password On Next Login"
                                        checked={false}
                                        dataTestId="change-passord-on-next-login"
                                    ></RdsCheckbox>
                                </div>
                            </div>
                        )}
                        {props.showEditData && (
                            <div className="col-md-12 sm-p-0">
                                <div className="form-group mb-3">
                                    <RdsCheckbox
                                        label="Send Activation Password"
                                        checked={false}
                                        dataTestId="send-activation-password"
                                    ></RdsCheckbox>
                                </div>
                            </div>
                        )}
                        <div className="col-md-12 sm-p-0">
                            <div className="form-group mb-3">
                                <RdsCheckbox label="Activate" checked={false} dataTestId="activate"></RdsCheckbox>
                            </div>
                        </div>
                    </div>
                    <div className=" d-flex my-2">
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
                        ></RdsButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RdsCompTenantSettings;
