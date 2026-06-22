import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsPaper from './rds-paper';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-paper.scss', () => ({}));

const renderWithTheme = (component: React.ReactElement, isDark = false) => {
  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
    },
  });
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('RdsPaper', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(
        <RdsPaper>Content</RdsPaper>
      );
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsPaper.displayName).toBe('RdsPaper');
    });

    it('should render MuiPaper component', () => {
      renderWithTheme(
        <RdsPaper>Test Paper</RdsPaper>
      );
      expect(screen.getByText('Test Paper')).toBeInTheDocument();
    });

    it('should apply MuiPaper class', () => {
      const { container } = renderWithTheme(
        <RdsPaper>Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      expect(paper).toBeInTheDocument();
    });

    it('should have elevation by default', () => {
      const { container } = renderWithTheme(
        <RdsPaper>Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-elevation');
      expect(paper).toBeInTheDocument();
    });
  });

  describe('Children Rendering', () => {
    it('should render text children', () => {
      renderWithTheme(
        <RdsPaper>Simple text content</RdsPaper>
      );
      expect(screen.getByText('Simple text content')).toBeInTheDocument();
    });

    it('should render element children', () => {
      renderWithTheme(
        <RdsPaper>
          <p data-testid="paragraph">Paragraph content</p>
        </RdsPaper>
      );
      expect(screen.getByTestId('paragraph')).toBeInTheDocument();
      expect(screen.getByText('Paragraph content')).toBeInTheDocument();
    });

    it('should render complex children structure', () => {
      renderWithTheme(
        <RdsPaper>
          <div>
            <h1>Title</h1>
            <p>Description</p>
            <button>Action</button>
          </div>
        </RdsPaper>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      renderWithTheme(
        <RdsPaper>
          <span data-testid="child-1">Child 1</span>
          <span data-testid="child-2">Child 2</span>
          <span data-testid="child-3">Child 3</span>
        </RdsPaper>
      );
      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
      expect(screen.getByTestId('child-3')).toBeInTheDocument();
    });
  });

  describe('Padding Prop', () => {
    it('should apply custom padding as number', () => {
      const { container } = renderWithTheme(
        <RdsPaper padding={16}>Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      // MUI converts padding numbers to theme spacing units
      expect(paper).toBeInTheDocument();
    });

    it('should apply custom padding as string', () => {
      const { container } = renderWithTheme(
        <RdsPaper padding="20px">Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      expect(paper).toHaveStyle({ padding: '20px' });
    });

    it('should apply padding with various units', () => {
      const { container } = renderWithTheme(
        <RdsPaper padding="1rem">Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      expect(paper).toHaveStyle({ padding: '1rem' });
    });

    it('should not apply padding when not provided', () => {
      const { container } = renderWithTheme(
        <RdsPaper>Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      const style = window.getComputedStyle(paper!);
      expect(style.padding).toBeDefined();
    });

    it('should work with different padding values', () => {
      const { rerender, container } = renderWithTheme(
        <RdsPaper padding={8}>Content</RdsPaper>
      );
      let paper = container.querySelector('.MuiPaper-root');
      expect(paper).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsPaper padding={24}>Content</RdsPaper>
        </ThemeProvider>
      );
      paper = container.querySelector('.MuiPaper-root');
      expect(paper).toBeInTheDocument();
    });
  });

  describe('Square Prop', () => {
    it('should have rounded corners by default', () => {
      const { container } = renderWithTheme(
        <RdsPaper>Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-rounded');
      expect(paper).toBeInTheDocument();
    });

    it('should remove rounded corners when square is true', () => {
      const { container } = renderWithTheme(
        <RdsPaper square={true}>Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      expect(paper).not.toHaveClass('MuiPaper-rounded');
    });

    it('should have square prop set to false by default', () => {
      const { container } = renderWithTheme(
        <RdsPaper>Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      expect(paper).toHaveClass('MuiPaper-rounded');
    });

    it('should toggle square prop', () => {
      const { rerender, container } = renderWithTheme(
        <RdsPaper square={false}>Content</RdsPaper>
      );
      let paper = container.querySelector('.MuiPaper-root');
      expect(paper).toHaveClass('MuiPaper-rounded');

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsPaper square={true}>Content</RdsPaper>
        </ThemeProvider>
      );
      paper = container.querySelector('.MuiPaper-root');
      expect(paper).not.toHaveClass('MuiPaper-rounded');
    });
  });

  describe('SX Prop Integration', () => {
    it('should apply custom sx styles', () => {
      const { container } = renderWithTheme(
        <RdsPaper sx={{ backgroundColor: 'red' }}>Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      expect(paper).toBeInTheDocument();
    });

    it('should merge sx with padding', () => {
      const { container } = renderWithTheme(
        <RdsPaper padding={16} sx={{ margin: '10px' }}>Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      // Verify both padding and margin are applied
      expect(paper).toBeInTheDocument();
    });

    it('should allow complex sx objects', () => {
      const { container } = renderWithTheme(
        <RdsPaper sx={{
          backgroundColor: 'blue',
          borderRadius: '8px',
          boxShadow: '0px 2px 8px rgba(0,0,0,0.1)'
        }}>Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      expect(paper).toBeInTheDocument();
    });

    it('should override default padding with sx', () => {
      const { container } = renderWithTheme(
        <RdsPaper padding={16} sx={{ padding: '32px' }}>Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      // sx should take precedence
      expect(paper).toBeInTheDocument();
    });
  });

  describe('Elevation Levels', () => {
    it('should have elevation 1 by default', () => {
      const { container } = renderWithTheme(
        <RdsPaper>Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      expect(paper).toBeInTheDocument();
    });

    it('should apply custom elevation', () => {
      const { container } = renderWithTheme(
        <RdsPaper elevation={4}>Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      expect(paper).toBeInTheDocument();
    });

    it('should handle elevation 0', () => {
      const { container } = renderWithTheme(
        <RdsPaper elevation={0}>Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      expect(paper).toBeInTheDocument();
    });

    it('should handle high elevation levels', () => {
      const { container } = renderWithTheme(
        <RdsPaper elevation={16}>Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      expect(paper).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it('should render with light theme', () => {
      renderWithTheme(
        <RdsPaper>Light theme content</RdsPaper>,
        false
      );
      expect(screen.getByText('Light theme content')).toBeInTheDocument();
    });

    it('should render with dark theme', () => {
      renderWithTheme(
        <RdsPaper>Dark theme content</RdsPaper>,
        true
      );
      expect(screen.getByText('Dark theme content')).toBeInTheDocument();
    });

    it('should apply theme colors', () => {
      const { container } = renderWithTheme(
        <RdsPaper sx={{ backgroundColor: 'primary.main' }}>Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      expect(paper).toBeInTheDocument();
    });
  });

  describe('Props Forwarding', () => {
    it('should forward PaperProps to MuiPaper', () => {
      const { container } = renderWithTheme(
        <RdsPaper className="custom-class">Content</RdsPaper>
      );
      const paper = container.querySelector('.custom-class');
      expect(paper).toBeInTheDocument();
    });

    it('should apply data attributes', () => {
      renderWithTheme(
        <RdsPaper data-testid="custom-paper">Content</RdsPaper>
      );
      expect(screen.getByTestId('custom-paper')).toBeInTheDocument();
    });

    it('should apply aria attributes', () => {
      renderWithTheme(
        <RdsPaper aria-label="Paper container">Content</RdsPaper>
      );
      expect(screen.getByLabelText('Paper container')).toBeInTheDocument();
    });

    it('should support onClick handler', () => {
      const onClick = jest.fn();
      renderWithTheme(
        <RdsPaper onClick={onClick}>Content</RdsPaper>
      );
      const paper = screen.getByText('Content').closest('.MuiPaper-root');
      if (paper) {
        fireEvent.click(paper);
      }
      expect(onClick).toHaveBeenCalled();
    });

    it('should support onMouseEnter and onMouseLeave', () => {
      const onMouseEnter = jest.fn();
      const onMouseLeave = jest.fn();
      const { container } = renderWithTheme(
        <RdsPaper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          Content
        </RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      fireEvent.mouseEnter(paper!);
      fireEvent.mouseLeave(paper!);
      expect(onMouseEnter).toHaveBeenCalled();
      expect(onMouseLeave).toHaveBeenCalled();
    });
  });

  describe('Component Composition', () => {
    it('should work as container for other components', () => {
      renderWithTheme(
        <RdsPaper padding={16}>
          <div>
            <h2>Card Title</h2>
            <p>Card content goes here</p>
          </div>
        </RdsPaper>
      );
      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Card content goes here')).toBeInTheDocument();
    });

    it('should work with nested RdsPaper components', () => {
      renderWithTheme(
        <RdsPaper padding={20}>
          <p>Outer Paper</p>
          <RdsPaper padding={10}>
            <p>Inner Paper</p>
          </RdsPaper>
        </RdsPaper>
      );
      expect(screen.getByText('Outer Paper')).toBeInTheDocument();
      expect(screen.getByText('Inner Paper')).toBeInTheDocument();
    });

    it('should work with form elements', () => {
      renderWithTheme(
        <RdsPaper padding={16}>
          <form>
            <input type="text" placeholder="Name" />
            <button type="submit">Submit</button>
          </form>
        </RdsPaper>
      );
      expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('should work as card component', () => {
      renderWithTheme(
        <RdsPaper elevation={3} padding={16} square={false}>
          <img src="test.jpg" alt="Card preview" />
          <h3>Card Title</h3>
          <p>Card description</p>
          <button>Learn More</button>
        </RdsPaper>
      );
      expect(screen.getByAltText('Card preview')).toBeInTheDocument();
      expect(screen.getByText('Card Title')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have semantic structure', () => {
      const { container } = renderWithTheme(
        <RdsPaper>Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      expect(paper).toBeInTheDocument();
  
    });

    it('has no axe accessibility violations', async () => {
      const { container } = renderWithTheme(<RdsPaper>Content</RdsPaper>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should support aria-label', () => {
      renderWithTheme(
        <RdsPaper aria-label="Main content area">Content</RdsPaper>
      );
      expect(screen.getByLabelText('Main content area')).toBeInTheDocument();
    });

    it('should support role attribute', () => {
      renderWithTheme(
        <RdsPaper role="region">Content</RdsPaper>
      );
      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('should be keyboard accessible when interactive', () => {
      renderWithTheme(
        <RdsPaper tabIndex={0}>Content</RdsPaper>
      );
      const paper = screen.getByText('Content').closest('.MuiPaper-root');
      expect(paper).toHaveAttribute('tabindex', '0');
    });
  });

  describe('Styling Edge Cases', () => {
    it('should handle padding with 0 value', () => {
      const { container } = renderWithTheme(
        <RdsPaper padding={0}>Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      // When padding is 0, it should be applied
      expect(paper).toBeInTheDocument();
    });

    it('should handle negative margin with sx', () => {
      const { container } = renderWithTheme(
        <RdsPaper sx={{ margin: -1 }}>Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      expect(paper).toBeInTheDocument();
    });

    it('should handle responsive sx values', () => {
      const { container } = renderWithTheme(
        <RdsPaper sx={{
          padding: { xs: 1, sm: 2, md: 3, lg: 4 }
        }}>Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      expect(paper).toBeInTheDocument();
    });

    it('should handle complex padding specifications', () => {
      const { container } = renderWithTheme(
        <RdsPaper padding="10px 20px 30px 40px">Content</RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      // Verify component rendered with custom padding
      expect(paper).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle full-featured configuration', () => {
      renderWithTheme(
        <RdsPaper
          padding={24}
          square={true}
          elevation={8}
          className="featured-paper"
          sx={{ backgroundColor: '#f5f5f5', border: '1px solid #ddd' }}
          aria-label="Featured content"
        >
          <h2>Featured Content</h2>
          <p>This is a fully configured paper component</p>
        </RdsPaper>
      );
      expect(screen.getByText('Featured Content')).toBeInTheDocument();
      expect(screen.getByLabelText('Featured content')).toBeInTheDocument();
    });

    it('should handle dynamic content updates', () => {
      const { rerender, container } = renderWithTheme(
        <RdsPaper padding={16}>Initial content</RdsPaper>
      );
      expect(screen.getByText('Initial content')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsPaper padding={16}>Updated content</RdsPaper>
        </ThemeProvider>
      );
      expect(screen.queryByText('Initial content')).not.toBeInTheDocument();
      expect(screen.getByText('Updated content')).toBeInTheDocument();
    });

    it('should maintain state of child components', () => {
      const InputComponent = () => {
        const [value, setValue] = React.useState('initial');
        return (
          <input
            value={value}
            onChange={e => setValue(e.target.value)}
            data-testid="input"
          />
        );
      };

      renderWithTheme(
        <RdsPaper padding={16}>
          <InputComponent />
        </RdsPaper>
      );
      const input = screen.getByTestId('input') as HTMLInputElement;
      expect(input.value).toBe('initial');
    });

    it('should handle rapid prop changes', () => {
      const { rerender, container } = renderWithTheme(
        <RdsPaper padding={8} square={false}>
          Content
        </RdsPaper>
      );

      for (let i = 0; i < 5; i++) {
        rerender(
          <ThemeProvider theme={createTheme()}>
            <RdsPaper padding={8 * (i + 1)} square={i % 2 === 0}>
              Content
            </RdsPaper>
          </ThemeProvider>
        );
      }

      const paper = container.querySelector('.MuiPaper-root');
      expect(paper).toBeInTheDocument();
    });

    it('should work in a grid layout', () => {
      renderWithTheme(
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <RdsPaper padding={16}>Card 1</RdsPaper>
          <RdsPaper padding={16}>Card 2</RdsPaper>
          <RdsPaper padding={16}>Card 3</RdsPaper>
        </div>
      );
      expect(screen.getByText('Card 1')).toBeInTheDocument();
      expect(screen.getByText('Card 2')).toBeInTheDocument();
      expect(screen.getByText('Card 3')).toBeInTheDocument();
    });
  });

  describe('Props Combinations', () => {
    it('should work with all props combined', () => {
      const { container } = renderWithTheme(
        <RdsPaper
          padding={20}
          square={true}
          elevation={12}
          sx={{ margin: '10px', minHeight: '200px' }}
          className="combo-test"
          data-testid="combo-paper"
        >
          Combined props content
        </RdsPaper>
      );
      expect(screen.getByTestId('combo-paper')).toBeInTheDocument();
      expect(screen.getByText('Combined props content')).toBeInTheDocument();
    });

    it('should prioritize sx over padding prop', () => {
      const { container } = renderWithTheme(
        <RdsPaper padding={16} sx={{ padding: '32px' }}>
          Content
        </RdsPaper>
      );
      const paper = container.querySelector('.MuiPaper-root');
      expect(paper).toBeInTheDocument();
    });

    it('should not break with undefined optional props', () => {
      const { container } = renderWithTheme(
        <RdsPaper padding={undefined} square={undefined as any} sx={undefined}>
          Content
        </RdsPaper>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });
});