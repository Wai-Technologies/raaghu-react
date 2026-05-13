import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompChip from './rds-comp-chip';
import { ChipOption } from './rds-comp-chip';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';

const meta: Meta<typeof RdsCompChip> = {
  title: 'Components/Chip',
  component: RdsCompChip,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The **Chip** component is a compact element that represents discrete items such as tags, skills, or filters. It supports single and multiple selection modes, deletable options, icons, avatars, and multiple color variants. Perfect for displaying tags, skills, categories, or selected filters with visual feedback and interactive states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the chips',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
      description: 'Style variant of the chips',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'Color of selected chips',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple chips to be selected',
    },
    clickable: {
      control: 'boolean',
      description: 'Make chips clickable/selectable',
    },
    withIcons: {
      control: 'boolean',
      description: 'Display chips with icons',
    },
    deletable: {
      control: 'boolean',
      description: 'Allow chips to be deleted',
    },
  },
} satisfies Meta<typeof RdsCompChip>;

export default meta;
type Story = StoryObj<typeof RdsCompChip>;

// Sample chip options
const basicOptions: ChipOption[] = [
  { id: 'chip-1', label: 'React' },
  { id: 'chip-2', label: 'TypeScript' },
  { id: 'chip-3', label: 'MUI' },
  { id: 'chip-4', label: 'Storybook' },
];

const iconOptions: ChipOption[] = [
  { id: 'chip-1', label: 'Frontend', icon: <CodeIcon /> },
  { id: 'chip-2', label: 'Design', icon: <DesignServicesIcon /> },
  { id: 'chip-3', label: 'Backend', icon: <StorageIcon /> },
  { id: 'chip-4', label: 'DevOps', icon: <CloudIcon /> },
];

// ─── Default Story ──────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    options: basicOptions,
    defaultValue: 'chip-1',
    size: 'medium',
    variant: 'filled',
    color: 'default',
    multiple: false,
    clickable: true,
  },
};

// ─── Interactive Playground ─────────────────────────────────────────────
export const Interactive: Story = {
  args: {
    defaultValue: 'chip-1',
    size: 'medium',
    variant: 'filled',
    color: 'primary',
    multiple: false,
    clickable: true,
    withIcons: false,
    deletable: false,
  },
  render: (args) => {
    const { withIcons, deletable, ...restArgs } = args;
    const [selected, setSelected] = useState<string | number | (string | number)[]>('chip-1');
    // Separate state for each option set
    const [basicItems, setBasicItems] = useState(basicOptions);
    const [iconsItems, setIconsItems] = useState(iconOptions);

    // Get the current items based on withIcons control
    const currentItems = withIcons ? iconsItems : basicItems;

    // Build options with deletable support
    const finalOptions: ChipOption[] = currentItems.map((opt) => ({
      ...opt,
      deletable: deletable,
      onDelete: deletable
        ? () => {
            if (withIcons) {
              setIconsItems((prev) => prev.filter((item) => item.id !== opt.id));
            } else {
              setBasicItems((prev) => prev.filter((item) => item.id !== opt.id));
            }
            if (selected === opt.id) {
              setSelected('');
            }
          }
        : undefined,
    }));

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h3>Selected Value(s): <strong>{String(selected)}</strong></h3>
        </div>
        <RdsCompChip
          {...restArgs}
          options={finalOptions}
          value={selected}
          onChange={setSelected}
          key={`${withIcons}-${deletable}`}
        />
      </div>
    );
  },
};


