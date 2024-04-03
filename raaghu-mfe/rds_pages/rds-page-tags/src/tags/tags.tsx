import React, { useState, useEffect } from "react";
import {
    RdsButton,
    RdsAlert,
    RdsInput,
    RdsOffcanvas,
    RdsSelectList,
} from "../../../rds-elements";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../libs/state-management/hooks";
import { RdsCompAlertPopup, RdsCompDatatable } from "../../../rds-components";
import {
    createTag,
    deleteTag,
    fetchTags,
    getTagById,
    updateTag,
} from "../../../../libs/state-management/tags/tags-slice";
import { useTranslation } from "react-i18next";
import { deleteTagsRequest, getTags1Request, getTagsRequest, postTagsRequest, putTagsRequest } from "../../../../libs/state-management/tag-admin/tag-admin-slice";

const Tags = () => {
    const { t } = useTranslation();
    // Use States ================
    const [skipCount, setSkipCount] = useState<number>(0);
    const [maxResultCount, setMaxResultCount] = useState<number>(10);
    const [totalRecords, setTotalRecords] = useState<number | null>(0);
    const [tableData, setTableData] = useState<any>([]);
    const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
    const [canvasTitle, setCanvasTitle] = useState<string>(t("CmsKit.NewTag") || "");
    const [tagsObj, setTagsObj] = useState({
        entityType: "",
        name: "",
    });
    const [editBody, setEditBody] = useState({
        name: "",
        concurrencyStamp: ""
    });
    const [tagsId, setTagsId] = useState("");
    const [inputReset, setInputReset] = useState(false);

    const [entityTypeList, setEntityTypeList] = useState([
        { id: 1, value: "BlogPost", option: "BlogPost" },
    ]);
    const [tableDataRowid, setTableDataRowId] = useState("");

    const [isEdit, setIsEdit] = useState(false);
    // Constants / Variables =============

    const tableHeaders = [
        {
            displayName: t("CmsKit.EntityType"),
            key: "entityType",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: true,
        },
        {
            displayName: t("CmsKit.Name"),
            key: "name",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: true,
        },
    ];
    const actions = [
        { id: "edit", displayName: t("AbpUi.Edit"), offId: "tag-edit-off" },
        { id: "delete", displayName: t("AbpUi.Delete"), modalId: "tag-delete-off" },
    ];


    // dispatch and selectores for API calling ===============
    const dispatch = useAppDispatch();
    const tags = useAppSelector((state) => state.persistedReducer.tagAdmin);

    // Use Effects ==================
    useEffect(() => {
        dispatch(getTagsRequest({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
    }, [dispatch, skipCount, maxResultCount]);

    useEffect(() => {
        if (tags?.getTagsTagDefinitions?.items) {
            const tempData = tags.getTagsTagDefinitions?.items.map((item: any) => {
                return {
                    id: item.id,
                    entityType: item.entityType,
                    name: item.name,
                    concurrencyStamp: item.concurrencyStamp,
                };
            }, []);
            setTableData(tempData);
        }
        setTotalRecords(tags?.getTagsTagDefinitions?.totalCount);
    }, [tags?.getTagsTagDefinitions]);



    // Functions ================
    // Create new tags
    function createTagFn(event: any) {
        setIsEdit(false);
        setEntityTypeList(entityTypeList);
        setTagsObj({ entityType: "", name: "" });
        setCanvasTitle(t("CmsKit.NewTag") || "");
    }

    // On action selection from data table
    function onActionSelection(data: any, actionId: any) {
        setTagsId(data.id);
        if (actionId === "edit") {
            setIsEdit(true);
            setTableDataRowId(data.id);
            setEditBody({
                ...editBody,
                name: data.name,
                concurrencyStamp: data.concurrencyStamp
            });
            setCanvasTitle(t("Edit Tag") || "");
            dispatch(getTags1Request({ id: data.id }));
        }
    };

    const editTags = (event: any, data: any) => {
        event.preventDefault();
        const editBody = {
            name: data.name,
            concurrencyStamp: data.concurrencyStamp
        }
        dispatch(putTagsRequest({ id: tableDataRowid, requestBody: editBody })).then((res: any) => {
            if (res.type == "Tags/UpdateTag/rejected") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Tag updated Successfully"),
                    color: "success",
                });
            }
            dispatch(getTagsRequest({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
    }

    // Save / Update tags
    const saveUpdateTags = (tagsObj: any, event: any) => {
        event.preventDefault();
        const payload = {
            entityType: tagsObj.entityType.value,
            name: tagsObj.name,
        };
        dispatch(
            postTagsRequest({ requestBody: payload })
        ).then((res: any) => {
            if (res.type == "Tags/createTag/rejected") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Tag added Successfully"),
                    color: "success",
                });
            }
            dispatch(getTagsRequest({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
        setTagsObj({ entityType: "", name: "" });
        setTagsId("");
        setCanvasTitle("");
        setIsEdit(false);
        handlerCloseOffcanvas()
    }

    // Delete tags confirmation popup
    function confirmDelete() {
        const item = { id: tagsId };
        dispatch(deleteTagsRequest(item)).then((res: any) => {
            if (res.type == "Tags/deleteTag/rejected") {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            } else {
                setAlert({
                    ...Alert,
                    show: true,
                    message: t("Tag deleted Successfully"),
                    color: "success",
                });
            }
            dispatch(getTagsRequest({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
        setIsEdit(false);
    }
    useEffect(() => {
        // Set a 2-second timer to update the state
        const timer = setTimeout(() => {
            setAlert({ ...Alert, show: false });
        }, 2000);

        // Clean up the timer when the component unmounts or when the state changes
        return () => clearTimeout(timer);
    }, [tags]);

    const paginationHandler = (currentPage: number, recordsPP: number) => {
        const skipCount = recordsPP * (currentPage - 1);
        setSkipCount(skipCount);
        setMaxResultCount(recordsPP);
    };

    const handlerCloseOffcanvas = () => {
        setTagsObj({
            entityType: "",
            name: "",
        })
        setInputReset(!inputReset)
    }
    // DOM
    return (
        <div className="container- fluid p-0 m-0">
            <div className="row">
                <div className="col-md-12">
                    <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                        <div className="row">
                            <div className="col-md-4">
                                {Alert.show && (
                                    <RdsAlert
                                        alertmessage={Alert.message}
                                        size="small"
                                        colorVariant={Alert.color}
                                    ></RdsAlert>
                                )}
                            </div>
                            <div className="col-md-8 d-flex mb-3 justify-content-end ">
                                <RdsOffcanvas
                                    canvasTitle={canvasTitle || ""}
                                    placement="end"
                                    offcanvaswidth={650}
                                    onClose={handlerCloseOffcanvas}
                                    offcanvasbutton={
                                        <div className="d-flex justify-content-end">
                                            <RdsButton
                                                icon="plus"
                                                label={t("CmsKit.NewTag") || ""}
                                                iconColorVariant="light"
                                                iconHeight="12px"
                                                iconWidth="12px"
                                                iconFill={false}
                                                iconStroke={true}
                                                block={false}
                                                size="small"
                                                type="button"
                                                colorVariant="primary"
                                                showLoadingSpinner={true}
                                                onClick={createTagFn}
                                            ></RdsButton>
                                        </div>
                                    }
                                    backDrop={true}
                                    scrolling={false}
                                    preventEscapeKey={false}
                                    offId="tag-edit-off"
                                >
                                    <form>
                                        {!isEdit && (
                                            <>
                                                <div className="form-group mb-3">
                                                    <RdsSelectList
                                                        label={t("CmsKit.EntityType") || ""}
                                                        placeholder={t("Select Entity Type") || ""}
                                                        selectItems={entityTypeList}
                                                        required={true}
                                                        selectedValue={tagsObj.entityType}
                                                        onChange={(value: any) =>
                                                            setTagsObj({ ...tagsObj, entityType: value })
                                                        }
                                                        id="EntityType"
                                                    ></RdsSelectList>
                                                </div>
                                                <div className="form-group">
                                                    <RdsInput
                                                        inputType="text"
                                                        required={true}
                                                        label={t("CmsKit.Name") || ""}
                                                        value={tagsObj.name}
                                                        placeholder={t("Enter Name") || ""}
                                                        onChange={(event) =>
                                                            setTagsObj({ ...tagsObj, name: event.target.value })
                                                        }
                                                        reset={inputReset}
                                                    ></RdsInput>
                                                </div>
                                                <div className="pb-3 footer-buttons d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2">
                                                    <RdsButton
                                                        class="me-2"
                                                        tooltipTitle={""}
                                                        type={"button"}
                                                        label={t("AbpUi.Cancel") || ""}
                                                        colorVariant="outline-primary"
                                                        size="small"
                                                        databsdismiss="offcanvas"
                                                        onClick={handlerCloseOffcanvas}
                                                    ></RdsButton>
                                                    <RdsButton
                                                        class="me-2"
                                                        isDisabled={!tagsObj.name}
                                                        label={t("AbpUi.Save") || "Save"}
                                                        size="small"
                                                        colorVariant="primary"
                                                        tooltipTitle={""}
                                                        type={"submit"}
                                                        databsdismiss="offcanvas"
                                                        onClick={() => saveUpdateTags(tagsObj, event)}
                                                    ></RdsButton>
                                                </div>
                                            </>
                                        )}
                                        {isEdit && (
                                            <>
                                                <div className="form-group">
                                                    <RdsInput
                                                        inputType="text"
                                                        required={true}
                                                        label={t("CmsKit.Name") || ""}
                                                        value={editBody.name}
                                                        placeholder={t("Enter Name") || ""}
                                                        onChange={(event) =>
                                                            setEditBody({ ...editBody, name: event.target.value })}
                                                        reset={inputReset}
                                                    ></RdsInput>
                                                </div>
                                                <div className="pb-3 footer-buttons d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2">
                                                    <RdsButton
                                                        class="me-2"
                                                        tooltipTitle={""}
                                                        type={"button"}
                                                        label={t("AbpUi.Cancel") || ""}
                                                        colorVariant="outline-primary"
                                                        size="small"
                                                        databsdismiss="offcanvas"
                                                        onClick={handlerCloseOffcanvas}
                                                    ></RdsButton>
                                                    <RdsButton
                                                        class="me-2"
                                                        isDisabled={!editBody.name}
                                                        label={t("AbpUi.Save") || "Save"}
                                                        size="small"
                                                        colorVariant="primary"
                                                        tooltipTitle={""}
                                                        type={"submit"}
                                                        databsdismiss="offcanvas"
                                                        onClick={() => editTags(event, editBody)}
                                                    ></RdsButton>
                                                </div>
                                            </>
                                        )}
                                    </form>
                                </RdsOffcanvas>
                            </div>
                        </div>
                        <RdsCompDatatable
                            actionPosition="right"
                            tableHeaders={tableHeaders}
                            tableData={tableData}
                            actions={actions}
                            onActionSelection={onActionSelection}
                            classes="table"
                            recordsPerPageSelectListOption={true}
                            noDataheaderTitle={t("No Records Available") || ""}
                            noDataTitle={t("Click on the button to add") || ""}
                            illustration={true}
                            pagination={true}
                            totalRecords={totalRecords}
                            recordsPerPage={maxResultCount}
                            onPaginationHandler={paginationHandler}
                        ></RdsCompDatatable>
                        <RdsCompAlertPopup
                            alertID="tag-delete-off"
                            onSuccess={confirmDelete}
                        />
                    </div>
                </div>
            </div></div >
    );
};

export default Tags;