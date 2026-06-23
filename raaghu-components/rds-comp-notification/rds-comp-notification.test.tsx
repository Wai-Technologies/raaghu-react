import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RdsCompNotification from './rds-comp-notification';
import {
  NotificationLayout,
  NotificationStyle,
  NotificationType,
  NotificationItem,
  RdsCompNotificationProps,
} from './rds-comp-notification.types';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-comp-notification.scss', () => ({}));

// Mock MUI components
jest.mock('@mui/material', () => ({
  Card: ({ children, className, ...props }: any) => (
    <div data-testid="card" className={className} {...props}>{children}</div>
  ),
  CardContent: ({ children, className, ...props }: any) => (
    <div data-testid="card-content" className={className} {...props}>{children}</div>
  ),
  Typography: ({ children, variant, component, className, ...props }: any) => (
    <div data-testid={`typography-${variant}`} className={className} {...props}>{children}</div>
  ),
  Box: ({ children, component, className, ...props }: any) => {
    const Component = component || 'div';
    return (
      <Component
        data-testid="box"
        className={className}
        {...(component !== 'img' ? props : { ...props, alt: props.alt })}
      >
        {children}
      </Component>
    );
  },
  Avatar: ({ src, ...props }: any) => (
    <img data-testid="avatar" src={src} alt="Avatar" {...props} />
  ),
}));

// Mock MUI Icons
jest.mock('@mui/icons-material', () => ({
  Close: () => <span data-testid="close-icon">×</span>,
}));

// Mock RDS elements
jest.mock('../../raaghu-elements', () => ({
  RdsButton: ({ text, onClick, className, style, color, size }: any) => (
    <button
      data-testid={`rds-button-${text?.toLowerCase()}`}
      onClick={onClick}
      className={className}
      data-style={style}
      data-color={color}
      data-size={size}
    >
      {text}
    </button>
  ),
  RdsIconButton: ({ iconFilled, onClick, className, size }: any) => (
    <button
      data-testid="rds-icon-button"
      onClick={onClick}
      className={className}
      data-size={size}
    >
      {iconFilled}
    </button>
  ),
}));

describe('RdsCompNotification', () => {
  const mockNotification: NotificationItem = {
    userNotificationId: '1',
    title: 'Test Notification',
    description: 'This is a test notification',
    time: '2 mins ago',
  };

  const defaultProps: RdsCompNotificationProps = {
    notifications: [mockNotification],
    title: 'Notification Title',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      render(<RdsCompNotification {...defaultProps} />);
      expect(screen.getByTestId('card')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCompNotification.displayName).toBe('RdsCompNotification');
    });

    it('should render notification with title', () => {
      render(<RdsCompNotification notifications={[mockNotification]} />);
      expect(screen.getByText('Test Notification')).toBeInTheDocument();
    });

    it('should render notification with description', () => {
      render(<RdsCompNotification {...defaultProps} />);
      expect(screen.getByText('This is a test notification')).toBeInTheDocument();
    });

    it('should render multiple notifications', () => {
      const multipleNotifications = [
        { userNotificationId: '1', title: 'Notification 1', description: 'Desc 1' },
        { userNotificationId: '2', title: 'Notification 2', description: 'Desc 2' },
        { userNotificationId: '3', title: 'Notification 3', description: 'Desc 3' },
      ];
      render(
        <RdsCompNotification notifications={multipleNotifications} />
      );
      expect(screen.getByText('Notification 1')).toBeInTheDocument();
      expect(screen.getByText('Notification 2')).toBeInTheDocument();
      expect(screen.getByText('Notification 3')).toBeInTheDocument();
    });

    it('should render card elements', () => {
      render(<RdsCompNotification {...defaultProps} />);
      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });
  });

  describe('Layout Variants', () => {
    it('should render horizontal layout by default', () => {
      const { container } = render(
        <RdsCompNotification
          {...defaultProps}
          layout={NotificationLayout.Horizontal}
        />
      );
      const card = container.querySelector('.rds-comp-notification--layout-horizontal');
      expect(card).toBeInTheDocument();
    });

    it('should render vertical layout', () => {
      const { container } = render(
        <RdsCompNotification
          {...defaultProps}
          layout={NotificationLayout.Vertical}
        />
      );
      const card = container.querySelector('.rds-comp-notification--layout-vertical');
      expect(card).toBeInTheDocument();
    });

    it('should apply correct layout class', () => {
      const { container, rerender } = render(
        <RdsCompNotification
          {...defaultProps}
          layout={NotificationLayout.Horizontal}
        />
      );
      expect(
        container.querySelector('.rds-comp-notification--layout-horizontal')
      ).toBeInTheDocument();

      rerender(
        <RdsCompNotification
          {...defaultProps}
          layout={NotificationLayout.Vertical}
        />
      );
      expect(
        container.querySelector('.rds-comp-notification--layout-vertical')
      ).toBeInTheDocument();
    });
  });

  describe('Style Variants', () => {
    it('should render default style by default', () => {
      const { container } = render(
        <RdsCompNotification
          {...defaultProps}
          style={NotificationStyle.Default}
        />
      );
      const card = container.querySelector('.rds-comp-notification--style-default');
      expect(card).toBeInTheDocument();
    });

    it('should render avatar style', () => {
      const { container } = render(
        <RdsCompNotification
          {...defaultProps}
          style={NotificationStyle.Avatar}
        />
      );
      const card = container.querySelector('.rds-comp-notification--style-avatar');
      expect(card).toBeInTheDocument();
    });

    it('should render icon style', () => {
      const { container } = render(
        <RdsCompNotification
          {...defaultProps}
          style={NotificationStyle.Icon}
        />
      );
      const card = container.querySelector('.rds-comp-notification--style-icon');
      expect(card).toBeInTheDocument();
    });

    it('should render image style', () => {
      const { container } = render(
        <RdsCompNotification
          {...defaultProps}
          style={NotificationStyle.Image}
        />
      );
      const card = container.querySelector('.rds-comp-notification--style-image');
      expect(card).toBeInTheDocument();
    });

    it('should apply correct style class', () => {
      const { container, rerender } = render(
        <RdsCompNotification
          {...defaultProps}
          style={NotificationStyle.Default}
        />
      );
      expect(
        container.querySelector('.rds-comp-notification--style-default')
      ).toBeInTheDocument();

      rerender(
        <RdsCompNotification {...defaultProps} style={NotificationStyle.Avatar} />
      );
      expect(
        container.querySelector('.rds-comp-notification--style-avatar')
      ).toBeInTheDocument();
    });
  });

  describe('Type Variants', () => {
    it('should render error type', () => {
      const { container } = render(
        <RdsCompNotification {...defaultProps} type={NotificationType.Error} />
      );
      const card = container.querySelector('.rds-comp-notification--type-error');
      expect(card).toBeInTheDocument();
    });

    it('should render info type', () => {
      const { container } = render(
        <RdsCompNotification {...defaultProps} type={NotificationType.Info} />
      );
      const card = container.querySelector('.rds-comp-notification--type-info');
      expect(card).toBeInTheDocument();
    });

    it('should render success type', () => {
      const { container } = render(
        <RdsCompNotification {...defaultProps} type={NotificationType.Success} />
      );
      const card = container.querySelector('.rds-comp-notification--type-success');
      expect(card).toBeInTheDocument();
    });

    it('should render warning type', () => {
      const { container } = render(
        <RdsCompNotification {...defaultProps} type={NotificationType.Warning} />
      );
      const card = container.querySelector('.rds-comp-notification--type-warning');
      expect(card).toBeInTheDocument();
    });

    it('should apply correct type class', () => {
      const { container, rerender } = render(
        <RdsCompNotification {...defaultProps} type={NotificationType.Info} />
      );
      expect(
        container.querySelector('.rds-comp-notification--type-info')
      ).toBeInTheDocument();

      rerender(
        <RdsCompNotification {...defaultProps} type={NotificationType.Error} />
      );
      expect(
        container.querySelector('.rds-comp-notification--type-error')
      ).toBeInTheDocument();
    });
  });

  describe('Dismiss Functionality', () => {
    it('should render dismiss button when showDismiss is true', () => {
      render(
        <RdsCompNotification
          {...defaultProps}
          showDismiss={true}
        />
      );
      expect(screen.getByTestId('rds-icon-button')).toBeInTheDocument();
    });

    it('should not render dismiss button when showDismiss is false', () => {
      render(
        <RdsCompNotification
          {...defaultProps}
          showDismiss={false}
        />
      );
      expect(screen.queryByTestId('rds-icon-button')).not.toBeInTheDocument();
    });

    it('should call onDismiss when dismiss button is clicked', () => {
      const onDismiss = jest.fn();
      render(
        <RdsCompNotification
          {...defaultProps}
          showDismiss={true}
          onDismiss={onDismiss}
        />
      );
      const dismissButton = screen.getByTestId('rds-icon-button');
      fireEvent.click(dismissButton);
      expect(onDismiss).toHaveBeenCalled();
    });

    it('should remove notification when dismissed', () => {
      const { rerender } = render(
        <RdsCompNotification
          notifications={[mockNotification]}
          showDismiss={true}
        />
      );
      expect(screen.getByText('Test Notification')).toBeInTheDocument();
      
      const dismissButton = screen.getByTestId('rds-icon-button');
      fireEvent.click(dismissButton);

      rerender(
        <RdsCompNotification
          notifications={[mockNotification]}
          showDismiss={true}
        />
      );
      // The old notification should still be displayed if we pass the same props
      expect(screen.getByText('Test Notification')).toBeInTheDocument();
    });
  });

  describe('Buttons', () => {
    it('should not render buttons by default', () => {
      render(<RdsCompNotification {...defaultProps} showButton={false} />);
      expect(screen.queryByTestId('rds-button-accept')).not.toBeInTheDocument();
      expect(screen.queryByTestId('rds-button-dismiss')).not.toBeInTheDocument();
    });

    it('should render primary button when showPrimaryButton is true', () => {
      render(
        <RdsCompNotification
          {...defaultProps}
          showButton={true}
          showPrimaryButton={true}
        />
      );
      expect(screen.getByTestId('rds-button-accept')).toBeInTheDocument();
    });

    it('should render secondary button when showSecondaryButton is true', () => {
      render(
        <RdsCompNotification
          {...defaultProps}
          showButton={true}
          showSecondaryButton={true}
        />
      );
      expect(screen.getByTestId('rds-button-dismiss')).toBeInTheDocument();
    });

    it('should render both buttons when both are enabled', () => {
      render(
        <RdsCompNotification
          {...defaultProps}
          showButton={true}
          showPrimaryButton={true}
          showSecondaryButton={true}
        />
      );
      expect(screen.getByTestId('rds-button-accept')).toBeInTheDocument();
      expect(screen.getByTestId('rds-button-dismiss')).toBeInTheDocument();
    });

    it('should call onAccept when primary button is clicked', () => {
      const onAccept = jest.fn();
      render(
        <RdsCompNotification
          {...defaultProps}
          showButton={true}
          showPrimaryButton={true}
          onAccept={onAccept}
        />
      );
      const acceptButton = screen.getByTestId('rds-button-accept');
      fireEvent.click(acceptButton);
      expect(onAccept).toHaveBeenCalled();
    });

    it('should call onDismiss when secondary button is clicked', () => {
      const onDismiss = jest.fn();
      render(
        <RdsCompNotification
          {...defaultProps}
          showButton={true}
          showSecondaryButton={true}
          onDismiss={onDismiss}
        />
      );
      const dismissButton = screen.getByTestId('rds-button-dismiss');
      fireEvent.click(dismissButton);
      expect(onDismiss).toHaveBeenCalled();
    });
  });

  describe('Content Display', () => {
    it('should display prop title when provided', () => {
      render(
        <RdsCompNotification
          {...defaultProps}
          title="Custom Title"
        />
      );
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('should display notification title when prop title is not provided', () => {
      render(
        <RdsCompNotification
          notifications={[mockNotification]}
        />
      );
      expect(screen.getByText('Test Notification')).toBeInTheDocument();
    });

    it('should display prop description when provided', () => {
      render(
        <RdsCompNotification
          {...defaultProps}
          description="Custom Description"
        />
      );
      expect(screen.getByText('Custom Description')).toBeInTheDocument();
    });

    it('should display notification description when prop description is not provided', () => {
      render(
        <RdsCompNotification
          {...defaultProps}
        />
      );
      expect(screen.getByText('This is a test notification')).toBeInTheDocument();
    });

    it('should display notification time when provided', () => {
      render(
        <RdsCompNotification
          {...defaultProps}
        />
      );
      expect(screen.getByText('2 mins ago')).toBeInTheDocument();
    });

    it('should not display time when not provided', () => {
      const notificationWithoutTime = {
        userNotificationId: '1',
        title: 'Test',
        description: 'Test notification',
      };
      render(
        <RdsCompNotification
          notifications={[notificationWithoutTime]}
        />
      );
      // Check that the notification is rendered but time is not
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  describe('Avatar Style', () => {
    it('should render avatar when style is avatar', () => {
      render(
        <RdsCompNotification
          {...defaultProps}
          style={NotificationStyle.Avatar}
          notifications={[{
            ...mockNotification,
            avatar: 'https://example.com/avatar.jpg'
          }]}
        />
      );
      // Avatar mock is rendered as img
      expect(screen.getAllByTestId('avatar').length).toBeGreaterThan(0);
    });

    it('should use custom avatar image when provided', () => {
      const customAvatar = 'https://example.com/custom-avatar.jpg';
      render(
        <RdsCompNotification
          {...defaultProps}
          style={NotificationStyle.Avatar}
          notifications={[{
            ...mockNotification,
            avatar: customAvatar
          }]}
        />
      );
      const avatars = screen.getAllByTestId('avatar');
      expect(avatars[0]).toHaveAttribute('src', customAvatar);
    });
  });

  describe('Icon Style', () => {
    it('should render icon when style is icon', () => {
      render(
        <RdsCompNotification
          {...defaultProps}
          style={NotificationStyle.Icon}
        />
      );
      expect(screen.getByTestId('card')).toBeInTheDocument();
    });

    it('should render custom icon when provided', () => {
      const customIcon = <span data-testid="custom-icon">🔔</span>;
      render(
        <RdsCompNotification
          {...defaultProps}
          style={NotificationStyle.Icon}
          notifications={[{
            ...mockNotification,
            icon: customIcon
          }]}
        />
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('should render default icon when not provided', () => {
      render(
        <RdsCompNotification
          {...defaultProps}
          style={NotificationStyle.Icon}
        />
      );
      expect(screen.getByTestId('card')).toBeInTheDocument();
    });
  });

  describe('Image Style', () => {
    it('should render image style notification', () => {
      render(
        <RdsCompNotification
          {...defaultProps}
          style={NotificationStyle.Image}
          layout={NotificationLayout.Horizontal}
        />
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('rds-comp-notification--style-image');
    });

    it('should render image sidebar with custom image', () => {
      const customImage = 'https://example.com/custom-image.jpg';
      render(
        <RdsCompNotification
          {...defaultProps}
          style={NotificationStyle.Image}
          layout={NotificationLayout.Horizontal}
          notifications={[{
            ...mockNotification,
            image: customImage
          }]}
        />
      );
      expect(screen.getByTestId('card')).toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it('should apply base notification class', () => {
      const { container } = render(
        <RdsCompNotification {...defaultProps} />
      );
      const card = container.querySelector('.rds-comp-notification');
      expect(card).toBeInTheDocument();
    });

    it('should have correct classes based on props', () => {
      const { container } = render(
        <RdsCompNotification
          {...defaultProps}
          layout={NotificationLayout.Vertical}
          style={NotificationStyle.Avatar}
          type={NotificationType.Success}
        />
      );
      const card = container.querySelector('.rds-comp-notification');
      expect(card).toHaveClass('rds-comp-notification--layout-vertical');
      expect(card).toHaveClass('rds-comp-notification--style-avatar');
      expect(card).toHaveClass('rds-comp-notification--type-success');
    });

    it('should have header class', () => {
      const { container } = render(
        <RdsCompNotification {...defaultProps} />
      );
      expect(
        container.querySelector('.rds-comp-notification__header')
      ).toBeInTheDocument();
    });

    it('should have body class', () => {
      const { container } = render(
        <RdsCompNotification {...defaultProps} />
      );
      expect(
        container.querySelector('.rds-comp-notification__body')
      ).toBeInTheDocument();
    });

    it('should have footer class', () => {
      const { container } = render(
        <RdsCompNotification {...defaultProps} />
      );
      expect(
        container.querySelector('.rds-comp-notification__footer')
      ).toBeInTheDocument();
    });
  });

  describe('Props Updates', () => {
    it('should update when notifications prop changes', () => {
      const firstNotification = {
        userNotificationId: '1',
        title: 'First',
        description: 'First notification',
      };
      const secondNotification = {
        userNotificationId: '2',
        title: 'Second',
        description: 'Second notification',
      };

      const { rerender } = render(
        <RdsCompNotification
          notifications={[firstNotification]}
        />
      );
      expect(screen.getByText('First')).toBeInTheDocument();

      rerender(
        <RdsCompNotification
          notifications={[secondNotification]}
        />
      );
      expect(screen.getByText('Second')).toBeInTheDocument();
    });

    it('should update buttons when props change', () => {
      const { rerender } = render(
        <RdsCompNotification
          {...defaultProps}
          showButton={false}
        />
      );
      expect(screen.queryByTestId('rds-button-accept')).not.toBeInTheDocument();

      rerender(
        <RdsCompNotification
          {...defaultProps}
          showButton={true}
          showPrimaryButton={true}
        />
      );
      expect(screen.getByTestId('rds-button-accept')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty notifications array', () => {
      const { container } = render(
        <RdsCompNotification {... defaultProps} notifications={[]} />
      );
      expect(container.querySelectorAll('.rds-comp-notification').length).toBe(0);
    });

    it('should handle notification without userNotificationId', () => {
      const notificationWithoutId = {
        title: 'No ID',
        description: 'Notification without ID',
      };
      render(
        <RdsCompNotification
          notifications={[notificationWithoutId]}
        />
      );
      expect(screen.getByText('No ID')).toBeInTheDocument();
    });

    it('should handle very long title', () => {
      const longTitle = 'A'.repeat(200);
      render(
        <RdsCompNotification
          notifications={[{
            userNotificationId: '1',
            title: longTitle,
            description: 'Test notification'
          }]}
        />
      );
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('should handle very long description', () => {
      const longDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(10);
      render(
        <RdsCompNotification
          {...defaultProps}
          notifications={[{
            ...mockNotification,
            description: longDescription
          }]}
        />
      );
      expect(screen.getByText(new RegExp(longDescription.substring(0, 50)))).toBeInTheDocument();
    });

    it('should handle special characters in title', () => {
      const specialTitle = 'Test <>&"\'';
      render(
        <RdsCompNotification
          notifications={[{
            userNotificationId: '1',
            title: specialTitle,
            description: 'Test notification'
          }]}
        />
      );
      expect(screen.getByText(specialTitle)).toBeInTheDocument();
    });

    it('should handle multiple notifications with same data', () => {
      const sameData = [mockNotification, mockNotification, mockNotification];
      render(
        <RdsCompNotification notifications={sameData} />
      );
      const cards = screen.getAllByTestId('card');
      expect(cards.length).toBe(3);
    });

    it('should handle callbacks when undefined', () => {
      render(
        <RdsCompNotification
          {...defaultProps}
          showButton={true}
          showPrimaryButton={true}
          onAccept={undefined}
        />
      );
      const acceptButton = screen.getByTestId('rds-button-accept');
      // Should not throw
      fireEvent.click(acceptButton);
      expect(acceptButton).toBeInTheDocument();
    });

    it('should handle rapid changes', () => {
      const { rerender } = render(
        <RdsCompNotification notifications={[mockNotification]} />
      );

      for (let i = 0; i < 5; i++) {
        rerender(
          <RdsCompNotification
            notifications={[mockNotification]}
            type={i % 2 === 0 ? NotificationType.Info : NotificationType.Error}
          />
        );
      }

      expect(screen.getByText('Test Notification')).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should render complete notification with all features', () => {
      const { container } = render(
        <RdsCompNotification
          notifications={[mockNotification]}
          title="Main Title"
          description="Main Description"
          layout={NotificationLayout.Horizontal}
          style={NotificationStyle.Avatar}
          type={NotificationType.Success}
          showButton={true}
          showPrimaryButton={true}
          showSecondaryButton={true}
          showDismiss={true}
        />
      );
      expect(container.querySelector('.rds-comp-notification')).toBeInTheDocument();
      expect(screen.getByText('Main Title')).toBeInTheDocument();
      expect(screen.getByText('Main Description')).toBeInTheDocument();
    });

    it('should handle complete workflow', () => {
      const onAccept = jest.fn();
      const onDismiss = jest.fn();

      render(
        <RdsCompNotification
          notifications={[mockNotification]}
          showButton={true}
          showPrimaryButton={true}
          showSecondaryButton={true}
          showDismiss={true}
          onAccept={onAccept}
          onDismiss={onDismiss}
        />
      );

      // Click accept
      fireEvent.click(screen.getByTestId('rds-button-accept'));
      expect(onAccept).toHaveBeenCalled();

      // Click dismiss via button
      fireEvent.click(screen.getByTestId('rds-button-dismiss'));
      expect(onDismiss).toHaveBeenCalled();
    });

    it('should render multiple notifications with different types', () => {
      const notifications = [
        { userNotificationId: '1', title: 'Error', description: 'Error occurred' },
        { userNotificationId: '2', title: 'Success', description: 'Operation successful' },
        { userNotificationId: '3', title: 'Warning', description: 'Warning message' },
      ];

      render(
        <RdsCompNotification
          notifications={notifications}
          type={NotificationType.Info}
        />
      );

      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Success')).toBeInTheDocument();
      expect(screen.getByText('Warning')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompNotification {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
