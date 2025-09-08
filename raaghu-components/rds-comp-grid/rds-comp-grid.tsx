import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Radio,
  IconButton,
  Collapse,
  CircularProgress,
  Tooltip,
  TextField,
  Menu,
  MenuItem,
  Avatar,
  Button,
  TableSortLabel,
  Pagination,
} from "@mui/material";
import { ArrowDropDown, ArrowDropUp, MoreVert, Add, FilterList, Sort, Visibility, Person, Save, Close } from "@mui/icons-material";
import clsx from "clsx";
import "./rds-comp-grid.scss";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export enum ActionPosition {
  Right = "right",
  Left = "left",
}
export enum State {
  Default = "default",
  Collpsed = "collpsed",
}
export enum ActionColumnStyle {
  ShowDots = "show dots",
  ShowButtonsDirectly = "show buttons directly",
}

export interface RdsGridProps {
  fontWeight?: string;
  enablecheckboxselection?: boolean;
  enableRadioButtonselection?: boolean;
  illustration?: boolean;
  noDataTitle?: string;
  noDataheaderTitle?: string;
  classes?: string;
  swapRows?: any;
  options?: any;
  isSwap?: any;
  tableHeaders: {
    displayName: string;
    key: string;
    datatype: string;
    dataLength?: number;
    required?: boolean;
    sortable?: boolean;
    colWidth?: string;
    disabled?: boolean;
    isEndUserEditing?: boolean;
    isBold?: boolean;
    fontWeight?: string;
    filter?: boolean;
    resizable?: boolean;
    showHeader?: boolean;
    showsubHeader?: boolean;
    showShuffleIcon?: boolean;
    showAddNewColumn?: boolean;
  }[];
  resizableColumns?: boolean;
  actions?: {
    displayName: string;
    id: string;
    offId?: string;
    modalId?: string;
  }[];
  tableData: any[];
  pagination?: boolean;
  isClickable?: boolean;
  recordsPerPage?: number;
  recordsPerPageSelectListOption?: boolean;
  onActionSelection?: (rowData: any, actionId: any) => void;
  onRowSelect?: (data: any) => void;
  onRowClick?: (rowId: any) => void;
  actionPosition?: ActionPosition;
  onPaginationHandler?: (currentPage: number, recordsPerPage: number) => void;
  totalRecords?: any;
  actionColumnStyle?: ActionColumnStyle;
  /**
   * Controls visibility of the subheader below the main header. Default: true
   */
  showSubHeader?: boolean;
  showHeader?: boolean;
  showAddNewColumn?: boolean;
  state?: string;
  collapsed?: boolean;
}

const RdsGrid = (props: RdsGridProps) => {
  // State setup
  const [data, setData] = useState(props.tableData);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    // Prefer explicit boolean `collapsed` prop when provided by story args
    if (typeof props.collapsed === 'boolean') return props.collapsed;
    // Fallback to older `state` prop value
    return props.state === State.Collpsed;
  });
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
    // Default resizableColumns to false if not provided
    const resizableColumns = props.resizableColumns ?? false;
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [startX, setStartX] = useState<number>(0);
  const [startWidth, setStartWidth] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showAvatar, setShowAvatar] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [showHideColumns, setShowHideColumns] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = props.recordsPerPage || 10;
  const [headers, setHeaders] = useState(props.tableHeaders);

  // Loader simulation
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [props.tableData]);

  // Sync collapsed state when parent/story controls change props
  useEffect(() => {
    if (typeof props.collapsed === 'boolean') {
      setIsCollapsed(props.collapsed);
      return;
    }
    // If collapsed prop isn't provided, respect `state` prop
    setIsCollapsed(props.state === State.Collpsed);
  }, [props.collapsed, props.state]);

  // Sorting
  const handleSort = (key: string) => {
    let newOrder: 'asc' | 'desc' = 'asc';
    if (sortColumn === key) {
      newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    }
    setSortOrder(newOrder);
    setSortColumn(key);
    const sorted = [...data].sort((a, b) => {
      if (a[key] < b[key]) return newOrder === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return newOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sorted);
  };

  // Filtering (supports both text and select)
  const handleFilterChange = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
    let filtered = props.tableData;
    Object.entries({ ...filterValues, [key]: value }).forEach(([k, v]) => {
      if (v) {
        filtered = filtered.filter((row) => row[k]?.toString().toLowerCase().includes(v.toLowerCase()));
      }
    });
    setData(filtered);
  };

  // Inline editing
  const handleCellEdit = (rowIdx: number, key: string, value: string) => {
    const updated = [...data];
    updated[rowIdx] = { ...updated[rowIdx], [key]: value };
    setData(updated);
  };

  // Utility: get unique values for select filter
  const getUniqueValues = (key: string) => {
    return Array.from(new Set(props.tableData.map(row => row[key])));
  };

  // Search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const filtered = props.tableData.filter((row) =>
      Object.values(row).some((val) =>
        val?.toString().toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setData(filtered);
  };

  // Resizable columns
  // Use refs for mouse events to avoid stale closures
  const resizingRef = useRef<string | null>(null);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(0);

  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>, key: string) => {
    const header = headers.find(h => h.key === key);
    if (!resizableColumns || !header?.resizable) return;
    e.preventDefault();
    resizingRef.current = key;
    startXRef.current = e.clientX;
    startWidthRef.current = columnWidths[key] || 150;
    document.body.style.cursor = 'col-resize';
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  const handleResizeMove = (e: MouseEvent) => {
    const key = resizingRef.current;
    if (!key) return;
    const diff = e.clientX - startXRef.current;
    const newWidth = Math.max(100, startWidthRef.current + diff);
    setColumnWidths(prev => {
      // Only update the currently resizing column
      return { ...prev, [key]: newWidth };
    });
  };

  const handleResizeEnd = () => {
    resizingRef.current = null;
    document.body.style.cursor = '';
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
      document.body.style.cursor = '';
    };
  }, []);

  // Collapse toggle
  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  // Pagination
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Helper to reorder array
  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // Drag end handler for both rows and columns
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    if (result.type === 'ROW') {
      setData(reorder(data, result.source.index, result.destination.index));
    } else if (result.type === 'COL') {
      setHeaders(reorder(headers, result.source.index, result.destination.index));
    }
  };

  // Render
  return (
    <TableContainer component={Paper} className={clsx('rds-grid', props.classes)}>
      {/* Header and controls */}
      {props.showHeader !== false && (
        <div className="rds-grid__header">
          <div className="rds-grid__header-search">
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search"
              value={searchValue}
              onChange={handleSearchChange}
              InputProps={{ endAdornment: <Person className="rds-grid__header-search-icon" /> }}
              className="rds-grid__header-search-input"
            />
          </div>
          <div className="rds-grid__header-controls">
            <Button startIcon={<Add />} className="rds-grid__header-btn">
              Add New
            </Button>
            <Button startIcon={<Person />} className="rds-grid__header-btn">
              Person
            </Button>
            <Button startIcon={<FilterList />} className="rds-grid__header-btn">
              Filters
            </Button>
            <Button startIcon={<Sort sx={{ transform: 'rotate(90deg)' }} />} className="rds-grid__header-btn">
              Sort
            </Button>
            <Button startIcon={<Visibility />} className="rds-grid__header-btn">
              Hide
            </Button>
            <Button startIcon={<MoreVert sx={{ fontSize: '1.25rem' }} />} className="rds-grid__header-btn">
              More
            </Button>
          </div>
        </div>
      )}
      {/* Subheader below header, left-aligned, not full width */}
      {(props.showSubHeader === undefined || props.showSubHeader) && (
        <div className="rds-grid__subheader-wrapper">
          <div className="rds-grid__subheader">
            <div className="rds-grid__subheader-left">
              <span className="rds-grid__subheader-title">{props.noDataheaderTitle || 'Title'}</span>
              <MoreVert className="rds-grid__subheader-dots" />
            </div>
            <IconButton onClick={toggleCollapse} size="small" className="rds-grid__subheader-toggle" aria-label={isCollapsed ? 'expand' : 'collapse'}>
              {isCollapsed ? <ArrowDropDown /> : <ArrowDropUp />}
            </IconButton>
          </div>
        </div>
      )}
      {/* Loader */}
      {isLoading ? (
        <div className="rds-grid__loader" style={{ textAlign: 'center', padding: '2rem' }}>
          <CircularProgress />
        </div>
      ) : (
        <Collapse in={!isCollapsed}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Table className={clsx('rds-grid__table', { 'rds-grid__table--resizable': props.resizableColumns })}>
              <TableHead>
                <Droppable droppableId="droppable-header" direction="horizontal" type="COL">
                  {(provided) => (
                    <TableRow
                      className="rds-grid__row rds-grid__row--title"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {/* First two columns: empty header cells */}
                      <TableCell className={clsx('rds-grid__th', 'rds-grid__cell')}
                       sx = {{ width: 48, minWidth: 48, }} 
                       />
                      <TableCell className={clsx('rds-grid__th', 'rds-grid__cell')} sx={{ width: 48, minWidth: 48}} />
                      {headers.map((header, idx) => {
                        // Use columnWidths if set, else fallback to dataLength or default
                        const colWidth = columnWidths[header.key] ?? (header.dataLength ? header.dataLength * 5 : 150);
                        const isResizable = resizableColumns && header.resizable;
                         return (
                           <Draggable key={header.key} draggableId={header.key} index={idx}>
                             {(dragProvided, dragSnapshot) => (
                               <TableCell
                                 ref={dragProvided.innerRef}
                                 {...dragProvided.draggableProps}
                                 className={clsx('rds-grid__th', 'rds-grid__cell', { 'rds-grid__th--resizable': isResizable })}
                                 sx={{
                                   ...dragProvided.draggableProps.style,
                                   fontWeight: header.isBold ? 'bold' : 'normal',
                                   fontSize: '1rem',
                                   color: '#222',
                                   textAlign: 'left',
                                   borderRight: idx < headers.length - 1 ? '1px solid #e0e0e0' : 'none',
                                   background: dragSnapshot.isDragging ? '#e3f2fd' : '#f7fafd',
                                   minWidth: colWidth,
                                   width: colWidth,
                                   padding: '12px 16px',
                                   cursor: header.sortable ? 'pointer' : 'default',
                                   position: 'relative',
                                 }}
                               >
                                 <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                   <span className="rds-grid__drag-icon" {...dragProvided.dragHandleProps} style={{ cursor: 'grab', color: '#1976d2', marginRight: 4 }}>≡</span>
                                   {header.displayName}
                                   {header.required && <span style={{ color: '#e53935', marginLeft: 4 }}>*</span>}
                                   {header.sortable && (
                                     <TableSortLabel
                                       active={sortColumn === header.key}
                                       direction={sortColumn === header.key ? sortOrder : 'asc'}
                                       onClick={() => handleSort(header.key)}
                                       sx={{ marginLeft: 1 }}
                                     />
                                   )}
                                 </span>
                                 {/* Pixel-perfect resizer indicator and handle at bottom-right if enabled */}
                                 {isResizable && (
                                   <span style={{ position: 'absolute', right: 0, bottom: 0, zIndex: 2, display: 'flex', alignItems: 'flex-end', height: '20px', width: '20px', pointerEvents: 'none' }}>
                                     {/* Crisp angled lines icon for resizable indicator */}
                                     <svg width="20" height="20" viewBox="0 0 20 20" style={{ display: 'block', pointerEvents: 'none' }}>
                                       <line x1="8" y1="18" x2="18" y2="8" stroke="#888" strokeWidth="2" />
                                       <line x1="12" y1="18" x2="18" y2="12" stroke="#888" strokeWidth="2" />
                                     </svg>
                                     {/* Enlarged invisible handle for easier interaction */}
                                     <div
                                       className="rds-grid__column-resizer"
                                       onMouseDown={e => handleResizeStart(e, header.key)}
                                       style={{ position: 'absolute', right: 0, bottom: 0, width: 20, height: 20, cursor: 'col-resize', zIndex: 3, background: 'transparent', pointerEvents: 'auto' }}
                                     />
                                   </span>
                                 )}
                               </TableCell>
                             )}
                           </Draggable>
                         );
                      })}
                      {provided.placeholder}
                    </TableRow>
                  )}
                </Droppable>
                {/* Filter row (use headers for order) */}
                <TableRow className="rds-grid__row rds-grid__row--filter">
                  <TableCell className="rds-grid__cell rds-grid__cell--filter rds-grid__cell--filter-empty" />
                  <TableCell className="rds-grid__cell rds-grid__cell--filter rds-grid__cell--filter-empty" />
                  {headers.map((header, idx) => {
                    const colWidth = header.dataLength ? header.dataLength * 5 : 150;
                    return (
                      <TableCell
                        key={"filter-col-" + header.key + idx}
                        className={
                          `rds-grid__cell rds-grid__cell--filter${idx < headers.length - 1 ? ' rds-grid__cell--filter-border' : ''}`
                        }
                        style={{ minWidth: colWidth }}
                      >
                        <div className="rds-grid__filter-content">
                          {/* Only show filter if header.filter is true */}
                          {header.filter ? (
                            <select
                              className={`rds-grid__filter-select ${!filterValues[header.key] ? 'rds-grid__filter-select--placeholder' : ''}`}
                              aria-label={`Filter ${header.displayName}`}
                              onChange={e => handleFilterChange(header.key, e.target.value)}
                            >
                              <option value="">Filter...</option>
                              {getUniqueValues(header.key).map((option, i) => (
                                <option key={option + i} value={option}>{option}</option>
                              ))}
                            </select>
                          ) : null}
                          <MoreVert fontSize="small" className="rds-grid__filter-icon" />
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <Droppable droppableId="droppable-body" type="ROW">
                {(provided) => (
                  <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                    {data.map((row, rowIdx) => (
                      <Draggable key={row.id ?? rowIdx} draggableId={String(row.id ?? rowIdx)} index={rowIdx}>
                        {(dragProvided, dragSnapshot) => (
                          <TableRow
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            className={`rds-grid__row rds-grid__row--compact${dragSnapshot.isDragging ? ' rds-grid__row--dragging' : ''}`}
                          >
                            {/* First column: drag handle icon */}
                            <TableCell className="rds-grid__cell rds-grid__cell--compact rds-grid__cell--compact-drag" {...dragProvided.dragHandleProps}>
                              <span className="rds-grid__drag-icon">⋮⋮</span>
                            </TableCell>
                            {/* Second column: radio button */}
                            <TableCell className="rds-grid__cell rds-grid__cell--compact rds-grid__cell--compact-radio">
                              <Radio checked={false} size="small" className="rds-grid__radio" />
                            </TableCell>
                            {headers.map((header, colIdx) => (
                               <TableCell
                                 key={`cell-${rowIdx}-${colIdx}`}
                                 className={`rds-grid__cell rds-grid__cell--compact${colIdx < headers.length - 1 ? ' rds-grid__cell--compact-border' : ''}`}
                                 style={{
                                   minWidth: columnWidths[header.key] ?? (header.dataLength ? header.dataLength * 5 : 150),
                                   width: columnWidths[header.key] ?? (header.dataLength ? header.dataLength * 5 : 150)
                                 }}
                               >
                                 {row[header.key]}
                               </TableCell>
                            ))}
                          </TableRow>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </TableBody>
                )}
              </Droppable>
            </Table>
            {/* Pagination */}
            {props.pagination && (
              <div className="rds-grid__pagination">
                <Pagination
                  count={Math.ceil(data.length / rowsPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </div>
            )}
          </DragDropContext>
        </Collapse>
      )}
    </TableContainer>
  );
};
RdsGrid.displayName = 'RdsGrid';
export default RdsGrid;
