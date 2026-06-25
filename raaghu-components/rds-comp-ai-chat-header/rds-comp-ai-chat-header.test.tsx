import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsCompAiChatHeader, { RdsCompAiChatHeaderProps, ChatHeaderSize } from './rds-comp-ai-chat-header';

// Mock SCSS
jest.mock('./rds-comp-ai-chat-header.scss', () => ({}));

// Default props for testing
const defaultProps: RdsCompAiChatHeaderProps = {
  logoUrl: 'https://example.com/logo.jpg',
  title: 'Chat Header',
  size: ChatHeaderSize.Medium,
};

describe('RdsCompAiChatHeader', () => {
  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      render(<RdsCompAiChatHeader {...defaultProps} />);
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('renders title text', () => {
      render(<RdsCompAiChatHeader {...defaultProps} />);
      expect(screen.getByText('Chat Header')).toBeInTheDocument();
    });

    it('renders logo image when logoUrl is provided', () => {
      render(<RdsCompAiChatHeader {...defaultProps} />);
      const logo = screen.getByAltText('Logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', 'https://example.com/logo.jpg');
    });

    it('does not render logo when logoUrl is not provided', () => {
      render(<RdsCompAiChatHeader title="Title Only" />);
      const logo = screen.queryByAltText('Logo');
      expect(logo).not.toBeInTheDocument();
    });

    it('has correct display name for debugging', () => {
      expect(RdsCompAiChatHeader.displayName).toBe('RdsCompAiChatHeader');
    });

    it('renders with minimum props', () => {
      render(<RdsCompAiChatHeader />);
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });
  });

  describe('Title Rendering', () => {
    it('renders custom title text', () => {
      render(
        <RdsCompAiChatHeader
          {...defaultProps}
          title="Custom Title"
        />
      );
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('renders title with special characters', () => {
      render(
        <RdsCompAiChatHeader
          {...defaultProps}
          title="Chat & Support (AI)"
        />
      );
      expect(screen.getByText('Chat & Support (AI)')).toBeInTheDocument();
    });

    it('renders title with numbers and symbols', () => {
      render(
        <RdsCompAiChatHeader
          {...defaultProps}
          title="Chat Room #1 - 24/7"
        />
      );
      expect(screen.getByText('Chat Room #1 - 24/7')).toBeInTheDocument();
    });

    it('renders very long title text', () => {
      const longTitle = 'A'.repeat(200);
      render(
        <RdsCompAiChatHeader
          {...defaultProps}
          title={longTitle}
        />
      );
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('renders empty string title', () => {
      render(
        <RdsCompAiChatHeader
          {...defaultProps}
          title=""
        />
      );
      const heading = screen.getByRole('heading');
      expect(heading).toHaveTextContent('');
    });
  });

  describe('Logo Rendering', () => {
    it('renders logo with correct src attribute', () => {
      const logoUrl = 'https://example.com/custom-logo.png';
      render(
        <RdsCompAiChatHeader
          {...defaultProps}
          logoUrl={logoUrl}
        />
      );
      const logo = screen.getByAltText('Logo');
      expect(logo).toHaveAttribute('src', logoUrl);
    });

    it('renders different logo URLs', () => {
      const { rerender } = render(
        <RdsCompAiChatHeader
          {...defaultProps}
          logoUrl="https://example.com/logo1.jpg"
        />
      );
      let logo = screen.getByAltText('Logo');
      expect(logo).toHaveAttribute('src', 'https://example.com/logo1.jpg');

      rerender(
        <RdsCompAiChatHeader
          {...defaultProps}
          logoUrl="https://example.com/logo2.jpg"
        />
      );
      logo = screen.getByAltText('Logo');
      expect(logo).toHaveAttribute('src', 'https://example.com/logo2.jpg');
    });

    it('has alt text for accessibility', () => {
      render(<RdsCompAiChatHeader {...defaultProps} />);
      const logo = screen.getByAltText('Logo');
      expect(logo).toHaveAttribute('alt', 'Logo');
    });

    it('renders logo with data URI', () => {
      const dataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      render(
        <RdsCompAiChatHeader
          {...defaultProps}
          logoUrl={dataUri}
        />
      );
      const logo = screen.getByAltText('Logo');
      expect(logo).toHaveAttribute('src', dataUri);
    });
  });

  describe('Size Variants', () => {
    it('renders with small size', () => {
      const { container } = render(
        <RdsCompAiChatHeader
          {...defaultProps}
          size={ChatHeaderSize.Small}
        />
      );
      const header = container.querySelector('.rds-comp-ai-chat-header');
      expect(header).toBeInTheDocument();
      const logo = container.querySelector('.rds-comp-ai-chat-header__logo--small');
      expect(logo).toBeInTheDocument();
      const text = container.querySelector('.rds-comp-ai-chat-header__text--small');
      expect(text).toBeInTheDocument();
    });

    it('renders with medium size', () => {
      const { container } = render(
        <RdsCompAiChatHeader
          {...defaultProps}
          size={ChatHeaderSize.Medium}
        />
      );
      const logo = container.querySelector('.rds-comp-ai-chat-header__logo--medium');
      expect(logo).toBeInTheDocument();
      const text = container.querySelector('.rds-comp-ai-chat-header__text--medium');
      expect(text).toBeInTheDocument();
    });

    it('renders with large size', () => {
      const { container } = render(
        <RdsCompAiChatHeader
          {...defaultProps}
          size={ChatHeaderSize.Large}
        />
      );
      const logo = container.querySelector('.rds-comp-ai-chat-header__logo--large');
      expect(logo).toBeInTheDocument();
      const text = container.querySelector('.rds-comp-ai-chat-header__text--large');
      expect(text).toBeInTheDocument();
    });

    it('applies size class to logo', () => {
      render(
        <RdsCompAiChatHeader
          {...defaultProps}
          size={ChatHeaderSize.Large}
        />
      );
      const logo = screen.getByAltText('Logo');
      expect(logo).toHaveClass('rds-comp-ai-chat-header__logo--large');
    });

    it('applies size class to text', () => {
      render(
        <RdsCompAiChatHeader
          {...defaultProps}
          size={ChatHeaderSize.Large}
        />
      );
      const heading = screen.getByRole('heading');
      expect(heading).toHaveClass('rds-comp-ai-chat-header__text--large');
    });

    it('renders without size defaults to no size class', () => {
      render(
        <RdsCompAiChatHeader
          {...defaultProps}
          size={undefined}
        />
      );
      const heading = screen.getByRole('heading');
      expect(heading).toBeInTheDocument();
    });

    it('switches between different sizes', () => {
      const { container, rerender } = render(
        <RdsCompAiChatHeader
          {...defaultProps}
          size={ChatHeaderSize.Small}
        />
      );
      expect(container.querySelector('.rds-comp-ai-chat-header__logo--small')).toBeInTheDocument();

      rerender(
        <RdsCompAiChatHeader
          {...defaultProps}
          size={ChatHeaderSize.Large}
        />
      );
      expect(container.querySelector('.rds-comp-ai-chat-header__logo--large')).toBeInTheDocument();
    });
  });

  describe('Props and Defaults', () => {
    it('uses default undefined values for optional props', () => {
      render(<RdsCompAiChatHeader />);
      expect(screen.getByRole('heading')).toBeInTheDocument();
      expect(screen.queryByAltText('Logo')).not.toBeInTheDocument();
    });

    it('renders with only logoUrl provided', () => {
      render(
        <RdsCompAiChatHeader
          logoUrl="https://example.com/logo.jpg"
        />
      );
      expect(screen.getByAltText('Logo')).toBeInTheDocument();
    });

    it('renders with only title provided', () => {
      render(
        <RdsCompAiChatHeader
          title="Title Only"
        />
      );
      expect(screen.getByText('Title Only')).toBeInTheDocument();
      expect(screen.queryByAltText('Logo')).not.toBeInTheDocument();
    });

    it('renders with only size provided', () => {
      const { container } = render(
        <RdsCompAiChatHeader
          size={ChatHeaderSize.Large}
        />
      );
      expect(container.querySelector('.rds-comp-ai-chat-header__text--large')).toBeInTheDocument();
    });

    it('updates when props change', () => {
      const { rerender } = render(
        <RdsCompAiChatHeader
          title="Initial Title"
          logoUrl="https://example.com/logo1.jpg"
        />
      );
      expect(screen.getByText('Initial Title')).toBeInTheDocument();

      rerender(
        <RdsCompAiChatHeader
          title="Updated Title"
          logoUrl="https://example.com/logo2.jpg"
        />
      );
      expect(screen.getByText('Updated Title')).toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it('applies base component class', () => {
      const { container } = render(<RdsCompAiChatHeader {...defaultProps} />);
      expect(container.querySelector('.rds-comp-ai-chat-header')).toBeInTheDocument();
    });

    it('applies logo base class', () => {
      const { container } = render(<RdsCompAiChatHeader {...defaultProps} />);
      expect(container.querySelector('.rds-comp-ai-chat-header__logo')).toBeInTheDocument();
    });

    it('applies text base class', () => {
      const { container } = render(<RdsCompAiChatHeader {...defaultProps} />);
      expect(container.querySelector('.rds-comp-ai-chat-header__text')).toBeInTheDocument();
    });

    it('applies combined classes to logo', () => {
      render(
        <RdsCompAiChatHeader
          {...defaultProps}
          size={ChatHeaderSize.Medium}
        />
      );
      const logo = screen.getByAltText('Logo');
      expect(logo).toHaveClass('rds-comp-ai-chat-header__logo');
      expect(logo).toHaveClass('rds-comp-ai-chat-header__logo--medium');
    });

    it('applies combined classes to text', () => {
      render(
        <RdsCompAiChatHeader
          {...defaultProps}
          size={ChatHeaderSize.Small}
        />
      );
      const heading = screen.getByRole('heading');
      expect(heading).toHaveClass('rds-comp-ai-chat-header__text');
      expect(heading).toHaveClass('rds-comp-ai-chat-header__text--small');
    });
  });

  describe('Accessibility', () => {
    it('uses h3 heading tag for semantic HTML', () => {
      render(<RdsCompAiChatHeader {...defaultProps} />);
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
    });
  
    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompAiChatHeader {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('logo has proper alt text', () => {
      render(<RdsCompAiChatHeader {...defaultProps} />);
      const logo = screen.getByAltText('Logo');
      expect(logo).toHaveAttribute('alt', 'Logo');
    });

    it('heading contains text content', () => {
      render(
        <RdsCompAiChatHeader
          {...defaultProps}
          title="Accessible Title"
        />
      );
      const heading = screen.getByRole('heading');
      expect(heading).toHaveTextContent('Accessible Title');
    });

    it('structure is semantically correct', () => {
      const { container } = render(<RdsCompAiChatHeader {...defaultProps} />);
      const header = container.querySelector('.rds-comp-ai-chat-header');
      const logo = header?.querySelector('img');
      const text = header?.querySelector('h3');
      expect(header).toBeInTheDocument();
      expect(logo).toBeInTheDocument();
      expect(text).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles very long URL', () => {
      const longUrl = 'https://example.com/' + 'a'.repeat(1000) + '.jpg';
      render(
        <RdsCompAiChatHeader
          {...defaultProps}
          logoUrl={longUrl}
        />
      );
      const logo = screen.getByAltText('Logo');
      expect(logo).toHaveAttribute('src', longUrl);
    });

    it('handles null logoUrl', () => {
      render(
        <RdsCompAiChatHeader
          {...defaultProps}
          logoUrl={null as any}
        />
      );
      expect(screen.queryByAltText('Logo')).not.toBeInTheDocument();
    });

    it('handles null title', () => {
      render(
        <RdsCompAiChatHeader
          {...defaultProps}
          title={null as any}
        />
      );
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('handles undefined size gracefully', () => {
      const { container } = render(
        <RdsCompAiChatHeader
          {...defaultProps}
          size={undefined}
        />
      );
      expect(container.querySelector('.rds-comp-ai-chat-header')).toBeInTheDocument();
    });

    it('handles empty string logoUrl', () => {
      render(
        <RdsCompAiChatHeader
          {...defaultProps}
          logoUrl=""
        />
      );
      // Empty string is falsy, so logo should not render
      expect(screen.queryByAltText('Logo')).not.toBeInTheDocument();
    });

    it('handles special characters in title', () => {
      render(
        <RdsCompAiChatHeader
          {...defaultProps}
          title="<script>alert('XSS')</script>"
        />
      );
      expect(screen.getByText("<script>alert('XSS')</script>")).toBeInTheDocument();
    });

    it('handles Unicode characters in title', () => {
      render(
        <RdsCompAiChatHeader
          {...defaultProps}
          title="Hello 世界 🌍"
        />
      );
      expect(screen.getByText("Hello 世界 🌍")).toBeInTheDocument();
    });

    it('renders multiple instances independently', () => {
      const { container } = render(
        <div>
          <RdsCompAiChatHeader title="Header 1" logoUrl="https://example.com/logo1.jpg" />
          <RdsCompAiChatHeader title="Header 2" logoUrl="https://example.com/logo2.jpg" />
        </div>
      );
      const headers = container.querySelectorAll('.rds-comp-ai-chat-header');
      expect(headers).toHaveLength(2);
    });
  });

  describe('Component Structure', () => {
    it('renders container div with correct class', () => {
      const { container } = render(<RdsCompAiChatHeader {...defaultProps} />);
      const headerDiv = container.querySelector('.rds-comp-ai-chat-header');
      expect(headerDiv).toBeInTheDocument();
      expect(headerDiv?.children.length).toBeGreaterThan(0);
    });

    it('logo appears before text in DOM', () => {
      const { container } = render(<RdsCompAiChatHeader {...defaultProps} />);
      const headerDiv = container.querySelector('.rds-comp-ai-chat-header');
      if (headerDiv) {
        const children = Array.from(headerDiv.children);
        expect(children.length).toBe(2);
        expect(children[0].tagName).toBe('IMG');
        expect(children[1].tagName).toBe('H3');
      }
    });

    it('does not render extra elements', () => {
      const { container } = render(
        <RdsCompAiChatHeader
          title="Only Title"
        />
      );
      const headerDiv = container.querySelector('.rds-comp-ai-chat-header');
      // Should have only 1 child (h3) since logoUrl is not provided
      expect(headerDiv?.children.length).toBe(1);
    });

    it('renders both logo and text when logoUrl is provided', () => {
      const { container } = render(<RdsCompAiChatHeader {...defaultProps} />);
      const headerDiv = container.querySelector('.rds-comp-ai-chat-header');
      // Should have 2 children (img and h3)
      expect(headerDiv?.children.length).toBe(2);
    });
  });

  describe('Enum Values', () => {
    it('exports ChatHeaderSize enum with correct values', () => {
      expect(ChatHeaderSize.Small).toBe('small');
      expect(ChatHeaderSize.Medium).toBe('medium');
      expect(ChatHeaderSize.Large).toBe('large');
    });

    it('renders all enum size values correctly', () => {
      const sizes = [ChatHeaderSize.Small, ChatHeaderSize.Medium, ChatHeaderSize.Large];
      sizes.forEach((size) => {
        const { container, unmount } = render(
          <RdsCompAiChatHeader
            {...defaultProps}
            size={size}
          />
        );
        expect(container.querySelector(`.rds-comp-ai-chat-header__text--${size}`)).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('Re-render Behavior', () => {
    it('maintains component state on prop changes', () => {
      const { rerender } = render(
        <RdsCompAiChatHeader
          title="Initial"
          logoUrl="https://example.com/logo1.jpg"
          size={ChatHeaderSize.Small}
        />
      );

      expect(screen.getByText('Initial')).toBeInTheDocument();

      rerender(
        <RdsCompAiChatHeader
          title="Updated"
          logoUrl="https://example.com/logo2.jpg"
          size={ChatHeaderSize.Large}
        />
      );

      expect(screen.getByText('Updated')).toBeInTheDocument();
      expect(screen.getByAltText('Logo')).toHaveAttribute('src', 'https://example.com/logo2.jpg');
    });

    it('removes logo when logoUrl changes to undefined', () => {
      const { rerender } = render(
        <RdsCompAiChatHeader
          {...defaultProps}
          logoUrl="https://example.com/logo.jpg"
        />
      );
      expect(screen.getByAltText('Logo')).toBeInTheDocument();

      rerender(
        <RdsCompAiChatHeader
          {...defaultProps}
          logoUrl={undefined}
        />
      );
      expect(screen.queryByAltText('Logo')).not.toBeInTheDocument();
    });

    it('adds logo when logoUrl changes from undefined', () => {
      const { rerender } = render(
        <RdsCompAiChatHeader
          {...defaultProps}
          logoUrl={undefined}
        />
      );
      expect(screen.queryByAltText('Logo')).not.toBeInTheDocument();

      rerender(
        <RdsCompAiChatHeader
          {...defaultProps}
          logoUrl="https://example.com/logo.jpg"
        />
      );
      expect(screen.getByAltText('Logo')).toBeInTheDocument();
    });
  });
});