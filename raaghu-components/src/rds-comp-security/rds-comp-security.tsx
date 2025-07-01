import React, { useState, useEffect } from "react";
import {
    RdsInput,
    RdsCheckbox,
    RdsCounter,
} from "../rds-elements";
import RdsDatatable from "../../../raaghu-elements/src/rds-data-table";
import { ActionPosition } from "../../../raaghu-elements/src/rds-data-table/rds-data-table";

export interface RdsCompSecurityProps {
    checkgroupList: any[];
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
    security?: string;
}

const RdsCompSecurity = (props: RdsCompSecurityProps) => {
    const [isDefaultChecked, setIsDefaultChecked] = useState(false);

    const handleChildCheck = (isChecked: boolean) => {
        if (isChecked) {
            setIsDefaultChecked(true);
        }
    };

    useEffect(() => {
        if (Array.isArray(props.checkgroupList)) {
            props.checkgroupList.forEach((item: any) => {
                item.onCheck = handleChildCheck;
            });
        }
    }, [props.checkgroupList]);

    return (
        <>
            {props.security === "default" && (
                <div className="mt-2 ms-3">
                    <div>
                        <label className="mb-2 fw-medium">Password Complexity </label>
                        <div className="fw-normal">
                            <RdsCheckbox labelText="Use Default Settings" checked={isDefaultChecked} />
                            <div className="m-3 ">
                                {props.checkgroupList.map((item, index) => (
                                    <RdsCheckbox key={index} labelText={item.label} checked={item.checked} onChange={() => { item.onCheck?.(!item.checked); item.checked = !item.checked; }} />
                                ))}
                            </div>
                        </div>
                        <div className="mb-2 fw-normal mt-2">
                            <RdsCounter
                                counterValue={0}
                                label=""
                                min={0}
                                max={50}
                                width={180}
                                type="Default"
                                colorVariant="primary"
                            />
                        </div>
                        <label className="mt-2 mb-2 fw-medium">User Lock Out</label>
                        <div className="fw-normal">
                            <RdsCheckbox
                                labelText="Enable user Account Locking On Failed Login Attempts"
                                checked={false}
                            />
                        </div>
                    </div>
                    <div className="mb-2 fw-normal mt-2">
                        <RdsCounter
                            counterValue={0}
                            label="Maximum Number Of failed Login Attempt Count Before Locking The Account"
                            min={0}
                            max={50}
                            width={180}
                            type="Default"
                            colorVariant="primary"
                        />
                    </div>

                    <div className="mb-3 fw-normal mt-2 col-5">
                        <RdsInput
                            name="Account Locking Duration(as seconds)"
                            label={true}
                            inputType="number"
                            placeholder="Enter a Value"
                        />
                    </div>

                    <label className="mt-2 fw-medium">Two Factor Login </label>
                    <div className="fw-normal py-2">
                        <RdsCheckbox labelText="Enable Two Factor Login" checked={false} />
                    </div>
                    <label className="mt-2 fw-medium">Only One Concurrent Login per user</label>
                    <div className="fw-normal py-2">
                        <RdsCheckbox
                            labelText="Disable Concurrent Login For A User. If A User Logins With A Second Device, The First Session Is Automatically Closed."
                            checked={false}
                        />
                    </div>
                </div>
            )}
            {props.security === "logs" && (
                <div className="card p-2 border-0 rounded-0 card-full-stretch">
                    <RdsDatatable
                        actionPosition={ActionPosition.Right}
                        tableHeaders={props.tableHeaders}
                        actions={props.actions}
                        tableData={props.tableData || []}
                        pagination={props.pagination || false}
                        recordsPerPage={props.recordsPerPage}
                        recordsPerPageSelectListOption={props.recordsPerPageSelectListOption}
                    />
                </div>
            )}
        </>
    );
};

export default RdsCompSecurity;