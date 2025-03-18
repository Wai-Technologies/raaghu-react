import React from "react";
import { RdsLabel, RdsCheckbox, RdsDropdownList } from "../rds-elements";
import "./rds-comp-tenant-management.css";

export interface RdsCompTenantManagementProps {
    settingsTenantEditionList: any[];
    allowSelfRegistration: boolean;
    useCaptchaOnRegistration: boolean;
    isNewRegisteredTenantActiveByDefault: boolean;
}
const RdsCompTenantManagement = (props: RdsCompTenantManagementProps) => {
    const dropdownListItems = [
        {
            label: "Standard",
            val: "en",
        },
        {
            label: "Basic",
            val: "en",
        },
        {
            label: "Premium",
            val: "en",
        },
        {
            label: "Professional",
            val: "en",
        },
    ];
    return (
        <div className="mt-4" >
            <div className="fw-medium" >
                <RdsLabel label="Form-Based Registration" />
            </div>
            <div className="form-group py-2 fw-medium">
                <RdsCheckbox
                    isDisabled={false}
                    labelText="Allow Tenants To Register To The System."
                    checked={props.allowSelfRegistration}
                    showText={true}
                    isSwitch={false}
                />
                <h6 className="sub-text pt-2">
                    If You Disable This, Tenants Will Only Be Added By Admin Using
                    Tenant Management Page
                </h6>
            </div>
            <div className="form-group py-2 fw-medium">
                <RdsCheckbox
                    isDisabled={false}
                    labelText="New Registered Tenants Are Active By Default."
                    checked={props.isNewRegisteredTenantActiveByDefault}
                    showText={true}
                    isSwitch={false}
                />
                <h6 className="sub-text pt-2">
                    If You Disable This, New Tenants Will Not Be Active (And Can Not
                    Login) Until Admin Manually Activates The Account
                </h6>
            </div>

            <div className="form-group py-2 fw-medium">
                <RdsCheckbox
                    isDisabled={false}
                    labelText="Use Security Image Question (Captcha) On Registration."
                    checked={props.useCaptchaOnRegistration}
                    showText={true}
                    isSwitch={false}
                />
            </div>

            <div className="row py-2">
                <div className="col-md-5">
                    <label >Edition</label>
                    <div className="form-group my-2">
                        <RdsDropdownList
                            borderDropdown={true}
                            placeholder='Select Edition'
                            isPlaceholder={true}
                            listItems={dropdownListItems}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};
export default RdsCompTenantManagement;
