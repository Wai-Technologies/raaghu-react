import { RdsButton, RdsInput } from "../rds-elements";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export interface RdsCompChangePasswordProps {

}
const RdsCompChangePassword = (props: any) => {
    const { t } = useTranslation();
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
                        label={t("AbpAccount.DisplayName:CurrentPassword") || ""}
                        inputType="password"
                        isDisabled={false}
                        readonly={false}
                        placeholder={t("AbpAccount.DisplayName:CurrentPassword") || ""}
                        value={formData?.currentPassword} 
                        onChange={(e:any) => setCurrentPassword(e.target.value)}              
                        required={true}  
                        dataTestId='curr-password'  
                        showIcon= {true}          
                    ></RdsInput>
                </div>
                 </div>
            <div className="row">
                <div className="col-xxl-4 col-xl-6 col-lg-6 col-12">
                    <RdsInput
                        size="medium"
                        label={t("AbpAccount.DisplayName:NewPassword")||""}
                        inputType="password"
                        isDisabled={false}
                        readonly={false}               
                        required={true}
                        placeholder={t("AbpAccount.DisplayName:NewPassword")||""}
                        value={formData?.newPassword} 
                        onChange={(e:any) => setNewPassword(e.target.value)}  
                        dataTestId='new-pass'   
                        showIcon= {true}
                    ></RdsInput>
                </div>
            </div>
            <div className="row">
                <div className="col-xxl-4 col-xl-6 col-lg-6 col-12">
                    <RdsInput
                        size="medium"
                        label={t("AbpAccount.DisplayName:NewPassword") || ""}
                        inputType="password"
                        isDisabled={false}
                        readonly={false}               
                        required={true} 
                        placeholder={t("AbpAccount.DisplayName:NewPasswordConfirm") || ""}
                        value={formData?.newPasswordConfirm} 
                        onChange={(e:any) => setConfirmNewPassword(e.target.value)} 
                        dataTestId='confirm-password'  
                        showIcon= {true}            
                    ></RdsInput>
                </div>
            </div>
            <div className="row">
                <div className="col-xxl-4 col-xl-6 col-lg-6 col-12">
                    <RdsInput
                        size="medium"
                        label={t("AbpAccount.DisplayName:NewPasswordConfirm") || ""}
                        inputType="password"
                        isDisabled={false}
                        readonly={false}
                        required={true}
                        placeholder={t("AbpAccount.DisplayName:NewPasswordConfirm") || ""}
                        value={formData?.newPasswordConfirm}
                        onChange={(e: any) => setConfirmNewPassword(e.target.value)}
                        dataTestId='confirm-password'
                    ></RdsInput>
                </div>
            </div>
            <div className="row">
                <div className="mt-3 footer-buttons px-0 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row d-flex bg-transparent">
                    <RdsButton
                        label={t("AbpUi.Save") || ""}
                        colorVariant='primary'
                        block={false}
                        type="submit"
                        size="small"
                        onClick={() => { props.handlePasswordDataSubmit(formData); }}
                        dataTestId='save'
                    />
                </div>
            </div>
        </form>

    );
};


export default RdsCompChangePassword;
