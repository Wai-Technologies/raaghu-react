import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import RdsTransition from './rds-transition';
import './rds-transition.stories.scss';

const meta: Meta<typeof RdsTransition> = {
  title: 'Elements/Transition',
  component: RdsTransition,
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['fade', 'grow', 'slide', 'zoom'],
      description: 'The type of transition effect',
    },
    direction: {
      control: 'select',
      options: ['up', 'down', 'left', 'right'],
      description: 'Direction for slide transition',
    },
    duration: {
      control: 'number',
      description: 'Duration of the transition in milliseconds',
    },
    in: {
      control: 'boolean',
      description: 'Whether the component is visible',
    },
    unmountOnExit: {
      control: 'boolean',
      description: 'Whether to unmount the component when not visible',
    },
    mountOnEnter: {
      control: 'boolean',
      description: 'Whether to mount the component initially',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default Story ───────────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    type: 'fade',
    direction: 'down',
    duration: 300,
    in: true,
    unmountOnExit: false,
  },
  render: (args) => (
    <div className="rds-transition__story rds-transition__pad">
      <RdsTransition {...args}>
        <Card className="rds-transition__card--md">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Transition Content
            </Typography>
            <Typography variant="body2" color="textSecondary">
              This is example content that will be displayed with the selected transition effect.
            </Typography>
          </CardContent>
        </Card>
      </RdsTransition>
    </div>
  ),
};

// ─── Interactive Story with Toggle ──────────────────────────────────────────
export const Interactive: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(true);
    const [transitionType, setTransitionType] = useState<'fade' | 'grow' | 'slide' | 'zoom'>('fade');
    const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('down');

    return (
      <div className="rds-transition__story rds-transition__pad">
        <div className="rds-transition__stack rds-transition__stack--mb">
          <Button
            variant="contained"
            onClick={() => setIsVisible(!isVisible)}
            className="rds-transition__btn-fit"
          >
            {isVisible ? 'Hide' : 'Show'} Content
          </Button>

          <div className="rds-transition__row rds-transition__wrap">
            {(['fade', 'grow', 'slide', 'zoom'] as const).map((type) => (
              <Button
                key={type}
                variant={transitionType === type ? 'contained' : 'outlined'}
                size="small"
                onClick={() => setTransitionType(type)}
              >
                {type}
              </Button>
            ))}
          </div>

          {transitionType === 'slide' && (
            <div className="rds-transition__row rds-transition__wrap">
              {(['up', 'down', 'left', 'right'] as const).map((dir) => (
                  <Button
                    key={dir}
                    variant={direction === dir ? 'contained' : 'outlined'}
                    size="small"
                    onClick={() => setDirection(dir)}
                  >
                    {dir}
                  </Button>
                ))}
              </div>
          )}
        </div>

        <RdsTransition
          type={transitionType}
          direction={direction}
          in={isVisible}
          duration={300}
          unmountOnExit={false}
        >
          <Card className="rds-transition__card--md">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {transitionType.toUpperCase()} Transition
              </Typography>
              <Typography variant="body2" color="textSecondary" className="rds-transition__mb-sm">
                Transition Type: <strong>{transitionType}</strong>
              </Typography>
              {transitionType === 'slide' && (
                <Typography variant="body2" color="textSecondary">
                  Direction: <strong>{direction}</strong>
                </Typography>
              )}
            </CardContent>
          </Card>
        </RdsTransition>
      </div>
    );
  },
};

// ─── Fade Transition Story ──────────────────────────────────────────────────
export const FadeTransition: Story = {
  args: {
    type: 'fade',
    duration: 300,
    in: true,
  },
  render: (args) => (
    <div className="rds-transition__story rds-transition__pad">
      <RdsTransition {...args}>
        <Card className="rds-transition__card--md rds-transition__bg-f5">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Fade Transition
            </Typography>
            <Typography variant="body2">
              This content fades in and out smoothly.
            </Typography>
          </CardContent>
        </Card>
      </RdsTransition>
    </div>
  ),
};

// ─── Grow Transition Story ──────────────────────────────────────────────────
export const GrowTransition: Story = {
  args: {
    type: 'grow',
    duration: 300,
    in: true,
  },
  render: (args) => (
    <div className="rds-transition__story rds-transition__pad">
      <RdsTransition {...args}>
        <Card className="rds-transition__card--md rds-transition__bg-e3f">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Grow Transition
            </Typography>
            <Typography variant="body2">
              This content grows from the center outward.
            </Typography>
          </CardContent>
        </Card>
      </RdsTransition>
    </div>
  ),
};

// ─── Slide Transition Story ─────────────────────────────────────────────────
export const SlideTransition: Story = {
  args: {
    type: 'slide',
    direction: 'up',
    duration: 300,
    in: true,
  },
  render: (args) => (
    <div className="rds-transition__story rds-transition__pad">
      <div className="rds-transition__stack">
        {(['up', 'down', 'left', 'right'] as const).map((dir) => (
          <div key={dir} className="rds-transition__slide-item">
            <Typography variant="subtitle2" className="rds-transition__mb-xs">
              Slide {dir}:
            </Typography>
            <RdsTransition {...args} direction={dir}>
              <Card className="rds-transition__card--sm rds-transition__bg-f3e">
                <CardContent>
                  <Typography variant="body2">
                    Slides in from the {dir}
                  </Typography>
                </CardContent>
              </Card>
            </RdsTransition>
          </div>
        ))}
      </div>
    </div>
  ),
};

// ─── Zoom Transition Story ──────────────────────────────────────────────────
export const ZoomTransition: Story = {
  args: {
    type: 'zoom',
    duration: 300,
    in: true,
  },
  render: (args) => (
    <div className="rds-transition__story rds-transition__pad">
      <RdsTransition {...args}>
        <Card className="rds-transition__card--md rds-transition__bg-e8f">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Zoom Transition
            </Typography>
            <Typography variant="body2">
              This content zooms in from a smaller size.
            </Typography>
          </CardContent>
        </Card>
      </RdsTransition>
    </div>
  ),
};

// ─── Duration Variations Story ──────────────────────────────────────────────
export const DurationVariations: Story = {
  render: () => (
    <div className="rds-transition__story rds-transition__pad">
      <div className="rds-transition__stack rds-transition__stack--space">
        {[200, 300, 500, 800].map((duration) => (
          <div key={duration} className="rds-transition__duration-item">
            <Typography variant="subtitle2" className="rds-transition__mb-xs">
              Duration: {duration}ms
            </Typography>
            <RdsTransition type="fade" duration={duration} in={true}>
              <Card className="rds-transition__card--sm">
                <CardContent>
                  <Typography variant="body2">
                    This transition takes {duration}ms
                  </Typography>
                </CardContent>
              </Card>
            </RdsTransition>
          </div>
        ))}
      </div>
    </div>
  ),
};

// ─── Unmount On Exit Story ──────────────────────────────────────────────────
export const UnmountOnExit: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(true);

    return (
      <div className="rds-transition__story rds-transition__pad">
        <Button
          variant="contained"
          onClick={() => setIsVisible(!isVisible)}
          className="rds-transition__mb-sm"
        >
          {isVisible ? 'Hide' : 'Show'} Content (Unmounts on Exit)
        </Button>

        <RdsTransition
          type="fade"
          in={isVisible}
          duration={300}
          unmountOnExit={true}
        >
          <Card className="rds-transition__card--md">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Content with Unmount
              </Typography>
              <Typography variant="body2">
                This component is unmounted when hidden (not just invisible).
              </Typography>
            </CardContent>
          </Card>
        </RdsTransition>
      </div>
    );
  },
};

// ─── Custom Styling Story ───────────────────────────────────────────────────
export const CustomStyling: Story = {
  args: {
    type: 'grow',
    duration: 400,
    in: true,
    className: 'custom-transition',
  },
  render: (args) => (
    <div className="rds-transition__story rds-transition__pad">
      <RdsTransition {...args}>
        <Card className="rds-transition__card--md">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Custom Styled
            </Typography>
            <Typography variant="body2">
              This transition has custom styling applied.
            </Typography>
          </CardContent>
        </Card>
      </RdsTransition>
    </div>
  ),
};
