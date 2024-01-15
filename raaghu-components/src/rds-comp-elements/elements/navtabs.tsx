import React from "react";
import { RdsNavtabs } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsNavtabs
            navtabsItems={[
                {
                    label: "Active",
                    tablink: "#nav-home",
                    ariacontrols: "nav-home",
                    subText: "Active subtext",
                    id: "active",
                },
                {
                    label: "Link",
                    tablink: "#nav-profile",
                    ariacontrols: "nav-profile",
                    id: "home",
                },
                {
                    label: "Link",
                    tablink: "#nav-contact",
                    ariacontrols: "nav-contact",
                    subText: "Home subtext",
                    id: "about",
                },
                {
                    label: "Disabled",
                    tablink: "#nav-deabled",
                    disabled: true,
                    subText: "Disble subtext",
                    id: "disabled",
                },
            ]}
            type="default"
        />
    );
};

export default code_actual;
