import React from "react";
import { RdsInput, RdsButton } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompSecretsProps { }

const RdsCompSecrets = (props: RdsCompSecretsProps) => {


    return (
        <>
            <div className="secrets">
                <div className="custom-content-scroll">
                    <div className="row mt-3">
                        <div className="col-md-4 mb-3 form-group">
                            <RdsInput
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
                            colorVariant="primary"
                            label="Add"
                            type="button"
                            dataTestId="add"
                        ></RdsButton>
                    </div>
                </div>
                <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                    <div className="d-flex">
                        <div className="m-2">
                            <RdsButton
                                size="small"
                                isOutline={true}
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
