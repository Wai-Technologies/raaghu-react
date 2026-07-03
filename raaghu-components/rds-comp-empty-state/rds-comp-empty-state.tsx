import clsx from "clsx";
import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import Lottie from "lottie-react";import "./rds-comp-empty-state.scss";
import emptyStatePng from "./empty-state.png";
import emptyStateDarkPng from "./empty-state-dark.png";
import illustrationLight from "./illustration-light.json";
import illustrationDark from "./illustration-dark.json";

export type RdsCompEmptyStateVariant = "illustration" | "minimal";

export interface RdsCompEmptyStateProps {
  mode?: string;
  variant?: RdsCompEmptyStateVariant;
  label?: string;
  subLabel?: string;
  iconHeight?: string | number;
  iconWidth?: string | number;
  iconPath?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  isContinueAnimate?: boolean;
  className?: string;
}

const toCss = (value: string | number): string =>
  /^\d+$/.test(String(value)) ? `${value}px` : String(value);

const isDarkThemeActive = (): boolean =>
  document.documentElement.getAttribute("data-theme") === "dark" ||
  document.body.classList.contains("dark");

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
  isContinueAnimate,
  className = "",
}: RdsCompEmptyStateProps) => {
  const isMinimal = variant === "minimal";

  const { width, height } = useMemo(() => {
    const defaultSize = isMinimal ? 72 : 150;
    const rawW = iconWidth ?? defaultSize;
    const rawH = iconHeight ?? iconWidth ?? defaultSize;
    return { width: toCss(rawW), height: toCss(rawH) };
  }, [iconHeight, iconWidth, isMinimal]);
  const useDarkVariant = useMemo(
    () => mode === "Dark NRA" || (!mode && isDarkThemeActive()),
    [mode]
  );

  const resolvedImage = useDarkVariant ? emptyStateDarkPng : emptyStatePng;
  const resolvedAnimation = useDarkVariant ? illustrationDark : illustrationLight;
  const imageSrc = iconPath || resolvedImage;
  const isDarkMode = mode === "Dark NRA";

  const titleColor = isDarkMode ? "var(--rds-neutral-0)" : "var(--rds-text-primary)";

  const iconContent = useMemo(() => {
    if (isMinimal) {
      if (iconPath) {
        return (
          <img
            src={iconPath}
            alt={label || mode || "Empty state"}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            data-testid="emptyStateImage"
          />
        );
      }

      return (
        <SearchOffOutlinedIcon
          className="rds-comp-empty-state__minimal-icon"
          data-testid="emptyStateMinimalIcon"
          sx={{ fontSize: width, width, height }}
          aria-hidden="true"
        />
      );
    }

    if (isContinueAnimate) {
      return (
        <Lottie
          animationData={resolvedAnimation}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
          data-testid="emptyStateLottie"
        />
      );
    }

    return (
      <img
        src={imageSrc}
        alt={label || mode || "Empty state"}
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        data-testid="emptyStateImage"
      />
    );
  }, [iconPath, imageSrc, isContinueAnimate, isMinimal, label, mode, resolvedAnimation, height, width]);

  return (
    <Box
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
            !isMinimal && isContinueAnimate && "rds-comp-empty-state__icon--animated"
          )}
          data-testid="icon"
          style={{ width, height }}
        >
          {iconContent}
        </Box>

        {label && (
          <Typography
            variant="h5"
            component="h5"
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

        <Box className="rds-comp-empty-state__action">
          <RdsButton
            style="filled"
            className="rds-comp-empty-state__button"
            onClick={onButtonClick}
            data-testid="actionButton"
            text={buttonText || "Add New Data"}
          />
        </Box>
      </Box>
    </Box>
  );
};

RdsCompEmptyState.displayName = "RdsCompEmptyState";
export default RdsCompEmptyState;
