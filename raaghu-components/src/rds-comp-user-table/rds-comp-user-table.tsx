import React from "react";
import RdsCompDatatable from "../rds-comp-data-table";
import "./rds-comp-user-table.css";
import { ActionPosition } from "../rds-comp-data-table/rds-comp-data-table";

interface RdsCompUserTableProps {
  tableHeaders: {
    displayName: string;
    key: string;
    datatype: string;
    dataLength?: number | undefined;
    required?: boolean | undefined;
    sortable?: boolean | undefined;
    colWidth?: string | undefined;
    disabled?: boolean | undefined;
    isEndUserEditing?: boolean | undefined;
  }[];
  tableData: {}[];
  actions: {
    displayName: string;
    id: string;
  }[];
  pagination: boolean;
  recordsPerPage: number;
  recordsPerPageSelectListOption: boolean;
  onActionSelection(arg: any): any;
}

const RdsCompUserTable = (props: RdsCompUserTableProps) => {
  return (
    <div>
      <RdsCompDatatable
        actionPosition={ActionPosition.Right}
        classes="table__userTable"
        tableHeaders={props.tableHeaders}
        actions={props.actions}
        tableData={props.tableData}
        pagination={props.pagination}
        recordsPerPage={props.recordsPerPage}
        onActionSelection={props.onActionSelection}
        recordsPerPageSelectListOption={props.recordsPerPageSelectListOption}
      ></RdsCompDatatable>
    </div>
  );
};

export default RdsCompUserTable;
