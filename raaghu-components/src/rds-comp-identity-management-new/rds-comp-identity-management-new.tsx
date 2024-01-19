import React, { useState, useEffect } from "react";
import { RdsButton, RdsCheckbox, RdsInput, RdsLabel } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompIdentityManagementProps {
    onIdentitySettingsSubmit: any;
    lockoutSettings: any;
    passwordSettings: any;
    signSettings: any;
    userSettings: any;
}

const RdsCompIdentityManagement = (props: RdsCompIdentityManagementProps) => {
    const [lockoutSettings, setLockoutSettings] = useState(props.lockoutSettings);
    const [passwordSettings, setPasswordSettings] = useState(props.passwordSettings);
    const [signSettings, setSignSettings] = useState(props.signSettings);

    const [userSettings, setUserSettings] = useState(props.userSettings);
    const { t } = useTranslation();

    useEffect(() => {
        setLockoutSettings(props.lockoutSettings);
        setPasswordSettings(props.passwordSettings);
        setSignSettings(props.signSettings);
        setUserSettings(props.userSettings);
    }, [props]);


    const handleSubmit = (event: any) => {
        event.preventDefault();
    };
    const handlePasswordChange = (value: any, key: any) => {
        setPasswordSettings({ ...passwordSettings, [key]: value });
    }
    const handleLockoutChange = (value: any, key: any) => {
        setLockoutSettings({ ...lockoutSettings, [key]: value });
    }
    const handleSignChange = (value: any, key: any) => {
        setSignSettings({ ...signSettings, [key]: value });
    }
    const handleUserChange = (value: any, key: any) => {
        setUserSettings({ ...userSettings, [key]: value });
    }
    return (
        <div className="pt-3">
            <div className="overflow-x-hidden overflow-y-auto card-custom-scroll">
                <form onSubmit={handleSubmit}>
                    {/* Password Settings */}
                    <div className="mb-3 fw-medium">
                        <RdsLabel label={t("AbpIdentity.PasswordSettings") || ""}></RdsLabel>
                    </div>
                    <div className="row">
                        <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                            <div className="form-group">
                                <RdsInput
                                    size="medium"
                                    inputType="text"
                                    isDisabled={false}
                                    label={t("AbpIdentity.DisplayName:Abp.Identity.Password.RequiredLength") || ""}
                                    fontWeight={"normal"}
                                    readonly={false}
                                    placeholder={t("Enter Length") || ""}
                                    value={passwordSettings?.requiredLength}
                                    onChange={(e: any) => {
                                        handlePasswordChange(e.target.value, "requiredLength");
                                    }}
                                    dataTestId="required-length"
                                ></RdsInput>
                                <small className="text-secondary-50">{t("AbpIdentity.Description:Abp.Identity.Password.RequiredLength" || "")}</small>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 ">
                            <div className="form-group">
                                <RdsInput
                                    size="medium"
                                    inputType="text"
                                    isDisabled={false}
                                    readonly={false}
                                    label={t("AbpIdentity.DisplayName:Abp.Identity.Password.RequiredUniqueChars") || ""}
                                    fontWeight={"normal"}
                                    placeholder={t("Enter Number") || ""}
                                    value={passwordSettings?.requiredUniqueChars}
                                    onChange={(e: any) => handlePasswordChange(e.target.value, "requiredUniqueChars")}
                                    dataTestId="required-special-char"
                                ></RdsInput>
                                <small className="text-secondary-50">{t("AbpIdentity.Description:Abp.Identity.Password.RequiredUniqueChars" || "")}</small>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsCheckbox
                                label={t("AbpIdentity.DisplayName:Abp.Identity.Password.RequireNonAlphanumeric") || ""}
                                checked={passwordSettings?.requireNonAlphanumeric}
                                onChange={(e: any) => handlePasswordChange(e.target.checked, "requireNonAlphanumeric")}
                                dataTestId="required-non-alpha-num-char"
                            ></RdsCheckbox>
                            <small className="text-secondary-50">{t("AbpIdentity.Description:Abp.Identity.Password.RequireNonAlphanumeric" || "")}</small>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsCheckbox
                                label={t("AbpIdentity.DisplayName:Abp.Identity.Password.RequireUppercase") || ""}
                                checked={passwordSettings?.requireUppercase}
                                onChange={(e: any) => handlePasswordChange(e.target.checked, "requireUppercase")}
                                dataTestId="required-upper-case"
                            ></RdsCheckbox>
                            <small className="text-secondary-50">{t("AbpIdentity.Description:Abp.Identity.Password.RequireUppercase" || "")}</small>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsCheckbox
                                label={t("AbpIdentity.DisplayName:Abp.Identity.Password.RequireLowercase") || ""}
                                checked={passwordSettings?.requireLowercase}
                                onChange={(e: any) => handlePasswordChange(e.target.checked, "requireLowercase")}
                                dataTestId="required-lower-case"
                            ></RdsCheckbox>
                            <small className="text-secondary-50">{t("AbpIdentity.Description:Abp.Identity.Password.RequireLowercase" || "")}</small>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsCheckbox
                                label={t("AbpIdentity.DisplayName:Abp.Identity.Password.RequireDigit") || ""}
                                checked={passwordSettings?.requireDigit}
                                onChange={(e: any) => handlePasswordChange(e.target.checked, "requireDigit")}
                                dataTestId="required-numbers"
                            ></RdsCheckbox>
                            <small className="text-secondary-50">{t("AbpIdentity.Description:Abp.Identity.Password.RequireDigit" || "")}</small>
                        </div>
                    </div>
                    {/*Password renewing settings */}
                    <div className="mb-3 fw-medium">
                        <RdsLabel label={t("AbpIdentity.PasswordRenewingSettings") || ""}></RdsLabel>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsCheckbox
                                label={t("AbpIdentity.DisplayName:Abp.Identity.Password.ForceUsersToPeriodicallyChangePassword") || ""}
                                checked={passwordSettings?.forceUsersToPeriodicallyChangePassword}
                                onChange={(e: any) => handlePasswordChange(e.target.checked, "forceUsersToPeriodicallyChangePassword")}
                                dataTestId="enable-new-user"
                            ></RdsCheckbox>
                            <small className="text-secondary-50">{t("AbpIdentity.Description:Abp.Identity.Password.ForceUsersToPeriodicallyChangePassword" || "")}</small>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                            <div className="form-group">
                                <RdsInput
                                    size="medium"
                                    inputType="text"
                                    isDisabled={false}
                                    label={t("AbpIdentity.DisplayName:Abp.Identity.Password.PasswordChangePeriodDays") || ""}
                                    fontWeight={"normal"}
                                    readonly={false}
                                    placeholder={t("Enter Length") || ""}
                                    value={passwordSettings?.passwordChangePeriodDays}
                                    onChange={(e: any) => {
                                        handlePasswordChange(e.target.value, "passwordChangePeriodDays");
                                    }}
                                    dataTestId="password-change-period-days"
                                ></RdsInput>
                                <small className="text-secondary-50">{t("AbpIdentity.Description:Abp.Identity.Password.PasswordChangePeriodDays" || "")}</small>
                            </div>
                        </div>
                    </div>
                    {/* Lockout Settings */}
                    <div className="mb-3 fw-medium">
                        <RdsLabel label={t("AbpIdentity.LockoutSettings") || ""}></RdsLabel>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsCheckbox
                                label={t("AbpIdentity.DisplayName:Abp.Identity.Lockout.AllowedForNewUsers") || ""}
                                checked={lockoutSettings?.allowedForNewUsers}
                                onChange={(e: any) => handleLockoutChange(e.target.checked, "allowedForNewUsers")}
                                dataTestId="enable-new-user"
                            ></RdsCheckbox>
                            <small className="text-secondary-50">{t("AbpIdentity.Description:Abp.Identity.Lockout.AllowedForNewUsers" || "")}</small>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                            <div className="form-group ">
                                <RdsInput
                                    fontWeight={"normal"}
                                    size="medium"
                                    inputType="number"
                                    isDisabled={false}
                                    readonly={false}
                                    label={t("AbpIdentity.DisplayName:Abp.Identity.Lockout.LockoutDuration") || ""}
                                    placeholder={t("Enter Length") || ""}
                                    value={lockoutSettings?.lockoutDuration}
                                    onChange={(e: any) => handleLockoutChange(e.target.value, "lockoutDuration")}
                                    dataTestId="lockout-duration"
                                ></RdsInput>
                                <small className="text-secondary-50">{t("AbpIdentity.Description:Abp.Identity.Lockout.AllowedForNewUsers" || "")}</small>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                            <div className="form-group">
                                <RdsInput
                                    fontWeight={"normal"}
                                    size="medium"
                                    inputType="text"
                                    isDisabled={false}
                                    label={t("AbpIdentity.DisplayName:Abp.Identity.Lockout.MaxFailedAccessAttempts") || ""}
                                    readonly={false}
                                    placeholder={t("Enter Name") || ""}
                                    value={lockoutSettings?.maxFailedAccessAttempts}
                                    onChange={(e: any) => handleLockoutChange(e.target.value, "maxFailedAccessAttempts")}
                                    dataTestId="max-failed-attempts"
                                ></RdsInput>
                                <small className="text-secondary-50">{t("AbpIdentity.Description:Abp.Identity.Lockout.MaxFailedAccessAttempts" || "")}</small>
                            </div>
                        </div>
                    </div>

                    {/* Signin Settings */}
                    <div className=" mb-3 fw-medium">
                        <RdsLabel label={t("AbpIdentity.SignInSettings") || ""}></RdsLabel>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsCheckbox
                                label={t("AbpIdentity.DisplayName:Abp.Identity.SignIn.RequireConfirmedEmail") || ""}
                                checked={signSettings?.requireConfirmedEmail}
                                onChange={(e: any) => handleSignChange(e.target.checked, "requireConfirmedEmail")}
                                dataTestId="required-confirmed-email"
                            ></RdsCheckbox>
                            <small className="text-secondary-50">{t("AbpIdentity.Description:Abp.Identity.SignIn.RequireConfirmedEmail" || "")}</small>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsCheckbox
                                label={t("AbpIdentity.DisplayName:Abp.Identity.SignIn.EnablePhoneNumberConfirmation") || ""}
                                checked={signSettings?.enablePhoneNumberConfirmation}
                                onChange={(e: any) => handleSignChange(e.target.checked, "enablePhoneNumberConfirmation")}
                                dataTestId="allow-user-conf-phone"
                            ></RdsCheckbox>
                            <small className="text-secondary-50">{t("AbpIdentity.Description:Abp.Identity.SignIn.EnablePhoneNumberConfirmation" || "")}</small>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsCheckbox
                                label={t("AbpIdentity.DisplayName:Abp.Identity.SignIn.RequireConfirmedPhoneNumber") || ""}
                                checked={signSettings?.requireConfirmedPhoneNumber}
                                onChange={(e: any) => handleSignChange(e.target.checked, "requireConfirmedPhoneNumber")}
                                dataTestId="required-conf-phone"
                            ></RdsCheckbox>
                            <small className="text-secondary-50">{t("AbpIdentity.Description:Abp.Identity.SignIn.RequireConfirmedPhoneNumber" || "")}</small>
                        </div>
                    </div>
                    {/* User Settings */}
                    <div className="mb-3 fw-medium">
                        <RdsLabel label={t("AbpIdentity.UserSettings") || ""}></RdsLabel>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsCheckbox
                                label={t("AbpIdentity.DisplayName:Abp.Identity.User.IsEmailUpdateEnabled") || ""}
                                checked={userSettings?.isEmailUpdateEnabled}
                                onChange={(e: any) => handleUserChange(e.target.checked, "isEmailUpdateEnabled")}
                                dataTestId="allow-user-change-email"
                            ></RdsCheckbox>
                            <small className="text-secondary-50">{t("AbpIdentity.Description:Abp.Identity.User.IsEmailUpdateEnabled" || "")}</small>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsCheckbox
                                label={t("AbpIdentity.DisplayName:Abp.Identity.User.IsUserNameUpdateEnabled") || ""}
                                checked={userSettings?.isUserNameUpdateEnabled}
                                onChange={(e: any) => handleUserChange(e.target.checked, "isUserNameUpdateEnabled")}
                                dataTestId="allow-user-change-username"
                            ></RdsCheckbox>
                            <small className="text-secondary-50">{t("AbpIdentity.Description:Abp.Identity.SignIn.EnablePhoneNumberConfirmation" || "")}</small>
                        </div>
                    </div>
                </form>
            </div>

            <div className="mt-xxl-4 mb-xxl-0 mb-xl-0 mb-lg-0 mb-md-0 pb-4 fixed-bottem d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons mt-xl-4 mt-lg-4 mt-md-4 mt-0 pt-2 col-xxl-4 col-xl-4 col-lg-6 col-12 position-absolute">
                <RdsButton
                    label={t("AbpUi.Save") || ""}
                    type="submit"
                    colorVariant="primary"
                    size="small"
                    dataTestId="save"
                    onClick={() => { props.onIdentitySettingsSubmit({ lockout: lockoutSettings, user: userSettings, signIn: signSettings, password: passwordSettings }); }}
                ></RdsButton>
            </div>
        </div>
    );
};

export default RdsCompIdentityManagement;
