import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { useState } from 'react';
import RdsRadio from './rds-radio';

const meta: Meta<typeof RdsRadio> = {
  title: 'Elements/Radio',
  component: RdsRadio,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
    controls: {
    exclude: ['radioProps', 'ref'],
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Group label displayed above the radio options',
    },
    options: {
      control: 'object',
      description: 'Array of radio options',
    },
    row: {
      control: 'boolean',
      description: 'Lay the options out in a row instead of a column',
    },
    layout: {
      control: 'select',
      options: ['icon', 'icon with label', 'icon with bottom label'],
      description: 'Layout configuration for radio buttons',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all radio options',
    },
      value: {
        control: false,
        table: { disable: true },
      },
      selected: {
        control: 'boolean',
        description: 'Force selection (true selects first option, false clears). When undefined component behaves normally.',
        table: { defaultValue: { summary: 'undefined' } }
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

function computeForcedValue(args: any) {
  if (typeof args.selected === 'undefined') return undefined;
  if (args.selected === true) {
    const first = (args.options || []).find((o: any) => !o.disabled);
    return first ? first.value : undefined;
  }
  return undefined;
}

export const Default: Story = {
  render: (args) => {
    const [internal, setInternal] = useState<string | undefined>(args.value ?? undefined);
    const forced = computeForcedValue(args);
    const valueToUse = forced !== undefined || args.selected === false ? forced : internal;
    return (
      <RdsRadio
        {...args}
        value={valueToUse ?? ''}
        onChange={(_e, val) => {
          if (typeof args.selected === 'undefined') setInternal(val);
        }}
      />
    );
  },
  args: {
    label: 'Choose an option',
    options: [{ label: 'Option 1', value: 'option1' }],
    value: undefined,
    selected: true,
  },
};
Default.parameters = { controls: { include: ['label','options','value','selected', 'row','layout','disabled'] } };


export const Horizontal: Story = {
  render: (args) => {
    const [selected, setSelected] = useState(args.value ?? undefined);
    return (
      <RdsRadio
        {...args}
        value={selected}
        onChange={(_event, value) => setSelected(value)}
      />
    );
  },
  args: {
    label: 'Horizontal Layout',
    options: basicOptions,
    row: true,
    value: undefined,
  },
};
Horizontal.parameters = { controls: { include: ['label','options','value', 'row','layout','disabled'] } };

export const WithDisabledOptions: Story = {
  render: (args) => {
    const [selected, setSelected] = useState(args.value ?? undefined);
    return (
      <RdsRadio
        {...args}
        value={selected}
        onChange={(_event, value) => setSelected(value)}
      />
    );
  },
  args: {
    label: 'Some Disabled Options',
    options: [
      { label: 'Available Option', value: 'option1' },
      { label: 'Disabled Option', value: 'option2', disabled: true },
      { label: 'Another Available', value: 'option3' },
      { label: 'Also Disabled', value: 'option4', disabled: true },
    ],
    value: undefined,
  },
};
WithDisabledOptions.parameters = { controls: { include: ['label','options','value', 'row','layout','disabled'] } };


export const WithSelectedValue: Story = {
  render: (args) => {
    const [selected, setSelected] = useState(args.value ?? undefined);
    return (
      <RdsRadio
        {...args}
        value={selected}
        onChange={(_event, value) => setSelected(value)}
      />
    );
  },
  args: {
    label: 'Pre-selected Option',
    options:  [{ label: 'Option 1', value: 'option1' }],
    value: undefined,
  },
};
WithSelectedValue.parameters = { controls: { include: ['label','options','value', 'row','layout','disabled'] } };


export const WithoutLabel: Story = {
  render: (args) => {
    const [selected, setSelected] = useState(args.value ?? undefined);
    return (
      <RdsRadio
        {...args}
        value={selected}
        onChange={(_event, value) => setSelected(value)}
      />
    );
  },
  args: {
    options: basicOptions,
    value: undefined,
  },
};
WithoutLabel.parameters = { controls: { include: ['options', 'value', 'row', 'layout', 'disabled'] } };
