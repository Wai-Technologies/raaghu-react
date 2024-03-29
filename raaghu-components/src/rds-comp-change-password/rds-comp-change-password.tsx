import { RdsButton, RdsInput } from "../rds-elements";
import React, { useEffect, useState } from "react";

export interface RdsCompChangePasswordProps {

}
const RdsCompChangePassword = (props: any) => {
    const [formData, setFormData] = useState(props.changePasswordData);

    useEffect(() => {
        setFormData(props.changePasswordData);
    }, [props.changePasswordData]);

    const handlePasswordDataSubmit = (event: any) => {
        event.preventDefault();
    };

    function setCurrentPassword(value: any) {
        setFormData({ ...formData, currentPassword: value });
    }

    function setNewPassword(value: any) {
        setFormData({ ...formData, newPassword: value });
    }

    function setConfirmNewPassword(value: any) {
        setFormData({ ...formData, newPasswordConfirm: value });
    }

    return (

        <form data-testid="password-form" onSubmit={handlePasswordDataSubmit}>
            <div className="row mt-4">
                <div className="col-xxl-4 col-xl-6 col-lg-6 col-12">
                    <RdsInput
                        size="medium"
                        label="Current Password"
                        inputType="password"
                        isDisabled={false}
                        readonly={false}
                        placeholder="Current Password"
                        value={formData?.currentPassword}
                        onChange={(e: any) => setCurrentPassword(e.target.value)}
                        required={true}
                        dataTestId='curr-password'
                        showIcon={true}
                    ></RdsInput>
                </div>
            </div>
            <div className="row">
                <div className="col-xxl-4 col-xl-6 col-lg-6 col-12">
                    <RdsInput
                        size="medium"
                        label="New Password"
                        inputType="password"
                        isDisabled={false}
                        readonly={false}
                        required={true}
                        placeholder="New Password"
                        value={formData?.newPassword}
                        onChange={(e: any) => setNewPassword(e.target.value)}
                        dataTestId='new-pass'
                        showIcon={true}
                    ></RdsInput>
                </div>
            </div>
            {/* <div className="row">
                <div className="col-xxl-4 col-xl-6 col-lg-6 col-12">
                    <RdsInput
                        size="medium"
                        label="New Password"
                        inputType="password"
                        isDisabled={false}
                        readonly={false}
                        required={true}
                        placeholder="New Password Confirm"
                        value={formData?.newPasswordConfirm}
                        onChange={(e: any) => setConfirmNewPassword(e.target.value)}
                        dataTestId='confirm-password'
                        showIcon={true}
                    ></RdsInput>
                </div>
            </div> */}
            <div className="row">
                <div className="col-xxl-4 col-xl-6 col-lg-6 col-12">
                    <RdsInput
                        size="medium"
                        label="New Password Confirm"
                        inputType="password"
                        isDisabled={false}
                        readonly={false}
                        required={true}
                        placeholder="New Password Confirm"
                        value={formData?.newPasswordConfirm}
                        onChange={(e: any) => setConfirmNewPassword(e.target.value)}
                        dataTestId='confirm-password'
                    ></RdsInput>
                </div>
            </div>
            <div className="mt-3 d-flex pb-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2">
                        <RdsButton
                            class="me-2"
                            tooltipTitle={""}
                            type={"button"}
                            label="Cancel"
                            colorVariant="outline-primary"
                            size="small"
                            databsdismiss="offcanvas"
                            dataTestId="cancel"
                        ></RdsButton>
                        <RdsButton
                            class="me-2"
                            label="Save"
                            size="small"
                            // colorVariant="primary"
                            tooltipTitle={""}
                            type={"submit"}
                            databsdismiss="offcanvas"
                            isDisabled={false}
                            dataTestId="save"
                        ></RdsButton>
                    </div>
        </form>

    );
};


export default RdsCompChangePassword;
