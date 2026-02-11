
import React from 'react';
import { RdsMultiLevelMenu, MenuOption } from './rds-multi-level-menu';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Elements/Multi Level Menu',
  component: RdsMultiLevelMenu,
  parameters: {
    layout: 'padded',
    controls: {
    exclude: ['onSelect'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['expandable', 'selectable'],
      description: 'Defines the menu behavior, either expandable sub-menus or selectable items',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'large'],
      description: 'Sets the size of the menu items',
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'selected'],
      description: 'Sets the visual state of the menu items',
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
   render: (args) => {
     const base: MenuOption[] = args.options ?? [];
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
       return <RdsMultiLevelMenu {...args} options={computedOptions} />;
     }
     return <RdsMultiLevelMenu {...args} options={base} />;
   },
   args: {
      options: options,
      type: 'expandable',
      size: 'default',
      state: 'default',
   }
}
