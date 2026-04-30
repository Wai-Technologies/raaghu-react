import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useState, useEffect } from 'react';
import Measure, { BoundingRect } from 'react-measure';
import './rds-comp-contribution.scss';
import SvgIcon from '@mui/material/SvgIcon';

dayjs.extend(customParseFormat);

export interface RdsCompContributionProps {  
  showMonthLabels?: boolean;
  weekNames?: string[];
  monthNames?: string[];
  panelColors?: string[];
  values: { [date: string]: number };
  until: string;
  dateFormat?: string;
  weekLabelAttributes?: any;
  monthLabelAttributes?: any;
  panelAttributes?: any;
  monthLabelHeight?: number;
  weekLabelWidth?: number;
  panelSize?: number;
  panelMargin?: number;
}

const RdsCompContribution: React.FC<RdsCompContributionProps> = ({
  showMonthLabels = true,
  weekNames,
  monthNames,
  panelColors,
  values,
  until,
  dateFormat = 'YYYY-MM-DD',
  weekLabelAttributes,
  monthLabelAttributes,
  panelAttributes,
  monthLabelHeight = 28,
  weekLabelWidth = 24,
  panelSize = 11,
  panelMargin = 2,
}) => {
  const [columns] = useState(53);
  const [dynamicPanelSize, setDynamicPanelSize] = useState(panelSize);
  const [dynamicPanelMargin, setDynamicPanelMargin] = useState(panelMargin);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      updateSizeBasedOnWidth(width);
      setIsMobile(width <= 414); 
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const updateSizeBasedOnWidth = (width: number) => {
    // Responsive sizing for specific screen sizes
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
  };

  const getPanelPosition = (row: number, col: number) => {
    const bounds = dynamicPanelSize + dynamicPanelMargin;
    return {
      x: weekLabelWidth + bounds * row,
      y: monthLabelHeight + bounds * col,
    };
  };

  const makeCalendarData = (history: { [k: string]: number }, lastDay: string, columns: number) => {
    const d = dayjs(lastDay, dateFormat);
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

  if (!panelColors || !weekNames) {
    return null;
  }
  if (!values || !until) {
    return null;
  }
  const contributions = makeCalendarData(values, until, columns);
  const renderWeekLabels = () => {
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
  };

  const renderContributionPanels = () => {
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
  };

  const renderMonthLabels = () => {
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
  };
  
  const calculatedSvgWidth = columns * (dynamicPanelSize + dynamicPanelMargin) + weekLabelWidth + dynamicPanelSize;
  const svgWidth = Math.max(calculatedSvgWidth, 280);
  const svgHeight = 7 * (dynamicPanelSize + dynamicPanelMargin) + monthLabelHeight;

  return (
    <Measure bounds onResize={(rect) => updateSize(rect.bounds)}>
      {({ measureRef }: any) => (
        <div
          ref={measureRef}
          className="rds-comp-contribution"
        >
          <div className="rds-comp-contribution__container">
            <div className="rds-comp-contribution__wrapper">
              <SvgIcon
                className="rds-comp-contribution__svg"
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                sx={{ 
                  width: '100%', 
                  height: 'auto', 
                  maxWidth: '100%',
                  minWidth: 'unset'
                }}
              >
                {renderContributionPanels()}
                {renderMonthLabels()}
              </SvgIcon>
            </div>
          </div>
        </div>
      )}
    </Measure>
  );
};
RdsCompContribution.displayName = "RdsCompContribution";
export default RdsCompContribution;
