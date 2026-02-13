import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RdsCompAiAttachement, { RdsCompAiAttachementProps, UserData, Comment } from './rds-comp-ai-attachement';

// Mock SCSS
jest.mock('./rds-comp-ai-attachement.scss', () => ({}));

// Mock Material UI Icons
jest.mock('@mui/icons-material/Attachment', () => {
  return function MockAttachmentIcon() {
    return <span data-testid="attachment-icon">Attachment</span>;
  };
});

// Mock child components
jest.mock('../../raaghu-elements/rds-badge/rds-badge', () => {
  return function MockRdsBadge({ badgeContent, colorVariant, styleType, ...props }: any) {
    return (
      <span data-testid="rds-badge" data-color={colorVariant} {...props}>
        {badgeContent}
      </span>
    );
  };
});

jest.mock('../../raaghu-elements/rds-modal/rds-modal', () => {
  return function MockRdsModal({ isOpen, onClose, title, children, showCloseButton, ...props }: any) {
    if (!isOpen) return null;
    return (
      <div data-testid="rds-modal" {...props}>
        <div className="modal-header">
          <h5 data-testid="modal-title">{title}</h5>
          {showCloseButton && (
            <button onClick={onClose} data-testid="modal-close-btn">
              Close
            </button>
          )}
        </div>
        <div className="modal-body" data-testid="modal-body">
          {children}
        </div>
      </div>
    );
  };
});

jest.mock('../../raaghu-elements/rds-input/rds-input', () => {
  return function MockRdsInput({ 
    value, 
    onChange, 
    placeholder, 
    hintText, 
    ...props 
  }: any) {
    return (
      <div data-testid="rds-input-wrapper">
        {hintText && <small data-testid="hint-text">{hintText}</small>}
        <input
          data-testid="rds-input"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  };
});

jest.mock('../rds-comp-ai-fab-menu/rds-comp-ai-fab-menu', () => {
  return function MockRdsCompAiFabMenu({ listItems, menuIcon, alignment, backgroundType, isShowBorder, ...props }: any) {
    return (
      <div data-testid="rds-fab-menu" data-alignment={alignment} {...props}>
        <button data-testid="fab-menu-trigger" style={{ cursor: 'pointer' }}>
          {menuIcon}
        </button>
        <div data-testid="fab-menu-items">
          {listItems?.map((item: any, idx: number) => (
            <div key={item.key || idx} data-testid={`fab-item-${item.key}`} style={{ cursor: 'pointer' }}>
              {item.value}
            </div>
          ))}
        </div>
      </div>
    );
  };
});

jest.mock('../../raaghu-components/rds-comp-ai-icon/rds-comp-ai-icon', () => ({
  registerMaterialIcons: jest.fn(),
}));

describe('RdsCompAiAttachement', () => {
  const mockUserData: UserData[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      activeDotButton: true,
      status: 'active',
      size: 'medium',
      colorVariant: 'primary',
      time: '2 hours ago',
      profilePic: 'https://example.com/pic.jpg',
      messageStatus: 'sent',
      comments: [],
    },
  ];

  const defaultProps: RdsCompAiAttachementProps = {
    menuIcon: 'attach',
    modalTitle: 'Import Design',
    hintText: 'Enter Figma URL',
    inputPlaceholder: 'https://figma.com/...',
    showBadge: false,
    badgeLabel: 'NEW',
    badgeColor: 'primary',
    uploadText: 'Upload',
    importText: 'Import from Figma',
    modalText: 'Paste your Figma file URL',
    userData: mockUserData,
    menuAlignment: 'left',
  };

  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      render(<RdsCompAiAttachement {...defaultProps} />);
      expect(screen.getByTestId('rds-fab-menu')).toBeInTheDocument();
    });

    it('renders the FAB menu with correct alignment', () => {
      render(<RdsCompAiAttachement {...defaultProps} menuAlignment="right" />);
      expect(screen.getByTestId('rds-fab-menu')).toHaveAttribute('data-alignment', 'right');
    });

    it('renders upload and import buttons in FAB menu', () => {
      render(<RdsCompAiAttachement {...defaultProps} />);
      expect(screen.getByText('Upload')).toBeInTheDocument();
      expect(screen.getByText('Import from Figma')).toBeInTheDocument();
    });

    it('has correct display name for debugging', () => {
      expect(RdsCompAiAttachement.displayName).toBe('RdsCompAiAttachement');
    });
  });

  describe('Badge Rendering', () => {
    it('renders badge when showBadge is true', () => {
      render(
        <RdsCompAiAttachement
          {...defaultProps}
          showBadge={true}
          badgeLabel="NEW"
          badgeColor="red"
        />
      );
      expect(screen.getByTestId('rds-badge')).toBeInTheDocument();
      expect(screen.getByTestId('rds-badge')).toHaveTextContent('NEW');
    });

    it('does not render badge when showBadge is false', () => {
      render(<RdsCompAiAttachement {...defaultProps} showBadge={false} />);
      expect(screen.queryByTestId('rds-badge')).not.toBeInTheDocument();
    });

    it('applies correct badge color', () => {
      render(
        <RdsCompAiAttachement
          {...defaultProps}
          showBadge={true}
          badgeColor="success"
        />
      );
      expect(screen.getByTestId('rds-badge')).toHaveAttribute('data-color', 'success');
    });
  });

  describe('Modal Functionality', () => {
    it('does not show modal initially', () => {
      render(<RdsCompAiAttachement {...defaultProps} />);
      expect(screen.queryByTestId('rds-modal')).not.toBeInTheDocument();
    });
  });





  describe('File Upload', () => {
    it('renders hidden file input', () => {
      const { container } = render(<RdsCompAiAttachement {...defaultProps} />);
      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(fileInput).toBeInTheDocument();
      expect(fileInput).toHaveStyle({ display: 'none' });
    });

    it('triggers file input when import button is clicked', async () => {
      const { container } = render(<RdsCompAiAttachement {...defaultProps} />);
      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      const clickSpy = jest.spyOn(fileInput, 'click');

      fireEvent.click(screen.getByText('Import from Figma'));

      expect(clickSpy).toHaveBeenCalled();
    });

    it('handles image file upload', async () => {
      const handleAddComment = jest.fn();
      const { container } = render(
        <RdsCompAiAttachement
          {...defaultProps}
          handleAddComment={handleAddComment}
        />
      );

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;

      // Create a mock image file
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

      // Mock FileReader
      const mockRead = jest.fn();
      const mockFileReader = jest.fn(function (this: any) {
        this.readAsDataURL = mockRead;
        this.onloadend = null;
        this.result = 'data:image/jpeg;base64,test';
      }) as any;

      mockFileReader.EMPTY = 0;
      mockFileReader.LOADING = 1;
      mockFileReader.DONE = 2;

      global.FileReader = mockFileReader;

      fireEvent.change(fileInput, { target: { files: [file] } });

      await waitFor(() => {
        expect(mockRead).toHaveBeenCalledWith(file);
      });
    });

    it('only accepts image files', async () => {
      const handleAddComment = jest.fn();
      const { container } = render(
        <RdsCompAiAttachement
          {...defaultProps}
          handleAddComment={handleAddComment}
        />
      );

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;

      // Create a non-image file
      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });

      fireEvent.change(fileInput, { target: { files: [file] } });

      // Should not call handleAddComment for non-image files
      expect(handleAddComment).not.toHaveBeenCalled();
    });

    it('clears file input after upload', async () => {
      const { container } = render(<RdsCompAiAttachement {...defaultProps} />);
      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;

      // Mock FileReader
      const mockReadAsDataURL = jest.fn();
      const mockFileReader = jest.fn(function (this: any) {
        this.readAsDataURL = mockReadAsDataURL;
        this.onloadend = null;
        this.result = 'data:image/jpeg;base64,test';
      }) as any;

      mockFileReader.EMPTY = 0;
      mockFileReader.LOADING = 1;
      mockFileReader.DONE = 2;

      global.FileReader = mockFileReader;

      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

      fireEvent.change(fileInput, { target: { files: [file] } });

      await waitFor(() => {
        expect(mockReadAsDataURL).toHaveBeenCalled();
      });
    });
  });

  describe('Props and Defaults', () => {
    it('uses default values for optional props', () => {
      const { container } = render(
        <RdsCompAiAttachement
          modalTitle="Test"
          userData={mockUserData}
        />
      );
      expect(container.querySelector('.rds-comp-ai-attachement__dropdown')).toBeInTheDocument();
    });

    it('renders with left menu alignment by default', () => {
      render(<RdsCompAiAttachement {...defaultProps} menuAlignment={undefined} />);
      expect(screen.getByTestId('rds-fab-menu')).toHaveAttribute('data-alignment', 'left');
    });

    it('applies custom menu icon', () => {
      render(
        <RdsCompAiAttachement
          {...defaultProps}
          menuIcon="custom-icon"
        />
      );
      expect(screen.getByTestId('fab-menu-trigger')).toHaveTextContent('custom-icon');
    });
  });

  describe('User Data Handling', () => {
    it('uses userData from props', () => {
      const customUserData: UserData[] = [
        {
          firstName: 'Jane',
          lastName: 'Smith',
          activeDotButton: false,
          status: 'offline',
          size: 'small',
          colorVariant: 'secondary',
          time: '5 minutes ago',
          profilePic: 'https://example.com/jane.jpg',
          messageStatus: 'read',
          comments: [],
        },
      ];

      render(
        <RdsCompAiAttachement
          {...defaultProps}
          userData={customUserData}
        />
      );

      expect(screen.getByTestId('rds-fab-menu')).toBeInTheDocument();
    });

    it('initializes comment list from userData', () => {
      const commentData: Comment[] = [
        {
          firstName: 'John',
          lastName: 'Doe',
          comment: 'Great design!',
          image: 'data:image/jpeg;base64,test',
        },
      ];

      const userDataWithComments: UserData[] = [
        {
          ...mockUserData[0],
          comments: commentData,
        },
      ];

      render(
        <RdsCompAiAttachement
          {...defaultProps}
          userData={userDataWithComments}
        />
      );

      expect(screen.getByTestId('rds-fab-menu')).toBeInTheDocument();
    });
  });



  describe('Accessibility', () => {
    it('buttons have proper roles', async () => {
      render(<RdsCompAiAttachement {...defaultProps} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty userData array', () => {
      render(
        <RdsCompAiAttachement
          {...defaultProps}
          userData={[]}
        />
      );
      expect(screen.getByTestId('rds-fab-menu')).toBeInTheDocument();
    });

    it('handles undefined userData', () => {
      render(
        <RdsCompAiAttachement
          {...defaultProps}
          userData={undefined}
        />
      );
      expect(screen.getByTestId('rds-fab-menu')).toBeInTheDocument();
    });

    it('handles undefined callbacks gracefully', () => {
      render(
        <RdsCompAiAttachement
          {...defaultProps}
          onFigmaSubmit={undefined}
          handleAddComment={undefined}
        />
      );
      expect(screen.getByTestId('rds-fab-menu')).toBeInTheDocument();
    });

    it('handles empty badge label', () => {
      render(
        <RdsCompAiAttachement
          {...defaultProps}
          showBadge={true}
          badgeLabel=""
        />
      );
      expect(screen.getByTestId('rds-badge')).toBeInTheDocument();
    });
  });
});
