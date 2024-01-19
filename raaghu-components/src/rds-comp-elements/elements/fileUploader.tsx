import React from "react";
import { RdsFileUploader } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsFileUploader
            size="mid"
            multiple={false}
            extensions=""
            colorVariant="dark"
            limit={5}
            label="Upload file here"
        />
    );
};

export default code_actual;
