import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RdsCompOffcanvas, {
  RdsOffcanvasPlacement,
  RdsOffcanvasBackDrop,
  RdsCompOffcanvasProps,
} from './rds-comp-off-canvas';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-comp-off-canvas.scss', () => ({}));

// Mock MUI components
jest.mock('@mui/material', () => ({
  Drawer: ({ children, anchor, open, onClose, onBackdropClick, className, id, ...props }: any) => (
    open ? (
      <div
        data-testid="drawer"
        data-anchor={anchor}
        data-open={open}
        className={className}
        id={id}
        {...props}
      >
        {children}
      </div>
    ) : null
  ),
  Box: ({ children, className, id, ...props }: any) => (
    <div data-testid="box" className={className} id={id} {...props}>{children}</div>
  ),
  Typography: ({ children, variant, component, className, ...props }: any) => (
    <div data-testid={`typography-${variant}`} className={className} {...props}>{children}</div>
  ),
}));

// Mock MUI Icons
jest.mock('@mui/icons-material', () => ({
  Close: () => <span data-testid="close-icon">×</span>,
}));

// Mock RDS elements
jest.mock('../../raaghu-elements/rds-button/rds-button', () => {
  return function MockRdsButton({ text, onClick, className, style, size, ...props }: any) {
    return (
      <button
        data-testid={`rds-button-${text?.toLowerCase()?.replace(/\s+/g, '-')}`}
        onClick={onClick}
        className={className}
        data-style={style}
        data-size={size}
        {...props}
      >
        {text}
      </button>
    );
  };
});

jest.mock('../../raaghu-elements/rds-icon-button/rds-icon-button', () => {
  return function MockRdsIconButton({
    onClick,
    children,
    className,
    tooltip,
    ...props
  }: any) {
    return (
      <button
        data-testid="rds-icon-button"
        onClick={onClick}
        className={className}
        title={tooltip}
        {...props}
      >
        {children}
      </button>
    );
  };
});

describe('RdsCompOffcanvas', () => {
  const defaultProps: RdsCompOffcanvasProps = {
    placement: RdsOffcanvasPlacement.End,
    backDrop: RdsOffcanvasBackDrop.True,
    offId: 'test-offcanvas',
    canvasTitle: 'Test Offcanvas',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      render(<RdsCompOffcanvas {...defaultProps} />);
      expect(screen.getByTestId('rds-button-open-off-canvas')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCompOffcanvas.displayName).toBe('RdsCompOffcanvas');
    });

    it('should render open button initially', () => {
      render(<RdsCompOffcanvas {...defaultProps} />);
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      expect(openButton).toBeInTheDocument();
      expect(openButton).toHaveTextContent('Open Off Canvas');
    });

    it('should render drawer when open', async () => {
      render(<RdsCompOffcanvas {...defaultProps} />);
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('drawer')).toBeInTheDocument();
      });
    });

    it('should render with correct offcanvas id', async () => {
      render(<RdsCompOffcanvas {...defaultProps} offId="custom-id" />);
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('drawer')).toHaveAttribute('id', 'custom-id');
      });
    });
  });

  describe('Placement Variants', () => {
    it('should render with right placement by default', async () => {
      render(<RdsCompOffcanvas {...defaultProps} placement={RdsOffcanvasPlacement.End} />);
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('drawer')).toHaveAttribute('data-anchor', 'right');
      });
    });

    it('should render with left placement', async () => {
      render(
        <RdsCompOffcanvas {...defaultProps} placement={RdsOffcanvasPlacement.Start} />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('drawer')).toHaveAttribute('data-anchor', 'left');
      });
    });

    it('should render with top placement', async () => {
      render(
        <RdsCompOffcanvas {...defaultProps} placement={RdsOffcanvasPlacement.Top} />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('drawer')).toHaveAttribute('data-anchor', 'top');
      });
    });

    it('should render with bottom placement', async () => {
      render(
        <RdsCompOffcanvas {...defaultProps} placement={RdsOffcanvasPlacement.Bottom} />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('drawer')).toHaveAttribute('data-anchor', 'bottom');
      });
    });

    it('should apply correct placement class', async () => {
      const { container } = render(
        <RdsCompOffcanvas {...defaultProps} placement={RdsOffcanvasPlacement.Start} />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        const drawer = screen.getByTestId('drawer');
        expect(drawer).toHaveClass(`placement-${RdsOffcanvasPlacement.Start}`);
      });
    });
  });

  describe('Backdrop Variants', () => {
    it('should render with backdrop true by default', async () => {
      render(
        <RdsCompOffcanvas
          {...defaultProps}
          backDrop={RdsOffcanvasBackDrop.True}
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('drawer')).toBeInTheDocument();
      });
    });

    it('should hide backdrop when backdrop is false', async () => {
      render(
        <RdsCompOffcanvas
          {...defaultProps}
          backDrop={RdsOffcanvasBackDrop.False}
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        const drawer = screen.getByTestId('drawer');
        expect(drawer).toHaveAttribute('data-open', 'true');
      });
    });

    it('should prevent backdrop click when static', async () => {
      render(
        <RdsCompOffcanvas
          {...defaultProps}
          backDrop={RdsOffcanvasBackDrop.Static}
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('drawer')).toBeInTheDocument();
      });
    });
  });

  describe('Title Display', () => {
    it('should render canvas title when provided', async () => {
      render(
        <RdsCompOffcanvas
          {...defaultProps}
          canvasTitle="Custom Title"
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByText('Custom Title')).toBeInTheDocument();
      });
    });

    it('should not render title when empty', async () => {
      render(
        <RdsCompOffcanvas
          {...defaultProps}
          canvasTitle=""
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        const titleWrap = screen.queryByText(/custom title/i);
        expect(titleWrap).not.toBeInTheDocument();
      });
    });

    it('should not render title when undefined', async () => {
      render(
        <RdsCompOffcanvas
          {...defaultProps}
          canvasTitle={undefined as any}
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        const drawer = screen.getByTestId('drawer');
        expect(drawer).toBeInTheDocument();
      });
    });

    it('should render title with uppercase class', async () => {
      const { container } = render(
        <RdsCompOffcanvas
          {...defaultProps}
          canvasTitle="Test Title"
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        const title = screen.getByText('Test Title');
        expect(title).toHaveClass('text-uppercase');
      });
    });
  });

  describe('Close Functionality', () => {
    it('should render close button', async () => {
      render(<RdsCompOffcanvas {...defaultProps} />);
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('rds-icon-button')).toBeInTheDocument();
      });
    });

    it('should close drawer when close button clicked', async () => {
      render(<RdsCompOffcanvas {...defaultProps} />);
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('drawer')).toBeInTheDocument();
      });

      const closeButton = screen.getByTestId('rds-icon-button');
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByTestId('drawer')).not.toBeInTheDocument();
      });
    });

    it('should call onClose when close button clicked', async () => {
      const onClose = jest.fn();
      render(<RdsCompOffcanvas {...defaultProps} onClose={onClose} />);
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('drawer')).toBeInTheDocument();
      });

      const closeButton = screen.getByTestId('rds-icon-button');
      fireEvent.click(closeButton);

      expect(onClose).toHaveBeenCalled();
    });

    it('should have tooltip on close button', async () => {
      render(<RdsCompOffcanvas {...defaultProps} />);
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        const closeButton = screen.getByTestId('rds-icon-button');
        expect(closeButton).toHaveAttribute('title', 'Close');
      });
    });
  });

  describe('Open Functionality', () => {
    it('should open drawer when button clicked', async () => {
      render(<RdsCompOffcanvas {...defaultProps} />);
      const openButton = screen.getByTestId('rds-button-open-off-canvas');

      expect(screen.queryByTestId('drawer')).not.toBeInTheDocument();

      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('drawer')).toBeInTheDocument();
      });
    });

    it('should call onShow when opened', async () => {
      const onShow = jest.fn();
      render(<RdsCompOffcanvas {...defaultProps} onShow={onShow} />);
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(onShow).toHaveBeenCalled();
      });
    });

    it('should call onclick callback when opened', async () => {
      const onclick = jest.fn();
      render(<RdsCompOffcanvas {...defaultProps} onclick={onclick} />);
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(onclick).toHaveBeenCalledWith(true);
      });
    });
  });

  describe('Buttons', () => {
    it('should not render buttons by default', async () => {
      render(<RdsCompOffcanvas {...defaultProps} />);
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.queryByTestId('rds-button-save')).not.toBeInTheDocument();
        expect(screen.queryByTestId('rds-button-cancel')).not.toBeInTheDocument();
        expect(screen.queryByTestId('rds-button-restore-to-default')).not.toBeInTheDocument();
      });
    });

    it('should render primary button when enabled', async () => {
      render(
        <RdsCompOffcanvas
          {...defaultProps}
          showPrimaryButton={true}
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('rds-button-save')).toBeInTheDocument();
      });
    });

    it('should render secondary button when enabled', async () => {
      render(
        <RdsCompOffcanvas
          {...defaultProps}
          showSecondaryButton={true}
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('rds-button-cancel')).toBeInTheDocument();
      });
    });

    it('should render tertiary button when enabled', async () => {
      render(
        <RdsCompOffcanvas
          {...defaultProps}
          showTertiaryButton={true}
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(
          screen.getByTestId('rds-button-restore-to-default')
        ).toBeInTheDocument();
      });
    });

    it('should render all buttons when enabled', async () => {
      render(
        <RdsCompOffcanvas
          {...defaultProps}
          showPrimaryButton={true}
          showSecondaryButton={true}
          showTertiaryButton={true}
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('rds-button-save')).toBeInTheDocument();
        expect(screen.getByTestId('rds-button-cancel')).toBeInTheDocument();
        expect(
          screen.getByTestId('rds-button-restore-to-default')
        ).toBeInTheDocument();
      });
    });

    it('should close drawer when primary button clicked', async () => {
      render(
        <RdsCompOffcanvas
          {...defaultProps}
          showPrimaryButton={true}
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('drawer')).toBeInTheDocument();
      });

      const saveButton = screen.getByTestId('rds-button-save');
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(screen.queryByTestId('drawer')).not.toBeInTheDocument();
      });
    });

    it('should close drawer when secondary button clicked', async () => {
      render(
        <RdsCompOffcanvas
          {...defaultProps}
          showSecondaryButton={true}
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('drawer')).toBeInTheDocument();
      });

      const cancelButton = screen.getByTestId('rds-button-cancel');
      fireEvent.click(cancelButton);

      await waitFor(() => {
        expect(screen.queryByTestId('drawer')).not.toBeInTheDocument();
      });
    });

    it('should have correct styles for buttons', async () => {
      render(
        <RdsCompOffcanvas
          {...defaultProps}
          showPrimaryButton={true}
          showSecondaryButton={true}
          showTertiaryButton={true}
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('rds-button-save')).toHaveAttribute('data-style', 'filled');
        expect(screen.getByTestId('rds-button-cancel')).toHaveAttribute('data-style', 'outlined');
        expect(screen.getByTestId('rds-button-restore-to-default')).toHaveAttribute('data-style', 'transparent');
      });
    });
  });

  describe('Scrolling', () => {
    it('should render without scrolling by default', async () => {
      const { container } = render(
        <RdsCompOffcanvas {...defaultProps} scrolling={false} />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        const boxes = screen.getAllByTestId('box');
        const containerBox = boxes.find(box => box.className?.includes('offcanvas-container'));
        expect(containerBox).not.toHaveClass('scrolling');
      });
    });

    it('should apply scrolling class when enabled', async () => {
      const { container } = render(
        <RdsCompOffcanvas {...defaultProps} scrolling={true} />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        const boxes = screen.getAllByTestId('box');
        const containerBox = boxes.find(box => box.className?.includes('offcanvas-container'));
        expect(containerBox).toHaveClass('scrolling');
      });
    });
  });

  describe('Escape Key', () => {
    it('should prevent escape key by default', async () => {
      render(<RdsCompOffcanvas {...defaultProps} preventEscapeKey={true} />);
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('drawer')).toBeInTheDocument();
      });
    });

    it('should allow escape key when disabled', async () => {
      render(<RdsCompOffcanvas {...defaultProps} preventEscapeKey={false} />);
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('drawer')).toBeInTheDocument();
      });
    });
  });

  describe('Children', () => {
    it('should render children content', async () => {
      render(
        <RdsCompOffcanvas {...defaultProps}>
          <div data-testid="child-content">Child Content</div>
        </RdsCompOffcanvas>
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('child-content')).toBeInTheDocument();
        expect(screen.getByText('Child Content')).toBeInTheDocument();
      });
    });

    it('should render multiple children', async () => {
      render(
        <RdsCompOffcanvas {...defaultProps}>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
          <div data-testid="child-3">Child 3</div>
        </RdsCompOffcanvas>
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('child-1')).toBeInTheDocument();
        expect(screen.getByTestId('child-2')).toBeInTheDocument();
        expect(screen.getByTestId('child-3')).toBeInTheDocument();
      });
    });

    it('should handle ReactNode children', async () => {
      const customNode = <span key="custom">Custom Node</span>;
      render(
        <RdsCompOffcanvas {...defaultProps}>
          {customNode}
        </RdsCompOffcanvas>
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByText('Custom Node')).toBeInTheDocument();
      });
    });
  });

  describe('CSS Classes', () => {
    it('should apply custom className to body', async () => {
      render(
        <RdsCompOffcanvas
          {...defaultProps}
          className="custom-class"
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        const boxes = screen.getAllByTestId('box');
        const bodyBox = boxes.find(box => box.className?.includes('offcanvas-body'));
        expect(bodyBox).toHaveClass('custom-class');
      });
    });

    it('should have offcanvas-body class', async () => {
      render(<RdsCompOffcanvas {...defaultProps} />);
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        const boxes = screen.getAllByTestId('box');
        const bodyBox = boxes.find(box => box.className?.includes('offcanvas-body'));
        expect(bodyBox).toHaveClass('offcanvas-body');
      });
    });

    it('should have correct header class based on title', async () => {
      render(
        <RdsCompOffcanvas
          {...defaultProps}
          canvasTitle="Title"
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        const boxes = screen.getAllByTestId('box');
        const headerBox = boxes.find(box => box.className?.includes('offcanvas-header'));
        expect(headerBox).toHaveClass('offcanvas-header');
        expect(headerBox).not.toHaveClass('no-title');
      });
    });

    it('should have no-title class when no title', async () => {
      render(
        <RdsCompOffcanvas
          {...defaultProps}
          canvasTitle=""
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        const boxes = screen.getAllByTestId('box');
        const headerBox = boxes.find(box => box.className?.includes('offcanvas-header'));
        expect(headerBox).toHaveClass('no-title');
      });
    });
  });

  describe('Props Spread', () => {
    it('should accept all component props', () => {
      const { container } = render(
        <RdsCompOffcanvas
          {...defaultProps}
          aria-label="Offcanvas"
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      expect(openButton).toBeInTheDocument();
    });
  });

  describe('Width Configuration', () => {
    it('should use default width', () => {
      render(<RdsCompOffcanvas {...defaultProps} offcanvaswidth={650} />);
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      expect(openButton).toBeInTheDocument();
    });

    it('should accept custom width', () => {
      render(<RdsCompOffcanvas {...defaultProps} offcanvaswidth={800} />);
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      expect(openButton).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should render complete offcanvas with all features', async () => {
      render(
        <RdsCompOffcanvas
          {...defaultProps}
          placement={RdsOffcanvasPlacement.End}
          backDrop={RdsOffcanvasBackDrop.True}
          canvasTitle="Complete Offcanvas"
          showPrimaryButton={true}
          showSecondaryButton={true}
          showTertiaryButton={true}
          scrolling={true}
        >
          <div data-testid="test-content">Test Content</div>
        </RdsCompOffcanvas>
      );

      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('drawer')).toBeInTheDocument();
        expect(screen.getByText('Complete Offcanvas')).toBeInTheDocument();
        expect(screen.getByTestId('test-content')).toBeInTheDocument();
        expect(screen.getByTestId('rds-button-save')).toBeInTheDocument();
        expect(screen.getByTestId('rds-button-cancel')).toBeInTheDocument();
        expect(screen.getByTestId('rds-button-restore-to-default')).toBeInTheDocument();
      });
    });

    it('should handle complete workflow', async () => {
      const onShow = jest.fn();
      const onClose = jest.fn();
      const onclick = jest.fn();

      render(
        <RdsCompOffcanvas
          {...defaultProps}
          onShow={onShow}
          onClose={onClose}
          onclick={onclick}
          showPrimaryButton={true}
        />
      );

      // Open
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(onclick).toHaveBeenCalledWith(true);
        expect(onShow).toHaveBeenCalled();
      });

      // Close with button
      const saveButton = screen.getByTestId('rds-button-save');
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });

    it('should handle multiple open/close cycles', async () => {
      const onShow = jest.fn();
      const onClose = jest.fn();

      render(
        <RdsCompOffcanvas
          {...defaultProps}
          onShow={onShow}
          onClose={onClose}
          showSecondaryButton={true}
        />
      );

      for (let i = 0; i < 3; i++) {
        onShow.mockClear();
        onClose.mockClear();

        const openButton = screen.getByTestId('rds-button-open-off-canvas');
        fireEvent.click(openButton);

        await waitFor(() => {
          expect(screen.getByTestId('drawer')).toBeInTheDocument();
        });

        expect(onShow).toHaveBeenCalled();

        const closeButton = screen.getByTestId('rds-icon-button');
        fireEvent.click(closeButton);

        await waitFor(() => {
          expect(screen.queryByTestId('drawer')).not.toBeInTheDocument();
        });

        expect(onClose).toHaveBeenCalled();
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle long title text', async () => {
      const longTitle = 'A'.repeat(100);
      render(
        <RdsCompOffcanvas
          {...defaultProps}
          canvasTitle={longTitle}
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByText(longTitle.toUpperCase())).toBeInTheDocument();
      });
    });

    it('should handle special characters in title', async () => {
      const specialTitle = 'Test & Canvas <> ✓';
      render(
        <RdsCompOffcanvas
          {...defaultProps}
          canvasTitle={specialTitle}
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByText(specialTitle, { exact: false })).toBeInTheDocument();
      });
    });

    it('should handle undefined callbacks gracefully', async () => {
      render(
        <RdsCompOffcanvas
          {...defaultProps}
          onShow={undefined}
          onClose={undefined}
          onclick={undefined}
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('drawer')).toBeInTheDocument();
      });
    });

    it('should handle rapid clicks on open button', async () => {
      render(<RdsCompOffcanvas {...defaultProps} />);
      const openButton = screen.getByTestId('rds-button-open-off-canvas');

      fireEvent.click(openButton);
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('drawer')).toBeInTheDocument();
      });
    });

    it('should handle empty children', async () => {
      render(
        <RdsCompOffcanvas {...defaultProps}>
          {null}
        </RdsCompOffcanvas>
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('drawer')).toBeInTheDocument();
      });
    });

    it('should handle very small width', async () => {
      render(
        <RdsCompOffcanvas
          {...defaultProps}
          offcanvaswidth={100}
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('drawer')).toBeInTheDocument();
      });
    });

    it('should handle very large width', async () => {
      render(
        <RdsCompOffcanvas
          {...defaultProps}
          offcanvaswidth={2000}
        />
      );
      const openButton = screen.getByTestId('rds-button-open-off-canvas');
      fireEvent.click(openButton);

      await waitFor(() => {
        expect(screen.getByTestId('drawer')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const offcanvasProps = { show: true, title: "Test Panel", onClose: jest.fn() } as any;
      const { container } = render(<RdsCompOffcanvas {...offcanvasProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
