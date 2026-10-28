import { type ReactNode } from 'react';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import MuiTimeline, { type TimelineProps } from '@mui/lab/Timeline';
import MuiTimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import MuiTimelineSeparator from '@mui/lab/TimelineSeparator';
import MuiTimelineConnector from '@mui/lab/TimelineConnector';
import MuiTimelineContent from '@mui/lab/TimelineContent';
import MuiTimelineDot from '@mui/lab/TimelineDot';
import MuiTimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import './rds-timeline.scss';
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
  const isAlternate = timelinePosition === 'alternate' || timelinePosition === 'alternate-reverse';

  return (
    <MuiTimeline position={timelinePosition} {...props} className={clsx('rds-timeline', className)}>
      {items.map((item, index) => {
        if (item.time !== undefined) warnDeprecatedProp('RdsTimeline', 'items[].time', '`items[].opposite`');
        const opposite = item.opposite ?? (showTime ? item.time : undefined);
        return (
          <MuiTimelineItem
            key={item.id}
            sx={
              !opposite && !isAlternate
                ? {
                    [`&.${timelineItemClasses.missingOppositeContent}:before`]: {
                      flex: 0,
                      padding: 0,
                    },
                  }
                : undefined
            }
          >
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
              <Typography component="span" variant="subtitle2" className="rds-timeline__title">
                {item.title}
              </Typography>
              {item.description && (
                <Typography component="div" variant="body2" className="rds-timeline__description">
                  {item.description}
                </Typography>
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
