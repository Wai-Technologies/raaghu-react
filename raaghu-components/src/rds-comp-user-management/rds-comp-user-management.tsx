import React from "react";
import { RdsCheckbox } from "../rds-elements";
export interface RdsCompUserManagementProps {
    Usermanagementsettings: any;
}
const RdsCompUserManagement = (props: RdsCompUserManagementProps) => {
    return (
        <>
            <div className="fw-normal mt-4">
                <div className="py-1">
                    <RdsCheckbox
                        isDisabled={false}
                        label="Email Confirmation Required For Login."
                        checked={false}
                        withlabel={true}
                        isSwitch={false}
                        dataTestId="email-confirmation"
                    />
                </div>
                <div className="py-1">
                    <RdsCheckbox
                        isDisabled={false}
                        label="Phone Number Verification Enabled (Via SMS)."
                        checked={false}
                        withlabel={true}
                        isSwitch={false}
                        dataTestId="phone-number-verification"
                    />
                </div>
                <div className="py-1">
                    <RdsCheckbox
                        isDisabled={false}
                        label="Use Security Image Question (Captcha) On Login."
                        checked={false}
                        withlabel={true}
                        isSwitch={false}
                        dataTestId="security-image-quest"
                    />
                </div>
                <label className="mt-3 fw-medium">Cookie Consent</label>
                <div className="py-1">
                    <RdsCheckbox
                        isDisabled={false}
                        label="Cookie Consent Enabled"
                        checked={false}
                        withlabel={true}
                        isSwitch={false}
                        dataTestId="cookie-consent-enable"
                    />
                </div>
                <label className="mt-3 fw-medium">Session Timeout Control</label>
                <div className="py-1">
                    <RdsCheckbox
                        isDisabled={false}
                        label="Session Time Out Control Enabled"
                        checked={false}
                        withlabel={true}
                        isSwitch={false}
                        dataTestId="session-time-out-control"
                    />
                </div>
                <label className="mt-3 fw-medium">Profile</label>
                <div className="py-1">
                    <RdsCheckbox
                        isDisabled={false}
                        label="Allow Using to use Gravatar Profile Picture"
                        checked={false}
                        withlabel={true}
                        isSwitch={false}
                        dataTestId="gravatar-profile-picture"
                    />
                </div>
            </div>
        </>
    );
};
export default RdsCompUserManagement;
