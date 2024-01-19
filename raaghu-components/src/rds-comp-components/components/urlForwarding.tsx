import React from "react";
import RdsCompUrlForwardings from "../../rds-comp-url-forwardings/rds-comp-url-forwardings";

export const code_actual = () => {
    return (
        <RdsCompUrlForwardings
            urlForwardingData={{ source: "", target: "" }}
            emitUrlForwardingData={() => {}}
        />
    );
};

export default code_actual;
