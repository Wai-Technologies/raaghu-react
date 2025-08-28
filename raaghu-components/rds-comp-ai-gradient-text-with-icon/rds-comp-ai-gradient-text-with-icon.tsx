import React from "react";
import "./rds-comp-ai-gradient-text-with-icon.scss";

export interface RdsCompAiGradientTextProps {
  logoUrl?: string;
  title?: string;
  logo?: React.ReactNode;
}

const RdsCompAiGradientTextWithIcon = (props: RdsCompAiGradientTextProps) => {
  return (
    <div className="rds-gradient-text-with-icon">
      <img src={props.logoUrl} className="rds-gradient-text-with-icon__logo" />
      {props.logo}
      <h6 className="rds-gradient-text-with-icon__title">{props.title}</h6>
    </div>
  );
};

export default RdsCompAiGradientTextWithIcon;