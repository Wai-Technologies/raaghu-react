import React, { useState, useEffect } from "react";
import { RdsButton, RdsCheckbox, RdsInput, RdsOffcanvas, RdsTextArea } from "../rds-elements";
import "./rds-comp-email.css";
import { useTranslation } from "react-i18next";

export interface RdsCompEmailProps {
    emailSettings: any;
    onEmailDataSubmit?: any;
    onTestEmailRequest?: any;
    sendTestEmailData: any;
    reset?: boolean;
}
const RdsCompEmail = (props: RdsCompEmailProps) => {
    const [formData, setFormData] = useState(props.emailSettings);
    const [sendTestEmailData, setSendTestEmailData] = useState(props.sendTestEmailData);
    const [inputReset, setInputReset] = useState(false);

    useEffect(() => {
        setFormData(props.emailSettings);
    }, [props.emailSettings]);

    useEffect(() => {
        setSendTestEmailData(props.sendTestEmailData);
    }, [props.sendTestEmailData]);

    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);

    const onSubmitSendTestMail = (value: any, key: any) => {
        setSendTestEmailData((prevData: any) => ({
            ...prevData,
            [key]: value,
        }));
    }

    const handleChangeform = (value: any, key: any) => {
        setFormData({ ...formData, [key]: value });
    }

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onEmailDataSubmit && props.onEmailDataSubmit(formData);
        setInputReset(!inputReset);
        setFormData({
            defaultFromDisplayName: "",
            defaultFromAddress: "",
            smtpHost: "",
            smtpPort: "",
            smtpEnableSsl: false,
            smtpUseDefaultCredentials: false,
            smtpDomain: "",
            smtpUserName: "",
            smtpPassword: ""
        })
    };

    function emitSubmitSendTestMail(event: any) {
        event.preventDefault();
        props.onTestEmailRequest && props.onTestEmailRequest(sendTestEmailData);
        setInputReset(!inputReset);
        setSendTestEmailData({
            senderEmailAddress: "",
            targetEmailAddress: "",
            subject: "",
            body: ""
        })

    }

    const condition = !formData?.smtpUseDefaultCredentials ? <>
        <div className="row px-2">
            <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 mb-3">
                <div className="form-group">
                    <RdsInput
                        fontWeight={"normal"}
                        value={formData?.smtpDomain}
                        name="displayName"
                        label="Domain"
                        required={false}
                        placeholder={"Enter Domain"}
                        customClasses="form-control"
                        onChange={(e: any) => handleChangeform(e.target.value, "smtpDomain")}
                        dataTestId="domain"
                    ></RdsInput>
                </div>
            </div>
        </div>
        <div className="row px-2">
            <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 mb-3">
                <RdsInput
                    fontWeight={"normal"}
                    value={formData?.smtpUserName}
                    name="displayName"
                    label={"User Name"}
                    required={false}
                    placeholder="Enter User Name"
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
                    label="Password"
                    required={false}
                    placeholder={"Enter Password"}
                    inputType="password"
                    customClasses="form-control"
                    onChange={(e: any) => handleChangeform(e.target.value, "smtpPassword")}
                    dataTestId="password"
                    showIcon={false}
                ></RdsInput>
            </div>
        </div>

    </> : <></>;

    return (
        <div className="pt-3">
            <div className="overflow-x-hidden overflow-y-auto card-custom-scroll">
                <form>
                    <div className="row px-2">
                        <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                            <div className="form-group">
                                <RdsInput
                                    fontWeight={"normal"}
                                    value={formData?.defaultFromDisplayName}
                                    name="displayName"
                                    required={true}
                                    label="Default From Display Name"
                                    placeholder="Display Name"
                                    customClasses="form-control"
                                    onChange={(e: any) => handleChangeform(e.target.value, "defaultFromDisplayName")}
                                    dataTestId="sender-display-name"
                                    reset={inputReset}
                                ></RdsInput>

                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-6 col-12">
                            <RdsInput
                                fontWeight={"normal"}
                                placeholder="Email Address"
                                customClasses="form-control"
                                inputType="text"
                                label="Default From Address"
                                name="email"
                                required={true}
                                value={formData?.defaultFromAddress}
                                onChange={(e: any) => handleChangeform(e.target.value, "defaultFromAddress")}
                                dataTestId="sender-email"
                                reset={inputReset}
                            ></RdsInput>
                        </div>
                        <div className="offset-xxl-4 offset-xl-4 offset-lg-4"></div>
                    </div>

                    <div className="row px-2">
                        <div className="col-xxl-4 col-xl-4 col-lg-6 col-12 mb-3">
                            <div className="form-group">
                                <RdsInput
                                    fontWeight={"normal"}
                                    value={formData?.smtpHost}
                                    name="smtpHost"
                                    label="Host"
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
                                label="Port"
                                required={false}
                                customClasses="form-control"
                                onChange={(e: any) => handleChangeform(e.target.value, "smtpPort")}
                                dataTestId="smtp-port"
                            ></RdsInput>
                        </div>
                    </div>
                    <div className="row px-2">
                        <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <RdsCheckbox label="Enable Ssl" onChange={(e: any) => { handleChangeform(e.target.checked, "smtpEnableSsl"); }} checked={formData?.smtpEnableSsl} dataTestId="use-ssl"></RdsCheckbox>
                        </div>
                    </div>

                    <div className="row px-2">
                        <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <RdsCheckbox
                                label="Smtp Use Default Credentials"
                                onChange={(e: any) => { handleChangeform(e.target.checked, "smtpUseDefaultCredentials"); }}
                                checked={formData?.smtpUseDefaultCredentials}
                                dataTestId="use-default-credential"
                            ></RdsCheckbox>
                        </div>
                    </div>
                    {condition}
                </form>
            </div>
            <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                <div>
                    <RdsButton
                        label="Save"
                        type="submit"
                        colorVariant="primary"
                        size="small"
                        dataTestId="save"
                        onClick={(e: any) => emitSaveData(e)}
                    ></RdsButton>
                </div>
                <div>
                    <RdsOffcanvas
                        canvasTitle="Send Test Email"
                        placement="end"
                        offcanvasbutton={
                            <RdsButton
                                size="small"
                                type="button"
                                block={false}
                                showLoadingSpinner={false}
                                colorVariant="primary"
                                label="Send Test Email"
                            />
                        }
                        backDrop={true}
                        scrolling={false}
                        preventEscapeKey={false}
                        offId={"Edition"}
                    >
                        <div>
                            <div className="pt-3">
                                <form>
                                    <div className="row">
                                        <div className="col-6">
                                            <RdsInput
                                                id=""
                                                inputType="text"
                                                label="Sender email address"
                                                labelPosition="top"
                                                placeholder="Enter sender email address"
                                                reset={inputReset}
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
                                                placeholder="Enter target email address"
                                                reset={inputReset}
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
                                                placeholder="Subject"
                                                reset={inputReset}
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
                                                label="Short Description"
                                                placeholder="Enter Description"
                                                value={sendTestEmailData?.body}
                                                rows={3}
                                                dataTestId='email-body'
                                                onChange={(e: any) => onSubmitSendTestMail(e.target.value, "body")}
                                            />
                                        </div>
                                    </div>
                                </form>
                                <div className="mt-5 d-flex gap-3 ">
                                    <RdsButton
                                        label="Cancel"
                                        databsdismiss="offcanvas"
                                        type={"button"}
                                        size="small"
                                        isOutline={true}
                                        colorVariant="primary"
                                        class="me-2"
                                    ></RdsButton>
                                    <RdsButton
                                        label="Save"
                                        type={"button"}
                                        size="small"
                                        showLoadingSpinner={true}
                                        databsdismiss="offcanvas"
                                        colorVariant="primary"
                                        class="me-2"
                                        onClick={(e: any) => emitSubmitSendTestMail(e)}
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