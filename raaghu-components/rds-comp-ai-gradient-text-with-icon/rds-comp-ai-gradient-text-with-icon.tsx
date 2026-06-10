import { memo, type ReactNode } from "react";
import "./rds-comp-ai-gradient-text-with-icon.scss";

export interface RdsCompAiGradientTextProps {
  logoUrl?: string;
  title?: string;
  logo?: ReactNode;
  showImage?: boolean;
  showIcon?: boolean;
}

const RdsCompAiGradientTextWithIcon = memo(({
  logoUrl,
  title,
  logo,
  showImage,
  showIcon,
}: RdsCompAiGradientTextProps) => (
  <div className="rds-gradient-text-with-icon">
    {showImage && <img src={logoUrl} className="rds-gradient-text-with-icon__logo" />}
    {showIcon && logo}
    <h6 className="rds-gradient-text-with-icon__title">{title}</h6>
  </div>
));

RdsCompAiGradientTextWithIcon.displayName = "RdsCompAiGradientTextWithIcon";
export default RdsCompAiGradientTextWithIcon;
