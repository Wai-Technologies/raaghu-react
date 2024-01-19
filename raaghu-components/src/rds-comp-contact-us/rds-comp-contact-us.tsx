import React, { useState } from "react";
import { RdsButton, RdsInput, RdsTextArea } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompContactUsProps {

}

const RdsCompContactUs = (props: RdsCompContactUsProps) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [fullname, setFullname] = useState("");
    const [error1, setError1] = useState("");
    const [error2, setError2] = useState("");
    const [error3, setError3] = useState("");

    const isEmailValid = (email: any) => {
        if (!email || email.length === 0) {
            return false;
        }
        else if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))) {
            return false;
        }

        return true;
    };
    const isFullnameValid = (fullname: any) => {
        if (!fullname || fullname.length === 0) {
            return false;
        }
        return true;
    };
    const isMessageValid = (fullname: any) => {
        if (!fullname || fullname.length === 0) {
            return false;
        }
        return true;
    };
    const emailhandleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        if (!isEmailValid(event.target.value)) {
            setError1("Email is invalid");
        } else {
            setError1("");
        }
        setEmail(event.target.value);
    };
    const fullnamehandleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        if (!isFullnameValid(event.target.value)) {
            setError2("fullname is invalid");
        } else {
            setError2("");
        }
        setFullname(event.target.value);
    };
    const messagehandleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        if (!isMessageValid(event.target.value)) {
            setError3("Message is invalid");
        } else {
            setError3("");
        }
        setMessage(event.target.value);
    };
    const isFormValid = isFullnameValid(fullname) && isEmailValid(email) && isMessageValid(message);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEmail("");
        setFullname("");
        setMessage(" ");
    };
    const { t } = useTranslation();
    return (
        <>
            <div >

                <form onSubmit={handleSubmit}>
                    <div className="mt-1 mb-3">
                        <RdsInput
                            label='Email ID'
                            required={true}
                            placeholder='name@gmail.com'
                            inputType='email'
                            onChange={emailhandleChange}
                            dataTestId="email"
                            value={email}
                            name={"email"}
                        ></RdsInput>
                        {error1 && <span className="text-danger">{error1}</span>}
                    </div>

                    <div className=" mb-3">
                        <RdsInput
                            label='Full Name'
                            required={true}
                            placeholder='Full Name'
                            inputType='text'
                            dataTestId="fullname"
                            onChange={fullnamehandleChange}
                            name={"fullname"}
                            value={fullname}
                        ></RdsInput>
                        {error2 && <span className="text-danger">{error2}</span>}
                    </div>
                    <div className=" mb-4">
                        <RdsTextArea
                            label='Message'
                            placeholder='Message'
                            onChange={messagehandleChange}
                            rows={3}
                            value={message}
                            dataTestId="message"
                        />
                        {error3 && <span className="text-danger">{error3}</span>}
                    </div>

                    <RdsButton
                        label={t("Send Message") || ""}
                        colorVariant='primary'
                        isDisabled={!isFormValid}
                        block={true}
                        tooltipTitle={""}
                        type="submit"
                    />
                </form>
            </div>
        </>
    );
};
export default RdsCompContactUs;
