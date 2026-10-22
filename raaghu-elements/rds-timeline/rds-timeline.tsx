import { type ReactNode } from 'react';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
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
  /** @deprecated Use `opposite` instead. */
  time?: string;
  /** Content shown opposite the item. */
  opposite?: ReactNode;
  icon?: ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'grey';
  variant?: 'filled' | 'outlined';
}

/** Vertical timeline built on MUI Lab `Timeline`. `alternating` is shorthand for `position="alternate"`. */
export interface RdsTimelineProps extends Omit<TimelineProps, 'children' | 'component'> {
  items: RdsTimelineItem[];
  showTime?: boolean;
  /** @deprecated Use `position="alternate"` instead. */
  alternating?: boolean;
}

const RdsTimeline = ({
  items,
  showTime = false,
  alternating = false,
  position,
  className,
  ...props
}: RdsTimelineProps) => {
  if (alternating) warnDeprecatedProp('RdsTimeline', 'alternating', '`position="alternate"`');
  const timelinePosition = position || (alternating ? 'alternate' : 'right');

  return (
    <MuiTimeline position={timelinePosition} {...props} className={clsx('rds-timeline', className)}>
      {items.map((item, index) => {
        if (item.time !== undefined) warnDeprecatedProp('RdsTimeline', 'items[].time', '`items[].opposite`');
        const opposite = item.opposite ?? (showTime ? item.time : undefined);
        return (
          <MuiTimelineItem key={item.id}>
            {opposite && (
              <MuiTimelineOppositeContent color="text.secondary">
                {opposite}
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
        );
      })}
    </MuiTimeline>
  );
};
RdsTimeline.displayName = 'RdsTimeline';
export default RdsTimeline;
