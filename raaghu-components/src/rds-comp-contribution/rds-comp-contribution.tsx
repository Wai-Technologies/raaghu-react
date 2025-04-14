import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import Measure, { BoundingRect } from 'react-measure';
import './rds-comp-contribution.css';

export interface RdsCompContributionProps {
  showMonthLabels?: boolean;
  weekNames?: string[];
  monthNames?: string[];
  panelColors?: string[];
  values: { [date: string]: number };
  until: string;
  dateFormat?: string;
  weekLabelAttributes: any | undefined;
  monthLabelAttributes: any | undefined;
  panelAttributes: any | undefined;
  monthLabelHeight: number;
  weekLabelWidth: number;
  panelSize?: number;
  panelMargin?: number;
}

export const RdsCompContribution = (props: RdsCompContributionProps) => {
  // Always show full year (53 columns) regardless of screen size
  const [columns] = useState(53);
  const [dynamicPanelSize, setDynamicPanelSize] = useState(props.panelSize ?? 12);
  const [dynamicPanelMargin, setDynamicPanelMargin] = useState(props.panelMargin ?? 1);
  const [containerWidth, setContainerWidth] = useState(0);

  const monthLabelHeight = props.monthLabelHeight || 20;
  const weekLabelWidth = props.weekLabelWidth || 30;
  const showMonth = props.showMonthLabels ?? true;
  const dateFormat = props.dateFormat || 'YYYY-MM-DD';

  // Effect to handle initial sizing and window resizing
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      updateSizeBasedOnWidth(width);
    };

    // Set initial size
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const updateSizeBasedOnWidth = (width: number) => {
    setContainerWidth(width);
    
    if (width < 300) {
      // For very small screens
      setDynamicPanelSize(5);
      setDynamicPanelMargin(1);
    } else if (width < 500) {
      // For small mobile screens
      setDynamicPanelSize(7);
      setDynamicPanelMargin(1);
    } else if (width < 800) {
      // For larger mobile screens
      setDynamicPanelSize(9);
      setDynamicPanelMargin(1);
    } else {
      // For larger screens
      setDynamicPanelSize(props.panelSize ?? 12);
      setDynamicPanelMargin(props.panelMargin ?? 2);
    }
  };

  const getPanelPosition = (row: number, col: number) => {
    const bounds = dynamicPanelSize + dynamicPanelMargin;
    return {
      x: weekLabelWidth + bounds * row,
      y: monthLabelHeight + bounds * col,
    };
  };

  const makeCalendarData = (history: { [k: string]: number }, lastDay: string, columns: number) => {
    const d = dayjs(lastDay, { format: dateFormat });
    const lastWeekend = d.endOf('week');
    const endDate = d.endOf('day');
  
    const result: ({ value: number; month: number; date: string } | null)[][] = [];
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
  };
  
  const updateSize = (size?: BoundingRect) => {
    if (!size) return;
    
    const availableWidth = size.width;
    updateSizeBasedOnWidth(availableWidth);
  };

  if (!props.panelColors || !props.weekNames || !props.monthNames) {
    console.warn('Missing required props: panelColors, weekNames, or monthNames');
    return null;
  }

  // Check if values and until are valid
  if (!props.values || !props.until) {
    console.warn('Missing required props: values or until');
    return null;
  }

  const contributions = makeCalendarData(props.values, props.until, columns);
  const innerDom: React.ReactElement[] = [];

  // Add week labels (uncommented - you can enable if needed)
  // if (props.weekNames && props.weekNames.length >= 7) {
  //   for (let j = 0; j < 7; j++) {
  //     innerDom.push(
  //       <text
  //         key={`week_label_${j}`}
  //         style={{
  //           fontSize: 9,
  //           fill: '#AAA',
  //         }}
  //         x={weekLabelWidth - 5}
  //         y={monthLabelHeight + j * (dynamicPanelSize + dynamicPanelMargin) + dynamicPanelSize / 2 + 3}
  //         textAnchor="end"
  //         {...props.weekLabelAttributes}
  //       >
  //         {props.weekNames[j] || ''}
  //       </text>
  //     );
  //   }
  // }

  // Add contribution panels
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < 7; j++) {
      const contribution = contributions[i][j];
      if (contribution === null) continue;
      const pos = getPanelPosition(i, j);
      const numOfColors = props.panelColors?.length ?? 0;
      const color =
        contribution.value >= numOfColors
          ? props.panelColors?.[numOfColors - 1]
          : props.panelColors?.[contribution.value];
      innerDom.push(
        <rect
          key={`panel_key_${i}_${j}`}
          x={pos.x}
          y={pos.y}
          width={dynamicPanelSize}
          height={dynamicPanelSize}
          fill={color}
          rx={2}
          ry={2}
          data-date={contribution.date}
          data-value={contribution.value}
          {...props.panelAttributes}
        />
      );
    }
  }

  
  if (showMonth && props.monthNames) {
    let prevMonth = -1;
    const monthLabelCounts = new Map<number, number>();
    
    for (let i = 0; i < columns; i++) {
      const c = contributions[i][0];
      if (c === null) continue;
      
      const monthCount = monthLabelCounts.get(c.month) || 0;
      monthLabelCounts.set(c.month, monthCount + 1);
    }
    
    // Second pass: render month labels
    for (let i = 0; i < columns; i++) {
      const c = contributions[i][0];
      if (c === null) continue;
      
      // For mobile views with limited columns, show each month at least once
      const isMobileView = columns < 30;
      const isFirstOccurrenceOfMonth = i === 0 || c.month !== contributions[i-1][0]?.month;
      
      // Show month label if:
      // 1. It's a mobile view and first occurrence of month, or
      // 2. It's not a mobile view and follows standard rules
      const shouldShowLabel = (
        (isMobileView && isFirstOccurrenceOfMonth) || 
        (!isMobileView && c.month !== prevMonth && !(columns > 1 && i === 0 && 
          contributions[i + 1]?.[0] && c.month !== contributions[i + 1][0]?.month))
      );
      
      if (shouldShowLabel) {
        const textBasePos = getPanelPosition(i, 0);
        innerDom.push(
          <text
            key={`month_key_${i}`}
            style={{
              fontSize: 10,
              alignmentBaseline: 'central',
              fill: '#AAA',
            }}
            x={textBasePos.x + dynamicPanelSize / 2}
            y={textBasePos.y - dynamicPanelSize / 2 - 2}
            textAnchor="middle"
            {...props.monthLabelAttributes}
          >
            {props.monthNames[c.month] || ''}
          </text>
        );
  
        prevMonth = c.month;
      }
    }
  }
  
  const svgWidth = columns * (dynamicPanelSize + dynamicPanelMargin) + weekLabelWidth;
  const svgHeight = 7 * (dynamicPanelSize + dynamicPanelMargin) + monthLabelHeight;

  return (
    <Measure bounds onResize={(rect) => updateSize(rect.bounds)}>
      {({ measureRef }: any) => (
        <div
          ref={measureRef}
          className="full-width custom-content-scroll"
          style={{
            background: 'none',
            width: '100%',
            overflowX: 'auto', 
            whiteSpace: 'nowrap', 
            paddingBottom: '8px', 
          }}
        >
          <svg
            className="contribution-svg contribution-font"
            width={svgWidth}
            height={svgHeight}
            style={{
              minWidth: `${svgWidth}px`, 
            }}
          >
            {innerDom}
          </svg>
        </div>
      )}
    </Measure>
  );
};

export default RdsCompContribution;