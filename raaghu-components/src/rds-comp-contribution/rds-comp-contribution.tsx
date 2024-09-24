import dayjs from 'dayjs';
import React, { useState, ReactElement } from 'react';
import Measure, { BoundingRect } from 'react-measure';
import './rds-comp-contribution.css';

export interface RdsCompContributionProps {
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

export interface State {
  columns: number;
  maxWidth: number;
}

export const RdsCompContribution = (props: RdsCompContributionProps) => {
  const [columns, setColumns] = useState(53);
  const [maxWidth, setMaxWidth] = useState(53);

  const monthLabelHeight = props.monthLabelHeight;
  const weekLabelWidth = props.weekLabelWidth;
  const panelSize = props.panelSize;
  const panelMargin = props.panelMargin;

  const getPanelPosition = (row: number, col: number) => {
    const bounds = (panelSize ?? 0) + (panelMargin ?? 0);
    return {
      x: weekLabelWidth + bounds * row,
      y: monthLabelHeight + bounds * col,
    };
  };

  const makeCalendarData = (history: { [k: string]: number }, lastDay: string, columns: number) => {
    const d = dayjs(lastDay, { format: props.dateFormat });
    const lastWeekend = d.endOf('week');
    const endDate = d.endOf('day');

    const result: ({ value: number, month: number } | null)[][] = [];
    for (let i = 0; i < columns; i++) {
      result[i] = [];
      for (let j = 0; j < 7; j++) {
        const date = lastWeekend.subtract((columns - i - 1) * 7 + (6 - j), 'day');
        if (date <= endDate) {
          result[i][j] = {
            value: history[date.format(props.dateFormat)] || 0,
            month: date.month()
          };
        } else {
          result[i][j] = null;
        }
      }
    }

    return result;
  }

  const updateSize = (size?: BoundingRect) => {
    if (!size) return;

    const visibleWeeks = Math.floor((size.width - weekLabelWidth) / 13);
    setColumns(Math.min(visibleWeeks, maxWidth));
  };

    // TODO: More sophisticated typing
    if (props.panelColors == undefined || props.weekNames == undefined || props.monthNames == undefined) {
      return;
    }
    
    const contributions = makeCalendarData(props.values, props.until, columns);
    const innerDom: React.ReactElement[] = [];

    // panels
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
        const dom = (
          <rect
            key={ 'panel_key_' + i + '_' + j }
            x={ pos.x }
            y={ pos.y }
            width={ panelSize }
            height={ panelSize }
            fill={ color }
            { ...props.panelAttributes }
          />
        );
        innerDom.push(dom);
      }
    }

    // week texts
    for (let i = 0; i < (props.weekNames ?? []).length; i++) {
      const textBasePos = getPanelPosition(0, i);
      const dom = (
        <text
          key={ 'week_key_' + i }
          style={ {
            fontSize: 9,
            alignmentBaseline: 'central',
            fill: '#AAA',
          } }
          x={ textBasePos.x - (panelSize ?? 0) / 2 - 2 }
          y={ textBasePos.y + (panelSize ?? 0) / 2 }
          textAnchor={ 'middle' }
          { ...props.weekLabelAttributes }
        >
          { props.weekNames?.[i] ?? '' }
        </text>
      );
      innerDom.push(dom);
    }

    // month texts
    let prevMonth = -1;
    for (let i = 0; i < columns; i++) {
      const c = contributions[i][0];
      if (c === null) continue;
      if (columns > 1 && i === 0 && c.month !== contributions[i + 1][0]?.month) {
        // skip first month name to avoid text overlap
        continue;
      }
      if (c.month !== prevMonth) {
        const textBasePos = getPanelPosition(i, 0);
        innerDom.push(<text
            key={ 'month_key_' + i }
            style={ {
              fontSize: 10,
              alignmentBaseline: 'central',
              fill: '#AAA',
            } }
            x={ textBasePos.x + (panelSize ?? 0) / 2 }
            y={ textBasePos.y - (panelSize ?? 0) / 2 - 2 }
            textAnchor={ 'middle' }
            { ...props.monthLabelAttributes }
          >
            { props.monthNames?.[c.month] ?? '' }
          </text>
        );
      }
      prevMonth = c.month;
    }

    return (
      <Measure bounds onResize={ (rect: { bounds: any; }) => updateSize(rect.bounds) }>
        { ({ measureRef }: any) => (
          <div ref={ measureRef } className="full-width">
            <svg
              className='contribution-svg contribution-font'>
              { innerDom }
            </svg>
          </div>
        ) }
      </Measure>
    );
  }

export default RdsCompContribution;