import React, { useEffect, useState } from "react";
import { RdsInput, RdsButton } from "../rds-elements";

export interface RdsChangePasswordProps {
    changePasswordData?: any;
    onSaveHandler?: (data: any) => void;
}

const RdsCompChangeUserPassword = (props: RdsChangePasswordProps) => {
    const [changePassword, setChangePassword] = useState(props.changePasswordData);
    const [errorMessage, setErrorMessage] = useState("");

    const pattern = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+])[A-Za-z\\d!@#$%^&*()_+]{6,}$";

    useEffect(() => {
        setChangePassword(props.changePasswordData);
    }, [props.changePasswordData]);

    const handleDataChanges = (value: any, key: string) => {
        setChangePassword({ ...changePassword, [key]: value });
        if (key === 'newPasswordConfirm' && value !== changePassword.newPassword) {
            setErrorMessage('New password and confirm new password do not match');
        } else {
            setErrorMessage('');
        }
    };

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(changePassword);
        setChangePassword({ 
            currentPassword: "", 
            newPassword: "", 
            newPasswordConfirm: "" ,
        });
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
        <form>
            <div className="custom-content-scroll">
                <div className="row">
                    <div className="col-12 col-md-12">
                        <RdsInput
                            size="medium"
                            label="Current Password"
                            inputType="password"
                            isDisabled={false}
                            readonly={false}
                            placeholder="Current Password"
                            value={changePassword?.currentPassword}
                            onChange={(e: any) => handleDataChanges(e.target.value, "currentPassword")}
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
                            onChange={(e: any) => handleDataChanges(e.target.value, "newPassword")}
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
                            required={true}
                            placeholder="Confirm New Password"
                            value={changePassword?.newPasswordConfirm}
                            onChange={(e: any) => handleDataChanges(e.target.value, "newPasswordConfirm")}
                        ></RdsInput>
                        <div className="form-control-feedback">
                            {errorMessage && (<span className="text-danger">{errorMessage}</span>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                <RdsButton
                    label="Save"
                    colorVariant='primary'
                    block={false}
                    type="submit"
                    size="small"
                    onClick={(e: any) => emitSaveData(e)}
                    isDisabled={!FormValid}
                />
            </div>
        </form>
    );

};

export default RdsCompChangeUserPassword;
