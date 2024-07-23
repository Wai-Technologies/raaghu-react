import dayjs from 'dayjs';
import React, { ReactElement } from 'react';
import Measure, { BoundingRect } from 'react-measure';

interface RdsCompContributorProps {
  weekNames?: string[]
  monthNames?: string[]
  panelColors?: string[]
  values: { [date: string]: number }
  until: string
  dateFormat?: string
  weekLabelAttributes: any | undefined
  monthLabelAttributes: any | undefined
  panelAttributes: any | undefined
  columns?: number
  maxWidth?: number
  monthLabelHeight?: number
  weekLabelWidth?: number
  panelSize?: number
  panelMargin?: number
}
  const RdsCompContributor = (props: RdsCompContributorProps) => {
    const monthLabelHeight = props.monthLabelHeight || 15;
    const weekLabelWidth = props.weekLabelWidth || 15;
    const panelSize = props.panelSize || 11;
    const panelMargin = props.panelMargin || 2;
    const columns = props.columns || 53;
    const maxWidth = props.maxWidth || 53;
    const [state, setState] = React.useState({
      columns,
      maxWidth
    });

    const getPanelPosition = (row: number, col: number) => {
      const bounds = panelSize + panelMargin;
      return {
        x: weekLabelWidth + bounds * row,
        y: monthLabelHeight + bounds * col
      };
    };

    const makeCalendarData = (history: { [k: string]: number }, lastDay: string, columns: number) => {
      const d = dayjs(lastDay, { format: props.dateFormat });
      const lastWeekend = d.endOf('week');
      const endDate = d.endOf('day');

      var result: ({ value: number, month: number } | null)[][] = [];
      for (var i = 0; i < columns; i++) {
        result[i] = [];
        for (var j = 0; j < 7; j++) {
          var date = lastWeekend.subtract((columns - i - 1) * 7 + (6 - j), 'day');
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
    };

    const updateSize = (size?: BoundingRect) =>{
      if (!size) return;

      const visibleWeeks = Math.floor((size.width - weekLabelWidth) / 13);
      setState((prevState) => ({
        ...prevState,
        columns: Math.min(visibleWeeks, prevState.maxWidth)
      }));
    }
    const contributions = makeCalendarData(props.values, props.until, columns);
    var innerDom: ReactElement[] = [];

    // panels
    for (var i = 0; i < columns; i++) {
      for (var j = 0; j < 7; j++) {
        var contribution = contributions[i][j];
        if (contribution === null) continue;
        const pos = getPanelPosition(i, j);
        const numOfColors = props.panelColors?.length || 0;
        const color =
          contribution.value >= numOfColors
            ? props.panelColors![numOfColors - 1]
            : props.panelColors![contribution.value];
        const dom = (
          <rect
            key={'panel_key_' + i + '_' + j}
            x={pos.x}
            y={pos.y}
            width={panelSize}
            height={panelSize}
            fill={color}
            {...props.panelAttributes}
          />
        );
        innerDom.push(dom);
      }
    }

    // week texts
    for (var i = 0; i < props.weekNames!.length; i++) {
      const textBasePos = getPanelPosition(0, i);
      const dom = (
        <text
          key={'week_key_' + i}
          style={{
            fontSize: 9,
            alignmentBaseline: 'central',
            fill: '#AAA'
          }}
          x={textBasePos.x - panelSize / 2 - 2}
          y={textBasePos.y + panelSize / 2}
          textAnchor={'middle'}
          {...props.weekLabelAttributes}
        >
          {props.weekNames![i]}
        </text>
      );
      innerDom.push(dom);
    }

    // month texts
    var prevMonth = -1;
    for (var i = 0; i < columns; i++) {
      const c = contributions[i][0];
      if (c === null) continue;
      if (columns > 1 && i == 0 && c.month != contributions[i + 1][0]?.month) {
        // skip first month name to avoid text overlap
        continue;
      }
      if (c.month != prevMonth) {
        var textBasePos = getPanelPosition(i, 0);
        innerDom.push(
          <text
            key={'month_key_' + i}
            style={{
              fontSize: 10,
              alignmentBaseline: 'central',
              fill: '#AAA'
            }}
            x={textBasePos.x + panelSize / 2}
            y={textBasePos.y - panelSize / 2 - 2}
            textAnchor={'middle'}
            {...props.monthLabelAttributes}
          >
            {props.monthNames![c.month]}
          </text>
        );
      }
      prevMonth = c.month;
    }

  return (
    <Measure bounds onResize={(rect) => updateSize(rect.bounds)}>
      {({ measureRef }) => (
        <div ref={measureRef} style={{ width: "100%" }}>
          <svg
            style={{
              fontFamily: 'poppins, sans-serif',
              width: '100%',
              stroke: 'none',
            }}
            className='contribution-svg'
            height="110">
            {innerDom}
          </svg>
        </div>
      )}
    </Measure>
  );  
}

export default RdsCompContributor;

