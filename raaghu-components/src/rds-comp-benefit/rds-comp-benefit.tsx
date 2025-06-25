import React from "react";
import RdsCompBenefits from "../rds-comp-benefits";

export interface RdsCompBenefitProps {
  displayType: string;
  colsize: number;
  itemList: RdsCompBenefitItem[];
}

export interface RdsCompBenefitItem {
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
        {props.itemList?.map((items: RdsCompBenefitItem, index: number) => (
          <div className={`${Colmun}`} key={index} data-testId="rds-comp-benefits">
            <RdsCompBenefits displayType={props.displayType} item={items} />
          </div>
        ))}
      </div>
    </>
  );
};
export default RdsCompBenefit;
