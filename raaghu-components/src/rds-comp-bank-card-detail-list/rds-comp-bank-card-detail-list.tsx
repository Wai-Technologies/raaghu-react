import React from "react";
import { RdsBankCardDetail } from "../rds-elements";
import "./rds-comp-bank-card-detail-list.css";

export interface RdsCompBankCardDetailListProps {
    cardDatas: any[];
    isSelectable?: boolean;
    isEditable?: boolean;
}

const RdsCompBankCardDetailList = (props: RdsCompBankCardDetailListProps) => {
    return (
        <>
            <div className="m-1 p-1 ">
                <RdsBankCardDetail
                    cardDatas={props.cardDatas}
                    isSelectable={props.isSelectable || false}
                    isEditable={props.isEditable || false}
                />
            </div>
        </>
    );
};
export default RdsCompBankCardDetailList;
