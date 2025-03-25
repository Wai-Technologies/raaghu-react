import React, { useEffect, useState } from "react";
import { RdsButton, RdsInput } from "../rds-elements";
import { useTranslation } from "react-i18next";
import { InputSize} from "../../../raaghu-elements/src/rds-input/rds-input";

export interface RdsCompMySettingsProps {
  onSaveHandler?: (data: any) => void;
  reset?: boolean;
  settingDetails?: any;
}

const RdsCompMySettings = (props: RdsCompMySettingsProps) => {
  const [formData, setFormData] = useState(props.settingDetails);
  const [inputReset, setInputReset] = useState(props.reset);
  const [errors, setErrors] = useState({
    ProfileName: "",
    Email: "",
    UserName: "",
    curPass: "",
    newPass: "",
    curNewPass: "",
  });
  const [touched, setTouched] = useState({
    Email: false,
    ProfileName: false,
    UserName: false,
    curPass: false,
    newPass: false,
    curNewPass: false,
  });

  useEffect(() => {
    setInputReset(props.reset);
  }, [props.reset]);

  const isCurPassValid = (curPass: string) => {
    return curPass && curPass.length > 8;
  };

  const isNewPassValid = (newPass: string) => {
    return newPass && newPass.length > 8;
  };

  const isCurNewPassValid = (curNewPass: string) => {
    return curNewPass === formData.newPass;
  };

  const handleDataChanges = (event: any, key: string) => {
    const { value } = event.target;
    let errorMessage = "";

    if (key === "curPass") {
      setTouched({ ...touched, curPass: true });
      errorMessage = value.trim() && !isCurPassValid(value) ? "Current Password is invalid" : "";
    } else if (key === "newPass") {
      setTouched({ ...touched, newPass: true });
      errorMessage = value.trim() && !isNewPassValid(value) ? "New password is invalid" : "";
    } else if (key === "curNewPass") {
      setTouched({ ...touched, curNewPass: true });
      errorMessage = value.trim() && !isCurNewPassValid(value) ? "Password mismatch found" : "";
    }

    setErrors({ ...errors, [key]: errorMessage });
    setFormData({ ...formData, [key]: value });
  };

  const handleBlur = (key: string) => {
    setTouched({ ...touched, [key]: true });
  };

  const emitSaveData = (event: any) => {
    event.preventDefault();
    props.onSaveHandler && props.onSaveHandler(formData);
    setInputReset(!inputReset);
    setFormData({
      ProfileName: "",
      Email: "",
      UserName: "",
      curPass: "",
      newPass: "",
      curNewPass: "",
    });
  };
  const isProfileNameValid = (ProfileName: any) => {
    if (!ProfileName || ProfileName.length === 0) {
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
  }
  const isUserNameValid = (UserName: any) => {
    if (!UserName || UserName.length === 0) {
      return false;
    }
    return true;
  }

const isFormValid = isProfileNameValid(formData?.ProfileName) && isEmailValid(formData?.Email) && isUserNameValid(formData?.UserName) && isCurPassValid(formData?.curPass) && isNewPassValid(formData?.newPass) && isCurNewPassValid(formData?.curNewPass);
  return (
    <div>
      <form>
        <div className="custom-content-scroll">
          <div>
            <RdsInput
              name="Profile Name"
              label={true}
              reset={inputReset}
              size={InputSize.Medium}   
              inputType="text"             
              placeholder="admin"
              required
              value={formData?.ProfileName}
              onChange={(e) => handleDataChanges(e, "ProfileName")}
              onBlur={() => handleBlur("ProfileName")}
            />
            {touched.ProfileName && errors.ProfileName && <div className="form-control-feedback"><span className="text-danger">{errors.ProfileName}</span></div>}
          </div>
          <div>
            <RdsInput
              name="Email"
              label={true}
              reset={inputReset}
              size={InputSize.Medium}   
              inputType="email"             
              placeholder="contact@waiin.com"
              required
              value={formData?.Email}
              onChange={(e) => handleDataChanges(e, "Email")}
              onBlur={() => handleBlur("Email")}
              validatonPattern={ /^[a-zA-Z0-9.!#$%&’*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/}
              validationMsg="Please enter a valid email address"
            />
           
          </div>
          <div>
            <RdsInput
              name="User Name"
              label={true}
              reset={inputReset}
              size={InputSize.Medium}   
              inputType="text"              
              placeholder="admin"
              required
              value={formData?.UserName}
              onChange={(e) => handleDataChanges(e, "UserName")}
              onBlur={() => handleBlur("UserName")}
            />
            {touched.UserName && errors.UserName && <div className="form-control-feedback"><span className="text-danger">{errors.UserName}</span></div>}
          </div>
          <div>
            <RdsInput
              name="Current password"
              label={true}
              reset={inputReset}
              required
              placeholder="Current password"
              inputType="password"
              onChange={(e) => handleDataChanges(e, "curPass")}             
              value={formData?.curPass}
              showIcon={true}
              onBlur={() => handleBlur("curPass")}
              id={(touched.curPass && errors.curPass)? "passwordfield":"" }
            />
            {touched.curPass && errors.curPass && <div className="form-control-feedback"><span className="text-danger">{errors.curPass}</span></div>}
          </div>
          <div>
            <RdsInput
              name="New password"
              label={true}
              reset={inputReset}
              required
              placeholder="New password"
              inputType="password"
              onChange={(e) => handleDataChanges(e, "newPass")}              
              value={formData?.newPass}
              showIcon={true}
              onBlur={() => handleBlur("newPass")}
              id={(touched.newPass && errors.newPass)? "passwordfield":"" }
            />
            {touched.newPass && errors.newPass && <div className="form-control-feedback"><span className="text-danger">{errors.newPass}</span></div>}
          </div>
          <div>
            <RdsInput
              name="Confirm new password"
              label={true}
              reset={inputReset}
              required
              placeholder="Confirm new password"
              inputType="password"
              onChange={(e) => handleDataChanges(e, "curNewPass")}              
              value={formData?.curNewPass}
              showIcon={true}
              onBlur={() => handleBlur("curNewPass")}
              id={(touched.curNewPass && errors.curNewPass)? "passwordfield":"" }
            />
            {touched.curNewPass && errors.curNewPass && <div className="form-control-feedback"><span className="text-danger">{errors.curNewPass}</span></div>}
          </div>
        </div>
        <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
          <RdsButton
            size="small"
            isOutline={true}
            colorVariant="primary"
            label="Cancel"
            data-bs-dismiss="offcanvas"
            type="button"
          ></RdsButton>
          <RdsButton
            size="small"
            isOutline={false}
            colorVariant="primary"
            label="Save"
            type="submit"
            isDisabled={!isFormValid}
            onClick={(e) => emitSaveData(e)}
          ></RdsButton>
        </div>
      </form>
    </div>
  );
};

export default RdsCompMySettings;
