import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from '@storybook/test';
import RdsAlert from './rds-alert';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const meta: Meta<typeof RdsAlert> = {
  title: 'Elements/Alert',
  component: RdsAlert,
  parameters: {
    layout: 'padded',
    controls: {
            exclude: ['component', 'slots', 'slotProps', 'variant']
        },
  },
  tags: ['autodocs'],
  argTypes: {
    description: {
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

export const AlertVisible: Story = {
  name: 'Interaction: Alert Renders',
  args: {
    description: 'This is the description of the message bar.',
    type: 'info',
    showIcon: true,
    showTitle: true,
    title: 'Heading Title.',
  },
  play: async ({ canvasElement }) => {
    const alert = canvasElement.querySelector(
      '[role="alert"], [class*="alert"]'
    )
    await expect(alert).not.toBeNull()
    await expect(alert).toBeVisible()
  }
};

export const Default: Story = {
  args: {
    description: 'This is the description of the message bar.',
    type: 'info',
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
    type: 'error',
    showIcon: true,
    showTitle: true,
    title: 'Heading Title.',
  },
};

export const Filled: Story = {
  args: {
    description: 'This is the description of the message bar.',
    type: 'success',
    variant: 'filled',
    showIcon: true,
    showTitle: true,
    title: 'Heading Title.',
  },
};

export const Outlined: Story = {
  args: {
    description: 'This is the description of the message bar.',
    type: 'warning',
    variant: 'outlined',
    showIcon: true,
    showTitle: true,
    title: 'Heading Title.',
  },
};

export const Success: Story = {
  args: {
    description: 'This is the description of the message bar.',
    type: 'success',
    showIcon: true,
    showTitle: true,
    title: 'Heading Title.',
  },
};

export const Warning: Story = {
  args: {
    description: 'This is the description of the message bar.',
    type: 'warning',
    showIcon: true,
    showTitle: true,
    title: 'Heading Title.',
  },
};

