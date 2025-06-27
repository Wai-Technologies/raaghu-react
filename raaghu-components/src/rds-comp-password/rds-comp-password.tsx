import React, { useState, useEffect } from "react";
import {
  RdsInput,
  RdsButton,
  RdsDropdownList,
} from "../rds-elements";
import { useTranslation } from "react-i18next";
import { InputSize } from "../../../raaghu-elements/src/rds-input/rds-input";
import RdsCompLabel from "../rds-comp-label";

export interface Edition {
  option?: string;
  value?: string;
  password?: string;
}

interface RdsCompPasswordProps {
  password(password: any): [any, any];
  reset?: boolean;
  setPasswordField: any;
  onSaveHandler?: (formData: any) => void;
  passwordType?: string;
  passwordSettingData?: any;
  onChangeSaveHandler?: (data: any) => void;
  changePasswordData?: any;
  onForgotPassword?: (email?: string) => void;
  onResend: (isForgotPasswordClicked?: boolean) => void;
  onLogin: (isLoginClicked?: boolean) => void;
  languageData: any;
  languageLabel?: string;
  registerFields: any;
  changeUserPasswordData?: any;
  onUserSaveHandler?: (data: any) => void;
}

const RdsCompPassword = (props: RdsCompPasswordProps) => {
  const [inputReset, setInputReset] = useState(props.reset);
  const [passwordField, setPasswordField] = useState(props.setPasswordField);
  const [formData, setFormData] = useState(props.passwordSettingData);
  const [curPass, setCurPass] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassoword, setNewConfirmPassoword] = useState("");
  const [isValidConfirmNewPass, setIsValidConfirmNewPass] = useState(true);
  const [isValidConfirmPass, setIsValidConfirmPass] = useState(true);
  const [curPassError, setCurPassError] = useState("");
  const [newPassError, setNewPassError] = useState("");
  const [curNewPassError, setCurNewPassError] = useState("");
  const [changeData, setChangeData] = useState(props.changePasswordData);
  const [errorMessage, setErrorMessage] = useState("");
  const [showmailsuccess, setShowMailSuccess] = useState(false);
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState(false);
  const [isResendClicked, setIsResendClicked] = useState(false);
  const [registerData, setRegisterData] = useState(props.registerFields);
  const [errorMessageForEmail, setErrorMessageForEmail] = useState("");
  const [changeUserPassword, setChangeUserPassword] = useState(
    props.changeUserPasswordData
  );
  const [errors, setErrors] = useState({
    password: "",
  });
  const isNewPassValid = (password: string) => {
    const pattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    return pattern.test(password);
  };
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const isPasswordValid = (password: any) => {
    if (!password || password.length === 0) {
      return false;
    }
    return true;
  };
  const handleDataChanges = (value: any, key: string) => {
    let errorMessage = "";
    if (key === "password") {
      errorMessage = isNewSettingPassValid(value)
        ? ""
        : "Please Enter Valid Password length should be at least 8 characters(Alphanumeric)";
    }
    setErrors({ ...errors, [key]: errorMessage });
    setPasswordField({ ...passwordField, [key]: value });
  };
  const isFormValid = isPasswordValid(passwordField?.password);
  useEffect(() => {
    setInputReset(!inputReset);
  }, [props.reset]);
  useEffect(() => {
    setPasswordField(props.setPasswordField);
  }, [props.setPasswordField]);

  function emitSaveData(event: any) {
    event.preventDefault();
    props.onSaveHandler && props.onSaveHandler(passwordField);
    setInputReset(!inputReset);
    setPasswordField({
      password: "",
    });
  }

  useEffect(() => {
    setFormData(props.passwordSettingData);
  }, [props.passwordSettingData]);

  useEffect(() => {
    setInputReset(props.reset);
  }, [props.reset]);

  const handleSettingDataChanges = (value: any, key: string) => {
    setFormData({ ...formData, [key]: value });
    switch (key) {
      case "curPass":
        !isCurPassValid(value)
          ? setCurPassError(
              "Password must be alphanumeric and at least 8 characters long"
            )
          : setCurPassError("");
        break;
      case "newPass":
        isCurrNewPassDifferent(value)
          ? setNewPassError("Current Password and New Password cannot be same")
          : !isNewPassValid(value)
          ? setNewPassError(
              "Password must be alphanumeric and at least 8 characters long"
            )
          : setNewPassError("");
        break;
      case "curNewPass":
        !isCurNewPassValid(value)
          ? setCurNewPassError(
              "New Password and Confirm New Password do not match. Please try again."
            )
          : setCurNewPassError("");
        break;
      default:
        break;
    }
  };

  const isCurPassValid = (curPass: any) => {
    return curPass && curPass.length >= 8;
  };

  const isCurrNewPassDifferent = (newPass: any) => {
    return newPass === formData?.curPass;
  };

  const isNewSettingPassValid = (newPass: any) => {
    return newPass && newPass.length >= 8;
  };

  const isCurNewPassValid = (curNewPass: any) => {
    return (
      curNewPass && curNewPass === formData.newPass && curNewPass.length >= 8
    );
  };

  useEffect(() => {
    newPassword && newPassword !== curPass && newPassword.length >= 8
      ? setIsValidConfirmNewPass(true)
      : setIsValidConfirmNewPass(false);
  }, [newPassword]);

  useEffect(() => {
    newConfirmPassoword &&
    newConfirmPassoword === newPassword &&
    newConfirmPassoword.length >= 8
      ? setIsValidConfirmPass(true)
      : setIsValidConfirmPass(false);
  }, [newConfirmPassoword, newPassword]);

  const isSettingFormValid =
    isCurNewPassValid(formData?.curNewPass) &&
    isCurPassValid(formData?.curPass) &&
    isNewSettingPassValid(formData?.newPass) &&
    isCurNewPassValid(formData?.curNewPass) &&
    isValidConfirmNewPass &&
    isValidConfirmPass;

  const emitSettingSaveData = (event: any) => {
    event.preventDefault();
    props.onSaveHandler && props.onSaveHandler(formData);
    setInputReset(!inputReset);
    setFormData({
      curPass: "",
      newPass: "",
      curNewPass: "",
    });
  };

  useEffect(() => {
    setChangeData(props.changePasswordData);
  }, [props.changePasswordData]);

  useEffect(() => {
    setInputReset(!inputReset);
  }, [props.reset]);

  const handleChangeDataChanges = (value: any, key: string) => {
    setChangeData({ ...changeData, [key]: value });

    if (key === "newPassword" || key === "newPasswordConfirm") {
      const newPassword =
        key === "newPassword" ? value : changeData?.newPassword;
      const confirmPassword =
        key === "newPasswordConfirm" ? value : changeData?.newPasswordConfirm;

      if (confirmPassword !== newPassword) {
        setErrorMessage("New password and confirm new password do not match");
      } else {
        setErrorMessage("");
      }
    }
  };

  function emitChangeSaveData(event: any) {
    event.preventDefault();
    props.onSaveHandler && props.onSaveHandler(changeData);
    setInputReset(!inputReset);
    setChangeData({
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    });
  }
  const isCurrentPasswordValid = (currentPassword: any) => {
    if (!currentPassword || currentPassword.length === 0) {
      return false;
    }
    return true;
  };
  const isNewPasswordValid = (newPassword: any) => {
    if (!newPassword || newPassword.length === 0) {
      return false;
    }
    return true;
  };
  const isNewPasswordConfirmValid = (newPasswordConfirm: any) => {
    if (
      !newPasswordConfirm ||
      newPasswordConfirm.length === 0 ||
      errorMessage
    ) {
      return false;
    }
    return true;
  };

  const isChangeValid =
    isCurrentPasswordValid(changeData?.currentPassword) &&
    isNewPasswordValid(changeData?.newPassword) &&
    isNewPasswordConfirmValid(changeData?.newPasswordConfirm);
  const isEmailValid = (email: any) => {
    if (!email || email.length === 0) {
      return false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
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
  }, [props.registerFields]);

  useEffect(() => {
    setInputReset(!inputReset);
  }, [props.reset]);

  const handleForgotDataChanges = (value: any, key: string) => {
    setRegisterData({ ...registerData, [key]: value });

    if (key === "email") {
      const trimmedValue = value.trim();
      if (trimmedValue === "") {
        setErrorMessageForEmail("Email is required.");
      } else if (!isEmailValid(trimmedValue)) {
        setErrorMessageForEmail("Please enter a valid email address.");
      } else {
        setErrorMessageForEmail("");
      }
    }
  };

  const resendHandler: any = (isForgotPasswordClicked: boolean) => {
    setIsResendClicked(true);
  };
  const [currentLanguageIcon, setCurrentLanguageIcon] = useState("en");

  function emitForgotSaveData(event: any) {
    event.preventDefault();
    props.onForgotPassword && props.onForgotPassword(registerData);
    setInputReset(!inputReset);
    setRegisterData({
      email: "",
    });
    setShowMailSuccess(true);
  }
  const isForgotFormValid = isEmailValid(registerData?.email);

  useEffect(() => {
    setChangeUserPassword(props.changeUserPasswordData);
  }, [props.changeUserPasswordData]);

  const handleUserDataChanges = (value: any, key: string) => {
    setChangeUserPassword({ ...changeUserPassword, [key]: value });

    if (key === "newPassword" || key === "newPasswordConfirm") {
      const newPassword =
        key === "newPassword" ? value : changeUserPassword?.newPassword;
      const confirmPassword =
        key === "newPasswordConfirm"
          ? value
          : changeUserPassword?.newPasswordConfirm;

      if (confirmPassword !== newPassword) {
        setErrorMessage("New password and confirm new password do not match");
      } else {
        setErrorMessage("");
      }
    }
  };

  function emitUserSaveData(event: any) {
    event.preventDefault();
    props.onSaveHandler && props.onSaveHandler(changeUserPassword);
    setInputReset(!inputReset);
    setChangeUserPassword({
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    });
  }

  const isUserPasswordValid = (password: any) => {
    if (!password || password.length === 0) {
      return false;
    }
    return true;
  };

  const isNewUserPasswordValid = (password: any) => {
    if (!password || password.length === 0) {
      return false;
    }
    return true;
  };

  const isConfirmedPasswordValid = (password: any) => {
    if (!password || password !== changeUserPassword?.newPassword) {
      return false;
    }
    return true;
  };
  const FormValid =
    isPasswordValid(changeUserPassword?.currentPassword) &&
    isNewPasswordValid(changeUserPassword?.newPassword) &&
    isConfirmedPasswordValid(changeUserPassword?.newPasswordConfirm);

  return (
    <>
      {props.passwordType === "set" && (
        <div>
          <div className="tab-content">
            <form>
              <div className="custom-content-scroll">
                <div className="row mt-3">
                  <div className="col-md-6 mb-2">
                    <div className="form-group">
                      <RdsInput
                        inputType="password"
                        placeholder="Enter Password"
                        required={true}
                        name="Password"
                        label={true}
                        id={
                          errors.password && passwordField?.password
                            ? "passwordfield"
                            : "password"
                        }
                        onBlur={() => setIsPasswordTouched(true)}
                        onChange={(e) => {
                          handleDataChanges(e.target.value, "password");
                        }}
                        value={passwordField?.password}
                        dataTestId="password"
                        showIcon={true}
                      ></RdsInput>
                      {errors.password && passwordField?.password && (
                        <div className="form-control-feedback">
                          <span className="text-danger">{errors.password}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
                <RdsButton
                  tooltipTitle={""}
                  type={"button"}
                  label="Cancel"
                  colorVariant="outline-primary"
                  size="small"
                  databsdismiss="offcanvas"
                ></RdsButton>
                <RdsButton
                  label="Save"
                  size="small"
                  isDisabled={!isFormValid}
                  colorVariant="primary"
                  tooltipTitle={""}
                  type={"submit"}
                  databsdismiss="offcanvas"
                  onClick={(e: any) => emitSaveData(e)}
                ></RdsButton>
              </div>
            </form>
          </div>
        </div>
      )}
      {props.passwordType === "setting" && (
        <div>
          <form>
            <div className="custom-content-scroll">
              <div className="fw-normal mt-1 mb-3">
                <RdsInput
                  name="Current Password"
                  label={true}
                  reset={inputReset}
                  required={true}
                  placeholder="Current password"
                  inputType="password"
                  onChange={(e) => {
                    setCurPass(e.target.value);
                    handleSettingDataChanges(e.target.value, "curPass");
                  }}
                  value={formData?.curPass}
                  dataTestId="current-password"
                  showIcon={true}
                  validatonPattern={
                    /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/
                  }
                  validationMsg={curPassError}
                ></RdsInput>
              </div>
              <div className=" fw-normal mb-3">
                <RdsInput
                  name="New password"
                  label={true}
                  reset={inputReset}
                  required={true}
                  placeholder="New password"
                  inputType="password"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    handleSettingDataChanges(e.target.value, "newPass");
                  }}
                  value={formData?.newPass}
                  showIcon={true}
                  dataTestId="new-password"
                  validatonPattern={
                    /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/
                  }
                  isValidConfirmPass={isValidConfirmNewPass}
                  validationMsg={newPassError}
                ></RdsInput>
              </div>
              <div className=" fw-normal mb-3">
                <RdsInput
                  name="Confirm new password"
                  label={true}
                  reset={inputReset}
                  required={true}
                  placeholder="Confirm new password"
                  inputType="password"
                  onChange={(e) => {
                    setNewConfirmPassoword(e.target.value);
                    handleSettingDataChanges(e.target.value, "curNewPass");
                  }}
                  value={formData?.curNewPass}
                  showIcon={true}
                  dataTestId="confirm-password"
                  validationMsg={curNewPassError}
                  isValidConfirmPass={isValidConfirmPass}
                ></RdsInput>
              </div>
              <div>
                <h5 className="fw-bolder">Where you are logged in,</h5>
                <p className="fw-normal">
                  We will alert you via olivia@rdssysteminc.com if there is any
                  unusual activity on your account.
                </p>
              </div>
            </div>
            <div className="mt-3 d-flex pb-3 ps-4 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2 p-4">
              <RdsButton
                label="Cancel"
                colorVariant="primary"
                block={false}
                type="button"
                size="small"
                isOutline={true}
                dataTestId="cancel"
              />
              <RdsButton
                label="Save"
                colorVariant="primary"
                isDisabled={!isSettingFormValid}
                size="small"
                block={false}
                type="submit"
                dataTestId="save"
                onClick={(e: any) => emitSettingSaveData(e)}
              />
            </div>
          </form>
        </div>
      )}
      {props.passwordType === "change" && (
        <form data-testid="password-form">
          <div className="custom-content-scroll">
            <div className="row">
              <div className="col-xxl-4 col-xl-6 col-lg-6 col-12">
                <RdsInput
                  size={InputSize.Medium}
                  reset={inputReset}
                  name="Current Password"
                  label={true}
                  inputType="password"
                  isDisabled={false}
                  readonly={false}
                  placeholder="Current Password"
                  value={changeData?.currentPassword}
                  onChange={(e) => {
                    handleChangeDataChanges(e.target.value, "currentPassword");
                  }}
                  required={true}
                  dataTestId="curr-password"
                  showIcon={true}
                ></RdsInput>
              </div>
            </div>
            <div className="row">
              <div className="col-xxl-4 col-xl-6 col-lg-6 col-12">
                <RdsInput
                  size={InputSize.Medium}
                  reset={inputReset}
                  name="New Password"
                  label={true}
                  inputType="password"
                  isDisabled={false}
                  readonly={false}
                  required={true}
                  placeholder="New Password"
                  value={changeData?.newPassword}
                  onChange={(e) => {
                    handleChangeDataChanges(e.target.value, "newPassword");
                  }}
                  dataTestId="new-pass"
                  showIcon={true}
                ></RdsInput>
              </div>
            </div>
            <div className="row">
              <div className="col-xxl-4 col-xl-6 col-lg-6 col-12">
                <RdsInput
                  size={InputSize.Medium}
                  reset={inputReset}
                  name="New Password Confirm"
                  label={true}
                  inputType="password"
                  isDisabled={false}
                  readonly={false}
                  required={true}
                  placeholder="New Password Confirm"
                  value={changeData?.newPasswordConfirm}
                  validationMsg={errorMessage}
                  onChange={(e) => {
                    handleChangeDataChanges(
                      e.target.value,
                      "newPasswordConfirm"
                    );
                  }}
                  dataTestId="confirm-password"
                  showIcon={true}
                ></RdsInput>
                {/* <div className="form-control-feedback">
                    {errorMessage && formData?.newPasswordConfirm && (
                      <span className="text-danger">{errorMessage}</span>
                    )}
                  </div> */}
              </div>
            </div>
          </div>
          <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
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
              onClick={(e: any) => emitChangeSaveData(e)}
              databsdismiss="offcanvas"
              isDisabled={!isChangeValid}
              dataTestId="save"
            ></RdsButton>
          </div>
        </form>
      )}
      {props.passwordType === "forgot" && (
        <div>
          <div className="text-center">
            {!showmailsuccess && (
              <div>
                <div className="container">
                  <div className="row align-items-center mb-1">
                    <div className="col-12 col-md-10 text-md-end mb-3">
                      <h2 className="mb-0 ms-4 text-center">Forgot Password</h2>
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
                <div className="fs-6">
                  <label>
                    <RdsCompLabel
                      label="A password reset link will be sent to your email to reset your password. If you don't get an email in a few minutes, please re-try."
                      size="13px"
                    ></RdsCompLabel>
                  </label>
                </div>
                <div className="mt-4">
                  <form>
                    <div className="form-group mb-3 text-start">
                      <RdsInput
                        size={InputSize.Medium}
                        name="Email"
                        label={true}
                        inputType="email"
                        placeholder="Enter Email"
                        onChange={(e) => {
                          handleForgotDataChanges(e.target.value, "email");
                        }}
                        value={registerData?.email}
                        required={true}
                        dataTestId="email"
                        validatonPattern={
                          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                        }
                        validationMsg={errorMessageForEmail}
                        reset={inputReset}
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
                        onClick={(e: any) => emitForgotSaveData(e)}
                        showLoadingSpinner={true}
                        type={"submit"}
                        dataTestId="submit"
                        isDisabled={!isForgotFormValid}
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
                          >
                            Login
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
                  className="mt-4 mb-4"
                  alt="img"
                  style={{ width: "50px" }}
                />
                <h3 className="pb-3">Email has been sent!</h3>
                <div>
                  Please check your inbox and click in the received link to
                  reset a password
                </div>
                <br />
                <div>
                  Didn't receive the link ?
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
      )}
      {props.passwordType === "changeUser" && (
        <form>
          <div className="custom-content-scroll">
            <div className="row">
              <div className="col-12 col-md-12">
                <RdsInput
                  size={InputSize.Medium}
                  reset={inputReset}
                  name="Current Password"
                  label={true}
                  inputType="password"
                  isDisabled={false}
                  readonly={false}
                  placeholder="Current Password"
                  value={changeUserPassword?.currentPassword}
                  onChange={(e: any) =>
                    handleUserDataChanges(e.target.value, "currentPassword")
                  }
                  required={true}
                  showIcon={true}
                ></RdsInput>
              </div>
              <div className="col-12 col-md-12">
                <RdsInput
                  size={InputSize.Medium}
                  reset={inputReset}
                  name="New Password"
                  label={true}
                  inputType="password"
                  isDisabled={false}
                  readonly={false}
                  required={true}
                  placeholder="New Password"
                  value={changeUserPassword?.newPassword}
                  onChange={(e: any) =>
                    handleUserDataChanges(e.target.value, "newPassword")
                  }
                  showIcon={true}
                ></RdsInput>
                {/* <div className="form-control-feedback">
                {errorPatternMessage && (<span className="text-danger">{errorPatternMessage}</span>)}
              </div> */}
              </div>
              <div className="col-12 col-md-12">
                <RdsInput
                  size={InputSize.Medium}
                  reset={inputReset}
                  name="Confirm New Password"
                  label={true}
                  inputType="password"
                  isDisabled={false}
                  readonly={false}
                  required={true}
                  placeholder="Confirm New Password"
                  value={changeUserPassword?.newPasswordConfirm}
                  validationMsg={errorMessage}
                  onChange={(e: any) =>
                    handleUserDataChanges(e.target.value, "newPasswordConfirm")
                  }
                  showIcon={true}
                ></RdsInput>
                {/* <div className="form-control-feedback">
                    {errorMessage && changePassword?.newPasswordConfirm && (
                      <span className="text-danger">{errorMessage}</span>
                    )}
                  </div> */}
              </div>
            </div>
          </div>
          <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
            <RdsButton
              label="Save"
              colorVariant="primary"
              block={false}
              type="submit"
              size="small"
              onClick={(e: any) => emitUserSaveData(e)}
              isDisabled={!FormValid}
            />
          </div>
        </form>
      )}
    </>
  );
};

export default RdsCompPassword;
