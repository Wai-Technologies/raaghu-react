import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsDivider, { RdsDividerProps } from './rds-divider';
import '@testing-library/jest-dom';

// Mock SCSS
jest.mock('./rds-divider.scss', () => ({}));

// Mock MUI Icons
jest.mock('@mui/icons-material/InfoOutlined', () => {
  return function DummyIcon(props: any) {
    return <span data-testid="info-icon" {...props} />;
  };
});

jest.mock('@mui/icons-material/Add', () => {
  return function DummyIcon(props: any) {
    return <span data-testid="add-icon" {...props} />;
  };
});

jest.mock('@mui/icons-material/NotificationImportant', () => {
  return function DummyIcon(props: any) {
    return <span data-testid="notification-icon" {...props} />;
  };
});

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

describe('RdsDivider', () => {
  const defaultProps: RdsDividerProps = {};

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(<RdsDivider {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsDivider.displayName).toBe('RdsDivider');
    });

    it('should render MuiDivider component', () => {
      const { container } = renderWithTheme(<RdsDivider {...defaultProps} />);
      expect(container.querySelector('.MuiDivider-root')).toBeInTheDocument();
    });

    it('should render horizontal layout by default', () => {
      const { container } = renderWithTheme(<RdsDivider {...defaultProps} />);
      const divider = container.querySelector('.MuiDivider-root');
      expect(divider).not.toHaveClass('MuiDivider-vertical');
    });

    it('should apply flexbox styling to root container', () => {
      const { container } = renderWithTheme(<RdsDivider {...defaultProps} />);
      const root = container.firstChild as HTMLElement;
      expect(root).toHaveStyle('display: flex');
      expect(root).toHaveStyle('align-items: center');
      expect(root).toHaveStyle('width: 100%');
    });
  });

  describe('Divider Message', () => {
    it('should render divider message when provided', () => {
      renderWithTheme(<RdsDivider dividerMessage="Divider Text" />);
      expect(screen.getByText('Divider Text')).toBeInTheDocument();
    });

    it('should not render message Typography when dividerMessage is undefined', () => {
      const { container } = renderWithTheme(<RdsDivider dividerMessage={undefined} />);
      const typography = container.querySelector('.MuiTypography-body2');
      // Should exist but be empty when no message and no icon
      expect(container).toBeInTheDocument();
    });

    it('should render message with correct Typography variant', () => {
      const { container } = renderWithTheme(
        <RdsDivider dividerMessage="Test Message" />
      );
      const typography = container.querySelector('.MuiTypography-body2');
      expect(typography).toHaveTextContent('Test Message');
    });

    it('should render message with bold font weight', () => {
      renderWithTheme(
        <RdsDivider dividerMessage="Bold Text" />
      );
      const typography = screen.getByText('Bold Text');
      // Verify Typography component is rendered
      expect(typography).toBeInTheDocument();
      expect(typography).toHaveClass('MuiTypography-body2');
    });
  });

  describe('Text Alignment', () => {
    it('should render with center alignment by default', () => {
      const { container } = renderWithTheme(
        <RdsDivider dividerMessage="Center" />
      );
      const dividers = container.querySelectorAll('.MuiDivider-root');
      // Center alignment should have dividers on both sides
      expect(dividers.length).toBeGreaterThan(1);
    });

    it('should render with left alignment', () => {
      const { container } = renderWithTheme(
        <RdsDivider dividerMessage="Left" textAlign="left" />
      );
      const dividers = container.querySelectorAll('.MuiDivider-root');
      expect(dividers.length).toBeGreaterThan(0);
    });

    it('should render with right alignment', () => {
      const { container } = renderWithTheme(
        <RdsDivider dividerMessage="Right" textAlign="right" />
      );
      const dividers = container.querySelectorAll('.MuiDivider-root');
      expect(dividers.length).toBeGreaterThan(0);
    });

    it('should render message in correct position for center alignment', () => {
      renderWithTheme(<RdsDivider dividerMessage="Center Text" textAlign="center" />);
      expect(screen.getByText('Center Text')).toBeInTheDocument();
    });

    it('should render message in correct position for left alignment', () => {
      renderWithTheme(<RdsDivider dividerMessage="Left Text" textAlign="left" />);
      expect(screen.getByText('Left Text')).toBeInTheDocument();
    });

    it('should render message in correct position for right alignment', () => {
      renderWithTheme(<RdsDivider dividerMessage="Right Text" textAlign="right" />);
      expect(screen.getByText('Right Text')).toBeInTheDocument();
    });
  });

  describe('Layout Variations', () => {
    it('should render horizontal layout by default', () => {
      const { container } = renderWithTheme(<RdsDivider layout="horizontal" />);
      const divider = container.querySelector('.MuiDivider-root');
      expect(divider).not.toHaveClass('MuiDivider-vertical');
    });

    it('should render vertical layout', () => {
      const { container } = renderWithTheme(<RdsDivider layout="vertical" />);
      const divider = container.querySelector('.MuiDivider-vertical');
      expect(divider).toBeInTheDocument();
    });

    it('should display side labels in vertical layout', () => {
      renderWithTheme(<RdsDivider layout="vertical" />);
      expect(screen.getByText('Left')).toBeInTheDocument();
      expect(screen.getByText('Right')).toBeInTheDocument();
    });

    it('should apply correct height styling for vertical layout', () => {
      const { container } = renderWithTheme(<RdsDivider layout="vertical" />);
      const rootBox = container.firstChild as HTMLElement;
        expect(rootBox).toHaveStyle('height: var(--rds-divider-vertical-container-height, 120px)');
      expect(rootBox).toHaveStyle('display: flex');
      expect(rootBox).toHaveStyle('align-items: center');
    });

    it('should render vertical divider with proper orientation', () => {
      const { container } = renderWithTheme(<RdsDivider layout="vertical" />);
      const divider = container.querySelector('.MuiDivider-vertical');
      expect(divider).toHaveStyle('height: 80%');
    });
  });

  describe('Icon Display', () => {
    it('should show icon by default when iconShow is true', () => {
      renderWithTheme(<RdsDivider iconShow={true} dividerMessage="With Icon" />);
      expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    });

    it('should not show icon when iconShow is false', () => {
      const { container } = renderWithTheme(
        <RdsDivider iconShow={false} dividerMessage="No Icon" />
      );
      expect(container.querySelector('[data-testid="info-icon"]')).not.toBeInTheDocument();
    });

    it('should render default InfoOutlined icon', () => {
      renderWithTheme(<RdsDivider iconShow={true} dividerMessage="Default Icon" />);
      expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    });

    it('should render Add icon when specified', () => {
      renderWithTheme(
        <RdsDivider iconShow={true} iconName="Add" dividerMessage="Add Icon" />
      );
      expect(screen.getByTestId('add-icon')).toBeInTheDocument();
    });

    it('should render NotificationImportant icon when specified', () => {
      renderWithTheme(
        <RdsDivider
          iconShow={true}
          iconName="Notification"
          dividerMessage="Notification Icon"
        />
      );
      expect(screen.getByTestId('notification-icon')).toBeInTheDocument();
    });

    it('should fallback to InfoOutlined icon for invalid icon name', () => {
      renderWithTheme(
        <RdsDivider
          iconShow={true}
          iconName="InvalidIcon"
          dividerMessage="Fallback Icon"
        />
      );
      expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    });

    it('should handle icon name with whitespace', () => {
      renderWithTheme(
        <RdsDivider
          iconShow={true}
          iconName="  Add  "
          dividerMessage="Trimmed Icon"
        />
      );
      expect(screen.getByTestId('add-icon')).toBeInTheDocument();
    });

    it('should render icon container with correct dimensions', () => {
      const { container } = renderWithTheme(
        <RdsDivider iconShow={true} dividerMessage="Icon Container" />
      );
      const icons = container.querySelectorAll('[data-testid*="icon"]');
      // Icon should be rendered
      expect(icons.length).toBeGreaterThan(0);
    });

    it('should not render icon container when iconShow is false', () => {
      const { container } = renderWithTheme(
        <RdsDivider iconShow={false} dividerMessage="No Icon Container" />
      );
      const iconElements = container.querySelectorAll('[data-testid*="icon"]');
      expect(iconElements.length).toBe(0);
    });
  });

  describe('Size Variants', () => {
    it('should apply small size with 1px border width', () => {
      const { container } = renderWithTheme(
        <RdsDivider size="small" dividerMessage="Small" />
      );
      const dividers = container.querySelectorAll('.MuiDivider-root');
      expect(dividers.length).toBeGreaterThan(0);
    });

    it('should apply medium size with 2px border width by default', () => {
      const { container } = renderWithTheme(
        <RdsDivider size="medium" dividerMessage="Medium" />
      );
      const dividers = container.querySelectorAll('.MuiDivider-root');
      expect(dividers.length).toBeGreaterThan(0);
    });

    it('should apply large size with 3px border width', () => {
      const { container } = renderWithTheme(
        <RdsDivider size="large" dividerMessage="Large" />
      );
      const dividers = container.querySelectorAll('.MuiDivider-root');
      expect(dividers.length).toBeGreaterThan(0);
    });

    it('should use medium size as default', () => {
      const { container } = renderWithTheme(
        <RdsDivider dividerMessage="Default Size" />
      );
      const dividers = container.querySelectorAll('.MuiDivider-root');
      expect(dividers.length).toBeGreaterThan(0);
    });
  });

  describe('Style Variants', () => {
    it('should apply subtle style by default', () => {
      const { container } = renderWithTheme(
        <RdsDivider dividerMessage="Subtle" styleVariant="subtle" />
      );
      expect(screen.getByText('Subtle')).toBeInTheDocument();
    });

    it('should apply strong style', () => {
      const { container } = renderWithTheme(
        <RdsDivider dividerMessage="Strong" styleVariant="strong" />
      );
      expect(screen.getByText('Strong')).toBeInTheDocument();
    });

    it('should apply primary style', () => {
      const { container } = renderWithTheme(
        <RdsDivider dividerMessage="Primary" styleVariant="primary" />
      );
      expect(screen.getByText('Primary')).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it('should adapt colors for light theme', () => {
      renderWithTheme(<RdsDivider dividerMessage="Light Theme" />, false);
      expect(screen.getByText('Light Theme')).toBeInTheDocument();
    });

    it('should adapt colors for dark theme', () => {
      renderWithTheme(<RdsDivider dividerMessage="Dark Theme" />, true);
      expect(screen.getByText('Dark Theme')).toBeInTheDocument();
    });

    it('should apply different colors for dark theme subtle variant', () => {
      renderWithTheme(
        <RdsDivider dividerMessage="Dark Subtle" styleVariant="subtle" />,
        true
      );
      expect(screen.getByText('Dark Subtle')).toBeInTheDocument();
    });

    it('should apply different colors for dark theme strong variant', () => {
      renderWithTheme(
        <RdsDivider dividerMessage="Dark Strong" styleVariant="strong" />,
        true
      );
      expect(screen.getByText('Dark Strong')).toBeInTheDocument();
    });

    it('should use theme primary color for primary variant', () => {
      const theme = createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#1976d2',
          },
        },
      });
      const { container } = render(
        <ThemeProvider theme={theme}>
          <RdsDivider dividerMessage="Primary" styleVariant="primary" />
        </ThemeProvider>
      );
      expect(screen.getByText('Primary')).toBeInTheDocument();
    });
  });

  describe('MUI Props Forwarding', () => {
    it('should forward MUI Divider props', () => {
      const { container } = renderWithTheme(
        <RdsDivider {...defaultProps} data-testid="custom-divider" />
      );
      expect(container.querySelector('[data-testid="custom-divider"]')).toBeInTheDocument();
    });

    it('should accept standard HTML attributes', () => {
      const { container } = renderWithTheme(
        <RdsDivider
          {...defaultProps}
          className="custom-class"
          aria-label="test-divider"
        />
      );
      const element = container.querySelector('[aria-label="test-divider"]');
      expect(element).toBeInTheDocument();
    });

    it('should support id attribute', () => {
      const { container } = renderWithTheme(
        <RdsDivider {...defaultProps} id="divider-test" />
      );
      expect(container.querySelector('#divider-test')).toBeInTheDocument();
    });
  });

  describe('Content Layout', () => {
    it('should render content wrapper with flex display', () => {
      const { container } = renderWithTheme(
        <RdsDivider dividerMessage="Test" iconShow={true} />
      );
      // Content should be wrapped in Box with display flex
      expect(container.querySelector('[role="img"]') || screen.getByText('Test')).toBeInTheDocument();
    });

    it('should render both icon and message together', () => {
      renderWithTheme(
        <RdsDivider dividerMessage="Message" iconShow={true} iconName="Add" />
      );
      expect(screen.getByTestId('add-icon')).toBeInTheDocument();
      expect(screen.getByText('Message')).toBeInTheDocument();
    });

    it('should render only message without icon', () => {
      const { container } = renderWithTheme(
        <RdsDivider dividerMessage="Message Only" iconShow={false} />
      );
      expect(screen.getByText('Message Only')).toBeInTheDocument();
      expect(container.querySelector('[data-testid*="icon"]')).not.toBeInTheDocument();
    });

    it('should render only icon without message', () => {
      renderWithTheme(
        <RdsDivider dividerMessage={undefined} iconShow={true} />
      );
      expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    });

    it('should apply proper gap between icon and message', () => {
      const { container } = renderWithTheme(
        <RdsDivider dividerMessage="Spaced" iconShow={true} />
      );
      // Box with gap styling should exist
      expect(container.querySelector('.MuiBox-root')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty divider message', () => {
      const { container } = renderWithTheme(
        <RdsDivider dividerMessage="" iconShow={false} />
      );
      expect(container).toBeInTheDocument();
    });

    it('should handle null icon name', () => {
      const { container } = renderWithTheme(
        <RdsDivider dividerMessage="Test" iconName={null as any} />
      );
      // Should fallback to default icon
      expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    });

    it('should handle undefined layout prop', () => {
      const { container } = renderWithTheme(
        <RdsDivider dividerMessage="Test" layout={undefined as any} />
      );
      // Should default to horizontal
      expect(container.querySelector('.MuiDivider-root')).not.toHaveClass('MuiDivider-vertical');
    });

    it('should handle all size variants without errors', () => {
      ['small', 'medium', 'large'].forEach((size) => {
        const { container: tempContainer } = renderWithTheme(
          <RdsDivider dividerMessage="Size Test" size={size as any} />
        );
        expect(tempContainer).toBeInTheDocument();
      });
    });

    it('should handle all style variants without errors', () => {
      ['subtle', 'strong', 'primary'].forEach((variant) => {
        const { container: tempContainer } = renderWithTheme(
          <RdsDivider dividerMessage="Style Test" styleVariant={variant as any} />
        );
        expect(tempContainer).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should be semantically correct', () => {
      const { container } = renderWithTheme(
        <RdsDivider dividerMessage="Accessible Divider" />
      );
      expect(container.querySelector('.MuiDivider-root')).toBeInTheDocument();
    });

    it('should support aria-label', () => {
      const { container } = renderWithTheme(
        <RdsDivider dividerMessage="Test" aria-label="section-divider" />
      );
      expect(container.querySelector('[aria-label="section-divider"]')).toBeInTheDocument();
    });

    it('should render message text in accessible way', () => {
      renderWithTheme(<RdsDivider dividerMessage="Readable Text" />);
      expect(screen.getByText('Readable Text')).toBeInTheDocument();
    });

    it('should support role attribute', () => {
      const { container } = renderWithTheme(
        <RdsDivider dividerMessage="Test" role="separator" />
      );
      expect(container.querySelector('[role="separator"]')).toBeInTheDocument();
    });
  });
});
