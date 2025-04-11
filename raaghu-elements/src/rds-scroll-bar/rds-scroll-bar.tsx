import React, { useEffect, useRef } from "react";
import "./rds-scroll-bar.scss";
import RdsIcon from "../rds-icon";

export enum ScrollBarType {
  Mac = "Mac",
  Simple = "Simple",
}

export enum ScrollPosition {
  Start = "Start",
  Middle = "Middle",
  End = "End",
}
export interface RdsScrollBarProps {
  type?: ScrollBarType; // Type of scrollbar (Mac or Simple)
  position?: ScrollPosition; // Initial scroll position (Start, Middle, End)
  showButtons?: boolean; // Show scroll buttons (true or false)
}

const RdsScrollBar: React.FC<RdsScrollBarProps> = ({
  type = ScrollBarType.Mac,
  position = ScrollPosition.Start,
  showButtons = true,
}) => {
  const scrollContentRef = useRef<HTMLDivElement>(null);

  const scrollToPosition = (pos: ScrollPosition) => {
    if (scrollContentRef.current) {
      const content = scrollContentRef.current;
      if (pos === ScrollPosition.Start) {
        content.scrollTop = 0;
      } else if (pos === ScrollPosition.Middle) {
        content.scrollTop = content.scrollHeight / 2 - content.clientHeight / 2;
      } else if (pos === ScrollPosition.End) {
        content.scrollTop = content.scrollHeight;
      }
    }
  };

  // Apply position whenever type or position changes
  useEffect(() => {
    scrollToPosition(position);
  }, [position, type]);

  return (
    <div className={type === ScrollBarType.Mac ? "scroll-container mac" : "scroll-container simple"}>
      {type === ScrollBarType.Mac && showButtons && (
        <div className="scroll-controls">
          <button
            className="scroll-button"
            onClick={() => scrollToPosition(ScrollPosition.Start)}
            style={{ backgroundColor: "lightgray" }}
          >
            <RdsIcon width="8px" height="8px" name="chevron_up" />
          </button>
          <button
            className="scroll-button"
            onClick={() => scrollToPosition(ScrollPosition.End)}
            style={{ backgroundColor: "lightgray" }}
          >
            <RdsIcon width="8px" height="8px" name="chevron_down" />
          </button>
        </div>
      )}
      <div className="scroll-content" ref={scrollContentRef}>
        <div style={{ height: "700px" }}></div>
      </div>
    </div>
  );
};

export default RdsScrollBar;