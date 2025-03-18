import React, { useEffect, useState, useRef } from "react";
import {
  RdsRadioButton,
  RdsInput,
  RdsButton,
  RdsSpinner,
} from "../rds-elements";
import "./rds-comp-payment-detail.css";
import { InputSize } from "../../../raaghu-elements/src/rds-input/rds-input";
export interface RdsCompPaymentDetailProps {
  buttonSpinner?: boolean;
  paymentModeList?: any[];
  paymentDetails?: any;
  reset?: boolean;
  onSaveHandler?: (data: any) => void;
}

const RdsCompPaymentDetail = (props: RdsCompPaymentDetailProps) => {
  const [formData, setFormData] = useState(props.paymentDetails || {});
  const [inputReset, setInputReset] = useState(props.reset);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const formKey = useRef(0);

  useEffect(() => {
    setFormData(props.paymentDetails || {});
  }, [props.paymentDetails]);

  useEffect(() => {
    setInputReset(props.reset);
  }, [props.reset]);

  const handleDataChanges = (value: any, key: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handlePaymentMethodChange = (value: any) => {
    setSelectedPaymentMethod(value);
    if (value === 'Credit Card') {
      setFormData({
        cardNumber: "",
        cardHolderName: "",
        cardExpirationDate: "",
        cardCvc: ""
      });
    } else if (value !== 'Credit Card' && selectedPaymentMethod === 'Credit Card') {
      setSelectedPaymentMethod('eTransfer');
    }
  };
  function emitSaveData(event: any) {
    event.preventDefault();
    const completeFormData = { ...formData, selectedPaymentMethod };
    props.onSaveHandler && props.onSaveHandler(completeFormData);
    setInputReset(!inputReset);
    setFormData({});
    setSelectedPaymentMethod('');
    formKey.current += 1; // increment the key to force re-render of the form
  }
  const isCardNumberValid = (cardNumber: any) => {
    if (!cardNumber || cardNumber.length === 0) {
      return false;
    }
    return true;
  }
  const isCardHolderNameValid = (cardHolderName: any) => {
    if (!cardHolderName || cardHolderName.length === 0) {
      return false;
    }
    return true;
  }
  const isCardExpirationDateValid = (cardExpirationDate: any) => {
    if (!cardExpirationDate || cardExpirationDate.length === 0) {
      return false;
    }
    return true;
  }
  const isCardCvcValid = (cardCvc: any) => {
    if (!cardCvc || cardCvc.length === 0) {
      return false;
    }
    return true;
  }

  const isFormValid=isCardNumberValid(formData?.cardNumber) && isCardHolderNameValid(formData?.cardHolderName) && isCardExpirationDateValid(formData?.cardExpirationDate) && isCardCvcValid(formData?.cardCvc);
  return (
    <>
      <form>
        <div className="custom-content-scroll">
        <div className="contact-information">
          <h4>Payment details</h4>
          <div className="row mb-3">
            <div className="col-md-4">
              <RdsRadioButton
                itemList={props.paymentModeList}
                onChange={handlePaymentMethodChange}
                value={selectedPaymentMethod}
                key={formKey.current} // add key prop here
              />
            </div>
          </div>
          <div>
            <RdsInput
              name="Card Number"
              label={true}
              placeholder="XXXX XXXX XXXX XXXX"
              reset={inputReset}
              required
              size={InputSize.Medium}        
              id="txtCardNumber"
              onChange={(e) => {
                handleDataChanges(e.target.value, "cardNumber");
              }}
              value={formData?.cardNumber}
            />
          </div>
          <div>
            <RdsInput
              name="Name On Card"
              label={true}
              placeholder="Enter Name On Card"
              reset={inputReset}
              required
              size={InputSize.Medium}           
              id="txtName"
              onChange={(e) => {
                handleDataChanges(e.target.value, "cardHolderName");
              }}
              value={formData?.cardHolderName}
            />
          </div>
          <div className="row">
            <div className="col-9">
              <RdsInput
                name="Expiration Date (MM/YY)"
                label={true}
                placeholder="Enter Expiry Date"
                reset={inputReset}
                required
                size={InputSize.Medium}              
                id="txtExpirationDate"
                onChange={(e) => {
                  handleDataChanges(e.target.value, "cardExpirationDate");
                }}
                value={formData?.cardExpirationDate}
              />
            </div>
            <div className="col-3">
              <RdsInput
                name="CVV"
                label={true}
                placeholder="Enter CVV"
                reset={inputReset}
                id="txtCvc"
                required
                onChange={(e) => {
                  handleDataChanges(e.target.value, "cardCvc");
                }}
                value={formData?.cardCvc}
              />
            </div>
          </div>
        </div>
        </div>
        <div className="mt-3 d-flex pb-3 ps-4 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2 p-4">
          <RdsButton
            label="Cancel"
            colorVariant="primary"
            block={false}
            tooltipTitle={""}
            size="small"
            type="button"
            // onClick={props.onBack}
            isOutline={true}
          />
          <RdsButton
            label="Confirm"
            colorVariant="primary"
            isDisabled={!isFormValid}
            block={false}
            size="small"
            tooltipTitle={""}
            type="submit"
            // showLoadingSpinner={true}
            onClick={(e: any) => emitSaveData(e)}
          />
        </div>

      </form>
    </>
  );
};

export default RdsCompPaymentDetail;