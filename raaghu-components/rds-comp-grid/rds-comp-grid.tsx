import React, { useState, useMemo, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
  Box,
  TextField,
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
  DragIndicator as DragIndicatorIcon,
} from '@mui/icons-material';
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
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

export interface RdsCompGridColumn {
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
  isEditable?: boolean; 
  colWidth?: string;
  minWidth?: number;
  maxWidth?: number;
  allowHtml?: boolean;
  renderCell?: (value: any, row: any) => React.ReactNode;
  validateCell?: (value: any, row: any) => string | null;
}

export interface RdsCompGridAction {
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
export interface RdsCompGridRef {
  getData: () => any[];
  setData: (data: any[]) => void;
  addRow: (row: any) => void;
  updateRow: (rowId: string, rowData: any) => void;
  deleteRow: (rowId: string) => void;
  getRow: (rowId: string) => any | null;
  getSelectedRows: () => any[];
  clearSelection: () => void;
  selectAll: () => void;
  
  getFilters: () => FilterState;
  setFilters: (filters: FilterState) => void;
  clearFilters: () => void;
  applyFilter: (columnKey: string, value: string, operator?: string) => void;
  removeFilter: (columnKey: string) => void;
  
  getSortState: () => SortState;
  setSort: (column: string, direction: 'asc' | 'desc') => void;
  clearSort: () => void;
  
  getSearchValue: () => string;
  setSearchValue: (value: string) => void;
  clearSearch: () => void;
  
  getCurrentPage: () => number;
  setCurrentPage: (page: number) => void;
  getPageSize: () => number;
  setPageSize: (size: number) => void;
  getTotalPages: () => number;
  
  getVisibleColumns: () => string[];
  setColumnVisibility: (columnKeys: string | string[], visible: boolean) => void;
  showAllColumns: () => void;
  hideAllColumns: () => void;
  getColumnWidth: (columnKey: string) => number;
  setColumnWidth: (columnKey: string, width: number) => void;
  resetColumnWidths: () => void;
  
  isCollapsed: () => boolean;
  toggleCollapse: () => void;
  expand: () => void;
  collapse: () => void;
  
  startEdit: (rowId: string, columnKey?: string) => void;
  stopEdit: () => void;
  isEditing: () => boolean;
  getEditingRow: () => string | null;
  
  exportData: (format?: 'json' | 'csv') => string;
  refresh: () => void;
  scrollToRow: (rowId: string) => void;
  scrollToTop: () => void;
  scrollToBottom: () => void;
  
  getRowCount: () => number;
  getColumnCount: () => number;
  getFilteredRowCount: () => number;
  getSelectedRowCount: () => number;
}

export interface RdsCompGridProps {
  tableHeaders: RdsCompGridColumn[];
  tableData: any[];
  
  controlledData?: any[]; 
  onDataChange?: (newData: any[]) => void; 
  
  isSort?: boolean;
  isFilter?: boolean;
  isResizable?: boolean;
  enableCheckboxSelection?: boolean;
  enableRadioButtonSelection?: boolean;
  enableInlineEdit?: boolean;
  inlineEditMode?: 'cell' | 'row'; 
  enableRowSwapping?: boolean; 
  enableColumnSwapping?: boolean; 
  
  showHeader?: boolean;
  showSubHeader?: boolean;
  showAddNewColumn?: boolean;
  state?: State;
  
  actions?: RdsCompGridAction[];
  actionPosition?: ActionPosition;
  actionColumnStyle?: ActionColumnStyle;
  
  pagination?: boolean;
  recordsPerPage?: number;
  recordsPerPageSelectListOption?: boolean;
  totalRecords?: number;
  
  onActionSelection?: (rowData: any, actionId: any) => void;
  onRowSelect?: (data: any) => void;
  onRowClick?: (rowId: any) => void;
  onPaginationHandler?: (currentPage: number, recordsPerPage: number) => void;
  onSortChange?: (sortState: SortState) => void;
  onFilterChange?: (filterState: FilterState) => void;
  onFilterApiRequest?: (filterRequest: FilterApiRequest) => void;
  onCellEdit?: (rowId: string, columnKey: string, newValue: any, oldValue: any) => void;
  onCellEditComplete?: (rowId: string, columnKey: string, newValue: any, isValid: boolean) => void;
  onRowSwap?: (fromIndex: number, toIndex: number, newData: any[]) => void; 
  onColumnSwap?: (fromIndex: number, toIndex: number, newHeaders: RdsCompGridColumn[]) => void; 
  
  // Styling
  classes?: string;
  fontWeight?: string;
  illustration?: boolean;
  noDataTitle?: string;
  noDataHeaderTitle?: string;
  
  
  // Loading
  isLoading?: boolean;
}

const EditableCell: React.FC<{
  value: any;
  column: RdsCompGridColumn;
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
      if (inputRef.current.type === 'text' || inputRef.current.type === 'email' || inputRef.current.type === 'url') {
        try {
          inputRef.current.select();
        } catch (e) {
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
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
          },
          '& .MuiOutlinedInput-root': {
            height: '32px',
          },
        }}
      />
    );
  }

  const displayValue = formatValueForDisplay(value);
  const shouldShowTooltip = displayValue.length > 10;

  return (
    <Box
      onClick={onStartEdit}
      sx={{
        cursor: 'pointer',
        padding: '4px 8px',
        minHeight: '32px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        border: '1px solid transparent',
        borderRadius: '4px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        '&:hover': {
          backgroundColor: 'action.hover',
          border: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      {shouldShowTooltip ? (
        <Tooltip title={displayValue} arrow>
          <Typography 
            variant="body2" 
            sx={{ 
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {displayValue}
          </Typography>
        </Tooltip>
      ) : (
        <Typography 
          variant="body2" 
          sx={{ 
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {displayValue}
        </Typography>
      )}
    </Box>
  );
};

const ActionMenu: React.FC<{
  row: any;
  actions: RdsCompGridAction[];
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

const RdsCompGrid = forwardRef<RdsCompGridRef, RdsCompGridProps>(({
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
  enableColumnSwapping = false,
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
  onCellEdit,
  onCellEditComplete,
  onRowSwap,
  onColumnSwap,
  classes,
  fontWeight,
  illustration = false,
  noDataTitle = 'No data available',
  noDataHeaderTitle = 'Data Grid',
  isLoading = false,
}, ref) => {
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
  
  const [editingCell, setEditingCell] = useState<{rowId: string, columnKey: string} | null>(null);
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [tempCellValue, setTempCellValue] = useState<any>('');
  const [tempRowValues, setTempRowValues] = useState<{[columnKey: string]: any}>({});
  const [cellValidationError, setCellValidationError] = useState<string>('');
  const [rowValidationErrors, setRowValidationErrors] = useState<{[columnKey: string]: string}>({});
  
  const [columnOrder, setColumnOrder] = useState<RdsCompGridColumn[]>(tableHeaders);
  const [localTableData, setLocalTableData] = useState<any[]>(tableData);
  
  const [customDragState, setCustomDragState] = useState<{
    isDragging: boolean;
    draggedColumnKey: string | null;
    dragStartIndex: number | null;
    currentHoverIndex: number | null;
    dragPreviewVisible: boolean;
  }>({
    isDragging: false,
    draggedColumnKey: null,
    dragStartIndex: null,
    currentHoverIndex: null,
    dragPreviewVisible: false,
  });
  
  const [internalData, setInternalData] = useState<any[]>(tableData);
  
  const currentData = controlledData || internalData;
  
  useEffect(() => {
    if (!controlledData) {
      setInternalData(tableData);
    }
    setLocalTableData([...tableData]);
  }, [tableData, controlledData]);
  
  useEffect(() => {
    setColumnOrder(tableHeaders);
  }, [tableHeaders]);
  
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Ensure react-beautiful-dnd drag preview is visible */
      .react-beautiful-dnd-drag-handle {
        visibility: visible !important;
        opacity: 1 !important;
      }
      
      .react-beautiful-dnd-draggable {
        visibility: visible !important;
        opacity: 1 !important;
      }
      
      /* Improve drag preview appearance */
      [data-rbd-drag-handle-draggable-id] {
        cursor: grab !important;
      }
      
      [data-rbd-drag-handle-draggable-id]:active {
        cursor: grabbing !important;
      }
      
      /* Hide the default placeholder during column drag */
      .react-beautiful-dnd-droppable[data-rbd-droppable-id="columns"] .react-beautiful-dnd-placeholder {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: any) => {
    
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';
    
    if (!result.destination) {
      return;
    }
    
    if (result.type === 'COLUMN') {
      const newOrder = reorder(columnOrder, result.source.index, result.destination.index);
      setColumnOrder(newOrder);
      onColumnSwap?.(result.source.index, result.destination.index, newOrder);
      return;
    }
    
    if (result.type === 'ROW') {
      let sourceIndex = result.source.index;
      let destinationIndex = result.destination.index;
      
      if (pagination) {
        const startIndex = (currentPage - 1) * recordsPerPage;
        sourceIndex = startIndex + result.source.index;
        destinationIndex = startIndex + result.destination.index;
      }
      
      const newData = reorder(localTableData, sourceIndex, destinationIndex);
      setLocalTableData(newData);
      onRowSwap?.(sourceIndex, destinationIndex, newData);
    }
  };

  const onDragStart = (start: any) => {
    
    if (start.type === 'COLUMN') {
      // noop
    } else if (start.type === 'ROW') {
      // noop
    }
    
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
  };

  const onDragUpdate = (update: any) => {
  };

  const handleCustomDragStart = (columnKey: string, columnIndex: number) => {
    if (!enableColumnSwapping) return;
    
    setCustomDragState({
      isDragging: true,
      draggedColumnKey: columnKey,
      dragStartIndex: columnIndex,
      currentHoverIndex: null,
      dragPreviewVisible: true,
    });
    
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
  };

  const handleCustomDragOver = (targetIndex: number) => {
    if (!customDragState.isDragging) return;
    
    setCustomDragState(prev => ({
      ...prev,
      currentHoverIndex: targetIndex,
    }));
  };

  const handleCustomDragEnd = (targetIndex?: number) => {
    if (!customDragState.isDragging) return;
    
    const { draggedColumnKey, dragStartIndex } = customDragState;
    
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';
    
    if (targetIndex !== undefined && targetIndex !== dragStartIndex && draggedColumnKey && dragStartIndex !== null) {
      const newOrder = reorder(columnOrder, dragStartIndex, targetIndex);
      setColumnOrder(newOrder);
      onColumnSwap?.(dragStartIndex, targetIndex, newOrder);
    }
    
    setCustomDragState({
      isDragging: false,
      draggedColumnKey: null,
      dragStartIndex: null,
      currentHoverIndex: null,
      dragPreviewVisible: false,
    });
  };

  const handleCustomDragLeave = () => {
    if (!customDragState.isDragging) return;
    
    setCustomDragState(prev => ({
      ...prev,
      currentHoverIndex: null,
    }));
  };

  const processedData = useMemo(() => {
    let filtered = [...(enableRowSwapping ? localTableData : currentData)];

    if (searchValue) {
      filtered = filtered.filter((row) =>
        Object.values(row).some((val) =>
          val?.toString().toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }

    Object.entries(filterState).forEach(([columnKey, filter]) => {
      if (filter.value) {
        filtered = filtered.filter((row) => {
          const cellValue = row[columnKey];
          const filterValue = filter.value;

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

    if (sortColumn) {
      filtered = filtered.sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    if (pagination) {
      const startIndex = (currentPage - 1) * recordsPerPage;
      const endIndex = startIndex + recordsPerPage;
      filtered = filtered.slice(startIndex, endIndex);
    }

    return filtered;
  }, [enableRowSwapping ? localTableData : currentData, searchValue, filterState, sortColumn, sortDirection, pagination, currentPage, recordsPerPage, visibleColumns, enableRowSwapping, localTableData, currentData]);

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
    
    if (!isVisible && selectedColumnForFilter === columnKey && isFilterPopupOpen) {
      setIsFilterPopupOpen(false);
      setSelectedColumnForFilter(null);
      setFilterAnchorEl(null);
    }
  };

  const handleBulkColumnVisibilityChange = (columnKeys: string | string[], isVisible: boolean) => {
    const keysArray = Array.isArray(columnKeys) ? columnKeys : [columnKeys];
    
    if (isVisible) {
      const newVisibleColumns = [...visibleColumns];
      keysArray.forEach(key => {
        if (!newVisibleColumns.includes(key)) {
          newVisibleColumns.push(key);
        }
      });
      setVisibleColumns(newVisibleColumns);
    } else {
      const newVisibleColumns = visibleColumns.filter(key => !keysArray.includes(key));
      setVisibleColumns(newVisibleColumns);
      
      if (selectedColumnForFilter && isFilterPopupOpen && keysArray.includes(selectedColumnForFilter)) {
        setIsFilterPopupOpen(false);
        setSelectedColumnForFilter(null);
        setFilterAnchorEl(null);
      }
    }
  };

  const getVisibleHeaders = () => {
    const visible = columnOrder.filter(header => visibleColumns.includes(header.key));
    return visible;
  };

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
      default:
        return [
          { value: 'contains', label: 'Contains' },
          { value: 'equals', label: 'Equals' },
          { value: 'startsWith', label: 'Starts With' },
          { value: 'endsWith', label: 'Ends With' },
          { value: 'notContains', label: 'Does Not Contain' }
        ];
    }
  };

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
    
    if (selectedColumnForFilter === columnKey && isFilterPopupOpen) {
      setIsFilterPopupOpen(false);
      setSelectedColumnForFilter(null);
      setFilterAnchorEl(null);
      return;
    }
    
    if (selectedColumnForFilter !== columnKey) {
      setIsFilterPopupOpen(false);
      setSelectedColumnForFilter(columnKey);
      setFilterAnchorEl(event.currentTarget);
      
      setTimeout(() => {
        setIsFilterPopupOpen(true);
      }, 50);
    } else {
      setSelectedColumnForFilter(columnKey);
      setFilterAnchorEl(event.currentTarget);
      setIsFilterPopupOpen(true);
    }
  };

  const handleFilterPopupClose = () => {
    setFilterAnchorEl(null);
    setIsFilterPopupOpen(false);
    setTimeout(() => {
      setSelectedColumnForFilter(null);
    }, 100);
  };

  const handleResizeStart = (e: React.MouseEvent, columnKey: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const header = tableHeaders.find(h => h.key === columnKey);
    if (header?.isResizable !== false) {
      const currentWidth = columnWidths[columnKey] || header?.minWidth || 150;
      
      setIsResizing(true);
      setResizingColumn(columnKey);
      setResizeStartX(e.clientX);
      setResizeStartWidth(currentWidth);
      
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    }
  };

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing && resizingColumn) {
        const deltaX = e.clientX - resizeStartX;
        const header = tableHeaders.find(h => h.key === resizingColumn);
        const minWidth = header?.minWidth || 50; 
        const maxWidth = header?.maxWidth || 800; 
        
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
    if (!isColumnPanelExpanded) {
      setIsFilterExpanded(false);
    }
    setIsColumnPanelExpanded(!isColumnPanelExpanded);
  };

  const handleFilterToggle = () => {
    if (!isFilterExpanded) {
      setIsColumnPanelExpanded(false);
    }
    setIsFilterExpanded(!isFilterExpanded);
  };

  const handleFilterConditionChange = (id: number, field: string, value: any) => {
    setFilterConditions(prev => 
      prev.map(condition => 
        condition.id === id ? { ...condition, [field]: value } : condition
      )
    );
  };

  const handleApplyFilter = () => {
    const columnToFilter = selectedColumnForFilter || filterConditions[0].column;
    
    if (columnToFilter && filterConditions[0].value) {
      const filterValue = (filterConditions[0].value as any) instanceof Date ? 
        (filterConditions[0].value as unknown as Date).toISOString().split('T')[0] : 
        filterConditions[0].value;
      
      const newFilterState = { ...filterState };
      newFilterState[columnToFilter] = {
        value: filterValue,
        operator: filterConditions[0].operator as any
      };
      
      const newColumnFilterStates = { ...columnFilterStates };
      newColumnFilterStates[columnToFilter] = {
        operator: filterConditions[0].operator,
        value: filterValue
      };
      
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
    
    if (selectedColumnForFilter) {
      const newFilterState = { ...filterState };
      delete newFilterState[selectedColumnForFilter];
      
      const newColumnFilterStates = { ...columnFilterStates };
      delete newColumnFilterStates[selectedColumnForFilter];
      
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

    let validationError = '';
    
    if (column.required && (!newValue || newValue.toString().trim() === '')) {
      validationError = 'This field is required';
    }
    
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

    const rowIndex = currentData.findIndex(row => (row.id || currentData.indexOf(row).toString()) === rowId);
    const originalValue = rowIndex >= 0 ? currentData[rowIndex][columnKey] : null;

    const updateData = (newData: any[]) => {
      if (controlledData && onDataChange) {
        onDataChange(newData);
      } else {
        setInternalData(newData);
      }
    };

    const updatedData = currentData.map((row, index) => {
      const rowIdToCheck = row.id || index.toString();
      
      if (rowId.startsWith('row-')) {
        const rowIndex = parseInt(rowId.replace('row-', ''));
        if (index === rowIndex) {
          return { ...row, [columnKey]: processedValue };
        }
      } else if (rowIdToCheck === rowId) {
        return { ...row, [columnKey]: processedValue };
      }
      return row;
    });

    updateData(updatedData);

    onCellEdit?.(rowId, columnKey, processedValue, originalValue);
    onCellEditComplete?.(rowId, columnKey, processedValue, true);

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
    setCellValidationError(''); 
  };

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
    
    if (!editingRow || editingRow !== rowId) {
      return;
    }

    const editableColumns = tableHeaders.filter(h => h.isEditable);
    const validationErrors: {[columnKey: string]: string} = {};
    let hasErrors = false;

    editableColumns.forEach(column => {
      const value = tempRowValues[column.key];
      let error = '';

      if (column.required && (!value || value.toString().trim() === '')) {
        error = 'This field is required';
      }

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
      setRowValidationErrors(validationErrors);
      return;
    }

    const updateData = (newData: any[]) => {
      if (controlledData && onDataChange) {
        onDataChange(newData);
      } else {
        setInternalData(newData);
      }
    };

    const updatedData = [...currentData];
    
    let rowIndex = -1;
    
    if (rowId.startsWith('row-')) {
      const index = parseInt(rowId.replace('row-', ''));
      rowIndex = index;
    } else {
      rowIndex = currentData.findIndex(row => (row.id || currentData.indexOf(row).toString()) === rowId);
    }
    
    if (rowIndex === -1 || rowIndex >= currentData.length) {
      console.error('Row not found in currentData. rowId:', rowId, 'currentData.length:', currentData.length);
      return;
    }
    
    const updatedRow = { ...currentData[rowIndex] };
    
    editableColumns.forEach(column => {
      const value = tempRowValues[column.key];
      let processedValue = value;

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

      const originalValue = rowIndex >= 0 ? currentData[rowIndex][column.key] : null;

      updatedRow[column.key] = processedValue;

      onCellEdit?.(rowId, column.key, processedValue, originalValue);
      onCellEditComplete?.(rowId, column.key, processedValue, true);
    });

    updatedData[rowIndex] = updatedRow;

    updateData(updatedData);

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
    setTempRowValues(prev => {
      const newValues = {
        ...prev,
        [columnKey]: newValue
      };
      return newValues;
    });
    if (rowValidationErrors[columnKey]) {
      setRowValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[columnKey];
        return newErrors;
      });
    }
  };

  const getRowById = (rowId: string) => {
    return currentData.find((row, index) => {
      const currentRowId = row.id || `row-${index}`;
      return currentRowId === rowId || `row-${index}` === rowId;
    }) || null;
  };

  useImperativeHandle(ref, () => ({
    getData: () => currentData,
    setData: (data: any[]) => {
      if (controlledData && onDataChange) {
        onDataChange(data);
      } else {
        setInternalData(data);
      }
    },
    addRow: (row: any) => {
      const newData = [...currentData, row];
      if (controlledData && onDataChange) {
        onDataChange(newData);
      } else {
        setInternalData(newData);
      }
    },
    updateRow: (rowId: string, rowData: any) => {
      const updatedData = currentData.map((row, index) => {
        const currentRowId = row.id || `row-${index}`;
        if (currentRowId === rowId || `row-${index}` === rowId) {
          return { ...row, ...rowData };
        }
        return row;
      });
      if (controlledData && onDataChange) {
        onDataChange(updatedData);
      } else {
        setInternalData(updatedData);
      }
    },
    deleteRow: (rowId: string) => {
      const updatedData = currentData.filter((row, index) => {
        const currentRowId = row.id || `row-${index}`;
        return currentRowId !== rowId && `row-${index}` !== rowId;
      });
      if (controlledData && onDataChange) {
        onDataChange(updatedData);
      } else {
        setInternalData(updatedData);
      }
    },
    getRow: getRowById,
    getSelectedRows: () => {
      return Array.from(selectedRows).map(rowId => {
        const index = parseInt(rowId.replace('row-', ''));
        return currentData[index];
      }).filter(Boolean);
    },
    clearSelection: () => setSelectedRows(new Set()),
    selectAll: () => {
      const allRowIds = processedData.map((_, index) => `row-${index}`);
      setSelectedRows(new Set(allRowIds));
    },

    getFilters: () => filterState,
    setFilters: (filters: FilterState) => {
      setFilterState(filters);
      onFilterChange?.(filters);
    },
    clearFilters: () => {
      setFilterState({});
      setSearchValue('');
      onFilterChange?.({});
    },
    applyFilter: (columnKey: string, value: string, operator: string = 'contains') => {
      const newFilterState = { ...filterState };
      if (value) {
        newFilterState[columnKey] = { value, operator: operator as any };
      } else {
        delete newFilterState[columnKey];
      }
      setFilterState(newFilterState);
      onFilterChange?.(newFilterState);
    },
    removeFilter: (columnKey: string) => {
      const newFilterState = { ...filterState };
      delete newFilterState[columnKey];
      setFilterState(newFilterState);
      onFilterChange?.(newFilterState);
    },

    // Sorting
    getSortState: () => ({ column: sortColumn, direction: sortDirection }),
    setSort: (column: string, direction: 'asc' | 'desc') => {
      setSortColumn(column);
      setSortDirection(direction);
      const sortState: SortState = { column, direction };
      onSortChange?.(sortState);
    },
    clearSort: () => {
      setSortColumn(null);
      setSortDirection('asc');
      onSortChange?.({ column: null, direction: 'asc' });
    },

    getSearchValue: () => searchValue,
    setSearchValue: (value: string) => setSearchValue(value),
    clearSearch: () => setSearchValue(''),

    getCurrentPage: () => currentPage,
    setCurrentPage: (page: number) => {
      setCurrentPage(page);
      onPaginationHandler?.(page, recordsPerPage);
    },
    getPageSize: () => recordsPerPage,
    setPageSize: (size: number) => {
      setCurrentPage(1);
      onPaginationHandler?.(1, size);
    },
    getTotalPages: () => Math.ceil(currentData.length / recordsPerPage),

    getVisibleColumns: () => visibleColumns,
    setColumnVisibility: (columnKeys: string | string[], visible: boolean) => {
      handleBulkColumnVisibilityChange(columnKeys, visible);
    },
    showAllColumns: () => {
      const allColumns = tableHeaders.map(header => header.key);
      setVisibleColumns(allColumns);
    },
    hideAllColumns: () => setVisibleColumns([]),
    getColumnWidth: (columnKey: string) => columnWidths[columnKey] || 150,
    setColumnWidth: (columnKey: string, width: number) => {
      setColumnWidths(prev => ({ ...prev, [columnKey]: width }));
    },
    resetColumnWidths: () => {
      const initialWidths: {[columnKey: string]: number} = {};
      tableHeaders.forEach(header => {
        initialWidths[header.key] = header.minWidth || 150;
      });
      setColumnWidths(initialWidths);
    },

    // Grid State
    isCollapsed: () => isCollapsed,
    toggleCollapse: () => setIsCollapsed(!isCollapsed),
    expand: () => setIsCollapsed(false),
    collapse: () => setIsCollapsed(true),

    // Editing
    startEdit: (rowId: string, columnKey?: string) => {
      if (enableInlineEdit) {
        if (inlineEditMode === 'row') {
          handleRowEditStart(rowId, getRowById(rowId) || {});
        } else if (columnKey) {
          const row = getRowById(rowId);
          if (row) {
            handleCellEditStart(rowId, columnKey, row[columnKey]);
          }
        }
      }
    },
    stopEdit: () => {
      if (editingCell) {
        handleCellEditCancel();
      }
      if (editingRow) {
        handleRowEditCancel();
      }
    },
    isEditing: () => !!(editingCell || editingRow),
    getEditingRow: () => editingRow,

    exportData: (format: 'json' | 'csv' = 'json') => {
      if (format === 'csv') {
        const headers = getVisibleHeaders().map(h => h.name).join(',');
        const rows = processedData.map(row => 
          getVisibleHeaders().map(h => `"${row[h.key] || ''}"`).join(',')
        );
        return [headers, ...rows].join('\n');
      }
      return JSON.stringify(processedData, null, 2);
    },
    refresh: () => {
      setInternalData([...currentData]);
    },
    scrollToRow: (rowId: string) => {
      if (tableRef.current) {
        tableRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    },
    scrollToTop: () => {
      if (tableRef.current) {
        tableRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    },
    scrollToBottom: () => {
      if (tableRef.current) {
        tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    },

    getRowCount: () => currentData.length,
    getColumnCount: () => tableHeaders.length,
    getFilteredRowCount: () => processedData.length,
    getSelectedRowCount: () => selectedRows.size,
  }), [
    currentData,
    controlledData,
    onDataChange,
    setInternalData,
    selectedRows,
    setSelectedRows,
    processedData,
    filterState,
    setFilterState,
    onFilterChange,
    searchValue,
    setSearchValue,
    sortColumn,
    sortDirection,
    setSortColumn,
    setSortDirection,
    onSortChange,
    currentPage,
    setCurrentPage,
    recordsPerPage,
    onPaginationHandler,
    visibleColumns,
    setVisibleColumns,
    handleColumnVisibilityChange,
    tableHeaders,
    columnWidths,
    setColumnWidths,
    isCollapsed,
    setIsCollapsed,
    enableInlineEdit,
    inlineEditMode,
    editingCell,
    editingRow,
    handleRowEditStart,
    handleCellEditStart,
    handleCellEditCancel,
    handleRowEditCancel,
    getVisibleHeaders,
    tableRef,
    getRowById
  ]);

  const totalPages = Math.ceil(tableData.length / recordsPerPage);
  const activeFiltersCount = Object.keys(filterState).length + (searchValue ? 1 : 0);

  const headerScrollRef = React.useRef<HTMLDivElement | null>(null);
  const handleBodyScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    if (headerScrollRef.current) {
      headerScrollRef.current.scrollLeft = (e.currentTarget as HTMLDivElement).scrollLeft;
    }
  };

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
                <RdsButton showLeftIcon={true} changeLeftIcon={<AddIcon />} style="outlined" size="small" text="Add New" />
                <RdsButton showLeftIcon={true} changeLeftIcon={<PersonIcon />} style="outlined" size="small" text="Person" />
                <RdsButton
                  showLeftIcon={true}
                  changeLeftIcon={<FilterIcon />}
                  style={activeFiltersCount > 0 ? "filled" : "outlined"}
                  size="small"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  Filters
                  {activeFiltersCount > 0 && (
                    <Chip label={activeFiltersCount} size="small" color="primary" sx={{ ml: 1 }} />
                  )}
                </RdsButton>
                <RdsButton showLeftIcon={true} changeLeftIcon={<SortIcon />} style="outlined" size="small" text="Sort" />
                <RdsButton showLeftIcon={true} changeLeftIcon={<VisibilityIcon />} style="outlined" size="small" text="Hide" />
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
      bgcolor: 'background.paper',
      color: 'text.primary',
      '& .MuiTableCell-root': {
        color: 'text.primary'
      },
      '& .react-beautiful-dnd-drag-handle': {
        visibility: 'visible !important',
        opacity: '1 !important',
      },
      '& .react-beautiful-dnd-draggable': {
        visibility: 'visible !important',
        opacity: '1 !important',
      },
      '& .react-beautiful-dnd-droppable': {
        minHeight: 'auto !important',
      },
      '& .react-beautiful-dnd-placeholder': {
        display: 'table-cell !important',
        visibility: 'visible !important',
        opacity: '0.5 !important',
        backgroundColor: 'action.hover',
        border: '2px dashed',
        borderColor: 'var(--rds-primary-main)',
      },
    }}>
      {showHeader && (
        <Box
          ref={headerScrollRef}
          sx={{
            overflowX: 'auto',
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': { height: 0 }, 
          }}
        >
          <Box p={2} borderBottom="1px solid" borderColor="divider" sx={{
            bgcolor: 'background.paper'
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
              <RdsButton showLeftIcon={true} changeLeftIcon={<AddIcon />} style="outlined" size="small" text="Add New" />
              <RdsButton showLeftIcon={true} changeLeftIcon={<PersonIcon />} style="outlined" size="small" text="Person" />
              <RdsButton
                showLeftIcon={true}
                changeLeftIcon={<FilterIcon />}
                style={activeFiltersCount > 0 ? "filled" : "outlined"}
                size="small"
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
                {activeFiltersCount > 0 && (
                  <Chip label={activeFiltersCount} size="small" color="primary" sx={{ ml: 1 }} />
                )}
              </RdsButton>
              <RdsButton showLeftIcon={true} changeLeftIcon={<SortIcon />} style="outlined" size="small" text="Sort" />
              <RdsButton showLeftIcon={true} changeLeftIcon={<VisibilityIcon />} style="outlined" size="small" text="Hide" />
              <IconButton size="small">
                <MoreIcon />
              </IconButton>
            </Stack>
            </Stack>
          </Box>
        </Box>
      )}

      {showFilters && (
        <Box p={2} borderBottom="1px solid" borderColor="divider" sx={{
          bgcolor: 'action.hover'
        }}>
          <Grid container spacing={2} alignItems="center">
            {tableHeaders.filter(header => header.isFilter).map((header) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={header.key}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" fontWeight="medium" minWidth="87px">
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
              <RdsButton
                showLeftIcon={true}
                changeLeftIcon={<ClearIcon />}
                onClick={clearAllFilters}
                style="outlined"
                size="small"
                color="secondary"
                text="Clear All"
                sx={{
                  fontSize: '11px',
                  fontWeight: 600,
                  height: '32px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  borderRadius: '4px',
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: 'none',
                  },
                  '&:active': {
                    boxShadow: 'none',
                  }
                }}
              />
            </Grid>
          </Grid>
        </Box>
      )}

      {showSubHeader && (
        <Box p={1.5} borderBottom="1px solid" borderColor="divider" sx={{ 
          bgcolor: 'action.selected'
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
          onScroll={handleBodyScroll}
          elevation={0}
          sx={{
            bgcolor: 'background.paper',
          }}
        >
          <DragDropContext 
            onDragEnd={(enableRowSwapping || enableColumnSwapping) ? onDragEnd : () => {}}
            onDragStart={(enableRowSwapping || enableColumnSwapping) ? onDragStart : () => {}}
            onDragUpdate={(enableRowSwapping || enableColumnSwapping) ? onDragUpdate : () => {}}
          >
            <Table stickyHeader ref={tableRef} sx={{ tableLayout: 'fixed' }}>
            <TableHead sx={{ 
              bgcolor: 'background.paper',
              '& th': { bgcolor: 'action.hover !important' }
            }}>
              <TableRow sx={{ 
                bgcolor: 'background.paper' 
              }}>
                {enableRowSwapping && (
                  <TableCell 
                    sx={{ 
                      width: '60px',
                      padding: '8px',
                      borderRight: '1px solid var(--rds-border-default, #d1d1d1)',
                      bgcolor: 'action.hover !important',
                    }}
                  >
                  </TableCell>
                )}

                {enableCheckboxSelection && (
                  <TableCell 
                    padding="checkbox" 
                    sx={{ 
                      width: '50px',
                      borderRight: '1px solid var(--rds-border-default, #d1d1d1)',
                      bgcolor: 'action.hover !important',
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
                      borderRight: '1px solid var(--rds-border-default, #d1d1d1)',
                      bgcolor: 'action.hover !important',
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {enableCheckboxSelection ? 'Select All' : 'Select'}
                    </Typography>
                  </TableCell>
                )}
                
                {getVisibleHeaders().map((header, index) => {
                  const isDragging = customDragState.isDragging && customDragState.draggedColumnKey === header.key;
                  const isBeingDragged = customDragState.draggedColumnKey === header.key;
                  const isDropTarget = customDragState.currentHoverIndex === index && customDragState.isDragging && !isBeingDragged;
                  const isDropBefore = customDragState.currentHoverIndex === index && customDragState.isDragging &&
                                      customDragState.dragStartIndex !== null && customDragState.dragStartIndex > index;
                  const isDropAfter = customDragState.currentHoverIndex === index && customDragState.isDragging &&
                                     customDragState.dragStartIndex !== null && customDragState.dragStartIndex < index;
                  const dropIndicatorsEnabled = false;

                  return (
                    <React.Fragment key={header.key}>
                      {dropIndicatorsEnabled && isDropBefore && (
                        <Box
                          sx={{
                            position: 'absolute',
                            left: '-2px',
                            top: 0,
                            bottom: 0,
                            width: '4px',
                            backgroundColor: 'var(--rds-primary-main)',
                            zIndex: 'var(--rds-z-index-portal)',
                          }}
                        />
                      )}
                      
                      <TableCell
                        draggable={enableColumnSwapping}
                        onDragStart={(e) => {
                          if (enableColumnSwapping) {
                            handleCustomDragStart(header.key, index);
                            e.dataTransfer.effectAllowed = 'move';
                            e.dataTransfer.setData('text/plain', header.key);
                          }
                        }}
                        onDragOver={(e) => {
                          if (enableColumnSwapping && customDragState.isDragging) {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = 'move';
                            handleCustomDragOver(index);
                          }
                        }}
                        onDragEnd={(e) => {
                          if (enableColumnSwapping && customDragState.isDragging) {
                            handleCustomDragEnd(customDragState.currentHoverIndex ?? undefined);
                          }
                        }}
                        onDragLeave={(e) => {
                          if (enableColumnSwapping && customDragState.isDragging) {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const { clientX, clientY } = e;
                            if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) {
                              handleCustomDragLeave();
                            }
                          }
                        }}
                        onDrop={(e) => {
                          if (enableColumnSwapping && customDragState.isDragging) {
                            e.preventDefault();
                            handleCustomDragEnd(index);
                          }
                        }}
                        sx={{
                          cursor: enableColumnSwapping ? 'grab' : (isSort && header.isSort ? 'pointer' : 'default'),
                          width: columnWidths[header.key] || header.minWidth || 150,
                          minWidth: header.minWidth || 50,
                          maxWidth: header.maxWidth || 800,
                          fontWeight: header.isBold ? 'bold' : 'normal',
                          position: 'relative',
                          userSelect: 'none',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          borderRight: '1px solid var(--rds-border-default, #d1d1d1)',
                          bgcolor: 'action.hover !important',
                          transition: isDragging ? 'none' : 'all 0.2s ease',
                          '&:last-child': {
                            borderRight: 'none',
                          },
                          '&:hover': {
                            ...(enableColumnSwapping && !isDragging && !customDragState.isDragging && {
                              backgroundColor: 'action.hover',
                              cursor: 'grab',
                            }),
                          },
                          '&:active': {
                            ...(enableColumnSwapping && {
                              cursor: 'grabbing',
                            }),
                          },
                          ...(isBeingDragged && !customDragState.dragPreviewVisible && {
                            opacity: 1,
                            position: 'relative',
                          }),
                          ...(isDropTarget && {
                          }),
                        }}
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          if (!customDragState.isDragging && isSort && header.isSort) {
                            handleSort(header.key);
                          }
                        }}
                      >
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          
                          <Tooltip title={header.name} arrow>
                            <Typography 
                              variant="subtitle2" 
                              fontWeight={header.isBold ? 'bold' : 'medium'}
                              sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                width: '100%',
                              }}
                            >
                              {header.name}
                            </Typography>
                          </Tooltip>
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
                        
                        {header.isResizable !== false && (
                          <Box
                            role="separator"
                            aria-label={`Resize ${header.name} column`}
                            tabIndex={0}
                            onMouseDown={(e) => handleResizeStart(e, header.key)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                              }
                            }}
                            sx={{
                              position: 'absolute',
                              right: 0,
                              top: 0,
                              bottom: 0,
                              width: '6px',
                              cursor: 'col-resize',
                              backgroundColor: isResizing && resizingColumn === header.key ? 'primary.main' : 'transparent',
                              zIndex: 'var(--rds-z-index-raised)',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: 0.8,
                                width: '3px',
                              },
                              '&:focus': {
                                outline: '2px solid',
                                outlineColor: 'primary.main',
                                outlineOffset: '1px',
                              },
                            }}
                          />
                        )}
                          
                          {dropIndicatorsEnabled && isDropAfter && (
                            <Box
                              sx={{
                                position: 'absolute',
                                right: '-2px',
                                top: 0,
                                bottom: 0,
                                width: '4px',
                                backgroundColor: 'var(--rds-primary-main)',
                                zIndex: 'var(--rds-z-index-portal)',
                              }}
                            />
                          )}
                      </TableCell>
                    </React.Fragment>
                  );
                })}
                
                {actions.length > 0 && (
                  <TableCell 
                    sx={{ 
                      width: '100px',
                      borderRight: 'none',
                      bgcolor: 'action.hover !important',
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight="medium">
                      Actions
                    </Typography>
                  </TableCell>
                )}
                
                {enableInlineEdit && inlineEditMode === 'row' && (
                  <TableCell 
                    sx={{ 
                      width: '150px',
                      borderRight: 'none',
                      bgcolor: 'action.hover !important',
                    }}
                  >
                    <Typography variant="subtitle2" fontWeight="medium">
                      Edit
                    </Typography>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            
            <Droppable droppableId="droppable-body" type="ROW">
              {(provided: any) => (
                <TableBody
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
              {processedData.map((row, index) => {
                const rowId = `row-${index}`;
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
                      <TableRow
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        key={rowId}
                        selected={isSelected}
                        hover
                        onClick={() => onRowClick?.(rowId)}
                        sx={{ 
                          cursor: 'pointer',
                          ...(dragSnapshot.isDragging && {
                            backgroundColor: isSelected ? 'var(--rds-primary-light)' : undefined,
                          }),
                        }}
                      >
                        {enableRowSwapping && (
                          <TableCell sx={{ 
                            width: '60px', 
                            padding: '8px',
                            borderRight: '1px solid var(--rds-border-default, #d1d1d1)',
                            textAlign: 'center',
                            verticalAlign: 'middle'
                          }}>
                            <div 
                              {...dragProvided.dragHandleProps}
                              style={{ 
                                cursor: 'grab',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                height: '100%'
                              }}
                            >
                              <DragIndicatorIcon 
                                fontSize="small" 
                                sx={{ 
                                  color: 'var(--rds-text-secondary)',
                                  '&:hover': {
                                    color: 'var(--rds-text-primary)',
                                  }
                                }} 
                              />
                            </div>
                          </TableCell>
                        )}

                        {enableCheckboxSelection && (
                      <TableCell 
                        padding="checkbox"
                        sx={{ borderRight: (theme) => `1px solid ${'var(--rds-border-default)'}` }}
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
                        sx={{ borderRight: (theme) => `1px solid ${'var(--rds-border-default)'}` }}
                      >
                        <Radio
                          checked={isSelected}
                          onChange={() => handleRowSelect(rowId, row)}
                          name="rowSelection"
                        />
                      </TableCell>
                    )}
                    
                    {(enableColumnSwapping ? columnOrder.filter(header => visibleColumns.includes(header.key)) : getVisibleHeaders()).map((header) => {
                      const cellValue = row[header.key];
                      const cellWidth = columnWidths[header.key] || header.minWidth || 150;
                      const rowId = `row-${index}`;
                      const isEditing = editingCell?.rowId === rowId && editingCell?.columnKey === header.key;
                      
                      const shouldRenderHtml = header.allowHtml && typeof cellValue === 'string' && cellValue.includes('<');
                      const cellText = shouldRenderHtml ? '' : (cellValue?.toString() || '');
                      
                      const shouldShowTooltip = !shouldRenderHtml && cellText.length > 10;
                      
                      if (header.renderCell) {
                        return (
                      <TableCell
                        key={header.key}
                        sx={{
                            width: cellWidth,
                            minWidth: header.minWidth || 50,
                            maxWidth: header.maxWidth || 800,
                            borderRight: '1px solid var(--rds-border-default, #d1d1d1)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            '&:last-child': {
                              borderRight: 'none',
                            },
                          }}
                          >
                            {header.renderCell(cellValue, row)}
                          </TableCell>
                        );
                      }
                      
                      const isEditable = enableInlineEdit && header.isEditable && !shouldRenderHtml;
                      const isRowEditing = editingRow === rowId;
                      const isCellEditing = isEditing && inlineEditMode === 'cell';
                      
                      return (
                        <TableCell
                          key={header.key}
                          sx={{
                            width: cellWidth,
                            minWidth: header.minWidth || 50,
                            maxWidth: header.maxWidth || 800,
                            borderRight: '1px solid var(--rds-border-default, #d1d1d1)',
                            color: 'text.primary',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
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
                                color: 'text.primary',
                                '& *': {
                                  maxWidth: '100%',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  color: 'text.primary',
                                },
                                '& .status-pill': {
                                  display: 'inline-block',
                                  padding: '2px 8px',
                                  borderRadius: '12px',
                                  fontSize: '12px',
                                  fontWeight: 500,
                                  textAlign: 'center',
                                  minWidth: '60px',
                                  '&.status-qualified': {
                                    backgroundColor: 'var(--rds-success-dark)', color: 'var(--rds-neutral-0)',
                                  },
                                  '&.status-negotiation': {
                                    backgroundColor: 'var(--rds-semantic-warning-dark)', color: 'var(--rds-neutral-0)',
                                  },
                                  '&.status-unqualified': {
                                    backgroundColor: 'var(--rds-error-main)', color: 'var(--rds-neutral-0)',
                                  },
                                  '&.status-proposal': {
                                    backgroundColor: 'var(--rds-action-selected)', color: 'var(--rds-text-primary)',
                                  },
                                  '&.status-new': {
                                    backgroundColor: 'var(--rds-primary-light)', color: 'var(--rds-neutral-0)',
                                  },
                                  '&.status-renewal': {
                                    backgroundColor: 'var(--rds-primary-main)',
                                    color: 'common.white',
                                  },
                                },
                                '& .progress-bar': {
                                  width: '100%',
                                  height: '8px',
                                  backgroundColor: 'action.selected',
                                  borderRadius: '4px',
                                  overflow: 'hidden',
                                  '& .progress-fill': {
                                    height: '100%',
                                    backgroundColor: 'primary.main',
                                    transition: 'width 0.3s ease',
                                  },
                                },
                                '& .verification-icon': {
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '50%',
                                  '&.verified': {
                                    backgroundColor: 'success.main',
                                    color: 'common.white',
                                  },
                                  '&.not-verified': {
                                    backgroundColor: 'error.main',
                                    color: 'common.white',
                                  },
                                },
                                '& img': {
                                  maxWidth: '24px',
                                  maxHeight: '24px',
                                  borderRadius: '50%',
                                  verticalAlign: 'middle',
                                  marginRight: '8px',
                                },
                                '& .employee-name': {
                                  color: 'text.primary',
                                  fontWeight: 'bold',
                                },
                                '& .employee-title': {
                                  color: 'text.secondary',
                                },
                                '& .tag': {
                                  color: 'text.primary',
                                  borderColor: 'divider',
                                },
                                '& .badge, & span[class*="badge"], & .chip, & span[class*="chip"]': {
                                  color: 'text.primary',
                                },
                                '& .last-active': {
                                  color: 'text.disabled',
                                },
                                '& .online, & .away': {
                                  borderColor: 'divider',
                                },
                                '& .leadership, & .management, & .strategy, & .planning, & .coordination, & .reporting': {
                                  color: 'text.primary',
                                  borderColor: 'transparent',
                                },
                                '& .senior, & .lead, & .pending, & .active': {
                                  color: 'text.primary',
                                },
                                // Style attribute selectors removed - using CSS classes instead
                                // See rds-comp-grid.scss for themed cell styling classes
                              }}
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
                              <RdsButton
                                key={action.id}
                                size={action.size || "small"}
                                style={action.variant === 'contained' ? 'filled' : action.variant === 'text' ? 'transparent' : 'outlined'}
                                color={action.color || "primary"}
                                disabled={action.disabled || false}
                                onClick={() => onActionSelection?.(row, action.id)}
                                text={action.displayName}
                              />
                            ))
                          ) : (
                            <ActionMenu row={row} actions={actions} onActionSelection={onActionSelection} />
                          )}
                        </Stack>
                      </TableCell>
                    )}

                    {/* Row editing controls */}
                    {enableInlineEdit && inlineEditMode === 'row' && (
                      <TableCell sx={{ borderRight: 'none' }}>
                        <Stack direction="row" spacing={0.5}>
                          {isRowEditing ? (
                            <>
                              <RdsButton
                                size="small"
                                style="filled"
                                color="primary"
                                onClick={() => {
                                  handleRowEditSave(rowId);
                                }}
                                showLeftIcon={true}
                                changeLeftIcon={<EditIcon />}
                                text="Save"
                              />
                              <RdsButton
                                size="small"
                                style="outlined"
                                color="secondary"
                                onClick={handleRowEditCancel}
                                showLeftIcon={true}
                                changeLeftIcon={<ClearIcon />}
                                text="Cancel"
                              />
                            </>
                          ) : (
                            <RdsButton
                              size="small"
                              style="outlined"
                              color="primary"
                              onClick={() => handleRowEditStart(rowId, row)}
                              showLeftIcon={true}
                              changeLeftIcon={<EditIcon />}
                              text="Edit Row"
                            />
                          )}
                        </Stack>
                      </TableCell>
                    )}
                      </TableRow>
                        )}
                      </Draggable>
                );
              })}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>
          </DragDropContext>
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
            overflowY: 'auto',
            zIndex: 'var(--rds-z-index-modal, 1300)',
            backgroundColor: 'background.paper',
            color: 'text.primary',
            '& .MuiTypography-root': {
              color: 'text.primary',
            },
            '& .MuiIconButton-root': {
              color: 'text.primary',
            },
            '& .MuiDivider-root': {
              borderColor: 'divider',
            },
            '&::-webkit-scrollbar': {
              width: '6px',
            },
              scrollbarWidth: 'thin !important',
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'action.hover',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'var(--rds-action-disabled)',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: 'var(--rds-action-disabled)',
            },
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
          
          <Box mb={1}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                p: 1,
                borderRadius: 0.5,
                border: '1px solid',
                borderColor: 'divider',
                width: '100%',
                '&:hover': { backgroundColor: 'action.hover' }
              }}
              onClick={handleColumnPanelToggle}
            >
              <Typography 
                variant="caption" 
                fontWeight="medium" 
                sx={{ 
                  flexGrow: 1, 
                  fontSize: '12px',
                  color: 'text.primary',
                }}
              >
                Columns
              </Typography>
              {isColumnPanelExpanded ? 
                <ArrowUpIcon sx={{ fontSize: '12px', color: 'text.primary' }} /> : 
                <ArrowDownIcon sx={{ fontSize: '12px', color: 'text.primary' }} />
              }
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
                  backgroundColor: 'action.hover',
                  width: '100%',
                  maxHeight: '80px',
                  overflowY: 'auto',
                  scrollbarWidth: 'thin !important',
                }}
              >
                <List dense sx={{ py: 0 }}>
                  {tableHeaders.map((header) => (
                    <ListItem 
                      key={header.key} 
                      sx={{ 
                        py: 0.5,
                        px: 1,
                        minHeight: 24,
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
                            padding: '2px',
                            color: 'text.primary',
                            '& .MuiSvgIcon-root': {
                              fontSize: 14,
                              color: 'text.primary',
                            }
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary={header.name}
                        primaryTypographyProps={{ 
                          variant: 'caption', 
                          sx: { 
                            fontSize: '12px',
                            fontWeight: '400',
                            color: 'text.primary' 
                          }
                        }}
                        sx={{ ml: 0 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>
          
          <Divider sx={{ mb: 1 }} />
          
          <Box>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                p: 1,
                borderRadius: 0.5,
                border: '1px solid',
                borderColor: 'divider',
                width: '100%',
                mb: 0.5,
                '&:hover': { backgroundColor: 'action.hover' }
              }}
              onClick={handleFilterToggle}
            >
              <Typography 
                variant="caption" 
                fontWeight="medium" 
                sx={{ 
                  flexGrow: 1, 
                  fontSize: '12px',
                  color: 'text.primary'
                }}
              >
                Filter
              </Typography>
              {isFilterExpanded ? 
                <ArrowUpIcon sx={{ fontSize: '12px', color: 'text.primary' }} /> : 
                <ArrowDownIcon sx={{ fontSize: '12px', color: 'text.primary' }} />
              }
            </Box>
            
            {isFilterExpanded && (
              <Box 
                sx={{ 
                  p: 0.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '0 0 4px 4px',
                  backgroundColor: 'action.hover',
                  width: '100%'
                }}
              >
                <Stack spacing={1}>
                  {(() => {
                    const selectedColumn = tableHeaders.find(h => h.key === selectedColumnForFilter);
                    const dataType = selectedColumn?.dataType || 'string';
                    const operators = getOperatorsForDataType(dataType);
                    const inputType = getInputTypeForDataType(dataType);
                    
                    return (
                      <Box>
                        <FormControl size="small" sx={{ minWidth: 120, mb: 1 }}>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              fontSize: '12px', 
                              fontWeight: '500', 
                              color: 'text.primary',
                              mb: 0.5,
                              display: 'block'
                            }}
                          >
                            Filter
                          </Typography>
                          <Select
                            value={filterConditions[0].operator}
                            onChange={(e) => handleFilterConditionChange(1, 'operator', e.target.value)}
                            sx={{ 
                              fontSize: '12px',
                              height: '32px',
                              color: 'text.primary',
                              backgroundColor: 'background.paper',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderWidth: 1,
                                borderColor: 'divider'
                              },
                              '& .MuiSvgIcon-root': {
                                color: 'text.primary',
                              },
                              '& .MuiSelect-icon': {
                                color: 'text.primary',
                              },
                            }}
                          >
                            {operators.map((op) => (
                              <MenuItem 
                                key={op.value} 
                                value={op.value} 
                                sx={{ 
                                  fontSize: '12px',
                                  color: 'text.primary',
                                  '&.Mui-selected': {
                                    backgroundColor: 'action.selected',
                                  },
                                  '&:hover': {
                                    backgroundColor: 'action.hover',
                                  }
                                }}
                              >
                                {op.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        
                        {inputType === 'date' ? (
                          <Box onMouseDown={e => e.stopPropagation()}>
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
                                      backgroundColor: 'background.paper',
                                      '& .MuiInputBase-input': {
                                        fontSize: '10px',
                                        height: '24px',
                                        padding: '4px 8px',
                                        color: 'text.primary',
                                      },
                                      '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'divider',
                                      },
                                      '& .MuiSvgIcon-root': {
                                        color: 'text.primary',
                                      }
                                    }
                                  }
                                }}
                              />
                            </LocalizationProvider>
                          </Box>
                        ) : inputType === 'number' ? (
                          <Box>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                fontSize: '12px', 
                                fontWeight: '500', 
                                color: 'text.primary',
                                mb: 0.5,
                                display: 'block'
                              }}
                            >
                              Value
                            </Typography>
                            <TextField
                              placeholder="Enter number..."
                              type="number"
                              value={filterConditions[0].value}
                              onChange={(e) => handleFilterConditionChange(1, 'value', e.target.value)}
                              size="small"
                              fullWidth
                              sx={{
                                backgroundColor: 'background.paper',
                                '& .MuiInputBase-input': {
                                  fontSize: '12px',
                                  height: '20px',
                                  padding: '6px 8px',
                                  color: 'text.primary',
                                },
                                '& .MuiOutlinedInput-root': {
                                  height: '32px'
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'divider',
                                },
                                '& .MuiInputLabel-root': {
                                  color: 'text.primary',
                                },
                                '&::placeholder': {
                                  color: 'text.secondary',
                                }
                              }}
                            />
                          </Box>
                        ) : (
                          <Box>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                fontSize: '12px', 
                                fontWeight: '500', 
                                color: 'text.primary',
                                mb: 0.5,
                                display: 'block'
                              }}
                            >
                              Value
                            </Typography>
                            <TextField
                              placeholder={`Enter ${dataType}...`}
                              type={inputType}
                              value={filterConditions[0].value}
                              onChange={(e) => handleFilterConditionChange(1, 'value', e.target.value)}
                              size="small"
                              fullWidth
                              sx={{
                                backgroundColor: 'background.paper',
                                '& .MuiInputBase-input': {
                                  fontSize: '12px',
                                  height: '20px',
                                  padding: '6px 8px',
                                  color: 'text.primary',
                                },
                                '& .MuiOutlinedInput-root': {
                                  height: '32px'
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'divider',
                                },
                                '& .MuiInputLabel-root': {
                                  color: 'text.primary',
                                },
                                  '&::placeholder': {
                                  color: 'text.secondary',
                                }
                              }}
                            />
                          </Box>
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
                  <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                    <RdsButton
                      style="filled"
                      color="primary"
                      size="small"
                      onClick={handleApplyFilter}
                      text="Filter"
                      sx={{
                        flexGrow: 1,
                        fontSize: '11px',
                        fontWeight: 600,
                        height: '28px',
                        minWidth: '60px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        backgroundColor: 'primary.main',
                        color: 'common.white',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        },
                        borderRadius: '4px',
                        boxShadow: 'none',
                        '&:active': {
                          boxShadow: 'none',
                        }
                      }}
                    />
                    <RdsButton
                      style="outlined"
                      size="small"
                      onClick={handleClearAdvancedFilter}
                      text="Clear"
                      sx={{
                        flexGrow: 1,
                        fontSize: '11px',
                        fontWeight: 600,
                        height: '28px',
                        minWidth: '60px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        borderColor: 'divider',
                        color: 'text.secondary',
                        '&:hover': {
                          borderColor: 'divider',
                          backgroundColor: 'action.hover',
                        },
                        borderRadius: '4px',
                        boxShadow: 'none',
                        '&:active': {
                          boxShadow: 'none',
                        }
                      }}
                    />
                  </Stack>
                  
                  {/* Clear All Filters Button */}
                  {Object.keys(filterState).length > 0 && (
                    <RdsButton
                      style="transparent"
                      size="small"
                      onClick={() => {
                        setFilterState({});
                        setColumnFilterStates({});
                        onFilterChange?.({});
                        onFilterApiRequest?.({ filters: [], logicalOperator: 'AND' });
                        handleFilterPopupClose();
                      }}
                      text="Clear All Filters"
                      sx={{
                        width: '100%',
                        fontSize: '10px',
                        fontWeight: 500,
                        height: '24px',
                        mt: 1,
                        textTransform: 'uppercase',
                        letterSpacing: '0.3px',
                        color: 'error.light',
                        '&:hover': {
                          backgroundColor: 'error.light',
                          color: 'error.main',
                        },
                        borderRadius: '4px',
                        textDecoration: 'none',
                        '&:active': {
                          backgroundColor: 'error.main',
                        }
                      }}
                    />
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
});

RdsCompGrid.displayName = 'RdsCompGrid';
export default RdsCompGrid;