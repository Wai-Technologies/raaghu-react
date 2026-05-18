import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Typography, Stack } from '@mui/material';
import RdsTransition from './rds-transition';

const meta: Meta<typeof RdsTransition> = {
  title: 'Elements/Transition',
  component: RdsTransition,
  parameters: {
    layout: 'padded',
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
    <Box sx={{ p: 3 }}>
      <RdsTransition {...args}>
        <Card sx={{ maxWidth: 400 }}>
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
    </Box>
  ),
};

// ─── Interactive Story with Toggle ──────────────────────────────────────────
export const Interactive: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(true);
    const [transitionType, setTransitionType] = useState<'fade' | 'grow' | 'slide' | 'zoom'>('fade');
    const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('down');

    return (
      <Box sx={{ p: 3 }}>
        <Stack spacing={2} sx={{ mb: 3 }}>
          <Button
            variant="contained"
            onClick={() => setIsVisible(!isVisible)}
            sx={{ width: 'fit-content' }}
          >
            {isVisible ? 'Hide' : 'Show'} Content
          </Button>

          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
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
          </Stack>

          {transitionType === 'slide' && (
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
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
            </Stack>
          )}
        </Stack>

        <RdsTransition
          type={transitionType}
          direction={direction}
          in={isVisible}
          duration={300}
          unmountOnExit={false}
        >
          <Card sx={{ maxWidth: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {transitionType.toUpperCase()} Transition
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
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
      </Box>
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
    <Box sx={{ p: 3 }}>
      <RdsTransition {...args}>
        <Card sx={{ maxWidth: 400, backgroundColor: '#f5f5f5' }}>
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
    </Box>
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
    <Box sx={{ p: 3 }}>
      <RdsTransition {...args}>
        <Card sx={{ maxWidth: 400, backgroundColor: '#e3f2fd' }}>
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
    </Box>
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
    <Box sx={{ p: 3 }}>
      <Stack spacing={2}>
        {(['up', 'down', 'left', 'right'] as const).map((dir) => (
          <Box key={dir}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Slide {dir}:
            </Typography>
            <RdsTransition {...args} direction={dir}>
              <Card sx={{ maxWidth: 300, backgroundColor: '#f3e5f5' }}>
                <CardContent>
                  <Typography variant="body2">
                    Slides in from the {dir}
                  </Typography>
                </CardContent>
              </Card>
            </RdsTransition>
          </Box>
        ))}
      </Stack>
    </Box>
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
    <Box sx={{ p: 3 }}>
      <RdsTransition {...args}>
        <Card sx={{ maxWidth: 400, backgroundColor: '#e8f5e9' }}>
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
    </Box>
  ),
};

// ─── Duration Variations Story ──────────────────────────────────────────────
export const DurationVariations: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>
        {[200, 300, 500, 800].map((duration) => (
          <Box key={duration}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Duration: {duration}ms
            </Typography>
            <RdsTransition type="fade" duration={duration} in={true}>
              <Card sx={{ maxWidth: 300 }}>
                <CardContent>
                  <Typography variant="body2">
                    This transition takes {duration}ms
                  </Typography>
                </CardContent>
              </Card>
            </RdsTransition>
          </Box>
        ))}
      </Stack>
    </Box>
  ),
};

// ─── Unmount On Exit Story ──────────────────────────────────────────────────
export const UnmountOnExit: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(true);

    return (
      <Box sx={{ p: 3 }}>
        <Button
          variant="contained"
          onClick={() => setIsVisible(!isVisible)}
          sx={{ mb: 2 }}
        >
          {isVisible ? 'Hide' : 'Show'} Content (Unmounts on Exit)
        </Button>

        <RdsTransition
          type="fade"
          in={isVisible}
          duration={300}
          unmountOnExit={true}
        >
          <Card sx={{ maxWidth: 400 }}>
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
      </Box>
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
    style: {
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    },
  },
  render: (args) => (
    <Box sx={{ p: 3 }}>
      <RdsTransition {...args}>
        <Card sx={{ maxWidth: 400 }}>
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
    </Box>
  ),
};
