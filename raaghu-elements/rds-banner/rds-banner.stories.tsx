import type { Meta, StoryObj } from '@storybook/react';
import { Button, Box } from '@mui/material';
import React, { useState } from 'react';
import RdsBanner from './rds-banner';

const meta: Meta<typeof RdsBanner> = {
  title: 'Elements/Banner',
  component: RdsBanner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success'],
    },
    closable: {
      control: 'boolean',
    },
    persistent: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    message: 'This is an informational banner message.',
    type: 'info',
  },
};

export const Success: Story = {
  args: {
    message: 'Your changes have been saved successfully!',
    type: 'success',
  },
};

export const Warning: Story = {
  args: {
    message: 'Please review your information before continuing.',
    type: 'warning',
  },
};

export const Error: Story = {
  args: {
    message: 'An error occurred while processing your request.',
    type: 'error',
  },
};

export const NotClosable: Story = {
  args: {
    message: 'This banner cannot be dismissed.',
    type: 'warning',
    closable: false,
  },
};

export const WithActions: Story = {
  args: {
    message: 'New features are available!',
    type: 'success',
    actions: (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button size="small" variant="outlined" color="inherit">
          Learn More
        </Button>
        <Button size="small" variant="contained" color="inherit">
          Update Now
        </Button>
      </Box>
    ),
  },
};

export const Interactive: Story = {
  render: () => {
    const [banners, setBanners] = useState([
      { id: 1, message: 'Welcome to our new dashboard!', type: 'info' as const, visible: true },
      { id: 2, message: 'Your trial expires in 7 days.', type: 'warning' as const, visible: true },
      { id: 3, message: 'System maintenance scheduled for tonight.', type: 'error' as const, visible: true },
    ]);

    const handleClose = (id: number) => {
      setBanners(prev => prev.map(banner => 
        banner.id === id ? { ...banner, visible: false } : banner
      ));
    };

    const resetBanners = () => {
      setBanners(prev => prev.map(banner => ({ ...banner, visible: true })));
    };

    return (
      <Box sx={{ width: 600 }}>
        <Box sx={{ mb: 2 }}>
          <Button onClick={resetBanners} variant="outlined" size="small">
            Reset Banners
          </Button>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {banners.map(banner => (
            banner.visible && (
              <RdsBanner
                key={banner.id}
                message={banner.message}
                type={banner.type}
                onClose={() => handleClose(banner.id)}
              />
            )
          ))}
        </Box>
      </Box>
    );
  },
};

export const AllTypes: Story = {
  render: () => (
    <Box sx={{ width: 600, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <RdsBanner
        message="This is an info banner with useful information."
        type="info"
      />
      <RdsBanner
        message="This is a success banner for positive feedback."
        type="success"
      />
      <RdsBanner
        message="This is a warning banner to alert users."
        type="warning"
      />
      <RdsBanner
        message="This is an error banner for critical issues."
        type="error"
      />
    </Box>
  ),
};

export const Persistent: Story = {
  args: {
    message: 'This is a persistent banner that stays visible even when closed.',
    type: 'info',
    persistent: true,
  },
};

export const NotFullWidth: Story = {
  args: {
    message: 'This banner is not full width.',
    type: 'success',
    fullWidth: false,
  },
};
