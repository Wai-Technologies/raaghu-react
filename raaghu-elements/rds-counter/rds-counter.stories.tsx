import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn, waitFor } from '@storybook/test';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import RdsCounter from './rds-counter';

const meta: Meta<typeof RdsCounter> = {
  title: 'Elements/Counter',
  component: RdsCounter,
  parameters: {
    layout: 'centered',
    controls: {
    exclude: ['onChange', 'controlsClassName','disabled','defaultValue'],
    },
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
    layout: {
      control: 'select',
      options: ['side-to-side', 'right-side', 'bottom'],
      description: 'Layout of buttons relative to the value',
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
    state: {
      control: 'select',
      options: ['default', 'selected', 'disabled'],
      description: 'Visual state: Default, Selected or Disabled',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when input is empty',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    titleText: 'Quantity',
    min: 0,
    max: 100,
    size: 'medium',
    variant: 'default',
    layout: 'side-to-side',
    disabled: false,
    showInput: true,
    step: 1,
    showTitle: true,
    isMandatory: false,
    placeholder: '00',
  },
  render: (args) => <RdsCounter {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvasElement.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
    const display = canvasElement.querySelector('input, [class*=value], [class*=count]') || canvasElement.firstElementChild;
    expect(display).toBeTruthy();
  },
};

export const Compact: Story = {
  args: {
    titleText: 'Items',
    variant: 'compact',
    min: 1,
    max: 10,
    size: 'medium',
    layout: 'side-to-side',
    disabled: false,
    showInput: true,
    placeholder: '00',
  },
  render: (args) => <RdsCounter {...args} />,
};

export const WithoutInput: Story = {
  args: {
    titleText: 'Score',
    showInput: false,
    min: 0,
    max: 10,
    layout: 'side-to-side',
    placeholder: '00',
  },
  render: (args) => <RdsCounter {...args} />,
};

export const Sizes: Story = {
  args: {
    min: 0,
    max: 10,
    layout: 'side-to-side',
    placeholder: '00',
  },
  render: (args) => {
    return (
      <Box className="rds-counter__responsive">
        <RdsCounter
          {...args}
          titleText="Small"
          size="small"
        />
        <RdsCounter
          {...args}
          titleText="Medium"
          size="medium"
        />
        <RdsCounter
          {...args}
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
    layout: 'side-to-side',
    placeholder: '00',
  },
  render: (args) => {
    return (
      <Box className="rds-counter__responsive">
        <RdsCounter
          {...args}
          titleText="Small"
          size="small"
        />
        <RdsCounter
          {...args}
          titleText="Medium"
          size="medium"
        />
        <RdsCounter
          {...args}
          titleText="Large"
          size="large"
        />
      </Box>
    );
  },
};

export const WithConstraints: Story = {
  args: {
    titleText: 'Limited Range (2-8)',
    min: 2,
    max: 8,
    step: 1,
    layout: 'side-to-side',
    placeholder: '00',
  },
  render: (args) => <RdsCounter {...args} />,
};

export const StepExample: Story = {
  args: {
    titleText: 'Step by 5',
    min: 0,
    max: 100,
    step: 5,
    layout: 'side-to-side',
    placeholder: '00',
  },
  render: (args) => <RdsCounter {...args} />,
};

export const Disabled: Story = {
  args: {
    min: 0,
    max: 10,
    disabled: true,
    layout: 'side-to-side',
    placeholder: '00',
  },
  render: (args) => {
    const defaultDisabled = 5;
    const compactDisabled = 3;
    return (
      <Box className="rds-counter__responsive">
        <RdsCounter
          {...args}
          value={defaultDisabled}
          onChange={() => {}}
          titleText="Disabled Default"
          variant="default"
        />
        <RdsCounter
          {...args}
          value={compactDisabled}
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
    layout: 'side-to-side',
    placeholder: '00',
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

    const getControlsClassName = () => {
      if (args.variant === 'compact') {
        if (args.size === 'large') return 'rds-counter__controls--large_interactive';
        if (args.size === 'medium') return 'rds-counter__controls--medium_interactive';
        return 'rds-counter__controls--small_interactive';
      }
      return undefined;
    };

    return (
      <Box className="rds-counter__interactive">
        <Box className="rds-counter__interactive__header">
          Shopping Cart
        </Box>
        {cart.map(item => (
          <Box key={item.id} className="rds-counter__interactive__item">
            <Box className="rds-counter__interactive__item-details">
              <Box className="rds-counter__interactive__item-details-name">{item.name}</Box>
              <Box className="rds-counter__interactive__item-details-price">
                ${item.price.toFixed(2)} each
              </Box>
            </Box>
            <RdsCounter
              {...args}
              value={item.quantity}
              onChange={(quantity) => updateQuantity(item.id, quantity)}
              controlsClassName={getControlsClassName()}
            />
            <Box className="rds-counter__interactive__item-total">
              ${(item.quantity * item.price).toFixed(2)}
            </Box>
          </Box>
        ))}
        <Box className="rds-counter__interactive__footer">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </Box>
      </Box>
    );
  },
};