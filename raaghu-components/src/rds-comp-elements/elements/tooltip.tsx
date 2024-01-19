import React from "react";
import { RdsTooltip } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsTooltip
            text="This is tooltip"
            place="right"
            children={<button className="btn btn-primary">Button</button>}
        />
    );
};

export default code_actual;
