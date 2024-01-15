import React from "react";
import { RdsWidget } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsWidget
            colorVariant="gradient-primary"
            subTitleColorVariant="primary"
            iconFill={true}
            iconStroke={true}
            iconHeight="15px"
            iconWidth="15px"
            bigNumber="$13,20,21"
            subTitle="+$1,203"
            icon="triangle_up"
            bigNumberColor="white"
            headerTitle="Widget"
            isRefreshRequired={true}
        />
    );
};

export default code_actual;
