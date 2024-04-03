import React, { useState, useEffect } from "react";
import {
    RdsDatePicker,
    RdsInput,
} from "../../../rds-elements";
import { RdsCompAlertPopup, RdsCompDatatable } from "../../../rds-components";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../libs/state-management/hooks";
import {
    deleteComment,
    fetchComments,
    getCommentById,
} from "../../../../libs/state-management/comments/comments-slice";
import { useTranslation } from "react-i18next";

const Comments = () => {
    const { t } = useTranslation();
    const tableHeaders = [
        {
            displayName: t("CmsKit.Username"),
            key: "username",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: false,
        },
        {
            displayName: t("CmsKit.EntityType"),
            key: "entityType",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: false,
        },
        {
            displayName: t("CmsKit.Text"),
            key: "text",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: false,
        },
        {
            displayName: t("CmsKit.CreationTime"),
            key: "creationTime",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: false,
        },
    ];

    const actions = [
        { id: "edit", displayName: t("AbpUi.Edit"), offId: "comments-edit-off" },
        { id: "delete", displayName: t("AbpUi.Delete"), modalId: "comments-delete-off" },
    ];

    // Use States ================
    const [skipCount, setSkipCount] = useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = useState<number>(10);
    const [totalRecords, setTotalRecords] = useState<number | null>(0);
    const [tableData, setTableData] = useState([]);
    const [filterUserName, setFilterUserName] = useState("");
    const [filterEntityType, setFilterEntityType] = useState("");

    // dispatch and selectores for API calling ===============
    const dispatch = useAppDispatch();
    const comments = useAppSelector((state) => state.persistedReducer.comments);

    useEffect(() => {
        const data = {
            entityType: undefined,
            test: undefined,
            repliedCommentId: undefined,
            author: undefined,
            creationStartDate: undefined,
            creationEndDate: undefined,
            sorting: undefined,
            skipCount: skipCount,
            maxResultCount: recordsPerPage,
            cancelToken: undefined,
        };
        dispatch(fetchComments(data));
    }, [dispatch]);

    useEffect(() => {
        if (comments?.allComments) {
            const newcomments = comments.allComments?.items?.map((res: any) => ({
                id: res.id,
                username: res.author.username,
                entityType: res.entityType,
                text: res.text,
                creationTime: res.creationTime.toString(),
            }));
            setTableData(newcomments);
            setTotalRecords(comments.allComments?.totalCount);
        }
    }, [comments?.allComments]);

    useEffect(() => {
        if (comments?.comment) {
        }
    }, [comments?.comment]);

    // Functions ========================
    function onActionSelection(data: any, actionId: any): void {
        const item = { id: data.id, cancelToken: undefined };
        actionId === "edit"
            ? dispatch(getCommentById(item))
            : dispatch(deleteComment(item));
    }

    // On Filter Start Date Selection
    function onStartDateSelection(start: any): void { }

    // On Filter Start Date Selection
    function onEndDateSelection(end: any): void { }

    // on Filter UserName
    function onFilterUsername(event: any): void {
        setFilterUserName(event.target.value);
    }

    // on Filter Entity Type
    function onFilterEntityType(event: any) {
        setFilterEntityType(event.target.value);
    }

    // Search
    function searchByInputValues(event: any) {
        event.preventDefault();
    }

    // On Delete Confirmation
    function confirmDelete() { }

    //paginationa handling
    const paginationHandler = (currentPage: number, recordsPP: number) => {
        const skipCount = recordsPP * (currentPage - 1);
        if (recordsPP !== recordsPerPage) {
            setRecordsPerPage(recordsPP);
        }
        setSkipCount(skipCount);
    };

    const dateRangeHandler = (startEndDate: any) => {
        const [start, end] = startEndDate;
    };
    // DOM
    return (
        <>
            <div className="container-fluid m-0 p-0">
                <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                    {tableData?.length > 0 && (<div className="align-items-end justify-content-between row">
                        <div className="col-xxl-3 col-xl-3 mb-4">
                            <RdsDatePicker
                                customDate={dateRangeHandler}
                                type="advanced"
                                isDropdownOpen={false}
                            ></RdsDatePicker>
                        </div>
                        <div className="col-xxl-3 col-xl-3 mb-4">
                            <RdsInput
                                inputType="text"
                                size="small"
                                value={filterUserName}
                                placeholder={t("Enter Username") || ""}
                                onChange={(event) => onFilterUsername(event)}
                            ></RdsInput>
                        </div>
                        <div className="col-xxl-3 col-xl-3 mb-4">

                            <RdsInput
                                inputType="text"
                                size="small"
                                value={filterEntityType}
                                placeholder={t("Enter Entity Type") || ""}
                                onChange={(event) => onFilterEntityType(event)}
                            ></RdsInput>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 mb-xxl-4 mb-xl-4 mb-lg-4 mb-0"></div>
                    </div>
                    )}
                    <RdsCompDatatable
                        actionPosition="right"
                        tableHeaders={tableHeaders}
                        tableData={tableData}
                        actions={actions}
                        onActionSelection={onActionSelection}
                        classes="table"
                        recordsPerPageSelectListOption={true}
                        noDataheaderTitle={t("No Records Available") || ""}
                        noDataTitle={t("Click on the comment to view the details") || ""}
                        illustration={true}
                        pagination={true}
                        totalRecords={totalRecords}
                        recordsPerPage={recordsPerPage}
                        onPaginationHandler={paginationHandler}
                    ></RdsCompDatatable>
                </div>
            </div>
            <RdsCompAlertPopup alertID="delete" onSuccess={confirmDelete} />
        </>
    );
};

export default Comments;
