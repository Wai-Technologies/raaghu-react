import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import RdsBackdrop from './rds-backdrop';

const meta: Meta<typeof RdsBackdrop> = {
  title: 'Elements/Backdrop',
  component: RdsBackdrop,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: true,
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    children: {
      control: { type: 'text' },
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
  render: (args) => (
    <div style={{ position: 'relative', minHeight: 300 }}>
      <RdsBackdrop
        {...args}
        sx={{
          '&.rds-backdrop': { position: 'absolute' }
        }}
      />
    </div>
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  render: (args) => (
    <div style={{ position: 'relative', minHeight: 300 }}>
      <RdsBackdrop
        {...args}
        sx={{
          '&.rds-backdrop': { position: 'absolute' }
        }}
      />
    </div>
  ),
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
  render: (args) => (
    <div style={{ position: 'relative', minHeight: 300 }}>
      <RdsBackdrop
        {...args}
        sx={{
          '&.rds-backdrop': { position: 'absolute' }
        }}
      />
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    open: false,
    loading: false,
    children: (
      <div style={{ color: 'white', textAlign: 'center' }}>
        <h2>Click to close</h2>
        <p>This content can be customized via controls</p>
      </div>
    ),
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
          {args.children}
        </RdsBackdrop>
      </>
    );
  },
  parameters: {
    docs: {
      story: {
        inline: true,
      }
    }
  }
};
