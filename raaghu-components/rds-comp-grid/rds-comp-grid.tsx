
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
  const [isLoading, setIsLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(props.state === State.Collpsed);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
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

  // Loader simulation
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [props.tableData]);

  // Sorting
  const handleSort = (key: string) => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    setSortColumn(key);
    const sorted = [...data].sort((a, b) => {
      if (a[key] < b[key]) return newOrder === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return newOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sorted);
  };

  // Filtering
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
    const value = e.target.value;
    setFilterValues((prev) => ({ ...prev, [key]: value }));
    const filtered = props.tableData.filter((row) =>
      row[key]?.toString().toLowerCase().includes(value.toLowerCase())
    );
    setData(filtered);
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
  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>, key: string) => {
    if (!props.resizableColumns) return;
    e.preventDefault();
    setResizingColumn(key);
    setStartX(e.clientX);
    setStartWidth(columnWidths[key] || 150);
    document.addEventListener('mousemove', handleResizeMove as any);
    document.addEventListener('mouseup', handleResizeEnd as any);
  };
  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!resizingColumn) return;
    const diff = e.clientX - startX;
    const newWidth = Math.max(100, startWidth + diff);
    setColumnWidths((prev) => ({ ...prev, [resizingColumn!]: newWidth }));
  }, [resizingColumn, startX, startWidth]);
  const handleResizeEnd = useCallback(() => {
    setResizingColumn(null);
    document.removeEventListener('mousemove', handleResizeMove as any);
    document.removeEventListener('mouseup', handleResizeEnd as any);
  }, [handleResizeMove]);
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleResizeMove as any);
      document.removeEventListener('mouseup', handleResizeEnd as any);
    };
  }, [handleResizeMove, handleResizeEnd]);

  // Collapse toggle
  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  // Pagination
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
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
            <IconButton onClick={toggleCollapse} size="small" className="rds-grid__subheader-toggle">
              <ArrowDropDown style={{ transform: isCollapsed ? 'none' : 'rotate(180deg)' }} />
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
          <Table className={clsx('rds-grid__table', { 'rds-grid__table--resizable': props.resizableColumns })}>
            <TableHead>
                        <TableRow className="rds-grid__row rds-grid__row--title" style={{ background: '#f7fafd', borderBottom: '2px solid #e0e0e0' }}>
                          {/* First two columns: empty header cells */}
                          <TableCell className={clsx('rds-grid__th', 'rds-grid__cell')} style={{ width: 48, minWidth: 48, background: '#f7fafd', borderRight: '1px solid #e0e0e0' }} />
                          <TableCell className={clsx('rds-grid__th', 'rds-grid__cell')} style={{ width: 48, minWidth: 48, background: '#f7fafd', borderRight: '1px solid #e0e0e0' }} />
              {props.tableHeaders.map((header, idx) => {
                // Use dataLength for col width if present
                const colWidth = header.dataLength ? header.dataLength * 5 : 150;
                return (
                  <TableCell
                    key={"col-title-" + header.key + idx}
                    className={clsx('rds-grid__th', 'rds-grid__cell')}
                    style={{
                      fontWeight: header.isBold ? 'bold' : 'normal',
                      fontSize: '1rem',
                      color: '#222',
                      textAlign: 'left',
                      borderRight: idx < props.tableHeaders.length - 1 ? '1px solid #e0e0e0' : 'none',
                      background: '#f7fafd',
                      minWidth: colWidth,
                      width: colWidth,
                      padding: '12px 16px',
                    }}
                  >
                    {header.displayName}
                    {/* Show required indicator if needed */}
                    {header.required && <span style={{ color: '#e53935', marginLeft: 4 }}>*</span>}
                  </TableCell>
                );
              })}
                        </TableRow>
                        <TableRow className="rds-grid__row rds-grid__row--filter" style={{ background: '#fff', borderBottom: '2px solid #e0e0e0' }}>
                          {/* First two columns: empty filter cells */}
                          <TableCell className="rds-grid__cell rds-grid__cell--filter" style={{ background: '#fff', borderRight: '1px solid #e0e0e0', minWidth: 48, padding: '10px 16px' }} />
                          <TableCell className="rds-grid__cell rds-grid__cell--filter" style={{ background: '#fff', borderRight: '1px solid #e0e0e0', minWidth: 48, padding: '10px 16px' }} />
              {props.tableHeaders.map((header, idx) => {
                const colWidth = header.dataLength ? header.dataLength * 5 : 150;
                return (
                  <TableCell key={"filter-col-" + header.key + idx} className="rds-grid__cell rds-grid__cell--filter" style={{ borderRight: idx < props.tableHeaders.length - 1 ? '1px solid #e0e0e0' : 'none', background: '#fff', minWidth: colWidth, padding: '10px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between' }}>
                      {/* Only show filter if header.filter is true */}
                      {header.filter ? (
                        <select style={{ minWidth: '120px', padding: '4px 8px', borderRadius: '6px', border: '1px solid #e0e0e0', background: '#f7fafd', color: '#888' }}>
                          <option value="">Filter...</option>
                          <option value="option1">One</option>
                          <option value="option2">Two</option>
                          <option value="option3">Three</option>
                        </select>
                      ) : null}
                      <MoreVert fontSize="small" style={{ color: '#888', marginLeft: '8px' }} />
                    </div>
                  </TableCell>
                );
              })}
                        </TableRow>

            </TableHead>
            <TableBody>
                          {props.tableData.map((row, rowIdx) => (
                            <TableRow key={`row-${rowIdx}`} className="rds-grid__row rds-grid__row--compact" style={{ background: '#f7fafd', borderBottom: rowIdx < props.tableData.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
                              {/* First column: drag handle icon */}
                              <TableCell className="rds-grid__cell rds-grid__cell--compact" style={{ width: 48, minWidth: 48, padding: '10px 0', borderRight: '1px solid #e0e0e0', background: '#f7fafd', textAlign: 'center' }}>
                                <span style={{ display: 'inline-block', color: '#cfd8dc', fontSize: '1.2rem', letterSpacing: '2px' }}>⋮⋮</span>
                              </TableCell>
                              {/* Second column: radio button */}
                              <TableCell className="rds-grid__cell rds-grid__cell--compact" style={{ width: 48, minWidth: 48, padding: '10px 0', borderRight: '1px solid #e0e0e0', background: '#f7fafd', textAlign: 'center' }}>
                                <Radio checked={false} size="small" style={{ color: '#42a5f5' }} />
                              </TableCell>
                              {props.tableHeaders.map((header, colIdx) => (
                                <TableCell key={`cell-${rowIdx}-${colIdx}`} className="rds-grid__cell rds-grid__cell--compact" style={{ padding: '10px 16px', borderRight: colIdx < props.tableHeaders.length - 1 ? '1px solid #e0e0e0' : 'none', background: '#fff', fontSize: '0.95rem', color: '#222', textAlign: 'left' }}>
                                  {row[header.key]}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
            </TableBody>
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
        </Collapse>
      )}
    </TableContainer>
  );
};

export default RdsGrid;
