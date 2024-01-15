//Edit this file and export this in App.tsx
import React, { useEffect, useState } from "react";
import {
    RdsSearch
} from "../../../rds-elements";
import { RdsCompDatatable } from "../../../rds-components";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../libs/state-management/hooks";

import {
    GetAllNewsLetters, preferencesData
} from "../../../../libs/state-management/newsletters/newsletters-slice";
import { useTranslation } from "react-i18next";

export interface RdsPageNewsLetterProps { }

const Newsletters = (props: RdsPageNewsLetterProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const newsletters = useAppSelector((state) => state.persistedReducer.newsletters);
    const [skipCount, setSkipCount] = useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = useState<number>(10);
    const [totalRecords, setTotalRecords] = useState<number | null>(0);
    const [newsLettersData, setNewsLettersData] = useState<any>([]);

    const tableHeaders = [
        {
            displayName: t("CmsKit.Details"),
            key: "details",
            datatype: "text",
            sortable: true,
            required: true,
            dataLength: 30,
        },
        {
            displayName: t("CmsKit.EmailAddress"),
            key: "emailaddress",
            datatype: "text",
            sortable: true,
            required: true,
            dataLength: 30,
        },
        {
            displayName: t("CmsKit.CreationTime"),
            key: "creationtime",
            datatype: "text",
            sortable: true,
            required: true,
            dataLength: 30,
        },
    ];

    useEffect(() => {
        dispatch(GetAllNewsLetters({ preference: undefined, source: undefined, skipCount: skipCount, maxResultCount: recordsPerPage }) as any);
    }, [dispatch]);

    useEffect(() => {
        const temp: any[] = [];
        if (newsletters.GetAllNewsLetters.items) {
            newsletters.GetAllNewsLetters.items.map((res: any) => {
                const item = {
                    details: res.details,
                    emailaddress: res.emailaddress,
                    creationtime: res.creationtime,
                };
                temp.push(item);
            });
            setNewsLettersData(temp);
            setTotalRecords(newsletters.GetAllNewsLetters?.totalCount);
        }
    }, [newsletters.GetAllNewsLetters]);

    //paginationa handling
    const paginationHandler = (currentPage: number, recordsPP: number) => {
        const skipCount = recordsPP * (currentPage - 1);
        if (recordsPP !== recordsPerPage) {
            setRecordsPerPage(recordsPP);
        }
        setSkipCount(skipCount)
    };

    return (
        <div className="card px-4 py-4 h-100 border-0 rounded-0 card-full-stretch">
            <div className="row align-items-center">
                {newsLettersData?.length > 0 && (<div className="col-md-6 col-xxl-3 col-xl-3 col-lg-6 col-12 mb-3">
                    <RdsSearch
                        label=""
                        labelPosition="top"
                        placeholder="Search"
                        size="small"
                    />
                </div>)}
            </div>
            <div>
                <RdsCompDatatable
                    actionPosition="right"
                    tableHeaders={tableHeaders}
                    tableData={newsLettersData}
                    recordsPerPageSelectListOption={true}
                    pagination={true}
                    noDataheaderTitle={t("No Records Available") || ""}
                    illustration={true}
                    totalRecords={totalRecords}
                    recordsPerPage={recordsPerPage}
                    onPaginationHandler={paginationHandler}
                ></RdsCompDatatable>
            </div>
        </div>
    );
};

export default Newsletters;


