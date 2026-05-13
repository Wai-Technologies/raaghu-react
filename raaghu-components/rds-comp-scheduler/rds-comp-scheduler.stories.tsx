import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompScheduler, { SchedulerEvent } from './rds-comp-scheduler';
import { Box } from '@mui/material';

const meta: Meta<typeof RdsCompScheduler> = {
  title: 'Components/Scheduler',
  component: RdsCompScheduler,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The **Scheduler** component is a powerful calendar interface for managing events and time-based activities. It supports multiple view types (month, week, day), color-coded events, event management (create, edit, delete), and both controlled and uncontrolled modes. Perfect for displaying calendars, booking systems, meeting schedules, and project timelines.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    view: {
      control: 'select',
      options: ['month', 'week', 'day'],
      description: 'Calendar view type',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the scheduler',
    },
    showControls: {
      control: 'boolean',
      description: 'Show navigation controls',
    },
    disableFuture: {
      control: 'boolean',
      description: 'Disable selection of future dates',
    },
    disablePast: {
      control: 'boolean',
      description: 'Disable selection of past dates',
    },
  },
} satisfies Meta<typeof RdsCompScheduler>;

export default meta;
type Story = StoryObj<typeof RdsCompScheduler>;

// Sample events
const generateEvents = (): SchedulerEvent[] => {
  const today = new Date();
  return [
    {
      id: 'event-1',
      title: 'Team Meeting',
      startDate: today.toISOString(),
      endDate: new Date(today.getTime() + 3600000).toISOString(),
      description: 'Weekly sync with the team',
      color: 'primary',
      allDay: false,
    },
    {
      id: 'event-2',
      title: 'Project Deadline',
      startDate: new Date(today.getTime() + 86400000 * 2).toISOString(),
      endDate: new Date(today.getTime() + 86400000 * 2 + 3600000).toISOString(),
      description: 'Submit final deliverables',
      color: 'error',
      allDay: false,
    },
    {
      id: 'event-3',
      title: 'Conference',
      startDate: new Date(today.getTime() + 86400000 * 5).toISOString(),
      endDate: new Date(today.getTime() + 86400000 * 7).toISOString(),
      description: 'Annual tech conference',
      color: 'success',
      allDay: true,
    },
    {
      id: 'event-4',
      title: 'Code Review',
      startDate: new Date(today.getTime() + 86400000).toISOString(),
      endDate: new Date(today.getTime() + 86400000 + 1800000).toISOString(),
      description: 'Review PR #123',
      color: 'info',
      allDay: false,
    },
    {
      id: 'event-5',
      title: 'Lunch Break',
      startDate: new Date(today.getTime() + 86400000 * 3).toISOString(),
      endDate: new Date(today.getTime() + 86400000 * 3 + 3600000).toISOString(),
      color: 'warning',
      allDay: false,
    },
  ];
};

// ─── Default Story ──────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    events: generateEvents(),
    view: 'month',
    size: 'medium',
    showControls: true,
  },
  render: (args) => (
    <Box style={{ height: '600px' }}>
      <RdsCompScheduler {...args} />
    </Box>
  ),
};

// ─── Empty State ─────────────────────────────────────────────────────────
export const EmptyState: Story = {
  args: {
    events: [],
    view: 'month',
    size: 'medium',
    showControls: true,
  },
  render: (args) => (
    <Box style={{ height: '500px' }}>
      <RdsCompScheduler {...args} />
    </Box>
  ),
};
