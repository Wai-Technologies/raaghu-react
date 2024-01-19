import React from "react";
import { RdsReviewCategory } from "../rds-elements";
import RdsCompFeeds, { Item } from "../rds-comp-feeds/rds-comp-feeds";
export interface RdsCompReviewsProps {
    itemList: Item[];
    variantType?: "multi-column" | "with-summary-chart" | "simple-with-avatars";
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
            {props.variantType === "simple-with-avatars" && <RdsCompFeeds variantType='Advanced' itemList={props.itemList} />}
        </div>
    );
};
export default RdsCompReviews;