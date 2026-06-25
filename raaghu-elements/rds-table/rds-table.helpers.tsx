import React from 'react';
import {
  TableHead as MuiTableHead,
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  Checkbox,
  Radio,
  IconButton,
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
export interface RdsTableColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'right' | 'center';
  format?: (value: unknown) => string | React.ReactNode;
  type?: 'text' | 'checkbox' | 'radio';
  sortable?: boolean;
}

export function renderCellContent(
  column: RdsTableColumn,
  value: unknown,
  row: Record<string, unknown>,
  cellCheckboxSelected: Set<string | number>,
  cellRadioSelected: string | number | null,
  toggleCellCheckbox: (rowId: string | number) => void,
  selectCellRadio: (rowId: string | number) => void
) {
  switch (column.type) {
    case 'checkbox': {
      const rowId = (row['id'] || row['key']) as string | number;
      const isChecked = cellCheckboxSelected.has(rowId);
      return (
        <div className="rds-table__checkbox">
          <Checkbox
            checked={isChecked}
            onChange={() => toggleCellCheckbox(rowId)}
            size="small"
          />
        </div>
      );
    }
    case 'radio': {
      const rowId = (row['id'] || row['key']) as string | number;
      const isChecked = cellRadioSelected === rowId;
      return (
        <Radio
          checked={isChecked}
          onChange={() => selectCellRadio(rowId)}
          size="small"
        />
      );
    }
    default:
      return column.format ? column.format(value) : (value as React.ReactNode);
  }
}

export interface TableHeaderRowProps {
  columns: RdsTableColumn[];
  selectable: boolean;
  isIndeterminate: boolean;
  isAllSelected: boolean;
  handleSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  handleSort: (column: RdsTableColumn) => void;
  isCellCheckboxIndeterminate: boolean;
  isAllCellCheckboxSelected: boolean;
  checkboxRowIds: (string | number)[];
  setCellCheckboxSelected: React.Dispatch<React.SetStateAction<Set<string | number>>>;
}

export function TableHeaderRow({
  columns,
  selectable,
  isIndeterminate,
  isAllSelected,
  handleSelectAll,
  sortBy,
  sortDirection,
  handleSort,
  isCellCheckboxIndeterminate,
  isAllCellCheckboxSelected,
  checkboxRowIds,
  setCellCheckboxSelected,
}: TableHeaderRowProps) {
  return (
    <MuiTableHead className="rds-table__head">
      <MuiTableRow className="rds-table__header-row">
        {selectable && (
          <MuiTableCell padding="checkbox" className="rds-table__header rds-table__header--checkbox rds-table__checkbox">
            <Checkbox
              indeterminate={isIndeterminate}
              checked={isAllSelected}
              onChange={handleSelectAll}
              size="small"
            />
          </MuiTableCell>
        )}
        {columns.map((column) => {
          const active = sortBy === column.id && !!sortDirection;
          const ariaSortValue = active
            ? sortDirection === 'asc'
              ? 'ascending'
              : 'descending'
            : undefined;
          return (
            <MuiTableCell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth, width: column.minWidth }}
              className={`rds-table__header ${column.sortable ? 'rds-table__header--sortable' : ''} ${active ? 'rds-table__header--sorted' : ''}`}
              aria-sort={ariaSortValue}
            >
              {column.type === 'checkbox' ? (
                <div className="rds-table__checkbox">
                  <Checkbox
                    indeterminate={isCellCheckboxIndeterminate}
                    checked={isAllCellCheckboxSelected}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCellCheckboxSelected(new Set(checkboxRowIds));
                      } else {
                        setCellCheckboxSelected(new Set());
                      }
                    }}
                    size="small"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  className="rds-table__header-content"
                  onClick={() => handleSort(column)}
                  style={{
                    cursor: column.sortable ? 'pointer' : undefined,
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    font: 'inherit',
                    textAlign: 'inherit',
                    width: '100%',
                  }}
                >
                  <span className="rds-table__header-label">{column.label}</span>
                  {column.sortable && (
                    <IconButton
                      aria-label={active ? `Sort ${column.label} ${sortDirection}` : `Sort ${column.label}`}
                      size="small"
                      className={`rds-table__sort-button ${active ? 'rds-table__sort-button--active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSort(column);
                      }}
                    >
                      <SwapVertIcon
                        className={`rds-table__sort-icon ${sortDirection === 'desc' && active ? 'rds-table__sort-icon--desc' : ''}`}
                        fontSize="small"
                      />
                    </IconButton>
                  )}
                </button>
              )}
            </MuiTableCell>
          );
        })}
      </MuiTableRow>
    </MuiTableHead>
  );
}

export interface TableBodyRowsProps {
  rows: Record<string, unknown>[];
  columns: RdsTableColumn[];
  selectable: boolean;
  currentSelectedRows: string[];
  handleSelectRow: (rowId: string) => void;
  cellCheckboxSelected: Set<string | number>;
  cellRadioSelected: string | number | null;
  toggleCellCheckbox: (rowId: string | number) => void;
  selectCellRadio: (rowId: string | number) => void;
}

export function TableBodyRows({
  rows,
  columns,
  selectable,
  currentSelectedRows,
  handleSelectRow,
  cellCheckboxSelected,
  cellRadioSelected,
  toggleCellCheckbox,
  selectCellRadio,
}: TableBodyRowsProps) {
  return (
    <MuiTableBody className="rds-table__body">
      {rows.map((row, index) => {
        const rowId = (row['id'] || row['key']) as string;
        const isSelected = currentSelectedRows.includes(rowId);
        return (
          <MuiTableRow
            hover
            key={(row['id'] || row['key'] || index) as string | number}
            selected={isSelected}
            className={`rds-table__row ${isSelected ? 'rds-table__row--selected' : ''}`}
          >
            {selectable && (
              <MuiTableCell padding="checkbox" className="rds-table__cell rds-table__cell--checkbox rds-table__checkbox">
                <Checkbox
                  checked={isSelected}
                  onChange={() => handleSelectRow(rowId)}
                  size="small"
                />
              </MuiTableCell>
            )}
            {columns.map((column) => {
              const value = row[column.id];
              const cellClass = `rds-table__cell ${column.type ? `rds-table__cell--${column.type}` : ''}`;
              return (
                <MuiTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, width: column.minWidth }}
                  className={cellClass}
                >
                  {renderCellContent(
                    column,
                    value,
                    row,
                    cellCheckboxSelected,
                    cellRadioSelected,
                    toggleCellCheckbox,
                    selectCellRadio
                  )}
                </MuiTableCell>
              );
            })}
          </MuiTableRow>
        );
      })}
    </MuiTableBody>
  );
}
