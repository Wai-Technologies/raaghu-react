import React from 'react';
import {
  DataGrid as MuiDataGrid,
  DataGridProps as MuiDataGridProps,
  GridColDef,
  GridRowSelectionModel,
  GridRowId,
  GridPaginationModel,
  GridSortModel,
  GridFilterModel,
  GridCallbackDetails,
} from '@mui/x-data-grid';
import './rds-comp-data-grid.scss';

export interface RdsCompDataGridProps
  extends Omit<
    MuiDataGridProps,
    | 'slots'
    | 'slotProps'
    | 'sx'
    | 'style'
    | 'classes'
    | 'rowSelectionModel'
    | 'onRowSelectionModelChange'
    | 'onPaginationModelChange'
    | 'onSortModelChange'
    | 'onFilterModelChange'
  > {
  /**
   * The array of columns to display
   */
  columns: GridColDef[];

  /**
   * The array of rows to display
   */
  rows: any[];

  /**
   * Controlled mode: currently selected row IDs
   */
  selectedRowIds?: GridRowSelectionModel;

  /**
   * Uncontrolled mode: default selected row IDs
   */
  defaultSelectedRowIds?: GridRowSelectionModel;

  /**
   * Callback fired when row selection changes
   */
  onRowSelectionChange?: (newSelection: GridRowSelectionModel) => void;

  /**
   * Controlled mode: current pagination state
   */
  paginationModel?: GridPaginationModel;

  /**
   * Uncontrolled mode: default pagination state
   */
  defaultPaginationModel?: GridPaginationModel;

  /**
   * Callback fired when pagination model changes
   */
  onPaginationModelChange?: (newModel: GridPaginationModel) => void;

  /**
   * Controlled mode: current sort model
   */
  sortModel?: GridSortModel;

  /**
   * Uncontrolled mode: default sort model
   */
  defaultSortModel?: GridSortModel;

  /**
   * Callback fired when sort model changes
   */
  onSortModelChange?: (newModel: GridSortModel) => void;

  /**
   * Controlled mode: current filter model
   */
  filterModel?: GridFilterModel;

  /**
   * Uncontrolled mode: default filter model
   */
  defaultFilterModel?: GridFilterModel;

  /**
   * Callback fired when filter model changes
   */
  onFilterModelChange?: (newModel: GridFilterModel) => void;

  /**
   * Display variant - determines styling and appearance
   * @default 'standard'
   */
  variant?: 'standard' | 'elevated' | 'outlined';

  /**
   * If true, display striped rows for better readability
   * @default false
   */
  striped?: boolean;

  /**
   * If true, display hover effect on rows
   * @default true
   */
  hoverable?: boolean;

  /**
   * If true, display compact density (smaller rows)
   * @default false
   */
  compact?: boolean;

  /**
   * If true, display borders around cells
   * @default true
   */
  bordered?: boolean;
}

const DEFAULT_SELECTION: GridRowSelectionModel = { type: 'include', ids: new Set<GridRowId>() };

const RdsCompDataGrid: React.FC<RdsCompDataGridProps> = ({
  columns,
  rows,
  selectedRowIds: controlledSelectedRowIds,
  defaultSelectedRowIds,
  onRowSelectionChange,
  paginationModel: controlledPaginationModel,
  defaultPaginationModel = { pageSize: 10, page: 0 },
  onPaginationModelChange,
  sortModel: controlledSortModel,
  defaultSortModel,
  onSortModelChange,
  filterModel: controlledFilterModel,
  defaultFilterModel,
  onFilterModelChange,
  variant = 'standard',
  striped = false,
  hoverable = true,
  compact = false,
  bordered = true,
  className,
  ...props
}) => {
  // State management for uncontrolled mode
  const [internalSelectedRowIds, setInternalSelectedRowIds] = React.useState<GridRowSelectionModel>(
    defaultSelectedRowIds || DEFAULT_SELECTION
  );
  const [internalPaginationModel, setInternalPaginationModel] = React.useState<GridPaginationModel>(
    defaultPaginationModel
  );
  const [internalSortModel, setInternalSortModel] = React.useState<GridSortModel>(defaultSortModel || []);
  const [internalFilterModel, setInternalFilterModel] = React.useState<GridFilterModel>(
    defaultFilterModel || { items: [] }
  );

  // Determine if controlled or uncontrolled
  const isSelectedRowsControlled = controlledSelectedRowIds !== undefined;
  const isPaginationControlled = controlledPaginationModel !== undefined;
  const isSortControlled = controlledSortModel !== undefined;
  const isFilterControlled = controlledFilterModel !== undefined;

  // Get current values
  const selectedRowIds = isSelectedRowsControlled ? controlledSelectedRowIds : internalSelectedRowIds;
  const paginationModel = isPaginationControlled ? controlledPaginationModel : internalPaginationModel;
  const sortModel = isSortControlled ? controlledSortModel : internalSortModel;
  const filterModel = isFilterControlled ? controlledFilterModel : internalFilterModel;

  // Handle row selection
  const handleRowSelectionModelChange = (newSelection: GridRowSelectionModel, details: GridCallbackDetails) => {
    if (!isSelectedRowsControlled) {
      setInternalSelectedRowIds(newSelection);
    }
    onRowSelectionChange?.(newSelection);
  };

  // Handle pagination
  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    if (!isPaginationControlled) {
      setInternalPaginationModel(newModel);
    }
    onPaginationModelChange?.(newModel);
  };

  // Handle sorting
  const handleSortModelChange = (newModel: GridSortModel) => {
    if (!isSortControlled) {
      setInternalSortModel(newModel);
    }
    onSortModelChange?.(newModel);
  };

  // Handle filtering
  const handleFilterModelChange = (newModel: GridFilterModel) => {
    if (!isFilterControlled) {
      setInternalFilterModel(newModel);
    }
    onFilterModelChange?.(newModel);
  };

  // Build CSS classes
  const rootClasses = [
    'rds-comp-data-grid',
    `rds-comp-data-grid--${variant}`,
    striped && 'rds-comp-data-grid--striped',
    hoverable ? 'rds-comp-data-grid--hoverable' : 'rds-comp-data-grid--not-hoverable',
    compact && 'rds-comp-data-grid--compact',
    bordered && 'rds-comp-data-grid--bordered',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClasses} data-testid="rds-comp-data-grid">
      <MuiDataGrid
        columns={columns}
        rows={rows}
        rowSelectionModel={selectedRowIds}
        onRowSelectionModelChange={handleRowSelectionModelChange}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        filterModel={filterModel}
        onFilterModelChange={handleFilterModelChange}
        sx={{
          // Column header background & text — guaranteed to override MUI emotion styles
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#f5f5f5',
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
            color: '#424242',
            fontWeight: 700,
            fontSize: '14px',
            letterSpacing: '0.4px',
            textTransform: 'uppercase',
            borderBottom: '3px solid #212121',
            '&:hover': {
              background: 'linear-gradient(135deg, #d0d0d0 0%, #bdbdbd 100%)',
              color: '#212121',
            },
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 700,
          },
          // Remove circular background from sort icon button
          '& .MuiDataGrid-columnHeader .MuiIconButton-root': {
            backgroundColor: 'transparent',
            borderRadius: 0,
            padding: '2px',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
          // Sort icon color
          '& .MuiDataGrid-sortIcon': {
            color: '#424242',
            opacity: 1,
          },
          // Column separator
          '& .MuiDataGrid-columnSeparator': {
            color: '#bbdefb',
          },
          '@media (prefers-color-scheme: dark)': {
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#2a2a2a',
              background: 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%)',
              color: '#ffffff',
              borderBottomColor: '#424242',
              '&:hover': {
                background: 'linear-gradient(135deg, #333333 0%, #242424 100%)',
                color: '#e0e0e0',
              },
            },
            '& .MuiDataGrid-sortIcon': {
              color: '#ffffff',
            },
            '& .MuiDataGrid-columnSeparator': {
              color: '#42a5f5',
            },
          },
        }}
        {...props}
      />
    </div>
  );
};

RdsCompDataGrid.displayName = 'RdsCompDataGrid';
export default RdsCompDataGrid;
