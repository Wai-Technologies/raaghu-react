import { useCallback, useEffect, useMemo, useRef } from "react";
import clsx from "clsx";
import "./rds-comp-scrollbar.scss";
export { ScrollBarType, ScrollPosition } from './rds-comp-scrollbar-types';
import { ScrollBarType, ScrollPosition } from './rds-comp-scrollbar-types';

export interface RdsScrollBarProps {
  type?: ScrollBarType;
  position?: ScrollPosition;
  showButtons?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const RdsCompScrollBar = ({
  type = ScrollBarType.Mac,
  position = ScrollPosition.Start,
  showButtons = true,
  startIcon,
  endIcon,
}) => {
  const scrollContentRef = useRef<HTMLDivElement>(null);

  const scrollToPosition = useCallback((pos: ScrollPosition) => {
    const content = scrollContentRef.current;
    if (!content) return;

    if (pos === ScrollPosition.Start) {
      content.scrollTop = 0;
    } else if (pos === ScrollPosition.Middle) {
      content.scrollTop = content.scrollHeight / 2 - content.clientHeight / 2;
    } else if (pos === ScrollPosition.End) {
      content.scrollTop = content.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToPosition(position);
  }, [position, type, scrollToPosition]);

  const rootClassName = useMemo(
    () => clsx("rds-scrollbar", type === ScrollBarType.Mac ? "rds-scrollbar--mac" : "rds-scrollbar--simple"),
    [type]
  );

  const scrollToStart = useCallback(
    () => scrollToPosition(ScrollPosition.Start),
    [scrollToPosition]
  );

  const scrollToEnd = useCallback(
    () => scrollToPosition(ScrollPosition.End),
    [scrollToPosition]
  );

  return (
    <div className={rootClassName}>
      {type === ScrollBarType.Mac && showButtons && (
        <div className="rds-scrollbar__controls">
          <button
            type="button"
            className="rds-scrollbar__button"
            onClick={scrollToStart}
            aria-label="Scroll to top"
          >
            {startIcon}
          </button>
          <button
            type="button"
            className="rds-scrollbar__button"
            onClick={scrollToEnd}
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
