import React, { useState } from "react";
import "./rds-comp-dialog.css";
import { RdsButton, RdsIcon } from "../rds-elements";

interface RdsCompDialogProps {
  // Define any props here if needed
}

export const RdsCompDialog = (props: RdsCompDialogProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const onSuccess = () => {
    setIsVisible(false);
  };

  const onCancel = () => {
    setIsVisible(false);
  };
  const showCard = () => {
    setIsVisible(true);
  };
  return (
    <div>
      {isVisible ? (
        <div className="card ">
          <div className="m-2 d-flex justify-content-between">
            <h2>Title</h2>
            <div className="">
              <RdsIcon
                height="10px"
                width="10px"
                name="close"
                fill={false}
                stroke={true}
                classes="btn btn-sm"
              />
            </div>
          </div>
          <div className="text-center">
            <img
              src="./assets/interface-user-delete--actions-close-delete-deny-fail-geometric-human-person-remove-single-up-user.svg"
              height="30px"
              width="30px"
              alt="profile"
            ></img>
            <p>
              Deleting this data will remove your account and you will no longer
              login to the application! Are you sure you want to proceed?
            </p>
          </div>
          <div className="mt-3 me-2 d-flex pb-3 justify-content-end ps-4 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2">
            <RdsButton
              type="button"
              label="Cancel"
              colorVariant="outline-primary"
              size="small"
              onClick={onCancel}
              databsdismiss="offcanvas"
            ></RdsButton>
            <RdsButton
              type="submit"
              colorVariant="primary"
              label="Okay"
              size="small"
              dataTestId="submit"
              onClick={onSuccess}
            ></RdsButton>
          </div>
        </div>
      ) : (
        <RdsButton
          label="Show Card"
          type="button"
          colorVariant="outline-primary"
          size="small"
          databsdismiss="offcanvas"
          onClick={showCard}
        />
      )}
    </div>
  );
};

export default RdsCompDialog;
