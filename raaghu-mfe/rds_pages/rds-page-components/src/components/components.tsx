import React from "react";
import { RdsCompComponents } from "../../../rds-components";

const Components = (props: any) => {
    return (
        <div>
            <RdsCompComponents type={props.type}></RdsCompComponents>
        </div>
    );
};

export default Components;
