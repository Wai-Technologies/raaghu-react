import React, { useState, useEffect } from "react";
import { RdsButton, RdsCheckbox, RdsInput, } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompUserBasicsProps {
    userData?: any;
    onSaveHandler?: (data: any) => void;
    reset?: boolean;
}

const RdsCompUserBasics = (props: RdsCompUserBasicsProps) => {
    const [inputReset, setInputReset] = useState(props.reset)
    const [userData, setUserData] = useState(props.userData);

    useEffect(() => {
        setInputReset(props.reset)
    }, [props.reset])

    useEffect(() => {
        setUserData(props.userData);
    }, [props.userData]);

    const handleDataChange = (value: any, key: string) => {
        setUserData({ ...userData, [key]: value });
    };

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(userData);
        setInputReset(!inputReset);
        setUserData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            userName: "",
            phoneNumber: "",
            twoFactorEnabled: false,
            isActive: false,
            lockoutEnabled: false,
            shouldChangePasswordOnNextLogin: false
        });
    }
    const isFirstNameValid = (firstName: any) => {
        if (!firstName || firstName.length === 0) {
            return false;
        }
        return true;
    }
    const isLastNameValid = (lastName: any) => {
        if (!lastName || lastName.length === 0) {
            return false;
        }
        return true;
    }
    const isEmailValid = (email: any) => {
        if (!email || email.length === 0) {
            return false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            return false;
        } else return true;
    };
    const isPasswordValid = (password: any) => {
        if (!password || password.length === 0) {
            return false;
        }
        return true;
    }
    const isUsernameValid = (userName: any) => {
        if (!userName || userName.length === 0) {
            return false;
        }
        return true;
    }
    const isPhoneNumberValid = (phoneNumber: any) => {
        if (!phoneNumber || phoneNumber.length === 0) {
            return false;
        }
        return true;
    }
const isFormValid = isFirstNameValid(userData?.firstName) && isLastNameValid(userData?.lastName )&& isEmailValid(userData?.email) && isPasswordValid(userData?.password) && isUsernameValid(userData?.userName) && isPhoneNumberValid(userData?.phoneNumber);
    return (
        <>
            <form className="pt-3">
                <div className="custom-content-scroll">
                    <div className="flex-column-reverse flex-lg-row flex-md-row row">
                        <div className="col-lg-6 col-md-6">
                            <RdsInput
                                value={userData?.firstName}
                                placeholder="Enter First Name"
                                inputType="text"
                                name="First Name"
                                label={true}                              
                                required={true}
                                onChange={(e) => {
                                    handleDataChange(e.target.value, "firstName");
                                }}
                                reset={inputReset}
                            ></RdsInput>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <RdsInput
                                value={userData?.lastName}
                                placeholder="Enter Last Name"
                                inputType="text"
                                name="Last Name"
                                label={true}                               
                                required={true}
                                onChange={(e) => {
                                    handleDataChange(e.target.value, "lastName");
                                }}
                                reset={inputReset}
                            ></RdsInput>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="">
                                <RdsInput
                                    value={userData?.email}
                                    placeholder="Enter Email Address"
                                    inputType="email"
                                    name="Email Address"
                                    label={true}                                    
                                    required={true}
                                    onChange={(e) => {
                                        handleDataChange(e.target.value, "email");
                                    }}
                                    validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                                    validationMsg="Invalid Email Address."
                                    reset={inputReset}
                                    // validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                                    // validationMsg="Invalid Email Address."  
                                ></RdsInput>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="">
                                <RdsInput
                                    value={userData?.password}
                                    inputType="password"
                                    name="Password"
                                    label={true}
                                    placeholder="Enter Password"                                    
                                    required={true}
                                    onChange={(e) => {
                                        handleDataChange(e.target.value, "password");
                                    }}
                                    reset={inputReset}
                                    showIcon={true}
                                ></RdsInput>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div>
                                <RdsInput
                                    value={userData?.userName}
                                    placeholder="Enter Username"
                                    inputType="text"
                                    name="Username"
                                    label={true}                                    
                                    required={true}
                                    onChange={(e) => {
                                        handleDataChange(e.target.value, "userName");
                                    }}
                                    reset={inputReset}
                                ></RdsInput>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div>
                                <RdsInput
                                    value={userData?.phoneNumber}
                                    placeholder="Enter Phone Number"
                                    inputType="text"
                                    name="Phone Number"
                                    label={true}                                   
                                    required={true}
                                    onChange={(e) => {
                                        handleDataChange(e.target.value, "phoneNumber");
                                    }}

                                    onKeyDown={(e) => {
                                        const inputElement = e.target as HTMLInputElement;
                                        const currentLength = inputElement.value.length;
                                        const isPlusEntered = inputElement.value.startsWith('+');
                                        const maxLength = isPlusEntered ? 13 : 10;
                                        
                                        const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
                                        const isNumberOrPlus = /[0-9+]/.test(e.key);
                                
                                        if (!isNumberOrPlus && !allowedKeys.includes(e.key)) {
                                            e.preventDefault();
                                        }
                                
                                        if ((/[0-9]/.test(e.key) || e.key === '+') && (currentLength >= maxLength || (e.key === '+' && currentLength > 0))) {
                                            e.preventDefault();
                                        }
                                    }}

                                    reset={inputReset}
                                ></RdsInput>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="mb-2 ">
                            <RdsCheckbox
                                id="0"
                                labelText="Two Factor Authentication"
                                checked={userData?.twoFactorEnabled}
                                onChange={(e) => {
                                    handleDataChange(e.target.checked, "twoFactorEnabled");
                                }}
                            ></RdsCheckbox>
                        </div>
                    </div>
                    <div className="row pt-1">
                        <div className="mb-2 ">
                            <RdsCheckbox
                                id="0"
                                labelText="Active"
                                checked={userData?.isActive}
                                onChange={(e) => {
                                    handleDataChange(e.target.checked, "isActive");
                                }}
                            ></RdsCheckbox>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-2">
                            <RdsCheckbox
                                id="1"
                                labelText="Should Change Password On Next Login"
                                checked={userData?.shouldChangePasswordOnNextLogin}
                                onChange={(e) => {
                                    handleDataChange(e.target.checked, "shouldChangePasswordOnNextLogin");
                                }}
                            >
                            </RdsCheckbox>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-2">
                            <RdsCheckbox
                                id="0"
                                labelText="Account Lockout"
                                checked={userData?.lockoutEnabled}
                                onChange={(e) => {
                                    handleDataChange(e.target.checked, "lockoutEnabled");
                                }}
                            ></RdsCheckbox>
                        </div>
                    </div>
                </div>
                <div className="d-flex ps-4 flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
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
                        colorVariant="primary"
                        tooltipTitle={""}
                        type={"submit"}
                        databsdismiss="offcanvas"
                        dataTestId="save"
                        onClick={(e: any) => emitSaveData(e)}
                        isDisabled={!isFormValid}
                    ></RdsButton>
                </div>
            </form >
        </>
    );
};

export default RdsCompUserBasics;
