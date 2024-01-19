import React from "react";
import RdsCompThemeNew from "../../rds-comp-theme-new/rds-comp-theme-new";

export const code_actual = () => {
    return (
        <RdsCompThemeNew
            StyleList={[{ option: "Style 1" }, { option: "Style 2" }]}
            WebList={[{ option: "Public 1" }, { option: "Public 2" }]}
            MenuList={[{ option: "Placement 1" }, { option: "Placement 2" }]}
            StatusList={[{ option: "Status 1" }, { option: "Status 2" }]}
        />
    );
};

export default code_actual;
