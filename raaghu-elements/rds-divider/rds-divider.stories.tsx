import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn, waitFor } from '@storybook/test';
import RdsDivider from './rds-divider';

const meta: Meta<typeof RdsDivider> = {
  title: 'Elements/Divider',
  component: RdsDivider,
  parameters: {
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
    dividerMessage: {
      control: 'text',
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
    iconName: {
      control: 'text',
      description: 'Enter the icon name to display (e.g., InfoOutlined, Add)',
      defaultValue: 'InfoOutlined',
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
    dividerMessage: 'Default Divider',
    textAlign: 'center',
    iconShow: true,
    iconName: 'InfoOutlined',
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
    iconName: 'InfoOutlined',
  },
  parameters: {
    controls: { exclude: ['layout', 'component', 'iconName', 'iconShow','dividerMessage', 'textAlign'] },
  },
};


export const WithText: Story = {
  args: {
    dividerMessage: 'OR',
    textAlign: 'center',
    iconShow: true,
    iconName: 'InfoOutlined',
    size: 'medium',
    styleVariant: 'subtle',
  },
};

export const Flexed: Story = {
  args: {
    dividerMessage: 'Flexed',
    flexItem: true,
    iconShow: true,
    iconName: 'InfoOutlined',
    size: 'medium',
    styleVariant: 'subtle',
  },
};
