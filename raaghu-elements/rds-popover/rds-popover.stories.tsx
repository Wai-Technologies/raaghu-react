import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import RdsPopover from './rds-popover';
import './rds-popover.scss';

const meta: Meta<typeof RdsPopover> = {
  title: 'Elements/Popover',
  component: RdsPopover,
  parameters: {
    status: { type: 'stable' },
    layout: 'centered',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the popover is open.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'right-top',
        'right-center',
        'right-bottom',
        'bottom-right',
        'bottom-center',
        'bottom-left',
        'left-bottom',
        'left-center',
        'left-top',
        'no-arrow',
      ],
      description:
        'Position of the popover relative to the anchor element. Organized as [side]-[alignment], or "no-arrow" for a popover without an arrow.',
      table: {
        defaultValue: { summary: 'bottom-left' },
      },
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: false,
    position: 'bottom-left',
    showCloseButton: false,
  },
  render: (args) => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <Box>
        <Button variant="contained" onClick={handleClick}>
          Open Popover
        </Button>

        <RdsPopover
          {...args}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorEl={anchorEl}
          title="Simple Popover"
        >
          <Typography>
            This is a simple popover with some basic content.
          </Typography>
        </RdsPopover>
      </Box>
    );
  },
};
Default.parameters = {
  controls: { include: ['open', 'position', 'showCloseButton'] },
};

export const CustomPosition: Story = {
  args: {
    open: false,
    showCloseButton: false,
    position: 'no-arrow',
  },
  render: (args) => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <Box>
        <Button variant="contained" color="success" onClick={handleClick}>
          Open Above Button
        </Button>

        <RdsPopover
          {...args}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorEl={anchorEl}
          title="Custom Position"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <Typography>
            This popover opens above the button instead of below.
          </Typography>
        </RdsPopover>
      </Box>
    );
  },
};
CustomPosition.parameters = {
  controls: { include: ['open', 'showCloseButton'] },
};

export const WideContent: Story = {
  args: {
    open: false,
    showCloseButton: false,
    position: 'no-arrow',
    width: 500,
  },
  render: (args) => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <Box>
        <Button variant="outlined" color="warning" onClick={handleClick}>
          Open Wide Popover
        </Button>

        <RdsPopover
          {...args}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorEl={anchorEl}
          title="Wide Content Popover"
        >
          <Typography paragraph>
            This popover has a fixed width of 500px and contains more content
            to demonstrate how it handles larger amounts of text.
          </Typography>

          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </Typography>

          <Box className="rds-popover-highlight-box">
            <Typography variant="body2">
              This is a highlighted section within the popover content.
            </Typography>
          </Box>
        </RdsPopover>
      </Box>
    );
  },
};
WideContent.parameters = {
  controls: { include: ['open', 'showCloseButton'] },
};

export const WithCloseButton: Story = {
  args: {
    open: false,
    showCloseButton: true,
    position: 'no-arrow',
  },
  render: (args) => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <Box>
        <Button variant="outlined" onClick={handleClick}>
          Open with Close Button
        </Button>

        <RdsPopover
          {...args}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorEl={anchorEl}
          title="Popover with Close"
        >
          <Typography paragraph>
            This popover has a close button in the header.
          </Typography>

          <Typography>
            You can close it by clicking the X button or clicking outside.
          </Typography>
        </RdsPopover>
      </Box>
    );
  },
};
WithCloseButton.parameters = {
  controls: { include: ['open', 'showCloseButton'] },
};

export const WithList: Story = {
  args: {
    open: false,
  },
  render: () => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const menuItems = [
      'Profile Settings',
      'Account Information',
      'Privacy Settings',
      'Notification Preferences',
      'Help & Support',
    ];

    return (
      <Box>
        <Button variant="contained" color="secondary" onClick={handleClick}>
          Open Menu Popover
        </Button>

        <RdsPopover
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorEl={anchorEl}
          title="Menu Options"
          width={250}
          position="no-arrow"
          className="with-list-popover"
        >
          <List dense>
            {menuItems.map((item) => (
              <ListItem
                key={item}
                onClick={handleClose}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </RdsPopover>
      </Box>
    );
  },
};
WithList.parameters = {
  controls: { include: ['open'] },
};
