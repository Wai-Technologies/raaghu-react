import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Button,
  Typography,
  CircularProgress,
  TextField,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material';
import {
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  FilterList as FilterIcon,
  MoreVert as MoreIcon,
  Add as AddIcon,
  Person as PersonIcon,
  Visibility as VisibilityIcon,
  Clear as ClearIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  DragIndicator as DragIndicatorIcon,
} from '@mui/icons-material';
// @ts-ignore - Suppress TypeScript errors for react-beautiful-dnd import
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import RdsPagination from '../../raaghu-elements/rds-pagination/rds-pagination';
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
  isEditable?: boolean; // Enable inline editing for this column
  colWidth?: string;
  minWidth?: number;
  maxWidth?: number;
  allowHtml?: boolean; // Allow HTML content in cells
  renderCell?: (value: any, row: any) => React.ReactNode; // Custom cell renderer
  validateCell?: (value: any, row: any) => string | null; // Custom validation function
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
    operator: 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'greaterThanOrEqual' | 'lessThanOrEqual' | 'between';
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
  
  // State Management
  controlledData?: any[]; // Controlled data state
  onDataChange?: (newData: any[]) => void; // Callback when data changes
  
  // Features
  isSort?: boolean;
  isFilter?: boolean;
  isResizable?: boolean;
  enableCheckboxSelection?: boolean;
  enableRadioButtonSelection?: boolean;
  enableInlineEdit?: boolean; // Enable inline editing globally
  inlineEditMode?: 'cell' | 'row'; // Inline edit mode: cell-by-cell (default) or row-based editing
  enableRowSwapping?: boolean; // Enable row drag and drop functionality
  
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
  pageSizeOptions?: number[];
  showRecordsPerPage?: boolean;
  
  // Callbacks
  onActionSelection?: (rowData: any, actionId: any) => void;
  onRowSelect?: (data: any) => void;
  onRowClick?: (rowId: any) => void;
  onPaginationHandler?: (currentPage: number, recordsPerPage: number) => void;
  onSortChange?: (sortState: any) => void;
  onFilterChange?: (filterState: FilterState) => void;
  onFilterApiRequest?: (filterRequest: FilterApiRequest) => void;
  onColumnVisibilityChange?: (visibleColumns: string[]) => void;
  onCellEdit?: (rowId: string, columnKey: string, newValue: any, oldValue: any) => void;
  onCellEditComplete?: (rowId: string, columnKey: string, newValue: any, isValid: boolean) => void;
  onRowSwap?: (fromIndex: number, toIndex: number, newData: any[]) => void; // New callback for row swapping
  
  // Styling
  classes?: string;
  fontWeight?: string;
  illustration?: boolean;
  noDataTitle?: string;
  noDataHeaderTitle?: string;
  
  
  // Loading
  isLoading?: boolean;
}

// Editable Cell Component
const EditableCell: React.FC<{
  value: any;
  column: FluentGridColumn;
  row: any;
  isEditing: boolean;
  onStartEdit: () => void;
  onSave: (newValue: any) => void;
  onCancel: () => void;
  onValueChange: (newValue: any) => void;
  tempValue: any;
  validationError?: string;
}> = ({ 
  value, 
  column, 
  row, 
  isEditing, 
  onStartEdit, 
  onSave, 
  onCancel, 
  onValueChange, 
  tempValue, 
  validationError 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Only select text for text-based inputs
      if (inputRef.current.type === 'text' || inputRef.current.type === 'email' || inputRef.current.type === 'url') {
        try {
          inputRef.current.select();
        } catch (e) {
          // Fallback: set cursor to end if select fails
          inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
        }
      }
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSave(tempValue);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onCancel();
    }
  };

  const handleBlur = () => {
    // Auto-save on blur
    onSave(tempValue);
  };

  const getInputType = () => {
    switch (column.dataType?.toLowerCase()) {
      case 'number':
      case 'numeric':
      case 'int':
      case 'float':
      case 'decimal':
        return 'number';
      case 'email':
        return 'email';
      case 'url':
        return 'url';
      case 'date':
        return 'date';
      case 'datetime':
        return 'datetime-local';
      case 'time':
        return 'time';
      default:
        return 'text';
    }
  };

  const formatValueForDisplay = (val: any) => {
    if (val === null || val === undefined) return '';
    return val.toString();
  };

  if (isEditing) {
    return (
      <TextField
        ref={inputRef}
        value={tempValue}
        onChange={(e) => onValueChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        type={getInputType()}
        size="small"
        fullWidth
        error={!!validationError}
        helperText={validationError}
        sx={{
          '& .MuiInputBase-input': {
            padding: '4px 8px',
            fontSize: '14px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
          },
        }}
      />
    );
  }

  return (
    <div
      onClick={onStartEdit}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onStartEdit();
        }
      }}
      role="button"
      tabIndex={0}
      style={{
        cursor: 'pointer',
        padding: '4px 8px',
        minHeight: '32px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        border: '1px solid transparent',
        borderRadius: '4px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f5f5f5';
        e.currentTarget.style.border = '1px solid #e0e0e0';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.border = '1px solid transparent';
      }}
    >
      <Typography variant="body2" sx={{ width: '100%' }}>
        {formatValueForDisplay(value)}
      </Typography>
    </div>
  );
};

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
      <Button
        size="small"
        variant="text"
        startIcon={<MoreIcon />}
        className="rds-fluent-grid-action-button"
        onClick={handleClick}
      />
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
      >
        {actions.map((action) => (
          <MenuItem
            key={action.id}
            onClick={() => handleActionClick(action.id)}
          >
            {getActionIcon(action.id)}
            {action.displayName}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

// Styles will be handled by CSS classes in the SCSS file

const RdsFluentGrid: React.FC<RdsFluentGridProps> = (props) => {
  const {
    tableHeaders,
    tableData,
    controlledData,
    onDataChange,
    isSort = true,
    isFilter = true,
    isResizable = true,
    enableCheckboxSelection = false,
    enableRadioButtonSelection = false,
    enableInlineEdit = false,
    inlineEditMode = 'cell',
    enableRowSwapping = false,
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
    pageSizeOptions = [10, 25, 50, 100],
    showRecordsPerPage = true,
    onActionSelection,
    onRowSelect,
    onRowClick: _onRowClick,
    onPaginationHandler,
    onSortChange,
    onFilterChange,
  onFilterApiRequest,
    onColumnVisibilityChange,
    onCellEdit,
    onCellEditComplete,
    onRowSwap,
    classes,
    fontWeight: _fontWeight,
    illustration = false,
    noDataTitle = 'No data available',
    noDataHeaderTitle = 'Data Grid',
    isLoading = false,
  } = props;
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(state === State.Collapsed);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(recordsPerPage);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterState, setFilterState] = useState<FilterState>({});
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    tableHeaders.map(header => header.key)
  );
  
  // Internal data state management
  const [internalData, setInternalData] = useState<any[]>(tableData);
  const [localTableData, setLocalTableData] = useState<any[]>(tableData);
  
  // Use controlled data if provided, otherwise use internal data
  const currentData = controlledData || internalData;
  
  // Update internal data when tableData prop changes
  useEffect(() => {
    if (!controlledData) {
      setInternalData(tableData);
    }
    setLocalTableData([...tableData]);
  }, [tableData, controlledData]);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [selectedColumnForFilter, setSelectedColumnForFilter] = useState<string | null>(null);
  const [isColumnPanelExpanded, setIsColumnPanelExpanded] = useState(false);
  const [tempFilterValue, setTempFilterValue] = useState<string>('');
  const [tempFilterOperator, setTempFilterOperator] = useState<string>('contains');
  const [columnFilterStates, setColumnFilterStates] = useState<{[columnKey: string]: {operator: string, value: string}}>({});
  const [columnWidths, setColumnWidths] = useState<{[columnKey: string]: number}>({});
  const [isResizing, setIsResizing] = useState(false);
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [resizeStartX, setResizeStartX] = useState(0);
  const [resizeStartWidth, setResizeStartWidth] = useState(0);
  
  // Inline editing state
  const [editingCell, setEditingCell] = useState<{rowId: string, columnKey: string} | null>(null);
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [tempCellValue, setTempCellValue] = useState<any>('');
  const [tempRowValues, setTempRowValues] = useState<{[columnKey: string]: any}>({});
  const [cellValidationError, setCellValidationError] = useState<string>('');
  const [rowValidationErrors, setRowValidationErrors] = useState<{[columnKey: string]: string}>({});
  
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  // Helper function to reorder array for drag and drop
  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // Drag end handler for rows
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    if (result.type === 'ROW') {
      const newData = reorder(localTableData, result.source.index, result.destination.index);
      setLocalTableData(newData);
      onRowSwap?.(result.source.index, result.destination.index, newData);
    }
  };
  // Reset pagination when data, sort, or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [tableData, sortColumn, sortDirection]);

  // Close filter popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterButtonRef.current && !filterButtonRef.current.contains(event.target as Node)) {
        setIsFilterPopupOpen(false);
      }
    };

    if (isFilterPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterPopupOpen]);

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
        
        console.log('Resizing column:', resizingColumn, 'New width:', newWidth, 'Delta:', deltaX, 'MinWidth:', minWidth, 'MaxWidth:', maxWidth, 'StartWidth:', resizeStartWidth);
        
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

  // Filter and sort data
  const filteredData = useMemo(() => {
    // Use localTableData for row swapping, or current data for normal operation
    let filtered = [...(enableRowSwapping ? localTableData : currentData)];

    // Apply filtering
    if (Object.keys(filterState).length > 0) {
      filtered = filtered.filter(row => {
        return Object.entries(filterState).every(([columnKey, filter]) => {
          // If no value, don't filter this column (show all)
          if (!filter.value || filter.value.trim() === '') return true;
          
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
      });
    }

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

    return filtered;
  }, [enableRowSwapping ? localTableData : currentData, sortColumn, sortDirection, filterState, enableRowSwapping, localTableData, currentData]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return filteredData;
    const startIndex = (currentPage - 1) * currentPageSize;
    const endIndex = startIndex + currentPageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, pagination, currentPage, currentPageSize]);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
    onSortChange?.({ column: columnKey, direction: sortDirection });
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPaginationHandler?.(page, currentPageSize);
  };

  const handlePageSizeChange = (pageSize: number) => {
    setCurrentPageSize(pageSize);
    setCurrentPage(1); // Reset to first page when page size changes
    onPaginationHandler?.(1, pageSize);
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

  const handleFilterChange = (columnKey: string, value: string, operator: string) => {
    const newFilterState = { ...filterState };
    if (value && value.trim() !== '') {
      newFilterState[columnKey] = { value, operator: operator as any };
    } else {
      delete newFilterState[columnKey];
    }
    console.log('Filter state updated:', newFilterState);
    setFilterState(newFilterState);
    onFilterChange?.(newFilterState);
    
    // Force re-render by updating a dummy state
    setCurrentPage(1);
  };

  // Update temp filter value without applying filter
  const handleTempFilterChange = (value: string) => {
    setTempFilterValue(value);
    // No real-time filtering - only update when FILTER button is clicked
  };

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isFilterPopupOpen) {
        const target = event.target as Element;
        if (!target.closest('.rds-fluent-grid-filter-container')) {
          handleFilterPopupClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterPopupOpen]);

  const handleColumnVisibilityChange = (columnKey: string, isVisible: boolean) => {
    const newVisibleColumns = isVisible
      ? [...visibleColumns, columnKey]
      : visibleColumns.filter(key => key !== columnKey);
    setVisibleColumns(newVisibleColumns);
    onColumnVisibilityChange?.(newVisibleColumns);
    console.log('Column visibility changed:', { columnKey, isVisible, newVisibleColumns });
  };


  const handleColumnPanelToggle = () => {
    setIsColumnPanelExpanded(!isColumnPanelExpanded);
  };

  const handleApplyFilter = () => {
    if (selectedColumnForFilter) {
      console.log('Applying filter:', { column: selectedColumnForFilter, value: tempFilterValue, operator: tempFilterOperator });
      
      // Update column-specific filter state
      const newColumnFilterStates = { ...columnFilterStates };
      newColumnFilterStates[selectedColumnForFilter] = {
        operator: tempFilterOperator,
        value: tempFilterValue
      };
      setColumnFilterStates(newColumnFilterStates);
      
      // Apply the filter (this will update the main filterState)
      handleFilterChange(selectedColumnForFilter, tempFilterValue, tempFilterOperator);
      
      // Generate API request JSON from ALL active filters (including the one just applied)
      const updatedFilterState = { ...filterState, [selectedColumnForFilter]: { value: tempFilterValue, operator: tempFilterOperator as any } };
      const activeFilters = Object.entries(updatedFilterState)
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
      
      let sortDirectionValue: 'ASC' | 'DESC' | undefined = undefined;
      if (sortColumn) {
        if (sortDirection === 'asc') {
          sortDirectionValue = 'ASC';
        } else {
          sortDirectionValue = 'DESC';
        }
      }
      const filterApiRequest: FilterApiRequest = {
        filters: activeFilters,
        logicalOperator: 'AND',
        page: currentPage,
        pageSize: recordsPerPage,
        sortBy: sortColumn || undefined,
        sortDirection: sortDirectionValue
      };
      
      console.log('All active filters:', updatedFilterState);
      console.log('API Request JSON:', JSON.stringify(filterApiRequest, null, 2));
      onFilterApiRequest?.(filterApiRequest);
    }
    setIsFilterPopupOpen(false);
  };

  const handleClearFilter = () => {
    if (selectedColumnForFilter) {
      // Clear only the current column's filter, preserve others
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
      
      let sortDirectionValue2: 'ASC' | 'DESC' | undefined = undefined;
      if (sortColumn) {
        if (sortDirection === 'asc') {
          sortDirectionValue2 = 'ASC';
        } else {
          sortDirectionValue2 = 'DESC';
        }
      }
      const filterApiRequest: FilterApiRequest = {
        filters: activeFilters,
        logicalOperator: 'AND',
        page: currentPage,
        pageSize: recordsPerPage,
        sortBy: sortColumn || undefined,
        sortDirection: sortDirectionValue2
      };
      
      console.log('Clearing filter for column:', selectedColumnForFilter);
      console.log('Remaining active filters:', newFilterState);
      console.log('API Request JSON:', JSON.stringify(filterApiRequest, null, 2));
      
      setFilterState(newFilterState);
      setColumnFilterStates(newColumnFilterStates);
      onFilterChange?.(newFilterState);
      onFilterApiRequest?.(filterApiRequest);
    }
    setTempFilterValue('');
    setTempFilterOperator('contains');
    setIsFilterPopupOpen(false);
  };

  const handleFilterIconClick = (columnKey: string) => {
    console.log('Filter icon clicked for column:', columnKey);
    setSelectedColumnForFilter(columnKey);
    
    // Load column-specific filter state
    const columnFilterState = columnFilterStates[columnKey] || { operator: 'contains', value: '' };
    setTempFilterValue(columnFilterState.value);
    setTempFilterOperator(columnFilterState.operator);
    setIsFilterPopupOpen(true);
    console.log('Filter popup should be open: true');
  };

  const handleFilterPopupClose = () => {
    console.log('Closing filter popup and clearing temp values');
    setIsFilterPopupOpen(false);
    setTempFilterValue('');
    setTempFilterOperator('contains');
    setSelectedColumnForFilter(null);
  };

  const handleResizeStart = (e: React.MouseEvent, columnKey: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Resize start triggered for column:', columnKey);
    
    const header = tableHeaders.find(h => h.key === columnKey);
    if (header?.isResizable !== false) {
      console.log('Starting resize for column:', columnKey, 'Current width:', columnWidths[columnKey]);
      setIsResizing(true);
      setResizingColumn(columnKey);
      setResizeStartX(e.clientX);
      setResizeStartWidth(columnWidths[columnKey] || header?.minWidth || 150);
      
      // Prevent text selection during resize
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    } else {
      console.log('Column is not resizable:', columnKey);
    }
  };

  // Inline editing handlers
  const handleCellEditStart = (rowId: string, columnKey: string, currentValue: any) => {
    if (!enableInlineEdit) return;
    
    const column = tableHeaders.find(h => h.key === columnKey);
    if (!column?.isEditable) return;
    
    setEditingCell({ rowId, columnKey });
    setTempCellValue(currentValue);
    setCellValidationError('');
  };

  const handleCellEditSave = (rowId: string, columnKey: string, newValue: any) => {
    const column = tableHeaders.find(h => h.key === columnKey);
    if (!column) return;

    // Validate the value
    let validationError = '';
    
    // Required field validation
    if (column.required && (!newValue || newValue.toString().trim() === '')) {
      validationError = 'This field is required';
    }
    
    // Data type validation
    if (!validationError && newValue && column.dataType) {
      switch (column.dataType.toLowerCase()) {
        case 'number':
        case 'numeric':
        case 'int':
        case 'float':
        case 'decimal':
          if (isNaN(Number(newValue))) {
            validationError = 'Please enter a valid number';
          }
          break;
        case 'email': {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(newValue)) {
            validationError = 'Please enter a valid email address';
          }
          break;
        }
        case 'url':
          try {
            new URL(newValue);
          } catch {
            validationError = 'Please enter a valid URL';
          }
          break;
      }
    }
    
    // Custom validation
    if (!validationError && column.validateCell) {
      const customError = column.validateCell(newValue, { id: rowId });
      if (customError) {
        validationError = customError;
      }
    }
    
    if (validationError) {
      setCellValidationError(validationError);
      return;
    }

    // Convert value based on data type
    let processedValue = newValue;
    if (column.dataType) {
      switch (column.dataType.toLowerCase()) {
        case 'number':
        case 'numeric':
        case 'int':
        case 'float':
        case 'decimal':
          processedValue = Number(newValue);
          break;
        case 'boolean':
          processedValue = Boolean(newValue);
          break;
        default:
          processedValue = newValue.toString();
      }
    }

    // Find the original value for comparison
    const rowIndex = currentData.findIndex(row => (row.id || currentData.indexOf(row).toString()) === rowId);
    const originalValue = rowIndex >= 0 ? currentData[rowIndex][columnKey] : null;

    // Update data state immediately
    const updateData = (newData: any[]) => {
      if (controlledData && onDataChange) {
        // Controlled mode - notify parent
        onDataChange(newData);
      } else {
        // Uncontrolled mode - update internal state
        setInternalData(newData);
      }
    };

    // Find the row and update it
    const updatedData = currentData.map(row => {
      const rowIdToCheck = row.id || currentData.indexOf(row).toString();
      if (rowIdToCheck === rowId) {
        return { ...row, [columnKey]: processedValue };
      }
      return row;
    });

    // Update data immediately so changes are visible
    updateData(updatedData);

    // Call the edit callback
    onCellEdit?.(rowId, columnKey, processedValue, originalValue);
    onCellEditComplete?.(rowId, columnKey, processedValue, true);

    // Clear editing state
    setEditingCell(null);
    setTempCellValue('');
    setCellValidationError('');
  };

  const handleCellEditCancel = () => {
    setEditingCell(null);
    setTempCellValue('');
    setCellValidationError('');
  };

  const handleCellValueChange = (newValue: any) => {
    setTempCellValue(newValue);
    setCellValidationError(''); // Clear validation error when user types
  };

  // Row-based editing handlers
  const handleRowEditStart = (rowId: string, rowData: any) => {
    if (!enableInlineEdit || inlineEditMode !== 'row') return;
    
    setEditingRow(rowId);
    const editableColumns = tableHeaders.filter(h => h.isEditable);
    const initialValues: {[columnKey: string]: any} = {};
    editableColumns.forEach(col => {
      initialValues[col.key] = rowData[col.key];
    });
    setTempRowValues(initialValues);
    setRowValidationErrors({});
  };

  const handleRowEditSave = (rowId: string) => {
    console.log('Row edit save called for rowId:', rowId, 'editingRow:', editingRow, 'tempRowValues:', tempRowValues);
    
    if (!editingRow || editingRow !== rowId) {
      console.log('Row edit save cancelled - not editing this row');
      return;
    }

    const editableColumns = tableHeaders.filter(h => h.isEditable);
    console.log('Editable columns:', editableColumns.map(c => c.key));
    
    const validationErrors: {[columnKey: string]: string} = {};
    let hasErrors = false;

    // Validate all editable columns
    editableColumns.forEach(column => {
      const value = tempRowValues[column.key];
      let error = '';

      // Required field validation
      if (column.required && (!value || value.toString().trim() === '')) {
        error = 'This field is required';
      }

      // Data type validation
      if (!error && value && column.dataType) {
        switch (column.dataType.toLowerCase()) {
          case 'number':
          case 'numeric':
          case 'int':
          case 'float':
          case 'decimal':
            if (isNaN(Number(value))) {
              error = 'Please enter a valid number';
            }
            break;
          case 'email': {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
              error = 'Please enter a valid email address';
            }
            break;
          }
          case 'url':
            try {
              new URL(value);
            } catch {
              error = 'Please enter a valid URL';
            }
            break;
        }
      }

      // Custom validation
      if (!error && column.validateCell) {
        const customError = column.validateCell(value, { id: rowId });
        if (customError) {
          error = customError;
        }
      }

      if (error) {
        validationErrors[column.key] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      console.log('Validation errors found:', validationErrors);
      setRowValidationErrors(validationErrors);
      return;
    }
    
    console.log('No validation errors, proceeding with save');

    // Update data state
    const updateData = (newData: any[]) => {
      if (controlledData && onDataChange) {
        // Controlled mode - notify parent
        onDataChange(newData);
      } else {
        // Uncontrolled mode - update internal state
        setInternalData(newData);
      }
    };

    // Process and save all values
    let updatedData = [...currentData];
    
    // Find the row index once
    const rowIndex = currentData.findIndex(row => (row.id || currentData.indexOf(row).toString()) === rowId);
    console.log('Row index found:', rowIndex, 'for rowId:', rowId);
    
    if (rowIndex === -1) {
      console.error('Row not found in currentData');
      return;
    }
    
    // Process all columns and update the row in one go
    const updatedRow = { ...currentData[rowIndex] };
    console.log('Original row:', currentData[rowIndex]);
    console.log('Updated row before processing:', updatedRow);
    
    editableColumns.forEach(column => {
      const value = tempRowValues[column.key];
      let processedValue = value;
      
      console.log(`Processing column ${column.key}:`, { value, originalValue: currentData[rowIndex][column.key] });

      // Convert value based on data type
      if (column.dataType) {
        switch (column.dataType.toLowerCase()) {
          case 'number':
          case 'numeric':
          case 'int':
          case 'float':
          case 'decimal':
            processedValue = Number(value);
            break;
          case 'boolean':
            processedValue = Boolean(value);
            break;
          default:
            processedValue = value.toString();
        }
      }

      // Find the original value for comparison
      const originalValue = rowIndex >= 0 ? currentData[rowIndex][column.key] : null;

      // Update the row
      updatedRow[column.key] = processedValue;
      console.log(`Updated ${column.key} to:`, processedValue);

      // Call the edit callbacks
      onCellEdit?.(rowId, column.key, processedValue, originalValue);
      onCellEditComplete?.(rowId, column.key, processedValue, true);
    });

    // Update the data array with the modified row
    updatedData[rowIndex] = updatedRow;

    // Update the data state immediately so changes are visible
    console.log('Updating data with:', updatedData);
    updateData(updatedData);

    // Clear editing state
    console.log('Clearing editing state');
    setEditingRow(null);
    setTempRowValues({});
    setRowValidationErrors({});
  };

  const handleRowEditCancel = () => {
    setEditingRow(null);
    setTempRowValues({});
    setRowValidationErrors({});
  };

  const handleRowValueChange = (columnKey: string, newValue: any) => {
    console.log('Row value change:', { columnKey, newValue });
    setTempRowValues(prev => {
      const newValues = {
        ...prev,
        [columnKey]: newValue
      };
      console.log('Updated tempRowValues:', newValues);
      return newValues;
    });
    // Clear validation error for this column when user types
    if (rowValidationErrors[columnKey]) {
      setRowValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[columnKey];
        return newErrors;
      });
    }
  };

  const getVisibleHeaders = () => {
    const visible = tableHeaders.filter(header => visibleColumns.includes(header.key));
    console.log('Visible headers:', { visibleColumns, visible: visible.map(h => h.key) });
    return visible;
  };

  const totalPages = Math.ceil(filteredData.length / currentPageSize);
  const totalRecordsCount = totalRecords || filteredData.length;

  // Debug logging
  console.log('Filter popup state:', { isFilterPopupOpen });
  console.log('Filter state:', filterState);
  console.log('Filtered data length:', filteredData.length, 'Original data length:', tableData.length);
  console.log('Sample data:', tableData.slice(0, 2));
  console.log('Sample filtered data:', filteredData.slice(0, 2));

  if (isLoading) {
    return (
      <div className={`rds-fluent-grid-container ${classes || ''}`}>
        <div className="rds-fluent-grid-loader">
          <CircularProgress size={40} />
        </div>
      </div>
    );
  }

  if (tableData.length === 0) {
    return (
      <div className={`rds-fluent-grid-container ${classes || ''}`}>
        {showHeader && (
          <div className="rds-fluent-grid-header">
            <div className="rds-fluent-grid-header-controls">
              <Button startIcon={<AddIcon />}>Add New</Button>
              <Button startIcon={<PersonIcon />}>Person</Button>
              <Button startIcon={<FilterIcon />}>Filters</Button>
              <Button startIcon={<ArrowUpIcon />}>Sort</Button>
              <Button startIcon={<VisibilityIcon />}>Hide</Button>
              <Button startIcon={<MoreIcon />}>More</Button>
            </div>
          </div>
        )}
        <div className="rds-fluent-grid-empty-state">
          <Typography variant="h6" className="rds-fluent-grid-empty-state-title">{noDataTitle}</Typography>
          <Typography variant="body2" className="rds-fluent-grid-empty-state-description">
            No data available to display
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className={`rds-fluent-grid-container ${classes || ''}`}>
        {showHeader && (
          <div className="rds-fluent-grid-header">
            <div className="rds-fluent-grid-header-controls">
              <Button startIcon={<AddIcon />}>Add New</Button>
              <Button startIcon={<PersonIcon />}>Person</Button>
              <Button startIcon={<FilterIcon />}>Filters</Button>
              <Button startIcon={<ArrowUpIcon />}>Sort</Button>
              <Button startIcon={<VisibilityIcon />}>Hide</Button>
              <Button startIcon={<MoreIcon />}>More</Button>
              {/* Test button for popup */}
              <Button
                variant="contained"
                size="small"
                onClick={(e) => {
                  console.log('Test button clicked!', e.currentTarget);
                  setIsFilterPopupOpen(!isFilterPopupOpen);
                }}
              >
                Test Popup
              </Button>
            </div>
          </div>
        )}

        {showSubHeader && (
          <div className="rds-fluent-grid-sub-header">
            <div className="rds-fluent-grid-sub-header-left">
              <Typography variant="subtitle1" className="rds-fluent-grid-sub-header-title">
                {noDataHeaderTitle}
              </Typography>
              <MoreIcon className="rds-fluent-grid-sub-header-dots" />
            </div>
            <Button
              variant="text"
              startIcon={isCollapsed ? <ArrowDownIcon /> : <ArrowUpIcon />}
              onClick={toggleCollapse}
              className="rds-fluent-grid-sub-header-toggle"
            />
          </div>
        )}

        {!isCollapsed && (
          <>
            <DragDropContext onDragEnd={onDragEnd}>
              <table className="rds-fluent-grid-table" ref={tableRef}>
              <thead>
                <tr>
                  {/* Row Swapping column */}
                  {enableRowSwapping && (
                    <th className="rds-fluent-grid-header-cell" style={{ width: '60px' }}>
                      Reorder
                    </th>
                  )}

                  {/* Selection column */}
                  {(enableCheckboxSelection || enableRadioButtonSelection) && (
                    <th className="rds-fluent-grid-header-cell" style={{ width: '50px' }}>
                      {enableCheckboxSelection ? 'Select All' : 'Select'}
                    </th>
                  )}
                  
                  {/* Data columns */}
                  {getVisibleHeaders().map((header) => (
                    <th
                      key={header.key}
                      className={`rds-fluent-grid-header-cell ${header.isResizable !== false ? 'rds-fluent-grid-header-cell--resizable' : ''}`}
                      style={{
                        width: columnWidths[header.key] || header.minWidth || 150,
                        maxWidth: header.maxWidth || 500,
                        cursor: isSort && header.isSort ? 'pointer' : 'default',
                        position: 'relative',
                      }}
                      onClick={() => isSort && header.isSort && handleSort(header.key)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Typography variant="body2" fontWeight={header.isBold ? 'bold' : 'normal'}>
                          {header.name}
                        </Typography>
                        {header.required && (
                          <Typography variant="body2" style={{ color: '#d13438' }}>*</Typography>
                        )}
                        {isSort && header.isSort && (
                          <ArrowUpIcon className="rds-fluent-grid-sort-icon" />
                        )}
                        {isFilter && header.isFilter && (
                          <div className="rds-fluent-grid-filter-container">
                            <Button
                              ref={filterButtonRef}
                              variant="text"
                              size="small"
                              startIcon={<FilterIcon />}
                              className={`rds-fluent-grid-filter-icon ${filterState[header.key]?.value ? 'rds-fluent-grid-filter-icon-active' : ''}`}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log('Filter icon clicked for column:', header.key);
                                handleFilterIconClick(header.key);
                              }}
                            />
                            {isFilterPopupOpen && (
                              <div className="rds-fluent-grid-filter-popup">
                                <div className="rds-fluent-grid-filter-popup-header">
                                  <Typography variant="body2" fontWeight="bold" style={{ fontSize: '12px' }}>
                                    {selectedColumnForFilter ? 
                                      `Filter: ${tableHeaders.find(h => h.key === selectedColumnForFilter)?.name || selectedColumnForFilter}` : 
                                      'Controls'
                                    }
                                  </Typography>
                                  <Button
                                    variant="text"
                                    size="small"
                                    startIcon={<ClearIcon />}
                                    onClick={handleFilterPopupClose}
                                    style={{ minWidth: '20px', height: '20px', padding: '0' }}
                                  />
                                </div>
                                
                                {/* Column Visibility Toggle */}
                                <div style={{ marginBottom: '8px' }}>
                                  <Button
                                    variant="text"
                                    size="small"
                                    onClick={handleColumnPanelToggle}
                                    style={{ 
                                      fontSize: '12px', 
                                      padding: '4px 8px',
                                      height: '28px',
                                      width: '100%',
                                      fontWeight: '500'
                                    }}
                                  >
                                    {isColumnPanelExpanded ? 'Hide' : 'Show'} Columns
                                  </Button>
                                  {isColumnPanelExpanded && (
                                    <div style={{ 
                                      marginTop: '2px', 
                                      maxHeight: '60px', 
                                      overflowY: 'auto',
                                      border: '1px solid #e1e1e1',
                                      borderRadius: '2px',
                                      padding: '2px'
                                    }}>
                                      {tableHeaders.map((col) => (
                                        <div 
                                          key={col.key} 
                                          style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '8px',
                                            padding: '4px 6px',
                                            fontSize: '12px'
                                          }}
                                        >
                                          <input
                                            type="checkbox"
                                            checked={visibleColumns.includes(col.key)}
                                            onChange={(e) => handleColumnVisibilityChange(col.key, e.target.checked)}
                                            style={{ width: '14px', height: '14px' }}
                                          />
                                          <span style={{ fontSize: '12px', fontWeight: '400' }}>{col.name}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                
                                {/* Simple Filter Controls */}
                                {selectedColumnForFilter && (
                                  <div className="rds-fluent-grid-filter-section">
                                    {(() => {
                                      const col = tableHeaders.find(h => h.key === selectedColumnForFilter);
                                      if (!col || !col.isFilter) return null;
                                      
                                      return (
                                        <div className="rds-fluent-grid-filter-item">
                                          {/* Filter Type Dropdown */}
                                          <div style={{ marginBottom: '8px' }}>
                                            <label style={{ 
                                              fontSize: '12px', 
                                              fontWeight: '500', 
                                              color: '#333', 
                                              display: 'block', 
                                              marginBottom: '4px' 
                                            }}>
                                              Filter
                                            </label>
                                            <select
                                              value={tempFilterOperator}
                                              onChange={(e) => {
                                                setTempFilterOperator(e.target.value);
                                                // No real-time filtering - only update when FILTER button is clicked
                                              }}
                                              style={{ 
                                                width: '100%', 
                                                fontSize: '12px', 
                                                padding: '6px 8px',
                                                height: '32px',
                                                border: '1px solid #d0d0d0',
                                                borderRadius: '4px',
                                                backgroundColor: '#fff',
                                                outline: 'none'
                                              }}
                                            >
                                              <option value="contains">Contains</option>
                                              <option value="equals">Equals</option>
                                              <option value="startsWith">Starts with</option>
                                              <option value="endsWith">Ends with</option>
                                            </select>
                                          </div>
                                          {/* Input Field */}
                                          <div style={{ marginBottom: '8px' }}>
                                            <label style={{ 
                                              fontSize: '12px', 
                                              fontWeight: '500', 
                                              color: '#333', 
                                              display: 'block', 
                                              marginBottom: '4px' 
                                            }}>
                                              Value
                                            </label>
                                            <TextField
                                              placeholder="Enter string..."
                                              value={tempFilterValue}
                                              onChange={(e) => handleTempFilterChange(e.target.value)}
                                              size="small"
                                              sx={{ 
                                                width: '100%',
                                                '& .MuiInputBase-input': {
                                                  fontSize: '12px',
                                                  padding: '6px 8px',
                                                  height: '20px'
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                  height: '32px'
                                                }
                                              }}
                                            />
                                          </div>
                                          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                            <Button
                                              variant="contained"
                                              size="small"
                                              onClick={() => {
                                                handleApplyFilter();
                                                handleFilterPopupClose();
                                              }}
                                              style={{ 
                                                flex: 1, 
                                                fontSize: '12px', 
                                                padding: '6px 12px',
                                                height: '32px',
                                                minWidth: '0',
                                                fontWeight: '500'
                                              }}
                                            >
                                              FILTER
                                            </Button>
                                            <Button
                                              variant="outlined"
                                              size="small"
                                              onClick={() => {
                                                handleClearFilter();
                                                handleFilterPopupClose();
                                              }}
                                              style={{ 
                                                flex: 1, 
                                                fontSize: '12px', 
                                                padding: '6px 12px',
                                                height: '32px',
                                                minWidth: '0',
                                                fontWeight: '500'
                                              }}
                                            >
                                              CLEAR
                                            </Button>
                                          </div>
                                          
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
                                              style={{ 
                                                width: '100%',
                                                fontSize: '12px',
                                                height: '28px',
                                                marginTop: '8px',
                                                color: '#d32f2f',
                                                fontWeight: '500'
                                              }}
                                            >
                                              CLEAR ALL
                                            </Button>
                                          )}
                                        </div>
                                      );
                                    })()}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Resize handle */}
                      {header.isResizable !== false && (
                        <div
                          className="rds-fluent-grid-resize-handle"
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
                          style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: '4px',
                            cursor: 'col-resize',
                            backgroundColor: isResizing && resizingColumn === header.key ? '#0078d4' : 'transparent',
                            zIndex: 10,
                          }}
                        />
                      )}
                    </th>
                  ))}
                  
                  {/* Actions column */}
                  {actions.length > 0 && (
                    <th className="rds-fluent-grid-header-cell" style={{ width: '100px' }}>Actions</th>
                  )}
                  
                  {/* Row editing column */}
                  {enableInlineEdit && inlineEditMode === 'row' && (
                    <th className="rds-fluent-grid-header-cell" style={{ width: '150px' }}>Edit</th>
                  )}
                </tr>
              </thead>
              
              <Droppable droppableId="droppable-body" type="ROW">
                {(provided: any) => (
                  <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {paginatedData.map((row, index) => {
                  const rowId = row.id || index.toString();
                  const isSelected = selectedRows.has(rowId);
                  const isRowEditing = editingRow === rowId;
                  
                  return (
                    <Draggable 
                      key={rowId} 
                      draggableId={String(rowId)} 
                      index={index}
                      isDragDisabled={!enableRowSwapping}
                    >
                      {(dragProvided: any, dragSnapshot: any) => (
                        <tr
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          key={rowId}
                          className={`rds-fluent-grid-row ${isSelected ? 'rds-fluent-grid-row-selected' : ''}`}
                          style={{
                            ...dragProvided.draggableProps.style,
                            backgroundColor: isSelected ? '#e6f3ff' : undefined,
                          }}
                        >
                          {/* Row Swapping controls */}
                          {enableRowSwapping && (
                            <td className="rds-fluent-grid-cell rds-fluent-grid-swap-cell">
                              <div 
                                className="rds-fluent-grid-drag-handle"
                                {...dragProvided.dragHandleProps}
                                style={{ cursor: 'grab' }}
                              >
                                <DragIndicatorIcon 
                                  fontSize="small" 
                                  sx={{ 
                                    color: theme.palette.text.secondary,
                                    '&:hover': {
                                      color: theme.palette.text.primary,
                                    }
                                  }} 
                                />
                              </div>
                            </td>
                          )}

                          {/* Selection cell */}
                          {(enableCheckboxSelection || enableRadioButtonSelection) && (
                            <td className="rds-fluent-grid-cell">
                              <input
                                type={enableCheckboxSelection ? 'checkbox' : 'radio'}
                                checked={isSelected}
                                onChange={() => handleRowSelect(rowId, row)}
                              />
                            </td>
                          )}
                      
                      {/* Data cells */}
                      {getVisibleHeaders().map((header) => {
                        const cellValue = row[header.key];
                        const cellWidth = columnWidths[header.key] || header.minWidth || 150;
                        const minWidth = header.minWidth || 50;
                        const rowId = row.id || index.toString();
                        const isEditing = editingCell?.rowId === rowId && editingCell?.columnKey === header.key;
                        
                        // Check if we should render HTML content
                        const shouldRenderHtml = header.allowHtml && typeof cellValue === 'string' && cellValue.includes('<');
                        const cellText = shouldRenderHtml ? '' : (cellValue?.toString() || '');
                        
                        // Only show tooltip if text might be truncated and not HTML
                        const shouldShowTooltip = !shouldRenderHtml && cellText.length > 0 && cellWidth < minWidth + 50;
                        
                        // Use custom renderer if provided
                        if (header.renderCell) {
                          return (
                            <td
                              key={header.key}
                              className="rds-fluent-grid-cell"
                              style={{
                                width: cellWidth,
                                maxWidth: header.maxWidth || 500,
                              }}
                            >
                              {header.renderCell(cellValue, row)}
                            </td>
                          );
                        }
                        
                        // Check if this cell should be editable
                        const isEditable = enableInlineEdit && header.isEditable && !shouldRenderHtml;
                        console.log('Row editing state:', { rowId, editingRow, isRowEditing });
                        const isCellEditing = isEditing && inlineEditMode === 'cell';
                        
                        return (
                          <td
                            key={header.key}
                            className={`rds-fluent-grid-cell ${!shouldRenderHtml ? 'rds-fluent-grid-cell--truncated' : ''}`}
                            style={{
                              width: cellWidth,
                              maxWidth: header.maxWidth || 500,
                            }}
                            title={shouldShowTooltip ? cellText : undefined}
                          >
                            {shouldRenderHtml ? (
                              <div 
                                className="rds-fluent-grid-cell-html"
                                dangerouslySetInnerHTML={{ __html: cellValue }}
                              />
                            ) : isEditable && inlineEditMode === 'cell' ? (
                              <EditableCell
                                value={cellValue}
                                column={header}
                                row={row}
                                isEditing={isCellEditing}
                                onStartEdit={() => handleCellEditStart(rowId, header.key, cellValue)}
                                onSave={(newValue) => handleCellEditSave(rowId, header.key, newValue)}
                                onCancel={handleCellEditCancel}
                                onValueChange={handleCellValueChange}
                                tempValue={tempCellValue}
                                validationError={cellValidationError}
                              />
                            ) : isEditable && inlineEditMode === 'row' && isRowEditing ? (
                              <EditableCell
                                value={tempRowValues[header.key] || cellValue}
                                column={header}
                                row={row}
                                isEditing={true}
                                onStartEdit={() => {}} // No-op for row mode
                                onSave={() => {}} // No-op for row mode - only save on row save button
                                onCancel={() => {}} // No-op for row mode
                                onValueChange={(newValue) => handleRowValueChange(header.key, newValue)}
                                tempValue={tempRowValues[header.key] || cellValue}
                                validationError={rowValidationErrors[header.key] || ''}
                              />
                            ) : (
                              <Typography variant="body2" className="rds-fluent-grid-cell-text">{cellText}</Typography>
                            )}
                          </td>
                        );
                      })}
                      
                      {/* Actions cell */}
                      {actions.length > 0 && (
                        <td className="rds-fluent-grid-cell">
                          <div style={{ display: 'flex', gap: '4px' }}>
                            {actionColumnStyle === ActionColumnStyle.ShowButtonsDirectly ? (
                              actions.map((action) => (
                                <Button
                                  key={action.id}
                                  size={action.size || "small"}
                                  variant={action.variant || "outlined"}
                                  color={action.color || "primary"}
                                  disabled={action.disabled || false}
                                  onClick={() => onActionSelection?.(row, action.id)}
                                  className="rds-fluent-grid-action-button"
                                >
                                  {action.displayName}
                                </Button>
                              ))
                            ) : (
                              <ActionMenu row={row} actions={actions} onActionSelection={onActionSelection} />
                            )}
                          </div>
                        </td>
                      )}

                      {/* Row editing controls */}
                      {enableInlineEdit && inlineEditMode === 'row' && (
                        <td className="rds-fluent-grid-cell">
                          <div style={{ display: 'flex', gap: '4px' }}>
                            {isRowEditing ? (
                              <>
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    console.log('Save button clicked for rowId:', rowId);
                                    handleRowEditSave(rowId);
                                  }}
                                  startIcon={<EditIcon />}
                                >
                                  Save
                                </Button>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  color="secondary"
                                  onClick={handleRowEditCancel}
                                  startIcon={<ClearIcon />}
                                >
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <Button
                                size="small"
                                variant="outlined"
                                color="primary"
                                onClick={() => handleRowEditStart(rowId, row)}
                                startIcon={<EditIcon />}
                              >
                                Edit Row
                              </Button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                        )}
                      </Draggable>
                  );
                })}
                {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </table>
            </DragDropContext>
            
            {pagination && totalPages > 1 && (
              <div className="rds-fluent-grid-pagination">
                <RdsPagination
                  count={totalRecordsCount}
                  page={currentPage}
                  onPageChange={handlePageChange}
                  pageSize={currentPageSize}
                  onPageSizeChange={handlePageSizeChange}
                  pageSizeOptions={pageSizeOptions}
                  showRecordsPerPage={showRecordsPerPage}
                  showFirstLast={true}
                />
              </div>
            )}
          </>
        )}

      </div>
  );
};

export default RdsFluentGrid;