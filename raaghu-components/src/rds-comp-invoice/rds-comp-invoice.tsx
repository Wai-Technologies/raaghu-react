import React from "react";
import { RdsInput, RdsTextArea } from "../rds-elements";

export interface RdsCompInvoiceProps { }

const RdsCompInvoice = (props: RdsCompInvoiceProps) => {
    return (
        <>
            <div>
                <h5 className="mb-3">Invoice Information</h5>
                <div className="mb-3">
                    <RdsInput label="Legal name" placeholder="Enter name" />
                </div>
                <div className="mb-3">
                    <RdsTextArea placeholder="Address" rows={4} label="Address" />
                </div>
            </div>
        </>
    );
};

export default RdsCompInvoice;
