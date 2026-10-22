import { useId, useMemo, type ReactNode } from 'react';
import {
  Popover as MuiPopover,
  type PopoverProps,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import Close from '@mui/icons-material/Close';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-popover.scss';

function getPopoverArrowDirection(pos: string): string {
  if (pos.startsWith('top-')) return 'bottom';
  if (pos.startsWith('bottom-')) return 'top';
  if (pos.startsWith('left-')) return 'right';
  if (pos.startsWith('right-')) return 'left';
  return 'top';
}

function getPopoverArrowClasses(direction: string, pos: string): string {
  return clsx('rds-popover__arrow', `rds-popover__arrow--${direction}`, `rds-popover__arrow--${pos}`);
}

function getPopoverOffset(arrowDirection: string, shouldShowArrow: boolean): { vertical: number; horizontal: number } {
  if (!shouldShowArrow) return { vertical: 0, horizontal: 0 };
  switch (arrowDirection) {
    case 'top': return { vertical: 8, horizontal: 0 };
    case 'bottom': return { vertical: -8, horizontal: 0 };
    case 'left': return { vertical: 0, horizontal: 8 };
    case 'right': return { vertical: 0, horizontal: -8 };
    default: return { vertical: 8, horizontal: 0 };
  }
}

type AnchorOriginVertical = 'top' | 'center' | 'bottom';
type AnchorOriginHorizontal = 'left' | 'center' | 'right';
type PositionMapEntry = {
  anchorOrigin: { vertical: AnchorOriginVertical; horizontal: AnchorOriginHorizontal };
  transformOrigin: { vertical: AnchorOriginVertical; horizontal: AnchorOriginHorizontal };
};

const POPOVER_POSITION_MAP: Record<string, PositionMapEntry> = {
  'top-left':     { anchorOrigin: { vertical: 'top', horizontal: 'left' },     transformOrigin: { vertical: 'bottom', horizontal: 'left' } },
  'top-center':   { anchorOrigin: { vertical: 'top', horizontal: 'center' },   transformOrigin: { vertical: 'bottom', horizontal: 'center' } },
  'top-right':    { anchorOrigin: { vertical: 'top', horizontal: 'right' },    transformOrigin: { vertical: 'bottom', horizontal: 'right' } },
  'right-top':    { anchorOrigin: { vertical: 'top', horizontal: 'right' },    transformOrigin: { vertical: 'top', horizontal: 'left' } },
  'right-center': { anchorOrigin: { vertical: 'center', horizontal: 'right' }, transformOrigin: { vertical: 'center', horizontal: 'left' } },
  'right-bottom': { anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, transformOrigin: { vertical: 'bottom', horizontal: 'left' } },
  'bottom-right': { anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, transformOrigin: { vertical: 'top', horizontal: 'right' } },
  'bottom-center':{ anchorOrigin: { vertical: 'bottom', horizontal: 'center' },transformOrigin: { vertical: 'top', horizontal: 'center' } },
  'bottom-left':  { anchorOrigin: { vertical: 'bottom', horizontal: 'left' },  transformOrigin: { vertical: 'top', horizontal: 'left' } },
  'left-bottom':  { anchorOrigin: { vertical: 'bottom', horizontal: 'left' },  transformOrigin: { vertical: 'bottom', horizontal: 'right' } },
  'left-center':  { anchorOrigin: { vertical: 'center', horizontal: 'left' },  transformOrigin: { vertical: 'center', horizontal: 'right' } },
  'left-top':     { anchorOrigin: { vertical: 'top', horizontal: 'left' },     transformOrigin: { vertical: 'top', horizontal: 'right' } },
  'no-arrow':     { anchorOrigin: { vertical: 'bottom', horizontal: 'left' },  transformOrigin: { vertical: 'top', horizontal: 'left' } },
};

type PopoverPlacement = 'top-left' | 'top-center' | 'top-right' | 'right-top' | 'right-center' | 'right-bottom' | 'bottom-right' | 'bottom-center' | 'bottom-left' | 'left-bottom' | 'left-center' | 'left-top';

/** Props for {@link RdsPopover}. */
export interface RdsPopoverProps extends Omit<PopoverProps, 'open' | 'children' | 'component'> {
  /** Whether the popover is open. Preferred over `isOpen`. */
  open?: boolean;
  /** @deprecated Use `open` instead. */
  isOpen?: boolean;
  /** Called when the popover requests to close (backdrop click, Escape, close button). */
  onClose: () => void;
  /** Element the popover is anchored to. */
  anchorEl: Element | null;
  /** Optional heading; also labels the popover for assistive technology. */
  title?: string;
  /** Popover body content. */
  children: ReactNode;
  /** Show a close icon button in the header. */
  showCloseButton?: boolean;
  /** Width of the content container. */
  width?: number | string;
  /** Max width of the content container. */
  maxWidth?: number | string;
  /** Placement relative to the anchor; collapses to top/bottom-center on small screens. Takes precedence over `position`. */
  placement?: PopoverPlacement;
  /** Shows the arrow pointing at the anchor. Defaults to `true`. */
  arrow?: boolean;
  /** @deprecated Use `placement` and `arrow` instead (`'no-arrow'` becomes `arrow={false}`). */
  position?: 'top-left' | 'top-center' | 'top-right' | 'right-top' | 'right-center' | 'right-bottom' | 'bottom-right' | 'bottom-center' | 'bottom-left' | 'left-bottom' | 'left-center' | 'left-top' | 'no-arrow';
}

function useMobilePopoverPosition(position: string): string {
  const isMobile = useMediaQuery('(max-width:600px)', { noSsr: true });

  return useMemo(() => {
    if (!isMobile) {
      return position;
    }

    const topGroup = [
      'top-left', 'top-center', 'top-right',
      'left-top', 'left-center', 'right-top',
    ];
    const bottomGroup = [
      'left-bottom', 'right-center', 'right-bottom',
      'bottom-right', 'bottom-center', 'bottom-left',
    ];

    if (topGroup.includes(position)) {
      return 'top-center';
    }
    if (bottomGroup.includes(position)) {
      return 'bottom-center';
    }
    return position;
  }, [isMobile, position]);
}

type PaperSlotProps = Record<string, unknown> & { className?: string; sx?: unknown };

/**
 * Popover anchored to an element, with an arrow, optional title and close button.
 * Consumer `slotProps` are merged with the component's own paper props.
 */
const RdsPopover = ({
  open,
  isOpen,
  onClose,
  anchorEl,
  title,
  children,
  showCloseButton = false,
  width,
  maxWidth = 'var(--rds-popover-container-max-width, 400px)',
  placement,
  arrow = true,
  position,
  ...props
}: RdsPopoverProps) => {
  if (isOpen !== undefined) warnDeprecatedProp('RdsPopover', 'isOpen', '`open`');
  if (position !== undefined) warnDeprecatedProp('RdsPopover', 'position', '`placement` and `arrow`');
  const resolvedOpen = open ?? isOpen ?? false;
  const titleId = useId();
  const effectivePosition = useMobilePopoverPosition(placement ?? position ?? 'bottom-left');

  const currentPosition = POPOVER_POSITION_MAP[effectivePosition] || POPOVER_POSITION_MAP['bottom-left'];
  const arrowDirection = getPopoverArrowDirection(effectivePosition);
  const shouldShowArrow = effectivePosition !== 'no-arrow' && arrow;
  const offset = getPopoverOffset(arrowDirection, shouldShowArrow);

  const { slotProps: consumerSlotProps, ...restProps } = props;
  const ourPaperSx = {
    transform: `translate(${offset.horizontal}px, ${offset.vertical}px) !important`,
  };
  const mergePaper = (consumerPaper?: PaperSlotProps) => {
    const consumerSx = consumerPaper?.sx;
    return {
      ...(title ? { 'aria-labelledby': titleId } : {}),
      ...consumerPaper,
      className: clsx('rds-popover__paper', consumerPaper?.className),
      sx: [
        ourPaperSx,
        ...(Array.isArray(consumerSx) ? consumerSx : consumerSx !== undefined ? [consumerSx] : []),
      ],
    };
  };
  const consumerPaper = (consumerSlotProps as { paper?: unknown } | undefined)?.paper;
  const mergedPaper =
    typeof consumerPaper === 'function'
      ? (ownerState: unknown) => mergePaper((consumerPaper as (o: unknown) => PaperSlotProps)(ownerState))
      : mergePaper(consumerPaper as PaperSlotProps | undefined);

  return (
    <MuiPopover
      open={resolvedOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={currentPosition.anchorOrigin}
      transformOrigin={currentPosition.transformOrigin}
      {...restProps}
      slotProps={{ ...consumerSlotProps, paper: mergedPaper } as PopoverProps['slotProps']}
    >
      <Box 
        className="rds-popover__container"
        sx={{ width: width, maxWidth: maxWidth, }}
      >
        {shouldShowArrow && (
          <Box
            className={getPopoverArrowClasses(arrowDirection, effectivePosition)}
          />
        )}
        {(!!title || !!showCloseButton) && (
          <Box 
            className="rds-popover__header"
            sx={{ mb: title ? 1 : 0,}}
          >
            {title && (
              <Typography id={titleId} variant="h6" component="div" className="rds-popover__title">
                {title}
              </Typography>
            )}
            {showCloseButton && (
              <IconButton
                aria-label="close"
                onClick={onClose}
                size="small"
                className="rds-popover__close-button"
              >
                <Close fontSize="small" />
              </IconButton>
            )}
          </Box>
        )}
        <Box className="rds-popover__content">
          {children}
        </Box>
      </Box>
    </MuiPopover>
  );
};
RdsPopover.displayName = 'RdsPopover';
export default RdsPopover;