import React from "react";
import RdsProgressBar from "../rds-progress-bar";
import RdsButton from "../rds-button";
import RdsIcon from "../rds-icon";
import "./rds-widget-portal.css";

export interface RdsWidgetPortalProps {
  btnShow?: boolean;
  btnLabel?: string;
  widgetTitle: string;
  statusBarMsg?: boolean;
  statusMsg?: string;
  subTitle: string;
  icon?: string;
  handleButtonClick?: (Event: React.MouseEvent<HTMLElement>) => void;
}

const RdsWidgetPortal = (props: RdsWidgetPortalProps) => {
  return (<>
    <div className="border border-1 rounded-3 border-danger-50 py-4 px-4 box-gradient-shadow">
      <div className="d-flex gap-3 align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <RdsIcon
            name={props.icon}
            width="33px"
            height="30px"
            fill={false}
            stroke={true}
            colorVariant="danger" />
          <div className="fw-bold fs-4">
            {props.widgetTitle}
          </div>
        </div>
        <div>
          {props.btnShow === true && (
            <RdsButton
              class="me-2"
              tooltipTitle={""}
              type={"button"}
              label={props.btnLabel}
              colorVariant="outline-primary"
              size="medium"
              onClick={props.handleButtonClick}
            ></RdsButton>
          )}
        </div>
      </div>
      <div>
        <h6 className="text-secondary fw-medium small pt-2 pb-0 mb-0">{props.subTitle}</h6>
      </div>
      {props.statusBarMsg == true ? (
        <RdsProgressBar
          colorVariant="success"
          height={10}
          progressWidth={39}
          role="single" steps={0} completedSteps={0}        />
      ) : (<div>
        <p className="text-secondary">{props.statusMsg}</p>
      </div>)}

    </div>
  </>);
};

export default RdsWidgetPortal;
