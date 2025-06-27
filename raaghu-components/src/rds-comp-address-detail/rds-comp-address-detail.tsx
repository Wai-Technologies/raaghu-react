import React, { Fragment, ReactNode, useEffect, useState } from "react";
import RdsCompIcon from "../rds-comp-icon";
import RdsButton from "../rds-button";
import RdsDropdownList from "../rds-dropdown-list";
import RdsInput from "../rds-input";
import { useTranslation } from "react-i18next";
import { InputSize } from "../rds-input/rds-input";
import RdsSelectList from "../rds-select-list";

export interface RdsCompAddressDetailProps {
	children?: ReactNode;
	withIcon?: boolean;
	header?: string;
	addressLine1?: string;
	addressLine2?: string;
	addressLine3?: string;
    cardborder?: boolean;
    address?: any;
    address2?: any;
    statesList?: any;
    city?: any;
    zip?: any;
    countriesList?: any;
    citiesList?: any;
    AddressData?: any;
    reset?: boolean;
    label?: React.ReactNode;
    onSaveHandler?: (data: any) => void;
    addressType?: string;
    countryList?: { option: string, value: any }[];
    IndianStateList?: { option: string, value: any }[];
    billingAddressDetails?: any;
    shippingAddressData?: any;
}

const RdsCompAddressDetail = (props: RdsCompAddressDetailProps) => {
    const [country, setCountry] = useState([]);
    const [countryid, setCountryid] = useState("");
    const [st, setSt] = useState([]);
    const [stateid, setStateid] = useState("");
    const [city, setCity] = useState([]);
    const [inputReset, setInputReset] = useState(props.reset);
    const [AddressData, setAddressData] = useState(props.AddressData);
    const [formData, setFormData] = useState(
        props.addressType === "billing" 
            ? props.billingAddressDetails 
            : props.addressType === "shipping" 
                ? props.shippingAddressData 
                : {}
    );

    useEffect(() => {
        const getcountry = async () => {
            const rescountry = await fetch("");
            const rescon = await rescountry.json();
            return rescon;
        };
        getcountry().then((res) => console.log("res", res));
    }, []);

    const handlecountry = (event: any) => {
        const getcountryid = event.target.value;
        setCountryid(getcountryid);
    };
    const handlerInputChange = (value: any, key: any) => {
        setAddressData({ ...AddressData, [key]: value });
    }
    const handleDataChanges = (value: any, key: string) => {
        setFormData({ ...formData, [key]: value });
      };
    useEffect(() => {
        const getstate = async () => {
            const resstate = await fetch(
                `http://localhost/devopsdeveloper/state/getstate/${countryid}`
            );
            const resst = await resstate.json();
            setSt(await resst);
        };
        getstate();
    }, [countryid]);

    useEffect(() => {
        const getcity = async () => {
            const rescity = await fetch(
                `http://localhost/devopsdeveloper/city/getcity/${stateid}`
            );
            const rcity = await rescity.json();
            setCity(await rcity);
        };
        getcity();
    }, [stateid]);
    useEffect(() => {
        setFormData(props.billingAddressDetails);
    }, [props.billingAddressDetails]);

    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);
    useEffect(() => {
        setFormData(props.shippingAddressData);
    }, [props.shippingAddressData]);

    useEffect(() => {
        setInputReset(!inputReset);
    }, [props.reset]);

    const handleChange = (value: any, key: string) => {
        setFormData({ ...formData, [key]: value });
    }

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
    const { t } = useTranslation();    const isFirstNameValid = (firstName: any) => {
        if (!firstName || firstName.length === 0) {
            return false;
        }
        return true;
    }
    
    const isLastNameValid = (lastName: any) => {
        if (!lastName || lastName.length === 0) {
            return false;
        }
        return true;
    }
    
    const isPhoneValid = (phone: any) => {
        if (!phone || phone.length === 0) {
            return false;
        }
        return true;
    }
    
    const isAddressValid = (address: any) => {
        if (!address || address.length === 0) {
            return false;
        }
        return true;
    }
    
    const isCityValid = (city: any) => {
        if (!city || city.length === 0) {
            return false;
        }
        return true;
    }
    
    const isCountryValid = (country: any) => {
        if (!country || country.length === 0) {
            return false;
        }
        return true;
    }
    
    const isStateValid = (state: any) => {
        if (!state || state.length === 0) {
            return false;
        }
        return true;
    }
    
    const isPostalCodeValid = (postalCode: any) => {
        if (!postalCode || postalCode.length === 0) {
            return false;
        }
        return true;
    }

    // Combined form validation for all address types
    const isFormValid = props.addressType === "billing" 
        ? isFirstNameValid(formData?.firstName) && isLastNameValid(formData?.lastName) && isPhoneValid(formData?.phone) && isAddressValid(formData?.address) && isCityValid(formData?.city) && isCountryValid(formData?.countryList) && isStateValid(formData?.indianStateList) && isPostalCodeValid(formData?.pin)
        : props.addressType === "shipping"
        ? isFirstNameValid(formData?.firstName) && isLastNameValid(formData?.lastName) && isPhoneValid(formData?.phone) && isAddressValid(formData?.address) && isCityValid(formData?.city) && isStateValid(formData?.state) && isPostalCodeValid(formData?.postalCode)
        : true;

    function emitSaveAddressData(event: any) {
        event.preventDefault();
        setInputReset(!inputReset);
        props.onSaveHandler && props.onSaveHandler(AddressData); // Call onSaveHandler with AddressData
        setAddressData({
            address: "",
            address2: "",
            zip: "",
        });
    }
    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(formData);
        setInputReset(!inputReset);
        setFormData({
            firstName: "",
            lastName: "",
            company: "",
            phone: "",
            address: "",
            city: "",
            country: "",
            state: "",
            postalCode: ""
        });
      }
    function emitSaveBillingData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(formData);
        setInputReset(!inputReset);
        setFormData({
            firstName: "",
            lastName: "",
            company: "",
            phone: "",
            address: "",
            city: "",
            countryList: "",
            indianStateList: "",            pin: "",
        });
    }

    return (
        <>
        {props.addressType === "address" && (
        <Fragment>
            {!props.withIcon && (
                <div data-testid="address-detail" className={props.cardborder ? "card" : ""}>
                    <div className=" gap-2 p-4 word_wrap">
                        <p className="address-header fw-semibold hr mb-0">{props.header}</p>
                        <div className="address-body mt-0 mb-1">
                            <div className="mb-0">
                                {props.addressLine1}
                                {props.addressLine2 && ","}
                            </div>
                            <div className="mb-0">
                                {props.addressLine2}
                                {props.addressLine3 && ","}
                            </div>
                            <div className="mb-0">{props.addressLine3}</div>
                            {props.children}
                        </div>
                    </div>
                </div>
            )}
            {props.withIcon && (
                <div data-testid="address-detail" className={props.cardborder ? "card" : ""}>
                    <div className="d-flex gap-2 p-4 word_wrap">
                        <div className="block">
                            <RdsCompIcon
                                name="location"
                                colorVariant="primary"
                                height="20px"
                                width="20px"
                                fill={false}
                                stroke={true}
                            ></RdsCompIcon>
                        </div>
                        <div>
                            <p className="address-header fw-semibold hr mb-0">
                                {props.header}
                            </p>
                            <div className="address-body mt-0 mb-1">
                                <div className="mb-0">
                                    {props.addressLine1}
                                    {props.addressLine2 && ","}
                                </div>
                                <div className="mb-0">
                                    {props.addressLine2}
                                    {props.addressLine3 && ","}
                                </div>
                                <div className="mb-0">{props.addressLine3}</div>
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            )}
                </Fragment>
            )}
            {props.addressType === "input" && (
                <div className="mfe-outline">
                    <form className="needs-validation" >
                        <div className="custom-content-scroll">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <RdsInput
                                        name="Address"
                                        label={true}
                                        reset={inputReset}
                                        placeholder="Enter Address"
                                        inputType="text"
                                        onChange={(e) => handlerInputChange(e.target.value, "address")}
                                        value={AddressData?.address}
                                    ></RdsInput>
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                                </div>

                                <div className="col-md-6">

                                    <RdsInput
                                        name="Address 2 (Optional)"
                                        label={true}
                                        reset={inputReset}
                                        placeholder="Enter Address"
                                        inputType="text"
                                        onChange={(e) => handlerInputChange(e.target.value, "address2")}
                                        value={AddressData?.address2}
                                    ></RdsInput>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="country">
                                        Country
                                    </label>
                                    <div className="form-group">
                                        <RdsDropdownList
                                            data-testid="country"
                                            borderDropdown={true}
                                            placeholder="Select Country"
                                            labelIconWidth="18px"
                                            labelIconHeight="25px"
                                            listItems={props.countriesList}
                                            isPlaceholder={true}
                                        />

                                    </div>
                                    <div className="invalid-feedback">
                                        Please select a valid country.
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="state">
                                        State
                                    </label>
                                    <div className="form-group">
                                        <RdsDropdownList
                                            data-testid="state"
                                            borderDropdown={true}
                                            placeholder="Select State"
                                            labelIconWidth="18px"
                                            labelIconHeight="25px"
                                            isPlaceholder={true}
                                            listItems={props.statesList}
                                        />

                                    </div>
                                    <div className="invalid-feedback">
                                        Please provide a valid state.
                                    </div>
                                </div>
                                <div className="col-md-6 ">
                                    <label htmlFor="state">
                                        City
                                    </label>
                                    <div className="form-group">
                                        <RdsDropdownList
                                            data-testid="city"
                                            borderDropdown={true}
                                            placeholder="Select City"
                                            labelIconWidth="18px"
                                            labelIconHeight="55px"
                                            isPlaceholder={true}
                                            listItems={props.citiesList}
                                        />

                                    </div>
                                    <div className="invalid-feedback">
                                        Please provide a valid state.
                                    </div>
                                </div>
                                <div className="col-md-6">

                                    <RdsInput
                                        name="Zip"
                                        label={true}
                                        reset={inputReset}
                                        placeholder="Enter Zip code"
                                        inputType="text"
                                        onChange={(e) => handlerInputChange(e.target.value, "zip")}
                                        value={AddressData?.zip}
                                        id="address-input"
                                    ></RdsInput>
                                    <div className="invalid-feedback">Zip code required.</div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 mb-1 px-4">
                            <RdsButton
                                class="me-2"
                                tooltipTitle={""}
                                type={"button"}
                                label="Cancel"
                                colorVariant="outline-primary"
                                size="small"
                                databsdismiss="offcanvas"
                                dataTestId="cancel"
                            ></RdsButton>                            <RdsButton
                                class="me-2"
                                label="Save"
                                size="small"
                                colorVariant="primary"
                                tooltipTitle={""}
                                type={"submit"}
                                databsdismiss="offcanvas"
                                onClick={(e: any) => emitSaveAddressData(e)}
                                dataTestId="save"
                            ></RdsButton>
                        </div>
                    </form>
                </div>
            )}
            {props.addressType === "billing" && (
                <div className="contact-information">
                    <h3 className="pb-2">Billing Address</h3>
                    <form id="billingAddressForm">
                        <div className="custom-content-scroll">
                            <div className="row">
                                <div className="col-md-6">
                                    <RdsInput
                                        label={true}
                                        size={InputSize.Medium}
                                        inputType="text"
                                        name="First Name"
                                        placeholder="Enter First Name"
                                        value={formData?.firstName}
                                        onChange={(e) => { handleChange(e.target.value, "firstName"); }}
                                        required
                                        // onBlur={(e) => firstNameValidation(e.target.value)}
                                        dataTestId="f-name"
                                        reset={inputReset}
                                    />
                                    {firstNameErrorMessage != "" && (
                                        <div className="form-control-feedback">
                                            <span className="text-danger">{firstNameErrorMessage}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <RdsInput
                                        label={true}
                                        size={InputSize.Medium}
                                        inputType="text"
                                        name="Last Name"
                                        placeholder="Enter Last Name"
                                        required={true}
                                        // onBlur={(e) => lastNameValidation(e.target.value)}
                                        dataTestId="last-name"
                                        value={formData?.lastName}
                                        onChange={(e) => { handleChange(e.target.value, "lastName"); }}
                                        reset={inputReset}
                                    />
                                    {lastNameErrorMessage != "" && (
                                        <div className="form-control-feedback">
                                            <span className="text-danger">{lastNameErrorMessage}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <RdsInput
                                        label={true}
                                        size={InputSize.Medium}
                                        name="Company"
                                        id="txtCompany"
                                        placeholder="Enter Company"
                                        dataTestId="company"
                                        value={formData?.company}
                                        onChange={(e) => { handleChange(e.target.value, "company"); }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <RdsInput
                                        label={true}
                                        size={InputSize.Medium}
                                        name="Phone"
                                        id="txtPhone"
                                        placeholder="Enter phone"
                                        required={true}
                                        value={formData?.phone}
                                        onChange={(e) => { handleChange(e.target.value, "phone"); }}
                                        // onBlur={(e) => phoneValidationHandler(e.target.value)}
                                        dataTestId="phone"
                                        reset={inputReset}
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
                                    />
                                    {phoneErrorMessage != "" && (
                                        <div className="form-control-feedback">
                                            <span className="text-danger">{phoneErrorMessage}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <RdsInput
                                        label={true}
                                        placeholder="Enter Address"
                                        size={InputSize.Medium}
                                        name="Address"
                                        id="txtAddress"
                                        required={true}
                                        // onBlur={(e) => addressValidation(e.target.value)}
                                        dataTestId="address"
                                        value={formData?.address}
                                        onChange={(e) => { handleChange(e.target.value, "address"); }}
                                        reset={inputReset}
                                    />
                                    {addressErrorMessage != "" && (
                                        <div className="form-control-feedback">
                                            <span className="text-danger">{addressErrorMessage}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <RdsInput
                                        label={true}
                                        size={InputSize.Medium}
                                        name="City"
                                        id="txtCompany"
                                        placeholder="Enter City"
                                        required={true}
                                        // onBlur={(e) => cityValidation(e.target.value)}
                                        dataTestId="city"
                                        value={formData?.city}
                                        onChange={(e) => { handleChange(e.target.value, "city"); }}
                                        reset={inputReset}
                                    />
                                    {cityErrorMessage != "" && (
                                        <div className="form-control-feedback">
                                            <span className="text-danger">{cityErrorMessage}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="col-md-6 mb-3">                                    <RdsSelectList
                                        id="seleCou"
                                        label="Country"
                                        placeholder="Select Country"
                                        selectItems={props.countryList || []}
                                        key={`country-${formData?.countryList}`}
                                        selectedValue={formData?.countryList}
                                        dataTestId="select-country"
                                        onChange={(item: any) => { handleChange(item.value, "countryList"); }}
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
                                <div className="col-md-6 mb-3">                                    <RdsSelectList
                                        id="seleSta"
                                        label="State/Province"
                                        placeholder="Select State/Province"
                                        selectItems={props.IndianStateList || []}
                                        key={`state-${formData?.indianStateList}`}
                                        selectedValue={formData?.indianStateList}
                                        dataTestId="select-state"
                                        onChange={(item: any) => { handleChange(item.value, "indianStateList"); }}
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
                                <div className="col-md-6">
                                    <RdsInput
                                        label={true}
                                        name="Postal Code"
                                        id="txtPostalCode"
                                        placeholder="Enter Postal code"
                                        required={true}
                                        // onBlur={(e) => postalCodeValidation(e.target.value)}
                                        dataTestId="postal-code"
                                        value={formData?.pin}
                                        onChange={(e) => { handleChange(e.target.value, "pin"); }}
                                        reset={inputReset}
                                    />
                                    {postalCodeErrorMessage != "" && (
                                        <div className="form-control-feedback">
                                            <span className="text-danger">{postalCodeErrorMessage}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3  pb-2 px-4">
                            <RdsButton
                                class="me-2"
                                tooltipTitle={""}
                                type={"button"}
                                label="Cancel"
                                colorVariant="outline-primary"
                                size="small"
                                databsdismiss="offcanvas"
                                dataTestId="cancel"
                            ></RdsButton>                            <RdsButton
                                class="me-2"
                                label="Save"
                                size="small"
                                colorVariant="primary"
                                tooltipTitle={""}
                                type={"submit"}
                                onClick={(e: any) => emitSaveBillingData(e)}
                                databsdismiss="offcanvas"
                                isDisabled={!isFormValid}
                                dataTestId="save"
                            ></RdsButton>
                        </div>
                    </form>
                </div>

            )}
            {props.addressType === "shipping" && (
                <form>
                    <div className="custom-content-scroll">
                        <h4>Shipping Address</h4>
                        <div className="row mt-3">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <RdsInput
                                        name="First Name"
                                        label={true}
                                        inputType="text"
                                        isDisabled={false}
                                        readonly={false}
                                        placeholder="Enter First Name"
                                        required={true}
                                        onChange={(e) => {
                                            handleDataChanges(e.target.value, "firstName");
                                        }}
                                        value={formData?.firstName}
                                        reset={inputReset}
                                    ></RdsInput>
                                </div>
                            </div>
                            <div className="col-md-6 ">
                                <div className="form-group">
                                    <RdsInput
                                        name="Last Name"
                                        label={true}
                                        inputType="text"
                                        isDisabled={false}
                                        readonly={false}
                                        placeholder="Enter Last Name"
                                        required={true}
                                        onChange={(e) => {
                                            handleDataChanges(e.target.value, "lastName");
                                        }}
                                        value={formData?.lastName}
                                        reset={inputReset}
                                    ></RdsInput>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 ">
                                <div className="form-group">
                                    <RdsInput
                                        name="Company"
                                        label={true}
                                        inputType="text"
                                        isDisabled={false}
                                        readonly={false}
                                        placeholder="Enter Company"
                                        required={true}
                                        onChange={(e) => {
                                            handleDataChanges(e.target.value, "company");
                                        }}
                                        value={formData?.company}
                                        reset={inputReset}
                                    ></RdsInput>
                                </div>
                            </div>
                            <div className="col-md-6 ">
                                <div className="form-group">
                                    <RdsInput
                                        name="Phone"
                                        label={true}
                                        inputType="text"
                                        isDisabled={false}
                                        readonly={false}
                                        placeholder="Enter Phone"
                                        required={true}
                                        onChange={(e) => {
                                            handleDataChanges(e.target.value, "phone");
                                        }}
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
                                        value={formData?.phone}
                                        reset={inputReset}
                                    ></RdsInput>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 ">
                                <div className="form-group">
                                    <RdsInput
                                        name="Address"
                                        label={true}
                                        inputType="text"
                                        isDisabled={false}
                                        readonly={false}
                                        placeholder="Enter Address"
                                        required={true}
                                        onChange={(e) => {
                                            handleDataChanges(e.target.value, "address");
                                        }}
                                        value={formData?.address}
                                        reset={inputReset}
                                    ></RdsInput>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <RdsInput
                                        name="City"
                                        label={true}
                                        inputType="text"
                                        isDisabled={false}
                                        readonly={false}
                                        placeholder="Enter City"
                                        required={true}
                                        onChange={(e) => {
                                            handleDataChanges(e.target.value, "city");
                                        }}
                                        value={formData?.city}
                                        reset={inputReset}
                                    ></RdsInput>
                                </div>
                            </div>
                            <div className="col-md-6 ">
                                <div className="form-group">
                                    <RdsSelectList
                                        id="seleCon"
                                        label="Country"
                                        placeholder="Select Country"
                                        selectItems={props.countryList || []}
                                        selectedValue={formData?.country}
                                        key={`menu-${formData?.country}`}
                                        onChange={(item: any) => {
                                            handleDataChanges(item.value, "country");
                                        }}
                                    ></RdsSelectList>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 ">
                                <div className="form-group">
                                    <RdsInput
                                        name="State/Province"
                                        label={true}
                                        inputType="text"
                                        isDisabled={false}
                                        readonly={false}
                                        placeholder="Enter State/Province"
                                        required={true}
                                        onChange={(e) => {
                                            handleDataChanges(e.target.value, "state");
                                        }}
                                        value={formData?.state}
                                        reset={inputReset}
                                    ></RdsInput>
                                </div>
                            </div>
                            <div className="col-md-6  pb-3">
                                <div className="form-group">
                                    <RdsInput
                                        name="Postal Code"
                                        label={true}
                                        inputType="text"
                                        isDisabled={false}
                                        readonly={false}
                                        placeholder="Enter Postal Code"
                                        required={true}
                                        onChange={(e) => {
                                            handleDataChanges(e.target.value, "postalCode");
                                        }}
                                        value={formData?.postalCode}
                                        reset={inputReset}
                                    ></RdsInput>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 px-4">
                        <RdsButton
                            type="button"
                            label="Back"
                            isOutline={true}
                            colorVariant="primary"
                            size="small"
                        ></RdsButton>
                        <RdsButton
                            type="button"
                            label="Save"
                            isOutline={false}
                            colorVariant="primary"
                            size="small"
                            isDisabled={!isFormValid}
                            onClick={(e: any) => emitSaveData(e)}
                        ></RdsButton>
                    </div>
                </form>
            )}
        </>
    );
};

export default RdsAddressDetail;
