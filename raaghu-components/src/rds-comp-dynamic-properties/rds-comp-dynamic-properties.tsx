import React from "react";
import RdsCompDatatable, { ActionPosition } from "../rds-comp-data-table/rds-comp-data-table";

export interface RdsCompDynamicPropertiesProp {
    propertyData: any[];
    propertyHeaders: any;
    actions: any;
    onActionSelection(arg: any): any;
}

const RdsCompDynamicProperties = (props: RdsCompDynamicPropertiesProp) => {
    return (
        <>
            <RdsCompDatatable
                actionPosition={ActionPosition.Right}
                tableHeaders={props.propertyHeaders}
                actions={props.actions}
                tableData={props.propertyData}
                pagination={true}
                recordsPerPage={10}
                onActionSelection={props.onActionSelection}
                recordsPerPageSelectListOption={true}
                classes="table"
            ></RdsCompDatatable>
        </>
    );
};
export default RdsCompDynamicProperties;
