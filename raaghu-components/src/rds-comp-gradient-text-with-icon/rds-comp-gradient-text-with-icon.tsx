import React from "react";
import "./rds-comp-gradient-text-with-icon.css";
export interface RdsCompGradientTextProps {
  logoUrl?: string;
  title?: string;
  logo?: string;
}

const RdsCompGradientTextWithIcon = (props: RdsCompGradientTextProps) => {
  return (
    <div className="gradient-text-with-icon">
      <img src={props.logoUrl} alt="Logo" className="pundit-icon" />
      <img src={props.logo} alt="Icon" className="loader-icon" />
      <h6 className="title">{props.title}</h6>
    </div>
  );
};

export default RdsCompGradientTextWithIcon;