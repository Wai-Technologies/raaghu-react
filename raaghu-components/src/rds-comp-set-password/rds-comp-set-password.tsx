import React, { useState, useEffect } from "react";
import {
  RdsInput,
  RdsButton,
} from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface Edition {
  option: string;
  value: string;
  password: string;
}

interface RdsCompSetPasswordProps {
  password(password: any): [any, any];
  reset?: boolean;
  setPasswordField: any;
  onSaveHandler?: (formData: any) => void
}

const RdsCompSetPassword = (props: RdsCompSetPasswordProps) => {
  const [inputReset, setInputReset] = useState(false);
  const [passwordField, setPasswordField] = useState(props.setPasswordField);
  const [errors, setErrors] = useState({
    password: "",
      
  });
  const isNewPassValid = (password: string) => {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
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
    errorMessage = isNewPassValid(value) ? "" : "Please Enter Valid Password length should be at least 8 characters(Alphanumeric)";
  } 
  setErrors({ ...errors, [key]: errorMessage });
  setPasswordField({ ...passwordField, [key]: value });
  }
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
      password: ""
    });

  }

  return (
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
                    id={(errors.password && passwordField?.password)? "passwordfield":"password" }
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
  );
};

export default RdsCompSetPassword;
