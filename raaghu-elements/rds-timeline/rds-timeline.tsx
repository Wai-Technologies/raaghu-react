import { type ReactNode } from 'react';
import MuiTimeline from '@mui/lab/Timeline';
import { 
  TimelineItem as MuiTimelineItem,
  TimelineSeparator as MuiTimelineSeparator,
  TimelineConnector as MuiTimelineConnector,
  TimelineContent as MuiTimelineContent,
  TimelineDot as MuiTimelineDot,
  TimelineOppositeContent as MuiTimelineOppositeContent,
  type TimelineProps
} from '@mui/lab';
export interface RdsTimelineItem {
  id: string | number;
  title: string;
  description?: string;
  time?: string;
  icon?: ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'grey';
  variant?: 'filled' | 'outlined';
}

export interface RdsTimelineProps extends Omit<TimelineProps, 'children' | 'component'> {
  items: RdsTimelineItem[];
  showTime?: boolean;
  alternating?: boolean;
}

const RdsTimeline = ({
  items,
  showTime = false,
  alternating = false,
  position,
  ...props
}: RdsTimelineProps) => {
  const timelinePosition = position || (alternating ? 'alternate' : 'right');

  return (
    <MuiTimeline position={timelinePosition} {...props}>
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
                <div style={{ marginTop: 'var(--rds-timeline-description-margin-top, var(--rds-spacing-xs))' }}>
                  {item.description}
                </div>
              )}
            </MuiTimelineContent>
          </MuiTimelineItem>
        ))}
    </MuiTimeline>
  );
};
RdsTimeline.displayName = 'RdsTimeline';
export default RdsTimeline;
