import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsContainer, { RdsContainerProps } from './rds-container';
import { axe } from 'jest-axe';

// Mock SCSS imports
jest.mock('./rds-container.scss', () => ({}));

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const defaultProps: RdsContainerProps = {
  children: 'Container Content',
};

describe('RdsContainer', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      renderWithTheme(<RdsContainer {...defaultProps} />);
      expect(screen.getByText('Container Content')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsContainer.displayName).toBe('RdsContainer');
    });

    it('should render with children', () => {
      renderWithTheme(
        <RdsContainer>
          <div>Test Child</div>
        </RdsContainer>
      );
      expect(screen.getByText('Test Child')).toBeInTheDocument();
    });

    it('should render with text children', () => {
      renderWithTheme(<RdsContainer>Simple Text Content</RdsContainer>);
      expect(screen.getByText('Simple Text Content')).toBeInTheDocument();
    });

    it('should render with multiple children', () => {
      renderWithTheme(
        <RdsContainer>
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </RdsContainer>
      );
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
      expect(screen.getByText('Child 3')).toBeInTheDocument();
    });

    it('should render empty container', () => {
      const { container } = renderWithTheme(<RdsContainer children="" />);
      const muiContainer = container.querySelector('.MuiContainer-root');
      expect(muiContainer).toBeInTheDocument();
    });

    it('should render as MUI Container', () => {
      const { container } = renderWithTheme(<RdsContainer {...defaultProps} />);
      const muiContainer = container.querySelector('.MuiContainer-root');
      expect(muiContainer).toBeInTheDocument();
    });

    it('should render with complex nested content', () => {
      const complexContent = (
        <div>
          <header>
            <h1>Header</h1>
          </header>
          <main>
            <p>Content</p>
          </main>
          <footer>
            <p>Footer</p>
          </footer>
        </div>
      );
      renderWithTheme(<RdsContainer>{complexContent}</RdsContainer>);
      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });
  });

  describe('MaxWidth Prop Variants', () => {
    it('should render with maxWidth xs', () => {
      const { container } = renderWithTheme(
        <RdsContainer maxWidth="xs" {...defaultProps} />
      );
      const muiContainer = container.querySelector('.MuiContainer-maxWidthXs');
      expect(muiContainer).toBeInTheDocument();
    });

    it('should render with maxWidth sm', () => {
      const { container } = renderWithTheme(
        <RdsContainer maxWidth="sm" {...defaultProps} />
      );
      const muiContainer = container.querySelector('.MuiContainer-maxWidthSm');
      expect(muiContainer).toBeInTheDocument();
    });

    it('should render with maxWidth md', () => {
      const { container } = renderWithTheme(
        <RdsContainer maxWidth="md" {...defaultProps} />
      );
      const muiContainer = container.querySelector('.MuiContainer-maxWidthMd');
      expect(muiContainer).toBeInTheDocument();
    });

    it('should render with maxWidth lg', () => {
      const { container } = renderWithTheme(
        <RdsContainer maxWidth="lg" {...defaultProps} />
      );
      const muiContainer = container.querySelector('.MuiContainer-maxWidthLg');
      expect(muiContainer).toBeInTheDocument();
    });

    it('should render with maxWidth xl', () => {
      const { container } = renderWithTheme(
        <RdsContainer maxWidth="xl" {...defaultProps} />
      );
      const muiContainer = container.querySelector('.MuiContainer-maxWidthXl');
      expect(muiContainer).toBeInTheDocument();
    });

    it('should render with maxWidth false for fluid', () => {
      const { container } = renderWithTheme(
        <RdsContainer maxWidth={false} {...defaultProps} />
      );
      const muiContainer = container.querySelector('.MuiContainer-root');
      expect(muiContainer).toBeInTheDocument();
    });

    it('should have default maxWidth when not specified', () => {
      const { container } = renderWithTheme(<RdsContainer {...defaultProps} />);
      const muiContainer = container.querySelector('.MuiContainer-root');
      expect(muiContainer).toBeInTheDocument();
    });
  });

  describe('Fixed Prop', () => {
    it('should render with fixed true', () => {
      const { container } = renderWithTheme(
        <RdsContainer fixed={true} {...defaultProps} />
      );
      const muiContainer = container.querySelector('.MuiContainer-fixed');
      expect(muiContainer).toBeInTheDocument();
    });

    it('should render without fixed style when fixed is false', () => {
      const { container } = renderWithTheme(
        <RdsContainer fixed={false} {...defaultProps} />
      );
      const muiContainer = container.querySelector('.MuiContainer-root');
      expect(muiContainer).toBeInTheDocument();
    });

    it('should render without fixed style by default', () => {
      const { container } = renderWithTheme(<RdsContainer {...defaultProps} />);
      const muiContainer = container.querySelector('.MuiContainer-root');
      expect(muiContainer).toBeInTheDocument();
    });

    it('should combine fixed with maxWidth', () => {
      const { container } = renderWithTheme(
        <RdsContainer fixed={true} maxWidth="lg" {...defaultProps} />
      );
      const muiContainer = container.querySelector('.MuiContainer-fixed');
      expect(muiContainer).toBeInTheDocument();
      expect(muiContainer).toHaveClass('MuiContainer-maxWidthLg');
    });
  });

  describe('DisableGutters Prop', () => {
    it('should render with disableGutters true', () => {
      const { container } = renderWithTheme(
        <RdsContainer disableGutters={true} {...defaultProps} />
      );
      const muiContainer = container.querySelector('.MuiContainer-disableGutters');
      expect(muiContainer).toBeInTheDocument();
    });

    it('should render without disableGutters style when false', () => {
      const { container } = renderWithTheme(
        <RdsContainer disableGutters={false} {...defaultProps} />
      );
      const muiContainer = container.querySelector('.MuiContainer-root');
      expect(muiContainer).toBeInTheDocument();
    });

    it('should render with gutters by default', () => {
      const { container } = renderWithTheme(<RdsContainer {...defaultProps} />);
      const muiContainer = container.querySelector('.MuiContainer-root');
      expect(muiContainer).toBeInTheDocument();
    });

    it('should combine disableGutters with other props', () => {
      const { container } = renderWithTheme(
        <RdsContainer
          disableGutters={true}
          maxWidth="md"
          fixed={true}
          {...defaultProps}
        />
      );
      const muiContainer = container.querySelector('.MuiContainer-disableGutters');
      expect(muiContainer).toHaveClass('MuiContainer-maxWidthMd');
      expect(muiContainer).toHaveClass('MuiContainer-fixed');
    });
  });

  describe('Custom Padding Prop', () => {
    it('should apply custom padding with number', () => {
      const { container } = renderWithTheme(
        <RdsContainer padding={20} {...defaultProps} />
      );
      const muiContainer = container.querySelector('.MuiContainer-root') as HTMLElement;
      expect(muiContainer).toHaveStyle('padding: 160px');
    });

    it('should apply custom padding with string pixel value', () => {
      const { container } = renderWithTheme(
        <RdsContainer padding="16px" {...defaultProps} />
      );
      const muiContainer = container.querySelector('.MuiContainer-root') as HTMLElement;
      expect(muiContainer).toHaveStyle('padding: 16px');
    });

    it('should apply custom padding with rem value', () => {
      const { container } = renderWithTheme(
        <RdsContainer padding="2rem" {...defaultProps} />
      );
      const muiContainer = container.querySelector('.MuiContainer-root') as HTMLElement;
      expect(muiContainer).toHaveStyle('padding: 2rem');
    });

    it('should apply custom padding with em value', () => {
      const { container } = renderWithTheme(
        <RdsContainer padding="1.5em" {...defaultProps} />
      );
      const muiContainer = container.querySelector('.MuiContainer-root') as HTMLElement;
      expect(muiContainer).toHaveStyle('padding: 1.5em');
    });

    it('should apply default padding when not provided', () => {
      const { container } = renderWithTheme(<RdsContainer {...defaultProps} />);
      const muiContainer = container.querySelector('.MuiContainer-root') as HTMLElement;
      expect(muiContainer.dataset.rdsContainerPadding).toBe('applied');
    });

    it('should apply default padding when undefined', () => {
      const { container } = renderWithTheme(
        <RdsContainer padding={undefined} {...defaultProps} />
      );
      const muiContainer = container.querySelector('.MuiContainer-root') as HTMLElement;
      expect(muiContainer.dataset.rdsContainerPadding).toBe('applied');
    });

    it('should combine custom padding with sx prop', () => {
      const { container } = renderWithTheme(
        <RdsContainer padding="12px" sx={{ margin: '10px' }} {...defaultProps} />
      );
      const muiContainer = container.querySelector('.MuiContainer-root') as HTMLElement;
      expect(muiContainer).toHaveStyle('padding: 12px');
      expect(muiContainer).toHaveStyle('margin: 10px');
    });

    it('should allow sx padding to override custom padding', () => {
      const { container } = renderWithTheme(
        <RdsContainer
          padding="12px"
          sx={{ padding: '24px' }}
          {...defaultProps}
        />
      );
      const muiContainer = container.querySelector('.MuiContainer-root') as HTMLElement;
      expect(muiContainer).toHaveStyle('padding: 24px');
    });
  });

  describe('SX Prop Integration', () => {
    it('should apply custom sx styles', () => {
      const { container } = renderWithTheme(
        <RdsContainer sx={{ backgroundColor: 'red' }} {...defaultProps} />
      );
      const muiContainer = container.querySelector('.MuiContainer-root') as HTMLElement;
      expect(muiContainer).toHaveStyle('background-color: red');
    });

    it('should apply multiple sx properties', () => {
      const { container } = renderWithTheme(
        <RdsContainer
          sx={{ backgroundColor: 'blue', color: 'white', borderRadius: '8px' }}
          {...defaultProps}
        />
      );
      const muiContainer = container.querySelector('.MuiContainer-root') as HTMLElement;
      expect(muiContainer).toHaveStyle('background-color: blue');
      expect(muiContainer).toHaveStyle('color: white');
      expect(muiContainer).toHaveStyle('border-radius: 8px');
    });

    it('should merge sx with default padding', () => {
      const { container } = renderWithTheme(
        <RdsContainer
          padding="10px"
          sx={{ margin: '5px', display: 'flex' }}
          {...defaultProps}
        />
      );
      const muiContainer = container.querySelector('.MuiContainer-root') as HTMLElement;
      expect(muiContainer).toHaveStyle('padding: 10px');
      expect(muiContainer).toHaveStyle('margin: 5px');
      expect(muiContainer).toHaveStyle('display: flex');
    });

    it('should handle sx with theme values', () => {
      const { container } = renderWithTheme(
        <RdsContainer
          sx={{ backgroundColor: 'primary.main', padding: '16px' }}
          {...defaultProps}
        />
      );
      const muiContainer = container.querySelector('.MuiContainer-root') as HTMLElement;
      expect(muiContainer).toBeInTheDocument();
    });
  });

  describe('ClassName Prop', () => {
    it('should apply custom className', () => {
      const { container } = renderWithTheme(
        <RdsContainer className="custom-class" {...defaultProps} />
      );
      const muiContainer = container.querySelector('.custom-class');
      expect(muiContainer).toBeInTheDocument();
    });

    it('should combine custom className with MUI classes', () => {
      const { container } = renderWithTheme(
        <RdsContainer className="my-custom" maxWidth="md" {...defaultProps} />
      );
      const muiContainer = container.querySelector('.my-custom');
      expect(muiContainer).toHaveClass('MuiContainer-maxWidthMd');
    });

    it('should apply multiple classes', () => {
      const { container } = renderWithTheme(
        <RdsContainer className="class1 class2 class3" {...defaultProps} />
      );
      const muiContainer = container.querySelector('.class1');
      expect(muiContainer).toHaveClass('class2');
      expect(muiContainer).toHaveClass('class3');
    });

    it('should not affect rendering when className is empty string', () => {
      const { container } = renderWithTheme(
        <RdsContainer className="" {...defaultProps} />
      );
      const muiContainer = container.querySelector('.MuiContainer-root');
      expect(muiContainer).toBeInTheDocument();
    });
  });

  describe('Component Prop', () => {
    it('should allow component prop override', () => {
      const { container } = renderWithTheme(
        <RdsContainer component="section" {...defaultProps} />
      );
      const section = container.querySelector('section.MuiContainer-root');
      expect(section).toBeInTheDocument();
    });

    it('should render as article when component prop is article', () => {
      const { container } = renderWithTheme(
        <RdsContainer component="article" {...defaultProps} />
      );
      const article = container.querySelector('article.MuiContainer-root');
      expect(article).toBeInTheDocument();
    });

    it('should render as div by default', () => {
      const { container } = renderWithTheme(<RdsContainer {...defaultProps} />);
      const div = container.querySelector('div.MuiContainer-root');
      expect(div).toBeInTheDocument();
    });

    it('should render as main element', () => {
      const { container } = renderWithTheme(
        <RdsContainer component="main" {...defaultProps} />
      );
      const main = container.querySelector('main.MuiContainer-root');
      expect(main).toBeInTheDocument();
    });
  });

  describe('Data Attributes', () => {
    it('should support data-testid attribute', () => {
      renderWithTheme(
        <RdsContainer data-testid="test-container" {...defaultProps} />
      );
      expect(screen.getByTestId('test-container')).toBeInTheDocument();
    });

    it('should support multiple data attributes', () => {
      const { container } = renderWithTheme(
        <RdsContainer
          data-testid="container"
          data-name="my-container"
          {...defaultProps}
        />
      );
      const muiContainer = container.querySelector('[data-name="my-container"]');
      expect(muiContainer).toBeInTheDocument();
    });

    it('should preserve data attributes with other props', () => {
      renderWithTheme(
        <RdsContainer
          data-testid="test-container"
          maxWidth="lg"
          fixed={true}
          {...defaultProps}
        />
      );
      expect(screen.getByTestId('test-container')).toHaveClass(
        'MuiContainer-fixed'
      );
    });
  });

  describe('Props Integration', () => {
    it('should accept all MUI Container props', () => {
      const { container } = renderWithTheme(
        <RdsContainer
          maxWidth="lg"
          fixed={true}
          disableGutters={true}
          {...defaultProps}
        />
      );
      const muiContainer = container.querySelector('.MuiContainer-root');
      expect(muiContainer).toHaveClass('MuiContainer-maxWidthLg');
      expect(muiContainer).toHaveClass('MuiContainer-fixed');
      expect(muiContainer).toHaveClass('MuiContainer-disableGutters');
    });

    it('should combine padding with maxWidth and fixed', () => {
      const { container } = renderWithTheme(
        <RdsContainer
          padding="16px"
          maxWidth="md"
          fixed={true}
          {...defaultProps}
        />
      );
      const muiContainer = container.querySelector('.MuiContainer-root') as HTMLElement;
      expect(muiContainer).toHaveStyle('padding: 16px');
      expect(muiContainer).toHaveClass('MuiContainer-fixed');
    });

    it('should handle all props together', () => {
      const { container } = renderWithTheme(
        <RdsContainer
          maxWidth="lg"
          fixed={true}
          disableGutters={true}
          padding="20px"
          className="custom"
          sx={{ backgroundColor: '#f5f5f5' }}
          component="section"
          data-testid="full-featured"
          {...defaultProps}
        />
      );
      const muiContainer = container.querySelector('[data-testid="full-featured"]') as HTMLElement;
      expect(muiContainer).toBeInTheDocument();
      expect(muiContainer).toHaveClass('custom');
      expect(muiContainer).toHaveClass('MuiContainer-maxWidthLg');
      expect(muiContainer).toHaveClass('MuiContainer-fixed');
      expect(muiContainer).toHaveClass('MuiContainer-disableGutters');
    });
  });

  describe('Children Content Variations', () => {
    it('should render string children', () => {
      renderWithTheme(<RdsContainer>Plain text content</RdsContainer>);
      expect(screen.getByText('Plain text content')).toBeInTheDocument();
    });

    it('should render element children', () => {
      renderWithTheme(
        <RdsContainer>
          <button>Click me</button>
        </RdsContainer>
      );
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('should render fragment children', () => {
      renderWithTheme(
        <RdsContainer>
          <>
            <p>Part 1</p>
            <p>Part 2</p>
          </>
        </RdsContainer>
      );
      expect(screen.getByText('Part 1')).toBeInTheDocument();
      expect(screen.getByText('Part 2')).toBeInTheDocument();
    });

    it('should render conditional children', () => {
      const show = true;
      const hide = false;
      renderWithTheme(
        <RdsContainer>
          {show && <p>Visible content</p>}
          {hide && <p>Hidden content</p>}
        </RdsContainer>
      );
      expect(screen.getByText('Visible content')).toBeInTheDocument();
      expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
    });

    it('should render array children', () => {
      const items = ['Item 1', 'Item 2', 'Item 3'];
      renderWithTheme(
        <RdsContainer>
          {items.map((item, index) => <p key={index}>{item}</p>)}
        </RdsContainer>
      );
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('should render number children', () => {
      renderWithTheme(<RdsContainer>{42}</RdsContainer>);
      expect(screen.getByText('42')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid prop changes', () => {
      const { rerender } = renderWithTheme(
        <RdsContainer maxWidth="sm" {...defaultProps} />
      );
      rerender(
        <ThemeProvider theme={theme}>
          <RdsContainer maxWidth="lg" {...defaultProps} />
        </ThemeProvider>
      );
      expect(screen.getByText('Container Content')).toBeInTheDocument();
    });

    it('should handle zero padding value', () => {
      const { container } = renderWithTheme(
        <RdsContainer padding={0} {...defaultProps} />
      );
      const muiContainer = container.querySelector('.MuiContainer-root') as HTMLElement;
      const style = muiContainer.getAttribute('style') || '';
      // Number 0 is falsy in JS, so padding is not applied (same as when not provided)
      expect(style).not.toContain('padding');
    });

    it('should handle string zero padding value', () => {
      const { container } = renderWithTheme(
        <RdsContainer padding="0" {...defaultProps} />
      );
      const muiContainer = container.querySelector('.MuiContainer-root') as HTMLElement;
      expect(muiContainer).toHaveStyle('padding: 0');
    });

    it('should handle very large padding value', () => {
      const { container } = renderWithTheme(
        <RdsContainer padding={1000} {...defaultProps} />
      );
      const muiContainer = container.querySelector('.MuiContainer-root') as HTMLElement;
      expect(muiContainer).toHaveStyle('padding: 8000px');
    });

    it('should handle combined responsive props', () => {
      const { container } = renderWithTheme(
        <RdsContainer
          maxWidth="lg"
          padding="16px"
          disableGutters={false}
          {...defaultProps}
        />
      );
      const muiContainer = container.querySelector('.MuiContainer-root');
      expect(muiContainer).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should be accessible with semantic HTML element', () => {
      const { container } = renderWithTheme(
        <RdsContainer component="main" {...defaultProps} />
      );
      const main = container.querySelector('main');
      expect(main).toBeInTheDocument();
  
    });
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsContainer {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should support aria attributes', () => {
      renderWithTheme(
        <RdsContainer aria-label="Main content" {...defaultProps} />
      );
      expect(screen.getByLabelText('Main content')).toBeInTheDocument();
    });

    it('should support role attribute', () => {
      renderWithTheme(
        <RdsContainer role="region" aria-label="Content area" {...defaultProps} />
      );
      expect(screen.getByRole('region', { name: /content area/i })).toBeInTheDocument();
    });

    it('should maintain keyboard accessibility with focusable content', () => {
      renderWithTheme(
        <RdsContainer>
          <input type="text" placeholder="Focusable input" />
        </RdsContainer>
      );
      const input = screen.getByPlaceholderText('Focusable input');
      expect(input).toBeInTheDocument();
    });

    it('should support tabIndex prop', () => {
      renderWithTheme(
        <RdsContainer tabIndex={0} {...defaultProps} />
      );
      const container = screen.getByText('Container Content').closest('.MuiContainer-root') as HTMLElement;
      expect(container).toHaveAttribute('tabindex', '0');
    });
  });

  describe('DOM Structure', () => {
    it('should render single root element', () => {
      const { container } = renderWithTheme(<RdsContainer {...defaultProps} />);
      const roots = container.querySelectorAll('.MuiContainer-root');
      expect(roots.length).toBe(1);
    });

    it('should have MuiContainer root class', () => {
      const { container } = renderWithTheme(<RdsContainer {...defaultProps} />);
      const root = container.firstChild as HTMLElement;
      expect(root.classList.contains('MuiContainer-root')).toBe(true);
    });

    it('should properly nest children', () => {
      const { container } = renderWithTheme(
        <RdsContainer>
          <div id="child">Child content</div>
        </RdsContainer>
      );
      const child = container.querySelector('#child');
      const parent = container.querySelector('.MuiContainer-root');
      expect(parent?.contains(child)).toBe(true);
    });

    it('should maintain proper DOM hierarchy', () => {
      const { container } = renderWithTheme(
        <RdsContainer>
          <header>
            <h1>Title</h1>
          </header>
          <main>
            <p>Content</p>
          </main>
        </RdsContainer>
      );
      expect(container.querySelector('header')).toBeInTheDocument();
      expect(container.querySelector('main')).toBeInTheDocument();
    });
  });

  describe('Style Isolation', () => {
    it('should not leak styles to parent', () => {
      const { container } = renderWithTheme(
        <div id="parent" style={{ background: 'blue' }}>
          <RdsContainer {...defaultProps} />
        </div>
      );
      const parent = container.querySelector('#parent') as HTMLElement;
      expect(parent).toHaveStyle('background: blue');
    });

    it('should not interfere with sibling elements', () => {
      const { container } = renderWithTheme(
        <>
          <div id="sibling1">Sibling 1</div>
          <RdsContainer {...defaultProps} />
          <div id="sibling2">Sibling 2</div>
        </>
      );
      expect(container.querySelector('#sibling1')).toBeInTheDocument();
      expect(container.querySelector('#sibling2')).toBeInTheDocument();
    });
  });

  describe('Default Props & Behavior', () => {
    it('should render with minimal props', () => {
      renderWithTheme(<RdsContainer>Content</RdsContainer>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should have sensible defaults', () => {
      const { container } = renderWithTheme(<RdsContainer>Default</RdsContainer>);
      const muiContainer = container.querySelector('.MuiContainer-root');
      expect(muiContainer).toBeInTheDocument();
    });

    it('should apply default padding by default', () => {
      const { container } = renderWithTheme(<RdsContainer {...defaultProps} />);
      const muiContainer = container.querySelector('.MuiContainer-root') as HTMLElement;
      expect(muiContainer.dataset.rdsContainerPadding).toBe('applied');
    });

    it('should apply maxWidth by default (md)', () => {
      const { container } = renderWithTheme(<RdsContainer {...defaultProps} />);
      const muiContainer = container.querySelector('.MuiContainer-root');
      expect(muiContainer).toBeInTheDocument();
    });
  });
});