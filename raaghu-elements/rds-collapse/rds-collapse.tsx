import { useId, useState, type ReactNode } from 'react';
import { Collapse as MuiCollapse, type CollapseProps, Box, Typography, IconButton } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-collapse.scss';

export interface RdsCollapseProps extends Omit<CollapseProps, 'children' | 'onToggle' | 'component'> {
  /** Text shown in the header next to the toggle button. */
  title?: string;
  children: ReactNode;
  /**
   * Expanded state.
   * - With `onToggle`: fully controlled; the component only shows what `expanded` says.
   * - Without `onToggle`: sets the initial state and re-syncs whenever it changes; clicks still toggle.
   *
   * If MUI's `in` prop is also given, `in` decides what the content area shows.
   */
  expanded?: boolean;
  /** Initial expanded state when `expanded` is not given. Defaults to `false`. */
  defaultExpanded?: boolean;
  /** Called with the new expanded state on every toggle. */
  onToggle?: (expanded: boolean) => void;
  /** Hides the toggle button and makes the header non-clickable. Defaults to `false`. */
  hideToggle?: boolean;
  /** @deprecated Use `hideToggle` instead. */
  showToggleButton?: boolean;
}

const RdsCollapse = ({
  title,
  children,
  expanded,
  defaultExpanded,
  onToggle,
  hideToggle,
  showToggleButton,
  in: inProp,
  id: idProp,
  ...props
}: RdsCollapseProps) => {
  if (showToggleButton !== undefined) warnDeprecatedProp('RdsCollapse', 'showToggleButton', '`hideToggle`');
  const showToggle = hideToggle === undefined ? (showToggleButton ?? true) : !hideToggle;
  const generatedId = useId();
  const contentId = idProp ?? generatedId;

  const isControlled = expanded !== undefined && onToggle !== undefined;
  const [internalExpanded, setInternalExpanded] = useState(expanded ?? defaultExpanded ?? false);

  const [prevExpanded, setPrevExpanded] = useState(expanded);
  if (expanded !== prevExpanded) {
    setPrevExpanded(expanded);
    setInternalExpanded(expanded ?? false);
  }

  const currentExpanded = isControlled ? expanded : internalExpanded;
  const contentOpen = inProp ?? currentExpanded;
  const hasTitle = typeof title === 'string' && title !== '';

  const handleToggle = () => {
    const newExpanded = !currentExpanded;
    if (!isControlled) setInternalExpanded(newExpanded);
    onToggle?.(newExpanded);
  };

  return (
    <Box>
      {(hasTitle || showToggle) && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: showToggle ? 'pointer' : 'default',
            py: 1,
          }}
          onClick={showToggle ? handleToggle : undefined}
        >
          {hasTitle && (
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          )}
          {showToggle && (
            <IconButton
              aria-label={currentExpanded ? 'Collapse' : 'Expand'}
              aria-expanded={contentOpen}
              aria-controls={contentId}
              size="small"
              sx={{
                transform: currentExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
                p: 0,
                ml: 0,
              }}
            >
              <ExpandMore />
            </IconButton>
          )}
        </Box>
      )}
      <MuiCollapse {...props} in={contentOpen} id={contentId}>
        <Box sx={{ pt: hasTitle ? 1 : 0 }}>
          {children}
        </Box>
      </MuiCollapse>
    </Box>
  );
};

RdsCollapse.displayName = 'RdsCollapse';
export default RdsCollapse;
