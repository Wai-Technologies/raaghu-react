import React, { useEffect, useState } from "react";
import { Icons } from "./Icons";
import { Flags } from "./flag-icons";
import Tooltip, { TooltipStyle } from "../rds-tooltip/rds-tooltip";
import { placements } from "../../libs";
import Lottie from "react-lottie-player";

export interface RdsIconProps {
  width?: string;
  height?: string;
  colorVariant?: string;
  name?: string;
  fill?: boolean;
  stroke?: boolean;
  strokeWidth?: string;
  borderRadius?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
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
  id?: string;
  imageUrl?: string; // Add imageUrl prop

  iconPath?: string;
  type?: "icon" | "lottie";
  isHover?: boolean;
  isContinueAnimate?: boolean;
  hovered?: boolean;
  isHovered?: boolean;
  isCursorPointer?: boolean; // New prop for cursor-pointer class
}

const RdsIcon = (props: RdsIconProps) => {
  const name: string = !props.name ? "" : props.name.toLowerCase();
  const icon = Icons.hasOwnProperty(name) ? Icons[name] : Flags[name];
  const fillColor = "currentColor";

  //Set default icon animation when path is not available.
  const path = props.iconPath ? props.iconPath : "./puzzle.json";
  const lottie: any = {};
  const [player, setPlayer] = useState(lottie);
  const [animationData, setAnimationData] = useState<any>(null); // State to store animation data
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (props.iconPath) {
      // Load the animation data when iconPath is provided
      fetch(props.iconPath) // You can use fetch to load the JSON file
        .then((response) => response.json())
        .then((data) => setAnimationData(data))
        .catch((error) => {
          console.error("Error loading animation data:", error);
        });
    }
  }, [props.iconPath]);

  useEffect(() => {
    if (lottie.play && lottie.stop) {
      if (props.isHover) {
        lottie?.play();
      } else if (props.isContinueAnimate) {
        lottie?.play();
      } else {
        lottie?.stop();
      }
    }
  }, [props.isHover, props.isContinueAnimate, lottie]);

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

    if (props.colorVariant == "primary") {
      svg.setAttribute("class", "text-" + props.colorVariant);
    } else if (props.colorVariant == "secondary") {
      svg.setAttribute("class", "text-" + props.colorVariant);
    } else if (props.colorVariant == "success") {
      svg.setAttribute("class", "text-" + props.colorVariant);
    } else if (props.colorVariant == "info") {
      svg.setAttribute("class", "text-" + props.colorVariant);
    } else if (props.colorVariant == "warning") {
      svg.setAttribute("class", "text-" + props.colorVariant);
    } else if (props.colorVariant == "danger") {
      svg.setAttribute("class", "text-" + props.colorVariant);
    } else if (props.colorVariant == "dark") {
      svg.setAttribute("class", "text-" + props.colorVariant);
    } else if (props.colorVariant == "light") {
      svg.setAttribute("class", "text-" + props.colorVariant);
    } else if (props.colorVariant == "review") {
      svg.setAttribute("class", "text-" + props.colorVariant);
    } else if (props.colorVariant == "basic") {
      svg.setAttribute("class", "text-" + props.colorVariant);
    } else if (props.colorVariant == "standard") {
      svg.setAttribute("class", "text-" + props.colorVariant);
    } else if (props.colorVariant == "premium") {
      svg.setAttribute("class", "text-" + props.colorVariant);
    } else if (props.colorVariant == "professional") {
      svg.setAttribute("class", "text-" + props.colorVariant);
    }

    if (props.fill) {
      svg.style.fill = fillColor;
      // svg.style.stroke = "white";
    } else {
      svg.style.fill = "none";
    }

    if (props.stroke || props.stroke === undefined) {
      svg.style.stroke = fillColor;
    } else {
      svg.style.stroke = "none";
    }

    const strokeColor = props.stroke ? fillColor : "none";
    const elementsWithStroke = svg.querySelectorAll(
      "path, circle, polygon, line, ellipse, rect"
    );

    elementsWithStroke.forEach((element) => {
      const svgElement = element as SVGGraphicsElement;
      if (props.stroke) {
        svgElement.style.stroke = strokeColor;
      } else {
        svgElement.style.removeProperty("stroke");
      }
    });

    if (props.fill && (props.stroke === false || props.stroke === true)) {
      svg.style.fill = fillColor;
      svg.style.stroke = "inherit";
    }

    return (
      svg || document.createElementNS("http://www.w3.org/2000/svg", "path")
    );
  };

  const style = {
    height: props.height ? props.height : "22px",
    width: props.width ? props.width : "22px",
    strokeWidth: props.strokeWidth ? props.strokeWidth : "inherit",
    margin: "auto",
  };
  const stringData =
    /*   icon != undefined ? svgElementFromString(icon).outerHTML : "";*/
    icon !== undefined ? svgElementFromString(icon).outerHTML : "";

  // const [isPlaying, setIsPlaying] = useState(false);

  // Function to handle mouse enter (hover)
  // Add state to track hover state

  // Function to handle mouse enter (hover)
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Function to handle mouse leave (hover out)
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const className = `${props.isCursorPointer ? "cursor-pointer" : ""} ${props.classes
    }`;

  return (
    <>
      {props.type === "lottie" && (
        <>
          {props.tooltip ? (
            <Tooltip label={props.tooltipTitle} style={TooltipStyle.MiddleBottomArrow}>
              <div
                id={props.id}
                data-testid={props.dataTestId}
                data-bs-dismiss={props.databsdismiss}
                data-bs-target={props.databstarget}
                data-bs-toggle={props.databstoggle}
                aria-controls={props.ariacontrols}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="lf-player-container">
                  <Lottie
                    animationData={animationData}
                    loop
                    style={style}
                    speed={1}
                    play={isHovered}
                  />
                </div>
              </div>
            </Tooltip>
          ) : (
            <>
              {!props.isContinueAnimate && (
                <div
                  className="lf-player-container"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Lottie
                    animationData={animationData}
                    loop
                    style={style}
                    speed={1}
                    play={props.isHovered}
                  />
                </div>
              )}
              {props.isContinueAnimate && (
                <div
                  className="lf-player-container"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Lottie
                    animationData={animationData}
                    loop
                    style={style}
                    speed={1}
                    play={props.isHovered}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
      {props.type !== "lottie" && (
        <>
          {props.tooltip ? (
            <Tooltip label={props.tooltipTitle} style={TooltipStyle.MiddleBottomArrow}>
              {props.imageUrl ? (
                <img
                  src={props.imageUrl}
                  className={className}
                  onClick={props.onClick}
                  role="img"
                  id={props.id}
                  data-testid={props.dataTestId}
                  style={style}
                />
              ) : (
                <span
                  className={className}
                  onClick={props.onClick}
                  dangerouslySetInnerHTML={{ __html: stringData }}
                  role="img"
                  id={props.id}
                  data-testid={props.dataTestId}
                  data-bs-dismiss={props.databsdismiss}
                  data-bs-target={props.databstarget}
                  data-bs-toggle={props.databstoggle}
                  aria-controls={props.ariacontrols}
                ></span>
              )}
            </Tooltip>
          ) : (
            <>
              {props.imageUrl ? (
                <img
                  src={props.imageUrl}
                  className={className}
                  onClick={props.onClick}
                  role="img"
                  id={props.id}
                  data-testid={props.dataTestId}
                  style={style}
                />
              ) : (
                <span
                  className={className}
                  onClick={props.onClick}
                  dangerouslySetInnerHTML={{ __html: stringData }}
                  role="img"
                  id={props.id}
                  data-testid={props.dataTestId}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default RdsIcon;