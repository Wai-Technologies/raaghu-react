import React from "react";
import { RdsBreadcrumb } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsBreadcrumb
            breadItems={[
                {
                    label: "Home",
                    id: 1,
                    route: "#",
                    disabled: false,
                    icon: "home",
                    iconFill: false,
                    iconstroke: true,
                    iconWidth: "15px",
                    iconHeight: "15px",
                    iconColor: "primary",
                    active: false,
                },
                {
                    label: "About",
                    id: 2,
                    route: "#",
                    disabled: false,
                    icon: "information",
                    iconFill: false,
                    iconstroke: true,
                    iconWidth: "15px",
                    iconHeight: "15px",
                    iconColor: "primary",
                    active: false,
                },
                {
                    label: "Contact",
                    id: 3,
                    active: false,
                    disabled: true,
                    icon: "phone",
                    iconFill: false,
                    iconstroke: true,
                    iconWidth: "15px",
                    iconHeight: "15px",
                    iconColor: "primary",
                },
            ]}
        />
    );
};

export default code_actual;
