import { expect } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompGrid, { ActionPosition, ActionColumnStyle } from './rds-comp-grid';

const meta: Meta<typeof RdsCompGrid> = {
  title: 'Internal/Grid',
  component: RdsCompGrid,
  parameters: {
    status: { type: 'stable' },
    layout: 'padded',
  },
  argTypes: {
    sortable: {
      control: 'boolean',
      description: 'Enable sorting functionality for columns',
      defaultValue: true,
    },
    filterable: {
      control: 'boolean',
      description: 'Enable filtering functionality for columns',
      defaultValue: true,
    },
    resizable: {
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
    collapsed: {
      control: 'boolean',
      description: 'Whether the grid starts collapsed',
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
    className: { control: 'text', description: 'CSS class applied to the grid root.' },
    sx: { control: 'object', description: 'MUI system styles applied to the grid root.' },
    ref: { control: false, description: 'React ref to the grid imperative API; assign it in code.' },
  },
  tags: ['autodocs', 'stable'],
};

export default meta;
type Story = StoryObj<typeof RdsCompGrid>;

export const Default: Story = {
  args: {
    tableHeaders: [
      { key: 'id', name: 'ID', dataType: 'number' as const, sortable: true, filterable: true, resizable: true, isEditable: false, minWidth: 80, colWidth: '100px' },
      { key: 'name', name: 'Name', dataType: 'string' as const, sortable: true, filterable: true, resizable: true, isEditable: true, minWidth: 150, colWidth: '200px' },
    ],
    tableData: [],
  },
  play: async ({ canvasElement }) => {
    const el = canvasElement.firstElementChild;
    expect(el).toBeTruthy();
  },
};
