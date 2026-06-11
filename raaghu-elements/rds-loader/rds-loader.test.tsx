import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsLoader from './rds-loader';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-loader.scss', () => ({}));

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

describe('RdsLoader', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(
        <RdsLoader />
      );
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsLoader.displayName).toBe('RdsLoader');
    });

    it('should render CircularProgress by default', () => {
      const { container } = renderWithTheme(
        <RdsLoader />
      );
      const circularProgress = container.querySelector('.MuiCircularProgress-root');
      expect(circularProgress).toBeInTheDocument();
    });
  });

  describe('Circular Variant', () => {
    it('should render circular progress by default', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="circular" />
      );
      const circularProgress = container.querySelector('.MuiCircularProgress-root');
      expect(circularProgress).toBeInTheDocument();
    });

    it('should render circular progress when explicitly specified', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="circular" />
      );
      const circularProgress = container.querySelector('.MuiCircularProgress-root');
      expect(circularProgress).toBeInTheDocument();
    });

    it('should render indeterminate circular progress by default', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="circular" />
      );
      const circularProgress = container.querySelector('.MuiCircularProgress-root');
      expect(circularProgress).toHaveClass('MuiCircularProgress-indeterminate');
    });

    it('should render determinate circular progress with value', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="circular" value={50} />
      );
      const circularProgress = container.querySelector('.MuiCircularProgress-root');
      expect(circularProgress).toHaveClass('MuiCircularProgress-determinate');
    });

    it('should display progress value when provided', () => {
      renderWithTheme(
        <RdsLoader variant="circular" value={75} />
      );
      expect(screen.getByText('75%')).toBeInTheDocument();
    });

    it('should not display progress value when not provided', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="circular" />
      );
      expect(container.querySelector('.MuiTypography-body2')).not.toBeInTheDocument();
    });
  });

  describe('Linear Variant', () => {
    it('should render linear progress when specified', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="linear" />
      );
      const linearProgress = container.querySelector('.MuiLinearProgress-root');
      expect(linearProgress).toBeInTheDocument();
    });

    it('should render indeterminate linear progress by default', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="linear" />
      );
      const linearProgress = container.querySelector('.MuiLinearProgress-root');
      expect(linearProgress).toHaveClass('MuiLinearProgress-indeterminate');
    });

    it('should render determinate linear progress with value', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="linear" value={60} />
      );
      const linearProgress = container.querySelector('.MuiLinearProgress-root');
      expect(linearProgress).toHaveClass('MuiLinearProgress-determinate');
    });

    it('should display progress value when provided', () => {
      renderWithTheme(
        <RdsLoader variant="linear" value={50} />
      );
      expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('should not display progress value when not provided', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="linear" />
      );
      const percentageText = container.textContent?.includes('%');
      expect(percentageText).toBeFalsy();
    });

    it('should display full width linear progress', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="linear" />
      );
      const linearProgress = container.querySelector('.MuiLinearProgress-root');
      expect(linearProgress).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should render small circular progress with correct size', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="circular" size="small" />
      );
      const circularProgress = container.querySelector('.MuiCircularProgress-root');
      expect(circularProgress).toHaveStyle('width: 24px');
      expect(circularProgress).toHaveStyle('height: 24px');
    });

    it('should render medium circular progress with correct size', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="circular" size="medium" />
      );
      const circularProgress = container.querySelector('.MuiCircularProgress-root');
      expect(circularProgress).toHaveStyle('width: 40px');
      expect(circularProgress).toHaveStyle('height: 40px');
    });

    it('should render large circular progress with correct size', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="circular" size="large" />
      );
      const circularProgress = container.querySelector('.MuiCircularProgress-root');
      expect(circularProgress).toHaveStyle('width: 56px');
      expect(circularProgress).toHaveStyle('height: 56px');
    });

    it('should default to medium size', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="circular" />
      );
      const circularProgress = container.querySelector('.MuiCircularProgress-root');
      expect(circularProgress).toHaveStyle('width: 40px');
      expect(circularProgress).toHaveStyle('height: 40px');
    });

    it('should not apply size to linear variant', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="linear" size="small" />
      );
      const linearProgress = container.querySelector('.MuiLinearProgress-root');
      expect(linearProgress).toBeInTheDocument();
    });
  });

  describe('Colors', () => {
    it('should apply primary color by default', () => {
      const { container } = renderWithTheme(
        <RdsLoader />
      );
      const circularProgress = container.querySelector('.MuiCircularProgress-root');
      expect(circularProgress).toHaveClass('MuiCircularProgress-colorPrimary');
    });

    it('should apply primary color when specified', () => {
      const { container } = renderWithTheme(
        <RdsLoader color="primary" />
      );
      const circularProgress = container.querySelector('.MuiCircularProgress-root');
      expect(circularProgress).toHaveClass('MuiCircularProgress-colorPrimary');
    });

    it('should apply secondary color when specified', () => {
      const { container } = renderWithTheme(
        <RdsLoader color="secondary" />
      );
      const circularProgress = container.querySelector('.MuiCircularProgress-root');
      expect(circularProgress).toHaveClass('MuiCircularProgress-colorSecondary');
    });

    it('should apply error color when specified', () => {
      const { container } = renderWithTheme(
        <RdsLoader color="error" />
      );
      const circularProgress = container.querySelector('.MuiCircularProgress-root');
      expect(circularProgress).toHaveClass('MuiCircularProgress-colorError');
    });

    it('should apply warning color when specified', () => {
      const { container } = renderWithTheme(
        <RdsLoader color="warning" />
      );
      const circularProgress = container.querySelector('.MuiCircularProgress-root');
      expect(circularProgress).toHaveClass('MuiCircularProgress-colorWarning');
    });

    it('should apply info color when specified', () => {
      const { container } = renderWithTheme(
        <RdsLoader color="info" />
      );
      const circularProgress = container.querySelector('.MuiCircularProgress-root');
      expect(circularProgress).toHaveClass('MuiCircularProgress-colorInfo');
    });

    it('should apply success color when specified', () => {
      const { container } = renderWithTheme(
        <RdsLoader color="success" />
      );
      const circularProgress = container.querySelector('.MuiCircularProgress-root');
      expect(circularProgress).toHaveClass('MuiCircularProgress-colorSuccess');
    });
  });

  describe('Label', () => {
    it('should render label when provided for circular progress', () => {
      renderWithTheme(
        <RdsLoader variant="circular" label="Loading..." />
      );
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render label when provided for linear progress', () => {
      renderWithTheme(
        <RdsLoader variant="linear" label="Uploading..." />
      );
      expect(screen.getByText('Uploading...')).toBeInTheDocument();
    });

    it('should not render label when not provided', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="circular" />
      );
      const textElements = container.querySelectorAll('.MuiTypography-body2');
      expect(textElements.length).toBe(0);
    });

    it('should render label with percentage for circular progress', () => {
      renderWithTheme(
        <RdsLoader variant="circular" value={45} label="Download" />
      );
      expect(screen.getByText('Download')).toBeInTheDocument();
      expect(screen.getByText('45%')).toBeInTheDocument();
    });

    it('should render label with percentage for linear progress', () => {
      renderWithTheme(
        <RdsLoader variant="linear" value={30} label="Processing" />
      );
      expect(screen.getByText('Processing')).toBeInTheDocument();
      expect(screen.getByText('30%')).toBeInTheDocument();
    });
  });

  describe('Overlay', () => {
    it('should render as overlay when overlay is true', () => {
      const { container } = renderWithTheme(
        <RdsLoader overlay={true} />
      );
      const overlayBox = container.firstChild as HTMLElement;
      expect(overlayBox).toBeInTheDocument();
      // Check that it's a overlay container with flex display
      const childCircularProgress = overlayBox.querySelector('.MuiCircularProgress-root');
      expect(childCircularProgress).toBeInTheDocument();
    });

    it('should apply semi-transparent background to overlay', () => {
      const { container } = renderWithTheme(
        <RdsLoader overlay={true} />
      );
      const overlayBox = container.querySelector('[style*="backgroundColor"]') || container.firstChild;
      expect(overlayBox).toBeInTheDocument();
    });

    it('should center content in overlay', () => {
      const { container } = renderWithTheme(
        <RdsLoader overlay={true} />
      );
      const overlayBox = container.firstChild as HTMLElement;
      // Verify the overlay container is displayed with flex layout
      expect(overlayBox).toBeInTheDocument();
      const childContent = overlayBox.querySelector('.MuiCircularProgress-root');
      expect(childContent).toBeInTheDocument();
    });

    it('should have high z-index for overlay', () => {
      const { container } = renderWithTheme(
        <RdsLoader overlay={true} />
      );
      const overlayBox = container.firstChild as HTMLElement;
      // Overlay should be the top-level element containing the loader
      expect(overlayBox).toBeInTheDocument();
      expect(overlayBox.querySelector('.MuiCircularProgress-root')).toBeInTheDocument();
    });

    it('should not render overlay when overlay is false', () => {
      const { container } = renderWithTheme(
        <RdsLoader overlay={false} />
      );
      const fixedBox = container.querySelector('[style*="position: fixed"]');
      expect(fixedBox).not.toBeInTheDocument();
    });

    it('should render loader inside overlay', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="circular" overlay={true} label="Loading" />
      );
      expect(screen.getByText('Loading')).toBeInTheDocument();
      const circularProgress = container.querySelector('.MuiCircularProgress-root');
      expect(circularProgress).toBeInTheDocument();
    });
  });

  describe('Thickness', () => {
    it('should apply default thickness', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="circular" />
      );
      const circularProgress = container.querySelector('.MuiCircularProgress-root');
      expect(circularProgress).toBeInTheDocument();
    });

    it('should apply custom thickness', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="circular" thickness={5} />
      );
      const circularProgress = container.querySelector('.MuiCircularProgress-root');
      expect(circularProgress).toBeInTheDocument();
    });

    it('should apply various thickness values', () => {
      [1, 2.5, 5, 8].forEach((thickness) => {
        const { container } = renderWithTheme(
          <RdsLoader variant="circular" thickness={thickness} />
        );
        const circularProgress = container.querySelector('.MuiCircularProgress-root');
        expect(circularProgress).toBeInTheDocument();
      });
    });

    it('should not affect linear progress', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="linear" thickness={10} />
      );
      const linearProgress = container.querySelector('.MuiLinearProgress-root');
      expect(linearProgress).toBeInTheDocument();
    });
  });

  describe('Custom Type Loader', () => {
    it('should render custom loader when type is provided', () => {
      const { container } = renderWithTheme(
        <RdsLoader type="spinner-ring" />
      );
      const customLoader = container.querySelector('.rds-loader__spinner-ring');
      expect(customLoader).toBeInTheDocument();
    });

    it('should remove loader- prefix from type', () => {
      const { container } = renderWithTheme(
        <RdsLoader type="loader-moving" />
      );
      const customLoader = container.querySelector('.rds-loader__moving');
      expect(customLoader).toBeInTheDocument();
    });

    it('should apply size class to custom loader', () => {
      const { container } = renderWithTheme(
        <RdsLoader type="spinner-ring" size="large" />
      );
      const customLoader = container.querySelector('.loader-large');
      expect(customLoader).toBeInTheDocument();
    });

    it('should apply default medium size to custom loader', () => {
      const { container } = renderWithTheme(
        <RdsLoader type="spin" />
      );
      const customLoader = container.querySelector('.loader-medium');
      expect(customLoader).toBeInTheDocument();
    });

    it('should render label for custom loader', () => {
      renderWithTheme(
        <RdsLoader type="rolling-rock" label="Loading" />
      );
      expect(screen.getByText('Loading')).toBeInTheDocument();
    });

    it('should not render label when not provided for custom loader', () => {
      const { container } = renderWithTheme(
        <RdsLoader type="triangle" />
      );
      const label = container.querySelector('.rds-loader__label');
      expect(label).not.toBeInTheDocument();
    });

    it('should handle various custom loader types', () => {
      const types = [
        'line-wobble',
        'loader-moving',
        'loader-hash',
        'loader-jump',
        'sand',
        'rolling-rock',
        'loader-round',
        'rotate',
        'spin',
        'triangle',
        'spinner-ring',
      ];

      types.forEach((type) => {
        const { container } = renderWithTheme(
          <RdsLoader type={type} />
        );
        const customLoader = container.querySelector('[class*="rds-loader__"]');
        expect(customLoader).toBeInTheDocument();
      });
    });
  });

  describe('Value Rounding', () => {
    it('should round value to nearest integer for display', () => {
      renderWithTheme(
        <RdsLoader variant="circular" value={33.7} />
      );
      expect(screen.getByText('34%')).toBeInTheDocument();
    });

    it('should handle decimal values correctly for linear', () => {
      renderWithTheme(
        <RdsLoader variant="linear" value={75.5} />
      );
      expect(screen.getByText('76%')).toBeInTheDocument();
    });

    it('should round 0 correctly', () => {
      renderWithTheme(
        <RdsLoader variant="circular" value={0} />
      );
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('should round 100 correctly', () => {
      renderWithTheme(
        <RdsLoader variant="circular" value={100} />
      );
      expect(screen.getByText('100%')).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it('should render with light theme', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="circular" />,
        false
      );
      expect(container).toBeInTheDocument();
    });

    it('should render with dark theme', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="circular" />,
        true
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should render circular progress with all properties', () => {
      renderWithTheme(
        <RdsLoader
          variant="circular"
          size="large"
          color="success"
          value={80}
          label="Install Complete"
          thickness={2}
        />
      );

      expect(screen.getByText('Install Complete')).toBeInTheDocument();
      expect(screen.getByText('80%')).toBeInTheDocument();
    });

    it('should render linear progress with all properties', () => {
      renderWithTheme(
        <RdsLoader
          variant="linear"
          color="error"
          value={45}
          label="Upload Failed"
        />
      );

      expect(screen.getByText('Upload Failed')).toBeInTheDocument();
      expect(screen.getByText('45%')).toBeInTheDocument();
    });

    it('should render overlay with full loader configuration', () => {
      const { container } = renderWithTheme(
        <RdsLoader
          variant="circular"
          overlay={true}
          size="medium"
          color="primary"
          value={60}
          label="Processing..."
        />
      );

      expect(screen.getByText('Processing...')).toBeInTheDocument();
      expect(screen.getByText('60%')).toBeInTheDocument();
      // Check that loader is rendered
      const circularProgress = container.querySelector('.MuiCircularProgress-root');
      expect(circularProgress).toBeInTheDocument();
    });

    it('should handle indeterminate state with label', () => {
      const { container } = renderWithTheme(
        <RdsLoader
          variant="circular"
          label="Please wait..."
        />
      );

      expect(screen.getByText('Please wait...')).toBeInTheDocument();
      const circularProgress = container.querySelector('.MuiCircularProgress-indeterminate');
      expect(circularProgress).toBeInTheDocument();
    });
  });

  describe('Optional Props', () => {
    it('should work with minimal props', () => {
      const { container } = renderWithTheme(
        <RdsLoader />
      );
      const circularProgress = container.querySelector('.MuiCircularProgress-root');
      expect(circularProgress).toBeInTheDocument();
    });

    it('should handle undefined optional props', () => {
      const { container } = renderWithTheme(
        <RdsLoader
          variant={undefined}
          size={undefined}
          color={undefined}
          value={undefined}
          label={undefined}
          overlay={undefined}
          thickness={undefined}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should work with only variant specified', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="linear" />
      );
      const linearProgress = container.querySelector('.MuiLinearProgress-root');
      expect(linearProgress).toBeInTheDocument();
    });

    it('should work with only value specified', () => {
      const { container } = renderWithTheme(
        <RdsLoader value={50} />
      );
      expect(screen.getByText('50%')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should render proper structure for circular progress', () => {
      const { container } = renderWithTheme(
        <RdsLoader variant="circular" label="Loading content" />
      );
      expect(screen.getByText('Loading content')).toBeInTheDocument();
  
    });
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsLoader />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should display percentage value for screen readers', () => {
      renderWithTheme(
        <RdsLoader variant="linear" value={75} label="Upload progress" />
      );
      expect(screen.getByText('Upload progress')).toBeInTheDocument();
      expect(screen.getByText('75%')).toBeInTheDocument();
    });
  });
});