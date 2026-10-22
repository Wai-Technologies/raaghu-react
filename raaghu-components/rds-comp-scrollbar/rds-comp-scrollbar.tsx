import { useEffect, useRef, type ReactNode } from "react";
import clsx from "clsx";
import "./rds-comp-scrollbar.scss";
export { ScrollBarType, ScrollPosition } from './rds-comp-scrollbar-types';
import { ScrollBarType, ScrollPosition } from './rds-comp-scrollbar-types';

export interface RdsScrollBarProps {
  variant?: ScrollBarType;
  type?: ScrollBarType;
  position?: ScrollPosition;
  showButtons?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  /** Content rendered inside the scroll container; replaces the placeholder. */
  children?: ReactNode;
}

const RdsCompScrollBar = ({
  variant,
  type,
  position = ScrollPosition.Start,
  showButtons = true,
  startIcon,
  endIcon,
  children,
}: RdsScrollBarProps) => {
  const resolvedType = variant ?? type ?? ScrollBarType.Mac;
  const scrollContentRef = useRef<HTMLDivElement>(null);

  const scrollToPosition = (pos: RdsScrollBarProps["position"]) => {
    const content = scrollContentRef.current;
    if (!content) return;

    if (pos === ScrollPosition.Start) {
      content.scrollTop = 0;
    } else if (pos === ScrollPosition.Middle) {
      content.scrollTop = content.scrollHeight / 2 - content.clientHeight / 2;
    } else if (pos === ScrollPosition.End) {
      content.scrollTop = content.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToPosition(position);
  }, [position]);

  const rootClassName = clsx("rds-scrollbar", resolvedType === ScrollBarType.Mac ? "rds-scrollbar--mac" : "rds-scrollbar--simple");

  return (
    <div className={rootClassName}>
      {resolvedType === ScrollBarType.Mac && showButtons && (
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
    </div>
  );
};

RdsCompScrollBar.displayName = "RdsCompScrollBar";
export default RdsCompScrollBar;
