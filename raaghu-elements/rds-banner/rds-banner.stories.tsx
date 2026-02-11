import type { Meta, StoryObj } from '@storybook/react';
import { Button, Box } from '@mui/material';
import React, { useState } from 'react';
import RdsBanner, { type RdsBannerProps } from './rds-banner';

const meta: Meta<RdsBannerProps & { showOutline?: boolean }> = {
  title: 'Elements/Banner',
  component: RdsBanner,
  parameters: {
    layout: 'centered',
  },
  args: {
    showOutline: false,
  },
  decorators: [
    (Story, ctx) => {
      const { args } = ctx as unknown as { args: (RdsBannerProps & { showOutline?: boolean }) };
      const shouldHide = (args?.variantStyle ?? 'style1') === 'style1' && (args?.showOutline ?? false) === false;
      const extraArgs = shouldHide
        ? { style: { ...(args?.style || {}), borderBottomColor: 'transparent' } }
        : { style: args?.style };
      return <Story args={{ ...args, ...extraArgs }} />;
    },
  ],
  tags: ['autodocs'],
  argTypes: {
    description: {
      control: 'text',
      description: 'Description to display in the banner',
    },
    type: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success'],
      description: 'The type/severity of the banner',
    },
    Icon: {
      control: 'boolean',
      description: 'Show the info icon in the banner',
      defaultValue: true,
    },
    showTitle: {
      control: 'boolean',
      description: 'Show the heading title before the message',
      defaultValue: false,
    },
    title: {
      control: 'text',
      description: 'Heading title text (bold)',
      defaultValue: 'Heading Title.',
    },
    showDescription: {
      control: 'boolean',
      description: 'Show the description below the heading',
      defaultValue: true,
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Banner size',
      defaultValue: 'small',
    },
    multiline: {
      control: 'boolean',
      description: 'Show heading and description on separate lines (multiline style)',
      defaultValue: false,
    },
    variantStyle: {
      control: 'select',
      options: ['style1', 'style2', 'style3'],
      description: 'The style variant of the banner',
      defaultValue: 'style1',
    },
    showLink: {
      control: 'boolean',
      description: 'Show the Link button',
      defaultValue: true,
    },
    showSecondary: {
      control: 'boolean',
      description: 'Show the Cancel button',
      defaultValue: true,
    },
    showPrimary: {
      control: 'boolean',
      description: 'Show the Okay button',
      defaultValue: true,
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
    showOutline: {
      control: 'boolean',
      description: 'Toggle bottom border accent for style1 banners',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    description: 'This is the description of the banner.',
    type: 'info',
    Icon: true,
    showTitle: true,
    title: 'Heading Title.',
    size: 'medium',
    multiline: false,
    showDescription: true,
  },
};

export const Success: Story = {
  args: {
    description: 'This is the description of the banner.',
    type: 'success',
    Icon: true,
    showTitle: true,
    title: 'Heading Title.',
  },
};

export const Warning: Story = {
  args: {
    description: 'This is the description of the banner.',
    type: 'warning',
    Icon: true,
    showTitle: true,
    title: 'Heading Title.',
  },
};

export const Error: Story = {
  args: {
    description: 'This is the description of the banner.',
    type: 'error',
    Icon: true,
    showTitle: true,
    title: 'Heading Title.',
  },
};

export const Filled: Story = {
  args: {
    description: 'This is the description of the banner.',
    type: 'success',
    Icon: true,
    showTitle: true,
    title: 'Heading Title.',
  },
};

export const Outlined: Story = {
  args: {
    description: 'This is the description of the banner.',
    type: 'warning',
    Icon: true,
    showTitle: true,
    title: 'Heading Title.',
    variantStyle: 'style1',
    showOutline: true,
  },
};

export const NotClosable: Story = {
  args: {
    description: 'This banner cannot be dismissed.',
    type: 'warning',
    closable: false,
  },
};

export const WithActions: Story = {
  args: {
    description: 'New features are available!',
    type: 'success',
    actions: (
      <Box sx={{ display: 'flex', gap: 1, marginBottom: "3px" }}>
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
  render: (args) => {
    const [banners, setBanners] = useState([
      { id: 1, description: 'Welcome to our new dashboard!', type: 'info' as const, visible: true },
      { id: 2, description: 'Your trial expires in 7 days.', type: 'warning' as const, visible: true },
      { id: 3, description: 'System maintenance scheduled for tonight.', type: 'error' as const, visible: true },
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
                description={banner.description}
                type={banner.type}
    variantStyle={(args as any)?.variantStyle ?? 'style1'}
    style={(args as any)?.style}
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
  render: (args) => (
    <Box sx={{ width: 600, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <RdsBanner
        description="This is an info banner with useful information."
        type="info"
        variantStyle={(args as any)?.variantStyle ?? 'style1'}
        style={(args as any)?.style}
      />
      <RdsBanner
        description="This is a success banner for positive feedback."
        type="success"
        variantStyle={(args as any)?.variantStyle ?? 'style1'}
        style={(args as any)?.style}
      />
      <RdsBanner
        description="This is a warning banner to alert users."
        type="warning"
        variantStyle={(args as any)?.variantStyle ?? 'style1'}
        style={(args as any)?.style}
      />
      <RdsBanner
        description="This is an error banner for critical issues."
        type="error"
        variantStyle={(args as any)?.variantStyle ?? 'style1'}
        style={(args as any)?.style}
      />
      <RdsBanner
        Icon
        description="This is the description of the banner."
        showDescription
        showTitle
        size="medium"
        style={{
          borderBottomColor: 'transparent'
        }}
        title="Heading Title."
        type="success"        
        variantStyle="style1"
      />
      <RdsBanner
        Icon
        description="This is the description of the banner."
        showDescription                              
        showTitle
        size="medium"
        title="Heading Title."
        type="warning"
        variantStyle="style1"
      />
    </Box>
  ),
};

export const Persistent: Story = {
  args: {
    description: 'This is a persistent banner that stays visible even when closed.',
    type: 'info',
    persistent: true,
  },
};

export const NotFullWidth: Story = {
  args: {
    description: 'This banner is not full width.',
    type: 'success',
    fullWidth: false,
  },
};
