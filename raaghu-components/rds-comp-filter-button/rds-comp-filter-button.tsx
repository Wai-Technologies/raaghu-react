import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Popover, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  TextField,
  Button
} from '@mui/material';
import { Circle, ExpandMore, Margin } from '@mui/icons-material';
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
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
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  filters?: FilterOption[];
  onFiltersChange?: (filters: FilterOption[]) => void;
  onApply?: (selectedFilters: FilterOption[]) => void;
  onClear?: () => void;
  disabled?: boolean;
  className?: string;
  /** optional icon for each filter item - either a URL string or a React node (JSX) */
  itemIcon?: string | React.ReactNode;
}

const RdsCompFilterButton: React.FC<RdsCompFilterButtonProps> = ({
  shape = 'rectangle',
  text = 'Filter',
  showLeftIcon = true,
  showRightIcon = true,
  leftIcon = <CircleOutlinedIcon  sx={{ fontSize: 16 }} />,
  rightIcon = <CircleOutlinedIcon  sx={{ fontSize: 16 }} />,
  filters = [],
  onFiltersChange,
  onApply,
  onClear,
  disabled = false,
  className,
  itemIcon,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterOption[]>(filters);
  const [searchTerm, setSearchTerm] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFilterChange = (filterId: string, value: string, checked: boolean) => {
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
  };

  const handleApply = () => {
    onApply?.(localFilters);
    setIsOpen(false);
  };

  const handleClearAll = () => {
    const clearedFilters = localFilters.map(filter => ({
      ...filter,
      selectedValues: []
    }));
    setLocalFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
    onClear?.();
  };

  const getActiveFiltersCount = () => {
    return localFilters.reduce((count, filter) => {
      return count + (filter.selectedValues?.length || 0);
    }, 0);
  };

  const activeFiltersCount = getActiveFiltersCount();
  const buttonText = activeFiltersCount > 0 ? `${text} (${activeFiltersCount})` : text;

  return (
    <Box className={`rds-comp-filter-button ${className || ''}`} {...props}>
      <RdsButton
        ref={buttonRef}
        text={buttonText}
        size={'medium'}
        shape={shape}
        layout={'icon+text'}
        style={'filled'}
        disabled={disabled}
        startIcon={showLeftIcon ? leftIcon : undefined}
        endIcon={showRightIcon ? rightIcon : undefined}
        onClick={handleButtonClick}
        className={`rds-button__primary rds-filter-button__trigger ${isOpen ? 'rds-filter-button__trigger--open' : ''}`}
      />

      <Popover
        open={isOpen}
        anchorEl={buttonRef.current}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps=
        {{className: "rds-filter-button__popover"}}

      >
        <Box className="rds-filter-button__content">
          {/* Header */}
          <Box className="rds-filter-button__header">
            <Typography className="rds-filter-button__header-title">
              Add Filters
            </Typography>
          </Box>

          {/* Search Box */}
          <Box className="rds-filter-button__search">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                },
                '& .MuiOutlinedInput-input': {
                  padding: '8px 12px',
                  fontSize: '14px',
                }
              }}
            />
          </Box>

          {/* Filters */}
          <Box sx={{ 
            flex: 1,
            overflowY: 'auto',
            minHeight: 0,
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#c1c1c1',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#a8a8a8',
            },
          }}>
            {localFilters.map((filter, index) => (
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
                  expandIcon={<ExpandMore sx={{ color: '#666' }} />}
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
                    '&:hover': {
                      backgroundColor: '#f9f9f9',
                    },
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '16px',
                      right: '16px',
                      height: '1px',
                      backgroundColor: '#f0f0f0',
                      display: index === localFilters.length - 1 ? 'none' : 'block',
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
                      fontSize: '14px', 
                      fontWeight: 500,
                      color: '#333'
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
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {filter.values.map((value) => (
                      <FormControlLabel
                        key={value}
                        control={
                          <Checkbox
                            checked={filter.selectedValues?.includes(value) || false}
                            onChange={(e) => handleFilterChange(filter.id, value, e.target.checked)}
                            size="small"
                            sx={{
                              color: '#ccc',
                              '&.Mui-checked': {
                                color: '#1976d2',
                              },
                              '& .MuiSvgIcon-root': {
                                fontSize: 16,
                              }
                            }}
                          />
                        }
                        label={
                          <Typography sx={{ 
                            fontSize: '13px',
                            color: '#555'
                          }}>
                            {value}
                          </Typography>
                        }
                        sx={{
                          margin: 0,
                          '& .MuiFormControlLabel-label': {
                            paddingLeft: '4px'
                          }
                        }}
                      />
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          {/* Action Buttons */}
          <Box sx={{ 
            p: 1.5, 
            // borderTop: '1px solid #f0f0f0',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            flexShrink: 0,
            backgroundColor: '#fff'
          }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleApply}
              sx={{
                backgroundColor: '#1976d2',
                color: 'white',
                textTransform: 'none',
                fontWeight: 500,
                py: 1,
                '&:hover': {
                  backgroundColor: '#1565c0',
                }
              }}
            >
              Apply
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleClearAll}
              sx={(theme) => ({
                borderColor: '#e0e0e0',
                color: theme.palette.mode === 'dark' ? '#fff' : '#666',
                textTransform: 'none',
                fontWeight: 500,
                py: 1,
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? '#353535' : '#f9f9f9',
                  borderColor: '#d0d0d0',
                }
              })}
            >
              Clear All
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};
RdsCompFilterButton.displayName = 'RdsCompFilterButton';
export default RdsCompFilterButton;