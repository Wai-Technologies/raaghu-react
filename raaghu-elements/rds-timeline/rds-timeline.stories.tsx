import type { Meta, StoryObj } from '@storybook/react-vite';
import { 
  TimelineItem, 
  TimelineSeparator, 
  TimelineDot, 
  TimelineContent, 
  TimelineConnector,
  TimelineOppositeContent 
} from '@mui/lab';
import { Typography } from '@mui/material';
import { Fastfood, LaptopMac, Hotel, RepeatOne, FoodBank } from '@mui/icons-material';
import RdsTimeline from './rds-timeline';

const meta: Meta<typeof RdsTimeline> = {
  title: 'Elements/Timeline',
  component: RdsTimeline,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['left', 'right', 'alternate'],
    },
    showTime: {
      control: { type: 'boolean' },
    },
    alternating: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
              <TimelineContent>Eat</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Code</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>Sleep</TimelineContent>
        </TimelineItem>
      </>
    ),
  },
};

export const WithIcons: Story = {
  args: {
    children: (
      <>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot>
              <Fastfood />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ marginTop:"10px" }}>Eat</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <LaptopMac />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ marginTop:"10px" }}>Code</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="secondary">
              <Hotel />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent sx={{ marginTop:"10px" }}>Sleep</TimelineContent>
        </TimelineItem>
      </>
    ),
  },
};

export const WithOppositeContent: Story = {
  args: {
    children: (
      <>
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            09:30 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Eat breakfast</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            10:00 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Start coding</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            12:00 pm
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>Lunch break</TimelineContent>
        </TimelineItem>
      </>
    ),
  },
};

export const Alternate: Story = {
  args: {
    position: 'alternate',
    children: (
      <>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6" component="span">
              Eat
            </Typography>
            <Typography>Because you need strength</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="secondary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6" component="span">
              Code
            </Typography>
            <Typography>Because it&apos;s awesome!</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="success" />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6" component="span">
              Sleep
            </Typography>
            <Typography>Because you need rest</Typography>
          </TimelineContent>
        </TimelineItem>
      </>
    ),
  },
};

export const Right: Story = {
  args: {
    position: 'right',
    children: (
      <>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Task 1</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Task 2</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>Task 3</TimelineContent>
        </TimelineItem>
      </>
    ),
  },
};

export const WithItemsProp: Story = {
  args: {
    items: [
      {
        id: 1,
        title: 'Eat',
        description: 'Have a nutritious breakfast',
        time: '09:00 AM',
        color: 'primary',
        icon: <FoodBank />,
      },
      {
        id: 2,
        title: 'Code',
        description: 'Work on amazing projects',
        time: '10:00 AM',
        color: 'secondary',
        icon: <LaptopMac />,
      },
      {
        id: 3,
        title: 'Sleep',
        description: 'Get some rest',
        time: '10:00 PM',
        color: 'success',
        icon: <Hotel />,
      },
    ],
    showTime: true,
  },
};

