import React, { useEffect, useState } from "react";
import { RdsButton, RdsInput } from "../rds-elements";
import { InputSize, LabelPosition } from "../../../raaghu-elements/src/rds-input/rds-input";
export interface RdsCompPaymentCardProps {
  paymentCardData?: any;
  onSaveHandler?: (data: any) => void;
  reset?: boolean;
}

const RdsCompPaymentCard = (props: RdsCompPaymentCardProps) => {
  const [cardData, setCardData] = useState(props.paymentCardData);
  const [inputReset, setInputReset] = useState(false);

  useEffect(() => {
    setCardData(props.paymentCardData);
  }, [props.paymentCardData]);

  useEffect(() => {
    setInputReset(!inputReset);
  }, [props.reset]);

  function handleDataChanges(value: any, key: string) {
    setCardData({ ...cardData, [key]: value });
  }

  function emitSaveData(event: any) {
    event.preventDefault();
    props.onSaveHandler && props.onSaveHandler(cardData);
    setInputReset(!inputReset);
    setCardData({
      cardNumber: "",
      cardHolderName: "",
      expiryDate: "",
      cvv: "",
    });
  }

  return (
    <>
      <div className="button-card-container">
        <div>
          <div>
            <RdsInput
              id=""
              inputType="text"
              name="Card Number"
              label={true}
              labelPosition={LabelPosition.Top}
              placeholder="XXXX XXXX XXXX XXXX"
              required
              size={InputSize.Medium}
              value={cardData?.cardNumber}
              onChange={(e) => {
                handleDataChanges(e.target.value, "cardNumber");
              }}
              reset={inputReset}
            />
          </div>
          <div>
            <RdsInput
              id=""
              inputType="text"
              name="Cardholder Name"
              label={true}
              labelPosition={LabelPosition.Top}
              placeholder="Enter Cardholder Name"
              required
              size={InputSize.Medium}
              value={cardData?.cardHolderName}
              onChange={(e) => {
                handleDataChanges(e.target.value, "cardHolderName");
              }}
              reset={inputReset}
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <RdsInput
                id=""
                inputType="text"
                name="Expiry Date"
                label={true}
                labelPosition={LabelPosition.Top}
                placeholder="Enter Expiry Date"
                required
                size={InputSize.Medium}  
                value={cardData?.expiryDate}
                onChange={(e) => {
                  handleDataChanges(e.target.value, "expiryDate");
                }}
                reset={inputReset}
              />
            </div>
            <div className="col-md-6">
              <RdsInput
                id=""
                inputType="text"
                name="CVV"
                label={true}
                labelPosition={LabelPosition.Top}
                placeholder="Enter CVV"
                required
                size={InputSize.Medium}  
                value={cardData?.cvv}
                onChange={(e) => {
                  handleDataChanges(e.target.value, "cvv");
                }}
                reset={inputReset}
              />
            </div>
          </div>
        </div>
        
        <div className="button-footer p-3">

  
          <RdsButton
            block
            colorVariant="primary"
            label="PAY NOW"
            showLoadingSpinner
            size="medium"
            onClick={(e: any) => emitSaveData(e)}
            isDisabled={
              !cardData?.cardNumber ||
              !cardData?.cardHolderName ||
              !cardData?.expiryDate ||
              !cardData?.cvv
            }
          />
        </div>
      </div>
    </>
  );
};

export default RdsCompPaymentCard;
