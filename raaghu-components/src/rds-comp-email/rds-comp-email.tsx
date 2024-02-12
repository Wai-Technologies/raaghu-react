import React, { useState, useEffect } from "react";
import { RdsButton, RdsCheckbox, RdsInput, RdsOffcanvas, RdsTextArea } from "../rds-elements";
import "./rds-comp-email.css";
import { useTranslation } from "react-i18next";

export interface RdsCompEmailProps {
    emailSettings: any;
    onEmailDataSubmit?: any;
    onTestEmailRequest?: any;
    sendTestEmailData: any;
}
const RdsCompEmail = (props: RdsCompEmailProps) => {
    const [formData, setFormData] = useState(props.emailSettings);
    const [sendTestEmailData, setSendTestEmailData] = useState(props.sendTestEmailData);
    const { t } = useTranslation();

    useEffect(() => {
        setFormData(props.emailSettings);
    }, [props.emailSettings]);

    useEffect(() => {
        setSendTestEmailData(props.sendTestEmailData);
    }, [props.sendTestEmailData]);

    const onEmailDataSubmit = (event: any) => {
        event.preventDefault();
    };

    const onTestEmailRequest = (event: any) => {
        event.preventDefault();
    }

    const onSubmitSendTestMail = (value: any, key: any) => {
        setSendTestEmailData((prevData: any) => ({
            ...prevData,
            [key]: value,
        }));
    }

    const handleChangeform = (value: any, key: any) => {
        setFormData({ ...formData, [key]: value });
    }

    const condition = !formData?.smtpUseDefaultCredentials ? <>
        <div className="row">
            <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 mb-3">
                <div className="form-group">
                    <RdsInput
                        fontWeight={"normal"}
                        value={formData?.smtpDomain}
                        name="displayName"
                        label={t("AbpEmailing.DisplayName:Abp.Mailing.Smtp.Domain") || ""}
                        required={false}
                        placeholder={t("Enter Domain") || ""}
                        customClasses="form-control"
                        onChange={(e: any) => handleChangeform(e.target.value, "smtpDomain")}
                        dataTestId="domain"
                    ></RdsInput>
                </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 mb-3">
                <RdsInput
                    fontWeight={"normal"}
                    value={formData?.smtpUserName}
                    name="displayName"
                    label={t("AbpEmailing.DisplayName:Abp.Mailing.Smtp.UserName") || ""}
                    required={false}
                    placeholder={t("Enter User Name") || ""}
                    customClasses="form-control"
                    onChange={(e: any) => handleChangeform(e.target.value, "smtpUserName")}
                    dataTestId="user-name"
                ></RdsInput>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                <RdsInput
                    fontWeight={"normal"}
                    value={formData?.smtpPassword}
                    name="displayName"
                    label={t("AbpEmailing.DisplayName:Abp.Mailing.Smtp.Password") || ""}
                    required={false}
                    placeholder={t("Enter Password") || ""}
                    inputType="password"
                    customClasses="form-control"
                    onChange={(e: any) => handleChangeform(e.target.value, "smtpPassword")}
                    dataTestId="password"
                    showIcon= {false}
                ></RdsInput>
            </div>
        </div>

    </> : <></>;


    return (
        <div className="pt-3">
            <div className="overflow-x-hidden overflow-y-auto card-custom-scroll">
                <form onSubmit={onEmailDataSubmit}>
                    <div className="row">
                        <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                            <div className="form-group">
                                <RdsInput
                                    fontWeight={"normal"}
                                    value={formData?.defaultFromDisplayName}
                                    name="displayName"
                                    required={true}
                                    label={t("AbpSettingManagement.DefaultFromDisplayName") || ""}
                                    placeholder={t("Display Name") || ""}
                                    customClasses="form-control"
                                    onChange={(e: any) => handleChangeform(e.target.value, "defaultFromAddress")}
                                    dataTestId="sender-display-name"
                                ></RdsInput>

                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                            <RdsInput
                                fontWeight={"normal"}
                                placeholder={t("Email Address") || ""}
                                customClasses="form-control"
                                inputType="text"
                                label={t("AbpSettingManagement.DefaultFromAddress") || ""}
                                name="email"
                                required={true}
                                value={formData?.defaultFromAddress}
                                onChange={(e: any) => handleChangeform(e.target.value, "defaultFromDisplayName")}
                                dataTestId="sender-email"
                            ></RdsInput>
                        </div>
                        <div className="offset-xxl-4 offset-xl-4 offset-lg-4"></div>
                    </div>

                    <div className="row">
                        <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 mb-3">
                            <div className="form-group">
                                <RdsInput
                                    fontWeight={"normal"}
                                    value={formData?.smtpHost}
                                    name="smtpHost"
                                    label={t("AbpEmailing.DisplayName:Abp.Mailing.Smtp.Host") || ""}
                                    placeholder="127.0.0.1"
                                    required={false}
                                    customClasses="form-control"
                                    onChange={(e: any) => handleChangeform(e.target.value, "smtpHost")}
                                    dataTestId="smtp-host"
                                ></RdsInput>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 mb-3">
                            <RdsInput
                                fontWeight={"normal"}
                                value={formData?.smtpPort}
                                name="smtpPort"
                                placeholder="25"
                                label={t("AbpEmailing.DisplayName:Abp.Mailing.Smtp.Port") || ""}
                                required={false}
                                customClasses="form-control"
                                onChange={(e: any) => handleChangeform(e.target.value, "smtpPort")}
                                dataTestId="smtp-port"
                            ></RdsInput>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <RdsCheckbox label={t("AbpEmailing.DisplayName:Abp.Mailing.Smtp.EnableSsl") || ""} onChange={(e: any) => { handleChangeform(e.target.checked, "smtpEnableSsl"); }} checked={formData?.smtpEnableSsl} dataTestId="use-ssl"></RdsCheckbox>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <RdsCheckbox
                                label={t("AbpSettingManagement.SmtpUseDefaultCredentials") || ""}
                                onChange={(e: any) => { handleChangeform(e.target.checked, "smtpUseDefaultCredentials"); }}
                                checked={formData?.smtpUseDefaultCredentials}
                                dataTestId="use-default-credential"
                            ></RdsCheckbox>
                        </div>
                    </div>
                    {condition}
                </form>
            </div>
            <div className="bg-transparent d-flex footer-buttons gap-3 mb-2 mb-md-2 pb-4 pb-md-4">
                <div>
                    <RdsButton
                        label={t("AbpUi.Save") || ""}
                        type="submit"
                        colorVariant="primary"
                        size="small"
                        dataTestId="save"
                        onClick={() => { props.onEmailDataSubmit(formData); }}
                    ></RdsButton>
                </div>
                <div>
                    <RdsOffcanvas
                        canvasTitle={t("AbpSettingManagement.SendTestEmail")}
                        placement="end"
                        offcanvasbutton={
                            <RdsButton
                                size="small"
                                type="button"
                                block={false}
                                showLoadingSpinner={false}
                                colorVariant="primary"
                                label={t("AbpSettingManagement.SendTestEmail") || ""}
                            />
                        }
                        backDrop={true}
                        scrolling={false}
                        preventEscapeKey={false}
                        offId={"Edition"}
                    >
                        <div>
                            <div className="pt-3">
                                <form onSubmit={onTestEmailRequest}>
                                    <div className="row">
                                        <div className="col-6">
                                            <RdsInput
                                                id=""
                                                inputType="text"
                                                label="Sender email address"
                                                labelPosition="top"
                                                placeholder="Add Placeholder"
                                                required={true}
                                                size="medium"
                                                value={sendTestEmailData?.senderEmailAddress}
                                                onChange={(e: any) => onSubmitSendTestMail(e.target.value, "senderEmailAddress")}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <RdsInput
                                                id=""
                                                inputType="text"
                                                label="Target email address"
                                                labelPosition="top"
                                                placeholder="Add Placeholder"
                                                required={true}
                                                size="medium"
                                                value={sendTestEmailData?.targetEmailAddress}
                                                onChange={(e: any) => onSubmitSendTestMail(e.target.value, "targetEmailAddress")}
                                            />
                                        </div>
                                    </div>
                                    <div className="row pt-2">
                                        <div className="col-12">
                                            <RdsInput
                                                id=""
                                                inputType="text"
                                                label="Subject"
                                                labelPosition="top"
                                                placeholder="Add Placeholder"
                                                required={true}
                                                size="medium"
                                                value={sendTestEmailData?.subject}
                                                onChange={(e: any) => onSubmitSendTestMail(e.target.value, "subject")}
                                            />
                                        </div>
                                    </div>
                                    <div className="row pt-2">
                                        <div className="col-12">
                                            <RdsTextArea
                                                label={t("CmsKit.ShortDescription") || ""}
                                                placeholder={t("Enter Description") || ""}
                                                value={sendTestEmailData?.body}
                                                rows={3}
                                                dataTestId='email-body'
                                                onChange={(e: any) => onSubmitSendTestMail(e.target.value, "body")}
                                            />
                                        </div>
                                    </div>
                                </form>
                                <div className="d-flex pb-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row footer-buttons gap-2">
                                    <RdsButton
                                        label={t("AbpUi.Cancel") || ""}
                                        databsdismiss="offcanvas"
                                        type={"button"}
                                        size="small"
                                        isOutline={true}
                                        colorVariant="primary"
                                        class="me-2"
                                    ></RdsButton>
                                    <RdsButton
                                        label={t("AbpUi.Save") || ""}
                                        type={"button"}
                                        size="small"
                                        showLoadingSpinner={true}
                                        databsdismiss="offcanvas"
                                        colorVariant="primary"
                                        class="me-2"
                                        onClick={() => { props.onTestEmailRequest(sendTestEmailData); }}
                                    ></RdsButton>
                                </div>
                            </div>
                        </div>
                    </RdsOffcanvas>
                </div >
            </div >
        </div >
    );
};

export default RdsCompEmail;