import React, { useEffect, useState } from "react";
import { RdsInput, RdsButton, RdsSelectList } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompBillingAddressProps {
    onSaveHandler?: (data: any) => void;
    countryList: { option: string, value: any }[];
    IndianStateList: { option: string, value: any }[];
    billingAddressDetails: any;
}

const RdsCompBillingAddress = (props: RdsCompBillingAddressProps) => {
    const [formData, setFormData] = useState(props.billingAddressDetails);

useEffect(() => {
    setFormData(props.billingAddressDetails);
}, [props.billingAddressDetails]);

const handleChange = (value: any, key: string) => {
    setFormData({ ...formData, [key]: value });
}

function emitSaveData(event: any) {
    event.preventDefault();
    props.onSaveHandler && props.onSaveHandler(formData);
    setFormData({
        firstName: "",
        lastName: "",
        company: "",
        phone: "",
        address: "",
        city: "",
        countryList: "",
        indianStateList: "",
        pin: "",
    });
}

    //Regarding Validations messages
    const [firstNameErrorMessage, setFirstNameErrorMessage] =
        useState<string>("");
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState<string>("");
    {
        /* No validations required on Company*/
    }
    const [phoneErrorMessage, setPhoneErrorMessage] = useState<string>("");
    const [addressErrorMessage, setAddressErrorMessage] = useState<string>("");
    const [cityErrorMessage, setCityErrorMessage] = useState<string>("");
    const [postalCodeErrorMessage, setPostalCodeErrorMessage] =
        useState<string>("");
    const [countryErrorMessage, setCountryErrorMessage] = useState<string>("");
    const [stateProvinceErrorMessage, setProvinceStateErrorMessage] =
        useState<string>("");

    //Validation functions
    const firstNameValidation = (firstName: string) => {
        firstName === ""
            ? setFirstNameErrorMessage("First Name is required")
            : setFirstNameErrorMessage("");
    };
    const lastNameValidation = (lastName: string) => {
        lastName === ""
            ? setLastNameErrorMessage("Last Name is required")
            : setLastNameErrorMessage("");
    };
    const phoneValidationHandler = (phone: any) => {
        if (phone.trim() === "") setPhoneErrorMessage("Phone is required");
        else if (phone.trim() != phone)
            setPhoneErrorMessage("Enter valid phone number");
        else if (isNaN(phone)) setPhoneErrorMessage("Enter valid phone number");
        else if (phone.includes("e"))
            setPhoneErrorMessage("Enter valid phone number");
        else setPhoneErrorMessage("");
    };
    const addressValidation = (address: string) => {
        address === ""
            ? setAddressErrorMessage("Address is required")
            : setAddressErrorMessage("");
    };
    const cityValidation = (city: string) => {
        city === ""
            ? setCityErrorMessage("City is required")
            : setCityErrorMessage("");
    };
    const countryValidation = (country: string) => {
        country === "Select Country"
            ? setCountryErrorMessage("Country is required")
            : setCountryErrorMessage("");
    };
    const stateProvinceValidation = (state: string) => {
        state === "Select Country"
            ? setProvinceStateErrorMessage("State/Province is required")
            : setProvinceStateErrorMessage("");
    };
    const postalCodeValidation = (postalCode: string) => {
        postalCode === ""
            ? setPostalCodeErrorMessage("Postal code is required")
            : setPostalCodeErrorMessage("");
        // Postal code need not be ,numeric-only' in some countries
    };
    const { t } = useTranslation();
    return (
        <>
            <div className="contact-information">
                <h3 className="pb-2">Billing Address</h3>
                <form id="billingAddressForm">
                <div className="custom-content-scroll">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <RdsInput
                                label="First Name"
                                size="medium"
                                inputType="text"
                                name="firstName"
                                placeholder="Enter First Name"
                                value={formData?.firstName}
                                onChange={(e) => { handleChange(e.target.value,"firstName"); }}
                                required
                                onBlur={(e) => firstNameValidation(e.target.value)}
                                dataTestId="f-name"
                            />
                            {firstNameErrorMessage != "" && (
                                <div className="form-control-feedback">
                                    <span className="text-danger">{firstNameErrorMessage}</span>
                                </div>
                            )}
                        </div>
                        <div className="col-md-6 mb-3">
                            <RdsInput
                                label="Last Name"
                                size="medium"
                                inputType="text"
                                name="lastName"
                                placeholder="Enter Last Name"
                                required={true}
                                onBlur={(e) => lastNameValidation(e.target.value)}
                                dataTestId="last-name"
                                value={formData?.lastName}
                                onChange={(e) => { handleChange(e.target.value,"lastName"); }}
                            />
                            {lastNameErrorMessage != "" && (
                                <div className="form-control-feedback">
                                    <span className="text-danger">{lastNameErrorMessage}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <RdsInput
                                label="Company"
                                size="medium"
                                name="company"
                                id="txtCompany"
                                placeholder="Enter Company"
                                dataTestId="company"
                                value={formData?.company}
                                onChange={(e) => { handleChange(e.target.value,"company"); }}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <RdsInput
                                label="Phone"
                                size="medium"
                                name="phone"
                                id="txtPhone"
                                placeholder="Enter phone"
                                required={true}
                                value={formData?.phone}
                                onChange={(e) => { handleChange(e.target.value,"phone"); }}
                                onBlur={(e) => phoneValidationHandler(e.target.value)}
                                dataTestId="phone"
                            />
                            {phoneErrorMessage != "" && (
                                <div className="form-control-feedback">
                                    <span className="text-danger">{phoneErrorMessage}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <RdsInput
                                label="Address"
                                size="medium"
                                name="address"
                                id="txtAddress"
                                required={true}
                                onBlur={(e) => addressValidation(e.target.value)}
                                dataTestId="address"
                                value={formData?.address}
                                onChange={(e) => { handleChange(e.target.value,"address"); }}
                            />
                            {addressErrorMessage != "" && (
                                <div className="form-control-feedback">
                                    <span className="text-danger">{addressErrorMessage}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <RdsInput
                                label="City"
                                size="medium"
                                name="city"
                                id="txtCompany"
                                placeholder="Enter City"
                                required={true}
                                onBlur={(e) => cityValidation(e.target.value)}
                                dataTestId="city"
                                value={formData?.city}
                                onChange={(e) => { handleChange(e.target.value,"city"); }}
                            />
                            {cityErrorMessage != "" && (
                                <div className="form-control-feedback">
                                    <span className="text-danger">{cityErrorMessage}</span>
                                </div>
                            )}
                        </div>
                        <div className="col-md-6 mb-3">
                            <RdsSelectList
                                id="seleCou"
                                label="Country"
                                placeholder="Select Country"
                                selectItems={props.countryList}
                                selectedValue={formData?.countryList}
                                dataTestId="select-country"
                                onChange={(item: any) => { handleChange(item.value,"countryList"); }}
                                required
                            />
                            {countryErrorMessage != "" && (
                                <div className="form-control-feedback">
                                    <span className="text-danger">{countryErrorMessage}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <RdsSelectList
                                id="seleSta"
                                label="State/Province"
                                placeholder="Select State/Province"
                                selectItems={props.IndianStateList}
                                selectedValue={formData?.indianStateList}
                                dataTestId="select-state"
                                onChange={(item: any) => { handleChange(item.value,"indianStateList"); }}
                                required
                            />
                            {stateProvinceErrorMessage != "" && (
                                <div className="form-control-feedback">
                                    <span className="text-danger">
                                        {stateProvinceErrorMessage}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="col-md-6 mb-3">
                            <RdsInput
                                label="Postal Code"
                                name="postalCode"
                                id="txtPostalCode"
                                placeholder="Enter Postal code"
                                required={true}
                                onBlur={(e) => postalCodeValidation(e.target.value)}
                                dataTestId="postal-code"
                                value={formData?.pin}
                                onChange={(e) => { handleChange(e.target.value,"pin"); }}
                            />
                            {postalCodeErrorMessage != "" && (
                                <div className="form-control-feedback">
                                    <span className="text-danger">{postalCodeErrorMessage}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
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
                            onClick={(e: any) => emitSaveData(e)}
                            databsdismiss="offcanvas"
                            isDisabled={false}
                            dataTestId="save"
                        ></RdsButton>
                </div>
                </form>
            </div>
        </>
    );
};

export default RdsCompBillingAddress;
