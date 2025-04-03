import ProfitShareCard from "./ProfitShareCard";

import DailySummaryCard from "./DailySummaryCard";
import CallOverview from "./CallOverview";
import MaximumProfitCard from "./MaximumProfitCard";
import MemberActivity from "./MemberActivity";
import { RdsButton } from "../../raaghu-elements/src";
import SalesMapCard from "./SalesMapCard";
import DailySalesGrowth from "./DailySalesGrowth";

const DashboardOverview = () => {
  return (
    <div className="container-fluid py-4 overflow-auto h-100">
      <div className="row mb-4">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Daily Summary</h5>
            <div className="d-flex">
              <RdsButton
                colorVariant="primary"
                label="DAY"
                size="medium"
                state="active"
                style="filled"
                textCase="uppercase"
                shape="rectangle"
              />
              <RdsButton
                colorVariant="primary"
                label="WEEK"
                size="medium"
                state="default"
                style="outline"
                textCase="uppercase"
                shape="rectangle"
              />
              <RdsButton
                colorVariant="primary"
                label="MONTH"
                size="medium"
                state="default"
                style="outline"
                textCase="uppercase"
                shape="rectangle"
              />
            </div>
          </div>
          <DailySummaryCard />
        </div>
        <div className="col-lg-4">
          <SalesMapCard />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-4">
          <ProfitShareCard />
        </div>
        <div className="col-lg-4">
          <CallOverview />
        </div>
        <div className="col-lg-4">
          <div className="row h-100">
            <div className="col-12 mb-4">
              <DailySalesGrowth />
            </div>
            <div className="col-12">
              <MaximumProfitCard />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <MemberActivity />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;