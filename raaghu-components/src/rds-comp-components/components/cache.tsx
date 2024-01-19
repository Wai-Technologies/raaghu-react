import React from "react";
import RdsCompCache from "../../rds-comp-cache/rds-comp-cache";

export const code_actual = () => {
    return (
        <RdsCompCache cachedata={[
            { name: "AbpUserSettingsCache", id: 1 },
            { name: "AbpZeroRolePermissions", id: 2 },
            { name: "AbpZeroTenantCache", id: 3 },
            { name: "AbpZeroEditionFeatures", id: 4 },
            { name: "AbpTenantSettingsCache", id: 5 }
        ]} recordsperpage ={10}></RdsCompCache>
    );
};

export default code_actual;
