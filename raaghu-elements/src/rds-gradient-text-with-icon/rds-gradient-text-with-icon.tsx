import React from "react";
import "./rds-gradient-text-with-icon.css";
export interface RdsGradientTextProps {
  logoUrl?: string;
  title?: string;
  logo?: string;
}

const RdsGradientTextWithIcon = (props: RdsGradientTextProps) => {
  return (
    <div className="gradient-text-with-icon">
      <img src={props.logoUrl} alt="Logo" className="pundit-icon" />
      <img
          src={props.logo}
          width={"40px"} height={"40px"}
      />
      <h6 className="title">{props.title}</h6>
     
    </div>
  );
};

export default RdsGradientTextWithIcon;