import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import RdsCompTreeView, { RdsTreeNode } from './rds-comp-tree-view';
import './rds-comp-tree-view.scss';

const meta: Meta<typeof RdsCompTreeView> = {
  title: 'Components/TreeView',
  component: RdsCompTreeView,
  tags: ['autodocs'],
  argTypes: {
    multiSelect: { control: 'boolean' },
    showLines: { control: 'boolean' },
    showCheckbox: { control: 'boolean' },
    itemSize: { control: { type: 'select' }, options: ['small', 'medium', 'large'] },
  },
};

export default meta;
type Story = StoryObj<typeof RdsCompTreeView>;

const sample: RdsTreeNode[] = [
  {
    id: '1',
    label: 'Applications',
    children: [
      { id: '2', label: 'Calendar' },
      { id: '3', label: 'Chrome' },
      { id: '4', label: 'Webstorm' },
    ],
  },
  {
    id: '5',
    label: 'Documents',
    children: [
      { id: '6', label: 'MUI', children: [{ id: '7', label: 'index.js' }] },
    ],
  },
];

export const Default: Story = {
  args: {
    nodes: sample,
    defaultExpanded: ['1'],
    size: 'medium',
    multiSelect: false,
    showLines: true,
    showCheckbox: false,
    itemSize: 'medium',
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [expanded, setExpanded] = useState<string[]>(args.defaultExpanded || ['1']);
    const [selected, setSelected] = useState<string | string[] | null>(null);

    return (
      <div>
        <RdsCompTreeView
          {...args}
          nodes={sample}
          expanded={expanded}
          onNodeToggle={(e) => setExpanded(e)}
          selected={selected as any}
          onNodeSelect={(s) => setSelected(s as any)}
        />
      </div>
    );
  },
};
