import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCommentBox, { useCommentsBoxLogic, DropdownMenu } from './rds-comp-comments-box';

jest.mock('./rds-comp-comments-box.scss', () => ({}));
jest.mock('../../raaghu-elements/rds-avatar/rds-avatar', () => ({
  __esModule: true,
  default: function MockRdsAvatar({ children, className, ...props }: any) {
    return <div data-testid="rds-avatar" className={className} {...props}>{children}</div>;
  },
}));
jest.mock('../../raaghu-elements/rds-box/rds-box', () => ({
  __esModule: true,
  default: function MockRdsBox({ children, className, ...props }: any) {
    return <div data-testid="rds-box" className={className} {...props}>{children}</div>;
  },
}));

jest.mock('@mui/icons-material/Computer', () => {
  return function MockIcon(props: any) {
    return <span data-testid="computer-icon" className={props.className} />;
  };
});

jest.mock('@mui/icons-material/Cloud', () => {
  return function MockIcon(props: any) {
    return <span data-testid="cloud-icon" className={props.className} />;
  };
});

jest.mock('@mui/icons-material/InsertDriveFile', () => {
  return function MockIcon(props: any) {
    return <span data-testid="drive-file-icon" className={props.className} />;
  };
});

const defaultProps = {
  avatarInitials: 'JD',
};

describe('RdsCommentBox', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = render(<RdsCommentBox {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it('renders the interactive composer with an avatar and input', () => {
      render(<RdsCommentBox {...defaultProps} />);
      expect(screen.getByTestId('rds-avatar')).toBeInTheDocument();
      expect(screen.getByTestId('rds-avatar')).toHaveTextContent('JD');
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'send comment' })).toBeEnabled();
    });

    it('renders with default avatar initials when not provided', () => {
      render(<RdsCommentBox avatarInitials="RD" />);
      expect(screen.getByTestId('rds-avatar')).toHaveTextContent('RD');
    });

    it('uses the existing placeholder props and allows sending a draft', async () => {
      render(<RdsCommentBox {...defaultProps} placeholderText="Write a comment" />);
      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'Hello');
      expect(input).toHaveValue('Hello');
      const sendButton = screen.getByRole('button', { name: 'send comment' });
      expect(sendButton).toBeEnabled();
      await userEvent.click(sendButton);
      expect(input).toHaveValue('');
    });

    it('shows a focusable comment input', async () => {
      render(<RdsCommentBox {...defaultProps} />);
      await userEvent.tab();
      expect(screen.getByRole('textbox')).toHaveFocus();
    });
  });
});

describe('useCommentsBoxLogic', () => {
  describe('Emoji Picker Functionality', () => {
    it('initializes with emoji picker closed', () => {
      const TestComponent = () => {
        const { emojiPickerOpen } = useCommentsBoxLogic();
        return <div data-testid="emoji-state">{emojiPickerOpen ? 'open' : 'closed'}</div>;
      };
      render(<TestComponent />);
      expect(screen.getByTestId('emoji-state')).toHaveTextContent('closed');
    });

    it('toggles emoji picker when button is clicked', () => {
      const TestComponent = () => {
        const { emojiPickerOpen, handleEmojiBtnClick, emojiPickerRef } = useCommentsBoxLogic();
        return (
          <>
            <button data-testid="emoji-btn" onClick={(e) => handleEmojiBtnClick(e)}>
              Emoji
            </button>
            <div data-testid="emoji-state">{emojiPickerOpen ? 'open' : 'closed'}</div>
            <div ref={emojiPickerRef} data-testid="emoji-picker" />
          </>
        );
      };
      render(<TestComponent />);
      const button = screen.getByTestId('emoji-btn');
      
      expect(screen.getByTestId('emoji-state')).toHaveTextContent('closed');
      fireEvent.click(button);
      expect(screen.getByTestId('emoji-state')).toHaveTextContent('open');
    });

    it('adds emoji to typing header', () => {
      const TestComponent = () => {
        const { typingHeader, handleEmojiSelect } = useCommentsBoxLogic();
        return (
          <>
            <button data-testid="add-emoji" onClick={() => handleEmojiSelect('😊')}>
              Add
            </button>
            <div data-testid="typing-header">{typingHeader}</div>
          </>
        );
      };
      render(<TestComponent />);
      
      expect(screen.getByTestId('typing-header')).toHaveTextContent('');
      fireEvent.click(screen.getByTestId('add-emoji'));
      expect(screen.getByTestId('typing-header')).toHaveTextContent('😊');
    });

    it('multiple emojis can be added sequentially', () => {
      const TestComponent = () => {
        const { typingHeader, handleEmojiSelect } = useCommentsBoxLogic();
        return (
          <>
            <button data-testid="add-emoji" onClick={() => handleEmojiSelect('😊')}>
              Add
            </button>
            <div data-testid="typing-header">{typingHeader}</div>
          </>
        );
      };
      render(<TestComponent />);
      const button = screen.getByTestId('add-emoji');
      
      fireEvent.click(button);
      fireEvent.click(button);
      expect(screen.getByTestId('typing-header')).toHaveTextContent('😊😊');
    });

    it('closes emoji picker after selecting emoji', () => {
      const TestComponent = () => {
        const { emojiPickerOpen, handleEmojiSelect, emojiPickerRef } = useCommentsBoxLogic();
        return (
          <>
            <button data-testid="select-emoji" onClick={() => handleEmojiSelect('😊')}>
              Select
            </button>
            <div data-testid="emoji-state">{emojiPickerOpen ? 'open' : 'closed'}</div>
            <div ref={emojiPickerRef} data-testid="emoji-picker" />
          </>
        );
      };
      render(<TestComponent />);
      
      expect(screen.getByTestId('emoji-state')).toHaveTextContent('closed');
      fireEvent.click(screen.getByTestId('select-emoji'));
      expect(screen.getByTestId('emoji-state')).toHaveTextContent('closed');
    });
  });

  describe('Mention Dropdown Functionality', () => {
    it('initializes with empty search', () => {
      const TestComponent = () => {
        const { search } = useCommentsBoxLogic();
        return <div data-testid="search-value">{search}</div>;
      };
      render(<TestComponent />);
      expect(screen.getByTestId('search-value')).toHaveTextContent('');
    });

    it('filters users based on search input', () => {
      const TestComponent = () => {
        const { search, setSearch, filteredUsers } = useCommentsBoxLogic(['John', 'Jane', 'Bob']);
        return (
          <>
            <input
              data-testid="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div data-testid="filtered-count">{filteredUsers.length}</div>
          </>
        );
      };
      render(<TestComponent />);
      
      expect(screen.getByTestId('filtered-count')).toHaveTextContent('3');
      
      const input = screen.getByTestId('search-input') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'o' } });
      
      expect(screen.getByTestId('filtered-count')).toHaveTextContent('2');
    });

    it('filters users case-insensitively', () => {
      const TestComponent = () => {
        const { search, setSearch, filteredUsers } = useCommentsBoxLogic(['John', 'Jane', 'Bob']);
        return (
          <>
            <input
              data-testid="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div data-testid="filtered-count">{filteredUsers.length}</div>
          </>
        );
      };
      render(<TestComponent />);
      
      const input = screen.getByTestId('search-input') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'JOHN' } });
      
      expect(screen.getByTestId('filtered-count')).toHaveTextContent('1');
    });

    it('initializes mention dropdown as closed', () => {
      const TestComponent = () => {
        const { mentionDropdownOpen } = useCommentsBoxLogic();
        return <div data-testid="mention-state">{mentionDropdownOpen ? 'open' : 'closed'}</div>;
      };
      render(<TestComponent />);
      expect(screen.getByTestId('mention-state')).toHaveTextContent('closed');
    });
  });

  describe('Typing Dropdown Functionality', () => {
    it('initializes typing dropdown as closed', () => {
      const TestComponent = () => {
        const { typingDropdownOpen } = useCommentsBoxLogic();
        return <div data-testid="typing-state">{typingDropdownOpen ? 'open' : 'closed'}</div>;
      };
      render(<TestComponent />);
      expect(screen.getByTestId('typing-state')).toHaveTextContent('closed');
    });

    it('can toggle typing dropdown', () => {
      const TestComponent = () => {
        const { typingDropdownOpen, setTypingDropdownOpen } = useCommentsBoxLogic();
        return (
          <>
            <button data-testid="toggle-typing" onClick={() => setTypingDropdownOpen(!typingDropdownOpen)}>
              Toggle
            </button>
            <div data-testid="typing-state">{typingDropdownOpen ? 'open' : 'closed'}</div>
          </>
        );
      };
      render(<TestComponent />);
      
      fireEvent.click(screen.getByTestId('toggle-typing'));
      expect(screen.getByTestId('typing-state')).toHaveTextContent('open');
    });
  });

  describe('Hover Dropdown Functionality', () => {
    it('initializes hover dropdown as closed', () => {
      const TestComponent = () => {
        const { hoverDropdownOpen } = useCommentsBoxLogic();
        return <div data-testid="hover-state">{hoverDropdownOpen ? 'open' : 'closed'}</div>;
      };
      render(<TestComponent />);
      expect(screen.getByTestId('hover-state')).toHaveTextContent('closed');
    });

    it('can toggle hover dropdown', () => {
      const TestComponent = () => {
        const { hoverDropdownOpen, setHoverDropdownOpen } = useCommentsBoxLogic();
        return (
          <>
            <button data-testid="toggle-hover" onClick={() => setHoverDropdownOpen(!hoverDropdownOpen)}>
              Toggle
            </button>
            <div data-testid="hover-state">{hoverDropdownOpen ? 'open' : 'closed'}</div>
          </>
        );
      };
      render(<TestComponent />);
      
      fireEvent.click(screen.getByTestId('toggle-hover'));
      expect(screen.getByTestId('hover-state')).toHaveTextContent('open');
    });
  });

  describe('Thread Dropdown Header Functionality', () => {
    it('initializes thread dropdown header as closed', () => {
      const TestComponent = () => {
        const { threadDropdownOpenHeader } = useCommentsBoxLogic();
        return <div data-testid="thread-header-state">{threadDropdownOpenHeader ? 'open' : 'closed'}</div>;
      };
      render(<TestComponent />);
      expect(screen.getByTestId('thread-header-state')).toHaveTextContent('closed');
    });

    it('can toggle thread dropdown header', () => {
      const TestComponent = () => {
        const { threadDropdownOpenHeader, setThreadDropdownOpenHeader } = useCommentsBoxLogic();
        return (
          <>
            <button data-testid="toggle-thread-header" onClick={() => setThreadDropdownOpenHeader(!threadDropdownOpenHeader)}>
              Toggle
            </button>
            <div data-testid="thread-header-state">{threadDropdownOpenHeader ? 'open' : 'closed'}</div>
          </>
        );
      };
      render(<TestComponent />);
      
      fireEvent.click(screen.getByTestId('toggle-thread-header'));
      expect(screen.getByTestId('thread-header-state')).toHaveTextContent('open');
    });
  });

  describe('Thread Dropdown Tools Functionality', () => {
    it('initializes thread dropdown tools as closed', () => {
      const TestComponent = () => {
        const { threadDropdownOpenTools } = useCommentsBoxLogic();
        return <div data-testid="thread-tools-state">{threadDropdownOpenTools ? 'open' : 'closed'}</div>;
      };
      render(<TestComponent />);
      expect(screen.getByTestId('thread-tools-state')).toHaveTextContent('closed');
    });

    it('can toggle thread dropdown tools', () => {
      const TestComponent = () => {
        const { threadDropdownOpenTools, setThreadDropdownOpenTools } = useCommentsBoxLogic();
        return (
          <>
            <button data-testid="toggle-thread-tools" onClick={() => setThreadDropdownOpenTools(!threadDropdownOpenTools)}>
              Toggle
            </button>
            <div data-testid="thread-tools-state">{threadDropdownOpenTools ? 'open' : 'closed'}</div>
          </>
        );
      };
      render(<TestComponent />);
      
      fireEvent.click(screen.getByTestId('toggle-thread-tools'));
      expect(screen.getByTestId('thread-tools-state')).toHaveTextContent('open');
    });
  });

  describe('Refs and Default Values', () => {
    it('provides emoji picker ref', () => {
      const TestComponent = () => {
        const { emojiPickerRef } = useCommentsBoxLogic();
        return <div ref={emojiPickerRef} data-testid="emoji-picker" />;
      };
      render(<TestComponent />);
      expect(screen.getByTestId('emoji-picker')).toBeInTheDocument();
    });

    it('provides mention button ref', () => {
      const TestComponent = () => {
        const { mentionBtnRef } = useCommentsBoxLogic();
        return <button ref={mentionBtnRef} data-testid="mention-btn">Mention</button>;
      };
      render(<TestComponent />);
      expect(screen.getByTestId('mention-btn')).toBeInTheDocument();
    });

    it('provides attach button ref', () => {
      const TestComponent = () => {
        const { attachBtnRef } = useCommentsBoxLogic();
        return <button ref={attachBtnRef} data-testid="attach-btn">Attach</button>;
      };
      render(<TestComponent />);
      expect(screen.getByTestId('attach-btn')).toBeInTheDocument();
    });

    it('provides hover more button ref', () => {
      const TestComponent = () => {
        const { hoverMoreBtnRef } = useCommentsBoxLogic();
        return <button ref={hoverMoreBtnRef} data-testid="hover-more-btn">More</button>;
      };
      render(<TestComponent />);
      expect(screen.getByTestId('hover-more-btn')).toBeInTheDocument();
    });
  });

  describe('Mention Users Integration', () => {
    it('accepts mention users array', () => {
      const TestComponent = () => {
        const { filteredUsers } = useCommentsBoxLogic(['Alice', 'Bob', 'Charlie']);
        return <div data-testid="users-count">{filteredUsers.length}</div>;
      };
      render(<TestComponent />);
      expect(screen.getByTestId('users-count')).toHaveTextContent('3');
    });

    it('handles undefined mention users', () => {
      const TestComponent = () => {
        const { filteredUsers } = useCommentsBoxLogic();
        return <div data-testid="users-count">{filteredUsers.length}</div>;
      };
      render(<TestComponent />);
      expect(screen.getByTestId('users-count')).toHaveTextContent('0');
    });

    it('filters users when search changes', () => {
      const TestComponent = () => {
        const { filteredUsers, search, setSearch } = useCommentsBoxLogic(['Alice', 'Bob', 'Andrew']);
        return (
          <>
            <input
              data-testid="search-box"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users"
            />
            {filteredUsers.map((user) => (
              <div key={user} data-testid={`user-${user}`}>{user}</div>
            ))}
          </>
        );
      };
      render(<TestComponent />);
      
      const input = screen.getByTestId('search-box') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'A' } });
      
      expect(screen.getByTestId('user-Alice')).toBeInTheDocument();
      expect(screen.getByTestId('user-Andrew')).toBeInTheDocument();
      expect(screen.queryByTestId('user-Bob')).not.toBeInTheDocument();
    });
  });
});

describe('DropdownMenu Component', () => {
  const mockOnClose = jest.fn();
  const mockOnSelect = jest.fn();
  const attachBtnRef = React.createRef<HTMLButtonElement>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('does not render when visible is false', () => {
      const { container } = render(
        <DropdownMenu visible={false} anchorRef={attachBtnRef} onClose={mockOnClose} onSelect={mockOnSelect} />
      );
      expect(container.querySelector('.rds-comments-box__attachment-dropdown-menu')).not.toBeInTheDocument();
    });

    it('renders when visible is true', () => {
      render(
        <DropdownMenu visible={true} anchorRef={attachBtnRef} onClose={mockOnClose} onSelect={mockOnSelect} />
      );
      expect(screen.getByTestId('computer-icon')).toBeInTheDocument();
    });

    it('renders all three menu items', () => {
      render(
        <DropdownMenu visible={true} anchorRef={attachBtnRef} onClose={mockOnClose} onSelect={mockOnSelect} />
      );
      expect(screen.getByText('Computer')).toBeInTheDocument();
      expect(screen.getByText('Google Drive')).toBeInTheDocument();
      expect(screen.getByText('One Drive')).toBeInTheDocument();
    });
  });

  describe('Menu Items with Icons', () => {
    it('renders computer icon', () => {
      render(
        <DropdownMenu visible={true} anchorRef={attachBtnRef} onClose={mockOnClose} onSelect={mockOnSelect} />
      );
      expect(screen.getByTestId('computer-icon')).toBeInTheDocument();
    });

    it('renders drive file icon', () => {
      render(
        <DropdownMenu visible={true} anchorRef={attachBtnRef} onClose={mockOnClose} onSelect={mockOnSelect} />
      );
      expect(screen.getByTestId('drive-file-icon')).toBeInTheDocument();
    });

    it('renders cloud icon', () => {
      render(
        <DropdownMenu visible={true} anchorRef={attachBtnRef} onClose={mockOnClose} onSelect={mockOnSelect} />
      );
      expect(screen.getByTestId('cloud-icon')).toBeInTheDocument();
    });
  });

  describe('Menu Item Selection', () => {
    it('calls onSelect and onClose when Computer item is clicked', () => {
      render(
        <DropdownMenu visible={true} anchorRef={attachBtnRef} onClose={mockOnClose} onSelect={mockOnSelect} />
      );
      const computerItem = screen.getByText('Computer').closest('.rds-comments-box__attachment-dropdown-item');
      fireEvent.click(computerItem!);
      
      expect(mockOnSelect).toHaveBeenCalledWith('Computer');
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('calls onSelect and onClose when Google Drive item is clicked', () => {
      render(
        <DropdownMenu visible={true} anchorRef={attachBtnRef} onClose={mockOnClose} onSelect={mockOnSelect} />
      );
      const googleDriveItem = screen.getByText('Google Drive').closest('.rds-comments-box__attachment-dropdown-item');
      fireEvent.click(googleDriveItem!);
      
      expect(mockOnSelect).toHaveBeenCalledWith('Google Drive');
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('calls onSelect and onClose when One Drive item is clicked', () => {
      render(
        <DropdownMenu visible={true} anchorRef={attachBtnRef} onClose={mockOnClose} onSelect={mockOnSelect} />
      );
      const oneDriveItem = screen.getByText('One Drive').closest('.rds-comments-box__attachment-dropdown-item');
      fireEvent.click(oneDriveItem!);
      
      expect(mockOnSelect).toHaveBeenCalledWith('One Drive');
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe('Custom Labels', () => {
    it('uses custom computer label', () => {
      render(
        <DropdownMenu
          visible={true}
          anchorRef={attachBtnRef}
          onClose={mockOnClose}
          onSelect={mockOnSelect}
          labels={{ computer: 'My Computer' }}
        />
      );
      expect(screen.getByText('My Computer')).toBeInTheDocument();
    });

    it('uses custom Google Drive label', () => {
      render(
        <DropdownMenu
          visible={true}
          anchorRef={attachBtnRef}
          onClose={mockOnClose}
          onSelect={mockOnSelect}
          labels={{ googleDrive: 'Google Cloud' }}
        />
      );
      expect(screen.getByText('Google Cloud')).toBeInTheDocument();
    });

    it('uses custom One Drive label', () => {
      render(
        <DropdownMenu
          visible={true}
          anchorRef={attachBtnRef}
          onClose={mockOnClose}
          onSelect={mockOnSelect}
          labels={{ oneDrive: 'Microsoft Cloud' }}
        />
      );
      expect(screen.getByText('Microsoft Cloud')).toBeInTheDocument();
    });

    it('applies fallback labels when custom labels not provided', () => {
      render(
        <DropdownMenu visible={true} anchorRef={attachBtnRef} onClose={mockOnClose} onSelect={mockOnSelect} />
      );
      expect(screen.getByText('Computer')).toBeInTheDocument();
      expect(screen.getByText('Google Drive')).toBeInTheDocument();
      expect(screen.getByText('One Drive')).toBeInTheDocument();
    });
  });

  describe('Menu Item Classes', () => {
    it('applies correct CSS class to menu items', () => {
      const { container } = render(
        <DropdownMenu visible={true} anchorRef={attachBtnRef} onClose={mockOnClose} onSelect={mockOnSelect} />
      );
      const items = container.querySelectorAll('.rds-comments-box__attachment-dropdown-item');
      expect(items.length).toBe(3);
    });

    it('applies correct CSS class to dropdown menu', () => {
      const { container } = render(
        <DropdownMenu visible={true} anchorRef={attachBtnRef} onClose={mockOnClose} onSelect={mockOnSelect} />
      );
      expect(container.querySelector('.rds-comments-box__attachment-dropdown-menu')).toBeInTheDocument();
    });

    it('applies correct CSS class to icons', () => {
      const { container } = render(
        <DropdownMenu visible={true} anchorRef={attachBtnRef} onClose={mockOnClose} onSelect={mockOnSelect} />
      );
      const icons = container.querySelectorAll('.rds-comments-box__attachment-dropdown-icon');
      expect(icons.length).toBe(3);
    });

    it('applies correct CSS class to labels', () => {
      const { container } = render(
        <DropdownMenu visible={true} anchorRef={attachBtnRef} onClose={mockOnClose} onSelect={mockOnSelect} />
      );
      const labels = container.querySelectorAll('.rds-comments-box__attachment-dropdown-label');
      expect(labels.length).toBe(3);
    });
  });

  describe('Visibility Toggle', () => {
    it('toggles visibility from false to true', () => {
      const { rerender, container } = render(
        <DropdownMenu visible={false} anchorRef={attachBtnRef} onClose={mockOnClose} onSelect={mockOnSelect} />
      );
      expect(container.querySelector('.rds-comments-box__attachment-dropdown-menu')).not.toBeInTheDocument();
      
      rerender(
        <DropdownMenu visible={true} anchorRef={attachBtnRef} onClose={mockOnClose} onSelect={mockOnSelect} />
      );
      expect(container.querySelector('.rds-comments-box__attachment-dropdown-menu')).toBeInTheDocument();
    });

    it('toggles visibility from true to false', () => {
      const { rerender, container } = render(
        <DropdownMenu visible={true} anchorRef={attachBtnRef} onClose={mockOnClose} onSelect={mockOnSelect} />
      );
      expect(container.querySelector('.rds-comments-box__attachment-dropdown-menu')).toBeInTheDocument();
      
      rerender(
        <DropdownMenu visible={false} anchorRef={attachBtnRef} onClose={mockOnClose} onSelect={mockOnSelect} />
      );
      expect(container.querySelector('.rds-comments-box__attachment-dropdown-menu')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles multiple selections', () => {
      render(
        <DropdownMenu visible={true} anchorRef={attachBtnRef} onClose={mockOnClose} onSelect={mockOnSelect} />
      );
      
      fireEvent.click(screen.getByText('Computer').closest('.rds-comments-box__attachment-dropdown-item')!);
      expect(mockOnSelect).toHaveBeenCalledWith('Computer');
      
      mockOnSelect.mockClear();
      mockOnClose.mockClear();
      
      render(
        <DropdownMenu visible={true} anchorRef={attachBtnRef} onClose={mockOnClose} onSelect={mockOnSelect} />
      );
      
      fireEvent.click(screen.getAllByText('Google Drive')[0].closest('.rds-comments-box__attachment-dropdown-item')!);
      expect(mockOnSelect).toHaveBeenCalledWith('Google Drive');
    });

    it('handles undefined labels object', () => {
      render(
        <DropdownMenu visible={true} anchorRef={attachBtnRef} onClose={mockOnClose} onSelect={mockOnSelect} labels={undefined} />
      );
      expect(screen.getByText('Computer')).toBeInTheDocument();
    });

    it('handles partial labels object', () => {
      render(
        <DropdownMenu
          visible={true}
          anchorRef={attachBtnRef}
          onClose={mockOnClose}
          onSelect={mockOnSelect}
          labels={{ computer: 'Custom Computer' }}
        />
      );
      expect(screen.getByText('Custom Computer')).toBeInTheDocument();
      expect(screen.getByText('Google Drive')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCommentBox {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('state prop', () => {
    it.each([
      ['default', 'rds-comments-box--default'],
      ['selected', 'rds-comments-box--selected'],
      ['typing', 'rds-comments-box--typing'],
      ['comment Posted', 'rds-comments-box--posted'],
      ['comment Hover', 'rds-comments-box--hover'],
      ['comment Thread', 'rds-comments-box--thread'],
    ] as const)('renders the %s state', (state, modifier) => {
      const { container } = render(<RdsCommentBox {...defaultProps} state={state} className="custom" />);
      const root = container.querySelector(`.${modifier}`);
      expect(root).toBeInTheDocument();
      expect(root).toHaveClass('custom');
    });

    it('renders the interactive composer when state is omitted', () => {
      const { container } = render(<RdsCommentBox {...defaultProps} />);
      expect(container.querySelector('.rds-comments-box--composer')).toBeInTheDocument();
    });

    it('shows hover content and toggles its actions menu', async () => {
      render(<RdsCommentBox state="comment Hover" commentHoverName="Renne Doe" hoverText="Hello" editLabel="Edit" deleteLabel="Delete" />);
      expect(screen.getByText('Renne Doe')).toBeInTheDocument();
      await userEvent.click(screen.getByRole('button', { name: 'More options' }));
      expect(screen.getByText('Edit')).toBeInTheDocument();
      await userEvent.click(screen.getByText('Delete'));
      expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    });

    it('shows the no-image text in the thread state without imgSrc', () => {
      render(<RdsCommentBox state="comment Thread" noImageText="Nothing here" score="7" />);
      expect(screen.getByText('Nothing here')).toBeInTheDocument();
      expect(screen.getByText('07')).toBeInTheDocument();
    });
  });
});
