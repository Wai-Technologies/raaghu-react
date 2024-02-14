import React, { useState } from "react";
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
    languageData: any;
    onClickHandler?: ($event: React.MouseEvent<HTMLLIElement>, val: string) => void;
    languageLabel?: string;
}

const RdsCompRegister = (props: RdsCompRegisterProps) => {



    const [emailAddress, setEmail] = useState(props.emailAddress);
    const [password, setPassword] = useState(props.password);
    const [userName, setUsername] = useState(props.userName);
    const [isLoginClicked, setIsLoginClicked] = useState(false);
    const [appName, setAppName] = useState(props.appName); // Initialize appName state

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

    const isFormValid = isPasswordValid(password) && isEmailValid(emailAddress);

    const loginHandler: any = (isLoginClicked: boolean) => {
        setIsLoginClicked(true);
        props.onLogin(true);
    };
    const TenancyNameChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setCurrentTenant(event.target.value);
    };
    const emailhandleChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        setUsername(newEmail); // Assign email value to username
        setAppName("Angular");
    };
    const passwordhandleChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setPassword(event.target.value);
    };
    const handleSubmit: any = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        props.onRegister(emailAddress, password, userName, appName);
        setEmail(emailAddress);
        setPassword(password);
    };

    const [checked, setChecked] = useState(false);
    const [currentTenant, setCurrentTenant] = useState(
        checked ? props.currentTenant : "Not Selected"
    );
    return (
        <div>
            <div className="text-center">
                <div className="d-flex align-items-center mb-1">
                    <div className="col-8 col-md-8 mb-3 offset-2">
                        <h2 className="mb-0">
                            Ui.Register
                        </h2>
                    </div>
                    <div className="col-2 col-md-2 mb-3">
                        <RdsDropdownList
                            labelIcon={currentLanguageIcon}
                            labelIconWidth='18px'
                            labelIconHeight='18px'
                            placeholder={props.languageLabel}
                            icon="en"
                            block={false}
                            iconFill={false}
                            iconStroke={false}
                            isPlaceholder={true}
                            id={"langDrop"}
                            showIcon={false}
                            listItems={props.languageData}
                            onClick={props.onClickHandler} />
                    </div>
                </div>

                <div>
                    <small className="pb-3 d-flex justify-content-center">
                        <span className="d-flex">
                            <RdsLabel
                                label={`${"Saas.Tenants"} ${props.getvalidTenantName || ""}`}
                            ></RdsLabel>:
                        </span>&nbsp;<span className="fw-semibold">
                            <RdsLabel
                                label={`$"UiMultiTenancy.NotSelected` + props.getvalidTenantName}
                            ></RdsLabel></span>
                        ( <span>
                            <RdsModal
                                modalId="modal1"
                                modalAnimation="modal fade"
                                showModalFooter={false}
                                showModalHeader={true}
                                scrollable={false}
                                verticallyCentered={false}
                                modalbutton={<a className="link-primary"> "Change</a>}
                                modalTitle="UiMultiTenancy.SwitchTenant"
                                saveChangesName={`${checked ? "SWITCH TO THE TENANT" : "SWITCH TO THE HOST"
                                    }`}
                                cancelButtonName="CANCEL"
                            >
                                <div className="text-start  mb-4 border-bottom">
                                    <div className="form-check form-switch text-start ps-2 mb-4">
                                        <RdsCheckbox label={`${checked ? "SWITCH TO THE TENANT" : "SWITCH TO THE HOST"
                                            }`}
                                            checked={checked} isSwitch={checked}
                                            onChange={() => setChecked(!checked)}
                                            dataTestId="switch-tenant"
                                        ></RdsCheckbox>
                                    </div>
                                    <RdsInput
                                        label="Already Have An Account"
                                        placeholder="Already Have An Account"
                                        inputType="email/text"
                                        onChange={TenancyNameChange}
                                        value={currentTenant}
                                        name={"currentTenant"}
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
                    <form onSubmit={handleSubmit}>
                        <div className="form-group text-start">
                            <RdsInput
                                placeholder="Account.DisplayName:Email"
                                inputType="email"
                                onChange={emailhandleChange}
                                value={emailAddress}
                                name={"email"}

                                dataTestId="email"
                            ></RdsInput>
                        </div>

                        <div className="form-group text-start mt-4">
                            <RdsInput
                                placeholder="Account.DisplayName:Password"
                                inputType="password"
                                onChange={passwordhandleChange}
                                name={"password"}
                                value={password}
                                dataTestId="password"
                                showIcon={true}
                            ></RdsInput>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <div>
                                <div className="form-group mb-3 pb-2 remember-me d-flex">
                                    <RdsCheckbox
                                        id="remembercheckid"
                                        label="I Accept"
                                        checked
                                        dataTestId="remember-me"
                                    ></RdsCheckbox>
                                    <RdsLabel
                                        label="Terms Of Service">
                                    </RdsLabel>
                                </div>
                            </div>

                        </div>
                        <div className="mt-3">
                            <RdsButton
                                label="Ui.Register"
                                colorVariant="primary"
                                showLoadingSpinner={true}
                                isDisabled={!isFormValid}
                                block={true}
                                tooltipTitle={""}
                                type="submit"
                                dataTestId="register"
                                onClick={handleSubmit}

                            />
                        </div>
                        <div className="mt-4">
                            <p> "Dont have an Account"<span className="ps-2"><a
                                className="link-primary text-decoration-none"
                                href="javascript:void(0)"
                                onClick={() => loginHandler(isLoginClicked)}
                                data-testid="login"
                            >"Ui.Login
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
                                    ></RdsIcon></span>
                                <span className="w-20px h-20px border p-2 mx-3 rounded-2"><RdsIcon
                                    name="twitter_default"
                                    height="20px"
                                    width="20px"
                                    colorVariant="light"
                                    fill={false}
                                    stroke={true}
                                    tooltip={true}
                                    tooltipTitle={"Connect with Twitter"}
                                    tooltipPlacement="bottom"
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
                                ></RdsIcon></span>
                            </div>
                        </div>

                    </form>
                    <div className="d-flex justify-content-center pt-2 pt-lg-3 pt-xl-3 pt-xxl-3">
                        <RdsLabel
                            class=" p-0 m-0  singleLine   bottom-0 position-lg-relative position-absolute pt-xxl-0 pt-xl-0 pt-lg-4 pt-md-4 pt-4 mb-4"
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