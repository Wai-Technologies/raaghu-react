import React, { useState, useMemo, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Select,
  FormControl,
  Checkbox,
  Radio,
  Pagination,
  Stack,
  Card,
  CardContent,
  Divider,
  Tooltip,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Grid,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  MoreVert as MoreIcon,
  Add as AddIcon,
  Person as PersonIcon,
  Visibility as VisibilityIcon,
  Clear as ClearIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  SwapVert as ArrowUpDownIcon,
} from '@mui/icons-material';
import './rds-comp-fluent-grid.scss';

// Types and Enums
export enum ActionPosition {
  Right = "right",
  Left = "left",
}

export enum State {
  Default = "default",
  Collapsed = "collapsed",
}

export enum ActionColumnStyle {
  ShowDots = "show dots",
  ShowButtonsDirectly = "show buttons directly",
}

export interface FluentGridColumn {
  key: string;
  name: string;
  dataType?: string;
  dataLength?: number;
  required?: boolean;
  isSort?: boolean;
  isFilter?: boolean;
  isResizable?: boolean;
  showHeader?: boolean;
  showSubHeader?: boolean;
  showShuffleIcon?: boolean;
  showAddNewColumn?: boolean;
  isBold?: boolean;
  fontWeight?: string;
  disabled?: boolean;
  isEndUserEditing?: boolean;
  colWidth?: string;
  minWidth?: number;
  maxWidth?: number;
}

export interface FluentGridAction {
  displayName: string;
  id: string;
  offId?: string;
  modalId?: string;
}

export interface FilterState {
  [columnKey: string]: {
    value: string;
    operator: 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan';
  };
}

export interface SortState {
  column: string | null;
  direction: 'asc' | 'desc';
}

export interface RdsFluentGridProps {
  // Data
  tableHeaders: FluentGridColumn[];
  tableData: any[];
  
  // Features
  isSort?: boolean;
  isFilter?: boolean;
  isResizable?: boolean;
  enableCheckboxSelection?: boolean;
  enableRadioButtonSelection?: boolean;
  
  // UI Controls
  showHeader?: boolean;
  showSubHeader?: boolean;
  showAddNewColumn?: boolean;
  state?: State;
  
  // Actions
  actions?: FluentGridAction[];
  actionPosition?: ActionPosition;
  actionColumnStyle?: ActionColumnStyle;
  
  // Pagination
  pagination?: boolean;
  recordsPerPage?: number;
  recordsPerPageSelectListOption?: boolean;
  totalRecords?: number;
  
  // Callbacks
  onActionSelection?: (rowData: any, actionId: any) => void;
  onRowSelect?: (data: any) => void;
  onRowClick?: (rowId: any) => void;
  onPaginationHandler?: (currentPage: number, recordsPerPage: number) => void;
  onSortChange?: (sortState: SortState) => void;
  onFilterChange?: (filterState: FilterState) => void;
  
  // Styling
  classes?: string;
  fontWeight?: string;
  illustration?: boolean;
  noDataTitle?: string;
  noDataHeaderTitle?: string;
  
  // Theme
  theme?: 'light' | 'dark';
  
  // Loading
  isLoading?: boolean;
}

const RdsFluentGridBasic: React.FC<RdsFluentGridProps> = ({
  tableHeaders,
  tableData,
  isSort = true,
  isFilter = true,
  isResizable = true,
  enableCheckboxSelection = false,
  enableRadioButtonSelection = false,
  showHeader = true,
  showSubHeader = true,
  showAddNewColumn = false,
  state = State.Default,
  actions = [],
  actionPosition = ActionPosition.Right,
  actionColumnStyle = ActionColumnStyle.ShowDots,
  pagination = false,
  recordsPerPage = 10,
  recordsPerPageSelectListOption = false,
  totalRecords,
  onActionSelection,
  onRowSelect,
  onRowClick,
  onPaginationHandler,
  onSortChange,
  onFilterChange,
  classes,
  fontWeight,
  illustration = false,
  noDataTitle = 'No data available',
  noDataHeaderTitle = 'Data Grid',
  theme = 'light',
  isLoading = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(state === State.Collapsed);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchValue, setSearchValue] = useState('');
  const [filterState, setFilterState] = useState<FilterState>({});
  const [showFilters, setShowFilters] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    tableHeaders.map(header => header.key)
  );
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedColumnForFilter, setSelectedColumnForFilter] = useState<string | null>(null);
  const [isColumnPanelExpanded, setIsColumnPanelExpanded] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  // Filter and sort data
  const processedData = useMemo(() => {
    let filtered = [...tableData];

    // Apply search filter
    if (searchValue) {
      filtered = filtered.filter((row) =>
        Object.values(row).some((val) =>
          val?.toString().toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }

    // Apply column filters
    Object.entries(filterState).forEach(([columnKey, filter]) => {
      if (filter.value) {
        filtered = filtered.filter((row) => {
          const cellValue = row[columnKey]?.toString().toLowerCase() || '';
          const filterValue = filter.value.toLowerCase();
          
          switch (filter.operator) {
            case 'contains':
              return cellValue.includes(filterValue);
            case 'equals':
              return cellValue === filterValue;
            case 'startsWith':
              return cellValue.startsWith(filterValue);
            case 'endsWith':
              return cellValue.endsWith(filterValue);
            case 'greaterThan':
              return parseFloat(cellValue) > parseFloat(filterValue);
            case 'lessThan':
              return parseFloat(cellValue) < parseFloat(filterValue);
            default:
              return cellValue.includes(filterValue);
          }
        });
      }
    });

    // Apply sorting
    if (sortColumn) {
      filtered = filtered.sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Apply pagination
    if (pagination) {
      const startIndex = (currentPage - 1) * recordsPerPage;
      const endIndex = startIndex + recordsPerPage;
      filtered = filtered.slice(startIndex, endIndex);
    }

    return filtered;
  }, [tableData, searchValue, filterState, sortColumn, sortDirection, pagination, currentPage, recordsPerPage]);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
    const newSortState: SortState = { column: columnKey, direction: sortDirection };
    onSortChange?.(newSortState);
  };


  const handleFilterChange = (columnKey: string, value: string, operator: 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' = 'contains') => {
    const newFilterState = { ...filterState };
    if (value) {
      newFilterState[columnKey] = { value, operator };
    } else {
      delete newFilterState[columnKey];
    }
    setFilterState(newFilterState);
    onFilterChange?.(newFilterState);
  };

  const clearAllFilters = () => {
    setFilterState({});
    setSearchValue('');
    onFilterChange?.({});
  };

  const handleColumnVisibilityChange = (columnKey: string, isVisible: boolean) => {
    const newVisibleColumns = isVisible
      ? [...visibleColumns, columnKey]
      : visibleColumns.filter(key => key !== columnKey);
    setVisibleColumns(newVisibleColumns);
    console.log('Column visibility changed:', { columnKey, isVisible, newVisibleColumns });
  };

  const getVisibleHeaders = () => {
    const visible = tableHeaders.filter(header => visibleColumns.includes(header.key));
    console.log('Visible headers:', { visibleColumns, visible: visible.map(h => h.key) });
    return visible;
  };



  const handleFilterPopupClose = () => {
    setFilterAnchorEl(null);
    setIsFilterPopupOpen(false);
  };

  const handleColumnPanelToggle = () => {
    setIsColumnPanelExpanded(!isColumnPanelExpanded);
  };


  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPaginationHandler?.(page, recordsPerPage);
  };

  const handleRowSelect = (rowId: string, rowData: any) => {
    if (selectedRows.has(rowId)) {
      setSelectedRows(prev => {
        const newSet = new Set(prev);
        newSet.delete(rowId);
        return newSet;
      });
    } else {
      setSelectedRows(prev => new Set([...prev, rowId]));
    }
    onRowSelect?.(rowData);
  };

  const totalPages = Math.ceil(tableData.length / recordsPerPage);
  const activeFiltersCount = Object.keys(filterState).length + (searchValue ? 1 : 0);

  // Debug logging
  console.log('Filter popup state:', { isFilterPopupOpen, filterAnchorEl: !!filterAnchorEl });

  if (isLoading) {
    return (
      <Card className={`rds-fluent-grid ${classes || ''}`} data-theme={theme}>
        <CardContent>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <Typography variant="h6" color="text.secondary">
              Loading...
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (tableData.length === 0) {
    return (
      <Card className={`rds-fluent-grid ${classes || ''}`} data-theme={theme}>
        {showHeader && (
          <Box p={2} borderBottom="1px solid" borderColor="divider">
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
              <TextField
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: <SearchIcon color="action" />,
                }}
                sx={{ minWidth: 200 }}
              />
              <Stack direction="row" spacing={1}>
                <Button startIcon={<AddIcon />} variant="outlined" size="small">
                  Add New
                </Button>
                <Button startIcon={<PersonIcon />} variant="outlined" size="small">
                  Person
                </Button>
                <Button
                  startIcon={<FilterIcon />}
                  variant={activeFiltersCount > 0 ? "contained" : "outlined"}
                  size="small"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  Filters
                  {activeFiltersCount > 0 && (
                    <Chip label={activeFiltersCount} size="small" color="primary" sx={{ ml: 1 }} />
                  )}
                </Button>
                <Button startIcon={<SortIcon />} variant="outlined" size="small">
                  Sort
                </Button>
                <Button startIcon={<VisibilityIcon />} variant="outlined" size="small">
                  Hide
                </Button>
                <IconButton size="small">
                  <MoreIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        )}
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="200px">
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {noDataTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No data available to display
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`rds-fluent-grid ${classes || ''}`} data-theme={theme}>
      {showHeader && (
        <Box p={2} borderBottom="1px solid" borderColor="divider">
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            <TextField
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: <SearchIcon color="action" />,
              }}
              sx={{ minWidth: 200 }}
            />
            <Stack direction="row" spacing={1}>
              <Button startIcon={<AddIcon />} variant="outlined" size="small">
                Add New
              </Button>
              <Button startIcon={<PersonIcon />} variant="outlined" size="small">
                Person
              </Button>
              <Button
                startIcon={<FilterIcon />}
                variant={activeFiltersCount > 0 ? "contained" : "outlined"}
                size="small"
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
                {activeFiltersCount > 0 && (
                  <Chip label={activeFiltersCount} size="small" color="primary" sx={{ ml: 1 }} />
                )}
              </Button>
              <Button startIcon={<SortIcon />} variant="outlined" size="small">
                Sort
              </Button>
              <Button startIcon={<VisibilityIcon />} variant="outlined" size="small">
                Hide
              </Button>
              <IconButton size="small">
                <MoreIcon />
              </IconButton>
              {/* Test button for popup */}
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={(e) => {
                  console.log('Test button clicked!', e.currentTarget);
                  setFilterAnchorEl(e.currentTarget);
                  setIsFilterPopupOpen(true);
                }}
              >
                Test Popup
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}

        {showFilters && (
          <Box p={2} borderBottom="1px solid" borderColor="divider" bgcolor="grey.50">
            <Grid container spacing={2} alignItems="center">
              {tableHeaders.filter(header => header.isFilter).map((header) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={header.key}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" fontWeight="medium" minWidth="80px">
                      {header.name}:
                    </Typography>
                    <TextField
                      placeholder={`Filter ${header.name}...`}
                      value={filterState[header.key]?.value || ''}
                      onChange={(e) => handleFilterChange(header.key, e.target.value, 'contains')}
                      size="small"
                      sx={{ flexGrow: 1 }}
                    />
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select
                        value={filterState[header.key]?.operator || 'contains'}
                        onChange={(e) => handleFilterChange(header.key, filterState[header.key]?.value || '', e.target.value as any)}
                      >
                        <MenuItem value="contains">Contains</MenuItem>
                        <MenuItem value="equals">Equals</MenuItem>
                        <MenuItem value="startsWith">Starts With</MenuItem>
                        <MenuItem value="endsWith">Ends With</MenuItem>
                        <MenuItem value="greaterThan">Greater Than</MenuItem>
                        <MenuItem value="lessThan">Less Than</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Grid>
              ))}
              <Grid>
                <Button
                  startIcon={<ClearIcon />}
                  onClick={clearAllFilters}
                  variant="outlined"
                  size="small"
                  color="secondary"
                >
                  Clear All
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {showSubHeader && (
          <Box p={1.5} borderBottom="1px solid" borderColor="divider" bgcolor="grey.100">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="subtitle2" fontWeight="medium">
                  {noDataHeaderTitle}
                </Typography>
                <IconButton size="small">
                  <MoreIcon />
                </IconButton>
              </Stack>
              <IconButton size="small" onClick={toggleCollapse}>
                {isCollapsed ? <ArrowDownIcon /> : <ArrowUpIcon />}
              </IconButton>
            </Stack>
          </Box>
        )}

      {!isCollapsed && (
        <TableContainer component={Paper} elevation={0}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {/* Selection column */}
                {enableCheckboxSelection && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows.size === processedData.length && processedData.length > 0}
                      indeterminate={selectedRows.size > 0 && selectedRows.size < processedData.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows(new Set(processedData.map((_, index) => `row-${index}`)));
                        } else {
                          setSelectedRows(new Set());
                        }
                      }}
                    />
                  </TableCell>
                )}
                
                {enableRadioButtonSelection && (
                  <TableCell padding="checkbox">
                    <Typography variant="caption" color="text.secondary">
                      {enableCheckboxSelection ? 'Select All' : 'Select'}
                    </Typography>
                  </TableCell>
                )}
                
                {/* Data columns */}
                {getVisibleHeaders().map((header) => (
                  <TableCell
                    key={header.key}
                    sx={{
                      cursor: isSort && header.isSort ? 'pointer' : 'default',
                      minWidth: header.minWidth || 100,
                      maxWidth: header.maxWidth || 300,
                      fontWeight: header.isBold ? 'bold' : 'normal',
                    }}
                    onClick={() => isSort && header.isSort && handleSort(header.key)}
                  >
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Typography variant="subtitle2" fontWeight={header.isBold ? 'bold' : 'medium'}>
                        {header.name}
                      </Typography>
                      {header.required && (
                        <Typography color="error" variant="caption">*</Typography>
                      )}
                      {isSort && header.isSort && (
                        <Tooltip title="Sort">
                          <IconButton size="small">
                            {(() => {
                              if (sortColumn === header.key) {
                                return sortDirection === 'asc' ? 
                                  <ArrowUpIcon fontSize="small" /> : 
                                  <ArrowDownIcon fontSize="small" />;
                              }
                              return <ArrowUpDownIcon fontSize="small" />;
                            })()}
                          </IconButton>
                        </Tooltip>
                      )}
                      {isFilter && header.isFilter && (
                        <Tooltip title="Click to open filters and column visibility">
                          <span>
                            <IconButton 
                              size="small" 
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log('Filter icon clicked for column:', header.key);
                                setSelectedColumnForFilter(header.key);
                                setFilterAnchorEl(e.currentTarget);
                                setIsFilterPopupOpen(true);
                              }}
                              ref={filterButtonRef}
                              sx={{ 
                                '&:hover': { 
                                  backgroundColor: 'action.hover' 
                                },
                                backgroundColor: filterState[header.key]?.value ? 'primary.light' : 'transparent',
                                color: filterState[header.key]?.value ? 'primary.main' : 'action.active'
                              }}
                            >
                              <FilterIcon fontSize="small" color="action" />
                            </IconButton>
                          </span>
                        </Tooltip>
                      )}
                    </Stack>
                  </TableCell>
                ))}
                
                {/* Actions column */}
                {actions.length > 0 && (
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight="medium">
                      Actions
                    </Typography>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            
            <TableBody>
              {processedData.map((row, index) => {
                const rowId = `row-${index}`;
                const isSelected = selectedRows.has(rowId);
                
                return (
                  <TableRow
                    key={rowId}
                    selected={isSelected}
                    hover
                    onClick={() => onRowClick?.(rowId)}
                    sx={{ cursor: 'pointer' }}
                  >
                    {/* Selection cell */}
                    {enableCheckboxSelection && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handleRowSelect(rowId, row)}
                        />
                      </TableCell>
                    )}
                    
                    {enableRadioButtonSelection && (
                      <TableCell padding="checkbox">
                        <Radio
                          checked={isSelected}
                          onChange={() => handleRowSelect(rowId, row)}
                          name="rowSelection"
                        />
                      </TableCell>
                    )}
                    
                    {/* Data cells */}
                    {getVisibleHeaders().map((header) => (
                      <TableCell
                        key={header.key}
                        sx={{
                          minWidth: header.minWidth || 100,
                          maxWidth: header.maxWidth || 300,
                        }}
                      >
                        <Typography variant="body2">
                          {row[header.key]}
                        </Typography>
                      </TableCell>
                    ))}
                    
                    {/* Actions cell */}
                    {actions.length > 0 && (
                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          {actionColumnStyle === ActionColumnStyle.ShowButtonsDirectly ? (
                            actions.map((action) => (
                              <Button
                                key={action.id}
                                size="small"
                                variant="outlined"
                                onClick={() => onActionSelection?.(row, action.id)}
                              >
                                {action.displayName}
                              </Button>
                            ))
                          ) : (
                            <Menu
                              open={false}
                              anchorEl={null}
                              onClose={() => {}}
                            >
                              <IconButton size="small">
                                <MoreIcon />
                              </IconButton>
                              <MenuList>
                                {actions.map((action) => (
                                  <MenuItem
                                    key={action.id}
                                    onClick={() => onActionSelection?.(row, action.id)}
                                  >
                                    {action.displayName}
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </Menu>
                          )}
                        </Stack>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Filter and Column Visibility Popup */}
      <Popover
        open={isFilterPopupOpen}
        anchorEl={filterAnchorEl}
        onClose={handleFilterPopupClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disablePortal={false}
        PaperProps={{
          sx: {
            width: 400,
            maxHeight: 500,
            overflow: 'auto',
            zIndex: 1300,
          }
        }}
      >
        <Box p={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">
              Filters & Columns
            </Typography>
            <IconButton size="small" onClick={handleFilterPopupClose}>
              <ClearIcon />
            </IconButton>
          </Stack>
          
          <Divider sx={{ mb: 2 }} />
          
          {/* Column Visibility Section - Accordion Panel */}
          <Box mb={3}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                p: 1,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
                width: '100%',
                '&:hover': { backgroundColor: 'action.hover' }
              }}
              onClick={handleColumnPanelToggle}
            >
              <Typography variant="subtitle1" fontWeight="bold" sx={{ flexGrow: 1 }}>
                Show/Hide Columns
              </Typography>
              {isColumnPanelExpanded ? <ArrowUpIcon fontSize="small" /> : <ArrowDownIcon fontSize="small" />}
            </Box>
            
            {/* Collapsible Column List */}
            {isColumnPanelExpanded && (
              <Box 
                sx={{ 
                  mt: 0,
                  p: 0.25,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderTop: 'none',
                  borderRadius: '0 0 4px 4px',
                  backgroundColor: 'grey.50',
                  width: '100%'
                }}
              >
                <List dense sx={{ py: 0 }}>
                  {tableHeaders.map((header) => (
                    <ListItem 
                      key={header.key} 
                      sx={{ 
                        py: 0,
                        px: 0.25,
                        minHeight: 18,
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: 'action.hover' }
                      }}
                      onClick={() => {
                        const isCurrentlyVisible = visibleColumns.includes(header.key);
                        handleColumnVisibilityChange(header.key, !isCurrentlyVisible);
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 20 }}>
                        <Checkbox
                          checked={visibleColumns.includes(header.key)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleColumnVisibilityChange(header.key, e.target.checked);
                          }}
                          size="small"
                          sx={{ 
                            padding: '3px',
                            '& .MuiSvgIcon-root': {
                              fontSize: 16
                            }
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary={header.name}
                        primaryTypographyProps={{ variant: 'body2' }}
                        sx={{ ml: 0 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          {/* Filters Section - Only for Selected Column */}
          {selectedColumnForFilter && (
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Filter: {tableHeaders.find(h => h.key === selectedColumnForFilter)?.name}
                </Typography>
                <Button
                  size="small"
                  startIcon={<ClearIcon />}
                  onClick={clearAllFilters}
                  variant="outlined"
                  color="secondary"
                >
                  Clear All
                </Button>
              </Stack>
              
              <Stack spacing={2}>
                {(() => {
                  const header = tableHeaders.find(h => h.key === selectedColumnForFilter);
                  if (!header || !header.isFilter) return null;
                  
                  return (
                    <Box>
                      <Typography variant="body2" fontWeight="medium" mb={0.5}>
                        {header.name}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <TextField
                          placeholder={`Filter ${header.name}...`}
                          value={filterState[header.key]?.value || ''}
                          onChange={(e) => handleFilterChange(header.key, e.target.value, 'contains')}
                          size="small"
                          sx={{ flexGrow: 1 }}
                        />
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                          <Select
                            value={filterState[header.key]?.operator || 'contains'}
                            onChange={(e) => 
                              handleFilterChange(
                                header.key, 
                                filterState[header.key]?.value || '', 
                                e.target.value as any
                              )
                            }
                          >
                            <MenuItem value="contains">Contains</MenuItem>
                            <MenuItem value="equals">Equals</MenuItem>
                            <MenuItem value="startsWith">Starts With</MenuItem>
                            <MenuItem value="endsWith">Ends With</MenuItem>
                            <MenuItem value="greaterThan">Greater Than</MenuItem>
                            <MenuItem value="lessThan">Less Than</MenuItem>
                          </Select>
                        </FormControl>
                      </Stack>
                    </Box>
                  );
                })()}
              </Stack>
            </Box>
          )}
        </Box>
      </Popover>

          
      {pagination && totalPages > 1 && (
          <Box p={2} display="flex" justifyContent="center" alignItems="center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, page) => handlePageChange(page)}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
    </Card>
  );
};

RdsFluentGridBasic.displayName = 'RdsFluentGridBasic';
export default RdsFluentGridBasic;

