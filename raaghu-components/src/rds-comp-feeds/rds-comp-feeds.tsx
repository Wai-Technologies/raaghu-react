import React from "react";
import { RdsAvatar, RdsIcon, RdsLikeDislike, RdsRating } from "../rds-elements";
export interface Item {
    name: string;
    username?: string;
    date?: Date;
    feedIcon?: string;
    imageUrl?: string;
    description: string;
    hashtags?: string;
    reviews?: string;
    reviewTitle?: string;
    reviewSubTitle?: string;
    replies?: string;
    rating?: 0 | 1 | 2 | 3 | 4 | 5;
    likes?: number;
    dislikes?: number;
}
export interface RdsCompFeedProps {
    itemList: Item[];
    variantType?: "Basic" | "Advanced";
}

const RdsCompFeeds = (props: RdsCompFeedProps) => {
    return (
        <div>
            {props.variantType === "Basic" &&
                props.itemList.map((item: Item, index: any) => (
                    <div className="border-bottom py-3">
                        <div className="d-flex">
                            <div>
                                <RdsAvatar
                                    profilePic={item.imageUrl}
                                    withProfilePic={true}
                                    height="60px"
                                ></RdsAvatar>
                            </div>
                            <div className="ps-3 flex-grow-1">
                                <div className="pb-1 d-flex">
                                    <div
                                        className="text-left fw-bold">
                                        {item.name}{" "}
                                    </div>
                                    {item.date && (
                                        <div
                                            className={
                                                "text-muted text-end text-lowercase flex-grow-1 "
                                            }
                                        >
                                            {item.date.toDateString().slice(4)}
                                        </div>
                                    )}
                                </div>
                                {
                                    <div className="h-25 mt-1">
                                        <label className="text-muted">
                                            {item.description.slice(0, 82)}
                                        </label>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                ))}

            {props.variantType === "Advanced" &&
                props.itemList.map((item: Item, index: any) => (
                    <div className="border-bottom py-4">
                        <div className="d-flex">
                            <div>
                                <RdsAvatar
                                    profilePic={item.imageUrl}
                                    withProfilePic={true}
                                    height="60px"
                                ></RdsAvatar>
                            </div>
                            <div className="ps-3 flex-grow-1">
                                <div className="pb-2 d-flex gap-2">
                                    <div
                                        className="text-left fw-bold">
                                        {item.name}{" "}
                                    </div>
                                    {item.feedIcon !== undefined && (
                                        <div className="me-1">
                                            <RdsIcon
                                                name={item.feedIcon}
                                                width="20px"
                                                height="20px"
                                                fill={false}
                                                stroke={true}
                                            ></RdsIcon>
                                        </div>
                                    )}
                                    {item.username && (
                                        <div className="text-muted text-lowercase">
                                            {item.username}
                                        </div>
                                    )}
                                    {item.username && item.date && (
                                        <span
                                            className="text-muted">
                                            &#8901;
                                        </span>
                                    )}
                                    {item.date && (
                                        <div className={"text-muted text-lowercase flex-grow-1 "}>
                                            {item.date.toDateString().slice(4)}
                                        </div>
                                    )}
                                </div>

                                {item.rating !== undefined && (
                                    <div
                                        className="h-25 mt-1 me-4 d-inline-block">
                                        <RdsRating
                                            rating={item.rating}
                                            colorVariant="warning"
                                            dataTestId="rating"
                                            size="medium"
                                        ></RdsRating>
                                    </div>
                                )}
                                {/* {item.reviews && (
                                    <div className="d-inline-block">
                                        <a href="#" className="text-decoration-none">
                                            {item.reviews}
                                        </a>
                                    </div>
                                )} */}
                            </div>
                        </div>

                        <div className="h-25 mt-1">
                            <label className="font-italic"> {item.description}</label>
                        </div>

                        {item.hashtags && (
                            <div className="mt-3">
                                <a href="#" className="text-decoration-none">
                                    {item.hashtags}
                                </a>
                            </div>
                        )}
                        <div className="h-25 my-3">
                            <RdsLikeDislike dislike={10} like={35} />
                        </div>

                        {item.replies && (
                            <div>
                                <a href="#" className="text-decoration-none">
                                    {item.replies}
                                </a>
                            </div>
                        )}
                    </div>
                ))}
        </div>
    );
};

export default RdsCompFeeds;
