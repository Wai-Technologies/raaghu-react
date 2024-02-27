import React from "react";
import RdsAvatar from "../rds-avatar";
import RdsLabel from "../rds-label";
import RdsLikeDislike from "../rds-like-dislike";
import RdsRating from "../rds-rating";
import "./rds-review-category.css";
export interface Item {
	name: string;
	date?: Date;
	imageUrl?: string;
	rating?: 0 | 1 | 2 | 3 | 4 | 5;
	reviewTitle?: string;
	reviewSubTitle?: string;
	description?: string;
	likes?: number;
	dislikes?: number;
}
export interface RdsReviewCategoryProps {
	display_type: string;
	item: Item;
}

const RdsReviewCategory = (props: RdsReviewCategoryProps) => {
    return (
        <>
            {props.item && props.display_type === "Basic" && (
                <div className="RdsReviewCategory__basic">
                    <div className="row sm-d-flex">
                        <div className="col-md-3">
                            <div className="d-flex justify-content-start align-items-start flex-column gap-5 sm-gap-0">
                                <div>
                                    <RdsLabel
                                        label={props.item.name}
                                        multiline={false}
                                        fontWeight="bold"
                                    />
                                    {props.item.date && (
                                        <p className="mt-2 text-secondary">
                                            {props.item.date.toDateString().slice(4)}
                                        </p>
                                    )}
                                </div>
                                {props.item.likes && props.item.dislikes && <div>
                                    <RdsLikeDislike
                                        like={props.item.likes}
                                        dislike={props.item.dislikes}
                                    />
                                </div>}
                            </div>
                        </div>
                        {props.item.rating && <div className="col-md-3">
                            <div className="mb-3">
                                <RdsRating
                                    rating={props.item.rating}
                                />
                            </div>
                        </div>}
                        <div className="col-md-6">
                            <RdsLabel
                                label={props.item.reviewTitle}
                                multiline={true}
                                fontWeight="bold"
                            />
                            <RdsLabel label={props.item.reviewSubTitle} multiline={true} />
                            <RdsLabel label={props.item.description} multiline={true} />
                        </div>
                    </div>
                </div>
            )}

            {props.item && props.display_type === "ReviewType_1" && (
                <div className="RdsReviewCategory__review-type-1">
                    <div className="row sm-d-flex">
                        <div className="col-md-3">
                            <div className="avatar">
                                <RdsAvatar
                                    colorVariant="light"
                                    withProfilePic={true}
                                    profilePic={props.item.imageUrl}
                                />
                            </div>
                            <div className="item-name">
                                <RdsLabel
                                    label={props.item.name}
                                    multiline={false}
                                    fontWeight="bold"
                                />
                            </div>
                            {props.item.rating && <div className="rating">
                                <RdsRating
                                    rating={props.item.rating}
                                    colorVariant="warning"
                                />
                            </div>}
                            {props.item.likes && props.item.dislikes && <div className="mt-3">
                                <RdsLikeDislike
                                    like={props.item.likes}
                                    dislike={props.item.dislikes}
                                />
                            </div>}
                        </div>
                        <div className="col-md-8 pe-5">
                            <RdsLabel
                                label={props.item.reviewTitle}
                                multiline={true}
                                fontWeight="bold"
                            />
                            <RdsLabel label={props.item.reviewTitle} multiline={true} />
                            <RdsLabel label={props.item.description} multiline={true} />
                        </div>
                    </div>
                </div>
            )}

            {props.item && props.display_type === "ReviewType_2" && (
                <div className="RdsReviewCategory__review-type-2">
                    <div className="py-2 col-md-9">
                        <div className="d-flex pb-3">
                            <div className="avatar">
                                <RdsAvatar
                                    colorVariant="light"
                                    withProfilePic={true}
                                    profilePic={props.item.imageUrl}
                                />
                            </div>
                            <div className="mx-3">
                                <div className="item-name">
                                    <RdsLabel
                                        label={props.item.name}
                                        multiline={false}
                                        fontWeight="bold"
                                    />
                                </div>
                                {props.item.rating && <div className="rating">
                                    <RdsRating
                                        rating={props.item.rating}
                                        colorVariant="warning"
                                    />
                                </div>}
                            </div>
                        </div>
                        <div className="description mt-1">
                            <RdsLabel label={props.item.description} multiline={true} />
                        </div>
                        {props.item.likes && props.item.dislikes && <div className="mt-2">
                            <RdsLikeDislike
                                like={props.item.likes}
                                dislike={props.item.dislikes}
                            />
                        </div>}
                    </div>
                </div>
            )}
        </>
    );
};

export default RdsReviewCategory;
