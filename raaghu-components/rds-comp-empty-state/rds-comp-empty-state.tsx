import clsx from "clsx";
import { useEffect, useState, useSyncExternalStore } from "react";
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

export type RdsCompEmptyStateVariant = "illustration" | "minimal";

export interface RdsCompEmptyStateProps extends Omit<BoxProps, "children" | "ref"> {
  /** Figma mode: `"Dark NRA"` forces the dark artwork. Without it, the page theme is detected. */
  mode?: string;
  variant?: RdsCompEmptyStateVariant;
  /** Heading text. */
  label?: string;
  /** Supporting text under the heading. */
  description?: string;
  /** @deprecated Use `description` instead. */
  subLabel?: string;
  /** Artwork: an image URL or a custom node. */
  image?: string | ReactNode;
  /** Artwork size: one value for both sides, or `{ width, height }`. */
  imageSize?: string | number | { width?: string | number; height?: string | number };
  /** @deprecated Use `imageSize` instead. */
  iconHeight?: string | number;
  /** @deprecated Use `imageSize` instead. */
  iconWidth?: string | number;
  /** @deprecated Use `image` instead. */
  iconPath?: string | ReactNode;
  /** @deprecated Use `action` instead. */
  buttonText?: string;
  /** @deprecated Use `action` instead. */
  onButtonClick?: () => void;
  /** Replaces the default action button. Pass `null` to render no action. */
  action?: ReactNode;
  /** Plays the Lottie animation instead of the static image (illustration variant). */
  animated?: boolean;
  /** @deprecated Use `animated` instead. */
  isContinueAnimate?: boolean;
  /** Element used for the heading. Default `"h5"`. */
  titleComponent?: ElementType;
  ref?: Ref<HTMLDivElement>;
}

const toCss = (value: string | number): string =>
  /^\d+$/.test(String(value)) ? `${value}px` : String(value);

const isDarkThemeActive = (): boolean =>
  document.documentElement.getAttribute("data-theme") === "dark" ||
  document.body.classList.contains("dark");

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
  description,
  subLabel,
  image,
  imageSize,
  iconHeight,
  iconWidth,
  iconPath,
  buttonText,
  onButtonClick,
  action,
  animated,
  isContinueAnimate,
  titleComponent = "h5",
  className = "",
  ...rest
}: RdsCompEmptyStateProps) => {
  if (isContinueAnimate !== undefined) {
    warnDeprecatedProp("RdsCompEmptyState", "isContinueAnimate", "`animated`");
  }
  const deprecatedProps = { subLabel, iconHeight, iconWidth, iconPath, buttonText, onButtonClick };
  const replacements = { subLabel: "`description`", iconHeight: "`imageSize`", iconWidth: "`imageSize`", iconPath: "`image`", buttonText: "`action`", onButtonClick: "`action`" };
  (Object.keys(deprecatedProps) as (keyof typeof deprecatedProps)[]).forEach((name) => {
    if (deprecatedProps[name] !== undefined) warnDeprecatedProp("RdsCompEmptyState", name, replacements[name]);
  });
  const text = description ?? subLabel;
  const imageValue = image ?? iconPath;
  const imageUrl = typeof imageValue === "string" ? imageValue : undefined;
  const isAnimated = animated ?? isContinueAnimate;
  const isMinimal = variant === "minimal";
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", { noSsr: true });
  const pageIsDark = useSyncExternalStore(subscribeToTheme, isDarkThemeActive, getServerThemeSnapshot);

  const defaultSize = isMinimal ? 72 : 150;
  const size = typeof imageSize === "object" ? imageSize : { width: imageSize, height: imageSize };
  const sizeWidth = size.width ?? iconWidth;
  const width = toCss(sizeWidth ?? defaultSize);
  const height = toCss(size.height ?? iconHeight ?? sizeWidth ?? defaultSize);
  const useDarkVariant = mode === "Dark NRA" || (!mode && pageIsDark);

  const resolvedImage = useDarkVariant ? emptyStateDarkPng : emptyStatePng;
  const imageSrc = imageUrl || resolvedImage;
  const isDarkMode = mode === "Dark NRA";
  const shouldLoadLottie = Boolean(!isMinimal && isAnimated);
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    if (!shouldLoadLottie) {
      setAnimationData(null);
      return;
    }
    let cancelled = false;
    const load = useDarkVariant
      ? import("./illustration-dark.json")
      : import("./illustration-light.json");
    load.then((mod) => {
      if (!cancelled) {
        setAnimationData((mod as { default?: object }).default ?? (mod as object));
      }
    });
    return () => {
      cancelled = true;
    };
  }, [shouldLoadLottie, useDarkVariant]);

  const titleColor = isDarkMode ? "var(--rds-neutral-0)" : "var(--rds-text-primary)";

  let iconContent: ReactNode;
  if (imageValue != null && typeof imageValue !== "string") {
    iconContent = imageValue;
  } else if (isMinimal && !imageValue) {
    iconContent = (
      <SearchOffOutlinedIcon
        className="rds-comp-empty-state__minimal-icon"
        data-testid="emptyStateMinimalIcon"
        sx={{ fontSize: width, width, height }}
        aria-hidden="true"
      />
    );
  } else if (shouldLoadLottie && animationData) {
    iconContent = (
      <Lottie
        animationData={animationData}
        loop={!prefersReducedMotion}
        autoplay={!prefersReducedMotion}
        style={{ width: "100%", height: "100%" }}
        data-testid="emptyStateLottie"
      />
    );
  } else if (shouldLoadLottie) {
    iconContent = (
      <div
        className="rds-comp-empty-state__lottie-placeholder"
        data-testid="emptyStateLottie"
        aria-hidden="true"
      />
    );
  } else {
    iconContent = (
      <img
        src={isMinimal ? imageUrl : imageSrc}
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
        variant="filled"
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

        {text && (
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
            {text}
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
