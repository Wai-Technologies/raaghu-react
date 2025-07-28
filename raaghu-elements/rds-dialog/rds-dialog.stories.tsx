
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
    open: { control: { type: 'boolean' } },
    maxWidth: { control: { type: 'select' }, options: ['xs', 'sm', 'md', 'lg', 'xl', false] },
    fullWidth: { control: { type: 'boolean' } },
    fullScreen: { control: { type: 'boolean' } },
    title: { control: 'text' },
    showCloseButton: { control: 'boolean' },
    actions: { control: false },
    children: { control: false },
    ShowPrimary:{
      control: 'boolean'
    },
    ShowSecondary:{
      control:'boolean'
        }
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    title: 'Dialog Title', 
    children: (
      <div style={{ padding: '20px' }}>
        <Typography variant="body1">
          This is the dialog content. You can put any content here.
        </Typography>
      </div>
    ),
  },
   parameters: {
    docs: { disable: true },
  },

};

export const WithActions: Story = {
  args: {
    open: true,
    title: 'Confirm Action',
   
    children: (
      <Typography variant="body1" gutterBottom>
        Are you sure you want to proceed with this action?
      </Typography>
    ),
    actions: (
      <>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained" color="primary">Confirm</Button>
      </>
    ),
  },
  parameters: {
    docs: { disable: true },
  },
};

export const FullWidth: Story = {
  args: {
    open: true,
    fullWidth: true,
    maxWidth: 'sm',
    title: 'Full Width Dialog',
    
    children: (
      <Typography variant="body1">
        This dialog uses the full width available for its size.
      </Typography>
    ),
  },
  parameters: {
    docs: { disable: true },
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
        <RdsDialog
          open={open}
          onClose={() => setOpen(false)}
          title="Interactive Dialog"
        >
          <Typography variant="body1" gutterBottom>
            This dialog can be opened and closed.
          </Typography>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Close
          </Button>
        </RdsDialog>
      </>
    );
  },
  parameters: {
    docs: { disable: true },
  },
};

export const LargeContent: Story = {
  args: {
    open: true,
    maxWidth: 'md',
    fullWidth: true,
    title: 'Large Content Dialog',
  
    children: (
      <>
        <Typography variant="body1">
          This dialog contains a lot of content to demonstrate scrolling behavior.
        </Typography>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>
            This is paragraph {i + 1} with some sample text to make the dialog content longer.
          </p>
        ))}
      </>
    ),
  },
  parameters: {
    docs: { disable: true },
  },
};

export const Standard: Story = {
  args: {
    open: true,
    maxWidth: "md",
    fullWidth: true,
    fullScreen: false,
    title: 'My Custom Dialog Title',
    showCloseButton: true,
    variant: 'standard',
    ShowPrimary: true,
    ShowSecondary: true,
    children: (
      <>
        Replace with your content<br />component
      </>
    ),
  },
  parameters: {
    controls: {
      include: [
        'open',
        'maxWidth',
        'fullWidth',
        'fullScreen',
        'title',
        'showCloseButton',
        'variant',
        'ShowPrimary',
        'ShowSecondary',
        'showTitle',
      ],
    },
    docs: { disable: true },
     
  },
  render: (args: any) => {
    const { showTitle = true, ...rest } = args;
    return <RdsDialog {...rest} title={showTitle ? args.title : undefined} />;
  },
};
