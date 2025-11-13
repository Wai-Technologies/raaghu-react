import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import RdsBackdrop from './rds-backdrop';

const meta: Meta<typeof RdsBackdrop> = {
  title: 'Elements/Backdrop',
  component: RdsBackdrop,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    children: 'Backdrop content',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const WithCustomContent: Story = {
  args: {
    open: true,
    children: (
      <div style={{ color: 'white', textAlign: 'center' }}>
        <h2>Custom Content</h2>
        <p>This is a custom backdrop content</p>
      </div>
    ),
  },
};

export const Interactive: Story = {
  args: {
    open: false,
    loading: false,
  },
  render: (args) => {
    const [open, setOpen] = useState<boolean>(!!args.open);

    // Sync local state with Storybook controls so toggling knobs works.
    useEffect(() => {
      setOpen(!!args.open);
    }, [args.open]);
    
    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Show Backdrop
        </Button>
        <RdsBackdrop
          open={open}
          loading={!!args.loading}
          onClick={() => setOpen(false)}
        >
          <div style={{ color: 'white', textAlign: 'center',marginTop: '75px' }}>
            <h2>Click to close</h2>
          </div>
        </RdsBackdrop>
      </>
    );
  },
};
