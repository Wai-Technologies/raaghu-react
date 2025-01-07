import { useTranslation } from "react-i18next";
import { RdsButton, RdsInput, RdsLabel, RdsTextEditor } from "../rds-elements";
import React, { useEffect, useState } from "react";

export interface RdsCompFormsEmailProps {
    formsEmailData?: any;
    reset?: boolean;
    onDataSendHandler?: (data: any) => void;
}
const RdsCompFormsEmail = (props: RdsCompFormsEmailProps) => {
    const [emailData, setEmailData] = useState(props.formsEmailData);
    const [inputReset, setInputReset] = useState(false);

    useEffect(() => {
        setEmailData(props.formsEmailData);
    }, [props.formsEmailData]);

    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);

    const handleDataChanges = (value: any, key: string) => {
        setEmailData((prevState: any) => ({ ...prevState, [key]: value }));
    };

    const isEmailValid = (email: any) => {
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if (!email || !emailPattern.test(email)) {
            return false;
        }
        return true;
    };
    const isFormValid = isEmailValid(emailData?.to);

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onDataSendHandler && props.onDataSendHandler(emailData);
        setInputReset(!inputReset);
        setEmailData({
            to: "",
            subject: "",
            body: ""
        });
    }

    return (
        <>
            <div className="ps-2 mt-3 custom-content-scroll">
                <RdsInput
                    required
                    reset={inputReset}
                    inputType="email"
                    placeholder="Enter email"
                    label="To"
                    onChange={(e) => handleDataChanges(e.target.value, "to")}
                    value={emailData?.to}
                    dataTestId="email">
                </RdsInput>
                <RdsInput
                    label="Subject"
                    reset={inputReset}
                    placeholder="Enter Subject"
                    onChange={(e) => handleDataChanges(e.target.value, "subject")}
                    value={emailData?.subject}
                    dataTestId="subject">
                </RdsInput>
                <div className="pt-3 mb-3">
                    <RdsLabel>Body</RdsLabel>
                    <RdsTextEditor onChange={(e) => handleDataChanges(e, "body")} value={emailData?.body} ></RdsTextEditor >
                </div>
                <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
                    <RdsButton
                        label="Cancel"
                        type="button"
                        colorVariant="primary"
                        size="small"
                        databsdismiss="offcanvas"
                        isOutline={true}
                    ></RdsButton>
                    <RdsButton
                        label="Send"
                        type="button"
                        size="small"
                        class="ms-2"
                        colorVariant="primary"
                        databsdismiss="offcanvas"
                        isDisabled={!isFormValid}
                        dataTestId="send"
                        onClick={(e: any) => emitSaveData(e)}
                    ></RdsButton>
                </div>
            </div>
        </>
    );
};
export default RdsCompFormsEmail;
