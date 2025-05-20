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
                        labelText="Email Confirmation Required For Login."
                        checked={false}
                        showText={true}
                        isSwitch={false}
                        dataTestId="email-confirmation"
                    />
                </div>
                <div className="py-1">
                    <RdsCheckbox
                        isDisabled={false}
                        labelText="Phone Number Verification Enabled (Via SMS)."
                        checked={false}
                        showText={true}
                        isSwitch={false}
                        dataTestId="phone-number-verification"
                    />
                </div>
                <div className="py-1">
                    <RdsCheckbox
                        isDisabled={false}
                        labelText="Use Security Image Question (Captcha) On Login."
                        checked={false}
                        showText={true}
                        isSwitch={false}
                        dataTestId="security-image-quest"
                    />
                </div>
                <label className="mt-3 fw-medium">Cookie Consent</label>
                <div className="py-1">
                    <RdsCheckbox
                        isDisabled={false}
                        labelText="Cookie Consent Enabled"
                        checked={false}
                        showText={true}
                        isSwitch={false}
                        dataTestId="cookie-consent-enable"
                    />
                </div>
                <label className="mt-3 fw-medium">Session Timeout Control</label>
                <div className="py-1">
                    <RdsCheckbox
                        isDisabled={false}
                        labelText="Session Time Out Control Enabled"
                        checked={false}
                        showText={true}
                        isSwitch={false}
                        dataTestId="session-time-out-control"
                    />
                </div>
                <label className="mt-3 fw-medium">Profile</label>
                <div className="py-1">
                    <RdsCheckbox
                        isDisabled={false}
                        labelText="Allow Using to use Gravatar Profile Picture"
                        checked={false}
                        showText={true}
                        isSwitch={false}
                        dataTestId="gravatar-profile-picture"
                    />
                </div>
            </div>
        </>
    );
};
export default RdsCompUserManagement;
