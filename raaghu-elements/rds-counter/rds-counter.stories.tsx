import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import RdsCounter from './rds-counter';

const meta: Meta<typeof RdsCounter> = {
  title: 'Elements/Counter',
  component: RdsCounter,
  parameters: {
        status: { type: 'stable' },
    layout: 'centered',
    controls: {
          include: [
            'label',
            'min',
            'max',
            'step',
            'size',
            'variant',
            'layout',
            'disabled',
            'selected',
            'showInput',
            'showTitle',
            'required',
            'placeholder',
            'className',
            'sx',
            'ref',
          ],
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    className: {
      control: 'text',
      description: 'CSS class applied to the root element.',
      table: { category: 'Root props' },
    },
    sx: {
      control: 'object',
      description: 'MUI system styles applied to the root element.',
      table: { category: 'Root props' },
    },
    ref: {
      control: false,
      description: 'React ref to the root element. Assign in code; refs cannot be set through Controls.',
      table: { category: 'Root props' },
    },
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
      description: 'Disables the counter and its controls',
    },
    selected: {
      control: 'boolean',
      description: 'Applies the selected visual treatment',
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
    showTitle: { control: 'boolean', },
    required: { control: 'boolean', description: 'Show required indicator on label.' },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when input is empty',
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the counter',
    },
    value: {
      control: { type: 'number' },
      description: 'Controlled value. Leave unset for uncontrolled (plus/minus update internal state).',
    },
  },
};

const CounterWithState = (args: React.ComponentProps<typeof RdsCounter>) => {
  const [count, setCount] = useState<number | undefined>(
    typeof args.value === 'number' ? args.value : typeof args.defaultValue === 'number' ? args.defaultValue : undefined
  );
  React.useEffect(() => {
    if (typeof args.value === 'number') setCount(args.value);
  }, [args.value]);
  return (
    <RdsCounter
      {...args}
      value={count}
      onChange={(next) => {
        setCount(next);
        args.onChange?.(next);
      }}
    />
  );
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Quantity',
    min: 0,
    max: 100,
    size: 'medium',
    variant: 'default',
    layout: 'side-to-side',
    disabled: false,
    showInput: true,
    step: 1,
    showTitle: true,
    required: false,
    placeholder: '00',
    // Keep uncontrolled — do not set value/defaultValue so placeholder "00" shows (matches production).
    value: undefined,
    defaultValue: undefined,
  },
  render: (args) => {
    const { value: _value, defaultValue: _defaultValue, ...rest } = args;
    return <RdsCounter {...rest} />;
  },
  play: async ({ canvasElement }) => {
    const buttons = canvasElement.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
    const display = canvasElement.querySelector('input, [class*=value], [class*=count]') || canvasElement.firstElementChild;
    expect(display).toBeTruthy();
  },
};

export const Compact: Story = {
  args: {
    label: 'Items',
    variant: 'compact',
    min: 1,
    max: 10,
    size: 'medium',
    layout: 'side-to-side',
    disabled: false,
    showInput: true,
    placeholder: '00',
    defaultValue: 1,
  },
  render: (args) => <CounterWithState {...args} />,
};

export const WithoutInput: Story = {
  args: {
    label: 'Score',
    showInput: false,
    min: 0,
    max: 10,
    layout: 'side-to-side',
    placeholder: '00',
    defaultValue: 0,
  },
  render: (args) => <CounterWithState {...args} />,
};

export const Sizes: Story = {
  args: {
    min: 0,
    max: 10,
    layout: 'side-to-side',
    placeholder: '00',
  },
  parameters: { controls: { exclude: ['label', 'size'] } },
  render: (args) => {
    return (
      <Box className="rds-counter__responsive">
        <RdsCounter
          {...args}
          label="Small"
          size="small"
        />
        <RdsCounter
          {...args}
          label="Medium"
          size="medium"
        />
        <RdsCounter
          {...args}
          label="Large"
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
  parameters: { controls: { exclude: ['label', 'size'] } },
  render: (args) => {
    return (
      <Box className="rds-counter__responsive">
        <RdsCounter
          {...args}
          label="Small"
          size="small"
        />
        <RdsCounter
          {...args}
          label="Medium"
          size="medium"
        />
        <RdsCounter
          {...args}
          label="Large"
          size="large"
        />
      </Box>
    );
  },
};

export const WithConstraints: Story = {
  args: {
    label: 'Limited Range (2-8)',
    min: 2,
    max: 8,
    step: 1,
    layout: 'side-to-side',
    placeholder: '00',
    defaultValue: 2,
  },
  render: (args) => <CounterWithState {...args} />,
};

export const StepExample: Story = {
  args: {
    label: 'Step by 5',
    min: 0,
    max: 100,
    step: 5,
    layout: 'side-to-side',
    placeholder: '00',
    defaultValue: 0,
  },
  render: (args) => <CounterWithState {...args} />,
};

export const Disabled: Story = {
  args: {
    min: 0,
    max: 10,
    disabled: true,
    layout: 'side-to-side',
    placeholder: '00',
  },
  parameters: { controls: { exclude: ['label', 'variant', 'value'] } },
  render: (args) => {
    const defaultDisabled = 5;
    const compactDisabled = 3;
    return (
      <Box className="rds-counter__responsive">
        <RdsCounter
          {...args}
          value={defaultDisabled}
          onChange={() => {}}
          label="Disabled Default"
          variant="default"
        />
        <RdsCounter
          {...args}
          value={compactDisabled}
          onChange={() => {}}
          label="Disabled Compact"
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
    showTitle: false,
  },
  parameters: {
    controls: {
      exclude: ['label', 'showTitle', 'required'],
    },
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