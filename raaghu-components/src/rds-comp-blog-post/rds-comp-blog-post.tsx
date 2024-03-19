import React from "react";
import RdsCompDatatable from "../rds-comp-data-table";

interface RdsCompBlogPostProps {
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
}
const RdsCompBlogPost = (props: RdsCompBlogPostProps) => {
  return (
    <RdsCompDatatable
      actionPosition="right"
      tableHeaders={props.tableHeaders}
      actions={props.actions}
      noDataheaderTitle="No Records Available"
      noDataTitle="Click on the button to add"
      illustration={true}
      tableData={props.tableData!}
      pagination={props.pagination!}
      recordsPerPage={props.recordsPerPage}
    ></RdsCompDatatable>
  );
};
export default RdsCompBlogPost;
