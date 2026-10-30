import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import RdsAlert, { type RdsAlertProps } from './rds-alert';
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
      exclude: [
        'component', 'slots', 'slotProps', 'variant',
        'type', 'changeIconName', 'content', 'actions',
      ],
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    description: {
      control: 'text',
      description: 'The message to display in the alert',
    },
    severity: {
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
      description: 'Show the icon in the alert',
    },
    icon: {
      control: 'select',
      options: ['Default', 'Info', 'Success', 'Warning', 'Error', 'None'],
      mapping: {
        Default: undefined,
        Info: <InfoOutlinedIcon />,
        Success: <CheckCircleOutlineIcon />,
        Warning: <WarningAmberIcon />,
        Error: <ErrorOutlineIcon />,
        None: false,
      },
      description: 'Custom icon for the alert; `false` hides it',
    },
    showButtons: {
      control: 'boolean',
      description: 'Show action buttons',
    },
    showTitle: {
      control: 'boolean',
      description: 'Show the heading title before the message',
    },
    title: {
      control: 'text',
      description: 'Heading title text (bold)',
    },
    showDescription: {
      control: 'boolean',
      description: 'Show the description',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Alert size',
    },
    multiline: {
      control: 'boolean',
      description: 'Show heading and description on separate lines',
    },
    variantStyle: {
      name: 'style',
      control: 'select',
      options: ['style1', 'style2', 'style3'],
      description: 'The style variant of the alert',
    },
    showLink: {
      control: 'boolean',
      description: 'Show the link button',
    },
    showSecondary: {
      control: 'boolean',
      description: 'Show the secondary (cancel) button',
    },
    showPrimary: {
      control: 'boolean',
      description: 'Show the primary (confirm) button',
    },
    linkText: { control: 'text', description: 'Label of the link button' },
    secondaryText: { control: 'text', description: 'Label of the secondary button' },
    primaryText: { control: 'text', description: 'Label of the primary button' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const baseArgs = {
  description: 'This is the description of the message bar.',
  showIcon: true,
  showTitle: true,
  title: 'Heading Title.',
  showButtons: true,
  showLink: true,
  showSecondary: true,
  showPrimary: true,
} satisfies Partial<RdsAlertProps>;

export const Default: Story = {
  args: {
    ...baseArgs,
    severity: 'info',
    size: 'medium',
    multiline: false,
    showDescription: true,
  },
  play: async ({ canvas }) => {
    const alert = await canvas.findByRole('alert');
    await expect(alert).toBeInTheDocument();
  },
};

export const Error: Story = {
  args: { ...baseArgs, severity: 'error' },
};

export const Filled: Story = {
  args: { ...baseArgs, severity: 'success', variant: 'filled' },
};

export const Outlined: Story = {
  args: { ...baseArgs, severity: 'warning', variant: 'outlined' },
};

export const Success: Story = {
  args: { ...baseArgs, severity: 'success' },
};

export const Warning: Story = {
  args: { ...baseArgs, severity: 'warning' },
};
