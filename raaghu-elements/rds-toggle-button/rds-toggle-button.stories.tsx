/**
 * Toggle Button Component Stories
 * 
 * These stories showcase the RdsToggleButton component with different configurations.
 * Each story demonstrates a specific feature or styling option.
 * 
 * The component itself handles all state management internally, with support for both
 * controlled and uncontrolled modes. All behaviors shown in these stories are implemented
 * within the component, making it easy to use in your application.
 */

import React from 'react';
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
      control: { type: 'object' },
      description: 'The value of the selected toggle button(s). Can be a string or array of strings.',
    },
    defaultValue: {
      control: { type: 'object' },
      description: 'The default value of the toggle button(s) when uncontrolled. Can be a string or array of strings.',
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
    defaultValue: 'bold',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic toggle button with formatting options. Exclusive selection by default (only one button can be selected).',
      },
    },
  }
};

export const Disabled: Story = {
  args: {
    options: formatOptions,
    disabled: true,
    defaultValue: 'bold',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows a disabled toggle button group where no interactions are possible.',
      },
    },
  }
};

export const ExclusiveSelection: Story = {
  args: {
    options: alignmentOptions,
    defaultValue: 'left',
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle button group with exclusive selection (only one button can be selected at a time).',
      },
    },
  }
};

export const EnforceValueSet: Story = {
  args: {
    options: deviceOptions,
    enforceSelected: true,
    color: 'primary',
    defaultValue: 'laptop',
  },
  parameters: {
    docs: {
      description: {
        story: 'Ensures at least one toggle button must always be selected. Try clicking on the selected button - it will not deselect. The component handles this behavior internally with the enforceSelected prop.',
      },
    },
  }
};

export const Large: Story = {
  args: {
    options: formatOptions,
    size: 'large',
    defaultValue: 'bold',
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle buttons with large size.',
      },
    },
  }
};

export const MultipleSelection: Story = {
  args: {
    options: formatOptions,
    multiple: true,
    defaultValue: ['bold', 'italic'],
    color: 'primary'
  },
  parameters: {
    docs: {
      description: {
        story: 'Allows selecting multiple toggle buttons simultaneously. Try clicking on different buttons to select/deselect them.',
      },
    },
  },
  render: () => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(['bold', 'italic']);

    const handleChange = (_event: React.MouseEvent<HTMLElement>, newValues: string[]) => {
      setSelectedValues(newValues);
    };

    return (
        <RdsToggleButton
          options={formatOptions}
          multiple={true}
          value={selectedValues}
          onChange={handleChange}
          color="primary"
          aria-label="Format options"
        />
    );
  }
};

export const Primary: Story = {
  args: {
    options: formatOptions,
    color: 'primary',
    defaultValue: 'bold',
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle buttons with primary color theme.',
      },
    },
  }
};

export const Small: Story = {
  args: {
    options: formatOptions,
    size: 'small',
    defaultValue: 'bold',
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle buttons with small size.',
      },
    },
  }
};

export const Secondary: Story = {
  args: {
    options: formatOptions,
    color: 'secondary',
    defaultValue: 'bold',
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle buttons with secondary color theme.',
      },
    },
  }
};

export const StandaloneToggleButton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A standalone toggle button that can be toggled on and off. Uses the component\'s internal state management.',
      },
    },
  },
  render: () => (
    <div>
      <RdsStandaloneToggleButton
        value="check"
        color="primary"
        aria-label="Toggle check"
      >
        <Check />
      </RdsStandaloneToggleButton>
      <div style={{ fontSize: 14, marginTop: 10 }}>
        This button maintains its own state internally
      </div>
    </div>
  )
};

export const UncontrolledWithDisplay: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates uncontrolled behavior while still tracking the selected value via onChange.',
      },
    },
  },
  render: () => {
    const [displayValue, setDisplayValue] = React.useState<string>('italic');
    
    // Update display when changed
    const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
      setDisplayValue(newValue);
    };
    
    return (
        <RdsToggleButton 
          options={formatOptions}
          defaultValue="italic"
          color="primary"
          onChange={handleChange}
          aria-label="Format options"
        />
    );
  }
};

export const VerticalButtons: Story = {
  args: {
    options: viewOptions,
    orientation: 'vertical',
    defaultValue: 'list',
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle buttons stacked vertically instead of horizontally.',
      },
    },
  }
};

export const WithoutIcons: Story = {
  args: {
    options: [
      { value: 'left', label: 'Left' },
      { value: 'center', label: 'Center' },
      { value: 'right', label: 'Right' },
    ],
    defaultValue: 'center',
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle buttons with text labels only, no icons.',
      },
    },
  }
};
