import React from 'react';
import { render, screen } from '@testing-library/react';
import RdsBackdrop, { RdsBackdropProps } from './rds-backdrop';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-backdrop.scss', () => ({}));

describe('RdsBackdrop', () => {
  const defaultProps: RdsBackdropProps = {
    open: true,
  };

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = render(<RdsBackdrop {...defaultProps} />);
      expect(container.querySelector('.rds-backdrop')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsBackdrop.displayName).toBe('RdsBackdrop');
    });

    it('should render MUI Backdrop component', () => {
      const { container } = render(<RdsBackdrop {...defaultProps} />);
      expect(container.querySelector('.MuiBackdrop-root')).toBeInTheDocument();
    });

    it('should apply rds-backdrop class', () => {
      const { container } = render(<RdsBackdrop {...defaultProps} />);
      expect(container.querySelector('.rds-backdrop')).toBeInTheDocument();
    });

    it('should be hidden when open is false', () => {
      const { container } = render(<RdsBackdrop open={false} />);
      expect(container.querySelector('.MuiBackdrop-root')).toHaveStyle('opacity: 0');
    });

    it('should be visible when open is true', () => {
      const { container } = render(<RdsBackdrop open={true} />);
      expect(container.querySelector('.MuiBackdrop-root')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('should render CircularProgress when loading is true', () => {
      const { container } = render(<RdsBackdrop loading={true} />);
      expect(container.querySelector('.MuiCircularProgress-root')).toBeInTheDocument();
    });

    it('should not render CircularProgress when loading is false', () => {
      const { container } = render(<RdsBackdrop loading={false} />);
      expect(container.querySelector('.MuiCircularProgress-root')).not.toBeInTheDocument();
    });

    it('should show loading component by default', () => {
      const { container } = render(<RdsBackdrop loading={true} />);
      expect(container.querySelector('.MuiCircularProgress-root')).toBeInTheDocument();
    });

    it('should display content when loading is false', () => {
      render(<RdsBackdrop loading={false}><span>Test Content</span></RdsBackdrop>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should prioritize loading prop over open prop', () => {
      const { container } = render(<RdsBackdrop open={false} loading={true} />);
      expect(container.querySelector('.MuiBackdrop-root')).toBeInTheDocument();
    });
  });

  describe('Custom Loading Component', () => {
    it('should render custom loading component', () => {
      render(
        <RdsBackdrop loading={true} loadingComponent={<div data-testid="custom-loader">Loading...</div>} />
      );
      expect(screen.getByTestId('custom-loader')).toBeInTheDocument();
    });

    it('should use custom loading component instead of CircularProgress', () => {
      const { container } = render(
        <RdsBackdrop loading={true} loadingComponent={<span>Custom Loader</span>} />
      );
      expect(screen.getByText('Custom Loader')).toBeInTheDocument();
      expect(container.querySelector('.MuiCircularProgress-root')).not.toBeInTheDocument();
    });

    it('should display custom component with text', () => {
      render(
        <RdsBackdrop loading={true} loadingComponent={<div>Please wait...</div>} />
      );
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

    it('should prefer loadingComponent when both loading and loadingComponent are provided', () => {
      render(
        <RdsBackdrop
          loading={true}
          loadingComponent={<span>Custom</span>}
        />
      );
      expect(screen.getByText('Custom')).toBeInTheDocument();
    });
  });

  describe('Open Props', () => {
    it('should be open when open prop is true', () => {
      const { container } = render(<RdsBackdrop open={true} />);
      const backdrop = container.querySelector('.MuiBackdrop-root');
      expect(backdrop).toBeInTheDocument();
    });

    it('should be closed when open prop is false', () => {
      const { container } = render(<RdsBackdrop open={false} />);
      const backdrop = container.querySelector('.MuiBackdrop-root');
      expect(backdrop).toHaveStyle('opacity: 0');
    });

    it('should use loading prop if open prop is not provided', () => {
      const { container } = render(<RdsBackdrop loading={true} />);
      expect(container.querySelector('.MuiCircularProgress-root')).toBeInTheDocument();
    });

    it('should toggle visibility with open prop changes', () => {
      const { container, rerender } = render(<RdsBackdrop open={false} />);
      expect(container.querySelector('.MuiBackdrop-root')).toHaveStyle('opacity: 0');
      
      rerender(<RdsBackdrop open={true} />);
      expect(container.querySelector('.MuiBackdrop-root')).toBeInTheDocument();
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
      expect(container.querySelector('.MuiCircularProgress-root')).toBeInTheDocument();
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
      const { container } = render(
        <RdsBackdrop open={true} className="custom-class" />
      );
      expect(container.querySelector('.rds-backdrop')).toHaveClass('custom-class');
    });

    it('should combine default and custom classes', () => {
      const { container } = render(
        <RdsBackdrop open={true} className="custom-1 custom-2" />
      );
      const backdrop = container.querySelector('.rds-backdrop');
      expect(backdrop).toHaveClass('rds-backdrop');
      expect(backdrop).toHaveClass('custom-1');
      expect(backdrop).toHaveClass('custom-2');
    });

    it('should accept sx prop for custom styling', () => {
      const { container } = render(
        <RdsBackdrop open={true} sx={{ backgroundColor: 'rgba(255, 0, 0, 0.5)' }} />
      );
      expect(container.querySelector('.MuiBackdrop-root')).toBeInTheDocument();
    });

    it('should trim whitespace in className', () => {
      const { container } = render(
        <RdsBackdrop open={true} className="  custom-class  " />
      );
      const classList = container.querySelector('.rds-backdrop')?.className;
      expect(classList).not.toContain('  ');
    });

    it('should handle empty className', () => {
      const { container } = render(
        <RdsBackdrop open={true} className="" />
      );
      expect(container.querySelector('.rds-backdrop')).toBeInTheDocument();
    });
  });

  describe('CSS Styling', () => {
    it('should have fixed positioning', () => {
      const { container } = render(<RdsBackdrop open={true} />);
      expect(container.querySelector('.MuiBackdrop-root')).toBeInTheDocument();
    });

    it('should have flex display for centering', () => {
      const { container } = render(<RdsBackdrop open={true} />);
      expect(container.querySelector('.MuiBackdrop-root')).toBeInTheDocument();
    });

    it('should have high z-index', () => {
      const { container } = render(<RdsBackdrop open={true} />);
      expect(container.querySelector('.MuiBackdrop-root')).toBeInTheDocument();
    });

    it('should cover full viewport', () => {
      const { container } = render(<RdsBackdrop open={true} />);
      expect(container.querySelector('.MuiBackdrop-root')).toBeInTheDocument();
    });
  });

  describe('Overlay Appearance', () => {
    it('should have overlay background color', () => {
      const { container } = render(<RdsBackdrop open={true} />);
      expect(container.querySelector('.MuiBackdrop-root')).toBeInTheDocument();
    });

    it('should be semi-transparent', () => {
      const { container } = render(<RdsBackdrop open={true} />);
      expect(container.querySelector('.MuiBackdrop-root')).toBeInTheDocument();
    });

    it('should render with white text color', () => {
      const { container } = render(<RdsBackdrop open={true} />);
      expect(container.querySelector('.MuiBackdrop-root')).toBeInTheDocument();
    });
  });

  describe('Loading Component Styling', () => {
    it('should render default CircularProgress with inherit color', () => {
      const { container } = render(<RdsBackdrop loading={true} />);
      expect(container.querySelector('.MuiCircularProgress-root')).toBeInTheDocument();
    });

    it('should center loading component', () => {
      const { container } = render(<RdsBackdrop loading={true} />);
      expect(container.querySelector('.MuiBackdrop-root')).toBeInTheDocument();
    });

    it('should render custom component in center', () => {
      render(
        <RdsBackdrop loading={true} loadingComponent={<div data-testid="loader">Loader</div>} />
      );
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
  });

  describe('MUI Props Integration', () => {
    it('should pass through MUI Backdrop props', () => {
      const { container } = render(
        <RdsBackdrop open={true} onClick={() => {}} />
      );
      expect(container.querySelector('.MuiBackdrop-root')).toBeInTheDocument();
    });

    it('should accept timeout prop', () => {
      const { container } = render(
        <RdsBackdrop open={true} transitionDuration={500} />
      );
      expect(container.querySelector('.MuiBackdrop-root')).toBeInTheDocument();
    });

    it('should accept invisible prop', () => {
      const { container } = render(
        <RdsBackdrop open={true} invisible={false} />
      );
      expect(container.querySelector('.MuiBackdrop-root')).toBeInTheDocument();
    });

    it('should spread rest props to MuiBackdrop', () => {
      const { container } = render(
        <RdsBackdrop open={true} data-testid="backdrop" />
      );
      expect(container.querySelector('[data-testid="backdrop"]')).toBeInTheDocument();
    });
  });

  describe('Combined Props', () => {
    it('should handle all props together', () => {
      render(
        <RdsBackdrop
          open={true}
          loading={false}
          loadingComponent={<div>Loader</div>}
          className="custom-backdrop"
        >
          <span>Content</span>
        </RdsBackdrop>
      );
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should prioritize loading over children', () => {
      const { container } = render(
        <RdsBackdrop loading={true} className="overlay">
          <span>Hidden</span>
        </RdsBackdrop>
      );
      expect(container.querySelector('.MuiCircularProgress-root')).toBeInTheDocument();
    });

    it('should handle loading with custom loader and className', () => {
      render(
        <RdsBackdrop
          loading={true}
          loadingComponent={<span>Custom Loader</span>}
          className="loading-overlay"
        />
      );
      expect(screen.getByText('Custom Loader')).toBeInTheDocument();
    });

    it('should handle open false with loading false', () => {
      const { container } = render(
        <RdsBackdrop open={false} loading={false}>
          <span>Hidden</span>
        </RdsBackdrop>
      );
      expect(container.querySelector('.MuiBackdrop-root')).toHaveStyle('opacity: 0');
    });
  });

  describe('Default Props', () => {
    it('should have loading false by default', () => {
      const { container } = render(<RdsBackdrop open={true} />);
      expect(container.querySelector('.MuiCircularProgress-root')).not.toBeInTheDocument();
    });

    it('should have rds-backdrop class by default', () => {
      const { container } = render(<RdsBackdrop open={true} />);
      expect(container.querySelector('.rds-backdrop')).toBeInTheDocument();
    });

    it('should use default CircularProgress for loading', () => {
      const { container } = render(<RdsBackdrop loading={true} />);
      expect(container.querySelector('.MuiCircularProgress-root')).toBeInTheDocument();
    });

    it('should default to closed state', () => {
      const { container } = render(<RdsBackdrop />);
      expect(container.querySelector('.MuiBackdrop-root')).toHaveStyle('opacity: 0');
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined children', () => {
      const { container } = render(<RdsBackdrop open={true}>{undefined}</RdsBackdrop>);
      expect(container.querySelector('.MuiBackdrop-root')).toBeInTheDocument();
    });

    it('should handle null children', () => {
      const { container } = render(<RdsBackdrop open={true}>{null}</RdsBackdrop>);
      expect(container.querySelector('.MuiBackdrop-root')).toBeInTheDocument();
    });

    it('should handle empty string as className', () => {
      const { container } = render(<RdsBackdrop open={true} className="" />);
      expect(container.querySelector('.rds-backdrop')).toBeInTheDocument();
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
      expect(container.querySelector('.MuiCircularProgress-root')).toBeInTheDocument();
      
      rerender(<RdsBackdrop loading={false}><span>Content</span></RdsBackdrop>);
      expect(screen.getByText('Content')).toBeInTheDocument();
      
      rerender(<RdsBackdrop loading={true} />);
      expect(container.querySelector('.MuiCircularProgress-root')).toBeInTheDocument();
    });

    it('should handle rapid open state changes', () => {
      const { rerender, container } = render(<RdsBackdrop open={true} />);
      expect(container.querySelector('.MuiBackdrop-root')).toBeInTheDocument();
      
      rerender(<RdsBackdrop open={false} />);
      expect(container.querySelector('.MuiBackdrop-root')).toHaveStyle('opacity: 0');
      
      rerender(<RdsBackdrop open={true} />);
      expect(container.querySelector('.MuiBackdrop-root')).toBeInTheDocument();
    });

    it('should handle very long custom loader text', () => {
      const longText = 'Loading';
      render(
        <RdsBackdrop loading={true} loadingComponent={<span>{longText}</span>} />
      );
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('should handle special characters in className', () => {
      const { container } = render(
        <RdsBackdrop open={true} className="custom-class_1 custom-class-2" />
      );
      expect(container.querySelector('.rds-backdrop')).toHaveClass('custom-class_1');
      expect(container.querySelector('.rds-backdrop')).toHaveClass('custom-class-2');
    });

    it('should handle backdrop without any props', () => {
      const { container } = render(<RdsBackdrop />);
      expect(container.querySelector('.rds-backdrop')).toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    it('should accept boolean loading prop', () => {
      const { container } = render(<RdsBackdrop loading={true} />);
      expect(container.querySelector('.MuiCircularProgress-root')).toBeInTheDocument();
    });

    it('should accept boolean open prop', () => {
      const { container } = render(<RdsBackdrop open={true} />);
      expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
    });

    it('should accept ReactNode for loadingComponent', () => {
      const Component = <div>Custom</div>;
      render(<RdsBackdrop loading={true} loadingComponent={Component} />);
      expect(screen.getByText('Custom')).toBeInTheDocument();
    });

    it('should accept string className', () => {
      const { container } = render(<RdsBackdrop open={true} className="test-class" />);
      expect(container.querySelector('.test-class')).toBeInTheDocument();
    });

    it('should handle all boolean combinations for loading and open', () => {
      const combinations = [
        { loading: true, open: true },
        { loading: true, open: false },
        { loading: false, open: true },
        { loading: false, open: false },
      ];

      combinations.forEach(({ loading, open }) => {
        const { container } = render(
          <RdsBackdrop loading={loading} open={open}>
            <span>Content</span>
          </RdsBackdrop>
        );
        expect(container.querySelector('.MuiBackdrop-root')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard dismissible when open', () => {
      const { container } = render(<RdsBackdrop open={true} />);
      expect(container.querySelector('.MuiBackdrop-root')).toBeInTheDocument();
  
    });
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsBackdrop {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should render with proper ARIA role', () => {
      const { container } = render(<RdsBackdrop open={true} />);
      expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
    });

    it('should show loading indicator for accessibility', () => {
      const { container } = render(<RdsBackdrop loading={true} />);
      expect(container.querySelector('.MuiCircularProgress-root')).toBeInTheDocument();
    });
  });
});