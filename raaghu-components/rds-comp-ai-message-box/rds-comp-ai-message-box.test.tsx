import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompAiMessageBox, { RdsCompAiMessageBoxProps } from './rds-comp-ai-message-box';

// Mock SCSS
jest.mock('./rds-comp-ai-message-box.scss', () => ({}));

// Mock RdsAvatar component
jest.mock('../../raaghu-elements/rds-avatar/rds-avatar', () => {
  return function MockRdsAvatar(props: any) {
    return (
      <div
        data-testid="rds-avatar"
        data-title={props.title}
        data-subtext={props.subText}
        data-src={props.src}
        data-show-name={props.showName}
        data-display-style={props.displayStyle}
      >
        Avatar: {props.title}
      </div>
    );
  };
});

// Default props for testing
const defaultProps: RdsCompAiMessageBoxProps = {
  message: 'Test message',
  isImage: false,
};

describe('RdsCompAiMessageBox', () => {
  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = render(<RdsCompAiMessageBox {...defaultProps} />);
      expect(container.querySelector('.rds-comp-ai-message-box')).toBeInTheDocument();
    });

    it('renders with correct display name for debugging', () => {
      expect(RdsCompAiMessageBox.displayName).toBe('RdsCompAiMessageBox');
    });

    it('renders main container with correct class', () => {
      const { container } = render(<RdsCompAiMessageBox {...defaultProps} />);
      const mainContainer = container.querySelector('.rds-comp-ai-message-box');
      expect(mainContainer).toHaveClass('rds-comp-ai-message-box');
    });

    it('renders with no props provided', () => {
      const { container } = render(<RdsCompAiMessageBox />);
      expect(container.querySelector('.rds-comp-ai-message-box')).toBeInTheDocument();
    });
  });

  describe('Avatar Rendering', () => {
    it('renders RdsAvatar component', () => {
      render(<RdsCompAiMessageBox {...defaultProps} />);
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toBeInTheDocument();
    });

    it('passes correct title to avatar', () => {
      render(<RdsCompAiMessageBox {...defaultProps} />);
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-title', 'Jane Doe');
    });

    it('passes message as subText to avatar', () => {
      render(<RdsCompAiMessageBox message="Hello World" />);
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-subtext', 'Hello World');
    });

    it('passes default avatar URL when no avatar prop provided', () => {
      render(<RdsCompAiMessageBox {...defaultProps} />);
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute(
        'data-src',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      );
    });

    it('uses avatar prop when provided', () => {
      const avatarUrl = 'https://example.com/avatar.jpg';
      render(<RdsCompAiMessageBox {...defaultProps} avatar={avatarUrl} />);
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-src', avatarUrl);
    });

    it('prefers avatar prop over avtar prop', () => {
      const avatarUrl = 'https://example.com/avatar-new.jpg';
      const avtarUrl = 'https://example.com/avtar-old.jpg';
      render(<RdsCompAiMessageBox avatar={avatarUrl} avtar={avtarUrl} />);
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-src', avatarUrl);
    });

    it('uses avtar prop when avatar not provided', () => {
      const avtarUrl = 'https://example.com/avtar.jpg';
      render(<RdsCompAiMessageBox avtar={avtarUrl} />);
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-src', avtarUrl);
    });

    it('passes showName as false to avatar', () => {
      render(<RdsCompAiMessageBox {...defaultProps} />);
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-show-name', 'false');
    });

    it('passes displayStyle "with-name" to avatar', () => {
      render(<RdsCompAiMessageBox {...defaultProps} />);
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-display-style', 'with-name');
    });
  });

  describe('Message Rendering', () => {
    it('renders message in avatar subText', () => {
      render(<RdsCompAiMessageBox message="Test Message" />);
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-subtext', 'Test Message');
    });

    it('renders undefined message when not provided', () => {
      render(<RdsCompAiMessageBox />);
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar.getAttribute('data-subtext')).toBeNull();
    });

    it('renders empty string message when provided', () => {
      render(<RdsCompAiMessageBox message="" />);
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-subtext', '');
    });

    it('renders very long message', () => {
      const longMessage = 'a'.repeat(500);
      render(<RdsCompAiMessageBox message={longMessage} />);
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-subtext', longMessage);
    });

    it('renders message with special characters', () => {
      const specialMessage = 'Hello! @#$%^&*() <script>alert("xss")</script>';
      render(<RdsCompAiMessageBox message={specialMessage} />);
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-subtext', specialMessage);
    });

    it('renders message with emojis', () => {
      const emojiMessage = 'Hello 👋 World 🌍';
      render(<RdsCompAiMessageBox message={emojiMessage} />);
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-subtext', emojiMessage);
    });
  });

  describe('Image Rendering', () => {
    it('does not render image when isImage is false', () => {
      const { container } = render(<RdsCompAiMessageBox isImage={false} />);
      const imageWrapper = container.querySelector('.rds-comp-ai-message-box__image-wrapper');
      expect(imageWrapper).not.toBeInTheDocument();
    });

    it('renders image when isImage is true', () => {
      const { container } = render(<RdsCompAiMessageBox isImage={true} />);
      const imageWrapper = container.querySelector('.rds-comp-ai-message-box__image-wrapper');
      expect(imageWrapper).toBeInTheDocument();
    });

    it('renders image element with correct class when isImage is true', () => {
      const { container } = render(<RdsCompAiMessageBox isImage={true} />);
      const image = container.querySelector('.rds-comp-ai-message-box__image');
      expect(image).toBeInTheDocument();
      expect(image).toHaveClass('rds-comp-ai-message-box__image');
    });

    it('uses default image URL when src not provided and isImage is true', () => {
      const { container } = render(<RdsCompAiMessageBox isImage={true} />);
      const image = container.querySelector(
        '.rds-comp-ai-message-box__image'
      ) as HTMLImageElement;
      expect(image).toHaveAttribute(
        'src',
        'https://via.placeholder.com/480x320.png?text=Image+placeholder'
      );
    });

    it('uses custom src when provided and isImage is true', () => {
      const customSrc = 'https://example.com/custom-image.jpg';
      const { container } = render(
        <RdsCompAiMessageBox isImage={true} src={customSrc} />
      );
      const image = container.querySelector(
        '.rds-comp-ai-message-box__image'
      ) as HTMLImageElement;
      expect(image).toHaveAttribute('src', customSrc);
    });

    it('renders image with alt text', () => {
      const { container } = render(<RdsCompAiMessageBox isImage={true} />);
      const image = container.querySelector(
        '.rds-comp-ai-message-box__image'
      ) as HTMLImageElement;
      expect(image).toHaveAttribute('alt', 'message image');
    });

    it('does not render image when isImage is undefined', () => {
      const { container } = render(<RdsCompAiMessageBox />);
      const imageWrapper = container.querySelector('.rds-comp-ai-message-box__image-wrapper');
      expect(imageWrapper).not.toBeInTheDocument();
    });
  });

  describe('Props and Defaults', () => {
    it('renders with minimum props', () => {
      const { container } = render(<RdsCompAiMessageBox message="Test" />);
      expect(container.querySelector('.rds-comp-ai-message-box')).toBeInTheDocument();
    });

    it('renders with all props provided', () => {
      const { container } = render(
        <RdsCompAiMessageBox
          isImage={true}
          message="Test message"
          src="https://example.com/image.jpg"
          avatar="https://example.com/avatar.jpg"
          avtar="https://example.com/old-avatar.jpg"
        />
      );
      expect(container.querySelector('.rds-comp-ai-message-box')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-ai-message-box__image')).toBeInTheDocument();
    });

    it('updates when props change', () => {
      const { rerender, container } = render(
        <RdsCompAiMessageBox isImage={false} message="First message" />
      );
      let imageWrapper = container.querySelector('.rds-comp-ai-message-box__image-wrapper');
      expect(imageWrapper).not.toBeInTheDocument();

      rerender(<RdsCompAiMessageBox isImage={true} message="Second message" />);
      imageWrapper = container.querySelector('.rds-comp-ai-message-box__image-wrapper');
      expect(imageWrapper).toBeInTheDocument();
    });

    it('updates message on prop change', () => {
      const { rerender } = render(
        <RdsCompAiMessageBox message="First message" />
      );
      let avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-subtext', 'First message');

      rerender(<RdsCompAiMessageBox message="Second message" />);
      avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-subtext', 'Second message');
    });

    it('updates avatar URL on prop change', () => {
      const { rerender } = render(
        <RdsCompAiMessageBox avatar="https://example.com/avatar1.jpg" />
      );
      let avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-src', 'https://example.com/avatar1.jpg');

      rerender(<RdsCompAiMessageBox avatar="https://example.com/avatar2.jpg" />);
      avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-src', 'https://example.com/avatar2.jpg');
    });
  });

  describe('Container Structure', () => {
    it('renders nested containers with correct classes', () => {
      const { container } = render(<RdsCompAiMessageBox {...defaultProps} />);
      const outerContainer = container.querySelector('.rds-comp-ai-message-box');
      expect(outerContainer).toBeInTheDocument();

      const innerContainer = container.querySelector('.rds-comp-ai-message-box__container');
      expect(innerContainer).toBeInTheDocument();

      const row = container.querySelector('.rds-comp-ai-message-box__row');
      expect(row).toBeInTheDocument();
    });

    it('renders image wrapper inside container', () => {
      const { container } = render(<RdsCompAiMessageBox isImage={true} />);
      const mainContainer = container.querySelector('.rds-comp-ai-message-box');
      const innerContainer = mainContainer?.querySelector('.rds-comp-ai-message-box__container');
      const imageWrapper = innerContainer?.querySelector(
        '.rds-comp-ai-message-box__image-wrapper'
      );
      expect(imageWrapper).toBeInTheDocument();
    });

    it('renders avatar inside row', () => {
      const { container } = render(<RdsCompAiMessageBox {...defaultProps} />);
      const row = container.querySelector('.rds-comp-ai-message-box__row');
      const avatar = row?.querySelector('[data-testid="rds-avatar"]');
      expect(avatar).toBeInTheDocument();
    });
  });

  describe('Multiple Instances', () => {
    it('renders multiple message boxes independently', () => {
      const { container } = render(
        <div>
          <RdsCompAiMessageBox message="Message 1" />
          <RdsCompAiMessageBox message="Message 2" />
        </div>
      );
      const messageBoxes = container.querySelectorAll('.rds-comp-ai-message-box');
      expect(messageBoxes).toHaveLength(2);
    });

    it('each message box has independent content', () => {
      render(
        <div>
          <RdsCompAiMessageBox message="First message" isImage={false} />
          <RdsCompAiMessageBox message="Second message" isImage={true} />
        </div>
      );
      const avatars = screen.getAllByTestId('rds-avatar');
      expect(avatars).toHaveLength(2);
      expect(avatars[0]).toHaveAttribute('data-subtext', 'First message');
      expect(avatars[1]).toHaveAttribute('data-subtext', 'Second message');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined for all props', () => {
      const { container } = render(<RdsCompAiMessageBox />);
      expect(container.querySelector('.rds-comp-ai-message-box')).toBeInTheDocument();
    });

    it('handles empty string avatar URL', () => {
      render(<RdsCompAiMessageBox avatar="" />);
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-src', '');
    });

    it('handles empty string message', () => {
      render(<RdsCompAiMessageBox message="" />);
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-subtext', '');
    });

    it('handles empty string src', () => {
      const { container } = render(
        <RdsCompAiMessageBox isImage={true} src="" />
      );
      const image = container.querySelector(
        '.rds-comp-ai-message-box__image'
      ) as HTMLImageElement;
      expect(image).toHaveAttribute('src', '');
    });

    it('handles very long avatar URL', () => {
      const longUrl = 'https://example.com/' + 'a'.repeat(500) + '.jpg';
      render(<RdsCompAiMessageBox avatar={longUrl} />);
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-src', longUrl);
    });

    it('handles URL with query parameters', () => {
      const urlWithParams = 'https://example.com/image.jpg?size=large&format=webp';
      const { container } = render(<RdsCompAiMessageBox isImage={true} src={urlWithParams} />);
      const image = container.querySelector('.rds-comp-ai-message-box__image') as HTMLImageElement;
      expect(image).toHaveAttribute('src', urlWithParams);
    });

    it('handles null-like strings', () => {
      const { container } = render(
        <RdsCompAiMessageBox message="null" isImage={true} src="undefined" />
      );
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-subtext', 'null');
      expect(container.querySelector('.rds-comp-ai-message-box__image')).toBeInTheDocument();
    });

    it('handles Unicode characters in message', () => {
      const unicodeMessage = '你好世界 مرحبا بالعالم שלום עולם';
      render(<RdsCompAiMessageBox message={unicodeMessage} />);
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-subtext', unicodeMessage);
    });
  });

  describe('Re-render Behavior', () => {
    it('maintains component structure on re-render', () => {
      const { rerender, container } = render(
        <RdsCompAiMessageBox message="Test" isImage={false} />
      );
      let messageBox = container.querySelector('.rds-comp-ai-message-box');
      expect(messageBox).toBeInTheDocument();

      rerender(<RdsCompAiMessageBox message="Test" isImage={false} />);
      messageBox = container.querySelector('.rds-comp-ai-message-box');
      expect(messageBox).toBeInTheDocument();
    });

    it('toggles image visibility on re-render', () => {
      const { rerender, container } = render(
        <RdsCompAiMessageBox isImage={false} />
      );
      let imageWrapper = container.querySelector('.rds-comp-ai-message-box__image-wrapper');
      expect(imageWrapper).not.toBeInTheDocument();

      rerender(<RdsCompAiMessageBox isImage={true} />);
      imageWrapper = container.querySelector('.rds-comp-ai-message-box__image-wrapper');
      expect(imageWrapper).toBeInTheDocument();

      rerender(<RdsCompAiMessageBox isImage={false} />);
      imageWrapper = container.querySelector('.rds-comp-ai-message-box__image-wrapper');
      expect(imageWrapper).not.toBeInTheDocument();
    });

    it('updates all props on re-render', () => {
      const { rerender } = render(
        <RdsCompAiMessageBox
          message="Old message"
          avatar="https://example.com/old.jpg"
          isImage={false}
        />
      );
      let avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-subtext', 'Old message');
      expect(avatar).toHaveAttribute('data-src', 'https://example.com/old.jpg');

      rerender(
        <RdsCompAiMessageBox
          message="New message"
          avatar="https://example.com/new.jpg"
          isImage={true}
        />
      );
      avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toHaveAttribute('data-subtext', 'New message');
      expect(avatar).toHaveAttribute('data-src', 'https://example.com/new.jpg');
    });
  });

  describe('Accessibility', () => {
    it('renders image with descriptive alt text', () => {
      const { container } = render(<RdsCompAiMessageBox isImage={true} />);
      const image = container.querySelector('.rds-comp-ai-message-box__image') as HTMLImageElement;
      expect(image.alt).toBe('message image');
    });

    it('renders avatar with alt text from props', () => {
      render(<RdsCompAiMessageBox {...defaultProps} />);
      const avatar = screen.getByTestId('rds-avatar');
      expect(avatar).toBeInTheDocument();
    });

    it('maintains semantic HTML structure', () => {
      const { container } = render(<RdsCompAiMessageBox isImage={true} message="Test" />);
      const divs = container.querySelectorAll('div');
      expect(divs.length).toBeGreaterThan(0);
    });
  });

  describe('CSS Classes', () => {
    it('applies all required CSS classes', () => {
      const { container } = render(
        <RdsCompAiMessageBox isImage={true} message="Test" />
      );
      expect(container.querySelector('.rds-comp-ai-message-box')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-ai-message-box__container')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-ai-message-box__row')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-ai-message-box__image-wrapper')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-ai-message-box__image')).toBeInTheDocument();
    });

    it('does not render image wrapper classes when isImage is false', () => {
      const { container } = render(<RdsCompAiMessageBox isImage={false} />);
      expect(
        container.querySelector('.rds-comp-ai-message-box__image-wrapper')
      ).not.toBeInTheDocument();
    });
  });
});
