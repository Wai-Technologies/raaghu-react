import React, { useEffect, useState } from "react";
import RdsIcon from "../rds-icon";
import "./rds-plan-switcher.css";

export interface RdsPlanSwitcherProps {
  setIsPlanFree?: (isPlanFree: boolean) => void;
  button1Text: string;
  button2Text: string;
}

const RdsPlanSwitcher = (props: RdsPlanSwitcherProps) => {
  const [isPlanFree, setIsPlanFree] = useState(true);

  useEffect(() => {
    props.setIsPlanFree && props.setIsPlanFree(isPlanFree);
  }, [isPlanFree]);

  return (<>
    <div className="planToggle">
      <div
        onClick={() => setIsPlanFree(true)}
        className={`equalWidth ${isPlanFree ? "multicolorBorder" : "multicolorBorderInactive"}`}
        id="1"
      >
        {props.button1Text}
      </div>
      <div
        onClick={() => setIsPlanFree(false)}
        className={`equalWidth ${!isPlanFree ? "premiumSelected" : "premiumSelectedInactive"}`}
        id="2"
      >
        <div className={`premiumContent ${isPlanFree ? 'free' : ''}`}>
          {isPlanFree ?
            <div className="icon-background-white">
              <RdsIcon
                name="crown"
                height="20px"
                width="20px"
                colorVariant="danger"
                fill={true}
                stroke={false} />
            </div> :
            <div className="icon-background">
              <RdsIcon
                name="crown_white"
                height="20px"
                width="20px"
                colorVariant="danger"
                fill={true}
                stroke={false} />
            </div>}
          <span className="premium-text">{props.button2Text}</span>
        </div>
      </div>
    </div>
  </>);
};

export default RdsPlanSwitcher;