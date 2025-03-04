import React from "react";
import { RdsAvatar, RdsIcon, RdsLikeDislike, RdsRating } from "../rds-elements";
import "./rds-comp-feeds.css";
import { ColorVariant } from "../../../raaghu-elements/src/rds-rating/rds-rating";
import { AvatarSize } from "../../../raaghu-elements/src/rds-avatar/rds-avatar";
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
                                    size={AvatarSize.small}
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
                                                "text-muted text-end flex-grow-1 "
                                            }
                                        >
                                            {item.date.toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric'
                                            }).replace(/ (\d{4})/, ', $1')}
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
                    <div className="border-bottom mb-3" id="feed_cards">
                    <div className="d-flex flex-column flex-md-row">
                        <div className="d-flex justify-content-center justify-content-md-start mb-3 mb-md-0" id="avtar_card">
                            <RdsAvatar
                                profilePic={item.imageUrl}
                                withProfilePic={true}
                                height="60px"
                                size={AvatarSize.small}
                            ></RdsAvatar>
                        </div>
                        <div className="ps-md-3 flex-grow-1 userdetails">
                            <div className="pb-2 d-flex gap-2 flex-wrap align-items-center">
                                <div className="text-left fw-bold">{item.name}{" "}</div>
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
                                    <span className="text-muted">&#8901;</span>
                                )}
                                {item.date && (
                                    <div className="text-muted flex-grow-1">
                                        {item.date.toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric'
                                        }).replace(/ (\d{4})/, ', $1')}
                                    </div>
                                )}
                            </div>
                
                            {item.rating !== undefined && (
                                <div className="h-25 mt-1 me-4 d-inline-block">
                                    <RdsRating
                                        rating={item.rating}
                                        colorVariant={ColorVariant.Warning}
                                        dataTestId="rating"
                                        size="medium"
                                    ></RdsRating>
                                </div>
                            )}
                        </div>
                    </div>
                
                    <div className="h-25 mt-1">
                        <label className="font-italic">{item.description}</label>
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
