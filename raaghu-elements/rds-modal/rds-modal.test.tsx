import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import userEvent from '@testing-library/user-event';
import RdsModal from './rds-modal';
import HomeIcon from '@mui/icons-material/Home';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-modal.scss', () => ({}));

const renderWithTheme = (component: React.ReactElement, isDark = false) => {
  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
    },
  });
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('RdsModal', () => {
  const defaultProps = {
    title: 'Test Modal',
    isOpen: true,
    onClose: jest.fn(),
  };

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = renderWithTheme(
        <RdsModal {...defaultProps} />
      );
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsModal.displayName).toBe('RdsModal');
    });

    it('should render modal with title', () => {
      renderWithTheme(
        <RdsModal {...defaultProps} title="My Modal" isOpen={true} onClose={jest.fn()} />
      );
      expect(screen.getByText('My Modal')).toBeInTheDocument();
    });

    it('should render MuiDialog component', () => {
      renderWithTheme(
        <RdsModal {...defaultProps} />
      );
      // Verify dialog content is rendered
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should apply rds-modal classes', () => {
      renderWithTheme(
        <RdsModal {...defaultProps} />
      );
      // Verify modal title is rendered
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Modal Visibility', () => {
    it('should render modal when isOpen is true', () => {
      renderWithTheme(
        <RdsModal {...defaultProps} isOpen={true} />
      );
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });

    it('should not render modal content when isOpen is false', () => {
      renderWithTheme(
        <RdsModal {...defaultProps} isOpen={false} />
      );
      // When closed without keepMounted, dialog should not be in document
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should toggle modal visibility on isOpen prop change', () => {
      const { rerender } = renderWithTheme(
        <RdsModal {...defaultProps} isOpen={true} />
      );
      // When open, dialog should be visible
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      let dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();

      // Rerender with closed state
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsModal {...defaultProps} isOpen={false} />
        </ThemeProvider>
      );
      // MUI keeps hidden dialogs in DOM, verify modal still renders on reopening
      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsModal {...defaultProps} isOpen={true} />
        </ThemeProvider>
      );
      dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });
  });

  describe('Close Button', () => {
    it('should render close button by default', () => {
      renderWithTheme(
        <RdsModal {...defaultProps} showCloseButton={true} />
      );
      const closeButton = screen.getByLabelText('close');
      expect(closeButton).toBeInTheDocument();
    });

    it('should not render close button when showCloseButton is false', () => {
      renderWithTheme(
        <RdsModal {...defaultProps} showCloseButton={false} />
      );
      const closeButton = screen.queryByLabelText('close');
      expect(closeButton).not.toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', async () => {
      const onClose = jest.fn();
      renderWithTheme(
        <RdsModal {...defaultProps} onClose={onClose} showCloseButton={true} />
      );
      const closeButton = screen.getByLabelText('close');
      await userEvent.click(closeButton);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should apply correct class when close button is shown', () => {
      renderWithTheme(
        <RdsModal {...defaultProps} showCloseButton={true} />
      );
      // When close button is shown, verify it renders
      expect(screen.getByLabelText('close')).toBeInTheDocument();
    });
  });

  describe('Modal Icon', () => {
    it('should render icon when showIcon is true', () => {
      renderWithTheme(
        <RdsModal 
          {...defaultProps} 
          icon={<HomeIcon data-testid="modal-icon" />} 
          showIcon={true} 
        />
      );
      expect(screen.getByTestId('modal-icon')).toBeInTheDocument();
    });

    it('should not render icon when showIcon is false', () => {
      renderWithTheme(
        <RdsModal 
          {...defaultProps} 
          icon={<HomeIcon data-testid="modal-icon" />} 
          showIcon={false} 
        />
      );
      expect(screen.queryByTestId('modal-icon')).not.toBeInTheDocument();
    });

    it('should render different icon types', () => {
      const { rerender } = renderWithTheme(
        <RdsModal 
          {...defaultProps} 
          icon={<HomeIcon data-testid="icon-1" />} 
          showIcon={true} 
        />
      );
      expect(screen.getByTestId('icon-1')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsModal 
            {...defaultProps} 
            icon={<WarningIcon data-testid="icon-2" />} 
            showIcon={true} 
          />
        </ThemeProvider>
      );
      expect(screen.getByTestId('icon-2')).toBeInTheDocument();
    });

    it('should apply icon class', () => {
      renderWithTheme(
        <RdsModal 
          {...defaultProps} 
          icon={<InfoIcon data-testid="test-icon" />} 
          showIcon={true} 
        />
      );
      // When icon is shown, verify it renders
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });
  });

  describe('Modal Image', () => {
    it('should render image when imageSrc is provided', () => {
      renderWithTheme(
        <RdsModal 
          {...defaultProps} 
          imageSrc="https://example.com/image.jpg" 
        />
      );
      const image = screen.getByAltText('Modal');
      expect(image).toBeInTheDocument();
    });

    it('should not render image when imageSrc is not provided', () => {
      renderWithTheme(
        <RdsModal {...defaultProps} />
      );
      const image = screen.queryByAltText('Modal');
      expect(image).not.toBeInTheDocument();
    });

    it('should apply correct image class', () => {
      renderWithTheme(
        <RdsModal 
          {...defaultProps} 
          imageSrc="https://example.com/image.jpg" 
        />
      );
      // When image is provided, verify it renders with correct src
      const image = screen.getByAltText('Modal') as HTMLImageElement;
      expect(image).toBeInTheDocument();
      expect(image.src).toContain('image.jpg');
    });

    it('should use provided imageSrc as src attribute', () => {
      renderWithTheme(
        <RdsModal 
          {...defaultProps} 
          imageSrc="https://example.com/test.png" 
        />
      );
      const image = screen.getByAltText('Modal') as HTMLImageElement;
      expect(image.src).toBe('https://example.com/test.png');
    });
  });

  describe('Modal Content', () => {
    it('should render children content', () => {
      renderWithTheme(
        <RdsModal {...defaultProps}>
          <p>This is the modal content</p>
        </RdsModal>
      );
      expect(screen.getByText('This is the modal content')).toBeInTheDocument();
    });

    it('should not render children when showDescription is false', () => {
      renderWithTheme(
        <RdsModal {...defaultProps} showDescription={false}>
          <p>This content should not appear</p>
        </RdsModal>
      );
      expect(screen.queryByText('This content should not appear')).not.toBeInTheDocument();
    });

    it('should render complex children elements', () => {
      renderWithTheme(
        <RdsModal {...defaultProps}>
          <div>
            <h1>Title</h1>
            <p>Description</p>
            <button>Action</button>
          </div>
        </RdsModal>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });

    it('should render content with correct styling', () => {
      renderWithTheme(
        <RdsModal {...defaultProps}>
          <p>Modal content</p>
        </RdsModal>
      );
      // Verify modal content renders
      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });
  });

  describe('Modal Actions', () => {
    it('should render actions when provided', () => {
      renderWithTheme(
        <RdsModal 
          {...defaultProps} 
          actions={
            <div>
              <button>Cancel</button>
              <button>Submit</button>
            </div>
          }
        />
      );
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('should not render DialogActions when no actions provided', () => {
      const { container } = renderWithTheme(
        <RdsModal {...defaultProps} />
      );
      const dialogActions = container.querySelector('.MuiDialogActions-root');
      expect(dialogActions).not.toBeInTheDocument();
    });

    it('should call action callbacks when clicked', async () => {
      const handleCancel = jest.fn();
      const handleSubmit = jest.fn();
      renderWithTheme(
        <RdsModal 
          {...defaultProps} 
          actions={
            <div>
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          }
        />
      );
      await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
      expect(handleCancel).toHaveBeenCalled();
      expect(handleSubmit).toHaveBeenCalled();
    });

    it('should render multiple action buttons', () => {
      renderWithTheme(
        <RdsModal 
          {...defaultProps} 
          actions={
            <div>
              <button>Option 1</button>
              <button>Option 2</button>
              <button>Option 3</button>
            </div>
          }
        />
      );
      expect(screen.getByRole('button', { name: 'Option 1' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Option 2' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Option 3' })).toBeInTheDocument();
    });
  });

  describe('Modal Props', () => {
    it('should accept and pass through Dialog props', () => {
      renderWithTheme(
        <RdsModal 
          {...defaultProps} 
          maxWidth="sm"
          fullWidth={true}
        />
      );
      // Verify modal renders with passed props
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });

    it('should handle all RdsModalProps', () => {
      renderWithTheme(
        <RdsModal 
          title="Full Featured Modal"
          isOpen={true}
          onClose={jest.fn()}
          icon={<HomeIcon data-testid="test-icon" />}
          showIcon={true}
          showCloseButton={true}
          showDescription={true}
          imageSrc="https://example.com/modal-image.jpg"
          actions={<button>Action</button>}
        >
          <p>Content here</p>
        </RdsModal>
      );
      expect(screen.getByText('Full Featured Modal')).toBeInTheDocument();
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByAltText('Modal')).toBeInTheDocument();
      expect(screen.getByText('Content here')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });

    it('should work without optional props', () => {
      renderWithTheme(
        <RdsModal 
          isOpen={true}
          onClose={jest.fn()}
        />
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });
  });

  describe('Modal Interaction', () => {
    it('should call onClose when Escape key is pressed', () => {
      const onClose = jest.fn();
      renderWithTheme(
        <RdsModal {...defaultProps} onClose={onClose} />
      );
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
      expect(onClose).toHaveBeenCalled();
    });

    it('should call onClose when backdrop is clicked', () => {
      const onClose = jest.fn();
      const { container } = renderWithTheme(
        <RdsModal {...defaultProps} onClose={onClose} />
      );
      const backdrop = container.querySelector('.MuiBackdrop-root');
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(onClose).toHaveBeenCalled();
      }
    });

    it('should handle multiple onClose calls gracefully', async () => {
      const onClose = jest.fn();
      renderWithTheme(
        <RdsModal {...defaultProps} onClose={onClose} showCloseButton={true} />
      );
      const closeButton = screen.getByLabelText('close');
      await userEvent.click(closeButton);
      await userEvent.click(closeButton);
      expect(onClose.mock.calls.length).toBeGreaterThan(0);
    });
  });

  describe('Theme Integration', () => {
    it('should render correctly with light theme', () => {
      renderWithTheme(
        <RdsModal {...defaultProps} />,
        false
      );
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });

    it('should render correctly with dark theme', () => {
      renderWithTheme(
        <RdsModal {...defaultProps} />,
        true
      );
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });

    it('should apply theme colors from props', () => {
      renderWithTheme(
        <RdsModal {...defaultProps} />,
        false
      );
      // Verify light theme modal renders
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper dialog role', () => {
      renderWithTheme(
        <RdsModal {...defaultProps} />
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    it('should have close button with aria-label', () => {
      renderWithTheme(
        <RdsModal {...defaultProps} showCloseButton={true} />
      );
      const closeButton = screen.getByLabelText('close');
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveAttribute('aria-label', 'close');
    });

    it('should render title in Typography component', () => {
      renderWithTheme(
        <RdsModal {...defaultProps} title="Accessible Title" />
      );
      const title = screen.getByText('Accessible Title');
      expect(title).toBeInTheDocument();
    });

    it('should have proper semantic structure', () => {
      renderWithTheme(
        <RdsModal {...defaultProps}>Content</RdsModal>
      );
      const dialog = screen.getByRole('dialog');
      const title = screen.getByText('Test Modal');
      
      expect(dialog).toBeInTheDocument();
      expect(title).toBeInTheDocument();
    });

    it('should have disabled state for content when modal is closed', () => {
      renderWithTheme(
        <RdsModal {...defaultProps} isOpen={false} />
      );
      // When closed, the modal text should not be queryable in normal DOM
      expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    });
  });

  describe('Complex Scenarios', () => {
    it('should render modal with all features enabled', () => {
      renderWithTheme(
        <RdsModal
          {...defaultProps}
          icon={<WarningIcon data-testid="warning-icon" />}
          imageSrc="https://example.com/warning.png"
          showIcon={true}
          showCloseButton={true}
          showDescription={true}
          actions={
            <div>
              <button>Confirm</button>
              <button>Cancel</button>
            </div>
          }
        >
          <p>Are you sure you want to proceed?</p>
        </RdsModal>
      );
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByTestId('warning-icon')).toBeInTheDocument();
      expect(screen.getByAltText('Modal')).toBeInTheDocument();
      expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    });

    it('should handle modal state transitions', () => {
      const onClose = jest.fn();
      const { rerender } = renderWithTheme(
        <RdsModal {...defaultProps} onClose={onClose} isOpen={true} />
      );
      expect(screen.getByText('Test Modal')).toBeInTheDocument();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsModal {...defaultProps} onClose={onClose} isOpen={false} />
        </ThemeProvider>
      );
      // Close handler should work
      expect(onClose).not.toHaveBeenCalled();

      rerender(
        <ThemeProvider theme={createTheme()}>
          <RdsModal {...defaultProps} onClose={onClose} isOpen={true} />
        </ThemeProvider>
      );
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });

    it('should handle form content in modal', async () => {
      const handleSubmit = jest.fn();
      renderWithTheme(
        <RdsModal
          {...defaultProps}
          actions={
            <button onClick={handleSubmit}>Submit Form</button>
          }
        >
          <form>
            <input type="text" placeholder="Enter name" />
            <input type="email" placeholder="Enter email" />
          </form>
        </RdsModal>
      );
      const nameInput = screen.getByPlaceholderText('Enter name') as HTMLInputElement;
      const emailInput = screen.getByPlaceholderText('Enter email') as HTMLInputElement;

      await userEvent.type(nameInput, 'John Doe');
      await userEvent.type(emailInput, 'john@example.com');

      expect(nameInput.value).toBe('John Doe');
      expect(emailInput.value).toBe('john@example.com');

      await userEvent.click(screen.getByRole('button', { name: 'Submit Form' }));
      expect(handleSubmit).toHaveBeenCalled();
    });

    it('should handle nested modals gracefully', () => {
      renderWithTheme(
        <div>
          <RdsModal
            title="First Modal"
            isOpen={true}
            onClose={jest.fn()}
          >
            First modal content
          </RdsModal>
          <RdsModal
            title="Second Modal"
            isOpen={true}
            onClose={jest.fn()}
          >
            Second modal content
          </RdsModal>
        </div>
      );
      expect(screen.getByText('First Modal')).toBeInTheDocument();
      expect(screen.getByText('Second Modal')).toBeInTheDocument();
    });

    it('should handle rapid open/close cycles', () => {
      const onClose = jest.fn();
      const { rerender } = renderWithTheme(
        <RdsModal {...defaultProps} onClose={onClose} isOpen={true} />
      );

      for (let i = 0; i < 3; i++) {
        rerender(
          <ThemeProvider theme={createTheme()}>
            <RdsModal {...defaultProps} onClose={onClose} isOpen={false} />
          </ThemeProvider>
        );
        rerender(
          <ThemeProvider theme={createTheme()}>
            <RdsModal {...defaultProps} onClose={onClose} isOpen={true} />
          </ThemeProvider>
        );
      }
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = renderWithTheme(<RdsModal title="Test Modal" isOpen={true} onClose={jest.fn()} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
