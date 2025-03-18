import React, { useState } from "react";
import "./rds-comp-subscription-plan.css";
import { RdsIcon, RdsPlanSwitcher } from "../rds-elements";

export interface RdsSubscriptionPlanProps {
  planAmount?: string;
}

const RdsCompSubscriptionPlan = (props: RdsSubscriptionPlanProps) => {
  const [isPlanFree, setIsPlanFree] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [subscriptionPlanAmount, setSubscriptionPlanAmount] = useState(props.planAmount || "---");

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!isModalOpen) return null;

  return (<>
    <div className="subscriptionContainer">
      <div className="closeButton" ><RdsIcon
        colorVariant="dark"
        height="16px"
        isCursorPointer
        name="close"
        stroke
        width="16px"
        onClick={closeModal}
      /></div>
      <div className="backGifContainer">
        <img src={"./assets/backGif.gif"} alt="ssj" className="backGif" />
        <img src={"./assets/Panel-0421.png"} alt="ssj" className="panelImage" />
      </div>
      <div>
        <div className="centerText">
          <div className="upgradeText">Upgrade to<img src={"./assets/AIPunditColored.png"} alt="ssj" />
            <span className="aiPunditChat">AI Pundit Chat</span><span className="proText">Pro</span></div>
          <div className="currentPlanText">You’re currently on the free plan</div>
          <RdsPlanSwitcher
            button1Text="Free"
            button2Text="Premium"
            setIsPlanFree={setIsPlanFree}
          />
        </div>
        <div>
          <div className="planDetails">
            {isPlanFree ? <div >
              <div className="freeText">Free</div>
              <div className="perfectForIndividuals">Perfect for individuals exploring our platform.</div>
              <div className="priceText">$0<span>/month</span></div>
              <hr />
              <div className="forIndividualsText">For Individuals:</div>
              <div className="forProUsersText">For pro users:</div>
              <div className="accessChat"><img src="./assets/check.png" />Access to chat.raaghu.ai</div>
              <div className="accessChat"><img src="./assets/check.png" />Up to 5 credits daily</div>
              <div className="accessChat"><img src="./assets/check.png" />Share chat URL with anyone</div>
            </div> : <div>
              <div className="freeText">Premium</div>
              <div className="perfectForIndividuals">Take your projects to the next level with pro features.</div>
              <div className="priceText">${subscriptionPlanAmount}<span>/month</span></div>
              <hr />
              <div className="forIndividualsText">What’s included</div>
              <div className="forProUsersText">For pro users:</div>
              <div className="accessChat"><img src="./assets/check.png" />Everything in free</div>
              <div className="accessChat"><img src="./assets/check.png" />Higher messaging limits</div>
              <div className="accessChat"><img src="./assets/check.png" />Custom domains on integration option</div>
              <div className="accessChat"><img src="./assets/check.png" />Unlimited Projects</div>
              <div className="accessChat"><img src="./assets/check.png" />Import from Figma</div>
              <div className="accessChat"><img src="./assets/check.png" />Integrate ABP</div>
              <div className="accessChat"><img src="./assets/check.png" />Integrate ASP.NET Zero</div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default RdsCompSubscriptionPlan;