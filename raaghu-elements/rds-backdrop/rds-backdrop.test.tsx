import React from 'react';
import { render, screen } from '@testing-library/react';
import RdsBackdrop, { RdsBackdropProps } from './rds-backdrop';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

import { createTheme, ThemeProvider } from '@mui/material';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

jest.mock('./rds-backdrop.scss', () => ({}));
jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

describe('RdsBackdrop', () => {
  const defaultProps: RdsBackdropProps = {
    open: true,
  };
  const spinner = '.MuiCircularProgress-root';
  const root = (c: HTMLElement) => c.querySelector('.MuiBackdrop-root');
  const cls = (c: HTMLElement) => c.querySelector('.rds-backdrop');

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = render(<RdsBackdrop {...defaultProps} />);
      expect(cls(container)).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsBackdrop.displayName).toBe('RdsBackdrop');
    });

    it('should render MUI Backdrop component', () => {
      const { container } = render(<RdsBackdrop {...defaultProps} />);
      expect(root(container)).toBeInTheDocument();
    });

    it('should be hidden when open is false', () => {
      const { container } = render(<RdsBackdrop open={false} />);
      expect(root(container)).toHaveStyle('opacity: 0');
    });
  });

  describe('Loading State', () => {
    it('should render CircularProgress when loading is true', () => {
      const { container } = render(<RdsBackdrop loading={true} />);
      expect(container.querySelector(spinner)).toBeInTheDocument();
    });

    it('should not render CircularProgress when loading is false', () => {
      const { container } = render(<RdsBackdrop loading={false} />);
      expect(container.querySelector(spinner)).not.toBeInTheDocument();
    });

    it('should display content when loading is false', () => {
      render(<RdsBackdrop loading={false}><span>Test Content</span></RdsBackdrop>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should prioritize loading prop over open prop', () => {
      const { container } = render(<RdsBackdrop open={false} loading={true} />);
      expect(root(container)).toBeInTheDocument();
    });
  });

  describe('Custom Loading Component', () => {
    it('should render custom loading component', () => {
      render(<RdsBackdrop loading={true} loadingComponent={<div data-testid="custom-loader">Loading...</div>} />);
      expect(screen.getByTestId('custom-loader')).toBeInTheDocument();
    });

    it('should use custom loading component instead of CircularProgress', () => {
      const { container } = render(<RdsBackdrop loading={true} loadingComponent={<span>Custom Loader</span>} />);
      expect(screen.getByText('Custom Loader')).toBeInTheDocument();
      expect(container.querySelector(spinner)).not.toBeInTheDocument();
    });

    it('should display custom component with text', () => {
      render(<RdsBackdrop loading={true} loadingComponent={<div>Please wait...</div>} />);
      expect(screen.getByText('Please wait...')).toBeInTheDocument();
    });

    it('should render complex custom loading component', () => {
      const customLoader = (
        <div data-testid="custom-complex-loader">
          <span>Loading</span>
          <span>with multiple elements</span>
        </div>
      );
      render(<RdsBackdrop loading={true} loadingComponent={customLoader} />);
      expect(screen.getByTestId('custom-complex-loader')).toBeInTheDocument();
    });
  });

  describe('Open Props', () => {
    it('should be open when open prop is true', () => {
      const { container } = render(<RdsBackdrop open={true} />);
      expect(root(container)).toBeInTheDocument();
    });

    it('should toggle visibility with open prop changes', () => {
      const { container, rerender } = render(<RdsBackdrop open={false} />);
      expect(root(container)).toHaveStyle('opacity: 0');
      rerender(<RdsBackdrop open={true} />);
      expect(root(container)).toBeInTheDocument();
    });
  });

  describe('Children Rendering', () => {
    it('should render children when loading is false', () => {
      render(
        <RdsBackdrop loading={false}>
          <span>Child Content</span>
        </RdsBackdrop>
      );
      expect(screen.getByText('Child Content')).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      render(
        <RdsBackdrop loading={false}>
          <span>First</span>
          <span>Second</span>
        </RdsBackdrop>
      );
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
    });

    it('should render children component', () => {
      const ChildComponent = () => <div>Component Content</div>;
      render(
        <RdsBackdrop loading={false}>
          <ChildComponent />
        </RdsBackdrop>
      );
      expect(screen.getByText('Component Content')).toBeInTheDocument();
    });

    it('should not render children when loading is true', () => {
      const { container } = render(
        <RdsBackdrop loading={true}>
          <span>Hidden Content</span>
        </RdsBackdrop>
      );
      expect(container.querySelector(spinner)).toBeInTheDocument();
    });

    it('should render children with open prop', () => {
      render(
        <RdsBackdrop open={true}>
          <span>Backdrop Content</span>
        </RdsBackdrop>
      );
      expect(screen.getByText('Backdrop Content')).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    it('should accept custom className', () => {
      const { container } = render(<RdsBackdrop open={true} className="custom-class" />);
      expect(cls(container)).toHaveClass('custom-class');
    });

    it('should combine default and custom classes', () => {
      const { container } = render(<RdsBackdrop open={true} className="custom-1 custom-2" />);
      const backdrop = cls(container);
      expect(backdrop).toHaveClass('rds-backdrop');
      expect(backdrop).toHaveClass('custom-1');
      expect(backdrop).toHaveClass('custom-2');
    });

    it('should accept sx prop for custom styling', () => {
      const { container } = render(<RdsBackdrop open={true} sx={{ backgroundColor: 'rgba(255, 0, 0, 0.5)' }} />);
      expect(root(container)).toBeInTheDocument();
    });

    it('should trim whitespace in className', () => {
      const { container } = render(<RdsBackdrop open={true} className="  custom-class  " />);
      expect(cls(container)?.className).not.toContain('  ');
    });

    it('should handle empty className', () => {
      const { container } = render(<RdsBackdrop open={true} className="" />);
      expect(cls(container)).toBeInTheDocument();
    });

    it('should handle special characters in className', () => {
      const { container } = render(<RdsBackdrop open={true} className="custom-class_1 custom-class-2" />);
      expect(cls(container)).toHaveClass('custom-class_1');
      expect(cls(container)).toHaveClass('custom-class-2');
    });
  });

  describe('MUI Props Integration', () => {
    it.each([
      ['onClick', { onClick: () => {} }],
      ['transitionDuration', { transitionDuration: 500 }],
      ['invisible', { invisible: false }],
    ])('should accept %s prop', (_n, extra) => {
      const { container } = render(<RdsBackdrop open={true} {...extra} />);
      expect(root(container)).toBeInTheDocument();
    });

    it('should spread rest props to MuiBackdrop', () => {
      const { container } = render(<RdsBackdrop open={true} data-testid="backdrop" />);
      expect(container.querySelector('[data-testid="backdrop"]')).toBeInTheDocument();
    });
  });

  describe('Combined Props', () => {
    it('should handle all props together', () => {
      render(
        <RdsBackdrop open={true} loading={false} loadingComponent={<div>Loader</div>} className="custom-backdrop">
          <span>Content</span>
        </RdsBackdrop>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should handle loading with custom loader and className', () => {
      render(<RdsBackdrop loading={true} loadingComponent={<span>Custom Loader</span>} className="loading-overlay" />);
      expect(screen.getByText('Custom Loader')).toBeInTheDocument();
    });

    it('should handle open false with loading false', () => {
      const { container } = render(
        <RdsBackdrop open={false} loading={false}>
          <span>Hidden</span>
        </RdsBackdrop>
      );
      expect(root(container)).toHaveStyle('opacity: 0');
    });
  });

  describe('Default Props', () => {
    it('should have loading false by default', () => {
      const { container } = render(<RdsBackdrop open={true} />);
      expect(container.querySelector(spinner)).not.toBeInTheDocument();
    });

    it('should default to closed state', () => {
      const { container } = render(<RdsBackdrop />);
      expect(root(container)).toHaveStyle('opacity: 0');
    });
  });

  describe('Edge Cases', () => {
    it.each([undefined, null])('should handle %s children', (children) => {
      const { container } = render(<RdsBackdrop open={true}>{children}</RdsBackdrop>);
      expect(root(container)).toBeInTheDocument();
    });

    it('should handle fragment as children', () => {
      render(
        <RdsBackdrop loading={false}>
          <>
            <span>First</span>
            <span>Second</span>
          </>
        </RdsBackdrop>
      );
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
    });

    it('should handle rapid loading state changes', () => {
      const { rerender, container } = render(<RdsBackdrop loading={true} />);
      expect(container.querySelector(spinner)).toBeInTheDocument();
      rerender(<RdsBackdrop loading={false}><span>Content</span></RdsBackdrop>);
      expect(screen.getByText('Content')).toBeInTheDocument();
      rerender(<RdsBackdrop loading={true} />);
      expect(container.querySelector(spinner)).toBeInTheDocument();
    });

    it('should handle rapid open state changes', () => {
      const { rerender, container } = render(<RdsBackdrop open={true} />);
      expect(root(container)).toBeInTheDocument();
      rerender(<RdsBackdrop open={false} />);
      expect(root(container)).toHaveStyle('opacity: 0');
      rerender(<RdsBackdrop open={true} />);
      expect(root(container)).toBeInTheDocument();
    });

    it('should handle very long custom loader text', () => {
      render(<RdsBackdrop loading={true} loadingComponent={<span>Loading</span>} />);
      expect(screen.getByText('Loading')).toBeInTheDocument();
    });

    it('should handle backdrop without any props', () => {
      const { container } = render(<RdsBackdrop />);
      expect(cls(container)).toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    it('should accept boolean open prop', () => {
      const { container } = render(<RdsBackdrop open={true} />);
      expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
    });

    it('should accept string className', () => {
      const { container } = render(<RdsBackdrop open={true} className="test-class" />);
      expect(container.querySelector('.test-class')).toBeInTheDocument();
    });

    it.each([
      [true, true],
      [true, false],
      [false, true],
      [false, false],
    ])('should handle loading=%s open=%s', (loading, open) => {
      const { container } = render(
        <RdsBackdrop loading={loading} open={open}>
          <span>Content</span>
        </RdsBackdrop>
      );
      expect(root(container)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsBackdrop {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('audit fixes', () => {
    beforeEach(() => {
      (warnDeprecatedProp as jest.Mock).mockClear();
    });

    it('G1-079: accepts an array sx and still applies the base styles', () => {
      const { container } = render(
        <RdsBackdrop open={true} sx={[{ backgroundColor: 'rgb(255, 0, 0)' }, false, { color: 'rgb(0, 0, 255)' }]} />
      );
      expect(cls(container)).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)', color: 'rgb(0, 0, 255)' });
      expect(cls(container)).toHaveStyle({ position: 'fixed' });
    });

    it('G1-079: accepts a function sx', () => {
      const { container } = render(<RdsBackdrop open={true} sx={() => ({ backgroundColor: 'rgb(0, 128, 0)' })} />);
      expect(cls(container)).toHaveStyle({ backgroundColor: 'rgb(0, 128, 0)' });
    });

    it('G1-079: consumer object sx overrides base styles', () => {
      const { container } = render(<RdsBackdrop open={true} sx={{ '&.rds-backdrop': { position: 'absolute' } }} />);
      expect(cls(container)).toHaveStyle({ position: 'absolute' });
    });

    it('G1-081: z-index fallback follows theme.zIndex.modal', () => {
      const { container } = render(
        <ThemeProvider theme={createTheme({ zIndex: { modal: 1450 } })}>
          <RdsBackdrop open={true} />
        </ThemeProvider>
      );
      expect(getComputedStyle(cls(container) as HTMLElement).zIndex).toBe('var(--rds-z-index-overlay, 1450)');
    });

    it('G1-081: default theme keeps z-index fallback 1300', () => {
      const { container } = render(<RdsBackdrop open={true} />);
      expect(getComputedStyle(cls(container) as HTMLElement).zIndex).toBe('var(--rds-z-index-overlay, 1300)');
    });

    it('G1-083: renders a string loading indicator', () => {
      const { container } = render(<RdsBackdrop loading={true} loadingIndicator="Please wait" />);
      expect(screen.getByText('Please wait')).toBeInTheDocument();
      expect(container.querySelector(spinner)).not.toBeInTheDocument();
    });

    it('G1-083: renders a number loading indicator', () => {
      render(<RdsBackdrop loading={true} loadingIndicator={42} />);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('G1-083: renders an array loading indicator', () => {
      render(<RdsBackdrop loading={true} loadingIndicator={[<span key="a">One</span>, <span key="b">Two</span>]} />);
      expect(screen.getByText('One')).toBeInTheDocument();
      expect(screen.getByText('Two')).toBeInTheDocument();
    });

    it.each([null, undefined, true, false])('G1-083: falls back to the spinner for %s', (value) => {
      const { container } = render(<RdsBackdrop loading={true} loadingIndicator={value} />);
      expect(container.querySelector(spinner)).toBeInTheDocument();
    });

    it('G1-083: deprecated loadingComponent also accepts a string', () => {
      render(<RdsBackdrop loading={true} loadingComponent="Loading text" />);
      expect(screen.getByText('Loading text')).toBeInTheDocument();
    });

    it('loadingIndicator renders a custom element', () => {
      render(<RdsBackdrop loading={true} loadingIndicator={<span data-testid="indicator">Wait</span>} />);
      expect(screen.getByTestId('indicator')).toBeInTheDocument();
      expect(warnDeprecatedProp).not.toHaveBeenCalled();
    });

    it('loadingComponent warns as deprecated and still works', () => {
      render(<RdsBackdrop loading={true} loadingComponent={<span>Old loader</span>} />);
      expect(screen.getByText('Old loader')).toBeInTheDocument();
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsBackdrop', 'loadingComponent', '`loadingIndicator`');
    });

    it('loadingIndicator wins over loadingComponent', () => {
      render(
        <RdsBackdrop loading={true} loadingIndicator={<span>New loader</span>} loadingComponent={<span>Old loader</span>} />
      );
      expect(screen.getByText('New loader')).toBeInTheDocument();
      expect(screen.queryByText('Old loader')).not.toBeInTheDocument();
    });

    it('default spinner has an accessible name', () => {
      const { container } = render(<RdsBackdrop loading={true} />);
      const el = container.querySelector(spinner);
      expect(el).toHaveAttribute('role', 'progressbar');
      expect(el).toHaveAttribute('aria-label', 'Loading');
    });

    it('explicit className and sx are not overwritten by rest props', () => {
      const { container } = render(<RdsBackdrop open={true} className="mine" data-testid="bd" />);
      const el = container.querySelector('[data-testid="bd"]');
      expect(el).toHaveClass('rds-backdrop');
      expect(el).toHaveClass('mine');
    });
  });
});
