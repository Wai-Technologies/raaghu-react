import React, { useState } from "react";
import { RdsBadge, RdsPagination } from "../rds-elements";

export interface RdsCompWebsiteLogProps {
    websiteLogData: any[];
    pagination: boolean;
    alignmentType: string;
    totalRecords: number;
    recordsPerPage: number;
}
const RdsCompWebsiteLog = (props: RdsCompWebsiteLogProps) => {
    const [rowStatus, setRowStatus] = useState({
        startingRow: 0,
        endingRow: props.recordsPerPage,
    });
    const onPageChangeHandler = (currentPage: number, recordsPerPage: number) => {
        setRowStatus({
            startingRow: (currentPage - 1) * recordsPerPage, //0-index
            endingRow: currentPage * recordsPerPage, //considering that 1st element has '0' index
        });
    };

    return (
        <div data-testid="rds-pagination">
            {props.websiteLogData && props.websiteLogData.length > 0 && (
                <div data-testid="rds-comp-website-log">
                    {props.websiteLogData.map(
                        (item: any, index: number) =>
                            (props.pagination
                                ? typeof rowStatus.endingRow != "undefined" &&
                                index >= rowStatus.startingRow &&
                                index < rowStatus.endingRow
                                : true) && (
                                <div className="px-3" key={index}>
                                    <div className="d-flex align-items-center gap-3 border-bottom py-3">
                                        <div>
                                            <RdsBadge
                                                label={item.status}
                                                colorVariant={
                                                    item.status == "INFO"
                                                        ? "info"
                                                        : item.status == "WARN"
                                                            ? "warning"
                                                            : item.status == "ERROR"
                                                                ? "danger"
                                                                : "success"
                                                }

                                            />
                                        </div>
                                        <div>
                                            <small className="text-break">{item.content}</small>
                                        </div>
                                    </div>
                                </div>
                            )
                    )}
                    <div className="pt-3">
                        {props.pagination && (
                            <div className="RdsCompDataTable__RdsPagination">
                                <RdsPagination
                                    totalRecords={props.websiteLogData.length}
                                    recordsPerPage={
                                        props.recordsPerPage ? props.recordsPerPage : 5
                                    }
                                    onPageChange={onPageChangeHandler}
                                    paginationType="advanced"
                                    alignmentType={props.alignmentType}
                                ></RdsPagination>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
export default RdsCompWebsiteLog;
