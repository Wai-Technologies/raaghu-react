import React, { useEffect, useState } from "react";
import { RdsButton, RdsOffcanvas, RdsAlert, RdsNavtabs } from "../../../../../raaghu-elements/src";
import {
    RdsCompDatatable,
    RdsCompAlertPopup,
    RdsCompUrlForwardings,
} from "../../../rds-components";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../libs/state-management/hooks";
import { useTranslation } from "react-i18next";
import { deleteurlShortingData, editUrlShortingsData, fetchUrlShortingsData, saveUrlShortingData, updateUrlShortingData } from "../../../../libs/public.api";


const UrlForwarding = () => {
    const [skipCount, setSkipCount] = useState<number>(0);
    const [maxResultCount, setMaxResultCount] = useState<number>(10);
    const [inputReset, setInputReset] = useState(false)
    const [totalRecords, setTotalRecords] = useState<number | null>(0);
    const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
    const [newUrlForwardingData, setNewUrlForwardingData] = useState({ source: "", target: "" });
    const [editUrlData, setEditUrlData] = useState({ source: "", target: "" });

    const [urlForwardingData, setUrlForwardingData] = useState([]);
    const [id, setId] = useState(0);

    const dispatch = useAppDispatch();
    const Data = useAppSelector((state) => state.persistedReducer.urlForwarding);

    const { t } = useTranslation();

    useEffect(() => {
        dispatch(fetchUrlShortingsData({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
    }, [dispatch, skipCount, maxResultCount]);

    useEffect(() => {
        if (Data.urlShortings) {
            const tempData = Data.urlShortings?.items.map((curr: any) => {
                return {
                    id: curr.id,
                    source: curr.source,
                    target: curr.target
                };
            });
            setUrlForwardingData(tempData);
            setTotalRecords(Data.urlShortings?.totalCount);
        }
    }, [Data.urlShortings]);

    const handlerDeleteConfirm = () => {
        dispatch(deleteurlShortingData(id) as any).then((res: any) => {
            if (res.type == "urlForwardingSlice/deleteurlShortingData/rejected") {
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
                    message: t("Url-forwarding deleted Successfully"),
                    color: "success",
                });
            }

            dispatch(fetchUrlShortingsData({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
    };

    const tableHeader = [
        {
            displayName: t("CmsKit.Source"),
            key: "source",
            datatype: "children",
            sortable: true,
        },
        {
            displayName: t("CmsKit.Target"),
            key: "target",
            datatype: "children",
            sortable: true,
        },
    ];

    const actions: any = [
        { id: "edit", displayName: t("AbpUi.Edit"), offId: "editUrlForwardingoff" },
        { id: "delete", displayName: t("AbpUi.Delete"), modalId: "deleteUrlForwardingoff" }

    ];

    const handlerActions = (rowData: any, actionId: any) => {
        setEditUrlData({
            ...editUrlData, source: rowData.source,
            target: rowData.target
        });
        setId(rowData.id);
        if (actionId === "edit") {
            dispatch(editUrlShortingsData(rowData.id) as any);
        }
    };


    const handlerEditUrlForwardings = () => {
        dispatch(updateUrlShortingData({ id: id, body: editUrlData }) as any).then((res: any) => {
            if (res.type == "urlForwardingSlice/updateUrlShortingData/rejected") {
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
                    message: t("Url-forwarding updated Successfully"),
                    color: "success",
                });
            }
            dispatch(fetchUrlShortingsData({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
    };


    function getUrlForwardingsData(data: any) {
        setNewUrlForwardingData(data);
    }

    function getUrlForwardingsDataForEdit(data: any) {
        setEditUrlData(data);
    }
    const handlerCloseOffcanvas = () => {
        setNewUrlForwardingData({ source: "", target: "" });
        setInputReset(!inputReset)
    };


    const handlerSaveUrl = () => {
        dispatch(saveUrlShortingData(newUrlForwardingData) as any).then((res: any) => {
            if (res.type == "urlForwardingSlice/saveUrlShortingData/rejected") {
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
                    message: t("Url-forwarding created Successfully"),
                    color: "success",
                });
            }
            dispatch(fetchUrlShortingsData({ skipCount: skipCount, maxResultCount: maxResultCount }) as any);
        });
        handlerCloseOffcanvas()

    };
    useEffect(() => {
        // Set a 2-second timer to update the state
        const timer = setTimeout(() => {
            setAlert({ ...Alert, show: false });
        }, 2000);

        // Clean up the timer when the component unmounts or when the state changes
        return () => clearTimeout(timer);
    }, [Data]);


    //paginationa handling
    const paginationHandler = (currentPage: number, recordsPP: number) => {
        const skipCount = recordsPP * (currentPage - 1);
        setSkipCount(skipCount);
        setMaxResultCount(recordsPP);
    };
    return (
        <div className="container-fluid p-0 m-0">
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
                            <div className="col-md-8 d-flex mb-3 justify-content-end">
                                <RdsButton
                                    icon="plus"
                                    label={t("URL") || ""}
                                    iconColorVariant="light"
                                    iconHeight="15px"
                                    iconWidth="15px"
                                    iconFill={false}
                                    iconStroke={true}
                                    block={false}
                                    size="small"
                                    type="button"
                                    colorVariant="primary"
                                    databstoggle="offcanvas"
                                    databstarget="#newUrlForwarding"
                                    showLoadingSpinner={true}
                                ></RdsButton>
                            </div>
                        </div>
                        <RdsCompDatatable
                            actionPosition="right"
                            classes="table__userTable"
                            tableHeaders={tableHeader}
                            tableData={urlForwardingData}
                            noDataheaderTitle={t("No Records Available") || ""}
                            noDataTitle={t("Click on the button to add") || ""}
                            illustration={true}
                            actions={actions}
                            onActionSelection={handlerActions}
                            recordsPerPageSelectListOption={true}
                            pagination={true}
                            totalRecords={totalRecords}
                            recordsPerPage={maxResultCount}
                            onPaginationHandler={paginationHandler}
                        ></RdsCompDatatable>
                        <RdsOffcanvas
                            placement="end"
                            canvasTitle={t("NEW URL")}
                            offId="newUrlForwarding"
                            backDrop={true}
                            scrolling={false}
                            preventEscapeKey={false}
                            onClose={handlerCloseOffcanvas}
                        >
                            <div className="mt-2">
                                <RdsCompUrlForwardings urlForwardingData={newUrlForwardingData} emitUrlForwardingData={getUrlForwardingsData} reset={inputReset} />
                                <div className="pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2">
                                    <RdsButton
                                        type={"button"}
                                        label={t("AbpUi.Cancel") || ""}
                                        isOutline={true}
                                        colorVariant="primary"
                                        databsdismiss="offcanvas"
                                        databstoggle="offcanvas"
                                        databstarget="#newUrlForwarding"
                                        size="small"
                                        onClick={handlerCloseOffcanvas}
                                    ></RdsButton>
                                    <RdsButton
                                        type={"button"}
                                        label={t("AbpUi.Save") || ""}
                                        isDisabled={newUrlForwardingData.source === "" && newUrlForwardingData.target === ""}
                                        colorVariant="primary"
                                        onClick={handlerSaveUrl}
                                        databsdismiss="offcanvas"
                                        databstoggle="offcanvas"
                                        databstarget="#newUrlForwarding"
                                        showLoadingSpinner={true}
                                        size="small"
                                    ></RdsButton>
                                </div>
                            </div>
                        </RdsOffcanvas>
                        <RdsOffcanvas
                            placement="end"
                            canvasTitle={t("Edit Url")}
                            offId="editUrlForwardingoff"
                            backDrop={true}
                            scrolling={false}
                            preventEscapeKey={false}
                        >
                            <div className="mt-2">
                                <RdsCompUrlForwardings urlForwardingData={editUrlData} emitUrlForwardingData={getUrlForwardingsDataForEdit} isEdit={true} />
                                <div className="pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2">
                                    <RdsButton
                                        type={"button"}
                                        label={t("AbpUi.Cancel") || ""}
                                        isOutline={true}
                                        colorVariant="primary"
                                        databsdismiss="offcanvas"
                                        databstoggle="offcanvas"
                                        databstarget="#editUrlForwardingoff"
                                        size="small"
                                        class=""
                                    ></RdsButton>
                                    <RdsButton
                                        type={"button"}
                                        label={t("AbpUi.Save") || ""}
                                        colorVariant="primary"
                                        onClick={handlerEditUrlForwardings}
                                        databsdismiss="offcanvas"
                                        databstoggle="offcanvas"
                                        databstarget="#editUrlForwardingoff"
                                        showLoadingSpinner={true}
                                        size="small"
                                    ></RdsButton>
                                </div>
                            </div>
                        </RdsOffcanvas>
                        <RdsCompAlertPopup
                            alertID={"deleteUrlForwardingoff"}
                            onSuccess={handlerDeleteConfirm}
                        ></RdsCompAlertPopup>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UrlForwarding;

