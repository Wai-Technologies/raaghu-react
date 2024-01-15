import { Tooltip as BsTooltip } from "bootstrap";
import React, { useEffect, useRef, forwardRef, ReactNode } from "react";
import { placements } from "../../libs/types";

interface TooltipProps {
  children: ReactNode;
  text?: string;
  place?: placements;
  trigger?: "hover" | "click" | "focus" | "manual";
}

const Tooltip = forwardRef<HTMLElement, TooltipProps>((props, ref) => {
  const childRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!childRef.current) return;

    const options = {
      title: props.text,
      placement: props.place,
      trigger: props.trigger || "hover", 
    };

    const t = new BsTooltip(childRef.current, options);

    return () => {
      t.dispose();
    };
  }, [props.text, props.place]);

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
