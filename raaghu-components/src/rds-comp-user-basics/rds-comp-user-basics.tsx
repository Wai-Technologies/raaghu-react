import React, { useState, useEffect } from "react";
import { RdsCheckbox, RdsInput, } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompUserBasicsProps {
    userData?: any;
    createUser?: any
    isEdit?: boolean;
    reset?: boolean;
}

const RdsCompUserBasics = (props: RdsCompUserBasicsProps) => {
   

    const [inputReset, setInputReset] = useState(props.reset)

    useEffect(() => {
        setInputReset(props.reset)
    }, [props.reset])

    const [userData, setUserData] = useState<any>(props.userData);

    const setName = (event: any) => {
        setUserData({ ...userData, name: event.target.value });
        props.createUser({ ...userData, name: event.target.value });
    };

    const setSurname = (event: any) => {
        setUserData({ ...userData, surname: event.target.value });
        props.createUser({ ...userData, surname: event.target.value });
    };

    const setEmail = (event: any) => {
        setUserData({ ...userData, email: event.target.value });
        props.createUser({ ...userData, email: event.target.value });
    };

    const setPassword = (event: any) => {
        setUserData({ ...userData, password: event.target.value });
        props.createUser({ ...userData, password: event.target.value });
    };

    const setUserName = (event: any) => {

        setUserData({ ...userData, userName: event.target.value });
        props.createUser({ ...userData, userName: event.target.value });
    };

    const setPhoneNumber = (event: any) => {
        let inputValue = event.target.value.replace(/[^+0-9\s]/g, '');
        setUserData({ ...userData, phoneNumber: inputValue });
        props.createUser({ ...userData, phoneNumber: inputValue });
    };

    function handletwoFactorEnable(event: any) {
        setUserData({ ...userData, twoFactorEnabled: event.target.checked });
    }
    function handleIsActive(event: any) {
        setUserData({ ...userData, isActive: event.target.checked });
        props.createUser({ ...userData, isActive: event.target.checked });
    }
    function handleLockoutEnabled(event: any) {
        setUserData({ ...userData, lockoutEnabled: event.target.checked });
        props.createUser({ ...userData, lockoutEnabled: event.target.checked });
    }

    function handleShouldChangePasswordOnNextlogin(event: any) {
        setUserData({ ...userData, shouldChangePasswordOnNextLogin: event.target.checked });
        props.createUser({ ...userData, shouldChangePasswordOnNextLogin: event.target.checked });
    }

    useEffect(() => {
        setUserData(props.userData);
    }, [props.userData]);


    return (
        <>
            <form className="pt-3">
                <div className="flex-column-reverse flex-lg-row flex-md-row row">
                    <div className="col-lg-6 col-md-6">
                        <RdsInput
                            value={userData?.name}
                            placeholder="Enter Name"
                            inputType="text"
                            label="Name"
                            name="name"
                            required={true}
                            onChange={(e) => { setName(e); }}
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
                            onChange={(e) => { setSurname(e); }}
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
                                label="EmailAddress"
                                name="email"
                                required={true}
                                onChange={(e) => { setEmail(e); }}
                                reset={inputReset}
                            ></RdsInput>
                        </div>
                    </div>
                    {!props.isEdit && (<div className="col-lg-6 col-md-6">
                        <div className="">
                            <RdsInput
                                value={userData?.password}
                                inputType="password"
                                label="Password"
                                placeholder="Enter Password"
                                name="password"
                                required={true}
                                onChange={(e) => { setPassword(e); }}
                                reset={inputReset}
                                showIcon={true}
                            ></RdsInput>
                        </div>
                    </div>)}
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
                                onChange={(e) => { setUserName(e); }}
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
                                label="PhoneNumber"
                                name="phone"
                                required={true}
                                onChange={(e) => { setPhoneNumber(e); }}
                                reset={inputReset}
                            ></RdsInput>
                        </div>
                    </div>

                </div>
                {props.isEdit && (<div className="row">
                    <div className="mb-2 ">
                        <RdsCheckbox
                            id="0"
                            label="Two Factor Authentication"
                            checked={userData?.twoFactorEnabled}
                            onChange={e => { handletwoFactorEnable(e); }}
                        ></RdsCheckbox>
                    </div>
                </div>)}
                <div className="row pt-1">
                    <div className="mb-2 ">
                        <RdsCheckbox
                            id="0"
                            label="Active"
                            checked={userData?.isActive}
                            onChange={e => { handleIsActive(e); }}
                        ></RdsCheckbox>
                    </div>
                </div>
                <div className="row">
                    <div className="mb-2">
                        <RdsCheckbox
                            id="1"
                            label="Should Change Password On Next Login"
                            checked={userData?.shouldChangePasswordOnNextLogin}
                            onChange={e => { handleShouldChangePasswordOnNextlogin(e); }}>
                        </RdsCheckbox>
                    </div>
                </div>
                <div className="row">
                    <div className="mb-2">
                        <RdsCheckbox
                            id="0"
                            label="Account Lockout"
                            checked={userData?.lockoutEnabled}
                            onChange={e => { handleLockoutEnabled(e); }}
                        ></RdsCheckbox>
                    </div>
                </div>
            </form >
        </>
    );
};

export default RdsCompUserBasics;
