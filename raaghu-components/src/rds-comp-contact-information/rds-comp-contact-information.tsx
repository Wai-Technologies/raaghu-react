import React, { useEffect, useState } from "react";
import { RdsButton, RdsCheckbox, RdsInput, RdsLabel } from "../rds-elements";

export interface RdsCompContactInfoProps {
    onSaveHandler?: (
        contactInfomation: any
    ) => void;
    contactInformationData?: any;
    reset?: boolean;
}
const RdsCompContactInformation = (props: RdsCompContactInfoProps) => {
    const [user, setUser] = useState<any>(props.contactInformationData);
    const [error, setError] = useState<any>(props.contactInformationData);
    const [inputReset, setInputReset] = useState(false);
    useEffect(() => {
        setUser(props.contactInformationData);
    }, [props.contactInformationData]);
    useEffect(() => {
        setInputReset(!inputReset);
      }, [props.reset]);

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
        setUser({ ...user, [key]: value });
    };

    const isFormValid =
        isContactValid(user?.contact) && isEmailValid(user?.email) && user?.checked;

    const emitSaveData = (event: any) => {
        event.preventDefault();
        setInputReset(!inputReset);
        props.onSaveHandler && props.onSaveHandler(user);
        setUser({email: "", contact: "", checked: false });
    };
    return (
      <>
        <div>
          <form data-testid="contact-info-form">
            <div className="mt-1 mb-3">
              <RdsInput
                id=""
                inputType="Email"
                label="Email"
                labelPosition="top"
                placeholder="Enter Email address"
                required={true}
                readonly={false}
                isDisabled={false}
                size="medium"
                value={user?.email}
                onChange={(e: any) =>
                  handleDataChanges(e.target.value, "email")
                }
                reset={inputReset}
                validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                validationMsg="Please Enter Valid Email Address."
              />
            </div>

            <div className=" mb-3">
              <RdsInput
                placeholder="Enter Contact Number"
                inputType="text"
                label="Contact Number"
                required={true}
                onChange={(e) => handleDataChanges(e.target.value, "contact")}
                onKeyDown={(e) => {
                  const inputElement = e.target as HTMLInputElement;
                  const currentLength = inputElement.value.length;
                  const isPlusEntered = inputElement.value.startsWith("+");
                  const maxLength = isPlusEntered ? 13 : 10;

                  const allowedKeys = [
                    "Backspace",
                    "ArrowLeft",
                    "ArrowRight",
                    "Delete",
                    "Tab",
                  ];
                  const isNumberOrPlus = /[0-9+]/.test(e.key);

                  if (!isNumberOrPlus && !allowedKeys.includes(e.key)) {
                    e.preventDefault();
                  }

                  if (
                    (/[0-9]/.test(e.key) || e.key === "+") &&
                    (currentLength >= maxLength ||
                      (e.key === "+" && currentLength > 0))
                  ) {
                    e.preventDefault();
                  }
                }}
                name={"fullname"}
                value={user?.contact}
                dataTestId="contact-number"
              ></RdsInput>
            </div>
            <div className=" mt-2 mb-4 d-flex">
              <RdsCheckbox
                id="flexCheckDefault"
                label={`${"I have read the terms and conditions and agree to the sale of my personal information to the highest bidder."}`}
                checked={user?.checked}
                onChange={(e) => handleDataChanges(e.target.checked, "checked")}
                dataTestId="remember-me"
              ></RdsCheckbox>{" "}
              <span className="astric"> *</span>
            </div>
            <div className="mt-3 d-flex pb-3 ps-4 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2">
              <RdsButton
                label="Continue"
                colorVariant="primary"
                isDisabled={!isFormValid}
                block={true}
                tooltipTitle={""}
                type="submit"
                dataTestId="continue"
                onClick={(e) => emitSaveData(e)}
              />
            </div>
          </form>
        </div>
      </>
    );
};
export default RdsCompContactInformation;