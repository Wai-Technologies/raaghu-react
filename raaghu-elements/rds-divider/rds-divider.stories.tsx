import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import RdsDivider from './rds-divider';

const meta: Meta<typeof RdsDivider> = {
  title: 'Elements/Divider',
  component: RdsDivider,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
    controls: {
      exclude: ['component','flexItem'],
    },
  },
  tags: ['autodocs', 'stable'],

  argTypes: {
    layout: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    children: {
      control: 'text',
      description: 'Text shown next to the line',
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    flexItem: {
      control: 'boolean',
    },
    iconShow: {
      control: 'boolean',
      defaultValue: true,
    },
    icon: {
      control: false,
      description: 'Icon shown next to the text (ReactNode). Defaults to an InfoOutlined icon',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the divider',
      defaultValue: 'medium',
    },
    styleVariant: {
      name: 'Layout',
      control: 'select',
      options: ['subtle', 'strong', 'primary'],
      description: 'Style appearance of the divider (displayed as Layout in controls)',
      defaultValue: 'subtle',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Divider',
    textAlign: 'center',
    iconShow: true,
    size: 'medium',
    styleVariant: 'subtle',
  },
  play: async ({ canvasElement }) => {
    const hr = canvasElement.querySelector('hr, [role="separator"]');
    expect(hr).toBeTruthy();
  },
};
export const Vertical: Story = {
  args: {
    flexItem: true,
    layout: "vertical",
  },
  parameters: {
    controls: { exclude: ['layout', 'component', 'icon', 'iconShow','children', 'textAlign'] },
  },
};


export const WithText: Story = {
  args: {
    children: 'OR',
    textAlign: 'center',
    iconShow: true,
    size: 'medium',
    styleVariant: 'subtle',
  },
};

export const Flexed: Story = {
  args: {
    children: 'Flexed',
    flexItem: true,
    iconShow: true,
    size: 'medium',
    styleVariant: 'subtle',
  },
};
