import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompChip from './rds-comp-chip';
import { ChipOption } from './rds-comp-chip';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar } from '@mui/material';

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

const deletableOptions: ChipOption[] = [
  { id: 'chip-1', label: 'JavaScript', deletable: true },
  { id: 'chip-2', label: 'Python', deletable: true },
  { id: 'chip-3', label: 'Java', deletable: true },
];

const iconOptions: ChipOption[] = [
  { id: 'chip-1', label: 'Frontend', icon: <CodeIcon /> },
  { id: 'chip-2', label: 'Design', icon: <DesignServicesIcon /> },
  { id: 'chip-3', label: 'Backend', icon: <StorageIcon /> },
  { id: 'chip-4', label: 'DevOps', icon: <CloudIcon /> },
];

const statusOptions: ChipOption[] = [
  { id: 'success', label: 'Success', icon: <CheckCircleIcon /> },
  { id: 'error', label: 'Error', icon: <CancelIcon /> },
  { id: 'warning', label: 'Warning', icon: <WarningIcon /> },
  { id: 'info', label: 'Info', icon: <InfoIcon /> },
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
  render: (args) => {
    const [selected, setSelected] = useState<string | number | (string | number)[]>('chip-1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h3>Selected Value(s): <strong>{String(selected)}</strong></h3>
        </div>
        <RdsCompChip
          {...args}
          options={basicOptions}
          value={selected}
          onChange={setSelected}
        />
      </div>
    );
  },
};

// ─── All Sizes ──────────────────────────────────────────────────────────
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <section>
        <h3>Small</h3>
        <RdsCompChip options={basicOptions} defaultValue="chip-1" size="small" />
      </section>
      <section>
        <h3>Medium (Default)</h3>
        <RdsCompChip options={basicOptions} defaultValue="chip-1" size="medium" />
      </section>
      <section>
        <h3>Large</h3>
        <RdsCompChip options={basicOptions} defaultValue="chip-1" size="large" />
      </section>
    </div>
  ),
};

// ─── All Variants ───────────────────────────────────────────────────────
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <section>
        <h3>Filled Variant</h3>
        <RdsCompChip options={basicOptions} defaultValue="chip-1" variant="filled" />
      </section>
      <section>
        <h3>Outlined Variant</h3>
        <RdsCompChip options={basicOptions} defaultValue="chip-1" variant="outlined" />
      </section>
    </div>
  ),
};

// ─── All Colors ─────────────────────────────────────────────────────────
export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {['default', 'primary', 'secondary', 'success', 'error', 'warning', 'info'].map((col) => (
        <section key={col}>
          <h3>{col.charAt(0).toUpperCase() + col.slice(1)}</h3>
          <RdsCompChip
            options={basicOptions}
            defaultValue="chip-1"
            color={col as any}
          />
        </section>
      ))}
    </div>
  ),
};

// ─── Colors with Outlined Variant ───────────────────────────────────────
export const ColorsOutlined: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {['primary', 'success', 'error', 'warning', 'info'].map((col) => (
        <section key={col}>
          <h3>{col.charAt(0).toUpperCase() + col.slice(1)} (Outlined)</h3>
          <RdsCompChip
            options={basicOptions}
            defaultValue="chip-1"
            variant="outlined"
            color={col as any}
          />
        </section>
      ))}
    </div>
  ),
};

// ─── Single Selection ────────────────────────────────────────────────────
export const SingleSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState('chip-1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h3>Single Selection Example</h3>
          <p>Selected: <strong>{selected}</strong></p>
        </div>
        <RdsCompChip
          options={basicOptions}
          value={selected}
          onChange={(val) => setSelected(String(val))}
          color="primary"
        />
      </div>
    );
  },
};

// ─── Multiple Selection ──────────────────────────────────────────────────
export const MultipleSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<(string | number)[]>(['chip-1', 'chip-2']);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h3>Multiple Selection Example</h3>
          <p>Selected: <strong>{(selected as string[]).join(', ')}</strong></p>
        </div>
        <RdsCompChip
          options={basicOptions}
          value={selected}
          onChange={(val) => setSelected(Array.isArray(val) ? val : [val])}
          multiple
          color="primary"
        />
      </div>
    );
  },
};

// ─── With Deletable Chips ────────────────────────────────────────────────
export const Deletable: Story = {
  render: () => {
    const [items, setItems] = useState(deletableOptions);

    const handleDelete = (id: string | number) => {
      setItems(items.filter(item => item.id !== id));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3>Deletable Chips</h3>
        <RdsCompChip
          options={items.map(item => ({
            ...item,
            onDelete: handleDelete,
          }))}
        />
      </div>
    );
  },
};

// ─── With Icons ──────────────────────────────────────────────────────────
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <section>
        <h3>Filled with Icons</h3>
        <RdsCompChip
          options={iconOptions}
          defaultValue="chip-1"
          variant="filled"
          color="primary"
        />
      </section>
      <section>
        <h3>Outlined with Icons</h3>
        <RdsCompChip
          options={iconOptions}
          defaultValue="chip-1"
          variant="outlined"
          color="primary"
        />
      </section>
    </div>
  ),
};

// ─── Status Chips ────────────────────────────────────────────────────────
export const StatusChips: Story = {
  render: () => {
    const [selected, setSelected] = useState('success');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3>Status Indicators</h3>
        <RdsCompChip
          options={statusOptions}
          value={selected}
          onChange={setSelected}
          size="medium"
          variant="filled"
        />
      </div>
    );
  },
};

// ─── Disabled Chips ──────────────────────────────────────────────────────
export const DisabledChips: Story = {
  render: () => {
    const disabledOptions: ChipOption[] = [
      { id: 'chip-1', label: 'Enabled' },
      { id: 'chip-2', label: 'Disabled', disabled: true },
      { id: 'chip-3', label: 'Enabled' },
      { id: 'chip-4', label: 'Disabled', disabled: true },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3>Disabled Chips</h3>
        <RdsCompChip options={disabledOptions} defaultValue="chip-1" />
      </div>
    );
  },
};

// ─── Tag-like Chips ──────────────────────────────────────────────────────
export const TagChips: Story = {
  render: () => {
    const tagOptions: ChipOption[] = [
      { id: 'react', label: '#React' },
      { id: 'typescript', label: '#TypeScript' },
      { id: 'design', label: '#DesignSystem' },
      { id: 'ui', label: '#UIComponents' },
      { id: 'accessibility', label: '#Accessibility' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3>Tag Selection (Multiple)</h3>
        <RdsCompChip
          options={tagOptions}
          defaultValue={['react', 'typescript']}
          multiple
          color="info"
          variant="outlined"
        />
      </div>
    );
  },
};

// ─── Filter Chips ───────────────────────────────────────────────────────
export const FilterChips: Story = {
  render: () => {
    const filterOptions: ChipOption[] = [
      { id: 'all', label: 'All' },
      { id: 'frontend', label: 'Frontend' },
      { id: 'backend', label: 'Backend' },
      { id: 'devops', label: 'DevOps' },
      { id: 'qa', label: 'QA' },
    ];

    const [selected, setSelected] = useState('all');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3>Filter Selection (Single)</h3>
        <RdsCompChip
          options={filterOptions}
          value={selected}
          onChange={(val) => setSelected(String(val))}
          color="primary"
          size="medium"
        />
      </div>
    );
  },
};

// ─── Playground (MUI-inspired) ──────────────────────────────────────────
export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | number | (string | number)[]>('chip-1');
    const [size, setSize] = useState('medium');
    const [variant, setVariant] = useState('filled');
    const [color, setColor] = useState('primary');
    const [multiple, setMultiple] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            padding: '16px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <div>
            <label style={{ marginRight: '8px' }}>Size:</label>
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div>
            <label style={{ marginRight: '8px' }}>Variant:</label>
            <select value={variant} onChange={(e) => setVariant(e.target.value)}>
              <option value="filled">Filled</option>
              <option value="outlined">Outlined</option>
            </select>
          </div>

          <div>
            <label style={{ marginRight: '8px' }}>Color:</label>
            <select value={color} onChange={(e) => setColor(e.target.value)}>
              <option value="default">Default</option>
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="success">Success</option>
              <option value="error">Error</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </select>
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                checked={multiple}
                onChange={(e) => setMultiple(e.target.checked)}
              />
              {' '}Multiple
            </label>
          </div>
        </div>

        <div>
          <h4>Preview</h4>
          <RdsCompChip
            {...args}
            options={basicOptions}
            value={value}
            onChange={setValue}
            size={size as any}
            variant={variant as any}
            color={color as any}
            multiple={multiple}
          />
          <p style={{ marginTop: '16px', color: '#666' }}>
            Selected: <strong>{String(value)}</strong>
          </p>
        </div>
      </div>
    );
  },
};

// ─── Non-clickable Chips (Display Only) ──────────────────────────────────
export const NonClickable: Story = {
  render: () => {
    const displayOptions: ChipOption[] = [
      { id: 'read-only-1', label: 'Display Only' },
      { id: 'read-only-2', label: 'Read Only' },
      { id: 'read-only-3', label: 'No Selection' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3>Non-Clickable Chips (Display Only)</h3>
        <RdsCompChip options={displayOptions} clickable={false} />
      </div>
    );
  },
};

// ─── Size Variants with All Features ─────────────────────────────────────
export const ComprehensiveShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <section>
        <h3>Small Chips</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h4>Filled</h4>
            <RdsCompChip options={basicOptions} defaultValue="chip-1" size="small" variant="filled" />
          </div>
          <div>
            <h4>Outlined</h4>
            <RdsCompChip options={basicOptions} defaultValue="chip-1" size="small" variant="outlined" />
          </div>
          <div>
            <h4>With Icons</h4>
            <RdsCompChip options={iconOptions} defaultValue="chip-1" size="small" color="primary" />
          </div>
        </div>
      </section>

      <section>
        <h3>Medium Chips (Default)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h4>Filled</h4>
            <RdsCompChip options={basicOptions} defaultValue="chip-1" size="medium" variant="filled" />
          </div>
          <div>
            <h4>Outlined</h4>
            <RdsCompChip options={basicOptions} defaultValue="chip-1" size="medium" variant="outlined" />
          </div>
          <div>
            <h4>Deletable</h4>
            <RdsCompChip options={deletableOptions} size="medium" />
          </div>
        </div>
      </section>

      <section>
        <h3>Large Chips</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h4>Filled</h4>
            <RdsCompChip options={basicOptions} defaultValue="chip-1" size="large" variant="filled" />
          </div>
          <div>
            <h4>Outlined</h4>
            <RdsCompChip options={basicOptions} defaultValue="chip-1" size="large" variant="outlined" />
          </div>
          <div>
            <h4>With Icons</h4>
            <RdsCompChip options={iconOptions} defaultValue="chip-1" size="large" color="success" />
          </div>
        </div>
      </section>
    </div>
  ),
};
