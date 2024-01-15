import React from "react";
import RdsCompIdentityManagement from "../../rds-comp-identity-management-new/rds-comp-identity-management-new";

export const code_actual = () => {
    return (
        <RdsCompIdentityManagement
            handleIdentity={() => {}}
            lockoutSettings={{
                allowedForNewUsers: false,
                lockoutDuration: 10,
                maxFailedAccessAttempts: "",
            }}
            passwordSettings={{
                requiredLength: "",
                requiredUniqueChars: "",
                requireDigit: false,
                requireNonAlphanumeric: false,
                requireUppercase: false,
                requireLowercase: false,
            }}
            signSettings={{
                requireConfirmedEmail: false,
                requireConfirmedPhoneNumber: false,
                enablePhoneNumberConfirmation: false,
            }}
            userSettings={{
                isEmailUpdateEnabled: false,
                isUserNameUpdateEnabled: false,
            }}
        />
    );
};

export default code_actual;
