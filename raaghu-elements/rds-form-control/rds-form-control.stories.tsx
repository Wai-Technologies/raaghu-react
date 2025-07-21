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
    children: (
      <>
        <FormLabel>Email Address</FormLabel>
        <TextField placeholder="Enter your email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </>
    ),
  },
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
    children: (
      <>
        <FormLabel>Email Address</FormLabel>
        <TextField error placeholder="Enter your email" />
        <FormHelperText>This field is required.</FormHelperText>
      </>
    ),
  },
};

export const Required: Story = {
  args: {
    required: true,
    children: (
      <>
        <FormLabel>Email Address</FormLabel>
        <TextField placeholder="Enter your email" />
        <FormHelperText>This field is required.</FormHelperText>
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <FormLabel>Email Address</FormLabel>
        <TextField disabled placeholder="Enter your email" />
        <FormHelperText>This field is disabled.</FormHelperText>
      </>
    ),
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: (
      <>
        <FormLabel>Full Width Field</FormLabel>
        <TextField fullWidth placeholder="This field takes full width" />
        <FormHelperText>This form control spans the full width.</FormHelperText>
      </>
    ),
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: (
      <>
        <FormLabel>Small Size</FormLabel>
        <TextField size="small" placeholder="Small sized field" />
        <FormHelperText>This is a small sized form control.</FormHelperText>
      </>
    ),
  },
};
