import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsContainer, { RdsContainerProps } from './rds-container';
import { axe } from 'jest-axe';
import * as deprecation from '../shared/utils/deprecation';

jest.mock('./rds-container.scss', () => ({}));

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const defaultProps: RdsContainerProps = {
  children: 'Container Content',
};

const setup = (props: Record<string, any> = {}) =>
  renderWithTheme(<RdsContainer {...defaultProps} {...props} />);
const getRoot = (container: HTMLElement) => container.querySelector('.MuiContainer-root') as HTMLElement;

describe('RdsContainer', () => {
  describe('Basic Rendering', () => {
    it('should render component as MUI Container without crashing', () => {
      const { container } = setup();
      expect(screen.getByText('Container Content')).toBeInTheDocument();
      expect(getRoot(container)).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsContainer.displayName).toBe('RdsContainer');
    });

    it('should render with multiple children', () => {
      setup({
        children: [<div key="1">Child 1</div>, <div key="2">Child 2</div>, <div key="3">Child 3</div>],
      });
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
      expect(screen.getByText('Child 3')).toBeInTheDocument();
    });

    it('should render empty container', () => {
      const { container } = setup({ children: '' });
      expect(getRoot(container)).toBeInTheDocument();
    });

    it('should render with complex nested content', () => {
      renderWithTheme(
        <RdsContainer>
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
        </RdsContainer>
      );
      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });
  });

  describe('MaxWidth Prop Variants', () => {
    it.each(['xs', 'sm', 'md', 'lg', 'xl'])('should render with maxWidth %s', size => {
      const { container } = setup({ maxWidth: size });
      const cls = `.MuiContainer-maxWidth${size[0].toUpperCase()}${size.slice(1)}`;
      expect(container.querySelector(cls)).toBeInTheDocument();
    });

    it('should render with maxWidth false for fluid', () => {
      const { container } = setup({ maxWidth: false });
      expect(getRoot(container)).toBeInTheDocument();
    });
  });

  describe('Fixed Prop', () => {
    it('should render with fixed true', () => {
      const { container } = setup({ fixed: true });
      expect(container.querySelector('.MuiContainer-fixed')).toBeInTheDocument();
    });

    it('should render without fixed style when fixed is false', () => {
      const { container } = setup({ fixed: false });
      expect(getRoot(container)).toBeInTheDocument();
    });

    it('should combine fixed with maxWidth', () => {
      const { container } = setup({ fixed: true, maxWidth: 'lg' });
      const muiContainer = container.querySelector('.MuiContainer-fixed');
      expect(muiContainer).toBeInTheDocument();
      expect(muiContainer).toHaveClass('MuiContainer-maxWidthLg');
    });
  });

  describe('DisableGutters Prop', () => {
    it('should render with disableGutters true', () => {
      const { container } = setup({ disableGutters: true });
      expect(container.querySelector('.MuiContainer-disableGutters')).toBeInTheDocument();
    });

    it('should render without disableGutters style when false', () => {
      const { container } = setup({ disableGutters: false });
      expect(getRoot(container)).toBeInTheDocument();
    });

    it('should combine disableGutters with other props', () => {
      const { container } = setup({ disableGutters: true, maxWidth: 'md', fixed: true });
      const muiContainer = container.querySelector('.MuiContainer-disableGutters');
      expect(muiContainer).toHaveClass('MuiContainer-maxWidthMd');
      expect(muiContainer).toHaveClass('MuiContainer-fixed');
    });
  });

  describe('Custom Padding Prop', () => {
    it.each([
      [20, '160px'],
      ['16px', '16px'],
      ['2rem', '2rem'],
      ['1.5em', '1.5em'],
      ['0', '0'],
      [1000, '8000px'],
    ])('should apply custom padding %s as %s', (padding, expected) => {
      const { container } = setup({ padding });
      expect(getRoot(container)).toHaveStyle(`padding: ${expected}`);
    });

    it.each([[undefined], ['not provided']])('should apply default padding when %s', padding => {
      const { container } = setup(padding === undefined ? { padding } : {});
      expect(getRoot(container).getAttribute('data-rds-container-padding')).toBe('applied');
    });

    it('should combine custom padding with sx prop', () => {
      const { container } = setup({ padding: '12px', sx: { margin: '10px' } });
      expect(getRoot(container)).toHaveStyle('padding: 12px');
      expect(getRoot(container)).toHaveStyle('margin: 10px');
    });

    it('should allow sx padding to override custom padding', () => {
      const { container } = setup({ padding: '12px', sx: { padding: '24px' } });
      expect(getRoot(container)).toHaveStyle('padding: 24px');
    });
  });

  describe('SX Prop Integration', () => {
    it('should apply custom sx styles', () => {
      const { container } = setup({ sx: { backgroundColor: 'red' } });
      expect(getRoot(container)).toHaveStyle('background-color: red');
    });

    it('should apply multiple sx properties', () => {
      const { container } = setup({ sx: { backgroundColor: 'blue', color: 'white', borderRadius: '8px' } });
      expect(getRoot(container)).toHaveStyle('background-color: blue');
      expect(getRoot(container)).toHaveStyle('color: white');
      expect(getRoot(container)).toHaveStyle('border-radius: 8px');
    });

    it('should merge sx with default padding', () => {
      const { container } = setup({ padding: '10px', sx: { margin: '5px', display: 'flex' } });
      expect(getRoot(container)).toHaveStyle('padding: 10px');
      expect(getRoot(container)).toHaveStyle('margin: 5px');
      expect(getRoot(container)).toHaveStyle('display: flex');
    });

    it('should handle sx with theme values', () => {
      const { container } = setup({ sx: { backgroundColor: 'primary.main', padding: '16px' } });
      expect(getRoot(container)).toBeInTheDocument();
    });
  });

  describe('ClassName Prop', () => {
    it('should apply custom className', () => {
      const { container } = setup({ className: 'custom-class' });
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('should combine custom className with MUI classes', () => {
      const { container } = setup({ className: 'my-custom', maxWidth: 'md' });
      expect(container.querySelector('.my-custom')).toHaveClass('MuiContainer-maxWidthMd');
    });

    it('should apply multiple classes', () => {
      const { container } = setup({ className: 'class1 class2 class3' });
      const muiContainer = container.querySelector('.class1');
      expect(muiContainer).toHaveClass('class2');
      expect(muiContainer).toHaveClass('class3');
    });

    it('should not affect rendering when className is empty string', () => {
      const { container } = setup({ className: '' });
      expect(getRoot(container)).toBeInTheDocument();
    });
  });

  describe('Component Prop', () => {
    it.each(['section', 'article', 'main'])('should render as %s element', component => {
      const { container } = setup({ component });
      expect(container.querySelector(`${component}.MuiContainer-root`)).toBeInTheDocument();
    });

    it('should render as div by default', () => {
      const { container } = setup();
      expect(container.querySelector('div.MuiContainer-root')).toBeInTheDocument();
    });
  });

  describe('Data Attributes', () => {
    it('should support data-testid attribute', () => {
      setup({ 'data-testid': 'test-container' });
      expect(screen.getByTestId('test-container')).toBeInTheDocument();
    });

    it('should support multiple data attributes', () => {
      const { container } = setup({ 'data-testid': 'container', 'data-name': 'my-container' });
      expect(container.querySelector('[data-name="my-container"]')).toBeInTheDocument();
    });

    it('should preserve data attributes with other props', () => {
      setup({ 'data-testid': 'test-container', maxWidth: 'lg', fixed: true });
      expect(screen.getByTestId('test-container')).toHaveClass('MuiContainer-fixed');
    });
  });

  describe('Props Integration', () => {
    it('should accept all MUI Container props', () => {
      const { container } = setup({ maxWidth: 'lg', fixed: true, disableGutters: true });
      const muiContainer = getRoot(container);
      expect(muiContainer).toHaveClass('MuiContainer-maxWidthLg');
      expect(muiContainer).toHaveClass('MuiContainer-fixed');
      expect(muiContainer).toHaveClass('MuiContainer-disableGutters');
    });

    it('should combine padding with maxWidth and fixed', () => {
      const { container } = setup({ padding: '16px', maxWidth: 'md', fixed: true });
      expect(getRoot(container)).toHaveStyle('padding: 16px');
      expect(getRoot(container)).toHaveClass('MuiContainer-fixed');
    });

    it('should handle all props together', () => {
      const { container } = setup({
        maxWidth: 'lg',
        fixed: true,
        disableGutters: true,
        padding: '20px',
        className: 'custom',
        sx: { backgroundColor: '#f5f5f5' },
        component: 'section',
        'data-testid': 'full-featured',
      });
      const muiContainer = container.querySelector('[data-testid="full-featured"]') as HTMLElement;
      expect(muiContainer).toBeInTheDocument();
      expect(muiContainer).toHaveClass('custom');
      expect(muiContainer).toHaveClass('MuiContainer-maxWidthLg');
      expect(muiContainer).toHaveClass('MuiContainer-fixed');
      expect(muiContainer).toHaveClass('MuiContainer-disableGutters');
    });
  });

  describe('Children Content Variations', () => {
    it('should render string and number children', () => {
      setup({ children: 'Plain text content' });
      expect(screen.getByText('Plain text content')).toBeInTheDocument();
      setup({ children: 42 });
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('should render element children', () => {
      setup({ children: <button>Click me</button> });
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('should render fragment children', () => {
      setup({ children: <><p>Part 1</p><p>Part 2</p></> });
      expect(screen.getByText('Part 1')).toBeInTheDocument();
      expect(screen.getByText('Part 2')).toBeInTheDocument();
    });

    it('should render conditional children', () => {
      const show = true;
      const hide = false;
      setup({ children: [show && <p key="a">Visible content</p>, hide && <p key="b">Hidden content</p>] });
      expect(screen.getByText('Visible content')).toBeInTheDocument();
      expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
    });

    it('should render array children', () => {
      setup({ children: ['Item 1', 'Item 2', 'Item 3'].map(item => <p key={item}>{item}</p>) });
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid prop changes', () => {
      const { rerender } = setup({ maxWidth: 'sm' });
      rerender(
        <ThemeProvider theme={theme}>
          <RdsContainer maxWidth="lg" {...defaultProps} />
        </ThemeProvider>
      );
      expect(screen.getByText('Container Content')).toBeInTheDocument();
    });

    it('should handle zero padding value', () => {
      const { container } = setup({ padding: 0 });
      expect(getRoot(container).getAttribute('style') || '').not.toContain('padding');
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsContainer {...defaultProps} />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('should support aria attributes', () => {
      setup({ 'aria-label': 'Main content' });
      expect(screen.getByLabelText('Main content')).toBeInTheDocument();
    });

    it('should support role attribute', () => {
      setup({ role: 'region', 'aria-label': 'Content area' });
      expect(screen.getByRole('region', { name: /content area/i })).toBeInTheDocument();
    });

    it('should maintain keyboard accessibility with focusable content', () => {
      setup({ children: <input type="text" placeholder="Focusable input" /> });
      expect(screen.getByPlaceholderText('Focusable input')).toBeInTheDocument();
    });

    it('should support tabIndex prop', () => {
      setup({ tabIndex: 0 });
      expect(screen.getByText('Container Content').closest('.MuiContainer-root')).toHaveAttribute('tabindex', '0');
    });
  });

  describe('DOM Structure', () => {
    it('should render single root element with MuiContainer root class', () => {
      const { container } = setup();
      expect(container.querySelectorAll('.MuiContainer-root').length).toBe(1);
      expect((container.firstChild as HTMLElement).classList.contains('MuiContainer-root')).toBe(true);
    });

    it('should properly nest children', () => {
      const { container } = setup({ children: <div id="child">Child content</div> });
      expect(getRoot(container).contains(container.querySelector('#child'))).toBe(true);
    });

    it('should maintain proper DOM hierarchy', () => {
      const { container } = setup({
        children: [<header key="h"><h1>Title</h1></header>, <main key="m"><p>Content</p></main>],
      });
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
      expect(container.querySelector('#parent') as HTMLElement).toHaveStyle('background: blue');
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

  describe('audit fixes', () => {
    it('G1-218: applies every entry of an array sx', () => {
      const { container } = setup({ sx: [{ backgroundColor: 'red' }, { margin: '10px' }] });
      expect(getRoot(container)).toHaveStyle('background-color: red');
      expect(getRoot(container)).toHaveStyle('margin: 10px');
    });

    it('G1-218: skips falsy entries of an array sx', () => {
      const { container } = setup({ sx: [false, { margin: '10px' }] });
      expect(getRoot(container)).toHaveStyle('margin: 10px');
    });

    it('G1-218: applies a function sx', () => {
      const { container } = setup({ sx: (t: any) => ({ backgroundColor: t.palette.primary.main }) });
      expect(getRoot(container)).toHaveStyle(`background-color: ${theme.palette.primary.main}`);
    });

    it('G1-218: keeps the default padding with array and function sx (not inspected)', () => {
      const { container: c1 } = setup({ sx: [{ margin: '10px' }] });
      expect(getRoot(c1).getAttribute('data-rds-container-padding')).toBe('applied');
      const { container: c2 } = setup({ sx: () => ({ margin: '10px' }) });
      expect(getRoot(c2).getAttribute('data-rds-container-padding')).toBe('applied');
    });

    it('G1-218: plain-object sx padding still turns the default padding off', () => {
      const { container } = setup({ sx: { px: 2 } });
      expect(getRoot(container).getAttribute('data-rds-container-padding')).toBeNull();
    });

    it('G1-218: combines the padding prop with an array sx', () => {
      const { container } = setup({ padding: '12px', sx: [{ margin: '10px' }] });
      expect(getRoot(container)).toHaveStyle('padding: 12px');
      expect(getRoot(container)).toHaveStyle('margin: 10px');
    });

    it('G1-220: padding={0} removes the padding (including gutters)', () => {
      const { container } = setup({ padding: 0 });
      const root = getRoot(container);
      expect(root.getAttribute('data-rds-container-padding')).toBeNull();
      expect(root).toHaveStyle('padding-left: 0px');
      expect(root).toHaveStyle('padding-right: 0px');
    });

    it('G1-219 (kept): a consumer style replaces the default padding style', () => {
      const { container } = setup({ style: { color: 'red' } });
      expect(getRoot(container).style.color).toBe('red');
    });
  });
});

describe('RdsContainer additive renames', () => {
  const warn = jest.spyOn(deprecation, 'warnDeprecatedProp');
  beforeEach(() => warn.mockClear());

  it('warns for padding', () => {
    render(<RdsContainer padding={2}>x</RdsContainer>);
    expect(warn).toHaveBeenCalledWith('RdsContainer', 'padding', '`sx`');
  });
});
