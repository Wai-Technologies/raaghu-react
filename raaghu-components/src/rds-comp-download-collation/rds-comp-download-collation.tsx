import React from "react";
import { RdsIcon } from "../rds-elements";

export interface RdsCompDownloadCollationProps {
    downloadTable: any[];
}

const RdsCompDownloadCollation = (props: RdsCompDownloadCollationProps) => {
    return (
        <>
            <div className=" border p-3">
                {props.downloadTable.map((item: any, inidex: number) => (
                    <div className="d-flex justify-content-between  p-3" role="listitem">
                        <div className="d-flex justify-content-between">
                            <span className="align-self-center ms-2 me-3">
                                <RdsIcon
                                    name="information"
                                    fill={false}
                                    stroke={true}
                                    colorVariant="dark"
                                    width="30px"
                                    height="30px"
                                />
                            </span>
                            <span>
                                <small className="d-flex">{item.DateofData}</small>
                                <small className="text-muted"> {item.NummberofDay}</small>
                            </span>
                        </div>
                        <div>
                            <RdsIcon
                                name="download"
                                fill={false}
                                stroke={true}
                                colorVariant="primary"
                                width="30px"
                                height="30px"
                            />
                        </div>
                    </div>

                ))}
            </div>
        </>
    );
};
export default RdsCompDownloadCollation;
