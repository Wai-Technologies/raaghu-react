import { useTranslation } from "react-i18next";
import { RdsButton, RdsInput, RdsLabel, RdsTextEditor } from "../rds-elements";
import React, { useEffect, useState } from "react";

export interface RdsCompFormsEmailProps {
    formsEmailData?: any;
    handleSubmit: React.EventHandler<any>;
}

const RdsCompFormsEmail = (props: RdsCompFormsEmailProps) => {
    const { t } = useTranslation();
    const [emailData, setEmailData] = useState<any>(props.formsEmailData);
    function setTo(value: any) {
        setEmailData({ ...emailData, to: value });
    }
    function setSubject(value: any) {
        setEmailData({ ...emailData, subject: value });
    }
    function setBody(value: any) {
        setEmailData({ ...emailData, body: value });
    }
    const isEmailValid = (email: any) => {
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if (!emailData?.to || !emailPattern.test(emailData?.to)) {
            return false;
        }
        return true;
    };
    const isFormValid = isEmailValid(emailData?.to);

    useEffect(() => {
        setEmailData(props.formsEmailData);
    }, [props.formsEmailData]);
    return (
        <>
            <div className="ps-2 mt-3">
                <RdsInput required={true} inputType="email" placeholder="Enter email" label={t("Forms.To") || ""} value={emailData?.to} onChange={(e) => setTo(e.target.value)} dataTestId="email"></RdsInput>
                <RdsInput label={t("Forms.Subject") || ""} placeholder="Enter Subject" value={emailData?.subject} onChange={(e) => setSubject(e.target.value)} dataTestId="subject"></RdsInput>
                <div className="pt-3 mb-3">
                    <RdsLabel>{t("Forms.Body") || ""}</RdsLabel>
                    <RdsTextEditor value={emailData?.body} onChange={(e) => setBody(e)} placeholder={""} ></RdsTextEditor >
                </div>
                <div className="gap-2 justify-content-end d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row">
                    <RdsButton
                        label={t("AbpUi.Cancel") || ""}
                        type="button"
                        colorVariant="primary"
                        size="small"
                        databsdismiss="offcanvas"
                        isOutline={true}
                    ></RdsButton>
                    <RdsButton
                        label={t("Forms.Send") || ""}
                        type="button"
                        size="small"
                        class="ms-2"
                        colorVariant="primary"
                        databsdismiss="offcanvas"
                        onClick={() => props.handleSubmit(emailData)}
                        isDisabled={!isFormValid}
                        dataTestId="send"
                    ></RdsButton>
                </div>
            </div>
        </>
    );
};
export default RdsCompFormsEmail;
