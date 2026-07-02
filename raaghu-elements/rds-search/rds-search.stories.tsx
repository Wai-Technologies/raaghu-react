import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import RdsSearch from './rds-search';

// Shared styles for search results box - uses theme palette instead of hardcoded colors
const searchResultsBoxSx = {
  p: 1,
  backgroundColor: (theme: any) => theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
  borderRadius: 1,
};

const meta: Meta<typeof RdsSearch> = {
  title: 'Elements/Search',
  component: RdsSearch,
  parameters: {
        status: { type: 'stable' },
    layout: 'centered',
  },
  tags: ['autodocs', 'stable'],
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
    value: { control: { disable: true }, table: { disable: true } },
    onChange: { control: { disable: true }, table: { disable: true } },
    onSearch: { control: { disable: true }, table: { disable: true } },
    onClear: { control: { disable: true }, table: { disable: true } },
    ref: { control: { disable: true }, table: { disable: true } },
    component: { control: { disable: true }, table: { disable: true } },
    slots: { control: { disable: true }, table: { disable: true } },
    slotProps: { control: { disable: true }, table: { disable: true } },
    InputProps: { control: { disable: true }, table: { disable: true } },
    inputProps: { control: { disable: true }, table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultStory = (args) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const handleSearch = (value: string) => {
      if (args.autoSearch) {
        const mockResults = value 
          ? [`Result for "${value}"`]
          : [];
        setSearchResults(mockResults);
      } else {
        alert(`Searching for: ${value}`);
      }
    };

    const handleClear = () => {
      setSearchResults([]);
    };

    return (
      <Box sx={(() => args.fullWidth ? { width: '100%' } : { width: { xs: '100%', sm: 350, md: 400 }, maxWidth: 400 })()}>
        {(() => {
          const { value: _v, onChange: _oc, onSearch: _os, onClear: _oclr, ...forwardArgs } = args as any;
          return (
            <RdsSearch
              value={searchValue}
              onChange={setSearchValue}
              onSearch={handleSearch}
              onClear={handleClear}
              {...forwardArgs}
            />
          );
        })()}
        {args.autoSearch && searchResults.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Box sx={searchResultsBoxSx}>
              {searchResults.map((result, index) => (
                <Box key={index} sx={{ py: 0.5 }}>
                  {result}
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    );
  };

export const Default: Story = {
  args: {
    placeholder: 'Search...',
    label: 'Search',
    labelPosition: 'top',
    iconPosition: 'left',
    fullWidth: false,
  },
  render: DefaultStory,
};

const AutoSearchStory = (args) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const isSmallScreen = useMediaQuery('(max-width:414px)');

    const handleSearch = (value: string) => {
      const mockResults = value 
        ? [`Result for "${value}"`]
        : [];
      setSearchResults(mockResults);
    };

    return (
      <Box sx={(() => args.fullWidth ? { width: '100%' } : { width: { xs: '100%', sm: 380, md: 450 }, maxWidth: 450 })()}>
    {(() => {
      const { value: _v, onChange: _oc, onSearch: _os, ...forwardArgs } = args as any;
      return (
        <RdsSearch
          value={searchValue}
          onChange={setSearchValue}
          onSearch={handleSearch}
          placeholder={isSmallScreen ? 'Search...' : 'Auto search (300ms delay)'}
          fullWidth
          {...forwardArgs}
        />
      );
    })()}
        <Box sx={{ mt: 2 }}>
          {searchResults.length > 0 && (
            <Box sx={searchResultsBoxSx}>
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
  };

export const AutoSearch: Story = {
  args: {
    autoSearch: true,
    searchDelay: 300,
  },
  render: AutoSearchStory,
};

const FullWidthStory = (args) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const handleSearch = (value: string) => {
      const mockResults = value ? [`Result for "${value}"`] : [];
      setSearchResults(mockResults);
    };

    return (
      <Box sx={(() => args.fullWidth ? { width: '100%' } : { width: '100%', maxWidth: 600 })()}>
    {(() => {
      const { value: _v, onChange: _oc, onSearch: _os, ...forwardArgs } = args as any;
      return (
        <RdsSearch
          value={searchValue}
          onChange={setSearchValue}
          onSearch={handleSearch}
          placeholder="Full width search"
          {...forwardArgs}
        />
      );
    })()}
        {searchResults.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Box sx={searchResultsBoxSx}>
              {searchResults.map((result, index) => (
                <Box key={index} sx={{ py: 0.5 }}>
                  {result}
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    );
  };

export const FullWidth: Story = {
  parameters: {
    controls: { exclude: ['fullWidth'] },
  },
  args: {
    fullWidth: true,
  },
  render: FullWidthStory,
};

const SizesStory = (args) => {
    const [small, setSmall] = useState('');
    const [medium, setMedium] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const handleSearch = (value: string) => {
      const mockResults = value ? [`Result for "${value}"`] : [];
      setSearchResults(mockResults);
    };

    return (
      <Box sx={(() => args.fullWidth ? { width: '100%', display: 'flex', flexDirection: 'column', gap: 3 } : { width: { xs: '100%', sm: 350, md: 400 }, maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 3 })()}>
  {(() => {
    const { value: _v, onChange: _oc, onSearch: _os, ...forwardArgs } = args as any;
    return (
      <>
        <RdsSearch
          value={small}
          onChange={setSmall}
          placeholder="Small size"
          size="small"
          onSearch={handleSearch}
          {...forwardArgs}
        />
        <RdsSearch
          value={medium}
          onChange={setMedium}
          placeholder="Medium size (default)"
          size="medium"
          onSearch={handleSearch}
          {...forwardArgs}
        />
      </>
    );
  })()}
        {searchResults.length > 0 && (
          <Box sx={{ mt: -1 }}>
            <Box sx={searchResultsBoxSx}>
              {searchResults.map((result, index) => (
                <Box key={index} sx={{ py: 0.5 }}>
                  {result}
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    );
  };

export const Sizes: Story = {
  render: SizesStory,
};

const VariantsStory = (args) => {
    const [outlined, setOutlined] = useState('');
    const [filled, setFilled] = useState('');
    const [standard, setStandard] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const handleSearch = (value: string) => {
      const mockResults = value ? [`Result for "${value}"`] : [];
      setSearchResults(mockResults);
    };

    return (
      <Box sx={(() => args.fullWidth ? { width: '100%', display: 'flex', flexDirection: 'column', gap: 3 } : { width: { xs: '100%', sm: 350, md: 400 }, maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 3 })()}>
  {(() => {
    const { value: _v, onChange: _oc, onSearch: _os, ...forwardArgs } = args as any;
    return (
      <>
        <RdsSearch
          value={outlined}
          onChange={setOutlined}
          placeholder="Outlined (default)"
          variant="outlined"
          onSearch={handleSearch}
          {...forwardArgs}
        />
        <RdsSearch
          value={filled}
          onChange={setFilled}
          placeholder="Filled variant"
          variant="filled"
          onSearch={handleSearch}
          {...forwardArgs}
        />
        <RdsSearch
          value={standard}
          onChange={setStandard}
          placeholder="Standard variant"
          variant="standard"
          onSearch={handleSearch}
          {...forwardArgs}
        />
      </>
    );
  })()}
        {searchResults.length > 0 && (
          <Box sx={{ mt: -1 }}>
            <Box sx={searchResultsBoxSx}>
              {searchResults.map((result, index) => (
                <Box key={index} sx={{ py: 0.5 }}>
                  {result}
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    );
  };

export const Variants: Story = {
  render: VariantsStory,
};

const WithoutIconsStory = (args) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const handleSearch = (value: string) => {
      const mockResults = value ? [`Result for "${value}"`] : [];
      setSearchResults(mockResults);
    };

    return (
      <Box sx={(() => args.fullWidth ? { width: '100%' } : { width: { xs: '100%', sm: 350, md: 400 }, maxWidth: 400 })()}>
    {(() => {
      const { value: _v, onChange: _oc, onSearch: _os, onClear: _oclr, ...forwardArgs } = args as any;
      return (
        <RdsSearch
          value={searchValue}
          onChange={setSearchValue}
          onSearch={handleSearch}
          placeholder="Simple search"
          showSearchIcon={false}
          showClearButton={false}
          {...forwardArgs}
        />
      );
    })()}
        {searchResults.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Box sx={searchResultsBoxSx}>
              {searchResults.map((result, index) => (
                <Box key={index} sx={{ py: 0.5 }}>
                  {result}
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    );
  };

export const WithoutIcons: Story = {
  render: WithoutIconsStory,
  parameters: {
    controls: { exclude: ['iconPosition', 'showSearchIcon'] },
  },
};

const TypeSearchStory = (args) => {
    const [searchValue, setSearchValue] = React.useState('');
    return (
      <RdsSearch
        {...args}
        value={searchValue}
        onChange={setSearchValue}
      />
    );
  };


