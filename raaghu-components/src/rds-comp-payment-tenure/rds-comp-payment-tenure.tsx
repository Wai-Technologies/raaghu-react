import React, { useState } from "react";
import { RdsButton, RdsCheckbox, RdsCounter, RdsRadioButton, RdsPlandiscount } from "../rds-elements";

export interface RdsCompPaymentProps {
  increasePageCountHandler?: any
  paymentTenure?: any;
  sendTenureId?: (id: number,tenureCount:number) => void;
  developerCount?: any;
}

const RdsCompPaymentTenure = (props: RdsCompPaymentProps) => {

  const [activeDiv, setActiveDiv] = useState<number | null>(null);
  const [developerCountValue, setDeveloperCountValue] = useState(0);

  const handleDivClick = (id: number,tenureCount:number) => {
    console.log("id", id);
    setActiveDiv(id);
    if (props.sendTenureId) {
      props.sendTenureId(id,tenureCount);
    }
  };

  return (
    <>
      <div className="container">
        <div>
          <h2 className="mb-3 pb-4 text-start"><b>Payment</b></h2>
        </div>
        {props.paymentTenure &&
          Array.isArray(props.paymentTenure) &&
          props.paymentTenure.map((data: any, key: any) => (
            <div
              key={key}
              id={`paymentDiv-${data.id}`} // Use the id property as the identifier
              className={`align-items-baseline custom-radio-border px-1 py-1 rounded-1 row cursor-pointer mb-3 mx-0 ${activeDiv === data.id ? "active" : ""
                }`}
              onClick={() => handleDivClick(data.id,data.tenureCount)}
            >
              <div className="col-md-8 mt-2">
                <RdsRadioButton
                  displayType="Default"
                  customClass="mb-0 py-2"
                  itemList={[
                    {
                      checked: activeDiv === data.id || (activeDiv === null && key === 0),
                      id: 1,
                      label: data.licenseTenureName,
                      name: data.tenureCount
                    }
                  ]}
                  label={data.licenseTenureName}
                />
              </div>
              <div className="col-md-4">
                {data.discountPercentage > 0 && (<RdsPlandiscount discount={data.discountPercentage} saveLabel={data.saveLabel} discountValue={data.discountAmount} />)}

              </div>
            </div>
          ))}

        <div className="pt-3">
          <div className="mb-4">
            <p className="fs-6 texxt-secondary-para mb-0">3 developers already included, you can add additional users here</p>
            <RdsCounter
              colorVariant="outline-primary"
              counterValue={developerCountValue}
              label=""
              max={50}
              min={0}
              position="top"
              width={110}
              onCounterChange={(value: number) => {
                console.log("value", value);
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
              onClick={props.increasePageCountHandler}
            />
          </div>
        </div>

      </div>
    </>
  );
};

export default RdsCompPaymentTenure;
