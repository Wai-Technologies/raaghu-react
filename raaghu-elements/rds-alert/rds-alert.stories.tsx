import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsAlert from './rds-alert';

const meta: Meta<typeof RdsAlert> = {
  title: 'Elements/Alert',
  component: RdsAlert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'The message to display in the alert',
    },
    type: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success'],
      description: 'The type/severity of the alert',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'standard'],
      description: 'The variant of the alert',
    },
    Icon: {
      control: 'boolean',
      description: 'Show the info icon in the alert',
      defaultValue: true,
    },
    showTitle: {
      control: 'boolean',
      description: 'Show the heading title before the message',
      defaultValue: false,
    },
    title: {
      control: 'text',
      description: 'Heading title text (bold)',
      defaultValue: 'Heading Title.',
    },
    showDescription: {
      control: 'boolean',
      description: 'Show the description below the heading',
      defaultValue: true,
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Alert size',
      defaultValue: 'small',
    },
    multiline: {
      control: 'boolean',
      description: 'Show heading and description on separate lines (multiline style)',
      defaultValue: false,
    },
    variantStyle: {
      control: 'select',
      options: ['style1', 'style2', 'style3'],
      description: 'The style variant of the alert',
      defaultValue: 'style1',
    },
    showLink: {
      control: 'boolean',
      description: 'Show the Link button',
      defaultValue: true,
    },
    showSecondary: {
      control: 'boolean',
      description: 'Show the Cancel button',
      defaultValue: true,
    },
    showPrimary: {
      control: 'boolean',
      description: 'Show the Okay button',
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'This is the description of the message bar.',
    type: 'info',
    Icon: true,
    showTitle: true,
    title: 'Heading Title.',
    size: 'medium',
    multiline: false,
    showDescription: true,
  },
};
// export const Multiline: Story = {
//   args: {
//     message: 'This is the description of the message bar.',
//     type: 'info',
//     Icon: true,
//     showTitle: true,
//     title: 'Heading Title.',
//     size: 'medium',
//     multiline: true,
//   },
// };

export const Success: Story = {
  args: {
    message: 'This is the description of the message bar.',
    type: 'success',
    Icon: true,
    showTitle: true,
    title: 'Heading Title.',
  },
};

export const Warning: Story = {
  args: {
    message: 'This is the description of the message bar.',
    type: 'warning',
    Icon: true,
    showTitle: true,
    title: 'Heading Title.',
  },
};

export const Error: Story = {
  args: {
    message: 'This is the description of the message bar.',
    type: 'error',
    Icon: true,
    showTitle: true,
    title: 'Heading Title.',
  },                                                              
};

export const Filled: Story = {
  args: {
    message: 'This is the description of the message bar.',
    type: 'success',
    variant: 'filled',
    Icon: true,
    showTitle: true,
    title: 'Heading Title.',
  },
};

export const Outlined: Story = {
  args: {
    message: 'This is the description of the message bar.',
    type: 'warning',
    variant: 'outlined',
    Icon: true,
    showTitle: true,
    title: 'Heading Title.',
  },
};
