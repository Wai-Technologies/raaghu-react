import React, { useState, useEffect } from "react";
import {
    RdsButton,
    RdsInput,
    RdsAlert,
    RdsOffcanvas,
    RdsNavtabs,
} from "../../../../../raaghu-elements/src";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../libs/state-management/hooks";
import {
    createGatewayPlan,
    createNewPlan,
    deleteGatewayPlan,
    deletePlan,
    getAllGatewayPlansByPlanId,
    getAllPaymentPlans,
    getPlanById,
    updateGatewayPlan,
    updatePlan,
} from "../../../../libs/state-management/payment-plans/paymentPlans-slice";
import { RdsCompAlertPopup, RdsCompDatatable } from "../../../rds-components";
import { useTranslation } from "react-i18next";
import { deletePlansExternalPlansRequest, deletePlansRequest, getPlans1Request, getPlansExternalPlansRequest, getPlansRequest, postPlansExternalPlansRequest, postPlansRequest, putPlansExternalPlansRequest, putPlansRequest } from "../../../../libs/state-management/plan-admin/plan-admin-slice";

const PaymentPlans = () => {
    const { t } = useTranslation();

    // Use States ================
    const [inputReset, setInputReset] = useState(false);

    const [skipCount, setSkipCount] = useState<number>(0);
    const [maxResultCount, setMaxResultCount] = useState<number>(10);
    const [totalRecords, setTotalRecords] = useState({
        plans: 0,
        gateway: 0,
    });
    const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
    const [GatwayAlert, setGatwayAlert] = useState({ show: false, message: "", color: "" });
    const actions: any = [
        { id: "edit", displayName: t("AbpUi.Edit"), offId: "payPlan-edit-off" },
        {
            id: "delete",
            displayName: t("AbpUi.Delete"),
            modalId: "payPlan-delete-off",
        },
    ];

    const gatewayActions: any = [
        { id: "edit Gateway Plan", displayName: t("AbpUi.Edit") },
        { id: "delete gateway", displayName: t("AbpUi.Delete") },
    ];
    const [isEditGatewayActionSelected, setIsEditGatewayActionSelected] =
        useState(false);
    const [plansTableData, setPlansTableData] = useState([]);
    const [gatewayTableData, setGatewayTableData] = useState([]);
    const [canvasTitle, setCanvasTitle] = useState(t("New Payment Plans"));
    const [paymentPlansObj, setPaymentPlansObj] = useState({
        id: "",
        name: "",
        concurrencyStamp: "",
    });
    const [gatewayPlansObj, setGatewayPlansObj] = useState({
        planId: "",
        gateway: "",
        externalId: "",
    });
    const [isEdit, setIsEdit] = useState(false);
    const [paymentPlan, setPaymentPlan] = useState<any>({});

    // Constants / Variables =============
    const tableHeadersPlans = [
        {
            displayName: t("Name"),
            key: "name",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: true,
        },
    ];
    const tableHeadersGatewayPlans = [
        {
            displayName: t("Gateway"),
            key: "gateway",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: true,
        },
        {
            displayName: t("Payment.DisplayName:ExternalId"),
            key: "externalId",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: true,
        },
    ];
    const navtabsItems = [
        { label: t("Payment Plan"), tablink: "#nav-home", id: "0" },
        { label: t("Manage gateway Plans"), tablink: "#nav-profile", id: "1" },
    ];
    const [activeNavTabIdEdit, setActiveNavTabIdEdit] = useState("0");
    // dispatch and selectores for API calling ===============
    const dispatch = useAppDispatch();
    const paymentPlans = useAppSelector(
        (state) => state.persistedReducer.paymentPlans
    );

    // Use Effects ==================
    useEffect(() => {
        dispatch(
            getPlansRequest({
                filter: undefined,
                sorting: undefined,
                skipCount: skipCount,
                maxResultCount: maxResultCount,
            })
        );
    }, [dispatch, skipCount, maxResultCount]);

    // Get all alogs API
    useEffect(() => {
        if (paymentPlans.allPaymentPlans.items) {
            const allData = paymentPlans.allPaymentPlans.items.map((plan: any) => ({
                id: plan.id,
                name: plan.name,
                concurrencyStamp: plan.concurrencyStamp,
            }));
            setPlansTableData(allData);
            setTotalRecords({
                ...totalRecords,
                plans: paymentPlans.allPaymentPlans?.totalCount,
            });
        }
    }, [paymentPlans.allPaymentPlans]);

    // Get selected paymentPlans API
    useEffect(() => {
        if (paymentPlans.paymentPlan) {
            setPaymentPlansObj({
                id: paymentPlans.paymentPlan.id,
                name: paymentPlans.paymentPlan.name,
                concurrencyStamp: paymentPlans.paymentPlan.concurrencyStamp,
            });
        }
    }, [paymentPlans.paymentPlan]);

    // Get all gateway plans
    useEffect(() => {
        if (paymentPlans.allGatewayPlans.items) {
            const allGatewayData = paymentPlans.allGatewayPlans.items.map(
                (gateway: any) => ({
                    planId: gateway.planId,
                    gateway: gateway.gateway,
                    externalId: gateway.externalId,
                })
            );
            setGatewayTableData(allGatewayData);
            setTotalRecords({
                ...totalRecords,
                gateway: paymentPlans.allGatewayPlans?.totalCount,
            });
        }
    }, [paymentPlans.allGatewayPlans]);

    // Create New Plan
    function createpaymentPlansFn(event: any) {
        event.preventDefault();
        setIsEdit(false);
        setPaymentPlansObj({ id: "", name: "", concurrencyStamp: "" });
        setGatewayPlansObj({ planId: " ", gateway: " ", externalId: " " });
        setCanvasTitle(t("Payment.NewPlan"));
    }

    function createNewPaymentPlan(event: any) {
        const data = { body: { name: paymentPlansObj.name } };
        dispatch(postPlansRequest({requestBody:data.body})).then((res: any) => {
            setAlert({
                ...Alert,
                show: true,
                message: t("Payment Plan created Successfully"),
                color: "success",
            });
            dispatch(
                getPlansRequest({
                    filter: undefined,
                    sorting: undefined,
                    skipCount: skipCount,
                    maxResultCount: maxResultCount,
                })
            );
        });
        setIsEdit(false);
    }

    function createNewGatewayPlan(event: any) {
        event.preventDefault();
        const data = {
            planId: paymentPlan.id,
            body: {
                gateway: gatewayPlansObj.gateway,
                externalId: gatewayPlansObj.externalId,
            },
        };
        const item = {
            planId: paymentPlan.id,
            filter: undefined,
            sorting: undefined,
            skipCount: skipCount,
            maxResultCount: maxResultCount,
            cancelToken: undefined,
        };

        dispatch(postPlansExternalPlansRequest(data)).then((res: any) => {
            if (res.type == "PaymentPlans/CreateGatewayPlan/rejected") {
                setGatwayAlert({
                    ...GatwayAlert,
                    show: true,
                    message: t("Your request has been denied"),
                    color: "danger",
                });
            } else {
                setGatwayAlert({
                    ...GatwayAlert,
                    show: true,
                    message: t("Gateway Plan created Successfully"),
                    color: "success",
                });
            }

            dispatch(getPlansExternalPlansRequest(item));
        });
        setIsEdit(false);
        setGatewayPlansObj({ planId: " ", gateway: " ", externalId: " " });
        resetInputs();
    }

    function updateNewGatewayPlan(event: any) {
        if (!gatewayPlansObj.externalId) {
            setAlert({
                ...Alert,
                show: true,
                message: "External Id is required",
                color: "danger",
            });
            return; // Stop further execution
        }

        const data = {
            planId: gatewayPlansObj.planId,
            gateway: gatewayPlansObj.gateway,
            body: {
                gateway: gatewayPlansObj.gateway,
                externalId: gatewayPlansObj.externalId,
            },
        };
        const item = {
            planId: gatewayPlansObj.planId,
            filter: undefined,
            sorting: undefined,
            skipCount: skipCount,
            maxResultCount: maxResultCount,
            cancelToken: undefined,
        };

        dispatch(putPlansExternalPlansRequest(data)).then((res: any) => {
            if (res.type == "planadmin/putPlansExternalPlansRequest/rejected") {
                setGatwayAlert({
                    ...GatwayAlert,
                    show: true,
                    message: t("Something went wrong"),
                    color: "danger",
                });
            } else {
                setGatwayAlert({
                    ...GatwayAlert,
                    show: true,
                    message: t("Gateway Plan updated Successfully"),
                    color: "success",
                });
            }

            dispatch(getPlansExternalPlansRequest(item));
        });
        setIsEdit(false);
        setIsEditGatewayActionSelected(false);
        setGatewayPlansObj({ planId: "", gateway: " ", externalId: " " });
    }

    function cancelGatewaySelection(data: any) {
        const item = {
            planId: gatewayPlansObj.planId,
            filter: undefined,
            sorting: undefined,
            skipCount: skipCount,
            maxResultCount: maxResultCount,
            cancelToken: undefined,
        };
        setGatewayPlansObj({
            planId: data.planId,
            gateway: data.gateway,
            externalId: data.externalId,
        });
        dispatch(getPlans1Request({ id: item.planId }));
        dispatch(getPlansExternalPlansRequest(item));
        setIsEditGatewayActionSelected(false);
    }

    // On action selection from data table
    function onActionSelection(data: any, actionId: any) {
        const item = {
            planId: data.id,
            filter: undefined,
            sorting: undefined,
            skipCount: skipCount,
            maxResultCount: maxResultCount,
            cancelToken: undefined,
        };
        setPaymentPlan(data);

        if (actionId === "edit") {
            setGatewayPlansObj({
                planId: data.planId,
                gateway: data.gateway,
                externalId: data.externalId,
            });
            dispatch(getPlans1Request({ id: data.id }));
            dispatch(getPlansExternalPlansRequest(item));
            setIsEdit(true);
            setCanvasTitle(t("Edit Plan"));
            setCanvasTitle(t("Edit Plan"));
        }
    }

    function onActionSelectionGatewayPlan(data: any, actionId: any) {
        const item = {
            planId: data.planId,
            filter: undefined,
            sorting: undefined,
            skipCount: skipCount,
            maxResultCount: maxResultCount,
            cancelToken: undefined,
        };

        if (actionId === "edit Gateway Plan") {
            setIsEditGatewayActionSelected(true);

            setIsEdit(true);
            setGatewayPlansObj({
                planId: data.planId,
                gateway: data.gateway,
                externalId: data.externalId,
            });
            dispatch(getPlansExternalPlansRequest(item));
        } else if (actionId === "delete gateway") {
            const item = {
                planId: data.planId,
                filter: undefined,
                sorting: undefined,
                skipCount: skipCount,
                maxResultCount: maxResultCount,
                cancelToken: undefined,
            };
            dispatch(deletePlansExternalPlansRequest(data)).then((res: any) => {
                setGatwayAlert({
                    ...GatwayAlert,
                    show: true,
                    message: t("Gateway Plan deleted Successfully"),
                    color: "success",
                });

                dispatch(getPlansExternalPlansRequest(item));
            });
        }
    }

    function saveUpdatePaymentPlans(event: any) {
        const data = {
            id: paymentPlansObj.id,
            body: { name: paymentPlansObj.name },
        };
        dispatch(putPlansRequest(data)).then((res: any) => {
            setAlert({
                ...Alert,
                show: true,
                message: t("Payment Plan updated Successfully"),
                color: "success",
            });

            dispatch(
                getPlansRequest({
                    filter: undefined,
                    sorting: undefined,
                    skipCount: skipCount,
                    maxResultCount: maxResultCount,
                })
            );
        });
        setGatewayPlansObj({ planId: "", gateway: " ", externalId: " " });
        setIsEdit(false);
        setActiveNavTabIdEdit("0");
    }

    // Delete paymentPlans confirmation popup
    function confirmDelete() {
        const data = { id: paymentPlan.id };
        dispatch(deletePlansRequest(data)).then((res: any) => {
            setAlert({
                ...Alert,
                show: true,
                message: t("Payment Plan deleted Successfully"),
                color: "success",
            });
            dispatch(
                getPlansRequest({
                    filter: undefined,
                    sorting: undefined,
                    skipCount: skipCount,
                    maxResultCount: maxResultCount,
                })
            );
        });
    }

    // On Offcanvas Cancel
    function handlerCloseOffcanvas(event: any) {
        event.preventDefault();
        setPaymentPlansObj({ id: "", name: "", concurrencyStamp: "" });
        setGatewayPlansObj({ planId: "", gateway: "", externalId: "" });
        setInputReset(!inputReset);
        setGatewayTableData([]);
        setActiveNavTabIdEdit("0");
    }

    useEffect(() => {
        // Set a 2-second timer to update the state
        const timer = setTimeout(() => {
            setAlert({ ...Alert, show: false });
        }, 2000);
        // Clean up the timer when the component unmounts or when the state changes
        return () => clearTimeout(timer);
    }, [paymentPlans]);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setGatwayAlert({ ...GatwayAlert, show: false });
        }, 2000);

        return () => clearTimeout(timeOut);
    }, [paymentPlans]);

    //paginationa handling
    const paginationHandler = (currentPage: number, recordsPP: number) => {
        const skipCount = recordsPP * (currentPage - 1);
        setSkipCount(skipCount);
        setMaxResultCount(recordsPP);
    };

    let [searchFilter, setSearchFilter] = useState({
        filter: "",
    });

    const onSearchFilter = (event: any) => {
        setSearchFilter({
            ...searchFilter,
            filter: event.target.value,
        });
        if (event.target.value.length) {
            dispatch(getPlansRequest(searchFilter) as any);
        } else {
            dispatch(
                getPlansRequest({
                    skipCount: skipCount,
                    maxResultCount: maxResultCount,
                }) as any
            );
        }
    };

    const resetInputs = () => {
        setGatewayPlansObj({ planId: "", gateway: "", externalId: "" });
        setInputReset(true);
    };

    // DOM
    return (
        <>
            <div className="container-fluid p-0 m-0">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                            <div className="row ">
                                <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-12 mb-2">
                                    <div className="">
                                        <RdsInput
                                            inputType="text"
                                            placeholder={t("Search") || ""}
                                            labelPosition="top"
                                            size="small"
                                            value={searchFilter.filter}
                                            onChange={onSearchFilter}
                                        ></RdsInput>
                                    </div>
                                </div>
                                <div className="col-xxl-9 col-xl-9 col-lg-8 col-md-6 col-12 mb-md-0 mb-3">
                                    <RdsOffcanvas
                                        canvasTitle={canvasTitle || ""}
                                        placement="end"
                                        backDrop={true}
                                        scrolling={false}
                                        preventEscapeKey={false}
                                        offId="payPlan-new-off"
                                        offcanvasbutton={
                                            <div className="d-flex justify-content-end">
                                                <RdsButton
                                                    icon="plus"
                                                    label={t("Payment.NewPlan") || ""}
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
                                                    onClick={createpaymentPlansFn}
                                                ></RdsButton>
                                            </div>
                                        }
                                    >
                                        <div className="form-group">
                                            <RdsInput
                                                inputType="text"
                                                reset={inputReset}
                                                required={true}
                                                label={t("Name") || ""}
                                                placeholder={t("Enter Name") || ""}
                                                value={paymentPlansObj.name}
                                                onChange={(event) =>
                                                    setPaymentPlansObj({
                                                        ...paymentPlansObj,
                                                        name: event.target.value,
                                                    })
                                                }
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
                                                label={t("AbpUi.Save") || ""}
                                                size="small"
                                                colorVariant="primary"
                                                tooltipTitle={""}
                                                type={"submit"}
                                                isDisabled={!paymentPlansObj.name}
                                                databsdismiss="offcanvas"
                                                showLoadingSpinner={true}
                                                onClick={(event) => createNewPaymentPlan(event)}
                                            ></RdsButton>
                                        </div>
                                    </RdsOffcanvas>
                                    <RdsOffcanvas
                                        canvasTitle={canvasTitle || ""}
                                        placement="end"
                                        backDrop={true}
                                        scrolling={false}
                                        preventEscapeKey={false}
                                        offId="payPlan-edit-off"
                                        onClose={handlerCloseOffcanvas}
                                    >
                                        <div className="form-group">
                                            <RdsInput
                                                inputType="text"
                                                reset={inputReset}
                                                label={t("Name") || ""}
                                                placeholder={t("Enter Name") || ""}
                                                value={paymentPlansObj.name}
                                                onChange={(event) =>
                                                    setPaymentPlansObj({
                                                        ...paymentPlansObj,
                                                        name: event.target.value,
                                                    })
                                                }
                                            ></RdsInput>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-5 mb-3">
                                                <RdsInput
                                                    isDisabled={
                                                        isEditGatewayActionSelected ? true : false
                                                    }
                                                    inputType="text"

                                                    label={t("Gateway") || ""}
                                                    value={gatewayPlansObj.gateway}
                                                    placeholder={t("Enter Gateway") || ""}
                                                    onChange={(event) =>
                                                        setGatewayPlansObj({
                                                            ...gatewayPlansObj,
                                                            gateway: event.target.value,
                                                        })
                                                    }
                                                    reset={inputReset}
                                                ></RdsInput>
                                            </div>

                                            <div className="col-md-5 mb-3">
                                                <RdsInput
                                                    inputType="text"
                                                    label={t("Payment.DisplayName:ExternalId") || ""}
                                                    value={gatewayPlansObj.externalId}
                                                    placeholder={t("Enter External Id") || ""}
                                                    onChange={(event) =>
                                                        setGatewayPlansObj({
                                                            ...gatewayPlansObj,
                                                            externalId: event.target.value,
                                                        })
                                                    }
                                                    reset={inputReset}
                                                ></RdsInput>
                                            </div>

                                            <div className="align-items-center col-md-2 d-flex pt-0 pt-lg-2 pt-md-2 pt-xl-2 pt-xxl-2 mt-xxl-1 mt-xl-1 mt-lg-1 mt-md-1 mt-0">
                                                {isEditGatewayActionSelected && (
                                                    <div className="gap-2 d-flex justify-content-center">
                                                        <RdsButton
                                                            label={t("") || ""}
                                                            showLoadingSpinner={true}
                                                            size="medium"
                                                            icon="tick"
                                                            colorVariant="primary"
                                                            tooltipTitle={""}
                                                            type={"submit"}
                                                            databsdismiss=""
                                                            onClick={(event) => updateNewGatewayPlan(event)}
                                                        ></RdsButton>
                                                        {/* <span className="ms-2"> */}
                                                        <RdsButton
                                                            label={t("") || ""}
                                                            showLoadingSpinner={true}
                                                            size="medium"
                                                            icon="cancel"
                                                            colorVariant="outline-danger"
                                                            tooltipTitle={""}
                                                            type={"submit"}
                                                            databsdismiss=""
                                                            onClick={(event) =>
                                                                cancelGatewaySelection(event)
                                                            }
                                                        ></RdsButton>
                                                        {/* </span> */}
                                                    </div>
                                                )}
                                                {!isEditGatewayActionSelected && (
                                                    <div className="row g-0">
                                                        <RdsButton
                                                            isDisabled={
                                                                !gatewayPlansObj.gateway ||
                                                                !gatewayPlansObj.externalId
                                                            }
                                                            label={t("") || ""}
                                                            showLoadingSpinner={true}
                                                            size="medium"
                                                            icon="plus"
                                                            colorVariant="primary"
                                                            tooltipTitle={""}
                                                            type={"submit"}
                                                            databsdismiss=""
                                                            onClick={(event) => createNewGatewayPlan(event)}
                                                        ></RdsButton>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="position-relative pt-3">
                                                <div className="col-md-6 mt-2 pb-3 position-absolute">
                                                    {GatwayAlert.show && (
                                                        <RdsAlert
                                                            alertmessage={GatwayAlert.message}
                                                            size="small"
                                                            colorVariant={GatwayAlert.color}
                                                        ></RdsAlert>
                                                    )}
                                                </div>
                                                <div className="">
                                                    <RdsCompDatatable
                                                        actionPosition="right"
                                                        tableHeaders={tableHeadersGatewayPlans}
                                                        tableData={gatewayTableData}
                                                        actions={gatewayActions}
                                                        onActionSelection={onActionSelectionGatewayPlan}
                                                        classes="table"
                                                        recordsPerPageSelectListOption={true}
                                                        noDataheaderTitle={t("No Records Available") || ""}
                                                        noDataTitle={t("Click on the button to add") || ""}
                                                        illustration={true}
                                                        pagination={true}
                                                        totalRecords={totalRecords.plans}
                                                        recordsPerPage={maxResultCount}
                                                        onPaginationHandler={paginationHandler}
                                                    ></RdsCompDatatable>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-xxl-0 mb-xl-0 mb-lg-0 mb-md-0 mb-3 footer-buttons d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row gap-2">
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
                                                label={t("AbpUi.Save") || ""}
                                                size="small"
                                                colorVariant="primary"
                                                tooltipTitle={""}
                                                type={"submit"}
                                                isDisabled={!paymentPlansObj.name && !gatewayPlansObj.gateway && !gatewayPlansObj.externalId}
                                                databsdismiss="offcanvas"
                                                showLoadingSpinner={true}
                                                onClick={(event) => saveUpdatePaymentPlans(event)}
                                            ></RdsButton>
                                        </div>


                                    </RdsOffcanvas>
                                </div>
                            </div>
                            <RdsCompDatatable
                                actionPosition="right"
                                tableHeaders={tableHeadersPlans}
                                tableData={plansTableData}
                                actions={actions}
                                onActionSelection={onActionSelection}
                                classes="table"
                                recordsPerPageSelectListOption={true}
                                noDataheaderTitle={t("No Records Available") || ""}
                                noDataTitle={t("Click on the button to add") || ""}
                                illustration={true}
                                pagination={true}
                                totalRecords={totalRecords.plans}
                                recordsPerPage={maxResultCount}
                                onPaginationHandler={paginationHandler}
                            ></RdsCompDatatable>
                            <div className={`offset-md-4 col-md-4 mt-3 col-12 ${totalRecords.plans == 10 ? 'position-sticky' : 'position-absolute'} position-lg-relative bottom-0 mb-3 custom-responsive-alert`}>
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

                <RdsCompAlertPopup
                    alertID="payPlan-delete-off"
                    onSuccess={confirmDelete}
                />
            </div>
        </>
    );
};

export default PaymentPlans;
