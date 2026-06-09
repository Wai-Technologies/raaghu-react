import React from 'react';
import { render, screen } from '@testing-library/react';
import RdsCompSpinner, {
  SpinnerSize,
  SpinnerLayout,
  SpinnerLevel,
  RdsCompSpinnerProps,
} from './rds-comp-spinner';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-comp-spinner.scss', () => ({}));

describe('RdsCompSpinner', () => {
  const defaultProps: RdsCompSpinnerProps = {
    spinnerType: 'border',
    size: SpinnerSize.Default,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = render(<RdsCompSpinner {...defaultProps} />);
      expect(container.querySelector('.spinner-container')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCompSpinner.displayName).toBe('RdsCompSpinner');
    });

    it('should render spinner div with role status', () => {
      render(<RdsCompSpinner {...defaultProps} />);
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
    });

    it('should render with default border spinner', () => {
      const { container } = render(<RdsCompSpinner {...defaultProps} />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('spinner-border');
    });

    it('should have spinner-container class', () => {
      const { container } = render(<RdsCompSpinner {...defaultProps} />);
      const container_el = container.querySelector('.spinner-container');
      expect(container_el).toHaveClass('spinner-container--default');
    });
  });

  describe('Spinner Types', () => {
    it('should render border spinner when spinnerType is "border"', () => {
      render(<RdsCompSpinner {...defaultProps} spinnerType="border" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('spinner-border');
      expect(spinner).not.toHaveClass('spinner-grow');
    });

    it('should render grow spinner when spinnerType is "grow"', () => {
      render(<RdsCompSpinner {...defaultProps} spinnerType="grow" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('spinner-grow');
      expect(spinner).not.toHaveClass('spinner-border');
    });

    it('should default to border spinner when no type specified', () => {
      const { container } = render(<RdsCompSpinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('spinner-border');
    });
  });

  describe('Spinner Sizes', () => {
    it('should render Default size spinner (30x30)', () => {
      render(<RdsCompSpinner {...defaultProps} size={SpinnerSize.Default} />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveStyle({ width: '30px', height: '30px' });
    });

    it('should render Small size spinner (15x15)', () => {
      render(<RdsCompSpinner {...defaultProps} size={SpinnerSize.Small} />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveStyle({ width: '15px', height: '15px' });
    });

    it('should render Medium size spinner (35x35)', () => {
      render(<RdsCompSpinner {...defaultProps} size={SpinnerSize.Medium} />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveStyle({ width: '35px', height: '35px' });
    });

    it('should render Large size spinner (45x45)', () => {
      render(<RdsCompSpinner {...defaultProps} size={SpinnerSize.Large} />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveStyle({ width: '45px', height: '45px' });
    });

    it('should use custom width and height when size not specified', () => {
      render(<RdsCompSpinner width="50px" height="50px" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveStyle({ width: '50px', height: '50px' });
    });

    it('should override custom dimensions with size prop', () => {
      render(
        <RdsCompSpinner
          {...defaultProps}
          size={SpinnerSize.Large}
          width="100px"
          height="100px"
        />
      );
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveStyle({ width: '45px', height: '45px' });
    });
  });

  describe('Label Display', () => {
    it('should not show label by default', () => {
      const { container } = render(<RdsCompSpinner {...defaultProps} />);
      const label = container.querySelector('.spinner-label');
      expect(label).not.toBeInTheDocument();
    });

    it('should show label when showLabel is true', () => {
      const { container } = render(
        <RdsCompSpinner {...defaultProps} showLabel={true} labelText="Loading..." />
      );
      const label = container.querySelector('.spinner-label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('Loading...');
    });

    it('should render label text correctly', () => {
      const { container } = render(
        <RdsCompSpinner
          {...defaultProps}
          showLabel={true}
          labelText="Please wait"
        />
      );
      const label = container.querySelector('.spinner-label');
      expect(label).toHaveTextContent('Please wait');
    });

    it('should not display label when showLabel is false', () => {
      const { container } = render(
        <RdsCompSpinner
          {...defaultProps}
          showLabel={false}
          labelText="Loading..."
        />
      );
      const label = container.querySelector('.spinner-label');
      expect(label).not.toBeInTheDocument();
    });

    it('should handle empty label text', () => {
      const { container } = render(
        <RdsCompSpinner {...defaultProps} showLabel={true} labelText="" />
      );
      const label = container.querySelector('.spinner-label');
      expect(label).toBeInTheDocument();
      expect(label?.textContent).toBe('');
    });

    it('should handle long label text', () => {
      const longText = 'This is a very long loading message that spans multiple words';
      const { container } = render(
        <RdsCompSpinner
          {...defaultProps}
          showLabel={true}
          labelText={longText}
        />
      );
      const label = container.querySelector('.spinner-label');
      expect(label).toHaveTextContent(longText);
    });
  });

  describe('Label Sizing', () => {
    it('should apply small label class for Small size', () => {
      const { container } = render(
        <RdsCompSpinner
          {...defaultProps}
          size={SpinnerSize.Small}
          showLabel={true}
          labelText="Small"
        />
      );
      const label = container.querySelector('.spinner-label');
      expect(label).toHaveClass('spinner-label--small');
    });

    it('should apply default label class for Default size', () => {
      const { container } = render(
        <RdsCompSpinner
          {...defaultProps}
          size={SpinnerSize.Default}
          showLabel={true}
          labelText="Default"
        />
      );
      const label = container.querySelector('.spinner-label');
      expect(label).toHaveClass('spinner-label--default');
    });

    it('should apply medium label class for Medium size', () => {
      const { container } = render(
        <RdsCompSpinner
          {...defaultProps}
          size={SpinnerSize.Medium}
          showLabel={true}
          labelText="Medium"
        />
      );
      const label = container.querySelector('.spinner-label');
      expect(label).toHaveClass('spinner-label--medium');
    });

    it('should apply large label class for Large size', () => {
      const { container } = render(
        <RdsCompSpinner
          {...defaultProps}
          size={SpinnerSize.Large}
          showLabel={true}
          labelText="Large"
        />
      );
      const label = container.querySelector('.spinner-label');
      expect(label).toHaveClass('spinner-label--large');
    });
  });

  describe('Layout Variants', () => {
    it('should render LabelOnBottom layout', () => {
      const { container } = render(
        <RdsCompSpinner
          {...defaultProps}
          layout={SpinnerLayout.LabelOnBottom}
        />
      );
      const spinnerContainer = container.querySelector('.spinner-container');
      expect(spinnerContainer).toHaveClass('spinner-container--label-bottom');
    });

    it('should render LabelAndSpinner layout', () => {
      const { container } = render(
        <RdsCompSpinner
          {...defaultProps}
          layout={SpinnerLayout.LabelAndSpinner}
        />
      );
      const spinnerContainer = container.querySelector('.spinner-container');
      expect(spinnerContainer).toHaveClass('spinner-container--label-spinner');
    });

    it('should render SpinnerAndLabel layout', () => {
      const { container } = render(
        <RdsCompSpinner
          {...defaultProps}
          layout={SpinnerLayout.SpinnerAndLabel}
        />
      );
      const spinnerContainer = container.querySelector('.spinner-container');
      expect(spinnerContainer).toHaveClass('spinner-container--spinner-label');
    });

    it('should render LabelOnTop layout', () => {
      const { container } = render(
        <RdsCompSpinner
          {...defaultProps}
          layout={SpinnerLayout.LabelOnTop}
        />
      );
      const spinnerContainer = container.querySelector('.spinner-container');
      expect(spinnerContainer).toHaveClass('spinner-container--label-top');
    });

    it('should use default layout when not specified', () => {
      const { container } = render(<RdsCompSpinner {...defaultProps} />);
      const spinnerContainer = container.querySelector('.spinner-container');
      expect(spinnerContainer).toHaveClass('spinner-container--default');
    });
  });

  describe('Color Variants', () => {
    it('should apply color variant class', () => {
      render(<RdsCompSpinner {...defaultProps} colorVariant="primary" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('text-primary');
    });

    it('should apply secondary color variant', () => {
      render(<RdsCompSpinner {...defaultProps} colorVariant="secondary" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('text-secondary');
    });

    it('should apply success color variant', () => {
      render(<RdsCompSpinner {...defaultProps} colorVariant="success" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('text-success');
    });

    it('should apply danger color variant', () => {
      render(<RdsCompSpinner {...defaultProps} colorVariant="danger" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('text-danger');
    });

    it('should apply warning color variant', () => {
      render(<RdsCompSpinner {...defaultProps} colorVariant="warning" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('text-warning');
    });

    it('should apply info color variant', () => {
      render(<RdsCompSpinner {...defaultProps} colorVariant="info" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('text-info');
    });

    it('should not apply color class when colorVariant not specified', () => {
      render(<RdsCompSpinner {...defaultProps} colorVariant={undefined} />);
      const spinner = screen.getByRole('status');
      expect(spinner).not.toHaveClass(/text-/);
    });
  });

  describe('Opacity Levels', () => {
    it('should apply Level01 opacity (0.25)', () => {
      render(<RdsCompSpinner {...defaultProps} level={SpinnerLevel.Level01} />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveStyle({ opacity: '0.25' });
    });

    it('should apply Level02 opacity (0.5)', () => {
      render(<RdsCompSpinner {...defaultProps} level={SpinnerLevel.Level02} />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveStyle({ opacity: '0.5' });
    });

    it('should apply Level03 opacity (0.75)', () => {
      render(<RdsCompSpinner {...defaultProps} level={SpinnerLevel.Level03} />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveStyle({ opacity: '0.75' });
    });

    it('should apply Level04 opacity (1)', () => {
      render(<RdsCompSpinner {...defaultProps} level={SpinnerLevel.Level04} />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveStyle({ opacity: '1' });
    });

    it('should default to full opacity when level not specified', () => {
      render(<RdsCompSpinner {...defaultProps} level={undefined} />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveStyle({ opacity: '1' });
    });
  });

  describe('Props Combinations', () => {
    it('should render with all major props combined', () => {
      const { container } = render(
        <RdsCompSpinner
          spinnerType="grow"
          size={SpinnerSize.Large}
          showLabel={true}
          labelText="Processing..."
          layout={SpinnerLayout.LabelOnTop}
          colorVariant="success"
          level={SpinnerLevel.Level03}
        />
      );
      const spinner = screen.getByRole('status');
      const label = container.querySelector('.spinner-label');

      expect(spinner).toHaveClass('spinner-grow', 'text-success');
      expect(spinner).toHaveStyle({ width: '45px', height: '45px', opacity: '0.75' });
      expect(label).toHaveTextContent('Processing...');
      expect(container.querySelector('.spinner-container')).toHaveClass(
        'spinner-container--label-top'
      );
    });

    it('should render border spinner with default settings', () => {
      render(<RdsCompSpinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('spinner-border');
      expect(spinner).toHaveStyle({ opacity: '1' });
    });

    it('should handle custom dimensions with color and opacity', () => {
      render(
        <RdsCompSpinner
          width="60px"
          height="60px"
          colorVariant="warning"
          level={SpinnerLevel.Level02}
        />
      );
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveStyle({
        width: '60px',
        height: '60px',
        opacity: '0.5',
      });
      expect(spinner).toHaveClass('text-warning');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very small custom dimensions', () => {
      render(<RdsCompSpinner width="5px" height="5px" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveStyle({ width: '5px', height: '5px' });
    });

    it('should handle very large custom dimensions', () => {
      render(<RdsCompSpinner width="200px" height="200px" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveStyle({ width: '200px', height: '200px' });
    });

    it('should handle undefined props gracefully', () => {
      const { container } = render(
        <RdsCompSpinner
          spinnerType={undefined}
          width={undefined}
          height={undefined}
          showLabel={undefined}
          labelText={undefined}
          size={undefined}
          layout={undefined}
          colorVariant={undefined}
          level={undefined}
        />
      );
      expect(container.querySelector('.spinner-container')).toBeInTheDocument();
    });

    it('should handle special characters in label text', () => {
      const { container } = render(
        <RdsCompSpinner
          showLabel={true}
          labelText="Loading... 50% <100>"
        />
      );
      const label = container.querySelector('.spinner-label');
      expect(label).toHaveTextContent('Loading... 50% <100>');
    });

    it('should handle numeric label text', () => {
      const { container } = render(
        <RdsCompSpinner showLabel={true} labelText="123" />
      );
      const label = container.querySelector('.spinner-label');
      expect(label).toHaveTextContent('123');
    });

    it('should handle spinner with label and all sizes', () => {
      const sizes = [SpinnerSize.Small, SpinnerSize.Default, SpinnerSize.Medium, SpinnerSize.Large];
      sizes.forEach(size => {
        const { unmount, container } = render(
          <RdsCompSpinner
            size={size}
            showLabel={true}
            labelText="Loading"
          />
        );
        const label = container.querySelector('.spinner-label');
        expect(label).toBeInTheDocument();
        unmount();
      });
    });

    it('should handle all spinner types with all colors', () => {
      const types = ['border', 'grow'];
      const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];

      types.forEach(type => {
        colors.forEach(color => {
          const { unmount } = render(
            <RdsCompSpinner spinnerType={type} colorVariant={color} />
          );
          const spinner = screen.getByRole('status');
          expect(spinner).toHaveClass(`text-${color}`);
          unmount();
        });
      });
    });
  });

  describe('Accessibility', () => {
    it('should have role="status" for accessibility', () => {
      render(<RdsCompSpinner {...defaultProps} />);
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
  
    });

    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompSpinner {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should be accessible when label is shown', () => {
      const { container } = render(
        <RdsCompSpinner
          {...defaultProps}
          showLabel={true}
          labelText="Loading content"
        />
      );
      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('should render complete spinner with all features', () => {
      const { container } = render(
        <RdsCompSpinner
          spinnerType="border"
          size={SpinnerSize.Medium}
          showLabel={true}
          labelText="Uploading files..."
          layout={SpinnerLayout.LabelOnBottom}
          colorVariant="primary"
          level={SpinnerLevel.Level04}
        />
      );

      const spinner = screen.getByRole('status');
      const label = container.querySelector('.spinner-label');
      const spinnerContainer = container.querySelector('.spinner-container');

      expect(spinner).toHaveClass('spinner-border', 'text-primary');
      expect(spinner).toHaveStyle({ width: '35px', height: '35px', opacity: '1' });
      expect(label).toHaveTextContent('Uploading files...');
      expect(spinnerContainer).toHaveClass('spinner-container--label-bottom');
    });

    it('should render minimal spinner with only required props', () => {
      const { container } = render(<RdsCompSpinner />);
      const spinner = screen.getByRole('status');

      expect(spinner).toHaveClass('spinner-border');
      expect(container.querySelector('label')).not.toBeInTheDocument();
    });

    it('should handle dynamic prop updates', () => {
      const { rerender, container } = render(
        <RdsCompSpinner size={SpinnerSize.Small} colorVariant="primary" />
      );

      let spinner = screen.getByRole('status');
      expect(spinner).toHaveStyle({ width: '15px', height: '15px' });
      expect(spinner).toHaveClass('text-primary');

      rerender(
        <RdsCompSpinner size={SpinnerSize.Large} colorVariant="danger" />
      );

      spinner = screen.getByRole('status');
      expect(spinner).toHaveStyle({ width: '45px', height: '45px' });
      expect(spinner).toHaveClass('text-danger');
    });
  });
});