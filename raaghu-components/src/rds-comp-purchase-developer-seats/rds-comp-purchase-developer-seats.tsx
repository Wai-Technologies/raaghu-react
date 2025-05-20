import React, { useEffect, useState } from "react";
import { RdsButton, RdsCounter, RdsOffcanvas } from "../rds-elements";
import { RdsOffcanvasBackDrop, RdsOffcanvasPlacement } from "../../../raaghu-elements/src/rds-offcanvas/rds-offcanvas";

export interface RdsCompPurchaseDeveloperSeatsProps {
  purchaseDeveloperData?: any;
  developerPriceByIdDetails?: any;
  onClickPurchaseDeveloperSeats?: (event: any) => void;
  onPurchaseDeveloperSaveHandler?: (data: any) => void;
}

const RdsCompPurchaseDeveloperSeats = (props: RdsCompPurchaseDeveloperSeatsProps) => {
  const [purchaseDeveloperData, setPurchaseDeveloperData] = useState(props.purchaseDeveloperData);
  const [developerSeatsCounter, setDeveloperSeatsCounter] = useState(0);
  const [additionalDeveloperTotalPrice, setAdditionalDeveloperTotalPrice] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [developerPriceByIdDetails, setDeveloperPriceByIdDetail] = useState(props.developerPriceByIdDetails)


  useEffect(() => {
    setPurchaseDeveloperData(props.purchaseDeveloperData);
    setDeveloperPriceByIdDetail(props.developerPriceByIdDetails);
  }, [props.purchaseDeveloperData, props.developerPriceByIdDetails]);

  useEffect(() => {
    const calculatedPrice = developerSeatsCounter * (developerPriceByIdDetails?.additionalDeveloperPrice || 0);  
    setAdditionalDeveloperTotalPrice(calculatedPrice);
    const calculatedTaxAmount = (calculatedPrice * developerPriceByIdDetails?.taxPercentage) / 100 || 0;   
    setTaxAmount(calculatedTaxAmount);
  }, [developerSeatsCounter]);

  const handleDevSeatDataChanges = (value: any, key: string) => {
    if (key === 'developerSeatsCounter') {
      setDeveloperSeatsCounter(value);
    }
    setPurchaseDeveloperData({ ...purchaseDeveloperData, [key]: value });
  };

  function emitSaveData(event: any) {
    event.preventDefault();
    const dataToEmit = {
      ...purchaseDeveloperData,
      developerSeatsCounter,
      taxAmount: taxAmount.toFixed(2),
      taxRate: developerPriceByIdDetails?.taxPercentage,
    };
    props.onPurchaseDeveloperSaveHandler && props.onPurchaseDeveloperSaveHandler(dataToEmit);    
    setPurchaseDeveloperData({ developerSeatsCounter: 0 });
    setDeveloperSeatsCounter(0);
  }

  return (
    <>
      <div>
        <RdsOffcanvas
          backDrop={RdsOffcanvasBackDrop.Static}
          canvasTitle="PURCHASE DEVELOPER SEATS"
          offId="purchaseDeveloper"
          offcanvasbutton={
            <RdsButton
              label="PURCHASE DEVELOPER SEATS"
              block={false}
              size="medium"
              type="button"
              colorVariant="outline-primary"
              showLoadingSpinner={false}
              onClick={props.onClickPurchaseDeveloperSeats}
            ></RdsButton>
          }
          offcanvaswidth={544}
          placement={RdsOffcanvasPlacement.End}
          scrolling={false}
        >
          <div>
            <div className="offcanvas-intive-banner">
              <div className="d-flex align-items-center gap-3 py-3 px-4">
                <div>
                  <img
                    src="./assets/seatPurple.svg"
                    alt="seatPurple"
                    width="25px"
                  />
                </div>
                <div>
                  <p className="fw-medium mb-0 smaller text-start">
                    Purchasing additional seats for your expanding team.
                    Following the seat addition, you can then assign new users
                    to the project.
                  </p>
                </div>
              </div>
            </div>

            <form className="text-start pt-4">
              <div className="pb-1">
                <h5 className="fs-5 fw-medium">Select Developer Seats</h5>
              </div>
              <div className="mb-2">
                <RdsCounter
                  key={developerSeatsCounter}
                  colorVariant="outline-primary"
                  counterValue={developerSeatsCounter}
                  label=""
                  max={50}
                  min={0}
                  position="right"
                  width={110}
                  onCounterChange={(e: number) => handleDevSeatDataChanges(e, "developerSeatsCounter")}
                />
              </div>
            </form>

            <div className="text-start pt-4">
              <h5 className="fs-5 fw-medium pb-2">Pricing Details</h5>
              <div>
                <div className="d-flex justify-content-between pb-2">
                  <div>
                    <p className="mb-0">
                      Additional Developers: <span className="fw-bold">{developerSeatsCounter}</span>{" "}
                      <span className="smaller">X ${developerPriceByIdDetails?.additionalDeveloperPrice} (Per User)</span>
                    </p>
                  </div>
                  <div>${additionalDeveloperTotalPrice}</div>
                </div>
                {/* <div className="d-flex justify-content-between pt-1">
                  <div>
                    <p className="mb-0">Tax: {developerPriceByIdDetails?.taxPercentage} %</p>
                  </div>
                  <div>${taxAmount.toFixed(2)}</div>
                </div> */}
                <div>
                  <hr />
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <h5 className="mb-0 fw-semibold fs-5">Total Net Price</h5>
                  </div>
                  <div>
                    <h5 className="fw-semibold mb-0 fs-5">${(additionalDeveloperTotalPrice + taxAmount).toFixed(2)}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row mt-5 d-flex gap-2">
            <RdsButton
              class="me-2"
              tooltipTitle={""}
              type={"button"}
              label="CANCEL"
              colorVariant="outline-primary"
              size="small"
              databsdismiss="offcanvas"
              onClick={(e: any) => { setPurchaseDeveloperData({ developerSeatsCounter: 0 }); setDeveloperSeatsCounter(0); }}
            ></RdsButton>
            <RdsButton
              class="me-2"
              label="CONTINUE"
              showLoadingSpinner={true}
              size="small"
              colorVariant="primary"
              tooltipTitle={""}
              type={"submit"}
              onClick={(e: any) => emitSaveData(e)}
              databsdismiss="offcanvas"
            ></RdsButton>
          </div>
        </RdsOffcanvas>
      </div>
    </>
  );
};

export default RdsCompPurchaseDeveloperSeats;