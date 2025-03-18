import React, { useEffect, useState }  from "react";
import "./rds-plan-switcher.css";
 
export interface RdsPlanSwitcherProps {
  setIsPlanFree?: (isPlanFree: boolean) => void;
}
 
const RdsPlanSwitcher = (props:RdsPlanSwitcherProps) => {
  const [isPlanFree, setIsPlanFree] = useState(true);

  useEffect(() => {
    props.setIsPlanFree && props.setIsPlanFree(isPlanFree);
  }, [isPlanFree]);

  return (<>
  <div className="planToggle">
          <div 
            onClick={() => setIsPlanFree(true)} 
            className={`equalWidth ${isPlanFree ? "multicolorBorder" : ""}`} 
            id="1"
          >
            Free
          </div>
          <div 
            onClick={() => setIsPlanFree(false)} 
            className={`equalWidth ${!isPlanFree ? "premiumSelected" : ""}`} 
            id="2"
          >
            <div className="premiumContent">
              <img 
                src={isPlanFree ? "./assets/crown.png" : "./assets/crownwhite.png"} 
                alt="ssj" 
                className="crownImage" 
              />
              Premium
            </div>
          </div>
        </div>
  </>);
};
 
export default RdsPlanSwitcher;