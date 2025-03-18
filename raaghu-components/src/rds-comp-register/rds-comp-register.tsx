import React, { useEffect, useState } from "react";
import {
    RdsLabel,
    RdsButton,
    RdsInput,
    RdsCheckbox, RdsIcon,
    RdsModal, RdsDropdownList
} from "../rds-elements";

export interface RdsCompRegisterProps {
    error?: any;
    getvalidTenantName: string;
    emailAddress: string;
    password: string;
    userName: string;
    appName: string;
    onDismissAlert?: () => any;
    onLogin: (isLoginClicked?: boolean) => void;
    onRegister: (emailAddress: string, password: string, userName: string, appName: string, returnUrl?: string) => void;
    currentTenant: any;
    validTenant: any;
    onSaveHandler?: (data: any) => void;
    languageData: any;
    onClickHandler?: ($event: React.MouseEvent<HTMLLIElement>, val: string) => void;
    languageLabel?: string;
    registerFields: any;
}

const RdsCompRegister = (props: RdsCompRegisterProps) => {
    const [registerData, setRegisterData] = useState(props.registerFields );
    const [isLoginClicked, setIsLoginClicked] = useState(false);
    
    const [currentLanguageIcon, setCurrentLanguageIcon] = useState("en");
    const [currentLanguageLabel, setCurrentLanguageLabel] = useState("English");

    const isEmailValid = (email: any) => {
        if (!email || email.length === 0) {
            return false;
        }
        return true;
    };
    const isPasswordValid = (password: any) => {
        if (!password || password.length === 0) {
            return false;
        }
        return true;
    };

    const isFormValid = isPasswordValid(registerData?.password) && isEmailValid(registerData.emailAddress);

    const loginHandler = (isLoginClicked: boolean) => {
        setIsLoginClicked(true);
        props.onLogin(true);
    }

    const TenancyNameChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setCurrentTenant(event.target.value);
    };

    useEffect(() => {
        setRegisterData(props.registerFields);
    } , [props.registerFields]);
    
    const handleDataChanges = (value: any, key: string) => {
        setRegisterData({ ...registerData, [key]: value });
      };

    const [checked, setChecked] = useState(false);
    const [currentTenant, setCurrentTenant] = useState(
        checked ? props.currentTenant : "Not Selected"
    );

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(registerData);
        setRegisterData({
            emailAddress: "",
            password: ""
        });
    };

    return (
        <div>
            <div className="text-center">
                <div className="d-flex align-items-center mb-1">
                    <div className="col-8 col-md-8 mb-3 offset-2">
                        <h2 className="mb-0">
                           Register
                        </h2>
                    </div>
                </div>

                <div>
                    <small className="pb-3 d-flex justify-content-center">
                        <span className="d-flex">
                            <RdsLabel
                                label={`${"Tenants"} ${props.getvalidTenantName || ""}`}
                            ></RdsLabel>:
                        </span>&nbsp;<span className="fw-semibold">
                            <RdsLabel
                                label={"Not Selected"}
                            ></RdsLabel></span>
                        ( <span>
                            <RdsModal
                                modalId="modal1"
                                modalAnimation="modal fade"
                                showModalFooter={false}
                                showModalHeader={true}
                                scrollable={false}
                                verticallyCentered={false}
                                modalbutton={<a className="link-primary">Change</a>}
                                modalTitle="Switch Tenant"
                                saveChangesName={`${checked ? "SWITCH TO THE TENANT" : "SWITCH TO THE HOST"
                                    }`}
                                cancelButtonName="CANCEL"
                            >
                                <div className="text-start  mb-4 border-bottom">
                                    <div className="form-check form-switch text-start ps-0 mb-4">
                                        <RdsCheckbox labelText={`${checked ? "SWITCH TO THE TENANT" : "SWITCH TO THE HOST"
                                            }`}
                                            checked={checked} isSwitch={checked}
                                            onChange={() => setChecked(!checked)}
                                            dataTestId="switch-tenant"
                                        ></RdsCheckbox>
                                    </div>
                                    <RdsInput
                                        name="Already Have An Account"
                                        label={true}
                                        placeholder="Already Have An Account"
                                        inputType="email/text"
                                        onChange={TenancyNameChange}
                                        value={currentTenant}                                       
                                        required={true}
                                        isDisabled={!checked}
                                        dataTestId="tenacy-name"
                                    ></RdsInput>
                                </div>
                                <div className=" mb-2 mt-3 d-flex justify-content-end gap-2">
                                    <RdsButton
                                        class="me-2"
                                        tooltipTitle={""}
                                        type={"button"}
                                        label="Cancel"
                                        colorVariant="outline-primary"
                                        size="small"
                                        databsdismiss="modal"
                                        dataTestId="cancel"
                                    ></RdsButton>
                                    <RdsButton
                                        class="me-2"
                                        label={checked ? "SWITCH TO THE TENANT" || "" : "SWITCH TO THE HOST"}
                                        size="small"
                                        isDisabled={false}
                                        colorVariant="primary"
                                        tooltipTitle={""}
                                        type={"submit"}
                                        databsdismiss="modal"
                                        onClick={() => { props.validTenant(currentTenant); setChecked(!checked); }}
                                        dataTestId="submit"
                                    ></RdsButton>
                                </div>
                            </RdsModal>
                        </span> )
                    </small>
                </div>
                <div className="mt-3">
                    <form>
                        <div className="form-group text-start">
                            <RdsInput
                                name="Email"
                                label={true}
                                placeholder="Enter Email"
                                inputType="email"    
                               onChange={(e) => {
                                handleDataChanges(e.target.value, "emailAddress");
                              }}
                              value={registerData?.emailAddress}                             
                                
                                dataTestId="email"
                                validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                                validationMsg="Invalid Email Address." 
                                required={true}
                            ></RdsInput>
                        </div>

                        <div className="form-group text-start mt-4">
                            <RdsInput
                                name="Password"
                                label={true}
                                placeholder="Enter Password"
                                inputType="password"
                                 onChange={(e) => {
                                    handleDataChanges(e.target.value, "password");
                                  }}
                                  value={registerData?.password}                                                       
                                dataTestId="password"
                                showIcon={true}
                                validatonPattern={
                                    /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/
                                  }
                                  validationMsg="Please Enter Valid Password length should be at least 8 characters(Alphanumeric)"
                                  required={true}
                            ></RdsInput>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <div>
                                <div className="form-group mb-3 pb-2 remember-me d-flex">
                                    <RdsCheckbox
                                        id="remembercheckid"
                                        labelText="I Accept Terms Of Service"
                                        onChange={(e) => {
                                            handleDataChanges(e.target.checked, "Accept");
                                        }}
                                        checked={registerData?.Accept}
                                        dataTestId="remember-me"
                                    ></RdsCheckbox>
                                </div>
                            </div>

                        </div>
                        <div className="mt-3">
                            <RdsButton
                                label="Register"
                                colorVariant="primary"
                                showLoadingSpinner={true}
                                isDisabled={!isFormValid}
                                block={true}
                                tooltipTitle={""}
                                type="submit"
                                dataTestId="register"
                                onClick={(e: any) => emitSaveData(e)}
                            />
                        </div>
                        <div className="mt-4">
                            <p>Dont have an Account<span className="ps-2"><a
                                className="link-primary text-decoration-none"
                                href="javascript:void(0)"
                                onClick={() => loginHandler(isLoginClicked)}                                
                                data-testid="login"
                            >Login
                            </a></span></p>
                        </div>
                        <div className="mt-5 justify-content-center">
                            <div className="w-100 h-1 login-border-bottom position-relative">
                                <div className="w-100 d-flex justify-content-center position-absolute top-10">
                                    <span className="bg-connect px-3">or Connect with</span>
                                </div>
                            </div>
                            <div className="w-100 mt-4 pt-2">
                                <span className="w-20px h-20px border p-2 mx-3 rounded-2">
                                    <RdsIcon
                                        name="google"
                                        height="20px"
                                        width="20px"
                                        colorVariant="light"
                                        fill={false}
                                        stroke={true}
                                        tooltip={true}
                                        tooltipTitle={"Connect with Google"}
                                        tooltipPlacement="bottom"
                                        isCursorPointer={true}
                                    ></RdsIcon></span>
                                <span className="w-20px h-20px border p-2 mx-3 rounded-2"><RdsIcon
                                    name="microsoft"
                                    height="20px"
                                    width="20px"
                                    colorVariant="light"
                                    fill={false}
                                    stroke={true}
                                    tooltip={true}
                                    tooltipTitle={"Connect with Microsoft"}
                                    tooltipPlacement="bottom"
                                    isCursorPointer={true}
                                ></RdsIcon></span>
                            </div>
                        </div>

                    </form>
                    <div className="d-flex justify-content-center pt-2 pt-lg-3 pt-xl-3 pt-xxl-3">
                        <RdsLabel
                            class="p-0 m-0 singleLine bottom-0 pt-xxl-0 pt-xl-0 pt-lg-4 pt-md-4 pt-4 mt-4 mb-4"
                            label="©2023 WAi Technologies. All rights reserved "
                            size="0.7rem"
                        ></RdsLabel>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RdsCompRegister;