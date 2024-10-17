import React, { useEffect, useState } from "react";
import { RdsButton, RdsInput, RdsLabel } from "../rds-elements";

export interface RdsCompContactInfoProps {
    onSaveHandler?: (
        contactInfomation: any
    ) => void;
    contactInformationData?: any;
}
const RdsCompContactInformation = (props: RdsCompContactInfoProps) => {
    const [user, setUser] = useState<any>(props.contactInformationData);
    const [error, setError] = useState<any>(props.contactInformationData);

    useEffect(() => {
        setUser(props.contactInformationData);
    }, [props.contactInformationData]);

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
        isContactValid(user?.contact) && isEmailValid(user?.email) && user?.checked;

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
                        <RdsInput
                            placeholder="Enter Email address"
                            inputType="email"
                            label="Email Address"
                            onChange={(e)=>handleDataChanges(e.target.value, "email")}
                            value={user?.email}
                            name={"email"}
                            dataTestId="email"
                            required={true}
                            validatonPattern={
                                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                              }
                              validationMsg="Please Enter Valid Email Address."
                        ></RdsInput>
                    </div>

                    <div className=" mb-3">
                        <RdsInput
                            placeholder="Enter Contact Number"
                            inputType="text"
                            label="Contact Number"
                            required={true}
                            onChange={(e)=>handleDataChanges(e.target.value, "contact")}
                            onKeyDown={(e) => {
                                const inputElement = e.target as HTMLInputElement;
                                    const currentLength = inputElement.value.length;
                                    const isPlusEntered = inputElement.value.startsWith('+');
                                    const maxLength = isPlusEntered ? 13 : 10;
                                   
                                    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
                                    const isNumberOrPlus = /[0-9+]/.test(e.key);
                           
                                    if (!isNumberOrPlus && !allowedKeys.includes(e.key)) {
                                        e.preventDefault();
                                    }
                           
                                    if ((/[0-9]/.test(e.key) || e.key === '+') && (currentLength >= maxLength || (e.key === '+' && currentLength > 0))) {
                                        e.preventDefault();
                                    }
                                }}
                            name={"fullname"}
                            value={user?.contact}
                            dataTestId="contact-number"
                        ></RdsInput>
                    </div>
                    <div className="form-check mt-2 mb-4">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            checked={user?.checked}
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