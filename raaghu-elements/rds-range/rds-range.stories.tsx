import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import RdsRange from './rds-range';

const meta: Meta<typeof RdsRange> = {
  title: 'Elements/Range',
  component: RdsRange,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    min: {
      control: 'number',
    },
    max: {
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 30,
    min: 0,
    max: 100,
    label: 'Volume',
  },
};

export const WithValue: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    label: 'Brightness',
    showValue: true,
  },
};

export const RangeSlider: Story = {
  args: {
    value: [20, 80],
    min: 0,
    max: 100,
    label: 'Price Range',
    showValue: true,
  },
};

export const WithCustomFormat: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    label: 'Temperature',
    showValue: true,
    formatValue: (value: number) => `${value}°C`,
  },
};

export const Steps: Story = {
  args: {
    value: 20,
    min: 0,
    max: 100,
    step: 10,
    marks: true,
    label: 'Progress (10% steps)',
    showValue: true,
  },
};

export const Disabled: Story = {
  args: {
    value: 60,
    min: 0,
    max: 100,
    disabled: true,
    label: 'Disabled Slider',
    showValue: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [singleValue, setSingleValue] = useState(30);
    const [rangeValue, setRangeValue] = useState([20, 80]);
    const [priceRange, setPriceRange] = useState([100, 500]);

    return (
      <Box sx={{ width: 400, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <RdsRange
          value={singleValue}
          onChange={(value) => setSingleValue(value as number)}
          min={0}
          max={100}
          label="Single Value Slider"
          showValue
        />
        
        <RdsRange
          value={rangeValue}
          onChange={(value) => setRangeValue(value as number[])}
          min={0}
          max={100}
          label="Range Slider"
          showValue
        />
        
        <RdsRange
          value={priceRange}
          onChange={(value) => setPriceRange(value as number[])}
          min={0}
          max={1000}
          step={50}
          label="Price Range"
          showValue
          formatValue={(value) => `$${value}`}
          color="secondary"
        />
      </Box>
    );
  },
};

export const Colors: Story = {
  render: () => (
    <Box sx={{ width: 300, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <RdsRange
        value={40}
        min={0}
        max={100}
        color="primary"
        label="Primary Color"
        showValue
      />
      <RdsRange
        value={60}
        min={0}
        max={100}
        color="secondary"
        label="Secondary Color"
        showValue
      />
    </Box>
  ),
};
