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
import { warnDeprecatedProp } from '../../raaghu-elements/shared/utils/deprecation';
jest.mock('./rds-comp-notification.scss', () => ({}));
jest.mock('../../raaghu-elements/shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));
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
jest.mock('@mui/icons-material', () => ({
  Close: () => <span data-testid="close-icon">×</span>,
}));
jest.mock('../../raaghu-elements/rds-button/rds-button', () => ({
  __esModule: true,
  default: ({ text, onClick, className, style, color, size }: any) => (
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
}));
jest.mock('../../raaghu-elements/rds-icon-button/rds-icon-button', () => ({
  __esModule: true,
  default: ({ iconFilled, onClick, className, size }: any) => (
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
  const setup = (p: Partial<RdsCompNotificationProps> = {}) => render(<RdsCompNotification {...defaultProps} {...p} />);
  const has = (container: HTMLElement, sel: string) => expect(container.querySelector(sel)).toBeInTheDocument();
  const buttons = { showButton: true, showPrimaryButton: true, showSecondaryButton: true };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      setup();
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
      setup();
      expect(screen.getByText('This is a test notification')).toBeInTheDocument();
    });

    it('should render multiple notifications', () => {
      const multipleNotifications = [
        { userNotificationId: '1', title: 'Notification 1', description: 'Desc 1' },
        { userNotificationId: '2', title: 'Notification 2', description: 'Desc 2' },
        { userNotificationId: '3', title: 'Notification 3', description: 'Desc 3' },
      ];
      render(<RdsCompNotification notifications={multipleNotifications} />);
      expect(screen.getByText('Notification 1')).toBeInTheDocument();
      expect(screen.getByText('Notification 2')).toBeInTheDocument();
      expect(screen.getByText('Notification 3')).toBeInTheDocument();
    });

    it('should render card elements', () => {
      setup();
      expect(screen.getByTestId('card')).toBeInTheDocument();
      expect(screen.getByTestId('card-content')).toBeInTheDocument();
    });
  });

  describe('Layout Variants', () => {
    it.each([
      [NotificationLayout.Horizontal, 'horizontal'],
      [NotificationLayout.Vertical, 'vertical'],
    ])('should render %s layout', (layout, name) => {
      has(setup({ layout }).container, `.rds-comp-notification--layout-${name}`);
    });

    it('should apply correct layout class', () => {
      const { container, rerender } = setup({ layout: NotificationLayout.Horizontal });
      has(container, '.rds-comp-notification--layout-horizontal');
      rerender(<RdsCompNotification {...defaultProps} layout={NotificationLayout.Vertical} />);
      has(container, '.rds-comp-notification--layout-vertical');
    });
  });

  describe('Style Variants', () => {
    it.each([
      [NotificationStyle.Default, 'default'],
      [NotificationStyle.Avatar, 'avatar'],
      [NotificationStyle.Icon, 'icon'],
      [NotificationStyle.Image, 'image'],
    ])('should render %s style', (variant, name) => {
      has(setup({ variant }).container, `.rds-comp-notification--style-${name}`);
    });

    it('should apply correct style class', () => {
      const { container, rerender } = setup({ variant: NotificationStyle.Default });
      has(container, '.rds-comp-notification--style-default');
      rerender(<RdsCompNotification {...defaultProps} variant={NotificationStyle.Avatar} />);
      has(container, '.rds-comp-notification--style-avatar');
    });

    it('applies CSS style to the notification root card', () => {
      const { container } = setup({ variant: NotificationStyle.Avatar, style: { marginTop: 8 } });
      expect(container.querySelector('.rds-comp-notification')).toHaveStyle({ marginTop: '8px' });
    });
  });

  describe('Type Variants', () => {
    it.each([
      [NotificationType.Error, 'error'],
      [NotificationType.Info, 'info'],
      [NotificationType.Success, 'success'],
      [NotificationType.Warning, 'warning'],
    ])('should render %s type', (type, name) => {
      has(setup({ type }).container, `.rds-comp-notification--type-${name}`);
    });

    it('should apply correct type class', () => {
      const { container, rerender } = setup({ type: NotificationType.Info });
      has(container, '.rds-comp-notification--type-info');
      rerender(<RdsCompNotification {...defaultProps} type={NotificationType.Error} />);
      has(container, '.rds-comp-notification--type-error');
    });
  });

  describe('Dismiss Functionality', () => {
    it('should render dismiss button when showDismiss is true', () => {
      setup({ showDismiss: true });
      expect(screen.getByTestId('rds-icon-button')).toBeInTheDocument();
    });

    it('should not render dismiss button when showDismiss is false', () => {
      setup({ showDismiss: false });
      expect(screen.queryByTestId('rds-icon-button')).not.toBeInTheDocument();
    });

    it('should call onDismiss when dismiss button is clicked', () => {
      const onDismiss = jest.fn();
      setup({ showDismiss: true, onDismiss });
      fireEvent.click(screen.getByTestId('rds-icon-button'));
      expect(onDismiss).toHaveBeenCalled();
    });

    it('should remove notification when dismissed', () => {
      const { rerender } = render(<RdsCompNotification notifications={[mockNotification]} showDismiss={true} />);
      expect(screen.getByText('Test Notification')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('rds-icon-button'));
      rerender(<RdsCompNotification notifications={[mockNotification]} showDismiss={true} />);
      expect(screen.getByText('Test Notification')).toBeInTheDocument();
    });
  });

  describe('Buttons', () => {
    it('should not render buttons by default', () => {
      setup({ showButton: false });
      expect(screen.queryByTestId('rds-button-accept')).not.toBeInTheDocument();
      expect(screen.queryByTestId('rds-button-dismiss')).not.toBeInTheDocument();
    });

    it('should render primary button when showPrimaryButton is true', () => {
      setup({ showButton: true, showPrimaryButton: true });
      expect(screen.getByTestId('rds-button-accept')).toBeInTheDocument();
    });

    it('should render secondary button when showSecondaryButton is true', () => {
      setup({ showButton: true, showSecondaryButton: true });
      expect(screen.getByTestId('rds-button-dismiss')).toBeInTheDocument();
    });

    it('should render both buttons when both are enabled', () => {
      setup(buttons);
      expect(screen.getByTestId('rds-button-accept')).toBeInTheDocument();
      expect(screen.getByTestId('rds-button-dismiss')).toBeInTheDocument();
    });

    it('should call onAccept when primary button is clicked', () => {
      const onAccept = jest.fn();
      setup({ showButton: true, showPrimaryButton: true, onAccept });
      fireEvent.click(screen.getByTestId('rds-button-accept'));
      expect(onAccept).toHaveBeenCalled();
    });

    it('should call onDismiss when secondary button is clicked', () => {
      const onDismiss = jest.fn();
      setup({ showButton: true, showSecondaryButton: true, onDismiss });
      fireEvent.click(screen.getByTestId('rds-button-dismiss'));
      expect(onDismiss).toHaveBeenCalled();
    });
  });

  describe('Content Display', () => {
    it('should display prop title when provided', () => {
      setup({ title: 'Custom Title' });
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('should display notification title when prop title is not provided', () => {
      render(<RdsCompNotification notifications={[mockNotification]} />);
      expect(screen.getByText('Test Notification')).toBeInTheDocument();
    });

    it('should display prop description when provided', () => {
      setup({ description: 'Custom Description' });
      expect(screen.getByText('Custom Description')).toBeInTheDocument();
    });

    it('should display notification description when prop description is not provided', () => {
      setup();
      expect(screen.getByText('This is a test notification')).toBeInTheDocument();
    });

    it('should display notification time when provided', () => {
      setup();
      expect(screen.getByText('2 mins ago')).toBeInTheDocument();
    });

    it('should not display time when not provided', () => {
      render(
        <RdsCompNotification
          notifications={[{ userNotificationId: '1', title: 'Test', description: 'Test notification' }]}
        />
      );
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  describe('Avatar Style', () => {
    it('should render avatar when style is avatar', () => {
      setup({
        variant: NotificationStyle.Avatar,
        notifications: [{ ...mockNotification, avatar: 'https://example.com/avatar.jpg' }],
      });
      expect(screen.getAllByTestId('avatar').length).toBeGreaterThan(0);
    });

    it('should use custom avatar image when provided', () => {
      const customAvatar = 'https://example.com/custom-avatar.jpg';
      setup({ variant: NotificationStyle.Avatar, notifications: [{ ...mockNotification, avatar: customAvatar }] });
      expect(screen.getAllByTestId('avatar')[0]).toHaveAttribute('src', customAvatar);
    });
  });

  describe('Icon Style', () => {
    it('should render icon when style is icon', () => {
      setup({ variant: NotificationStyle.Icon });
      expect(screen.getByTestId('card')).toBeInTheDocument();
    });

    it('should render custom icon when provided', () => {
      setup({
        variant: NotificationStyle.Icon,
        notifications: [{ ...mockNotification, icon: <span data-testid="custom-icon">🔔</span> }],
      });
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Image Style', () => {
    it('should render image style notification', () => {
      setup({ variant: NotificationStyle.Image, layout: NotificationLayout.Horizontal });
      expect(screen.getByTestId('card')).toHaveClass('rds-comp-notification--style-image');
    });

    it('should render image sidebar with custom image', () => {
      setup({
        variant: NotificationStyle.Image,
        layout: NotificationLayout.Horizontal,
        notifications: [{ ...mockNotification, image: 'https://example.com/custom-image.jpg' }],
      });
      expect(screen.getByTestId('card')).toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it('should apply base notification class', () => {
      has(setup().container, '.rds-comp-notification');
    });

    it('should have correct classes based on props', () => {
      const { container } = setup({
        layout: NotificationLayout.Vertical,
        variant: NotificationStyle.Avatar,
        type: NotificationType.Success,
      });
      const card = container.querySelector('.rds-comp-notification');
      expect(card).toHaveClass('rds-comp-notification--layout-vertical');
      expect(card).toHaveClass('rds-comp-notification--style-avatar');
      expect(card).toHaveClass('rds-comp-notification--type-success');
    });

    it.each(['header', 'body', 'footer'])('should have %s class', (part) => {
      has(setup().container, `.rds-comp-notification__${part}`);
    });
  });

  describe('Props Updates', () => {
    it('should update when notifications prop changes', () => {
      const { rerender } = render(
        <RdsCompNotification notifications={[{ userNotificationId: '1', title: 'First', description: 'First notification' }]} />
      );
      expect(screen.getByText('First')).toBeInTheDocument();
      rerender(
        <RdsCompNotification notifications={[{ userNotificationId: '2', title: 'Second', description: 'Second notification' }]} />
      );
      expect(screen.getByText('Second')).toBeInTheDocument();
    });

    it('should update buttons when props change', () => {
      const { rerender } = setup({ showButton: false });
      expect(screen.queryByTestId('rds-button-accept')).not.toBeInTheDocument();
      rerender(<RdsCompNotification {...defaultProps} showButton={true} showPrimaryButton={true} />);
      expect(screen.getByTestId('rds-button-accept')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty notifications array', () => {
      const { container } = setup({ notifications: [] });
      expect(container.querySelectorAll('.rds-comp-notification').length).toBe(0);
    });

    it('should handle notification without userNotificationId', () => {
      render(<RdsCompNotification notifications={[{ title: 'No ID', description: 'Notification without ID' }]} />);
      expect(screen.getByText('No ID')).toBeInTheDocument();
    });

    it('should handle very long title', () => {
      const longTitle = 'A'.repeat(200);
      render(
        <RdsCompNotification notifications={[{ userNotificationId: '1', title: longTitle, description: 'Test notification' }]} />
      );
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('should handle very long description', () => {
      const longDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(10);
      setup({ notifications: [{ ...mockNotification, description: longDescription }] });
      expect(screen.getByText(new RegExp(longDescription.substring(0, 50)))).toBeInTheDocument();
    });

    it('should handle special characters in title', () => {
      const specialTitle = 'Test <>&"\'';
      render(
        <RdsCompNotification notifications={[{ userNotificationId: '1', title: specialTitle, description: 'Test notification' }]} />
      );
      expect(screen.getByText(specialTitle)).toBeInTheDocument();
    });

    it('should handle multiple notifications with same data', () => {
      render(<RdsCompNotification notifications={[mockNotification, mockNotification, mockNotification]} />);
      expect(screen.getAllByTestId('card').length).toBe(3);
    });

    it('should handle callbacks when undefined', () => {
      setup({ showButton: true, showPrimaryButton: true, onAccept: undefined });
      const acceptButton = screen.getByTestId('rds-button-accept');
      fireEvent.click(acceptButton);
      expect(acceptButton).toBeInTheDocument();
    });

    it('should handle rapid changes', () => {
      const { rerender } = render(<RdsCompNotification notifications={[mockNotification]} />);
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
          variant={NotificationStyle.Avatar}
          type={NotificationType.Success}
          {...buttons}
          showDismiss={true}
        />
      );
      has(container, '.rds-comp-notification');
      expect(screen.getByText('Main Title')).toBeInTheDocument();
      expect(screen.getByText('Main Description')).toBeInTheDocument();
    });

    it('should handle complete workflow', () => {
      const onAccept = jest.fn();
      const onDismiss = jest.fn();
      render(
        <RdsCompNotification
          notifications={[mockNotification]}
          {...buttons}
          showDismiss={true}
          onAccept={onAccept}
          onDismiss={onDismiss}
        />
      );
      fireEvent.click(screen.getByTestId('rds-button-accept'));
      expect(onAccept).toHaveBeenCalled();
      fireEvent.click(screen.getByTestId('rds-button-dismiss'));
      expect(onDismiss).toHaveBeenCalled();
    });

    it('should render multiple notifications with different types', () => {
      const notifications = [
        { userNotificationId: '1', title: 'Error', description: 'Error occurred' },
        { userNotificationId: '2', title: 'Success', description: 'Operation successful' },
        { userNotificationId: '3', title: 'Warning', description: 'Warning message' },
      ];
      render(<RdsCompNotification notifications={notifications} type={NotificationType.Info} />);
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Success')).toBeInTheDocument();
      expect(screen.getByText('Warning')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = setup();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('audit fixes', () => {
    const two = [
      { title: 'Same', description: 'a' },
      { title: 'Other', description: 'b' },
    ];

    it('dismisses the clicked item using a stable key (G6-026)', () => {
      render(<RdsCompNotification notifications={two} showDismiss />);
      fireEvent.click(screen.getAllByTestId('rds-icon-button')[1]);
      expect(screen.getByText('Same')).toBeInTheDocument();
      expect(screen.queryByText('Other')).not.toBeInTheDocument();
    });

    it('resets dismissals when the notifications reference changes (G6-027)', () => {
      const { rerender } = render(<RdsCompNotification notifications={two} showDismiss />);
      fireEvent.click(screen.getAllByTestId('rds-icon-button')[0]);
      expect(screen.queryByText('Same')).not.toBeInTheDocument();
      rerender(<RdsCompNotification notifications={[...two]} showDismiss />);
      expect(screen.getByText('Same')).toBeInTheDocument();
    });

    it('accepts string-literal layout/style/severity (G6-030/031)', () => {
      const { container } = render(
        <RdsCompNotification notifications={two} layout="vertical" variant="avatar" severity="warning" type="error" />
      );
      has(container, '.rds-comp-notification--type-warning');
      has(container, '.rds-comp-notification--layout-vertical');
    });

    it('warns when deprecated type is used (G6-031)', () => {
      render(<RdsCompNotification notifications={two} type="error" />);
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompNotification', 'type', '`severity`');
    });

    it('supports custom button labels (G6-037)', () => {
      render(<RdsCompNotification notifications={two} actions="both" dismissLabel="Close" acceptLabel="Yes" />);
      expect(screen.getAllByTestId('rds-button-close').length).toBe(2);
      expect(screen.getAllByTestId('rds-button-yes').length).toBe(2);
    });

    it('sets role=status, item-title image alt, and forwards className (G6-038)', () => {
      const { container } = render(<RdsCompNotification notifications={two} variant="image" className="extra" />);
      const card = screen.getAllByTestId('card')[0];
      expect(card).toHaveAttribute('role', 'status');
      expect(card).toHaveClass('extra');
      expect(container.querySelector('img')).toHaveAttribute('alt', 'Same');
    });
  });
});

describe('audit fixes', () => {
  const list = [{ id: 1, title: 'One' }];

  it('renders items and warns for notifications', () => {
    render(<RdsCompNotification items={list} />);
    expect(screen.getByText('One')).toBeInTheDocument();
    render(<RdsCompNotification notifications={list} />);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompNotification', 'notifications', '`items`');
  });

  it('uses fallbackImage and warns for defaultImage', () => {
    const { container } = render(<RdsCompNotification items={list} variant="image" fallbackImage="/fb.png" defaultImage="/old.png" />);
    expect(container.querySelector('img')).toHaveAttribute('src', '/fb.png');
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompNotification', 'defaultImage', '`fallbackImage`');
  });

  it('orientation and variant win over layout and style', () => {
    const { container } = render(<RdsCompNotification items={list} orientation="vertical" layout="horizontal" variant="icon" style="avatar" />);
    expect(container.querySelector('.rds-comp-notification--layout-vertical')).toBeInTheDocument();
    expect(container.querySelector('.rds-comp-notification--style-icon')).toBeInTheDocument();
  });

  it('warns for dismiss and still shows the dismiss icon', () => {
    render(<RdsCompNotification items={list} dismiss="visible" />);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompNotification', 'dismiss', '`showDismiss`');
    expect(screen.getByTestId('rds-icon-button')).toBeInTheDocument();
  });
});
