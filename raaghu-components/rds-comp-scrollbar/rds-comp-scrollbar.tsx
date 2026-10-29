import { useEffect, useRef, type HTMLAttributes, type ReactNode, type Ref } from "react";
import { Box, type SxProps, type Theme } from "@mui/material";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import clsx from "clsx";
import { warnDeprecatedProp } from "../../raaghu-elements/shared/utils/deprecation";
import "./rds-comp-scrollbar.scss";
export { ScrollBarType, ScrollPosition } from './rds-comp-scrollbar-types';
import { ScrollBarType, ScrollPosition } from './rds-comp-scrollbar-types';

export interface RdsScrollBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'> {
  /** Scrollbar style (Mac with buttons, or Simple). Wins over `type`. */
  variant?: ScrollBarType;
  /** Scrollbar style (Mac with buttons, or Simple); used when `variant` is not set. */
  type?: ScrollBarType;
  /** Initial scroll offset within the content. */
  scrollTo?: ScrollPosition;
  /** @deprecated Use `scrollTo` instead. Collides with CSS `position`. */
  position?: ScrollPosition;
  /** Shows the scroll-to-top and scroll-to-bottom buttons in the Mac style. @default true */
  showButtons?: boolean;
  /** Custom icon for the scroll-to-top button. */
  startIcon?: ReactNode;
  /** Custom icon for the scroll-to-bottom button. */
  endIcon?: ReactNode;
  /** Content rendered inside the scroll container; replaces the placeholder. */
  children?: ReactNode;
  /** Extra class name applied to the root element. */
  className?: string;
  /** MUI system styles applied to the root element. */
  sx?: SxProps<Theme>;
  /** Ref forwarded to the root element. */
  ref?: Ref<HTMLDivElement>;
}

const RdsCompScrollBar = ({
  variant,
  type,
  scrollTo,
  position,
  showButtons = true,
  startIcon,
  endIcon,
  children,
  className,
  sx,
  ref,
  ...rest
}: RdsScrollBarProps) => {
  if (position !== undefined) warnDeprecatedProp("RdsCompScrollBar", "position", "`scrollTo`");
  const resolvedScrollTo = scrollTo ?? position ?? ScrollPosition.Start;
  const resolvedType = variant ?? type ?? ScrollBarType.Mac;
  const scrollContentRef = useRef<HTMLDivElement>(null);

  const applyScrollTo = (pos: ScrollPosition) => {
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
    applyScrollTo(resolvedScrollTo);
  }, [resolvedScrollTo]);

  const rootClassName = clsx("rds-scrollbar", resolvedType === ScrollBarType.Mac ? "rds-scrollbar--mac" : "rds-scrollbar--simple");

  return (
    <Box
      {...rest}
      ref={ref}
      className={clsx(rootClassName, className)}
      sx={sx}
    >
      {resolvedType === ScrollBarType.Mac && showButtons && (
        <div className="rds-scrollbar__controls">
          <button
            type="button"
            className="rds-scrollbar__button"
            onClick={() => applyScrollTo(ScrollPosition.Start)}
            aria-label="Scroll to top"
          >
            {startIcon ?? <KeyboardArrowUp fontSize="small" />}
          </button>
          <button
            type="button"
            className="rds-scrollbar__button"
            onClick={() => applyScrollTo(ScrollPosition.End)}
            aria-label="Scroll to bottom"
          >
            {endIcon ?? <KeyboardArrowDown fontSize="small" />}
          </button>
        </div>
      )}
      <div className="rds-scrollbar__content" ref={scrollContentRef}>
        {children ?? <div className="rds-scrollbar__inner-content"></div>}
      </div>
    </Box>
  );
};

RdsCompScrollBar.displayName = "RdsCompScrollBar";
export default RdsCompScrollBar;
