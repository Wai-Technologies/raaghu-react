import React from "react";
import { RdsBenefit } from "../rds-elements";

export interface RdsCompBenefitProps {
  displayType: string;
  colsize: number;
  itemList: RdsBenefitItem[];
}

export interface RdsBenefitItem {
  id: number;
  title: string;
  description: string;
  icon?: string;
  iconHeight?: string;
  iconWidth?: string;
  iconFill?: boolean;
  iconstroke?: boolean;
  iconColorVarient?: string;
}

const RdsCompBenefit = (props: RdsCompBenefitProps) => {
  const Colmun = "col-md-" + props.colsize;

  return (
    <>
      <div className="row">
        {props.itemList?.map((items: RdsBenefitItem, index: number) => (
          <div className={`${Colmun}`} key={index} data-testId="rds-benefit">
            <RdsBenefit displayType={props.displayType} item={items} />
          </div>
        ))}
      </div>
    </>
  );
};
export default RdsCompBenefit;
