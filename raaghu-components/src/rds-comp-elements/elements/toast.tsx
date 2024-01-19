import React from "react";
import { RdsToast } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsToast
            headerTitle= 'Toast'
            message= 'This is a sample toast'
            colorVariant= 'light'
            showHeader={true}
            withIcon={true}
            iconName="folder"
            iconColorvariant="primary"
            iconHeight="18px"
            iconWidth="18px"
            iconFill={false}
        />
    );
};

export default code_actual;
