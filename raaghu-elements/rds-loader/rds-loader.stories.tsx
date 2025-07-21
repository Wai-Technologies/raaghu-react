import type { Meta, StoryObj } from '@storybook/react';
import { Box, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import RdsLoader from './rds-loader';

const meta: Meta<typeof RdsLoader> = {
  title: 'Elements/Loader',
  component: RdsLoader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
    overlay: {
      control: 'boolean',
    },
    thickness: {
      control: { type: 'range', min: 1, max: 10 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CircularDefault: Story = {
  args: {
    variant: 'circular',
    size: 'medium',
    color: 'primary',
  },
};

export const CircularWithLabel: Story = {
  args: {
    variant: 'circular',
    size: 'medium',
    color: 'primary',
    label: 'Loading...',
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
};

export const LinearDefault: Story = {
  args: {
    variant: 'linear',
    color: 'primary',
  },
};

export const LinearWithLabel: Story = {
  args: {
    variant: 'linear',
    color: 'primary',
    label: 'Loading content...',
  },
};

export const LinearDeterminate: Story = {
  args: {
    variant: 'linear',
    color: 'primary',
    value: 60,
    label: 'Upload progress',
  },
};

export const Sizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      <RdsLoader variant="circular" size="small" color="primary" />
      <RdsLoader variant="circular" size="medium" color="secondary" />
      <RdsLoader variant="circular" size="large" color="success" />
    </Box>
  ),
};

export const Colors: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      <RdsLoader variant="circular" color="primary" />
      <RdsLoader variant="circular" color="secondary" />
      <RdsLoader variant="circular" color="error" />
      <RdsLoader variant="circular" color="warning" />
      <RdsLoader variant="circular" color="info" />
      <RdsLoader variant="circular" color="success" />
    </Box>
  ),
};

export const AnimatedProgress: Story = {
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
        <RdsLoader variant="linear" value={progress} label="Linear Progress" />
      </Box>
    );
  },
};

export const WithOverlay: Story = {
  render: () => {
    const [showOverlay, setShowOverlay] = useState(false);

    return (
      <Box>
        <Button
          variant="contained"
          onClick={() => {
            setShowOverlay(true);
            setTimeout(() => setShowOverlay(false), 3000);
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
};
