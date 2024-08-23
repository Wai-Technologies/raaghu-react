import React, { useEffect, useState } from "react";
import { RdsButton, RdsInput } from "../rds-elements";
import { useTranslation } from "react-i18next";

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

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const handleDataChanges = (event:any, key: string) => {
        const { value } = event.target;
        let errorMessage = "";
      
        if (key === "ProfileName") {
          errorMessage = value.trim() ? "" : "Profile Name is required";
        } else if (key === "Email") {
          errorMessage = emailRegex.test(value) ? "" : "Please enter a valid email address";
        } else if (key === "UserName") {
          errorMessage = value.trim() ? "" : "User Name is required";
        } else if (key === "curPass") {
          errorMessage = isCurPassValid(value) ? "" : "Current Password is invalid";
        } else if (key === "newPass") {
          errorMessage = isNewPassValid(value) ? "" : "New password is invalid";
        } else if (key === "curNewPass") {
          errorMessage = isCurNewPassValid(value) ? "" : "Password mismatch found";
        }
      
        setErrors({ ...errors, [key]: errorMessage });
        setFormData({ ...formData, [key]: value });
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

  return (
    <div>
      <form>
        <div className="custom-content-scroll">
          <div className="mb-3">
            <RdsInput
              label="Profile Name"
              reset={inputReset}
              size="medium"
              inputType="text"
              name="ProfileName"
              placeholder="admin"
              required
              value={formData?.ProfileName}
              onChange={(e) => handleDataChanges(e, "ProfileName")}
            />
            {errors.ProfileName && <div className="form-control-feedback"><span className="text-danger">{errors.ProfileName}</span></div>}
          </div>
          <div className="mb-3">
            <RdsInput
              label="Email"
              reset={inputReset}
              size="medium"
              inputType="text"
              name="Email"
              placeholder="contact@waiin.com"
              required
              value={formData?.Email}
              onChange={(e) => handleDataChanges(e, "Email")}
            />
            {errors.Email && <div className="form-control-feedback"><span className="text-danger">{errors.Email}</span></div>}
          </div>
          <div className="mb-3">
            <RdsInput
              label="User Name"
              reset={inputReset}
              size="medium"
              inputType="text"
              name="UserName"
              placeholder="admin"
              required
              value={formData?.UserName}
              onChange={(e) => handleDataChanges(e, "UserName")}
            />
            {errors.UserName && <div className="form-control-feedback"><span className="text-danger">{errors.UserName}</span></div>}
          </div>
          <div className="mb-3">
            <RdsInput
              label="Current password"
              reset={inputReset}
              required
              placeholder="Current password"
              inputType="password"
              onChange={(e)=>handleDataChanges(e,"curPass")}
              name="curPass"
              value={formData?.curPass}
              showIcon={true}
            />
            {errors.curPass && <div className="form-control-feedback"><span className="text-danger">{errors.curPass}</span></div>}
          </div>
          <div className="mb-3">
            <RdsInput
              label="New password"
              reset={inputReset}
              required
              placeholder="New password"
              inputType="password"
              onChange={(e)=>handleDataChanges(e,"newPass")}
              name="newPass"
              value={formData?.newPass}
              showIcon={true}
            />
            {errors.newPass && <div className="form-control-feedback"><span className="text-danger">{errors.newPass}</span></div>}
          </div>
          <div className="mb-3">
            <RdsInput
              label="Confirm new password"
              reset={inputReset}
              required
              placeholder="Confirm new password"
              inputType="password"
              onChange={(e)=>handleDataChanges(e,"curNewPass")}
              name="curNewPass"
              value={formData?.curNewPass}
              showIcon={true}
            />
            {errors.curNewPass && formData?.curNewPass && <div className="form-control-feedback"><span className="text-danger">{errors.curNewPass}</span></div>}
          </div>
        </div>
        <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
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
            onClick={(e) => emitSaveData(e)}
          ></RdsButton>
        </div>
      </form>
    </div>
  );
};

export default RdsCompMySettings;
