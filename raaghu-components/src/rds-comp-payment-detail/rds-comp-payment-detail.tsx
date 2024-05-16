import React, { useEffect, useState } from "react";
import {
  RdsRadioButton,
  RdsInput,
  RdsButton,
  RdsSpinner,
} from "../rds-elements";
import "./rds-comp-payment-detail.css";

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
    props.onSaveHandler && props.onSaveHandler(formData);
    setInputReset(!inputReset);
    setFormData({});
    setSelectedPaymentMethod('');
  }

  return (
    <>
      <form onSubmit={emitSaveData}>
        <div className="contact-information">
          <h4>Payment details</h4>
          <div className="row mb-3">
            <div className="col-md-4">
              <RdsRadioButton 
                itemList={props.paymentModeList} 
                onChange={handlePaymentMethodChange} 
               // value={selectedPaymentMethod}
              />
            </div>
          </div>
          <div>
            <RdsInput
              label="Card Number"
              reset={inputReset}
              required
              size="medium"
              name="cardNumber"
              id="txtCardNumber"
              onChange={(e) => {
                handleDataChanges(e.target.value, "cardNumber");
              }}
              value={formData?.cardNumber}
            />
          </div>
          <div>
            <RdsInput
              label="Name On Card"
              reset={inputReset}
              required
              size="medium"
              name="name"
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
                label="Expiration Date (MM/YY)"
                reset={inputReset}
                required
                size="medium"
                name="expirationDate"
                id="txtExpirationDate"
                onChange={(e) => {
                  handleDataChanges(e.target.value, "cardExpirationDate");
                }}
                value={formData?.cardExpirationDate}
              />
            </div>
            <div className="col-3">
              <RdsInput
                label="CVV"
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

          <div className="pt-3 row">
            <div className="col-6">
              <RdsButton
                label="Cancel"
                colorVariant="primary"
                block={true}
                tooltipTitle={""}
                type="button"
                // onClick={props.onBack}
                isOutline={true}
              />
            </div>
            <div className="col-6">              
              <RdsButton
                label="Confirm"
                colorVariant="primary"
                isDisabled={false}
                block={true}
                tooltipTitle={""}
                type="submit"
                // showLoadingSpinner={true}
                onClick={(e: any) => emitSaveData(e)}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default RdsCompPaymentDetail;