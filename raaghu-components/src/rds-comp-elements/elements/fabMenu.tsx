import React from "react";
import { RdsFabMenu } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsFabMenu
            colorVariant="primary"
            listItems = {[
                { value: "New Role", some: "value", key: "new", icon: "users", iconWidth: "20px", iconHeight: "20px" },
                { value: "Refresh", some: "value", key: "refresh", icon: "refresh", iconWidth: "20px", iconHeight: "20px" },
                { value: "Export to excel", some: "value", key: "export", icon: "export", iconWidth: "20px", iconHeight: "20px" },
                { value: "Delete", some: "value", key: "delete", icon: "delete", iconWidth: "20px", iconHeight: "20px" },
                { value: "Click here download sample import file.", some: "value", key: "download", icon: "download", iconWidth: "20px", iconHeight: "20px" },
            ]}
        />
    );
};

export default code_actual;
