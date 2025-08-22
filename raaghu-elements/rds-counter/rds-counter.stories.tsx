import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import RdsCounter from './rds-counter';

const meta: Meta<typeof RdsCounter> = {
  title: 'Elements/Counter',
  component: RdsCounter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: 'select',
      options: ['default', 'compact'],
    },
    disabled: {
      control: 'boolean',
    },
    showInput: {
      control: 'boolean',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
    controlsClassName: {
      control: false,
    },
    showTitle: { control: 'boolean', },
    isMandatory: { control: 'boolean', description: 'Show required indicator on label.' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 5,
    titleText: 'Quantity',
    min: 0,
    max: 100,
    size: 'medium',
    variant: 'default',
    disabled: false,
    showInput: true,
    step: 1,
    showTitle: true,
    isMandatory: false,
  },
  render: (args) => <RdsCounter {...args} />,
};

export const Compact: Story = {
  args: {
    defaultValue: 1,
    titleText: 'Items',
    variant: 'compact',
    min: 1,
    max: 10,
    size: 'medium',
    disabled: false,
    showInput: true,
  },
  render: (args) => <RdsCounter {...args} />,
};

export const WithoutInput: Story = {
  args: {
    defaultValue: 3,
    titleText: 'Score',
    showInput: false,
    min: 0,
    max: 10,
  },
  render: (args) => <RdsCounter {...args} />,
};

export const Sizes: Story = {
  args: {
    min: 0,
    max: 10,
  },
  render: (args) => {
    const [small, setSmall] = useState(1);
    const [medium, setMedium] = useState(2);
    const [large, setLarge] = useState(3);

    return (
      <Box sx={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <RdsCounter
          {...args}
          defaultValue={1}
          titleText="Small"
          size="small"
        />
        <RdsCounter
          {...args}
          defaultValue={2}
          titleText="Medium"
          size="medium"
        />
        <RdsCounter
          {...args}
          defaultValue={3}
          titleText="Large"
          size="large"
        />
      </Box>
    );
  },
};

export const CompactSizes: Story = {
  args: {
    min: 0,
    max: 10,
    variant: 'compact',
  },
  render: (args) => {
    const [small, setSmall] = useState(1);
    const [medium, setMedium] = useState(2);
    const [large, setLarge] = useState(3);

    return (
      <Box sx={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <RdsCounter
          {...args}
          defaultValue={1}
          titleText="Small"
          size="small"
        />
        <RdsCounter
          {...args}
          defaultValue={2}
          titleText="Medium"
          size="medium"
        />
        <RdsCounter
          {...args}
          defaultValue={3}
          titleText="Large"
          size="large"
        />
      </Box>
    );
  },
};

export const WithConstraints: Story = {
  args: {
    defaultValue: 5,
    titleText: 'Limited Range (2-8)',
    min: 2,
    max: 8,
    step: 1,
  },
  render: (args) => <RdsCounter {...args} />,
};

export const StepExample: Story = {
  args: {
    defaultValue: 10,
    titleText: 'Step by 5',
    min: 0,
    max: 100,
    step: 5,
  },
  render: (args) => <RdsCounter {...args} />,
};

export const Disabled: Story = {
  args: {
    min: 0,
    max: 10,
    disabled: true,
  },
  render: (args) => {
    const [defaultValue] = useState(5);
    const [compactValue] = useState(3);
    return (
      <Box sx={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
        <RdsCounter
          {...args}
          value={defaultValue}
          onChange={() => {}}
          titleText="Disabled Default"
          variant="default"
        />
        <RdsCounter
          {...args}
          value={compactValue}
          onChange={() => {}}
          titleText="Disabled Compact"
          variant="compact"
        />
      </Box>
    );
  },
};

export const Interactive: Story = {
  args: {
    min: 0,
    max: 20,
    size: 'small',
    variant: 'compact',
  },
  render: (args) => {
    const [cart, setCart] = useState([
      { id: 1, name: 'Apple', quantity: 2, price: 1.50 },
      { id: 2, name: 'Banana', quantity: 1, price: 0.75 },
      { id: 3, name: 'Orange', quantity: 3, price: 2.00 },
    ]);

    const updateQuantity = (id: number, quantity: number) => {
      setCart(prev => prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    };

    const total = cart.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    // Dynamically set controlsClassName for compact variant and size
    const getControlsClassName = () => {
      if (args.variant === 'compact') {
        if (args.size === 'large') return 'rds-counter__controls--large_interactive';
        if (args.size === 'medium') return 'rds-counter__controls--medium_interactive';
        return 'rds-counter__controls--small_interactive';
      }
      return undefined;
    };

    return (
      <Box sx={{ width: 400 }}>
        <Box sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.2rem' }}>
          Shopping Cart
        </Box>
        {cart.map(item => (
          <Box key={item.id} sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            py: 1,
            borderBottom: 1,
            borderColor: 'grey.200'
          }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ fontWeight: 'medium' }}>{item.name}</Box>
              <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                ${item.price.toFixed(2)} each
              </Box>
            </Box>
            <RdsCounter
              {...args}
              value={item.quantity}
              onChange={(quantity) => updateQuantity(item.id, quantity)}
              controlsClassName={getControlsClassName()}
            />
            <Box sx={{ width: 100, textAlign: 'right', fontWeight: 'medium' }}>
              ${(item.quantity * item.price).toFixed(2)}
            </Box>
          </Box>
        ))}
        <Box sx={{ 
          mt: 2, 
          pt: 2, 
          borderTop: 2, 
          borderColor: 'primary.main',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '1.1rem',
          fontWeight: 'bold'
        }}>
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </Box>
      </Box>
    );
  },
};
