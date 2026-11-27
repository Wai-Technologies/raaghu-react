import React from "react";
import Box from "@mui/material/Box";
import { joinClassNames, type RdsStylingProps } from "../../raaghu-elements/shared/utils/styling-props";
import "./rds-comp-ai-gradient-text-with-icon.scss";

export interface RdsCompAiGradientTextProps extends RdsStylingProps {
  logoUrl?: string;
  title?: string;
  logo?: React.ReactNode;
  showImage?: boolean;
  showIcon?: boolean;
}

const RdsCompAiGradientTextWithIcon = React.forwardRef<HTMLDivElement, RdsCompAiGradientTextProps>(function RdsCompAiGradientTextWithIcon(props, ref) {
  return (
    <Box ref={ref} className={joinClassNames("rds-gradient-text-with-icon", props.className)} sx={props.sx} style={props.style}>
      {props.showImage && (
        <img src={props.logoUrl} className="rds-gradient-text-with-icon__logo" />
      )}

      {props.showIcon && props.logo}
      <h6 className="rds-gradient-text-with-icon__title">{props.title}</h6>
    </Box>
  );
});

RdsCompAiGradientTextWithIcon.displayName = "RdsCompAiGradientTextWithIcon"
export default RdsCompAiGradientTextWithIcon;