
import type { Meta, StoryObj } from '@storybook/react-vite';
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
        {Array.from({ length: 20 }, (_, paragraphNumber) => paragraphNumber + 1).map((paragraphNumber) => (
          <p key={paragraphNumber}>
            This is paragraph {paragraphNumber} with some sample text to make the dialog content longer.
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
            <path d="M17.62 45.31H1V39.77C1 36.86 1.76 34 3.21 31.48C4.66 28.96 6.75 26.86 9.27 25.4C11.78 23.94 14.64 23.16 17.55 23.15C20.46 23.14 23.32 23.89 25.85 25.33M49 33.34L33.34 49M33.34 33.34L49 49M25.92 9.31C25.92 13.9 22.2 17.62 17.62 17.62C13.03 17.62 9.31 13.9 9.31 9.31C9.31 4.72 13.03 1 17.62 1C22.2 1 25.92 4.72 25.92 9.31Z" stroke="#BD0D1D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
        <RdsDialog open={open} showTitle={showTitle} {...rest} onClose={() => setOpen(false)} />
      </>
    );
  },
};
