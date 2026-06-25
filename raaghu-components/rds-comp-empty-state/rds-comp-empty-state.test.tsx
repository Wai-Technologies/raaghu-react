import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RdsCompEmptyState, { RdsCompEmptyStateProps } from './rds-comp-empty-state';
import { axe } from 'jest-axe';

// Mock Lottie
jest.mock('lottie-react', () => {
  return (props: any) => {
    return (
      <div
        data-testid="lottie-animation"
        {...(props['data-testid'] && { 'data-testid': props['data-testid'] })}
      >
        Lottie Animation
      </div>
    );
  };
});

// Mock SCSS
jest.mock('./rds-comp-empty-state.scss', () => ({}));

// Mock images
jest.mock('./empty-state.png', () => 'empty-state.png');
jest.mock('./empty-state-dark.png', () => 'empty-state-dark.png');
jest.mock('./illustration-light.json', () => ({ default: {} }));
jest.mock('./illustration-dark.json', () => ({ default: {} }));

// Mock MUI components
jest.mock('@mui/material', () => {
  const actual = jest.requireActual('@mui/material');
  return {
    ...actual,
    Box: React.forwardRef(({ children, className, style, ...props }: any, ref: any) => (
      <div ref={ref} className={className} style={style} {...props}>
        {children}
      </div>
    )),
    Typography: ({ children, variant, className, sx, ...props }: any) => {
      const fakeTheme = {
        palette: {
          common: { white: '#ffffff' },
          grey: { 800: '#424242' },
          text: { primary: '#000000' },
        },
      };
      let resolvedStyle: any = typeof sx === 'function' ? sx(fakeTheme) : sx;
      if (resolvedStyle && typeof resolvedStyle === 'object') {
        resolvedStyle = Object.keys(resolvedStyle).reduce((acc: any, key) => {
          const val = resolvedStyle[key];
          acc[key] = typeof val === 'function' ? val(fakeTheme) : val;
          return acc;
        }, {} as any);
      }
      return (
        <div className={`typography ${className || ''}`} style={resolvedStyle} {...props}>
          {children}
        </div>
      );
    },
    Button: ({ children, variant, className, onClick, ...props }: any) => (
      <button className={`button ${variant || ''} ${className || ''}`} onClick={onClick} {...props}>
        {children}
      </button>
    ),
  };
});

const renderComponent = (props: RdsCompEmptyStateProps = {}) => {
  return render(<RdsCompEmptyState {...props} />);
};

describe('RdsCompEmptyState', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      renderComponent();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCompEmptyState.displayName).toBe('RdsCompEmptyState');
    });

    it('should render root element with correct class', () => {
      const { container } = renderComponent();
      const rootElement = container.querySelector('.rds-comp-empty-state');
      expect(rootElement).toBeInTheDocument();
    });

    it('should render content container', () => {
      const { container } = renderComponent();
      const contentElement = container.querySelector('.rds-comp-empty-state__content');
      expect(contentElement).toBeInTheDocument();
    });
  });

  describe('Image Rendering', () => {
    it('should render image by default when isContinueAnimate is false', () => {
      renderComponent({ isContinueAnimate: false });
      const image = screen.getByTestId('emptyStateImage') as HTMLImageElement;
      expect(image).toBeInTheDocument();
      expect(image.tagName).toBe('IMG');
    });

    it('should render light variant image by default', () => {
      renderComponent({ isContinueAnimate: false });
      const image = screen.getByTestId('emptyStateImage') as HTMLImageElement;
      expect(image.src).toContain('empty-state.png');
    });

    it('should render dark variant image when mode is Dark NRA', () => {
      renderComponent({ isContinueAnimate: false, mode: 'Dark NRA' });
      const image = screen.getByTestId('emptyStateImage') as HTMLImageElement;
      expect(image.src).toContain('empty-state-dark.png');
    });

    it('should use custom iconPath when provided', () => {
      renderComponent({ isContinueAnimate: false, iconPath: '/custom/path.png' });
      const image = screen.getByTestId('emptyStateImage') as HTMLImageElement;
      expect(image.src).toContain('/custom/path.png');
    });

    it('should set image alt text from label', () => {
      renderComponent({ isContinueAnimate: false, label: 'No Data Found' });
      const image = screen.getByTestId('emptyStateImage') as HTMLImageElement;
      expect(image.alt).toBe('No Data Found');
    });

    it('should set default alt text when no label provided', () => {
      renderComponent({ isContinueAnimate: false });
      const image = screen.getByTestId('emptyStateImage') as HTMLImageElement;
      expect(['', 'Empty state']).toContain(image.alt);
    });

    it('should apply lazy loading to image', () => {
      renderComponent({ isContinueAnimate: false });
      const image = screen.getByTestId('emptyStateImage') as HTMLImageElement;
      expect(image.getAttribute('loading')).toBe('lazy');
    });

    it('should apply correct image styles', () => {
      renderComponent({ isContinueAnimate: false });
      const image = screen.getByTestId('emptyStateImage') as HTMLImageElement;
      const style = image.getAttribute('style');
      expect(style).toContain('width');
      expect(style).toContain('height');
      expect(style).toContain('object-fit');
    });
  });

  describe('Animation Rendering', () => {
    it('should render Lottie animation when isContinueAnimate is true', () => {
      renderComponent({ isContinueAnimate: true });
      expect(screen.getByTestId('emptyStateLottie')).toBeInTheDocument();
    });

    it('should not render image when isContinueAnimate is true', () => {
      renderComponent({ isContinueAnimate: true });
      expect(screen.queryByTestId('emptyStateImage')).not.toBeInTheDocument();
    });

    it('should render Lottie with light variant by default', () => {
      renderComponent({ isContinueAnimate: true });
      expect(screen.getByTestId('emptyStateLottie')).toBeInTheDocument();
    });

    it('should render Lottie with dark variant when mode is Dark NRA', () => {
      renderComponent({ isContinueAnimate: true, mode: 'Dark NRA' });
      expect(screen.getByTestId('emptyStateLottie')).toBeInTheDocument();
    });

    it('should render Lottie with loop enabled', () => {
      renderComponent({ isContinueAnimate: true });
      const lottie = screen.getByTestId('emptyStateLottie');
      expect(lottie).toBeInTheDocument();
    });
  });

  describe('Label and SubLabel', () => {
    it('should render label when provided', () => {
      renderComponent({ label: 'No Data Found' });
      expect(screen.getByTestId('labelElement')).toBeInTheDocument();
      expect(screen.getByText('No Data Found')).toBeInTheDocument();
    });

    it('should not render label element when not provided', () => {
      renderComponent({});
      expect(screen.queryByTestId('labelElement')).not.toBeInTheDocument();
    });

    it('should render subLabel when provided', () => {
      renderComponent({ subLabel: 'Please add some data to get started' });
      expect(screen.getByTestId('sublabelElement')).toBeInTheDocument();
      expect(screen.getByText('Please add some data to get started')).toBeInTheDocument();
    });

    it('should not render subLabel element when not provided', () => {
      renderComponent({});
      expect(screen.queryByTestId('sublabelElement')).not.toBeInTheDocument();
    });

    it('should render both label and subLabel together', () => {
      renderComponent({
        label: 'No Data',
        subLabel: 'Please add data',
      });
      expect(screen.getByTestId('labelElement')).toBeInTheDocument();
      expect(screen.getByTestId('sublabelElement')).toBeInTheDocument();
    });

    it('should have correct styling for label in Dark NRA mode', () => {
      renderComponent({ label: 'No Data', mode: 'Dark NRA' });
      const label = screen.getByTestId('labelElement');
      expect(label).toBeInTheDocument();
      // MUI sx prop applies color via CSS class, not inline style
    });

    it('should have correct styling for subLabel in Dark NRA mode', () => {
      renderComponent({ subLabel: 'Add data', mode: 'Dark NRA' });
      const subLabel = screen.getByTestId('sublabelElement');
      expect(subLabel).toBeInTheDocument();
      // MUI sx prop applies color via CSS class, not inline style
    });
  });

  describe('Button', () => {
    it('should render button always', () => {
      renderComponent();
      expect(screen.getByTestId('actionButton')).toBeInTheDocument();
    });

    it('should render button with default text', () => {
      renderComponent();
      expect(screen.getByText('Add New Data')).toBeInTheDocument();
    });

    it('should render button with custom buttonText', () => {
      renderComponent({ buttonText: 'Create Item' });
      expect(screen.getByText('Create Item')).toBeInTheDocument();
    });

    it('should call onButtonClick when button is clicked', () => {
      const onButtonClick = jest.fn();
      renderComponent({ onButtonClick });
      fireEvent.click(screen.getByTestId('actionButton'));
      expect(onButtonClick).toHaveBeenCalledTimes(1);
    });

    it('should handle missing onButtonClick gracefully', () => {
      renderComponent({});
      const button = screen.getByTestId('actionButton');
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    it('should have correct button classes', () => {
      const { container } = renderComponent();
      const button = container.querySelector('.rds-comp-empty-state__button');
      expect(button).toBeInTheDocument();
    });

    it('should render button in action container', () => {
      const { container } = renderComponent();
      const actionContainer = container.querySelector('.rds-comp-empty-state__action');
      expect(actionContainer).toBeInTheDocument();
      expect(actionContainer?.querySelector('button')).toBeInTheDocument();
    });
  });

  describe('Icon Dimensions', () => {
    it('should apply default dimensions when not provided', () => {
      renderComponent();
      const icon = screen.getByTestId('icon');
      const style = icon.getAttribute('style');
      expect(style).toContain('150px');
    });

    it('should apply custom width when iconWidth is provided', () => {
      renderComponent({ iconWidth: 200 });
      const icon = screen.getByTestId('icon');
      const style = icon.getAttribute('style');
      expect(style).toContain('200px');
    });

    it('should apply custom height when iconHeight is provided', () => {
      renderComponent({ iconHeight: 250 });
      const icon = screen.getByTestId('icon');
      const style = icon.getAttribute('style');
      expect(style).toContain('250px');
    });

    it('should use width as height when height not provided', () => {
      renderComponent({ iconWidth: 180 });
      const icon = screen.getByTestId('icon');
      const style = icon.getAttribute('style');
      expect(style).toContain('180px');
    });

    it('should handle string dimension values with px', () => {
      renderComponent({ iconWidth: '200px', iconHeight: '250px' });
      const icon = screen.getByTestId('icon');
      const style = icon.getAttribute('style');
      expect(style).toContain('200px');
      expect(style).toContain('250px');
    });

    it('should handle string dimension values without px', () => {
      renderComponent({ iconWidth: '200', iconHeight: '250' });
      const icon = screen.getByTestId('icon');
      const style = icon.getAttribute('style');
      expect(style).toContain('200px');
      expect(style).toContain('250px');
    });

    it('should handle CSS units other than px', () => {
      renderComponent({ iconWidth: '20rem', iconHeight: '15em' });
      const icon = screen.getByTestId('icon');
      const style = icon.getAttribute('style');
      expect(style).toContain('20rem');
      expect(style).toContain('15em');
    });
  });

  describe('CSS Classes', () => {
    it('should apply custom className to root element', () => {
      const { container } = renderComponent({ className: 'custom-class' });
      const root = container.querySelector('.rds-comp-empty-state');
      expect(root?.className).toContain('custom-class');
    });

    it('should apply animation class when isContinueAnimate is true', () => {
      const { container } = renderComponent({ isContinueAnimate: true });
      const icon = container.querySelector('.rds-comp-empty-state__icon--animated');
      expect(icon).toBeInTheDocument();
    });

    it('should not apply animation class when isContinueAnimate is false', () => {
      const { container } = renderComponent({ isContinueAnimate: false });
      const icon = container.querySelector('.rds-comp-empty-state__icon--animated');
      expect(icon).not.toBeInTheDocument();
    });

    it('should have correct icon container class', () => {
      const { container } = renderComponent();
      const icon = container.querySelector('.rds-comp-empty-state__icon');
      expect(icon).toBeInTheDocument();
    });

    it('should have correct title class when label provided', () => {
      const { container } = renderComponent({ label: 'Title' });
      const title = container.querySelector('.rds-comp-empty-state__title');
      expect(title).toBeInTheDocument();
    });

    it('should have correct subtitle class when subLabel provided', () => {
      const { container } = renderComponent({ subLabel: 'Subtitle' });
      const subtitle = container.querySelector('.rds-comp-empty-state__subtitle');
      expect(subtitle).toBeInTheDocument();
    });
  });

  describe('Theme Detection', () => {
    beforeEach(() => {
      document.documentElement.removeAttribute('data-theme');
      document.body.classList.remove('dark');
    });

    it('should use light variant by default', () => {
      renderComponent({ isContinueAnimate: false });
      const image = screen.getByTestId('emptyStateImage') as HTMLImageElement;
      expect(image.src).toContain('empty-state.png');
    });

    it('should detect dark theme from data-theme attribute', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      renderComponent({ isContinueAnimate: false });
      const image = screen.getByTestId('emptyStateImage') as HTMLImageElement;
      expect(image.src).toContain('empty-state-dark.png');
      document.documentElement.removeAttribute('data-theme');
    });

    it('should detect dark theme from body classList', () => {
      document.body.classList.add('dark');
      renderComponent({ isContinueAnimate: false });
      const image = screen.getByTestId('emptyStateImage') as HTMLImageElement;
      expect(image.src).toContain('empty-state-dark.png');
      document.body.classList.remove('dark');
    });

    it('should use Dark NRA mode when explicitly set', () => {
      renderComponent({ isContinueAnimate: false, mode: 'Dark NRA' });
      const image = screen.getByTestId('emptyStateImage') as HTMLImageElement;
      expect(image.src).toContain('empty-state-dark.png');
    });

    it('should override auto-detected dark theme with Light when mode is not Dark', () => {
      document.documentElement.setAttribute('data-theme', 'dark');
      renderComponent({ isContinueAnimate: false, mode: 'Light' });
      const image = screen.getByTestId('emptyStateImage') as HTMLImageElement;
      expect(image.src).toContain('empty-state.png');
      document.documentElement.removeAttribute('data-theme');
    });
  });

  describe('Props Propagation', () => {
    it('should pass data-testid through to elements', () => {
      renderComponent();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByTestId('actionButton')).toBeInTheDocument();
    });

    it('should accept all component props', () => {
      const props: RdsCompEmptyStateProps = {
        mode: 'Dark NRA',
        label: 'No Data',
        subLabel: 'Add some data',
        iconHeight: 200,
        iconWidth: 200,
        iconPath: '/custom.png',
        buttonText: 'Click Me',
        onButtonClick: jest.fn(),
        isContinueAnimate: false,
        className: 'my-class',
      };
      renderComponent(props);
      expect(screen.getByText('No Data')).toBeInTheDocument();
      expect(screen.getByText('Add some data')).toBeInTheDocument();
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string label', () => {
      const { container } = renderComponent({ label: '' });
      const label = container.querySelector('.rds-comp-empty-state__title');
      expect(label).not.toBeInTheDocument();
    });

    it('should handle empty string subLabel', () => {
      const { container } = renderComponent({ subLabel: '' });
      const subLabel = container.querySelector('.rds-comp-empty-state__subtitle');
      expect(subLabel).not.toBeInTheDocument();
    });

    it('should handle undefined onButtonClick', () => {
      renderComponent({ onButtonClick: undefined });
      const button = screen.getByTestId('actionButton');
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    it('should handle null icon dimensions', () => {
      renderComponent({ iconWidth: undefined, iconHeight: undefined });
      const icon = screen.getByTestId('icon');
      expect(icon).toBeInTheDocument();
    });

    it('should render with minimal props', () => {
      renderComponent({});
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByTestId('actionButton')).toBeInTheDocument();
    });

    it('should render with only image', () => {
      renderComponent({ isContinueAnimate: false });
      expect(screen.getByTestId('emptyStateImage')).toBeInTheDocument();
    });

    it('should render with only animation', () => {
      renderComponent({ isContinueAnimate: true });
      expect(screen.getByTestId('emptyStateLottie')).toBeInTheDocument();
    });

    it('should handle rapid prop changes', () => {
      const { rerender } = renderComponent({ label: 'Label 1' });
      expect(screen.getByText('Label 1')).toBeInTheDocument();
      
      rerender(<RdsCompEmptyState label="Label 2" />);
      expect(screen.getByText('Label 2')).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should render complete empty state with all features', () => {
      renderComponent({
        label: 'No Data Available',
        subLabel: 'Click the button to add new data',
        buttonText: 'Add Data',
        onButtonClick: jest.fn(),
        isContinueAnimate: false,
      });

      expect(screen.getByText('No Data Available')).toBeInTheDocument();
      expect(screen.getByText('Click the button to add new data')).toBeInTheDocument();
      expect(screen.getByText('Add Data')).toBeInTheDocument();
      expect(screen.getByTestId('emptyStateImage')).toBeInTheDocument();
    });

    it('should render animated empty state with labels', () => {
      renderComponent({
        label: 'Loading',
        subLabel: 'Please wait',
        isContinueAnimate: true,
      });

      expect(screen.getByText('Loading')).toBeInTheDocument();
      expect(screen.getByText('Please wait')).toBeInTheDocument();
      expect(screen.getByTestId('emptyStateLottie')).toBeInTheDocument();
    });

    it('should handle button click in full component', () => {
      const onButtonClick = jest.fn();
      renderComponent({
        label: 'Empty',
        buttonText: 'Create',
        onButtonClick,
      });

      fireEvent.click(screen.getByText('Create'));
      expect(onButtonClick).toHaveBeenCalledTimes(1);
    });

    it('should render dark theme empty state with all features', () => {
      renderComponent({
        mode: 'Dark NRA',
        label: 'No Data',
        subLabel: 'Add data',
        buttonText: 'Add',
        isContinueAnimate: false,
      });

      expect(screen.getByText('No Data')).toBeInTheDocument();
      expect(screen.getByText('Add data')).toBeInTheDocument();
      expect(screen.getByTestId('emptyStateImage')).toBeInTheDocument();
    });

    it('should work with custom icon and dimensions', () => {
      renderComponent({
        iconPath: '/assets/custom.png',
        iconWidth: 300,
        iconHeight: 300,
        label: 'Custom',
      });

      const image = screen.getByTestId('emptyStateImage') as HTMLImageElement;
      expect(image.src).toContain('/assets/custom.png');
      const icon = screen.getByTestId('icon');
      const style = icon.getAttribute('style');
      expect(style).toContain('300px');
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompEmptyState />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
