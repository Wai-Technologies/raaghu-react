import React from "react";
import RdsCompAppDetail from "../../rds-comp-app-detail/rds-comp-app-detail";

export const code_actual = () => {
    return (
        <RdsCompAppDetail
            appDetailList={[
                {
                    id: 1,
                    iconHeight: "30px",
                    iconWidth: "30px",
                    iconFill: false,
                    iconColor: "dark",
                    iconStroke: true,
                    title: "Zapier",
                    subtitle: "Build custom automation and intefrations with app",
                    icon: "zapier",
                    route: "/home",
                    selected: true,
                },
                {
                    id: 2,
                    iconHeight: "30px",
                    iconWidth: "30px",
                    iconFill: false,
                    iconColor: "dark",
                    iconStroke: true,
                    title: "Zapier",
                    subtitle: "Build custom automation and intefrations with app",
                    icon: "zapier",
                    route: "/home",
                    selected: true,
                },
                {
                    id: 3,
                    iconHeight: "30px",
                    iconWidth: "30px",
                    iconFill: false,
                    iconColor: "dark",
                    iconStroke: true,
                    title: "Zapier",
                    subtitle: "Build custom automation and intefrations with app",
                    icon: "zapier",
                    route: "/home",
                    selected: true,
                },
            ]}
        />
    );
};

export default code_actual;
