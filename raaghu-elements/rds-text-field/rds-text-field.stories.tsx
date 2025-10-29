import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsTextField from './rds-text-field';
import { Email, Lock, Search } from '@mui/icons-material';
import { InputAdornment } from '@mui/material';

const meta: Meta<typeof RdsTextField> = {
  title: 'Elements/Text Field',
  component: RdsTextField,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the text field',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
      description: 'Visual variant of the text field',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Size of the text field',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search'],
      description: 'Input type',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the field is disabled',
    },
    isRequired: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    multiline: {
      control: 'boolean',
      description: 'Whether the field supports multiple lines',
    },
    rows: {
      control: 'number',
      description: 'Number of rows for multiline fields',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default TextField',
    placeholder: 'Enter text here...',
  },
};

export const Outlined: Story = {
  args: {
    label: 'Outlined TextField',
    variant: 'outlined',
    placeholder: 'Outlined variant',
  },
};

export const Filled: Story = {
  args: {
    label: 'Filled TextField',
    variant: 'filled',
    placeholder: 'Filled variant',
  },
};

export const Standard: Story = {
  args: {
    label: 'Standard TextField',
    variant: 'standard',
    placeholder: 'Standard variant',
  },
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    isRequired: true,
    placeholder: 'This field is required',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    errorMessage: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Password must be at least 8 characters',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    disabled: true,
    defaultValue: 'Cannot edit this',
  },
};

export const Small: Story = {
  args: {
    label: 'Small TextField',
    size: 'small',
    placeholder: 'Small size',
  },
};

export const Multiline: Story = {
  args: {
    label: 'Multiline TextField',
    multiline: true,
    rows: 4,
    placeholder: 'Enter multiple lines of text...',
  },
};

export const WithStartAdornment: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    InputProps: {
      startAdornment: (
        <InputAdornment position="start">
          <Email />
        </InputAdornment>
      ),
    },
  },
};

export const WithEndAdornment: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <Search />
        </InputAdornment>
      ),
    },
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    InputProps: {
      startAdornment: (
        <InputAdornment position="start">
          <Lock />
        </InputAdornment>
      ),
    },
  },
};
