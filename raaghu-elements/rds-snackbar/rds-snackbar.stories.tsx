import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsSnackbar from './rds-snackbar';
import { useState, useEffect } from 'react';
import RdsButton from '../rds-button/rds-button';

const meta: Meta<typeof RdsSnackbar> = {
  title: 'Elements/Snackbar',
  component: RdsSnackbar,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
    controls: {
      include: ['message', 'color', 'open', 'duration', 'showCloseButton'],
    },
  },
  tags: ['autodocs', 'stable'],
  args: {
    showCloseButton: true,
    duration: 6000,
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'Message to display',
    },
    color: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success'],
      description: 'Semantic color of the snackbar',
    },
    open: {
      control: 'boolean',
      description: 'Whether snackbar is open',
    },
    duration: {
      control: { type: 'number', min: 0, step: 500 },
      description: 'Time in milliseconds before the snackbar hides itself',
      table: { defaultValue: { summary: '6000' } },
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Shows the close button of the snackbar',
      table: { defaultValue: { summary: 'true' } },
    },
    type: { table: { disable: true } },
    severity: { table: { disable: true } },
    hideCloseButton: { table: { disable: true } },
    autoHideDuration: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SnackbarTemplate = (args: any) => {
  const [open, setOpen] = useState<boolean>(!!args.open);

  useEffect(() => {
    setOpen(!!args.open);
  }, [args.open]);

  return (
    <>
      <RdsButton
        color="primary"
        layout="text-only"
        shape="rectangle"
        size="medium"
        state="default"
        style="filled"
        text="Show Snackbar"
        textCase="unset"
        onClick={() => setOpen(true)}
      />
      <RdsSnackbar
        {...args}
        key={args.duration}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export const Default: Story = {
  render: SnackbarTemplate,
  args: {
    message: 'Operation completed successfully!',
    color: 'success',
  },
};

export const Success: Story = {
  render: SnackbarTemplate,
  args: {
    message: 'Operation completed successfully!',
    color: 'success',
  },
};

export const Error: Story = {
  render: SnackbarTemplate,
  args: {
    message: 'An error occurred. Please try again.',
    color: 'error',
  },
};

export const Warning: Story = {
  render: SnackbarTemplate,
  args: {
    message: 'This action cannot be undone.',
    color: 'warning',
  },
};

export const Info: Story = {
  render: SnackbarTemplate,
  args: {
    message: 'Your changes have been saved.',
    color: 'info',
  },
};

export const AutoHide: Story = {
  render: SnackbarTemplate,
  args: {
    message: 'This will disappear in 2 seconds',
    color: 'info',
    duration: 2000,
  },
};
