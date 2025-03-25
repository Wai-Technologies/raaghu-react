import React, { useEffect, useState } from "react";
import { RdsButton, RdsInput, RdsTextArea } from "../rds-elements";

export interface RdsCompInvoiceProps {
    leagalName: string;
    address: string;
 }

const RdsCompInvoice = (props: RdsCompInvoiceProps) => {
    const [inputReset, setInputReset] = useState(false);
    const [invoiceData, setInvoiceData] = useState<RdsCompInvoiceProps>({
        leagalName: "",
        address: "",
    });

    useEffect(() => {
        setInvoiceData({
            leagalName: props.leagalName,
            address: props.address,
        });
    }, [props]);

    const handleDataChanges = (value: string, key: string) => {
        setInvoiceData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const setAddress = (value: string) => {
        setInvoiceData((prev) => ({
            ...prev,
            address: value,
        }));
    };

    const emitSaveData = (e: any) => {
        e.preventDefault();
        setInputReset(true);
        setInvoiceData({
            leagalName: "",
            address: "",
        })
    }

    return (
        <>
            <div>
                <h5 className="mb-3">Invoice Information</h5>
                <div className="mb-3">
                    <RdsInput
                        required={true}
                        inputType="text"
                        placeholder="Enter Name"
                        name="Leagal Name"
                        label={true}
                        value={invoiceData.leagalName}
                        onChange={(e: any) => handleDataChanges(e.target.value, "leagalName")}
                        id="leagalName"
                        reset={inputReset}
                    ></RdsInput>
                </div>
                <div className="mb-3">
                    <RdsTextArea
                        label="Address"
                        placeholder="Enter Address"
                        onChange={e => setAddress(e.target.value)}
                        value={invoiceData.address}
                        rows={4}
                        dataTestId="address"
                    />
                </div>
            </div>
            <div className="d-flex flex-column-reverse ps-3 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
                <RdsButton
                    class="me-2"
                    tooltipTitle={""}
                    type={"button"}
                    label="Cancel"
                    colorVariant="outline-primary"
                    size="small"
                    databsdismiss="offcanvas"
                    dataTestId="cancel"
                ></RdsButton>
                <RdsButton
                    class="me-2"
                    label="Save"
                    size="small"
                    colorVariant="primary"
                    tooltipTitle={""}
                    type={"submit"}
                    databsdismiss="offcanvas"
                    onClick={(e: any) => emitSaveData(e)}
                    dataTestId="save"
                ></RdsButton>
            </div>
        </>
    );
};

export default RdsCompInvoice;
