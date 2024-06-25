import React from "react";
import { RdsButton } from "../rds-elements";

export interface RdsCompOrderConfirmationProps {
  increasePageCountHandler?: any;
}

const RdsCompOrderConfirmation = (props: any) => {

  return (<>
    <div>
      <div className="pb-3">
        <h2 className="text-start">
          Order Confirmation
        </h2>
      </div>

      <div className="my-4 py-5">
        <div className="align-items-center d-flex justify-content-center text-end">
          <video id="myVideo" className="w-225px" autoPlay muted loop>
            <source src="./assets/payment-inprogress.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="text-center">
          <h6 className="text-green fs-5">Thank you for your purchase.</h6>
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-3">
          <RdsButton
            block
            colorVariant="primary"
            label="GO TO LOGIN"
            showLoadingSpinner
            size="medium"
            onClick={props.goToLogin}
          />
        </div>
        <div>
          <RdsButton
            block
            colorVariant="outline-primary"
            label="VIEW INVOICE"
            showLoadingSpinner
            size="medium"
            onClick={props.goToInvoice}
          />
        </div>
      </div>
    </div>

  </>);
};

export default RdsCompOrderConfirmation;