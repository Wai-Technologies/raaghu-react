import React, { useState, useMemo, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
  applyFilterState,
  matchesSearch,
  sortGridData,
  paginateData,
  validateColumnValue,
  processColumnValue,
  findRowIndexInData,
  parseRowIndexFromId,
  updateRowColumnInData,
  buildFilterApiRequest,
  getOperatorsForDataType,
  getInputTypeForDataType,
  parseColumnWidth,
} from './rds-comp-grid-helpers';
import { GridHeaderCell, GridDataRow } from './rds-comp-grid-parts';
import type { DroppableProvided } from '@hello-pangea/dnd';
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
} from '@mui/icons-material';
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import { DragDropContext, Droppable, DropResult, DragStart, DragUpdate } from '@hello-pangea/dnd';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export type GridRow = Record<string, unknown>;

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
  renderCell?: (value: unknown, row: GridRow) => React.ReactNode;
  validateCell?: (value: unknown, row: GridRow) => string | null;
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
  getData: () => GridRow[];
  setData: (data: GridRow[]) => void;
  addRow: (row: GridRow) => void;
  updateRow: (rowId: string, rowData: GridRow) => void;
  deleteRow: (rowId: string) => void;
  getRow: (rowId: string) => GridRow | null;
  getSelectedRows: () => GridRow[];
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
  tableData: GridRow[];

  controlledData?: GridRow[];
  onDataChange?: (newData: GridRow[]) => void;
  
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
  
  onActionSelection?: (rowData: GridRow, actionId: string) => void;
  onRowSelect?: (data: GridRow) => void;
  onRowClick?: (rowId: string) => void;
  onPaginationHandler?: (currentPage: number, recordsPerPage: number) => void;
  onSortChange?: (sortState: SortState) => void;
  onFilterChange?: (filterState: FilterState) => void;
  onFilterApiRequest?: (filterRequest: FilterApiRequest) => void;
  onCellEdit?: (rowId: string, columnKey: string, newValue: unknown, oldValue: unknown) => void;
  onCellEditComplete?: (rowId: string, columnKey: string, newValue: unknown, isValid: boolean) => void;
  onRowSwap?: (fromIndex: number, toIndex: number, newData: GridRow[]) => void;
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
const SortableRow: React.FC<{
  id: string;
  children: React.ReactNode;
  isEnabled: boolean;
}> = ({ id, children, isEnabled }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: !isEnabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(isEnabled ? listeners : {})}
    >
      {children}
    </TableRow>
  );
};

const SortableHeaderCell: React.FC<{
  id: string;
  children: React.ReactNode;
  isEnabled: boolean;
}> = ({ id, children, isEnabled }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: !isEnabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableCell
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(isEnabled ? listeners : {})}
    >
      {children}
    </TableCell>
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
  const [tempCellValue, setTempCellValue] = useState<unknown>('');
  const [tempRowValues, setTempRowValues] = useState<{[columnKey: string]: unknown}>({});
  const [cellValidationError, setCellValidationError] = useState<string>('');
  const [rowValidationErrors, setRowValidationErrors] = useState<{[columnKey: string]: string}>({});
  
  const [columnOrder, setColumnOrder] = useState<RdsCompGridColumn[]>(tableHeaders);
  const [localTableData, setLocalTableData] = useState<GridRow[]>(tableData);
  
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
  
  const [internalData, setInternalData] = useState<GridRow[]>(tableData);
  
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

  const reorder = (list: GridRow[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: DropResult) => {
    
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

  const onDragStart = (_start: DragStart) => {
    
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
  };

  const onDragUpdate = (_update: DragUpdate) => {
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
    const sourceData = enableRowSwapping ? localTableData : currentData;
    let filtered = [...sourceData];

    if (searchValue) {
      filtered = filtered.filter((row) => matchesSearch(row, searchValue));
    }

    filtered = applyFilterState(filtered, filterState, tableHeaders);

    if (sortColumn) {
      filtered = sortGridData(filtered, sortColumn, sortDirection);
    }

    if (pagination) {
      filtered = paginateData(filtered, currentPage, recordsPerPage);
    }

    return filtered;
  }, [enableRowSwapping ? localTableData : currentData, searchValue, filterState, sortColumn, sortDirection, pagination, currentPage, recordsPerPage, visibleColumns, enableRowSwapping, localTableData, currentData, tableHeaders]);

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
        initialWidths[header.key] = parseColumnWidth(header.colWidth);
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

  const handleFilterConditionChange = (id: number, field: string, value: unknown) => {
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
        operator: filterConditions[0].operator as FilterState[string]['operator']
      };
      
      const newColumnFilterStates = { ...columnFilterStates };
      newColumnFilterStates[columnToFilter] = {
        operator: filterConditions[0].operator,
        value: filterValue
      };
      
      const filterApiRequest = buildFilterApiRequest(
        newFilterState,
        tableHeaders,
        sortColumn,
        sortDirection,
        currentPage,
        recordsPerPage
      );
      
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
      
      const filterApiRequest = buildFilterApiRequest(
        newFilterState,
        tableHeaders,
        sortColumn,
        sortDirection,
        currentPage,
        recordsPerPage
      );
      
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

  const handleRowSelect = (rowId: string, rowData: GridRow) => {
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

  const handleCellEditStart = (rowId: string, columnKey: string, currentValue: unknown) => {
    if (!enableInlineEdit) return;
    
    const column = tableHeaders.find(h => h.key === columnKey);
    if (!column?.isEditable) return;
    
    setEditingCell({ rowId, columnKey });
    setTempCellValue(currentValue);
    setCellValidationError('');
  };

  const handleCellEditSave = (rowId: string, columnKey: string, newValue: unknown) => {
    const column = tableHeaders.find(h => h.key === columnKey);
    if (!column) return;

    const validationError = validateColumnValue(column, newValue, rowId);
    if (validationError) {
      setCellValidationError(validationError);
      return;
    }

    const processedValue = processColumnValue(column, newValue);
    const rowIndex = findRowIndexInData(currentData, rowId);
    const originalValue = rowIndex >= 0 ? currentData[rowIndex][columnKey] : null;

    const updatedData = updateRowColumnInData(currentData, rowId, columnKey, processedValue);
    if (controlledData && onDataChange) {
      onDataChange(updatedData);
    } else {
      setInternalData(updatedData);
    }

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

  const handleCellValueChange = (newValue: unknown) => {
    setTempCellValue(newValue);
    setCellValidationError(''); 
  };

  const handleRowEditStart = (rowId: string, rowData: GridRow) => {
    if (!enableInlineEdit || inlineEditMode !== 'row') return;

    setEditingRow(rowId);
    const editableColumns = tableHeaders.filter(h => h.isEditable);
    const initialValues: {[columnKey: string]: unknown} = {};
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
      const error = validateColumnValue(column, value, rowId);

      if (error) {
        validationErrors[column.key] = error;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setRowValidationErrors(validationErrors);
      return;
    }

    const updatedData = [...currentData];
    const rowIndex = findRowIndexInData(currentData, rowId);
    
    if (rowIndex === -1 || rowIndex >= currentData.length) {
      console.error('Row not found in currentData. rowId:', rowId, 'currentData.length:', currentData.length);
      return;
    }
    
    const updatedRow = { ...currentData[rowIndex] };
    
    editableColumns.forEach(column => {
      const value = tempRowValues[column.key];
      const processedValue = processColumnValue(column, value);
      const originalValue = currentData[rowIndex][column.key];

      updatedRow[column.key] = processedValue;

      onCellEdit?.(rowId, column.key, processedValue, originalValue);
      onCellEditComplete?.(rowId, column.key, processedValue, true);
    });

    updatedData[rowIndex] = updatedRow;

    if (controlledData && onDataChange) {
      onDataChange(updatedData);
    } else {
      setInternalData(updatedData);
    }

    setEditingRow(null);
    setTempRowValues({});
    setRowValidationErrors({});
  };

  const handleRowEditCancel = () => {
    setEditingRow(null);
    setTempRowValues({});
    setRowValidationErrors({});
  };

  const handleRowValueChange = (columnKey: string, newValue: unknown) => {
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

  const handleStopEditing = () => {
    if (editingCell) {
      handleCellEditCancel();
    }
    if (editingRow) {
      handleRowEditCancel();
    }
  };

  useImperativeHandle(ref, () => ({
    getData: () => currentData,
    setData: (data: GridRow[]) => {
      if (controlledData && onDataChange) {
        onDataChange(data);
      } else {
        setInternalData(data);
      }
    },
    addRow: (row: GridRow) => {
      const newData = [...currentData, row];
      if (controlledData && onDataChange) {
        onDataChange(newData);
      } else {
        setInternalData(newData);
      }
    },
    updateRow: (rowId: string, rowData: GridRow) => {
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
        const index = parseRowIndexFromId(rowId);
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
    stopEdit: handleStopEditing,
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
    handleStopEditing,
    getVisibleHeaders,
    tableRef,
    getRowById
  ]);

  const totalPages = Math.ceil(tableData.length / recordsPerPage);
  const activeFiltersCount = Object.keys(filterState).length + (searchValue ? 1 : 0);
  const rowVisibleHeaders = enableColumnSwapping
    ? columnOrder.filter((header) => visibleColumns.includes(header.key))
    : getVisibleHeaders();
  const showActionButtonsDirectly = actionColumnStyle === ActionColumnStyle.ShowButtonsDirectly;

  const handleSelectAllRows = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(processedData.map((_, index) => `row-${index}`)));
      return;
    }
    setSelectedRows(new Set());
  };

  const renderDroppableBody = (provided: DroppableProvided) => (
    <TableBody {...provided.droppableProps} ref={provided.innerRef}>
      {processedData.map((row, index) => {
        const rowId = `row-${index}`;
        return (
          <GridDataRow
            key={rowId}
            row={row}
            index={index}
            rowId={rowId}
            isSelected={selectedRows.has(rowId)}
            isRowEditing={editingRow === rowId}
            enableRowSwapping={enableRowSwapping}
            enableCheckboxSelection={enableCheckboxSelection}
            enableRadioButtonSelection={enableRadioButtonSelection}
            enableInlineEdit={enableInlineEdit}
            inlineEditMode={inlineEditMode}
            visibleHeaders={rowVisibleHeaders}
            columnWidths={columnWidths}
            editingCell={editingCell}
            editingRow={editingRow}
            tempCellValue={tempCellValue}
            tempRowValues={tempRowValues}
            cellValidationError={cellValidationError}
            rowValidationErrors={rowValidationErrors}
            actions={actions}
            showActionButtonsDirectly={showActionButtonsDirectly}
            onRowClick={onRowClick}
            onRowSelect={handleRowSelect}
            onCellEditStart={handleCellEditStart}
            onCellEditSave={handleCellEditSave}
            onCellEditCancel={handleCellEditCancel}
            onCellValueChange={handleCellValueChange}
            onRowValueChange={handleRowValueChange}
            onRowEditStart={handleRowEditStart}
            onRowEditSave={handleRowEditSave}
            onRowEditCancel={handleRowEditCancel}
            onActionSelection={onActionSelection}
          />
        );
      })}
      {provided.placeholder}
    </TableBody>
  );

  const renderAdvancedFilterControls = () => {
    const selectedColumn = tableHeaders.find((h) => h.key === selectedColumnForFilter);
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
              display: 'block',
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
              '& .MuiOutlinedInput-notchedOutline': { borderWidth: 1, borderColor: 'divider' },
              '& .MuiSvgIcon-root': { color: 'text.primary' },
              '& .MuiSelect-icon': { color: 'text.primary' },
            }}
          >
            {operators.map((op) => (
              <MenuItem
                key={op.value}
                value={op.value}
                sx={{
                  fontSize: '12px',
                  color: 'text.primary',
                  '&.Mui-selected': { backgroundColor: 'action.selected' },
                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                {op.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {inputType === 'date' ? (
          <Box onMouseDown={(e) => e.stopPropagation()}>
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
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
                      '& .MuiSvgIcon-root': { color: 'text.primary' },
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
        ) : inputType === 'number' ? (
          <Box>
            <Typography variant="caption" sx={{ fontSize: '12px', fontWeight: '500', color: 'text.primary', mb: 0.5, display: 'block' }}>
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
                '& .MuiInputBase-input': { fontSize: '12px', height: '20px', padding: '6px 8px', color: 'text.primary' },
                '& .MuiOutlinedInput-root': { height: '32px' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
                '& .MuiInputLabel-root': { color: 'text.primary' },
                '&::placeholder': { color: 'text.secondary' },
              }}
            />
          </Box>
        ) : (
          <Box>
            <Typography variant="caption" sx={{ fontSize: '12px', fontWeight: '500', color: 'text.primary', mb: 0.5, display: 'block' }}>
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
                '& .MuiInputBase-input': { fontSize: '12px', height: '20px', padding: '6px 8px', color: 'text.primary' },
                '& .MuiOutlinedInput-root': { height: '32px' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' },
                '& .MuiInputLabel-root': { color: 'text.primary' },
                '&::placeholder': { color: 'text.secondary' },
              }}
            />
          </Box>
        )}
      </Box>
    );
  };

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
                <IconButton size="small" aria-label="More options">
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
              <IconButton size="small" aria-label="More options">
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
                  borderRadius: 'var(--rds-border-radius-sm)',
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
              <IconButton size="small" aria-label="More options">
                <MoreIcon />
              </IconButton>
            </Stack>
            <IconButton size="small" onClick={toggleCollapse} aria-label={isCollapsed ? "Expand section" : "Collapse section"}>
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
                      padding: 'var(--rds-spacing-sm-px)',
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
                      onChange={(e) => handleSelectAllRows(e.target.checked)}
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
                
                                {getVisibleHeaders().map((header, index) => (
                  <GridHeaderCell
                    key={header.key}
                    header={header}
                    index={index}
                    enableColumnSwapping={enableColumnSwapping}
                    isSort={isSort}
                    isFilter={isFilter}
                    customDragState={customDragState}
                    columnWidths={columnWidths}
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    filterState={filterState}
                    isResizing={isResizing}
                    resizingColumn={resizingColumn}
                    filterButtonRef={filterButtonRef}
                    onCustomDragStart={handleCustomDragStart}
                    onCustomDragOver={handleCustomDragOver}
                    onCustomDragEnd={handleCustomDragEnd}
                    onCustomDragLeave={handleCustomDragLeave}
                    onSort={handleSort}
                    onFilterIconClick={handleFilterIconClick}
                    onResizeStart={handleResizeStart}
                  />
                ))}
                
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
              {renderDroppableBody}
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
            <IconButton size="small" onClick={handleFilterPopupClose} aria-label="Close filter" sx={{ width: '20px', height: '20px' }}>
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
                  {renderAdvancedFilterControls()}

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
                        borderRadius: 'var(--rds-border-radius-sm)',
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
                        borderRadius: 'var(--rds-border-radius-sm)',
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
                        borderRadius: 'var(--rds-border-radius-sm)',
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