import React from "react";
import "./rds-comp-shipping-address.css";
import { RdsLabel, RdsInput, RdsSelectList, RdsButton } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompShippingAddressProps {
    countryList: { option: any, value: any }[];
}

const RdsCompShippingAddress = (props: RdsCompShippingAddressProps) => {
    return (
        <>
            <div>
                <p className="heading">Shipping Address</p>
                <div className="row mt-3">
                    <div className="col-md-6 sm-p-0">
                        <div className="form-group">
                            <RdsInput
                                label="First Name"
                                inputType="text"
                                isDisabled={false}
                                readonly={false}
                                placeholder="Enter a value"
                                required={true}
                            ></RdsInput>
                        </div>
                    </div>
                    <div className="col-md-6 sm-p-0">
                        <div className="form-group">
                            <RdsInput
                                label="Last Name"
                                inputType="text"
                                isDisabled={false}
                                readonly={false}
                                placeholder="Enter a value"
                                required={true}
                            ></RdsInput>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-6 sm-p-0">
                        <div className="form-group">
                            <RdsInput
                                label="Company"
                                inputType="text"
                                isDisabled={false}
                                readonly={false}
                                placeholder="Enter a value"
                                required={true}
                            ></RdsInput>
                        </div>
                    </div>
                    <div className="col-md-6 sm-p-0">
                        <div className="form-group">
                            <RdsInput
                                label="Phone"
                                inputType="text"
                                isDisabled={false}
                                readonly={false}
                                placeholder="Enter a value"
                                required={true}
                            ></RdsInput>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="form-group">
                        <RdsInput
                            label="Address"
                            inputType="text"
                            isDisabled={false}
                            readonly={false}
                            placeholder="Enter a value"
                            required={true}
                        ></RdsInput>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-6 sm-p-0">
                        <div className="form-group">
                            <RdsInput
                                label="City"
                                inputType="text"
                                isDisabled={false}
                                readonly={false}
                                placeholder="Enter a value"
                                required={true}
                            ></RdsInput>
                        </div>
                    </div>
                    <div className="col-md-6 sm-p-0">
                        <div className="form-group">
                            <RdsSelectList
                                id="seleCon"
                                label="Country"
                                selectItems={props.countryList}
                            ></RdsSelectList>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-6 sm-p-0">
                        <div className="form-group">
                            <RdsInput
                                label="State/Province"
                                inputType="text"
                                isDisabled={false}
                                readonly={false}
                                placeholder="Enter a value"
                                required={true}
                            ></RdsInput>
                        </div>
                    </div>
                    <div className="col-md-6 sm-p-0">
                        <div className="form-group">
                            <RdsInput
                                label="Postal Code"
                                inputType="text"
                                isDisabled={false}
                                readonly={false}
                                placeholder="Enter a value"
                                required={true}
                            ></RdsInput>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-md-6 sm-p-0">
                        <RdsButton
                            type="button"
                            label="Back"
                            block={true}
                            isOutline={true}
                            colorVariant="primary"
                            size="small"
                        ></RdsButton>
                    </div>
                    <div className="col-md-6 sm-p-0">
                        <RdsButton
                            type="button"
                            label="Save"
                            block={true}
                            isOutline={false}
                            colorVariant="primary"
                            size="small"
                        ></RdsButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RdsCompShippingAddress;
