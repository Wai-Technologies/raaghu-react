import React from "react";
import { RdsBenefit } from "../rds-elements";

export interface RdsCompBenefitProps {
    displayType: string,
    colsize: number;
    itemList: any;
}

const RdsCompBenefit = (props: RdsCompBenefitProps) => {
    const Colmun = "col-md-" + props.colsize;


    return (
        <>
            <div className="row">
                {props.itemList.map((items: any, index: number) => (
                    <div className={`${Colmun}`} key={index} data-testId="rds-benefit">
                        <RdsBenefit displayType={props.displayType} item={items} />
                    </div>
                ))}
            </div>
        </>
    );
};
export default RdsCompBenefit;
