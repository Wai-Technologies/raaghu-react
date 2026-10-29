import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsFab, { type RdsFabProps } from './rds-fab';
import * as deprecation from '../shared/utils/deprecation';

jest.mock('./rds-fab.scss', () => ({}));

const fabEl = () => document.querySelector('.MuiFab-root') as HTMLElement;
const pos = () => window.getComputedStyle(fabEl()).position;
const icon = <span data-testid="icon">★</span>;

describe('RdsFab', () => {
  const defaultProps: RdsFabProps = {
    icon: <span>★</span>,
    'aria-label': 'action button',
  };
  const setup = (p: RdsFabProps = {}) => render(<RdsFab {...defaultProps} {...p} />);

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = setup();
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsFab.displayName).toBe('RdsFab');
    });

    it('should render MUI Fab component', () => {
      setup();
      expect(fabEl()).toBeInTheDocument();
    });

    it('should render without any props', () => {
      const { container } = render(<RdsFab />);
      expect(container).toBeInTheDocument();
    });

    it('should accept className prop', () => {
      setup({ className: 'custom-fab' });
      expect(fabEl()).toHaveClass('custom-fab');
    });
  });

  describe('Icon Rendering', () => {
    it('should render icon when provided', () => {
      setup({ icon: <span data-testid="test-icon">★</span> });
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('should render icon alone when variant is not extended', () => {
      render(<RdsFab icon={<span data-testid="test-icon">★</span>} />);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('should not render label without extended variant', () => {
      render(<RdsFab icon={<span data-testid="test-icon">★</span>} label="Action" />);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.queryByText('Action')).not.toBeInTheDocument();
    });

    it('should render SVG icon', () => {
      const svgIcon = (
        <svg data-testid="svg-icon">
          <circle cx="10" cy="10" r="5" />
        </svg>
      );
      render(<RdsFab icon={svgIcon} />);
      expect(screen.getByTestId('svg-icon')).toBeInTheDocument();
    });
  });

  describe('Label Rendering', () => {
    it('should render label when extended variant with icon and label', () => {
      render(<RdsFab icon={<span>★</span>} label="Add" variant="extended" />);
      expect(screen.getByText('Add')).toBeInTheDocument();
    });

    it('should render icon and label together in extended variant', () => {
      render(<RdsFab icon={icon} label="Add Item" variant="extended" />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('Add Item')).toBeInTheDocument();
    });

    it('should render label alone when no icon in extended variant', () => {
      render(<RdsFab label="Add" variant="extended" />);
      expect(screen.getByText('Add')).toBeInTheDocument();
    });

    it('should render label alone when no variant specified', () => {
      render(<RdsFab label="Action" />);
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
  });

  describe('Position Styles', () => {
    it('should render without position styles when position not provided', () => {
      setup();
      expect(fabEl()).toBeInTheDocument();
    });

    it.each(['bottom-right', 'bottom-left', 'top-right', 'top-left'] as const)('should apply %s position', (position) => {
      setup({ position });
      expect(pos()).toBe('fixed');
    });

    it('should handle invalid position gracefully', () => {
      const { container } = setup({ position: undefined });
      expect(container).toBeInTheDocument();
    });
  });

  describe('Children Rendering', () => {
    it('should render children when provided', () => {
      render(
        <RdsFab>
          <span data-testid="custom-child">Custom Content</span>
        </RdsFab>
      );
      expect(screen.getByTestId('custom-child')).toBeInTheDocument();
    });

    it('should render complex children structure', () => {
      render(
        <RdsFab>
          <div data-testid="wrapper">
            <span>Text</span>
            <svg data-testid="svg">circle</svg>
          </div>
        </RdsFab>
      );
      expect(screen.getByTestId('wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('svg')).toBeInTheDocument();
    });
  });

  describe('Variant Props', () => {
    it('should support circular variant (default)', () => {
      setup({ variant: 'circular' });
      expect(fabEl()).toBeInTheDocument();
    });

    it('should support extended variant', () => {
      const { container } = render(<RdsFab icon={<span>★</span>} label="Add" variant="extended" />);
      expect(container.querySelector('.MuiFab-extended')).toBeInTheDocument();
    });

    it('should render extended fab with both icon and label', () => {
      render(<RdsFab icon={icon} label="Create" variant="extended" />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('Create')).toBeInTheDocument();
    });
  });

  describe('Color and Size Variants', () => {
    it.each([
      ['primary', 'MuiFab-primary'],
      ['secondary', 'MuiFab-secondary'],
      ['error', 'Mui-error'],
      ['warning', 'MuiFab-warning'],
      ['info', 'MuiFab-info'],
      ['success', 'MuiFab-success'],
      ['inherit', 'MuiFab-colorInherit'],
    ] as const)('should support %s color', (color, cls) => {
      setup({ color });
      expect(fabEl()).toHaveClass(cls);
    });

    it.each([
      ['small', 'MuiFab-sizeSmall'],
      ['medium', 'MuiFab-sizeMedium'],
      ['large', 'MuiFab-sizeLarge'],
    ] as const)('should support %s size', (size, cls) => {
      setup({ size });
      expect(fabEl()).toHaveClass(cls);
    });
  });

  describe('SX Prop', () => {
    it('should accept and merge sx prop', () => {
      setup({ sx: { backgroundColor: 'rgb(255, 0, 0)' } });
      expect(fabEl()).toBeInTheDocument();
    });

    it('should merge custom sx with default sx', () => {
      setup({ position: 'bottom-right', sx: { zIndex: 'var(--rds-z-index-dropdown)' } });
      expect(fabEl()).toBeInTheDocument();
    });

    it('should allow sx to override position styles', () => {
      setup({ position: 'bottom-right', sx: { position: 'absolute' } });
      expect(pos()).toBe('absolute');
    });
  });

  describe('MUI Props Forwarding', () => {
    it('should forward onClick handler', () => {
      const handleClick = jest.fn();
      setup({ onClick: handleClick });
      fireEvent.click(fabEl());
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should forward disabled prop', () => {
      setup({ disabled: true });
      expect(fabEl()).toHaveAttribute('disabled');
    });

    it.each([
      ['aria-label', 'Floating action button'],
      ['aria-describedby', 'fab-description'],
      ['title', 'Action button'],
      ['type', 'submit'],
    ])('should forward %s prop', (attr, value) => {
      setup({ [attr]: value });
      expect(fabEl()).toHaveAttribute(attr, value);
    });

    it.each([
      ['onFocus', fireEvent.focus],
      ['onBlur', fireEvent.blur],
      ['onMouseEnter', fireEvent.mouseEnter],
      ['onMouseLeave', fireEvent.mouseLeave],
    ] as const)('should forward %s handler', (prop, fire) => {
      const handler = jest.fn();
      setup({ [prop]: handler });
      fire(fabEl());
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('Content Priority', () => {
    it('should prioritize children over icon and label', () => {
      render(
        <RdsFab icon={icon} label="Label">
          <span data-testid="child">Child</span>
        </RdsFab>
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    });

    it('should prioritize icon over label in non-extended variant', () => {
      render(<RdsFab icon={icon} label="Label" />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.queryByText('Label')).not.toBeInTheDocument();
    });

    it('should show both icon and label in extended variant', () => {
      render(<RdsFab icon={icon} label="Extended Label" variant="extended" />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('Extended Label')).toBeInTheDocument();
    });

    it('should render icon when only icon is provided', () => {
      render(<RdsFab icon={icon} />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('should render label when only label is provided', () => {
      render(<RdsFab label="Label Only" />);
      expect(screen.getByText('Label Only')).toBeInTheDocument();
    });

    it('should render nothing when no content provided', () => {
      render(<RdsFab />);
      expect(fabEl()?.textContent).toBe('');
    });
  });

  describe('Position with Content', () => {
    it('should apply position styles with icon', () => {
      render(<RdsFab icon={<span>★</span>} position="bottom-right" />);
      expect(pos()).toBe('fixed');
    });

    it('should apply position styles with extended variant', () => {
      render(<RdsFab icon={<span>★</span>} label="Add" position="top-right" variant="extended" />);
      expect(pos()).toBe('fixed');
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid clicks', () => {
      const handleClick = jest.fn();
      setup({ onClick: handleClick });
      for (let i = 0; i < 10; i++) {
        fireEvent.click(fabEl());
      }
      expect(handleClick).toHaveBeenCalledTimes(10);
    });

    it('should handle empty string label', () => {
      const { container } = render(<RdsFab label="" icon={<span>Icon</span>} />);
      expect(container).toBeInTheDocument();
    });

    it('should handle empty icon element', () => {
      const { container } = render(<RdsFab icon={<span />} label="Label" variant="extended" />);
      expect(container).toBeInTheDocument();
    });

    it('should handle null children', () => {
      const { container } = setup({ children: null });
      expect(container).toBeInTheDocument();
    });

    it('should handle undefined children', () => {
      const { container } = setup({ children: undefined });
      expect(container).toBeInTheDocument();
    });

    it('should handle changing position prop', () => {
      const { rerender } = setup({ position: 'bottom-right' });
      expect(fabEl()).toBeInTheDocument();
      rerender(<RdsFab {...defaultProps} position="top-left" />);
      expect(fabEl()).toBeInTheDocument();
    });

    it('should handle toggling disabled state', () => {
      const { rerender } = setup({ disabled: false });
      expect(fabEl()).not.toHaveAttribute('disabled');
      rerender(<RdsFab {...defaultProps} disabled={true} />);
      expect(fabEl()).toHaveAttribute('disabled');
    });
  });

  describe('Accessibility', () => {
    it('should render with aria-label', () => {
      render(<RdsFab icon={<span>★</span>} aria-label="Add new item" />);
      expect(fabEl()).toHaveAttribute('aria-label', 'Add new item');
    });

    it('has no axe accessibility violations', async () => {
      const { container } = setup();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should be keyboard accessible with Tab key', () => {
      setup();
      fabEl().focus();
      expect(document.activeElement).toBe(fabEl());
    });

    it('should support Enter/Space key press', () => {
      const handleClick = jest.fn();
      setup({ onClick: handleClick });
      fireEvent.click(fabEl());
      expect(handleClick).toHaveBeenCalled();
    });

    it('should have proper role attribute', () => {
      setup();
      expect(fabEl()).toHaveAttribute('type', 'button');
    });

    it('should be disabled when disabled prop is true', () => {
      setup({ disabled: true, onClick: jest.fn() });
      fireEvent.click(fabEl());
      expect(fabEl()).toHaveAttribute('disabled');
    });

    it('should support aria-pressed for toggle behavior', () => {
      setup({ 'aria-pressed': false });
      expect(fabEl()).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('Responsive Behavior', () => {
    it('should render correctly with position prop on different screen sizes', () => {
      setup({ position: 'bottom-right' });
      expect(pos()).toBe('fixed');
    });

    it('should render with custom sx for responsive behavior', () => {
      const { container } = setup({ sx: { '@media (max-width: 600px)': { bottom: 10, right: 10 } } });
      expect(container).toBeInTheDocument();
    });
  });
});

describe('audit fixes', () => {
  describe('G1-264: array / mixed children', () => {
    it('renders mixed icon + text children', () => {
      render(
        <RdsFab variant="extended">
          <span data-testid="mixed-icon">+</span> Add
        </RdsFab>
      );
      expect(screen.getByTestId('mixed-icon')).toBeInTheDocument();
      expect(fabEl()).toHaveTextContent('+ Add');
    });

    it('renders an array of element children', () => {
      render(
        <RdsFab>
          {[<span key="a" data-testid="a">A</span>, <span key="b" data-testid="b">B</span>]}
        </RdsFab>
      );
      expect(screen.getByTestId('a')).toBeInTheDocument();
      expect(screen.getByTestId('b')).toBeInTheDocument();
    });

    it('renders fragment children', () => {
      render(
        <RdsFab>
          <>
            <span data-testid="frag-icon">+</span>
            Text
          </>
        </RdsFab>
      );
      expect(screen.getByTestId('frag-icon')).toBeInTheDocument();
      expect(screen.getByText('Text')).toBeInTheDocument();
    });

    it('keeps icon precedence over array children (unchanged behaviour)', () => {
      render(
        <RdsFab icon={<span data-testid="icon">I</span>}>
          <span data-testid="c1">1</span>
          <span data-testid="c2">2</span>
        </RdsFab>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.queryByTestId('c1')).not.toBeInTheDocument();
    });

    it('renders nothing for an array of empty children', () => {
      render(<RdsFab>{[null, false]}</RdsFab>);
      expect(fabEl()?.textContent).toBe('');
    });
  });

  describe('G1-265: label as accessible name for icon-only FAB', () => {
    it('uses label as aria-label when only the icon is shown', () => {
      render(<RdsFab icon={<span>★</span>} label="Add item" />);
      expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument();
      expect(screen.queryByText('Add item')).not.toBeInTheDocument();
    });

    it('consumer aria-label wins over label', () => {
      render(<RdsFab icon={<span>★</span>} label="Add item" aria-label="Create" />);
      expect(fabEl()).toHaveAttribute('aria-label', 'Create');
    });

    it('does not set aria-label when the label is visible (extended)', () => {
      render(<RdsFab icon={<span>★</span>} label="Add" variant="extended" />);
      expect(fabEl()).not.toHaveAttribute('aria-label');
    });

    it('does not set aria-label when only the label is shown', () => {
      render(<RdsFab label="Only label" />);
      expect(fabEl()).not.toHaveAttribute('aria-label');
    });

    it('does not set aria-label for an empty label', () => {
      render(<RdsFab icon={<span>★</span>} label="" />);
      expect(fabEl()).not.toHaveAttribute('aria-label');
    });

    it('does not set aria-label when children are rendered', () => {
      render(
        <RdsFab label="Label">
          <span>Child</span>
        </RdsFab>
      );
      expect(fabEl()).not.toHaveAttribute('aria-label');
    });

    it('has no axe violations for icon + label without aria-label', async () => {
      const { container } = render(<RdsFab icon={<span>★</span>} label="Add item" />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe('G1-266: sx merge', () => {
    it.each([
      ['array sx overriding position styles', 'bottom-right', [{ position: 'absolute' }], 'absolute'],
      ['function sx', 'top-left', () => ({ position: 'relative' }), 'relative'],
      ['array sx without position keeping position styles', 'top-left', [{ zIndex: 5 }], 'fixed'],
    ] as const)('supports %s', (_n, position, sx, expected) => {
      render(<RdsFab aria-label="x" icon={<span>★</span>} position={position} sx={sx as any} />);
      expect(pos()).toBe(expected);
    });
  });
});

describe('RdsFab additive renames', () => {
  const warn = jest.spyOn(deprecation, 'warnDeprecatedProp');
  beforeEach(() => warn.mockClear());

  it('pins the button with placement, and position still works with a warning', () => {
    const { unmount } = render(<RdsFab aria-label='Add' placement='bottom-left' />);
    expect(pos()).toBe('fixed');
    expect(warn).not.toHaveBeenCalled();
    unmount();
    render(<RdsFab aria-label='Add' position='top-right' />);
    expect(pos()).toBe('fixed');
    expect(warn).toHaveBeenCalledWith('RdsFab', 'position', '`placement`');
  });

  it('renders startIcon and names the icon-only button by label', () => {
    render(<RdsFab startIcon={<span data-testid="start-icon" />} label="Add" />);
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
    expect(warn).not.toHaveBeenCalled();
  });

  it('warns for icon', () => {
    render(<RdsFab icon={<span />} />);
    expect(warn).toHaveBeenCalledWith('RdsFab', 'icon', '`startIcon`');
  });

  it('forwards data-testid to the root button', () => {
    render(<RdsFab data-testid="add-fab" aria-label="Add" startIcon={<span>★</span>} />);
    expect(screen.getByTestId('add-fab')).toBe(screen.getByRole('button', { name: 'Add' }));
  });
});
