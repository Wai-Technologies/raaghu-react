import { expect } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompGrid, { ActionPosition, State, ActionColumnStyle } from './rds-comp-grid';

const meta: Meta<typeof RdsCompGrid> = {
  title: 'Internal/Grid',
  component: RdsCompGrid,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
  },
  argTypes: {
    isSort: {
      control: 'boolean',
      description: 'Enable sorting functionality for columns',
      defaultValue: true,
    },
    isFilter: {
      control: 'boolean',
      description: 'Enable filtering functionality for columns',
      defaultValue: true,
    },
    isResizable: {
      control: 'boolean',
      description: 'Enable column resizing functionality',
      defaultValue: true,
    },
    enableCheckboxSelection: {
      control: 'boolean',
      description: 'Enable checkbox selection for rows',
      defaultValue: false,
    },
    enableRadioButtonSelection: {
      control: 'boolean',
      description: 'Enable radio button selection for rows',
      defaultValue: false,
    },
    enableInlineEdit: {
      control: 'boolean',
      description: 'Enable inline editing functionality globally',
      defaultValue: true,
    },
    inlineEditMode: {
      control: 'select',
      options: ['cell', 'row'],
      description: 'Inline edit mode: cell-by-cell editing (default) or row-based editing',
      defaultValue: 'cell',
      type: { name: 'string', required: false },
    },
    enableRowSwapping: {
      control: 'boolean',
      description: 'Enable row drag and drop functionality for reordering',
      defaultValue: false,
      type: { name: 'boolean', required: false },
    },
    enableColumnSwapping: {
      control: 'boolean',
      description: 'Enable column drag and drop functionality for reordering',
      defaultValue: false,
      type: { name: 'boolean', required: false },
    },
    showHeader: {
      control: 'boolean',
      description: 'Show the header with search and controls',
      defaultValue: true,
    },
    showSubHeader: {
      control: 'boolean',
      description: 'Show the subheader with title and toggle',
      defaultValue: true,
    },
    pagination: {
      control: 'boolean',
      description: 'Enable pagination',
      defaultValue: false,
    },
    state: {
      control: 'select',
      options: [State.Default, State.Collapsed],
      description: 'Initial state of the grid',
      defaultValue: State.Default,
    },
    actionPosition: {
      control: 'select',
      options: [ActionPosition.Left, ActionPosition.Right],
      description: 'Position of action buttons',
      defaultValue: ActionPosition.Right,
    },
    actionColumnStyle: {
      control: 'select',
      options: [ActionColumnStyle.ShowDots, ActionColumnStyle.ShowButtonsDirectly],
      description: 'Style of action column',
      defaultValue: ActionColumnStyle.ShowDots,
    },
  },
  tags: ['autodocs', 'stable'],
};

export default meta;
type Story = StoryObj<typeof RdsCompGrid>;

export const Default: Story = {
  args: {
    tableHeaders: [
      { key: 'id', name: 'ID', dataType: 'number' as const, isSort: true, isFilter: true, isResizable: true, isEditable: false, minWidth: 80, colWidth: '100px' },
      { key: 'name', name: 'Name', dataType: 'string' as const, isSort: true, isFilter: true, isResizable: true, isEditable: true, minWidth: 150, colWidth: '200px' },
    ],
    tableData: [],
  },
  play: async ({ canvasElement }) => {
    const el = canvasElement.firstElementChild;
    expect(el).toBeTruthy();
  },
};
