import React, { useEffect, useState } from "react";
import {
    RdsCompAlertPopup,
    RdsCompNewPage,
    RdsCompPages,
} from "../../../rds-components";
import {
    RdsButton,
    RdsOffcanvas,
    RdsSearch,
    RdsAlert,
    RdsInput,
} from "../../../rds-elements";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../libs/state-management/hooks";
import {
    deletePageData,
    editPageData,
    fetchEditPagesData,
    fetchPagesData,
    isHomePageChangeData,
    postPagesData,
} from "../../../../libs/state-management/pages/pages-slice";

const Pages = (props: any) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [tableData, setTableData] = useState<any>([]);
    const [actionId, setActionId] = useState("new");
    const [inputReset, setInputReset] = useState(false)

    const pageData = useAppSelector((state) => state.persistedReducer.pages);
    const pageDatas = useAppSelector(
        (state) => state.persistedReducer.pages?.pagesData
    );
    const pageEdit = useAppSelector(
        (state) => state.persistedReducer.pages?.pagesDataEdit
    );
    const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
    const [skipCount, setSkipCount] = useState<number>(0);
    const [maxResultCount, setMaxResultCount] = useState<number>(10);
    const handlerCloseOffcanvas = () => {
        setNewPageData({
            title: "",
            slug: "",
            content: "",
            script: "",
            style: "",
        });
        setInputReset(!inputReset)
    };
    const [editClaimData, setEditClaimData] = useState<any>({});
    const [filterData, setFilterData] = useState({
        filter: undefined || "",
        sorting: "id DESC" || "",
        skipCount: 0,
        maxResultCount: 10,
    });


    const [newPageData, setNewPageData] = useState<any>({
        title: "",
        slug: "",
        content: "",
        script: "",
        style: "",
    });

    const tableHeaders = [
        {
            displayName: t("CmsKit.Title"),
            key: "title",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("CmsKit.Slug"),
            key: "slug",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("CmsKit.IsHomePage"),
            key: "isHomePage",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("CmsKit.CreationTime"),
            key: "creationTime",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: t("CmsKit.LastModificationTime"),
            key: "lastModificationTime",
            datatype: "text",
            sortable: true,
        },
    ];

    const actions = [
        { id: "edit", displayName: t("AbpUi.Edit"), offId: "page-edit-off" },
        { id: "delete", displayName: t("AbpUi.Delete"), modalId: "page-delete-off" },
        { id: "isHomePageStatus", displayName: t("CmsKit.SetAsHomePage") },
    ];

    function createNewCanvasFn(event: any) {
        event.preventDefault();
        setActionId("new");
    }

    useEffect(() => {
        dispatch(fetchPagesData(filterData) as any);
    }, [dispatch]);

    useEffect(() => {
        if (pageEdit) {
            const pagesDataTable = { ...pageEdit };
            setEditClaimData(pagesDataTable);
        }
    }, [pageEdit]);

    useEffect(() => {
        if (Array.isArray(pageDatas)) {
            const pagesDataTable = pageDatas?.map((dataPages: any) => {
                const date = new Date(dataPages.creationTime);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();

                const createTime = date.toLocaleString("en-IN", {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                });

                const updateDate = new Date(dataPages.lastModificationTime);
                const days = updateDate.getDate();
                const months = updateDate.getMonth() + 1;
                const years = updateDate.getFullYear();
                const updateTime = updateDate.toLocaleString("en-IN", {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                });

                if (dataPages.lastModificationTime === " ") {
                    dataPages.lastModificationTime == "-";
                } else {
                    dataPages.lastModificationTime == updateDate;
                }

                const creationDate = `${year}/${month}/${day}` + "\n" + `${createTime}`;
                const modifiedDate =
                    `${years}/${months}/${days}` + "\n" + `${updateTime}`;

                return {
                    title: dataPages.title,
                    slug: dataPages.slug,
                    content: dataPages.content,
                    script: dataPages.script,
                    style: dataPages.style,
                    creationTime: creationDate,
                    isHomePage: dataPages.isHomePage ? "true" : "false",
                    lastModificationTime: modifiedDate,
                    id: dataPages.id,
                };
            }, []);
            setTableData(pagesDataTable);
        }
    }, [pageDatas]);

    const filterSearchHandler = (e: any) => {
        const temparr = tableData.filter((tableData: any) =>
            tableData.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setTableData(temparr);
    };

    const submitHandler = (data: any) => {
        dispatch(postPagesData(data) as any).then((res: any) => {
            if (res.type == "pages/postPagesData/rejected") {
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
                    message: t("Page added Successfully"),
                    color: "success",
                });
            }
            dispatch(fetchPagesData(filterData) as any);
            setNewPageData({
                title: "",
                slug: "",
                content: "",
                script: "",
                style: "",
            });
            setInputReset(!inputReset)
        });

    };

    const [claimTypesId, setClaimTypesId] = useState("");
    const onEditHandler = (editClaimData: any) => {
        const dTo = {
            id: claimTypesId,
            UpdatePageInputDto: editClaimData,
        };
        dispatch(editPageData(dTo) as any).then((res: any) => {
            if (res.type == "pages/editPageData/rejected") {
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
                    message: t("Page edited Successfully"),
                    color: "success",
                });
            }
            dispatch(fetchPagesData(filterData) as any);
        });
        dispatch(fetchPagesData(filterData) as any);
    };

    const [tableDataRowid, setTableDataRowId] = useState("");
    const onActionHandler = (rowData: any, actionId: any) => {
        setTableDataRowId(rowData.id);
        if (actionId === "edit") {
            setClaimTypesId(rowData.id);
            dispatch(fetchEditPagesData(rowData.id) as any);
        } else if (actionId === "delete") {
            setTableDataRowId(rowData.id);
        } else if (actionId === "isHomePageStatus") {
            dispatch(isHomePageChangeData(rowData.id) as any).then(
                (res: any) => {
                    setAlert({
                        ...Alert,
                        show: true,
                        message: t("Set as Home Page"),
                        color: "success",
                    });
                }
            );
            dispatch(fetchPagesData(filterData) as any);
        };
        dispatch(fetchPagesData(filterData) as any);
    };

    const onDeleteHandler = (e: any) => {
        dispatch(deletePageData(tableDataRowid) as any).then((res: any) => {
            if (res.type == "pages/deletePageData/rejected") {
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
                    message: t("Page deleted Successfully"),
                    color: "success",
                });
            }
            dispatch(fetchPagesData(filterData) as any);
        });
    };

    useEffect(() => {
        // Set a 3-second timer to update the state
        const timer = setTimeout(() => {
            setAlert({ ...Alert, show: false });
        }, 3000);

        // Clean up the timer when the component unmounts or when the state changes
        return () => clearTimeout(timer);
    }, [pageDatas]);

    const onDataFilter = (event: any) => {
        setFilterData({
            ...filterData,
            filter: event.target.value,
        });
        if (event.target.value.length) {
            dispatch(fetchPagesData(filterData) as any);
        } else {
            dispatch(fetchPagesData({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        }

    };

    return (
        <>
            <div className="container-fluid p-0 m-0">
                <div className="row align-items-center">
                    <div className="col-md-12">
                        <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                            <div className="row ">
                                <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-12">
                                    <RdsInput
                                        inputType="text"
                                        placeholder={t("Search") || ""}
                                        labelPosition="bottom"
                                        value={filterData.filter}
                                        size="small"
                                        onChange={onDataFilter}
                                    ></RdsInput>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-8 col-md-6 col-12 mb-md-0 mb-3 d-flex justify-content-xxl-end justify-content-xl-end justify-content-lg-end justify-content-md-end justify-content-start">
                                    <RdsOffcanvas
                                        canvasTitle={t("CmsKit.NewPage") || ""}
                                        placement="end"
                                        offcanvasbutton={
                                            <div className="d-flex justify-content-end">
                                                <RdsButton
                                                    icon="plus"
                                                    label={t("CmsKit.NewPage") || ""}
                                                    iconColorVariant="light"
                                                    iconHeight="15px"
                                                    iconWidth="15px"
                                                    iconFill={false}
                                                    iconStroke={true}
                                                    block={false}
                                                    size="small"
                                                    type="button"
                                                    colorVariant="primary"
                                                    onClick={(e: any) => createNewCanvasFn(e)}
                                                ></RdsButton>
                                            </div>
                                        }
                                        backDrop={true}
                                        scrolling={false}
                                        preventEscapeKey={false}
                                        offId="page-new-off"
                                        onClose={handlerCloseOffcanvas}
                                    >
                                        <div>
                                            <RdsCompNewPage
                                                onSubmit={submitHandler}
                                                newPageData={newPageData}
                                                reset={inputReset}
                                                onCancel={handlerCloseOffcanvas}
                                            />
                                        </div>
                                    </RdsOffcanvas>
                                </div>
                            </div>
                            <div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <RdsCompPages
                                            tableHeaders={tableHeaders}
                                            actions={actions}
                                            tableData={tableData!}
                                            pagination={true}

                                            onActionSelection={onActionHandler}
                                            recordsPerPage={5}
                                        ></RdsCompPages>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="offset-md-4 col-md-4 mt-3 col-12 position-absolute bottom-0 mb-3 position-lg-relative custom-responsive-alert">
                                        {Alert.show && (
                                            <RdsAlert
                                                alertmessage={Alert.message}
                                                size="small"
                                                colorVariant={Alert.color}
                                            ></RdsAlert>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <RdsOffcanvas
                        canvasTitle={t("Edit Page") || ""}
                        placement="end"
                        offId="page-edit-off"
                        backDrop={true}
                        scrolling={false}
                        preventEscapeKey={false}
                    >
                        <RdsCompNewPage
                            onSubmit={onEditHandler}
                            newPageData={editClaimData}
                        />
                    </RdsOffcanvas>
                    <RdsCompAlertPopup
                        alertID="page-delete-off"
                        onSuccess={onDeleteHandler}
                    />
                </div>
            </div>
        </>
    );
};
export default Pages;