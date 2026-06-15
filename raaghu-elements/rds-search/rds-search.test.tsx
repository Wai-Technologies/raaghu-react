import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsSearch from './rds-search';
import { axe } from 'jest-axe';

jest.mock('./rds-search.scss', () => ({}));

const renderWithTheme = (component: React.ReactElement) => {
  const theme = createTheme();
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('RdsSearch', () => {
  describe('Basic Rendering', () => {
    it('should render search component', () => {
      const { container } = renderWithTheme(
        <RdsSearch value="" onChange={() => {}} />
      );
      expect(container.querySelector('.rds-search')).toBeInTheDocument();
    });

    it('should render input field', () => {
      renderWithTheme(
        <RdsSearch value="" onChange={() => {}} />
      );
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('should render with default placeholder', () => {
      renderWithTheme(
        <RdsSearch value="" onChange={() => {}} />
      );
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.placeholder).toBe('Search...');
    });

    it('should render with custom placeholder', () => {
      renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}} 
          placeholder="Find something..."
        />
      );
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.placeholder).toBe('Find something...');
    });

    it('should render without errors with default props', () => {
      const { container } = renderWithTheme(
        <RdsSearch value="" onChange={() => {}} />
      );
      expect(container.querySelector('.rds-search')).toBeInTheDocument();
    });

    it('should have correct CSS classes', () => {
      const { container } = renderWithTheme(
        <RdsSearch value="" onChange={() => {}} />
      );
      expect(container.querySelector('.rds-search')).toBeInTheDocument();
      expect(container.querySelector('.rds-search__input')).toBeInTheDocument();
    });
  });

  describe('Label and Label Positioning', () => {
    it('should render label when provided', () => {
      renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}} 
          label="Search Products"
        />
      );
      expect(screen.getByText('Search Products')).toBeInTheDocument();
    });

    it('should not render label when not provided', () => {
      const { container } = renderWithTheme(
        <RdsSearch value="" onChange={() => {}} />
      );
      expect(container.querySelector('.rds-search__label')).not.toBeInTheDocument();
    });

    it('should not render empty label', () => {
      const { container } = renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}} 
          label=""
        />
      );
      expect(container.querySelector('.rds-search__label')).not.toBeInTheDocument();
    });

    it('should render label at top position by default', () => {
      const { container } = renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}} 
          label="Search"
          labelPosition="top"
        />
      );
      expect(container.querySelector('.rds-search--column')).toBeInTheDocument();
      expect(container.querySelector('.rds-search__label--top')).toBeInTheDocument();
    });

    it('should render label at bottom position', () => {
      const { container } = renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}} 
          label="Search"
          labelPosition="bottom"
        />
      );
      expect(container.querySelector('.rds-search--column-reverse')).toBeInTheDocument();
      expect(container.querySelector('.rds-search__label--bottom')).toBeInTheDocument();
    });

    it('should render label at left position', () => {
      const { container } = renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}} 
          label="Search"
          labelPosition="left"
        />
      );
      expect(container.querySelector('.rds-search--row')).toBeInTheDocument();
      expect(container.querySelector('.rds-search__label--left')).toBeInTheDocument();
    });

    it('should render label at right position', () => {
      const { container } = renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}} 
          label="Search"
          labelPosition="right"
        />
      );
      expect(container.querySelector('.rds-search--row-reverse')).toBeInTheDocument();
      expect(container.querySelector('.rds-search__label--right')).toBeInTheDocument();
    });
  });

  describe('Icon Display and Positioning', () => {
    it('should show search icon by default', () => {
      renderWithTheme(
        <RdsSearch value="" onChange={() => {}} />
      );
      const searchButtons = screen.getAllByLabelText('search');
      expect(searchButtons.length).toBeGreaterThan(0);
    });

    it('should not show search icon when disabled', () => {
      renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}} 
          showSearchIcon={false}
        />
      );
      const searchButtons = screen.queryAllByLabelText('search');
      expect(searchButtons.length).toBe(0);
    });

    it('should position search icon on left by default', () => {
      const { container } = renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}} 
          iconPosition="left"
        />
      );
      expect(container.querySelector('.rds-search')).toBeInTheDocument();
    });

    it('should position search icon on right', () => {
      const { container } = renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}} 
          iconPosition="right"
        />
      );
      expect(container.querySelector('.rds-search')).toBeInTheDocument();
    });

    it('should show clear button when value exists and showClearButton is true', () => {
      renderWithTheme(
        <RdsSearch 
          value="search text" 
          onChange={() => {}} 
          showClearButton={true}
          iconPosition="right"
        />
      );
      const clearButton = screen.getByLabelText('clear');
      expect(clearButton).toBeInTheDocument();
    });

    it('should not show clear button when value is empty', () => {
      renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}} 
          showClearButton={true}
        />
      );
      const clearButtons = screen.queryAllByLabelText('clear');
      expect(clearButtons.length).toBe(0);
    });

    it('should not show clear button when showClearButton is false', () => {
      renderWithTheme(
        <RdsSearch 
          value="search text" 
          onChange={() => {}} 
          showClearButton={false}
        />
      );
      const clearButtons = screen.queryAllByLabelText('clear');
      expect(clearButtons.length).toBe(0);
    });
  });

  describe('User Interaction - Input Change', () => {
    it('should call onChange when input value changes', async () => {
      const handleChange = jest.fn();
      
      renderWithTheme(
        <RdsSearch 
          value=""
          onChange={handleChange}
        />
      );
      
      const input = screen.getByRole('textbox') as HTMLInputElement;
      
      // Type 'test' character by character
      await userEvent.type(input, 'test');
      
      // Verify onChange was called for each character typed
      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledTimes(4);
      expect(handleChange).toHaveBeenCalledWith('t');
      expect(handleChange).toHaveBeenCalledWith('e');
      expect(handleChange).toHaveBeenCalledWith('s');
    });

    it('should update input value', async () => {
      const { rerender } = renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}}
        />
      );
      
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSearch 
            value="updated" 
            onChange={() => {}}
          />
        </ThemeProvider>
      );
      
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('updated');
    });

    it('should not call onChange when disabled', async () => {
      const handleChange = jest.fn();
      renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={handleChange}
          disabled={true}
        />
      );
      
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });
      
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Search Functionality', () => {
    it('should call onSearch when search button is clicked', () => {
      const handleSearch = jest.fn();
      renderWithTheme(
        <RdsSearch 
          value="search term" 
          onChange={() => {}}
          onSearch={handleSearch}
        />
      );
      
      const searchButtons = screen.getAllByLabelText('search');
      fireEvent.click(searchButtons[0]);
      
      expect(handleSearch).toHaveBeenCalledWith('search term');
    });

    it('should call onSearch when Enter key is pressed', () => {
      const handleSearch = jest.fn();
      renderWithTheme(
        <RdsSearch 
          value="search term" 
          onChange={() => {}}
          onSearch={handleSearch}
        />
      );
      
      const input = screen.getByRole('textbox');
      fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
      
      expect(handleSearch).toHaveBeenCalledWith('search term');
    });

    it('should not call onSearch for other key presses', () => {
      const handleSearch = jest.fn();
      renderWithTheme(
        <RdsSearch 
          value="search term" 
          onChange={() => {}}
          onSearch={handleSearch}
        />
      );
      
      const input = screen.getByRole('textbox');
      fireEvent.keyPress(input, { key: 'a', code: 'KeyA', charCode: 97 });
      
      expect(handleSearch).not.toHaveBeenCalled();
    });

    it('should not call onSearch when disabled', () => {
      const handleSearch = jest.fn();
      renderWithTheme(
        <RdsSearch 
          value="search term" 
          onChange={() => {}}
          onSearch={handleSearch}
          disabled={true}
        />
      );
      
      const searchButtons = screen.queryAllByLabelText('search');
      if (searchButtons.length > 0) {
        fireEvent.click(searchButtons[0]);
      }
      
      expect(handleSearch).not.toHaveBeenCalled();
    });
  });

  describe('Clear Functionality', () => {
    it('should call onClear when clear button is clicked', () => {
      const handleClear = jest.fn();
      const handleChange = jest.fn();
      renderWithTheme(
        <RdsSearch 
          value="text" 
          onChange={handleChange}
          onClear={handleClear}
          showClearButton={true}
          iconPosition="right"
        />
      );
      
      const clearButton = screen.getByLabelText('clear');
      fireEvent.click(clearButton);
      
      expect(handleChange).toHaveBeenCalledWith('');
      expect(handleClear).toHaveBeenCalled();
    });

    it('should clear input value', () => {
      const handleChange = jest.fn();
      const { rerender } = renderWithTheme(
        <RdsSearch 
          value="text" 
          onChange={handleChange}
          showClearButton={true}
          iconPosition="right"
        />
      );
      
      const clearButton = screen.getByLabelText('clear');
      fireEvent.click(clearButton);
      
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSearch 
            value="" 
            onChange={handleChange}
            showClearButton={true}
            iconPosition="right"
          />
        </ThemeProvider>
      );
      
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('should not call onClear when disabled', () => {
      const handleClear = jest.fn();
      renderWithTheme(
        <RdsSearch 
          value="text" 
          onChange={() => {}}
          onClear={handleClear}
          showClearButton={true}
          iconPosition="right"
          disabled={true}
        />
      );
      
      const clearButtons = screen.queryAllByLabelText('clear');
      clearButtons.forEach(btn => fireEvent.click(btn));
      
      expect(handleClear).not.toHaveBeenCalled();
    });
  });

  describe('Auto Search', () => {
    it('should trigger onSearch automatically with delay', async () => {
      const handleSearch = jest.fn();
      renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}}
          onSearch={handleSearch}
          autoSearch={true}
          searchDelay={100}
        />
      );
      
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });
      
      await waitFor(() => {
        expect(handleSearch).toHaveBeenCalledWith('test');
      }, { timeout: 200 });
    });

    it('should not trigger onSearch immediately', async () => {
      const handleSearch = jest.fn();
      renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}}
          onSearch={handleSearch}
          autoSearch={true}
          searchDelay={200}
        />
      );
      
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });
      
      expect(handleSearch).not.toHaveBeenCalled();
    });

    it('should debounce multiple rapid changes', async () => {
      const handleSearch = jest.fn();
      renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}}
          onSearch={handleSearch}
          autoSearch={true}
          searchDelay={100}
        />
      );
      
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 't' } });
      fireEvent.change(input, { target: { value: 'te' } });
      fireEvent.change(input, { target: { value: 'tes' } });
      fireEvent.change(input, { target: { value: 'test' } });
      
      await waitFor(() => {
        expect(handleSearch).toHaveBeenCalledTimes(1);
        expect(handleSearch).toHaveBeenCalledWith('test');
      }, { timeout: 200 });
    });

    it('should not call onSearch when autoSearch is false', async () => {
      const handleSearch = jest.fn();
      renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}}
          onSearch={handleSearch}
          autoSearch={false}
        />
      );
      
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });
      
      await new Promise(resolve => setTimeout(resolve, 400));
      
      expect(handleSearch).not.toHaveBeenCalled();
    });
  });

  describe('Full Width', () => {
    it('should apply fullWidth class', () => {
      const { container } = renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}}
          fullWidth={true}
        />
      );
      expect(container.querySelector('.rds-search--fullWidth')).toBeInTheDocument();
    });

    it('should not apply fullWidth class when false', () => {
      const { container } = renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}}
          fullWidth={false}
        />
      );
      const fullWidthElement = container.querySelector('.rds-search--fullWidth');
      expect(fullWidthElement).not.toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should disable input when disabled prop is true', () => {
      renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}}
          disabled={true}
        />
      );
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });

    it('should disable all buttons when disabled', () => {
      renderWithTheme(
        <RdsSearch 
          value="text" 
          onChange={() => {}}
          disabled={true}
          showClearButton={true}
        />
      );
      
      const buttons = screen.queryAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('disabled');
      });
    });

    it('should not disable input when disabled is false', () => {
      renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}}
          disabled={false}
        />
      );
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.disabled).toBe(false);
    });
  });

  describe('Theme Integration', () => {
    it('should work with light theme', () => {
      const lightTheme = createTheme({ palette: { mode: 'light' } });
      const { container } = render(
        <ThemeProvider theme={lightTheme}>
          <RdsSearch value="" onChange={() => {}} />
        </ThemeProvider>
      );
      expect(container.querySelector('.rds-search')).toBeInTheDocument();
    });

    it('should work with dark theme', () => {
      const darkTheme = createTheme({ palette: { mode: 'dark' } });
      const { container } = render(
        <ThemeProvider theme={darkTheme}>
          <RdsSearch value="" onChange={() => {}} />
        </ThemeProvider>
      );
      expect(container.querySelector('.rds-search')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible search button', () => {
      renderWithTheme(
        <RdsSearch 
          value="test" 
          onChange={() => {}}
        />
      );
      const searchButton = screen.getByLabelText('search');
      expect(searchButton).toBeInTheDocument();
  
    });
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsSearch />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have accessible clear button', () => {
      renderWithTheme(
        <RdsSearch 
          value="test" 
          onChange={() => {}}
          showClearButton={true}
          iconPosition="right"
        />
      );
      const clearButton = screen.getByLabelText('clear');
      expect(clearButton).toBeInTheDocument();
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}}
        />
      );
      
      const input = screen.getByRole('textbox');
      await user.tab(); // Focus on search button
      await user.tab(); // Move to input
      expect(input).toHaveFocus();
    });

    it('should have proper label association', () => {
      renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}}
          label="Search Query"
        />
      );
      expect(screen.getByText('Search Query')).toBeInTheDocument();
    });

    it('should support placeholder for accessibility', () => {
      renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}}
          placeholder="Enter search term"
        />
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('placeholder', 'Enter search term');
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle rapid value changes', () => {
      const { rerender } = renderWithTheme(
        <RdsSearch value="" onChange={() => {}} />
      );

      for (let i = 1; i <= 5; i++) {
        rerender(
          <ThemeProvider theme={createTheme()}>
            <RdsSearch value={`search${i}`} onChange={() => {}} />
          </ThemeProvider>
        );
      }

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('search5');
    });

    it('should handle label position change', () => {
      const { container, rerender } = renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}}
          label="Search"
          labelPosition="top"
        />
      );

      expect(container.querySelector('.rds-search--column')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSearch 
            value="" 
            onChange={() => {}}
            label="Search"
            labelPosition="left"
          />
        </ThemeProvider>
      );

      expect(container.querySelector('.rds-search--row')).toBeInTheDocument();
    });

    it('should handle icon position change', () => {
      const { container, rerender } = renderWithTheme(
        <RdsSearch 
          value="test" 
          onChange={() => {}}
          iconPosition="left"
        />
      );

      expect(container.querySelector('.rds-search')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSearch 
            value="test" 
            onChange={() => {}}
            iconPosition="right"
          />
        </ThemeProvider>
      );

      expect(container.querySelector('.rds-search')).toBeInTheDocument();
    });

    it('should handle disabled state toggle', () => {
      const { container, rerender } = renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}}
          disabled={false}
        />
      );

      let input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.disabled).toBe(false);

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsSearch 
            value="" 
            onChange={() => {}}
            disabled={true}
          />
        </ThemeProvider>
      );

      input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });

    it('should handle multiple icon and button configurations', () => {
      renderWithTheme(
        <RdsSearch 
          value="text" 
          onChange={() => {}}
          showSearchIcon={true}
          showClearButton={true}
          iconPosition="right"
        />
      );

      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should handle auto-search and manual search together', async () => {
      const handleSearch = jest.fn();
      renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}}
          onSearch={handleSearch}
          autoSearch={true}
          searchDelay={100}
        />
      );

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });

      const searchButtons = screen.getAllByLabelText('search');
      fireEvent.click(searchButtons[0]);

      await waitFor(() => {
        expect(handleSearch).toHaveBeenCalledWith('test');
      }, { timeout: 200 });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty value', () => {
      renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}}
        />
      );
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('');
    });

    it('should handle very long search term', () => {
      const longTerm = 'a'.repeat(1000);
      renderWithTheme(
        <RdsSearch 
          value={longTerm} 
          onChange={() => {}}
        />
      );
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe(longTerm);
    });

    it('should handle special characters in search term', () => {
      const specialTerm = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      renderWithTheme(
        <RdsSearch 
          value={specialTerm} 
          onChange={() => {}}
        />
      );
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe(specialTerm);
    });

    it('should handle unicode characters', () => {
      const unicodeTerm = '你好世界 🌍';
      renderWithTheme(
        <RdsSearch 
          value={unicodeTerm} 
          onChange={() => {}}
        />
      );
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe(unicodeTerm);
    });

    it('should handle zero searchDelay', async () => {
      const handleSearch = jest.fn();
      renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}}
          onSearch={handleSearch}
          autoSearch={true}
          searchDelay={0}
        />
      );

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });

      await waitFor(() => {
        expect(handleSearch).toHaveBeenCalledWith('test');
      }, { timeout: 100 });
    });

    it('should handle large searchDelay', async () => {
      const handleSearch = jest.fn();
      jest.useFakeTimers();
      
      renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}}
          onSearch={handleSearch}
          autoSearch={true}
          searchDelay={5000}
        />
      );

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'test' } });

      expect(handleSearch).not.toHaveBeenCalled();

      jest.runAllTimers();
      jest.useRealTimers();
    });

    it('should handle undefined onSearch', () => {
      renderWithTheme(
        <RdsSearch 
          value="" 
          onChange={() => {}}
          onSearch={undefined}
        />
      );

      const input = screen.getByRole('textbox');
      fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

      expect(input).toBeInTheDocument();
    });

    it('should handle undefined onClear', () => {
      renderWithTheme(
        <RdsSearch 
          value="text" 
          onChange={() => {}}
          onClear={undefined}
          showClearButton={true}
          iconPosition="right"
        />
      );

      const clearButton = screen.getByLabelText('clear');
      fireEvent.click(clearButton);

      expect(clearButton).toBeInTheDocument();
    });
  });

  describe('Display Name', () => {
    it('should have correct displayName', () => {
      expect(RdsSearch.displayName).toBe('RdsSearch');
    });
  });
});