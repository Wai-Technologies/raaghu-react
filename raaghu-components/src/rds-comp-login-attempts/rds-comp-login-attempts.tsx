import React, { useEffect, useState } from "react";
import RdsCompDatatable from "../rds-comp-data-table";
import { RdsDatePicker, RdsDropdownList, RdsIllustration, RdsLabel, RdsPagination, RdsSelectList } from "../rds-elements";
import "./rds-comp-login-attempts.css";
import { ActionPosition } from "../rds-comp-data-table/rds-comp-data-table";

export interface RdsCompLoginAttemptsProps {
    tableHeaders?: {
        displayName: string;
        key: string;
        datatype: string;
        dataLength?: number | undefined;
        required?: boolean | undefined;
        sortable?: boolean | undefined;
        children?: React.ReactNode;
        selectvalue?: { value: string; displayText: string }[];
        colWidth?: string | undefined;
        disabled?: boolean | undefined;
        isEndUserEditing?: boolean | undefined;
    }[];
    tableData?: {}[];
    selectvalue?: { value: string; displayText: string }[];
    pagination?: boolean;
    onActionSelection(arg: any): any;
    totalRecords?: number;
    recordsPerPage?: number;
    recordsPerPageSelectListOption?: boolean;
}

const RdsCompLoginAttempts = (props: RdsCompLoginAttemptsProps) => {
    const [Tdata, setTdata] = useState(props.tableData);
    const [page, setpage] = useState(false);

    const totalRecords = props.totalRecords || props.tableData?.length || 0;
    const tableData = props.tableData || [];
    const selectvalue = props.selectvalue || [];
    const onPageChangeHandler = (newPage: number) => { };
    useEffect(() => {
        if (props.tableData?.length === 0) {
            setpage(true);
        } else {
            setpage(false);
        }
    }, [Tdata]);

    useEffect(() => {
        if (props.tableData?.length === 0) {
            setpage(true);
        } else {
            setpage(false);
        }
    }, [Tdata]);

    const DatePicker = (start: any, end?: any) => {
        const tempData = tableData.filter((data: any) => {
            if (data.time > start.toISOString() && data.time < end!.toISOString()) {
                return data;
            }
        });
        setTdata(tempData);
    };

    const selecthandler = (event: any) => {
        if (event.target.value === "All") {
            setTdata(tableData);
        } else {
            const tempData = tableData.filter((data: any) => {
                if (data.result === event.target.value) {
                    return data;
                }
            });
            setTdata(tempData);
        }
    };


    return (
        <div>

            <div className="row mb-3 d-flex justify-content-between">

                <div className="col-md-4">
                <RdsLabel label="Select Date Range"></RdsLabel>
                    <RdsDatePicker
                        type="advanced"
                        DatePickerLabel={"Select Date Range"}
                        onDatePicker={DatePicker}
                        isDropdownOpen={false}
                    ></RdsDatePicker>
                </div>
                <div className="col-md-4">
                    <div className="Select">
                        <RdsLabel label="Result"></RdsLabel>
                        <RdsDropdownList
                            data-testid="Result"
                            placeholder="All"
                            borderDropdown={true}
                            listItems={selectvalue.map(item => ({
                                label: item.displayText,
                                val: item.value,
                            }))}
                            isPlaceholder={true}
                        />

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
                        actionPosition={ActionPosition.Right}
                        tableHeaders={props.tableHeaders || []}
                        tableData={Tdata || []}
                        pagination={true}
                        recordsPerPage={props.recordsPerPage || 5}
                        recordsPerPageSelectListOption={props.recordsPerPageSelectListOption || false}
                        onActionSelection={props.onActionSelection}
                        actions={[]}
                    ></RdsCompDatatable>
                </div>
            )}
        </div>
    );
};

export default RdsCompLoginAttempts;
