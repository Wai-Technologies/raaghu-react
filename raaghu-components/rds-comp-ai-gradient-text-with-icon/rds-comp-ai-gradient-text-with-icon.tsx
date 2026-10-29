import { memo, type ElementType, type HTMLAttributes, type ReactNode, type Ref } from "react";
import clsx from "clsx";
import "./rds-comp-ai-gradient-text-with-icon.scss";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

export interface RdsCompAiGradientTextWithIconProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Text rendered with the gradient style. */
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
  /** Ref forwarded to the root element. */
  ref?: Ref<HTMLDivElement>;
  /** MUI system styles applied to the root element. */
  sx?: SxProps<Theme>;
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
  sx,
  ...rest
}: RdsCompAiGradientTextWithIconProps) => {
  const legacy: Record<string, unknown> = { logoUrl, logo, showImage, showIcon };
  Object.keys(legacy).forEach((key) => {
    if (legacy[key] !== undefined) warnDeprecatedProp("RdsCompAiGradientTextWithIcon", key, "`icon`");
  });
  return (
    <Box {...rest} ref={ref} className={clsx("rds-gradient-text-with-icon", className)} sx={sx}>
      {icon ?? (
        <>
          {showImage && <img src={logoUrl} className="rds-gradient-text-with-icon__logo" alt={title ?? ''} />}
          {showIcon && logo}
        </>
      )}
      <Heading className="rds-gradient-text-with-icon__title">{title}</Heading>
    </Box>
  );
});

RdsCompAiGradientTextWithIcon.displayName = "RdsCompAiGradientTextWithIcon";
export default RdsCompAiGradientTextWithIcon;
