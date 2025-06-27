import React from "react";
import RdsAvatar from "../rds-avatar";
import RdsCompLabel from "../../../raaghu-components/src/rds-comp-label";
import RdsCompLikeDislike from "../../../raaghu-components/src/rds-comp-like-dislike";
import RdsRating from "../rds-rating";
import "./rds-review-category.css";
import { ColorVariant } from "../rds-rating/rds-rating";
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
                        <div className="col-md-2">
                            <div className="d-flex justify-content-start align-items-start flex-column gap-5 sm-gap-0">
                                <div>
                                    <RdsCompLabel
                                        label={props.item.name}
                                        multiline={false}
                                        fontWeight="bold"
                                    />
                                    {props.item.date && (
                                        <p className="mt-2 text-secondary">
                                            {props.item.date.toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric'
                                            }).replace(/ (\d{4})/, ', $1')}
                                        </p>
                                    )}
                                </div>
                                {props.item.likes && props.item.dislikes && <div>
                                    <RdsCompLikeDislike
                                        like={props.item.likes}
                                        dislike={props.item.dislikes}
                                    />
                                </div>}
                            </div>
                        </div>
                        {props.item.rating && <div className="col-md-4">
                            <div className="mb-3">
                                <RdsRating
                                    rating={props.item.rating}
                                    size="small"
                                />
                            </div>
                        </div>}
                        <div className="col-md-6">
                            <RdsCompLabel
                                label={props.item.reviewTitle}
                                multiline={true}
                                fontWeight="bold"
                            />
                            <RdsCompLabel label={props.item.reviewSubTitle} multiline={true} />
                            <RdsCompLabel label={props.item.description} multiline={true} />
                        </div>
                    </div>
                </div>
            )}

            {props.item && props.display_type === "ReviewType_1" && (
                <div className="RdsReviewCategory__review-type-1">
                    <div className="justify-content-between row sm-d-flex">
                        <div className="col-12 col-6 col-lg-3 col-md-5 mb-4 mb-md-0">
                            <div className="avatar">
                                <RdsAvatar
                                    colorVariant="light"
                                    withProfilePic={true}
                                    profilePic={props.item.imageUrl}
                                />
                            </div>
                            <div>
                                <RdsCompLabel
                                    label={props.item.name}
                                    multiline={false}
                                    fontWeight="bold"
                                />
                            </div>
                            {props.item.rating && <div className="rating">
                                <RdsRating
                                    rating={props.item.rating}
                                    colorVariant={ColorVariant.Warning}
                                    size="small"
                                />
                            </div>}
                            {props.item.likes && props.item.dislikes && <div className="mt-3">
                                <RdsCompLikeDislike
                                    like={props.item.likes}
                                    dislike={props.item.dislikes}
                                />
                            </div>}
                        </div>
                        <div className="col-12 col-lg-8 col-md-7 ">
                            <RdsCompLabel
                                label={props.item.reviewTitle}
                                multiline={true}
                                fontWeight="bold"
                            />
                            <RdsCompLabel label={props.item.reviewTitle} multiline={true} />
                            <RdsCompLabel label={props.item.description} multiline={true} />
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
                            <div>
                                <div>
                                    <RdsCompLabel
                                        label={props.item.name}
                                        multiline={false}
                                        fontWeight="bold"
                                    />
                                </div>
                                {props.item.rating && <div className="rating">
                                    <RdsRating
                                        rating={props.item.rating}
                                        colorVariant={ColorVariant.Warning}
                                        size="small"
                                    />
                                </div>}
                            </div>
                        </div>
                        <div className="description mt-1">
                            <RdsCompLabel label={props.item.description} multiline={true} />
                        </div>
                        {props.item.likes && props.item.dislikes && <div className="mt-2">
                            <RdsCompLikeDislike
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
