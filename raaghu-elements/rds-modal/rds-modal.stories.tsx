import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import RdsModal from './rds-modal';
import { Typography } from '@mui/material';
import { useState } from 'react';
import RdsButton from '../rds-button/rds-button';

const meta: Meta<typeof RdsModal> = {
  title: 'Elements/Modal',
  component: RdsModal,
  parameters: {
        status: { type: 'stable' },
    layout: 'centered',
    controls: {
      exclude: ['component', 'slots', 'slotProps', 'onClose', 'actions', 'icon', 'isOpen'],
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the modal',
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
    imageSrc: {
      control: 'text',
      description: 'URL of the image to display in the modal header',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ModalTemplate = (args: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <RdsButton color="primary" textCase="uppercase" layout="text-only" shape="rectangle" size="medium" state="default" style="filled" onClick={() => setOpen(true)}>
        Open Modal
      </RdsButton>
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
  parameters: {
    controls: {
      exclude: ['component', 'slots', 'slotProps', 'onClose', 'actions', 'icon', 'showIcon', 'isOpen', 'imageSrc'],
    },
  },
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
  parameters: {
    controls: {
      exclude: ['component', 'slots', 'slotProps', 'onClose', 'actions', 'icon', 'showIcon', 'isOpen', 'imageSrc'],
    },
  },
  args: {
    title: 'Are you sure?',
    showIcon: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 74 74" fill="none">
        <path d="M16.66 22.85C15.97 22.85 15.41 23.41 15.41 24.1C15.41 24.79 15.97 25.35 16.66 25.35V22.85ZM57.34 25.35C58.03 25.35 58.59 24.79 58.59 24.1C58.59 23.41 58.03 22.85 57.34 22.85V25.35ZM21.75 24.1V22.85C21.06 22.85 20.5 23.41 20.5 24.1H21.75ZM52.25 24.1H53.5C53.5 23.41 52.94 22.85 52.25 22.85V24.1ZM21.75 54.61H20.5H21.75ZM27.28 24.1C27.28 24.79 27.84 25.35 28.53 25.35C29.22 25.35 29.78 24.79 29.78 24.1H27.28ZM28.53 22.4H29.78L29.78 22.39L28.53 22.4ZM37 13.84V12.59V13.84ZM45.47 22.4L44.22 22.39V22.4H45.47ZM44.22 24.1C44.22 24.79 44.78 25.35 45.47 25.35C46.16 25.35 46.72 24.79 46.72 24.1H44.22ZM33.17 30.88C33.17 30.19 32.61 29.63 31.92 29.63C31.23 29.63 30.67 30.19 30.67 30.88H33.17ZM30.67 49.52C30.67 50.21 31.23 50.77 31.92 50.77C32.61 50.77 33.17 50.21 33.17 49.52H30.67ZM43.33 30.88C43.33 30.19 42.77 29.63 42.08 29.63C41.39 29.63 40.83 30.19 40.83 30.88H43.33ZM40.83 49.52C40.83 50.21 41.39 50.77 42.08 50.77C42.77 50.77 43.33 50.21 43.33 49.52H40.83ZM72 37H70.75C70.75 55.64 55.64 70.75 37 70.75V72V73.25C57.02 73.25 73.25 57.02 73.25 37H72ZM37 72V70.75C18.36 70.75 3.25 55.64 3.25 37H2H0.75C0.75 57.02 16.98 73.25 37 73.25V72ZM2 37H3.25C3.25 18.36 18.36 3.25 37 3.25V2V0.75C16.98 0.75 0.75 16.98 0.75 37H2ZM37 2V3.25C55.64 3.25 70.75 18.36 70.75 37H72H73.25C73.25 16.98 57.02 0.75 37 0.75V2ZM16.66 24.1V25.35H57.34V24.1V22.85H16.66V24.1ZM21.75 24.1V25.35H52.25V24.1V22.85H21.75V24.1ZM52.25 24.1H51V54.61H52.25H53.5V24.1H52.25ZM52.25 54.61H51C51 55.17 50.78 55.72 50.38 56.12L51.26 57L52.14 57.89C53.01 57.02 53.5 55.84 53.5 54.61H52.25ZM51.26 57L50.38 56.12C49.98 56.52 49.43 56.75 48.86 56.75V58V59.25C50.09 59.25 51.27 58.76 52.14 57.89L51.26 57ZM48.86 58V56.75H25.14V58V59.25H48.86V58ZM25.14 58V56.75C24.57 56.75 24.02 56.52 23.62 56.12L22.74 57L21.86 57.89C22.73 58.76 23.91 59.25 25.14 59.25V58ZM22.74 57L23.62 56.12C23.22 55.72 23 55.17 23 54.61H21.75H20.5C20.5 55.84 20.99 57.02 21.86 57.89L22.74 57ZM21.75 54.61H23V24.1H21.75H20.5V54.61H21.75ZM28.53 24.1H29.78V22.4H28.53H27.28V24.1H28.53ZM28.53 22.4L29.78 22.39C29.77 21.44 29.94 20.49 30.3 19.6L29.14 19.13L27.99 18.66C27.5 19.86 27.26 21.13 27.28 22.42L28.53 22.4ZM29.14 19.13L30.3 19.6C30.66 18.72 31.19 17.91 31.86 17.23L30.98 16.35L30.09 15.47C29.18 16.39 28.47 17.47 27.99 18.66L29.14 19.13ZM30.98 16.35L31.86 17.23C32.54 16.55 33.34 16.01 34.22 15.64L33.74 14.49L33.25 13.34C32.07 13.83 30.99 14.56 30.09 15.47L30.98 16.35ZM33.74 14.49L34.22 15.64C35.1 15.28 36.04 15.09 37 15.09V13.84V12.59C35.71 12.59 34.44 12.84 33.25 13.34L33.74 14.49ZM37 13.84V15.09C37.96 15.09 38.9 15.28 39.78 15.64L40.27 14.49L40.75 13.34C39.56 12.84 38.29 12.59 37 12.59V13.84ZM40.27 14.49L39.78 15.64C40.67 16.01 41.47 16.55 42.14 17.23L43.03 16.35L43.91 15.47C43.01 14.56 41.93 13.83 40.75 13.34L40.27 14.49ZM43.03 16.35L42.14 17.23C42.81 17.91 43.34 18.72 43.7 19.6L44.86 19.13L46.02 18.66C45.53 17.47 44.82 16.39 43.91 15.47L43.03 16.35ZM44.86 19.13L43.7 19.6C44.06 20.49 44.24 21.44 44.22 22.39L45.47 22.4L46.72 22.42C46.74 21.13 46.5 19.86 46.02 18.66L44.86 19.13ZM45.47 22.4H44.22V24.1H45.47H46.72V22.4H45.47ZM31.92 30.88H30.67V49.52H31.92H33.17V30.88H31.92ZM42.08 30.88H40.83V49.52H42.08H43.33V30.88H42.08Z" fill="#BD0D1D"/>
      </svg>
    ),
    children: (
      <Typography>
        This record will be deleted permanently.
      </Typography>
    ),
    actions: (
      <>
        <RdsButton changeLeftIcon="add"
          changeRightIcon="save"
          color="primary"
          layout="text-only"
          shape="rectangle"
          showLeftIcon
          size="medium"
          state="default"
          style="outlined"
          text="Cancel"
          textCase="uppercase" />
        <RdsButton color="primary" textCase="uppercase" layout="text-only" shape="rectangle" size="medium" state="default" style="filled" text="Delete" />
      </>
    ),
  },
};

export const WithoutCloseButton = {
  render: ModalTemplate,
  parameters: {
    controls: {
      exclude: ['component', 'slots', 'slotProps', 'onClose', 'actions', 'icon', 'showIcon', 'isOpen', 'imageSrc'],
    },
  },
  args: {
    title: 'No Close Button',
    showCloseButton: false,
    children: (
      <Typography>
        This modal doesn't have a close button in the header. You must use the action buttons to close it.
      </Typography>
    ),
    actions: (
        <RdsButton changeLeftIcon="add"
          changeRightIcon="save"
          color="primary"
          layout="text-only"
          shape="rectangle"
          showLeftIcon
          size="medium"
          state="default"
          style="outlined"
          text="Cancel"
          textCase="uppercase" />    ),
  },
};

export const LargeModal = {
  render: ModalTemplate,
  parameters: {
    controls: {
      exclude: ['component', 'slots', 'slotProps', 'onClose', 'actions', 'icon', 'showIcon', 'isOpen', 'imageSrc'],
    },
  },
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
         <RdsButton changeLeftIcon="add"
          changeRightIcon="save"
          color="primary"
          layout="text-only"
          shape="rectangle"
          showLeftIcon
          size="medium"
          state="default"
          style="outlined"
          text="Cancel"
          textCase="uppercase" />
        <RdsButton color="primary" textCase="uppercase" layout="text-only" shape="rectangle" size="medium" state="default" style="filled" text="Delete" />
      </>
    ),
  },
};

export const SmallModal = {
  render: ModalTemplate,
  parameters: {
    controls: {
      exclude: ['component', 'slots', 'slotProps', 'onClose', 'actions', 'icon', 'showIcon', 'isOpen', 'imageSrc'],
    },
  },
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
         <RdsButton changeLeftIcon="add"
          changeRightIcon="save"
          color="primary"
          layout="text-only"
          shape="rectangle"
          showLeftIcon
          size="medium"
          state="default"
          style="outlined"
          text="Cancel"
          textCase="uppercase" />
        <RdsButton color="primary" textCase="uppercase" layout="text-only" shape="rectangle" size="medium" state="default" style="filled" text="Delete" />
      </>
    ),
  },
};

export const WithIcon = {
  render: ModalTemplate,
  parameters: {
    controls: {
      exclude: ['component', 'slots', 'slotProps', 'onClose', 'actions', 'icon', 'showIcon', 'isOpen', 'imageSrc'],
    },
  },
  args: {
    title: 'Are you sure?',
    showIcon: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 74 74" fill="none">
        <path d="M16.66 22.85C15.97 22.85 15.41 23.41 15.41 24.1C15.41 24.79 15.97 25.35 16.66 25.35V22.85ZM57.34 25.35C58.03 25.35 58.59 24.79 58.59 24.1C58.59 23.41 58.03 22.85 57.34 22.85V25.35ZM21.75 24.1V22.85C21.06 22.85 20.5 23.41 20.5 24.1H21.75ZM52.25 24.1H53.5C53.5 23.41 52.94 22.85 52.25 22.85V24.1ZM21.75 54.61H20.5H21.75ZM27.28 24.1C27.28 24.79 27.84 25.35 28.53 25.35C29.22 25.35 29.78 24.79 29.78 24.1H27.28ZM28.53 22.4H29.78L29.78 22.39L28.53 22.4ZM37 13.84V12.59V13.84ZM45.47 22.4L44.22 22.39V22.4H45.47ZM44.22 24.1C44.22 24.79 44.78 25.35 45.47 25.35C46.16 25.35 46.72 24.79 46.72 24.1H44.22ZM33.17 30.88C33.17 30.19 32.61 29.63 31.92 29.63C31.23 29.63 30.67 30.19 30.67 30.88H33.17ZM30.67 49.52C30.67 50.21 31.23 50.77 31.92 50.77C32.61 50.77 33.17 50.21 33.17 49.52H30.67ZM43.33 30.88C43.33 30.19 42.77 29.63 42.08 29.63C41.39 29.63 40.83 30.19 40.83 30.88H43.33ZM40.83 49.52C40.83 50.21 41.39 50.77 42.08 50.77C42.77 50.77 43.33 50.21 43.33 49.52H40.83ZM72 37H70.75C70.75 55.64 55.64 70.75 37 70.75V72V73.25C57.02 73.25 73.25 57.02 73.25 37H72ZM37 72V70.75C18.36 70.75 3.25 55.64 3.25 37H2H0.75C0.75 57.02 16.98 73.25 37 73.25V72ZM2 37H3.25C3.25 18.36 18.36 3.25 37 3.25V2V0.75C16.98 0.75 0.75 16.98 0.75 37H2ZM37 2V3.25C55.64 3.25 70.75 18.36 70.75 37H72H73.25C73.25 16.98 57.02 0.75 37 0.75V2ZM16.66 24.1V25.35H57.34V24.1V22.85H16.66V24.1ZM21.75 24.1V25.35H52.25V24.1V22.85H21.75V24.1ZM52.25 24.1H51V54.61H52.25H53.5V24.1H52.25ZM52.25 54.61H51C51 55.17 50.78 55.72 50.38 56.12L51.26 57L52.14 57.89C53.01 57.02 53.5 55.84 53.5 54.61H52.25ZM51.26 57L50.38 56.12C49.98 56.52 49.43 56.75 48.86 56.75V58V59.25C50.09 59.25 51.27 58.76 52.14 57.89L51.26 57ZM48.86 58V56.75H25.14V58V59.25H48.86V58ZM25.14 58V56.75C24.57 56.75 24.02 56.52 23.62 56.12L22.74 57L21.86 57.89C22.73 58.76 23.91 59.25 25.14 59.25V58ZM22.74 57L23.62 56.12C23.22 55.72 23 55.17 23 54.61H21.75H20.5C20.5 55.84 20.99 57.02 21.86 57.89L22.74 57ZM21.75 54.61H23V24.1H21.75H20.5V54.61H21.75ZM28.53 24.1H29.78V22.4H28.53H27.28V24.1H28.53ZM28.53 22.4L29.78 22.39C29.77 21.44 29.94 20.49 30.3 19.6L29.14 19.13L27.99 18.66C27.5 19.86 27.26 21.13 27.28 22.42L28.53 22.4ZM29.14 19.13L30.3 19.6C30.66 18.72 31.19 17.91 31.86 17.23L30.98 16.35L30.09 15.47C29.18 16.39 28.47 17.47 27.99 18.66L29.14 19.13ZM30.98 16.35L31.86 17.23C32.54 16.55 33.34 16.01 34.22 15.64L33.74 14.49L33.25 13.34C32.07 13.83 30.99 14.56 30.09 15.47L30.98 16.35ZM33.74 14.49L34.22 15.64C35.1 15.28 36.04 15.09 37 15.09V13.84V12.59C35.71 12.59 34.44 12.84 33.25 13.34L33.74 14.49ZM37 13.84V15.09C37.96 15.09 38.9 15.28 39.78 15.64L40.27 14.49L40.75 13.34C39.56 12.84 38.29 12.59 37 12.59V13.84ZM40.27 14.49L39.78 15.64C40.67 16.01 41.47 16.55 42.14 17.23L43.03 16.35L43.91 15.47C43.01 14.56 41.93 13.83 40.75 13.34L40.27 14.49ZM43.03 16.35L42.14 17.23C42.81 17.91 43.34 18.72 43.7 19.6L44.86 19.13L46.02 18.66C45.53 17.47 44.82 16.39 43.91 15.47L43.03 16.35ZM44.86 19.13L43.7 19.6C44.06 20.49 44.24 21.44 44.22 22.39L45.47 22.4L46.72 22.42C46.74 21.13 46.5 19.86 46.02 18.66L44.86 19.13ZM45.47 22.4H44.22V24.1H45.47H46.72V22.4H45.47ZM31.92 30.88H30.67V49.52H31.92H33.17V30.88H31.92ZM42.08 30.88H40.83V49.52H42.08H43.33V30.88H42.08Z" fill="#BD0D1D"/>
      </svg>
    ),
    children: (
      <Typography>
        This record will be deleted permanently.
      </Typography>
    ),
  },
};

export const WithImage = {
  render: ModalTemplate,
  parameters: {
    controls: {
      exclude: ['component', 'slots', 'slotProps', 'onClose', 'actions', 'icon', 'showIcon', 'isOpen'],
    },
  },
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
