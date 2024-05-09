import React, { useState, useEffect } from "react";
import { RdsButton, RdsCheckbox, RdsInput, } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompUserBasicsProps {
    userData?: any;
    onSaveHandler?: (data: any) => void;
    reset?: boolean;
}

const RdsCompUserBasics = (props: RdsCompUserBasicsProps) => {
    const [inputReset, setInputReset] = useState(props.reset)
    const [userData, setUserData] = useState(props.userData);

    useEffect(() => {
        setInputReset(props.reset)
    }, [props.reset])

    useEffect(() => {
        setUserData(props.userData);
    }, [props.userData]);

    const handleDataChange = (value: any, key: string) => {
        setUserData({ ...userData, [key]: value });
    };

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(userData);
        setInputReset(!inputReset);
        setUserData({
            name: "",
            surname: "",
            email: "",
            password: "",
            userName: "",
            phoneNumber: "",
            twoFactorEnabled: false,
            isActive: false,
            lockoutEnabled: false,
            shouldChangePasswordOnNextLogin: false
        });
    }

    return (
        <>
            <form className="pt-3">
                <div className="custom-content-scroll">
                    <div className="flex-column-reverse flex-lg-row flex-md-row row">
                        <div className="col-lg-6 col-md-6">
                            <RdsInput
                                value={userData?.name}
                                placeholder="Enter Name"
                                inputType="text"
                                label="Name"
                                name="name"
                                required={true}
                                onChange={(e) => {
                                    handleDataChange(e.target.value, "name");
                                }}
                                reset={inputReset}
                            ></RdsInput>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <RdsInput
                                value={userData?.surname}
                                placeholder="Enter Surname"
                                inputType="text"
                                label="Surname"
                                name="surName"
                                required={true}
                                onChange={(e) => {
                                    handleDataChange(e.target.value, "surname");
                                }}
                                reset={inputReset}
                            ></RdsInput>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="">
                                <RdsInput
                                    value={userData?.email}
                                    placeholder="Enter Email"
                                    inputType="email"
                                    label="Email Address"
                                    name="email"
                                    required={true}
                                    onChange={(e) => {
                                        handleDataChange(e.target.value, "email");
                                    }}
                                    reset={inputReset}
                                ></RdsInput>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="">
                                <RdsInput
                                    value={userData?.password}
                                    inputType="password"
                                    label="Password"
                                    placeholder="Enter Password"
                                    name="password"
                                    required={true}
                                    onChange={(e) => {
                                        handleDataChange(e.target.value, "password");
                                    }}
                                    reset={inputReset}
                                    showIcon={true}
                                ></RdsInput>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div>
                                <RdsInput
                                    value={userData?.userName}
                                    placeholder="Enter Username"
                                    inputType="text"
                                    label="User Name"
                                    name="userName"
                                    required={true}
                                    onChange={(e) => {
                                        handleDataChange(e.target.value, "userName");
                                    }}
                                    reset={inputReset}
                                ></RdsInput>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div>
                                <RdsInput
                                    value={userData?.phoneNumber}
                                    placeholder="Enter Phone"
                                    inputType="text"
                                    label="Phone Number"
                                    name="phone"
                                    required={true}
                                    onChange={(e) => {
                                        handleDataChange(e.target.value, "phoneNumber");
                                    }}
                                    reset={inputReset}
                                ></RdsInput>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="mb-2 ">
                            <RdsCheckbox
                                id="0"
                                label="Two Factor Authentication"
                                checked={userData?.twoFactorEnabled}
                                onChange={(e) => {
                                    handleDataChange(e.target.checked, "twoFactorEnabled");
                                }}
                            ></RdsCheckbox>
                        </div>
                    </div>
                    <div className="row pt-1">
                        <div className="mb-2 ">
                            <RdsCheckbox
                                id="0"
                                label="Active"
                                checked={userData?.isActive}
                                onChange={(e) => {
                                    handleDataChange(e.target.checked, "isActive");
                                }}
                            ></RdsCheckbox>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-2">
                            <RdsCheckbox
                                id="1"
                                label="Should Change Password On Next Login"
                                checked={userData?.shouldChangePasswordOnNextLogin}
                                onChange={(e) => {
                                    handleDataChange(e.target.checked, "shouldChangePasswordOnNextLogin");
                                }}
                            >
                            </RdsCheckbox>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-2">
                            <RdsCheckbox
                                id="0"
                                label="Account Lockout"
                                checked={userData?.lockoutEnabled}
                                onChange={(e) => {
                                    handleDataChange(e.target.checked, "lockoutEnabled");
                                }}
                            ></RdsCheckbox>
                        </div>
                    </div>
                </div>
                <div className="d-flex ps-4 flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
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
                        databsdismiss="offcanvas"
                        dataTestId="save"
                        onClick={(e: any) => emitSaveData(e)}
                    ></RdsButton>
                </div>
            </form >
        </>
    );
};

export default RdsCompUserBasics;
