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
  const tooltipRef = useRef<BsTooltip | null>(null);

  // Function to safely dispose tooltip
  const safelyDisposeTooltip = () => {
    if (tooltipRef.current) {
      try {
        tooltipRef.current.dispose();
      } catch (error) {
        console.warn('Error disposing tooltip, this is harmless in Storybook:', error);
      }
      tooltipRef.current = null;
    }
  };

  // Function to determine placement based on style
  const getPlacement = () => {
    if (props.style === "LeftTopArrow" || props.style === "RightTopArrow") return "bottom";
    if (props.style === "LeftBottomArrow" || props.style === "RightBottomArrow") return "top";
    if (props.style === "MiddleBottomArrow") return "top";
    if (props.style === "MiddleTopArrow") return "bottom";
    if (props.style === "LeftArrow") return "right";
    if (props.style === "RightArrow") return "left";
    if (props.style === "NoArrow") return "auto";
    return props.style;
  };
  
  // Function to determine custom class based on style
  const getCustomClass = () => {
    if (props.style === "LeftTopArrow") return "tooltip-left-top";
    if (props.style === "RightTopArrow") return "tooltip-right-top";
    if (props.style === "LeftBottomArrow") return "tooltip-left-bottom";
    if (props.style === "RightBottomArrow") return "tooltip-right-bottom";
    if (props.style === "NoArrow") return "tooltip-no-arrow";
    return "";
  };

  // Initialize tooltip on mount and clean up on unmount
  useEffect(() => {
    // Initialize tooltip only if we have a child element and label
    if (!childRef.current || !props.label) return;

    // Clean up any previous tooltip
    safelyDisposeTooltip();

    // Configure tooltip options
    const options = {
      title: props.label,
      placement: getPlacement(),
      trigger: props.trigger || 'hover focus', // Use hover focus as default trigger
      customClass: getCustomClass(),
      html: true,
      container: 'body', // Render tooltips in the body to avoid CSS issues
    };

    try {
      // Create new Bootstrap tooltip instance
      tooltipRef.current = new BsTooltip(childRef.current, options as any);
    } catch (error) {
      console.warn('Error creating tooltip, this is harmless in Storybook:', error);
      return;
    }
    
    // For SVG-based icons, we need special handling to ensure hover works
    const element = childRef.current;
    
    const showTooltip = () => {
      if (tooltipRef.current) {
        try {
          tooltipRef.current.show();
        } catch (error) {
          console.warn('Error showing tooltip:', error);
        }
      }
    };
    
    const hideTooltip = () => {
      if (tooltipRef.current) {
        try {
          tooltipRef.current.hide();
        } catch (error) {
          console.warn('Error hiding tooltip:', error);
        }
      }
    };
    
    // If the element contains an SVG (likely an icon), add special handling
    let isSvgIcon = false;
    try {
      isSvgIcon = 
        (element?.tagName === 'SVG') || 
        !!element?.querySelector('svg') || 
        (element?.tagName === 'SPAN' && element?.innerHTML?.includes('<svg'));
    } catch (error) {
      console.warn('Error detecting SVG icon, skipping special handling:', error);
    }
    
    if (isSvgIcon && element) {
      element.addEventListener('mouseenter', showTooltip);
      element.addEventListener('mouseleave', hideTooltip);
    }
    
    // Clean up on unmount
    return () => {
      if (isSvgIcon && element) {
        try {
          element.removeEventListener('mouseenter', showTooltip);
          element.removeEventListener('mouseleave', hideTooltip);
        } catch (error) {
          console.warn('Error removing event listeners, this is harmless:', error);
        }
      }
      safelyDisposeTooltip();
    };
  }, [props.label, props.style, props.trigger]);

  return React.cloneElement(props.children as React.ReactElement, {
    ref: (element: HTMLElement) => {
      if (element) {
        childRef.current = element;
        if (typeof ref === "function") {
          ref(element);
        } else if (ref) {
          ref.current = element;
        }
      }
    },
    role: "tooltip",
    // Add data-bs-toggle attribute for Bootstrap's tooltip JS
    "data-bs-toggle": "tooltip",
    // Ensure the element can receive focus for keyboard accessibility
    tabIndex: 0,
  });
});

export default Tooltip;
