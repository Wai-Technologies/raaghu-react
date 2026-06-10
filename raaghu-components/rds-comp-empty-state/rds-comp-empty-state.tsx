import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";
import Lottie from "lottie-react";
import "./rds-comp-empty-state.scss";
import emptyStatePng from "./empty-state.png";
import emptyStateDarkPng from "./empty-state-dark.png";
import illustrationLight from "./illustration-light.json";
import illustrationDark from "./illustration-dark.json";

export interface RdsCompEmptyStateProps {
  mode?: string;
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
  const { width, height } = useMemo(() => {
    const rawW = iconWidth ?? 150;
    const rawH = iconHeight ?? iconWidth ?? 150;
    return { width: toCss(rawW), height: toCss(rawH) };
  }, [iconHeight, iconWidth]);

  const useDarkVariant = useMemo(
    () => mode === "Dark NRA" || (!mode && isDarkThemeActive()),
    [mode]
  );

  const resolvedImage = useDarkVariant ? emptyStateDarkPng : emptyStatePng;
  const resolvedAnimation = useDarkVariant ? illustrationDark : illustrationLight;
  const imageSrc = iconPath || resolvedImage;
  const isDarkMode = mode === "Dark NRA";

  const titleColor = isDarkMode ? "var(--rds-neutral-0)" : "var(--rds-text-primary)";

  return (
    <Box className={`rds-comp-empty-state ${className}`.trim()}>
      <Box className="rds-comp-empty-state__content">
        <Box
          className={`rds-comp-empty-state__icon${
            isContinueAnimate ? " rds-comp-empty-state__icon--animated" : ""
          }`}
          data-testid="icon"
          style={{ width, height }}
        >
          {isContinueAnimate ? (
            <Lottie
              animationData={resolvedAnimation}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
              data-testid="emptyStateLottie"
            />
          ) : (
            <img
              src={imageSrc}
              alt={label || mode || "Empty state"}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
              data-testid="emptyStateImage"
            />
          )}
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
