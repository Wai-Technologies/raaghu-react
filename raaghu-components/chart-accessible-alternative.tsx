import type { ReactElement, ReactNode } from 'react';
import { VisuallyHidden } from '../raaghu-elements/shared/components/visually-hidden';

/** Minimal Chart.js dataset shape for building accessible data tables. */
export type ChartAccessibleDataset = {
  label?: string;
  data?: unknown[];
};

export interface BuildChartDataTablePropsInput {
  labels?: unknown;
  datasets?: ChartAccessibleDataset[];
  /** Base id from `useId()`; used for the table element id when set. */
  summaryId?: string;
  tableCaption?: string;
  rowHeader?: string;
}

export interface ChartDataTableProps {
  id?: string;
  caption?: string;
  rowHeader: string;
  columnHeaders: string[];
  rows: { rowLabel: string; cells: string[] }[];
}

function labelAt(labels: unknown, index: number): string {
  if (Array.isArray(labels) && labels[index] !== undefined && labels[index] !== null) {
    return String(labels[index]);
  }
  return `Row ${index + 1}`;
}

function datasetHeader(dataset: ChartAccessibleDataset, index: number): string {
  const label = dataset.label?.trim();
  return label ? label : `Dataset ${index + 1}`;
}

/** Formats a Chart.js data point for display in an accessible table cell. */
export function formatChartDataCell(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean') {
    return String(value);
  }
  if (typeof value === 'object') {
    const point = value as Record<string, unknown>;
    const parts: string[] = [];
    if (point.x !== undefined) parts.push(`x: ${point.x}`);
    if (point.y !== undefined) parts.push(`y: ${point.y}`);
    if (point.r !== undefined) parts.push(`r: ${point.r}`);
    if (parts.length > 0) {
      return parts.join(', ');
    }
  }
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function maxRowCount(labels: unknown, datasets: ChartAccessibleDataset[]): number {
  const labelCount = Array.isArray(labels) ? labels.length : 0;
  const dataCount = datasets.reduce(
    (max, dataset) => Math.max(max, dataset.data?.length ?? 0),
    0,
  );
  return Math.max(labelCount, dataCount);
}

export function hasChartAccessibleTableData(
  labels: unknown,
  datasets: ChartAccessibleDataset[] | undefined,
): boolean {
  if (!datasets?.length) return false;
  return maxRowCount(labels, datasets) > 0;
}

/** Builds props for a chart data table (headers and row cells). */
export function buildChartDataTableProps({
  labels,
  datasets = [],
  summaryId,
  tableCaption = 'Chart data',
  rowHeader = 'Label',
}: BuildChartDataTablePropsInput): ChartDataTableProps | null {
  if (!hasChartAccessibleTableData(labels, datasets)) {
    return null;
  }

  const rowCount = maxRowCount(labels, datasets);
  const columnHeaders = datasets.map(datasetHeader);
  const rows = Array.from({ length: rowCount }, (_, rowIndex) => ({
    rowLabel: labelAt(labels, rowIndex),
    cells: datasets.map((dataset) => formatChartDataCell(dataset.data?.[rowIndex])),
  }));

  return {
    id: summaryId ? `${summaryId}-data-table` : undefined,
    caption: tableCaption,
    rowHeader,
    columnHeaders,
    rows,
  };
}

export function chartSummaryElementId(summaryId: string): string {
  return `${summaryId}-summary`;
}

export function chartDataTableElementId(summaryId: string): string {
  return `${summaryId}-data-table`;
}

/** Space-separated ids for `aria-describedby` on the chart canvas. */
export function chartAccessibleDescribedBy(
  summaryId: string,
  description: string | undefined,
  labels: unknown,
  datasets: ChartAccessibleDataset[] | undefined,
): string | undefined {
  const ids: string[] = [];
  if (description?.trim()) {
    ids.push(chartSummaryElementId(summaryId));
  }
  if (hasChartAccessibleTableData(labels, datasets)) {
    ids.push(chartDataTableElementId(summaryId));
  }
  return ids.length > 0 ? ids.join(' ') : undefined;
}

export interface ChartAccessibleAlternativeProps {
  /** Base id from `useId()` for summary and table elements. */
  summaryId: string;
  /** Optional visible summary linked via `aria-describedby`. */
  description?: string;
  labels?: unknown;
  datasets?: ChartAccessibleDataset[];
}

function ChartDataTable({ table }: { table: ChartDataTableProps }) {
  return (
    <table id={table.id}>
      {table.caption ? <caption>{table.caption}</caption> : null}
      <thead>
        <tr>
          <th scope="col">{table.rowHeader}</th>
          {table.columnHeaders.map((header) => (
            <th key={header} scope="col">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row) => (
          <tr key={row.rowLabel}>
            <th scope="row">{row.rowLabel}</th>
            {row.cells.map((cell, cellIndex) => (
              <td key={`${row.rowLabel}-${cellIndex}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * Visible summary (when provided) plus a visually hidden data table for screen readers.
 */
export function ChartAccessibleAlternative({
  summaryId,
  description,
  labels,
  datasets = [],
}: ChartAccessibleAlternativeProps) {
  const table = buildChartDataTableProps({ labels, datasets, summaryId });
  const trimmedDescription = description?.trim();

  if (!trimmedDescription && !table) {
    return null;
  }

  return (
    <>
      {trimmedDescription ? (
        <p id={chartSummaryElementId(summaryId)} className="rds-chart-accessible-alternative__summary">
          {description}
        </p>
      ) : null}
      {table ? (
        <VisuallyHidden>
          <ChartDataTable table={table} />
        </VisuallyHidden>
      ) : null}
    </>
  );
}

export interface RenderChartDataAlternativeInput extends ChartAccessibleAlternativeProps {
  /** @deprecated Alias for `description`; prefer `description`. */
  summary?: string;
}

/** Returns JSX for an optional summary and visually hidden chart data table. */
export function renderChartDataAlternative({
  summary,
  description,
  ...rest
}: RenderChartDataAlternativeInput): ReactElement | null {
  const resolvedDescription = description ?? summary;
  const content = (
    <ChartAccessibleAlternative {...rest} description={resolvedDescription} />
  ) as ReactNode;
  if (content === null) {
    return null;
  }
  return content as ReactElement;
}