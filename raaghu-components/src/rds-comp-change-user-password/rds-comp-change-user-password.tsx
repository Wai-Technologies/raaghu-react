import React, { useEffect, useState } from "react";
import { RdsInput, RdsButton } from "../rds-elements";
export interface RdsChangePasswordProps {
    changePasswordData?: any;
    PasswordDataSubmit?: any;
}

const RdsCompChangeUserPassword = (props: RdsChangePasswordProps) => {
    const [changePassword, setChangePassword] = useState(props.changePasswordData);
    const [errorMessage, setErrorMessage] = useState("");

    const pattern = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+])[A-Za-z\\d!@#$%^&*()_+]{6,}$";

    useEffect(() => {
        setChangePassword(props.changePasswordData);
    }, [props.changePasswordData]);

    function setCurrentPassword(value: any) {
        setChangePassword({ ...changePassword, currentPassword: value });
    }

    function setNewPassword(value: any) {
        setChangePassword({ ...changePassword, newPassword: value });
    }

    function setConfirmNewPassword(value: any) {
        setChangePassword({ ...changePassword, newPasswordConfirm: value });
        if (value !== changePassword?.newPassword) {
            setErrorMessage("Confirm password should be same as new password");
        } else {
            setErrorMessage("");
        }
    }
    function handlePasswordDataSubmit(data: any) {
        props.PasswordDataSubmit(data);
    }

    const isPasswordValid = (password: any) => {
        if (!password || password.length === 0) {
            return false;
        }
        return true;
    };

    const isNewPasswordValid = (password: any) => {
        if (!password || password.length === 0) {
            return false;
        }
        return true;
    };

    const isConfirmedPasswordValid = (password: any) => {
        if (!password || password !== changePassword?.newPassword) {
            return false;
        }
        return true;
    };
    const FormValid = isPasswordValid(changePassword?.currentPassword) && isNewPasswordValid(changePassword?.newPassword) && isConfirmedPasswordValid(changePassword?.newPasswordConfirm);

    return (
        <div className="row py-4">
            <div className="col-12 col-md-12">
                <RdsInput
                    size="medium"
                    label="Current Password"
                    inputType="password"
                    isDisabled={false}
                    readonly={false}
                    placeholder="Current Password"
                    value={changePassword?.currentPassword}
                    onChange={(e: any) => setCurrentPassword(e.target.value)}
                    required={true}
                ></RdsInput>
            </div>
            <div className="col-12 col-md-12">
                <RdsInput
                    size="medium"
                    label="New Password"
                    inputType="password"
                    isDisabled={false}
                    readonly={false}
                    required={true}
                    placeholder="New Password"
                    value={changePassword?.newPassword}
                    onChange={(e: any) => setNewPassword(e.target.value)}
                ></RdsInput>
                {/* <div className="form-control-feedback">
					{errorPatternMessage && (<span className="text-danger">{errorPatternMessage}</span>)}
				</div> */}
            </div>
            <div className="col-12 col-md-12">
                <RdsInput
                    size="medium"
                    label="Confirm New Password"
                    inputType="password"
                    isDisabled={false}
                    readonly={false}
                    placeholder="Confirm New Password"
                    value={changePassword?.newPasswordConfirm}
                    onChange={(e: any) => setConfirmNewPassword(e.target.value)}
                ></RdsInput>
                <div className="form-control-feedback">
                    {errorMessage && (<span className="text-danger">{errorMessage}</span>)}
                </div>
            </div>
            <div className="d-flex mt-5">
                <RdsButton
                    label="Save"
                    colorVariant='primary'
                    block={false}
                    type="submit"
                    onClick={() => handlePasswordDataSubmit(changePassword)}
                    isDisabled={!FormValid}
                />
            </div>
        </div>
    );

};

export default RdsCompChangeUserPassword;
