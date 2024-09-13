import React, { useEffect, useState } from "react";
import "./rds-comp-shipping-address.css";
import { RdsInput, RdsSelectList, RdsButton } from "../rds-elements";
export interface RdsCompShippingAddressProps {
    countryList: { option: any, value: any }[];
    onSaveHandler?: (data: any) => void;
    shippingAddressData?: any;
    reset?: boolean;
}

const RdsCompShippingAddress = (props: RdsCompShippingAddressProps) => {
  const [formData, setFormData] = useState(props.shippingAddressData);  
  const [inputReset, setInputReset] = useState(false);
  useEffect(() => {
    setFormData(props.shippingAddressData);
  }, [props.shippingAddressData]);
  
  useEffect(() => {
    setInputReset(!inputReset);
}, [props.reset]);

  const handleDataChanges = (value: any, key: string) => {
    setFormData({ ...formData, [key]: value });
  };

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

 
  return (
      <>
      <form>
        <div className="custom-content-scroll">
          <h4>Shipping Address</h4>
          <div className="row mt-3">
            <div className="col-md-6 sm-p-0">
              <div className="form-group">
                <RdsInput
                  label="First Name"
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
            <div className="col-md-6 sm-p-0">
              <div className="form-group">
                <RdsInput
                  label="Last Name"
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

          <div className="row mt-3">
            <div className="col-md-6 sm-p-0">
              <div className="form-group">
                <RdsInput
                  label="Company"
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
            <div className="col-md-6 sm-p-0">
              <div className="form-group">
                <RdsInput
                  label="Phone"
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

          <div className="row mt-3">
          <div className="col-md-12 sm-p-0">
            <div className="form-group">
              <RdsInput
                label="Address"
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

          <div className="row mt-3">
            <div className="col-md-6 sm-p-0">
              <div className="form-group">
                <RdsInput
                  label="City"
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
            <div className="col-md-6 sm-p-0">
              <div className="form-group">
                <RdsSelectList
                  id="seleCon"
                  label="Country"
                  placeholder="Select Country"
                  selectItems={props.countryList}
                  selectedValue={formData?.country}
                  key={`menu-${formData?.country}`}
                  onChange={(item: any) => {
                    handleDataChanges(item.value, "country");
                  }}
                ></RdsSelectList>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-6 sm-p-0">
              <div className="form-group">
                <RdsInput
                  label="State/Province"
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
            <div className="col-md-6 sm-p-0">
              <div className="form-group">
                <RdsInput
                  label="Postal Code"
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
        <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
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
            onClick={(e: any) => emitSaveData(e)}
          ></RdsButton>
        </div>
    </form>
      </>
    );
};

export default RdsCompShippingAddress;
