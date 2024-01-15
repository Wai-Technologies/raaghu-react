import React from "react";
import { RdsCompElements } from "../../../rds-components";

const Elements = (props: any) => {
    return (
        <div>
            <RdsCompElements type={props.type}></RdsCompElements>
        </div>
    );
};

export default Elements;