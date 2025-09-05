import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  Button,
  Text,
  Spinner,
  Input,
  Checkbox,
  Divider,
} from '@fluentui/react-components';
import {
  ArrowUpRegular,
  ArrowDownRegular,
  ArrowSortRegular,
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
    operator: 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan';
  };
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
          if (!filter.value) return true;
          
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
    if (value) {
      newFilterState[columnKey] = { value, operator: operator as any };
    } else {
      delete newFilterState[columnKey];
    }
    setFilterState(newFilterState);
    onFilterChange?.(newFilterState);
  };

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

  const getVisibleHeaders = () => {
    const visible = tableHeaders.filter(header => visibleColumns.includes(header.key));
    console.log('Visible headers:', { visibleColumns, visible: visible.map(h => h.key) });
    return visible;
  };

  const totalPages = Math.ceil(filteredData.length / currentPageSize);
  const totalRecordsCount = totalRecords || filteredData.length;

  // Debug logging
  console.log('Filter popup state:', { isFilterPopupOpen });

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
                                setSelectedColumnForFilter(header.key);
                                setIsFilterPopupOpen(!isFilterPopupOpen);
                              }}
                            />
                            {isFilterPopupOpen && (
                              <div className="rds-fluent-grid-filter-popup">
                                <div className="rds-fluent-grid-filter-popup-header">
                                  <Text weight="semibold">Grid Controls</Text>
                                  <Button
                                    appearance="subtle"
                                    size="small"
                                    icon={<DismissRegular />}
                                    onClick={() => setIsFilterPopupOpen(false)}
                                  />
                                </div>
                                
                                {/* Column Visibility - Accordion Panel */}
                                <div className="rds-fluent-grid-filter-section">
                                  <div 
                                    className="rds-fluent-grid-column-header"
                                    onClick={handleColumnPanelToggle}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        handleColumnPanelToggle();
                                      }
                                    }}
                                    role="button"
                                    tabIndex={0}
                                  >
                                    <Text weight="medium">Show/Hide Columns</Text>
                                    {isColumnPanelExpanded ? <ArrowUpRegular /> : <ArrowDownRegular />}
                                  </div>
                                  
                                  {/* Collapsible Column List */}
                                  {isColumnPanelExpanded && (
                                    <div className="rds-fluent-grid-column-panel">
                                      {tableHeaders.map((col) => (
                                        <div 
                                          key={col.key} 
                                          className="rds-fluent-grid-column-panel-item"
                                          onClick={() => {
                                            const isCurrentlyVisible = visibleColumns.includes(col.key);
                                            handleColumnVisibilityChange(col.key, !isCurrentlyVisible);
                                          }}
                                          style={{ cursor: 'pointer' }}
                                        >
                                          <Checkbox
                                            checked={visibleColumns.includes(col.key)}
                                            onChange={(_, data) => {
                                              handleColumnVisibilityChange(col.key, Boolean(data.checked));
                                            }}
                                          />
                                          <Text>{col.name}</Text>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                
                                <Divider />
                                
                                {/* Filters - Only for Selected Column */}
                                {selectedColumnForFilter && (
                                  <div className="rds-fluent-grid-filter-section">
                                    <Text weight="medium">Filter: {tableHeaders.find(h => h.key === selectedColumnForFilter)?.name}</Text>
                                    {(() => {
                                      const col = tableHeaders.find(h => h.key === selectedColumnForFilter);
                                      if (!col || !col.isFilter) return null;
                                      
                                      const hasFilter = filterState[col.key]?.value;
                                      return (
                                        <div 
                                          className={`rds-fluent-grid-filter-item ${hasFilter ? 'rds-fluent-grid-filter-item-active' : ''}`}
                                        >
                                          <Text className="rds-fluent-grid-filter-label">{col.name}</Text>
                                          <div className="rds-fluent-grid-filter-controls">
                                            <Input
                                              placeholder="Filter..."
                                              value={filterState[col.key]?.value || ''}
                                              onChange={(_, data) => 
                                                handleFilterChange(col.key, data.value, 'contains')
                                              }
                                            />
                                            <div className="rds-fluent-grid-filter-operator-container">
                                              <ArrowSortRegular className="rds-fluent-grid-filter-operator-icon" />
                                              <select
                                                value={filterState[col.key]?.operator || 'contains'}
                                                onChange={(e) => 
                                                  handleFilterChange(
                                                    col.key, 
                                                    filterState[col.key]?.value || '', 
                                                    e.target.value
                                                  )
                                                }
                                                className="rds-fluent-grid-filter-operator"
                                              >
                                                <option value="contains">Contains</option>
                                                <option value="equals">Equals</option>
                                                <option value="startsWith">Starts with</option>
                                                <option value="endsWith">Ends with</option>
                                                <option value="greaterThan">Greater than</option>
                                                <option value="lessThan">Less than</option>
                                              </select>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })()}
                                    
                                    {Object.keys(filterState).length > 0 && (
                                      <Button
                                        appearance="subtle"
                                        size="small"
                                        onClick={clearAllFilters}
                                        className="rds-fluent-grid-clear-all"
                                      >
                                        Clear All Filters
                                      </Button>
                                    )}
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

RdsFluentGrid.displayName = 'RdsFluentGrid';
export default RdsFluentGrid;