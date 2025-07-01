import React from "react";
import RdsDatatable from "../../../raaghu-elements/src/rds-data-table";
import './rds-comp-blog-post.css';
import { ActionPosition } from "../../../raaghu-elements/src/rds-data-table/rds-data-table";

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
        <div className="bloglist"><RdsDatatable
      actionPosition={ActionPosition.Right}
      tableHeaders={props.tableHeaders}
      actions={props.actions}
      noDataheaderTitle="No Records Available"
      noDataTitle="Click on the button to add"
      illustration={true}
      tableData={props.tableData!}
      pagination={props.pagination!}
      recordsPerPage={props.recordsPerPage}
    ></RdsDatatable></div>
  );
};
export default RdsCompBlogPost;
