import React from "react";
import RdsCompDatatable from "../rds-comp-data-table";
import './rds-comp-blog-post.css';
import { ActionPosition } from "../rds-comp-data-table/rds-comp-data-table";

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
        <div className="bloglist"><RdsCompDatatable
      actionPosition={ActionPosition.Right}
      tableHeaders={props.tableHeaders}
      actions={props.actions}
      noDataheaderTitle="No Records Available"
      noDataTitle="Click on the button to add"
      illustration={true}
      tableData={props.tableData!}
      pagination={props.pagination!}
      recordsPerPage={props.recordsPerPage}
    ></RdsCompDatatable></div>
  );
};
export default RdsCompBlogPost;
