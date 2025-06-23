import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsAiChatBot, { Message } from '../src/rds-comp-ai-chat-bot/rds-comp-ai-chat-bot';

// Mock child components
jest.mock('../src/rds-elements', () => ({
  RdsChatHeader: ({ logoUrl, title }: { logoUrl: string, title: string }) => (
    <div data-testid="rds-chat-header">
      <img src={logoUrl} alt="AI Logo" data-testid="ai-logo" />
      <h2 data-testid="chat-title">{title}</h2>
    </div>
  )
}));

jest.mock('../src/rds-comp-message-box', () => {
  return ({ avtar, isImage, message, src }: { avtar: string, isImage: boolean, message: string, src?: string }) => (
    <div data-testid="message-box">
      <img src={avtar} alt="Avatar" data-testid="avatar" />
      <p data-testid="message-text">{message}</p>
      {isImage && src && <img src={src} alt="Message Image" data-testid="message-image" />}
    </div>
  );
});

jest.mock('../src/rds-comp-typing-section/rds-comp-typing-section', () => {
  return ({ 
    colorVariant, 
    onSend, 
    placeholderText,
    icon_name,
    onAddComment,
    previewImage
  }: { 
    colorVariant: string,
    onSend: (text: string, image?: string) => void,
    placeholderText: string,
    icon_name: string,
    onAddComment: (comment: any) => void,
    previewImage?: string
  }) => (
    <div data-testid="typing-section">
      <input 
        data-testid="message-input" 
        placeholder={placeholderText}
        onChange={(e) => e.target.value}
      />
      <button 
        data-testid="send-button"
        onClick={() => onSend('Test message')}
      >
        Send
      </button>
      {previewImage && (
        <img src={previewImage} alt="Preview" data-testid="preview-image" />
      )}
    </div>
  );
});

describe('RdsAiChatBot Component', () => {
  const mockProps = {
    aiLogoUrl: 'https://example.com/ai-logo.png',
    userAvatarUrl: 'https://example.com/user-avatar.png',
    placeholderText: 'Type a message...',
    messages: [
      {
        id: 1,
        text: 'Hello, how can I help you today?',
        sender: true,
      },
      {
        id: 2,
        text: 'I need information about your services.',
        sender: false,
      },
    ] as Message[],
    setMessages: jest.fn(),
    icon_name: 'paper-plane',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial messages', () => {
    render(<RdsAiChatBot {...mockProps} />);
    
    // Check if the header is rendered
    expect(screen.getByTestId('rds-chat-header')).toBeInTheDocument();
    expect(screen.getByTestId('ai-logo')).toBeInTheDocument();
    expect(screen.getByTestId('chat-title')).toHaveTextContent('New Chat Started');
    
    // Check if all messages are rendered
    const messageBoxes = screen.getAllByTestId('message-box');
    expect(messageBoxes).toHaveLength(mockProps.messages.length);
    
    // Check if typing section is rendered
    expect(screen.getByTestId('typing-section')).toBeInTheDocument();
    expect(screen.getByTestId('message-input')).toHaveAttribute('placeholder', mockProps.placeholderText);
  });

  it('adds a new message when send button is clicked', () => {
    render(<RdsAiChatBot {...mockProps} />);
    
    // Click the send button
    fireEvent.click(screen.getByTestId('send-button'));
    
    // Verify that setMessages was called with the updated messages array
    expect(mockProps.setMessages).toHaveBeenCalledTimes(1);
    expect(mockProps.setMessages).toHaveBeenCalledWith([
      ...mockProps.messages,
      {
        id: mockProps.messages.length + 1,
        text: 'Test message',
        sender: false,
      },
    ]);
  });

  it('renders messages with the correct sender avatars', () => {
    render(<RdsAiChatBot {...mockProps} />);
    
    const avatars = screen.getAllByTestId('avatar');
    
    // First message is from AI
    expect(avatars[0]).toHaveAttribute('src', mockProps.aiLogoUrl);
    
    // Second message is from user
    expect(avatars[1]).toHaveAttribute('src', mockProps.userAvatarUrl);
  });

  it('uses default placeholder text when none is provided', () => {
    const propsWithoutPlaceholder = {
      ...mockProps,
      placeholderText: undefined,
    };
    
    render(<RdsAiChatBot {...propsWithoutPlaceholder} />);
    
    expect(screen.getByTestId('message-input')).toHaveAttribute('placeholder', 'Ask me anything');
  });
});