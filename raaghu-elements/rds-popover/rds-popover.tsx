import { useEffect, useState, type ReactNode } from 'react';
import { 
  Popover as MuiPopover, 
  type PopoverProps, 
  Box,
  Typography,
  IconButton 
} from '@mui/material';
import { Close } from '@mui/icons-material';
import clsx from 'clsx';

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
import './rds-popover.scss';

export interface RdsPopoverProps extends Omit<PopoverProps, 'open' | 'children' | 'component'> {
  isOpen: boolean;
  onClose: () => void;
  anchorEl: Element | null;
  title?: string;
  children: ReactNode;
  showCloseButton?: boolean;
  width?: number | string;
  maxWidth?: number | string;
  position?: 'top-left' | 'top-center' | 'top-right' | 'right-top' | 'right-center' | 'right-bottom' | 'bottom-right' | 'bottom-center' | 'bottom-left' | 'left-bottom' | 'left-center' | 'left-top' | 'no-arrow';
}

const MOBILE_BREAKPOINT = 600;

function useMobilePopoverPosition(position: string): string {
  const [mobilePosition, setMobilePosition] = useState(position);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      const topGroup = [
        'top-left', 'top-center', 'top-right',
        'left-top', 'left-center', 'right-top'
      ];
      const bottomGroup = [
        'left-bottom', 'right-center', 'right-bottom',
        'bottom-right', 'bottom-center', 'bottom-left'
      ];
      if (width <= MOBILE_BREAKPOINT) {
        if (topGroup.includes(position)) {
          setMobilePosition('top-center');
        } else if (bottomGroup.includes(position)) {
          setMobilePosition('bottom-center');
        } else {
          setMobilePosition(position);
        }
      } else {
        setMobilePosition(position);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position]);
  return mobilePosition;
}

const RdsPopover= ({
  isOpen,
  onClose,
  anchorEl,
  title,
  children,
  showCloseButton = false,
  width,
  maxWidth = 'var(--rds-popover-container-max-width, 400px)',
  position = 'bottom-left',
  ...props
}:RdsPopoverProps) => {
  const effectivePosition = useMobilePopoverPosition(position);

  const currentPosition = POPOVER_POSITION_MAP[effectivePosition] || POPOVER_POSITION_MAP['bottom-left'];
  const arrowDirection = getPopoverArrowDirection(effectivePosition);
  const shouldShowArrow = effectivePosition !== 'no-arrow';
  const offset = getPopoverOffset(arrowDirection, shouldShowArrow);
  
  return (
    <MuiPopover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={currentPosition.anchorOrigin}
      transformOrigin={currentPosition.transformOrigin}
      slotProps={{
        paper: {
          className: 'rds-popover__paper',
          sx: {
            transform: `translate(${offset.horizontal}px, ${offset.vertical}px) !important`,
          }
        }
      }}
      {...props}
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
              <Typography variant="h6" component="div" className="rds-popover__title">
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