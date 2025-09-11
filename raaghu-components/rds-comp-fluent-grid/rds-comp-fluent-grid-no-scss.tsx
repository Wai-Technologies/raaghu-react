import React, { useState, useMemo, useRef, useEffect } from 'react';
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
  Tooltip,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Grid,
  useTheme,
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
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

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
  allowHtml?: boolean; // Allow HTML content in cells
  renderCell?: (value: any, row: any) => React.ReactNode; // Custom cell renderer
}

export interface FluentGridAction {
  displayName: string;
  id: string;
  offId?: string;
  modalId?: string;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export interface FilterState {
  [columnKey: string]: {
    value: string;
    operator: 'contains' | 'notContains' | 'equals' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'greaterThanOrEqual' | 'lessThanOrEqual' | 'between';
  };
}

export interface FilterCondition {
  columnKey: string;
  columnName: string;
  dataType: string;
  operator: string;
  value: string;
  id: string;
}

export interface FilterApiRequest {
  filters: FilterCondition[];
  logicalOperator?: 'AND' | 'OR';
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
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
  onFilterApiRequest?: (filterRequest: FilterApiRequest) => void;
  
  // Styling
  classes?: string;
  fontWeight?: string;
  illustration?: boolean;
  noDataTitle?: string;
  noDataHeaderTitle?: string;
  
  
  // Loading
  isLoading?: boolean;
}

// Action Menu Component
const ActionMenu: React.FC<{
  row: any;
  actions: FluentGridAction[];
  onActionSelection?: (rowData: any, actionId: any) => void;
}> = ({ row, actions, onActionSelection }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (actionId: string) => {
    onActionSelection?.(row, actionId);
    handleClose();
  };

  const getActionIcon = (actionId: string) => {
    switch (actionId.toLowerCase()) {
      case 'edit':
        return <EditIcon fontSize="small" />;
      case 'delete':
        return <DeleteIcon fontSize="small" />;
      case 'view':
        return <ViewIcon fontSize="small" />;
      default:
        return <MoreIcon fontSize="small" />;
    }
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={handleClick}
        sx={{
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        <MoreIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            minWidth: 120,
            '& .MuiMenuItem-root': {
              fontSize: '14px',
            },
          },
        }}
      >
        {actions.map((action) => (
          <MenuItem
            key={action.id}
            onClick={() => handleActionClick(action.id)}
            sx={{
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              {getActionIcon(action.id)}
            </ListItemIcon>
            <ListItemText primary={action.displayName} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const RdsFluentGridNoScss: React.FC<RdsFluentGridProps> = ({
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
  onFilterApiRequest,
  classes,
  fontWeight,
  illustration = false,
  noDataTitle = 'No data available',
  noDataHeaderTitle = 'Data Grid',
  isLoading = false,
}) => {
  const theme = useTheme();
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
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [filterConditions, setFilterConditions] = useState([
    { id: 1, column: '', operator: 'contains', value: '' },
    { id: 2, column: '', operator: 'contains', value: '' }
  ]);
  const [columnFilterStates, setColumnFilterStates] = useState<{[columnKey: string]: {operator: string, value: string}}>({});
  const [columnWidths, setColumnWidths] = useState<{[columnKey: string]: number}>({});
  const [isResizing, setIsResizing] = useState(false);
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [resizeStartX, setResizeStartX] = useState(0);
  const [resizeStartWidth, setResizeStartWidth] = useState(0);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

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
          const cellValue = row[columnKey];
          const filterValue = filter.value;
          
          // Get column data type for proper comparison
          const column = tableHeaders.find(h => h.key === columnKey);
          const dataType = column?.dataType?.toLowerCase() || 'string';
          
          switch (filter.operator) {
            case 'contains':
              return cellValue?.toString().toLowerCase().includes(filterValue.toLowerCase());
            case 'notContains':
              return !cellValue?.toString().toLowerCase().includes(filterValue.toLowerCase());
            case 'equals':
              if (dataType === 'number' || dataType === 'numeric' || dataType === 'int' || dataType === 'float' || dataType === 'decimal') {
                return parseFloat(cellValue) === parseFloat(filterValue);
              } else if (dataType === 'date' || dataType === 'datetime' || dataType === 'timestamp') {
                return new Date(cellValue).toDateString() === new Date(filterValue).toDateString();
              } else {
                return cellValue?.toString().toLowerCase() === filterValue.toLowerCase();
              }
            case 'startsWith':
              return cellValue?.toString().toLowerCase().startsWith(filterValue.toLowerCase());
            case 'endsWith':
              return cellValue?.toString().toLowerCase().endsWith(filterValue.toLowerCase());
            case 'greaterThan':
              if (dataType === 'date' || dataType === 'datetime' || dataType === 'timestamp') {
                return new Date(cellValue) > new Date(filterValue);
              } else {
                return parseFloat(cellValue) > parseFloat(filterValue);
              }
            case 'lessThan':
              if (dataType === 'date' || dataType === 'datetime' || dataType === 'timestamp') {
                return new Date(cellValue) < new Date(filterValue);
              } else {
                return parseFloat(cellValue) < parseFloat(filterValue);
              }
            case 'greaterThanOrEqual':
              if (dataType === 'date' || dataType === 'datetime' || dataType === 'timestamp') {
                return new Date(cellValue) >= new Date(filterValue);
              } else {
                return parseFloat(cellValue) >= parseFloat(filterValue);
              }
            case 'lessThanOrEqual':
              if (dataType === 'date' || dataType === 'datetime' || dataType === 'timestamp') {
                return new Date(cellValue) <= new Date(filterValue);
              } else {
                return parseFloat(cellValue) <= parseFloat(filterValue);
              }
            case 'between':
              // For between, we'll need to handle this separately as it requires two values
              // For now, treat it as greaterThan
              if (dataType === 'date' || dataType === 'datetime' || dataType === 'timestamp') {
                return new Date(cellValue) >= new Date(filterValue);
              } else {
                return parseFloat(cellValue) >= parseFloat(filterValue);
              }
            default:
              return cellValue?.toString().toLowerCase().includes(filterValue.toLowerCase());
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
  }, [tableData, searchValue, filterState, sortColumn, sortDirection, pagination, currentPage, recordsPerPage, visibleColumns]);

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
  };

  const getVisibleHeaders = () => {
    const visible = tableHeaders.filter(header => visibleColumns.includes(header.key));
    return visible;
  };

  // Get operators based on data type
  const getOperatorsForDataType = (dataType: string) => {
    switch (dataType?.toLowerCase()) {
      case 'number':
      case 'numeric':
      case 'int':
      case 'float':
      case 'decimal':
        return [
          { value: 'equals', label: 'Equals' },
          { value: 'greaterThan', label: 'Greater Than' },
          { value: 'lessThan', label: 'Less Than' },
          { value: 'greaterThanOrEqual', label: 'Greater Than or Equal' },
          { value: 'lessThanOrEqual', label: 'Less Than or Equal' },
          { value: 'between', label: 'Between' }
        ];
      case 'date':
      case 'datetime':
      case 'timestamp':
        return [
          { value: 'equals', label: 'Equals' },
          { value: 'greaterThan', label: 'After' },
          { value: 'lessThan', label: 'Before' },
          { value: 'greaterThanOrEqual', label: 'On or After' },
          { value: 'lessThanOrEqual', label: 'On or Before' },
          { value: 'between', label: 'Between' }
        ];
      case 'boolean':
        return [
          { value: 'equals', label: 'Equals' }
        ];
      default: // string, text, varchar, etc.
        return [
          { value: 'contains', label: 'Contains' },
          { value: 'equals', label: 'Equals' },
          { value: 'startsWith', label: 'Starts With' },
          { value: 'endsWith', label: 'Ends With' },
          { value: 'notContains', label: 'Does Not Contain' }
        ];
    }
  };

  // Get input type based on data type
  const getInputTypeForDataType = (dataType: string) => {
    switch (dataType?.toLowerCase()) {
      case 'number':
      case 'numeric':
      case 'int':
      case 'float':
      case 'decimal':
        return 'number';
      case 'date':
      case 'datetime':
      case 'timestamp':
        return 'date';
      case 'email':
        return 'email';
      case 'url':
        return 'url';
      default:
        return 'text';
    }
  };

  const handleFilterIconClick = (event: React.MouseEvent<HTMLElement>, columnKey: string) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedColumnForFilter(columnKey);
    setFilterAnchorEl(event.currentTarget);
    setIsFilterPopupOpen(true);
    
    // Load column-specific filter state
    const columnFilterState = columnFilterStates[columnKey] || { operator: 'contains', value: '' };
    
    // Set the column in filter conditions with column-specific values
    setFilterConditions(prev => 
      prev.map(condition => 
        condition.id === 1 ? { 
          ...condition, 
          column: columnKey,
          value: columnFilterState.value,
          operator: columnFilterState.operator
        } : condition
      )
    );
  };

  const handleFilterPopupClose = () => {
    setFilterAnchorEl(null);
    setIsFilterPopupOpen(false);
    setSelectedColumnForFilter(null);
  };

  const handleResizeStart = (e: React.MouseEvent, columnKey: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const header = tableHeaders.find(h => h.key === columnKey);
    if (header?.isResizable !== false) {
      setIsResizing(true);
      setResizingColumn(columnKey);
      setResizeStartX(e.clientX);
      setResizeStartWidth(columnWidths[columnKey] || header?.minWidth || 150);
      
      // Prevent text selection during resize
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    }
  };

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isFilterPopupOpen && filterAnchorEl) {
        const target = event.target as Element;
        if (!target.closest('.MuiPopover-root') && !target.closest('[data-filter-button]')) {
          handleFilterPopupClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterPopupOpen, filterAnchorEl]);

  // Initialize column widths
  useEffect(() => {
    const initialWidths: {[columnKey: string]: number} = {};
    tableHeaders.forEach(header => {
      if (header.colWidth) {
        initialWidths[header.key] = parseInt(header.colWidth.replace('px', ''));
      } else {
        initialWidths[header.key] = header.minWidth || 100;
      }
    });
    setColumnWidths(initialWidths);
  }, [tableHeaders]);

  // Handle column resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing && resizingColumn) {
        const deltaX = e.clientX - resizeStartX;
        const header = tableHeaders.find(h => h.key === resizingColumn);
        const minWidth = header?.minWidth || 30; // Use user-defined minWidth or default to 30
        const maxWidth = header?.maxWidth || 500;
        
        const requestedWidth = resizeStartWidth + deltaX;
        const newWidth = Math.max(
          minWidth,
          Math.min(maxWidth, requestedWidth)
        );
        
        setColumnWidths(prev => ({
          ...prev,
          [resizingColumn]: newWidth
        }));
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizingColumn(null);
      setResizeStartX(0);
      setResizeStartWidth(0);
      
      // Restore cursor and user selection
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizingColumn, resizeStartX, resizeStartWidth, tableHeaders]);

  const handleColumnPanelToggle = () => {
    setIsColumnPanelExpanded(!isColumnPanelExpanded);
  };

  const handleFilterToggle = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };

  const handleFilterConditionChange = (id: number, field: string, value: any) => {
    setFilterConditions(prev => 
      prev.map(condition => 
        condition.id === id ? { ...condition, [field]: value } : condition
      )
    );
    
    // No real-time filtering - only update when FILTER button is clicked
  };

  const handleApplyFilter = () => {
    const columnToFilter = selectedColumnForFilter || filterConditions[0].column;
    
    if (columnToFilter && filterConditions[0].value) {
      const filterValue = (filterConditions[0].value as any) instanceof Date ? 
        (filterConditions[0].value as unknown as Date).toISOString().split('T')[0] : 
        filterConditions[0].value;
      
      // Update the main filter state (preserving existing filters)
      const newFilterState = { ...filterState };
      newFilterState[columnToFilter] = {
        value: filterValue,
        operator: filterConditions[0].operator as any
      };
      
      // Update column-specific filter state
      const newColumnFilterStates = { ...columnFilterStates };
      newColumnFilterStates[columnToFilter] = {
        operator: filterConditions[0].operator,
        value: filterValue
      };
      
      // Generate API request JSON from ALL active filters
      const activeFilters = Object.entries(newFilterState)
        .filter(([_, filter]) => filter.value && filter.value.trim() !== '')
        .map(([columnKey, filter]) => {
          const column = tableHeaders.find(h => h.key === columnKey);
          return {
            columnKey,
            columnName: column?.name || columnKey,
            dataType: column?.dataType || 'string',
            operator: filter.operator,
            value: filter.value,
            id: `${columnKey}_${Date.now()}`
          } as FilterCondition;
        });
      
      const filterApiRequest: FilterApiRequest = {
        filters: activeFilters,
        logicalOperator: 'AND',
        page: currentPage,
        pageSize: recordsPerPage,
        sortBy: sortColumn || undefined,
        sortDirection: sortColumn ? (sortDirection === 'asc' ? 'ASC' : 'DESC') : undefined
      };
      
      console.log('Applying filter for column:', columnToFilter);
      console.log('All active filters:', newFilterState);
      console.log('API Request JSON:', JSON.stringify(filterApiRequest, null, 2));
      
      setFilterState(newFilterState);
      setColumnFilterStates(newColumnFilterStates);
      onFilterChange?.(newFilterState);
      onFilterApiRequest?.(filterApiRequest);
    }
    
    handleFilterPopupClose();
  };

  const handleClearAdvancedFilter = () => {
    setFilterConditions([
      { id: 1, column: '', operator: 'contains', value: '' },
      { id: 2, column: '', operator: 'contains', value: '' }
    ]);
    
    // Clear only the current column's filter, preserve others
    if (selectedColumnForFilter) {
      const newFilterState = { ...filterState };
      delete newFilterState[selectedColumnForFilter];
      
      const newColumnFilterStates = { ...columnFilterStates };
      delete newColumnFilterStates[selectedColumnForFilter];
      
      // Generate API request JSON from remaining active filters
      const activeFilters = Object.entries(newFilterState)
        .filter(([_, filter]) => filter.value && filter.value.trim() !== '')
        .map(([columnKey, filter]) => {
          const column = tableHeaders.find(h => h.key === columnKey);
          return {
            columnKey,
            columnName: column?.name || columnKey,
            dataType: column?.dataType || 'string',
            operator: filter.operator,
            value: filter.value,
            id: `${columnKey}_${Date.now()}`
          } as FilterCondition;
        });
      
      const filterApiRequest: FilterApiRequest = {
        filters: activeFilters,
        logicalOperator: 'AND',
        page: currentPage,
        pageSize: recordsPerPage,
        sortBy: sortColumn || undefined,
        sortDirection: sortColumn ? (sortDirection === 'asc' ? 'ASC' : 'DESC') : undefined
      };
      
      console.log('Clearing filter for column:', selectedColumnForFilter);
      console.log('Remaining active filters:', newFilterState);
      console.log('API Request JSON:', JSON.stringify(filterApiRequest, null, 2));
      
      setFilterState(newFilterState);
      setColumnFilterStates(newColumnFilterStates);
      onFilterChange?.(newFilterState);
      onFilterApiRequest?.(filterApiRequest);
    }
    
    handleFilterPopupClose();
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

  if (isLoading) {
    return (
      <Card sx={{ p: 2 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Typography variant="h6" color="text.secondary">
            Loading...
          </Typography>
        </Box>
      </Card>
    );
  }

  if (tableData.length === 0) {
    return (
      <Card sx={{ p: 2 }}>
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
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="200px">
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {noDataTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            No data available to display
          </Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Card sx={{
      bgcolor: theme.palette.mode === 'dark' ? '#333333' : undefined,
      color: theme.palette.mode === 'dark' ? '#ffffff' : undefined,
      '& .MuiTableCell-root': {
        color: theme.palette.mode === 'dark' ? '#ffffff' : 'inherit'
      }
    }}>
      {showHeader && (
        <Box p={2} borderBottom="1px solid" borderColor="divider" sx={{
          bgcolor: theme.palette.mode === 'dark' ? '#333333' : undefined
        }}>
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

      {showFilters && (
        <Box p={2} borderBottom="1px solid" borderColor="divider" sx={{
          bgcolor: theme.palette.mode === 'dark' ? '#333333' : 'grey.50'
        }}>
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
        <Box p={1.5} borderBottom="1px solid" borderColor="divider" sx={{ 
          bgcolor: theme => theme.palette.mode === 'dark' ? '#424242' : 'grey.100'
        }}>
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
        <TableContainer 
          component={Paper} 
          elevation={0}
          sx={{
            bgcolor: theme.palette.mode === 'dark' ? '#333333' : undefined,
          }}
        >
          <Table stickyHeader ref={tableRef}>
            <TableHead sx={{ 
              bgcolor: theme.palette.mode === 'dark' ? '#424242' : undefined,
              '& th': { bgcolor: theme.palette.mode === 'dark' ? '#424242 !important' : undefined }
            }}>
              <TableRow sx={{ 
                bgcolor: theme.palette.mode === 'dark' ? '#424242' : undefined 
              }}>
                {enableCheckboxSelection && (
                  <TableCell 
                    padding="checkbox" 
                    sx={{ 
                      width: '50px',
                      borderRight: '1px solid #d1d1d1',
                      bgcolor: theme.palette.mode === 'dark' ? '#424242 !important' : undefined,
                    }}
                  >
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
                  <TableCell 
                    padding="checkbox" 
                    sx={{ 
                      width: '50px',
                      borderRight: '1px solid #d1d1d1',
                      bgcolor: theme.palette.mode === 'dark' ? '#424242 !important' : undefined,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {enableCheckboxSelection ? 'Select All' : 'Select'}
                    </Typography>
                  </TableCell>
                )}
                
                {getVisibleHeaders().map((header) => (
                  <TableCell
                    key={header.key}
                    sx={{
                      cursor: isSort && header.isSort ? 'pointer' : 'default',
                      width: columnWidths[header.key] || header.minWidth || 150,
                      maxWidth: header.maxWidth || 500,
                      fontWeight: header.isBold ? 'bold' : 'normal',
                      position: 'relative',
                      userSelect: 'none',
                      borderRight: '1px solid #d1d1d1',
                      bgcolor: theme.palette.mode === 'dark' ? '#424242 !important' : undefined,
                      '&:last-child': {
                        borderRight: 'none',
                      },
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
                                if (sortDirection === 'asc') {
                                  return <ArrowUpIcon fontSize="small" />;
                                }
                                return <ArrowDownIcon fontSize="small" />;
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
                              onClick={(e) => handleFilterIconClick(e, header.key)}
                              ref={filterButtonRef}
                              data-filter-button
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
                    
                    {/* Resize handle */}
                    {header.isResizable !== false && (
                      <Box
                        role="separator"
                        aria-label={`Resize ${header.name} column`}
                        tabIndex={0}
                        onMouseDown={(e) => handleResizeStart(e, header.key)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            // For keyboard users, we could implement arrow key resizing
                            // For now, just focus the handle
                          }
                        }}
                        sx={{
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          bottom: 0,
                          width: '4px',
                          cursor: 'col-resize',
                          backgroundColor: isResizing && resizingColumn === header.key ? 'primary.main' : 'transparent',
                          zIndex: 10,
                          transition: 'background-color 0.2s ease',
                          '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: 0.7,
                          },
                          '&:focus': {
                            outline: '2px solid',
                            outlineColor: 'primary.main',
                            outlineOffset: '1px',
                          },
                        }}
                      />
                    )}
                  </TableCell>
                ))}
                
                {actions.length > 0 && (
                  <TableCell 
                    sx={{ 
                      width: '100px',
                      borderRight: 'none',
                      bgcolor: theme.palette.mode === 'dark' ? '#424242 !important' : undefined,
                    }}
                  >
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
                    {enableCheckboxSelection && (
                      <TableCell 
                        padding="checkbox"
                        sx={{ borderRight: '1px solid #d1d1d1' }}
                      >
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handleRowSelect(rowId, row)}
                        />
                      </TableCell>
                    )}
                    
                    {enableRadioButtonSelection && (
                      <TableCell 
                        padding="checkbox"
                        sx={{ borderRight: '1px solid #d1d1d1' }}
                      >
                        <Radio
                          checked={isSelected}
                          onChange={() => handleRowSelect(rowId, row)}
                          name="rowSelection"
                        />
                      </TableCell>
                    )}
                    
                    {getVisibleHeaders().map((header) => {
                      const cellValue = row[header.key];
                      const cellWidth = columnWidths[header.key] || header.minWidth || 150;
                      const minWidth = header.minWidth || 50;
                      
                      // Check if we should render HTML content
                      const shouldRenderHtml = header.allowHtml && typeof cellValue === 'string' && cellValue.includes('<');
                      const cellText = shouldRenderHtml ? '' : (cellValue?.toString() || '');
                      
                      // Only show tooltip if text might be truncated and not HTML
                      const shouldShowTooltip = !shouldRenderHtml && cellText.length > 0 && cellWidth < minWidth + 50;
                      
                      // Use custom renderer if provided
                      if (header.renderCell) {
                        return (
                      <TableCell
                        key={header.key}
                        sx={{
                              width: cellWidth,
                              maxWidth: header.maxWidth || 500,
                              borderRight: '1px solid #d1d1d1',
                              '&:last-child': {
                                borderRight: 'none',
                              },
                            }}
                          >
                            {header.renderCell(cellValue, row)}
                          </TableCell>
                        );
                      }
                      
                      return (
                        <TableCell
                          key={header.key}
                          sx={{
                            width: cellWidth,
                            maxWidth: header.maxWidth || 500,
                            borderRight: '1px solid #d1d1d1',
                            color: theme.palette.mode === 'dark' ? '#ffffff' : 'inherit',
                            '&:last-child': {
                              borderRight: 'none',
                            },
                          }}
                        >
                          {shouldRenderHtml ? (
                            <Box 
                              sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                width: '100%',
                                color: theme.palette.mode === 'dark' ? '#ffffff' : 'inherit',
                                '& *': {
                                  maxWidth: '100%',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  color: theme.palette.mode === 'dark' ? '#ffffff !important' : 'inherit',
                                },
                                // Status pill styles
                                '& .status-pill': {
                                  display: 'inline-block',
                                  padding: '2px 8px',
                                  borderRadius: '12px',
                                  fontSize: '12px',
                                  fontWeight: 500,
                                  textAlign: 'center',
                                  minWidth: '60px',
                                  '&.status-qualified': {
                                    backgroundColor: theme.palette.mode === 'dark' ? '#155724' : '#d4edda',
                                    color: theme.palette.mode === 'dark' ? '#d4edda' : '#155724',
                                  },
                                  '&.status-negotiation': {
                                    backgroundColor: theme.palette.mode === 'dark' ? '#856404' : '#fff3cd',
                                    color: theme.palette.mode === 'dark' ? '#fff3cd' : '#856404',
                                  },
                                  '&.status-unqualified': {
                                    backgroundColor: theme.palette.mode === 'dark' ? '#721c24' : '#f8d7da',
                                    color: theme.palette.mode === 'dark' ? '#f8d7da' : '#721c24',
                                  },
                                  '&.status-proposal': {
                                    backgroundColor: theme.palette.mode === 'dark' ? '#495057' : '#e9ecef',
                                    color: theme.palette.mode === 'dark' ? '#e9ecef' : '#495057',
                                  },
                                  '&.status-new': {
                                    backgroundColor: theme.palette.mode === 'dark' ? '#0066cc' : '#cce5ff',
                                    color: theme.palette.mode === 'dark' ? '#cce5ff' : '#0066cc',
                                  },
                                  '&.status-renewal': {
                                    backgroundColor: theme.palette.mode === 'dark' ? '#0078d4' : '#0078d4',
                                    color: '#ffffff',
                                  },
                                },
                                // Progress bar styles
                                '& .progress-bar': {
                                  width: '100%',
                                  height: '8px',
                                  backgroundColor: '#e9ecef',
                                  borderRadius: '4px',
                                  overflow: 'hidden',
                                  '& .progress-fill': {
                                    height: '100%',
                                    backgroundColor: '#0078d4',
                                    transition: 'width 0.3s ease',
                                  },
                                },
                                // Verification icon styles
                                '& .verification-icon': {
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  '&.verified': {
                                    backgroundColor: '#28a745',
                                    color: 'white',
                                  },
                                  '&.not-verified': {
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                  },
                                },
                                // Image styles
                                '& img': {
                                  maxWidth: '24px',
                                  maxHeight: '24px',
                                  borderRadius: '50%',
                                  verticalAlign: 'middle',
                                  marginRight: '8px',
                                },
                                // Employee profile styles for dark theme
                                '& .employee-name': {
                                  color: theme.palette.mode === 'dark' ? '#ffffff !important' : 'inherit',
                                  fontWeight: 'bold',
                                },
                                '& .employee-title': {
                                  color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8) !important' : 'inherit',
                                },
                                '& .tag': {
                                  color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.9) !important' : 'inherit',
                                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.23) !important' : 'inherit',
                                },
                                '& .badge, & span[class*="badge"], & .chip, & span[class*="chip"]': {
                                  color: theme.palette.mode === 'dark' ? '#ffffff !important' : 'inherit',
                                },
                                '& .last-active': {
                                  color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7) !important' : 'inherit',
                                },
                                '& .online, & .away': {
                                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.23) !important' : 'inherit',
                                },
                                '& .leadership, & .management, & .strategy, & .planning, & .coordination, & .reporting': {
                                  color: theme.palette.mode === 'dark' ? '#000000 !important' : 'inherit',
                                  borderColor: theme.palette.mode === 'dark' ? 'transparent !important' : 'inherit',
                                },
                                '& .senior, & .lead, & .pending, & .active': {
                                  color: theme.palette.mode === 'dark' ? '#000000 !important' : 'inherit',
                                },
                              }}
                              dangerouslySetInnerHTML={{ __html: cellValue }}
                            />
                          ) : shouldShowTooltip ? (
                            <Tooltip title={cellText} arrow>
                              <Typography 
                                variant="body2" 
                                sx={{
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  width: '100%',
                                }}
                              >
                                {cellText}
                        </Typography>
                            </Tooltip>
                          ) : (
                            <Typography 
                              variant="body2" 
                              sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                width: '100%',
                              }}
                            >
                              {cellText}
                            </Typography>
                          )}
                      </TableCell>
                      );
                    })}
                    
                    {actions.length > 0 && (
                      <TableCell sx={{ borderRight: 'none' }}>
                        <Stack direction="row" spacing={0.5}>
                          {actionColumnStyle === ActionColumnStyle.ShowButtonsDirectly ? (
                            actions.map((action) => (
                              <Button
                                key={action.id}
                                size={action.size || "small"}
                                variant={action.variant || "outlined"}
                                color={action.color || "primary"}
                                disabled={action.disabled || false}
                                onClick={() => onActionSelection?.(row, action.id)}
                              >
                                {action.displayName}
                              </Button>
                            ))
                          ) : (
                            <ActionMenu row={row} actions={actions} onActionSelection={onActionSelection} />
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
            width: 200,
            maxHeight: 250,
            overflow: 'auto',
            zIndex: 1300,
          }
        }}
      >
        <Box p={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '12px' }}>
              {selectedColumnForFilter ? 
                `Filter: ${tableHeaders.find(h => h.key === selectedColumnForFilter)?.name || selectedColumnForFilter}` : 
                'Controls'
              }
            </Typography>
            <IconButton size="small" onClick={handleFilterPopupClose} sx={{ width: '20px', height: '20px' }}>
              <ClearIcon sx={{ fontSize: '14px' }} />
            </IconButton>
          </Stack>
          
          <Divider sx={{ mb: 1 }} />
          
          {/* Column Visibility Section - Accordion Panel */}
          <Box mb={1}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                p: 0.5,
                borderRadius: 0.5,
                border: '1px solid',
                borderColor: 'divider',
                width: '100%',
                '&:hover': { backgroundColor: 'action.hover' }
              }}
              onClick={handleColumnPanelToggle}
            >
              <Typography variant="caption" fontWeight="medium" sx={{ flexGrow: 1, fontSize: '10px' }}>
                Columns
              </Typography>
              {isColumnPanelExpanded ? <ArrowUpIcon sx={{ fontSize: '12px' }} /> : <ArrowDownIcon sx={{ fontSize: '12px' }} />}
            </Box>
            
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
                  width: '100%',
                  maxHeight: '80px',
                  overflowY: 'auto'
                }}
              >
                <List dense sx={{ py: 0 }}>
                  {tableHeaders.map((header) => (
                    <ListItem 
                      key={header.key} 
                      sx={{ 
                        py: 0,
                        px: 0.25,
                        minHeight: 16,
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: 'action.hover' }
                      }}
                      onClick={() => {
                        const isCurrentlyVisible = visibleColumns.includes(header.key);
                        handleColumnVisibilityChange(header.key, !isCurrentlyVisible);
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 16 }}>
                        <Checkbox
                          checked={visibleColumns.includes(header.key)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleColumnVisibilityChange(header.key, e.target.checked);
                          }}
                          size="small"
                          sx={{ 
                            padding: '1px',
                            '& .MuiSvgIcon-root': {
                              fontSize: 12
                            }
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary={header.name}
                        primaryTypographyProps={{ variant: 'caption', sx: { fontSize: '9px' } }}
                        sx={{ ml: 0 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>
          
          <Divider sx={{ mb: 1 }} />
          
          {/* Advanced Filter Section */}
          <Box>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                p: 0.5,
                borderRadius: 0.5,
                border: '1px solid',
                borderColor: 'divider',
                width: '100%',
                mb: 0.5,
                '&:hover': { backgroundColor: 'action.hover' }
              }}
              onClick={handleFilterToggle}
            >
              <Typography variant="caption" fontWeight="medium" sx={{ flexGrow: 1, fontSize: '10px' }}>
                Filter
              </Typography>
              {isFilterExpanded ? <ArrowUpIcon sx={{ fontSize: '12px' }} /> : <ArrowDownIcon sx={{ fontSize: '12px' }} />}
            </Box>
            
            {isFilterExpanded && (
              <Box 
                sx={{ 
                  p: 0.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '0 0 4px 4px',
                  backgroundColor: 'grey.50',
                  width: '100%'
                }}
              >
                <Stack spacing={1}>
                  {/* Dynamic Filter Controls based on Column Data Type */}
                  {(() => {
                    const selectedColumn = tableHeaders.find(h => h.key === selectedColumnForFilter);
                    const dataType = selectedColumn?.dataType || 'string';
                    const operators = getOperatorsForDataType(dataType);
                    const inputType = getInputTypeForDataType(dataType);
                    
                    return (
                      <Box>
                        <FormControl size="small" sx={{ minWidth: 80, mb: 0.5 }}>
                          <Select
                            value={filterConditions[0].operator}
                            onChange={(e) => handleFilterConditionChange(1, 'operator', e.target.value)}
                            sx={{ 
                              fontSize: '10px',
                              height: '24px',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderWidth: 1,
                                borderColor: '#000'
                              }
                            }}
                          >
                            {operators.map((op) => (
                              <MenuItem key={op.value} value={op.value} sx={{ fontSize: '10px' }}>
                                {op.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        
                        {/* Dynamic Input based on Data Type */}
                        {inputType === 'date' ? (
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              value={filterConditions[0].value ? new Date(filterConditions[0].value) : null}
                              onChange={(date) => handleFilterConditionChange(1, 'value', date)}
                              slotProps={{
                                textField: {
                                  size: 'small',
                                  fullWidth: true,
                                  placeholder: 'Select date...',
                                  sx: {
                                    '& .MuiInputBase-input': {
                                      fontSize: '10px',
                                      height: '24px',
                                      padding: '4px 8px'
                                    }
                                  }
                                }
                              }}
                            />
                          </LocalizationProvider>
                        ) : inputType === 'number' ? (
                          <TextField
                            placeholder="Enter number..."
                            type="number"
                            value={filterConditions[0].value}
                            onChange={(e) => handleFilterConditionChange(1, 'value', e.target.value)}
                            size="small"
                            fullWidth
                            sx={{
                              '& .MuiInputBase-input': {
                                fontSize: '10px',
                                height: '24px',
                                padding: '4px 8px'
                              }
                            }}
                          />
                        ) : (
                          <TextField
                            placeholder={`Enter ${dataType}...`}
                            type={inputType}
                            value={filterConditions[0].value}
                            onChange={(e) => handleFilterConditionChange(1, 'value', e.target.value)}
                            size="small"
                            fullWidth
                            sx={{
                              '& .MuiInputBase-input': {
                                fontSize: '10px',
                                height: '24px',
                                padding: '4px 8px'
                              }
                            }}
                          />
                        )}
                      </Box>
                    );
                  })()}

                  {/* Logical Operator */}
                  {/* <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={logicalOperator}
                      onChange={(e) => setLogicalOperator(e.target.value)}
                    >
                      <MenuItem value="and">And</MenuItem>
                      <MenuItem value="or">Or</MenuItem>
                    </Select>
                  </FormControl> */}

                  {/* Second Condition */}
                  {/* <Box>
                    <FormControl size="small" sx={{ minWidth: 120, mb: 1 }}>
                      <Select
                        value={filterConditions[1].operator}
                        onChange={(e) => handleFilterConditionChange(2, 'operator', e.target.value)}
                      >
                        <MenuItem value="contains">Contains</MenuItem>
                        <MenuItem value="equals">Equals</MenuItem>
                        <MenuItem value="startsWith">Starts With</MenuItem>
                        <MenuItem value="endsWith">Ends With</MenuItem>
                        <MenuItem value="greaterThan">Greater Than</MenuItem>
                        <MenuItem value="lessThan">Less Than</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      placeholder="Enter value..."
                      value={filterConditions[1].value}
                      onChange={(e) => handleFilterConditionChange(2, 'value', e.target.value)}
                      size="small"
                      fullWidth
                    />
                  </Box> */}

                  {/* Action Buttons */}
                  <Stack direction="row" spacing={0.5} sx={{ mt: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={handleApplyFilter}
                      sx={{ 
                        flexGrow: 1,
                        fontSize: '9px',
                        height: '20px',
                        minWidth: '0'
                      }}
                    >
                      Filter
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleClearAdvancedFilter}
                      sx={{ 
                        flexGrow: 1,
                        fontSize: '9px',
                        height: '20px',
                        minWidth: '0'
                      }}
                    >
                      Clear
                    </Button>
                  </Stack>
                  
                  {/* Clear All Filters Button */}
                  {Object.keys(filterState).length > 0 && (
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => {
                        setFilterState({});
                        setColumnFilterStates({});
                        onFilterChange?.({});
                        onFilterApiRequest?.({ filters: [], logicalOperator: 'AND' });
                        handleFilterPopupClose();
                        console.log('Cleared all filters');
                      }}
                      sx={{ 
                        width: '100%',
                        fontSize: '8px',
                        height: '18px',
                        mt: 0.5,
                        color: 'error.main'
                      }}
                    >
                      Clear All Filters
                    </Button>
                  )}
                </Stack>
              </Box>
            )}
          </Box>
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

RdsFluentGridNoScss.displayName = 'RdsFluentGridNoScss';
export default RdsFluentGridNoScss;
