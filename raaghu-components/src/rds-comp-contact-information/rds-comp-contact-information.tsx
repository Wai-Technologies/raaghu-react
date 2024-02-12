import React, { useState } from "react";
import { RdsButton, RdsInput, RdsLabel } from "../rds-elements";

export interface RdsCompContactInfoProps {
    onContinue?: (
        event: React.FormEvent<HTMLFormElement>,
        contactInfomation: any
    ) => void;
}
const RdsCompContactInformation = (props: RdsCompContactInfoProps) => {
    const [user, setUser] = useState<any>({
        email: "",
        contact: "",
        checked: false,
    });
    const [error, setError] = useState<any>({
        email: "",
        contact: "",
    });

    const isEmailValid = (email: any) => {
        if (!email || email.length === 0) {
            return false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            return false;
        }

        return true;
    };
    const isContactValid = (contact: any) => {
        if (!contact || contact.length === 0) {
            return false;
        }
        return true;
    };

    const emailhandleChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        if (!isEmailValid(event.target.value)) {
            setError({ ...error, email: "Email is invalid" });
        } else {
            setError({ ...error, email: "" });
        }
        setUser({ ...user, email: event.target.value });
    };
    const contacthandleChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        if (!isContactValid(event.target.value)) {
            setError({ ...error, contact: "Contact is invalid" });
        } else {
            setError({ ...error, contact: "" });
        }
        setUser({ ...user, contact: event.target.value });
    };

    const checkedHandeler = (event: any) => {
        setUser({ ...user, checked: event.target.checked });
    };
    const isFormValid =
        isContactValid(user.contact) && isEmailValid(user.email) && user.checked;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onContinue != undefined && props.onContinue(event, user);
        setUser({ ...user, email: "", contact: "", checked: false });
    };
    return (
        <>
            <div>
                <form onSubmit={handleSubmit} data-testid="contact-info-form">
                    <div className="mt-1 mb-3">
                        <RdsLabel
                            label="Email Address"
                            fontWeight={"600"}
                            required={true}
                        />
                        <RdsInput
                            placeholder="Enter Email address"
                            inputType="email"
                            onChange={emailhandleChange}
                            value={user.email}
                            name={"email"}
                            dataTestId="email"
                        ></RdsInput>
                        {error.email != "" && (
                            <span className="text-danger">{error.email}</span>
                        )}
                    </div>

                    <div className=" mb-3">
                        <RdsLabel
                            label="Contact Number"
                            required={true}
                            fontWeight={"600"}
                        />
                        <RdsInput
                            placeholder="Enter Contact Number"
                            inputType="text"
                            onChange={contacthandleChange}
                            name={"fullname"}
                            value={user.contact}
                            dataTestId="contact-number"
                        ></RdsInput>
                        {error.contact != "" && (
                            <span className="text-danger">{error.contact}</span>
                        )}
                    </div>
                    <div className="form-check mt-2 mb-4">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked={user.checked}
                            id="flexCheckDefault"
                            onChange={checkedHandeler}
                            data-testid="terms-and-condition"
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            I have read the terms and conditions and agree to the sale of my
                            personal information to the highest bidder.
                        </label>
                    </div>
                    <RdsButton
                        label="Continue"
                        colorVariant="primary"
                        isDisabled={!isFormValid}
                        block={true}
                        tooltipTitle={""}
                        type="submit"
                        dataTestId="continue"
                    />
                </form>
            </div>
        </>
    );
};
export default RdsCompContactInformation;
