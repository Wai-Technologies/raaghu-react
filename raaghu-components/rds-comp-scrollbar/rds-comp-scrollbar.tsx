import React, { useEffect, useRef } from "react";
import "./rds-comp-scrollbar.scss";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { joinClassNames, type RdsStylingProps } from "../../raaghu-elements/shared/utils/styling-props";

export enum ScrollBarType {
  Mac = "Mac",
  Simple = "Simple",
}

export enum ScrollPosition {
  Start = "Start",
  Middle = "Middle",
  End = "End",
}
export interface RdsScrollBarProps extends RdsStylingProps {
  type?: ScrollBarType;
  position?: ScrollPosition;
  showButtons?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const RdsCompScrollBar = React.forwardRef<HTMLDivElement, RdsScrollBarProps>(function RdsCompScrollBar({
  type = ScrollBarType.Mac,
  position = ScrollPosition.Start,
  showButtons = true,
  startIcon = <ArrowDropUp />,
  endIcon = <ArrowDropDown />,
  children,
  className,
  sx,
  style
}, ref) {
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
    <Box ref={ref} className={joinClassNames(`rds-scrollbar ${type === ScrollBarType.Mac ? "rds-scrollbar--mac" : "rds-scrollbar--simple"}`, className)} sx={sx} style={style}>
      {type === ScrollBarType.Mac && showButtons && (
        <div className="rds-scrollbar__controls">
          <button
            type="button"
            className="rds-scrollbar__button"
            onClick={() => scrollToPosition(ScrollPosition.Start)}
            aria-label="Scroll to top"
          >
            {startIcon}
          </button>
          <button
            type="button"
            className="rds-scrollbar__button"
            onClick={() => scrollToPosition(ScrollPosition.End)}
            aria-label="Scroll to bottom"
          >
            {endIcon}
          </button>
        </div>
      )}
      <div className="rds-scrollbar__content" ref={scrollContentRef}>
        {children ?? <div className="rds-scrollbar__inner-content"></div>}
      </div>
    </Box>
  );
});
RdsCompScrollBar.displayName = "RdsCompScrollBar";
export default RdsCompScrollBar;