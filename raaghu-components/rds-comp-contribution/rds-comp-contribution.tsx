import dayjs, { type Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useCallback, useEffect, useMemo, useRef, useState, type HTMLAttributes, type Ref, type SVGProps } from 'react';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import clsx from 'clsx';
import './rds-comp-contribution.scss';
import { warnDeprecatedProp } from '../../raaghu-elements/shared/utils/deprecation';

dayjs.extend(customParseFormat);

const COLUMNS = 53;

type DataAttributes = { [key: `data-${string}`]: string | number | undefined };

export interface RdsCompContributionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  showMonthLabels?: boolean;
  showWeekLabels?: boolean;
  /** Short names for Sunday..Saturday. */
  weekdayLabels?: string[];
  /** Names for January..December. */
  monthLabels?: string[];
  /** @deprecated Use `weekdayLabels` instead. */
  weekNames?: string[];
  /** @deprecated Use `monthLabels` instead. */
  monthNames?: string[];
  /** Colours by contribution count; the last colour is used for higher counts. */
  colors?: string[];
  /** @deprecated Use `colors` instead. */
  panelColors?: string[];
  /** Contribution counts keyed by date, formatted with `dateFormat`. */
  data?: { [date: string]: number };
  /** @deprecated Use `data` instead. */
  values?: { [date: string]: number };
  /** Last day shown. Strings are parsed with `dateFormat`. */
  endDate?: Dayjs | Date | string;
  /** @deprecated Use `endDate` instead. */
  until?: string;
  /** Format of the `data` keys and of string dates. */
  dateFormat?: string;
  /** Props merged onto the week labels, month labels and panels. */
  slotProps?: {
    weekLabel?: SVGProps<SVGTextElement> & DataAttributes;
    monthLabel?: SVGProps<SVGTextElement> & DataAttributes;
    panel?: SVGProps<SVGRectElement> & DataAttributes;
  };
  /** @deprecated Use `slotProps.weekLabel` instead. */
  weekLabelAttributes?: SVGProps<SVGTextElement> & DataAttributes;
  /** @deprecated Use `slotProps.monthLabel` instead. */
  monthLabelAttributes?: SVGProps<SVGTextElement> & DataAttributes;
  /** @deprecated Use `slotProps.panel` instead. */
  panelAttributes?: SVGProps<SVGRectElement> & DataAttributes;
  monthLabelHeight?: number;
  weekLabelWidth?: number;
  panelSize?: number;
  panelMargin?: number;
  /** Extra class name(s) merged onto the root element. */
  className?: string;
  /** Ref forwarded to the root element. */
  ref?: Ref<HTMLDivElement>;
  /** MUI system styles applied to the root element. */
  sx?: SxProps<Theme>;
}

const RdsCompContribution = ({
  showMonthLabels = true,
  showWeekLabels = false,
  weekdayLabels,
  monthLabels: monthLabelsProp,
  weekNames: weekNamesProp,
  monthNames: monthNamesProp,
  colors,
  panelColors: panelColorsProp,
  data,
  values: valuesProp,
  endDate,
  until: untilProp,
  dateFormat = 'YYYY-MM-DD',
  slotProps,
  weekLabelAttributes: weekLabelAttributesProp,
  monthLabelAttributes: monthLabelAttributesProp,
  panelAttributes: panelAttributesProp,
  monthLabelHeight = 28,
  weekLabelWidth = 24,
  panelSize = 11,
  panelMargin = 2,
  className,
  sx,
  ref,
  ...rest
}: RdsCompContributionProps) => {
  const deprecated: [string, unknown, string][] = [
    ['weekNames', weekNamesProp, 'weekdayLabels'],
    ['monthNames', monthNamesProp, 'monthLabels'],
    ['panelColors', panelColorsProp, 'colors'],
    ['values', valuesProp, 'data'],
    ['until', untilProp, 'endDate'],
    ['weekLabelAttributes', weekLabelAttributesProp, 'slotProps.weekLabel'],
    ['monthLabelAttributes', monthLabelAttributesProp, 'slotProps.monthLabel'],
    ['panelAttributes', panelAttributesProp, 'slotProps.panel'],
  ];
  deprecated.forEach(([name, value, replacement]) => {
    if (value !== undefined) warnDeprecatedProp('RdsCompContribution', name, "`" + replacement + "`");
  });
  const weekNames = weekdayLabels ?? weekNamesProp;
  const monthNames = monthLabelsProp ?? monthNamesProp;
  const panelColors = colors ?? panelColorsProp;
  const values = data ?? valuesProp;
  const until = endDate ?? untilProp;
  const weekLabelAttributes = slotProps?.weekLabel ?? weekLabelAttributesProp;
  const monthLabelAttributes = slotProps?.monthLabel ?? monthLabelAttributesProp;
  const panelAttributes = slotProps?.panel ?? panelAttributesProp;
  const columns = COLUMNS;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [viewportWidth, setViewportWidth] = useState(() => (typeof window === 'undefined' ? 1024 : window.innerWidth));

  useEffect(() => {
    const handler = () => setViewportWidth(window.innerWidth);
    handler();
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect?.width;
      if (typeof width === 'number' && width > 0) {
        setViewportWidth(width);
      }
    });
    ro.observe(el);
    const initial = el.getBoundingClientRect().width;
    if (initial > 0) setViewportWidth(initial);
    return () => ro.disconnect();
  }, []);

  const setRootRef = useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );

  const isMobile = viewportWidth <= 414;
  const { dynamicPanelSize, dynamicPanelMargin } = useMemo(() => {
    if (viewportWidth <= 320) {
      return { dynamicPanelSize: 8, dynamicPanelMargin: 1.2 };
    }
    if (viewportWidth <= 414) {
      return { dynamicPanelSize: 9, dynamicPanelMargin: 1.2 };
    }
    if (viewportWidth <= 834) {
      return { dynamicPanelSize: 8, dynamicPanelMargin: 2 };
    }
    return { dynamicPanelSize: panelSize, dynamicPanelMargin: panelMargin };
  }, [panelMargin, panelSize, viewportWidth]);

  const getPanelPosition = useCallback((colIndex: number, rowIndex: number) => {
    const bounds = dynamicPanelSize + dynamicPanelMargin;
    return {
      x: weekLabelWidth + bounds * colIndex,
      y: monthLabelHeight + bounds * rowIndex,
    };
  }, [dynamicPanelMargin, dynamicPanelSize, monthLabelHeight, weekLabelWidth]);

  const makeCalendarData = useCallback((history: { [k: string]: number }, lastDay: Dayjs | Date | string, columnCount: number) => {
    const d = typeof lastDay === 'string' ? dayjs(lastDay, dateFormat) : dayjs(lastDay);
    const lastWeekend = d.endOf('week');
    const endDate = d.endOf('day');
  
    const result: ({ value: number; month: number; date: string } | null)[][] = [];
    for (let i = 0; i < columnCount; i++) {
      result[i] = [];
      for (let j = 0; j < 7; j++) {
        const date = lastWeekend.subtract((columnCount - i - 1) * 7 + (6 - j), 'day');
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
  }, [dateFormat]);

  const contributions = useMemo(() => {
    if (!values || !until || !panelColors) return null;
    return makeCalendarData(values, until, columns);
  }, [values, until, columns, panelColors, makeCalendarData]);

  const weekLabels = useMemo(() => {
    if (!showWeekLabels) return null;
    if (!weekNames || weekNames.length < 7) return null;
    
    return Array.from({ length: 7 }, (_, j) => (
      <text
        className="rds-comp-contribution__text rds-comp-contribution__text--week"
        x={weekLabelWidth - 10}
        y={monthLabelHeight + j * (dynamicPanelSize + dynamicPanelMargin) + dynamicPanelSize / 2 + 4}
        textAnchor="end"
        {...weekLabelAttributes}
        key={`week_label_${j}`}
      >
        {weekNames[j] || ''}
      </text>
    ));
  }, [
    dynamicPanelMargin,
    dynamicPanelSize,
    monthLabelHeight,
    showWeekLabels,
    weekLabelAttributes,
    weekLabelWidth,
    weekNames,
  ]);

  const contributionPanels = useMemo(() => {
    if (!contributions || !panelColors) return [];
    const panels: ReactElement[] = [];
    
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
            key={`panel_${i}_${j}`}
          >
            <title>{`${contribution.date}: ${contribution.value}`}</title>
          </rect>
        );
      }
    }
    
    return panels;
  }, [
    columns,
    contributions,
    dynamicPanelSize,
    panelAttributes,
    panelColors,
    getPanelPosition,
  ]);

  const monthLabels = useMemo(() => {
    if (!contributions) return null;
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
          className={clsx(
            "rds-comp-contribution__text",
            "rds-comp-contribution__text--month",
            isMobile && "rds-comp-contribution__text--month-mobile"
          )}
          x={textBasePos.x - dynamicPanelSize / 2}
          y={monthLabelHeight / 2}
          textAnchor="middle"
          {...monthLabelAttributes}
          key={`month_${i}_${month}_${position}`}
        >
          {getMonthLabel(month)}
        </text>
      );
    });
  }, [
    columns,
    contributions,
    dynamicPanelSize,
    getPanelPosition,
    isMobile,
    monthLabelAttributes,
    monthLabelHeight,
    monthNames,
    showMonthLabels,
  ]);

  if (!panelColors) {
    return null;
  }
  if (!values || !until) {
    return null;
  }
  if (!contributions) {
    return null;
  }
  
  const calculatedSvgWidth = columns * (dynamicPanelSize + dynamicPanelMargin) + weekLabelWidth + dynamicPanelSize;
  const svgWidth = Math.max(calculatedSvgWidth, 280);
  const svgHeight = 7 * (dynamicPanelSize + dynamicPanelMargin) + monthLabelHeight;

  return (
    <Box
      {...rest}
      ref={setRootRef}
      className={clsx('rds-comp-contribution', className)}
      sx={sx}
    >
      <div className="rds-comp-contribution__container">
        <div className="rds-comp-contribution__wrapper">
          <svg
            className="rds-comp-contribution__svg"
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            role="img"
            aria-label="Contribution graph"
            data-testid="svg-icon"
          >
            <title>Contribution graph</title>
            {weekLabels}
            {contributionPanels}
            {monthLabels}
          </svg>
        </div>
      </div>
    </Box>
  );
};
RdsCompContribution.displayName = "RdsCompContribution";
export default RdsCompContribution;
