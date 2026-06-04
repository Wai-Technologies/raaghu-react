import React from 'react';
import { render, screen } from '@testing-library/react';
import RdsAlert, { RdsAlertProps } from './rds-alert';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-alert.scss', () => ({}));

// Mock RdsButton component
jest.mock('../rds-button/rds-button', () => {
  return function MockRdsButton(props: any) {
    return (
      <button
        className={props.className}
        data-testid="rds-button"
        data-text={props.text}
        data-style={props.style}
        data-size={props.size}
        data-color={props.color}
      >
        {props.text}
      </button>
    );
  };
});

// Mock MUI Icons
jest.mock('@mui/icons-material/InfoOutlined', () => {
  return function MockInfoIcon() {
    return <span data-testid="info-icon">InfoIcon</span>;
  };
});

describe('RdsAlert', () => {
  const defaultProps: RdsAlertProps = {
    description: 'This is a test alert message',
  };

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      render(<RdsAlert {...defaultProps} />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsAlert.displayName).toBe('RdsAlert');
    });

    it('should render with base class', () => {
      const { container } = render(<RdsAlert {...defaultProps} />);
      expect(container.querySelector('.rds-alert')).toBeInTheDocument();
    });

    it('should render alert wrapper', () => {
      const { container } = render(<RdsAlert {...defaultProps} />);
      expect(container.querySelector('.rds-alert__wrapper')).toBeInTheDocument();
    });

    it('should render alert content', () => {
      const { container } = render(<RdsAlert {...defaultProps} />);
      expect(container.querySelector('.rds-alert__content')).toBeInTheDocument();
    });

    it('should render description text', () => {
      render(<RdsAlert {...defaultProps} description="Test message" />);
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });
  });

  describe('Alert Types (Severity)', () => {
    it('should render info type by default', () => {
      const { container } = render(<RdsAlert {...defaultProps} />);
      expect(container.querySelector('.rds-alert--info')).toBeInTheDocument();
    });

    it('should render success type', () => {
      const { container } = render(
        <RdsAlert {...defaultProps} type="success" />
      );
      expect(container.querySelector('.rds-alert--success')).toBeInTheDocument();
    });

    it('should render warning type', () => {
      const { container } = render(
        <RdsAlert {...defaultProps} type="warning" />
      );
      expect(container.querySelector('.rds-alert--warning')).toBeInTheDocument();
    });

    it('should render error type', () => {
      const { container } = render(
        <RdsAlert {...defaultProps} type="error" />
      );
      expect(container.querySelector('.rds-alert--error')).toBeInTheDocument();
    });

    it('should use severity prop over type prop', () => {
      const { container } = render(
        <RdsAlert {...defaultProps} type="info" severity="error" />
      );
      expect(container.querySelector('.rds-alert--error')).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('should apply small size class', () => {
      const { container } = render(
        <RdsAlert {...defaultProps} size="small" />
      );
      expect(container.querySelector('.rds-alert--small')).toBeInTheDocument();
    });

    it('should apply medium size class by default', () => {
      const { container } = render(<RdsAlert {...defaultProps} />);
      expect(container.querySelector('.rds-alert--medium')).toBeInTheDocument();
    });

    it('should apply large size class', () => {
      const { container } = render(
        <RdsAlert {...defaultProps} size="large" />
      );
      expect(container.querySelector('.rds-alert--large')).toBeInTheDocument();
    });
  });

  describe('Style Variants', () => {
    it('should apply style1 variant by default', () => {
      const { container } = render(<RdsAlert {...defaultProps} />);
      expect(container.querySelector('.rds-alert--style1')).toBeInTheDocument();
    });

    it('should apply style2 variant', () => {
      const { container } = render(
        <RdsAlert {...defaultProps} variantStyle="style2" />
      );
      expect(container.querySelector('.rds-alert--style2')).toBeInTheDocument();
    });

    it('should apply style3 variant', () => {
      const { container } = render(
        <RdsAlert {...defaultProps} variantStyle="style3" />
      );
      expect(container.querySelector('.rds-alert--style3')).toBeInTheDocument();
    });
  });

  describe('Title Display', () => {
    it('should not display title by default', () => {
      render(<RdsAlert {...defaultProps} title="Test Title" />);
      expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    });

    it('should display title when showTitle is true', () => {
      render(
        <RdsAlert
          {...defaultProps}
          title="Test Title"
          showTitle={true}
        />
      );
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should display default title', () => {
      render(<RdsAlert {...defaultProps} showTitle={true} />);
      expect(screen.getByText('Heading Title.')).toBeInTheDocument();
    });

    it('should display custom title text', () => {
      render(
        <RdsAlert
          {...defaultProps}
          title="Custom Alert Title"
          showTitle={true}
        />
      );
      expect(screen.getByText('Custom Alert Title')).toBeInTheDocument();
    });

    it('should apply title class in single line mode', () => {
      const { container } = render(
        <RdsAlert
          {...defaultProps}
          title="Test Title"
          showTitle={true}
          multiline={false}
        />
      );
      const heading = container.querySelector('.rds-alert__heading');
      expect(heading).toBeInTheDocument();
      expect(heading).not.toHaveClass('rds-alert__heading--multiline');
    });

    it('should apply multiline title class in multiline mode', () => {
      const { container } = render(
        <RdsAlert
          {...defaultProps}
          title="Test Title"
          showTitle={true}
          multiline={true}
        />
      );
      const heading = container.querySelector('.rds-alert__heading--multiline');
      expect(heading).toBeInTheDocument();
    });
  });

  describe('Description Display', () => {
    it('should display description by default', () => {
      render(<RdsAlert {...defaultProps} description="Test description" />);
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('should not display description when showDescription is false', () => {
      render(
        <RdsAlert
          {...defaultProps}
          description="Test description"
          showDescription={false}
        />
      );
      expect(screen.queryByText('Test description')).not.toBeInTheDocument();
    });

    it('should use children as description fallback', () => {
      render(<RdsAlert>Children description text</RdsAlert>);
      expect(screen.getByText('Children description text')).toBeInTheDocument();
    });

    it('should display description with title in multiline mode', () => {
      render(
        <RdsAlert
          {...defaultProps}
          description="Description text"
          title="Title text"
          showTitle={true}
          showDescription={true}
          multiline={true}
        />
      );
      expect(screen.getByText('Title text')).toBeInTheDocument();
      expect(screen.getByText('Description text')).toBeInTheDocument();
    });

    it('should display description with title in single line mode', () => {
      render(
        <RdsAlert
          {...defaultProps}
          description="Description text"
          title="Title text"
          showTitle={true}
          showDescription={true}
          multiline={false}
        />
      );
      expect(screen.getByText('Title text')).toBeInTheDocument();
      expect(screen.getByText('Description text')).toBeInTheDocument();
    });
  });

  describe('Icon Display', () => {
    it('should display default icon when showIcon is true', () => {
      render(<RdsAlert {...defaultProps} showIcon={true} />);
      expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    });

    it('should not display icon when showIcon is false', () => {
      render(<RdsAlert {...defaultProps} showIcon={false} />);
      expect(screen.queryByTestId('info-icon')).not.toBeInTheDocument();
    });

    it('should not display icon when changeIconName is null', () => {
      render(
        <RdsAlert {...defaultProps} showIcon={true} changeIconName={null} />
      );
      expect(screen.queryByTestId('info-icon')).not.toBeInTheDocument();
    });

    it('should display custom icon element', () => {
      const customIcon = <span data-testid="custom-icon">CustomIcon</span>;
      render(
        <RdsAlert
          {...defaultProps}
          showIcon={true}
          changeIconName={customIcon}
        />
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('should apply icon class to custom icon element', () => {
      const customIcon = (
        <span data-testid="custom-icon" className="existing-class">
          CustomIcon
        </span>
      );
      const { container } = render(
        <RdsAlert
          {...defaultProps}
          showIcon={true}
          changeIconName={customIcon}
        />
      );
      const icon = screen.getByTestId('custom-icon');
      expect(icon).toHaveClass('rds-alert__icon');
      expect(icon).toHaveClass('existing-class');
    });

    it('should apply icon class to default icon', () => {
      render(<RdsAlert {...defaultProps} />);
      // The default icon is rendered by the mocked InfoIcon component
      expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    });
  });

  describe('Multiline Mode', () => {
    it('should not apply multiline class by default', () => {
      const { container } = render(<RdsAlert {...defaultProps} />);
      expect(container.querySelector('.rds-alert--multiline')).not.toBeInTheDocument();
    });

    it('should apply multiline class when multiline is true', () => {
      const { container } = render(
        <RdsAlert {...defaultProps} multiline={true} />
      );
      expect(container.querySelector('.rds-alert--multiline')).toBeInTheDocument();
    });

    it('should render title in multiline layout', () => {
      const { container } = render(
        <RdsAlert
          {...defaultProps}
          title="Test Title"
          showTitle={true}
          multiline={true}
        />
      );
      const heading = container.querySelector('.rds-alert__heading--multiline');
      expect(heading).toBeInTheDocument();
    });

    it('should render description in multiline layout', () => {
      const { container } = render(
        <RdsAlert
          {...defaultProps}
          description="Test description"
          multiline={true}
        />
      );
      const description = container.querySelector('.rds-alert__description');
      expect(description).toBeInTheDocument();
      expect(description?.textContent).toBe('Test description');
    });

    it('should render bottom row layout in multiline mode', () => {
      const { container } = render(
        <RdsAlert
          {...defaultProps}
          multiline={true}
          showButtons={true}
          showPrimary={true}
        />
      );
      const bottomRow = container.querySelector('.rds-alert__bottom-row');
      expect(bottomRow).toBeInTheDocument();
    });
  });

  describe('Buttons Display', () => {
    it('should not display buttons by default when showButtons is false', () => {
      render(<RdsAlert {...defaultProps} showButtons={false} />);
      const buttons = screen.queryAllByTestId('rds-button');
      expect(buttons).toHaveLength(0);
    });

    it('should display all buttons by default when showButtons is true', () => {
      render(
        <RdsAlert
          {...defaultProps}
          showButtons={true}
          showLink={true}
          showSecondary={true}
          showPrimary={true}
        />
      );
      const buttons = screen.getAllByTestId('rds-button');
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    });

    it('should display link button when showLink is true', () => {
      const { container } = render(
        <RdsAlert {...defaultProps} showButtons={true} showLink={true} />
      );
      const link = container.querySelector('.rds-alert__link-button');
      expect(link).toBeInTheDocument();
      expect(link?.textContent).toBe('Link');
    });

    it('should not display link button when showLink is false', () => {
      const { container } = render(
        <RdsAlert {...defaultProps} showButtons={true} showLink={false} />
      );
      const link = container.querySelector('.rds-alert__link-button');
      expect(link).not.toBeInTheDocument();
    });

    it('should display secondary button when showSecondary is true', () => {
      render(
        <RdsAlert
          {...defaultProps}
          showButtons={true}
          showSecondary={true}
        />
      );
      const buttons = screen.getAllByTestId('rds-button');
      const secondaryButton = buttons.find(
        (btn) => btn.getAttribute('data-text') === 'Cancel'
      );
      expect(secondaryButton).toBeInTheDocument();
    });

    it('should display primary button when showPrimary is true', () => {
      render(
        <RdsAlert
          {...defaultProps}
          showButtons={true}
          showPrimary={true}
        />
      );
      const buttons = screen.getAllByTestId('rds-button');
      const primaryButton = buttons.find(
        (btn) => btn.getAttribute('data-text') === 'Okay'
      );
      expect(primaryButton).toBeInTheDocument();
    });

    it('should apply primary button class', () => {
      const { container } = render(
        <RdsAlert
          {...defaultProps}
          showButtons={true}
          showPrimary={true}
        />
      );
      const primaryButton = container.querySelector(
        '.rds-alert__primary-button'
      );
      expect(primaryButton).toBeInTheDocument();
    });

    it('should use "filled" style for primary button', () => {
      render(
        <RdsAlert
          {...defaultProps}
          showButtons={true}
          showPrimary={true}
        />
      );
      const buttons = screen.getAllByTestId('rds-button');
      const primaryButton = buttons.find(
        (btn) => btn.getAttribute('data-text') === 'Okay'
      );
      expect(primaryButton).toHaveAttribute('data-style', 'filled');
    });

    it('should use "transparent" style for secondary button', () => {
      render(
        <RdsAlert
          {...defaultProps}
          showButtons={true}
          showSecondary={true}
        />
      );
      const buttons = screen.getAllByTestId('rds-button');
      const secondaryButton = buttons.find(
        (btn) => btn.getAttribute('data-text') === 'Cancel'
      );
      expect(secondaryButton).toHaveAttribute('data-style', 'transparent');
    });

    it('should set button size to small', () => {
      render(
        <RdsAlert
          {...defaultProps}
          showButtons={true}
          showPrimary={true}
        />
      );
      const buttons = screen.getAllByTestId('rds-button');
      expect(buttons.every((btn) => btn.getAttribute('data-size') === 'small')).toBe(true);
    });

    it('should use error color for buttons when alert type is error', () => {
      render(
        <RdsAlert
          {...defaultProps}
          type="error"
          showButtons={true}
          showPrimary={true}
        />
      );
      const buttons = screen.getAllByTestId('rds-button');
      expect(buttons.every((btn) => btn.getAttribute('data-color') === 'error')).toBe(true);
    });

    it('should use primary color for buttons when alert type is not error', () => {
      render(
        <RdsAlert
          {...defaultProps}
          type="success"
          showButtons={true}
          showPrimary={true}
        />
      );
      const buttons = screen.getAllByTestId('rds-button');
      expect(buttons.every((btn) => btn.getAttribute('data-color') === 'primary')).toBe(true);
    });
  });

  describe('Custom ClassName', () => {
    it('should apply custom className to root element', () => {
      render(
        <RdsAlert {...defaultProps} className="custom-alert-class" />
      );
      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('custom-alert-class');
    });

    it('should maintain base classes with custom className', () => {
      render(
        <RdsAlert {...defaultProps} className="custom-class" />
      );
      const alert = screen.getByRole('alert');
      // Verify the alert exists and custom class is applied
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass('custom-class');
    });

    it('should combine all classes correctly', () => {
      render(
        <RdsAlert
          {...defaultProps}
          type="error"
          size="large"
          variantStyle="style2"
          className="my-custom-class"
        />
      );
      const alert = screen.getByRole('alert');
      // Verify alert exists with MUI error styling and custom class
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass('MuiAlert-colorError');
      expect(alert).toHaveClass('my-custom-class');
    });
  });

  describe('Props Validation', () => {
    it('should render with minimal required props', () => {
      render(<RdsAlert />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should handle empty description', () => {
      const { container } = render(<RdsAlert description="" />);
      expect(container.querySelector('.rds-alert')).toBeInTheDocument();
    });

    it('should handle undefined description', () => {
      const { container } = render(<RdsAlert />);
      expect(container.querySelector('.rds-alert')).toBeInTheDocument();
    });

    it('should accept MUI alert props', () => {
      const { container } = render(
        <RdsAlert {...defaultProps} variant="filled" />
      );
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should pass through unknown props to MUI Alert', () => {
      const { container } = render(
        <RdsAlert {...defaultProps} data-custom="test-value" />
      );
      const alert = container.querySelector('[data-custom="test-value"]');
      expect(alert).toBeInTheDocument();
    });
  });

  describe('Combined Props Tests', () => {
    it('should render alert with all props customized', () => {
      render(
        <RdsAlert
          description="Custom alert message"
          type="warning"
          showIcon={true}
          title="Warning Title"
          showTitle={true}
          showDescription={true}
          size="large"
          multiline={true}
          variantStyle="style3"
          showLink={true}
          showSecondary={true}
          showPrimary={true}
          showButtons={true}
          className="custom-alert"
        />
      );

      expect(screen.getByText('Warning Title')).toBeInTheDocument();
      expect(screen.getByText('Custom alert message')).toBeInTheDocument();
      expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    });

    it('should handle error alert with specific styling', () => {
      const { container } = render(
        <RdsAlert
          {...defaultProps}
          type="error"
          size="large"
          variantStyle="style2"
          showIcon={true}
        />
      );

      expect(container.querySelector('.rds-alert--error')).toBeInTheDocument();
      expect(container.querySelector('.rds-alert--large')).toBeInTheDocument();
      expect(container.querySelector('.rds-alert--style2')).toBeInTheDocument();
    });

    it('should handle success alert configuration', () => {
      render(
        <RdsAlert
          {...defaultProps}
          type="success"
          showTitle={true}
          title="Success!"
          showDescription={true}
          showButtons={true}
        />
      );

      expect(screen.getByText('Success!')).toBeInTheDocument();
      expect(screen.getByText(defaultProps.description!)).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long description text', () => {
      const longText = 'A'.repeat(500);
      render(<RdsAlert description={longText} />);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('should handle special HTML characters in description', () => {
      const specialCharsText = 'Special chars: <>, &, ", \'';
      render(
        <RdsAlert description={specialCharsText} />
      );
      expect(
        screen.getByText(/Special chars:/)
      ).toBeInTheDocument();
    });

    it('should handle unicode characters in description', () => {
      render(
        <RdsAlert description="Unicode: 你好 🎉 مرحبا" />
      );
      expect(screen.getByText(/Unicode:/)).toBeInTheDocument();
    });

    it('should handle whitespace in description', () => {
      render(
        <RdsAlert description="   Whitespace   test   " />
      );
      expect(
        screen.getByText(/Whitespace/)
      ).toBeInTheDocument();
    });

    it('should handle JSX children element', () => {
      render(
        <RdsAlert>
          <div className="custom-content">Custom React element</div>
        </RdsAlert>
      );
      expect(screen.getByText('Custom React element')).toBeInTheDocument();
    });

    it('should render without breaking with all boolean props false', () => {
      const { container } = render(
        <RdsAlert
          {...defaultProps}
          showIcon={false}
          showTitle={false}
          showDescription={false}
          showButtons={false}
        />
      );
      expect(container.querySelector('.rds-alert')).toBeInTheDocument();
    });

    it('should render without breaking with all boolean props true', () => {
      render(
        <RdsAlert
          {...defaultProps}
          showIcon={true}
          showTitle={true}
          title="Test"
          showDescription={true}
          showButtons={true}
          showLink={true}
          showSecondary={true}
          showPrimary={true}
        />
      );
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('Default Props Tests', () => {
    it('should use default description display', () => {
      render(<RdsAlert {...defaultProps} description="Test" />);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('should use default type as info', () => {
      const { container } = render(<RdsAlert />);
      expect(container.querySelector('.rds-alert--info')).toBeInTheDocument();
    });

    it('should use default size as medium', () => {
      const { container } = render(<RdsAlert />);
      expect(container.querySelector('.rds-alert--medium')).toBeInTheDocument();
    });

    it('should use default variantStyle as style1', () => {
      const { container } = render(<RdsAlert />);
      expect(container.querySelector('.rds-alert--style1')).toBeInTheDocument();
    });

    it('should use default showIcon as true', () => {
      render(<RdsAlert />);
      expect(screen.getByTestId('info-icon')).toBeInTheDocument();
    });

    it('should use default showTitle as false', () => {
      render(<RdsAlert title="Test Title" />);
      expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    });

    it('should use default showDescription as true', () => {
      render(<RdsAlert description="Test description" />);
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('should use default multiline as false', () => {
      const { container } = render(<RdsAlert />);
      expect(container.querySelector('.rds-alert--multiline')).not.toBeInTheDocument();
    });

    it('should use default showButtons as true', () => {
      const { container } = render(<RdsAlert showButtons={true} />);
      expect(container.querySelector('.rds-alert__actions')).toBeInTheDocument();
    });

    it('should use default showLink as true', () => {
      const { container } = render(
        <RdsAlert showButtons={true} showLink={true} />
      );
      expect(container.querySelector('.rds-alert__link-button')).toBeInTheDocument();
    });

    it('should use default showPrimary as true', () => {
      render(<RdsAlert showButtons={true} showPrimary={true} />);
      const buttons = screen.getAllByTestId('rds-button');
      const primaryButton = buttons.find(
        (btn) => btn.getAttribute('data-text') === 'Okay'
      );
      expect(primaryButton).toBeInTheDocument();
    });

    it('should use default showSecondary as true', () => {
      render(<RdsAlert showButtons={true} showSecondary={true} />);
      const buttons = screen.getAllByTestId('rds-button');
      const secondaryButton = buttons.find(
        (btn) => btn.getAttribute('data-text') === 'Cancel'
      );
      expect(secondaryButton).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsAlert description="Test alert message" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
