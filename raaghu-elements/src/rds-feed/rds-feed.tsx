import React from "react";
import RdsIcon from "../rds-icon/rds-icon";
import RdsLikeDislike from "../rds-like-dislike";
import RdsRating from "../rds-rating";
import "./rds-feed.styled.css";

export interface Item {
    id: React.Key | null | undefined;
    profilePic: string | undefined;
    date: string | undefined;
    withNoOfReviews: boolean;
    noOfReview?: number;
    name: string;
    username?: string;
    feedIcon?: string;
    imageUrl?: string;
    description: string;
    reviews?: string;
    reviewTitle?: string;
    reviewSubTitle?: string;
    rating?: 0 | 1 | 2 | 3 | 4 | 5;
    fill?: boolean;
    stroke?: boolean;
    size?: "small" | "medium" | "large"; // Optional per item
}

export interface RdsFeedProps {
    size: "small" | "medium" | "large"; // Global size for the feed
    itemList: Item[];
}

const RdsFeed = (props: RdsFeedProps) => {
    const getSizeDimensions = (size: "small" | "medium" | "large") => {
        switch (size) {
            case "small":
                return { width: "30px", height: "30px" };
            case "large":
                return { width: "70px", height: "70px" };
            default: // medium
                return { width: "50px", height: "50px" };
        }
    };

    return (
        <div>
            {props.itemList.map((item: Item) => {
                // Use item size if provided, otherwise fallback to global size
                const { width, height } = getSizeDimensions(item.size || props.size);

                return (
                    <div key={item.id} className="border p-3">
                        <div className="d-flex">
                            <div>
                                <RdsIcon
                                    name={item.feedIcon}
                                    width={width}
                                    height={height}
                                    fill={item.fill || false}
                                    isCursorPointer={true}
                                ></RdsIcon>
                            </div>
                            <div className="flex-grow-1">
                                <div className="pb-1 d-flex flex-wrap gap-1">
                                    <span className="ms-3 text-left fw-bold col-12 col-sm-auto">
                                        {item.name}
                                    </span>
                                    <span className="ms-3 col-12 col-sm-auto">
                                        {item.username}
                                    </span>
                                    <span className="ms-3 col-12 col-sm-auto">{item.date}</span>
                                </div>
                            </div>
                        </div>
                        <div className="pb-1 d-flex">
                            <RdsRating></RdsRating>
                        </div>
                        <div>
                            <div className="h-25">
                                <label className="text-muted fst-italic">
                                    {item.description}
                                </label>
                            </div>
                            <div className="d-flex">
                                <div>
                                    <RdsLikeDislike like={0} dislike={0}></RdsLikeDislike>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default RdsFeed;
