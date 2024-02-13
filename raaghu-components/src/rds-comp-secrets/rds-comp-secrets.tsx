import React from "react";
import { RdsInput, RdsButton } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompSecretsProps { }

const RdsCompSecrets = (props: RdsCompSecretsProps) => {


    return (
        <>
            <div className="secrets">
                <div>
                    <div className="row mt-3">
                        <div className="col-md-4 mb-3 form-group">
                            <RdsInput
                                size="small"
                                label="Type"
                                inputType="text"
                                isDisabled={false}
                                readonly={false}
                                placeholder="Enter Type"
                                required={true}
                                dataTestId="type"
                            ></RdsInput>
                        </div>
                        <div className="col-md-4 mb-3 form-group">
                            <RdsInput
                                size="small"
                                label="Value"
                                inputType="text"
                                isDisabled={false}
                                readonly={false}
                                placeholder="Enter Value"
                                required={true}
                                dataTestId="value"
                            ></RdsInput>
                        </div>
                        <div className="col-md-4 mb-3 form-group">
                            <RdsInput
                                size="small"
                                label="Expiration"
                                inputType="text"
                                isDisabled={false}
                                readonly={false}
                                placeholder="Enter a value"
                                required={true}
                                dataTestId="expiration"
                            ></RdsInput>
                        </div>
                    </div>
                    <div className="mb-3 form-group">
                        <RdsInput
                            size="small"
                            label="Description"
                            inputType="text"
                            isDisabled={false}
                            readonly={false}
                            placeholder="Enter Type"
                            required={true}
                            dataTestId="description"
                        ></RdsInput>
                    </div>
                    <div className="mt-3 mb-3">
                        <RdsButton
                            size="small"
                            tooltip={true}
                            tooltipPlacement="top"
                            tooltipTitle="Add Data"
                            colorVariant="primary"
                            label="Add"
                            type="button"
                            dataTestId="add"
                        ></RdsButton>
                    </div>
                </div>
                <div className="footer fixed-bottom ms-3 mb-3">
                    <div className="d-flex">
                        <div className="m-2">
                            <RdsButton
                                size="small"
                                isOutline={true}
                                tooltip={true}
                                tooltipPlacement="top"
                                tooltipTitle="Cancel"
                                colorVariant="primary"
                                label="Cancel"
                                data-bs-dismiss="offcanvas"
                                type="button"
                                dataTestId="cancel"
                            ></RdsButton>
                        </div>
                        <div className="m-2">
                            <RdsButton
                                size="small"
                                isOutline={false}
                                tooltip={true}
                                tooltipPlacement="top"
                                tooltipTitle="Create Data"
                                colorVariant="primary"
                                label="Create"
                                data-bs-dismiss="offcanvas"
                                type="button"
                                dataTestId="create"
                            ></RdsButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RdsCompSecrets;
