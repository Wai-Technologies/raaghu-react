import React from "react";
import RdsCompTenantSettings from "../../rds-comp-tenant-settings/rds-comp-tenant-settings";

export const code_actual = () => {
    return (
        <RdsCompTenantSettings
            tenantSettingInfo={{}}
            isTenantInfoValid={false}
            showEditData={true}
        />
    );
};

export default code_actual;
