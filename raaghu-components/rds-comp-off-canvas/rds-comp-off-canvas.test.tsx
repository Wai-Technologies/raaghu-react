import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RdsCompOffcanvas, {
  RdsOffcanvasPlacement,
  RdsOffcanvasBackDrop,
  RdsCompOffcanvasProps,
} from './rds-comp-off-canvas';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
jest.mock('./rds-comp-off-canvas.scss', () => ({}));
jest.mock('../../raaghu-elements/shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));
jest.mock('@mui/material', () => ({
  Drawer: ({ children, anchor, open, onClose, className, id, slotProps, ...props }: any) => {
    (globalThis as any).__drawerProps = { anchor, open, onClose, slotProps, ...props };
    return (
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
    );
  },
  Box: ({ children, className, id, ...props }: any) => (
    <div data-testid="box" className={className} id={id} {...props}>{children}</div>
  ),
  Typography: ({ children, variant, component, className, ...props }: any) => (
    <div data-testid={`typography-${variant}`} className={className} {...props}>{children}</div>
  ),
}));
jest.mock('@mui/icons-material', () => ({
  Close: () => <span data-testid="close-icon">×</span>,
}));
jest.mock('../../raaghu-elements/rds-button/rds-button', () => {
  return function MockRdsButton({ text, onClick, className, variant, size, ...props }: any) {
    return (
      <button
        data-testid={`rds-button-${text?.toLowerCase()?.replace(/\s+/g, '-')}`}
        onClick={onClick}
        className={className}
        data-style={variant}
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

  const setup = (props: Record<string, any> = {}, children?: React.ReactNode) =>
    render(<RdsCompOffcanvas {...defaultProps} {...props}>{children}</RdsCompOffcanvas>);
  const openButton = () => screen.getByTestId('rds-button-open-off-canvas');
  const openCanvas = async (props: Record<string, any> = {}, children?: React.ReactNode) => {
    const result = setup(props, children);
    fireEvent.click(openButton());
    await waitFor(() => expect(screen.getByTestId('drawer')).toBeInTheDocument());
    return result;
  };
  const getBox = (cls: string) => screen.getAllByTestId('box').find(box => box.className?.includes(cls));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render open button initially', () => {
      setup();
      expect(openButton()).toBeInTheDocument();
      expect(openButton()).toHaveTextContent('Open Off Canvas');
    });

    it('should have correct displayName', () => {
      expect(RdsCompOffcanvas.displayName).toBe('RdsCompOffcanvas');
    });

    it('should render with correct offcanvas id', async () => {
      await openCanvas({ offId: 'custom-id' });
      expect(screen.getByTestId('drawer')).toHaveAttribute('id', 'custom-id');
    });
  });

  describe('Placement Variants', () => {
    it.each([
      [RdsOffcanvasPlacement.End, 'right'],
      [RdsOffcanvasPlacement.Start, 'left'],
      [RdsOffcanvasPlacement.Top, 'top'],
      [RdsOffcanvasPlacement.Bottom, 'bottom'],
    ])('should render with placement %s as anchor %s', async (placement, anchor) => {
      await openCanvas({ placement });
      expect(screen.getByTestId('drawer')).toHaveAttribute('data-anchor', anchor);
    });

    it('should apply correct placement class', async () => {
      await openCanvas({ placement: RdsOffcanvasPlacement.Start });
      expect(screen.getByTestId('drawer')).toHaveClass(`placement-${RdsOffcanvasPlacement.Start}`);
    });
  });

  describe('Backdrop Variants', () => {
    it('should hide backdrop when backdrop is false', async () => {
      await openCanvas({ backDrop: RdsOffcanvasBackDrop.False });
      expect(screen.getByTestId('drawer')).toHaveAttribute('data-open', 'true');
    });
  });

  describe('Title Display', () => {
    it('should render canvas title when provided', async () => {
      await openCanvas({ canvasTitle: 'Custom Title' });
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('should not render title when empty', async () => {
      await openCanvas({ canvasTitle: '' });
      expect(screen.queryByText(/custom title/i)).not.toBeInTheDocument();
    });

    it('should render title with uppercase class', async () => {
      await openCanvas({ canvasTitle: 'Test Title' });
      expect(screen.getByText('Test Title')).toHaveClass('offcanvas-title');
    });
  });

  describe('Close Functionality', () => {
    it('should render close button with tooltip', async () => {
      await openCanvas();
      expect(screen.getByTestId('rds-icon-button')).toHaveAttribute('title', 'Close');
    });

    it('should close drawer and call onClose when close button clicked', async () => {
      const onClose = jest.fn();
      await openCanvas({ onClose });
      fireEvent.click(screen.getByTestId('rds-icon-button'));
      expect(onClose).toHaveBeenCalled();
      await waitFor(() => expect(screen.queryByTestId('drawer')).not.toBeInTheDocument());
    });
  });

  describe('Open Functionality', () => {
    it('should open drawer when button clicked', async () => {
      setup();
      expect(screen.queryByTestId('drawer')).not.toBeInTheDocument();
      fireEvent.click(openButton());
      await waitFor(() => expect(screen.getByTestId('drawer')).toBeInTheDocument());
    });

    it('should call onShow and onClick when opened', async () => {
      const onShow = jest.fn();
      const onClick = jest.fn();
      setup({ onShow, onClick });
      fireEvent.click(openButton());
      await waitFor(() => {
        expect(onShow).toHaveBeenCalled();
        expect(onClick).toHaveBeenCalledWith(true);
      });
    });
  });

  describe('Buttons', () => {
    it('should not render buttons by default', async () => {
      await openCanvas();
      expect(screen.queryByTestId('rds-button-save')).not.toBeInTheDocument();
      expect(screen.queryByTestId('rds-button-cancel')).not.toBeInTheDocument();
      expect(screen.queryByTestId('rds-button-restore-to-default')).not.toBeInTheDocument();
    });

    it.each([
      ['showPrimaryButton', 'rds-button-save'],
      ['showSecondaryButton', 'rds-button-cancel'],
      ['showTertiaryButton', 'rds-button-restore-to-default'],
    ])('should render button when %s is enabled', async (prop, testId) => {
      await openCanvas({ [prop]: true });
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    it('should render all buttons with correct styles when enabled', async () => {
      await openCanvas({ showPrimaryButton: true, showSecondaryButton: true, showTertiaryButton: true });
      expect(screen.getByTestId('rds-button-save')).toHaveAttribute('data-style', 'filled');
      expect(screen.getByTestId('rds-button-cancel')).toHaveAttribute('data-style', 'outlined');
      expect(screen.getByTestId('rds-button-restore-to-default')).toHaveAttribute('data-style', 'transparent');
    });

    it.each([
      ['showPrimaryButton', 'rds-button-save'],
      ['showSecondaryButton', 'rds-button-cancel'],
    ])('should close drawer when %s button clicked', async (prop, testId) => {
      await openCanvas({ [prop]: true });
      fireEvent.click(screen.getByTestId(testId));
      await waitFor(() => expect(screen.queryByTestId('drawer')).not.toBeInTheDocument());
    });
  });

  describe('Scrolling', () => {
    it.each([false, true])('should handle scrolling=%s', async scrolling => {
      await openCanvas({ scrolling });
      const containerBox = getBox('offcanvas-container');
      if (scrolling) expect(containerBox).toHaveClass('scrolling');
      else expect(containerBox).not.toHaveClass('scrolling');
    });
  });

  describe('Children', () => {
    it('should render children content', async () => {
      await openCanvas({}, [
        <div key="1" data-testid="child-1">Child 1</div>,
        <div key="2" data-testid="child-2">Child 2</div>,
        <div key="3" data-testid="child-3">Child 3</div>,
        <span key="custom">Custom Node</span>,
      ]);
      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
      expect(screen.getByTestId('child-3')).toBeInTheDocument();
      expect(screen.getByText('Custom Node')).toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it('should apply custom className to the Drawer root', async () => {
      await openCanvas({ className: 'custom-class' });
      const drawer = screen.getByTestId('drawer');
      expect(drawer).toHaveClass('custom-class');
      expect(drawer).toHaveClass('offcanvas-drawer');
      expect(getBox('offcanvas-body')).not.toHaveClass('custom-class');
    });

    it.each([
      ['Title', false],
      ['', true],
    ])('should set no-title class for title "%s" -> %s', async (canvasTitle, noTitle) => {
      await openCanvas({ canvasTitle });
      const headerBox = getBox('offcanvas-header');
      expect(headerBox).toHaveClass('offcanvas-header');
      if (noTitle) expect(headerBox).toHaveClass('no-title');
      else expect(headerBox).not.toHaveClass('no-title');
    });
  });

  describe('Props Spread and Width', () => {
    it.each([
      [{ 'aria-label': 'Offcanvas' }],
      [{ offcanvaswidth: 650 }],
      [{ offcanvaswidth: 800 }],
    ])('should render the open button with %j', props => {
      setup(props);
      expect(openButton()).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should render complete offcanvas with all features', async () => {
      await openCanvas(
        {
          canvasTitle: 'Complete Offcanvas',
          showPrimaryButton: true,
          showSecondaryButton: true,
          showTertiaryButton: true,
          scrolling: true,
        },
        <div data-testid="test-content">Test Content</div>
      );
      expect(screen.getByText('Complete Offcanvas')).toBeInTheDocument();
      expect(screen.getByTestId('test-content')).toBeInTheDocument();
      expect(screen.getByTestId('rds-button-save')).toBeInTheDocument();
      expect(screen.getByTestId('rds-button-cancel')).toBeInTheDocument();
      expect(screen.getByTestId('rds-button-restore-to-default')).toBeInTheDocument();
    });

    it('should handle complete workflow', async () => {
      const onShow = jest.fn();
      const onClose = jest.fn();
      const onClick = jest.fn();
      setup({ onShow, onClose, onClick, showPrimaryButton: true });
      fireEvent.click(openButton());
      await waitFor(() => {
        expect(onClick).toHaveBeenCalledWith(true);
        expect(onShow).toHaveBeenCalled();
      });
      fireEvent.click(screen.getByTestId('rds-button-save'));
      await waitFor(() => expect(onClose).toHaveBeenCalled());
    });

    it('should handle multiple open/close cycles', async () => {
      const onShow = jest.fn();
      const onClose = jest.fn();
      setup({ onShow, onClose, showSecondaryButton: true });
      for (let i = 0; i < 3; i++) {
        onShow.mockClear();
        onClose.mockClear();
        fireEvent.click(openButton());
        await waitFor(() => expect(screen.getByTestId('drawer')).toBeInTheDocument());
        expect(onShow).toHaveBeenCalled();
        fireEvent.click(screen.getByTestId('rds-icon-button'));
        await waitFor(() => expect(screen.queryByTestId('drawer')).not.toBeInTheDocument());
        expect(onClose).toHaveBeenCalled();
      }
    });
  });

  describe('Drawer opens for varied props', () => {
    it.each([
      [{ backDrop: RdsOffcanvasBackDrop.True }],
      [{ backDrop: RdsOffcanvasBackDrop.Static }],
      [{ canvasTitle: undefined }],
      [{ preventEscapeKey: true }],
      [{ preventEscapeKey: false }],
      [{ onShow: undefined, onClose: undefined, onClick: undefined }],
      [{ offcanvaswidth: 100 }],
      [{ offcanvaswidth: 2000 }],
    ])('should open drawer with %j', async props => {
      await openCanvas(props);
    });

    it('should handle empty children', async () => {
      await openCanvas({}, null);
    });

    it('should handle rapid clicks on open button', async () => {
      setup();
      fireEvent.click(openButton());
      fireEvent.click(openButton());
      await waitFor(() => expect(screen.getByTestId('drawer')).toBeInTheDocument());
    });
  });

  describe('Edge Cases', () => {
    it('should handle long title text', async () => {
      const longTitle = 'A'.repeat(100);
      await openCanvas({ canvasTitle: longTitle });
      expect(screen.getByText(longTitle.toUpperCase())).toBeInTheDocument();
    });

    it('should handle special characters in title', async () => {
      const specialTitle = 'Test & Canvas <> ✓';
      await openCanvas({ canvasTitle: specialTitle });
      expect(screen.getByText(specialTitle, { exact: false })).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const offcanvasProps = { show: true, title: "Test Panel", onClose: jest.fn() } as any;
      const { container } = render(<RdsCompOffcanvas {...offcanvasProps} />);
      expect(await axe(container)).toHaveNoViolations();
    });
  });

  describe('audit fixes', () => {
    const lastDrawer = () => (globalThis as any).__drawerProps;
    const paper = () => lastDrawer().slotProps.paper({});

    it('G6-042 controlled open hides trigger and passes event/reason to onClose', () => {
      const onClose = jest.fn();
      render(<RdsCompOffcanvas {...defaultProps} open onClose={onClose} />);
      expect(screen.queryByTestId('rds-button-open-off-canvas')).not.toBeInTheDocument();
      fireEvent.click(screen.getByTestId('rds-icon-button'));
      expect(onClose).toHaveBeenCalledWith(expect.anything(), 'closeButton');
      expect(screen.getByTestId('drawer')).toBeInTheDocument();
    });

    it('G6-044 width applied only when provided', () => {
      const { unmount } = render(<RdsCompOffcanvas {...defaultProps} />);
      expect(paper().sx).toBeUndefined();
      unmount();
      render(<RdsCompOffcanvas {...defaultProps} open width={400} />);
      expect(paper().sx[0]).toEqual({ width: 400 });
    });

    it('G6-045 disableEscapeKeyDown wins over preventEscapeKey', () => {
      render(<RdsCompOffcanvas {...defaultProps} open preventEscapeKey={true} disableEscapeKeyDown={false} />);
      expect(lastDrawer().disableEscapeKeyDown).toBe(false);
    });

    it('G6-046 actions replace footer; onSave and onRestoreDefault are called', () => {
      const onSave = jest.fn();
      const onRestoreDefault = jest.fn();
      const onClose = jest.fn();
      const { unmount } = render(
        <RdsCompOffcanvas {...defaultProps} open showPrimaryButton showTertiaryButton onSave={onSave} onRestoreDefault={onRestoreDefault} onClose={onClose} />
      );
      fireEvent.click(screen.getByTestId('rds-button-save'));
      fireEvent.click(screen.getByTestId('rds-button-restore-to-default'));
      expect(onSave).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
      expect(onRestoreDefault).toHaveBeenCalled();
      unmount();
      render(<RdsCompOffcanvas {...defaultProps} open showPrimaryButton actions={<span>custom</span>} />);
      expect(screen.getByText('custom')).toBeInTheDocument();
      expect(screen.queryByTestId('rds-button-save')).not.toBeInTheDocument();
    });

    it('G6-047 ids are generated', () => {
      const { container } = render(<RdsCompOffcanvas {...defaultProps} open showPrimaryButton />);
      expect(container.querySelector('#close-btn')).toBeNull();
      expect(container.querySelector('#offcanvas-btns')).toBeNull();
    });

    it('G6-048/049 string literals, anchor and hideBackdrop win', () => {
      render(<RdsCompOffcanvas placement="left" backDrop="false" anchor="bottom" hideBackdrop={false} open />);
      expect(lastDrawer().anchor).toBe('bottom');
      expect(lastDrawer().hideBackdrop).toBe(false);
    });

    it('supports onClick and gives it precedence over onOpen', () => {
      const onClick = jest.fn();
      const onOpen = jest.fn();
      render(<RdsCompOffcanvas onClick={onClick} onOpen={onOpen} />);
      fireEvent.click(screen.getByTestId('rds-button-open-off-canvas'));
      expect(onClick).toHaveBeenCalledWith(true);
      expect(onOpen).not.toHaveBeenCalled();
    });

    it('G6-050 new names work and old ones warn', () => {
      const { warnDeprecatedProp } = jest.requireMock('../../raaghu-elements/shared/utils/deprecation');
      const onOpen = jest.fn();
      render(<RdsCompOffcanvas title="New" id="new-id" onOpen={onOpen} canvasTitle="Old" />);
      fireEvent.click(screen.getByTestId('rds-button-open-off-canvas'));
      expect(onOpen).toHaveBeenCalledWith(true);
      expect(screen.getByText('New')).toBeInTheDocument();
      expect(screen.getByTestId('drawer')).toHaveAttribute('id', 'new-id');
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompOffcanvas', 'canvasTitle', '`title`');
    });

    it('G6-052/053 close button labelled and paper labelled by title', () => {
      render(<RdsCompOffcanvas {...defaultProps} open />);
      expect(screen.getByTestId('rds-icon-button')).toHaveAttribute('aria-label', 'Close');
      const titleEl = screen.getByText('Test Offcanvas');
      expect(paper()['aria-labelledby']).toBe(titleEl.id);
    });
  });

  describe('audit fixes B29', () => {
    it('placement and onShow warn and still work', () => {
      const { warnDeprecatedProp } = jest.requireMock('../../raaghu-elements/shared/utils/deprecation');
      const onShow = jest.fn();
      render(<RdsCompOffcanvas placement="left" onShow={onShow} />);
      fireEvent.click(screen.getByTestId('rds-button-open-off-canvas'));
      expect(onShow).toHaveBeenCalled();
      expect(screen.getByTestId('drawer')).toHaveAttribute('data-anchor', 'left');
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompOffcanvas', 'placement', '`anchor`');
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompOffcanvas', 'onShow', '`onOpen`');
    });
  });
});
