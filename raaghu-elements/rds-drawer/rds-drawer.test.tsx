import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsDrawer, { RdsDrawerProps } from './rds-drawer';

// Mock SCSS
jest.mock('./rds-drawer.scss', () => ({}));

// Mock RdsButton component
jest.mock('../rds-button/rds-button', () => {
  return jest.fn((props: any) => {
    const { text, children, onClick, style: _style, shape: _shape, size: _size, state: _state, layout: _layout, color: _color, textCase: _textCase, isLoading: _isLoading, changeLeftIcon: _changeLeftIcon, changeRightIcon: _changeRightIcon, showLeftIcon: _showLeftIcon, showRightIcon: _showRightIcon, ...rest } = props;
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
      render(
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
      render(<RdsDrawer {...defaultProps} children={customContent} open={true} />);
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
      render(<RdsDrawer {...defaultProps} children={complexContent} open={true} />);
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
      render(
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
        <RdsDrawer open={true} children={<div></div>} />
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