import { memo, type ElementType, type HTMLAttributes, type ReactNode, type Ref } from "react";
import clsx from "clsx";
import "./rds-comp-ai-gradient-text-with-icon.scss";

export interface RdsCompAiGradientTextWithIconProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  logoUrl?: string;
  title?: string;
  logo?: ReactNode;
  showImage?: boolean;
  showIcon?: boolean;
  /** Element used for the heading. Defaults to `h6`. */
  component?: ElementType;
  ref?: Ref<HTMLDivElement>;
}

/** @deprecated Use `RdsCompAiGradientTextWithIconProps` instead. */
export type RdsCompAiGradientTextProps = RdsCompAiGradientTextWithIconProps;

const RdsCompAiGradientTextWithIcon = memo(({
  logoUrl,
  title,
  logo,
  showImage,
  showIcon,
  component: Heading = "h6",
  className,
  ref,
  ...rest
}: RdsCompAiGradientTextWithIconProps) => (
  <div {...rest} ref={ref} className={clsx("rds-gradient-text-with-icon", className)}>
    {showImage && <img src={logoUrl} className="rds-gradient-text-with-icon__logo" alt={title ?? ''} />}
    {showIcon && logo}
    <Heading className="rds-gradient-text-with-icon__title">{title}</Heading>
  </div>
));

RdsCompAiGradientTextWithIcon.displayName = "RdsCompAiGradientTextWithIcon";
export default RdsCompAiGradientTextWithIcon;
