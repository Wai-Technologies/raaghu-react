import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RdsCompToast, {
  ToastLayout,
  ToastState,
  ToastLeadingIcon,
  ToastPosition,
  RdsCompToastProps,
} from './rds-comp-toast';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-comp-toast.scss', () => ({}));

// Mock RdsProgress component
jest.mock('../../raaghu-elements/rds-progress/rds-progress', () => {
  return function MockRdsProgress(props: any) {
    return (
      <div data-testid="rds-progress" data-value={props.value} data-label={props.label}>
        Progress
      </div>
    );
  };
});

// Mock RdsButton component
jest.mock('../../raaghu-elements/rds-button/rds-button', () => {
  return function MockRdsButton(props: any) {
    return (
      <button
        data-testid="rds-button"
        className={props.className}
        data-style={props.style}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );
  };
});

describe('RdsCompToast', () => {
  const defaultProps: RdsCompToastProps = {
    subText: 'This is a toast message',
    layout: ToastLayout.Text,
    state: ToastState.Basic,
    showLeading: true,
    leadingIcon: ToastLeadingIcon.Circle,
  };

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      render(<RdsCompToast {...defaultProps} />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCompToast.displayName).toBe('RdsCompToast');
    });

    it('should render with alert role and assertive aria-live', () => {
      render(<RdsCompToast {...defaultProps} />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('aria-live', 'assertive');
      expect(alert).toHaveAttribute('aria-atomic', 'true');
    });

    it('should have correct id', () => {
      render(<RdsCompToast {...defaultProps} />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('id', 'toastId');
    });

    it('should render with visible class by default', () => {
      render(<RdsCompToast {...defaultProps} />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('rds-comp-toast--visible');
    });

    it('should render subtext', () => {
      render(<RdsCompToast {...defaultProps} subText="Test message" showSubText={true} />);
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });
  });

  describe('State Variants', () => {
    it('should apply basic state class', () => {
      render(<RdsCompToast {...defaultProps} state={ToastState.Basic} />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('rds-comp-toast--basic');
    });

    it('should apply info state class', () => {
      render(<RdsCompToast {...defaultProps} state={ToastState.Info} />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('rds-comp-toast--info');
      expect(alert).toHaveClass('rds-comp-toast--border-dark');
    });

    it('should apply success state class', () => {
      render(<RdsCompToast {...defaultProps} state={ToastState.Success} />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('rds-comp-toast--success');
      expect(alert).toHaveClass('rds-comp-toast--border-primary');
    });

    it('should apply error state class', () => {
      render(<RdsCompToast {...defaultProps} state={ToastState.Error} />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('rds-comp-toast--error');
      expect(alert).toHaveClass('rds-comp-toast--border-danger');
    });

    it('should apply correct border color for each state', () => {
      const { rerender } = render(
        <RdsCompToast {...defaultProps} state={ToastState.Basic} />
      );
      let alert = screen.getByRole('alert');
      expect(alert).toHaveClass('rds-comp-toast--border-light');

      rerender(<RdsCompToast {...defaultProps} state={ToastState.Info} />);
      alert = screen.getByRole('alert');
      expect(alert).toHaveClass('rds-comp-toast--border-dark');
    });
  });

  describe('Layout Variants', () => {
    it('should apply text layout class', () => {
      render(<RdsCompToast {...defaultProps} layout={ToastLayout.Text} showHeader={true} />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('rds-comp-toast--text');
    });

    it('should apply download layout class', () => {
      render(<RdsCompToast {...defaultProps} layout={ToastLayout.Download} showHeader={true} />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('rds-comp-toast--download');
    });

    it('should apply chat layout class', () => {
      render(<RdsCompToast {...defaultProps} layout={ToastLayout.Chat} showHeader={true} />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('rds-comp-toast--chat');
    });

    it('should apply request layout class', () => {
      render(<RdsCompToast {...defaultProps} layout={ToastLayout.Request} showHeader={true} />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('rds-comp-toast--request');
    });

    it('should render download layout with progress bar', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          layout={ToastLayout.Download}
          showHeader={true}
          filename="test.pdf"
          progressWidth={45}
        />
      );
      const progress = screen.getByTestId('rds-progress');
      expect(progress).toHaveAttribute('data-value', '45');
      expect(screen.getByText('test.pdf')).toBeInTheDocument();
    });

    it('should render chat layout with input field', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          layout={ToastLayout.Chat}
          showHeader={true}
          placeholder="Type reply..."
        />
      );
      const input = screen.getByPlaceholderText('Type reply...');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('rds-comp-toast__input');
    });

    it('should render request layout without input', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          layout={ToastLayout.Request}
          showHeader={true}
        />
      );
      const inputs = screen.queryAllByPlaceholderText(/./);
      expect(inputs.length).toBe(0);
    });
  });

  describe('Position Variants', () => {
    it('should apply top-left position class', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          position={ToastPosition.TopLeft}
        />
      );
      const container = screen.getByRole('alert').parentElement;
      expect(container).toHaveClass('rds-comp-toast__container--top-left');
    });

    it('should apply top-center position class', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          position={ToastPosition.TopCenter}
        />
      );
      const container = screen.getByRole('alert').parentElement;
      expect(container).toHaveClass('rds-comp-toast__container--top-center');
    });

    it('should apply top-right position class', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          position={ToastPosition.TopRight}
        />
      );
      const container = screen.getByRole('alert').parentElement;
      expect(container).toHaveClass('rds-comp-toast__container--top-right');
    });

    it('should apply middle-left position class', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          position={ToastPosition.MiddleLeft}
        />
      );
      const container = screen.getByRole('alert').parentElement;
      expect(container).toHaveClass('rds-comp-toast__container--middle-left');
    });

    it('should apply middle-center position class', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          position={ToastPosition.MiddleCenter}
        />
      );
      const container = screen.getByRole('alert').parentElement;
      expect(container).toHaveClass('rds-comp-toast__container--middle-center');
    });

    it('should apply middle-right position class', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          position={ToastPosition.MiddleRight}
        />
      );
      const container = screen.getByRole('alert').parentElement;
      expect(container).toHaveClass('rds-comp-toast__container--middle-right');
    });

    it('should apply bottom-left position class', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          position={ToastPosition.BottomLeft}
        />
      );
      const container = screen.getByRole('alert').parentElement;
      expect(container).toHaveClass('rds-comp-toast__container--bottom-left');
    });

    it('should apply bottom-center position class', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          position={ToastPosition.BottomCenter}
        />
      );
      const container = screen.getByRole('alert').parentElement;
      expect(container).toHaveClass('rds-comp-toast__container--bottom-center');
    });

    it('should apply bottom-right position class', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          position={ToastPosition.BottomRight}
        />
      );
      const container = screen.getByRole('alert').parentElement;
      expect(container).toHaveClass('rds-comp-toast__container--bottom-right');
    });

    it('should default to top-left when position not provided', () => {
      render(
        <RdsCompToast {...defaultProps} position={undefined} />
      );
      const container = screen.getByRole('alert').parentElement;
      expect(container).toHaveClass('rds-comp-toast__container--top-left');
    });
  });

  describe('Header Display', () => {
    it('should render header when showHeader is true', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          showHeader={true}
          headerText="Header Title"
        />
      );
      expect(screen.getByText('Header Title')).toBeInTheDocument();
    });

    it('should render header content wrapper', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          showHeader={true}
          headerText="Test"
        />
      );
      const header = screen.getByText('Test');
      expect(header).toHaveClass('rds-comp-toast__title');
    });

    it('should not render header when showHeader is false', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          showHeader={false}
          headerText="Header Title"
        />
      );
      expect(screen.queryByText('Header Title')).not.toBeInTheDocument();
    });

    it('should render content wrapper when showHeader is false', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          showHeader={false}
          subText="Content"
        />
      );
      const content = document.querySelector('.rds-comp-toast__content');
      expect(content).toBeInTheDocument();
    });
  });

  describe('Subtext Display', () => {
    it('should render subtext when showSubText is true', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          showSubText={true}
          subText="Subtext content"
        />
      );
      expect(screen.getByText('Subtext content')).toBeInTheDocument();
    });

    it('should not render subtext when showSubText is false', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          showSubText={false}
          subText="Subtext content"
        />
      );
      expect(screen.queryByText('Subtext content')).not.toBeInTheDocument();
    });

    it('should render subtext by default', () => {
      render(
        <RdsCompToast {...defaultProps} subText="Default subtext" showSubText={true} />
      );
      expect(screen.getByText('Default subtext')).toBeInTheDocument();
    });
  });

  describe('Leading Icon Display', () => {
    it('should render leading icon when showLeading is true', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          showLeading={true}
          leadingIcon={ToastLeadingIcon.Circle}
          showHeader={true}
        />
      );
      const icon = document.querySelector('.rds-comp-toast__icon--circle');
      expect(icon).toBeInTheDocument();
    });

    it('should not render leading icon when showLeading is false', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          showLeading={false}
          showHeader={true}
        />
      );
      const icons = document.querySelectorAll('.rds-comp-toast__icon');
      expect(icons.length).toBe(0);
    });

    it('should render circle icon variant', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          showLeading={true}
          leadingIcon={ToastLeadingIcon.Circle}
          showHeader={true}
        />
      );
      const icon = document.querySelector('.rds-comp-toast__icon--circle');
      expect(icon).toBeInTheDocument();
    });

    it('should render plus icon variant', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          showLeading={true}
          leadingIcon={ToastLeadingIcon.Plus}
          showHeader={true}
        />
      );
      const icon = document.querySelector('.rds-comp-toast__icon--plus');
      expect(icon).toBeInTheDocument();
    });

    it('should not render leading icon in chat layout', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          showLeading={true}
          layout={ToastLayout.Chat}
          showHeader={true}
        />
      );
      const icons = document.querySelectorAll('.rds-comp-toast__icon');
      expect(icons.length).toBe(0);
    });
  });

  describe('Dismiss Button', () => {
    it('should render dismiss button when showDismiss is true', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          showDismiss={true}
          showHeader={true}
        />
      );
      const closeBtn = screen.getByLabelText('Close');
      expect(closeBtn).toBeInTheDocument();
    });

    it('should not render dismiss button when showDismiss is false', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          showDismiss={false}
          showHeader={true}
        />
      );
      const closeBtns = screen.queryAllByLabelText('Close');
      expect(closeBtns.length).toBe(0);
    });

    it('should hide toast when dismiss button is clicked', async () => {
      render(
        <RdsCompToast
          {...defaultProps}
          showDismiss={true}
          showHeader={true}
        />
      );

      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('rds-comp-toast--visible');

      const closeBtn = screen.getByLabelText('Close');
      fireEvent.click(closeBtn);

      await waitFor(() => {
        expect(alert).toHaveClass('rds-comp-toast--hidden');
      });
    });

    it('should not render dismiss button in chat layout', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          showDismiss={true}
          layout={ToastLayout.Chat}
          showHeader={true}
        />
      );
      const closeBtns = screen.queryAllByLabelText('Close');
      expect(closeBtns.length).toBe(0);
    });
  });

  describe('Autohide Functionality', () => {
    jest.useFakeTimers();

    afterEach(() => {
      jest.clearAllTimers();
    });

    it('should hide toast after delay when autohide is true', async () => {
      render(
        <RdsCompToast
          {...defaultProps}
          autohide={true}
          delay={2000}
        />
      );

      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('rds-comp-toast--visible');

      jest.advanceTimersByTime(2000);

      await waitFor(() => {
        expect(alert).toHaveClass('rds-comp-toast--hidden');
      });
    });

    it('should use default delay of 3000ms', async () => {
      render(
        <RdsCompToast
          {...defaultProps}
          autohide={true}
        />
      );

      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('rds-comp-toast--visible');

      jest.advanceTimersByTime(3000);

      await waitFor(() => {
        expect(alert).toHaveClass('rds-comp-toast--hidden');
      });
    });

    it('should not autohide when autohide is false', async () => {
      render(
        <RdsCompToast
          {...defaultProps}
          autohide={false}
          delay={1000}
        />
      );

      const alert = screen.getByRole('alert');
      jest.advanceTimersByTime(1000);

      expect(alert).toHaveClass('rds-comp-toast--visible');
    });
  });

  describe('Chat Layout Features', () => {
    it('should display chat time when in chat layout with header', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          layout={ToastLayout.Chat}
          showHeader={true}
          chatTime="10:30 AM"
        />
      );
      expect(screen.getByText('10:30 AM')).toBeInTheDocument();
    });

    it('should render Reply and Mark As Read buttons in chat layout with header', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          layout={ToastLayout.Chat}
          showHeader={true}
        />
      );
      const buttons = screen.getAllByTestId('rds-button');
      const buttonTexts = buttons.map(btn => btn.textContent);
      expect(buttonTexts).toContain('Reply');
      expect(buttonTexts).toContain('Mark As Read');
    });

    it('should render input field in chat layout without header', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          layout={ToastLayout.Chat}
          showHeader={false}
          placeholder="Message"
        />
      );
      const input = screen.getByPlaceholderText('Message');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Download Layout Features', () => {
    it('should render progress bar in download layout with header', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          layout={ToastLayout.Download}
          showHeader={true}
          progressWidth={60}
        />
      );
      const progress = screen.getByTestId('rds-progress');
      expect(progress).toHaveAttribute('data-value', '60');
    });

    it('should display filename in download layout with header', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          layout={ToastLayout.Download}
          showHeader={true}
          filename="document.xlsx"
        />
      );
      expect(screen.getByText('document.xlsx')).toBeInTheDocument();
    });

    it('should render Cancel and Go To Downloads buttons in download layout', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          layout={ToastLayout.Download}
          showHeader={true}
        />
      );
      const buttons = screen.getAllByTestId('rds-button');
      const buttonTexts = buttons.map(btn => btn.textContent);
      expect(buttonTexts).toContain('Cancel');
      expect(buttonTexts).toContain('Go To Downloads');
    });
  });

  describe('Request Layout Features', () => {
    it('should render Reject and Accept buttons in request layout', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          layout={ToastLayout.Request}
          showHeader={true}
        />
      );
      const buttons = screen.getAllByTestId('rds-button');
      const buttonTexts = buttons.map(btn => btn.textContent);
      expect(buttonTexts).toContain('Reject');
      expect(buttonTexts).toContain('Accept');
    });

    it('should render Reject and Accept buttons without header', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          layout={ToastLayout.Request}
          showHeader={false}
        />
      );
      const buttons = screen.getAllByTestId('rds-button');
      const buttonTexts = buttons.map(btn => btn.textContent);
      expect(buttonTexts).toContain('Reject');
      expect(buttonTexts).toContain('Accept');
    });
  });

  describe('Combined Props Tests', () => {
    it('should render complete toast with all features', () => {
      render(
        <RdsCompToast
          headerText="Download Complete"
          subText="Your file has been downloaded"
          layout={ToastLayout.Download}
          state={ToastState.Success}
          showHeader={true}
          showSubText={true}
          showLeading={true}
          leadingIcon={ToastLeadingIcon.Circle}
          showDismiss={true}
          position={ToastPosition.TopRight}
          filename="report.pdf"
          progressWidth={100}
          autohide={false}
        />
      );

      expect(screen.getByText('Download Complete')).toBeInTheDocument();
      expect(screen.getByText('Your file has been downloaded')).toBeInTheDocument();
      expect(screen.getByText('report.pdf')).toBeInTheDocument();
      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('rds-comp-toast--success');
      expect(alert).toHaveClass('rds-comp-toast--download');
    });

    it('should render error toast with info content', () => {
      render(
        <RdsCompToast
          headerText="Error Occurred"
          subText="Unable to process request"
          layout={ToastLayout.Text}
          state={ToastState.Error}
          showHeader={true}
          showSubText={true}
          position={ToastPosition.BottomLeft}
          showDismiss={true}
          showLeading={true}
          leadingIcon={ToastLeadingIcon.Circle}
        />
      );

      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('rds-comp-toast--error');
      expect(alert).toHaveClass('rds-comp-toast--border-danger');
    });

    it('should render info toast with chat layout', () => {
      render(
        <RdsCompToast
          headerText="New Message"
          subText="You have a new message"
          layout={ToastLayout.Chat}
          state={ToastState.Info}
          showHeader={true}
          showLeading={false}
          leadingIcon={ToastLeadingIcon.Circle}
          chatTime="2:45 PM"
          position={ToastPosition.TopCenter}
        />
      );

      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('rds-comp-toast--info');
      expect(screen.getByText('2:45 PM')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty header text', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          showHeader={true}
          headerText=""
        />
      );
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
    });

    it('should handle empty subtext', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          subText=""
        />
      );
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
    });

    it('should handle very long text content', () => {
      const longText = 'A'.repeat(500);
      render(
        <RdsCompToast
          {...defaultProps}
          subText={longText}
          showHeader={true}
          headerText={longText}
        />
      );
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('should handle 0 progress width', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          layout={ToastLayout.Download}
          showHeader={true}
          progressWidth={0}
        />
      );
      const progress = screen.getByTestId('rds-progress');
      expect(progress).toHaveAttribute('data-value', '0');
    });

    it('should handle 100 progress width', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          layout={ToastLayout.Download}
          showHeader={true}
          progressWidth={100}
        />
      );
      const progress = screen.getByTestId('rds-progress');
      expect(progress).toHaveAttribute('data-value', '100');
    });

    it('should handle undefined optional props', () => {
      render(
        <RdsCompToast
          subText="Test"
          layout={ToastLayout.Text}
          state={ToastState.Basic}
          showLeading={false}
          leadingIcon={ToastLeadingIcon.Circle}
        />
      );
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('Multiple Toast Rendering', () => {
    it('should render multiple toasts independently', () => {
      const { container } = render(
        <div>
          <RdsCompToast
            {...defaultProps}
            subText="First toast"
            state={ToastState.Success}
            showSubText={true}
          />
          <RdsCompToast
            {...defaultProps}
            subText="Second toast"
            state={ToastState.Error}
            showSubText={true}
          />
        </div>
      );

      const alerts = container.querySelectorAll('[role="alert"]');
      expect(alerts.length).toBe(2);
      expect(screen.getByText('First toast')).toBeInTheDocument();
      expect(screen.getByText('Second toast')).toBeInTheDocument();
    });
  });

  describe('Dismiss Close Icon', () => {
    it('should render close icon with aria-hidden', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          showDismiss={true}
          showHeader={true}
        />
      );
      const closeIcon = document.querySelector('.rds-comp-toast__close-icon');
      expect(closeIcon).toHaveAttribute('aria-hidden', 'true');
    });

    it('should display close symbol correctly', () => {
      render(
        <RdsCompToast
          {...defaultProps}
          showDismiss={true}
          showHeader={true}
        />
      );
      const closeIcon = document.querySelector('.rds-comp-toast__close-icon');
      expect(closeIcon?.textContent).toBe('×');
    });
  });

  describe('Container Classes', () => {
    it('should have base container class', () => {
      render(<RdsCompToast {...defaultProps} />);
      const container = screen.getByRole('alert').parentElement;
      expect(container).toHaveClass('rds-comp-toast__container');
    });

    it('should have base toast class', () => {
      render(<RdsCompToast {...defaultProps} />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('rds-comp-toast');
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompToast {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
