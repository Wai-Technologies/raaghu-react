import clsx from 'clsx';
import { useCallback, useMemo, useRef, useState, type ReactNode, type MouseEvent as ReactMouseEvent } from 'react';
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
import './rds-comp-filter-button.scss';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

export interface FilterOption {
  id: string;
  name: string;
  values: string[];
  selectedValues?: string[];
}

export interface RdsCompFilterButtonProps {
  shape?: 'rectangle' | 'pill';
  text?: string;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  filters?: FilterOption[];
  onFiltersChange?: (filters: FilterOption[]) => void;
  onApply?: (selectedFilters: FilterOption[]) => void;
  onClear?: () => void;
  disabled?: boolean;
  className?: string;
  itemIcon?: string | ReactNode;
}

const EMPTY_FILTER_OPTIONS: FilterOption[] = [];

const RdsCompFilterButton = ({
  shape = 'rectangle',
  text = 'Filter',
  showLeftIcon = true,
  showRightIcon = true,
  leftIcon = <CircleOutlinedIcon  sx={{ fontSize: 'var(--rds-icon-size-sm, 16px)' }} />,
  rightIcon = <CircleOutlinedIcon  sx={{ fontSize: 'var(--rds-icon-size-sm, 16px)' }} />,
  filters,
  onFiltersChange,
  onApply,
  onClear,
  disabled = false,
  className,
  itemIcon,
  ...props
}) => {
  const resolvedFilters = filters ?? EMPTY_FILTER_OPTIONS;
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterOption[]>(resolvedFilters);
  const prevFiltersRef = useRef(resolvedFilters);
  if (resolvedFilters !== prevFiltersRef.current) {
    prevFiltersRef.current = resolvedFilters;
    setLocalFilters(resolvedFilters);
  }
  const [searchTerm, setSearchTerm] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleButtonClick = useCallback((event: ReactMouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  }, [isOpen]);

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
  const buttonText = activeFiltersCount > 0 ? `${text} (${activeFiltersCount})` : text;

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
        text={buttonText}
        size={'medium'}
        shape={shape as 'rectangle' | 'pill'}
        layout={'icon+text'}
        style={'filled'}
        disabled={disabled}
        startIcon={showLeftIcon ? leftIcon : undefined}
        endIcon={showRightIcon ? rightIcon : undefined}
        onClick={handleButtonClick}
        className={clsx("rds-button__primary", "rds-filter-button__trigger", isOpen && "rds-filter-button__trigger--open")}
      />

      <Popover
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
              Add Filters
            </Typography>
          </Box>

          <Box className="rds-filter-button__search">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search"
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
                    {itemIcon ? (
                      typeof itemIcon === 'string' ? (
                        <Box component="img" src={itemIcon} />
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
              text="Apply"
              textCase="capitalize"
              onClick={handleApply}
              sx={{ py: 1 }}
            />
            <RdsButton
              style="outlined"
              fullWidth
              text="Clear All"
              textCase="capitalize"
              onClick={handleClearAll}
              sx={{ py: 1 }}
            />
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};
RdsCompFilterButton.displayName = 'RdsCompFilterButton';
export default RdsCompFilterButton;