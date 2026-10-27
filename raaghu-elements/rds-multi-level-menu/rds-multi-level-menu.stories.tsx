
import React from 'react';
import { RdsMultiLevelMenu, MenuOption } from './rds-multi-level-menu';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn, waitFor } from 'storybook/test';

const meta = {
  title: 'Elements/Multi Level Menu',
  component: RdsMultiLevelMenu,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
    controls: {
      include: ['items', 'variant', 'size', 'selected', 'children', 'className', 'sx', 'ref'],
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    className: {
      control: 'text',
      description: 'CSS class applied to the menu root.',
      table: { category: 'Root props' },
    },
    sx: {
      control: 'object',
      description: 'MUI system styles applied to the menu root.',
      table: { category: 'Root props' },
    },
    ref: {
      control: false,
      description: 'React ref to the menu root. Assign in code; refs cannot be set through Controls.',
      table: { category: 'Root props' },
    },
    items: {
      control: 'object',
      description: 'Menu options. Use variant="selectable" to highlight an item after it is clicked.',
    },
    variant: {
      control: { type: 'select' },
      options: ['expandable', 'selectable'],
      description: 'Defines the menu behavior, either expandable sub-menus or selectable items',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Sets the size of the menu items (`default` is deprecated; use `medium`)',
    },
    selected: {
      control: 'boolean',
      description: 'Selects the first item when using the selectable variant',
    },
  },
} satisfies Meta<typeof RdsMultiLevelMenu>;

export default meta;
type Story = StoryObj<typeof RdsMultiLevelMenu>;

const options: MenuOption[] = [
  {
    label: 'Option',
    shortcut: 'Shortcut',
  },
  { label: 'Option', shortcut: 'Shortcut' },
  { label: 'Option', shortcut: 'Shortcut',    children: [
    {
      label: 'Option',
      shortcut: 'Shortcut',
    },
    { label: 'Option', shortcut: 'Shortcut' },
    { label: 'Option', shortcut: 'Shortcut' },
  ], },
  { label: 'Option', shortcut: 'Shortcut' },
  { label: 'Option', shortcut: 'Shortcut' },
  { label: 'Option', shortcut: 'Shortcut' },
];


export const Default:Story ={
   play: async ({ canvasElement }) => {
     const buttons = canvasElement.querySelectorAll('button');
     expect(buttons.length).toBeGreaterThan(0);
   },
   render: (args) => {
     const base: MenuOption[] = args.items ?? [];
     if (args.size === 'large') {
       const templateWithChildren = base.find(o => Array.isArray(o.children) && o.children.length > 0);
       const firstExtra: MenuOption = templateWithChildren
         ? { label: 'Option', shortcut: 'Shortcut', children: [
    {
      label: 'Option',
      shortcut: 'Shortcut',
    },
    { label: 'Option', shortcut: 'Shortcut' },
    { label: 'Option', shortcut: 'Shortcut' },
  ], }
         : { label: 'Option', shortcut: 'Shortcut' };
       const secondExtra: MenuOption = { label: 'Option', shortcut: 'Shortcut' };
       const computedOptions: MenuOption[] = [...base, firstExtra, secondExtra];
       return <RdsMultiLevelMenu {...args} items={computedOptions} />;
     }
     return <RdsMultiLevelMenu {...args} items={base} />;
   },
   args: {
      items: options,
      variant: 'expandable',
      size: 'medium',
      selected: false,
   }
}

export const Selectable: Story = {
  args: {
    items: options,
    variant: 'selectable',
    size: 'medium',
    selected: false,
  },
};
