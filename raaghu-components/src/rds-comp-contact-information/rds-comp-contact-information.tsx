import React, { useEffect, useState } from "react";
import { RdsButton, RdsInput, RdsLabel } from "../rds-elements";

export interface RdsCompContactInfoProps {
    onSaveHandler?: (
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

    const handleDataChanges = (value: any, key: string) => {
            if (key === "email" && !isEmailValid(value)) {
                setError({ ...error, email: "Email is invalid" });
            } else if (key === "contact" && !isContactValid(value)) {
                setError({ ...error, contact: "Contact is invalid" });
            } else {
                setError({ ...error, [key]: "" });
        }
    
        setUser({ ...user, [key]: value });
    };

    const isFormValid =
        isContactValid(user.contact) && isEmailValid(user.email) && user.checked;

    const emitSaveData = (event: any) => {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(user);
        setUser({email: "", contact: "", checked: false });
    };
    return (
        <>
            <div>
                <form data-testid="contact-info-form">
                    <div className="mt-1 mb-3">
                        <RdsLabel
                            label="Email Address"
                            fontWeight={"600"}
                            required={true}
                        />
                        <RdsInput
                            placeholder="Enter Email address"
                            inputType="email"
                            onChange={(e)=>handleDataChanges(e.target.value, "email")}
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
                            onChange={(e)=>handleDataChanges(e.target.value, "contact")}
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
                            onChange={(e) => handleDataChanges(e.target.checked, "checked")}
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
                        onClick={(e)=>emitSaveData(e)}
                    />
                </form>
            </div>
        </>
    );
};
export default RdsCompContactInformation;