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
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic toggle button with formatting options. Exclusive selection by default (only one button can be selected).',
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = React.useState<string>('bold');
    
    const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
      setSelected(newValue);
    };
    
    return (
      <RdsToggleButton
        {...args}
        value={selected}
        onChange={handleChange}
      />
    );
  }
};

export const Disabled: Story = {
  args: {
    options: formatOptions,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows a disabled toggle button group where no interactions are possible.',
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = React.useState<string>('bold');
    
    const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
      setSelected(newValue);
    };
    
    return (
      <RdsToggleButton
        {...args}
        value={selected}
        onChange={handleChange}
      />
    );
  }
};

export const ExclusiveSelection: Story = {
  args: {
    options: alignmentOptions,
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle button group with exclusive selection (only one button can be selected at a time).',
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = React.useState<string>('left');
    
    const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
      setSelected(newValue);
    };
    
    return (
      <RdsToggleButton
        {...args}
        value={selected}
        onChange={handleChange}
      />
    );
  }
};

export const EnforceValueSet: Story = {
  args: {
    options: deviceOptions,
    enforceSelected: true,
    color: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Ensures at least one toggle button must always be selected. Try clicking on the selected button - it will not deselect (similar to MUI\'s behavior in the official documentation).',
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = React.useState<string>('laptop');
    
    // This handler follows MUI's pattern where we manually check if we should update state
    const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
      // Only update if there's a valid selection (not null)
      if (newValue !== null) {
        setSelected(newValue);
      }
      // If newValue is null, we don't update state, effectively enforcing that something must be selected
    };
    
    return (
      <div>
        <RdsToggleButton
          {...args}
          value={selected}
          onChange={handleChange}
        />
        <div style={{ marginTop: 10, fontSize: 14 }}>
          Selected: {selected}
        </div>
      </div>
    );
  }
};

export const Large: Story = {
  args: {
    options: formatOptions,
    size: 'large',
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle buttons with large size.',
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = React.useState<string>('bold');
    
    const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
      setSelected(newValue);
    };
    
    return (
      <RdsToggleButton
        {...args}
        value={selected}
        onChange={handleChange}
      />
    );
  }
};

// Multiple Selection story using the component's built-in state management
export const MultipleSelection: Story = {
  args: {
    options: formatOptions,
    multiple: true,
    defaultValue: ['bold', 'italic'],
    color: 'primary'
  },
  render: (args) => {
    // Initialize with the default values from args
    const initialValues = Array.isArray(args.defaultValue) 
      ? args.defaultValue 
      : (typeof args.defaultValue === 'string' ? [args.defaultValue] : []);
    
    const [selected, setSelected] = React.useState<string[]>(initialValues);
    
    const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: string[]) => {
      setSelected(newValue);
    };
    
    return (
      <div>
        <RdsToggleButton 
          {...args} 
          defaultValue={undefined} // Remove defaultValue to prevent React warnings
          value={selected}
          onChange={handleChange}
        />
        <div style={{ marginTop: 10, fontSize: 14 }}>
          Selected: {selected.join(', ')}
        </div>
      </div>
    );
  }
};
MultipleSelection.parameters = {
  docs: {
    description: {
      story: 'Allows selecting multiple toggle buttons simultaneously using the component\'s built-in state management. Try clicking on different buttons to select/deselect them.',
    },
  },
};

export const Primary: Story = {
  args: {
    options: formatOptions,
    color: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle buttons with primary color theme.',
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = React.useState<string>('bold');
    
    const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
      setSelected(newValue);
    };
    
    return (
      <RdsToggleButton
        {...args}
        value={selected}
        onChange={handleChange}
      />
    );
  }
};

export const Small: Story = {
  args: {
    options: formatOptions,
    size: 'small',
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle buttons with small size.',
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = React.useState<string>('bold');
    
    const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
      setSelected(newValue);
    };
    
    return (
      <RdsToggleButton
        {...args}
        value={selected}
        onChange={handleChange}
      />
    );
  }
};

export const Secondary: Story = {
  args: {
    options: formatOptions,
    color: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle buttons with secondary color theme.',
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = React.useState<string>('bold');
    
    const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
      setSelected(newValue);
    };
    
    return (
      <RdsToggleButton
        {...args}
        value={selected}
        onChange={handleChange}
      />
    );
  }
};

// Standalone Toggle Button Story using the component's built-in state management
export const StandaloneToggleButton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A standalone toggle button that can be toggled on and off using internal state management.',
      },
    },
  },
  render: () => {
    const [displayState, setDisplayState] = React.useState(false);
    
    const handleChange = (_event: React.MouseEvent<HTMLElement>, newSelected: boolean) => {
      setDisplayState(newSelected);
    };
    
    return (
        <RdsStandaloneToggleButton
          value="check"
          color="primary"
          onChange={handleChange}
        >
          <Check />
        </RdsStandaloneToggleButton>
    );
  }
};

// Uncontrolled Toggle Button story with display for selected value
export const UncontrolledWithDisplay: Story = {
  args: {
    options: formatOptions,
    defaultValue: 'italic',
    color: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates uncontrolled behavior while still displaying the selected value.',
      },
    },
  },
  render: (args) => {
    // Create a ref to track the current selected value
    const [displayValue, setDisplayValue] = React.useState<string | string[]>(
      args.defaultValue !== undefined ? args.defaultValue : ''
    );
    
    // Update display when changed
    const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: string | string[]) => {
      setDisplayValue(newValue);
    };
    
    return (
        <RdsToggleButton 
          {...args} 
          onChange={handleChange}
        />
    );
  }
};

export const VerticalButtons: Story = {
  args: {
    options: viewOptions,
    orientation: 'vertical',
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle buttons stacked vertically instead of horizontally.',
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = React.useState<string>('list');
    
    const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
      setSelected(newValue);
    };
    
    return (
      <RdsToggleButton
        {...args}
        value={selected}
        onChange={handleChange}
      />
    );
  }
};

export const WithoutIcons: Story = {
  args: {
    options: [
      { value: 'left', label: 'Left' },
      { value: 'center', label: 'Center' },
      { value: 'right', label: 'Right' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle buttons with text labels only, no icons.',
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = React.useState<string>('center');
    
    const handleChange = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
      setSelected(newValue);
    };
    
    return (
      <RdsToggleButton
        {...args}
        value={selected}
        onChange={handleChange}
      />
    );
  }
};
