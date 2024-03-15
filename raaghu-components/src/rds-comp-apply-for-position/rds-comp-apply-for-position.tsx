import React, { useState } from "react";
import { RdsInput } from "../rds-elements";
import { RdsButton, RdsTextArea, RdsFileUploader, RdsLabel } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompApplyForPositionProps {
    onApply?: (applicantDetails: any) => void;
}

const RdsCompApplyForPosition = (props: RdsCompApplyForPositionProps) => {
    const [user, setUser] = useState({
        email: "",
        fullName: "",
        contactNumber: "",
        position: "",
        period: "",
        file: [],
    });
    const [error, setError] = useState({
        email: "",
        fullName: "",
        contactNumber: "",
        position: "",
        period: "",
    });

    const isEmailValid = (email: any) => {
        if (!email || email.length === 0) {
            return false;
        }
        else if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))) {
            return false;
        }
        else return true;

    };
    const isFullNamehValid = (fullName: any) => {
        if (!fullName || fullName.length === 0) {
            return false;
        }
        else return true;
    };
    const isPositionValid = (position: any) => {
        if (!position || position.length === 0) {
            return false;
        }
        else return true;
    };
    const isPeriodValid = (period: any) => {
        if (!period || period.length === 0) {
            return false;
        }
        else return true;
    };
    const isContactNumberValid = (contactNumber: any) => {
        if (!contactNumber || contactNumber.length === 0) {
            return false;
        }
        else return true;
    };

    const isFormValid = isEmailValid(user.email) && isFullNamehValid(user.fullName) && isPositionValid(user.position) && isPeriodValid(user.period) && isContactNumberValid(user.contactNumber);

    const emailhandleChange = (e: any) => {
        if (!isEmailValid(e.target.value)) {
            setError({ ...error, email: "Email is invalid" });

        } else {
            setError({ ...error, email: "" });
        }
        setUser({ ...user, email: e.target.value });
    };
    const fullNamehandleChange = (e: any) => {
        if (!isFullNamehValid(e.target.value)) {
            setError({ ...error, fullName: "Full Name is invalid" });

        } else {
            setError({ ...error, fullName: "" });
        }
        setUser({ ...user, fullName: e.target.value });
    };
    const positionhandleChange = (e: any) => {
        if (!isPositionValid(e.target.value)) {
            setError({ ...error, position: "Position is invalid" });

        } else {
            setError({ ...error, position: "" });
        }
        setUser({ ...user, position: e.target.value });
    };
    const periodhandleChange = (e: any) => {
        if (!isPeriodValid(e.target.value)) {
            setError({ ...error, period: "Period is invalid" });

        } else {
            setError({ ...error, period: "" });
        }
        setUser({ ...user, period: e.target.value });
    };
    const contactNumberhandleChange = (e: any) => {
        if (!isContactNumberValid(e.target.value)) {
            setError({ ...error, contactNumber: "Contact Number is invalid" });

        } else {
            setError({ ...error, contactNumber: "" });
        }
        setUser({ ...user, contactNumber: e.target.value });
    };

    const fileArrayHandler = (files: any) => {
        setUser({ ...user, file: files });
    };

    const handleSubmit: any = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        props.onApply != undefined && props.onApply(user);
        setUser({
            email: "",
            fullName: "",
            contactNumber: "",
            position: "",
            period: "",
            file: []
        });
    };
    const { t } = useTranslation();
    return (
        <div>
            <form onSubmit={handleSubmit}
            >
                <div className="row mt-5 ">
                    <div className="col-lg-6  mb-4 col-md-12">
                        <RdsInput
                            label="Email ID"
                            placeholder="name@domain.com"
                            inputType="email"
                            onChange={emailhandleChange}
                            value={user.email}
                            name={"email"}
                            required
                            dataTestId="email"
                        ></RdsInput>
                        {error.email != "" && <span className="text-danger">{error.email}</span>}
                    </div>

                    <div className="col-lg-6  mb-4 col-md-12">
                        <RdsInput
                            label="Full Name"
                            placeholder="Full Name"
                            inputType="text"
                            onChange={fullNamehandleChange}
                            name={"fullName"}
                            value={user.fullName}
                            required
                            dataTestId="full-name"
                        ></RdsInput>
                        {error.fullName && (
                            <span className="text-danger">{error.fullName}</span>
                        )}
                    </div>
                </div>
                <div className="row ">
                    <div className="col-md-6  mb-4 col-sm-12">
                        <RdsInput
                            label="Contact Number"
                            placeholder="+91 9087654321"
                            inputType="text"
                            onChange={contactNumberhandleChange}
                            value={user.contactNumber}
                            name={"contactNumber"}
                            dataTestId="contact-number"
                            required
                        ></RdsInput>
                        {error.contactNumber && (
                            <span className="text-danger">{error.contactNumber}</span>
                        )}
                    </div>

                    <div className="col-md-6 mb-4 col-sm-12">
                        <RdsInput
                            label="Applying For Position:"
                            placeholder="Position Name"
                            inputType="text"
                            onChange={positionhandleChange}
                            name={"position"}
                            value={user.position}
                            required
                            dataTestId="position-name"
                        ></RdsInput>
                        {error.position && (
                            <span className="text-danger">{error.position}</span>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className="mb-2">
                            <RdsInput
                                label="When Can You Start?"
                                placeholder="Notice Period"
                                inputType="text"
                                onChange={periodhandleChange}
                                value={user.period}
                                name={"period"}
                                required
                                dataTestId="notice-period"
                            ></RdsInput>
                            {error.period && (
                                <span className="text-danger">{error.period}</span>
                            )}

                        </div>
                        <div className='p-2'>

                            <RdsFileUploader
                                label="Upload Resume"
                                colorVariant="primary"
                                limit={5}
                                extensions="(PNG, JPG, DOC, PDF, PTT)"
                                multiple={true}
                                size=""
                                onFileArray={fileArrayHandler}
                            />
                        </div>

                    </div>

                    <div className="col-md-6  col-sm-12">
                        <RdsTextArea label="Cover Letter" placeholder="Cover Letter.." rows={8} dataTestId="cover-letter" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6  mt-3 col-sm-12">
                        <RdsButton
                            label={t("Apply Now") || ""}
                            colorVariant="primary"
                            isDisabled={!isFormValid}
                            block={true}
                            tooltipTitle={""}
                            type="submit"
                            dataTestId="apply-now"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RdsCompApplyForPosition;
