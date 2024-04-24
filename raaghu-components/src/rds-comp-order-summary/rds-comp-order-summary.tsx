import React from "react";
import { RdsButton, RdsLabel } from "../rds-elements";

export interface RdsCompOrderSummaryProps {
    isCheckout: boolean;
}

const RdsCompOrderSummary = (props: RdsCompOrderSummaryProps) => {
    return (
        <>
            <div className="custom-content-scroll">
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table id="table" className="w-100">
                                <thead className="thead-dark">
                                    <tr className="border-bottom">
                                        <td className="p-2">
                                            <b> Order summary</b>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-bottom">
                                        <td className="p-2">subtotal</td>
                                        <td className="p-2 text-end">$0.00</td>
                                    </tr>
                                    <tr className="border-bottom">
                                        <td className="p-2">Shipping estimate</td>
                                        <td className="p-2 text-end">$0.00</td>
                                    </tr>
                                    <tr className="border-bottom">
                                        <td className="p-2">Tax estimate</td>
                                        <td className="p-2 text-end">$0.00</td>
                                    </tr>
                                    <tr>
                                        <td className="p-2">
                                            <b>
                                                <RdsLabel label="Order Total"></RdsLabel>
                                            </b>
                                        </td>
                                        <td className="p-2 text-end">
                                            <span>
                                                <b>$0.00</b>
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {props.isCheckout && (
                <div className="d-flex flex-column-reverse flex-lg-row px-4 flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                    <RdsButton
                        type={"submit"}
                        label="Checkout"
                        size="small"
                        block={true}
                        colorVariant="primary"
                        class="ms-2 me-2"
                    ></RdsButton>
                </div>
            )}
        </>
    );
};

export default RdsCompOrderSummary;
