import React, { useState } from "react";
import "./rds-comp-subscription-plan.css";
import { RdsIcon, RdsPlanSwitcher, RdsCard } from "../rds-elements";

export interface RdsSubscriptionPlanProps {
  planAmount?: string;
  freePlanText: string;
  premiumPlanText: string;
  upgradeText: string;
  aiPunditChatText: string;
  proText: string;
  currentPlanText: string;
  freePlanDescription: string;
  premiumPlanDescription: string;
  freePlanPrice: string;
  premiumPlanPrice: string;
  freePlanFeatures: string[];
  premiumPlanFeatures: string[];
  perMonthText: string;
  forIndividualsText: string;
  forProUsersText: string;
  whatsIncludedText: string;
}

const RdsCompSubscriptionPlan = (props: RdsSubscriptionPlanProps) => {
  const [isPlanFree, setIsPlanFree] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [subscriptionPlanAmount, setSubscriptionPlanAmount] = useState(props.planAmount || props.premiumPlanPrice);

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
        <img src={"./assets/backGif.gif"} alt="Background Animation" className="backGif" />
        <img src={"./assets/Panel-0421.png"} alt="Panel Image" className="panelImage" />
      </div>
      <div>
        <div className="centerText">
          <div className="upgradeText">{props.upgradeText}<img src={"./assets/AIPunditColored.png"} alt="AI Pundit Logo" />
            <span className="aiPunditChat">{props.aiPunditChatText}</span><span className="proText">{props.proText}</span></div>
          <div className="currentPlanText">{props.currentPlanText}</div>
          <RdsPlanSwitcher
            button1Text={props.freePlanText}
            button2Text={props.premiumPlanText}
            setIsPlanFree={setIsPlanFree}
          />
        </div>
        <div>
          <RdsCard state="Default" style="Default">
            <div className="card-text">{isPlanFree ? <div >
              <div className="freeText">{props.freePlanText}</div>
              <div className="perfectForIndividuals">{props.freePlanDescription}</div>
              <div className="priceText">{props.freePlanPrice}<span>{props.perMonthText}</span></div>
              <hr />
              <div className="forIndividualsText">{props.forIndividualsText}</div>
              <div className="forProUsersText">{props.forProUsersText}</div>
              {props.freePlanFeatures.map((feature, index) => (
                <div key={index} className="accessChat"><img src="./assets/check.png" alt="Check Icon" />{feature}</div>
              ))}
            </div> : <div>
              <div className="freeText">{props.premiumPlanText}</div>
              <div className="perfectForIndividuals">{props.premiumPlanDescription}</div>
              <div className="priceText">${subscriptionPlanAmount}<span>{props.perMonthText}</span></div>
              <hr />
              <div className="forIndividualsText">{props.whatsIncludedText}</div>
              <div className="forProUsersText">{props.forProUsersText}</div>
              {props.premiumPlanFeatures.map((feature, index) => (
                <div key={index} className="accessChat"><img src="./assets/check.png" alt="Check Icon" />{feature}</div>
              ))}
            </div>}
            </div>
          </RdsCard>
        </div>
      </div>
    </div>
  </>);
};

export default RdsCompSubscriptionPlan;