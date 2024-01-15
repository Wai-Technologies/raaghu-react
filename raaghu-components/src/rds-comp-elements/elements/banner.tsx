import React from "react";
import { RdsBanner} from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsBanner
            textAlign= 'start'
            bannerText='Big news! We are excited to announce a brand new product.'
            sticky= {false}
            position= 'top'
            colorVariant= 'info'
            icon='information'
            iconHeight= '20px'
            iconWidth= '20px'
            iconStroke= {true}
            iconFill= {false}
        />
    );
};

export default code_actual;
