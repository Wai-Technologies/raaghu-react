import React, { useState, useEffect, ReactElement } from "react";
import './rds-comp-ai-icon.scss';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

interface IconCache {
  [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

// Default Material-UI icons mapping (can be extended)
const defaultMaterialIcons: { [key: string]: React.ComponentType<any> } = {
  'users': PersonOutlineIcon,
  'person-outline': PersonOutlineIcon,
};

// Global icon registry for extending icons
let materialIconsRegistry: { [key: string]: React.ComponentType<any> } = {
  ...defaultMaterialIcons
};

// Function to register additional Material-UI icons
export const registerMaterialIcon = (name: string, iconComponent: React.ComponentType<any>) => {
  materialIconsRegistry[name.toLowerCase()] = iconComponent;
};

// Function to register multiple icons at once
export const registerMaterialIcons = (icons: { [key: string]: React.ComponentType<any> }) => {
  Object.entries(icons).forEach(([name, component]) => {
    materialIconsRegistry[name.toLowerCase()] = component;
  });
};

// Wrapper function to convert MUI icons to SVG components
const createMuiIconWrapper = (MuiIcon: React.ComponentType<any>): React.ComponentType<React.SVGProps<SVGSVGElement>> => {
  return React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => {
    // Safely destructure props with defaults
    const {
      color,
      fontSize,
      className,
      style,
      ...restProps
    } = props || {};

    // Create safe style object
    const combinedStyle = {
      ...style,
      ...(color && { color }),
      ...(fontSize && { fontSize }),
    };

    return (
      <MuiIcon
        ref={ref}
        className={className}
        style={combinedStyle}
        {...restProps}
      />
    );
  });
};

const iconCache: IconCache = {};

export interface RdsCompAiIconProps {
  width?: string;
  height?: string;
  colorVariant?: string;
  name?: string;
  fill?: boolean;
  stroke?: boolean;
  strokeWidth?: string;
  borderRadius?: string;
  onClick?: React.MouseEventHandler<HTMLElement | SVGSVGElement>;
  opacity?: string;
  isAnimate?: boolean;
  classes?: any;
  dataTestId?: string;
  // ...existing code...
  databsdismiss?: string;
  databstarget?: string;
  databstoggle?: string;
  ariacontrols?: string;
  imageUrl?: string; // Add imageUrl prop
  id?: string;
  iconPath?: string;
  type?: "icon" | "lottie";
  isHover?: boolean;
  isContinueAnimate?: boolean;
  hovered?: boolean;
  isHovered?: boolean;
  isCursorPointer?: boolean; 
  strokeColor?: string;
  SvgIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  position?: "center" | "top-left" | "none";
}

const RdsCompAiIcon = (props: RdsCompAiIconProps) => {
  const name: string = !props.name ? "" : props.name.toLowerCase();
  const [IconComponent, setIconComponent] = useState<React.ComponentType<React.SVGProps<SVGSVGElement>> | null>(props.SvgIcon || null);

  // Load Material-UI icons by name
  useEffect(() => {
    try {
      // Priority 1: Use provided SvgIcon component
      if (props.SvgIcon) {
        setIconComponent(props.SvgIcon);
        return;
      }

      // Priority 2: Use Material-UI icon by name
      if (name && materialIconsRegistry[name]) {
        const MuiIcon = materialIconsRegistry[name];
        if (MuiIcon) {
          const wrappedIcon = createMuiIconWrapper(MuiIcon);
          setIconComponent(wrappedIcon);
          return;
        }
      }

      // If no icon found, set to null
      setIconComponent(null);
    } catch (error) {
      console.warn('Error loading icon:', error);
      setIconComponent(null);
    }
  }, [name, props.SvgIcon, props.colorVariant, props.fill, props.stroke, props.strokeWidth, props.opacity, props.strokeColor]);

  const style = {
    height: props.height ? props.height : "22px",
    width: props.width ? props.width : "22px",
    strokeWidth: props.strokeWidth ? props.strokeWidth : "inherit",
    ...(props.position === "center" && { margin: "auto" }),
    ...(props.position === "top-left" && { margin: "0" }),
    ...(props.position === "none" && {}),
    ...(!props.position && { margin: "auto" }), // default to center if no position specified
  };

  // BEM-style root and modifier class names
  const rootClass = "rds-comp-ai-icon";
  const modifierClasses = [
    props.classes,
    props.isCursorPointer ? `${rootClass}--cursor` : undefined,
    props.colorVariant ? `${rootClass}--${props.colorVariant}` : undefined,
  ]
    .filter(Boolean)
    .join(" ");
  const className = `${rootClass} ${modifierClasses}`.trim();

  if (IconComponent) {
    try {
      const Icon = IconComponent;
      const svgProps = {
        className: `${className} ${rootClass}__svg`,
        onClick: props.onClick as React.MouseEventHandler<SVGSVGElement>,
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
    } catch (error) {
      console.warn('Error rendering icon:', error);
      return null;
    }
  }

  // If no icon component found, handle imageUrl or return null
  if (props.imageUrl) {
    return (
      <img
        src={props.imageUrl}
        className={`${className} ${rootClass}__img`}
        onClick={props.onClick}
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

  // If no icon found, return null
  return null;
};

RdsCompAiIcon.displayName = "RdsCompAiIcon"
export default RdsCompAiIcon;