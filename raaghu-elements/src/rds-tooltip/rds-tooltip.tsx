import { Tooltip as BsTooltip } from "bootstrap";
import React, { useEffect, useRef, forwardRef, ReactNode } from "react";
import "./../../../raaghu-react-themes/src/styles/tooltip.scss";

interface TooltipProps {
  children: ReactNode;  // Child element
  label?: string;  // Tooltip label
  style?: "No Arrow" | "Middle Bottom Arrow" | "Middle Top Arrow" | "Left Arrow" | "Right Arrow" | "Left Top Arrow" | "Right Top Arrow" | "Left bottom Arrow" | "Right bottom Arrow"; // Position of Tooltip
  trigger?: "hover" | "click" | "focus" | "manual"; // Trigger event
}

const Tooltip = forwardRef<HTMLElement, TooltipProps>((props, ref) => {
  const childRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!childRef.current || !props.label) return;

    const options = {
      title: props.label,
      placement: 
        props.style === "Left Top Arrow" || props.style === "Right Top Arrow" ? "bottom" :
        props.style === "Left bottom Arrow" || props.style === "Right bottom Arrow" ? "top" :
        props.style === "Middle Bottom Arrow" ? "top" :
        props.style === "Middle Top Arrow" ? "bottom" :
        props.style === "Left Arrow" ? "right" :
        props.style === "Right Arrow" ? "left" :
        props.style === "No Arrow" ? "auto" :
        props.style,
      trigger: props.trigger || "hover",
      customClass: 
        props.style === "Left Top Arrow" ? "tooltip-left-top" :
        props.style === "Right Top Arrow" ? "tooltip-right-top" :
        props.style === "Left bottom Arrow" ? "tooltip-left-bottom" :
        props.style === "Right bottom Arrow" ? "tooltip-right-bottom" :
        props.style === "No Arrow" ? "tooltip-no-arrow" :
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
