import { Tooltip as BsTooltip } from "bootstrap";
import React, { useEffect, useRef, forwardRef, ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  text?: string;
  place?: "auto" | "top" | "bottom" | "right" | "left";
  trigger?: "hover" | "click" | "focus" | "manual";
}

const Tooltip = forwardRef<HTMLElement, TooltipProps>((props, ref) => {
  const childRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!childRef.current || !props.text) return;

    const options = {
      title: props.text,
      placement: props.place || "auto", // Providing a default value
      trigger: props.trigger || "hover",
    };

    const t = new BsTooltip(childRef.current, options);

    return () => {
      t.dispose();
    };
  }, [props.text, props.place, props.trigger]);

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
