import React from "react";
import { RdsNavbar } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsNavbar
            title="Navbar"
            size="small"
            navbarItems={[
                {
                    label: "Home",
                    isActive: true,
                    navclass: "",
                    href: "",
                },
                {
                    label: "Features",
                    isActive: false,
                    navclass: "",
                    href: "",
                },
                {
                    label: "Pricing",
                    isActive: false,
                    navclass: "",
                    href: "",
                },
            ]}
        />
    );
};

export default code_actual;
