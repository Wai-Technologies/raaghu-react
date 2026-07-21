import React, { useState, useEffect } from "react";
import './rds-comp-ai-icon.scss';
import {
  resolveIconComponent,
  IconRenderer,
  ImageIconRenderer,
  registerMaterialIcon,
  registerMaterialIcons,
  RdsCompAiIconProps,
} from './rds-comp-ai-icon-helpers';

export { registerMaterialIcon, registerMaterialIcons };
export type { RdsCompAiIconProps };

const RdsCompAiIcon = (props: RdsCompAiIconProps) => {
  const name: string = !props.name ? "" : props.name.toLowerCase();
  const [IconComponent, setIconComponent] = useState<React.ElementType | null>(props.SvgIcon || null);

  useEffect(() => {
    const resolveIcon = () => {
      setIconComponent(resolveIconComponent(name, props.SvgIcon));
    };

    resolveIcon();
    const onIconsUpdated = () => resolveIcon();
    globalThis.addEventListener('rds-icons-updated', onIconsUpdated);
    return () => {
      globalThis.removeEventListener('rds-icons-updated', onIconsUpdated);
    };
  }, [name, props.SvgIcon]);

  if (IconComponent) {
    return <IconRenderer props={props} IconComponent={IconComponent} />;
  }

  if (props.imageUrl) {
    return <ImageIconRenderer props={props} />;
  }

  return null;
};

RdsCompAiIcon.displayName = "RdsCompAiIcon";
export default RdsCompAiIcon;
