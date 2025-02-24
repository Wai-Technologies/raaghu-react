import React, { useEffect, useRef } from "react";
import "./rds-scroll-bar.scss";
import RdsIcon from "../rds-icon";

export interface RdsScrollBarProps {
  type?: "Mac" | "Simple"; // Scroll bar type
  position?: "Start" | "Middle" | "End"; // Scroll position
  showScrollButton?: boolean; // Show scroll buttons only for Mac type
}

const RdsScrollBar: React.FC<RdsScrollBarProps> = ({
  type = "Mac",
  position = "Start",
  showScrollButton = true,
}) => {
  const scrollContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContentRef.current) {
      const content = scrollContentRef.current;
      if (position === "Start") {
        content.scrollTop = 0;
      } else if (position === "Middle") {
        content.scrollTop = content.scrollHeight / 2 - content.clientHeight / 2;
      } else if (position === "End") {
        content.scrollTop = content.scrollHeight;
      }
    }
  }, [position]);

  const scrollToPosition = (pos: "Start" | "Middle" | "End") => {
    if (scrollContentRef.current) {
      const content = scrollContentRef.current;
      if (pos === "Start") {
        content.scrollTop = 0;
      } else if (pos === "Middle") {
        content.scrollTop = content.scrollHeight / 2 - content.clientHeight / 2;
      } else if (pos === "End") {
        content.scrollTop = content.scrollHeight;
      }
    }
  };

  return (
    <div className={type === "Mac" ? "scroll-container mac" : "scroll-container simple"}>
      {type === "Mac" && showScrollButton && (
        <div className="scroll-controls">
          <button
            className="scroll-button"
            onClick={() => scrollToPosition("Start")}
            style={{ backgroundColor: "lightgray" }}
          >
            <RdsIcon width="8px" height="8px" name="chevron_up" />
          </button>
          <button
            className="scroll-button"
            onClick={() => scrollToPosition("End")}
            style={{ backgroundColor: "lightgray" }}
          >
            <RdsIcon width="8px" height="8px" name="chevron_down" />
          </button>
        </div>
      )}
      <div className="scroll-content" ref={scrollContentRef}>
        <div style={{ height: "500px" }}></div>
      </div>
    </div>
  );
};

export default RdsScrollBar;