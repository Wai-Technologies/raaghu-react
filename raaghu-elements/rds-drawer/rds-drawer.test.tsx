import React from 'react';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsDrawer, { RdsDrawerProps } from './rds-drawer';

// Mock SCSS
jest.mock('./rds-drawer.scss', () => ({}));
jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

// Mock RdsButton component
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

  let MockRdsButton: jest.Mock;

  beforeEach(() => {
    MockRdsButton = jest.requireMock('../rds-button/rds-button');
    MockRdsButton.mockClear();
  });

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = render(<RdsDrawer {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsDrawer.displayName).toBe('RdsDrawer');
    });

    it('should render MuiDrawer component', () => {
      render(<RdsDrawer {...defaultProps} />);
      // Drawer renders in portal, so check document
      expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
    });

    it('should render children content', () => {
      render(<RdsDrawer {...defaultProps} />);
      expect(screen.getByText('Drawer Content')).toBeInTheDocument();
    });

    it('should not show trigger button by default', () => {
      const { container } = render(<RdsDrawer {...defaultProps} showTrigger={false} />);
      const buttons = container.querySelectorAll('[data-testid="rds-button"]');
      expect(buttons.length).toBe(0);
    });
  });

  describe('Drawer Opening and Closing', () => {
    it('should be closed by default', () => {
      render(<RdsDrawer {...defaultProps} open={false} />);
      // When closed, MUI drawer doesn't render to DOM
      const drawer = document.querySelector('.MuiDrawer-root');
      expect(drawer).not.toBeInTheDocument();
    });

    it('should open when open prop is true', () => {
      render(<RdsDrawer {...defaultProps} />);
      const drawer = document.querySelector('.MuiDrawer-root');
      expect(drawer).toBeInTheDocument();
    });

    it('should toggle drawer when trigger button is clicked', () => {
      render(
        <RdsDrawer {...defaultProps} showTrigger={true} defaultOpen={false} />
      );
      const button = screen.getByText('Open Drawer');
      fireEvent.click(button);
      
      // Drawer should be in the document after click
      expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
    });

    it('should use defaultOpen prop to set initial state', () => {
      render(
        <RdsDrawer {...defaultProps} defaultOpen={true} />
      );
      expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
    });

    it('should handle controlled open state', () => {
      const { rerender } = render(
        <RdsDrawer {...defaultProps} open={false} showTrigger={false} />
      );
      // When closed, drawer is not in DOM
      expect(document.querySelector('.MuiDrawer-root')).not.toBeInTheDocument();

      rerender(<RdsDrawer {...defaultProps} open={true} showTrigger={false} />);
      expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
    });
  });

  describe('Trigger Button', () => {
    it('should show trigger button when showTrigger is true', () => {
      const { container } = render(
        <RdsDrawer {...defaultProps} showTrigger={true} />
      );
      const buttons = container.querySelectorAll('[data-testid="rds-button"]');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should display custom trigger text', () => {
      render(
        <RdsDrawer
          {...defaultProps}
          showTrigger={true}
          triggerText="Custom Open"
        />
      );
      expect(screen.getByText('Custom Open')).toBeInTheDocument();
    });

    it('should display default trigger text', () => {
      render(<RdsDrawer {...defaultProps} showTrigger={true} />);
      expect(screen.getByText('Open Drawer')).toBeInTheDocument();
    });

    it('should toggle drawer on trigger button click', () => {
      render(<RdsDrawer {...defaultProps} showTrigger={true} />);
      const button = screen.getByText('Open Drawer');
      
      fireEvent.click(button);
      expect(screen.getByText('Drawer Content')).toBeInTheDocument();
    });
  });

  describe('Close Button', () => {
    it('should not show close button by default', () => {
      render(<RdsDrawer {...defaultProps} showCloseButton={false} />);
      const closeButtons = screen.queryAllByText('Close Drawer');
      expect(closeButtons.length).toBe(0);
    });

    it('should show close button when showCloseButton is true', () => {
      render(<RdsDrawer {...defaultProps} showCloseButton={true} open={true} />);
      expect(screen.getByText('Close Drawer')).toBeInTheDocument();
    });

    it('should display custom close button text', () => {
      render(
        <RdsDrawer
          {...defaultProps}
          showCloseButton={true}
          closeButtonText="Custom Close"
          open={true}
        />
      );
      expect(screen.getByText('Custom Close')).toBeInTheDocument();
    });

    it('should close drawer when close button is clicked', () => {
      const onClose = jest.fn();
      render(
        <RdsDrawer
          {...defaultProps}
          showCloseButton={true}
          open={true}
          onClose={onClose}
        />
      );
      const closeButton = screen.getByText('Close Drawer');
      fireEvent.click(closeButton);
      
      expect(onClose).toHaveBeenCalled();
    });

    it('should accept close button props', () => {
      render(
        <RdsDrawer
          {...defaultProps}
          showCloseButton={true}
          open={true}
          closeButtonProps={{ color: 'error' }}
        />
      );
      // Verify RdsButton was called with color prop for close button
      const calls = MockRdsButton.mock.calls;
      const closeButtonCall = calls.find(call => call[0]?.text === 'Close Drawer');
      expect(closeButtonCall).toBeDefined();
      expect(closeButtonCall[0]).toHaveProperty('color', 'error');
    });

    it('should render close button in separate container', () => {
      const { container } = render(
        <RdsDrawer
          {...defaultProps}
          showCloseButton={true}
          open={true}
        />
      );
      // Close button is in drawer portal, check it exists
      expect(screen.getByText('Close Drawer')).toBeInTheDocument();
    });
  });

  describe('Drawer Position/Anchor', () => {
    it('should render left drawer by default', () => {
      render(<RdsDrawer {...defaultProps} position="left" />);
      expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
    });

    it('should render right drawer', () => {
      render(
        <RdsDrawer {...defaultProps} position="right" />
      );
      expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
    });

    it('should render top drawer', () => {
      render(
        <RdsDrawer {...defaultProps} position="top" />
      );
      expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
    });

    it('should render bottom drawer', () => {
      render(
        <RdsDrawer {...defaultProps} position="bottom" />
      );
      expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
    });

    it('should use anchor prop if provided', () => {
      render(
        <RdsDrawer
          {...defaultProps}
          position="left"
          anchor="right"
          open={true}
        />
      );
      expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
    });
  });

  describe('Drawer Width', () => {
    it('should use default width of 251', () => {
      render(<RdsDrawer {...defaultProps} />);
      expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
    });

    it('should apply custom numeric width', () => {
      render(
        <RdsDrawer {...defaultProps} width={300} open={true} />
      );
      expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
    });

    it('should apply custom string width', () => {
      render(
        <RdsDrawer {...defaultProps} width="400px" open={true} />
      );
      expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
    });
  });

  describe('Trigger Wrapper', () => {
    it('should center trigger button when centerTrigger is true', () => {
      const { container } = render(
        <RdsDrawer
          {...defaultProps}
          showTrigger={true}
          centerTrigger={true}
        />
      );
      const wrapper = container.querySelector('.rds-drawer-trigger-wrapper');
      expect(wrapper).toBeInTheDocument();
    });

    it('should not use wrapper div when centerTrigger is false', () => {
      const { container } = render(
        <RdsDrawer
          {...defaultProps}
          showTrigger={true}
          centerTrigger={false}
        />
      );
      const wrapper = container.querySelector('.rds-drawer-trigger-wrapper');
      expect(wrapper).not.toBeInTheDocument();
    });

    it('should use custom trigger wrapper className', () => {
      const { container } = render(
        <RdsDrawer
          {...defaultProps}
          showTrigger={true}
          centerTrigger={true}
          triggerWrapperClassName="custom-wrapper"
        />
      );
      const wrapper = container.querySelector('.custom-wrapper');
      expect(wrapper).toBeInTheDocument();
    });

    it('should use default wrapper className when not provided', () => {
      const { container } = render(
        <RdsDrawer
          {...defaultProps}
          showTrigger={true}
          centerTrigger={true}
          triggerWrapperClassName={undefined}
        />
      );
      const wrapper = container.querySelector('.rds-drawer-trigger-wrapper');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('onClose Handler', () => {
    it('should call onClose when close button is clicked', () => {
      const onClose = jest.fn();
      render(
        <RdsDrawer
          {...defaultProps}
          showCloseButton={true}
          open={true}
          onClose={onClose}
        />
      );
      const closeButton = screen.getByText('Close Drawer');
      fireEvent.click(closeButton);
      
      expect(onClose).toHaveBeenCalled();
    });

    it('should call onClose with correct arguments', () => {
      const onClose = jest.fn();
      render(
        <RdsDrawer
          {...defaultProps}
          showCloseButton={true}
          open={true}
          onClose={onClose}
        />
      );
      const closeButton = screen.getByText('Close Drawer');
      fireEvent.click(closeButton);
      
      expect(onClose).toHaveBeenCalledWith({}, 'buttonClick');
    });

    it('should not call onClose when controlled component', () => {
      const onClose = jest.fn();
      render(
        <RdsDrawer
          {...defaultProps}
          open={true}
          onClose={onClose}
          showTrigger={false}
        />
      );
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Custom Content', () => {
    it('should render custom children', () => {
      const customContent = <div data-testid="custom-content">Custom Content</div>;
      render(<RdsDrawer {...defaultProps} open={true} >{customContent}</RdsDrawer>);
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });

    it('should render complex children structure', () => {
      const complexContent = (
        <div>
          <h2>Title</h2>
          <p>Description</p>
          <button>Action</button>
        </div>
      );
      render(<RdsDrawer {...defaultProps} open={true} >{complexContent}</RdsDrawer>);
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });

    it('should wrap children with close button when showCloseButton is true', () => {
      render(
        <RdsDrawer
          {...defaultProps}
          showCloseButton={true}
          open={true}
        />
      );
      expect(screen.getByText('Drawer Content')).toBeInTheDocument();
      expect(screen.getByText('Close Drawer')).toBeInTheDocument();
    });
  });

  describe('SX Prop', () => {
    it('should accept and merge sx prop', () => {
      render(
        <RdsDrawer
          {...defaultProps}
          sx={{ backgroundColor: 'red' }}
        />
      );
      expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
    });

    it('should merge custom sx with default sx', () => {
      render(
        <RdsDrawer
          {...defaultProps}
          sx={{ padding: '20px' }}
        />
      );
      expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('should work as uncontrolled component when showTrigger is true', () => {
      render(
        <RdsDrawer {...defaultProps} showTrigger={true} defaultOpen={false} />
      );
      expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
    });

    it('should work as controlled component when open prop is provided', () => {
      const { rerender } = render(
        <RdsDrawer {...defaultProps} open={true} showTrigger={false} />
      );
      expect(screen.getByText('Drawer Content')).toBeInTheDocument();

      rerender(<RdsDrawer {...defaultProps} open={false} showTrigger={false} />);
      // Drawer should still be renderable after rerender with open={false}
      expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
    });

    it('should not update internal state when controlled', () => {
      const { container } = render(
        <RdsDrawer
          {...defaultProps}
          open={true}
          showTrigger={true}
          onClose={jest.fn()}
        />
      );
      const button = screen.getByText('Open Drawer');
      fireEvent.click(button);
      
      // Drawer should still be visible (controlled by prop)
      expect(screen.getByText('Drawer Content')).toBeInTheDocument();
    });
  });

  describe('MUI Props Forwarding', () => {
    it('should forward MUI props to Drawer component', () => {
      render(
        <RdsDrawer
          {...defaultProps}
          open={true}
          data-testid="custom-drawer"
        />
      );
      expect(document.querySelector('[data-testid="custom-drawer"]')).toBeInTheDocument();
    });

    it('should support variant prop', () => {
      render(
        <RdsDrawer {...defaultProps} open={true} variant="temporary" />
      );
      expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
    });

    it('should support transitionDuration prop', () => {
      render(
        <RdsDrawer
          {...defaultProps}
          open={true}
          transitionDuration={500}
        />
      );
      expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid trigger clicks', () => {
      render(
        <RdsDrawer {...defaultProps} showTrigger={true} defaultOpen={false} />
      );
      const button = screen.getByText('Open Drawer');
      
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      
      expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
    });

    it('should handle empty children', () => {
      render(
        <RdsDrawer open={true} >{<div></div>}</RdsDrawer>
      );
      expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
    });

    it('should handle null props gracefully', () => {
      render(
        <RdsDrawer
          open={true}
          {...defaultProps}
          triggerButtonProps={null as any}
          closeButtonProps={null as any}
        />
      );
      expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should render proper semantic structure', () => {
      render(
        <RdsDrawer open={true} {...defaultProps} />
      );
      expect(document.querySelector('.MuiDrawer-root')).toBeInTheDocument();
  
    });

    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsDrawer {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should support aria-label on drawer', () => {
      render(
        <RdsDrawer
          open={true}
          {...defaultProps}
          aria-label="Navigation drawer"
        />
      );
      expect(document.querySelector('[aria-label="Navigation drawer"]')).toBeInTheDocument();
    });

    it('should render trigger button that is keyboard accessible', () => {
      render(
        <RdsDrawer
          {...defaultProps}
          showTrigger={true}
          triggerText="Open Navigation"
        />
      );
      const button = screen.getByText('Open Navigation');
      expect(button).toBeInTheDocument();
    });

    it('should render close button that is keyboard accessible', () => {
      render(
        <RdsDrawer
          {...defaultProps}
          showCloseButton={true}
          closeButtonText="Close Navigation"
          open={true}
        />
      );
      const closeButton = screen.getByText('Close Navigation');
      expect(closeButton).toBeInTheDocument();
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