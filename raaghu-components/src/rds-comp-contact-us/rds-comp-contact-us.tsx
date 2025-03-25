import React, { useEffect, useState } from "react";
import { RdsButton, RdsInput, RdsTextArea } from "../rds-elements";

export interface RdsCompContactUsProps {
    contactus: any;
    reset?: boolean;
    onSaveHandler?: (data: any) => void;
}

const RdsCompContactUs = (props: RdsCompContactUsProps) => {
    const [formData, setFormData] = useState(props.contactus);
    const [inputReset, setInputReset] = useState(false);
    const [errorEmail, setErrorForEmail] = useState("");
    const [errorFullName, setErrorForFullName] = useState("");
    const [errorMessage, setErrorForMessage] = useState("");

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
        const isMessageValid = (message: any) => {
            if (!message || message.length === 0) {
                return false;
            }
            return true;
        };
        useEffect(() => {
            setFormData(props.contactus);
        }, [props.contactus]);

        useEffect(() => {
            setInputReset(!inputReset);
        }, [props.reset]);
        
const isFormValid = isFullnameValid(formData?.fullname) && isEmailValid(formData?.email) && isMessageValid(formData?.message);
    

const emailhandleChange = (value: any, key: string) => {
    setFormData({ ...formData, [key]: value });
    if (value.trim() === "") {
        setErrorForEmail("Email ID is required"); 
    } else if (!isEmailValid(value)) {
        setErrorForEmail("Email ID is invalid"); 
    } else {
        setErrorForEmail(""); 
    }
    
}

const fullnamehandleChange = (value: any, key: string) => {
    setFormData({ ...formData, [key]: value });
    if (value.trim() === "") {
        setErrorForFullName("");
    }
    else if (!isFullnameValid(value)) {
        setErrorForFullName("Fullname is invalid");
    } else {
        setErrorForFullName("");
    }
}

const messagehandleChange = (value: any, key: string) => {
    setFormData({ ...formData, [key]: value });
    if (!isMessageValid(value)) {
        setErrorForMessage("Message is required");
    } else {
        setErrorForMessage("");
    }
}

function emitSaveData(event: any) {
    event.preventDefault();
    props.onSaveHandler && props.onSaveHandler(formData);
    setInputReset(!inputReset);
    setFormData({
        email: "",
        fullname: "",
        message: "",
       
    })
}
    return (
        <>
            <div className="button-card-container" >

                <form >
                    <div className="mt-1 mb-3">
                        <RdsInput
                            name='Email ID'
                            label={true}
                            reset={inputReset}
                            required={true}
                            validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i}
                            validationMsg={errorEmail}
                            placeholder='name@gmail.com'
                            inputType='email'
                            onChange= {(e) =>{emailhandleChange(e.target.value , "email");}}
                            dataTestId="email"
                            value={formData?.email}
                           
                        ></RdsInput>
                    </div>

                    <div className=" mb-3">
                        <RdsInput
                            name='Full Name'
                            label={true}
                            reset={inputReset}
                            required={true}
                            placeholder='Full Name'
                            inputType='text'
                            dataTestId="fullname"
                            onChange= {(e) =>{fullnamehandleChange(e.target.value , "fullname");}}
                           
                            value={formData?.fullname}
                        ></RdsInput>
                    </div>
                    <div className=" mb-4">
                        <RdsTextArea
                            label='Message'
                            reset={inputReset}
                            placeholder='Message'
                            isMandatory={true}
                            onChange= {(e) =>{messagehandleChange(e.target.value , "message");}}
                            rows={3}
                            value={formData?.message}
                            dataTestId="message"
                        />
                    </div>

                    <div className="button-footer p-3">
                    <RdsButton
                        label="Send Message"
                        colorVariant='primary'
                        isDisabled={!isFormValid}
                        block={true}
                        tooltipTitle={""}
                        onClick={(e: any) => emitSaveData(e)}
                        type="submit"
                    />
                    </div>
                </form>
            </div>
        </>
    );
};
export default RdsCompContactUs;
