import React, { useEffect, useState } from "react";
import { RdsLabel, RdsInput, RdsCheckbox, RdsButton } from "../rds-elements";

export interface RdsCompNewRoleProps {
    roleData: any;
    onSaveHandler?: (data: any) => void;
}

const RdsCompNewRole = (props: RdsCompNewRoleProps) => {
    const [roleData, setRoleData] = useState(props.roleData);

    useEffect(() => {
        setRoleData(props.roleData);
    }, [props.roleData]);

    const handleDataChange = (value: any, key: string) => {
        setRoleData({ ...roleData, [key]: value });
    };

    function emitSaveData(event: any) {
        event.preventDefault();
        props.onSaveHandler && props.onSaveHandler(roleData);
        setRoleData({
            displayName: "",
            isDefault: false,
        });
    }

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
                                        label="Role Name"
                                        class="form-label"
                                        required={true}
                                    ></RdsLabel>
                                    <RdsInput
                                        size="medium"
                                        inputType="text"
                                        isDisabled={false}
                                        readonly={false}
                                        value={roleData?.displayName}
                                        onChange={(e) => {
                                            handleDataChange(e.target.value, "displayName");
                                        }}
                                        placeholder="Enter Role Name"
                                    ></RdsInput>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group ms-1">
                                    <RdsCheckbox
                                        label="Default"
                                        checked={roleData?.isDefault}
                                        onChange={(e) => {
                                            handleDataChange(e.target.checked, "isDefault");
                                        }}
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
                    <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
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
                            onClick={(e: any) => emitSaveData(e)}
                            type="button"
                        ></RdsButton>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RdsCompNewRole;
