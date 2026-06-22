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
        <path d="M14.8 7.7L7.6 14.99M19.2 7.7L26.39 14.99M17.07 13.36C17.29 13.36 17.51 13.42 17.69 13.54C17.88 13.66 18.03 13.82 18.12 14.02L22.25 22.4C22.8 23.5 22.99 24.75 22.79 25.96C22.6 27.17 22.04 28.3 21.18 29.18C20.64 29.72 20 30.16 19.3 30.45C18.6 30.75 17.84 30.9 17.07 30.9C16.31 30.9 15.55 30.75 14.85 30.45C14.14 30.16 13.51 29.72 12.97 29.18C12.11 28.3 11.55 27.17 11.35 25.96C11.16 24.75 11.34 23.5 11.89 22.4L16.02 14.02C16.11 13.82 16.27 13.66 16.45 13.54C16.64 13.42 16.85 13.36 17.07 13.36ZM17.07 13.36L17.07 23.49M10.77 33H23.23M12.6 5.46L17 1L21.4 5.46L17 9.93L12.6 5.46ZM1 17.22L5.4 12.75L9.81 17.22L5.4 21.68L1 17.22ZM24.19 17.22L28.6 12.76L33 17.22L28.6 21.68L24.19 17.22Z" stroke="#7D7D7D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    leftIcon: <CircleOutlinedIcon sx={{ fontSize: 16 }} />,
    rightIcon: <CircleOutlinedIcon sx={{ fontSize: 16 }} />,
    onFiltersChange: (filters: FilterOption[]) => {},
    onApply: (filters: FilterOption[]) => {},
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


