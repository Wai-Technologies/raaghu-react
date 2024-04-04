import { useState } from "react";
import { RdsInput, RdsButton } from "../rds-elements";
import React from "react";
import "./rds-comp-profile-edit.css";
import { useTranslation } from "react-i18next";
export interface RdsCompProfileEditProps {
    onForgotPassword?: (email?: string) => void;
}

const RdsCompProfileEdit = (props: RdsCompProfileEditProps) => {
    const [enteredName, setEnteredName] = useState("");
    const [isNameTouched, setIsNameTouched] = useState(false);
    const isNameEmpty = enteredName.trim() === "";
    const isNameEmptyAndTouched = isNameTouched && isNameEmpty;
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const [enteredEmail, setEnteredEmail] = useState("");
    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const isEnteredEmailEmpty = enteredEmail.trim() === "";
    const isEnteredEmailInvalid =
        !emailRegex.test(enteredEmail) && !isEnteredEmailEmpty;
    const isEnteredEmailEmptyAndTouched = isEmailTouched && isEnteredEmailEmpty;
    const isEmailInputInvalid = isEnteredEmailInvalid && isEnteredEmailEmpty;
    const phoneNumber = /^\d{10}$/;
    const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
    const [isPhoneNumberTouched, setIsPhoneNumberTouched] = useState(false);
    const isEnteredPhoneNumberEmpty = enteredPhoneNumber.trim() === "";
    const isEnteredPhoneNumberInvalid =
        !enteredPhoneNumber.match(phoneNumber) && !isEnteredPhoneNumberEmpty;
    const isPhoneNumberEmptyAndTouched =
        isPhoneNumberTouched && isEnteredPhoneNumberEmpty;
    const isPhoneNumberInputInvalid =
        isEnteredPhoneNumberInvalid && isEnteredPhoneNumberInvalid;
    const [enteredUserName, setEnteredUserName] = useState("");
    const [isUserNameTouched, setIsUserNameTouched] = useState(false);
    const isUserNameEmpty = enteredUserName.trim() === "";
    const isUserNameEmptyAndTouched = isUserNameTouched && isUserNameEmpty;
    const formSubmitHandler: any = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    return (
        <div>
            <div className="tab-content py-4">
                <form onSubmit={formSubmitHandler}>
                    <div className="custom-content-scroll">
                    <div className="row align-items-center">
                        <div className="col-md-3 text-center cursor-pointer sm-p-0">
                            <img src='./raaghu-components/src/rds-comp-profile-edit/edit-pic.png' />
                             <input type="file" accept="image/*" className="d-none" />
                        </div>
                        <div className="col-md-9 sm-p-0">
                            <div className="form-group mb-3">
                                <RdsInput
                                    inputType="text"
                                    required={true}
                                    label="Name"
                                    name="name"
                                    id="name"
                                    placeholder="Enter Name"
                                    onBlur={() => setIsNameTouched(true)}
                                    onChange={(e) => setEnteredName(e.target.value)}
                                    dataTestId="name"
                                ></RdsInput>
                                {isNameEmptyAndTouched && (
                                    <span className="red-color-error">
                                        Tenancy Name must not be empty
                                    </span>
                                )}
                                <div className="form-control-feedback"></div>
                            </div>
                            <div className="form-group mb-3">
                                <RdsInput
                                    required={true}
                                    inputType="email"
                                    label="Email Address"
                                    placeholder="Enter Email Address"
                                    name="email"
                                    id="email"
                                    onBlur={() => setIsEmailTouched(true)}
                                    onChange={(e) => setEnteredEmail(e.target.value)}
                                    dataTestId="email"
                                ></RdsInput>
                                {isEnteredEmailEmptyAndTouched && (
                                    <span className="red-color-error">
                                        Email must not be empty
                                    </span>
                                )}
                                {isEnteredEmailInvalid && (
                                    <span className="red-color-error">
                                        Entered Email is Invalid
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-lg-6 col-md-6 ">
                            <div className="mb-3">
                                <RdsInput
                                    placeholder="Enter Phone Nunber"
                                    inputType="number"
                                    label="Phone Number"
                                    name="phone"
                                    id="phone"
                                    
                                    required={true}
                                    onBlur={() => setIsPhoneNumberTouched(true)}
                                    onChange={(e) => setEnteredPhoneNumber(e.target.value)}
                                    dataTestId="phone-number"
                                ></RdsInput>
                                {isPhoneNumberEmptyAndTouched && (
                                    <span className="red-color-error">
                                        Phone Number must not be empty
                                    </span>
                                )}
                                {isEnteredPhoneNumberInvalid && (
                                    <span className="red-color-error">
                                        Entered Phone Number is Invalid
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="mb-2">
                                <RdsInput
                                    placeholder="Enter Username"
                                    inputType="text"
                                    label="User Name"
                                    name="userName"
                                    id="username"
                                   
                                    required={true}
                                    onBlur={() => setIsUserNameTouched(true)}
                                    onChange={(e) => setEnteredUserName(e.target.value)}
                                    dataTestId="username"
                                ></RdsInput>
                                {isUserNameEmptyAndTouched && (
                                    <span className="red-color-error">
                                        Username must not be empty
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                        <RdsButton
                            label="Cancel"
                            type="button"
                            isOutline={true}
                            colorVariant="primary"
                            size="small"
                            dataTestId="cancel"
                        ></RdsButton>
                        <RdsButton

                            label="Save"
                            type="submit"
                            isOutline={false}
                            colorVariant="primary"
                            size="small"
                            dataTestId="save"
                        ></RdsButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RdsCompProfileEdit;
