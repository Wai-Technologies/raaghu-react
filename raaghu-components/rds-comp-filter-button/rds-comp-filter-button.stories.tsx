
import { Meta, StoryObj } from '@storybook/react';
import { Circle } from '@mui/icons-material';
import RdsCompFilterButton, { FilterOption } from './rds-comp-filter-button';

const meta: Meta = {
  title: 'Components/Filter Button',
  component: RdsCompFilterButton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    shape: {
      options: ['rectangle', 'pill'],
      control: { type: 'select' },
      description: 'Shape of the filter button',
    },
    text: {
      control: 'text',
      description: 'Text label for the button',
    },
    showLeftIcon: {
      control: 'boolean',
      description: 'Whether to show the left icon',
    },
    showRightIcon: {
      control: 'boolean',
      description: 'Whether to show the right icon',
    },
    leftIcon: {
      control: false,
    },
    rightIcon: {
      control: false,
    },
    filters: {
      control: false,
    },
    onFiltersChange: {
      control: false,
    },
    onApply: {
      control: false,
    },
    onClear: {
      control: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    className: {
      control: false,
    },
  },
} satisfies Meta<typeof RdsCompFilterButton>;

export default meta;
type Story = StoryObj<typeof RdsCompFilterButton>;

const sampleFilters: FilterOption[] = [
  {
    id: 'filter1',
    name: 'Filter Name',
    values: ['Option 1', 'Option 2', 'Option 3'],
    selectedValues: []
  },
  {
    id: 'filter2',
    name: 'Filter Name',
    values: ['Value A', 'Value B', 'Value C'],
    selectedValues: []
  },
  {
    id: 'filter3',
    name: 'Filter Name',
    values: ['Choice 1', 'Choice 2', 'Choice 3'],
    selectedValues: []
  },
  {
    id: 'filter4',
    name: 'Filter Name',
    values: ['Item 1', 'Item 2', 'Item 3'],
    selectedValues: []
  },
  {
    id: 'filter5',
    name: 'Filter Name',
    values: ['Type A', 'Type B', 'Type C'],
    selectedValues: []
  },
  {
    id: 'filter6',
    name: 'Filter Name',
    values: ['Category 1', 'Category 2', 'Category 3'],
    selectedValues: []
  }
];

export const Default: Story = {
  args: {
    shape: 'rectangle',
    text: 'Filter',
    showLeftIcon: true,
    showRightIcon: true,
    disabled: false,
    filters: sampleFilters,
    leftIcon: <Circle sx={{ fontSize: 16 }} />,
    rightIcon: <Circle sx={{ fontSize: 16 }} />,
    onFiltersChange: (filters: FilterOption[]) => console.log('Filters changed:', filters),
    onApply: (filters: FilterOption[]) => console.log('Apply filters:', filters),
    onClear: () => console.log('Clear filters'),
  },
} satisfies Story;

Default.parameters = {
  controls: { include: ['shape', 'text', 'showLeftIcon', 'showRightIcon', 'disabled'] },
};
