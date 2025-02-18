import React from "react";
import RdsIcon from "../rds-icon";
import RdsLabel from "../rds-label";
import "./rds-team-member.css";

export interface RdsTeamMemberProps {
    teamItem: any[];
}

const RdsTeamMember = (props: RdsTeamMemberProps) => {
    return (
        <div>
            {props.teamItem.map((teamItems, idx) => (
                <>
                    <div className="row m-auto">
                        <div className="mt-3 p-0 cardWidth">
                            <div className="card-border mt-5 pt-5 ">
                                <div
                                    className="card pb-4 justify-content-end cardPadding"
                                >
                                    <div className="cardPosition"
                                    >
                                        <img height={232} width={232}
                                            src={teamItems.imgLink}
                                            className="card-img-top"
                                            alt="..."
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <div className="d-flex justify-content-center mt-2">
                                            <h2 className="mb-0">
                                                <RdsLabel
                                                    label={teamItems.title}
                                                    multiline={false}
                                                    fontWeight="bold"
                                                    size="32px"
                                                ></RdsLabel>
                                            </h2>
                                        </div>
                                        <div className="d-flex justify-content-center text-primary">
                                            <h5>
                                                <RdsLabel
                                                    label={teamItems.subTitle}
                                                    multiline={false}
                                                    size="16px"
                                                ></RdsLabel>
                                            </h5>
                                        </div>
                                        <div className="d-flex justify-content-center text-muted gap-2">
                                            <RdsIcon
                                                name={teamItems.twitterIcon}
                                                height="27px"
                                                fill={false}
                                                stroke={true}
                                                width="27px"
                                                colorVariant=""
                                                isCursorPointer={true}
                                            ></RdsIcon>
                                            <RdsIcon
                                                //	class="mx-2"
                                                name={teamItems.twitterIcon}
                                                height="27px"
                                                fill={false}
                                                stroke={true}
                                                width="27px"
                                                colorVariant=""
                                                isCursorPointer={true}
                                            ></RdsIcon>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-3">
                                    <RdsLabel
                                        label={teamItems.description}
                                        multiline={true}
                                    ></RdsLabel>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ))}
        </div>
    );
};

export default RdsTeamMember;
