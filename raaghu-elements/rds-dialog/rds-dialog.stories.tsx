import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import RdsDialog from './rds-dialog';

const meta: Meta<typeof RdsDialog> = {
  title: 'Elements/Dialog',
  component: RdsDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
    },
    maxWidth: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    fullScreen: {
      control: { type: 'boolean' },
    },
    ShowTitle: { control: 'boolean' },
    Title: { control: 'text' },
    ShowDismiss: { control: 'boolean' },
    ShowPrimary: { control: 'boolean' },
    ShowSecondary: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    children: (
      <div style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Dialog Title
        </Typography>
        <Typography variant="body1">
          This is the dialog content. You can put any content here.
        </Typography>
      </div>
    ),
  },
};

export const WithActions: Story = {
  args: {
    open: true,
    children: (
      <div style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Confirm Action
        </Typography>
        <Typography variant="body1" gutterBottom>
          Are you sure you want to proceed with this action?
        </Typography>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained" color="primary">Confirm</Button>
        </div>
      </div>
    ),
  },
};

export const FullWidth: Story = {
  args: {
    open: true,
    fullWidth: true,
    maxWidth: 'sm',
    children: (
      <div style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Full Width Dialog
        </Typography>
        <Typography variant="body1">
          This dialog uses the full width available for its size.
        </Typography>
      </div>
    ),
  },
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Dialog
        </Button>
        <RdsDialog open={open} onClose={() => setOpen(false)}>
          <div style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Interactive Dialog
            </Typography>
            <Typography variant="body1" gutterBottom>
              This dialog can be opened and closed.
            </Typography>
            <Button variant="contained" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </RdsDialog>
      </>
    );
  },
};

export const LargeContent: Story = {
  args: {
    open: true,
    maxWidth: 'md',
    fullWidth: true,
    children: (
      <div style={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Large Content Dialog
        </Typography>
        <Typography variant="body1">
          This dialog contains a lot of content to demonstrate scrolling behavior.
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i}>
              This is paragraph {i + 1} with some sample text to make the dialog content longer.
            </p>
          ))}
        </Typography>
      </div>
    ),
  },
};



export const StandardDialog: Story = {
  args: {
    open: true,
    mode:"standard",
    maxWidth: 'sm',
    fullWidth: true,
    ShowTitle: true,
    Title: 'My Custom Dialog Title',
    ShowPrimary: true,
    ShowSecondary: true,
    ShowDismiss: true,
  },
};
