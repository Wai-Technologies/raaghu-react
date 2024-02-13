import React from "react";
import { RdsInput, RdsLabel, RdsButton } from "../rds-elements";

export interface RdsCompUserClaimsProps { }

const RdsCompUserClaim = (props: RdsCompUserClaimsProps) => {

    return (
        <>
            <div className="tab-content">
                <form>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <RdsLabel label="Type" class="mb-1" size="14px"></RdsLabel>
                                <RdsInput
                                    inputType="text"
                                    placeholder="Type"
                                    size="small"
                                    dataTestId="type"
                                ></RdsInput>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <RdsLabel label="Value" class="mb-1" size="14px"></RdsLabel>
                                <RdsInput
                                    inputType="text"
                                    placeholder="Value"
                                    size="small"
                                    dataTestId="value"
                                ></RdsInput>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="footer-buttons fixed-bottom pb-3 d-flex gap-2 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row">

                <RdsButton
                    type="button"
                    label="Cancel"
                    isOutline={true}
                    colorVariant="primary"
                    class="me-2 ms-4"
                    size="small"
                    dataTestId="cancel"
                ></RdsButton>
                <RdsButton
                    type="button"
                    label="Next"
                    colorVariant="primary"
                    class="save-btn"
                    size="small"
                    dataTestId="next"
                ></RdsButton>
            </div>
        </>
    );
};

export default RdsCompUserClaim;
