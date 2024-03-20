import React, { useEffect, useState } from "react";
import {
  RdsLabel,
  RdsButton,
  RdsInput,
  RdsCheckbox,
  RdsModal,
  RdsAlert,
  RdsIcon,
  RdsDropdownList,
} from "../rds-elements";
import "./rds-comp-login.css";
import { useTranslation } from "react-i18next";
export interface RdsCompLoginProps {
  error?: any;
  getvalidTenantName: string;
  email: string;
  password: string;
  onDismissAlert?: () => any;
  onEmailChange?: () => any;
  onPasswordChange?: () => any;
  onLogin: (email: string, password: string, rememberMe: boolean) => any;
  onForgotPassword: (isForgotPasswordClicked?: boolean) => void;
  onRegister: (isRegisterClicked?: boolean) => void;
  currentTenant: any;
  validTenant: any;
  languageData: any;
  onClickHandler?: (
    $event: React.MouseEvent<HTMLLIElement>,
    val: string
  ) => void;
  languageLabel?: string;
}

const RdsCompLogin = (props: RdsCompLoginProps) => {
  const [email, setEmail] = useState(props.email);
  const [Alert, setAlert] = useState(props.error);
  const [password, setPassword] = useState(props.password);
  const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState(false);
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);
  const [rememberMe, setrememberMe] = useState(false);
 
  const [checked, setChecked] = useState(false);
  const [currentTenant, setCurrentTenant] = useState(
    checked ? props.currentTenant : "Not Selected"
  );
  const [currentLanguageIcon, setCurrentLanguageIcon] = useState("en");
  const [currentLanguageLabel, setCurrentLanguageLabel] = useState("English");

  useEffect(() => {
    if (props.email) {
      setEmail(props.email);
    }
  }, [props.email]);

  //side effect of props.error
  useEffect(() => {
    setAlert(props.error);
  }, [props.error]);

  useEffect(() => {
    if (props.password) {
      setPassword(props.password);
    }
  }, [props.password]);

  useEffect(() => {
    setCurrentTenant(props.currentTenant);
  }, [props.currentTenant]);

  const onCheckedHandler = (e: any) => {
    setrememberMe(e.target.checked);
  };

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
  const emailhandleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    props.onEmailChange && props.onEmailChange();
    setEmail(event.target.value);
  };
  const passwordhandleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    props.onPasswordChange && props.onPasswordChange();
    setPassword(event.target.value);
  };
  const TenancyNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCurrentTenant(event.target.value);
  };

  const isFormValid = isPasswordValid(password) && isEmailValid(email);

  const handleSubmit: any = (event: any) => {
    event.preventDefault();
    props.onLogin(email, password, rememberMe);
  };

  const forgotPasswordHandler: any = (isForgotPasswordClicked: boolean) => {
    setIsForgotPasswordClicked(true);
    props.onForgotPassword(isForgotPasswordClicked);
  };
  const registerHandler: any = (isRegisterClicked: boolean) => {
    setIsRegisterClicked(true);
    props.onRegister(isRegisterClicked);
  };

  return (
    <>
      <div className="">
        <div className="text-center">
          <div className="d-flex align-items-center mb-1">
            <div className="col-8 col-md-8 mb-3 offset-2">
              <h2 className="mb-0">Login</h2>
            </div>
            <div className="col-2 col-md-2 mb-3">
              <RdsDropdownList
                labelIcon={currentLanguageIcon}
                labelIconWidth="18px"
                labelIconHeight="18px"
                placeholder={props.languageLabel}
                block={false}
                icon="en"
                iconFill={false}
                iconStroke={false}
                isPlaceholder={true}
                id={"langDrop"}
                showIcon={false}
                listItems={props.languageData}
                isCode={true}
                onClick={props.onClickHandler}
              />
            </div>
          </div>
          <div>
            <small className="d-flex justify-content-center">
              <span className="d-flex">
                {" "}
                <RdsLabel label={`${"Current Tenant"}`}></RdsLabel>:
              </span>
              &nbsp;
              <span className="fw-semibold pe-1">
                {" "}
                <RdsLabel
                  label={
                    `${props.getvalidTenantName}`
                  }
                ></RdsLabel>
              </span>
              (
              <span>
                <RdsModal
                  modalId="modal1"
                  modalAnimation="modal fade"
                  showModalFooter={false}
                  showModalHeader={true}
                  scrollable={false}
                  verticallyCentered={false}
                  modalbutton={<a className="link-primary">Change</a>}
                  modalTitle={`${"SwitchTenant"}`}
                  cancelButtonName="CANCEL"
                >
                  <div className="text-start  mb-4 ">
                    <RdsInput
                      label="Name"
                      placeholder=""
                      inputType="email/text"
                      onChange={TenancyNameChange}
                      value={currentTenant}
                      name={"currentTenant"}
                      required={false}
                      isDisabled={false}
                      dataTestId="tenancy-name"
                    />
                    <div className="text-start p-0">
                      <RdsLabel
                        label="Leave the name field blank to switch to the host side."
                        size="0.7rem"
                      ></RdsLabel>
                    </div>
                  </div>
                  <div className="mb-2 mt-3 d-flex justify-content-end gap-2">
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
                      label="Save"
                      size="small"
                      isDisabled={false}
                      colorVariant="primary"
                      tooltipTitle={""}
                      type={"submit"}
                      databsdismiss="modal"
                      onClick={() => {
                        props.validTenant(currentTenant);
                      }}
                      dataTestId="switch-btn"
                    ></RdsButton>
                  </div>
                </RdsModal>
              </span>
              )
            </small>
          </div>
          <div className="">
            <div className="invalid-popup">
              {Alert?.show && (
                <div>
                  <RdsAlert
                    dismisable={true}
                    alertmessage={Alert?.message}
                    colorVariant={Alert?.color}
                    size="small"
                    onDismiss={props.onDismissAlert}
                    reset={Alert?.show}
                  />
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="">
              <div className="form-group text-start">
                <RdsInput
                  placeholder="Enter Email/Username"
                  inputType="email/text"
                  onChange={emailhandleChange}
                  value={email}
                  name={"email"}
                  required={false}
                  dataTestId="username"
                />
              </div>

              <div className="form-group text-start mt-4">
                <RdsInput
                  customClasses="pe-5"
                  required={false}
                  placeholder="Enter Password"
                  inputType="password"
                  onChange={passwordhandleChange}
                  name={"password"}
                  value={password}
                  dataTestId="password"
                  showIcon= {true}
                />
              </div>
              <div className="d-flex justify-content-between mt-3">
                <div>
                  <div className="form-group mb-4 pb-2 remember-me">
                    <RdsCheckbox
                      id="remembercheckid"
                      label={`${"Remember Me"}`}
                      checked={rememberMe}
                      onChange={onCheckedHandler}
                      dataTestId="remember-me"
                    ></RdsCheckbox>
                  </div>
                </div>
                <div>
                  <a
                    className="link-primary text-decoration-none float-end"
                    href="javascript:void(0)"
                    onClick={forgotPasswordHandler}
                  >
                    {`${"Forgot Password"}`}
                  </a>
                </div>
              </div>
              <RdsButton
                label={`${"Login"}`}
                colorVariant="primary"
                showLoadingSpinner={true}
                isDisabled={!isFormValid}
                block={true}
                tooltipTitle={""}
                type="submit"
                onClick={handleSubmit}
                dataTestId="Login"
              />
            </form>
            <div className="mt-4">
              <div>
                Don't have an Account
                <span className="ps-1">
                  <a
                    className="link-primary text-decoration-none"
                    href="javascript:void(0)"
                    onClick={registerHandler}
                  >
                   Register
                  </a>
                </span>
              </div>
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
                  ></RdsIcon>
                </span>
                <span className="w-20px h-20px border p-2 mx-3 rounded-2">
                  <RdsIcon
                    name="microsoft"
                    height="20px"
                    width="20px"
                    colorVariant="light"
                    fill={false}
                    stroke={true}
                    tooltip={true}
                    tooltipTitle={"Connect with Microsoft"}
                    tooltipPlacement="bottom"
                  ></RdsIcon>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RdsCompLogin;
