import { RdsButton, RdsInput } from "../rds-elements";
import React, { useEffect, useState } from "react";


const RdsCompPersonalInfo = (props: any) => {
    const [formData, setPersonalFormData] = useState(props.personalInfo);

    useEffect(() => {
        setPersonalFormData(props.personalInfo);
    }, [props.personalInfo]);

    const handlePersonalDataSubmit = (event: any) => {
        event.preventDefault();
    };

    const handleVerifyEmailSubmit = (event: any) => {
        event.preventDefault();
    };

    function setUserName(value: any) {
        setPersonalFormData({ ...formData, userName: value });
    }

    function setName(value: any) {
        setPersonalFormData({ ...formData, name: value });
    }

    function setSurname(value: any) {
        setPersonalFormData({ ...formData, surname: value });
    }

    function setEmail(value: any) {
        setPersonalFormData({ ...formData, email: value });
    }

    function setPhoneNumber(value: any) {
        setPersonalFormData({ ...formData, phoneNumber: value });
    }

    return (
        <form onSubmit={handlePersonalDataSubmit}>
            <div className="row py-xxl-4 py-xl-4 py-lg-4 py-md-4 py-0">
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-12">
                    <RdsInput
                        size="medium"
                        label="Admin"
                        inputType="text"
                        isDisabled={false}
                        readonly={false}
                        placeholder="UserName"
                        value={formData?.userName}
                        onChange={(e: any) => setUserName(e.target.value)}
                        required={true}
                        dataTestId="admin"
                    ></RdsInput>
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-12">
                    <RdsInput
                        size="medium"
                        label="Name"
                        inputType="text"
                        isDisabled={false}
                        readonly={false}
                        placeholder="Name"
                        value={formData?.name}
                        onChange={(e: any) => setName(e.target.value)}
                        required={true}
                        dataTestId="name"
                    ></RdsInput>
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-12">
                    <RdsInput
                        size="medium"
                        label="Surname"
                        inputType="text"
                        isDisabled={false}
                        readonly={false}
                        placeholder="Surname"
                        value={formData?.surname}
                        onChange={(e: any) => setSurname(e.target.value)}
                        required={true}
                        dataTestId="surname"
                    ></RdsInput>
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-12 mb-xxl-3 mb-xl-3 mb-lg-3 mb-md-3 mb-3">
                    <div className="d-flex personal-info-wid">
                        <RdsInput
                            size="medium"
                            label="Email"
                            inputType="text"
                            isDisabled={false}
                            readonly={false}
                            placeholder="Email"
                            value={formData?.email}
                            onChange={(e: any) => setEmail(e.target.value)}
                            required={false}
                            dataTestId="email"
                        ></RdsInput>
                        <span className="mt-auto d-block nowrap ms-2">
                            <RdsButton
                                label="Verify Email"
                                colorVariant="primary"
                                block={false}
                                type="submit"
                                onClick={() => {
                                    props.handleVerifyEmailSubmit(formData);
                                }}
                                dataTestId="verify-email"
                            /></span></div>
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-12 mb-xxl-3 mb-xl-3 mb-lg-3 mb-md-3 mb-3">
                    <RdsInput
                        size="medium"
                        label="PhoneNumber"
                        inputType="text"
                        isDisabled={false}
                        readonly={false}
                        placeholder="PhoneNumber"
                        value={formData?.phoneNumber}
                        onChange={(e: any) => setPhoneNumber(e.target.value)}
                        required={false}
                        dataTestId="phone-number"
                    ></RdsInput>
                </div>
            </div>
            <div className="row">
                <div className="mt-3 footer-buttons px-0 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row d-flex bg-transparent">
                    <RdsButton
                        label="Save"
                        colorVariant="primary"
                        block={false}
                        type="submit"
                        size="small"
                        onClick={() => {
                            props.handlePersonalDataSubmit(formData);
                        }}
                        dataTestId="save"
                    />
                </div>
            </div>
        </form>
    );
};

export default RdsCompPersonalInfo;
