import React from "react";
import { RdsReviewCategory } from "../rds-elements";
import RdsCompFeeds, { Item } from "../rds-comp-feeds/rds-comp-feeds";
export interface RdsCompReviewsProps {
    itemList: Item[];
    variantType?: "with-summary-chart" | "multi-column";
}
const RdsCompReviews = (props: RdsCompReviewsProps) => {
    return (
        <div>
            {props.variantType === "with-summary-chart" && <RdsCompFeeds variantType='Advanced' itemList={props.itemList} />}
            {props.variantType === "multi-column" &&
                props.itemList.map((item: any) => (
                    <div className="mb-4">
                        <RdsReviewCategory display_type='Basic' item={item} />
                    </div>
                ))
            }
        </div>
    );
};
export default RdsCompReviews;