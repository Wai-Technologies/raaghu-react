import React from "react";
import { RdsToggle } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsToggle
            iconOnUncheck= "sun"
            iconOnCheck= "moon"
            small={false}
            checked={false}
        />
    );
};

export default code_actual;
