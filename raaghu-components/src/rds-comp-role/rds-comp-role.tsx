import React, { useEffect, useState } from "react";
import { RdsLabel, RdsInput, RdsCheckbox, RdsButton } from "../rds-elements";
import { InputSize, LabelPosition } from "../../../raaghu-elements/src/rds-input/rds-input";

export interface RdsCompRoleProps {
    roleData: any;
    onSaveHandler?: (data: any) => void;
}

const RdsCompRole = (props: RdsCompRoleProps) => {
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
    const isRoleNameValid = (roleName: any) => {
        if (!roleName || roleName.length === 0) {
            return false;
        }
        return true;
    };
const isFormValid = isRoleNameValid(roleData?.displayName);
    return (
        <>
            <div>
                <form>
                    <div className="custom-content-scroll">
                        <div className="row">
                            <div className="col-md-12 mb-2">
                                <div className="form-group">  
                                    <RdsInput
                                        name="Role Name"
                                        label={true}
                                        size={InputSize.Medium}  
                                        inputType="text"
                                        isDisabled={false}
                                        readonly={false}
                                        value={roleData?.displayName}
                                        onChange={(e) => {
                                            handleDataChange(e.target.value, "displayName");
                                        }}
                                        placeholder="Enter Role Name"
                                        required={true}
                                    ></RdsInput>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <RdsCheckbox
                                        labelText="Default"
                                        checked={roleData?.isDefault}
                                        onChange={(e) => {
                                            handleDataChange(e.target.checked, "isDefault");
                                        }}
                                    ></RdsCheckbox>
                                    <div className="fw-normal opacity-50 mt-1">
                                        <RdsLabel
                                            label="Assign to new users by default"
                                            size="14px"
                                        ></RdsLabel>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column-reverse ps-4 flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3 p-4">
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
                            isDisabled={!isFormValid}
                            type="button"
                        ></RdsButton>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RdsCompRole;
