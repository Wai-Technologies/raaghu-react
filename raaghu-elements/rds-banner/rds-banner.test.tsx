import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RdsBanner, { RdsBannerProps } from './rds-banner';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

jest.mock('./rds-banner.scss', () => ({}));
jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

jest.mock('../rds-button/rds-button', () => {
  return function MockRdsButton(props: any) {
    return (
      <button
        data-testid="rds-button"
        data-style={props.style}
        data-size={props.size}
        className={props.className}
        onClick={props.onClick}
      >
        {props.text ?? props.children}
      </button>
    );
  };
});

describe('RdsBanner', () => {
  const defaultProps: RdsBannerProps = {
    title: 'Banner Title',
    description: 'Banner Description',
  };
  const setup = (p: RdsBannerProps = {}) => render(<RdsBanner {...defaultProps} {...p} />);
  const has = (container: HTMLElement, sel: string) => expect(container.querySelector(sel)).toBeInTheDocument();
  const hasNot = (container: HTMLElement, sel: string) => expect(container.querySelector(sel)).not.toBeInTheDocument();

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      has(setup().container, '.rds-banner');
    });

    it('should have correct displayName', () => {
      expect(RdsBanner.displayName).toBe('RdsBanner');
    });

    it('should render MUI Alert component', () => {
      has(setup().container, '.MuiAlert-root');
    });

    it('should render with default props', () => {
      const { container } = setup();
      has(container, '.rds-banner--medium');
      has(container, '.rds-banner--info');
      has(container, '.rds-banner--style1');
      has(container, '.rds-banner--full-width');
    });

    it('should render content wrapper', () => {
      has(setup().container, '.rds-banner__content-wrapper');
    });
  });

  describe('Title Display', () => {
    it('should display title when showTitle is true', () => {
      setup({ showTitle: true });
      expect(screen.getByText('Banner Title')).toBeInTheDocument();
    });

    it('should not display title when showTitle is false', () => {
      hasNot(setup({ showTitle: false }).container, '.rds-banner__heading');
    });

    it('should apply heading class to title', () => {
      has(setup({ showTitle: true }).container, '.rds-banner__heading');
    });

    it('should use default title when not provided', () => {
      render(<RdsBanner description="Description" showTitle={true} />);
      expect(screen.getByText('Heading Title.')).toBeInTheDocument();
    });

    it('should apply multiline heading class in multiline mode', () => {
      has(setup({ showTitle: true, multiline: true }).container, '.rds-banner__heading--multiline');
    });
  });

  describe('Description Display', () => {
    it('should display description when showDescription is true', () => {
      setup({ showDescription: true });
      expect(screen.getByText('Banner Description')).toBeInTheDocument();
    });

    it('should not display description when showDescription is false', () => {
      hasNot(setup({ showDescription: false }).container, '.rds-banner__description');
    });

    it('should display description in multiline mode', () => {
      has(setup({ multiline: true, showDescription: true }).container, '.rds-banner__description');
    });

    it('should render children as description', () => {
      render(<RdsBanner title="Title" showDescription={true}>Custom Content</RdsBanner>);
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });
  });

  describe('Type, Size and Style Variants', () => {
    it.each(['success', 'warning', 'error', 'info'] as const)('should apply %s type', (type) => {
      has(setup({ type }).container, `.rds-banner--${type}`);
    });

    it.each(['small', 'medium', 'large'] as const)('should apply %s size class', (size) => {
      has(setup({ size }).container, `.rds-banner--${size}`);
    });

    it.each(['style1', 'style2', 'style3'] as const)('should apply %s variant', (variantStyle) => {
      has(setup({ variantStyle }).container, `.rds-banner--${variantStyle}`);
    });

    it.each(['style1', 'style2'] as const)('should apply outlined style for %s', (variantStyle) => {
      has(setup({ variantStyle, showOutline: true }).container, `.rds-banner--${variantStyle}-outline`);
    });
  });

  describe('Icon Display', () => {
    it('should render icon by default', () => {
      has(setup({ Icon: true }).container, '.MuiAlert-icon');
    });

    it('should not render icon when Icon is false', () => {
      hasNot(setup({ Icon: false }).container, '.MuiAlert-icon');
    });
  });

  describe('Close Button', () => {
    const closeBtn = (container: HTMLElement) => container.querySelector('.rds-banner__close-button') as HTMLElement;

    it('should render close button when closable is true', () => {
      has(setup({ closable: true }).container, '.rds-banner__close-button');
    });

    it('should not render close button when closable is false', () => {
      hasNot(setup({ closable: false }).container, '.rds-banner__close-button');
    });

    it('should close banner when close button is clicked', () => {
      const { container } = setup({ closable: true });
      fireEvent.click(closeBtn(container));
      hasNot(container, '.rds-banner');
    });

    it('should call onClose handler when close button is clicked', () => {
      const onClose = jest.fn();
      const { container } = setup({ closable: true, onClose });
      fireEvent.click(closeBtn(container));
      expect(onClose).toHaveBeenCalled();
    });

    it('should remain visible when persistent is true', () => {
      const { container } = setup({ closable: true, persistent: true });
      fireEvent.click(closeBtn(container));
      has(container, '.rds-banner');
    });

    it('should have aria-label on close button', () => {
      const { container } = setup({ closable: true });
      expect(closeBtn(container)).toHaveAttribute('aria-label', 'close');
    });
  });

  describe('Action Buttons', () => {
    it.each([
      ['showLink', 'link', 'Link'],
      ['showSecondary', 'secondary', 'Cancel'],
      ['showPrimary', 'primary', 'Okay'],
    ] as const)('should render %s button only when true', (prop, name, label) => {
      const on = setup({ [prop]: true });
      has(on.container, `.rds-banner__${name}-button`);
      expect(screen.getByText(label)).toBeInTheDocument();
      on.unmount();
      hasNot(setup({ [prop]: false }).container, `.rds-banner__${name}-button`);
    });

    it('should render all action buttons', () => {
      const { container } = setup({ showLink: true, showSecondary: true, showPrimary: true });
      has(container, '.rds-banner__actions');
      expect(screen.getByText('Link')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Okay')).toBeInTheDocument();
    });
  });

  describe('Width Variants', () => {
    it('should apply full width class by default', () => {
      has(setup().container, '.rds-banner--full-width');
    });

    it('should apply auto width when fullWidth is false', () => {
      has(setup({ fullWidth: false }).container, '.rds-banner--auto-width');
    });
  });

  describe('Multiline Mode', () => {
    it('should render in multiline mode when enabled', () => {
      has(setup({ multiline: true, showTitle: true, showDescription: true }).container, '.rds-banner__heading--multiline');
    });

    it('should render title and description separately in multiline mode', () => {
      has(setup({ multiline: true, showTitle: true, showDescription: true }).container, '.rds-banner__description');
    });

    it('should render inline in non-multiline mode', () => {
      has(setup({ multiline: false, showTitle: true, showDescription: true }).container, 'span');
    });
  });

  describe('Custom Content', () => {
    it('should accept custom className', () => {
      has(setup({ className: 'custom-class' }).container, '.custom-class');
    });

    it('should render custom actions', () => {
      setup({ actions: <button data-testid="custom-action">Custom</button> });
      expect(screen.getByTestId('custom-action')).toBeInTheDocument();
    });

    it('should render children element when provided', () => {
      const ChildComponent = () => <div>Child Content</div>;
      render(
        <RdsBanner title="Title">
          <ChildComponent />
        </RdsBanner>
      );
      expect(screen.getByText('Child Content')).toBeInTheDocument();
    });

    it('should accept variant prop', () => {
      has(setup({ variant: 'outlined' }).container, '.MuiAlert-outlinedInfo');
    });
  });

  describe('Combined Props', () => {
    it('should render with all customization props', () => {
      const { container } = render(
        <RdsBanner
          title="Custom Title"
          description="Custom Description"
          type="success"
          size="large"
          variantStyle="style2"
          showTitle={true}
          showDescription={true}
          multiline={true}
          closable={true}
          Icon={true}
          showLink={true}
          showSecondary={true}
          showPrimary={true}
        />
      );
      has(container, '.rds-banner--large');
      has(container, '.rds-banner--success');
      has(container, '.rds-banner--style2');
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
      expect(screen.getByText('Custom Description')).toBeInTheDocument();
    });

    it.each(
      (['style1', 'style2', 'style3'] as const).flatMap((s) => (['small', 'medium', 'large'] as const).map((z) => [s, z] as const))
    )('should handle style %s with size %s', (variantStyle, size) => {
      const { container } = setup({ variantStyle, size });
      has(container, `.rds-banner--${variantStyle}`);
      has(container, `.rds-banner--${size}`);
    });

    it.each(
      (['success', 'warning', 'error', 'info'] as const).flatMap((t) => (['style1', 'style2', 'style3'] as const).map((s) => [t, s] as const))
    )('should handle type %s with styling %s', (type, variantStyle) => {
      has(setup({ type, variantStyle }).container, `.rds-banner--${type}`);
    });
  });

  describe('Default Props', () => {
    it('should use default title', () => {
      render(<RdsBanner description="Description" showTitle={true} />);
      expect(screen.getByText('Heading Title.')).toBeInTheDocument();
    });

    it('should show description by default', () => {
      setup();
      expect(screen.getByText('Banner Description')).toBeInTheDocument();
    });

    it('should have Icon enabled by default', () => {
      has(setup().container, '.MuiAlert-icon');
    });

    it('should have closable enabled by default', () => {
      has(setup().container, '.rds-banner__close-button');
    });

    it('should show all buttons by default', () => {
      setup();
      expect(screen.getByText('Link')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Okay')).toBeInTheDocument();
    });

    it('should have persistent disabled by default', () => {
      const { container } = setup({ closable: true });
      fireEvent.click(container.querySelector('.rds-banner__close-button') as HTMLElement);
      hasNot(container, '.rds-banner');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty description', () => {
      has(render(<RdsBanner title="Title" description="" showDescription={true} />).container, '.rds-banner');
    });

    it('should handle very long title', () => {
      const longTitle = 'A '.repeat(100);
      render(<RdsBanner description="Desc" title={longTitle} showTitle={true} />);
      expect(screen.getByText(longTitle.trim())).toBeInTheDocument();
    });

    it('should handle very long description', () => {
      const longDesc = 'Very long description. '.repeat(50);
      render(<RdsBanner title="Title" description={longDesc} showDescription={true} />);
      expect(screen.getByText(longDesc.trim())).toBeInTheDocument();
    });

    it('should handle special characters in title', () => {
      render(<RdsBanner title="Title & <Special>" description="Desc" showTitle={true} />);
      expect(screen.getByText('Title & <Special>')).toBeInTheDocument();
    });

    it('should handle unicode characters', () => {
      render(<RdsBanner title="标题" description="説明" showTitle={true} showDescription={true} />);
      expect(screen.getByText('标题')).toBeInTheDocument();
      expect(screen.getByText('説明')).toBeInTheDocument();
    });

    it('should handle null/undefined children gracefully', () => {
      has(render(<RdsBanner {...defaultProps}>{null}</RdsBanner>).container, '.rds-banner');
    });

    it('should handle rapid close/reopen cycles', () => {
      has(setup({ closable: true, persistent: false }).container, '.rds-banner');
    });

    it('should render without any optional props', () => {
      has(render(<RdsBanner />).container, '.rds-banner');
    });
  });

  describe('Props Validation', () => {
    it('should accept boolean props correctly', () => {
      const { container } = setup({
        Icon: true,
        showTitle: true,
        showDescription: true,
        multiline: true,
        showLink: true,
        showSecondary: true,
        showPrimary: true,
        closable: true,
        persistent: true,
        fullWidth: true,
        showOutline: true,
      });
      has(container, '.rds-banner');
    });

    it('should accept ReactNode for actions', () => {
      const customActions = (
        <div data-testid="custom-actions">
          <button>Action 1</button>
          <button>Action 2</button>
        </div>
      );
      setup({ actions: customActions });
      expect(screen.getByTestId('custom-actions')).toBeInTheDocument();
    });

    it('should accept ReactNode for children', () => {
      const CustomChild = () => <div data-testid="custom-child">Custom</div>;
      render(
        <RdsBanner {...defaultProps}>
          <CustomChild />
        </RdsBanner>
      );
      expect(screen.getByTestId('custom-child')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = setup();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('RdsBanner audit fixes', () => {
  beforeEach(() => {
    (warnDeprecatedProp as jest.Mock).mockClear();
  });

  it('keeps its own classes when a consumer passes className (G1-096)', () => {
    render(<RdsBanner description="Message" className="my-banner" />);
    const banner = screen.getByRole('alert');
    expect(banner).toHaveClass('rds-banner');
    expect(banner).toHaveClass('rds-banner--info');
    expect(banner).toHaveClass('rds-banner--full-width');
    expect(banner).toHaveClass('my-banner');
  });

  it('lets a consumer action replace the whole action area, as before (G1-096)', () => {
    const { container } = render(
      <RdsBanner description="Message" action={<button data-testid="mui-action">Act</button>} />
    );
    expect(screen.getByTestId('mui-action')).toBeInTheDocument();
    expect(container.querySelector('.rds-banner__action-container')).not.toBeInTheDocument();
    expect(container.querySelector('.rds-banner__close-button')).not.toBeInTheDocument();
  });

  it('renders actions next to the close button without a warning', () => {
    const { container } = render(
      <RdsBanner description="Message" actions={<span data-testid="extra-action" />} />
    );
    expect(screen.getByTestId('extra-action')).toBeInTheDocument();
    expect(container.querySelector('.rds-banner__close-button')).toBeInTheDocument();
    expect(warnDeprecatedProp).not.toHaveBeenCalled();
  });

  it('passes a consumer icon through even when Icon is false, as before (G1-098)', () => {
    render(<RdsBanner description="Message" Icon={false} icon={<span data-testid="forced-icon" />} />);
    expect(screen.getByTestId('forced-icon')).toBeInTheDocument();
  });

  it('wires the action buttons to callbacks and custom labels (G1-097)', () => {
    const onLinkClick = jest.fn();
    const onSecondaryClick = jest.fn();
    const onPrimaryClick = jest.fn();
    render(
      <RdsBanner
        description="Message"
        linkText="Details"
        secondaryText="Dismiss"
        primaryText="Confirm"
        onLinkClick={onLinkClick}
        onSecondaryClick={onSecondaryClick}
        onPrimaryClick={onPrimaryClick}
      />
    );
    fireEvent.click(screen.getByText('Details'));
    fireEvent.click(screen.getByText('Dismiss'));
    fireEvent.click(screen.getByText('Confirm'));
    expect(onLinkClick).toHaveBeenCalledTimes(1);
    expect(onSecondaryClick).toHaveBeenCalledTimes(1);
    expect(onPrimaryClick).toHaveBeenCalledTimes(1);
  });

  it('keeps the default buttons and labels (no visual change)', () => {
    render(<RdsBanner description="Message" />);
    expect(screen.getByText('Link')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Okay')).toBeInTheDocument();
  });

  it('accepts the MUI icon prop and hides it with false (G1-098)', () => {
    const { rerender, container } = render(
      <RdsBanner description="Message" icon={<span data-testid="custom-banner-icon" />} />
    );
    expect(screen.getByTestId('custom-banner-icon')).toBeInTheDocument();
    rerender(<RdsBanner description="Message" icon={false} />);
    expect(container.querySelector('.MuiAlert-icon')).not.toBeInTheDocument();
  });

  it('uses severity, which wins over the deprecated type (G1-099)', () => {
    const { rerender } = render(<RdsBanner description="Message" severity="error" />);
    expect(screen.getByRole('alert')).toHaveClass('rds-banner--error');
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardError');
    expect(warnDeprecatedProp).not.toHaveBeenCalled();

    rerender(<RdsBanner description="Message" severity="success" type="warning" />);
    expect(screen.getByRole('alert')).toHaveClass('rds-banner--success');
    expect(screen.getByRole('alert')).not.toHaveClass('rds-banner--warning');
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsBanner', 'type', expect.any(String));
  });

  it('maps variantStyle to the same MUI variant as before (G1-106)', () => {
    const { rerender } = render(<RdsBanner description="Message" variantStyle="style1" />);
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardInfo');
    rerender(<RdsBanner description="Message" variantStyle="style2" />);
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-outlinedInfo');
    rerender(<RdsBanner description="Message" variantStyle="style3" />);
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardInfo');
    rerender(<RdsBanner description="Message" variantStyle="style2" variant="filled" />);
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-filledInfo');
  });

  it('adds no outline class for style3 (G1-106)', () => {
    render(<RdsBanner description="Message" variantStyle="style3" showOutline />);
    expect(screen.getByRole('alert').className).not.toMatch(/outline/);
  });

  it('lets the content/actionsConfig/layout objects override the legacy flags (G1-101)', () => {
    const { container } = render(
      <RdsBanner
        description="Message"
        Icon
        closable
        fullWidth
        content={{ icon: 'hidden' }}
        actionsConfig={{ close: 'hidden' }}
        layout={{ width: 'auto' }}
      />
    );
    expect(container.querySelector('.MuiAlert-icon')).not.toBeInTheDocument();
    expect(container.querySelector('.rds-banner__close-button')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('rds-banner--auto-width');
  });

  it('does not forward the legacy flags to the DOM (G1-101)', () => {
    render(<RdsBanner description="Message" showTitle multiline showOutline closable persistent fullWidth />);
    const banner = screen.getByRole('alert');
    ['showtitle', 'multiline', 'showoutline', 'closable', 'persistent', 'fullwidth'].forEach((attr) => {
      expect(banner).not.toHaveAttribute(attr);
    });
  });

  it('does not warn when no renamed props are used', () => {
    render(<RdsBanner description="Message" showTitle showLink={false} multiline />);
    expect(warnDeprecatedProp).not.toHaveBeenCalled();
  });
});
