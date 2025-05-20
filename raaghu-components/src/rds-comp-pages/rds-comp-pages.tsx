import React from "react";
import RdsCompDatatable from "../rds-comp-data-table";
import { ActionPosition } from "../rds-comp-data-table/rds-comp-data-table";

export interface RdsCompPagesProps {
    tableHeaders: {
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
    actions?: {
        displayName: string;
        id: string;
    }[];
    tableData?: any[];
    pagination?: boolean;
    recordsPerPage?: number;
    onActionSelection?(rowData: any, actionId: any): void;
}

const RdsCompPages = (props: RdsCompPagesProps) => {
    return (
        <RdsCompDatatable
            actionPosition={ActionPosition.Right}
            tableHeaders={props.tableHeaders}
            actions={props.actions}
            recordsPerPageSelectListOption={true}
            tableData={props.tableData!}
            pagination={props.pagination!}
            recordsPerPage={props.recordsPerPage}
            onActionSelection={props.onActionSelection!}
        ></RdsCompDatatable>

    );

};

export default RdsCompPages;
