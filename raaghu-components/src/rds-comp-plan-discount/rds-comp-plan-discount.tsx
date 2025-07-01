import React from "react";
import RdsCompIcon from "../rds-comp-icon";

export interface RdsCompPlandiscountProps {
  discount: string;
  discountValue: string;
  saveLabel?: string;
 }

const RdsCompPlandiscount = (props: RdsCompPlandiscountProps) => {
  return (
  <>
    <div className="CTA d-flex px-2 py-1 rounded-1 text-white justify-content-between">
      <div className="align-items-center d-flex gap-2">
        <div>
          <RdsCompIcon
            colorVariant="light"
            height="12px"
            name="arrow_down"
            stroke
            tooltipPlacement="top"
            width="12px"
            strokeWidth="2"
          />
        </div>
        <div>
          <p className="mb-0">{props.discount} %</p>
        </div>
      </div>

      <div className="align-items-center d-flex gap-2">
        <div><p className="mb-0">{props.saveLabel}</p></div>
        <div><p className="mb-0">${props.discountValue}</p></div>
      </div>
    </div>

  </>);
};

export default RdsCompPlandiscount;
