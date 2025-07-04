import React, { useEffect, useState, useRef } from "react";
import { RdsButton, RdsCounter, RdsInput, RdsRadioButton } from "../rds-elements";
import { InputSize, LabelPosition } from "../../../raaghu-elements/src/rds-input/rds-input";
import RdsCompPlandiscount from "../rds-comp-plan-discount";
export interface RdsCompPaymentCardProps {
  paymentCardData?: any;
  onSaveHandler?: (data: any) => void;
  reset?: boolean;
  payment?: string;
  summaryDetailsList?: any;
  buttonSpinner?: boolean;
  paymentModeList?: any[];
  paymentDetails?: any;
  paymentTenure?: any;
  sendTenureId?: (id: number, tenureCount: number) => void;
  developerCount?: any;
}

const RdsCompPaymentCard = (props: RdsCompPaymentCardProps) => {
  const [cardData, setCardData] = useState(props.paymentCardData);
  const [inputReset, setInputReset] = useState(false);
  const [formData, setFormData] = useState(props.paymentDetails || {});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const formKey = useRef(0);
  const [activeDiv, setActiveDiv] = useState<number | null>(null);
  const [developerCountValue, setDeveloperCountValue] = useState(0);
  const [selectedRadioButton, setSelectedRadioButton] = useState<string | null>(null);
  const [licenseTenureName, setLicenseTenureName] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState<number | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number | null>(null);

  useEffect(() => {
    setCardData(props.paymentCardData);
  }, [props.paymentCardData]);

  useEffect(() => {
    setInputReset(!inputReset);
  }, [props.reset]);

  function handleDataChanges(value: any, key: string) {
    setCardData({ ...cardData, [key]: value });
  }
  
  useEffect(() => {
      setFormData(props.paymentDetails || {});
    }, [props.paymentDetails]);
  
    const handleDataChanges1 = (value: any, key: string) => {
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

  const handleSave = (event: any) => {
  event.preventDefault();

  if (props.payment === "card") {
    props.onSaveHandler && props.onSaveHandler(cardData);
    setInputReset(!inputReset);
    setCardData({
      cardNumber: "",
      cardHolderName: "",
      expiryDate: "",
      cvv: "",
    });

  } else if (props.payment === "detail") {
    const completeFormData = { ...formData, selectedPaymentMethod };
    props.onSaveHandler && props.onSaveHandler(completeFormData);
    setInputReset(!inputReset);
    setFormData({});
    setSelectedPaymentMethod('');
    formKey.current += 1;

  } else if (props.payment === "tenure") {
    const tenureData = {
      developerCount: developerCountValue,
      licenseTenureName: licenseTenureName,
      discountPercentage: discountPercentage,
      discountAmount: discountAmount,
      selectedRadioButton: selectedRadioButton
    };
    props.onSaveHandler && props.onSaveHandler(tenureData);

    setDeveloperCountValue(0);

    if (props.paymentTenure && Array.isArray(props.paymentTenure) && props.paymentTenure.length > 0) {
      const defaultData = props.paymentTenure[0];
      setActiveDiv(null);
      setSelectedRadioButton(defaultData.id.toString());
      setLicenseTenureName(defaultData.licenseTenureName);
      setDiscountPercentage(defaultData.discountPercentage);
      setDiscountAmount(defaultData.discountAmount);
    }
  }
};

  return (
    <>
    {props.payment == "default" &&
      <div className="shadow rounded-3 px-4 py-5 mt-5">
        <div>
          <h2 className="text-secondary fw-medium pb-2">Summary</h2>
          <p className="text-secondary">Purchasing your license ensures that you'll gain access to premium support, receive both major and minor updates for modules and themes, and achieve the ability to embark on new projects.</p>
        </div>
        <div>
          <div className="text-start pt-4">
            <h5 className="fs-5 fw-medium">License Details</h5>
            <div>
              <div className="d-flex justify-content-between">
                <div>
                  <p className="mb-0">Plan Name</p>
                </div>
                <div>{props.summaryDetailsList?.planName}</div>
              </div>
              <div className="d-flex justify-content-between pt-1">
                <div>
                  <p className="mb-0">License Tenure</p>
                </div>
                <div>{props.summaryDetailsList?.licenseTenureName}</div>
              </div>

              <div>
                <h5 className="fs-5 fw-medium pt-4">Pricing Details</h5>
                <div>
                  <div className="d-flex justify-content-between pb-2">
                    <div>
                      <p className="mb-0">License Price:</p>
                    </div>
                    <div>${props.summaryDetailsList?.licensePrice}</div>
                  </div>

                  <div className="d-flex justify-content-between pb-2">
                    <div>
                      <p className="mb-0">Additional Developers:
                        <span className="fw-bold"> {props.summaryDetailsList?.additionalDevelopersCount} </span>
                        <span className="smaller"> X ${props.summaryDetailsList?.additionalDevelopersPrice} (Per User)</span>
                      </p>
                    </div>
                    <div>${props.summaryDetailsList?.additionalDevelopersTotalPrice}</div>
                  </div>

                  <div className="d-flex justify-content-between pb-2">
                    <div>
                      <p className="mb-0">Total Price:</p>
                    </div>
                    <div>${props.summaryDetailsList?.totalPrice}</div>
                  </div>

                  <div className="d-flex justify-content-between pb-2">
                    <div>
                      <p className="mb-0">Tax: {props.summaryDetailsList?.taxPercentage}%</p>
                    </div>
                    <div>${props.summaryDetailsList?.taxPrice}</div>
                  </div>

                  <div className="d-flex justify-content-between pb-2">
                    <div>
                      <p className="mb-0">Discount: {props.summaryDetailsList?.discountPercentage}%</p>
                    </div>
                    <div>-{props.summaryDetailsList?.discountPrice}</div>
                  </div>
                </div>
              </div>

              <div>
                <hr />
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="mb-0 fw-semibold fs-5">Total Net Price:</h5>
                </div>
                <div>
                  <h5 className="fw-semibold mb-0 fs-5">{props.summaryDetailsList?.totalNetPrice}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
    {props.payment == "card" &&
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
            onClick={(e: any) => handleSave(e)}
            isDisabled={
              !cardData?.cardNumber ||
              !cardData?.cardHolderName ||
              !cardData?.expiryDate ||
              !cardData?.cvv
            }
          />
        </div>
      </div>
    }
    {props.payment == "detail" &&
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
                handleDataChanges1(e.target.value, "cardNumber");
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
                handleDataChanges1(e.target.value, "cardHolderName");
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
                  handleDataChanges1(e.target.value, "cardExpirationDate");
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
                  handleDataChanges1(e.target.value, "cardCvc");
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
            onClick={(e: any) => handleSave(e)}
          />
        </div>

      </form>
    }
    {props.payment == "tenure" &&
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
                  {data.discountPercentage > 0 && (<RdsCompPlandiscount discount={data.discountPercentage} saveLabel={data.saveLabel} discountValue={data.discountAmount} />)}
                </div>
              </div>
            ))}
          <div className="pt-3">
            <div className="mb-4">
              <p className="fs-6 text-secondary-para mb-3">3 developers already included, you can add additional users here</p>
              <RdsCounter
                key={developerCountValue} 
                colorVariant="primary"
                counterValue={developerCountValue}
                label="hello"
                max={50}
                min={0}
                type="Default"
                width={220}
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
                onClick={(e: any) => handleSave(e)}
              />
            </div>
          </div>
        </div>
      </form>
    }
    </>
  );
};

export default RdsCompPaymentCard;
