import { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import RdsCompFilterButton, { FilterOption } from './rds-comp-filter-button';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

const meta: Meta = {
  title: 'Components/Filter Button',
  component: RdsCompFilterButton,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
  },
  tags: ['autodocs', 'stable'],
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
    itemIcon: {
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
    itemIcon: (
      <svg width="17" height="17" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.7976 7.69526L7.60461 14.9865M19.2006 7.69526L26.3937 14.9865M17.0723 13.3624C17.292 13.3624 17.5071 13.4241 17.6931 13.5405C17.879 13.6568 18.0281 13.8231 18.1232 14.0201L22.2528 22.3993C22.7979 23.5018 22.9869 24.7451 22.794 25.9588C22.6011 27.1724 22.0358 28.297 21.1754 29.1785C20.6423 29.7238 20.0048 30.1573 19.3005 30.4533C18.5961 30.7493 17.8393 30.9019 17.0747 30.9019C16.3101 30.9019 15.5533 30.7493 14.849 30.4533C14.1446 30.1573 13.5071 29.7238 12.9741 29.1785C12.1124 28.2979 11.5455 27.1737 11.3512 25.9601C11.1568 24.7464 11.3445 23.5026 11.8886 22.3993L16.0198 14.0201C16.1149 13.8231 16.2656 13.6568 16.4516 13.5405C16.6375 13.4241 16.8527 13.3624 17.0723 13.3624ZM17.0723 13.3624L17.0715 23.4873M10.7726 32.9993H23.2273M12.596 5.46326L17 1L21.404 5.46326L17 9.92652L12.596 5.46326ZM1 17.2169L5.40398 12.7536L9.80797 17.2169L5.40398 21.6801L1 17.2169ZM24.192 17.2185L28.596 12.7552L33 17.2185L28.596 21.6817L24.192 17.2185Z" stroke="#7D7D7D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    ),
    leftIcon: <CircleOutlinedIcon sx={{ fontSize: 16 }} />,
    rightIcon: <CircleOutlinedIcon sx={{ fontSize: 16 }} />,
    onFiltersChange: (_filters: FilterOption[]) => {},
    onApply: (_filters: FilterOption[]) => {},
    onClear: () => {},
  },
  play: async ({ canvas }) => {
    const button = await canvas.findByRole('button', { name: /filter/i });
    await expect(button).toBeInTheDocument();
  },
} satisfies Story;

Default.parameters = {
  controls: { include: ['shape', 'text', 'showLeftIcon', 'showRightIcon', 'disabled'] },
};


