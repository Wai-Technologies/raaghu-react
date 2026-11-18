import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsAlert from './rds-alert';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const meta: Meta<typeof RdsAlert> = {
  title: 'Elements/Alert',
  component: RdsAlert,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
    controls: {
            exclude: ['component', 'slots', 'slotProps', 'variant']
        },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    description: {
      control: 'text',
      description: 'The message to display in the alert',
    },
    color: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success'],
      description: 'Semantic color of the alert',
    },
    // Deprecated aliases of `color`; hidden so only one color control is shown.
    type: { control: { disable: true }, table: { disable: true } },
    severity: { control: { disable: true }, table: { disable: true } },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'standard'],
      description: 'The variant of the alert',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show the info icon in the alert',
      defaultValue: true,
    },
    changeIconName: {
      control: 'select',
      options: ['Info', 'Success', 'Warning', 'Error', 'None'],
      mapping: {
        Info: <InfoOutlinedIcon />,
        Success: <CheckCircleOutlineIcon />,
        Warning: <WarningAmberIcon />,
        Error: <ErrorOutlineIcon />,
        None: null,
      },
      description: 'Custom icon for the alert',
      defaultValue: null,
    },
    showButtons: {
      control: 'boolean',
      description: 'Show action buttons (Link, Cancel, Okay)',
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
      name: 'style', 
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
    description: 'This is the description of the message bar.',
    color: 'info',
    showIcon: true,
    showTitle: true,
    title: 'Heading Title.',
    size: 'medium',
    multiline: false,
    showDescription: true,
  },
};

export const Error: Story = {
  args: {
    description: 'This is the description of the message bar.',
    color: 'error',
    showIcon: true,
    showTitle: true,
    title: 'Heading Title.',
  },
};

export const Filled: Story = {
  args: {
    description: 'This is the description of the message bar.',
    color: 'success',
    variant: 'filled',
    showIcon: true,
    showTitle: true,
    title: 'Heading Title.',
  },
};

export const Outlined: Story = {
  args: {
    description: 'This is the description of the message bar.',
    color: 'warning',
    variant: 'outlined',
    showIcon: true,
    showTitle: true,
    title: 'Heading Title.',
  },
};

export const Success: Story = {
  args: {
    description: 'This is the description of the message bar.',
    color: 'success',
    showIcon: true,
    showTitle: true,
    title: 'Heading Title.',
  },
};

export const Warning: Story = {
  args: {
    description: 'This is the description of the message bar.',
    color: 'warning',
    showIcon: true,
    showTitle: true,
    title: 'Heading Title.',
  },
};

