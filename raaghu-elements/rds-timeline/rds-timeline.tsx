import React from 'react';
import {
  Timeline as MuiTimeline,
  TimelineItem as MuiTimelineItem,
  TimelineSeparator as MuiTimelineSeparator,
  TimelineConnector as MuiTimelineConnector,
  TimelineContent as MuiTimelineContent,
  TimelineDot as MuiTimelineDot,
  TimelineOppositeContent as MuiTimelineOppositeContent,
  TimelineProps
} from '@mui/lab';
import './rds-timeline.scss';

export interface RdsTimelineItem {
  id: string | number;
  title: string;
  description?: string;
  time?: string;
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'grey';
  variant?: 'filled' | 'outlined';
}

export interface RdsTimelineProps extends TimelineProps {
  items?: RdsTimelineItem[];
  showTime?: boolean;
  alternating?: boolean;
  children?: React.ReactNode;
}

const RdsTimeline: React.FC<RdsTimelineProps> = ({
  items,
  showTime = false,
  alternating = false,
  position,
  children,
  className,
  ...props
}) => {
  const timelinePosition = position || (alternating ? 'alternate' : 'right');

  // If children are provided, use them directly (for flexibility like in stories)
  if (children) {
    return (
      <MuiTimeline
        position={timelinePosition}
        className={`rds-timeline ${className ?? ''}`}
        {...props}
      >
        {children}
      </MuiTimeline>
    );
  }

  // If items are provided, render using the items structure
  if (items && items.length > 0) {
    return (
      <MuiTimeline
        position={timelinePosition}
        className={`rds-timeline ${className ?? ''}`}
        {...props}
      >
        {items.map((item, index) => (
          <MuiTimelineItem key={item.id}>
            {showTime && item.time && (
              <MuiTimelineOppositeContent color="text.secondary">
                {item.time}
              </MuiTimelineOppositeContent>
            )}
            <MuiTimelineSeparator>
              <MuiTimelineDot color={item.color} variant={item.variant}>
                {item.icon}
              </MuiTimelineDot>
              {index < items.length - 1 && <MuiTimelineConnector />}
            </MuiTimelineSeparator>
            <MuiTimelineContent>
              <strong>{item.title}</strong>
              {item.description && (
                <div style={{ marginTop: 4, color: 'rgba(0, 0, 0, 0.6)' }}>
                  {item.description}
                </div>
              )}
            </MuiTimelineContent>
          </MuiTimelineItem>
        ))}
      </MuiTimeline>
    );
  }

  // Return empty timeline if neither children nor items are provided
  return (
    <MuiTimeline
      position={timelinePosition}
      className={`rds-timeline ${className ?? ''}`}
      {...props}
    />
  );
};
RdsTimeline.displayName = 'RdsTimeline';
export default RdsTimeline;
