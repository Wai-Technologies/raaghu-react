import React from "react";
import RdsCompDatatable, { ActionPosition } from "../rds-comp-data-table/rds-comp-data-table";

export interface RdsCompSecurityLogsProps {
  enablecheckboxselection?: boolean;
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
  recordsPerPageSelectListOption?: boolean;
}

const RdsCompSecurityLogs = (props: RdsCompSecurityLogsProps) => {
  return (

    <div className="card p-2 border-0 rounded-0 card-full-stretch">
      <RdsCompDatatable
        actionPosition={ActionPosition.Right}
        tableHeaders={props.tableHeaders}
        actions={props.actions}
        tableData={props.tableData!}
        pagination={props.pagination!}
        recordsPerPage={props.recordsPerPage}
        recordsPerPageSelectListOption={props.recordsPerPageSelectListOption}

      ></RdsCompDatatable>
    </div>

  );
};

export default RdsCompSecurityLogs;
