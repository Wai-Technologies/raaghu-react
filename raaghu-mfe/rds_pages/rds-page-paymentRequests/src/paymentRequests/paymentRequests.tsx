import React, { useState, useEffect } from "react";
import {
    RdsOffcanvas,
    RdsDatePicker,
    RdsInput,
} from "../../../rds-elements";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../libs/state-management/hooks";
import { RdsCompDatatable } from "../../../rds-components";
import { getAllPaymentRequests } from "../../../../libs/state-management/payment-requests/paymentRequests-slice";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

const PaymentRequests = () => {
    // Use States ================
    const [skipCount, setSkipCount] = useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = useState<number>(10);
    const [totalRecords, setTotalRecords] = useState<number | null>(0);
    const [tableData, setTableData] = useState<any>([]);
    const [tableDataProducts, setTableDataProducts] = useState([]);
    const [filterParameters, setFilterParameters] = useState({
        filter: undefined,
        creationDateMax: "",
        creationDateMin: "",
        paymentType: undefined,
        status: undefined,
        sorting: "",
        skipCount: skipCount,
        maxResultCount: recordsPerPage,
    });
    // Constants / Variables =============
    const { t } = useTranslation();
    const tableHeadersProducts = [
        {
            displayName: t("Code"),
            key: "code",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: false,
        },
        {
            displayName: t("Name"),
            key: "name",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: false,
        },
        {
            displayName: t("Payment.DisplayName:Count"),
            key: "count",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: false,
        },
        {
            displayName: t("Payment.DisplayName:UnitPrice"),
            key: "unitPrice",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: false,
        },
        {
            displayName: t("Payment.DisplayName:TotalPrice"),
            key: "totalPrice",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: false,
        },
        {
            displayName: t("Payment.DisplayName:PaymentType"),
            key: "paymentType",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: false,
        },
    ];
    const tableHeaders = [
        {
            displayName: t("Creation Time"),
            key: "creationTime",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: false,
        },
        {
            displayName: t("Payment.DisplayName:TotalPrice"),
            key: "totalPrice",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: false,
        },
        {
            displayName: t("Payment.DisplayName:Currency"),
            key: "currency",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: false,
        },
        {
            displayName: t("Payment.DisplayName:State"),
            key: "state",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: false,
        },
        {
            displayName: t("Payment.DisplayName:Gateway"),
            key: "gateway",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: false,
        },
        {
            displayName: t("Payment.DisplayName:ExternalSubscriptionId"),
            key: "externalSubscriptionId",
            datatype: "text",
            dataLength: 30,
            required: true,
            sortable: false,
        },
    ];
    const actions = [
        { id: "information", displayName: t("Payment.Products"), offId: "paymentRequests" },
    ];

    const canvasTitle: string = t("Payment.Products");
    // dispatch and selectores for API calling ===============
    const dispatch = useAppDispatch();
    const paymentRequests = useAppSelector(
        (state) => state.persistedReducer.paymentRequests
    );

    // Use Effects ==================
    useEffect(() => {
        const data = {
            filter: '',
            creationDateMax: '',
            creationDateMin: '',
            paymentType: '',
            status: '',
            sorting: '',
            skipCount: 0,
            maxResultCount: 1000,
        };
        dispatch(getAllPaymentRequests({
            filter: data.filter, creationDateMax: data.creationDateMax, creationDateMin: data.creationDateMin, paymentType: data.paymentType, status: data.status, sorting: data.sorting,
            skipCount: data.skipCount, maxResultCount: data.maxResultCount
        }));
    }, [dispatch]);

    useEffect(() => {
        if (!Array?.isArray(paymentRequests?.allPaymentRequests?.items) || paymentRequests?.allPaymentRequests?.items?.length === 0) {
            setTableData(tableData)
        } else {
            if (paymentRequests?.allPaymentRequests?.items != undefined) {
                const data = paymentRequests?.allPaymentRequests?.items?.map(
                    (payment: any) => ({
                        id: payment?.id,
                        creationTime: format(
                            new Date(payment?.creationTime),
                            "yyyy/dd/MM, HH:MM a"
                        ),
                        totalPrice: payment.totalPrice,
                        currency: payment.currency,
                        state: payment.state,
                        gateway: payment.gateway,
                        externalSubscriptionId: payment.externalSubscriptionId,
                        products: payment.products.map((x: any) => ({
                            ...x,
                            paymentType:
                                x.paymentType === 0
                                    ? "OneTime"
                                    : x.paymentType === 1
                                        ? "Subscription"
                                        : x.paymentType,
                        })),
                    })
                );
                setTableData(data);
            }

        }

    }, [paymentRequests.allPaymentRequests]);
    //paginationa handling
    const paginationHandler = (currentPage: number, recordsPP: number) => {
        const skipCount = recordsPP * (currentPage - 1);
        if (recordsPP !== recordsPerPage) {
            setRecordsPerPage(recordsPP);
        }
        setSkipCount(skipCount)
    };

    const onPaymentFilter = (event: any) => {
        setFilterParameters({
            ...filterParameters,
            filter: event.target.value,
        });
        if (event.target.value.length) {
            dispatch(getAllPaymentRequests(filterParameters) as any);
        } else {
            dispatch(getAllPaymentRequests({ skipCount: skipCount }) as any);
        }

    };

    const formatDate = (inputDate: any) => {
        const dateObj = new Date(inputDate);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const onPaymentDatePicker = (startDate: any) => {
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

        setFilterParameters({
            ...filterParameters,
            creationDateMax: formattedStart,
            creationDateMin: formattedEnd
        });
        dispatch(getAllPaymentRequests({ ...filterParameters, creationDateMax: formattedStart, creationDateMin: formattedEnd }) as any);
    }



    // DOM
    return (
        <>
            <div className="container-fluid m-0 p-0">
                <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                    <form>
                        <div className="row mb-xxl-0 mb-xl-0 mb-lg-0 mb-3 align-items-center">
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-12 form-group mt-2">
                                <RdsDatePicker DatePickerLabel={t("") || ""}
                                    type="advanced"
                                    customDate={onPaymentDatePicker}
                                    isDropdownOpen={false}
                                ></RdsDatePicker>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-12 form-group">
                                <RdsInput
                                    inputType="text"
                                    placeholder={t("Payment.Search") || ""}
                                    labelPosition="top"
                                    size="small"
                                    onChange={onPaymentFilter}
                                ></RdsInput>
                            </div>
                        </div>
                    </form>
                    <RdsCompDatatable
                        actionPosition="right"
                        tableHeaders={tableHeaders}
                        tableData={tableData}
                        actions={actions}
                        onActionSelection={(event) => setTableDataProducts(event.products)}
                        classes="table"
                        recordsPerPageSelectListOption={true}
                        noDataheaderTitle={t("No Records Available") || ""}
                        illustration={true}
                        pagination={true}
                        totalRecords={totalRecords}
                        recordsPerPage={recordsPerPage}
                        onPaginationHandler={paginationHandler}
                    ></RdsCompDatatable>
                    <RdsOffcanvas
                        canvasTitle={canvasTitle || ""}
                        placement="end"
                        offcanvaswidth={650}
                        onClose={() => function () { }}
                        backDrop={true}
                        scrolling={false}
                        preventEscapeKey={false}
                        offId={"paymentRequests"}
                    >
                        <RdsCompDatatable
                            actionPosition="right"
                            tableHeaders={tableHeadersProducts}
                            tableData={tableDataProducts}
                            pagination={false}
                            classes="table"
                            recordsPerPageSelectListOption={true}
                            recordsPerPage={5}
                            noDataheaderTitle={t("No Records Available") || ""}
                            illustration={true}
                        ></RdsCompDatatable>
                    </RdsOffcanvas>
                </div>
            </div>
        </>
    );
};

export default PaymentRequests;
