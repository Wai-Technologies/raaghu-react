import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  TableCell,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import type { RdsCompGridColumn, RdsCompGridAction, GridRow } from './rds-comp-grid';
import { HTML_CELL_SX } from './rds-comp-grid-helpers';

export const EditableCell: React.FC<{
  value: unknown;
  column: RdsCompGridColumn;
  row: GridRow;
  isEditing: boolean;
  onStartEdit: () => void;
  onSave: (newValue: unknown) => void;
  onCancel: () => void;
  onValueChange: (newValue: unknown) => void;
  tempValue: unknown;
  validationError?: string;
}> = ({
  value,
  column,
  isEditing,
  onStartEdit,
  onSave,
  onCancel,
  onValueChange,
  tempValue,
  validationError,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (
        inputRef.current.type === 'text' ||
        inputRef.current.type === 'email' ||
        inputRef.current.type === 'url'
      ) {
        try {
          inputRef.current.select();
        } catch {
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

  const displayValue = value === null || value === undefined ? '' : String(value);
  const shouldShowTooltip = displayValue.length > 10;

  if (isEditing) {
    return (
      <TextField
        ref={inputRef}
        value={tempValue}
        onChange={(e) => onValueChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => onSave(tempValue)}
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
          '& .MuiOutlinedInput-notchedOutline': { borderWidth: '1px' },
          '& .MuiOutlinedInput-root': { height: '32px' },
        }}
      />
    );
  }

  const textSx = {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  } as const;

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
        borderRadius: 'var(--rds-border-radius-sm)',
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
          <Typography variant="body2" sx={textSx}>
            {displayValue}
          </Typography>
        </Tooltip>
      ) : (
        <Typography variant="body2" sx={textSx}>
          {displayValue}
        </Typography>
      )}
    </Box>
  );
};

export const ActionMenu: React.FC<{
  row: GridRow;
  actions: RdsCompGridAction[];
  onActionSelection?: (rowData: GridRow, actionId: string) => void;
}> = ({ row, actions, onActionSelection }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleActionClick = (actionId: string) => {
    onActionSelection?.(row, actionId);
    setAnchorEl(null);
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
        aria-label="Row actions"
        onClick={(event) => {
          event.stopPropagation();
          setAnchorEl(event.currentTarget);
        }}
        sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
      >
        <MoreIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { minWidth: 120, '& .MuiMenuItem-root': { fontSize: '14px' } },
        }}
      >
        {actions.map((action) => (
          <MenuItem
            key={action.id}
            onClick={() => handleActionClick(action.id)}
            sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>{getActionIcon(action.id)}</ListItemIcon>
            <ListItemText primary={action.displayName} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const cellTextSx = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '100%',
} as const;

export interface GridBodyCellProps {
  header: RdsCompGridColumn;
  row: GridRow;
  rowId: string;
  cellValue: unknown;
  cellWidth: number;
  enableInlineEdit: boolean;
  inlineEditMode: 'cell' | 'row';
  isCellEditing: boolean;
  isRowEditing: boolean;
  tempCellValue: unknown;
  tempRowValues: Record<string, unknown>;
  cellValidationError: string;
  rowValidationErrors: Record<string, string>;
  onCellEditStart: (rowId: string, columnKey: string, currentValue: unknown) => void;
  onCellEditSave: (rowId: string, columnKey: string, newValue: unknown) => void;
  onCellEditCancel: () => void;
  onCellValueChange: (newValue: unknown) => void;
  onRowValueChange: (columnKey: string, newValue: unknown) => void;
}

export const GridBodyCell: React.FC<GridBodyCellProps> = ({
  header,
  row,
  rowId,
  cellValue,
  cellWidth,
  enableInlineEdit,
  inlineEditMode,
  isCellEditing,
  isRowEditing,
  tempCellValue,
  tempRowValues,
  cellValidationError,
  rowValidationErrors,
  onCellEditStart,
  onCellEditSave,
  onCellEditCancel,
  onCellValueChange,
  onRowValueChange,
}) => {
  const shouldRenderHtml = header.allowHtml && typeof cellValue === 'string' && cellValue.includes('<');
  const cellText = shouldRenderHtml ? '' : (cellValue?.toString() || '');
  const shouldShowTooltip = !shouldRenderHtml && cellText.length > 10;
  const isEditable = enableInlineEdit && header.isEditable && !shouldRenderHtml;

  const cellSx = {
    width: cellWidth,
    minWidth: header.minWidth || 50,
    maxWidth: header.maxWidth || 800,
    borderRight: '1px solid var(--rds-border-default, #d1d1d1)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '&:last-child': { borderRight: 'none' },
  } as const;

  if (header.renderCell) {
    return (
      <TableCell key={header.key} sx={cellSx}>
        {header.renderCell(cellValue, row)}
      </TableCell>
    );
  }

  return (
    <TableCell key={header.key} sx={{ ...cellSx, color: 'text.primary' }}>
      {shouldRenderHtml ? (
        <Box sx={HTML_CELL_SX} dangerouslySetInnerHTML={{ __html: String(cellValue) }} />
      ) : isEditable && inlineEditMode === 'cell' ? (
        <EditableCell
          value={cellValue}
          column={header}
          row={row}
          isEditing={isCellEditing}
          onStartEdit={() => onCellEditStart(rowId, header.key, cellValue)}
          onSave={(newValue) => onCellEditSave(rowId, header.key, newValue)}
          onCancel={onCellEditCancel}
          onValueChange={onCellValueChange}
          tempValue={tempCellValue}
          validationError={cellValidationError}
        />
      ) : isEditable && inlineEditMode === 'row' && isRowEditing ? (
        <EditableCell
          value={tempRowValues[header.key] ?? cellValue}
          column={header}
          row={row}
          isEditing={true}
          onStartEdit={() => undefined}
          onSave={() => undefined}
          onCancel={() => undefined}
          onValueChange={(newValue) => onRowValueChange(header.key, newValue)}
          tempValue={tempRowValues[header.key] ?? cellValue}
          validationError={rowValidationErrors[header.key] || ''}
        />
      ) : shouldShowTooltip ? (
        <Tooltip title={cellText} arrow>
          <Typography variant="body2" sx={cellTextSx}>
            {cellText}
          </Typography>
        </Tooltip>
      ) : (
        <Typography variant="body2" sx={cellTextSx}>
          {cellText}
        </Typography>
      )}
    </TableCell>
  );
};
