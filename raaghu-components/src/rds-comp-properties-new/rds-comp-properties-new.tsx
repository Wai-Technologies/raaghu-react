import { RdsButton, RdsIcon, RdsInput } from "../rds-elements";
import React, { useState } from "react";
import RdsCompDatatable from "../rds-comp-data-table";
import { useTranslation } from "react-i18next";

export interface RdsCompPropertiesNewProps { }

const RdsCompPropertiesNew = (props: RdsCompPropertiesNewProps) => {
    const [tableData, setTableData] = useState<any>([]);
    const [propertyData, setPropertyData] = useState<any>({
        key: "",
        PropValue: "",
    });

    function handleSubmit(event: any) {
        event.preventDefault();
    }
    function headerKeyhandleChange(value: any) {
        setPropertyData({ ...propertyData, key: value });
    }
    function headerValuehandleChange(value: any) {
        setPropertyData({ ...propertyData, PropValue: value });
    }
    const tableHeaders = [
        {
            displayName: "Key",
            key: "key",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: "Value",
            key: "Value",
            datatype: "text",
            sortable: true,
        },
        {
            displayName: "Action",
            key: "delete",
            datatype: "children",
            sortable: true,
        },
    ];
    const handleAddItem = () => {
        let newTempData: any;
        newTempData = {
            key: propertyData.key,
            Value: propertyData.PropValue,
            delete: (
                <>
                    <a
                        className="mx-2"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target={"#deleteTreeNode"}
                        onClick={() => onDelete(propertyData.key)}
                        data-testid="delete"
                    >
                        <RdsIcon
                            name={"delete"}
                            height="16px"
                            width="20px"
                            stroke={true}
                        ></RdsIcon>
                    </a>
                </>
            ),
        };
        setTableData((prev: any) => [...prev, newTempData]);
        console.log(tableData);
        setPropertyData({ key: "", PropValue: "" });
    };
    function onDelete(key: any) {
        const tempPropertyData = tableData.filter((el: any) => el.key != key);
        setTableData(tempPropertyData);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>                
                <div className=" row mt-3">
                    <div className="col-md-5">
                        <RdsInput
                            label="Key"
                            placeholder="Enter a key"
                            inputType="text"
                            onChange={(e: any) => {
                                headerKeyhandleChange(e.target.value);
                            }}
                            value={propertyData.key}
                            dataTestId="key"
                        ></RdsInput>
                    </div>
                    <div className="col-md-5">
                        <RdsInput
                            label="Value"
                            placeholder="Enter a value"
                            inputType="text"
                            onChange={(e: any) => {
                                headerValuehandleChange(e.target.value);
                            }}
                            value={propertyData.PropValue}
                            dataTestId="value"
                        ></RdsInput>
                    </div>
                    <div className="col-md-2 align-items-end d-flex ">
                        <RdsButton
                            label="Add"
                            colorVariant="primary"
                            block={true}
                            onClick={handleAddItem}
                            tooltipTitle={""}
                            type="submit"
                            dataTestId="add"
                        />
                    </div>
                </div>
                <div className="mt-3">
                    <RdsCompDatatable
                        actionPosition="right"
                        tableHeaders={tableHeaders}
                        tableData={tableData}
                        pagination={false}
                    ></RdsCompDatatable>
                </div>
                <div className=" mt-5 pb-3 footer-buttons d-flex gap-2 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row">
                    <RdsButton
                        label="Cancel"
                        colorVariant="primary"
                        block={true}
                        tooltipTitle={""}
                        type="button"
                        isOutline={true}
                        dataTestId="cancel"
                    />
                    <RdsButton
                        label="Save"
                        colorVariant="primary"
                        block={true}
                        tooltipTitle={""}
                        type="submit"
                        dataTestId="submit"
                    />
                </div>
            </form>
        </>
    );
};
export default RdsCompPropertiesNew;
