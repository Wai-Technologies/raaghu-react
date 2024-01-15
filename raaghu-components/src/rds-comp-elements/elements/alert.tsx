import React from "react";
import { RdsAlert } from "../../rds-elements";


export const code_actual = () => {


    return (
        <RdsAlert
            alertmessage="This is default alert"
            position="top"
            dismisable={false}
            colorVariant="primary" />
    );
};

export default code_actual;
