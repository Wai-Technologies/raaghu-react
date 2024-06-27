import React, { useState } from "react";
import RdsCompDatatable from "../rds-comp-data-table/rds-comp-data-table";
import { RdsInput, RdsButton } from "../rds-elements";
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
}

const RdsCompProperties = (props: RdsCompPropertiesProp) => {

    const [key, setKey] = useState("");
    const [value, setValue] = useState("");

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

    //****************handle Submit********************
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setKey("");
        setValue("");
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <RdsCompDatatable
                    actionPosition="right"
                    tableHeaders={props.propertyHeaders}
                    tableData={props.propertyData}
                    pagination={false}
                    onActionSelection={props.onActionSelection}
                ></RdsCompDatatable>

                <div className=" fw-normal row mb-3 mt-2">
                    <div className="col-md-5 col-sm-12 mb-3">
                        <RdsInput
                            label="Key"
                            placeholder="Enter a key"
                            inputType="text"
                            onChange={headerKeyhandleChange}
                            name={"Key"}
                            value={key}
                            dataTestId="key"
                        ></RdsInput>
                    </div>
                    <div className="col-md-5 col-sm-12 mb-3">
                        <RdsInput
                            label="Value"
                            placeholder="Enter a value"
                            inputType="text"
                            onChange={headerValuehandleChange}
                            name={"value"}
                            value={value}
                            dataTestId="value"
                        ></RdsInput>
                    </div>
                    <div className="col-2 mb-5 mt-4 align-self-end">
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
                     <div className="d-flex ps-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
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
        </>
    );
};
export default RdsCompProperties;
