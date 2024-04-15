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
    const [error, setError] = useState<any>(props.profileEditData);
    
    useEffect(() => {
      setFormData(props.profileEditData);
     }, [props.profileEditData]);

    const isEmailValid = (email: any) => {
        if (!email || email.length === 0) {
            return false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            return false;
        }
        return true;
    };
    const isContactValid = (phoneNumber: any) => {
        if (!phoneNumber || phoneNumber.length >= 10) {
            return false;
        }
        return true;
    };

    const handleDataChanges = (value: any, key: string) => {
        if (key === "email" && !isEmailValid(value)) {
            setError({ ...error, email: "Email is invalid" });
        } else if (key === "phoneNumber" && !isContactValid(value)) {
            setError({ ...error, phoneNumber: "Contact is invalid" });
        } else {
            setError({ ...error, [key]: "" });
        }
      setFormData({ ...formData, [key]: value });
    };

    function emitSaveData(event: any) {
      event.preventDefault();
      props.onSaveHandler && props.onSaveHandler(formData);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        userName: ""
      });
    }

    return (
        <div>
            <div className="tab-content py-4">
                <form>
                    <div className="custom-content-scroll">
                    <div className="row align-items-center">
                        <div className="col-md-3 text-center cursor-pointer sm-p-0">
                            <img src='./raaghu-components/src/rds-comp-profile-edit/edit-pic.png' />
                             <input type="file" accept="image/*" className="d-none" />
                        </div>
                        <div className="col-md-9 sm-p-0">
                            <div className="form-group mb-3">
                                <RdsInput
                                    inputType="text"
                                    required={true}
                                    label="Name"
                                    name="name"
                                    id="name"
                                    placeholder="Enter Name"
                                    onChange={(e) => {
                                      handleDataChanges(e.target.value, "name");
                                    }}
                                    value={formData?.name}
                                    dataTestId="name"
                                ></RdsInput>
                                <div className="form-control-feedback"></div>
                            </div>
                            <div className="form-group mb-3">
                                <RdsInput
                                    required={true}
                                    inputType="email"
                                    label="Email Address"
                                    placeholder="Enter Email Address"
                                    name="email"
                                    id="email"
                                    onChange={(e) => {
                                      handleDataChanges(e.target.value, "email");
                                    }}
                                    value={formData?.email}
                                    dataTestId="email"
                                ></RdsInput>
                                {error?.email != "" && (
                            <span className="text-danger">{error?.email}</span>
                        )}
                                </div>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-lg-6 col-md-6 ">
                            <div className="mb-3">
                                <RdsInput
                                    placeholder="Enter Phone Nunber"
                                    inputType="number"
                                    label="Phone Number"
                                    name="phone"
                                    id="phone"                                    
                                    required={true}
                                    onChange={(e) => {
                                      handleDataChanges(e.target.value, "phoneNumber");
                                    }}
                                    value={formData?.phoneNumber}
                                    dataTestId="phone-number"
                                ></RdsInput>
                                {error?.phoneNumber != "" && (
                            <span className="text-danger">{error?.phoneNumber}</span>
                        )}
                                </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="mb-2">
                                <RdsInput
                                    placeholder="Enter Username"
                                    inputType="text"
                                    label="User Name"
                                    name="userName"
                                    id="username"                                   
                                    required={true}
                                    onChange={(e) => {
                                      handleDataChanges(e.target.value, "userName");
                                    }}
                                    value={formData?.userName}
                                    dataTestId="username"
                                ></RdsInput>
                               </div>
                        </div>
                    </div>
                    </div>
                    <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
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
                            onClick={(e: any) => emitSaveData(e)}
                        ></RdsButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RdsCompProfileEdit;
