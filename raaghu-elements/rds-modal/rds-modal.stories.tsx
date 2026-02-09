import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsModal from './rds-modal';
import { Typography } from '@mui/material';
import { useState } from 'react';
import RdsButton from '../rds-button/rds-button';

const meta: Meta<typeof RdsModal> = {
  title: 'Elements/Modal',
  component: RdsModal,
  parameters: {
    layout: 'centered',
    controls: {
      exclude: ['component', 'slots', 'slotProps', 'onClose', 'actions', 'icon', 'isOpen'],
    },
  },
  tags: ['autodocs'],
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
        onClick={() => setOpen(false)}
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
      exclude: ['component', 'slots', 'slotProps', 'onClose', 'actions', 'icon', 'showIcon', 'isOpen'],
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
  args: {
    title: 'Are you sure?',
    showIcon: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 74 74" fill="none">
        <path d="M16.6616 22.8492C15.9713 22.8492 15.4116 23.4089 15.4116 24.0992C15.4116 24.7896 15.9713 25.3492 16.6616 25.3492V22.8492ZM57.3384 25.3492C58.0287 25.3492 58.5884 24.7896 58.5884 24.0992C58.5884 23.4089 58.0287 22.8492 57.3384 22.8492V25.3492ZM21.7462 24.0992V22.8492C21.0559 22.8492 20.4962 23.4089 20.4962 24.0992H21.7462ZM52.2538 24.0992H53.5038C53.5038 23.4089 52.9441 22.8492 52.2538 22.8492V24.0992ZM21.7462 54.6068H20.4962H21.7462ZM27.2764 24.0992C27.2764 24.7896 27.836 25.3492 28.5264 25.3492C29.2167 25.3492 29.7764 24.7896 29.7764 24.0992H27.2764ZM28.5264 22.4047H29.7764L29.7763 22.3909L28.5264 22.4047ZM37.0005 13.8363V12.5863V13.8363ZM45.4747 22.4047L44.2247 22.3909V22.4047H45.4747ZM44.2247 24.0992C44.2247 24.7896 44.7843 25.3492 45.4747 25.3492C46.165 25.3492 46.7247 24.7896 46.7247 24.0992H44.2247ZM33.1654 30.8783C33.1654 30.188 32.6058 29.6283 31.9154 29.6283C31.2251 29.6283 30.6654 30.188 30.6654 30.8783H33.1654ZM30.6654 49.5212C30.6654 50.2115 31.2251 50.7712 31.9154 50.7712C32.6058 50.7712 33.1654 50.2115 33.1654 49.5212H30.6654ZM43.3346 30.8783C43.3346 30.188 42.7749 29.6283 42.0846 29.6283C41.3942 29.6283 40.8346 30.188 40.8346 30.8783H43.3346ZM40.8346 49.5212C40.8346 50.2115 41.3942 50.7712 42.0846 50.7712C42.7749 50.7712 43.3346 50.2115 43.3346 49.5212H40.8346ZM72 37H70.75C70.75 55.6396 55.6396 70.75 37 70.75V72V73.25C57.0203 73.25 73.25 57.0203 73.25 37H72ZM37 72V70.75C18.3604 70.75 3.25 55.6396 3.25 37H2H0.75C0.75 57.0203 16.9797 73.25 37 73.25V72ZM2 37H3.25C3.25 18.3604 18.3604 3.25 37 3.25V2V0.75C16.9797 0.75 0.75 16.9797 0.75 37H2ZM37 2V3.25C55.6396 3.25 70.75 18.3604 70.75 37H72H73.25C73.25 16.9797 57.0203 0.75 37 0.75V2ZM16.6616 24.0992V25.3492H57.3384V24.0992V22.8492H16.6616V24.0992ZM21.7462 24.0992V25.3492H52.2538V24.0992V22.8492H21.7462V24.0992ZM52.2538 24.0992H51.0038V54.6068H52.2538H53.5038V24.0992H52.2538ZM52.2538 54.6068H51.0038C51.0038 55.1744 50.7783 55.7187 50.377 56.12L51.2608 57.0039L52.1447 57.8878C53.0149 57.0176 53.5038 55.8374 53.5038 54.6068H52.2538ZM51.2608 57.0039L50.377 56.12C49.9756 56.5214 49.4313 56.7469 48.8637 56.7469V57.9969V59.2469C50.0943 59.2469 51.2746 58.758 52.1447 57.8878L51.2608 57.0039ZM48.8637 57.9969V56.7469H25.1363V57.9969V59.2469H48.8637V57.9969ZM25.1363 57.9969V56.7469C24.5687 56.7469 24.0244 56.5214 23.623 56.12L22.7392 57.0039L21.8553 57.8878C22.7255 58.758 23.9057 59.2469 25.1363 59.2469V57.9969ZM22.7392 57.0039L23.623 56.12C23.2217 55.7187 22.9962 55.1744 22.9962 54.6068H21.7462H20.4962C20.4962 55.8374 20.9851 57.0176 21.8553 57.8878L22.7392 57.0039ZM21.7462 54.6068H22.9962V24.0992H21.7462H20.4962V54.6068H21.7462ZM28.5264 24.0992H29.7764V22.4047H28.5264H27.2764V24.0992H28.5264ZM28.5264 22.4047L29.7763 22.3909C29.7657 21.4355 29.9448 20.4874 30.3031 19.6017L29.1443 19.1329L27.9855 18.6642C27.5032 19.8564 27.2622 21.1325 27.2764 22.4185L28.5264 22.4047ZM29.1443 19.1329L30.3031 19.6017C30.6614 18.7159 31.1919 17.91 31.8637 17.2307L30.975 16.3517L30.0862 15.4727C29.1818 16.3872 28.4678 17.4719 27.9855 18.6642L29.1443 19.1329ZM30.975 16.3517L31.8637 17.2307C32.5356 16.5513 33.3356 16.012 34.2173 15.6439L33.7358 14.4904L33.2542 13.3369C32.0674 13.8323 30.9906 14.5583 30.0862 15.4727L30.975 16.3517ZM33.7358 14.4904L34.2173 15.6439C35.099 15.2758 36.045 15.0863 37.0005 15.0863V13.8363V12.5863C35.7144 12.5863 34.4411 12.8414 33.2542 13.3369L33.7358 14.4904ZM37.0005 13.8363V15.0863C37.956 15.0863 38.902 15.2758 39.7837 15.6439L40.2653 14.4904L40.7468 13.3369C39.56 12.8414 38.2866 12.5863 37.0005 12.5863V13.8363ZM40.2653 14.4904L39.7837 15.6439C40.6655 16.012 41.4654 16.5513 42.1373 17.2307L43.0261 16.3517L43.9148 15.4727C43.0104 14.5583 41.9337 13.8323 40.7468 13.3369L40.2653 14.4904ZM43.0261 16.3517L42.1373 17.2307C42.8092 17.91 43.3396 18.7159 43.6979 19.6017L44.8567 19.1329L46.0155 18.6642C45.5332 17.4719 44.8192 16.3872 43.9148 15.4727L43.0261 16.3517ZM44.8567 19.1329L43.6979 19.6017C44.0563 20.4874 44.2353 21.4355 44.2247 22.3909L45.4747 22.4047L46.7246 22.4185C46.7388 21.1325 46.4978 19.8564 46.0155 18.6642L44.8567 19.1329ZM45.4747 22.4047H44.2247V24.0992H45.4747H46.7247V22.4047H45.4747ZM31.9154 30.8783H30.6654V49.5212H31.9154H33.1654V30.8783H31.9154ZM42.0846 30.8783H40.8346V49.5212H42.0846H43.3346V30.8783H42.0846Z" fill="#BD0D1D"/>
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
      exclude: ['component', 'slots', 'slotProps', 'onClose', 'actions', 'icon', 'showIcon','isOpen'],
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
      exclude: ['component', 'slots', 'slotProps', 'onClose', 'actions', 'icon', 'showIcon', 'isOpen' ],
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
      exclude: ['component', 'slots', 'slotProps', 'onClose', 'actions', 'icon', 'showIcon', 'isOpen'],
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
  args: {
    title: 'Are you sure?',
    showIcon: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="74" height="74" viewBox="0 0 74 74" fill="none">
        <path d="M16.6616 22.8492C15.9713 22.8492 15.4116 23.4089 15.4116 24.0992C15.4116 24.7896 15.9713 25.3492 16.6616 25.3492V22.8492ZM57.3384 25.3492C58.0287 25.3492 58.5884 24.7896 58.5884 24.0992C58.5884 23.4089 58.0287 22.8492 57.3384 22.8492V25.3492ZM21.7462 24.0992V22.8492C21.0559 22.8492 20.4962 23.4089 20.4962 24.0992H21.7462ZM52.2538 24.0992H53.5038C53.5038 23.4089 52.9441 22.8492 52.2538 22.8492V24.0992ZM21.7462 54.6068H20.4962H21.7462ZM27.2764 24.0992C27.2764 24.7896 27.836 25.3492 28.5264 25.3492C29.2167 25.3492 29.7764 24.7896 29.7764 24.0992H27.2764ZM28.5264 22.4047H29.7764L29.7763 22.3909L28.5264 22.4047ZM37.0005 13.8363V12.5863V13.8363ZM45.4747 22.4047L44.2247 22.3909V22.4047H45.4747ZM44.2247 24.0992C44.2247 24.7896 44.7843 25.3492 45.4747 25.3492C46.165 25.3492 46.7247 24.7896 46.7247 24.0992H44.2247ZM33.1654 30.8783C33.1654 30.188 32.6058 29.6283 31.9154 29.6283C31.2251 29.6283 30.6654 30.188 30.6654 30.8783H33.1654ZM30.6654 49.5212C30.6654 50.2115 31.2251 50.7712 31.9154 50.7712C32.6058 50.7712 33.1654 50.2115 33.1654 49.5212H30.6654ZM43.3346 30.8783C43.3346 30.188 42.7749 29.6283 42.0846 29.6283C41.3942 29.6283 40.8346 30.188 40.8346 30.8783H43.3346ZM40.8346 49.5212C40.8346 50.2115 41.3942 50.7712 42.0846 50.7712C42.7749 50.7712 43.3346 50.2115 43.3346 49.5212H40.8346ZM72 37H70.75C70.75 55.6396 55.6396 70.75 37 70.75V72V73.25C57.0203 73.25 73.25 57.0203 73.25 37H72ZM37 72V70.75C18.3604 70.75 3.25 55.6396 3.25 37H2H0.75C0.75 57.0203 16.9797 73.25 37 73.25V72ZM2 37H3.25C3.25 18.3604 18.3604 3.25 37 3.25V2V0.75C16.9797 0.75 0.75 16.9797 0.75 37H2ZM37 2V3.25C55.6396 3.25 70.75 18.3604 70.75 37H72H73.25C73.25 16.9797 57.0203 0.75 37 0.75V2ZM16.6616 24.0992V25.3492H57.3384V24.0992V22.8492H16.6616V24.0992ZM21.7462 24.0992V25.3492H52.2538V24.0992V22.8492H21.7462V24.0992ZM52.2538 24.0992H51.0038V54.6068H52.2538H53.5038V24.0992H52.2538ZM52.2538 54.6068H51.0038C51.0038 55.1744 50.7783 55.7187 50.377 56.12L51.2608 57.0039L52.1447 57.8878C53.0149 57.0176 53.5038 55.8374 53.5038 54.6068H52.2538ZM51.2608 57.0039L50.377 56.12C49.9756 56.5214 49.4313 56.7469 48.8637 56.7469V57.9969V59.2469C50.0943 59.2469 51.2746 58.758 52.1447 57.8878L51.2608 57.0039ZM48.8637 57.9969V56.7469H25.1363V57.9969V59.2469H48.8637V57.9969ZM25.1363 57.9969V56.7469C24.5687 56.7469 24.0244 56.5214 23.623 56.12L22.7392 57.0039L21.8553 57.8878C22.7255 58.758 23.9057 59.2469 25.1363 59.2469V57.9969ZM22.7392 57.0039L23.623 56.12C23.2217 55.7187 22.9962 55.1744 22.9962 54.6068H21.7462H20.4962C20.4962 55.8374 20.9851 57.0176 21.8553 57.8878L22.7392 57.0039ZM21.7462 54.6068H22.9962V24.0992H21.7462H20.4962V54.6068H21.7462ZM28.5264 24.0992H29.7764V22.4047H28.5264H27.2764V24.0992H28.5264ZM28.5264 22.4047L29.7763 22.3909C29.7657 21.4355 29.9448 20.4874 30.3031 19.6017L29.1443 19.1329L27.9855 18.6642C27.5032 19.8564 27.2622 21.1325 27.2764 22.4185L28.5264 22.4047ZM29.1443 19.1329L30.3031 19.6017C30.6614 18.7159 31.1919 17.91 31.8637 17.2307L30.975 16.3517L30.0862 15.4727C29.1818 16.3872 28.4678 17.4719 27.9855 18.6642L29.1443 19.1329ZM30.975 16.3517L31.8637 17.2307C32.5356 16.5513 33.3356 16.012 34.2173 15.6439L33.7358 14.4904L33.2542 13.3369C32.0674 13.8323 30.9906 14.5583 30.0862 15.4727L30.975 16.3517ZM33.7358 14.4904L34.2173 15.6439C35.099 15.2758 36.045 15.0863 37.0005 15.0863V13.8363V12.5863C35.7144 12.5863 34.4411 12.8414 33.2542 13.3369L33.7358 14.4904ZM37.0005 13.8363V15.0863C37.956 15.0863 38.902 15.2758 39.7837 15.6439L40.2653 14.4904L40.7468 13.3369C39.56 12.8414 38.2866 12.5863 37.0005 12.5863V13.8363ZM40.2653 14.4904L39.7837 15.6439C40.6655 16.012 41.4654 16.5513 42.1373 17.2307L43.0261 16.3517L43.9148 15.4727C43.0104 14.5583 41.9337 13.8323 40.7468 13.3369L40.2653 14.4904ZM43.0261 16.3517L42.1373 17.2307C42.8092 17.91 43.3396 18.7159 43.6979 19.6017L44.8567 19.1329L46.0155 18.6642C45.5332 17.4719 44.8192 16.3872 43.9148 15.4727L43.0261 16.3517ZM44.8567 19.1329L43.6979 19.6017C44.0563 20.4874 44.2353 21.4355 44.2247 22.3909L45.4747 22.4047L46.7246 22.4185C46.7388 21.1325 46.4978 19.8564 46.0155 18.6642L44.8567 19.1329ZM45.4747 22.4047H44.2247V24.0992H45.4747H46.7247V22.4047H45.4747ZM31.9154 30.8783H30.6654V49.5212H31.9154H33.1654V30.8783H31.9154ZM42.0846 30.8783H40.8346V49.5212H42.0846H43.3346V30.8783H42.0846Z" fill="#BD0D1D"/>
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