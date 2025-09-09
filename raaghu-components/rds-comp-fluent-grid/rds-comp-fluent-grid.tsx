import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  Button,
  Text,
  Spinner,
  Input,
} from '@fluentui/react-components';
import {
  ArrowUpRegular,
  ArrowDownRegular,
  FilterRegular,
  MoreHorizontalRegular,
  AddRegular,
  PersonRegular,
  EyeRegular,
  DismissRegular,
} from '@fluentui/react-icons';
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

// Styles will be handled by CSS classes in the SCSS file

const RdsFluentGrid: React.FC<RdsFluentGridProps> = (props) => {
  const {
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
    pageSizeOptions = [10, 25, 50, 100],
    showRecordsPerPage = true,
    onActionSelection,
    onRowSelect,
    onRowClick,
    onPaginationHandler,
    onSortChange,
    onFilterChange,
  onFilterApiRequest,
    onColumnVisibilityChange,
    classes,
    fontWeight,
    illustration = false,
    noDataTitle = 'No data available',
    noDataHeaderTitle = 'Data Grid',
    theme = 'light',
    isLoading = false,
  } = props;
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
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [selectedColumnForFilter, setSelectedColumnForFilter] = useState<string | null>(null);
  const [isColumnPanelExpanded, setIsColumnPanelExpanded] = useState(false);
  const [tempFilterValue, setTempFilterValue] = useState<string>('');
  const [tempFilterOperator, setTempFilterOperator] = useState<string>('contains');
  const [columnFilterStates, setColumnFilterStates] = useState<{[columnKey: string]: {operator: string, value: string}}>({});
  const filterButtonRef = useRef<HTMLButtonElement>(null);

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

  // Filter and sort data
  const filteredData = useMemo(() => {
    let filtered = [...tableData];

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
  }, [tableData, sortColumn, sortDirection, filterState]);

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

  const clearAllFilters = () => {
    setFilterState({});
    onFilterChange?.({});
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
      
      const filterApiRequest: FilterApiRequest = {
        filters: activeFilters,
        logicalOperator: 'AND',
        page: currentPage,
        pageSize: recordsPerPage,
        sortBy: sortColumn || undefined,
        sortDirection: sortColumn ? (sortDirection === 'asc' ? 'ASC' : 'DESC') : undefined
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

  const currentTheme = theme === 'dark' ? webDarkTheme : webLightTheme;

  if (isLoading) {
    return (
      <FluentProvider theme={currentTheme}>
        <div className={`rds-fluent-grid-container ${classes || ''}`}>
          <div className="rds-fluent-grid-loader">
            <Spinner size="large" />
          </div>
        </div>
      </FluentProvider>
    );
  }

  if (tableData.length === 0) {
    return (
      <FluentProvider theme={currentTheme}>
        <div className={`rds-fluent-grid-container ${classes || ''}`}>
          {showHeader && (
            <div className="rds-fluent-grid-header">
              <div className="rds-fluent-grid-header-controls">
                <Button icon={<AddRegular />}>Add New</Button>
                <Button icon={<PersonRegular />}>Person</Button>
                <Button icon={<FilterRegular />}>Filters</Button>
                <Button icon={<ArrowUpRegular />}>Sort</Button>
                <Button icon={<EyeRegular />}>Hide</Button>
                <Button icon={<MoreHorizontalRegular />}>More</Button>
              </div>
            </div>
          )}
          <div className="rds-fluent-grid-empty-state">
            <Text className="rds-fluent-grid-empty-state-title">{noDataTitle}</Text>
            <Text className="rds-fluent-grid-empty-state-description">
              No data available to display
            </Text>
          </div>
        </div>
      </FluentProvider>
    );
  }

  return (
    <FluentProvider theme={currentTheme}>
      <div className={`rds-fluent-grid-container ${classes || ''}`}>
        {showHeader && (
          <div className="rds-fluent-grid-header">
            <div className="rds-fluent-grid-header-controls">
              <Button icon={<AddRegular />}>Add New</Button>
              <Button icon={<PersonRegular />}>Person</Button>
              <Button icon={<FilterRegular />}>Filters</Button>
              <Button icon={<ArrowUpRegular />}>Sort</Button>
              <Button icon={<EyeRegular />}>Hide</Button>
              <Button icon={<MoreHorizontalRegular />}>More</Button>
              {/* Test button for popup */}
              <Button
                appearance="primary"
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
              <Text className="rds-fluent-grid-sub-header-title">
                {noDataHeaderTitle}
              </Text>
              <MoreHorizontalRegular className="rds-fluent-grid-sub-header-dots" />
            </div>
            <Button
              appearance="subtle"
              icon={isCollapsed ? <ArrowDownRegular /> : <ArrowUpRegular />}
              onClick={toggleCollapse}
              className="rds-fluent-grid-sub-header-toggle"
            />
          </div>
        )}

        {!isCollapsed && (
          <>
            <table className="rds-fluent-grid-table">
              <thead>
                <tr>
                  {/* Selection column */}
                  {(enableCheckboxSelection || enableRadioButtonSelection) && (
                    <th className="rds-fluent-grid-header-cell">
                      {enableCheckboxSelection ? 'Select All' : 'Select'}
                    </th>
                  )}
                  
                  {/* Data columns */}
                  {getVisibleHeaders().map((header) => (
                    <th
                      key={header.key}
                      className="rds-fluent-grid-header-cell"
                      style={{
                        minWidth: header.minWidth || 100,
                        maxWidth: header.maxWidth || 300,
                        cursor: isSort && header.isSort ? 'pointer' : 'default',
                      }}
                      onClick={() => isSort && header.isSort && handleSort(header.key)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Text weight={header.isBold ? 'semibold' : 'regular'}>
                          {header.name}
                        </Text>
                        {header.required && (
                          <Text style={{ color: '#d13438' }}>*</Text>
                        )}
                        {isSort && header.isSort && (
                          <ArrowUpRegular className="rds-fluent-grid-sort-icon" />
                        )}
                        {isFilter && header.isFilter && (
                          <div className="rds-fluent-grid-filter-container">
                            <Button
                              ref={filterButtonRef}
                              appearance="subtle"
                              size="small"
                              icon={<FilterRegular />}
                              className={`rds-fluent-grid-filter-icon ${filterState[header.key]?.value ? 'rds-fluent-grid-filter-icon-active' : ''}`}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log('Filter icon clicked for column:', header.key);
                                handleFilterIconClick(header.key);
                              }}
                              style={{ 
                                color: filterState[header.key]?.value ? '#0078d4' : '#666',
                                backgroundColor: filterState[header.key]?.value ? '#e6f3ff' : 'transparent'
                              }}
                            />
                            {isFilterPopupOpen && (
                              <div className="rds-fluent-grid-filter-popup">
                                <div className="rds-fluent-grid-filter-popup-header">
                                  <Text weight="semibold" size={100}>Controls</Text>
                                  <Button
                                    appearance="subtle"
                                    size="small"
                                    icon={<DismissRegular />}
                                    onClick={handleFilterPopupClose}
                                    style={{ minWidth: '16px', height: '16px', padding: '0' }}
                                  />
                                </div>
                                
                                {/* Column Visibility Toggle */}
                                <div style={{ marginBottom: '2px' }}>
                                  <Button
                                    appearance="subtle"
                                    size="small"
                                    onClick={handleColumnPanelToggle}
                                    style={{ 
                                      fontSize: '8px', 
                                      padding: '1px 2px',
                                      height: '16px',
                                      width: '100%'
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
                                            gap: '2px',
                                            padding: '1px',
                                            fontSize: '8px'
                                          }}
                                        >
                                          <input
                                            type="checkbox"
                                            checked={visibleColumns.includes(col.key)}
                                            onChange={(e) => handleColumnVisibilityChange(col.key, e.target.checked)}
                                            style={{ width: '10px', height: '10px' }}
                                          />
                                          <span style={{ fontSize: '8px' }}>{col.name}</span>
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
                                              <select
                                            value={tempFilterOperator}
                                            onChange={(e) => {
                                              setTempFilterOperator(e.target.value);
                                              // No real-time filtering - only update when FILTER button is clicked
                                            }}
                                            style={{ 
                                              marginBottom: '2px', 
                                              width: '100%', 
                                              fontSize: '9px', 
                                              padding: '1px',
                                              height: '18px'
                                            }}
                                              >
                                                <option value="contains">Contains</option>
                                                <option value="equals">Equals</option>
                                                <option value="startsWith">Starts with</option>
                                                <option value="endsWith">Ends with</option>
                                              </select>
                                          <Input
                                            placeholder="Value..."
                                            value={tempFilterValue}
                                            onChange={(_, data) => handleTempFilterChange(data.value)}
                                            size="small"
                                            style={{ 
                                              marginBottom: '2px', 
                                              fontSize: '9px',
                                              height: '18px'
                                            }}
                                          />
                                          <div style={{ display: 'flex', gap: '2px' }}>
                                            <Button
                                              appearance="primary"
                                              size="small"
                                              onClick={() => {
                                                handleApplyFilter();
                                                handleFilterPopupClose();
                                              }}
                                              style={{ 
                                                flex: 1, 
                                                fontSize: '8px', 
                                                padding: '1px 2px',
                                                height: '16px',
                                                minWidth: '0'
                                              }}
                                            >
                                              FILTER
                                            </Button>
                                            <Button
                                              appearance="secondary"
                                              size="small"
                                              onClick={() => {
                                                handleClearFilter();
                                                handleFilterPopupClose();
                                              }}
                                              style={{ 
                                                flex: 1, 
                                                fontSize: '8px', 
                                                padding: '1px 2px',
                                                height: '16px',
                                                minWidth: '0'
                                              }}
                                            >
                                              CLEAR
                                            </Button>
                                          </div>
                                          
                                          {/* Clear All Filters Button */}
                                          {Object.keys(filterState).length > 0 && (
                                            <Button
                                              appearance="subtle"
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
                                                fontSize: '7px',
                                                height: '14px',
                                                marginTop: '2px',
                                                color: '#d32f2f'
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
                    </th>
                  ))}
                  
                  {/* Actions column */}
                  {actions.length > 0 && (
                    <th className="rds-fluent-grid-header-cell">Actions</th>
                  )}
                </tr>
              </thead>
              
              <tbody>
                {paginatedData.map((row, index) => {
                  const rowId = row.id || index.toString();
                  const isSelected = selectedRows.has(rowId);
                  
                  return (
                    <tr
                      key={rowId}
                      className={`rds-fluent-grid-row ${isSelected ? 'rds-fluent-grid-row-selected' : ''}`}
                      style={{
                        backgroundColor: isSelected ? '#e6f3ff' : undefined,
                      }}
                    >
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
                      {getVisibleHeaders().map((header) => (
                        <td
                          key={header.key}
                          className="rds-fluent-grid-cell"
                          style={{
                            minWidth: header.minWidth || 100,
                            maxWidth: header.maxWidth || 300,
                          }}
                        >
                          <Text>{row[header.key]}</Text>
                        </td>
                      ))}
                      
                      {/* Actions cell */}
                      {actions.length > 0 && (
                        <td className="rds-fluent-grid-cell">
                          <div style={{ display: 'flex', gap: '4px' }}>
                            {actionColumnStyle === ActionColumnStyle.ShowButtonsDirectly ? (
                              actions.map((action) => (
                                <Button
                                  key={action.id}
                                  size="small"
                                  appearance="subtle"
                                  onClick={() => onActionSelection?.(row, action.id)}
                                  className="rds-fluent-grid-action-button"
                                >
                                  {action.displayName}
                                </Button>
                              ))
                            ) : (
                              <Button
                                size="small"
                                appearance="subtle"
                                icon={<MoreHorizontalRegular />}
                                className="rds-fluent-grid-action-button"
                                onClick={() => {
                                  const action = actions[0];
                                  onActionSelection?.(row, action.id);
                                }}
                              />
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
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
    </FluentProvider>
  );
};

// RdsFluentGrid.displayName = 'RdsFluentGrid';
export default RdsFluentGrid;