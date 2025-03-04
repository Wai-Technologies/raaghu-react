import React, { useState } from "react";
import RdsCompDatatable, { ActionPosition } from "../rds-comp-data-table/rds-comp-data-table";
import { RdsInput, RdsButton, RdsIcon } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompPropertiesProp {
    propertyData: any[];
    propertyHeaders: {
        displayName: string;
        key: string;
        datatype: string;
        dataLength?: number;
        required?: boolean;
        sortable?: boolean;
        colWidth?: string;
        disabled?: boolean;
        isEndUserEditing?: boolean;
    }[];
    onActionSelection(arg: any): void;
    displayType: "basic" | "advanced";
}

const RdsCompProperties = (props: RdsCompPropertiesProp) => {

    const [key, setKey] = useState("");
    const [value, setValue] = useState("");
    const [tableData, setTableData] = useState<any>([]);
    const [propertyData, setPropertyData] = useState<any>({
        key: "",
        PropValue: "",
    });

    const isHeaderKeyValid = (headerKey: any) => {
        if (!headerKey || headerKey.length === 0) {
            return false;
        }
        return true;
    };
    const isHeaderValueValid = (headerValue: any) => {
        if (!headerValue || headerValue.length === 0) {
            return false;
        }
        return true;
    };

    const headerKeyhandleChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setKey(event.target.value);
    };
    const headerValuehandleChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setValue(event.target.value);
    };

    function headerKeyhandleChanged(value: any) {
        setPropertyData({ ...propertyData, key: value });
    }
    function headerValuehandleChanged(value: any) {
        setPropertyData({ ...propertyData, PropValue: value });
    }

    //****************handle Submit********************
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setKey("");
        setValue("");
    };


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
        setPropertyData({ key: "", PropValue: "" });
    };
    function onDelete(key: any) {
        const tempPropertyData = tableData.filter((el: any) => el.key != key);
        setTableData(tempPropertyData);
    }
    
    return (
        <>
        {props.displayType == "basic" && (
            <form onSubmit={handleSubmit}>
                <RdsCompDatatable
                    actionPosition={ActionPosition.Right}
                    tableHeaders={props.propertyHeaders}
                    tableData={props.propertyData}
                    pagination={false}
                    onActionSelection={props.onActionSelection}
                ></RdsCompDatatable>

                <div className=" fw-normal row mb-3 mt-2">
                    <div className="col-md-5 col-sm-12 mb-3">
                        <RdsInput
                            name="Key"
                            label={true}
                            placeholder="Enter a key"
                            inputType="text"
                            onChange={headerKeyhandleChange}                            
                            value={key}
                            dataTestId="key"
                        ></RdsInput>
                    </div>
                    <div className="col-md-5 col-sm-12 mb-3">
                        <RdsInput
                            name="Value"
                            label={true}
                            placeholder="Enter a value"
                            inputType="text"
                            onChange={headerValuehandleChange}                           
                            value={value}
                            dataTestId="value"
                        ></RdsInput>
                    </div>
                    <div className="col-2 mb-5 mt-4 align-self-end pt-2">
                        <RdsButton
                            label="Add"                        
                            colorVariant="primary"
                           block={false}
                            tooltipTitle={""}
                            type="submit"
                            dataTestId="add"
                        />

                    </div>
                </div>    
                     <div className="d-flex ps-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
                        <RdsButton
                              label="Cancel"
                              colorVariant="primary"                            
                              tooltipTitle={""}
                              size="small"
                              type="button"
                              isOutline={true}
                              dataTestId="cancel"
                        ></RdsButton>
                        <RdsButton
                          label="Save"
                          colorVariant="primary"                    
                          size="small"
                          tooltipTitle={""}
                          type="submit"
                          dataTestId="save"
                        ></RdsButton>
                </div>
            </form>
        )}
        {props.displayType === "advanced" && (
            <form onSubmit={handleSubmit}>                
            <div className=" row g-3 mt-3 px-2">
                <div className="col-md-5">
                    <RdsInput
                        name="Key"
                        label={true}
                        placeholder="Enter a key"
                        inputType="text"
                        onChange={(e: any) => {
                            headerKeyhandleChanged(e.target.value);
                        }}
                        value={propertyData.key}
                        dataTestId="key"
                    ></RdsInput>
                </div>
                <div className="col-md-5">
                    <RdsInput
                        name="Value"
                        label={true}
                        placeholder="Enter a value"
                        inputType="text"
                        onChange={(e: any) => {
                            headerValuehandleChanged(e.target.value);
                        }}
                        value={propertyData.PropValue}
                        dataTestId="value"
                    ></RdsInput>
                </div>
                <div className="col-md-2   align-items-end d-flex mb-2">                    
                    <RdsButton 
                        label="Add"                                              
                        colorVariant="primary"
                       block={false}
                       onClick={handleAddItem}
                        tooltipTitle={""}
                        type="submit"
                        dataTestId="add"
                    />
                </div>
            </div>
            <div className="mt-3 px-2">
                <RdsCompDatatable
                    actionPosition={ActionPosition.Right}
                    tableHeaders={tableHeaders}
                    tableData={tableData}
                    pagination={false}
                ></RdsCompDatatable>
            </div>
            <div className=" mt-5 pb-3 p-4 footer-buttons d-flex gap-2 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row">
                <RdsButton
                    label="Cancel"
                    colorVariant="primary"
                    block={false}
                    tooltipTitle={""}
                    size="small"
                    type="button"
                    isOutline={true}
                    dataTestId="cancel"
                />
                <RdsButton
                    label="Save"
                    colorVariant="primary"
                    block={false}
                    tooltipTitle={""}
                    size="small"
                    type="submit"
                    dataTestId="submit"
                />
            </div>
        </form>
        )}
        </>
    );
};
export default RdsCompProperties;
