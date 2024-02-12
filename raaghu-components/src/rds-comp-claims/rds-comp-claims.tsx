import React, { useEffect, useState } from "react";
import RdsCompDatatable from "../rds-comp-data-table";
import {
    RdsButton,
    RdsInput,
    RdsSelectList,
} from "../rds-elements";
import "./rds-comp-claims.css";
import { useTranslation } from "react-i18next";

export interface RdsCompClaimsProps {
    allClaimsArray?: any[];
    claimsTable?: any[];
    id?: any;
    getEditClaimData?: any;
    tableHeaders?: any[];
    onActionSelection?: any;
    actions?: any;
}

export interface SelectedItem {
    type: string;
    value: string;
}

const RdsCompClaims = (props: RdsCompClaimsProps) => {
    const { t } = useTranslation();
    const [allClaimsArray, setAllClaimsArray] = useState<any>(props.allClaimsArray);
    const [selectedData, setSelectedData] = useState<any>({
        id: 0,
        claimType: "",
        claimValue: "",
        roleId: props.id,
        valueTypeAsString: "",

    });
    const { tableHeaders = [] } = props;
    const [tableData, setTableData] = useState<any>(props.claimsTable);
    const actions = [{ id: "delete", displayName: t("AbpUi.Delete") }];
    const [uniqueIdCounter, setUniqueIdCounter] = useState(0)
    const handleAddItem = () => {
        const savedClaims = props.claimsTable;
        let maxUniqueId = 0;

        savedClaims?.forEach((claim: any) => {
            if (claim.uniqueId > maxUniqueId) {
                maxUniqueId = claim.uniqueId;
            }
        })
        const newClaimId = uniqueIdCounter;
        let newTempData = allClaimsArray.filter((data: any) => (data.id == selectedData.claimType));


        newTempData = {
            uniqueId: newClaimId,
            id: newTempData[0].id,
            claimType: newTempData[0].option,
            claimValue: selectedData.claimValue,
            roleId: props.id,
        };

        setTableData((prev: any) => [...prev, newTempData]);
        setUniqueIdCounter(newClaimId + 1);
        props.getEditClaimData(newTempData);

    };
    useEffect(() => {
        setAllClaimsArray(props.allClaimsArray)
    })

    return (
        <>
            <div className="form">
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <RdsSelectList
                            id="abp.claim"
                            label={t("AbpIdentity.ClaimTypes") || ""}
                            placeholder={t("Select Claim Type") || ""}
                            selectItems={allClaimsArray}
                            selectedValue={selectedData.claimType}
                            onChange={(item: any) => {
                                setSelectedData({ ...selectedData, claimType: item.value });
                            }}
                            dataTestId="select"
                        ></RdsSelectList>
                    </div>

                    <div className="col-md-5">
                        <RdsInput
                            required={true}
                            label={t("AbpIdentity.ClaimValue") || ""}
                            placeholder={t("Enter Value") || ""}
                            name="value"
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

                    <div className="col-md-2 mt-xxl-1 mt-xl-1 mt-lg-1 mt-md-1 ps-xxl-1 ps-xl-1 ps-lg-1 ps-md-1 pt-xxl-4 pt-xl-4 pt-lg-4 pt-md-4">

                        <RdsButton
                            type={"button"}
                            label={t("") || ""}
                            icon="plus"
                            iconHeight="15px"
                            onClick={handleAddItem}
                            class="text-start"
                            isDisabled={selectedData.claimValue ? false : true}
                            iconColorVariant="dark"
                            colorVariant="primary"
                            size="medium"
                            dataTestId="add"
                        ></RdsButton>

                    </div>
                </div>

                <div className="row mt-3 ">
                    <RdsCompDatatable
                        actionPosition="right"
                        tableHeaders={props.tableHeaders || []}
                        tableData={props.claimsTable || []}
                        pagination={true}
                        recordsPerPage={10}
                        actions={props.actions}
                        recordsPerPageSelectListOption={true}
                        onActionSelection={props.onActionSelection}
                    ></RdsCompDatatable>

                </div>
            </div>
        </>
    );
};

export default RdsCompClaims;
