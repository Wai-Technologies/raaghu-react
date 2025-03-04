import React from "react";
import { RdsButton } from "../rds-elements";
import { useTranslation } from "react-i18next";
import RdsCompDatatable from "../rds-comp-data-table";
import RdsCompSubscription from "../rds-comp-subscription";
import './rds-comp-billing.css';
import { ActionPosition } from "../rds-comp-data-table/rds-comp-data-table";

export interface RdsCompBillingProp {
    subscriptionData: any[];
    billingData: any[];
    billingHeaders: any;
    actions: any;
    onActionSelection(arg: any): any;
}

const RdsCompBilling = (props: RdsCompBillingProp) => {
    return (
        <>
            <div className="p-4">
                <div>
                    <RdsCompSubscription subscriptionData={props.subscriptionData} />
                    <hr></hr>
                </div>

                <div className="mt-3">
                    <div className="row align-items-center">
                        <div className="col">
                            <h4>Billing History</h4>
                        </div>
                        <div className="col-auto">
                            <RdsButton
                                label="Download All"
                                colorVariant="primary"
                                block={false}
                                tooltipTitle={""}
                                type="submit"
                                dataTestId="download-all"
                            />
                        </div>
                    </div>
                    <p>Check your billing history.</p>
                    <div>
                        <RdsCompDatatable
                            actionPosition={ActionPosition.Right}
                            tableHeaders={props.billingHeaders}
                            actions={props.actions}
                            tableData={props.billingData}
                            pagination={false}
                            onActionSelection={props.onActionSelection}
                        ></RdsCompDatatable>
                    </div>
                </div>
            </div>
        </>
    );
};
export default RdsCompBilling;
