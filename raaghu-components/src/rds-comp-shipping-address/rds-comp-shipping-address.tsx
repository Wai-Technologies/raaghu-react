import React from "react";
import "./rds-comp-shipping-address.css";
import { RdsLabel, RdsInput, RdsSelectList, RdsButton } from "../rds-elements";
import { useTranslation } from "react-i18next";

export interface RdsCompShippingAddressProps {
    countryList: { option: any, value: any }[];
}

const RdsCompShippingAddress = (props: RdsCompShippingAddressProps) => {
    const { t } = useTranslation();
    return (
        <>
            <div>
                <p className="heading">Shipping Address</p>
                <div className="row mt-3">
                    <div className="col-md-6 sm-p-0">
                        <div className="form-group">
                            <RdsLabel
                                size="14px"
                                label="First Name"
                                class="form-label ms-1 inputLabel"
                                children={<span className="text-danger"></span>}
                            ></RdsLabel>
                            <RdsInput
                                size="small"
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
                            <RdsLabel
                                size="14px"
                                label="Last Name"
                                class="form-label ms-1"
                                children={<span className="text-danger"></span>}
                            ></RdsLabel>
                            <RdsInput
                                size="small"
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
                            <RdsLabel
                                size="14px"
                                label="Company"
                                class="form-label ms-1 inputLabel"
                            ></RdsLabel>
                            <RdsInput
                                size="small"
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
                            <RdsLabel
                                size="14px"

                                label="Phone"
                                class="form-label ms-1"
                                children={<span className="text-danger"></span>}
                            ></RdsLabel>
                            <RdsInput
                                size="small"
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
                        <RdsLabel
                            size="14px"

                            label="Address"
                            class="form-label ms-1"
                            children={<span className="text-danger"></span>}
                        ></RdsLabel>
                        <RdsInput
                            size="small"
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
                            <RdsLabel
                                size="14px"

                                label="City"
                                class="form-label ms-1 inputLabel"
                                children={<span className="text-danger"></span>}
                            ></RdsLabel>
                            <RdsInput
                                size="small"
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
                            <RdsLabel
                                size="14px"
                                label="Country"
                                class="form-label ms-1"
                                children={<span className="text-danger"></span>}
                            ></RdsLabel>
                            <RdsSelectList
                                id="seleCon"
                                label="Select Country"
                                selectItems={props.countryList}
                            ></RdsSelectList>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-6 sm-p-0">
                        <div className="form-group">
                            <RdsLabel
                                size="14px"

                                label="State/Province"
                                class="form-label ms-1 inputLabel"
                                children={<span className="text-danger"></span>}
                            ></RdsLabel>
                            <RdsInput
                                size="small"
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
                            <RdsLabel
                                size="14px"

                                label="Postal Code"
                                class="form-label ms-1"
                                children={<span className="text-danger"></span>}
                            ></RdsLabel>
                            <RdsInput
                                size="small"
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
                            label={t("Back") || ""}
                            block={true}
                            isOutline={true}
                            colorVariant="primary"
                            size="small"
                        ></RdsButton>
                    </div>
                    <div className="col-md-6 sm-p-0">
                        <RdsButton
                            type="button"
                            label={t("Save") || ""}
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
