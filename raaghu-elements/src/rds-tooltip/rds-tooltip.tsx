import { Tooltip as BsTooltip } from "bootstrap";
import React, { useEffect, useRef, forwardRef, ReactNode } from "react";
import "./../../../raaghu-react-themes/src/styles/tooltip.scss";

export enum TooltipStyle {
  NoArrow = "NoArrow",
  MiddleBottomArrow = "MiddleBottomArrow",
  MiddleTopArrow = "MiddleTopArrow",
  LeftArrow = "LeftArrow",
  RightArrow = "RightArrow",
  LeftTopArrow = "LeftTopArrow",
  RightTopArrow = "RightTopArrow",
  LeftBottomArrow = "LeftBottomArrow",
  RightBottomArrow = "RightBottomArrow",
}

export enum TooltipTrigger {
  Hover = "hover",
  Click = "click",
  Focus = "focus",
  Manual = "manual",
}
interface TooltipProps {
  children: ReactNode;  // Child element
  label?: string;  // Tooltip label
  style?: TooltipStyle; // Position of Tooltip
  trigger?: TooltipTrigger; // Trigger event
}

const Tooltip = forwardRef<HTMLElement, TooltipProps>((props, ref) => {
  const childRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!childRef.current || !props.label) return;

    const options = {
      title: props.label,
      placement: 
        props.style === "LeftTopArrow" || props.style === "RightTopArrow" ? "bottom" :
        props.style === "LeftBottomArrow" || props.style === "RightBottomArrow" ? "top" :
        props.style === "MiddleBottomArrow" ? "top" :
        props.style === "MiddleTopArrow" ? "bottom" :
        props.style === "LeftArrow" ? "right" :
        props.style === "RightArrow" ? "left" :
        props.style === "NoArrow" ? "auto" :
        props.style,
      trigger: props.trigger || "hover",
      customClass: 
        props.style === "LeftTopArrow" ? "tooltip-left-top" :
        props.style === "RightTopArrow" ? "tooltip-right-top" :
        props.style === "LeftBottomArrow" ? "tooltip-left-bottom" :
        props.style === "RightBottomArrow" ? "tooltip-right-bottom" :
        props.style === "NoArrow" ? "tooltip-no-arrow" :
        "",
    };

    const t = new BsTooltip(childRef.current, (options as any));

    return () => {
      t.dispose();
    };
  }, [props.label, props.style, props.trigger]);

  return React.cloneElement(props.children as React.ReactElement, {
    ref: (element: HTMLElement) => {
      childRef.current = element;
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    },
    role: "tooltip",
  });
});

export default Tooltip;
