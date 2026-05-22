import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import RdsCompMaterialIcon, {
  RdsCompMaterialIconProps,
  MaterialIconStyle,
  MaterialIconSize,
  MaterialIconColor,
} from './rds-comp-material-icon';

// Material Icon names for demos
const COMMON_ICONS = [
  'Home',
  'Settings',
  'Search',
  'Add',
  'Delete',
  'Edit',
  'Star',
  'Favorite',
  'Share',
  'Download',
  'Upload',
  'Email',
  'Phone',
  'Menu',
  'Close',
  'Check',
  'Warning',
  'Error',
  'Info',
  'Help',
  'Notifications',
  'Dashboard',
  'Shopping Cart',
  'User',
  'Logout',
];

const meta: Meta<typeof RdsCompMaterialIcon> = {
  title: 'Components/Material Icon',
  component: RdsCompMaterialIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Material Icon component that supports multiple icon styles (Filled, Outlined, Rounded, Two Tone, Sharp), sizes, and theme-aware colors. Wrapper around MUI Material Icons with enhanced customization.',
      },
    },
  },
  argTypes: {
    iconName: {
      control: 'select',
      options: COMMON_ICONS,
      description: 'The name of the Material Icon to display (select from available icons)',
      type: { name: 'string', required: true },
    },
    style: {
      control: 'select',
      options: ['filled', 'outlined', 'rounded', 'twoTone', 'sharp'] as MaterialIconStyle[],
      description: 'The style/variant of the icon',
      table: { defaultValue: { summary: 'filled' } },
    },
    size: {
      control: 'select',
      options: ['extraSmall', 'small', 'medium', 'large', 'extraLarge'] as MaterialIconSize[],
      description: 'The size of the icon',
      table: { defaultValue: { summary: 'medium' } },
    },
    color: {
      control: 'select',
      options: ['inherit', 'primary', 'secondary', 'success', 'error', 'warning', 'info', 'disabled'] as MaterialIconColor[],
      description: 'The color of the icon',
      table: { defaultValue: { summary: 'inherit' } },
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the icon will be disabled (reduced opacity)',
    },
    clickable: {
      control: 'boolean',
      description: 'If true, the icon will be clickable with hover effects',
    },
    rotate: {
      control: 'number',
      description: 'Custom rotation angle in degrees (0, 90, 180, 270)',
    },
    flipHorizontal: {
      control: 'boolean',
      description: 'If true, the icon will be flipped horizontally',
    },
    flipVertical: {
      control: 'boolean',
      description: 'If true, the icon will be flipped vertically',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default Story ────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    iconName: 'Home',
  },
};


// ─── All Styles ───────────────────────────────────────────────────────────

export const AllStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Filled Style</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {['Home', 'Settings', 'Search', 'Add', 'Delete', 'Edit'].map((icon) => (
            <div key={icon} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <RdsCompMaterialIcon iconName={icon} style="filled" size="large" color="primary" />
              <span style={{ fontSize: '12px', color: 'var(--rds-text-secondary, #757575)' }}>{icon}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Outlined Style</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {['Home', 'Settings', 'Search', 'Add', 'Delete', 'Edit'].map((icon) => (
            <div key={icon} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <RdsCompMaterialIcon iconName={icon} style="outlined" size="large" color="primary" />
              <span style={{ fontSize: '12px', color: 'var(--rds-text-secondary, #757575)' }}>{icon}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Rounded Style</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {['Home', 'Settings', 'Search', 'Add', 'Delete', 'Edit'].map((icon) => (
            <div key={icon} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <RdsCompMaterialIcon iconName={icon} style="rounded" size="large" color="primary" />
              <span style={{ fontSize: '12px', color: 'var(--rds-text-secondary, #757575)' }}>{icon}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Two Tone Style</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {['Home', 'Settings', 'Search', 'Add', 'Delete', 'Edit'].map((icon) => (
            <div key={icon} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <RdsCompMaterialIcon iconName={icon} style="twoTone" size="large" color="primary" />
              <span style={{ fontSize: '12px', color: 'var(--rds-text-secondary, #757575)' }}>{icon}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Sharp Style</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {['Home', 'Settings', 'Search', 'Add', 'Delete', 'Edit'].map((icon) => (
            <div key={icon} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <RdsCompMaterialIcon iconName={icon} style="sharp" size="large" color="primary" />
              <span style={{ fontSize: '12px', color: 'var(--rds-text-secondary, #757575)' }}>{icon}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// ─── All Sizes ────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Icon Size Progression</h2>
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <RdsCompMaterialIcon iconName="Home" size="extraSmall" color="primary" />
          <span style={{ fontSize: '12px', fontWeight: '600' }}>Extra Small (16px)</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <RdsCompMaterialIcon iconName="Home" size="small" color="primary" />
          <span style={{ fontSize: '12px', fontWeight: '600' }}>Small (20px)</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <RdsCompMaterialIcon iconName="Home" size="medium" color="primary" />
          <span style={{ fontSize: '12px', fontWeight: '600' }}>Medium (24px)</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <RdsCompMaterialIcon iconName="Home" size="large" color="primary" />
          <span style={{ fontSize: '12px', fontWeight: '600' }}>Large (32px)</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <RdsCompMaterialIcon iconName="Home" size="extraLarge" color="primary" />
          <span style={{ fontSize: '12px', fontWeight: '600' }}>Extra Large (40px)</span>
        </div>
      </div>
    </div>
  ),
};

// ─── All Colors ───────────────────────────────────────────────────────────

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Color Palette</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '24px' }}>
        {(['inherit', 'primary', 'secondary', 'success', 'error', 'warning', 'info'] as MaterialIconColor[]).map((color) => (
          <div key={color} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <RdsCompMaterialIcon iconName="Star" size="large" color={color} />
            <span style={{ fontSize: '12px', fontWeight: '600', textTransform: 'capitalize' }}>{color}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

// ─── Common Icons ─────────────────────────────────────────────────────────

export const CommonIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Common Material Icons</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '16px' }}>
        {COMMON_ICONS.map((icon) => (
          <div
            key={icon}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid var(--rds-border-default, #e0e0e0)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <RdsCompMaterialIcon iconName={icon} size="medium" color="primary" />
            <span style={{ fontSize: '11px', textAlign: 'center', color: 'var(--rds-text-secondary, #757575)' }}>
              {icon}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

// ─── Icon States ──────────────────────────────────────────────────────────

export const IconStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Normal State</h3>
        <div style={{ display: 'flex', gap: '16px' }}>
          <RdsCompMaterialIcon iconName="Home" size="large" color="primary" />
          <RdsCompMaterialIcon iconName="Settings" size="large" color="success" />
          <RdsCompMaterialIcon iconName="Search" size="large" color="error" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Disabled State</h3>
        <div style={{ display: 'flex', gap: '16px' }}>
          <RdsCompMaterialIcon iconName="Home" size="large" disabled />
          <RdsCompMaterialIcon iconName="Settings" size="large" disabled />
          <RdsCompMaterialIcon iconName="Search" size="large" disabled />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Clickable State</h3>
        <div style={{ display: 'flex', gap: '16px' }}>
          <RdsCompMaterialIcon iconName="Home" size="large" color="primary" clickable />
          <RdsCompMaterialIcon iconName="Settings" size="large" color="success" clickable />
          <RdsCompMaterialIcon iconName="Search" size="large" color="error" clickable />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>With Transformations</h3>
        <div style={{ display: 'flex', gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <RdsCompMaterialIcon iconName="Home" size="large" color="primary" rotate={90} />
            <span style={{ fontSize: '12px' }}>Rotated 90°</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <RdsCompMaterialIcon iconName="Home" size="large" color="primary" flipHorizontal />
            <span style={{ fontSize: '12px' }}>Flip Horizontal</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <RdsCompMaterialIcon iconName="Home" size="large" color="primary" flipVertical />
            <span style={{ fontSize: '12px' }}>Flip Vertical</span>
          </div>
        </div>
      </div>
    </div>
  ),
};
