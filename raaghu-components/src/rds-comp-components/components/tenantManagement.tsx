import React from "react";
import RdsCompTenantManagement from "../../rds-comp-tenant-management/rds-comp-tenant-management";

export const code_actual = () => {
    return (
        <RdsCompTenantManagement
            settingsTenantEditionList={[
                { option: "one" },
                { option: "two" },
                { option: "three" },
            ]}
            allowSelfRegistration={false}
            isNewRegisteredTenantActiveByDefault={false}
            useCaptchaOnRegistration={false}
        />
    );
};

export default code_actual;
