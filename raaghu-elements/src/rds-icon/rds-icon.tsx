import React, { useState, useEffect, ReactElement } from "react";
import Tooltip, { TooltipStyle } from "../rds-tooltip/rds-tooltip";
import { placements } from "../../libs";

// Define the type for our icon cache more explicitly
interface IconCache {
  [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

// Cache for dynamically imported SVG components
const iconCache: IconCache = {};

export interface RdsIconProps {
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
  tooltip?: boolean;
  tooltipPlacement?: placements;
  tooltipTitle?: string;
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
}


const RdsIcon = (props: RdsIconProps) => {
  const name: string = !props.name ? "" : props.name.toLowerCase();
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadFailed, setLoadFailed] = useState<boolean>(false);
  const [IconComponent, setIconComponent] = useState<React.ComponentType<React.SVGProps<SVGSVGElement>> | null>(props.SvgIcon || null);

  // Load SVG content
  useEffect(() => {
    // If directly provided an SVG component, use that
    if (props.SvgIcon) {
      setIconComponent(props.SvgIcon);
      return;
    }

    // If no name provided, nothing to load
    if (!name) {
      setIconComponent(null);
      return;
    }

    // Check if already cached
    if (iconCache[name]) {
      setIconComponent(iconCache[name]);
      return;
    }

    setIsLoading(true);
    setLoadFailed(false);

    // Use fetch to get the SVG content
    let iconPath = `/assets/icons/${name}.svg`;
    // If running in Node (test), use absolute file path
    if (typeof window === 'undefined' && typeof process !== 'undefined') {
      const path = require('path');
      iconPath = path.resolve(__dirname, '../../public/assets/icons/', `${name}.svg`);
      // node-fetch requires file:// protocol for local files
      iconPath = 'file://' + iconPath.replace(/\\/g, '/');
    }
    fetch(iconPath)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load icon: ${name}`);
        }
        return response.text();
      })
      .then(svgText => {
        // Process SVG with style according to paste.txt approach
        const processedSvg = svgElementFromString(svgText);
        setSvgContent(processedSvg.outerHTML);
        setIsLoading(false);
      })
      .catch(error => {
        console.warn(`Failed to load icon: ${name}`, error);
        setLoadFailed(true);
        setIsLoading(false);
      });
  }, [name, props.SvgIcon, props.colorVariant, props.fill, props.stroke, props.strokeWidth, props.opacity, props.strokeColor]);

  // Process SVG styling from paste.txt
  const svgElementFromString = (svgContent: string): SVGSVGElement => {
    const fillColor = "currentColor";
    const div = document.createElement("div");
    div.innerHTML = svgContent;
    const svg = div.querySelector("svg");
    if (!svg) {
      throw Error("<svg> tag not found");
    }
    
    if (props.height) {
      svg.style.height = props.height;
    }
    if (props.width) {
      svg.style.width = props.width;
    }
    if (props.opacity) {
      svg.style.opacity = props.opacity;
    }
    if (props.strokeWidth) {
      svg.style.strokeWidth = props.strokeWidth;
    }

    // Apply color variant classes - same approach as paste.txt
    if (props.colorVariant) {
      const validColorVariants = ["primary", "secondary", "success", "info", "warning", 
                                 "danger", "dark", "light", "review", "basic", 
                                 "standard", "premium", "professional"];
      
      if (validColorVariants.includes(props.colorVariant)) {
        svg.setAttribute("class", "text-" + props.colorVariant);
      }
    }

    // Apply fill and stroke properties
    if (props.fill) {
      svg.style.fill = fillColor;
    } else {
      svg.style.fill = "none";
    }

    if ((props.stroke || props.stroke === undefined) && (!props.strokeColor)) {
      svg.style.stroke = fillColor;
    } else {
      svg.style.stroke = "none";
    }
    
    if (props.strokeColor) {
      svg.style.stroke = props.strokeColor;
    }

    // Apply stroke to individual SVG elements
    const elementsWithStroke = svg.querySelectorAll(
      "path, circle, polygon, line, ellipse, rect"
    );

    elementsWithStroke.forEach((element) => {
      const svgElement = element as SVGElement;
      if (props.stroke && !props.strokeColor) {
        svgElement.style.stroke = fillColor;
      } 
      else if (props.strokeColor) {
        svgElement.style.stroke = props.strokeColor;
      }
      else {
        svgElement.style.removeProperty("stroke");
      }
    });

    if (props.fill && (props.stroke === false || props.stroke === true)) {
      svg.style.fill = fillColor;
      svg.style.stroke = "inherit";
    }

    return svg;
  };

  const style = {
    height: props.height ? props.height : "22px",
    width: props.width ? props.width : "22px",
    strokeWidth: props.strokeWidth ? props.strokeWidth : "inherit",
    margin: "auto",
  };

  const className = `${props.isCursorPointer ? "cursor-pointer" : ""} ${
    props.classes || ""
  }`.trim();

  // If using a provided SvgIcon component
  if (IconComponent) {
    const Icon = IconComponent;
    const svgProps = {
      className,
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

    const iconElement = <Icon {...svgProps} />;
    
    return props.tooltip ? (
       <Tooltip label={props.tooltipTitle} style={TooltipStyle.MiddleBottomArrow}>
        {iconElement}
      </Tooltip>
    ) : (
      iconElement
    );
  }

  // Render based on content availability
  let iconElement: ReactElement | null = null;
  
  if (isLoading) {
    // Show loading placeholder
    iconElement = <div style={style} className={className}></div>;
  } else if (svgContent) {
    // Display SVG content with styling
    iconElement = (
      <span
        className={className}
        onClick={props.onClick}
        dangerouslySetInnerHTML={{ __html: svgContent }}
        role="img"
        id={props.id}
        data-testid={props.dataTestId}
        data-bs-dismiss={props.databsdismiss}
        data-bs-target={props.databstarget}
        data-bs-toggle={props.databstoggle}
        aria-controls={props.ariacontrols}
      />
    );
  } else if (props.imageUrl) {
    // Display image
    iconElement = (
      <img
        src={props.imageUrl}
        className={className}
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
  } else if (loadFailed && name) {
    // Fallback to image tag if SVG component failed to load
    const iconPath = `/assets/icons/${name}.svg`;
    iconElement = (
      <img
        src={iconPath}
        className={className}
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
  } else {
    // No icon found or provided
    return null;
  }

  return props.tooltip ? (
     <Tooltip label={props.tooltipTitle} style={TooltipStyle.MiddleBottomArrow}>
      {iconElement}
    </Tooltip>
  ) : (
    iconElement
  );
};

export default RdsIcon;