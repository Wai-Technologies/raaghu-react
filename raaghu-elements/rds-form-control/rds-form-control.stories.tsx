import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField, Select, MenuItem, FormHelperText, FormLabel } from '@mui/material';
import RdsFormControl from './rds-form-control';

const meta: Meta<typeof RdsFormControl> = {
  title: 'Elements/Form Control',
  component: RdsFormControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
  render: (args) => (
    <RdsFormControl {...args}>
      <FormLabel>Email Address</FormLabel>
      <TextField error={args.error} placeholder="Enter your email" />
      <FormHelperText>We'll never share your email.</FormHelperText>
    </RdsFormControl>
  ),
};

export const WithSelect: Story = {
  args: {
    children: (
      <>
        <FormLabel>Country</FormLabel>
        <Select defaultValue="">
          <MenuItem value="us">United States</MenuItem>
          <MenuItem value="ca">Canada</MenuItem>
          <MenuItem value="uk">United Kingdom</MenuItem>
          <MenuItem value="de">Germany</MenuItem>
        </Select>
        <FormHelperText>Select your country</FormHelperText>
      </>
    ),
  },
};

export const Error: Story = {
  args: {
    error: true,
  },
  render: (args) => (
    <RdsFormControl {...args}>
      <FormLabel>Email Address</FormLabel>
      <TextField error={args.error} placeholder="Enter your email" />
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
      <TextField error={args.error} placeholder="Enter your email" />
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
      <TextField disabled={args.disabled} error={args.error} placeholder="Enter your email" />
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
      <TextField fullWidth={args.fullWidth} error={args.error} placeholder="This field takes full width" />
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
      <TextField size={args.size} error={args.error} placeholder="Small sized field" />
      <FormHelperText>This is a small sized form control.</FormHelperText>
    </RdsFormControl>
  ),
};
