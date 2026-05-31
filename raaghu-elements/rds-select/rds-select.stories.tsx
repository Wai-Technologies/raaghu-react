import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from '@storybook/test';
import RdsSelect from './rds-select';

const meta: Meta<typeof RdsSelect> = {
  title: 'Elements/Select',
  component: RdsSelect,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of select options',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

export const Default: Story = {
  args: {
    label: 'Select Option',
    options: basicOptions,
    inputPlaceholder: 'Please select...',
    labelposition: true,
    size: 'small',
  },
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    isRequired: true,
    options: basicOptions,
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Some Disabled Options',
    options: [
      { label: 'Available Option', value: 'option1' },
      { label: 'Disabled Option', value: 'option2', disabled: true },
      { label: 'Another Available', value: 'option3' },
      { label: 'Also Disabled', value: 'option4', disabled: true },
    ],
  },
};

export const WithError: Story = {
  args: {
    label: 'Select with Error',
    errorMessage: 'Please select a valid option',
    options: basicOptions,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Select with Help',
    helperText: 'Choose one of the available options',
    options: basicOptions,
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Choose an option',
    placeholder: 'Please select...',
    options: basicOptions,
  },
};

export const WithValue: Story = {
  args: {
    label: 'Pre-selected',
    value: 'option2',
    options: basicOptions,
  },
};

export const SelectOpen: Story = {
  name: 'Interaction: Open dropdown',
  args: {
    label: 'Select Option',
    options: basicOptions,
    inputPlaceholder: 'Please select...',
    size: 'small',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // MUI non-native Select renders trigger as role="combobox"
    const trigger = canvas.getByRole('combobox')
    await expect(trigger).toBeVisible()
    await userEvent.click(trigger)
    // MUI listbox opens in a portal at document.body
    await waitFor(
      () => expect(document.querySelector('[role="listbox"]')).not.toBeNull(),
      { timeout: 2000 }
    )
  }
};
