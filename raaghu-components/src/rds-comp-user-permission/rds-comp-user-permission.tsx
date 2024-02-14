import React from "react";
import RdsCompDatatable from "../rds-comp-data-table";
import { RdsButton } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompUserPermissionProps {
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
  pagination?: boolean;
  onActionSelection(arg: any): any;
  enablecheckboxselection?: boolean;
}

const RdsCompUserPermission = (props: RdsCompUserPermissionProps) => {


  return (
    <div>
      <div className="d-flex justify-content-end">
        <RdsButton
          type={"button"}
          colorVariant="primary"
          label="New User"
          icon="plus"
          iconFill={false}
          iconHeight="12px"
          iconStroke={true}
          iconWidth="12px"
          iconColorVariant="light"
        />
      </div>

      <RdsCompDatatable
        actionPosition="right"
        tableHeaders={props.tableHeaders}
        actions={props.actions}
        tableData={props.tableData}
        pagination={false}
        classes="table"
        onActionSelection={props.onActionSelection}
        enablecheckboxselection={props.enablecheckboxselection}
      ></RdsCompDatatable>
    </div>
  );
};

export default RdsCompUserPermission;
