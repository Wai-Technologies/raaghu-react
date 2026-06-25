import React from 'react';
import { BoundingRect } from 'react-measure';

export interface ContributionPanelData {
  value: number;
  month: number;
  date: string;
}

export interface RenderWeekLabelsParams {
  showWeekLabels: boolean;
  weekNames?: string[];
  weekLabelWidth: number;
  monthLabelHeight: number;
  dynamicPanelSize: number;
  dynamicPanelMargin: number;
  weekLabelAttributes?: React.SVGProps<SVGTextElement>;
}

export function renderWeekLabels({
  showWeekLabels,
  weekNames,
  weekLabelWidth,
  monthLabelHeight,
  dynamicPanelSize,
  dynamicPanelMargin,
  weekLabelAttributes,
}: RenderWeekLabelsParams) {
  if (!showWeekLabels) return null;
  if (!weekNames || weekNames.length < 7) return null;

  return Array.from({ length: 7 }, (_, j) => (
    <text
      key={`week_label_${j}`}
      className="rds-comp-contribution__text rds-comp-contribution__text--week"
      x={weekLabelWidth - 10}
      y={monthLabelHeight + j * (dynamicPanelSize + dynamicPanelMargin) + dynamicPanelSize / 2 + 4}
      textAnchor="end"
      {...weekLabelAttributes}
    >
      {weekNames[j] || ''}
    </text>
  ));
}

export interface RenderContributionPanelsParams {
  contributions: (ContributionPanelData | null)[][];
  columns: number;
  panelColors: string[];
  dynamicPanelSize: number;
  dynamicPanelMargin: number;
  weekLabelWidth: number;
  monthLabelHeight: number;
  panelAttributes?: React.SVGProps<SVGRectElement>;
  getPanelPosition: (colIndex: number, rowIndex: number) => { x: number; y: number };
}

export function renderContributionPanels({
  contributions,
  columns,
  panelColors,
  dynamicPanelSize,
  getPanelPosition,
  panelAttributes,
}: RenderContributionPanelsParams) {
  const panels: React.ReactElement[] = [];

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < 7; j++) {
      const contribution = contributions[i][j];
      if (contribution === null) continue;
      const pos = getPanelPosition(i, j);
      const numOfColors = panelColors?.length ?? 0;
      const color =
        contribution.value >= numOfColors
          ? panelColors?.[numOfColors - 1]
          : panelColors?.[contribution.value];
      panels.push(
        <rect
          key={`panel_${i}_${j}`}
          className="rds-comp-contribution__panel"
          x={pos.x}
          y={pos.y}
          width={dynamicPanelSize}
          height={dynamicPanelSize}
          fill={color}
          rx={2}
          ry={2}
          data-date={contribution.date}
          data-value={contribution.value}
          {...panelAttributes}
        />
      );
    }
  }

  return panels;
}

export interface RenderMonthLabelsParams {
  showMonthLabels: boolean;
  monthNames?: string[];
  contributions: (ContributionPanelData | null)[][];
  columns: number;
  isMobile: boolean;
  dynamicPanelSize: number;
  monthLabelHeight: number;
  monthLabelAttributes?: React.SVGProps<SVGTextElement>;
  getPanelPosition: (colIndex: number, rowIndex: number) => { x: number; y: number };
}

export function renderMonthLabels({
  showMonthLabels,
  monthNames,
  contributions,
  columns,
  isMobile,
  dynamicPanelSize,
  monthLabelHeight,
  monthLabelAttributes,
  getPanelPosition,
}: RenderMonthLabelsParams) {
  if (!monthNames || monthNames.length !== 12) return null;
  if (!showMonthLabels) return null;

  let janIndex = -1;
  let decIndex = -1;
  const monthPositions: { month: number; position: number }[] = [];

  for (let i = 0; i < columns; i++) {
    const c = contributions[i][0];
    if (c === null) continue;
    if (c.month === 0 && janIndex === -1) janIndex = i;
    if (c.month === 11) decIndex = i;
  }
  if (janIndex === -1) janIndex = 0;
  if (decIndex === -1) decIndex = columns - 1;

  let prevMonth = -1;
  for (let i = janIndex; i <= decIndex; i++) {
    const c = contributions[i][0];
    if (c === null) continue;
    if (c.month !== prevMonth) {
      monthPositions.push({ month: c.month, position: i });
      prevMonth = c.month;
    }
  }
  if (monthPositions.length && monthPositions[0].month !== 0) {
    monthPositions.unshift({ month: 0, position: 0 });
  }
  if (monthPositions.length && monthPositions[monthPositions.length - 1].month !== 11) {
    monthPositions.push({ month: 11, position: columns - 1 });
  }

  const getMonthLabel = (month: number) => {
    if (isMobile) {
      return (monthNames[month] || '').slice(0, 3);
    }
    return monthNames[month] || '';
  };

  return monthPositions.map((monthPos, i) => {
    const { month, position } = monthPos;
    const nextPosition = i < monthPositions.length - 1 ? monthPositions[i + 1].position : columns;
    const midPosition = position + Math.floor((nextPosition - position) / 2);
    const textBasePos = getPanelPosition(midPosition, 0);

    return (
      <text
        key={`month_${i}_${month}_${position}`}
        className={
          `rds-comp-contribution__text rds-comp-contribution__text--month` +
          (isMobile ? ' rds-comp-contribution__text--month-mobile' : '')
        }
        x={textBasePos.x - dynamicPanelSize / 2}
        y={monthLabelHeight / 2}
        textAnchor="middle"
        {...monthLabelAttributes}
      >
        {getMonthLabel(month)}
      </text>
    );
  });
}

export function updateSizeBasedOnWidth(
  width: number,
  panelSize: number,
  panelMargin: number,
  setDynamicPanelSize: (size: number) => void,
  setDynamicPanelMargin: (margin: number) => void
) {
  if (width <= 320) {
    setDynamicPanelSize(8);
    setDynamicPanelMargin(1.2);
  } else if (width <= 414) {
    setDynamicPanelSize(9);
    setDynamicPanelMargin(1.2);
  } else if (width <= 834) {
    setDynamicPanelSize(8);
    setDynamicPanelMargin(2);
  } else {
    setDynamicPanelSize(panelSize);
    setDynamicPanelMargin(panelMargin);
  }
}

export function updateSizeFromBounds(
  size: BoundingRect | undefined,
  panelSize: number,
  panelMargin: number,
  setDynamicPanelSize: (size: number) => void,
  setDynamicPanelMargin: (margin: number) => void
) {
  if (!size) return;
  updateSizeBasedOnWidth(size.width, panelSize, panelMargin, setDynamicPanelSize, setDynamicPanelMargin);
}

export function makeCalendarData(
  history: { [k: string]: number },
  lastDay: string,
  columns: number,
  dateFormat: string,
  dayjs: typeof import('dayjs').default
) {
  const d = dayjs(lastDay, dateFormat);
  const lastWeekend = d.endOf('week');
  const endDate = d.endOf('day');

  const result: (ContributionPanelData | null)[][] = [];
  for (let i = 0; i < columns; i++) {
    result[i] = [];
    for (let j = 0; j < 7; j++) {
      const date = lastWeekend.subtract((columns - i - 1) * 7 + (6 - j), 'day');
      if (date.isBefore(endDate) || date.isSame(endDate)) {
        result[i][j] = {
          value: history[date.format(dateFormat)] || 0,
          month: date.month(),
          date: date.format(dateFormat),
        };
      } else {
        result[i][j] = null;
      }
    }
  }
  return result;
}
