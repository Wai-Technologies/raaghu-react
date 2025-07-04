import React from "react";
import "./rds-comp-bank-card-detail-list.css";
import RdsCompBankCardDetail from "../rds-comp-bank-card-detail";

export interface RdsCompBankCardDetailListProps {
    cardDatas: any[];
    isSelectable?: boolean;
    isEditable?: boolean;
}

const RdsCompBankCardDetailList = (props: RdsCompBankCardDetailListProps) => {
    return (
        <>
            <div className="m-1 p-1 ">
                <RdsCompBankCardDetail
                    cardDatas={props.cardDatas}
                    isSelectable={props.isSelectable || false}
                    isEditable={props.isEditable || false}
                />
            </div>
        </>
    );
};
export default RdsCompBankCardDetailList;
