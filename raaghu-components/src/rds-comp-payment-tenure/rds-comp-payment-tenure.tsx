import React, { useState, useEffect } from "react";
import { RdsButton, RdsCounter, RdsRadioButton, RdsPlandiscount } from "../rds-elements";

export interface RdsCompPaymentProps {
  paymentTenure?: any;
  sendTenureId?: (id: number, tenureCount: number) => void;
  developerCount?: any;
  reset?: boolean;
  onSaveHandler?: (data: any) => void;
}

const RdsCompPaymentTenure = (props: RdsCompPaymentProps) => {
  const [activeDiv, setActiveDiv] = useState<number | null>(null);
  const [developerCountValue, setDeveloperCountValue] = useState(0);
  const [selectedRadioButton, setSelectedRadioButton] = useState<string | null>(null);
  const [licenseTenureName, setLicenseTenureName] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState<number | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number | null>(null);

  useEffect(() => {
    if (props.paymentTenure && Array.isArray(props.paymentTenure) && props.paymentTenure.length > 0) {
      const defaultData = props.paymentTenure[0];
      setActiveDiv(defaultData.id);
      setSelectedRadioButton(defaultData.id.toString());
      setLicenseTenureName(defaultData.licenseTenureName);
      setDiscountPercentage(defaultData.discountPercentage);
      setDiscountAmount(defaultData.discountAmount);
    }
  }, [props.paymentTenure]);

  const handleDivClick = (id: number, tenureCount: number, name: string, discountPercent: number, discountAmt: number) => {
    setActiveDiv(id);
    setSelectedRadioButton(id.toString());
    setLicenseTenureName(name);
    setDiscountPercentage(discountPercent);
    setDiscountAmount(discountAmt);
    if (props.sendTenureId) {
      props.sendTenureId(id, tenureCount);
    }
  };

  const emitSaveData = (event: any) => {
    event.preventDefault();
    const formData = {
      developerCount: developerCountValue,
      licenseTenureName: licenseTenureName,
      discountPercentage: discountPercentage,
      discountAmount: discountAmount,
      selectedRadioButton: selectedRadioButton
    };
    console.log("Form Data:", formData);
    if (props.onSaveHandler) {
      props.onSaveHandler(formData);
    }
    
    setDeveloperCountValue(0);
    if (props.paymentTenure && Array.isArray(props.paymentTenure) && props.paymentTenure.length > 0) {
      const defaultData = props.paymentTenure[0];
      setActiveDiv(null);
      setSelectedRadioButton(defaultData.id.toString());
      setLicenseTenureName(defaultData.licenseTenureName);
      setDiscountPercentage(defaultData.discountPercentage);
      setDiscountAmount(defaultData.discountAmount);
    }
  };

  return (
    <>
      <form>
        <div className="container">
          <div>
            <h2 className="mb-3 pb-4 text-start"><b>Payment</b></h2>
          </div>
          {props.paymentTenure &&
            Array.isArray(props.paymentTenure) &&
            props.paymentTenure.map((data: any, key: any) => (
              <div
                key={key}
                id={`paymentDiv-${data.id}`}
                className={`align-items-baseline custom-radio-border px-1 py-1 rounded-1 row cursor-pointer mb-3 mx-0 ${activeDiv === data.id ? "active" : ""
                  }`}
                onClick={() => handleDivClick(data.id, data.tenureCount, data.licenseTenureName, data.discountPercentage, data.discountAmount)}
              >
                <div className="col-md-8 mt-2">
                  <RdsRadioButton
                    displayType="Default"
                    customClass="mb-0 py-2"
                    itemList={[
                      {
                        checked: activeDiv === data.id,
                        id: 1,
                        label: data.licenseTenureName,
                        name: data.tenureCount
                      }
                    ]}
                    label={data.licenseTenureName}
                    value={data.id.toString()}
                    onChange={() => handleDivClick(data.id, data.tenureCount, data.licenseTenureName, data.discountPercentage, data.discountAmount)}
                  />
                </div>
                <div className="col-md-4">
                  {data.discountPercentage > 0 && (<RdsPlandiscount discount={data.discountPercentage} saveLabel={data.saveLabel} discountValue={data.discountAmount} />)}
                </div>
              </div>
            ))}
          <div className="pt-3">
            <div className="mb-4">
              <p className="fs-6 text-secondary-para mb-0">3 developers already included, you can add additional users here</p>
              <RdsCounter
                key={developerCountValue} 
                colorVariant="outline-primary"
                counterValue={developerCountValue}
                label=""
                max={50}
                min={0}
                position="top"
                width={110}
                onCounterChange={(value: number) => {
                  setDeveloperCountValue(value);
                  if (props.developerCount !== undefined) {
                    props.developerCount(value);
                  }
                }}
              />
            </div>
            <div>
              <RdsButton
                block
                colorVariant="primary"
                label="PROCEED"
                showLoadingSpinner
                size="medium"
                type="submit"
                onClick={(e: any) => emitSaveData(e)}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default RdsCompPaymentTenure;