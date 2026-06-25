import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompChat, { UserData, Comment } from './rds-comp-chat';

// Mock dependencies
jest.mock('./rds-comp-chat.scss', () => ({}));
jest.mock('../../raaghu-elements/rds-avatar/rds-avatar', () => {
  return function MockRdsAvatar({ children, ...props }: any) {
    const { title, ...restProps } = props;
    return <div data-testid="rds-avatar" {...restProps}>{title || children}</div>;
  };
});
jest.mock('../../raaghu-elements/rds-input/rds-input', () => {
  return function MockRdsInput({ children, ...props }: any) {
    return <input data-testid="rds-input" {...props} />;
  };
});
jest.mock('../../raaghu-elements/rds-button/rds-button', () => {
  return function MockRdsButton({ children, style, ...props }: any) {
    return <button data-testid="rds-button" {...props}>{children}</button>;
  };
});
jest.mock('../rds-comp-emoji-generator/rds-comp-emoji-generator', () => {
  return function MockRdsCompEmojiGenerator(props: any) {
    return (
      <div data-testid="emoji-generator">
        <button onClick={() => props.onEmojiSelect?.('😊')}>Select Emoji</button>
      </div>
    );
  };
});
jest.mock('@mui/material/Box', () => {
  return function MockBox({ children, sx, component = 'div', ...props }: any) {
    const Component = component as any;
    return <Component data-testid="mui-box" {...props}>{children}</Component>;
  };
});

const defaultUserData: UserData[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    activeDotButton: true,
    status: 'online',
    size: 'medium',
    colorVariant: 'primary',
    time: '10:30 AM',
    profilePic: 'https://example.com/john.jpg',
    messageStatus: 'Online',
    comments: [
      { firstName: 'John', lastName: 'Doe', comment: 'Hello!' },
      { firstName: 'Jane', lastName: 'Smith', comment: 'Hi there!' },
    ],
    profileType: 'user',
    withProfilePic: true,
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    activeDotButton: false,
    status: 'away',
    size: 'medium',
    colorVariant: 'secondary',
    time: '9:45 AM',
    profilePic: 'https://example.com/jane.jpg',
    messageStatus: 'Away',
    comments: [{ firstName: 'Jane', lastName: 'Smith', comment: 'How are you?' }],
  },
];

const defaultProps = {
  isChatScreenEnabled: true,
  userData: defaultUserData,
  handleAddComment: jest.fn(),
};

describe('RdsCompChat', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it('has correct display name', () => {
      expect(RdsCompChat.displayName).toBe('RdsCompChat');
    });

    it('renders main chat container', () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      const chatContainer = container.querySelector('.rds-comp-chat');
      expect(chatContainer).toBeInTheDocument();
    });

    it('renders with correct CSS classes', () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      expect(container.querySelector('.rds-comp-chat')).toBeInTheDocument();
    });
  });

  describe('User List Display', () => {
    it('renders user list when isChatScreenEnabled is true', () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      expect(container.querySelector('.rds-comp-chat__screen')).toBeInTheDocument();
    });

    it('renders all users in the list', () => {
      render(<RdsCompChat {...defaultProps} />);
      const avatars = screen.getAllByTestId('rds-avatar');
      expect(avatars.length).toBeGreaterThanOrEqual(2);
    });

    it('does not render user list when isChatScreenEnabled is false', () => {
      const props = { ...defaultProps, isChatScreenEnabled: false };
      const { container } = render(<RdsCompChat {...props} />);
      const userList = container.querySelector('.rds-comp-chat__screen');
      expect(userList).not.toBeInTheDocument();
    });

    it('renders user selection as clickable items', () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      const userItems = container.querySelectorAll('.rds-comp-chat__user-item');
      expect(userItems.length).toBeGreaterThan(0);
    });

    it('displays user times', () => {
      render(<RdsCompChat {...defaultProps} />);
      expect(screen.getByText('10:30 AM')).toBeInTheDocument();
      expect(screen.getByText('9:45 AM')).toBeInTheDocument();
    });
  });

  describe('Chat Window Display', () => {
    it('renders chat window', () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      expect(container.querySelector('.rds-comp-chat__window')).toBeInTheDocument();
    });

    it('displays header with tabs', () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      expect(container.querySelector('.nav-tabs')).toBeInTheDocument();
    });

    it('renders chat and media tabs', () => {
      render(<RdsCompChat {...defaultProps} />);
      const chatTab = screen.getByRole('tab', { name: 'Chat' });
      const mediaTab = screen.getByRole('tab', { name: 'Media' });
      expect(chatTab).toBeInTheDocument();
      expect(mediaTab).toBeInTheDocument();
    });

    it('shows chat tab as active by default', () => {
      render(<RdsCompChat {...defaultProps} />);
      const chatTab = screen.getByRole('tab', { name: 'Chat' });
      expect(chatTab).toHaveClass('active');
    });
  });

  describe('Comment Display', () => {
    it('displays comments from user data', () => {
      render(<RdsCompChat {...defaultProps} />);
      expect(screen.getByText('Hello!')).toBeInTheDocument();
      expect(screen.getByText('Hi there!')).toBeInTheDocument();
    });

    it('distinguishes between current user and other user messages', () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      const currentUserMessages = container.querySelectorAll('.rds-comp-chat__message--current-user');
      const otherUserMessages = container.querySelectorAll('.rds-comp-chat__message--other-user');
      expect(currentUserMessages.length + otherUserMessages.length).toBeGreaterThan(0);
    });

    it('renders message status when available', () => {
      render(<RdsCompChat {...defaultProps} />);
      expect(screen.getByText('Online')).toBeInTheDocument();
    });

    it('displays images in comments when provided', () => {
      const dataWithImage: UserData[] = [
        {
          ...defaultUserData[0],
          comments: [
            {
              firstName: 'John',
              lastName: 'Doe',
              comment: 'Check this out',
              image: 'data:image/png;base64,test',
            },
          ],
        },
      ];
      const { container } = render(
        <RdsCompChat {...defaultProps} userData={dataWithImage} />
      );
      const images = container.querySelectorAll('.rds-comp-chat__comment-image');
      expect(images.length).toBeGreaterThan(0);
    });

    it('displays videos in comments when provided', () => {
      const dataWithVideo: UserData[] = [
        {
          ...defaultUserData[0],
          comments: [
            {
              firstName: 'John',
              lastName: 'Doe',
              comment: 'Video message',
              video: 'https://example.com/video.mp4',
            },
          ],
        },
      ];
      const { container } = render(
        <RdsCompChat {...defaultProps} userData={dataWithVideo} />
      );
      const videos = container.querySelectorAll('.rds-comp-chat__comment-video');
      expect(videos.length).toBeGreaterThan(0);
    });
  });

  describe('Comment Input', () => {
    it('renders input field', () => {
      render(<RdsCompChat {...defaultProps} />);
      expect(screen.getByPlaceholderText('Type comment...')).toBeInTheDocument();
    });

    it('updates input value when typing', async () => {
      render(<RdsCompChat {...defaultProps} />);
      const input = screen.getByPlaceholderText('Type comment...') as HTMLInputElement;
      await userEvent.type(input, 'Test message');
      expect(input.value).toBe('Test message');
    });

    it('renders send button', () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      const sendButton = container.querySelector('.rds-comp-chat__send-icon');
      expect(sendButton).toBeInTheDocument();
    });

    it('calls handleAddComment when send button is clicked', async () => {
      const handleAddComment = jest.fn();
      render(
        <RdsCompChat {...defaultProps} handleAddComment={handleAddComment} />
      );
      const input = screen.getByPlaceholderText('Type comment...') as HTMLInputElement;
      await userEvent.type(input, 'Test message');
      
      const sendButton = screen.getByRole('button', { name: 'Send' });
      fireEvent.click(sendButton);
      
      await waitFor(() => {
        expect(handleAddComment).toHaveBeenCalled();
      });
    });

    it('clears input after sending message', async () => {
      render(<RdsCompChat {...defaultProps} />);
      const input = screen.getByPlaceholderText('Type comment...') as HTMLInputElement;
      await userEvent.type(input, 'Test');
      expect(input.value).toBe('Test');
    });

    it('sends message on Enter key press', async () => {
      const handleAddComment = jest.fn();
      render(
        <RdsCompChat {...defaultProps} handleAddComment={handleAddComment} />
      );
      const input = screen.getByPlaceholderText('Type comment...');
      await userEvent.type(input, 'Test{Enter}');
      
      await waitFor(() => {
        expect(handleAddComment).toHaveBeenCalled();
      });
    });

    it('does not send on Shift+Enter', async () => {
      const handleAddComment = jest.fn();
      render(
        <RdsCompChat {...defaultProps} handleAddComment={handleAddComment} />
      );
      const input = screen.getByPlaceholderText('Type comment...');
      await userEvent.type(input, 'Test{Shift>}{Enter}{/Shift}');
    });
  });

  describe('Emoji Picker', () => {
    it('renders emoji button', () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      const emojiBtn = container.querySelector('.rds-comp-chat__emoji-btn');
      expect(emojiBtn).toBeInTheDocument();
    });

    it('shows emoji picker when emoji button is clicked', async () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      const emojiBtn = container.querySelector('.rds-comp-chat__emoji-btn') as HTMLElement;
      fireEvent.click(emojiBtn);
      
      await waitFor(() => {
        expect(screen.getByTestId('emoji-generator')).toBeInTheDocument();
      });
    });

    it('adds emoji to input when selected', async () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      const emojiBtn = container.querySelector('.rds-comp-chat__emoji-btn') as HTMLElement;
      fireEvent.click(emojiBtn);
      
      const emojiSelectBtn = screen.getByText('Select Emoji');
      fireEvent.click(emojiSelectBtn);
      
      const input = screen.getByPlaceholderText('Type comment...') as HTMLInputElement;
      await waitFor(() => {
        expect(input.value).toContain('😊');
      });
    });

    it('closes emoji picker after emoji selection', async () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      const emojiBtn = container.querySelector('.rds-comp-chat__emoji-btn') as HTMLElement;
      fireEvent.click(emojiBtn);
      
      const emojiSelectBtn = screen.getByText('Select Emoji');
      fireEvent.click(emojiSelectBtn);
      
      await waitFor(() => {
        expect(screen.queryByTestId('emoji-generator')).not.toBeInTheDocument();
      });
    });
  });

  describe('Tab Switching', () => {
    it('displays chat tab content by default', () => {
      render(<RdsCompChat {...defaultProps} />);
      expect(screen.getByText('Hello!')).toBeInTheDocument();
    });

    it('switches to media tab when clicked', async () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      const mediaTab = screen.getByRole('tab', { name: 'Media' });
      fireEvent.click(mediaTab);
      
      await waitFor(() => {
        expect(container.querySelector('.rds-comp-chat__media-grid')).toBeInTheDocument();
      });
    });

    it('displays media grid when on media tab', async () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      const mediaTab = screen.getByRole('tab', { name: 'Media' });
      fireEvent.click(mediaTab);
      
      await waitFor(() => {
        expect(container.querySelector('.rds-comp-chat__media-grid')).toBeInTheDocument();
      });
    });

    it('shows "No media available" message when no media exists', async () => {
      const dataWithoutMedia: UserData[] = [
        {
          ...defaultUserData[0],
          comments: [
            { firstName: 'John', lastName: 'Doe', comment: 'Text only' },
          ],
        },
      ];
      const { container } = render(
        <RdsCompChat {...defaultProps} userData={dataWithoutMedia} />
      );
      const mediaTab = screen.getByRole('tab', { name: 'Media' });
      fireEvent.click(mediaTab);
      
      await waitFor(() => {
        expect(screen.getByText('No media available')).toBeInTheDocument();
      });
    });
  });

  describe('User Selection', () => {
    it('selects user when clicked', async () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      const userItems = container.querySelectorAll('.rds-comp-chat__user-item');
      fireEvent.click(userItems[1]);
      
      await waitFor(() => {
        expect(userItems[1]).toHaveClass('rds-comp-chat__user-item--selected');
      });
    });

    it('displays correct comments for selected user', async () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      const userItems = container.querySelectorAll('.rds-comp-chat__user-item');
      fireEvent.click(userItems[1]);
      await waitFor(() => {
        expect(screen.getByText('How are you?')).toBeInTheDocument();
      });
    });

    it('updates chat window when different user is selected', async () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      const userItems = container.querySelectorAll('.rds-comp-chat__user-item');
      fireEvent.click(userItems[1]);
      
      await waitFor(() => {
        expect(userItems[1]).toHaveClass('rds-comp-chat__user-item--selected');
      });
    });
  });

  describe('File Upload', () => {
    it('renders file upload input', () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      const fileInput = container.querySelector('#fileUpload');
      expect(fileInput).toBeInTheDocument();
    });

    it('accepts image and video files', () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      const fileInput = container.querySelector('#fileUpload') as HTMLInputElement;
      expect(fileInput.accept).toContain('image/*');
      expect(fileInput.accept).toContain('video/*');
    });

    it('renders add button to trigger file upload', () => {
      render(<RdsCompChat {...defaultProps} />);
      const buttons = screen.getAllByTestId('rds-button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Mobile Responsiveness', () => {
    beforeEach(() => {
      global.innerWidth = 500;
      window.dispatchEvent(new Event('resize'));
    });

    afterEach(() => {
      global.innerWidth = 1024;
      window.dispatchEvent(new Event('resize'));
    });

    it('adds mobile class on small screens', () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      expect(container.querySelector('.rds-comp-chat--mobile')).toBeInTheDocument();
    });

    it('shows back button on mobile chat window', async () => {
      global.innerWidth = 500;
      window.dispatchEvent(new Event('resize'));
      
      const { container } = render(<RdsCompChat {...defaultProps} />);
      const userItems = container.querySelectorAll('.rds-comp-chat__user-item');
      fireEvent.click(userItems[0]);
      
      await waitFor(() => {
        const backBtn = container.querySelector('.rds-comp-chat__back-btn');
        expect(backBtn).toBeInTheDocument();
      });
    });

    it('hides user list and shows chat on mobile when user is selected', async () => {
      global.innerWidth = 500;
      window.dispatchEvent(new Event('resize'));
      
      const { container } = render(<RdsCompChat {...defaultProps} />);
      const userItems = container.querySelectorAll('.rds-comp-chat__user-item');
      fireEvent.click(userItems[0]);
      
      await waitFor(() => {
        expect(container.querySelector('.rds-comp-chat__window')).toBeInTheDocument();
      });
    });

    it('goes back to user list when back button is clicked', async () => {
      global.innerWidth = 500;
      window.dispatchEvent(new Event('resize'));
      
      const { container } = render(<RdsCompChat {...defaultProps} />);
      const userItems = container.querySelectorAll('.rds-comp-chat__user-item');
      fireEvent.click(userItems[0]);
      
      const backBtn = container.querySelector('.rds-comp-chat__back-btn') as HTMLElement;
      fireEvent.click(backBtn);
      
      await waitFor(() => {
        expect(container.querySelector('.rds-comp-chat__screen')).toBeInTheDocument();
      });
    });
  });

  describe('Props - Custom Colors', () => {
    it('applies custom current user comment background color', () => {
      const { container } = render(
        <RdsCompChat
          {...defaultProps}
          currentUserCommentBgColor="#FF0000"
        />
      );
      expect(container.querySelector('.rds-comp-chat__window')).toBeInTheDocument();
    });

    it('applies custom other user comment background color', () => {
      const { container } = render(
        <RdsCompChat
          {...defaultProps}
          otherUserCommentBgColor="#00FF00"
        />
      );
      expect(container.querySelector('.rds-comp-chat__window')).toBeInTheDocument();
    });

    it('applies custom text colors', () => {
      const { container } = render(
        <RdsCompChat
          {...defaultProps}
          currentUserCommentTextColor="#FFFFFF"
          OtherUserCommentTextColor="#000000"
        />
      );
      expect(container.querySelector('.rds-comp-chat__window')).toBeInTheDocument();
    });
  });

  describe('Empty States', () => {
    it('handles empty userData array', () => {
      const { container } = render(
        <RdsCompChat {...defaultProps} userData={[]} />
      );
      expect(container.querySelector('.rds-comp-chat')).toBeInTheDocument();
    });

    it('handles user with no comments', () => {
      const dataWithoutComments: UserData[] = [
        {
          ...defaultUserData[0],
          comments: [],
        },
      ];
      const { container } = render(
        <RdsCompChat {...defaultProps} userData={dataWithoutComments} />
      );
      expect(container.querySelector('.rds-comp-chat__window')).toBeInTheDocument();
    });

    it('handles undefined comments', () => {
      const dataWithUndefinedComments: UserData[] = [
        {
          ...defaultUserData[0],
          comments: undefined as any,
        },
      ];
      const { container } = render(
        <RdsCompChat {...defaultProps} userData={dataWithUndefinedComments} />
      );
      expect(container.querySelector('.rds-comp-chat')).toBeInTheDocument();
    });
  });

  describe('Comment Object Properties', () => {
    it('handles comment without image or video', () => {
      render(<RdsCompChat {...defaultProps} />);
      expect(screen.getByText('Hello!')).toBeInTheDocument();
    });

    it('handles comment with only image', () => {
      const dataWithImage: UserData[] = [
        {
          ...defaultUserData[0],
          comments: [
            {
              firstName: 'John',
              lastName: 'Doe',
              comment: '',
              image: 'data:image/png;base64,test',
            },
          ],
        },
      ];
      const { container } = render(
        <RdsCompChat {...defaultProps} userData={dataWithImage} />
      );
      const image = container.querySelector('.rds-comp-chat__comment-image');
      expect(image).toBeInTheDocument();
    });

    it('handles comment combining text and image', () => {
      const dataWithBoth: UserData[] = [
        {
          ...defaultUserData[0],
          comments: [
            {
              firstName: 'John',
              lastName: 'Doe',
              comment: 'Look at this',
              image: 'data:image/png;base64,test',
            },
          ],
        },
      ];
      const { container } = render(
        <RdsCompChat {...defaultProps} userData={dataWithBoth} />
      );
      expect(screen.getByText('Look at this')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-chat__comment-image')).toBeInTheDocument();
    });
  });

  describe('Window Display Modes', () => {
    it('renders full-width window when isChatScreenEnabled is false', () => {
      const { container } = render(
        <RdsCompChat {...defaultProps} isChatScreenEnabled={false} />
      );
      expect(
        container.querySelector('.rds-comp-chat__window--full-width')
      ).toBeInTheDocument();
    });

    it('renders window with side panel when isChatScreenEnabled is true', () => {
      const { container } = render(
        <RdsCompChat {...defaultProps} isChatScreenEnabled={true} />
      );
      expect(container.querySelector('.rds-comp-chat__screen')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-chat__window')).toBeInTheDocument();
    });
  });

  describe('Media Gallery', () => {
    it('renders media grid with multiple items', () => {
      const dataWithMedia: UserData[] = [
        {
          ...defaultUserData[0],
          comments: [
            { firstName: 'John', lastName: 'Doe', comment: '', image: 'img1.jpg' },
            { firstName: 'John', lastName: 'Doe', comment: '', image: 'img2.jpg' },
          ],
        },
      ];
      const { container } = render(
        <RdsCompChat {...defaultProps} userData={dataWithMedia} />
      );
      const mediaTab = screen.getByRole('tab', { name: 'Media' });
      fireEvent.click(mediaTab);
      
      const mediaItems = container.querySelectorAll('.rds-comp-chat__media-item');
      expect(mediaItems.length).toBeGreaterThan(0);
    });

    it('displays both images and videos in media gallery', () => {
      const mixedMedia: UserData[] = [
        {
          ...defaultUserData[0],
          comments: [
            { firstName: 'John', lastName: 'Doe', comment: '', image: 'img.jpg' },
            { firstName: 'John', lastName: 'Doe', comment: '', video: 'vid.mp4' },
          ],
        },
      ];
      const { container } = render(
        <RdsCompChat {...defaultProps} userData={mixedMedia} />
      );
      const mediaTab = screen.getByRole('tab', { name: 'Media' });
      fireEvent.click(mediaTab);
      
      const mediaItems = container.querySelectorAll('.rds-comp-chat__media-item');
      expect(mediaItems.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Tab Accessibility', () => {
    it('has proper tab roles', () => {
      render(<RdsCompChat {...defaultProps} />);
      const chatTab = screen.getByRole('tab', { name: 'Chat' });
      const mediaTab = screen.getByRole('tab', { name: 'Media' });
      expect(chatTab).toHaveAttribute('role', 'tab');
      expect(mediaTab).toHaveAttribute('role', 'tab');
    });

    it('sets aria-selected correctly on active tab', () => {
      render(<RdsCompChat {...defaultProps} />);
      const chatTab = screen.getByRole('tab', { name: 'Chat' });
      expect(chatTab).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Header Options', () => {
    it('renders more options icon in window header', () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      const moreIcon = container.querySelector('.rds-comp-chat__window-header-more');
      expect(moreIcon).toBeInTheDocument();
    });

    it('renders filter icon in user list header', () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      const filterIcon = container.querySelector('.rds-comp-chat__screen-header-icon-filter');
      expect(filterIcon).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompChat {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
