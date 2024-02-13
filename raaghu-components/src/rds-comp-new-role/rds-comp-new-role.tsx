import React from "react";
import { RdsLabel, RdsInput, RdsCheckbox, RdsButton } from "../rds-elements";
export interface RdsCompNewRoleProps {
    roleData: any;
}

const RdsCompNewRole = (props: RdsCompNewRoleProps) => {

    return (
        <>
            <div>
                <form>
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="form-group mb-3">
                                <RdsLabel
                                    size="14px"
                                    label={props.roleData.displayName}
                                    class="form-label ms-1"
                                    children={<span className="text-danger"></span>}
                                ></RdsLabel>
                                <RdsInput
                                    size="small"
                                    inputType="text"
                                    isDisabled={false}
                                    readonly={false}
                                    placeholder={props.roleData.displayName}
                                    required={true}
                                ></RdsInput>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group ms-1">
                                <RdsCheckbox
                                    label="Default"
                                    checked={props.roleData.isDefault}
                                ></RdsCheckbox>
                                <div className="fw-normal opacity-50">
                                    <RdsLabel
                                        label="Assign to new users by default"
                                        size="14px"
                                    ></RdsLabel>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
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
                            ></RdsButton>
                        </div>
                        <div className="m-2">
                            <RdsButton
                                size="small"
                                isOutline={false}
                                tooltip={true}
                                tooltipPlacement="top"
                                tooltipTitle="Save Data"
                                colorVariant="primary"
                                label="Save"
                                data-bs-dismiss="offcanvas"
                                type="button"
                            ></RdsButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RdsCompNewRole;
