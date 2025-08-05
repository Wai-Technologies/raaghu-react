import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { 
  FormatBold, 
  FormatItalic, 
  FormatUnderlined, 
  FormatAlignLeft, 
  FormatAlignCenter, 
  FormatAlignRight, 
  FormatAlignJustify,
  ViewList,
  ViewModule,
  ViewQuilt,
  Check,
  PhoneAndroid,
  Laptop,
  Tablet
} from '@mui/icons-material';
import RdsToggleButton, { RdsStandaloneToggleButton } from './rds-toggle-button';

const meta: Meta<typeof RdsToggleButton> = {
  title: 'Elements/Toggle Button',
  component: RdsToggleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'select' },
      options: ['left', 'center', 'right','justify'],
      description: 'The value of the selected toggle button.',
    },
    multiple: {
      control: { type: 'boolean' },
      description: 'Allows multiple toggle buttons to be selected.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the toggle button group.',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Sets the size of the toggle buttons.',
    },
    color: {
      control: { type: 'select' },
      options: ['standard', 'primary', 'secondary', 'error', 'info', 'success', 'warning'],
      description: 'Sets the color of the toggle buttons. Controls the selected button color.',
      table: {
        defaultValue: { summary: 'standard' },
      },
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Sets the orientation of the toggle button group.',
    },
    spacing: {
      control: { type: 'number' },
      description: 'Sets the spacing between toggle buttons.',
    },
    enforceSelected: {
      control: { type: 'boolean' },
      description: 'Enforces that at least one toggle button must be selected.',
    }
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const formatOptions = [
  { value: 'bold', label: 'Bold', icon: <FormatBold /> },
  { value: 'italic', label: 'Italic', icon: <FormatItalic /> },
  { value: 'underlined', label: 'Underlined', icon: <FormatUnderlined /> },
];

const alignmentOptions = [
  { value: 'left', label: 'Left', icon: <FormatAlignLeft /> },
  { value: 'center', label: 'Center', icon: <FormatAlignCenter /> },
  { value: 'right', label: 'Right', icon: <FormatAlignRight /> },
  { value: 'justify', label: 'Justify', icon: <FormatAlignJustify />, disabled: true },
];

const viewOptions = [
  { value: 'list', label: '', icon: <ViewList /> },
  { value: 'module', label: '', icon: <ViewModule /> },
  { value: 'quilt', label: '', icon: <ViewQuilt /> },
];

const deviceOptions = [
  { value: 'laptop', label: 'Laptop', icon: <Laptop /> },
  { value: 'tablet', label: 'Tablet', icon: <Tablet /> },
  { value: 'phone', label: 'Phone', icon: <PhoneAndroid /> },
];

export const Default: Story = {
  args: {
    options: formatOptions,
    value: 'bold',
  },
};

export const ExclusiveSelection: Story = {
  args: {
    options: alignmentOptions,
    value: 'left',
  },
};

export const MultipleSelection: Story = {
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

export const Secondary: Story = {
  args: {
    options: formatOptions,
    color: 'secondary',
    value: 'bold',
  },
};

export const VerticalButtons: Story = {
  args: {
    options: viewOptions,
    orientation: 'vertical',
    value: 'list',
  },
};

export const EnforceValueSet: Story = {
  args: {
    options: deviceOptions,
    value: 'laptop',
    enforceSelected: true,
  },
};

// Standalone Toggle Button Story with render function
export const StandaloneToggleButton = () => {
  const [selected, setSelected] = useState(false);

  const handleChange = (_event: React.MouseEvent<HTMLElement>, newSelected: boolean) => {
    setSelected(newSelected);
  };

  return (
    <RdsStandaloneToggleButton
      value="check"
      selected={selected}
      onChange={handleChange}
      color="primary"
    >
      <Check />
    </RdsStandaloneToggleButton>
  );
};
