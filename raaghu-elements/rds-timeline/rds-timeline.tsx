import React from 'react';
import MuiTimeline from '@mui/lab/Timeline';
import {
  TimelineItem as MuiTimelineItem,
  TimelineSeparator as MuiTimelineSeparator,
  TimelineConnector as MuiTimelineConnector,
  TimelineContent as MuiTimelineContent,
  TimelineDot as MuiTimelineDot,
  TimelineOppositeContent as MuiTimelineOppositeContent,
  TimelineProps
} from '@mui/lab';
import { motion, useReducedMotion } from 'motion/react';
import { useMotionTokens } from '../../raaghu-react-themes/src/motion';

export interface RdsTimelineItem {
  id: string | number;
  title: string;
  description?: string;
  time?: string;
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'grey';
  variant?: 'filled' | 'outlined';
}

export interface RdsTimelineProps extends Omit<TimelineProps, 'children'> {
  items: RdsTimelineItem[];
  showTime?: boolean;
  alternating?: boolean;
  animationDuration?: number;
}

const MotionTimelineItem = motion(MuiTimelineItem);

const RdsTimeline: React.FC<RdsTimelineProps> = ({
  items,
  showTime = false,
  alternating = false,
  position,
  animationDuration,
  ...props
}) => {
  const tokens = useMotionTokens();
  const shouldReduce = useReducedMotion();
  const dur = typeof animationDuration === 'number' ? animationDuration / 1000 : tokens.slow;
  const timelinePosition = position || (alternating ? 'alternate' : 'right');

  return (
    <MuiTimeline position={timelinePosition} {...props}>
      {items.map((item, index) => (
          <MotionTimelineItem
            key={item.id}
            initial={shouldReduce ? false : { opacity: 0, x: alternating && index % 2 !== 0 ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={shouldReduce ? { duration: 0 } : {
              duration: dur,
              delay: index * 0.07,
              ease: [0, 0, 0.2, 1],
            }}
          >
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
          </MotionTimelineItem>
        ))}
    </MuiTimeline>
  );
};
RdsTimeline.displayName = 'RdsTimeline';
export default RdsTimeline;
