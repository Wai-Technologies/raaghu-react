import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useState, useEffect } from 'react';
import Measure from 'react-measure';
import './rds-comp-contribution.scss';
import SvgIcon from '@mui/material/SvgIcon';
import {
  renderWeekLabels,
  renderContributionPanels,
  renderMonthLabels,
  updateSizeBasedOnWidth,
  updateSizeFromBounds,
  makeCalendarData,
} from './rds-comp-contribution-helpers';

dayjs.extend(customParseFormat);

export interface RdsCompContributionProps {  
  showMonthLabels?: boolean;
  showWeekLabels?: boolean;
  weekNames?: string[];
  monthNames?: string[];
  panelColors?: string[];
  values: { [date: string]: number };
  until: string;
  dateFormat?: string;
  weekLabelAttributes?: React.SVGProps<SVGTextElement>;
  monthLabelAttributes?: React.SVGProps<SVGTextElement>;
  panelAttributes?: React.SVGProps<SVGRectElement>;
  monthLabelHeight?: number;
  weekLabelWidth?: number;
  panelSize?: number;
  panelMargin?: number;
}

const RdsCompContribution: React.FC<RdsCompContributionProps> = ({
  showMonthLabels = true,
  showWeekLabels = false,
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
  const columns = 53;
  const [dynamicPanelSize, setDynamicPanelSize] = useState(panelSize);
  const [dynamicPanelMargin, setDynamicPanelMargin] = useState(panelMargin);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = globalThis.innerWidth;
      updateSizeBasedOnWidth(width, panelSize, panelMargin, setDynamicPanelSize, setDynamicPanelMargin);
      setIsMobile(width <= 414); 
    };
    handleResize();
    globalThis.addEventListener('resize', handleResize);
    return () => {
      globalThis.removeEventListener('resize', handleResize);
    };
  }, [panelSize, panelMargin]);

  const getPanelPosition = (colIndex: number, rowIndex: number) => {
    const bounds = dynamicPanelSize + dynamicPanelMargin;
    return {
      x: weekLabelWidth + bounds * colIndex,
      y: monthLabelHeight + bounds * rowIndex,
    };
  };

  const contributions = React.useMemo(() => {
    if (!values || !until || !panelColors) return null;
    return makeCalendarData(values, until, columns, dateFormat, dayjs);
  }, [values, until, columns, dateFormat, panelColors]);

  if (!panelColors || !values || !until || !contributions) {
    return null;
  }

  const calculatedSvgWidth = columns * (dynamicPanelSize + dynamicPanelMargin) + weekLabelWidth + dynamicPanelSize;
  const svgWidth = Math.max(calculatedSvgWidth, 280);
  const svgHeight = 7 * (dynamicPanelSize + dynamicPanelMargin) + monthLabelHeight;

  return (
    <Measure bounds onResize={(rect) => updateSizeFromBounds(rect.bounds, panelSize, panelMargin, setDynamicPanelSize, setDynamicPanelMargin)}>
      {({ measureRef }: { measureRef: (ref: HTMLDivElement | null) => void }) => (
        <div ref={measureRef} className="rds-comp-contribution">
          <div className="rds-comp-contribution__container">
            <div className="rds-comp-contribution__wrapper">
              <SvgIcon
                className="rds-comp-contribution__svg"
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                sx={{ width: '100%', height: 'auto', maxWidth: '100%', minWidth: 'unset' }}
              >
                {renderWeekLabels({ showWeekLabels, weekNames, weekLabelWidth, monthLabelHeight, dynamicPanelSize, dynamicPanelMargin, weekLabelAttributes })}
                {renderContributionPanels({ contributions, columns, panelColors, dynamicPanelSize, dynamicPanelMargin, weekLabelWidth, monthLabelHeight, panelAttributes, getPanelPosition })}
                {renderMonthLabels({ showMonthLabels, monthNames, contributions, columns, isMobile, dynamicPanelSize, monthLabelHeight, monthLabelAttributes, getPanelPosition })}
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
