import React from "react";
import RdsDatatable, { ActionPosition } from "../../../raaghu-elements/src/rds-data-table/rds-data-table";

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
      <RdsDatatable
        actionPosition={ActionPosition.Right}
        tableHeaders={props.tableHeaders}
        actions={props.actions}
        tableData={props.tableData!}
        pagination={props.pagination!}
        recordsPerPage={props.recordsPerPage}
        recordsPerPageSelectListOption={props.recordsPerPageSelectListOption}

      ></RdsDatatable>
    </div>

  );
};

export default RdsCompSecurityLogs;
