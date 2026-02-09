import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import RdsRange from './rds-range';

const meta: Meta<typeof RdsRange> = {
  title: 'Elements/Range',
  component: RdsRange,
  parameters: {
    layout: 'centered',
    controls: {
    exclude: ['component', 'onChange', 'formatValue'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    leftLabel: {
      control: 'number',
    },
    rightLabel: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    showValue: {
      control: 'boolean',
    },
    showLabel: {
      control: 'boolean',
    },
    textLabel: {
      control: 'boolean',
    },
    showTooltip: {
      control: 'boolean',
    },
    type: {
      control: 'select',
      options: ['one-way', 'two-way'],
    },
    level: {
      control: 'select',
      options: ['1', '2', '3', '4', '5'],
    },
    value: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'one-way',
    level: '3',
    leftLabel: 0,
    rightLabel: 100,
    showValue: false,
    showLabel: true,
    textLabel: true,
    showTooltip: true,
  },
  render: (args) => {
    const [singleValue, setSingleValue] = useState(30);
    const [rangeValue, setRangeValue] = useState([20, 80]);

    const isOneWay = args.type === 'one-way';

    return (
      <Box sx={{ width: 400, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <RdsRange
          value={isOneWay && args.level ? undefined : (isOneWay ? singleValue : rangeValue)}
          onChange={(value) => {
            if (isOneWay) {
              setSingleValue(value as number);
            } else {
              setRangeValue(value as number[]);
            }
          }}
          label={args.label}
          type={args.type}
          level={args.level}
          leftLabel={args.leftLabel}
          rightLabel={args.rightLabel}
          showValue={args.showValue}
          showLabel={args.showLabel}
          textLabel={args.textLabel}
          showTooltip={args.showTooltip}
          step={args.step}
          disabled={args.disabled}
          color={args.color}
          size={args.size}
          formatValue={args.formatValue}
        />
      </Box>
    );
  },
};

export const Colors: Story = {
  args: {
    type: 'one-way',
    level: '3',
    leftLabel: 0,
    rightLabel: 100,
    showValue: true,
    showLabel: false,
    textLabel: false,
    showTooltip: false,
  },
  argTypes: {
    color: { control: false },
    value: { control: false },
  },
  render: (args) => {
    const [primarySingleValue, setPrimarySingleValue] = useState(40);
    const [secondarySingleValue, setSecondarySingleValue] = useState(60);
    const [primaryRangeValue, setPrimaryRangeValue] = useState<[number, number]>([20, 80]);
    const [secondaryRangeValue, setSecondaryRangeValue] = useState<[number, number]>([30, 70]);

    const isOneWay = args.type === 'one-way';

    return (
      <Box sx={{ width: 300, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <RdsRange
          value={isOneWay && args.level ? undefined : (isOneWay ? primarySingleValue : primaryRangeValue)}
          onChange={(value) => {
            if (isOneWay) {
              setPrimarySingleValue(value as number);
            } else {
              setPrimaryRangeValue(value as [number, number]);
            }
          }}
          type={args.type}
          level={args.level}
          leftLabel={args.leftLabel}
          rightLabel={args.rightLabel}
          showValue={args.showValue}
          showLabel={args.showLabel}
          textLabel={args.textLabel}
          showTooltip={args.showTooltip}
          step={args.step}
          disabled={args.disabled}
          color="primary"
          size={args.size}
          formatValue={args.formatValue}
          label="Primary Color"
        />
        <RdsRange
          value={isOneWay && args.level ? undefined : (isOneWay ? secondarySingleValue : secondaryRangeValue)}
          onChange={(value) => {
            if (isOneWay) {
              setSecondarySingleValue(value as number);
            } else {
              setSecondaryRangeValue(value as [number, number]);
            }
          }}
          type={args.type}
          level={args.level}
          leftLabel={args.leftLabel}
          rightLabel={args.rightLabel}
          showValue={args.showValue}
          showLabel={args.showLabel}
          textLabel={args.textLabel}
          showTooltip={args.showTooltip}
          step={args.step}
          disabled={args.disabled}
          color="secondary"
          size={args.size}
          formatValue={args.formatValue}
          label="Secondary Color"
        />
      </Box>
    );
  },
};

export const Disabled: Story = {
  args: {
    value: 60,
    leftLabel: 0,
    rightLabel: 100,
    disabled: true,
    label: 'Disabled Slider',
    showValue: true,
    textLabel: true,
  },
};

export const Interactive: Story = {
  args: {
    type: 'one-way',
    level: '3',
    leftLabel: 0,
    rightLabel: 100,
    showValue: true,
    showLabel: false,
    textLabel: false,
    showTooltip: false,
    
  },
  render: (args) => {
    const [singleValue, setSingleValue] = useState(30);
    const [rangeValue, setRangeValue] = useState<[number, number]>([20, 80]);
    const [priceRange, setPriceRange] = useState<[number, number]>([100, 500]);

    const isOneWay = args.type === 'one-way';

    return (
      <Box sx={{ width: 400, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <RdsRange
          value={isOneWay && args.level ? undefined : (isOneWay ? singleValue : rangeValue)}
          onChange={(value) => {
            if (isOneWay) {
              setSingleValue(value as number);
            } else {
              setRangeValue(value as [number, number]);
            }
          }}
          type={args.type}
          level={args.level}
          leftLabel={args.leftLabel}
          rightLabel={args.rightLabel}
          showValue={args.showValue}
          showLabel={args.showLabel}
          textLabel={args.textLabel}
          showTooltip={args.showTooltip}
          step={args.step}
          disabled={args.disabled}
          color={args.color}
          size={args.size}
          formatValue={args.formatValue}
          label="Single Value / Range"
        />

        <RdsRange
          value={isOneWay && args.level ? undefined : (isOneWay ? singleValue : rangeValue)}
          onChange={(value) => {
            if (isOneWay) {
              setSingleValue(value as number);
            } else {
              setRangeValue(value as [number, number]);
            }
          }}
          type={args.type}
          level={args.level}
          leftLabel={args.leftLabel}
          rightLabel={args.rightLabel}
          showValue={args.showValue}
          showLabel={args.showLabel}
          textLabel={args.textLabel}
          showTooltip={args.showTooltip}
          step={args.step}
          disabled={args.disabled}
          color={args.color}
          size={args.size}
          formatValue={args.formatValue}
          label="Primary"
        />

        <RdsRange
          value={isOneWay && args.level ? undefined : (isOneWay ? singleValue : priceRange)}
          onChange={(value) => {
            if (isOneWay) {
              setSingleValue(value as number);
            } else {
              setPriceRange(value as [number, number]);
            }
          }}
          type={args.type}
          level={args.level}
          leftLabel={args.leftLabel}
          rightLabel={args.rightLabel ?? 1000}
          step={args.step ?? 50}
          showValue={args.showValue}
          showLabel={args.showLabel}
          textLabel={args.textLabel}
          showTooltip={args.showTooltip}
          disabled={args.disabled}
          color={args.color}
          size={args.size}
          formatValue={args.formatValue ?? ((value: number) => `$${value}`)}
          label="Secondary"
        />
      </Box>
    );
  },
};

export const RangeSlider: Story = {
  args: {
    value: [20, 80],
    leftLabel: 0,
    rightLabel: 100,
    label: 'Price Range',
    showValue: true,
    textLabel: true,
  },
};

export const Steps: Story = {
  args: {
    value: 20,
    leftLabel: 0,
    rightLabel: 100,
    step: 10,
    marks: true,
    label: 'Progress (10% steps)',
    showValue: true,
    textLabel: true,
  },
};

export const WithCustomFormat: Story = {
  args: {
    value: 50,
    leftLabel: 0,
    rightLabel: 100,
    label: 'Temperature',
    showValue: true,
    textLabel: true,
    formatValue: (value: number) => `${value}°C`,
  },
};

export const WithValue: Story = {
  args: {
    value: 50,
    leftLabel: 0,
    rightLabel: 100,
    label: 'Brightness',
    showValue: true,
    textLabel: true,
  },
};
