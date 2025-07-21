import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormatBold, FormatItalic, FormatUnderlined } from '@mui/icons-material';
import RdsToggleButton from './rds-toggle-button';

const meta: Meta<typeof RdsToggleButton> = {
  title: 'Elements/Toggle Button',
  component: RdsToggleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'text' },
    },
    multiple: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: { type: 'select' },
      options: ['standard', 'primary', 'secondary', 'error', 'info', 'success', 'warning'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const formatOptions = [
  { value: 'bold', label: 'Bold', icon: <FormatBold /> },
  { value: 'italic', label: 'Italic', icon: <FormatItalic /> },
  { value: 'underlined', label: 'Underlined', icon: <FormatUnderlined /> },
];

export const Default: Story = {
  args: {
    options: formatOptions,
    value: 'bold',
  },
};

export const Multiple: Story = {
  args: {
    options: formatOptions,
    multiple: true,
    value: ['bold', 'italic'],
  },
};

export const WithoutIcons: Story = {
  args: {
    options: [
      { value: 'left', label: 'Left' },
      { value: 'center', label: 'Center' },
      { value: 'right', label: 'Right' },
    ],
    value: 'center',
  },
};

export const Disabled: Story = {
  args: {
    options: formatOptions,
    disabled: true,
    value: 'bold',
  },
};

export const Small: Story = {
  args: {
    options: formatOptions,
    size: 'small',
    value: 'bold',
  },
};

export const Large: Story = {
  args: {
    options: formatOptions,
    size: 'large',
    value: 'bold',
  },
};

export const Primary: Story = {
  args: {
    options: formatOptions,
    color: 'primary',
    value: 'bold',
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: 'bold', label: 'Bold', icon: <FormatBold /> },
      { value: 'italic', label: 'Italic', icon: <FormatItalic />, disabled: true },
      { value: 'underlined', label: 'Underlined', icon: <FormatUnderlined /> },
    ],
    value: 'bold',
  },
};
