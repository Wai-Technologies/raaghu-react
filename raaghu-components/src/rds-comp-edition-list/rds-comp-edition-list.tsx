import React from "react";
import RdsCompDatatable, { ActionPosition } from "../rds-comp-data-table/rds-comp-data-table";
export interface RdsCompEditionListProps {
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
    enablecheckboxselection?: boolean;
    isEndUserEditing?: boolean;
  }[];
  actions: {
    displayName: string;
    id: string;
  }[];
  tableData: any[];
  pagination: boolean;
  recordsPerPage?: number;
  recordsPerPageSelectListOption?: boolean;
  onActionSelection(arg: any): void;
  onNewTenantClick(
    event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ): void;
}
const RdsCompEditionList = (props: RdsCompEditionListProps) => {
  return (
    <div className="row">
      <RdsCompDatatable
        actionPosition={ActionPosition.Right}
        enablecheckboxselection={props.enablecheckboxselection}
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
export default RdsCompEditionList;
