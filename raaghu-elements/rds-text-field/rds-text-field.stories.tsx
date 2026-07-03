import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import RdsTextField from './rds-text-field';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';

const meta: Meta<typeof RdsTextField> = {
  title: 'Elements/Text Field',
  component: RdsTextField,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the text field',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message shown below the field',
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
    defaultValue: {
      control: 'text',
      description: 'Default value for the text field',
    },
    component: {
      control: { disable: true },
      table: { disable: true },
    },
    ref: {
      control: { disable: true },
      table: { disable: true },
    },
    inputRef: {
      control: { disable: true },
      table: { disable: true },
    },
    InputProps: {
      control: { disable: true },
    },
    inputProps: {
      control: { disable: true },
    },
    InputLabelProps: {
      control: { disable: true },
    },
    FormHelperTextProps: {
      control: { disable: true },
    },
    SelectProps: {
      control: { disable: true },
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
    slotProps: {
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <EmailIcon />
          </InputAdornment>
        ),
      },
    },
  },
};

export const WithEndAdornment: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    slotProps: {
      input: {
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      },
    },
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    slotProps: {
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon />
          </InputAdornment>
        ),
      },
    },
  },
};
