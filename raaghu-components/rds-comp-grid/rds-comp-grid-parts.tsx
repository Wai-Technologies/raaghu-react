import React from 'react';
import {
  Box,
  Typography,
  TableCell,
  TableRow,
  Stack,
  Tooltip,
  IconButton,
  Checkbox,
  Radio,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  SwapVert as ArrowUpDownIcon,
  Edit as EditIcon,
  Clear as ClearIcon,
  DragIndicator as DragIndicatorIcon,
} from '@mui/icons-material';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import type {
  RdsCompGridColumn,
  RdsCompGridAction,
  GridRow,
  FilterState,
} from './rds-comp-grid';
import { ActionMenu, GridBodyCell } from './rds-comp-grid-cells';

export interface CustomDragState {
  isDragging: boolean;
  draggedColumnKey: string | null;
  dragStartIndex: number | null;
  currentHoverIndex: number | null;
  dragPreviewVisible: boolean;
}

export interface GridHeaderCellProps {
  header: RdsCompGridColumn;
  index: number;
  enableColumnSwapping: boolean;
  isSort: boolean;
  isFilter: boolean;
  customDragState: CustomDragState;
  columnWidths: Record<string, number>;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  filterState: FilterState;
  isResizing: boolean;
  resizingColumn: string | null;
  filterButtonRef: React.RefObject<HTMLButtonElement | null>;
  onCustomDragStart: (columnKey: string, columnIndex: number) => void;
  onCustomDragOver: (targetIndex: number) => void;
  onCustomDragEnd: (targetIndex?: number) => void;
  onCustomDragLeave: () => void;
  onSort: (columnKey: string) => void;
  onFilterIconClick: (event: React.MouseEvent<HTMLElement>, columnKey: string) => void;
  onResizeStart: (e: React.MouseEvent, columnKey: string) => void;
}

function getHeaderCursor(enableColumnSwapping: boolean, isSort: boolean, headerIsSort?: boolean): string {
  if (enableColumnSwapping) return 'grab';
  if (isSort && headerIsSort) return 'pointer';
  return 'default';
}

function getSortIcon(columnKey: string, sortColumn: string | null, sortDirection: 'asc' | 'desc') {
  if (sortColumn === columnKey) {
    return sortDirection === 'asc' ? <ArrowUpIcon fontSize="small" /> : <ArrowDownIcon fontSize="small" />;
  }
  return <ArrowUpDownIcon fontSize="small" />;
}

function handleHeaderDragLeave(
  e: React.DragEvent,
  enableColumnSwapping: boolean,
  isDragging: boolean,
  onCustomDragLeave: () => void
) {
  if (!enableColumnSwapping || !isDragging) return;
  const rect = e.currentTarget.getBoundingClientRect();
  const { clientX, clientY } = e;
  if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) {
    onCustomDragLeave();
  }
}

export const GridHeaderCell: React.FC<GridHeaderCellProps> = ({
  header,
  index,
  enableColumnSwapping,
  isSort,
  isFilter,
  customDragState,
  columnWidths,
  sortColumn,
  sortDirection,
  filterState,
  isResizing,
  resizingColumn,
  filterButtonRef,
  onCustomDragStart,
  onCustomDragOver,
  onCustomDragEnd,
  onCustomDragLeave,
  onSort,
  onFilterIconClick,
  onResizeStart,
}) => {
  const isDragging = customDragState.isDragging && customDragState.draggedColumnKey === header.key;
  const isBeingDragged = customDragState.draggedColumnKey === header.key;
  const isDropTarget =
    customDragState.currentHoverIndex === index && customDragState.isDragging && !isBeingDragged;

  return (
    <TableCell
      draggable={enableColumnSwapping}
      onDragStart={(e) => {
        if (enableColumnSwapping) {
          onCustomDragStart(header.key, index);
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/plain', header.key);
        }
      }}
      onDragOver={(e) => {
        if (enableColumnSwapping && customDragState.isDragging) {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          onCustomDragOver(index);
        }
      }}
      onDragEnd={() => {
        if (enableColumnSwapping && customDragState.isDragging) {
          onCustomDragEnd(customDragState.currentHoverIndex ?? undefined);
        }
      }}
      onDragLeave={(e) =>
        handleHeaderDragLeave(e, enableColumnSwapping, customDragState.isDragging, onCustomDragLeave)
      }
      onDrop={(e) => {
        if (enableColumnSwapping && customDragState.isDragging) {
          e.preventDefault();
          onCustomDragEnd(index);
        }
      }}
      sx={{
        cursor: getHeaderCursor(enableColumnSwapping, isSort, header.isSort),
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
        '&:last-child': { borderRight: 'none' },
        '&:hover': {
          ...(enableColumnSwapping && !isDragging && !customDragState.isDragging && {
            backgroundColor: 'action.hover',
            cursor: 'grab',
          }),
        },
        '&:active': {
          ...(enableColumnSwapping && { cursor: 'grabbing' }),
        },
        ...(isBeingDragged && !customDragState.dragPreviewVisible && {
          opacity: 1,
          position: 'relative',
        }),
        ...(isDropTarget && {}),
      }}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        if (!customDragState.isDragging && isSort && header.isSort) {
          onSort(header.key);
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
        {header.required && <Typography color="error" variant="caption">*</Typography>}
        {isSort && header.isSort && (
          <Tooltip title="Sort">
            <IconButton size="small" aria-label={`Sort by ${header.name}`}>
              {getSortIcon(header.key, sortColumn, sortDirection)}
            </IconButton>
          </Tooltip>
        )}
        {isFilter && header.isFilter && (
          <Tooltip title="Click to open filters and column visibility">
            <span>
              <IconButton
                size="small"
                onClick={(e) => onFilterIconClick(e, header.key)}
                ref={filterButtonRef}
                data-filter-button
                sx={{
                  '&:hover': { backgroundColor: 'action.hover' },
                  backgroundColor: filterState[header.key]?.value ? 'primary.light' : 'transparent',
                  color: filterState[header.key]?.value ? 'primary.main' : 'action.active',
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
          aria-valuenow={columnWidths[header.key] || 150}
          aria-valuemin={50}
          aria-valuemax={500}
          tabIndex={0}
          onMouseDown={(e) => onResizeStart(e, header.key)}
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
            '&:hover': { backgroundColor: 'primary.main', opacity: 0.8, width: '3px' },
            '&:focus': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: '1px',
            },
          }}
        />
      )}
    </TableCell>
  );
};

export interface GridDataRowProps {
  row: GridRow;
  index: number;
  rowId: string;
  isSelected: boolean;
  isRowEditing: boolean;
  enableRowSwapping: boolean;
  enableCheckboxSelection: boolean;
  enableRadioButtonSelection: boolean;
  enableInlineEdit: boolean;
  inlineEditMode: 'cell' | 'row';
  visibleHeaders: RdsCompGridColumn[];
  columnWidths: Record<string, number>;
  editingCell: { rowId: string; columnKey: string } | null;
  editingRow: string | null;
  tempCellValue: unknown;
  tempRowValues: Record<string, unknown>;
  cellValidationError: string;
  rowValidationErrors: Record<string, string>;
  actions: RdsCompGridAction[];
  showActionButtonsDirectly: boolean;
  onRowClick?: (rowId: string) => void;
  onRowSelect: (rowId: string, rowData: GridRow) => void;
  onCellEditStart: (rowId: string, columnKey: string, currentValue: unknown) => void;
  onCellEditSave: (rowId: string, columnKey: string, newValue: unknown) => void;
  onCellEditCancel: () => void;
  onCellValueChange: (newValue: unknown) => void;
  onRowValueChange: (columnKey: string, newValue: unknown) => void;
  onRowEditStart: (rowId: string, rowData: GridRow) => void;
  onRowEditSave: (rowId: string) => void;
  onRowEditCancel: () => void;
  onActionSelection?: (rowData: GridRow, actionId: string) => void;
}

function getActionButtonStyle(variant?: string): 'filled' | 'outlined' | 'transparent' {
  if (variant === 'contained') return 'filled';
  if (variant === 'text') return 'transparent';
  return 'outlined';
}

export const GridDataRow: React.FC<GridDataRowProps> = ({
  row,
  index,
  rowId,
  isSelected,
  isRowEditing,
  enableRowSwapping,
  enableCheckboxSelection,
  enableRadioButtonSelection,
  enableInlineEdit,
  inlineEditMode,
  visibleHeaders,
  columnWidths,
  editingCell,
  editingRow,
  tempCellValue,
  tempRowValues,
  cellValidationError,
  rowValidationErrors,
  actions,
  showActionButtonsDirectly,
  onRowClick,
  onRowSelect,
  onCellEditStart,
  onCellEditSave,
  onCellEditCancel,
  onCellValueChange,
  onRowValueChange,
  onRowEditStart,
  onRowEditSave,
  onRowEditCancel,
  onActionSelection,
}) => (
  <Draggable draggableId={String(rowId)} index={index} isDragDisabled={!enableRowSwapping}>
    {(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => (
      <TableRow
        ref={dragProvided.innerRef}
        {...dragProvided.draggableProps}
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
          <TableCell
            sx={{
              width: '60px',
              padding: 'var(--rds-spacing-sm-px)',
              borderRight: '1px solid var(--rds-border-default, #d1d1d1)',
              textAlign: 'center',
              verticalAlign: 'middle',
            }}
          >
            <div
              {...dragProvided.dragHandleProps}
              style={{
                cursor: 'grab',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              <DragIndicatorIcon
                fontSize="small"
                sx={{
                  color: 'var(--rds-text-secondary)',
                  '&:hover': { color: 'var(--rds-text-primary)' },
                }}
              />
            </div>
          </TableCell>
        )}

        {enableCheckboxSelection && (
          <TableCell padding="checkbox" sx={{ borderRight: () => `1px solid ${'var(--rds-border-default)'}` }}>
            <Checkbox checked={isSelected} onChange={() => onRowSelect(rowId, row)} />
          </TableCell>
        )}

        {enableRadioButtonSelection && (
          <TableCell padding="checkbox" sx={{ borderRight: () => `1px solid ${'var(--rds-border-default)'}` }}>
            <Radio checked={isSelected} onChange={() => onRowSelect(rowId, row)} name="rowSelection" />
          </TableCell>
        )}

        {visibleHeaders.map((header) => {
          const cellValue = row[header.key];
          const cellWidth = columnWidths[header.key] || header.minWidth || 150;
          const isCellEditing =
            editingCell?.rowId === rowId && editingCell?.columnKey === header.key;

          return (
            <GridBodyCell
              key={header.key}
              header={header}
              row={row}
              rowId={rowId}
              cellValue={cellValue}
              cellWidth={cellWidth}
              enableInlineEdit={enableInlineEdit}
              inlineEditMode={inlineEditMode}
              isCellEditing={isCellEditing}
              isRowEditing={isRowEditing}
              tempCellValue={tempCellValue}
              tempRowValues={tempRowValues}
              cellValidationError={cellValidationError}
              rowValidationErrors={rowValidationErrors}
              onCellEditStart={onCellEditStart}
              onCellEditSave={onCellEditSave}
              onCellEditCancel={onCellEditCancel}
              onCellValueChange={onCellValueChange}
              onRowValueChange={onRowValueChange}
            />
          );
        })}

        {actions.length > 0 && (
          <TableCell sx={{ borderRight: 'none' }}>
            <Stack direction="row" spacing={0.5}>
              {showActionButtonsDirectly ? (
                actions.map((action) => (
                  <RdsButton
                    key={action.id}
                    size={action.size || 'small'}
                    style={getActionButtonStyle(action.variant)}
                    color={action.color || 'primary'}
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

        {enableInlineEdit && inlineEditMode === 'row' && (
          <TableCell sx={{ borderRight: 'none' }}>
            <Stack direction="row" spacing={0.5}>
              {isRowEditing ? (
                <>
                  <RdsButton
                    size="small"
                    style="filled"
                    color="primary"
                    onClick={() => onRowEditSave(rowId)}
                    showLeftIcon={true}
                    changeLeftIcon={<EditIcon />}
                    text="Save"
                  />
                  <RdsButton
                    size="small"
                    style="outlined"
                    color="secondary"
                    onClick={onRowEditCancel}
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
                  onClick={() => onRowEditStart(rowId, row)}
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
