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
  variant?: ScrollBarType;
  type?: ScrollBarType;
  /** Initial scroll offset within the content. */
  scrollTo?: ScrollPosition;
  /** @deprecated Use `scrollTo` instead. Collides with CSS `position`. */
  position?: ScrollPosition;
  showButtons?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  /** Content rendered inside the scroll container; replaces the placeholder. */
  children?: ReactNode;
  className?: string;
  sx?: SxProps<Theme>;
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
      sx={[{ height: 300 }, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
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
