import React from "react";
import {
    RdsLabel,
    RdsProgressBar,
    RdsRating,
    RdsIcon,
} from "../rds-elements";
export interface RdsCompCustomerReviewsProps {
    itemList: { value: number; count: number }[];
}
const RdsCompCustomerReviews = (props: RdsCompCustomerReviewsProps) => {
    let totalCountOfRatings = 0;
    for (const item of props.itemList) {
        totalCountOfRatings += item.count;
    }
    const getReviewRate = (count: number): number => {
        return Math.round((100 * count) / totalCountOfRatings);
    };
    const getReviewRateString = (count: number): string => {
        return Math.round((100 * count) / totalCountOfRatings).toString();
    };
    return (
        <div>
            <div>
                <h1>Product Name</h1>
                <div className="row mt-4 mb-2">
                    <RdsRating rating={4}></RdsRating>
                </div>
            </div>
            {props.itemList
                .slice(0)
                .reverse()
                .map((item: any, index: number) => (
                    <div className="d-flex mt-3 gap-4 align-items-baseline">
                        <div className="d-flex align-items-center gap-3">
                            <RdsLabel label={item.value}></RdsLabel>
                            <RdsIcon
                                height="20px"
                                fill={true}
                                stroke={true}
                                width="20px"
                                name="star"
                                colorVariant="review"
                            ></RdsIcon>
                        </div>
                        <div className="w-100">
                            <div className="mt-1">
                                <RdsProgressBar
                                    height={15}
                                    colorVariant="warning"
                                    progressWidth={getReviewRate(item.count)}
                                    role={"single"} steps={0} completedSteps={0}                                ></RdsProgressBar>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <RdsLabel label={getReviewRateString(item.count)}></RdsLabel>
                            <span className="fs-5 fw-bolder mt-1">%</span>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default RdsCompCustomerReviews;
