import { useEffect, useState } from "react";
import { RdsInput, RdsButton, RdsDropdownList, RdsLabel } from "../rds-elements";
import React from "react";
import { useTranslation } from "react-i18next";
export interface RdsForgotPasswordProps {
    onForgotPassword?: (email?: string) => void;
    onResend: (isForgotPasswordClicked?: boolean) => void;
    onLogin: (isLoginClicked?: boolean) => void;
    languageData: any;
    languageLabel?: string;
    registerFields: any;
}

const RdsCompForgotPassword = (props: RdsForgotPasswordProps) => {
    const [showmailsuccess, setShowMailSuccess] = useState(false);
    const [isLoginClicked, setIsLoginClicked] = useState(false);
   const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState(false);
    const [isResendClicked, setIsResendClicked] = useState(false);
   const [registerData, setRegisterData] = useState(props.registerFields );


    const isEmailValid = (email: any) => {
        if (!email || email.length === 0) {

            return false;
        }
        return true;
    };

    const loginHandler: any = (isLoginClicked: boolean) => {
        setIsLoginClicked(true);
        props.onLogin(true);
    };

    useEffect(() => {
        setRegisterData(props.registerFields);
    } , [props.registerFields]);
   
    const handleDataChanges = (value: any, key: string) => {
        setRegisterData({ ...registerData, [key]: value });
    };

    const resendHandler: any = (isForgotPasswordClicked: boolean) => {
        setIsResendClicked(true);
    };
    const [currentLanguageIcon, setCurrentLanguageIcon] = useState("en");

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onForgotPassword && props.onForgotPassword(registerData);
        setRegisterData({
            email: ""
        });
        setShowMailSuccess(true);
    }
    return (
        <div>
            <div className="text-center">
                {!showmailsuccess && (
                    <div>
                    <div className="container">
                    <div className="row align-items-center mb-1">
                        <div className="col-12 col-md-11 text-md-end mb-3">
                        <h2 className="mb-0 text-center">
                            Forgot Password
                        </h2>
                        </div>
                        <div className="col-12 col-md-1 mb-3">
                        <RdsDropdownList
                            labelIcon={currentLanguageIcon}
                            labelIconWidth="18px"
                            labelIconHeight="18px"
                            borderDropdown={false}
                            isPlaceholder
                            listItems={props.languageData}
                            placeholder="Select Language"
                            icon="en"
                            id={"langDrop"}
                            block={false}
                            iconFill={false}
                            iconStroke={false}
                            showIcon={false}
                        />
                        </div>
                    </div>
                    </div>
                        <div className="fs-6"><RdsLabel label="A password reset link will be sent to your email to reset your password. If you don't get an email in a few minutes, please re-try." size="13px"></RdsLabel></div>
                        <div className="mt-4">

                            <form>
                                <div className="form-group mb-3 text-start">
                                    <RdsInput
                                        size="medium"
                                        label="Email"
                                        inputType="email"
                                        isDisabled={false}
                                        readonly={false}
                                        placeholder="Enter Email"                            
                                       onChange={(e) => {
                                        handleDataChanges(e.target.value, "email");
                                      }}
                                      value={registerData?.email}
                                        required={false}
                                        dataTestId="email"
                                        validatonPattern={
                                            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                            }
                                        validationMsg="Please Enter Valid Email Address."
                                    ></RdsInput>

                                </div>
                                <br />
                                <div className="mb-2">
                                    <RdsButton
                                        class="d-grid mb-3"
                                        label="Submit"
                                        block
                                        size="medium"
                                        colorVariant="primary"
                                        tooltipTitle={""}
                                        onClick={(e: any) => emitSaveData(e)}
                                        showLoadingSpinner={true}
                                        type={"submit"}
                                        dataTestId="submit"
                                    ></RdsButton>

                                </div>
                                <div className="row d-flex justify-content-between mt-4">
                                    <div className="col-md-12">
                                        <div>
                                            Remember Password?
                                            {/* <a href={"/"} className="link-primary text-decoration-none px-1">
                                            Login
                                                </a> */}
                                            <a
                                                className="link-primary text-decoration-none ps-2"
                                                href="javascript:void(0)"
                                               onClick={() => loginHandler(isLoginClicked)}
                                                data-testid="login"
                                            >Login
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {showmailsuccess && (
                    <div className="container">
                        <img
                            src="https://www.nicepng.com/png/full/362-3624869_success-image-png.png"
                            className="mt-4 mb-4 w-25"
                            alt="img"
                        />
                        <h3 className="pb-3">Email has been sent!</h3>
                        <div>
                            Please check your inbox and click in the received link to reset a password
                        </div>
                        <br />
                        <div>
                            {"Didn't receive the link" || ""} ?
                            <a
                                className="link-primary text-decoration-none px-1"
                                href="javascript:void(0)"
                                onClick={resendHandler}
                                data-testid="resend-link"
                            >
                                {"Resend"}
                            </a>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RdsCompForgotPassword;
