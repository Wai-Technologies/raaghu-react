import React from "react";
import RdsIcon from "../rds-icon";

export interface RdsPlandiscountProps {
  discount: string;
  discountValue: string;
  saveLabel?: string;
 }

const RdsPlandiscount = (props: RdsPlandiscountProps) => {
  return (
  <>
    <div className="CTA d-flex px-2 py-1 rounded-1 text-white justify-content-between">
      <div className="align-items-center d-flex gap-2">
        <div>
          <RdsIcon
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

export default RdsPlandiscount;
