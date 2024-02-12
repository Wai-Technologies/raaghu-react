import React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <RdsCompDatatable
      actionPosition="right"
      tableHeaders={props.tableHeaders}
      actions={props.actions}
      noDataheaderTitle={t("No Records Available") || ""}
      noDataTitle={t("Click on the button to add") || ""}
      illustration={true}
      tableData={props.tableData!}
      pagination={props.pagination!}
      recordsPerPage={props.recordsPerPage}
    ></RdsCompDatatable>
  );
};
export default RdsCompBlogPost;
