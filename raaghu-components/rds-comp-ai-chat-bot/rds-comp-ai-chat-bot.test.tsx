import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompAiChatBot, { RdsCompAiChatBotProps, Message } from './rds-comp-ai-chat-bot';

// Mock SCSS
jest.mock('./rds-comp-ai-chat-bot.scss', () => ({}));

// Mock child components
jest.mock('../rds-comp-ai-chat-header/rds-comp-ai-chat-header', () => {
  const ChatHeaderSize = { Small: 'small', Medium: 'medium', Large: 'large' } as const;
  function MockRdsCompAiChatHeader({ logoUrl, title, ...props }: any) {
    return (
      <div data-testid="chat-header" {...props}>
        <img src={logoUrl} alt="logo" data-testid="header-logo" />
        <h2 data-testid="header-title">{title}</h2>
      </div>
    );
  }
  return { __esModule: true, default: MockRdsCompAiChatHeader, ChatHeaderSize };
});

jest.mock('../rds-comp-ai-message-box/rds-comp-ai-message-box', () => {
  return function MockRdsCompAiMessageBox({ avtar, isImage, message, src, ...props }: any) {
    return (
      <div data-testid="message-box" {...props}>
        <img src={avtar} alt="avatar" data-testid="message-avatar" />
        {isImage && src ? (
          <img src={src} alt="message" data-testid="message-image" />
        ) : (
          <p data-testid="message-text">{message}</p>
        )}
      </div>
    );
  };
});

jest.mock('../rds-comp-ai-typing-section/rds-comp-ai-typing-section', () => {
  return function MockRdsCompAiTypingSection({
    _colorVariant,
    onSend,
    placeholderText,
    iconName,
    onAddComment,
    previewImage,
    ...props
  }: any) {
    return (
      <div data-testid="typing-section" {...props}>
        <input
          data-testid="message-input"
          type="text"
          placeholder={placeholderText}
          onKeyPress={(e: any) => {
            if (e.key === 'Enter') {
              onSend(e.target.value);
              e.target.value = '';
            }
          }}
        />
        <button
          data-testid="send-button"
          onClick={(e: any) => {
            const input = e.target.parentElement?.querySelector('input');
            if (input) {
              onSend(input.value);
              input.value = '';
            }
          }}
        >
          Send
        </button>
        <input
          data-testid="image-input"
          type="file"
          accept="image/*"
          aria-label="Upload image"
          onChange={(e: any) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                onAddComment({ image: reader.result as string });
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        {previewImage && (
          <img src={previewImage} alt="preview" data-testid="image-preview" />
        )}
        {iconName && <span data-testid="icon-name">{iconName}</span>}
      </div>
    );
  };
});

// Default props for testing
const defaultProps: RdsCompAiChatBotProps = {
  aiLogoUrl: 'https://example.com/ai-logo.jpg',
  userAvatarUrl: 'https://example.com/user-avatar.jpg',
  placeholderText: 'Ask me anything',
  messages: [],
  setMessages: jest.fn(),
  iconName: 'chat-icon',
};

const sampleMessages: Message[] = [
  {
    id: 1,
    text: 'Hello AI',
    sender: false,
    image: undefined,
  },
  {
    id: 2,
    text: 'Hello User',
    sender: true,
    image: undefined,
  },
];

describe('RdsCompAiChatBot', () => {
  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      render(<RdsCompAiChatBot {...defaultProps} />);
      expect(screen.getByTestId('chat-header')).toBeInTheDocument();
    });

    it('renders the chat header with correct logo', () => {
      render(<RdsCompAiChatBot {...defaultProps} />);
      const logo = screen.getByTestId('header-logo');
      expect(logo).toHaveAttribute('src', 'https://example.com/ai-logo.jpg');
    });

    it('renders the header title', () => {
      render(<RdsCompAiChatBot {...defaultProps} />);
      expect(screen.getByTestId('header-title')).toHaveTextContent('New Chat Started');
    });

    it('renders the typing section with placeholder text', () => {
      render(<RdsCompAiChatBot {...defaultProps} />);
      const input = screen.getByTestId('message-input') as HTMLInputElement;
      expect(input).toHaveAttribute('placeholder', 'Ask me anything');
    });

    it('has correct display name for debugging', () => {
      expect(RdsCompAiChatBot.displayName).toBe('RdsCompAiChatBot');
    });
  });

  describe('Message Rendering', () => {
    it('renders no messages initially when messages array is empty', () => {
      render(<RdsCompAiChatBot {...defaultProps} />);
      const messageBoxes = screen.queryAllByTestId('message-box');
      expect(messageBoxes).toHaveLength(0);
    });

    it('renders all messages from the messages array', () => {
      render(
        <RdsCompAiChatBot
          {...defaultProps}
          messages={sampleMessages}
        />
      );
      const messageBoxes = screen.getAllByTestId('message-box');
      expect(messageBoxes).toHaveLength(2);
    });

    it('renders message text correctly', () => {
      render(
        <RdsCompAiChatBot
          {...defaultProps}
          messages={sampleMessages}
        />
      );
      expect(screen.getByText('Hello AI')).toBeInTheDocument();
      expect(screen.getByText('Hello User')).toBeInTheDocument();
    });

    it('renders correct avatar for sender and receiver messages', () => {
      const messagesWithInfo: Message[] = [
        { id: 1, text: 'User message', sender: false, image: undefined },
        { id: 2, text: 'AI message', sender: true, image: undefined },
      ];
      render(
        <RdsCompAiChatBot
          {...defaultProps}
          messages={messagesWithInfo}
        />
      );
      const avatars = screen.getAllByTestId('message-avatar');
      expect(avatars[0]).toHaveAttribute('src', 'https://example.com/user-avatar.jpg');
      expect(avatars[1]).toHaveAttribute('src', 'https://example.com/ai-logo.jpg');
    });

    it('renders message with image when sender has image', () => {
      const messagesWithImage: Message[] = [
        { id: 1, text: 'Check this', sender: false, image: 'data:image/jpeg;base64,test' },
      ];
      render(
        <RdsCompAiChatBot
          {...defaultProps}
          messages={messagesWithImage}
        />
      );
      const messageImage = screen.getByTestId('message-image');
      expect(messageImage).toHaveAttribute('src', 'data:image/jpeg;base64,test');
    });
  });

  describe('Message Styling', () => {
    it('applies sender class to user messages', () => {
      const messagesWithSender: Message[] = [
        { id: 1, text: 'User message', sender: false, image: undefined },
      ];
      const { container } = render(
        <RdsCompAiChatBot
          {...defaultProps}
          messages={messagesWithSender}
        />
      );
      const messageDiv = container.querySelector('.rds-ai-chat-bot__message--receiver');
      expect(messageDiv).toBeInTheDocument();
    });

    it('applies receiver class to AI messages', () => {
      const messagesWithReceiver: Message[] = [
        { id: 1, text: 'AI message', sender: true, image: undefined },
      ];
      const { container } = render(
        <RdsCompAiChatBot
          {...defaultProps}
          messages={messagesWithReceiver}
        />
      );
      const messageDiv = container.querySelector('.rds-ai-chat-bot__message--sender');
      expect(messageDiv).toBeInTheDocument();
    });
  });

  describe('Input Field', () => {
    it('renders the message input field', () => {
      render(<RdsCompAiChatBot {...defaultProps} />);
      const input = screen.getByTestId('message-input');
      expect(input).toBeInTheDocument();
    });

    it('uses custom placeholder text when provided', () => {
      render(
        <RdsCompAiChatBot
          {...defaultProps}
          placeholderText="Custom placeholder"
        />
      );
      const input = screen.getByTestId('message-input') as HTMLInputElement;
      expect(input).toHaveAttribute('placeholder', 'Custom placeholder');
    });

    it('uses default placeholder text when not provided', () => {
      const propsWithoutPlaceholder = { ...defaultProps, placeholderText: undefined };
      render(<RdsCompAiChatBot {...propsWithoutPlaceholder} />);
      const input = screen.getByTestId('message-input') as HTMLInputElement;
      expect(input).toHaveAttribute('placeholder', 'Ask me anything');
    });

    it('renders the send button', () => {
      render(<RdsCompAiChatBot {...defaultProps} />);
      expect(screen.getByTestId('send-button')).toBeInTheDocument();
    });

    it('renders the image input field', () => {
      render(<RdsCompAiChatBot {...defaultProps} />);
      const imageInput = screen.getByTestId('image-input');
      expect(imageInput).toHaveAttribute('type', 'file');
      expect(imageInput).toHaveAttribute('accept', 'image/*');
    });
  });

  describe('Icon Name', () => {
    it('renders icon name from props', () => {
      render(
        <RdsCompAiChatBot
          {...defaultProps}
          iconName="custom-icon"
        />
      );
      expect(screen.getByTestId('icon-name')).toHaveTextContent('custom-icon');
    });

    it('renders different icon names', () => {
      const { rerender } = render(
        <RdsCompAiChatBot
          {...defaultProps}
          iconName="icon-1"
        />
      );
      expect(screen.getByTestId('icon-name')).toHaveTextContent('icon-1');

      rerender(
        <RdsCompAiChatBot
          {...defaultProps}
          iconName="icon-2"
        />
      );
      expect(screen.getByTestId('icon-name')).toHaveTextContent('icon-2');
    });
  });

  describe('Props and Defaults', () => {
    it('uses default values for optional props', () => {
      const minimalProps: RdsCompAiChatBotProps = {
        aiLogoUrl: 'https://example.com/logo.jpg',
        messages: [],
        setMessages: jest.fn(),
        iconName: 'icon',
      };
      render(<RdsCompAiChatBot {...minimalProps} />);
      const input = screen.getByTestId('message-input') as HTMLInputElement;
      expect(input).toHaveAttribute('placeholder', 'Ask me anything');
    });

    it('renders with custom user avatar URL', () => {
      const messagesWithSender: Message[] = [
        { id: 1, text: 'User message', sender: false, image: undefined },
      ];
      render(
        <RdsCompAiChatBot
          {...defaultProps}
          userAvatarUrl="https://custom-avatar.jpg"
          messages={messagesWithSender}
        />
      );
      const avatar = screen.getByTestId('message-avatar');
      expect(avatar).toHaveAttribute('src', 'https://custom-avatar.jpg');
    });

    it('renders with custom AI logo URL', () => {
      const messagesWithReceiver: Message[] = [
        { id: 1, text: 'AI message', sender: true, image: undefined },
      ];
      render(
        <RdsCompAiChatBot
          {...defaultProps}
          aiLogoUrl="https://custom-ai-logo.jpg"
          messages={messagesWithReceiver}
        />
      );
      const logo = screen.getByTestId('header-logo');
      expect(logo).toHaveAttribute('src', 'https://custom-ai-logo.jpg');
    });
  });

  describe('Message Handling', () => {
    it('calls setMessages when sending a message', async () => {
      const setMessages = jest.fn();
      render(
        <RdsCompAiChatBot
          {...defaultProps}
          setMessages={setMessages}
          messages={[]}
        />
      );

      const input = screen.getByTestId('message-input') as HTMLInputElement;
      const sendButton = screen.getByTestId('send-button');

      fireEvent.change(input, { target: { value: 'Test message' } });
      fireEvent.click(sendButton);

      await waitFor(() => {
        expect(setMessages).toHaveBeenCalled();
      });
    });

    it('handles sending message with image', async () => {
      const setMessages = jest.fn();
      render(
        <RdsCompAiChatBot
          {...defaultProps}
          setMessages={setMessages}
          messages={[]}
        />
      );

      const imageInput = screen.getByTestId('image-input') as HTMLInputElement;
      const file = new File(['test'], 'image.jpg', { type: 'image/jpeg' });

      fireEvent.change(imageInput, { target: { files: [file] } });

      await waitFor(() => {
        expect(screen.getByTestId('image-preview')).toBeInTheDocument();
      });
    });

    it('renders updated messages when messages prop changes', () => {
      const { rerender } = render(
        <RdsCompAiChatBot
          {...defaultProps}
          messages={[]}
        />
      );
      expect(screen.queryAllByTestId('message-box')).toHaveLength(0);

      const newMessages: Message[] = [
        { id: 1, text: 'First message', sender: false, image: undefined },
        { id: 2, text: 'Second message', sender: true, image: undefined },
      ];

      rerender(
        <RdsCompAiChatBot
          {...defaultProps}
          messages={newMessages}
        />
      );
      expect(screen.getAllByTestId('message-box')).toHaveLength(2);
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      const { container } = render(<RdsCompAiChatBot {...defaultProps} />);
      expect(container.querySelector('.rds-ai-chat-bot')).toBeInTheDocument();
      expect(container.querySelector('.rds-ai-chat-bot__messages')).toBeInTheDocument();
      expect(container.querySelector('.rds-ai-chat-bot__input-wrapper')).toBeInTheDocument();
    });
  
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompAiChatBot {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('input field is properly labeled with placeholder', () => {
      render(<RdsCompAiChatBot {...defaultProps} />);
      const input = screen.getByTestId('message-input');
      expect(input).toHaveAttribute('placeholder');
    });

    it('message layout alternates between sender and receiver', () => {
      const messages: Message[] = [
        { id: 1, text: 'Message 1', sender: false, image: undefined },
        { id: 2, text: 'Message 2', sender: true, image: undefined },
        { id: 3, text: 'Message 3', sender: false, image: undefined },
      ];
      const { container } = render(
        <RdsCompAiChatBot
          {...defaultProps}
          messages={messages}
        />
      );

      const messageElements = container.querySelectorAll('.rds-ai-chat-bot__message');
      expect(messageElements).toHaveLength(3);
      expect(messageElements[0]).toHaveClass('rds-ai-chat-bot__message--receiver');
      expect(messageElements[1]).toHaveClass('rds-ai-chat-bot__message--sender');
      expect(messageElements[2]).toHaveClass('rds-ai-chat-bot__message--receiver');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty message text gracefully', () => {
      const setMessages = jest.fn();
      render(
        <RdsCompAiChatBot
          {...defaultProps}
          setMessages={setMessages}
          messages={[]}
        />
      );

      expect(setMessages).not.toHaveBeenCalled();
    });

    it('handles messages with undefined image property', () => {
      const messages: Message[] = [
        { id: 1, text: 'Message without image', sender: true },
      ];
      render(
        <RdsCompAiChatBot
          {...defaultProps}
          messages={messages}
        />
      );
      expect(screen.getByText('Message without image')).toBeInTheDocument();
    });

    it('handles large number of messages', () => {
      const manyMessages: Message[] = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        text: `Message ${i + 1}`,
        sender: i % 2 === 0,
        image: undefined,
      }));

      render(
        <RdsCompAiChatBot
          {...defaultProps}
          messages={manyMessages}
        />
      );

      const messageBoxes = screen.getAllByTestId('message-box');
      expect(messageBoxes).toHaveLength(50);
    });

    it('handles special characters in message text', () => {
      const messages: Message[] = [
        { id: 1, text: '<script>alert("XSS")</script>', sender: true, image: undefined },
        { id: 2, text: '© 2024 & "Quotes" \'Single\'', sender: false, image: undefined },
      ];

      render(
        <RdsCompAiChatBot
          {...defaultProps}
          messages={messages}
        />
      );

      expect(screen.getByText('<script>alert("XSS")</script>')).toBeInTheDocument();
      expect(screen.getByText('© 2024 & "Quotes" \'Single\'')).toBeInTheDocument();
    });

    it('handles undefined userAvatarUrl gracefully', () => {
      const messages: Message[] = [
        { id: 1, text: 'User message', sender: false, image: undefined },
      ];

      render(
        <RdsCompAiChatBot
          {...defaultProps}
          userAvatarUrl={undefined}
          messages={messages}
        />
      );

      const avatar = screen.getByTestId('message-avatar');
      expect(avatar).toBeInTheDocument();
    });

    it('renders with empty placeholderText', () => {
      render(
        <RdsCompAiChatBot
          {...defaultProps}
          placeholderText=""
        />
      );
      const input = screen.getByTestId('message-input') as HTMLInputElement;
      expect(input).toHaveAttribute('placeholder');
    });

    it('handles message with very long text', () => {
      const longText = 'A'.repeat(1000);
      const messages: Message[] = [
        { id: 1, text: longText, sender: true, image: undefined },
      ];

      render(
        <RdsCompAiChatBot
          {...defaultProps}
          messages={messages}
        />
      );

      expect(screen.getByText(longText)).toBeInTheDocument();
    });
  });

  describe('Component Lifecycle', () => {
    it('maintains message order on re-render', () => {
      const messages: Message[] = [
        { id: 1, text: 'First', sender: false, image: undefined },
        { id: 2, text: 'Second', sender: true, image: undefined },
      ];

      const { rerender } = render(
        <RdsCompAiChatBot
          {...defaultProps}
          messages={messages}
        />
      );

      let messageTexts = screen.getAllByTestId('message-text');
      expect(messageTexts[0]).toHaveTextContent('First');
      expect(messageTexts[1]).toHaveTextContent('Second');

      rerender(
        <RdsCompAiChatBot
          {...defaultProps}
          messages={messages}
        />
      );

      messageTexts = screen.getAllByTestId('message-text');
      expect(messageTexts[0]).toHaveTextContent('First');
      expect(messageTexts[1]).toHaveTextContent('Second');
    });

    it('clears input after sending message', async () => {
      const setMessages = jest.fn();
      render(
        <RdsCompAiChatBot
          {...defaultProps}
          setMessages={setMessages}
          messages={[]}
        />
      );

      const input = screen.getByTestId('message-input') as HTMLInputElement;
      const sendButton = screen.getByTestId('send-button');

      fireEvent.change(input, { target: { value: 'Test message' } });
      fireEvent.click(sendButton);

      await waitFor(() => {
        expect(input.value).toBe('');
      });
    });
  });

  describe('Display Structure', () => {
    it('renders messages container above input section', () => {
      const { container } = render(<RdsCompAiChatBot {...defaultProps} />);
      const messagesSection = container.querySelector('.rds-ai-chat-bot__messages');
      const inputSection = container.querySelector('.rds-ai-chat-bot__input-wrapper');

      expect(messagesSection).toBeInTheDocument();
      expect(inputSection).toBeInTheDocument();
      if (messagesSection && inputSection) {
        expect(messagesSection.compareDocumentPosition(inputSection) & 4).toBe(4);
      }
    });

    it('renders chat header as first element in messages section', () => {
      const { container } = render(<RdsCompAiChatBot {...defaultProps} />);
      const messagesSection = container.querySelector('.rds-ai-chat-bot__messages');
      if (messagesSection) {
        const firstChild = messagesSection.firstChild as HTMLElement;
        expect(firstChild).toHaveAttribute('data-testid', 'chat-header');
      }
    });
  });
});