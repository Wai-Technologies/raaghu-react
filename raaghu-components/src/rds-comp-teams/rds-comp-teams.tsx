import React from "react";
import { RdsTeamMember } from "../rds-elements";
import RdsCompIcon from "../rds-comp-icon";
import RdsCompLabel from "../rds-comp-label";

export interface RdsCompTeamsProps {
  teamItem: any[];
}

const RdsCompTeams = (props: RdsCompTeamsProps) => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="align-items-center col-md-12 d-flex justify-content-between">
                            <h2>
                                <RdsCompLabel label="Meet the Team"></RdsCompLabel>
                            </h2>
                            <span>
                                <RdsCompIcon
                                    height="15px"
                                    fill={false}
                                    stroke={true}
                                    width="15px"
                                    name="arrow_right"
                                ></RdsCompIcon>
                                <RdsCompIcon
                                    height="15px"
                                    fill={false}
                                    stroke={true}
                                    width="15px"
                                    name="arrow_left"
                                ></RdsCompIcon>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {props.teamItem.map((Item) => (
                        <div className="col-lg-4 col-md-6 col-sm-12 mb-3 mt-2">
                            <RdsTeamMember teamItem={Item}></RdsTeamMember>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default RdsCompTeams;
