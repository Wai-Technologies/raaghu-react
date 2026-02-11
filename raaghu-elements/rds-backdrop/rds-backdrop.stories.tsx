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
    children: 'This is a custom backdrop content',
  },
  render: (args) => (
    <div style={{ position: 'relative', minHeight: 300 }}>
      <RdsBackdrop
        {...args}
        sx={{
          '&.rds-backdrop': { position: 'absolute' }
        }}
      >
        <div style={{ color: 'white', textAlign: 'center' }}>
          <h2>Custom Content</h2>
          <p>{args.children}</p>
        </div>
      </RdsBackdrop>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    open: false,
    loading: false,
    children: 'This content can be customized via controls',
  },
  render: (args) => {
    const [open, setOpen] = useState<boolean>(!!args.open);

    useEffect(() => {
      setOpen(!!args.open);
    }, [args.open]);
    
    return (
      <div style={{ position: 'relative', minHeight: 300 }}>
        <Button 
          variant="contained" 
          onClick={() => setOpen(true)}
          sx={{ color: '#ffffff' }}
        >
          Show Backdrop
        </Button>
        <RdsBackdrop
          open={open}
          loading={!!args.loading}
          onClick={() => setOpen(false)}
          sx={{
            '&.rds-backdrop': { position: 'absolute' }
          }}
        >
          <div style={{ color: 'white', textAlign: 'center' }}>
            <h2>Click to close</h2>
            <p>{args.children}</p>
          </div>
        </RdsBackdrop>
      </div>
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
