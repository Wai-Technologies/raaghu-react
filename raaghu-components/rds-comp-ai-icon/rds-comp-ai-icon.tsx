import clsx from "clsx";
import { forwardRef, memo, useEffect, useMemo, useState, type ComponentType, type MouseEventHandler, type SVGProps } from "react";
import "./rds-comp-ai-icon.scss";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

const defaultMaterialIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  users: GroupOutlinedIcon as ComponentType<SVGProps<SVGSVGElement>>,
  "person-outline": PersonOutlineIcon as ComponentType<SVGProps<SVGSVGElement>>,
};

const materialIconsRegistry: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  ...defaultMaterialIcons,
};

export const registerMaterialIcon = (
  name: string,
  iconComponent: ComponentType<SVGProps<SVGSVGElement>>
) => {
  materialIconsRegistry[name.toLowerCase()] = iconComponent;
  try {
    window.dispatchEvent(new CustomEvent("rds-icons-updated"));
  } catch {
    /* handled */
  }
};

export const registerMaterialIcons = (icons: Record<string, ComponentType<SVGProps<SVGSVGElement>>>) => {
  Object.entries(icons).forEach(([name, component]) => {
    materialIconsRegistry[name.toLowerCase()] = component;
  });
  try {
    window.dispatchEvent(new CustomEvent("rds-icons-updated"));
  } catch {
    /* handled */
  }
};

const createMuiIconWrapper = (
  MuiIcon: ComponentType<SVGProps<SVGSVGElement>>
): ComponentType<SVGProps<SVGSVGElement>> =>
  forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
    ({ color, fontSize, className, style, ...restProps }, ref) => {
      const combinedStyle = {
        ...style,
        ...(color && { color }),
        ...(fontSize && { fontSize }),
      };

      return <MuiIcon ref={ref} className={className} style={combinedStyle} {...restProps} />;
    }
  );

const resolveIconComponent = (
  iconName: string,
  SvgIcon?: ComponentType<SVGProps<SVGSVGElement>>
): ComponentType<SVGProps<SVGSVGElement>> | null => {
  try {
    if (SvgIcon) return SvgIcon;
    if (iconName && materialIconsRegistry[iconName]) {
      return createMuiIconWrapper(materialIconsRegistry[iconName]);
    }
    return null;
  } catch {
    return null;
  }
};

export interface RdsCompAiIconProps {
  width?: string;
  height?: string;
  colorVariant?: string;
  name?: string;
  fill?: boolean;
  stroke?: boolean;
  strokeWidth?: string;
  borderRadius?: string;
  onClick?: MouseEventHandler<HTMLElement | SVGSVGElement> | null;
  opacity?: string;
  isAnimate?: boolean;
  classes?: string;
  dataTestId?: string;
  databsdismiss?: string;
  databstarget?: string;
  databstoggle?: string;
  ariacontrols?: string;
  imageUrl?: string;
  id?: string;
  iconPath?: string;
  type?: "icon" | "lottie";
  isHover?: boolean;
  isContinueAnimate?: boolean;
  hovered?: boolean;
  isHovered?: boolean;
  isCursorPointer?: boolean;
  strokeColor?: string;
  SvgIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  position?: "center" | "top-left" | "none";
}

const RdsCompAiIconComponent = ({
  width,
  height,
  colorVariant,
  name,
  fill,
  stroke,
  strokeWidth,
  onClick,
  classes,
  dataTestId,
  databsdismiss,
  databstarget,
  databstoggle,
  ariacontrols,
  imageUrl,
  id,
  isCursorPointer,
  strokeColor,
  SvgIcon,
  position,
}: RdsCompAiIconProps) => {
  const normalizedName = name?.toLowerCase() ?? "";
  const [iconVersion, setIconVersion] = useState(0);

  useEffect(() => {
    const onIconsUpdated = () => setIconVersion((version) => version + 1);
    window.addEventListener("rds-icons-updated", onIconsUpdated);
    return () => window.removeEventListener("rds-icons-updated", onIconsUpdated);
  }, []);

  const IconComponent = useMemo(
    () => resolveIconComponent(normalizedName, SvgIcon),
    [normalizedName, SvgIcon, iconVersion]
  );

  const style = useMemo(
    () => ({
      height: height ?? "22px",
      width: width ?? "22px",
      "--rds-ai-icon-size": "var(--rds-ai-icon-size)",
      strokeWidth: strokeWidth ?? "inherit",
      ...(position === "center" && { margin: "auto" }),
      ...(position === "top-left" && { margin: "0" }),
      ...(position === "none" && {}),
      ...(!position && { margin: "auto" }),
    }),
    [height, width, strokeWidth, position]
  );

  const className = clsx(
    "rds-comp-ai-icon",
    classes,
    isCursorPointer && "rds-comp-ai-icon--cursor",
    colorVariant && `rds-comp-ai-icon--${colorVariant}`
  );

  if (IconComponent) {
    try {
      const Icon = IconComponent;
      return (
        <Icon
          className={clsx(className, "rds-comp-ai-icon__svg")}
          onClick={onClick || undefined}
          id={id}
          data-testid={dataTestId}
          style={style}
          data-bs-dismiss={databsdismiss}
          data-bs-target={databstarget}
          data-bs-toggle={databstoggle}
          aria-controls={ariacontrols}
          fill={fill ? "currentColor" : "none"}
          stroke={stroke ? strokeColor || "currentColor" : "none"}
        />
      );
    } catch {
      return null;
    }
  }

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        className={clsx(className, "rds-comp-ai-icon__img")}
        onClick={onClick || undefined}
        role="img"
        id={id}
        data-testid={dataTestId}
        style={style}
        data-bs-dismiss={databsdismiss}
        data-bs-target={databstarget}
        data-bs-toggle={databstoggle}
        aria-controls={ariacontrols}
      />
    );
  }

  return null;
};

const RdsCompAiIcon = memo(RdsCompAiIconComponent);
RdsCompAiIcon.displayName = "RdsCompAiIcon";
export default RdsCompAiIcon;
