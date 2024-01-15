import React, { useEffect, useState } from "react";
import { RdsCompDatatable } from "../../../rds-components";
import { RdsButton, RdsIcon, RdsModal } from "../../../../../raaghu-elements/src";
import { useAppDispatch, useAppSelector } from "../../../../libs/state-management/hooks";
import { RequestsData, deletePersonalData, downloadTokenPersonalData, getPersonalData, requestPersonalData } from "../../../../libs/state-management/personal-data/personal-data-slice";
import { useTranslation } from "react-i18next";

const PersonalData = (props: any) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [personalTableData, setPersonalTableData] = useState<any[]>([{}]);
    const pData = useAppSelector((state) => state.persistedReducer.personalData);
    const [personalDataSuccess, setPersonalDataSuccess] = useState(false);

    const tableHeaders = [
        {
            displayName: t("AbpGdpr.CreationTime"),
            key: "creationTime",
            datatype: "text",
            sortable: false,
        },
        {
            displayName: t("AbpGdpr.ReadyTime"),
            key: "readyTime",
            datatype: "text",
            sortable: false,
        },
    ];

    const actions = [
        { id: "download_data", displayName: t("AbpGdpr.Download") },
    ];

    const onActionSelection = (rowData: any, actionId: any) => {
        const id = rowData.id;
        if (actionId == "download_data") {
            downloadTokenPersonalDataPayload(id);
        }
    };

    const downloadTokenPersonalDataPayload = (id: any) => {
        dispatch(downloadTokenPersonalData(id) as any).then((response: any) => {

            dispatch(RequestsData({ requestId: id, token: response.payload.token })).then((response: any) => {
                response.payload.blob().then((res: any) => {
                    const file: any = new File([res], "PersonalData.zip", { type: res.type })
                    downloadBlob(file, "PersonalData.zip")
                    function downloadBlob(blob: any, fileName: any) {
                        //Creating a URL for the blob object
                        const blobUrl = URL.createObjectURL(blob);

                        //Creating an anchor element to link it to blob oject
                        const a = document.createElement('a');
                        a.href = blobUrl;
                        a.download = fileName;

                        //Triggering a click event on the anchor element
                        a.style.display = 'none';
                        document.body.appendChild(a);
                        a.click();

                        //Cleaning up that tag
                        document.body.removeChild(a);
                        URL.revokeObjectURL(blobUrl);
                    }
                })
            })


        });


    };

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        dispatch(getPersonalData(userId) as any);
    }, []);

    useEffect(() => {
        if (pData.personalData) {
            const personalDataTable = pData.personalData.items.map((dataPersonal: any) => {
                const dateOne = new Date(dataPersonal.readyTime);
                const dayOne = dateOne.getDate();
                const monthOne = dateOne.getMonth() + 1;
                const yearOne = dateOne.getFullYear();
                const readyTime = dateOne.toLocaleString("en-IN", {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                });
                const readyTimes = `${yearOne}/${monthOne}/${dayOne}` + "\n" + `${readyTime}`;
                const date = new Date(dataPersonal.creationTime);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                const currentTime = date.toLocaleString("en-IN", {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                });
                const currentDate = `${year}/${month}/${day}` + "\n" + `${currentTime}`;
                return {
                    creationTime: currentDate,
                    readyTime: readyTimes,
                    id: dataPersonal.id
                };
            }, []);
            setPersonalTableData(personalDataTable);
        }

    }, [pData.personalData]);

    const handlerRequestData = () => {
        dispatch(requestPersonalData() as any)
            .then((res: any) => {
                if (res && res.error.message != "Forbidden") {
                    console.log(res)
                    setPersonalDataSuccess(true);
                } else {
                    setPersonalDataSuccess(false);
                    console.error(res)
                }
            })
            .catch(() => {
                setPersonalDataSuccess(false);
            });
    };

    return (
        <div className="container-fluid m-0 p-0 h-100">
            <div className="card px-4 py-4 border-0 rounded-0 card-full-stretch">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <div className="d-flex justify-content-end">
                            <RdsModal
                                modalId="modal1"
                                modalAnimation="modal fade"
                                showModalFooter={false}
                                showModalHeader={false}
                                scrollable={false}
                                verticallyCentered={true}
                                modalbutton={

                                    <RdsButton
                                        label={t("AbpGdpr.RequestPersonalData") || ""}
                                        block={false}
                                        size="small"
                                        type="button"
                                        colorVariant="primary"
                                        onClick={handlerRequestData}
                                        class="mx-2"
                                    ></RdsButton>}
                                cancelButtonName="OK"
                            >
                                <div>
                                    <div className="text-center">
                                        {!personalDataSuccess && (
                                            <div className="container">
                                                <div className="py-3">
                                                    <RdsIcon
                                                        width="70px"
                                                        height="70px"
                                                        name="close_circle"
                                                        colorVariant={"danger"}
                                                        stroke={true}
                                                    ></RdsIcon>
                                                </div>
                                                <div className="py-3">
                                                    {t("AbpGdpr.Volo.Abp.Gdpr:010001") || ""}
                                                </div>
                                                <div className="d-flex justify-content-center my-3">
                                                    <RdsButton
                                                        class="me-2"
                                                        tooltipTitle={""}
                                                        type={"button"}
                                                        label={t("AbpUi.Ok") || ""}
                                                        colorVariant="primary"
                                                        size="small"
                                                        databsdismiss="modal"
                                                    ></RdsButton>
                                                </div>
                                            </div>
                                        )}
                                        {personalDataSuccess && (
                                            <div className="container">
                                                <div className="py-3">
                                                    <RdsIcon
                                                        width="70px"
                                                        height="70px"
                                                        name="tick_circle"
                                                        colorVariant={"success"}
                                                        stroke={true}
                                                    ></RdsIcon>
                                                </div>
                                                <div className="py-3">
                                                    {t("AbpGdpr.PersonalDataPrepareRequestReceived") || ""}
                                                </div>
                                                <div className="d-flex justify-content-center my-3">
                                                    <RdsButton
                                                        class="me-2"
                                                        tooltipTitle={""}
                                                        type={"button"}
                                                        label={t("AbpUi.Ok") || ""}
                                                        colorVariant="primary"
                                                        size="small"
                                                        databsdismiss="modal"
                                                    ></RdsButton>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </RdsModal>
                            {/* <RdsButton
                        icon="plus"
                        label={("Delete Peronal Data") || ""}
                        iconColorVariant="light"
                        iconHeight="15px"
                        iconWidth="15px"
                        iconFill={false}
                        iconStroke={true}
                        block={false}
                        size="small"
                        type="button"
                        colorVariant="danger"
                        onClick={handlerDeletePersonalData}
                    ></RdsButton> */}
                        </div>
                    </div>
                </div>
                <RdsCompDatatable
                    actionPosition="right"
                    tableHeaders={tableHeaders}
                    actions={actions}
                    tableData={personalTableData}
                    noDataheaderTitle={t("No Records Available") || ""}
                    illustration={true}
                    pagination={true}
                    recordsPerPage={10}
                    recordsPerPageSelectListOption={true}
                    onActionSelection={onActionSelection}
                ></RdsCompDatatable>
            </div>
        </div>

    );
};

export default PersonalData;