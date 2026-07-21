import React from "react";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

type IconComponentType = React.ElementType;
export interface RdsCompAiIconProps {
  width?: string;
  height?: string;
  colorVariant?: string;
  name?: string;
  fill?: boolean;
  stroke?: boolean;
  strokeWidth?: string;
  borderRadius?: string;
  onClick?: React.MouseEventHandler<HTMLElement | SVGSVGElement> | null;
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
  SvgIcon?: IconComponentType;
  position?: "center" | "top-left" | "none";
}

const defaultMaterialIcons: { [key: string]: IconComponentType } = {
  'users': GroupOutlinedIcon,
  'person-outline': PersonOutlineIcon,
};

export const materialIconsRegistry: { [key: string]: IconComponentType } = {
  ...defaultMaterialIcons,
};

export const registerMaterialIcon = (name: string, iconComponent: IconComponentType) => {
  materialIconsRegistry[name.toLowerCase()] = iconComponent;
  try { globalThis.dispatchEvent(new CustomEvent('rds-icons-updated')); } catch { /* handled */ }
};

export const registerMaterialIcons = (icons: { [key: string]: IconComponentType }) => {
  Object.entries(icons).forEach(([name, component]) => {
    materialIconsRegistry[name.toLowerCase()] = component;
  });
  try { globalThis.dispatchEvent(new CustomEvent('rds-icons-updated')); } catch { /* handled */ }
};

export const createMuiIconWrapper = (MuiIcon: IconComponentType): IconComponentType => {
  return React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => {
    const { color, fontSize, className, style, ...restProps } = props || {};
    const combinedStyle = {
      ...style,
      ...(color && { color }),
      ...(fontSize && { fontSize }),
    };
    return <MuiIcon ref={ref} className={className} style={combinedStyle} {...restProps} />;
  });
};

export function resolveIconComponent(
  name: string,
  SvgIcon?: IconComponentType
): IconComponentType | null {
  try {
    if (SvgIcon) return SvgIcon;
    if (name && materialIconsRegistry[name]) {
      const MuiIcon = materialIconsRegistry[name];
      if (MuiIcon) return createMuiIconWrapper(MuiIcon);
    }
    return null;
  } catch {
    return null;
  }
}

export function buildIconStyle(props: RdsCompAiIconProps) {
  return {
    height: props.height ? props.height : "22px",
    width: props.width ? props.width : "22px",
    '--rds-ai-icon-size': 'var(--rds-ai-icon-size)',
    strokeWidth: props.strokeWidth ? props.strokeWidth : "inherit",
    ...(props.position === "center" && { margin: "auto" }),
    ...(props.position === "top-left" && { margin: "0" }),
    ...(props.position === "none" && {}),
    ...(!props.position && { margin: "auto" }),
  };
}

export function buildIconClassName(props: RdsCompAiIconProps) {
  const rootClass = "rds-comp-ai-icon";
  const modifierClasses = [
    props.classes,
    props.isCursorPointer ? `${rootClass}--cursor` : undefined,
    props.colorVariant ? `${rootClass}--${props.colorVariant}` : undefined,
  ]
    .filter(Boolean)
    .join(" ");
  return `${rootClass} ${modifierClasses}`.trim();
}

export interface IconRendererProps {
  props: RdsCompAiIconProps;
  IconComponent: IconComponentType;
}

export function IconRenderer({ props, IconComponent }: IconRendererProps) {
  const rootClass = "rds-comp-ai-icon";
  const className = buildIconClassName(props);
  const style = buildIconStyle(props);
  try {
    const Icon = IconComponent;
    const svgProps = {
      className: `${className} ${rootClass}__svg`,
      onClick: props.onClick || undefined,
      id: props.id,
      "data-testid": props.dataTestId,
      style,
      "data-bs-dismiss": props.databsdismiss,
      "data-bs-target": props.databstarget,
      "data-bs-toggle": props.databstoggle,
      "aria-controls": props.ariacontrols,
      fill: props.fill ? "currentColor" : "none",
      stroke: props.stroke ? (props.strokeColor || "currentColor") : "none",
    };
    return <Icon {...svgProps} />;
  } catch {
    return null;
  }
}

export function ImageIconRenderer({ props }: { props: RdsCompAiIconProps }) {
  const rootClass = "rds-comp-ai-icon";
  const className = buildIconClassName(props);
  const style = buildIconStyle(props);
  return (
    <img
      src={props.imageUrl}
      className={`${className} ${rootClass}__img`}
      onClick={props.onClick || undefined}
      role="img"
      id={props.id}
      data-testid={props.dataTestId}
      style={style}
      data-bs-dismiss={props.databsdismiss}
      data-bs-target={props.databstarget}
      data-bs-toggle={props.databstoggle}
      aria-controls={props.ariacontrols}
    />
  );
}

IconRenderer.displayName = 'IconRenderer';
ImageIconRenderer.displayName = 'ImageIconRenderer';

