import React, { useState } from "react";
import "./rds-comp-cache.css";
import { RdsIcon, RdsPagination } from "../rds-elements";
import { useEffect } from "react";
import RdsCompAlertPopup from "../rds-comp-alert-popup/rds-comp-alert-popup";

export interface RdsCacheProps {
    cachedata: any[];
    recordsperpage: number;
    pagination?: boolean;
    onclick?: (event: React.MouseEvent<HTMLDivElement>, id: number) => void;
    alignment?: string;
}

const RdsCompCache = (props: RdsCacheProps) => {
    const [cache, setcache] = useState(props.cachedata);
    const [pagecache, setpagecache] = useState(props.cachedata);
    const [records, setrecords] = useState(props.recordsperpage);

    const deleteHandler = (i: any) => {
        const tempCache = cache.filter((element: any, id: any) => {
            if (element.id !== i) {
                return element;
            }
        });
        setcache(tempCache);
    };

    const [rowStatus, setRowStatus] = useState({
        startingRow: 0,
        endingRow: props.recordsperpage,
    });

    useEffect(() => {
        const tempCAche = cache.filter((element: any, i: number) => {
            if (i >= rowStatus.startingRow && i < rowStatus.endingRow) {
                return { element };
            } else {
                return;
            }
        });

        setpagecache(tempCAche);
    }, [rowStatus, cache]);

    const pagination: any = (currentPage: number, recordsPerPage: number) => {
        setRowStatus({
            startingRow: (currentPage - 1) * recordsPerPage, //0-index
            endingRow: currentPage * recordsPerPage, //considering that 1st element has '0' index
        });

        let tempCache = cache.filter((element: any, i: number) => {
            if (i >= rowStatus.startingRow && i < rowStatus.endingRow) {
                return { element };
            }
        });

        setpagecache(tempCache);
        tempCache = [];
    };
    return (
        <>
            {props.pagination === true ? (
                <div>
                    <div>
                        {pagecache.map((element: any, i) => (
                            <div key={i} className="contentbox border-bottom">
                                <div>{element.name}</div>
                                <div className="icon">
                                    <RdsIcon
                                        width="17px"
                                        height="17px"
                                        name="delete"
                                        stroke={true}
                                        tooltip={true}
                                        tooltipTitle={"Delete"}
                                        tooltipPlacement="right"
                                    ></RdsIcon>
                                    <RdsCompAlertPopup
                                        alertID={element.id}
                                        onSuccess={() => deleteHandler(element.id)}
                                    ></RdsCompAlertPopup>
                                </div>
                            </div>
                        ))}
                    </div>

                    <RdsPagination
                        totalRecords={cache.length}
                        recordsPerPage={props.recordsperpage}
                        paginationType="advance"
                        alignmentType={props.alignment}
                        onPageChange={pagination}
                    ></RdsPagination>
                </div>
            ) : (
                <div>
                    {cache.map((element: any, i) => (
                        <div key={i} className="contentbox border-bottom">
                            <div>{element.name}</div>
                            <div className="icon">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#alert_popup"
                                >
                                    Delete
                                </button>
                                <RdsCompAlertPopup alertID="alert_popup"></RdsCompAlertPopup>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default RdsCompCache;
