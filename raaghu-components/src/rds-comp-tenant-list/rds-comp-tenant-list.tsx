import React from "react";
import RdsCompDatatable, { ActionPosition } from "../rds-comp-data-table/rds-comp-data-table";
import { useTranslation } from "react-i18next";
import "./rds-comp-tenant-list.css";
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
  onActionSelection?(rowData: any, actionId: any): void;
  onNewTenantClick?(
    event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ): void;
}
const RdsCompEditionList = (props: RdsCompEditionListProps) => {
  const { t } = useTranslation();
  return (
    <RdsCompDatatable
      actionPosition={ActionPosition.Right}
      tableHeaders={props.tableHeaders}
      actions={props.actions}
      tableData={props.tableData!}
      pagination={props.pagination!}
      recordsPerPage={props.recordsPerPage}
      onActionSelection={props.onActionSelection!}
      recordsPerPageSelectListOption={props.recordsPerPageSelectListOption}
      noDataheaderTitle="No Records Available"
      noDataTitle="Click on the button to add"

    ></RdsCompDatatable>
  );
};
export default RdsCompEditionList;
