import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import RdsLoader from './rds-loader';
import { expect } from 'storybook/test';

const hideAllControls = {
  variant: { table: { disable: true } },
  size: { table: { disable: true } },
  color: { table: { disable: true } },
  value: { table: { disable: true } },
  label: { table: { disable: true } },
  overlay: { table: { disable: true } },
  thickness: { table: { disable: true } },
  type: { table: { disable: true } },
};

/** Stage so overlay/non-overlay share one centering box. */
const withOverlayStage = (Story: React.ComponentType) => (
  <>
    <style>{`
      .rds-loader-story-stage .rds-loader.rds-loader--overlay {
        position: absolute;
      }
    `}</style>
    <div
      className="rds-loader-story-stage"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <Story />
    </div>
  </>
);

const overlayStoryParameters = {
  layout: 'fullscreen' as const,
};

const meta: Meta<typeof RdsLoader> = {
  title: 'Elements/Loader',
  component: RdsLoader,
  parameters: {
        status: { type: 'stable' },
    layout: 'centered',
  },
  tags: ['autodocs', 'stable'],
  args: {
    overlay: false,
    value: 0,
    thickness: 3.6,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['linear', 'circular'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
    },
    value: {
      control: { type: 'range', min: 0, max: 100 },
    },
    label: {
      control: 'text',
      description: 'Optional loading label text',
    },
    overlay: {
      control: 'boolean',
    },
    thickness: {
      control: { type: 'range', min: 1, max: 10 },
    },
    type: {
      options: [
        'line-wobble',
        'loader-moving',
        'loader-hash',
        'loader-jump',
        'sand',
        'rolling-rock',
        'loader-round',
        'rotate',
        'spin',
        'triangle',
        'spinner-ring',
      ],
      control: { type: 'select' },
      description: 'Custom loader type. If specified, overrides variant and size.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'spinner-ring',
  },
  play: async ({ canvasElement }) => {
    const loader = canvasElement.querySelector('.rds-loader__spinner-ring');
    await expect(loader).toBeTruthy();
  },
};
Default.parameters = { controls: { include: ['type'] } };

export const AnimatedLinearProgress: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
      }, 800);
      return () => clearInterval(timer);
    }, []);

    return (
      <Box
        sx={{
          width: { xs: '100%', sm: '300px' },
          maxWidth: 300,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          boxSizing: 'border-box',
          overflowX: { xs: 'auto', sm: 'visible' },
        }}
      >
        <RdsLoader variant="linear" value={progress} label="Linear Progress" />
      </Box>
    );
  },
  argTypes: hideAllControls,
  parameters: {
    docs: {
      source: {
        code: `<RdsLoader variant="linear" value={progress} label="Linear Progress" />`,
      },
    },
  },
};

export const AnimatedCircularProgress: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
      }, 800);
      return () => clearInterval(timer);
    }, []);

    return (
      <Box sx={{ width: '300px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <RdsLoader variant="circular" value={progress} label="Circular Progress" />
      </Box>
    );
  },
  argTypes: hideAllControls,
  parameters: {
    docs: {
      source: {
        code: `<RdsLoader variant="circular" value={progress} label="Circular Progress" />`,
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        alignItems: 'center',
        flexWrap: 'wrap',
        boxSizing: 'border-box',
      }}
    >
      <RdsLoader variant="circular" color="primary" />
      <RdsLoader variant="circular" color="secondary" />
      <RdsLoader variant="circular" color="error" />
      <RdsLoader variant="circular" color="warning" />
      <RdsLoader variant="circular" color="info" />
      <RdsLoader variant="circular" color="success" />
    </Box>
  ),
  argTypes: hideAllControls,
  parameters: {
    docs: {
      source: {
        code: `<RdsLoader variant="circular" color="primary" />
              <RdsLoader variant="circular" color="secondary" />
              <RdsLoader variant="circular" color="error" />
              <RdsLoader variant="circular" color="warning" />
              <RdsLoader variant="circular" color="info" />
              <RdsLoader variant="circular" color="success" />`,
      },
    },
  },
};

export const CircularDefault: Story = {
  args: {
    variant: 'circular',
    size: 'medium',
    color: 'primary',
  },
  decorators: [withOverlayStage],
  parameters: {
    ...overlayStoryParameters,
    controls: { include: ['variant', 'type', 'value', 'label', 'overlay', 'thickness', 'color', 'size'] },
  },
};

export const CircularWithLabel: Story = {
  args: {
    variant: 'circular',
    size: 'medium',
    color: 'primary',
    label: 'Loading...',
  },
  decorators: [withOverlayStage],
  parameters: {
    ...overlayStoryParameters,
    controls: { include: ['variant', 'type', 'value', 'label', 'overlay', 'thickness', 'color', 'size'] },
  },
};

export const CircularDeterminate: Story = {
  args: {
    variant: 'circular',
    size: 'medium',
    color: 'primary',
    value: 75,
    label: 'Progress',
  },
  decorators: [withOverlayStage],
  parameters: {
    ...overlayStoryParameters,
    controls: { include: ['variant', 'type', 'value', 'label', 'overlay', 'thickness', 'color', 'size'] },
  },
};

export const LinearWithLabel: Story = {
  args: {
    variant: 'linear',
    color: 'primary',
    label: 'Loading content...',
  },
  decorators: [withOverlayStage],
  parameters: {
    ...overlayStoryParameters,
    controls: { include: ['variant', 'type', 'value', 'label', 'overlay', 'color', 'size'] },
  },
};

export const LinearDeterminate: Story = {
  args: {
    variant: 'linear',
    color: 'primary',
    value: 60,
    label: 'Upload progress',
  },
  decorators: [withOverlayStage],
  parameters: {
    ...overlayStoryParameters,
    controls: { include: ['variant', 'type', 'value', 'label', 'overlay', 'color', 'size'] },
  },
};

export const LineWobbleWithLabel: Story = {
  args: {
    type: 'line-wobble',
    label: 'Loading...'
  },
};
LineWobbleWithLabel.parameters = { controls: { include: ['type', 'label'] } };

export const LoaderHashWithLabel: Story = {
  args: {
    type: 'loader-hash',
    label: 'Hashing...'
  },
};
LoaderHashWithLabel.parameters = { controls: { include: ['type', 'label'] } };

export const LoaderJumpWithLabel: Story = {
  args: {
    type: 'loader-jump',
    label: 'Jumping...'
  },
};
LoaderJumpWithLabel.parameters = { controls: { include: ['type', 'label'] } };

export const LoaderMovingWithLabel: Story = {
  args: {
    type: 'loader-moving',
    label: 'Moving...'
  },
};
LoaderMovingWithLabel.parameters = { controls: { include: ['type', 'label'] } };

export const LoaderRoundWithLabel: Story = {
  args: {
    type: 'loader-round',
    label: 'Loading round...'
  },
};
LoaderRoundWithLabel.parameters = { controls: { include: ['type', 'label'] } };

export const LoadWithLabel: Story = {
  args: {
    type: 'spin',
    label: 'Spinning...'
  },
};
LoadWithLabel.parameters = { controls: { include: ['type', 'label'] } };

export const LoadingWithLabel: Story = {
  args: {
    type: 'spinner-ring',
    size: 'medium',
    label: 'Loading spinner...'
  },
};
LoadingWithLabel.parameters = { controls: { include: ['type', 'label'] } };

export const RotateWithLabel: Story = {
  args: {
    type: 'rotate',
    label: 'Rotating...'
  },
};
RotateWithLabel.parameters = { controls: { include: ['type', 'label'] } };

export const RollingRockWithLabel: Story = {
  args: {
    type: 'rolling-rock',
    label: 'Rolling...'
  },
};
RollingRockWithLabel.parameters = { controls: { include: ['type', 'label'] } };

export const Sizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      <RdsLoader variant="circular" size="small" color="primary" />
      <RdsLoader variant="circular" size="medium" color="secondary" />
      <RdsLoader variant="circular" size="large" color="success" />
    </Box>
  ),
  argTypes: hideAllControls,
  parameters: {
    docs: {
      source: {
        code: `<RdsLoader variant="circular" size="small" color="primary" />
              <RdsLoader variant="circular" size="medium" color="secondary" />
              <RdsLoader variant="circular" size="large" color="success" />`,
      },
    },
  },
};

export const SandWithLabel: Story = {
  args: {
    type: 'sand',
    label: 'Sifting sand...'
  },
};
SandWithLabel.parameters = { controls: { include: ['type', 'label'] } };

export const TriangleWithLabel: Story = {
  args: {
    type: 'triangle',
    label: 'Loading triangle...'
  },
};
TriangleWithLabel.parameters = { controls: { include: ['type', 'label'] } };

export const WithOverlay: Story = {
  render: () => {
    const [showOverlay, setShowOverlay] = useState(false);

    return (
      <Box sx={{ minHeight: '100vh', width: '100%', p: 2 }}>
        <Button
          variant="contained"
          onClick={() => {
            setShowOverlay(true);
            setTimeout(() => setShowOverlay(false), 3000);
          }}
          sx={{
            color: (theme) => theme.palette.mode === 'dark' ? '#fff' : undefined
          }}
        >
          Show Overlay Loader (3s)
        </Button>
        {showOverlay && (
          <RdsLoader
            variant="circular"
            size="large"
            color="primary"
            label="Processing..."
            overlay
          />
        )}
      </Box>
    );
  },
  argTypes: hideAllControls,
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: `<RdsLoader
                variant="circular"
                size="large"
                color="primary"
                label="Processing..."
                overlay
              />`,
      },
    },
  },
};