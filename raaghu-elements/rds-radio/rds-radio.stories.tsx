import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsRadio from './rds-radio';

const meta: Meta<typeof RdsRadio> = {
  title: 'Elements/Radio',
  component: RdsRadio,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of radio options',
    },
    direction: {
      control: 'select',
      options: ['row', 'column'],
      description: 'Direction of radio group layout',
    },
    layout: {
      control: 'select',
      options: ['icon', 'icon with label', 'icon with bottom label'],
      description: 'Layout configuration for radio buttons',
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'disabled'],
      description: 'State of the radio buttons',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = [
  { text: 'Option 1', value: 'option1' },
  { text: 'Option 2', value: 'option2' },
  { text: 'Option 3', value: 'option3' },
];

export const Default: Story = {
  args: {
    label: 'Choose an option',
    options: [{ text: 'Option 1', value: 'option1' }],
  },
};

export const Horizontal: Story = {
  args: {
    label: 'Horizontal Layout',
    options: basicOptions,
    direction: 'row',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Some Disabled Options',
    options: [
      { text: 'Available Option', value: 'option1' },
      { text: 'Disabled Option', value: 'option2', disabled: true },
      { text: 'Another Available', value: 'option3' },
      { text: 'Also Disabled', value: 'option4', disabled: true },
    ],
  },
};

export const WithSelectedValue: Story = {
  args: {
    label: 'Pre-selected Option',
    options:  [{ text: 'Option 1', value: 'option1' }],
    value: 'option1',
  },
};

export const WithoutLabel: Story = {
  args: {
    options: basicOptions,
    value: 'option1',
  },
};
