import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TextField, Select, MenuItem } from '@mui/material';
import RdsFormControl from './rds-form-control';

const meta: Meta<typeof RdsFormControl> = {
  title: 'Elements/Form Control',
  component: RdsFormControl,
  parameters: {
    status: { type: 'stable' },
    layout: 'centered',
    controls: {
      include: [
        'label',
        'helperText',
        'variant',
        'size',
        'error',
        'required',
        'disabled',
        'fullWidth',
        'isGroup',
      ],
    },
  },
  tags: ['autodocs', 'stable'],
  args: {
    label: 'Email Address',
    helperText: "We'll never share your email.",
    error: false,
    required: false,
    disabled: false,
    fullWidth: false,
    isGroup: false,
    variant: 'outlined',
    size: 'medium',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text displayed above the form control',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the form control',
    },
    variant: {
      control: { type: 'select' },
      options: ['standard', 'outlined', 'filled'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    error: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    isGroup: {
      control: { type: 'boolean' },
      description: 'Wrap children in a FormGroup (e.g. checkbox/radio groups)',
    },
    isRequired: {
      control: { type: 'boolean' },
      table: { disable: true },
    },
    children: {
      control: { disable: true },
      table: { disable: true },
    },
    className: {
      control: { disable: true },
      table: { disable: true },
    },
    sx: {
      control: { disable: true },
      table: { disable: true },
    },
    classes: {
      control: { disable: true },
      table: { disable: true },
    },
    component: {
      control: { disable: true },
      table: { disable: true },
    },
    ref: {
      control: { disable: true },
      table: { disable: true },
    },
    slotProps: {
      control: { disable: true },
      table: { disable: true },
    },
    slots: {
      control: { disable: true },
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTextField: Story = {
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector('input, select, textarea') || canvasElement.firstElementChild;
    expect(el).toBeTruthy();
  },
  render: (args) => (
    <RdsFormControl {...args}>
      <TextField
        error={args.error}
        placeholder="Enter your email"
        variant={args.variant}
        size={args.size}
        fullWidth={args.fullWidth}
        disabled={args.disabled}
      />
    </RdsFormControl>
  ),
};

export const WithSelect: Story = {
  args: {
    label: 'Country',
    helperText: 'Select your country',
  },
  render: (args) => (
    <RdsFormControl {...args}>
      <Select
        defaultValue="uk"
        variant={args.variant as 'standard' | 'outlined' | 'filled'}
        size={args.size}
        fullWidth={args.fullWidth}
        disabled={args.disabled}
      >
        <MenuItem value="us">United States</MenuItem>
        <MenuItem value="ca">Canada</MenuItem>
        <MenuItem value="uk">United Kingdom</MenuItem>
        <MenuItem value="de">Germany</MenuItem>
        <MenuItem value="gb">United Kingdom of Great Britain and Northern Ireland</MenuItem>
      </Select>
    </RdsFormControl>
  ),
};

export const Error: Story = {
  args: {
    label: 'Email Address',
    helperText: 'This field is required.',
    error: true,
  },
  render: (args) => (
    <RdsFormControl {...args}>
      <TextField
        error={args.error}
        placeholder="Enter your email"
        variant={args.variant}
        size={args.size}
        fullWidth={args.fullWidth}
        disabled={args.disabled}
      />
    </RdsFormControl>
  ),
};

export const Required: Story = {
  args: {
    label: 'Email Address',
    helperText: 'This field is required.',
    required: true,
    error: false,
  },
  render: (args) => (
    <RdsFormControl {...args}>
      <TextField
        error={args.error}
        placeholder="Enter your email"
        variant={args.variant}
        size={args.size}
        fullWidth={args.fullWidth}
        disabled={args.disabled}
      />
    </RdsFormControl>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Email Address',
    helperText: 'This field is disabled.',
    disabled: true,
    error: false,
  },
  render: (args) => (
    <RdsFormControl {...args}>
      <TextField
        disabled={args.disabled}
        error={args.error}
        placeholder="Enter your email"
        variant={args.variant}
        size={args.size}
        fullWidth={args.fullWidth}
      />
    </RdsFormControl>
  ),
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Field',
    helperText: 'This form control spans the full width.',
    fullWidth: true,
    error: false,
  },
  render: (args) => (
    <RdsFormControl {...args}>
      <TextField
        fullWidth={args.fullWidth}
        error={args.error}
        placeholder="This field takes full width"
        variant={args.variant}
        size={args.size}
        disabled={args.disabled}
      />
    </RdsFormControl>
  ),
};

export const Small: Story = {
  args: {
    label: 'Small Size',
    helperText: 'This is a small sized form control.',
    size: 'small',
    error: false,
  },
  render: (args) => (
    <RdsFormControl {...args}>
      <TextField
        size={args.size}
        error={args.error}
        placeholder="Small sized field"
        variant={args.variant}
        fullWidth={args.fullWidth}
        disabled={args.disabled}
      />
    </RdsFormControl>
  ),
};

export const Default: Story = { ...WithTextField };
