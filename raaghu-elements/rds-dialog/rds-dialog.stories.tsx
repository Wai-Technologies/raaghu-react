
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import { Typography, Box } from '@mui/material';
import { useState } from 'react';
import RdsDialog from './rds-dialog';
import RdsButton from '../rds-button/rds-button';
import RdsTypography from '../rds-typography/rds-typography';


const meta: Meta = {
  title: 'Elements/Dialog',
  component: RdsDialog,
  parameters: {
        status: { type: 'stable' },
    layout: 'centered',
    controls: {
      exclude: ['component', 'slots', 'slotProps', 'children', 'actions', 'onClose'],
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    open: { control: { type: 'boolean' } },
  size: { control: { type: 'select' }, options: ['extra-small', 'small', 'medium', 'large', 'extra-large', false] },
    fullWidth: { control: { type: 'boolean' } },
    fullScreen: { control: { type: 'boolean' } },
    title: { control: 'text' },
    variant: { control: { type: 'select' }, options: ['standard', 'default'] },
    ShowDissmiss: { control: 'boolean' },
    showTitle: { control: 'boolean' },
    actions: { control: false },
    children: { control: false },
    ShowPrimary: {
      control: 'boolean'
    },
    ShowSecondary: {
      control: 'boolean'
    }
  },
} satisfies Meta<typeof RdsDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <RdsButton
          changeLeftIcon="add"
          changeRightIcon="save"
          color="primary"
          layout="text-only"
          shape="rectangle"
          showLeftIcon
          size="medium"
          state="default"
          style="filled"
          text=" Open Dialog"
          textCase="uppercase"
          onClick={() => setOpen(true)}
        />
        <RdsDialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        />
      </>
    );
  },
  args: {
    size: 'medium',
    fullWidth: true,
    title: 'Dialog Title',
    children: (
      <div>
        <RdsTypography variant="body1">
          This is the dialog content. You can put any content here.
        </RdsTypography>
      </div>
    ),
  },
};

export const FullWidth: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <RdsButton
          changeLeftIcon="add"
          changeRightIcon="save"
          color="primary"
          layout="text-only"
          shape="rectangle"
          showLeftIcon
          size="medium"
          state="default"
          style="filled"
          text=" Open Dialog"
          textCase="uppercase"
          onClick={() => setOpen(true)}
        />
        <RdsDialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        />
      </>
    );
  },
  args: {
    fullWidth: true,
  size: 'small',
    title: 'Full Width Dialog',
    children: (
      <Typography variant="body1">
        This dialog uses the full width available for its size.
      </Typography>
    ),
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <RdsButton
          changeLeftIcon="add"
          changeRightIcon="save"
          color="primary"
          layout="text-only"
          shape="rectangle"
          showLeftIcon
          size="medium"
          state="default"
          style="filled"
          text=" Open Dialog"
          textCase="uppercase"
          onClick={() => setOpen(true)}
        />
        <RdsDialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        >
          <Typography variant="body1" gutterBottom>
            This dialog can be opened and closed.
          </Typography>
          {args.variant !== 'standard' && (
            <RdsButton style="filled" onClick={() => setOpen(false)}>
              Close
            </RdsButton>
          )}
        </RdsDialog>
      </>
    );
  },
  args: {
    title: 'Interactive Dialog',
    ShowDissmiss: true,
    size: 'small',
    fullWidth: true,
    variant: 'default',
  },
};

export const LargeContent: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <RdsButton
          changeLeftIcon="add"
          changeRightIcon="save"
          color="primary"
          layout="text-only"
          shape="rectangle"
          showLeftIcon
          size="medium"
          state="default"
          style="filled"
          text=" Open Dialog"
          textCase="uppercase"
          onClick={() => setOpen(true)}
        />
        <RdsDialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
        />
      </>
    );
  },
  args: {
    size: 'medium',
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
};

export const WithActions: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <RdsButton
          changeLeftIcon="add"
          changeRightIcon="save"
          color="primary"
          layout="text-only"
          shape="rectangle"
          showLeftIcon
          size="medium"
          state="default"
          style="filled"
          text=" Open Dialog"
          textCase="uppercase"
          onClick={() => setOpen(true)}
        />
        <RdsDialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          actions={(
            <>
              <RdsButton style="outlined" color="primary" onClick={() => setOpen(false)}>Cancel</RdsButton>
              <RdsButton style="filled" color="primary" onClick={() => setOpen(false)}>Confirm</RdsButton>
            </>
          )}
        />
      </>
    );
  },
  args: {
    size: 'medium',
    fullWidth: true,
    title: 'Confirm Action',
    children: (
      <Typography variant="body1" gutterBottom>
        Are you sure you want to proceed with this action?
      </Typography>
    ),
  },
};
export const WithIcon: Story = {
  args: {
    size: 'medium',
    fullWidth: true,
    fullScreen: false,
    title: 'Title',
    ShowDissmiss: true,
    variant: 'standard',
    ShowPrimary: true,
    ShowSecondary: true,
    children: (
      <Box display="flex" flexDirection="column" alignItems="center" width="100%" sx={{ mt: 1, mb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2, mt: 1 }}>
          <svg width="48" height="48" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.6154 45.3077H1V39.7692C0.999091 36.8594 1.76237 34.0004 3.21346 31.4782C4.66456 28.956 6.75258 26.8591 9.26861 25.3973C11.7846 23.9356 14.6404 23.1602 17.5502 23.1488C20.46 23.1374 23.3218 23.8903 25.8492 25.3323M49 33.3446L33.3446 49M33.3446 33.3446L49 49M25.9231 9.30769C25.9231 13.8959 22.2036 17.6154 17.6154 17.6154C13.0272 17.6154 9.30769 13.8959 9.30769 9.30769C9.30769 4.71948 13.0272 1 17.6154 1C22.2036 1 25.9231 4.71948 25.9231 9.30769Z" stroke="#BD0D1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Box>
        <Typography sx={{ fontSize: 16, fontWeight: 400, textAlign: 'center', lineHeight: 1.4 }}>
          Deleting this data will remove your account and you will no longer login to the application! Are you sure you want to proceed?
        </Typography>
      </Box>
    ),
  },
  argTypes: {
    ShowPrimary: { control: false },
    ShowSecondary: { control: false },
  },
  parameters: {
    controls: {
      include: [
        'size',
        'fullWidth',
        'fullScreen',
        'title',
        'ShowDissmiss',
        'variant',
        'ShowPrimary',
        'ShowSecondary',
        'showTitle',
      ],
    },
    docs: { disable: true },

  },

  render: (args) => {
    const { showTitle = true, ...rest } = args;
    const [open, setOpen] = useState(false);
    return (
      <>
        <RdsButton
          changeLeftIcon="add"
          changeRightIcon="save"
          color="primary"
          layout="text-only"
          shape="rectangle"
          showLeftIcon
          size="medium"
          state="default"
          style="filled"
          text=" Open Dialog"
          textCase="uppercase"
          onClick={() => setOpen(true)}
        />
        <RdsDialog children={undefined} open={open} showTitle={showTitle} {...rest} onClose={() => setOpen(false)} />
      </>
    );
  },
};
