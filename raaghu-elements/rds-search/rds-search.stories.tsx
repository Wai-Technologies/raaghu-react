import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import RdsSearch from './rds-search';

const meta: Meta<typeof RdsSearch> = {
  title: 'Elements/Search',
  component: RdsSearch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label above the search input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder for the search input',
    },
    labelPosition: {
      control: 'select',
      options: ['top', 'left', 'right', 'bottom'],
      description: 'Position of the label relative to the input',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the search icon relative to the input',
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    showClearButton: {
      control: 'boolean',
    },
    showSearchIcon: {
      control: 'boolean',
    },
    autoSearch: {
      control: 'boolean',
    },
    searchDelay: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
    label: 'Search',
    labelPosition: 'top',
    iconPosition: 'left',
    fullWidth: false,
  },
  render: (args) => {
    const [searchValue, setSearchValue] = useState('');

    return (
      <Box sx={{ width: 300 }}>
        <RdsSearch
          value={searchValue}
          onChange={setSearchValue}
          onSearch={(value) => alert(`Searching for: ${value}`)}
          placeholder={args.placeholder}
          label={args.label}
          size={args.size}
          labelPosition={args.labelPosition}
          iconPosition={args.iconPosition}
          fullWidth={args.fullWidth}
        />
      </Box>
    );
  },
};

export const AutoSearch: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const handleSearch = (value: string) => {
      // Simulate search results
      const mockResults = value 
        ? [`Result 1 for "${value}"`, `Result 2 for "${value}"`, `Result 3 for "${value}"`]
        : [];
      setSearchResults(mockResults);
    };

    return (
      <Box sx={{ width: 400 }}>
        <RdsSearch
          value={searchValue}
          onChange={setSearchValue}
          onSearch={handleSearch}
          placeholder="Auto search (300ms delay)"
          autoSearch
          searchDelay={300}
          fullWidth
        />
        <Box sx={{ mt: 2 }}>
          {searchResults.length > 0 && (
            <Box sx={{ p: 1, backgroundColor: 'grey.100', borderRadius: 1 }}>
              {searchResults.map((result, index) => (
                <Box key={index} sx={{ py: 0.5 }}>
                  {result}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    );
  },
};

export const FullWidth: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');

    return (
      <Box sx={{ width: '100%', maxWidth: 600 }}>
        <RdsSearch
          value={searchValue}
          onChange={setSearchValue}
          onSearch={(value) => console.log('Searching:', value)}
          placeholder="Full width search"
          fullWidth
        />
      </Box>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [small, setSmall] = useState('');
    const [medium, setMedium] = useState('');

    return (
      <Box sx={{ width: 300, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <RdsSearch
          value={small}
          onChange={setSmall}
          placeholder="Small size"
          size="small"
        />
        <RdsSearch
          value={medium}
          onChange={setMedium}
          placeholder="Medium size (default)"
          size="medium"
        />
      </Box>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [outlined, setOutlined] = useState('');
    const [filled, setFilled] = useState('');
    const [standard, setStandard] = useState('');

    return (
      <Box sx={{ width: 300, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <RdsSearch
          value={outlined}
          onChange={setOutlined}
          placeholder="Outlined (default)"
          variant="outlined"
        />
        <RdsSearch
          value={filled}
          onChange={setFilled}
          placeholder="Filled variant"
          variant="filled"
        />
        <RdsSearch
          value={standard}
          onChange={setStandard}
          placeholder="Standard variant"
          variant="standard"
        />
      </Box>
    );
  },
};

export const WithoutIcons: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');

    return (
      <Box sx={{ width: 300 }}>
        <RdsSearch
          value={searchValue}
          onChange={setSearchValue}
          onSearch={(value) => alert(`Searching for: ${value}`)}
          placeholder="Simple search"
          showSearchIcon={false}
          showClearButton={false}
        />
      </Box>
    );
  },
};
