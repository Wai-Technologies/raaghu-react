import { useEffect, useState } from "react";
import { RdsInput, RdsButton } from "../rds-elements";
import React from "react";
import "./rds-comp-profile-edit.css";
export interface RdsCompProfileEditProps {
  profileEditData?: any;
  onSaveHandler?: (data: any) => void;
}

const RdsCompProfileEdit = (props: RdsCompProfileEditProps) => {
  const [formData, setFormData] = useState(props.profileEditData);

  useEffect(() => {
    setFormData(props.profileEditData);
  }, [props.profileEditData]);

  const handleDataChanges = (value: any, key: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const isFormValid = () => {
    const nameValid = formData?.name?.trim().length > 0;
    const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
      formData?.email
    );
    const phoneValid = /^\d{10,}$/.test(formData?.phoneNumber);
    const userNameValid = formData?.userName?.trim().length > 0;
    return nameValid && emailValid && phoneValid && userNameValid;
  };

  function emitSaveData(event: any) {
    event.preventDefault();
    props.onSaveHandler && props.onSaveHandler(formData);
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      userName: "",
    });
  }

  return (
    <div>
      <div className="tab-content py-4">
        <form>
          <div className="custom-content-scroll">
            <div className="row align-items-center">
              <div className="col-md-3 text-center cursor-pointer sm-p-0">
                <img src="./assets/edit-pic.png" />
                <input type="file" accept="image/*" className="d-none" />
              </div>
              <div className="col-md-9">
                <div className="form-group mb-3">
                  <RdsInput
                    inputType="text"
                    required={true}
                    name="Name"
                    label={true}                    
                    id="name"
                    placeholder="Enter Name"
                    onChange={(e) => {
                      handleDataChanges(e.target.value, "name");
                    }}
                    value={formData?.name}
                    validatonPattern={/^.{0,}$/}
                    validationMsg="This Field Is Required"
                    dataTestId="name"
                  ></RdsInput>
                  <div className="form-control-feedback"></div>
                </div>
                <div className="form-group mb-3">
                  <RdsInput
                    required={true}
                    inputType="email"
                    name="Email Address"
                    label={true}
                    placeholder="Enter Email Address"                    
                    id="email"
                    onChange={(e) => {
                      handleDataChanges(e.target.value, "email");
                    }}
                    value={formData?.email}
                    dataTestId="email"
                    validatonPattern={
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                    }
                    validationMsg="Please Enter Valid Email Address"
                  ></RdsInput>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-6 col-md-6 ">
                <div className="mb-3">
                  <RdsInput
                    placeholder="Enter Phone Nunber"
                    inputType="number"
                    name="Phone Number"
                    label={true}
                    
                    id="phone"
                    required={true}
                    onChange={(e) => {
                      handleDataChanges(e.target.value, "phoneNumber");
                    }}
                    value={formData?.phoneNumber}
                    dataTestId="phone-number"
                    validatonPattern={/^\d{10,}$/}
                    validationMsg="Phone number must contain only numbers and be at least 10 digits long"
                  ></RdsInput>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="mb-3">
                  <RdsInput
                    placeholder="Enter Username"
                    inputType="text"
                    name="User Name"
                    label={true}                    
                    id="username"
                    required={true}
                    onChange={(e) => {
                      handleDataChanges(e.target.value, "userName");
                    }}
                    value={formData?.userName}
                    dataTestId="username"
                    validatonPattern={/^.{0,}$/}
                    validationMsg="This Field Is Required."
                  ></RdsInput>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
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
              isDisabled={!isFormValid()}
              onClick={(e: any) => emitSaveData(e)}
            ></RdsButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RdsCompProfileEdit;
