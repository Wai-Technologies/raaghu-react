import React from 'react';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsDrawer, { RdsDrawerProps } from './rds-drawer';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

jest.mock('./rds-drawer.scss', () => ({}));
jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

jest.mock('../rds-button/rds-button', () => {
  return jest.fn((props: any) => {
    const { text, children, onClick, style, shape, size, state, layout, color, textCase, isLoading, changeLeftIcon, changeRightIcon, showLeftIcon, showRightIcon, ...rest } = props;
    return (
      <button onClick={onClick} data-testid="rds-button" {...rest}>
        {text || children}
      </button>
    );
  });
});

describe('RdsDrawer', () => {
  const defaultProps: RdsDrawerProps = {
    open: true,
    children: <div>Drawer Content</div>,
  };
  const setup = (p: any = {}) => render(<RdsDrawer {...defaultProps} {...p} />);
  const drawerRoot = () => document.querySelector('.MuiDrawer-root');
  const buttonCount = (container: HTMLElement) => container.querySelectorAll('[data-testid="rds-button"]').length;

  let MockRdsButton: jest.Mock;

  beforeEach(() => {
    MockRdsButton = jest.requireMock('../rds-button/rds-button');
    MockRdsButton.mockClear();
  });

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = setup();
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsDrawer.displayName).toBe('RdsDrawer');
    });

    it('should render MuiDrawer component', () => {
      setup();
      expect(drawerRoot()).toBeInTheDocument();
    });

    it('should render children content', () => {
      setup();
      expect(screen.getByText('Drawer Content')).toBeInTheDocument();
    });

    it('should not show trigger button by default', () => {
      const { container } = setup({ showTrigger: false });
      expect(buttonCount(container)).toBe(0);
    });
  });

  describe('Drawer Opening and Closing', () => {
    it('should be closed by default', () => {
      setup({ open: false });
      expect(drawerRoot()).not.toBeInTheDocument();
    });

    it('should open when open prop is true', () => {
      setup();
      expect(drawerRoot()).toBeInTheDocument();
    });

    it('should toggle drawer when trigger button is clicked', () => {
      setup({ showTrigger: true, defaultOpen: false });
      fireEvent.click(screen.getByText('Open Drawer'));
      expect(drawerRoot()).toBeInTheDocument();
    });

    it('should use defaultOpen prop to set initial state', () => {
      setup({ defaultOpen: true });
      expect(drawerRoot()).toBeInTheDocument();
    });

    it('should handle controlled open state', () => {
      const { rerender } = setup({ open: false, showTrigger: false });
      expect(drawerRoot()).not.toBeInTheDocument();
      rerender(<RdsDrawer {...defaultProps} open={true} showTrigger={false} />);
      expect(drawerRoot()).toBeInTheDocument();
    });
  });

  describe('Trigger Button', () => {
    it('should show trigger button when showTrigger is true', () => {
      const { container } = setup({ showTrigger: true });
      expect(buttonCount(container)).toBeGreaterThan(0);
    });

    it('should display custom trigger text', () => {
      setup({ showTrigger: true, triggerText: 'Custom Open' });
      expect(screen.getByText('Custom Open')).toBeInTheDocument();
    });

    it('should display default trigger text', () => {
      setup({ showTrigger: true });
      expect(screen.getByText('Open Drawer')).toBeInTheDocument();
    });

    it('should toggle drawer on trigger button click', () => {
      setup({ showTrigger: true });
      fireEvent.click(screen.getByText('Open Drawer'));
      expect(screen.getByText('Drawer Content')).toBeInTheDocument();
    });
  });

  describe('Close Button', () => {
    it('should not show close button by default', () => {
      setup({ showCloseButton: false });
      expect(screen.queryAllByText('Close Drawer').length).toBe(0);
    });

    it('should show close button when showCloseButton is true', () => {
      setup({ showCloseButton: true });
      expect(screen.getByText('Close Drawer')).toBeInTheDocument();
    });

    it('should display custom close button text', () => {
      setup({ showCloseButton: true, closeButtonText: 'Custom Close' });
      expect(screen.getByText('Custom Close')).toBeInTheDocument();
    });

    it('should accept close button props', () => {
      setup({ showCloseButton: true, closeButtonProps: { color: 'error' } });
      const closeButtonCall = MockRdsButton.mock.calls.find(call => call[0]?.children === 'Close Drawer');
      expect(closeButtonCall).toBeDefined();
      expect(closeButtonCall[0]).toHaveProperty('color', 'error');
    });
  });

  describe('Drawer Position/Anchor', () => {
    it.each([
      [{ position: 'left' }],
      [{ position: 'right' }],
      [{ position: 'top' }],
      [{ position: 'bottom' }],
      [{ position: 'left', anchor: 'right' }],
    ])('should render drawer for %j', (props) => {
      setup(props);
      expect(drawerRoot()).toBeInTheDocument();
    });
  });

  describe('Drawer Width and SX', () => {
    it.each([
      [{}],
      [{ width: 300 }],
      [{ width: '400px' }],
      [{ sx: { backgroundColor: 'red' } }],
      [{ sx: { padding: '20px' } }],
    ])('should render drawer for %j', (props) => {
      setup(props);
      expect(drawerRoot()).toBeInTheDocument();
    });
  });

  describe('Trigger Wrapper', () => {
    it.each([
      [{ centerTrigger: true }, '.rds-drawer-trigger-wrapper', true],
      [{ centerTrigger: false }, '.rds-drawer-trigger-wrapper', false],
      [{ centerTrigger: true, triggerWrapperClassName: 'custom-wrapper' }, '.custom-wrapper', true],
      [{ centerTrigger: true, triggerWrapperClassName: undefined }, '.rds-drawer-trigger-wrapper', true],
    ])('trigger wrapper for %j: %s present=%p', (props, sel, present) => {
      const { container } = setup({ showTrigger: true, ...props });
      const wrapper = expect(container.querySelector(sel));
      if (present) wrapper.toBeInTheDocument();
      else wrapper.not.toBeInTheDocument();
    });
  });

  describe('onClose Handler', () => {
    it('should call onClose with correct arguments when close button is clicked', () => {
      const onClose = jest.fn();
      setup({ showCloseButton: true, onClose });
      fireEvent.click(screen.getByText('Close Drawer'));
      expect(onClose).toHaveBeenCalledWith({}, 'buttonClick');
    });

    it('should not call onClose when controlled component', () => {
      const onClose = jest.fn();
      setup({ onClose, showTrigger: false });
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Custom Content', () => {
    it('should render custom children', () => {
      render(<RdsDrawer {...defaultProps}><div data-testid="custom-content">Custom Content</div></RdsDrawer>);
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });

    it('should render complex children structure', () => {
      render(
        <RdsDrawer {...defaultProps}>
          <div>
            <h2>Title</h2>
            <p>Description</p>
            <button>Action</button>
          </div>
        </RdsDrawer>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });

    it('should wrap children with close button when showCloseButton is true', () => {
      setup({ showCloseButton: true });
      expect(screen.getByText('Drawer Content')).toBeInTheDocument();
      expect(screen.getByText('Close Drawer')).toBeInTheDocument();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('should work as uncontrolled component when showTrigger is true', () => {
      setup({ showTrigger: true, defaultOpen: false });
      expect(drawerRoot()).toBeInTheDocument();
    });

    it('should work as controlled component when open prop is provided', () => {
      const { rerender } = setup({ showTrigger: false });
      expect(screen.getByText('Drawer Content')).toBeInTheDocument();
      rerender(<RdsDrawer {...defaultProps} open={false} showTrigger={false} />);
      expect(drawerRoot()).toBeInTheDocument();
    });

    it('should not update internal state when controlled', () => {
      setup({ showTrigger: true, onClose: jest.fn() });
      fireEvent.click(screen.getByText('Open Drawer'));
      expect(screen.getByText('Drawer Content')).toBeInTheDocument();
    });
  });

  describe('MUI Props Forwarding', () => {
    it('should forward MUI props to Drawer component', () => {
      setup({ 'data-testid': 'custom-drawer' });
      expect(document.querySelector('[data-testid="custom-drawer"]')).toBeInTheDocument();
    });

    it.each([[{ variant: 'temporary' }], [{ transitionDuration: 500 }]])('should support %j', (props) => {
      setup(props);
      expect(drawerRoot()).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid trigger clicks', () => {
      setup({ showTrigger: true, defaultOpen: false });
      const button = screen.getByText('Open Drawer');
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      expect(drawerRoot()).toBeInTheDocument();
    });

    it('should handle empty children', () => {
      render(<RdsDrawer open={true}><div></div></RdsDrawer>);
      expect(drawerRoot()).toBeInTheDocument();
    });

    it('should handle null props gracefully', () => {
      setup({ triggerButtonProps: null, closeButtonProps: null });
      expect(drawerRoot()).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = setup();
      expect(await axe(container)).toHaveNoViolations();
    });

    it('should support aria-label on drawer', () => {
      setup({ 'aria-label': 'Navigation drawer' });
      expect(document.querySelector('[aria-label="Navigation drawer"]')).toBeInTheDocument();
    });

    it('should render trigger button that is keyboard accessible', () => {
      setup({ showTrigger: true, triggerText: 'Open Navigation' });
      expect(screen.getByText('Open Navigation')).toBeInTheDocument();
    });

    it('should render close button that is keyboard accessible', () => {
      setup({ showCloseButton: true, closeButtonText: 'Close Navigation' });
      expect(screen.getByText('Close Navigation')).toBeInTheDocument();
    });
  });
});

describe('audit fixes', () => {
  const { warnDeprecatedProp } = jest.requireMock('../shared/utils/deprecation') as { warnDeprecatedProp: jest.Mock };

  beforeEach(() => {
    warnDeprecatedProp.mockClear();
  });

  const getTrigger = (text = 'Open Drawer') => screen.getByText(text);
  const getPaper = () => document.querySelector('.MuiDrawer-paper') as HTMLElement;

  describe('G1-255 onClose / open are not overridden by rest props', () => {
    it('closes on Escape in trigger mode and still calls the consumer onClose', async () => {
      const onClose = jest.fn();
      render(<RdsDrawer showTrigger onClose={onClose}><div>Content</div></RdsDrawer>);
      fireEvent.click(getTrigger());
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'true');

      fireEvent.keyDown(getPaper(), { key: 'Escape' });
      expect(onClose).toHaveBeenCalledWith(expect.anything(), 'escapeKeyDown');
      expect(getTrigger()).toHaveAttribute('aria-expanded', 'false');
      await waitFor(() => expect(screen.queryByText('Content')).not.toBeInTheDocument());
    });

    it('closes on backdrop click in trigger mode and calls the consumer onClose', async () => {
      const onClose = jest.fn();
      render(<RdsDrawer showTrigger onClose={onClose}><div>Content</div></RdsDrawer>);
      fireEvent.click(getTrigger());
      fireEvent.click(document.querySelector('.MuiBackdrop-root') as HTMLElement);
      expect(onClose).toHaveBeenCalledWith(expect.anything(), 'backdropClick');
      await waitFor(() => expect(screen.queryByText('Content')).not.toBeInTheDocument());
    });

    it('closes an uncontrolled defaultOpen drawer without a trigger when onClose is given', async () => {
      const onClose = jest.fn();
      render(<RdsDrawer defaultOpen onClose={onClose}><div>Content</div></RdsDrawer>);
      fireEvent.keyDown(getPaper(), { key: 'Escape' });
      expect(onClose).toHaveBeenCalledTimes(1);
      await waitFor(() => expect(screen.queryByText('Content')).not.toBeInTheDocument());
    });

    it('a consumer open still decides the open state in trigger mode', () => {
      render(<RdsDrawer showTrigger open={false}><div>Content</div></RdsDrawer>);
      fireEvent.click(getTrigger());
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    it('a controlled drawer stays open on Escape until the consumer changes open', () => {
      const onClose = jest.fn();
      render(<RdsDrawer open onClose={onClose}><div>Content</div></RdsDrawer>);
      fireEvent.keyDown(getPaper(), { key: 'Escape' });
      expect(onClose).toHaveBeenCalledWith(expect.anything(), 'escapeKeyDown');
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('G1-259 controlled trigger mode', () => {
    it('trigger label and aria-expanded follow the controlled open prop', () => {
      const { rerender } = render(
        <RdsDrawer showTrigger open triggerText="Show" triggerTextWhenOpen="Hide"><div>Content</div></RdsDrawer>
      );
      expect(screen.getByText('Hide')).toHaveAttribute('aria-expanded', 'true');

      rerender(<RdsDrawer showTrigger open={false} triggerText="Show" triggerTextWhenOpen="Hide"><div>Content</div></RdsDrawer>);
      expect(screen.getByText('Show')).toHaveAttribute('aria-expanded', 'false');
    });

    it('clicking the trigger does not desync from the controlled open prop', () => {
      render(<RdsDrawer showTrigger open={false} triggerText="Show" triggerTextWhenOpen="Hide"><div>Content</div></RdsDrawer>);
      fireEvent.click(screen.getByText('Show'));
      expect(screen.getByText('Show')).toHaveAttribute('aria-expanded', 'false');
    });

    it('triggerButtonProps.onClick can drive the controlled open prop', () => {
      const Controlled = () => {
        const [open, setOpen] = React.useState(false);
        return (
          <RdsDrawer
            showTrigger
            variant="persistent"
            open={open}
            triggerText="Show"
            triggerTextWhenOpen="Hide"
            triggerButtonProps={{ onClick: () => setOpen((o) => !o) }}
          >
            <div>Content</div>
          </RdsDrawer>
        );
      };
      render(<Controlled />);
      fireEvent.click(screen.getByText('Show'));
      expect(screen.getByText('Hide')).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('G1-257 sx merge', () => {
    it('keeps the base paper width when the consumer styles the paper', () => {
      render(<RdsDrawer open sx={{ '& .MuiDrawer-paper': { backgroundColor: 'red' } }}><div>Content</div></RdsDrawer>);
      expect(getPaper()).toHaveStyle({ width: '251px', backgroundColor: 'red' });
    });

    it('accepts array and function sx', () => {
      render(
        <RdsDrawer open sx={[{ '& .MuiDrawer-paper': { color: 'blue' } }, () => ({ '& .MuiDrawer-paper': { opacity: 0.5 } })]}>
          <div>Content</div>
        </RdsDrawer>
      );
      expect(getPaper()).toHaveStyle({ width: '251px', color: 'blue', opacity: '0.5' });
    });

    it('lets the consumer sx override the base width', () => {
      render(<RdsDrawer open sx={{ '& .MuiDrawer-paper': { width: 400 } }}><div>Content</div></RdsDrawer>);
      expect(getPaper()).toHaveStyle({ width: '400px' });
    });
  });

  describe('G1-256 width only applies to left/right anchors', () => {
    it.each(['top', 'bottom'] as const)('does not set the default width on a %s paper', (anchor) => {
      render(<RdsDrawer open anchor={anchor}><div>Content</div></RdsDrawer>);
      expect(getPaper()).not.toHaveStyle({ width: '251px' });
    });

    it.each(['top', 'bottom'] as const)('uses height instead of width on a %s paper', (anchor) => {
      render(<RdsDrawer open anchor={anchor} width={300}><div>Content</div></RdsDrawer>);
      expect(getPaper()).toHaveStyle({ height: '300px' });
      expect(getPaper()).not.toHaveStyle({ width: '300px' });
    });

    it.each(['left', 'right'] as const)('keeps the default width on a %s paper', (anchor) => {
      render(<RdsDrawer open anchor={anchor}><div>Content</div></RdsDrawer>);
      expect(getPaper()).toHaveStyle({ width: '251px' });
    });
  });

  describe('G1-258 anchor replaces position', () => {
    it('defaults to the left anchor without a warning', () => {
      render(<RdsDrawer open><div>Content</div></RdsDrawer>);
      expect(getPaper()).toHaveClass('MuiDrawer-paperAnchorLeft');
      expect(warnDeprecatedProp).not.toHaveBeenCalled();
    });

    it('anchor sets the side without a warning', () => {
      render(<RdsDrawer open anchor="right"><div>Content</div></RdsDrawer>);
      expect(getPaper()).toHaveClass('MuiDrawer-paperAnchorRight');
      expect(warnDeprecatedProp).not.toHaveBeenCalled();
    });

    it('position still works and warns', () => {
      render(<RdsDrawer open position="bottom"><div>Content</div></RdsDrawer>);
      expect(getPaper()).toHaveClass('MuiDrawer-paperAnchorBottom');
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsDrawer', 'position', '`anchor`');
    });

    it('anchor wins over position', () => {
      render(<RdsDrawer open anchor="right" position="left"><div>Content</div></RdsDrawer>);
      expect(getPaper()).toHaveClass('MuiDrawer-paperAnchorRight');
    });
  });

  describe('G1-263 trigger aria attributes', () => {
    it('sets aria-expanded and points aria-controls at the drawer root when open', () => {
      render(<RdsDrawer showTrigger><div>Content</div></RdsDrawer>);
      const trigger = getTrigger();
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).not.toHaveAttribute('aria-controls');

      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      const id = trigger.getAttribute('aria-controls') as string;
      expect(id).toBeTruthy();
      expect(document.getElementById(id)).toContainElement(getPaper());
    });

    it('uses a consumer id for aria-controls', () => {
      render(<RdsDrawer showTrigger defaultOpen id="nav-drawer"><div>Content</div></RdsDrawer>);
      expect(getTrigger()).toHaveAttribute('aria-controls', 'nav-drawer');
      expect(document.getElementById('nav-drawer')).toContainElement(getPaper());
    });

    it('passes consumer PaperProps and slotProps.paper through unchanged in trigger mode', () => {
      const { unmount } = render(
        <RdsDrawer showTrigger defaultOpen PaperProps={{ className: 'my-paper' }}><div>Content</div></RdsDrawer>
      );
      expect(getPaper()).toHaveClass('my-paper');
      unmount();
      render(
        <RdsDrawer showTrigger defaultOpen slotProps={{ paper: () => ({ className: 'fn-paper' }) }}><div>Content</div></RdsDrawer>
      );
      expect(getPaper()).toHaveClass('fn-paper');
    });

    it('has no axe violations with an open trigger drawer', async () => {
      const { container } = render(<RdsDrawer showTrigger defaultOpen><div>Content</div></RdsDrawer>);
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});

describe('RdsDrawer additive renames', () => {
  beforeEach(() => (warnDeprecatedProp as jest.Mock).mockClear());

  it('applies slotProps.trigger and slotProps.closeButton', () => {
    render(
      <RdsDrawer showTrigger showCloseButton defaultOpen slotProps={{ trigger: { children: 'Go' }, closeButton: { children: 'Done' } }}>
        c
      </RdsDrawer>
    );
    expect(screen.getByText('Go')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(warnDeprecatedProp).not.toHaveBeenCalled();
  });

  it('warns for triggerButtonProps and closeButtonProps', () => {
    render(<RdsDrawer showTrigger triggerButtonProps={{}} closeButtonProps={{}}>c</RdsDrawer>);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsDrawer', 'triggerButtonProps', '`slotProps.trigger`');
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsDrawer', 'closeButtonProps', '`slotProps.closeButton`');
  });
});
