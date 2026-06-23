import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn, waitFor } from 'storybook/test';
import { TextField, Select, MenuItem, FormHelperText, FormLabel } from '@mui/material';
import RdsFormControl from './rds-form-control';

const meta: Meta<typeof RdsFormControl> = {
  title: 'Elements/Form Control',
  component: RdsFormControl,
  parameters: {
        status: { type: 'stable' },
    layout: 'centered',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTextField: Story = {
  args: {
    error: false,
  },
  play: async ({ canvasElement }) => {
    const el = canvasElement.querySelector('input, select, textarea') || canvasElement.firstElementChild;
    expect(el).toBeTruthy();
  },
  render: (args) => (
    <RdsFormControl {...args}>
      <FormLabel>Email Address</FormLabel>
      <TextField
        error={args.error}
        placeholder="Enter your email"
        variant={args.variant}
        size={args.size}
        fullWidth={args.fullWidth}
        disabled={args.disabled}
      />
      <FormHelperText>We'll never share your email.</FormHelperText>
    </RdsFormControl>
  ),
};

export const WithSelect: Story = {
  args: {
    fullWidth: true,
  },
  render: (args) => (
    <RdsFormControl {...args}>
      <FormLabel>Country</FormLabel>
      <Select
        defaultValue=""
        variant={args.variant as any}
        size={args.size as any}
        fullWidth={args.fullWidth}
        disabled={args.disabled}
      >
        <MenuItem value="us">United States</MenuItem>
        <MenuItem value="ca">Canada</MenuItem>
        <MenuItem value="uk">United Kingdom</MenuItem>
        <MenuItem value="de">Germany</MenuItem>
      </Select>
      <FormHelperText>Select your country</FormHelperText>
    </RdsFormControl>
  ),
};

export const Error: Story = {
  args: {
    error: true,
  },
  render: (args) => (
    <RdsFormControl {...args}>
      <FormLabel>Email Address</FormLabel>
      <TextField
        error={args.error}
        placeholder="Enter your email"
        variant={args.variant}
        size={args.size}
        fullWidth={args.fullWidth}
        disabled={args.disabled}
      />
      <FormHelperText>This field is required.</FormHelperText>
    </RdsFormControl>
  ),
};

export const Required: Story = {
  args: {
    required: true,
    error: false,
  },
  render: (args) => (
    <RdsFormControl {...args}>
      <FormLabel>Email Address</FormLabel>
      <TextField
        error={args.error}
        placeholder="Enter your email"
        variant={args.variant}
        size={args.size}
        fullWidth={args.fullWidth}
        disabled={args.disabled}
      />
      <FormHelperText>This field is required.</FormHelperText>
    </RdsFormControl>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    error: false,
  },
  render: (args) => (
    <RdsFormControl {...args}>
      <FormLabel>Email Address</FormLabel>
      <TextField
        disabled={args.disabled}
        error={args.error}
        placeholder="Enter your email"
        variant={args.variant}
        size={args.size}
        fullWidth={args.fullWidth}
      />
      <FormHelperText>This field is disabled.</FormHelperText>
    </RdsFormControl>
  ),
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    error: false,
  },
  render: (args) => (
    <RdsFormControl {...args}>
      <FormLabel>Full Width Field</FormLabel>
      <TextField
        fullWidth={args.fullWidth}
        error={args.error}
        placeholder="This field takes full width"
        variant={args.variant}
        size={args.size}
        disabled={args.disabled}
      />
      <FormHelperText>This form control spans the full width.</FormHelperText>
    </RdsFormControl>
  ),
};

export const Small: Story = {
  args: {
    size: 'small',
    error: false,
  },
  render: (args) => (
    <RdsFormControl {...args}>
      <FormLabel>Small Size</FormLabel>
      <TextField
        size={args.size}
        error={args.error}
        placeholder="Small sized field"
        variant={args.variant}
        fullWidth={args.fullWidth}
        disabled={args.disabled}
      />
      <FormHelperText>This is a small sized form control.</FormHelperText>
    </RdsFormControl>
  ),
};

export const Default: Story = { ...WithTextField };
