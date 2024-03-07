import React, { useEffect, useState } from "react";
import RdsCompDatatable from "../rds-comp-data-table";
import { RdsDatePicker, RdsIllustration } from "../rds-elements";
import "./rds-comp-login-attempts.css";

export interface RdsCompLoginAttemptsProps {
    Data?: any[];
    tableHeaders?: {
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

    tableData?: {}[];
    selectvalue?: { value: string; displayText: string }[];

    pagination?: boolean;
    onActionSelection(arg: any): any;
}

const RdsCompLoginAttempts = (props: RdsCompLoginAttemptsProps) => {
    const [Tdata, setTdata] = useState(props.tableData);
    const [page, setpage] = useState(false);

    useEffect(() => {
        if (props.tableData?.length === 0) {
            setpage(true);
        } else {
            setpage(false);
        }
    }, [Tdata]);

    const DatePicker = (start: any, end?: any) => {
        const tempData = props.tableData?.filter((data: any) => {
            if (data.time > start.toISOString() && data.time < end!.toISOString()) {
                return data;
            }
        });
        setTdata(tempData);
    };

    const selecthandler = (event: any) => {
        if (event.target.value === "All") {
            setTdata(props.tableData);
        } else {
            const tempData = props.tableData?.filter((data: any) => {
                if (data.result === event.target.value) {
                    return data;
                }
            });
            setTdata(tempData);
        }
    };

    useEffect(() => { }, [Tdata]);
    return (
        <div className="body">
            <div className="define  ">
                <div>
                    <RdsDatePicker
                        type="advanced"
                        DatePickerLabel={"Select Date Range"}
                        onDatePicker={DatePicker} isDropdownOpen={false}></RdsDatePicker>
                </div>

                <div className="Select">
                    <div>Result</div>
                    <div>
                        <select
                            disabled={page}
                            onClick={selecthandler}
                            className="form-select form-select-md"
                        >
                            {props.selectvalue?.map((x, i) => (
                                <option key={x.displayText}>{x.value}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {page && (
                <div>
                    <RdsIllustration
                        subLabel="Currently you do not have any data "
                        colorVariant="light"
                    ></RdsIllustration>
                </div>
            )}

            {!page && (
                <div className="table">
                    <RdsCompDatatable
                        actionPosition="right"
                        tableHeaders={props.tableHeaders || []} // Add default value for tableHeaders prop
                        tableData={Tdata || []} // Add default value for Tdata prop
                        pagination={false}
                        onActionSelection={props.onActionSelection}
                        actions={[]}
                    ></RdsCompDatatable>
                </div>
            )}
        </div>
    );
};

export default RdsCompLoginAttempts;
