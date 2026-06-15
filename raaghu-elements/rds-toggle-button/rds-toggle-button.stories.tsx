import React from 'react';
import { expect, userEvent, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {FormatBold,FormatItalic,FormatUnderlined,FormatAlignLeft,FormatAlignCenter,FormatAlignRight,FormatAlignJustify,ViewList,ViewModule,ViewQuilt,Check,PhoneAndroid,Laptop,Tablet} from '@mui/icons-material';
import RdsToggleButton, { RdsStandaloneToggleButton } from './rds-toggle-button';

const meta: Meta<typeof RdsToggleButton> = {
  title: 'Elements/Toggle Button',
  component: RdsToggleButton,
  parameters: {
        status: { type: 'stable' },
    layout: 'centered',
  },
  tags: ['autodocs', 'stable'],
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
      description: 'Sets the size of the toggle buttons (overrides inputSize).',
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
Default.parameters = {
  controls: { include: ['options', 'defaultValue', 'size', 'color', 'orientation', 'spacing', 'disabled'] },
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
Disabled.parameters = {
  controls: { include: ['options', 'defaultValue', 'size', 'color', 'orientation', 'spacing', 'disabled'] },
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
ExclusiveSelection.parameters = {
  controls: { include: ['options', 'defaultValue', 'size', 'color', 'orientation', 'spacing', 'disabled'] },
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
EnforceValueSet.parameters = {
  controls: { include: ['options', 'defaultValue', 'size', 'color', 'orientation', 'spacing', 'disabled'] },
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
Large.parameters = {
  controls: { include: ['options', 'defaultValue', 'size', 'color', 'orientation', 'spacing', 'disabled'] },
};

export const MultipleSelection: Story = {
  args: {
    options: formatOptions,
    multiple: true,
    defaultValue: ['bold', 'italic'],
    color: 'primary',
    'aria-label': 'Format options'
  },
  parameters: {
    docs: {
      description: {
        story: 'Allows selecting multiple toggle buttons simultaneously. Try clicking on different buttons to select/deselect them.',
      },
    },
  }
};
MultipleSelection.parameters = {
  controls: { include: ['options', 'defaultValue', 'size', 'color', 'orientation', 'spacing', 'disabled'] },
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
Primary.parameters = {
  controls: { include: ['options', 'defaultValue', 'size', 'color', 'orientation', 'spacing', 'disabled'] },
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
Small.parameters = {
  controls: { include: ['options', 'defaultValue', 'size', 'color', 'orientation', 'spacing', 'disabled'] },
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
Secondary.parameters = {
  controls: { include: ['options', 'defaultValue', 'size', 'color', 'orientation', 'spacing', 'disabled'] },
};

export const StandaloneToggleButton: Story = {
  args: {
    color: 'primary',
    size: 'medium',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'A standalone toggle button that can be toggled on and off. Uses the component\'s internal state management.',
      },
      source: {
        code: `<RdsStandaloneToggleButton value="check" color="primary" aria-label="Toggle check">
  <Check />
</RdsStandaloneToggleButton>`
      }
    },
    controls: { include: ['size', 'color', 'disabled'] },
  },
  render: (args) => (
      <RdsStandaloneToggleButton
        value="check"
        color={args.color}
        size={args.size}
        disabled={args.disabled}
        aria-label="Toggle check"
      >
        <Check />
      </RdsStandaloneToggleButton>
  )
};

export const UncontrolledWithDisplay: Story = {
  args: {
    options: formatOptions,
    defaultValue: "italic",
    color: "primary",
    'aria-label': "Format options"
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates uncontrolled behavior while still tracking the selected value via onChange.',
      },
    },
  }
};
UncontrolledWithDisplay.parameters = {
  controls: { include: ['options', 'defaultValue', 'size', 'color', 'orientation', 'spacing', 'disabled'] },
};

export const VerticalButtons: Story = {
  args: {
    options: viewOptions,
    orientation: 'vertical',
    defaultValue: 'list',
    spacing: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle buttons stacked vertically instead of horizontally. The spacing parameter controls the gap between buttons.',
      },
    },
  }
};
VerticalButtons.parameters = {
  controls: { include: ['options', 'defaultValue', 'size', 'color', 'orientation', 'spacing', 'disabled'] },
};

export const WithSpacing: Story = {
  args: {
    options: formatOptions,
    defaultValue: 'bold',
    spacing: 20,
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle buttons with significant spacing between them. The spacing prop can be adjusted to control the exact distance between buttons.',
      },
    },
  }
};
WithSpacing.parameters = {
  controls: { include: ['options', 'defaultValue', 'size', 'color', 'orientation', 'spacing', 'disabled'] },
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
WithoutIcons.parameters = {
  controls: { include: ['options', 'defaultValue', 'size', 'color', 'orientation', 'spacing', 'disabled'] },
};
export const ToggleSelect: Story = {
  name: 'Interaction: Select toggle button',
  args: {
    options: formatOptions,
    defaultValue: 'bold',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const buttons = canvas.getAllByRole('button')
    // Bold is the default — should be pressed initially
    await expect(buttons[0]).toHaveAttribute('aria-pressed', 'true')
    // Click Italic (second button)
    await userEvent.click(buttons[1])
    await expect(buttons[1]).toHaveAttribute('aria-pressed', 'true')
  }
};
