import React from "react";

export interface RdsPaymentSummaryProps {
  summaryDetailsList?: any;
}

const RdsPaymentSummary = (props : RdsPaymentSummaryProps) => {
  return (
    <>
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
    </>
  );
};

export default RdsPaymentSummary;
