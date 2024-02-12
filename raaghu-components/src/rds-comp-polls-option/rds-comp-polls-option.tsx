import { RdsButton, RdsInput } from "../rds-elements";
import React, { useEffect, useState } from "react";
import RdsCompDatatable from "../rds-comp-data-table";
import { useTranslation } from "react-i18next";

interface RdsCompPollsOptionProps {
    getPollsOptionData?: any;
    optionsData?: any;
}

const RdsCompPollsOption = (props: RdsCompPollsOptionProps) => {
    const [tableData, setTableData] = useState<any>(props.optionsData);
    const [optionData, setoptionData] = useState<any>({
        option: "",
    });
    const { t } = useTranslation();

    useEffect(() => {
        if (props.optionsData) {
            setTableData(props.optionsData);
        }
    }, [props.optionsData]);

    function optionChange(value: any) {
        setoptionData({ ...optionData, option: value });
    }

    const tableHeaders = [
        {
            displayName: t("CmsKit.Text"),
            key: "text",
            datatype: "text",
            sortable: true,
        },
    ];
    const actions = [
        { id: "editPolls", displayName: t("AbpUi.Edit") },
        { id: "deletePolls", displayName: t("AbpUi.Delete") },
    ];
    const [areWeEditing, setAreWeEditing] = useState(false);
    const [dataId, setDataId] = useState("");

    function generateUniqueID() {
        const randomNumber = Math.floor(Math.random() * 1000000);
        const timestamp = Date.now();
        const uniqueID = `${randomNumber}-${timestamp}`;
        return uniqueID;
    }

    function getSwappedData(data: any) {
        setTableData(data);
    }
    const [updateTable, setUpdateTable] = useState(false);


    const onActionHandler = (rowData: any, actionId: any) => {
        if (actionId == "editPolls") {
            setAreWeEditing(true);
            setDataId(rowData.id);
            const editData = tableData.find((element: any) => element.id == rowData.id);
            setoptionData({ ...optionData, option: editData.text });
        } else if (actionId === "deletePolls") {
            const tempTableData1: any[] = [];
            tableData?.map((res: any) => {
                if (res.id != rowData.id) {
                    tempTableData1.push(res);
                }
            });
            setTableData(tempTableData1);
            setUpdateTable(!updateTable);
        }
    };

    function handleAddItem(event: any) {
        event.preventDefault();
        if (areWeEditing) {
            setAreWeEditing(false);
            const tempTableData2: any[] = [];
            tableData?.map((res: any) => {
                if (res.id == dataId) {
                    res.text = optionData.option;
                }
                tempTableData2.push(res);
            });
            setTableData(tempTableData2);
        } else {
            const tempTableData3 = tableData?.map((res: any) => {
                const item = {
                    id: res.id,
                    text: res.text,
                    order: res.order,
                    voteCount: 0,
                    actions: actions,
                };
                return item;
            });
            const id = generateUniqueID();
            const newTempData: any = {
                id: id,
                text: optionData.option,
                order: tableData.length + 1,
                voteCount: 0,
                actions: actions,
            };
            tempTableData3.push(newTempData);
            setTableData(tempTableData3);
        }
        setoptionData({ option: "" });
        setUpdateTable(!updateTable);
    }

    useEffect(() => {
        const tempTableData4 = tableData?.map((res: any) => {
            const item = {
                id: res.id,
                text: res.text,
                order: res.order,
                voteCount: res.voteCount,
                actions: actions,
            };
            return item;
        });
        setTableData(tempTableData4);
    }, [updateTable]);

    return (
        <>
            <div className="container-fluid m-0 p-0">
                <div className="align-items-end row mt-3">
                    <div className="col-md-11 mb-3">
                        <RdsInput
                            label={t("CmsKit.Options") || ""}
                            placeholder={t("Enter Option") || ""}
                            inputType="text"
                            onChange={(e: any) => {
                                optionChange(e.target.value);
                            }}
                            value={optionData.option}
                            dataTestId="option"
                        ></RdsInput>
                    </div>
                    <div className="col-md-1 mb-3">
                        <RdsButton
                            colorVariant="primary"
                            icon="plus"
                            isFabIcon={false}
                            iconColorVariant="light"
                            iconHeight={"12px"}
                            iconWidth={"12px"}
                            iconFill={false}
                            iconStroke={true}
                            onClick={handleAddItem}
                            tooltipTitle={""}
                            type="button"
                            dataTestId="add"
                        />
                    </div>
                </div>
                <div className="mt-3">
                    <RdsCompDatatable
                        actionPosition="right"
                        actions={actions}
                        onActionSelection={onActionHandler}
                        tableHeaders={tableHeaders}
                        tableData={tableData}
                        pagination={false}
                        isSwap={true}
                        illustration={false}
                        swapRows={(data: any) => {
                            getSwappedData(data);
                        }}
                    ></RdsCompDatatable>
                </div>
            </div>
        </>
    );
};

export default RdsCompPollsOption;