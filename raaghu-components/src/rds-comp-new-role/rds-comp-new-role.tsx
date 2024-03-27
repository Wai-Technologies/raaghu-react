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
                    <div className="custom-content-scroll">
                        <div className="row">
                            <div className="col-md-12 ">
                                <div className="form-group mb-3">
                                    <RdsLabel
                                        size="14px"
                                        label={props.roleData.displayName}
                                        class="form-label"
                                        required={true}
                                    ></RdsLabel>
                                    <RdsInput
                                        size="small"
                                        inputType="text"
                                        isDisabled={false}
                                        readonly={false}
                                        placeholder={props.roleData.displayName}
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
                    </div>
                    <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
                        <RdsButton
                            size="small"
                            isOutline={true}
                            colorVariant="primary"
                            label="Cancel"
                            data-bs-dismiss="offcanvas"
                            type="button"
                        ></RdsButton>
                        <RdsButton
                            size="small"
                            isOutline={false}
                            colorVariant="primary"
                            label="Save"
                            data-bs-dismiss="offcanvas"
                            type="button"
                        ></RdsButton>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RdsCompNewRole;
