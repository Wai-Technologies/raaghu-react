
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography, Box } from '@mui/material';
import { useEffect, useState, type ComponentProps } from 'react';
import RdsDialog from './rds-dialog';
import RdsButton from '../rds-button/rds-button';
import RdsTypography from '../rds-typography/rds-typography';

type DialogArgs = ComponentProps<typeof RdsDialog>;

/** Keeps Storybook `open` control in sync with local open/close interactions. */
const DialogWithOpenControl = (args: DialogArgs) => {
  const [open, setOpen] = useState(Boolean(args.open));
  useEffect(() => {
    setOpen(Boolean(args.open));
  }, [args.open]);

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
        variant="filled"
        textCase="uppercase"
        onClick={() => setOpen(true)}
      >
        {' Open Dialog'}
      </RdsButton>
      <RdsDialog
        {...args}
        open={open}
        onClose={(event, reason) => {
          setOpen(false);
          args.onClose?.(event, reason);
        }}
      />
    </>
  );
};

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
    maxWidth: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
      description:
        'Dialog max width (MUI 5-breakpoint scale). Unlike button/badge size, dialogs use xs–xl. Pass false to remove the max-width cap so the paper sizes to its content.',
    },
    fullWidth: { control: { type: 'boolean' } },
    fullScreen: { control: { type: 'boolean' } },
    title: { control: 'text' },
    variant: { control: { type: 'select' }, options: ['default', 'confirm'] },
    showDissmiss: { control: 'boolean' },
    actions: { control: false },
    children: { control: false },
    showPrimary: {
      control: 'boolean'
    },
    showSecondary: {
      control: 'boolean'
    }
  },
} satisfies Meta<typeof RdsDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <DialogWithOpenControl {...(args as DialogArgs)} />,
  args: {
    open: false,
    maxWidth: 'md',
    fullWidth: true,
    title: 'Dialog Title',
    variant: 'confirm',
    ShowPrimary: true,
    ShowSecondary: true,
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
  render: (args) => <DialogWithOpenControl {...(args as DialogArgs)} />,
  args: {
    open: false,
    fullWidth: true,
    maxWidth: 'sm',
    title: 'Full Width Dialog',
    children: (
      <Typography variant="body1">
        This dialog uses the full width available for its size.
      </Typography>
    ),
  },
};

export const Interactive: Story = {
  render: (args) => <DialogWithOpenControl {...(args as DialogArgs)} />,
  args: {
    open: false,
    title: 'Interactive Dialog',
    showDissmiss: true,
    maxWidth: 'sm',
    fullWidth: true,
    variant: 'default',
    children: (
      <Typography variant="body1" gutterBottom>
        This dialog can be opened and closed.
      </Typography>
    ),
  },
};

export const LargeContent: Story = {
  render: (args) => <DialogWithOpenControl {...(args as DialogArgs)} />,
  args: {
    open: false,
    maxWidth: 'md',
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
    const [open, setOpen] = useState(Boolean(args.open));
    useEffect(() => {
      setOpen(Boolean(args.open));
    }, [args.open]);
    return (
      <>
        <RdsButton
          color="primary"
          layout="text-only"
          shape="rectangle"
          size="medium"
          variant="filled"
          textCase="uppercase"
          onClick={() => setOpen(true)}
        >
          {' Open Dialog'}
        </RdsButton>
        <RdsDialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          actions={(
            <>
              <RdsButton variant="outlined" color="primary" onClick={() => setOpen(false)}>Cancel</RdsButton>
              <RdsButton variant="filled" color="primary" onClick={() => setOpen(false)}>Confirm</RdsButton>
            </>
          )}
        />
      </>
    );
  },
  args: {
    open: false,
    maxWidth: 'md',
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
    open: false,
    maxWidth: 'md',
    fullWidth: true,
    fullScreen: false,
    title: 'Title',
    showDissmiss: true,
    variant: 'confirm',
    showPrimary: true,
    showSecondary: true,
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
    showPrimary: { control: false },
    showSecondary: { control: false },
  },
  parameters: {
    controls: {
      include: [
        'maxWidth',
        'fullWidth',
        'fullScreen',
        'title',
        'showDissmiss',
        'variant',
        'showPrimary',
        'showSecondary',
        'primaryText',
        'secondaryText',
      ],
    },
    docs: { disable: true },

  },

  render: (args) => <DialogWithOpenControl {...(args as DialogArgs)} />,
};
