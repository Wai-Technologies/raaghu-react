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
    stroke?: boolean

}
export interface RdsFeedProps {
    itemList: Item[];

}

const RdsFeed = (props: RdsFeedProps) => {
    return (
        <div>
            {
                props.itemList.map((item: Item) => (

                    <div className="border p-3">
                        <div className="d-flex">
                            <div>
                                <RdsIcon
                                    name={item.feedIcon}
                                    width="50px"
                                    height="50px"
                                    fill={false}
                                    isCursorPointer={true}
                                ></RdsIcon>
                            </div>
                            <div className="flex-grow-1">
                                <div className="pb-1 d-flex">
                                    <span
                                        className="text-left fw-bold">
                                        {item.name}
                                    </span>
                                    <span
                                        className=" ms-3">
                                        {item.username}
                                    </span>
                                    <span
                                        className=" ms-3">
                                        {item.date}
                                    </span>
                                </div>
                                <div className="pb-1 d-flex">

                                    <RdsRating ></RdsRating>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="h-25">
                                <label className="text-muted fst-italic " >
                                    {item.description}
                                </label>
                            </div>
                            <div className="d-flex">
                                <div>
                                    <RdsLikeDislike like={0} dislike={0}  ></RdsLikeDislike>
                                </div>

                            </div>
                        </div>
                    </div>
                ))
            }
        </div >
    );
};

export default RdsFeed;

