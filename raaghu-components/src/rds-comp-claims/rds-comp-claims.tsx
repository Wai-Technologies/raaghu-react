import React, { useEffect, useState } from "react";
import RdsCompDatatable from "../rds-comp-data-table";
import { RdsButton, RdsInput, RdsSelectList } from "../rds-elements";
import "./rds-comp-claims.css";
import { ActionPosition } from "../rds-comp-data-table/rds-comp-data-table";

export interface RdsCompClaimsProps {
    allClaimsArray?: any[];
    claimsTable?: any[];
    id?: any;
    getEditClaimData?: any;
    tableHeaders?: any[];
    onActionSelection?: any;
    reset?: boolean;
    actions?: any;
}

export interface SelectedItem {
    type: string;
    value: string;
}

const RdsCompClaims = (props: RdsCompClaimsProps) => {
    const [allClaimsArray, setAllClaimsArray] = useState<any>(props.allClaimsArray);
    const [inputReset, setInputReset] = useState(props.reset);
    const [selectedData, setSelectedData] = useState<any>({
        id: 0,
        claimType: null,
        claimValue: "",
        roleId: props.id,
        valueTypeAsString: "",
    });
    const { tableHeaders = [] } = props;
    const [tableData, setTableData] = useState<any>(Array.isArray(props.claimsTable) ? props.claimsTable : []);
    const [uniqueIdCounter, setUniqueIdCounter] = useState(0);
    const [dropdownKey, setDropdownKey] = useState(0);

    const handleAddItem = () => {
        const newTempData = {
            id: uniqueIdCounter,
            claimType: selectedData.claimType.label,
            claimValue: selectedData.claimValue,
            roleId: props.id,
            valueTypeAsString: selectedData.claimType.value,
        };
    
        setTableData((prev: any) => [...prev, newTempData]);
        setUniqueIdCounter(uniqueIdCounter + 1);

    
        if (props.getEditClaimData) {
            props.getEditClaimData(newTempData);
        }

        setSelectedData({
            id: 0,
            claimType:null,
            claimValue: "",
            roleId: props.id,
            valueTypeAsString: "",
        });
        setDropdownKey((prevKey) => prevKey + 1);
        setInputReset(true);
    };

    const handleDeleteItem = (id: number) => {
        console.log('Deleting item with id:', id);
        setTableData((prev: any) => prev.filter((item: any) => item.id !== id));
    };

    useEffect(() => {
        setAllClaimsArray(props.allClaimsArray);
    }, [props.allClaimsArray]);

    useEffect(() => {
        setInputReset(props.reset);
    }, [props.reset]);

    const tableActions = [
        {
            id: "delete", 
            displayName: "Delete",
            onClick: (row: any) => handleDeleteItem(row.id),
        },
    ];

    return (
        <>
            <div className="form">
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <RdsSelectList
                            key={dropdownKey}
                            id="claim"                            
                            label="Claim Types"
                            placeholder="Select Claim Type"
                            selectItems={allClaimsArray}
                            selectedValue={selectedData.claimType}
                            onChange={(item: any) => {
                                setSelectedData({ ...selectedData, claimType: item });
                            }}
                            dataTestId="select"
                            color="primary"
                        ></RdsSelectList>
                    </div>

                    <div className="col-md-5">
                        <RdsInput
                           required={true}                           
                            label={true}
                            reset={inputReset}
                            placeholder="Enter Value"
                            name="Value"
                            value={selectedData.claimValue}
                            onChange={(event) =>
                                setSelectedData({
                                    ...selectedData,
                                    claimValue: event.target.value,
                                })
                            }
                            dataTestId="value"
                        ></RdsInput>
                    </div>

                    <div className="col-md-2 mt-xxl-1 mt-xl-2 mt-lg-2 mt-md-2 ps-xxl-1 ps-xl-2 ps-lg-2 ps-md-1 pt-xxl-4 pt-xl-4 pt-lg-4 pt-md-4 mt-2">
                        <RdsButton
                            type={"button"}
                            label=""
                            icon="plus"
                            iconHeight="15px"
                            onClick={handleAddItem}
                            class="text-start"
                            isDisabled={!selectedData.claimValue}
                            iconColorVariant="dark"
                            colorVariant="primary"
                            size="medium"
                            dataTestId="add"
                        ></RdsButton>
                    </div>
                </div>

                <div className="row mt-3">
                    <RdsCompDatatable
                     key={tableData.length} 
                        actionPosition={ActionPosition.Right}
                        tableHeaders={props.tableHeaders || []}
                        tableData={tableData || []}
                        pagination={true}
                        recordsPerPage={5}
                        actions={tableActions}  
                        recordsPerPageSelectListOption={true}
                        onActionSelection={props.onActionSelection}
                    ></RdsCompDatatable>
                </div>
            </div>
        </>
    );
};

export default RdsCompClaims;
