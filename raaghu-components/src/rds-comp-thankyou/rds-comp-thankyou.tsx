import React from "react";
import { RdsButton, RdsIcon } from "../rds-elements";

export interface RdsCompThankyouProps {}

const RdsCompThankyou = (props: RdsCompThankyouProps) => {
  const handleClick = () => {
  };

  return (
    <>
      <div className="container">
        <div className="text-center pt-5">
          <h6 className="text-danger text-opacity-50 fs-3 fw-bold">Thank you!</h6>
        </div>

        <div className="thankyou-sm">
          <RdsIcon
            width="480px"
            height="380px"
            fill={false}
            stroke={true}
            type="lottie"
            iconPath="raaghu-components/public/Thankyou.json"
            isAnimate
          ></RdsIcon>
        </div>

        <div className="mx-auto px-5 text-center w-75">
          <p className="fs-5 pb-4">
            Your Raaghu Developer Request Is Being Processed. Will Reach Out To
            You Soon
          </p>
        </div>

        <div className="text-center">
          <RdsButton
            label="BACK TO HOME"
            block={false}
            size="medium"
            type="button"
            colorVariant="primary"
            showLoadingSpinner={false}
            onClick={handleClick}
          ></RdsButton>
        </div>
      </div>
    </>
  );
};

export default RdsCompThankyou;
