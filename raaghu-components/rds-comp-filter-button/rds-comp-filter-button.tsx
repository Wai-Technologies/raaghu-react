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
import { ExpandMore } from '@mui/icons-material';
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import RdsCheckbox from '../../raaghu-elements/rds-checkbox/rds-checkbox';
import { warnDeprecatedProp } from '../../raaghu-elements/shared/utils/deprecation';
import './rds-comp-filter-button.scss';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

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
  shape?: 'rectangle' | 'pill';
  /** Button label. Wins over `text`. */
  children?: ReactNode;
  /** @deprecated Use `children` instead. */
  text?: string;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  /** Start icon. Wins over `leftIcon`; `null` hides it. */
  startIcon?: ReactNode;
  /** End icon. Wins over `rightIcon`; `null` hides it. */
  endIcon?: ReactNode;
  /** @deprecated Use `startIcon` instead. */
  leftIcon?: ReactNode;
  /** @deprecated Use `endIcon` instead. */
  rightIcon?: ReactNode;
  options?: FilterOption[];
  /** @deprecated Use `options` instead. */
  filters?: FilterOption[];
  onFiltersChange?: (filters: FilterOption[]) => void;
  onApply?: (selectedFilters: FilterOption[]) => void;
  onClear?: () => void;
  disabled?: boolean;
  className?: string;
  itemIcon?: string | ReactNode;
  localeText?: RdsCompFilterButtonLocaleText;
}

const EMPTY_FILTER_OPTIONS: FilterOption[] = [];
const DEFAULT_LEFT_ICON = <CircleOutlinedIcon sx={{ fontSize: 'var(--rds-icon-size-sm, 16px)' }} />;
const DEFAULT_RIGHT_ICON = <CircleOutlinedIcon sx={{ fontSize: 'var(--rds-icon-size-sm, 16px)' }} />;

const RdsCompFilterButton = ({
  shape = 'rectangle',
  children,
  text,
  showLeftIcon = true,
  showRightIcon = true,
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
  const resolvedStartIcon = startIcon !== undefined ? startIcon : (leftIcon !== undefined ? leftIcon : DEFAULT_LEFT_ICON);
  const resolvedEndIcon = endIcon !== undefined ? endIcon : (rightIcon !== undefined ? rightIcon : DEFAULT_RIGHT_ICON);
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
  if (isOpen !== prevOpen) {
    setPrevOpen(isOpen);
    if (!isOpen) setSearchTerm('');
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
  const buttonText: ReactNode = activeFiltersCount > 0
    ? (typeof label === 'string' || typeof label === 'number'
      ? `${label} (${activeFiltersCount})`
      : <>{label} ({activeFiltersCount})</>)
    : label;

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
    <Box className={clsx("rds-comp-filter-button", className)} {...props}>
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

          <Box sx={{ 
            flex: 1,
            overflowY: 'auto',
            minHeight: 0,
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'var(--rds-background-default)',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'var(--rds-neutral-400)',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'var(--rds-neutral-500)',
            },
          }}>
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
                    minHeight: '48px',
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
                      left: 'var(--rds-spacing-md, 16px)',
                      right: 'var(--rds-spacing-md, 16px)',
                      height: '1px',
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
                      fontSize: 'var(--rds-font-size-md, 14px)', 
                      fontWeight: 'var(--rds-font-weight-medium, 500)',
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
                        labeltext={value}
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

          <Box sx={{ 
            p: 1.5, 
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            flexShrink: 0,
            backgroundColor: 'var(--rds-background-paper)'
          }}>
            <RdsButton
              style="filled"
              fullWidth
              textCase="capitalize"
              onClick={handleApply}
              sx={{ py: 1 }}
            >
              {labels.apply}
            </RdsButton>
            <RdsButton
              style="outlined"
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