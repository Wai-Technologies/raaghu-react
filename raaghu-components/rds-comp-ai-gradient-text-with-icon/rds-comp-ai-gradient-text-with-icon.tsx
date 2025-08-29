import React from "react";
import "./rds-comp-ai-gradient-text-with-icon.scss";

export interface RdsCompAiGradientTextProps {
  logoUrl?: string;
  title?: string;
  logo?: React.ReactNode;
  showImage?: boolean;
  showIcon?: boolean;
}

const RdsCompAiGradientTextWithIcon = (props: RdsCompAiGradientTextProps) => {
  return (
    <div className="rds-gradient-text-with-icon">
      {props.showImage && (
        <img src={props.logoUrl} className="rds-gradient-text-with-icon__logo" />
      )}

      {props.showIcon && props.logo}
      <h6 className="rds-gradient-text-with-icon__title">{props.title}</h6>
    </div>
  );
};

RdsCompAiGradientTextWithIcon.displayName = "RdsCompAiGradientTextWithIcon"
export default RdsCompAiGradientTextWithIcon;