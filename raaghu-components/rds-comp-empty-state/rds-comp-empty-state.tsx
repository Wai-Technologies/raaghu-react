import clsx from "clsx";
import { useSyncExternalStore } from "react";
import type { ElementType, ReactNode, Ref } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import type { BoxProps } from "@mui/material";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import Lottie from "lottie-react";
import "./rds-comp-empty-state.scss";
import emptyStatePng from "./empty-state.png";
import emptyStateDarkPng from "./empty-state-dark.png";
import illustrationLight from "./illustration-light.json";
import illustrationDark from "./illustration-dark.json";

export type RdsCompEmptyStateVariant = "illustration" | "minimal";

export interface RdsCompEmptyStateProps extends Omit<BoxProps, "children" | "ref"> {
  /** Figma mode: `"Dark NRA"` forces the dark artwork. Without it, the page theme is detected. */
  mode?: string;
  variant?: RdsCompEmptyStateVariant;
  /** Heading text. */
  label?: string;
  /** Supporting text under the heading. */
  subLabel?: string;
  iconHeight?: string | number;
  iconWidth?: string | number;
  iconPath?: string;
  /** Text of the default action button. */
  buttonText?: string;
  /** Click handler of the default action button. */
  onButtonClick?: () => void;
  /** Replaces the default action button. Pass `null` to render no action. */
  action?: ReactNode;
  /** Plays the Lottie animation instead of the static image (illustration variant). */
  animated?: boolean;
  /** @deprecated Use `animated` instead. */
  ContinueAnimate?: boolean;
  /** Element used for the heading. Default `"h5"`. */
  titleComponent?: ElementType;
  ref?: Ref<HTMLDivElement>;
}

const toCss = (value: string | number): string =>
  /^\d+$/.test(String(value)) ? `${value}px` : String(value);

const isDarkThemeActive = (): boolean =>
  document.documentElement.getAttribute("data-theme") === "dark" ||
  document.body.classList.contains("dark");

// Re-render when the page theme attribute/class is toggled.
const subscribeToTheme = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
};
const getServerThemeSnapshot = () => false;

const RdsCompEmptyState = ({
  mode,
  variant = "illustration",
  label,
  subLabel,
  iconHeight,
  iconWidth,
  iconPath,
  buttonText,
  onButtonClick,
  action,
  animated,
  ContinueAnimate,
  titleComponent = "h5",
  className = "",
  ...rest
}: RdsCompEmptyStateProps) => {
  if (ContinueAnimate !== undefined) {
    warnDeprecatedProp("RdsCompEmptyState", "ContinueAnimate", "`animated`");
  }
  const isAnimated = animated ?? ContinueAnimate;
  const isMinimal = variant === "minimal";
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", { noSsr: true });
  const pageIsDark = useSyncExternalStore(subscribeToTheme, isDarkThemeActive, getServerThemeSnapshot);

  const defaultSize = isMinimal ? 72 : 150;
  const width = toCss(iconWidth ?? defaultSize);
  const height = toCss(iconHeight ?? iconWidth ?? defaultSize);
  const useDarkVariant = mode === "Dark NRA" || (!mode && pageIsDark);

  const resolvedImage = useDarkVariant ? emptyStateDarkPng : emptyStatePng;
  const resolvedAnimation = useDarkVariant ? illustrationDark : illustrationLight;
  const imageSrc = iconPath || resolvedImage;
  const isDarkMode = mode === "Dark NRA";

  const titleColor = isDarkMode ? "var(--rds-neutral-0)" : "var(--rds-text-primary)";

  let iconContent: ReactNode;
  if (isMinimal && !iconPath) {
    iconContent = (
      <SearchOffOutlinedIcon
        className="rds-comp-empty-state__minimal-icon"
        data-testid="emptyStateMinimalIcon"
        sx={{ fontSize: width, width, height }}
        aria-hidden="true"
      />
    );
  } else if (!isMinimal && isAnimated) {
    iconContent = (
      <Lottie
        animationData={resolvedAnimation}
        loop={!prefersReducedMotion}
        autoplay={!prefersReducedMotion}
        style={{ width: "100%", height: "100%" }}
        data-testid="emptyStateLottie"
      />
    );
  } else {
    iconContent = (
      <img
        src={isMinimal ? iconPath : imageSrc}
        alt={label || mode || "Empty state"}
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        data-testid="emptyStateImage"
      />
    );
  }

  const resolvedAction =
    action === undefined ? (
      <RdsButton
        style="filled"
        className="rds-comp-empty-state__button"
        onClick={onButtonClick}
        data-testid="actionButton"
      >
        {buttonText || "Add New Data"}
      </RdsButton>
    ) : (
      action
    );

  return (
    <Box
      {...rest}
      className={clsx(
        "rds-comp-empty-state",
        isMinimal && "rds-comp-empty-state--minimal",
        className
      )}
    >
      <Box className="rds-comp-empty-state__content">
        {/* Decorative artwork: the heading carries the meaning. */}
        <Box
          className={clsx(
            "rds-comp-empty-state__icon",
            isMinimal && "rds-comp-empty-state__icon--minimal",
            !isMinimal && isAnimated && "rds-comp-empty-state__icon--animated"
          )}
          data-testid="icon"
          aria-hidden="true"
          style={{ width, height }}
        >
          {iconContent}
        </Box>

        {label && (
          <Typography
            variant="h5"
            component={titleComponent}
            className="rds-comp-empty-state__title"
            data-testid="labelElement"
            style={{
              color: isDarkMode ? "#ffffff" : "#000000",
              fontSize: "20px",
              fontWeight: 600,
              marginBottom: "8px",
              marginTop: "24px",
            }}
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: titleColor,
              marginBottom: "8px",
              marginTop: "24px",
            }}
          >
            {label}
          </Typography>
        )}

        {subLabel && (
          <Typography
            variant="body1"
            className="rds-comp-empty-state__subtitle"
            data-testid="sublabelElement"
            style={{
              textAlign: "center",
              color: isDarkMode ? "#ffffff" : "#000000",
            }}
            sx={{
              textAlign: "center",
              color: titleColor,
            }}
          >
            {subLabel}
          </Typography>
        )}

        {resolvedAction != null && resolvedAction !== false && (
          <Box className="rds-comp-empty-state__action">{resolvedAction}</Box>
        )}
      </Box>
    </Box>
  );
};

RdsCompEmptyState.displayName = "RdsCompEmptyState";
export default RdsCompEmptyState;
