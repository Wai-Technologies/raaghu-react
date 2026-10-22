import { memo, type ElementType, type HTMLAttributes, type ReactNode, type Ref } from "react";
import clsx from "clsx";
import "./rds-comp-ai-gradient-text-with-icon.scss";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";

export interface RdsCompAiGradientTextWithIconProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: string;
  /** Icon rendered before the title. */
  icon?: ReactNode;
  /** @deprecated Use `icon` instead. */
  logoUrl?: string;
  /** @deprecated Use `icon` instead. */
  logo?: ReactNode;
  /** @deprecated Use `icon` instead. */
  showImage?: boolean;
  /** @deprecated Use `icon` instead. */
  showIcon?: boolean;
  /** Element used for the heading. Defaults to `h6`. */
  component?: ElementType;
  ref?: Ref<HTMLDivElement>;
}

/** @deprecated Use `RdsCompAiGradientTextWithIconProps` instead. */
export type RdsCompAiGradientTextProps = RdsCompAiGradientTextWithIconProps;

const RdsCompAiGradientTextWithIcon = memo(({
  icon,
  logoUrl,
  title,
  logo,
  showImage,
  showIcon,
  component: Heading = "h6",
  className,
  ref,
  ...rest
}: RdsCompAiGradientTextWithIconProps) => {
  const legacy: Record<string, unknown> = { logoUrl, logo, showImage, showIcon };
  Object.keys(legacy).forEach((key) => {
    if (legacy[key] !== undefined) warnDeprecatedProp("RdsCompAiGradientTextWithIcon", key, "`icon`");
  });
  return (
    <div {...rest} ref={ref} className={clsx("rds-gradient-text-with-icon", className)}>
      {icon ?? (
        <>
          {showImage && <img src={logoUrl} className="rds-gradient-text-with-icon__logo" alt={title ?? ''} />}
          {showIcon && logo}
        </>
      )}
      <Heading className="rds-gradient-text-with-icon__title">{title}</Heading>
    </div>
  );
});

RdsCompAiGradientTextWithIcon.displayName = "RdsCompAiGradientTextWithIcon";
export default RdsCompAiGradientTextWithIcon;
