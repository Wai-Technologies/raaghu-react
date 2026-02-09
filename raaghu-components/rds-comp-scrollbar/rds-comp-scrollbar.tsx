import React, { useEffect, useRef } from "react";
import "./rds-comp-scrollbar.scss";
import {RdsIconButton} from "../../raaghu-elements/index";

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
  type?: ScrollBarType;
  position?: ScrollPosition;
  showButtons?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const RdsCompScrollBar: React.FC<RdsScrollBarProps> = ({
  type = ScrollBarType.Mac,
  position = ScrollPosition.Start,
  showButtons = true,
  startIcon,
  endIcon
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

  useEffect(() => {
    scrollToPosition(position);
  }, [position, type]);

  return (
    <div className={`rds-scrollbar ${type === ScrollBarType.Mac ? "rds-scrollbar--mac" : "rds-scrollbar--simple"}`}>
      {type === ScrollBarType.Mac && showButtons && (
        <div className="rds-scrollbar__controls">
          <button
            className="rds-scrollbar__button"
            onClick={() => scrollToPosition(ScrollPosition.Start)}
            aria-label="Scroll to top"
          >
            {startIcon}
          </button>
          <button
            className="rds-scrollbar__button"
            onClick={() => scrollToPosition(ScrollPosition.End)}
            aria-label="Scroll to bottom"
          >
            {endIcon}
          </button>
        </div>
      )}
      <div className="rds-scrollbar__content" ref={scrollContentRef}>
        <div className="rds-scrollbar__inner-content"></div>
      </div>
    </div>
  );
};
RdsCompScrollBar.displayName = "RdsCompScrollBar";
export default RdsCompScrollBar;