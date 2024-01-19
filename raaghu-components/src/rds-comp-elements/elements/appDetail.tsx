import React from "react";
import { RdsAppDetail } from "../../rds-elements";


export const code_actual = () => {
    return (
        <RdsAppDetail appDetailsItem={{
            title: "Zapier",
            subtitle: "Build custom automation and intefrations with app",
            icon: "zapier",
            selected: true,
            iconHeight: "30px",
            iconWidth: "30px",
            iconFill: true,
            iconColor: "warning",
            iconStroke: true,
            routeLabel: "View integration"
        }} />
    );
};

export default code_actual;
