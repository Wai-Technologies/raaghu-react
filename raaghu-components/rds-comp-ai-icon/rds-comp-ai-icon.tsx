import React, { useState, useEffect } from "react";
import './rds-comp-ai-icon.scss';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

const defaultMaterialIcons: { [key: string]: React.ComponentType<any> } = {
  'users': GroupOutlinedIcon,
  'person-outline': PersonOutlineIcon,
};

let materialIconsRegistry: { [key: string]: React.ComponentType<any> } = {
  ...defaultMaterialIcons
};

export const registerMaterialIcon = (name: string, iconComponent: React.ComponentType<any>) => {
  materialIconsRegistry[name.toLowerCase()] = iconComponent;
  try { window.dispatchEvent(new CustomEvent('rds-icons-updated')); } catch (e) { }
};

export const registerMaterialIcons = (icons: { [key: string]: React.ComponentType<any> }) => {
  Object.entries(icons).forEach(([name, component]) => {
    materialIconsRegistry[name.toLowerCase()] = component;
  });
  try { window.dispatchEvent(new CustomEvent('rds-icons-updated')); } catch (e) { }
};

const createMuiIconWrapper = (MuiIcon: React.ComponentType<any>): React.ComponentType<React.SVGProps<SVGSVGElement>> => {
  return React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => {
    const {
      color,
      fontSize,
      className,
      style,
      ...restProps
    } = props || {};

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

  useEffect(() => {
    const resolveIcon = () => {
      try {
        if (props.SvgIcon) {
          setIconComponent(props.SvgIcon);
          return;
        }
        if (name && materialIconsRegistry[name]) {
          const MuiIcon = materialIconsRegistry[name];
          if (MuiIcon) {
            const wrappedIcon = createMuiIconWrapper(MuiIcon);
            setIconComponent(wrappedIcon);
            return;
          }
        }
        setIconComponent(null);
      } catch (error) {
        setIconComponent(null);
      }
    };

    resolveIcon();
    const onIconsUpdated = () => resolveIcon();
    window.addEventListener('rds-icons-updated', onIconsUpdated);
    return () => {
      window.removeEventListener('rds-icons-updated', onIconsUpdated);
    };
  }, [name, props.SvgIcon]);

  const style = {
    height: props.height ? props.height : "22px",
    width: props.width ? props.width : "22px",
    strokeWidth: props.strokeWidth ? props.strokeWidth : "inherit",
    ...(props.position === "center" && { margin: "auto" }),
    ...(props.position === "top-left" && { margin: "0" }),
    ...(props.position === "none" && {}),
    ...(!props.position && { margin: "auto" }),
  };

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
      return null;
    }
  }

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

  return null;
};

RdsCompAiIcon.displayName = "RdsCompAiIcon"
export default RdsCompAiIcon;