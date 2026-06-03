import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import RdsSnackbar from './rds-snackbar';
import { useState, useEffect } from 'react';
import RdsButton from '../rds-button/rds-button';

const meta: Meta<typeof RdsSnackbar> = {
  title: 'Elements/Snackbar',
  component: RdsSnackbar,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    message: {
      control: 'text',
      description: 'Message to display',
    },
    type: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success'],
      description: 'Type of snackbar',
    },
    open: {
      control: 'boolean',
      description: 'Whether snackbar is open',
    },
    autoHideDuration: {
      control: 'number',
      description: 'Duration before auto-hide (ms)',
    },
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
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export const Success = {
  render: SnackbarTemplate,
  args: {
    message: 'Operation completed successfully!',
    type: 'success',
  },
};

export const Error = {
  render: SnackbarTemplate,
  args: {
    message: 'An error occurred. Please try again.',
    type: 'error',
  },
};

export const Warning = {
  render: SnackbarTemplate,
  args: {
    message: 'This action cannot be undone.',
    type: 'warning',
  },
};

export const Info = {
  render: SnackbarTemplate,
  args: {
    message: 'Your changes have been saved.',
    type: 'info',
  },
};

export const AutoHide = {
  render: SnackbarTemplate,
  args: {
    message: 'This will disappear in 2 seconds',
    type: 'info',
    autoHideDuration: 2000,
  },
};

export const ShowSnackbar: Story = {
  name: 'Interaction: Show snackbar',
  render: SnackbarTemplate,
  args: {
    message: 'Hello from play function!',
    type: 'info',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /show snackbar/i })
    await expect(button).toBeVisible()
    await userEvent.click(button)
    // MUI Snackbar renders in a portal — query from document.body
    await waitFor(
      () => expect(
        document.querySelector('[class*="MuiSnackbar-root"], [role="alert"]')
      ).not.toBeNull(),
      { timeout: 2000 }
    )
  }
};
