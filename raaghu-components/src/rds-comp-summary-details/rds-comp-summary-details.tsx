import React from "react";
import RdsPaymentSummary from "../../../raaghu-elements/src/rds-payment-summary/rds-payment-summary";

export interface RdsCompSummaryDetailsProps {
  summaryDetailsList?: any;
}

const RdsCompSummaryDetails = (props: RdsCompSummaryDetailsProps) => {

  console.log("summaryDetailsList component level - ", props.summaryDetailsList);
  return (<>
    {/* <div>RdsCompSummaryDetails</div> */}
    <RdsPaymentSummary summaryDetailsList={props.summaryDetailsList} />
  </>);
};

export default RdsCompSummaryDetails;
