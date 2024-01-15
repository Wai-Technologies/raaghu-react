
import React from "react";
import { RdsCompSecurityLogs } from "../../../rds-components";
import { useTranslation } from "react-i18next";

export interface RdsPageSecurityLogsProps {
    securityLogsTableHeaders: any;
    securityLogsTableData: any;
    securityLogsTablePagination: boolean
    securityLogsTableRecords: any
}

const SecurityLogs = (props: RdsPageSecurityLogsProps) => {
    return (
        <div className="container-fluid p-0 m-0 h-100">
            <div className="row">
                <div className="col-md-12">
                    <RdsCompSecurityLogs
                        tableHeaders={props.securityLogsTableHeaders}
                        tableData={props.securityLogsTableData}
                        pagination={true}
                        recordsPerPage={10}
                        recordsPerPageSelectListOption={true}
                    ></RdsCompSecurityLogs>
                </div>
            </div>
        </div>
    );
};

export default SecurityLogs;
