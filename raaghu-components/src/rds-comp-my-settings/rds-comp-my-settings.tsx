import React, { useState } from "react";
import { RdsButton, RdsInput } from "../rds-elements";
import { useTranslation } from "react-i18next";
export interface RdsCompMySettingsProps { }
const RdsCompMySettings = (props: RdsCompMySettingsProps) => {
    const { t } = useTranslation();
    const [curPass, setCurPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [curNewPass, setCurNewPass] = useState("");
    const [email, setEmail] = useState("");
    const [ProfileNameErrorMessage, setProfileNameErrorMessage] =
        useState<string>("");
    const [UserNameErrorMessage, setUserNameErrorMessage] = useState<string>("");
    const [EmailErrorMessage, setEmailErrorMessage] = useState<string>("");
    const [error1, setError1] = useState("");
    const [error2, setError2] = useState("");
    const [error3, setError3] = useState("");
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const isCurPassValid = (curPass: any) => {
        if (!curPass || curPass.length <= 8) {
            return false;
        }
        return true;
    };
    const isNewPassValid = (newPass: any) => {
        if (!newPass || newPass.length <= 8) {
            return false;
        }
        return true;
    };
    const isCurNewPassValid = (curNewPass: any) => {
        if (!curNewPass || curNewPass.length <= 8) {
            return false;
        } else if (newPass != curNewPass) {
            return false;
        }
        return true;
    };
    const emailHandler = (event: any) => {
        if (!emailRegex.test(event.target.value)) {
            setEmailErrorMessage("Please enter a valid email address.");
        } else {
            setEmailErrorMessage("");
        }
        setEmail(event.target.value);
    };
    const curPasshandleChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        if (!isCurPassValid(event.target.value)) {
            setError1("Current Password is invalid");
        } else {
            setError1("");
        }
        setCurPass(event.target.value);
    };
    const newPasshandleChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        if (!isNewPassValid(event.target.value)) {
            setError2("New passowrd is invalid");
        } else {
            setError2("");
        }
        setNewPass(event.target.value);
    };

    const curNewPasshandleChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        if (newPass != curNewPass) {
            setError3("Password mismatch found");
        } else {
            setError3("");
        }
        setCurNewPass(event.target.value);
    };
    const ProfileNameValidation = (ProfileName: string) => {
        ProfileName === ""
            ? setProfileNameErrorMessage("Profile Name is required")
            : setProfileNameErrorMessage("");
    };
    const UserNameValidation = (UserName: string) => {
        UserName === ""
            ? setUserNameErrorMessage("User Name is required")
            : setUserNameErrorMessage("");
    };
    const EmailValidation = () => {
        if (!emailRegex.test(email)) {
            setEmailErrorMessage("Please enter a valid email address.");
        } else {
            setEmailErrorMessage("");
        }
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCurPass("");
        setNewPass(" ");
        setCurNewPass("");
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <RdsInput
                        label="Profile Name"
                        size="medium"
                        inputType="text"
                        name="ProfileName"
                        placeholder="admin"
                        required
                        onBlur={(e) => ProfileNameValidation(e.target.value)}
                    />
                    {ProfileNameErrorMessage != "" && (
                        <div className="form-control-feedback">
                            <span className="text-danger">{ProfileNameErrorMessage}</span>
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <RdsInput
                        label="Email"
                        size="medium"
                        inputType="text"
                        name="Email"
                        placeholder="contact@waiin.com"
                        required
                        onChange={emailHandler}
                    />
                    {EmailErrorMessage != "" && (
                        <div className="form-control-feedback">
                            <span className="text-danger">{EmailErrorMessage}</span>
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <RdsInput
                        label="User Name"
                        size="medium"
                        inputType="text"
                        name="UserName"
                        placeholder="admin"
                        required
                        onBlur={(e) => UserNameValidation(e.target.value)}
                    />
                    {UserNameErrorMessage != "" && (
                        <div className="form-control-feedback">
                            <span className="text-danger">{UserNameErrorMessage}</span>
                        </div>
                    )}
                </div>

                <div className="fw-normal mt-1 mb-3">
                    <RdsInput
                        label="Current password "
                        required={true}
                        placeholder="Current password "
                        inputType="password"
                        onChange={curPasshandleChange}
                        value={curPass}
                        name={"curPass"}
                        showIcon= {false}
                    ></RdsInput>
                    {error1 && <span className="text-danger">{error1}</span>}
                </div>
                <div className=" fw-normal mb-3">
                    <RdsInput
                        label="New password"
                        required={true}
                        placeholder="New password"
                        inputType="password"
                        onChange={newPasshandleChange}
                        name={"newPass"}
                        value={newPass}
                    ></RdsInput>
                    {error2 && <span className="text-danger">{error2}</span>}
                </div>
                <div className=" fw-normal mb-3">
                    <RdsInput
                        label="Confirm new password"
                        required={true}
                        placeholder="Confirm new password"
                        inputType="password"
                        onChange={curNewPasshandleChange}
                        name={"curNewPass"}
                        value={curNewPass}
                        showIcon= {false}
                    ></RdsInput>
                    {error3 && <span className="text-danger">{error3}</span>}
                </div>

                <div className="row">
                    <div className="col-2">
                        <RdsButton
                            label={t("Cancel") || ""}
                            colorVariant="primary"
                            block={true}
                            tooltipTitle={""}
                            type="button"
                            isOutline={true}
                        />
                    </div>
                    <div className="col-2">
                        <RdsButton
                            label={t("Save") || ""}
                            colorVariant="primary"
                            block={true}
                            tooltipTitle={""}
                            type="submit"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RdsCompMySettings;
