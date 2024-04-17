import { RdsButton, RdsInput } from "../rds-elements";
import React, { useEffect, useState } from "react";

export interface RdsCompPersonalInfoProps {
    personalInfo?: any;
    onEmail: (isEmailClicked?: boolean) => void;
    onSaveHandler?: (data: any) => void;
    handleVerifyEmailSubmit?: any;
    reset?: boolean;
}

const RdsCompPersonalInfo = (props: RdsCompPersonalInfoProps) => {
    const [formData, setFormData] = useState(props.personalInfo);
    const [isEmailClicked, setIsEmailClicked] = useState(false);
    const [inputReset, setInputReset] = useState(false);

    useEffect(() => {
        setFormData(props.personalInfo);
    }, [props.personalInfo]);

    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);

    const handleDataChanges = (value: any, key: string) => {
        setFormData({ ...formData, [key]: value });
    }

    const emailHandler = (event: any, isEmailClicked: boolean) => {
        event.preventDefault();
        setIsEmailClicked(true);
        props.onEmail(true);
    }

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(formData);
        setInputReset(!inputReset);
        setFormData({
            userName: "",
            name: "",
            surname: "",
            email: "",
            phoneNumber: "",
        });
    }

    return (
        <form>
            <div className="custom-content-scroll">
                <div className="row py-xxl-4 py-xl-4 py-lg-4 py-md-4 py-0">
                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-12">
                        <RdsInput
                            size="medium"
                            reset={inputReset}
                            label="Admin"
                            inputType="text"
                            isDisabled={false}
                            readonly={false}
                            placeholder="UserName"
                            value={formData?.userName}
                            onChange={(e) => {
                                handleDataChanges(e.target.value, "userName");
                            }}
                            required={true}
                            dataTestId="admin"
                       
                        ></RdsInput>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-12">
                        <RdsInput
                            size="medium"
                            reset={inputReset}
                            label="Name"
                            inputType="text"
                            isDisabled={false}
                            readonly={false}
                            placeholder="Name"
                            value={formData?.name}
                            onChange={(e) => {
                                handleDataChanges(e.target.value, "name");
                            }}
                            required={true}
                            dataTestId="name"
                        ></RdsInput>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-12">
                        <RdsInput
                            size="medium"
                            reset={inputReset}
                            label="Surname"
                            inputType="text"
                            isDisabled={false}
                            readonly={false}
                            placeholder="Surname"
                            value={formData?.surname}
                            onChange={(e) => {
                                handleDataChanges(e.target.value, "surname");
                            }}
                            required={true}
                            dataTestId="surname"
                        ></RdsInput>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-12 mb-xxl-3 mb-xl-3 mb-lg-3 mb-md-3 mb-3">
                        <div className="d-flex personal-info-wid">
                            <RdsInput
                                size="medium"
                                reset={inputReset}
                                label="Email"
                                inputType="text"
                                isDisabled={false}
                                readonly={false}
                                placeholder="Email"
                                value={formData?.email}
                                onChange={(e) => {
                                    handleDataChanges(e.target.value, "email");
                                }}
                                required={false}
                                dataTestId="email"
                            ></RdsInput>
                            <span className="mt-auto d-block nowrap ms-2">
                                <RdsButton
                                    label="Verify Email"
                                    colorVariant="primary"
                                    block={false}
                                    type="submit"
                                    onClick={(e) => emailHandler(e, isEmailClicked)}
                                    dataTestId="verify-email"
                                />
                            </span>
                        </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-12 mb-xxl-3 mb-xl-3 mb-lg-3 mb-md-3 mb-3">
                        <RdsInput
                            size="medium"
                            reset={inputReset}
                            label="Phone Number"
                            inputType="text"
                            isDisabled={false}
                            readonly={false}
                            placeholder="Phone Number"
                            value={formData?.phoneNumber}
                            onChange={(e) => {
                                handleDataChanges(e.target.value, "phoneNumber");
                            }}
                            required={false}
                            dataTestId="phone-number"
                        ></RdsInput>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                <RdsButton
                    label="Save"
                    colorVariant="primary"
                    block={false}
                    type="submit"
                    size="small"
                    onClick={(e: any) => emitSaveData(e)}
                    dataTestId="save"
                />
            </div>
        </form>
    );
};

export default RdsCompPersonalInfo;
