import React from "react";
import RdsCompCharts from "../../../../../raaghu-components/src/rds-comp-charts/index";

const Charts = (props: any) => {
    return (
        <div>
            <RdsCompCharts type={props.type}></RdsCompCharts>
        </div>
    );
};

export default Charts;
