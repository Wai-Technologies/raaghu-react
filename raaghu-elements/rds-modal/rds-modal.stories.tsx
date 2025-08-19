import { Delete, DeleteOutline, Info, Warning } from '@mui/icons-material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsModal from './rds-modal';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';

const meta: Meta<typeof RdsModal> = {
  title: 'Elements/Modal',
  component: RdsModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the modal',
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button',
    },
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Maximum width of the modal',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether modal takes full width',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template for interactive modal
const ModalTemplate = (args: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <RdsModal
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        {args.children}
      </RdsModal>
    </>
  );
};

export const Default = {
  render: ModalTemplate,
  args: {
    title: 'Default Modal',
    showDescription: true,
    children: (
      <Typography>
        This is a basic modal with default settings. You can put any content here.
      </Typography>
    ),
  },
};

export const WithActions = {
  render: ModalTemplate,
  args: {
        title: 'Are you sure?',
    showIcon: true,
    icon: <Delete color="error" sx={{ height: 40, width: 40 }} />,
    children: (
      <Typography>
       This record will be deleted permanently.
      </Typography>
    ),
    actions: (
      <>
        <Button>Cancel</Button>
        <Button variant="contained">Delete</Button>
      </>
    ),
  },
};

export const WithoutCloseButton = {
  render: ModalTemplate,
  args: {
    title: 'No Close Button',
    showCloseButton: false,
    children: (
      <Typography>
        This modal doesn't have a close button in the header. You must use the action buttons to close it.
      </Typography>
    ),
    actions: (
      <Button variant="contained">Close</Button>
    ),
  },
};

export const LargeModal = {
  render: ModalTemplate,
  args: {
    title: 'Large Modal',
    maxWidth: 'lg',
    fullWidth: true,
    children: (
      <div>
        <Typography paragraph>
          This is a large modal that takes up more screen space. It's useful for displaying more content or complex forms.
        </Typography>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Typography>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
      </div>
    ),
    actions: (
      <>
        <Button>Cancel</Button>
        <Button variant="contained">Submit</Button>
      </>
    ),
  },
};

export const SmallModal = {
  render: ModalTemplate,
  args: {
    title: 'Small Modal',
    maxWidth: 'xs',
    children: (
      <Typography>
        This is a small modal for simple confirmations or brief messages.
      </Typography>
    ),
    actions: (
      <>
        <Button>No</Button>
        <Button variant="contained" color="primary">Yes</Button>
      </>
    ),
  },
};

export const WithIcon = {
  render: ModalTemplate,
  args: {
    title: 'Are you sure?',
    showIcon: true,
    icon: <Delete color="error" sx={{ height: 40, width: 40 }} />,
    children: (
      <Typography>
       This record will be deleted permanently.
      </Typography>
    ),
  },
};

export const WithImage = {
  render: ModalTemplate,
  args: {
    title: 'Modal with Image',
    imageSrc: 'https://th.bing.com/th/id/OIP.VVPQIqDqf-OxZPXu07XWKwHaEK?w=326&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    children: (
      <Typography>
        This modal displays an image in the header.
      </Typography>
    ),
  },
};
