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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(5);

    return (
      <RdsCounter
        value={value}
        onChange={setValue}
        label="Quantity"
        min={0}
        max={100}
      />
    );
  },
};

export const Compact: Story = {
  render: () => {
    const [value, setValue] = useState(1);

    return (
      <RdsCounter
        value={value}
        onChange={setValue}
        label="Items"
        variant="compact"
        min={1}
        max={10}
      />
    );
  },
};

export const WithoutInput: Story = {
  render: () => {
    const [value, setValue] = useState(3);

    return (
      <RdsCounter
        value={value}
        onChange={setValue}
        label="Score"
        showInput={false}
        min={0}
        max={10}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [small, setSmall] = useState(1);
    const [medium, setMedium] = useState(2);
    const [large, setLarge] = useState(3);

    return (
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
        <RdsCounter
          value={small}
          onChange={setSmall}
          label="Small"
          size="small"
          min={0}
          max={10}
        />
        <RdsCounter
          value={medium}
          onChange={setMedium}
          label="Medium"
          size="medium"
          min={0}
          max={10}
        />
        <RdsCounter
          value={large}
          onChange={setLarge}
          label="Large"
          size="large"
          min={0}
          max={10}
        />
      </Box>
    );
  },
};

export const CompactSizes: Story = {
  render: () => {
    const [small, setSmall] = useState(1);
    const [medium, setMedium] = useState(2);
    const [large, setLarge] = useState(3);

    return (
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
        <RdsCounter
          value={small}
          onChange={setSmall}
          label="Small"
          variant="compact"
          size="small"
          min={0}
          max={10}
        />
        <RdsCounter
          value={medium}
          onChange={setMedium}
          label="Medium"
          variant="compact"
          size="medium"
          min={0}
          max={10}
        />
        <RdsCounter
          value={large}
          onChange={setLarge}
          label="Large"
          variant="compact"
          size="large"
          min={0}
          max={10}
        />
      </Box>
    );
  },
};

export const WithConstraints: Story = {
  render: () => {
    const [value, setValue] = useState(5);

    return (
      <RdsCounter
        value={value}
        onChange={setValue}
        label="Limited Range (2-8)"
        min={2}
        max={8}
        step={1}
      />
    );
  },
};

export const StepExample: Story = {
  render: () => {
    const [value, setValue] = useState(10);

    return (
      <RdsCounter
        value={value}
        onChange={setValue}
        label="Step by 5"
        min={0}
        max={100}
        step={5}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
        <RdsCounter
          value={5}
          onChange={() => {}}
          label="Disabled Default"
          disabled
          min={0}
          max={10}
        />
        <RdsCounter
          value={3}
          onChange={() => {}}
          label="Disabled Compact"
          variant="compact"
          disabled
          min={0}
          max={10}
        />
      </Box>
    );
  },
};

export const Interactive: Story = {
  render: () => {
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
              value={item.quantity}
              onChange={(quantity) => updateQuantity(item.id, quantity)}
              variant="compact"
              size="small"
              min={0}
              max={20}
            />
            <Box sx={{ width: 80, textAlign: 'right', fontWeight: 'medium' }}>
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
