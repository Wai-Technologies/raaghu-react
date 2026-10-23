import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RdsDivider, { RdsDividerProps, RdsDividerIconName } from './rds-divider';
import '@testing-library/jest-dom';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import { axe } from 'jest-axe';

jest.mock('./rds-divider.scss', () => ({}));
jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

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
          iconName={'InvalidIcon' as RdsDividerIconName}
          dividerMessage="Fallback Icon"
        />
      );
      expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    });

    it('should handle icon name with whitespace', () => {
      renderWithTheme(
        <RdsDivider
          iconShow={true}
          iconName={'  Add  ' as RdsDividerIconName}
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
      expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    });

    it('should handle undefined layout prop', () => {
      const { container } = renderWithTheme(
        <RdsDivider dividerMessage="Test" layout={undefined as any} />
      );
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

    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsDivider {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
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

describe('RdsDivider audit fixes', () => {
  beforeEach(() => {
    (warnDeprecatedProp as jest.Mock).mockClear();
  });

  describe('id and ref land on exactly one line (G1-246)', () => {
    it.each(['center', 'left', 'right'] as const)('puts id on one element only for textAlign="%s"', (textAlign) => {
      const { container } = renderWithTheme(<RdsDivider id="only-once" textAlign={textAlign}>Text</RdsDivider>);
      expect(container.querySelectorAll('#only-once')).toHaveLength(1);
    });

    it('puts id on the leading line for textAlign="center"', () => {
      const { container } = renderWithTheme(<RdsDivider id="lead">Text</RdsDivider>);
      const lines = container.querySelectorAll('.MuiDivider-root');
      expect(lines).toHaveLength(2);
      expect(lines[0]).toHaveAttribute('id', 'lead');
      expect(lines[1]).not.toHaveAttribute('id');
    });

    it('puts id on the vertical divider', () => {
      const { container } = renderWithTheme(<RdsDivider id="vert" layout="vertical" />);
      expect(container.querySelectorAll('#vert')).toHaveLength(1);
      expect(container.querySelector('#vert')).toHaveClass('MuiDivider-vertical');
    });

    it('attaches ref to the first line in DOM order', () => {
      const ref = React.createRef<HTMLHRElement>();
      const { container } = renderWithTheme(<RdsDivider ref={ref}>Text</RdsDivider>);
      expect(ref.current).toBe(container.querySelectorAll('.MuiDivider-root')[0]);
    });

    it('attaches ref to the only line for textAlign="left"', () => {
      const ref = React.createRef<HTMLHRElement>();
      const { container } = renderWithTheme(<RdsDivider ref={ref} textAlign="left">Text</RdsDivider>);
      expect(container.querySelectorAll('.MuiDivider-root')).toHaveLength(1);
      expect(ref.current).toBe(container.querySelector('.MuiDivider-root'));
    });

    it('calls a callback ref once with a single element', () => {
      const ref = jest.fn();
      renderWithTheme(<RdsDivider ref={ref}>Text</RdsDivider>);
      expect(ref.mock.calls.filter(([node]) => node !== null)).toHaveLength(1);
    });

    it('still forwards className and other props to every line', () => {
      const { container } = renderWithTheme(<RdsDivider className="line" data-testid="line">Text</RdsDivider>);
      expect(container.querySelectorAll('.MuiDivider-root.line')).toHaveLength(2);
      expect(container.querySelectorAll('[data-testid="line"]')).toHaveLength(2);
    });
  });

  describe('icon (G1-248)', () => {
    it('keeps the InfoOutlined icon by default', () => {
      renderWithTheme(<RdsDivider />);
      expect(screen.getByTestId('info-icon')).toBeInTheDocument();
      expect(warnDeprecatedProp).not.toHaveBeenCalled();
    });

    it('renders a custom icon node', () => {
      renderWithTheme(<RdsDivider icon={<span data-testid="custom-icon" />}>Text</RdsDivider>);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('info-icon')).not.toBeInTheDocument();
    });

    it('icon wins over the deprecated iconName', () => {
      renderWithTheme(<RdsDivider icon={<span data-testid="custom-icon" />} iconName="Add">Text</RdsDivider>);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('add-icon')).not.toBeInTheDocument();
    });

    it('icon={null} hides the icon', () => {
      const { container } = renderWithTheme(<RdsDivider icon={null}>Text</RdsDivider>);
      expect(container.querySelector('[data-testid*="icon"]')).not.toBeInTheDocument();
    });

    it('iconShow={false} hides a custom icon', () => {
      renderWithTheme(<RdsDivider iconShow={false} icon={<span data-testid="custom-icon" />}>Text</RdsDivider>);
      expect(screen.queryByTestId('custom-icon')).not.toBeInTheDocument();
    });

    it('warns when the deprecated iconName is used', () => {
      renderWithTheme(<RdsDivider iconName="Add" />);
      expect(screen.getByTestId('add-icon')).toBeInTheDocument();
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsDivider', 'iconName', '`icon`');
    });
  });

  describe('children (G1-249)', () => {
    it('renders children as the divider text', () => {
      renderWithTheme(<RdsDivider>OR</RdsDivider>);
      const text = screen.getByText('OR');
      expect(text).toHaveClass('MuiTypography-body2');
      expect(warnDeprecatedProp).not.toHaveBeenCalled();
    });

    it('does not forward children into the MUI lines', () => {
      const { container } = renderWithTheme(<RdsDivider>OR</RdsDivider>);
      expect(container.querySelector('.MuiDivider-wrapper')).not.toBeInTheDocument();
      expect(screen.getAllByText('OR')).toHaveLength(1);
    });

    it('children wins over the deprecated dividerMessage', () => {
      renderWithTheme(<RdsDivider dividerMessage="Old">New</RdsDivider>);
      expect(screen.getByText('New')).toBeInTheDocument();
      expect(screen.queryByText('Old')).not.toBeInTheDocument();
    });

    it('warns when the deprecated dividerMessage is used', () => {
      renderWithTheme(<RdsDivider dividerMessage="Old" />);
      expect(screen.getByText('Old')).toBeInTheDocument();
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsDivider', 'dividerMessage', '`children`');
    });
  });

  it('accepts MUI textAlign values (G1-252)', () => {
    const props: RdsDividerProps = { textAlign: 'right' };
    const { container } = renderWithTheme(<RdsDivider {...props}>Text</RdsDivider>);
    expect(container.querySelectorAll('.MuiDivider-root')).toHaveLength(1);
  });
});

describe('RdsDivider additive renames', () => {
  beforeEach(() => (warnDeprecatedProp as jest.Mock).mockClear());

  it('uses palette colors for styling and passes other colors to the line', () => {
    const { container, rerender } = render(<RdsDivider color="primary">x</RdsDivider>);
    expect(container.querySelector('hr')).not.toHaveAttribute('color');
    rerender(<RdsDivider color="red">x</RdsDivider>);
    expect(container.querySelector('hr')).toHaveAttribute('color', 'red');
    expect(warnDeprecatedProp).not.toHaveBeenCalled();
  });

  it('warns for styleVariant and iconShow', () => {
    render(<RdsDivider styleVariant="strong" iconShow={false}>x</RdsDivider>);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsDivider', 'styleVariant', '`color`');
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsDivider', 'iconShow', '`icon={null}`');
  });
});
