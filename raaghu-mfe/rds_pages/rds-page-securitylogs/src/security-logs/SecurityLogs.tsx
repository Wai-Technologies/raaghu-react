import React, { Suspense, useEffect, useState } from "react";
import {RdsButton, RdsInput, RdsDatePicker} from "../../../../../raaghu-elements/src";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../libs/state-management/hooks";
import { fetchSecurityLogs } from "../../../../libs/state-management/security-logs/security-logs-slice";
import { RdsCompAlertPopup, RdsCompDatatable } from "../../../rds-components";
import { useTranslation } from "react-i18next";


const SecurityLogs = () => {
    const { t } = useTranslation();
    const data = useAppSelector((state) => state.persistedReducer.securityLogs);
    const [securityLogsData, setData] = useState<any>([]);
    const [skipCount, setSkipCount] = useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = useState<number>(10);
    const [totalRecords, setTotalRecords] = useState<number | null>(0);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [tomorrowDate, setTomorrowDate] = useState(new Date());
    const [recordsFound, setRecordsFound] = useState(true);
    const [maxResultCount, setMaxResultCount] = useState<number>(10);

    const tableHeadersForExcel = [
        "Time",
        "Actions",
        "IP Address",
        "Browser/Os",
        "Application",
        "Identity",
        "Users",
    ];

    const tableHeaders = [
        {
            displayName: t("Time"),
            key: "creationTime",
            datatype: "date",
            sortable: true,
        },
        {
            displayName: t("Actions"),
            key: "action",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("IP Address"),
            key: "clientIpAddress",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("Browser/Os"),
            key: "browserInfo",
            datatype: "tooltip",
            sortable: true,
            dataLength: 35,
        },
        {
            displayName: t("AbpAccount.MySecurityLogs:Application"),
            key: "applicationName",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("AbpAccount.MySecurityLogs:Identity"),
            key: "identity",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("AbpIdentity.Users"),
            key: "userName",
            datatype: "text",
            sortable: true,
        },
    ];

    useEffect(() => {
        setCurrentDate(new Date());
    }, []);

    const formatDateString = (date: Date) => {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }

    const formattedCurrentDate = formatDateString(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    const formattedTomorrowDate = formatDateString(tomorrowDate);

    let [selectFilterValue, setSelectFilterValue] = useState({
        action: "",
        userName: "",
        startTime: formattedCurrentDate,
        endTime: formattedTomorrowDate
    });




    function downloadcsv() {
        const dataToDownload = securityLogsData.map((item: any) => [
            item?.creationTime,
            item?.action,
            item?.clientIpAddress,
            item?.browserInfo.replace(/,/g, '-'),
            item?.applicationName,
            item?.identity,
            item?.userName,
        ]);

        const csvStrings = [
            tableHeadersForExcel.map(header => t(header)).join(',') + '\r\n',
            ...dataToDownload.map((row: any) => row.join(',') + '\r\n'),
        ].join('');

        const blob = new Blob([csvStrings], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'securityLogs.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }

    const dispatch = useAppDispatch();
    const securityLogsParamsData = {
        action: selectFilterValue.action,
        userName: selectFilterValue.userName,
        startTime: selectFilterValue.startTime,
        endTime: selectFilterValue.endTime
    };

    const securityLogsTableData = {
        action: "",
        identity: "",
        browserInfo: "",
        userName: "",
        applicationName: "",
        clientIpAddress: "",
        startDate: "",
        endDate: ""
    };


    useEffect(() => {
        dispatch(fetchSecurityLogs({ skipCount: skipCount, maxResultCount: maxResultCount, startTime: formattedCurrentDate, endTime: formattedTomorrowDate }) as any);
    }, [dispatch, skipCount, maxResultCount])

    useEffect(() => {
        if (data?.securityLogs) {
            const tableDataShow = data.securityLogs?.items.map((item: any) => {
                return {
                    id: item?.id,
                    startTime: item?.startTime,
                    endTime: item?.endTime,
                    creationTime: item.creationTime,
                    action: item?.action,
                    clientIpAddress: item?.clientIpAddress,
                    browserInfo: item?.browserInfo,
                    applicationName: item?.applicationName,
                    identity: item?.identity,
                    userName: item?.userName,
                };
            });
            setData(tableDataShow);
            setTotalRecords(data?.securityLogs?.totalCount);
        }
    }, [data?.securityLogs]);



    const onActionFilter = (event: any) => {
        setSelectFilterValue({
            ...selectFilterValue,
            action: event.target.value,
        });
        if (event.target.value.length > 5) {
            dispatch(fetchSecurityLogs({ ...securityLogsParamsData, action: event.target.value }) as any);
        }
        if (securityLogsData.length > 0) {
            setRecordsFound(false);
        }
        else {
            setRecordsFound(true);
        }
    };

    const onUserNameFilter = (event: any) => {
        setSelectFilterValue({
            ...selectFilterValue,
            userName: event?.target?.value,
        });
        if (event.target.value.length >= 3) {
            dispatch(fetchSecurityLogs({ ...securityLogsParamsData, userName: event.target.value }) as any);
        }
        else {
            dispatch(fetchSecurityLogs({ skipCount: skipCount, maxResultCount: recordsPerPage }) as any);
        }
        if (securityLogsData.length > 0) {
            setRecordsFound(false);
        }
        else {
            setRecordsFound(true);
        }
        // setRecordsFound(securityLogsData.length > 0);
    };

    const formatDate = (inputDate: any) => {
        const dateObj = new Date(inputDate);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const onDateSelectFilter = (startDate: any, endDate: any) => {
        const [start, end] = startDate;

        const currentDate = new Date();
        const formattedCurrentDate = formatDate(currentDate);

        let formattedStart = formatDate(start);
        let formattedEnd = formatDate(end);

        if (formattedStart === formattedCurrentDate) {
            const nextDay = new Date(currentDate);
            nextDay.setDate(nextDay.getDate() + 1);
            formattedEnd = formatDate(nextDay);
        }

        const yesterday = new Date(currentDate);
        yesterday.setDate(yesterday.getDate() - 1);
        if (formattedStart === formatDate(yesterday)) {
            const dayBeforeYesterday = new Date(yesterday);
            dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 1);
            formattedStart = formatDate(dayBeforeYesterday);
            formattedEnd = formatDate(yesterday);
        }

        setSelectFilterValue({
            ...selectFilterValue,
            startTime: formattedStart,
            endTime: formattedEnd
        });
        dispatch(fetchSecurityLogs({ ...securityLogsParamsData, startTime: formattedStart, endTime: formattedEnd }) as any);
    }



    const paginationHandler = (currentPage: number, recordsPP: number) => {
        const skipCount = recordsPP * (currentPage - 1);
        setSkipCount(skipCount);
        setMaxResultCount(recordsPP);
    };

    return (
        <Suspense>
            <div className="container-fluid p-0 m-0">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card px-4 py-4 card-full-stretch rounded-0 border-0">
                            <div className="card-body p-0">

                                <div className="row align-items-center">
                                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-12 mb-lg-3 mb-2 mt-2">
                                        <RdsDatePicker
                                            // DatePickerLabel={t(" Date ") || ""}
                                            type="advanced"
                                            // selectedDate={selectFilterValue.creationTime}
                                            customDate={onDateSelectFilter}
                                            isDropdownOpen={false}
                                        ></RdsDatePicker>
                                    </div>
                                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-12 mb-lg-3 mb-2">
                                        <RdsInput
                                            inputType="text"
                                            // label={t("Actions ") || ""}
                                            placeholder="Search by Actions"
                                            labelPosition="top"
                                            value={selectFilterValue.action}
                                            size="small"
                                            onChange={onActionFilter}
                                        ></RdsInput>
                                    </div>
                                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-12 mb-lg-3 mb-3">
                                        <RdsInput
                                            inputType="text"
                                            // label={t("Users ") || ""}
                                            placeholder="Search by Users"
                                            labelPosition="top"
                                            value={selectFilterValue.userName}
                                            size="small"
                                            onChange={onUserNameFilter}
                                        ></RdsInput>
                                    </div>
                                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-12 mb-lg-0 mb-md-2 mb-3 d-xxl-flex d-xl-flex d-lg-flex justify-content-end">
                                        {recordsFound && (
                                            <>
                                                <RdsButton
                                                    type="button"
                                                    colorVariant="primary"
                                                    label={t("") || ""}
                                                    isOutline={true}
                                                    icon="downloads"
                                                    iconHeight="16px"
                                                    size="small"
                                                    iconFill={true}
                                                    iconStroke={true}
                                                    iconWidth="16px"
                                                    iconColorVariant="light"
                                                    onClick={downloadcsv}
                                                    tooltip={true}
                                                    tooltipTitle={"Download"}
                                                    tooltipPlacement="bottom"
                                                />
                                                <RdsCompAlertPopup
                                                    alertConfirmation="Download Security Log Files ?"
                                                    alertID="alert_popup"
                                                    cancelButtonLabel="Cancel"
                                                    colorVariant="success"
                                                    deleteButtonLabel="Yes"
                                                    messageAlert=" "
                                                    iconUrl="download"
                                                    data-bs-target="#alert_popup"
                                                    data-bs-toggle="modal"
                                                />
                                            </>

                                        )}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <RdsCompDatatable
                                            tableHeaders={tableHeaders}
                                            tableData={securityLogsData}
                                            recordsPerPageSelectListOption={true}
                                            pagination={true}
                                            totalRecords={totalRecords}
                                            recordsPerPage={recordsPerPage}
                                            illustration={true}
                                            noDataheaderTitle={t("No Records Available") || ""}
                                            onPaginationHandler={paginationHandler}
                                        ></RdsCompDatatable>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <></>
        </Suspense>
    );
};

export default SecurityLogs;


