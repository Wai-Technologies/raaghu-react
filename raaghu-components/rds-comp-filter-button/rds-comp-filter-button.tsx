import clsx from 'clsx';
import { useCallback, useId, useMemo, useRef, useState, type HTMLAttributes, type ReactNode, type MouseEvent as ReactMouseEvent } from 'react';
import { 
  Box, 
  Typography, 
  Popover, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import FilterListIcon from '@mui/icons-material/FilterList';
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import RdsCheckbox from '../../raaghu-elements/rds-checkbox/rds-checkbox';
import { warnDeprecatedProp } from '../../raaghu-elements/shared/utils/deprecation';
import './rds-comp-filter-button.scss';

export interface FilterOption {
  id: string;
  name: string;
  values: string[];
  selectedValues?: string[];
  /** Optional image URL for this filter; wins over `itemIcon`. */
  icon?: string;
}

export interface RdsCompFilterButtonLocaleText {
  title?: string;
  searchPlaceholder?: string;
  apply?: string;
  clearAll?: string;
}

export interface RdsCompFilterButtonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Shape of the trigger button. @default 'rectangle' */
  shape?: 'rectangle' | 'pill';
  /** Button label. Wins over `text`. */
  children?: ReactNode;
  /** @deprecated Use `children` instead. */
  text?: string;
  /** Shows the start icon on the trigger button. @default true */
  showLeftIcon?: boolean;
  /** Shows the end icon on the trigger button. @default false */
  showRightIcon?: boolean;
  /** Start icon. Wins over `leftIcon`; `null` hides it. */
  startIcon?: ReactNode;
  /** End icon. Wins over `rightIcon`; `null` hides it. */
  endIcon?: ReactNode;
  /** @deprecated Use `startIcon` instead. */
  leftIcon?: ReactNode;
  /** @deprecated Use `endIcon` instead. */
  rightIcon?: ReactNode;
  /** Filters (with their values and selected values) listed in the popover. */
  options?: FilterOption[];
  /** @deprecated Use `options` instead. */
  filters?: FilterOption[];
  /** Called with the updated filters whenever a value is checked or unchecked. */
  onFiltersChange?: (filters: FilterOption[]) => void;
  /** Called with the current filters when Apply is clicked. */
  onApply?: (selectedFilters: FilterOption[]) => void;
  /** Called when Clear All is clicked. */
  onClear?: () => void;
  /** Disables the trigger button. @default false */
  disabled?: boolean;
  /** Extra class name applied to the root element. */
  className?: string;
  /** MUI system styles applied to the filter button root. */
  sx?: SxProps<Theme>;
  /** Default icon shown next to each filter in the popover; overridden by a filter's own `icon`. */
  itemIcon?: string | ReactNode;
  /** Overrides for the popover texts (title, search placeholder, apply, clear all). */
  localeText?: RdsCompFilterButtonLocaleText;
}

const EMPTY_FILTER_OPTIONS: FilterOption[] = [];
const DEFAULT_START_ICON = <FilterListIcon sx={{ fontSize: 'var(--rds-icon-size-sm)' }} />;
const DEFAULT_END_ICON = <ExpandMore sx={{ fontSize: 'var(--rds-icon-size-sm)' }} />;

const RdsCompFilterButton = ({
  shape = 'rectangle',
  children,
  text,
  showLeftIcon = true,
  showRightIcon = false,
  startIcon,
  endIcon,
  leftIcon,
  rightIcon,
  options,
  filters,
  onFiltersChange,
  onApply,
  onClear,
  disabled = false,
  className,
  sx,
  itemIcon,
  localeText,
  ...props
}: RdsCompFilterButtonProps) => {
  if (text !== undefined) warnDeprecatedProp('RdsCompFilterButton', 'text', '`children`');
  if (leftIcon !== undefined) warnDeprecatedProp('RdsCompFilterButton', 'leftIcon', '`startIcon`');
  if (rightIcon !== undefined) warnDeprecatedProp('RdsCompFilterButton', 'rightIcon', '`endIcon`');
  if (filters !== undefined) warnDeprecatedProp('RdsCompFilterButton', 'filters', '`options`');
  const popoverId = useId();
  const labels = {
    title: localeText?.title ?? 'Add Filters',
    searchPlaceholder: localeText?.searchPlaceholder ?? 'Search',
    apply: localeText?.apply ?? 'Apply',
    clearAll: localeText?.clearAll ?? 'Clear All',
  };
  const resolvedStartIcon = startIcon !== undefined ? startIcon : (leftIcon !== undefined ? leftIcon : DEFAULT_START_ICON);
  const resolvedEndIcon = endIcon !== undefined ? endIcon : (rightIcon !== undefined ? rightIcon : DEFAULT_END_ICON);
  const label: ReactNode = children ?? text ?? 'Filter';
  const resolvedFilters = options ?? filters ?? EMPTY_FILTER_OPTIONS;
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterOption[]>(resolvedFilters);
  const [prevFilters, setPrevFilters] = useState(resolvedFilters);
  if (resolvedFilters !== prevFilters) {
    setPrevFilters(resolvedFilters);
    setLocalFilters(resolvedFilters);
  }
  const [searchTerm, setSearchTerm] = useState('');
  const [prevOpen, setPrevOpen] = useState(isOpen);
  /** Freeze trigger label while open so width changes don't shift the popover. */
  const [frozenTriggerLabel, setFrozenTriggerLabel] = useState<ReactNode | null>(null);
  if (isOpen !== prevOpen) {
    setPrevOpen(isOpen);
    if (!isOpen) {
      setSearchTerm('');
      setFrozenTriggerLabel(null);
    }
  }
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleButtonClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpen((o) => !o);
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleFilterChange = useCallback((filterId: string, value: string, checked: boolean) => {
    const updatedFilters = localFilters.map(filter => {
      if (filter.id === filterId) {
        const selectedValues = filter.selectedValues || [];
        const newSelectedValues = checked 
          ? [...selectedValues, value]
          : selectedValues.filter(v => v !== value);
        
        return {
          ...filter,
          selectedValues: newSelectedValues
        };
      }
      return filter;
    });
    
    setLocalFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  }, [localFilters, onFiltersChange]);

  const handleApply = useCallback(() => {
    onApply?.(localFilters);
    setIsOpen(false);
  }, [localFilters, onApply]);

  const handleClearAll = useCallback(() => {
    const clearedFilters = localFilters.map(filter => ({
      ...filter,
      selectedValues: []
    }));
    setLocalFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
    onClear?.();
  }, [localFilters, onClear, onFiltersChange]);

  const activeFiltersCount = localFilters.reduce((count, filter) => count + (filter.selectedValues?.length || 0), 0);
  const countedLabel: ReactNode = activeFiltersCount > 0
    ? (typeof label === 'string' || typeof label === 'number'
      ? `${label} (${activeFiltersCount})`
      : <>{label} ({activeFiltersCount})</>)
    : label;
  if (isOpen && frozenTriggerLabel === null) {
    setFrozenTriggerLabel(countedLabel);
  }
  const buttonText = isOpen && frozenTriggerLabel != null ? frozenTriggerLabel : countedLabel;

  const filteredFilters = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return localFilters;

    return localFilters
      .map((filter) => {
        const nameMatches = filter.name.toLowerCase().includes(term);
        const matchingValues = filter.values.filter((value) =>
          value.toLowerCase().includes(term)
        );

        if (nameMatches) return filter;
        if (matchingValues.length > 0) {
          return { ...filter, values: matchingValues };
        }
        return null;
      })
      .filter((filter): filter is FilterOption => filter !== null);
  }, [localFilters, searchTerm]);

  return (
    <Box className={clsx("rds-comp-filter-button", className)} sx={sx} {...props}>
      <RdsButton
        ref={buttonRef}
        size={'medium'}
        shape={shape}
        layout={'icon+text'}
        style={'filled'}
        disabled={disabled}
        startIcon={showLeftIcon ? (resolvedStartIcon ?? undefined) : undefined}
        endIcon={showRightIcon ? (resolvedEndIcon ?? undefined) : undefined}
        onClick={handleButtonClick}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={popoverId}
        className={clsx("rds-button__primary", "rds-filter-button__trigger", isOpen && "rds-filter-button__trigger--open")}
      >
        {buttonText}
      </RdsButton>

      <Popover
        id={popoverId}
        open={isOpen}
        anchorEl={buttonRef.current}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        disableScrollLock
        // Keep placement below the trigger when content height changes (e.g. checkbox selection).
        marginThreshold={null}
        slotProps={{ paper: { className: "rds-filter-button__popover" } }}
      >
        <Box className="rds-filter-button__content">
          <Box className="rds-filter-button__header">
            <Typography className="rds-filter-button__header-title">
              {labels.title}
            </Typography>
          </Box>

          <Box className="rds-filter-button__search">
            <TextField
              fullWidth
              variant="outlined"
              placeholder={labels.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
            />
          </Box>

          <Box className="rds-filter-button__filters">
            {filteredFilters.map((filter, index) => (
              <Accordion 
                key={filter.id}
                elevation={0}
                disableGutters
                sx={{
                  '&:before': {
                    display: 'none',
                  },
                  '&.Mui-expanded': {
                    margin: 0,
                  },
                  borderBottom: 'none',
                  borderTop: index === 0 ? 'none' : undefined,
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: 'var(--rds-text-secondary)' }} />}
                  sx={{
                    minHeight: 'var(--rds-size-2xl)',
                    px: 2,
                    py: 1,
                    position: 'relative',
                    '& .MuiAccordionSummary-content': {
                      alignItems: 'center',
                      margin: 0,
                      '&.Mui-expanded': {
                        margin: 0,
                      }
                    },
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 'var(--rds-spacing-md)',
                      right: 'var(--rds-spacing-md)',
                      height: 'var(--rds-border-width-thin)',
                      backgroundColor: 'var(--rds-border-default)',
                      display: index === filteredFilters.length - 1 ? 'none' : 'block',
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {filter.icon ? (
                      <Box component="img" src={filter.icon} alt="" />
                    ) : itemIcon ? (
                      typeof itemIcon === 'string' ? (
                        <Box component="img" src={itemIcon} alt="" />
                      ) : (
                        itemIcon
                      )
                    ) : null}

                    <Typography sx={{ 
                      fontSize: 'var(--rds-font-size-md)', 
                      fontWeight: 'var(--rds-font-weight-medium)',
                      color: 'var(--rds-text-primary)'
                    }}>
                      {filter.name}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ 
                  px: 2, 
                  py: 1,
                  pt: 0,
                }}>
                  <Box className="rds-filter-button__options">
                    {filter.values.map((value) => (
                      <RdsCheckbox
                        key={value}
                        className="rds-filter-button__option"
                        labelText={value}
                        showText
                        color="primary"
                        size="small"
                        status={filter.selectedValues?.includes(value) ? 'checked' : 'unchecked'}
                        onChange={(_e, checked) => handleFilterChange(filter.id, value, checked)}
                      />
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          <Box className="rds-filter-button__footer">
            <RdsButton
              variant="filled"
              fullWidth
              textCase="capitalize"
              onClick={handleApply}
              sx={{ py: 1 }}
            >
              {labels.apply}
            </RdsButton>
            <RdsButton
              variant="outlined"
              fullWidth
              textCase="capitalize"
              onClick={handleClearAll}
              sx={{ py: 1 }}
            >
              {labels.clearAll}
            </RdsButton>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};
RdsCompFilterButton.displayName = 'RdsCompFilterButton';
export default RdsCompFilterButton;