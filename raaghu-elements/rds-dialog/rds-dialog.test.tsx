import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsDialog from './rds-dialog';
import { axe } from 'jest-axe';
import * as deprecation from '../shared/utils/deprecation';

jest.mock('./rds-dialog.scss', () => ({}));

jest.mock('../rds-button/rds-button', () => {
  return function MockRdsButton({ children, onClick, text, style, ...props }: any) {
    return (
      <button onClick={onClick} {...props}>
        {children || text}
      </button>
    );
  };
});

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  Dialog: ({ children, onClose, maxWidth, open, ...props }: any) => {
    if (!open) return null;
    return (
      <dialog data-testid="dialog-root" aria-labelledby="mock-dialog-title" open {...props}>
        {children}
      </dialog>
    );
  },
  DialogTitle: ({ children, ...props }: any) => (
    <div id="mock-dialog-title" data-testid="dialog-title" {...props}>{children}</div>
  ),
  DialogContent: ({ children, ...props }: any) => (
    <div data-testid="dialog-content" {...props}>{children}</div>
  ),
  DialogActions: ({ children, ...props }: any) => (
    <div data-testid="dialog-actions" {...props}>{children}</div>
  ),
  IconButton: ({ children, onClick, 'aria-label': ariaLabel, ...props }: any) => (
    <button
      data-testid={ariaLabel ? `icon-button-${ariaLabel}` : 'icon-button'}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  ),
}));

jest.mock('@mui/icons-material/Close', () => {
  return function MockCloseIcon() {
    return <span data-testid="close-icon">CloseIcon</span>;
  };
});

describe('RdsDialog', () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
  };
  const setup = (p: Record<string, any> = {}, children?: React.ReactNode) =>
    render(<RdsDialog {...defaultProps} {...p}>{children}</RdsDialog>);
  const root = () => screen.getByTestId('dialog-root');
  const dialogTitle = () => screen.getByTestId('dialog-title');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      setup();
      expect(root()).toBeInTheDocument();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should not render when open is false', () => {
      setup({ open: false });
      expect(screen.queryByTestId('dialog-root')).not.toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsDialog.displayName).toBe('RdsDialog');
    });
  });

  describe('Title Props', () => {
    it('should render title when provided', () => {
      setup({ title: 'Test Dialog Title' });
      expect(screen.getByText('Test Dialog Title')).toBeInTheDocument();
    });

    it('should render title element when showTitle is true', () => {
      setup({ title: 'Test Title', showTitle: true });
      expect(dialogTitle()).toBeInTheDocument();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should not render title when showTitle is false', () => {
      setup({ title: 'Hidden Title', showTitle: false });
      expect(screen.queryByText('Hidden Title')).not.toBeInTheDocument();
    });

    it('should render title element even when showTitle is false if ShowDissmiss is true', () => {
      setup({ title: 'Test', showTitle: false, ShowDissmiss: true });
      expect(dialogTitle()).toBeInTheDocument();
    });
  });

  describe('Children and Content', () => {
    it('should render children content', () => {
      setup({}, <div>Dialog Content</div>);
      expect(screen.getByText('Dialog Content')).toBeInTheDocument();
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
    });

    it('should render complex children', () => {
      setup(
        {},
        <div>
          <h1>Header</h1>
          <p>Description</p>
        </div>
      );
      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
    });
  });

  describe('Close Button (ShowDissmiss)', () => {
    it('should render close button when ShowDissmiss is true', () => {
      setup({ ShowDissmiss: true });
      expect(screen.getByTestId('icon-button-close')).toBeInTheDocument();
      expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    });

    it('should not render close button when ShowDissmiss is false', () => {
      setup({ ShowDissmiss: false });
      expect(screen.queryByTestId('icon-button-close')).not.toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', () => {
      const mockOnClose = jest.fn();
      setup({ onClose: mockOnClose, ShowDissmiss: true });
      fireEvent.click(screen.getByTestId('icon-button-close'));
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Variants', () => {
    it.each(['standard', 'default'])('should render with %s variant', (variant) => {
      setup({ variant, title: `${variant} Dialog` });
      expect(screen.getByText(`${variant} Dialog`)).toBeInTheDocument();
      expect(dialogTitle()).toBeInTheDocument();
    });

    it('should use default variant by default', () => {
      setup({ title: 'Test' });
      expect(dialogTitle()).toBeInTheDocument();
    });
  });

  describe('Size Props', () => {
    it.each(['extra-small', 'small', 'medium', 'large', 'extra-large', false] as const)(
      'should render with %s size',
      (size) => {
        setup({ size, title: 'Test' });
        expect(root()).toBeInTheDocument();
      }
    );

    it('should use medium size by default', () => {
      setup({ title: 'Test' });
      expect(root()).toBeInTheDocument();
    });
  });

  describe('Actions Props', () => {
    it('should render actions when provided', () => {
      setup({ actions: <button>Action Button</button> });
      expect(screen.getByText('Action Button')).toBeInTheDocument();
      expect(screen.getByTestId('dialog-actions')).toBeInTheDocument();
    });

    it('should not render dialog actions element when no actions provided', () => {
      setup();
      expect(screen.queryByText('Test Action')).not.toBeInTheDocument();
    });

    it('should render multiple action buttons', () => {
      setup({
        actions: (
          <>
            <button>Cancel</button>
            <button>Save</button>
          </>
        ),
      });
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });
  });

  describe('Primary and Secondary Actions (Standard Variant)', () => {
    it('should render secondary button when ShowSecondary is true', () => {
      setup({ variant: 'standard', ShowSecondary: true, onClose: jest.fn() });
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('should render primary button when ShowPrimary is true', () => {
      setup({ variant: 'standard', ShowPrimary: true });
      expect(screen.getByText('Okay')).toBeInTheDocument();
    });

    it('should render both primary and secondary buttons', () => {
      setup({ variant: 'standard', ShowPrimary: true, ShowSecondary: true, onClose: jest.fn() });
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Okay')).toBeInTheDocument();
    });

    it.each([
      ['secondary', 'ShowSecondary', 'Cancel'],
      ['primary', 'ShowPrimary', 'Okay'],
    ])('should call onClose when %s button is clicked', (_n, prop, text) => {
      const mockOnClose = jest.fn();
      setup({ variant: 'standard', [prop]: true, onClose: mockOnClose });
      fireEvent.click(screen.getByText(text));
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Event Handlers', () => {
    it('should handle undefined onClose gracefully', () => {
      render(<RdsDialog open={true} ShowDissmiss={true} />);
      expect(root()).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsDialog open={true} title="Test Dialog" onClose={jest.fn()} />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('should have proper aria-label on close button', () => {
      setup({ ShowDissmiss: true });
      expect(screen.getByLabelText('close')).toBeInTheDocument();
    });

    it('should have role="dialog" for standard variant', () => {
      setup({ variant: 'standard', title: 'Test' });
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it('should render dialog with correct structure', () => {
      setup({ title: 'Test Title', variant: 'standard' });
      expect(root()).toBeInTheDocument();
      expect(dialogTitle()).toBeInTheDocument();
      expect(screen.getByTestId('dialog-content')).toBeInTheDocument();
    });
  });

  describe('Props Combination Tests', () => {
    it('should render with title, content, and close button', () => {
      setup({ title: 'Complex Dialog', ShowDissmiss: true, showTitle: true }, <p>Dialog Content</p>);
      expect(screen.getByText('Complex Dialog')).toBeInTheDocument();
      expect(screen.getByText('Dialog Content')).toBeInTheDocument();
      expect(screen.getByTestId('icon-button-close')).toBeInTheDocument();
    });

    it('should render standard variant with all features', () => {
      setup(
        {
          variant: 'standard',
          title: 'Full Featured',
          ShowDissmiss: true,
          ShowPrimary: true,
          ShowSecondary: true,
          showTitle: true,
          size: 'large',
          onClose: jest.fn(),
        },
        <p>Content</p>
      );
      expect(screen.getByText('Full Featured')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.getByTestId('icon-button-close')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Okay')).toBeInTheDocument();
    });

    it('should render default variant with custom actions', () => {
      setup(
        { variant: 'default', title: 'With Actions', showTitle: true, actions: <button>Custom Action</button> },
        <p>Content</p>
      );
      expect(screen.getByText('With Actions')).toBeInTheDocument();
      expect(screen.getByText('Custom Action')).toBeInTheDocument();
      expect(screen.getByTestId('dialog-actions')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty title', () => {
      setup({ title: '', showTitle: true });
      expect(dialogTitle()).toBeInTheDocument();
    });

    it('should handle undefined title', () => {
      setup({ showTitle: true });
      expect(dialogTitle()).toBeInTheDocument();
    });

    it('should handle undefined children', () => {
      setup({ title: 'Test' });
      expect(root()).toBeInTheDocument();
    });

    it('should not render dialog when open is not true', () => {
      render(<RdsDialog open={false} title="Not Visible" />);
      expect(screen.queryByText('Not Visible')).not.toBeInTheDocument();
    });
  });
});

describe('RdsDialog audit fixes', () => {
  const standardProps = { open: true, variant: 'confirm' as const, ShowPrimary: true, ShowSecondary: true };

  it('calls onPrimaryClick/onSecondaryClick instead of onClose and uses custom labels (G1-233)', () => {
    const onClose = jest.fn();
    const onPrimaryClick = jest.fn();
    const onSecondaryClick = jest.fn();
    render(
      <RdsDialog
        {...standardProps}
        onClose={onClose}
        primaryText="Delete"
        secondaryText="Keep"
        onPrimaryClick={onPrimaryClick}
        onSecondaryClick={onSecondaryClick}
      />
    );
    fireEvent.click(screen.getByText('Delete'));
    fireEvent.click(screen.getByText('Keep'));
    expect(onPrimaryClick).toHaveBeenCalledTimes(1);
    expect(onSecondaryClick).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('keeps the default labels and calls onClose with only the click event without callbacks (G1-233)', () => {
    const onClose = jest.fn();
    render(<RdsDialog {...standardProps} onClose={onClose} />);
    fireEvent.click(screen.getByText('Okay'));
    fireEvent.click(screen.getByText('Cancel'));
    fireEvent.click(screen.getByLabelText('close'));
    expect(onClose).toHaveBeenCalledTimes(3);
    onClose.mock.calls.forEach((call) => {
      expect(call).toHaveLength(1);
      expect(call[0]).toHaveProperty('type', 'click');
    });
  });

  describe('with the real MUI Dialog and RdsButton', () => {
    type Isolated = {
      RealDialog: typeof RdsDialog;
      warn: jest.Mock;
    };

    const load = (): Isolated => {
      /* eslint-disable @typescript-eslint/no-require-imports -- fresh module instances with the real MUI */
      const shared = ['react', 'react/jsx-runtime', 'react/jsx-dev-runtime', 'react-dom', 'react-dom/client'].map(
        (name) => [name, require(name)] as const,
      );
      let loaded!: Isolated;
      jest.isolateModules(() => {
        shared.forEach(([name, mod]) => jest.doMock(name, () => mod));
        jest.dontMock('@mui/material');
        jest.dontMock('@mui/icons-material/Close');
        jest.dontMock('../rds-button/rds-button');
        jest.doMock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));
        loaded = {
          RealDialog: require('./rds-dialog').default,
          warn: require('../shared/utils/deprecation').warnDeprecatedProp,
        };
      });
      /* eslint-enable @typescript-eslint/no-require-imports */
      return loaded;
    };

    let isolated: Isolated;
    beforeEach(() => {
      isolated = load();
    });

    it('merges consumer paper slotProps with its own classes (G1-235)', () => {
      const { RealDialog } = isolated;
      render(
        <RealDialog
          {...standardProps}
          slotProps={{
            paper: { className: 'my-paper', sx: { m: 1 } },
            backdrop: { className: 'my-backdrop' },
          }}
        />
      );
      const paper = document.querySelector('.MuiDialog-paper');
      expect(paper).toHaveClass('rds-dialog', 'rds-dialog__paper', 'my-paper');
      expect(document.querySelector('.my-backdrop')).toBeInTheDocument();
    });

    it('supports function-form paper slotProps (G1-235)', () => {
      const { RealDialog } = isolated;
      render(<RealDialog {...standardProps} slotProps={{ paper: () => ({ className: 'fn-paper' }) }} />);
      expect(document.querySelector('.MuiDialog-paper')).toHaveClass('rds-dialog', 'rds-dialog__paper', 'fn-paper');
    });

    it('keeps its paper classes without consumer slotProps (G1-235)', () => {
      const { RealDialog } = isolated;
      render(<RealDialog {...standardProps} />);
      expect(document.querySelector('.MuiDialog-paper')).toHaveClass('rds-dialog', 'rds-dialog__paper');
    });

    it('passes consumer slotProps through in the default variant (G1-235)', () => {
      const { RealDialog } = isolated;
      render(<RealDialog open slotProps={{ paper: { className: 'my-paper' } }} />);
      expect(document.querySelector('.MuiDialog-paper')).toHaveClass('my-paper');
    });

    it('forwards MUI onClose(event, reason) (G1-234)', () => {
      const { RealDialog } = isolated;
      const onClose = jest.fn();
      render(<RealDialog open onClose={onClose} />);
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
      expect(onClose).toHaveBeenCalledWith(expect.anything(), 'escapeKeyDown');
    });

    it('lets a consumer maxWidth win over size (G1-238)', () => {
      const { RealDialog } = isolated;
      render(<RealDialog open size="large" maxWidth="xs" />);
      expect(document.querySelector('.MuiDialog-paper')).toHaveClass('MuiDialog-paperWidthXs');
    });

    it('maps size to maxWidth by default (G1-238)', () => {
      const { RealDialog } = isolated;
      render(<RealDialog open size="large" />);
      expect(document.querySelector('.MuiDialog-paper')).toHaveClass('MuiDialog-paperWidthLg');
    });

    it('renders the button labels as RdsButton children, not the deprecated text prop (G1-243)', () => {
      const { RealDialog, warn } = isolated;
      render(<RealDialog {...standardProps} onClose={jest.fn()} />);
      expect(screen.getByRole('button', { name: 'Okay' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(warn).not.toHaveBeenCalled();
    });

    it('labels the dialog by its title and names the close button', () => {
      const { RealDialog } = isolated;
      render(<RealDialog open title="My Title" onClose={jest.fn()} />);
      const dialog = screen.getByRole('dialog');
      const labelId = dialog.getAttribute('aria-labelledby');
      expect(labelId).toBeTruthy();
      expect(document.getElementById(labelId as string)).toHaveTextContent('My Title');
      expect(screen.getByRole('button', { name: 'close' })).toBeInTheDocument();
    });
  });
});

describe('RdsDialog additive renames', () => {
  const warn = jest.spyOn(deprecation, 'warnDeprecatedProp');
  beforeEach(() => warn.mockClear());

  it('lets showCloseButton win over ShowDissmiss', () => {
    render(<RdsDialog open title="T" onClose={jest.fn()} ShowDissmiss showCloseButton={false}>c</RdsDialog>);
    expect(screen.queryByRole('button', { name: 'close' })).not.toBeInTheDocument();
    expect(warn).not.toHaveBeenCalled();
  });

  it('renders the confirm variant and warns for standard, size and showTitle', () => {
    const { rerender } = render(<RdsDialog open variant="confirm" ShowPrimary title="T">c</RdsDialog>);
    expect(screen.getByText('Okay')).toBeInTheDocument();
    expect(warn).not.toHaveBeenCalled();
    rerender(<RdsDialog open variant="standard" size="small" showTitle ShowPrimary title="T">c</RdsDialog>);
    expect(screen.getByText('Okay')).toBeInTheDocument();
    expect(warn).toHaveBeenCalledWith('RdsDialog', 'variant="standard"', '`variant="confirm"`');
    expect(warn).toHaveBeenCalledWith('RdsDialog', 'size', '`maxWidth`');
    expect(warn).toHaveBeenCalledWith('RdsDialog', 'showTitle', '`title={undefined}`');
  });
});
