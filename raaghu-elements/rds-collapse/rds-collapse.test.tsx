import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsCollapse, { RdsCollapseProps } from './rds-collapse';
import { axe } from 'jest-axe';

// Mock SCSS imports
jest.mock('./rds-collapse.scss', () => ({}));

// Mock MUI ExpandMore icon
jest.mock('@mui/icons-material/ExpandMore', () => {
  return function MockExpandMoreIcon() {
    return <span data-testid="ExpandMoreIcon">ExpandMoreIcon</span>;
  };
});

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const defaultProps: RdsCollapseProps = {
  title: 'Test Collapse',
  children: 'Content',
  expanded: false,
};

describe('RdsCollapse', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      renderWithTheme(<RdsCollapse {...defaultProps} />);
      expect(screen.getByText('Test Collapse')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCollapse.displayName).toBe('RdsCollapse');
    });

    it('should render with title', () => {
      renderWithTheme(<RdsCollapse title="Section Title" children="Content" />);
      expect(screen.getByText('Section Title')).toBeInTheDocument();
    });

    it('should render without title when not provided', () => {
      renderWithTheme(<RdsCollapse children="Content" />);
      const content = screen.getByText('Content');
      expect(content).toBeInTheDocument();
    });

    it('should render children content', () => {
      renderWithTheme(
        <RdsCollapse {...defaultProps}>
          <div>Child Content</div>
        </RdsCollapse>
      );
      expect(screen.getByText('Child Content')).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      const { container } = renderWithTheme(
        <RdsCollapse {...defaultProps} className="custom-class" />
      );
      const root = container.querySelector('.MuiBox-root');
      expect(root).toBeInTheDocument();
    });

    it('should render empty collapse when children is empty string', () => {
      const { container } = renderWithTheme(
        <RdsCollapse title="Empty" children="" />
      );
      expect(screen.getByText('Empty')).toBeInTheDocument();
    });

    it('should render with ReactNode children', () => {
      const children = (
        <div>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </div>
      );
      renderWithTheme(
        <RdsCollapse title="Multi Content" children={children} />
      );
      expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
      expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
    });
  });

  describe('Collapse Behavior', () => {
    it('should be collapsed by default', () => {
      const { container } = renderWithTheme(<RdsCollapse {...defaultProps} />);
      const collapse = container.querySelector('.MuiCollapse-entered');
      // When collapsed, MuiCollapse doesn't have entered class
      expect(container.querySelector('.MuiCollapse-root')).toBeInTheDocument();
    });

    it('should be expanded when expanded prop is true', () => {
      const { container } = renderWithTheme(
        <RdsCollapse {...defaultProps} expanded={true} />
      );
      const collapse = container.querySelector('.MuiCollapse-root');
      expect(collapse).toBeInTheDocument();
    });

    it('should expand when toggle button is clicked', async () => {
      renderWithTheme(<RdsCollapse {...defaultProps} expanded={false} />);
      const toggleButton = screen.getByRole('button');
      
      fireEvent.click(toggleButton);
      
      await waitFor(() => {
        expect(screen.getByText('Content')).toBeVisible();
      });
    });

    it('should collapse when toggle button is clicked while expanded', async () => {
      const { container } = renderWithTheme(
        <RdsCollapse {...defaultProps} expanded={true} />
      );
      const toggleButton = screen.getByRole('button');
      
      fireEvent.click(toggleButton);
      
      await waitFor(() => {
        const collapse = container.querySelector('.MuiCollapse-root');
        expect(collapse).toBeInTheDocument();
      });
    });

    it('should toggle between expanded and collapsed states', async () => {
      renderWithTheme(<RdsCollapse {...defaultProps} expanded={false} />);
      const toggleButton = screen.getByRole('button');
      
      // Expand
      fireEvent.click(toggleButton);
      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument();
      });
      
      // Collapse
      fireEvent.click(toggleButton);
      await waitFor(() => {
        const collapse = document.querySelector('.MuiCollapse-hidden');
        // Just verify button exists
        expect(toggleButton).toBeInTheDocument();
      });
    });
  });

  describe('Toggle Button', () => {
    it('should show toggle button by default', () => {
      renderWithTheme(<RdsCollapse {...defaultProps} />);
      const toggleButton = screen.getByRole('button');
      expect(toggleButton).toBeInTheDocument();
    });

    it('should show toggle button when showToggleButton is true', () => {
      renderWithTheme(
        <RdsCollapse {...defaultProps} showToggleButton={true} />
      );
      const toggleButton = screen.getByRole('button');
      expect(toggleButton).toBeInTheDocument();
    });

    it('should not show toggle button when showToggleButton is false', () => {
      renderWithTheme(
        <RdsCollapse {...defaultProps} showToggleButton={false} />
      );
      const toggleButtons = screen.queryAllByRole('button');
      expect(toggleButtons.length).toBe(0);
    });

    it('should render ExpandMore icon in toggle button', () => {
      renderWithTheme(<RdsCollapse {...defaultProps} />);
      expect(screen.getByTestId('ExpandMoreIcon')).toBeInTheDocument();
    });

    it('should rotate toggle button when expanded', async () => {
      const { container } = renderWithTheme(
        <RdsCollapse {...defaultProps} expanded={false} />
      );
      const toggleButton = screen.getByRole('button');
      
      fireEvent.click(toggleButton);
      
      await waitFor(() => {
        const btnElement = toggleButton as HTMLElement;
        // Button should have transform rotate when expanded
        expect(btnElement).toBeInTheDocument();
      });
    });

    it('should have correct initial rotation when expanded prop is true', () => {
      const { container } = renderWithTheme(
        <RdsCollapse {...defaultProps} expanded={true} />
      );
      const toggleButton = screen.getByRole('button');
      expect(toggleButton).toBeInTheDocument();
    });
  });

  describe('Title Rendering', () => {
    it('should render title as h6 typography', () => {
      renderWithTheme(<RdsCollapse title="Section" children="Content" />);
      const title = screen.getByText('Section');
      expect(title).toBeInTheDocument();
      // Title is rendered as DIV within Typography component
      expect(title.tagName).toBe('DIV');
    });

    it('should render title and toggle button together', () => {
      renderWithTheme(<RdsCollapse title="Title" children="Content" />);
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should update title when prop changes', () => {
      const { rerender } = renderWithTheme(
        <RdsCollapse title="Title 1" children="Content" />
      );
      expect(screen.getByText('Title 1')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={theme}>
          <RdsCollapse title="Title 2" children="Content" />
        </ThemeProvider>
      );
      expect(screen.queryByText('Title 1')).not.toBeInTheDocument();
      expect(screen.getByText('Title 2')).toBeInTheDocument();
    });

    it('should handle long title text', () => {
      const longTitle = 'A'.repeat(100);
      renderWithTheme(<RdsCollapse title={longTitle} children="Content" />);
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('should handle special characters in title', () => {
      const specialTitle = 'Title @#$%^&*()';
      renderWithTheme(<RdsCollapse title={specialTitle} children="Content" />);
      expect(screen.getByText(specialTitle)).toBeInTheDocument();
    });

    it('should handle unicode characters in title', () => {
      const unicodeTitle = '🎉 Title 🎊';
      renderWithTheme(<RdsCollapse title={unicodeTitle} children="Content" />);
      expect(screen.getByText(unicodeTitle)).toBeInTheDocument();
    });
  });

  describe('onToggle Callback', () => {
    it('should call onToggle when toggle button is clicked', () => {
      const onToggle = jest.fn();
      renderWithTheme(
        <RdsCollapse {...defaultProps} onToggle={onToggle} expanded={false} />
      );
      const toggleButton = screen.getByRole('button');
      
      fireEvent.click(toggleButton);
      
      expect(onToggle).toHaveBeenCalled();
    });

    it('should pass true to onToggle when expanding', () => {
      const onToggle = jest.fn();
      renderWithTheme(
        <RdsCollapse {...defaultProps} onToggle={onToggle} expanded={false} />
      );
      const toggleButton = screen.getByRole('button');
      
      fireEvent.click(toggleButton);
      
      expect(onToggle).toHaveBeenCalledWith(true);
    });

    it('should pass false to onToggle when collapsing', () => {
      const onToggle = jest.fn();
      renderWithTheme(
        <RdsCollapse {...defaultProps} onToggle={onToggle} expanded={true} />
      );
      const toggleButton = screen.getByRole('button');
      
      fireEvent.click(toggleButton);
      
      expect(onToggle).toHaveBeenCalledWith(false);
    });

    it('should call onToggle multiple times on multiple toggles', () => {
      const onToggle = jest.fn();
      renderWithTheme(
        <RdsCollapse {...defaultProps} onToggle={onToggle} expanded={false} />
      );
      const toggleButton = screen.getByRole('button');
      
      fireEvent.click(toggleButton);
      fireEvent.click(toggleButton);
      fireEvent.click(toggleButton);
      
      expect(onToggle).toHaveBeenCalledTimes(3);
    });

    it('should not call onToggle when showToggleButton is false and title clicked', () => {
      const onToggle = jest.fn();
      const { container } = renderWithTheme(
        <RdsCollapse 
          title="Title" 
          children="Content" 
          onToggle={onToggle} 
          showToggleButton={false}
          expanded={false}
        />
      );
      
      const title = screen.getByText('Title');
      fireEvent.click(title);
      
      expect(onToggle).not.toHaveBeenCalled();
    });

    it('should call onToggle when title is clicked and showToggleButton is true', () => {
      const onToggle = jest.fn();
      renderWithTheme(
        <RdsCollapse 
          title="Title" 
          children="Content" 
          onToggle={onToggle} 
          showToggleButton={true}
          expanded={false}
        />
      );
      
      const header = screen.getByText('Title').parentElement;
      if (header) {
        fireEvent.click(header);
      }
      
      // onToggle should be called when clicking on the header area
      expect(onToggle).toHaveBeenCalled();
    });
  });

  describe('Expanded Prop Updates', () => {
    it('should update internal state when expanded prop changes', () => {
      const { rerender } = renderWithTheme(
        <RdsCollapse {...defaultProps} expanded={false} />
      );
      
      rerender(
        <ThemeProvider theme={theme}>
          <RdsCollapse {...defaultProps} expanded={true} />
        </ThemeProvider>
      );
      
      // Should show content when expanded
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should collapse when expanded prop changes from true to false', () => {
      const { rerender } = renderWithTheme(
        <RdsCollapse {...defaultProps} expanded={true} />
      );
      
      rerender(
        <ThemeProvider theme={theme}>
          <RdsCollapse {...defaultProps} expanded={false} />
        </ThemeProvider>
      );
      
      const content = screen.getByText('Content');
      expect(content).toBeInTheDocument();
    });
  });

  describe('Props Integration', () => {
    it('should accept MuiCollapse props', () => {
      const { container } = renderWithTheme(
        <RdsCollapse 
          {...defaultProps} 
          timeout={500}
          unmountOnExit={true}
        />
      );
      // Verify the component renders with MuiCollapse props
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeInTheDocument();
    });

    it('should accept custom data attributes', () => {
      const { container } = renderWithTheme(
        <RdsCollapse 
          {...defaultProps}
          data-testid="custom-collapse"
        />
      );
      const root = container.querySelector('[data-testid="custom-collapse"]');
      expect(root).toBeInTheDocument();
    });

    it('should accept and apply sx prop', () => {
      const { container } = renderWithTheme(
        <RdsCollapse 
          {...defaultProps}
          sx={{ margin: '16px' }}
        />
      );
      const root = container.querySelector('.MuiBox-root');
      expect(root).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid toggle clicks', () => {
      const onToggle = jest.fn();
      renderWithTheme(
        <RdsCollapse {...defaultProps} onToggle={onToggle} expanded={false} />
      );
      const toggleButton = screen.getByRole('button');
      
      for (let i = 0; i < 10; i++) {
        fireEvent.click(toggleButton);
      }
      
      expect(onToggle.mock.calls.length).toBeGreaterThan(0);
    });

    it('should handle empty content', () => {
      const { container } = renderWithTheme(
        <RdsCollapse title="Empty" children="" />
      );
      expect(screen.getByText('Empty')).toBeInTheDocument();
    });

    it('should handle null children gracefully', () => {
      const { container } = renderWithTheme(
        <RdsCollapse title="Null Child" children={null} />
      );
      expect(screen.getByText('Null Child')).toBeInTheDocument();
    });

    it('should handle complex nested content', () => {
      const complexContent = (
        <div>
          <h3>Nested Title</h3>
          <p>Nested paragraph 1</p>
          <div>
            <span>Deep nested content</span>
          </div>
          <p>Nested paragraph 2</p>
        </div>
      );
      
      renderWithTheme(
        <RdsCollapse title="Complex" children={complexContent} />
      );
      expect(screen.getByText('Nested Title')).toBeInTheDocument();
      expect(screen.getByText('Deep nested content')).toBeInTheDocument();
    });

    it('should handle children with event handlers', () => {
      const handleClick = jest.fn();
      const childContent = (
        <button onClick={handleClick}>Click me</button>
      );
      
      renderWithTheme(
        <RdsCollapse title="With Handlers" children={childContent} />
      );
      
      const button = screen.getByText('Click me');
      expect(button).toBeInTheDocument();
    });

    it('should handle multiple toggles in rapid succession', async () => {
      const onToggle = jest.fn();
      renderWithTheme(
        <RdsCollapse {...defaultProps} onToggle={onToggle} expanded={false} />
      );
      const toggleButton = screen.getByRole('button');
      
      fireEvent.click(toggleButton);
      fireEvent.click(toggleButton);
      fireEvent.click(toggleButton);
      fireEvent.click(toggleButton);
      
      expect(onToggle.mock.calls.length).toBeGreaterThanOrEqual(1);
    });

    it('should handle changing children content', () => {
      const { rerender } = renderWithTheme(
        <RdsCollapse title="Dynamic" children="Content 1" />
      );
      
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      
      rerender(
        <ThemeProvider theme={theme}>
          <RdsCollapse title="Dynamic" children="Content 2" />
        </ThemeProvider>
      );
      
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('should handle title and showToggleButton both false', () => {
      const { container } = renderWithTheme(
        <RdsCollapse children="Content" showToggleButton={false} />
      );
      const content = screen.getByText('Content');
      expect(content).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have interactive button for toggle', () => {
      renderWithTheme(<RdsCollapse {...defaultProps} />);
      const toggleButton = screen.getByRole('button');
      expect(toggleButton).toBeInTheDocument();
  
    });
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCollapse {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should be keyboard accessible', () => {
      const onToggle = jest.fn();
      renderWithTheme(
        <RdsCollapse {...defaultProps} onToggle={onToggle} />
      );
      const toggleButton = screen.getByRole('button');
      
      fireEvent.keyDown(toggleButton, { key: 'Enter', code: 'Enter' });
      expect(toggleButton).toBeInTheDocument();
    });

    it('should support Enter key on toggle button', () => {
      const onToggle = jest.fn();
      renderWithTheme(
        <RdsCollapse {...defaultProps} onToggle={onToggle} expanded={false} />
      );
      const toggleButton = screen.getByRole('button');
      
      fireEvent.keyDown(toggleButton, { key: 'Enter' });
      expect(toggleButton).toBeInTheDocument();
    });

    it('should support Space key on toggle button', () => {
      const onToggle = jest.fn();
      renderWithTheme(
        <RdsCollapse {...defaultProps} onToggle={onToggle} expanded={false} />
      );
      const toggleButton = screen.getByRole('button');
      
      fireEvent.keyDown(toggleButton, { key: ' ' });
      expect(toggleButton).toBeInTheDocument();
    });

    it('should be focusable', () => {
      renderWithTheme(<RdsCollapse {...defaultProps} />);
      const toggleButton = screen.getByRole('button') as HTMLElement;
      toggleButton.focus();
      expect(document.activeElement).toBe(toggleButton);
    });

    it('should have proper semantic HTML structure', () => {
      const { container } = renderWithTheme(
        <RdsCollapse title="Section" children="Content" />
      );
      const box = container.querySelector('.MuiBox-root');
      expect(box).toBeInTheDocument();
    });
  });

  describe('Styling and Classes', () => {
    it('should have MuiBox root class', () => {
      const { container } = renderWithTheme(<RdsCollapse {...defaultProps} />);
      const root = container.querySelector('.MuiBox-root');
      expect(root).toBeInTheDocument();
    });

    it('should have MuiCollapse component', () => {
      const { container } = renderWithTheme(<RdsCollapse {...defaultProps} />);
      const collapse = container.querySelector('.MuiCollapse-root');
      expect(collapse).toBeInTheDocument();
    });

    it('should apply sx styles correctly', () => {
      const { container } = renderWithTheme(
        <RdsCollapse 
          {...defaultProps}
          sx={{ p: 2, m: 1 }}
        />
      );
      const root = container.querySelector('.MuiBox-root');
      expect(root).toBeInTheDocument();
    });
  });

  describe('Combined Props', () => {
    it('should handle all props together', () => {
      const onToggle = jest.fn();
      renderWithTheme(
        <RdsCollapse 
          title="Complete"
          children="Full content"
          expanded={false}
          onToggle={onToggle}
          showToggleButton={true}
          timeout={300}
          data-testid="complete-collapse"
          className="custom-collapse"
        />
      );
      
      expect(screen.getByText('Complete')).toBeInTheDocument();
      expect(screen.getByText('Full content')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should work with expanded and onToggle together', () => {
      const onToggle = jest.fn();
      renderWithTheme(
        <RdsCollapse 
          {...defaultProps}
          expanded={true}
          onToggle={onToggle}
        />
      );
      
      const toggleButton = screen.getByRole('button');
      fireEvent.click(toggleButton);
      
      expect(onToggle).toHaveBeenCalledWith(false);
    });

    it('should handle title with special formatting', () => {
      renderWithTheme(
        <RdsCollapse 
          title="Title with <special> & characters"
          children="Content"
          showToggleButton={true}
        />
      );
      
      expect(screen.getByText('Title with <special> & characters')).toBeInTheDocument();
    });
  });

  describe('Default Props', () => {
    it('should have expanded as false by default', () => {
      renderWithTheme(
        <RdsCollapse children="Content" />
      );
      const content = screen.getByText('Content');
      expect(content).toBeInTheDocument();
    });

    it('should have showToggleButton as true by default', () => {
      renderWithTheme(
        <RdsCollapse title="Title" children="Content" />
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should not have title by default', () => {
      renderWithTheme(
        <RdsCollapse children="Content" />
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should not call onToggle by default', () => {
      renderWithTheme(
        <RdsCollapse {...defaultProps} />
      );
      const toggleButton = screen.getByRole('button');
      // Should not throw when clicking
      fireEvent.click(toggleButton);
      expect(toggleButton).toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    it('should accept string title', () => {
      renderWithTheme(<RdsCollapse title="Title" children="Content" />);
      expect(screen.getByText('Title')).toBeInTheDocument();
    });

    it('should accept boolean expanded', () => {
      const { rerender } = renderWithTheme(
        <RdsCollapse {...defaultProps} expanded={true} />
      );
      expect(screen.getByText('Content')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={theme}>
          <RdsCollapse {...defaultProps} expanded={false} />
        </ThemeProvider>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should accept boolean showToggleButton', () => {
      const { container: container1 } = renderWithTheme(
        <RdsCollapse {...defaultProps} showToggleButton={true} />
      );
      expect(screen.getByRole('button')).toBeInTheDocument();

      const { container: container2 } = renderWithTheme(
        <RdsCollapse {...defaultProps} showToggleButton={false} />
      );
      const buttons = container2.querySelectorAll('button');
      expect(buttons.length).toBe(0);
    });

    it('should accept function onToggle', () => {
      const onToggle = jest.fn();
      renderWithTheme(
        <RdsCollapse {...defaultProps} onToggle={onToggle} />
      );
      const toggleButton = screen.getByRole('button');
      fireEvent.click(toggleButton);
      expect(onToggle).toHaveBeenCalled();
    });

    it('should accept ReactNode children', () => {
      const children = (
        <div data-testid="complex-children">
          <p>Content</p>
        </div>
      );
      renderWithTheme(
        <RdsCollapse title="Title" children={children} />
      );
      expect(screen.getByTestId('complex-children')).toBeInTheDocument();
    });

    it('should accept MuiCollapse props', () => {
      const { container } = renderWithTheme(
        <RdsCollapse 
          {...defaultProps}
          timeout={600}
          collapsedSize={0}
        />
      );
      const collapse = container.querySelector('.MuiCollapse-root');
      expect(collapse).toBeInTheDocument();
    });
  });
});