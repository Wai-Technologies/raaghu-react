
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Typography,Box } from '@mui/material';
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
    title: 'Title',
    showCloseButton: true,
    variant: 'standard',
    ShowPrimary: true,
    ShowSecondary: true,
    children: (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" sx={{ mt: 1, mb: 1 }}>
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2, mt: 1 }}>
    <svg width="48" height="48" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.6154 45.3077H1V39.7692C0.999091 36.8594 1.76237 34.0004 3.21346 31.4782C4.66456 28.956 6.75258 26.8591 9.26861 25.3973C11.7846 23.9356 14.6404 23.1602 17.5502 23.1488C20.46 23.1374 23.3218 23.8903 25.8492 25.3323M49 33.3446L33.3446 49M33.3446 33.3446L49 49M25.9231 9.30769C25.9231 13.8959 22.2036 17.6154 17.6154 17.6154C13.0272 17.6154 9.30769 13.8959 9.30769 9.30769C9.30769 4.71948 13.0272 1 17.6154 1C22.2036 1 25.9231 4.71948 25.9231 9.30769Z" stroke="#BD0D1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Box>
  <Typography sx={{ color: '#757575', fontSize: 16, fontWeight: 400, textAlign: 'center', lineHeight: 1.4 }}>
    Deleting this data will remove your account and you will no longer login to the application! Are you sure you want to proceed?
  </Typography>
</Box>
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
