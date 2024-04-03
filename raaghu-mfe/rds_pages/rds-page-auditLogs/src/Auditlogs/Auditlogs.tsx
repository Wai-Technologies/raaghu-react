import React, { useEffect, useState } from "react";
import { RdsCompDatatable } from "../../../rds-components";
import {
    RdsBadge,
    RdsOffcanvas,
    RdsDatePicker,
    RdsInput,
    RdsLabel,
    RdsNavtabs,
    RdsDropdownList,
} from "../../../rds-elements";
import {
    useAppSelector,
    useAppDispatch,
} from "../../../../libs/state-management/hooks";
import {
    getAuditLogsRequest,
    getAuditLogsEntityChangesRequest,
    getAuditLogsEntityChangeWithUsernameRequest,
    getAuditLogsEntityChangesWithUsernameRequest
} from "../../../../libs/state-management/public.api";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
 
export interface RdsPageAuditlogsProps {
    listItem1?: any;
    listItem2?: any;
    deleteEvent?: (event: React.MouseEventHandler<HTMLDivElement>) => void;
    parameterData?: (event: React.MouseEventHandler<HTMLDivElement>) => void;
    ChangeLogparameterData?: (
        event: React.MouseEventHandler<HTMLDivElement>
    ) => void;
    isShimmer?: boolean;
}
 
const getColorVariantForBadge: (code: number | string) => string = (code) => {
    if (typeof code === 'number') {
        if (code >= 200 && code <= 226) {
            return 'success';
        }
        else if (code >= 300 && code <= 308) {
            return 'warning';
        }
        else {
            return 'danger';
        }
    }
    else if (typeof code === 'string') {
        if (code === 'POST') {
            return 'success';
        } else if (code === 'DELETE') {
            return 'danger';
        } else if (code === 'PUT') {
            return 'warning';
        } else if (code === 'GET') {
            return 'primary';
        }
    }
    return 'dark';
};
 
const Auditlogs = (props: RdsPageAuditlogsProps) => {
 
    const { t } = useTranslation();
    const [activeNavTabId, setActiveNavTabId] = useState("0");
    const [activePageId, setActivePageId] = useState("0");
    const [activeEntityOffcanvasId, setActiveEntityOffcanvasId] = useState("0");
    const [skipCount, setSkipCount] = useState<number>(0);
    const [maxResultCount, setMaxResultCount] = useState<number>(10);
    const [changeHistoryTableData, setChangeHistoryData] = useState<any>([]);
    const [viewFullHistoryTableData, setViewFullHistoryData] = useState<any>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [tomorrowDate, setTomorrowDate] = useState(new Date());
    const [totalRecords, setTotalRecords] = useState<any>({
        audit: null,
        entity: null
    });
    const [tableData, setTableData] = useState<any>({
        audit: [],
        entity: []
    });
 
    useEffect(() => {
        setCurrentDate(new Date());
    }, []);
 
    const formatDateString = (date: Date) => {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }
 
    const formattedCurrentDate = formatDateString(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    const formattedTomorrowDate = formatDateString(tomorrowDate);
 
    let [searchFilter, setSearchFilter] = useState({
        url: '',
        httpStatusCode: '',
        startTime: formattedCurrentDate,
        endTime: formattedTomorrowDate
    })
 
    let [searchEntityChangesFilter, setEntityChangesFilter] = useState({
        startDate: formattedCurrentDate,
        endDate: formattedTomorrowDate,
        entityChangeType: '',
        entityTypeFullName: ''
    })
 
    const [tableDataRowid, setTableDataRowId] = useState(0);
    const operationActions = [
        { id: "information", displayName: t("View"), offId: "auditLogs" },
    ];
 
    const entityChangesActions = [
        { id: "information", displayName: t("View"), offId: "entityChanges" },
    ];
 
    const audituser = useAppSelector((state) => state.persistedReducer.auditLogs);
 
    const dispatch = useAppDispatch();
 
    const AuditHeaders = [
        {
            displayName: t("AbpAuditLogging.Url"),
            key: "url",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("AbpAuditLogging.User"),
            key: "userName",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("AbpAuditLogging.IpAddress"),
            key: "clientIpAddress",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("AbpAuditLogging.Time"),
            key: "executionTime",
            datatype: "date",
            sortable: true,
        },
        {
            displayName: t("AbpAuditLogging.ApplicationName"),
            key: "applicationName",
            datatype: "text",
            sortable: true,
        },
    ];
 
    const EntityChangesHeaders = [
        {
            displayName: t("AbpAuditLogging.Time"),
            key: "changeTime",
            datatype: "date",
            sortable: true,
        },
        {
            displayName: t("AbpAuditLogging.ChangeType"),
            key: "changeType",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("Tenant ID"),
            key: "tenantId",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("AbpAuditLogging.EntityTypeFullName"),
            key: "entityTypeFullName",
            datatype: "text",
            sortable: true,
        },
    ];
 
    const changeHistoryTableHeaders = [
        {
            displayName: "Property Name",
            key: "propertyName",
            datatype: "text",
            sortable: false,
        },
        {
            displayName: "Original Value",
            key: "originalValue",
            datatype: "text",
            sortable: false,
        },
        {
            displayName: "New Value",
            key: "newValue",
            datatype: "text",
            sortable: false,
        },
    ];
 
    const fullHistoryTableHeaders = [
        {
            displayName: "Property Full Name",
            key: "propertyTypeFullName",
            datatype: "text",
            sortable: false,
        },
        {
            displayName: "Property Name",
            key: "propertyName",
            datatype: "text",
            sortable: false,
        },
        {
            displayName: "New Value",
            key: "newValue",
            datatype: "text",
            sortable: false,
        },
    ]
 
 
    const navtabsItems = [
        { label: t("AbpAuditLogging.Overall"), tablink: " #nav-overall", id: "0" },
        { label: t("AbpAuditLogging.Actions"), tablink: " #nav-action", id: "1" },
    ];
 
    const entityNavtabsItems = [
        { label: t("AbpAuditLogging.ChangeDetails"), tablink: " #nav-change_history", id: "0" },
        { label: t("AbpAuditLogging.FullChangeHistory"), tablink: " #nav-full_history", id: "1" },
    ];
 
    const pageNavtabsItems = [
        { label: t("AbpAuditLogging.AuditLogs"), tablink: " #nav-audit-log", id: "0" },
        { label: t("AbpAuditLogging.EntityChanges"), tablink: " #nav-entity-changes", id: "1" },
    ];
 
    const statusCodeList = [
        { label: "100 - Continue", val: "100 " },
        { label: "101 - Switching Protocols", val: "101 " },
        { label: "102 - Processing", val: "102 " },
        { label: "103 - Early Hints", val: "103 " },
        { label: "200 - OK", val: "200 " },
        { label: "201 - Created", val: "201 " },
        { label: "202 - Accepted", val: "202 " },
        { label: "203 - Non-Authoritative Information", val: "203 " },
        { label: "204 - No Content", val: "204 " },
        { label: "205 - Reset Content", val: "205 " },
        { label: "206 - Partial Content", val: "206 " },
        { label: "207 - Multi-Status", val: "207 " },
        { label: "208 - Already Reported", val: "208 " },
        { label: "226 - IM Used", val: "226 " },
        { label: "300 - Multiple Choices", val: "300 " },
        { label: "301 - Moved Permanently", val: "301 " },
        { label: "302 - Found (Previously 'Moved Temporarily')", val: "302 " },
        { label: "303 - See Other", val: "303 " },
        { label: "304 - Not Modified", val: "304 " },
        { label: "305 - Use Proxy", val: "305 " },
        { label: "306 - Switch Proxy", val: "306 " },
        { label: "307 - Temporary Redirect", val: "307 " },
        { label: "308 - Permanent Redirect", val: "308 " },
        { label: "400 - Bad Request", val: "400 " },
        { label: "401 - Unauthorized", val: "401 " },
        { label: "402 - Payment Required", val: "402 " },
        { label: "403 - Forbidden", val: "403 " },
        { label: "404 - Not Found", val: "404 " },
        { label: "405 - Method Not Allowed", val: "405 " },
        { label: "406 - Not Acceptable", val: "406 " },
        { label: "407 - Proxy Authentication Required", val: "407 " },
        { label: "408 - Request Timeout", val: "408 " },
        { label: "409 - Conflict", val: "409 " },
        { label: "410 - Gone", val: "410 " },
        { label: "411 - Length Required", val: "411 " },
        { label: "412 - Precondition Failed", val: "412 " },
        { label: "413 - Payload Too Large", val: "413 " },
        { label: "414 - URI Too Long", val: "414 " },
        { label: "415 - Unsupported Media Type", val: "415 " },
        { label: "416 - Range Not Satisfiable", val: "416 " },
        { label: "417 - Expectation Failed", val: "417 " },
        { label: "418 - I'm a Teapot", val: "418 " },
        { label: "421 - Misdirected Request", val: "421 " },
        { label: "422 - Unprocessable Entity", val: "422 " },
        { label: "423 - Locked", val: "423 " },
        { label: "424 - Failed Dependency", val: "424 " },
        { label: "425 - Too Early", val: "425 " },
        { label: "426 - Upgrade Required", val: "426 " },
        { label: "428 - Precondition Required", val: "428 " },
        { label: "429 - Too Many Requests", val: "429 " },
        { label: "431 - Request Header Fields Too Large", val: "431 " },
        { label: "451 - Unavailable For Legal Reasons", val: "451 " },
        { label: "500 - Internal Server Error", val: "500 " },
        { label: "501 - Not Implemented", val: "501 " },
        { label: "502 - Bad Gateway", val: "502 " },
        { label: "503 - Service Unavailable", val: "503 " },
        { label: "504 - Gateway Timeout", val: "504 " },
        { label: "505 - HTTP Version Not Supported", val: "505 " },
        { label: "506 - Variant Also Negotiates", val: "506 " },
        { label: "507 - Insufficient Storage", val: "507 " },
        { label: "508 - Loop Detected", val: "508 " },
        { label: "510 - Not Extended", val: "510 " },
        { label: "511 - Network Authentication Required", val: "511 " },
    ];
 
    const changedTypeList = [
        { label: "Created", val: "0 " },
        { label: "Updated", val: "1 " },
        { label: "Deleted", val: "2 " }
    ]
 
 
 
 
    const Auditpayload = () => {
        dispatch(getAuditLogsRequest({ skipCount: skipCount, maxResultCount: maxResultCount, startTime: formattedCurrentDate, endTime: formattedTomorrowDate }) as any);
    };
 
    const loadEntityChange = () => {
        dispatch(getAuditLogsEntityChangesRequest({ skipCount: skipCount, maxResultCount: maxResultCount, startDate: formattedCurrentDate, endDate: formattedTomorrowDate }) as any);
    };
 
    const fetchFunctions = [Auditpayload, loadEntityChange];
 
    useEffect(() => {
        fetchFunctions[parseInt(activePageId)]();
    }, [dispatch, skipCount, maxResultCount, activePageId]);
 
    useEffect(() => {
        if (audituser?.getAuditLogs?.items) {
            const auditDataTable = audituser.getAuditLogs.items.map((dataAudit: any) => {
                let timeCol = null;
                if (dataAudit.executionTime === '2023-08-25T09:03:26.8597775') {
                    timeCol = (
                        <span>Hello</span>
                    )
                }
                let ipAddress = '';
                if (dataAudit.clientIpAddress === "::1") {
                    ipAddress = "127.0.0.1";
                } else {
                    ipAddress = dataAudit.clientIpAddress;
                }
                const httpRequestCol = (
                    <span>
                        <RdsBadge
                            label={dataAudit.httpStatusCode.toString()}
                            colorVariant={getColorVariantForBadge(dataAudit.httpStatusCode)}
                        ></RdsBadge>
                        <RdsBadge
                            label={dataAudit.httpMethod.toString()}
                            colorVariant={getColorVariantForBadge(dataAudit.httpMethod)}
                            className="ms-2 me-2"
                        ></RdsBadge>
                    </span>
                );
 
                const urlCoConcatData = (
                    <span className="d-flex text-truncate">
                        {httpRequestCol} {dataAudit.url}
                    </span>
                );
 
                return {
                    id: dataAudit.id,
                    httpStatusCode: dataAudit.httpStatusCode,
                    httpMethod: dataAudit.httpMethod,
                    url: urlCoConcatData,
                    userName: dataAudit.userName,
                    clientIpAddress: ipAddress,
                    executionTime: dataAudit.executionTime,
                    applicationName: dataAudit.applicationName,
                    browserInfo: dataAudit.browserInfo,
                    clientName: dataAudit.clientName,
                    exceptions: dataAudit.exceptions,
                    correlationId: dataAudit.correlationId,
                    comments: dataAudit.comments,
                };
            }, []);
            setTableData({ ...tableData, audit: auditDataTable })
        }
        setTotalRecords({ ...totalRecords, audit: audituser?.getAuditLogs?.totalCount });
    }, [audituser?.getAuditLogs]);
 
 
    useEffect(() => {
        if (audituser?.getAuditLogsEntityChanges?.items) {
            const entityDataTable = audituser.getAuditLogsEntityChanges.items.map((data: any) => {
                let changedTypeLabel = '';
                if (data.changeType === 0) {
                    changedTypeLabel = 'Created';
                }
                else if (data.changeType === 1) {
                    changedTypeLabel = 'Updated';
                }
                else if (data.changeType === 2) {
                    changedTypeLabel = 'Deleted';
                }
 
                return {
                    id: data.id,
                    entityId: data.entityId,
                    changeTime: data.changeTime,
                    changeType: changedTypeLabel,
                    tenantId: data.tenantId,
                    entityTypeFullName: data.entityTypeFullName,
                };
            }, []);
            setTableData({ ...tableData, entity: entityDataTable })
        }
        setTotalRecords({ ...totalRecords, entity: audituser?.getAuditLogsEntityChanges?.totalCount });
    }, [audituser?.getAuditLogsEntityChanges]);
 
 
    useEffect(() => {
        if (audituser?.getAuditLogsEntityChangeWithUsername?.items) {
            const changeHistoryData = audituser.getAuditLogsEntityChangeWithUsername?.items.map((item: any) => {
                return {
                    id: item.id,
                    newValue: item.newValue,
                    originalValue: item.originalValue,
                    propertyName: item.propertyName,
                    propertyTypeFullName: item.propertyTypeFullName,
                    tenantId: item.tenantId
                };
            }, []);
            setChangeHistoryData(changeHistoryData);
        }
    }, [audituser?.getAuditLogsEntityChangeWithUsername]);
 
    useEffect(() => {
        if (audituser?.getAuditLogsEntityChangesWithUsername?.items) {
            const fullChangeHistoryData = audituser.getAuditLogsEntityChangesWithUsername.items.map((item: any) => {
 
                return {
                    id: item.id,
                    propertyTypeFullName: item.propertyTypeFullName,
                    newValue: item.newValue,
                    originalValue: item.originalValue,
                    propertyName: item.propertyName,
                };
            }, []);
            setViewFullHistoryData(fullChangeHistoryData);
        }
    }, [audituser?.getAuditLogsEntityChangesWithUsername]);
 
    const onActionSelection = (rowData: any, actionId: any) => {
        setTableDataRowId(rowData.id);
    };
 
    const onEntityActionSelection = (rowData: any, actionId: any) => {
        setTableDataRowId(rowData.id);
        dispatch(getAuditLogsEntityChangeWithUsernameRequest(rowData.id) as any);
        dispatch(getAuditLogsEntityChangesWithUsernameRequest({ entityId: rowData.entityId, entityTypeFullName: rowData.entityTypeFullName }) as any);
 
    };
 
    const auditPagePaginationHandler = (currentPage: number, recordsPP: number) => {
        const skipCount = recordsPP * (currentPage - 1);
        setSkipCount(skipCount);
        setMaxResultCount(recordsPP);
    };
 
    const entityPagepaginationHandler = (currentPage: number, recordsPP: number) => {
        const skipCount = recordsPP * (currentPage - 1);
        setSkipCount(skipCount);
        setMaxResultCount(recordsPP);
    };
 
    const onUrlFilter = (event: any) => {
        setSearchFilter({
            ...searchFilter,
            url: event.target.value,
        });
        if (event.target.value.length > 4) {
            dispatch(getAuditLogsRequest(searchFilter) as any);
        } else {
            dispatch(getAuditLogsRequest({ skipCount: skipCount, maxResultCount: maxResultCount, startTime: formattedCurrentDate, endTime: formattedTomorrowDate }) as any);
        }
 
    };
 
    const onHttpCodeFilter = (event: any, val: string) => {
        setSearchFilter({
            ...searchFilter,
            httpStatusCode: val
        });
        dispatch(getAuditLogsRequest({ ...searchFilter, httpStatusCode: val }) as any);
    };
 
    const formatDate = (inputDate: any) => {
        const dateObj = new Date(inputDate);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
 
 
    const onAuditDateSelectFilter = (startDate: any) => {
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
 
        setSearchFilter({
            ...searchFilter,
            startTime: formattedStart,
            endTime: formattedEnd
        });
        dispatch(getAuditLogsRequest({ ...searchFilter, startTime: formattedStart, endTime: formattedEnd }) as any);
    }
 
    const onEntityDateSelectFilter = (startDate: any) => {
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
        setEntityChangesFilter({
            ...searchEntityChangesFilter,
            startDate: formattedStart,
            endDate: formattedEnd
        });
        dispatch(getAuditLogsEntityChangesRequest({ ...searchEntityChangesFilter, startDate: formattedStart, endDate: formattedEnd }) as any);
    }
 
    const onChangeTypeFilter = (event: any, val: string) => {
        setEntityChangesFilter({
            ...searchEntityChangesFilter,
            entityChangeType: val,
        });
        dispatch(getAuditLogsEntityChangesRequest({ ...searchEntityChangesFilter, entityChangeType: val }) as any);
    };
 
    const onEntityFullNameFilter = (event: any) => {
        setEntityChangesFilter({
            ...searchEntityChangesFilter,
            entityTypeFullName: event.target.value,
 
        });
        if (event.target.value.length > 4) {
            dispatch(getAuditLogsEntityChangesRequest(searchEntityChangesFilter) as any);
        }
        else {
            dispatch(getAuditLogsEntityChangesRequest({ skipCount: skipCount, maxResultCount: maxResultCount, startDate: formattedCurrentDate, endDate: formattedTomorrowDate }) as any);
        }
    };
 
    const onResetAuditOffcanvas = () => {
        setActiveNavTabId("0");
    }
 
    const onResetEntityOffcanvas = () => {
        setActiveEntityOffcanvasId("0");
    }
 
    return (
        <div className="container-fluid p-0 m-0">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 px-4 py-4 rounded-0 card-full-stretch">
                        <RdsNavtabs
                            navtabsItems={pageNavtabsItems}
                            type="tabs"
                            activeNavTabId={activePageId}
                            activeNavtabOrder={(activeNavTabId) => {
                                setActivePageId(activeNavTabId)
                            }}
                        />
                        <div className="card-body px-0 py-xxl-3 py-xl-3 py-lg-3 py-md-3 py-0">
 
                            {(activePageId === "0") && (
                                <>
 
                                    <div className="align-items-end justify-content-between row">
                                        <div className="col-xxl-3 col-xl-3 mb-3">
                                            <RdsDatePicker
                                                customDate={onAuditDateSelectFilter}
 
                                                type="advanced"
                                                isDropdownOpen={false}
                                            ></RdsDatePicker>
                                        </div>
                                        <div className="col-xl-3 col-xxl-3 mb-2 mb-lg-2 mb-md-2 mb-xl-3 mb-xxl-3">
                                            <RdsDropdownList
                                                placeholder={t("Search Status Code") || ""}
                                                listItems={statusCodeList}
                                                borderDropdown={true}
                                                isIconPlaceholder={false}
                                                isPlaceholder={true}
                                                onClick={onHttpCodeFilter} />
                                        </div>
                                        <div className="col-xxl-3 col-xl-3 mb-3">
 
                                            <RdsInput
                                                inputType="text"
 
                                                placeholder={t("Search by URL") || ""}
                                                labelPosition="top"
                                                value={searchFilter.url}
                                                size="small"
                                                onChange={onUrlFilter}
                                            ></RdsInput>
                                        </div>
                                        <div className="col-xxl-3 col-xl-3 col-lg-3 mb-xxl-3 mb-xl-3 mb-0"></div>
 
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <RdsCompDatatable
                                                actionPosition="left"
                                                classes="table__userTable"
                                                tableHeaders={AuditHeaders}
                                                tableData={tableData.audit}
                                                pagination={true}
                                                recordsPerPage={maxResultCount}
                                                noDataheaderTitle={t("No Records Available") || ""}
                                                illustration={true}
                                                onActionSelection={onActionSelection}
                                                actions={operationActions}
                                                recordsPerPageSelectListOption={true}
                                                totalRecords={totalRecords.audit}
                                                onPaginationHandler={auditPagePaginationHandler}
                                            ></RdsCompDatatable>
                                        </div>
                                    </div>
 
                                    <RdsOffcanvas
                                        backDrop={true}
                                        preventEscapeKey={true}
                                        scrolling={false}
                                        offId="auditLogs"
                                        placement="end"
                                        canvasTitle={t("AbpAuditLogging.Detail")}
                                        className="mx-1"
                                        onClose={onResetAuditOffcanvas}
                                    >
                                        <RdsNavtabs
                                            navtabsItems={navtabsItems}
                                            type="tabs"
                                            activeNavTabId={activeNavTabId}
                                            activeNavtabOrder={(id) => {
                                                setActiveNavTabId(id);
                                            }}
                                        />
 
                                        {(activeNavTabId === "0") && (
                                            <>
                                                <div className="offcanvas-custom-scroll ">
                                                    <ViewOperationLogsOffCanvas
                                                        selectedRowData={tableData.audit.filter(
                                                            (item: any) => item.id == (tableDataRowid || 1)
                                                        )}
                                                    ></ViewOperationLogsOffCanvas>
                                                </div>
                                            </>
                                        )}
                                        {(activeNavTabId === "1") && (
                                            <ActionOperationLogsOffCanvas
                                                selectedRowData={tableData.audit.filter(
                                                    (item: any) => item.id == (tableDataRowid || 1)
                                                )}
                                            ></ActionOperationLogsOffCanvas>
                                        )}
                                    </RdsOffcanvas>
                                </>
                            )}
                            {(activePageId === "1") && (
                                <>
 
                                    <div className="align-items-end justify-content-between row">
                                        <div className="col-xxl-3 col-xl-3 mb-3">
                                            <RdsDatePicker
                                                customDate={onEntityDateSelectFilter}
                                                type="advanced"
                                                isDropdownOpen={false}
                                            ></RdsDatePicker>
                                        </div>
                                        <div className="col-xl-3 col-xxl-3 mb-2 mb-lg-2 mb-md-2 mb-xl-3 mb-xxl-3">
                                            <RdsDropdownList
                                                placeholder={t("Select Changed Type") || ""}
                                                listItems={changedTypeList}
                                                borderDropdown={true}
                                                isIconPlaceholder={false}
                                                isPlaceholder={true}
                                                onClick={onChangeTypeFilter} />
                                        </div>
                                        <div className="col-xxl-3 col-xl-3 mb-3">
                                            <RdsInput
                                                inputType="text"
 
                                                placeholder={t("Search by Entity Full Name") || ""}
                                                labelPosition="top"
                                                value={searchEntityChangesFilter.entityTypeFullName}
                                                size="small"
                                                onChange={onEntityFullNameFilter}
                                            ></RdsInput>
                                        </div>
 
                                        <div className="col-xxl-3 col-xl-3 col-lg-3 mb-xxl-3 mb-xl-3 mb-lg-3 mb-0"></div>
 
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <RdsCompDatatable
                                                actionPosition="right"
                                                classes="table__userTable"
                                                tableHeaders={EntityChangesHeaders}
                                                tableData={tableData.entity}
                                                pagination={true}
                                                recordsPerPage={maxResultCount}
                                                noDataheaderTitle={t("No Records Available") || ""}
                                                onActionSelection={onEntityActionSelection}
                                                actions={entityChangesActions}
                                                recordsPerPageSelectListOption={true}
                                                totalRecords={totalRecords.entity}
                                                onPaginationHandler={entityPagepaginationHandler}
                                                illustration={true}
                                            ></RdsCompDatatable>
                                        </div>
                                    </div>
 
                                    <RdsOffcanvas
                                        backDrop={true}
                                        preventEscapeKey={true}
                                        scrolling={false}
                                        offId="entityChanges"
                                        placement="end"
                                        canvasTitle={t("AbpAuditLogging.Detail")}
                                        className="mx-1"
                                        onClose={onResetEntityOffcanvas}
                                    >
                                        <RdsNavtabs
                                            navtabsItems={entityNavtabsItems}
                                            type="tabs"
                                            activeNavTabId={activeEntityOffcanvasId}
                                            activeNavtabOrder={(id) => {
                                                setActiveEntityOffcanvasId(id);
                                            }}
                                        />
                                        {(activeEntityOffcanvasId === "0") && (
                                            <>
                                                <RdsCompDatatable
                                                    classes="table__userTable"
                                                    tableHeaders={changeHistoryTableHeaders}
                                                    tableData={changeHistoryTableData}
                                                    recordsPerPageSelectListOption={true}
                                                    pagination={true}
                                                    totalRecords={totalRecords}
                                                    recordsPerPage={maxResultCount}
                                                    illustration={true}
                                                    noDataheaderTitle={t("No Records Available") || ""}
                                                ></RdsCompDatatable>
                                            </>
 
                                        )}
                                        {(activeEntityOffcanvasId === "1") && (
                                            <>
                                                <RdsCompDatatable
                                                    classes="table__userTable"
                                                    tableHeaders={fullHistoryTableHeaders}
                                                    tableData={viewFullHistoryTableData}
                                                    recordsPerPageSelectListOption={true}
                                                    pagination={true}
                                                    totalRecords={totalRecords}
                                                    recordsPerPage={maxResultCount}
                                                    illustration={true}
                                                    noDataheaderTitle={t("No Records Available") || ""}
                                                ></RdsCompDatatable>
                                            </>
                                        )}
                                    </RdsOffcanvas>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};
 
export default Auditlogs;
const ViewOperationLogsOffCanvas = (selectedRowData: any) => {
    return (
        <>
            <div className="row mt-3">
                <div className="col-md-3 mb-3">
                    <span>{t("AbpAuditLogging.HttpStatusCode") || ""} : </span>
                </div >
                <div className="col-md-9 mb-3">
                    <RdsBadge
                        size="small"
                        label={selectedRowData.selectedRowData[0]?.httpStatusCode}
                        colorVariant={getColorVariantForBadge(selectedRowData.selectedRowData[0]?.httpStatusCode)}
                    ></RdsBadge>
                </div>
 
                <div className="col-md-3 mb-3">
                    <span>{t("AbpAuditLogging.HttpMethod") || ""} :</span>
                </div>
                <div className="col-md-9 mb-3">
                    <RdsBadge
                        size="small"
                        label={selectedRowData.selectedRowData[0]?.httpMethod}
                        colorVariant={getColorVariantForBadge(selectedRowData.selectedRowData[0]?.httpMethod)}
                    ></RdsBadge>
                </div>
 
                <div className="col-md-3 mb-3">
                    <span>{t("AbpAuditLogging.Url") || ""} :</span>
                </div>
                <div className="col-md-9 mb-3">
                    <span>{selectedRowData.selectedRowData[0]?.url.props.children[2]}</span>
                </div>
 
                <div className="col-md-3 mb-3">
                    <span>{t("AbpAuditLogging.ClientName") || ""} :</span>
                </div>
                <div className="col-md-9 mb-3">
                    <span>{selectedRowData.selectedRowData[0]?.clientName}</span>
                </div>
 
                <div className="col-md-3 mb-3">
                    <span>{t("AbpAuditLogging.Exceptions") || ""} :</span>
                </div>
                <div className="col-md-9 mb-3">
                    <span>{selectedRowData.selectedRowData[0]?.exceptions}</span>
                </div>
 
                <div className="col-md-3 mb-3">
                    <span>{t("AbpAuditLogging.UserName") || ""} :</span>
                </div>
                <div className="col-md-9 mb-3">
                    <span>{selectedRowData.selectedRowData[0]?.userName}</span>
                </div>
 
                <div className="col-md-3 mb-3">
                    <span>{t("AbpAuditLogging.Time") || ""} :</span>
                </div>
                <div className="col-md-9 mb-3">
                    <span>{selectedRowData.selectedRowData[0]?.executionTime}</span>
                </div>
 
                <div className="col-md-3 mb-3">
                    <span>{t("AbpAuditLogging.Duration") || ""} :</span>
                </div>
                <div className="col-md-9 mb-3">
                    <span>{selectedRowData.selectedRowData[0]?.executionDuration}</span>
                </div>
 
                <div className="col-md-3 mb-3">
                    <span>{t("AbpAuditLogging.BrowserInfo") || ""} : </span>
                </div>
                <div className="col-md-9 mb-3">
                    <span>{selectedRowData.selectedRowData[0]?.browserInfo}</span>
                </div>
 
                <div className="col-md-3 mb-3 pe-1">
                    <span>{t("AbpAuditLogging.ApplicationName") || ""} : </span>
                </div>
                <div className="col-md-9 mb-3">
                    <span>{selectedRowData.selectedRowData[0]?.applicationName}</span>
                </div>
 
                <div className="col-md-3 mb-3">
                    <span>{t("AbpAuditLogging.CorrelationId") || ""} : </span>
                </div>
                <div className="col-md-9 mb-3">
                    <span>{selectedRowData.selectedRowData[0]?.correlationId}</span>
                </div>
 
                <div className="col-md-3 mb-3">
                    <span>{t("AbpAuditLogging.Comments") || ""} : </span>
                </div>
                <div className="col-md-9 mb-3">
                    <span>{selectedRowData.selectedRowData[0]?.comments}</span>
                </div>
 
                <div className="col-md-3 mb-3">
                    <span>{t("AbpAuditLogging.ExtraProperties") || ""} : </span>
                </div>
                <div className="col-md-9 mb-3">
                    <span>{selectedRowData.selectedRowData[0]?.extraProperties}</span>
                </div>
            </div >
        </>
    );
};
 
const ActionOperationLogsOffCanvas = (selectedRowData: any) => {
    return (
        <>
            <div className="row mt-3">
                <h5>
                    <RdsLabel label={t("AbpAuditLogging.HttpStatusCode") || ""} />
                </h5>
                <div className="col-md-6 mb-2">
                    <span>{t("AbpAuditLogging.DurationMs") || ""} : </span>
                </div>
                <div className="col-md-6  mb-2">
                    <span>
                        {selectedRowData.selectedRowData[0]?.executionDuration}
                    </span>
                </div>
                <div className="col-md-6 mb-2">
                    <span>{t("AbpAuditLogging.Parameters") || ""} : </span>
                </div>
                <div className="col-md-6  mb-2">
                    {/* <span>{selectedRowData.selectedRowData[0]?.extraProperties}</span> */}
                </div>
            </div>
        </>
    );
};
 