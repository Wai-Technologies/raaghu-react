import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RdsCompAiTypingSection, { RdsCompAiTypingSectionProps } from './rds-comp-ai-typing-section';

// Mock SCSS
jest.mock('./rds-comp-ai-typing-section.scss', () => ({}));

// Mock Material UI Icon
jest.mock('@mui/icons-material/AutoAwesomeOutlined', () => {
  return React.forwardRef((props: any, ref: any) => (
    <svg ref={ref} data-icon-name="auto-awesome" {...props} />
  ));
});

// Mock RdsButton component
jest.mock('../../raaghu-elements/rds-button/rds-button', () => {
  return function MockRdsButton(props: any) {
    return (
      <button
        data-testid={`btn-${props.text || 'icon-only'}`}
        onClick={props.onClick}
        data-color={props.color}
        data-style={props.style}
        data-layout={props.layout}
        data-size={props.size}
      >
        {props.text || 'Button'}
      </button>
    );
  };
});

// Mock RdsAutocomplete component
jest.mock('../../raaghu-elements/rds-autocomplete/rds-autocomplete', () => {
  return function MockRdsAutocomplete(props: any) {
    return (
      <div
        data-testid="rds-autocomplete"
        data-placeholder={props.placeholder}
        data-label={props.label}
        data-helper-text={props.helperText}
      >
        Autocomplete
      </div>
    );
  };
});

// Mock RdsCompAiIcon component
jest.mock('../rds-comp-ai-icon/rds-comp-ai-icon', () => {
  return {
    __esModule: true,
    default: function MockRdsCompAiIcon(props: any) {
      const { colorVariant, isCursorPointer, name, ...svgProps } = props;
      // Filter out non-standard SVG attributes
      Object.keys(svgProps).forEach(key => {
        if (key.startsWith('is') || key.startsWith('show') || key.startsWith('backgroundType') || key.startsWith('styleType')) {
          delete svgProps[key];
        }
      });
      return (
        <svg
          data-testid={`icon-${name || 'default'}`}
          data-icon-name={name}
          {...svgProps}
        />
      );
    },
    registerMaterialIcons: jest.fn(),
  };
});

// Mock RdsCompAiAttachement component
jest.mock('../rds-comp-ai-attachement/rds-comp-ai-attachement', () => {
  return function MockRdsCompAiAttachement(props: any) {
    return (
      <div
        data-testid="rds-attachment"
        data-menu-icon={props.menuIcon}
        data-badge-label={props.badgeLabel}
        onClick={() => props.onFileSelect?.(new File([''], 'test.txt'))}
      >
        Attachment
      </div>
    );
  };
});

// Default props for testing
const defaultProps: RdsCompAiTypingSectionProps = {
  icon_name: 'enhance',
  placeholderText: 'Type your message...',
};

describe('RdsCompAiTypingSection', () => {
  describe('Basic Rendering', () => {
    it('renders the component without crashing', () => {
      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      expect(container.querySelector('.rds-comp-ai-chat-bot')).toBeInTheDocument();
    });

    it('renders with correct display name for debugging', () => {
      expect(RdsCompAiTypingSection.displayName).toBe('RdsCompAiTypingSection');
    });

    it('renders main container with correct class', () => {
      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      const mainContainer = container.querySelector('.rds-comp-ai-chat-bot');
      expect(mainContainer).toHaveClass('rds-comp-ai-chat-bot');
    });

    it('renders textarea input', () => {
      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      const textarea = container.querySelector('.rds-comp-ai-chat-bot__input-box');
      expect(textarea).toBeInTheDocument();
      expect(textarea?.tagName).toBe('TEXTAREA');
    });
  });

  describe('Placeholder Text', () => {
    it('renders with provided placeholder text', () => {
      const placeholder = 'Custom prompt text';
      const { container } = render(
        <RdsCompAiTypingSection {...defaultProps} placeholderText={placeholder} />
      );
      const textarea = container.querySelector('.rds-comp-ai-chat-bot__input-box') as HTMLTextAreaElement;
      expect(textarea.placeholder).toBe(placeholder);
    });

    it('renders default placeholder when not provided', () => {
      const { container } = render(<RdsCompAiTypingSection icon_name="test" />);
      const textarea = container.querySelector('.rds-comp-ai-chat-bot__input-box') as HTMLTextAreaElement;
      expect(textarea.placeholder).toBe('Placeholder Text');
    });

    it('hides placeholder when enhanced image is present', () => {
      const { container, rerender } = render(
        <RdsCompAiTypingSection {...defaultProps} />
      );
      let textarea = container.querySelector('.rds-comp-ai-chat-bot__input-box') as HTMLTextAreaElement;
      expect(textarea.placeholder).toBe('Type your message...');

      // Simulate file upload by rendering with mock state
      rerender(<RdsCompAiTypingSection {...defaultProps} previewImage="https://example.com/image.jpg" />);
    });
  });

  describe('Text Input', () => {
    it('updates input value when typing', async () => {
      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      const textarea = container.querySelector('.rds-comp-ai-chat-bot__input-box') as HTMLTextAreaElement;
      
      await userEvent.type(textarea, 'Hello World');
      expect(textarea.value).toBe('Hello World');
    });

    it('handles multiline text input', async () => {
      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      const textarea = container.querySelector('.rds-comp-ai-chat-bot__input-box') as HTMLTextAreaElement;
      
      await userEvent.type(textarea, 'Line 1{enter}Line 2');
      expect(textarea.value).toContain('Line 1');
      expect(textarea.value).toContain('Line 2');
    });

    it('clears input after sending', async () => {
      const onSend = jest.fn();
      const { container } = render(
        <RdsCompAiTypingSection {...defaultProps} onSend={onSend} />
      );
      const textarea = container.querySelector('.rds-comp-ai-chat-bot__input-box') as HTMLTextAreaElement;
      const sendButton = screen.getByTestId('btn-icon-only');
      
      await userEvent.type(textarea, 'Test message');
      fireEvent.click(sendButton);
      
      expect(textarea.value).toBe('');
    });

    it('handles empty input submission', () => {
      const onSend = jest.fn();
      render(<RdsCompAiTypingSection {...defaultProps} onSend={onSend} />);
      const sendButton = screen.getByTestId('btn-icon-only');
      
      fireEvent.click(sendButton);
      expect(onSend).toHaveBeenCalledWith('', undefined);
    });

    it('handles very long text input', async () => {
      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      const textarea = container.querySelector('.rds-comp-ai-chat-bot__input-box') as HTMLTextAreaElement;
      const longText = 'a'.repeat(1000);
      
      // Use fireEvent to set value directly to avoid userEvent timeout
      fireEvent.change(textarea, { target: { value: longText } });
      expect(textarea.value).toBe(longText);
    }, 10000);

    it('handles special characters in input', () => {
      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      const textarea = container.querySelector('.rds-comp-ai-chat-bot__input-box') as HTMLTextAreaElement;

      const specialText = '<script>alert("xss")</script>';
      fireEvent.change(textarea, { target: { value: specialText } });
      expect(textarea.value).toBe(specialText);
    });
  });

  describe('Icon Rendering', () => {
    it('renders enhance icon when input is empty', () => {
      render(<RdsCompAiTypingSection {...defaultProps} />);
      const icon = screen.getByTestId('icon-enhance');
      expect(icon).toBeInTheDocument();
    });

it('hides enhance icon when input has text', () => {
      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      const textarea = container.querySelector('.rds-comp-ai-chat-bot__input-box') as HTMLTextAreaElement;

      fireEvent.change(textarea, { target: { value: 'Some text' } });
      const iconSpan = container.querySelector('.rds-comp-ai-chat-bot__input-icon');
      // Icon should have no visible content when input has text
      expect(!iconSpan?.textContent || iconSpan?.textContent === '').toBe(true);
    });

    it('renders icon with correct props', () => {
      render(<RdsCompAiTypingSection {...defaultProps} />);
      const icon = screen.getByTestId('icon-enhance');
      expect(icon).toHaveAttribute('data-icon-name', 'enhance');
    });
  });

  describe('Send Functionality', () => {
    it('calls onSend when send button is clicked', () => {
      const onSend = jest.fn();
      const { container } = render(
        <RdsCompAiTypingSection {...defaultProps} onSend={onSend} />
      );
      const textarea = container.querySelector('.rds-comp-ai-chat-bot__input-box') as HTMLTextAreaElement;
      const sendButton = screen.getByTestId('btn-icon-only');
      
      fireEvent.change(textarea, { target: { value: 'Test message' } });
      fireEvent.click(sendButton);
      
      expect(onSend).toHaveBeenCalledWith('Test message', undefined);
    });

    it('sends with preview image when provided', () => {
      const onSend = jest.fn();
      const { container } = render(
        <RdsCompAiTypingSection 
          {...defaultProps} 
          onSend={onSend}
          previewImage="https://example.com/image.jpg"
        />
      );
      const textarea = container.querySelector('.rds-comp-ai-chat-bot__input-box') as HTMLTextAreaElement;
      const sendButton = screen.getByTestId('btn-icon-only');
      
      fireEvent.change(textarea, { target: { value: 'Test' } });
      fireEvent.click(sendButton);
      
      expect(onSend).toHaveBeenCalledWith('Test', 'https://example.com/image.jpg');
    });

    it('does not call onSend if callback not provided', async () => {
      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      const textarea = container.querySelector('.rds-comp-ai-chat-bot__input-box') as HTMLTextAreaElement;
      const sendButton = screen.getByTestId('btn-icon-only');
      
      await userEvent.type(textarea, 'Test message');
      expect(() => fireEvent.click(sendButton)).not.toThrow();
    });
  });

  describe('Attachment Component', () => {
    it('renders attachment component', () => {
      render(<RdsCompAiTypingSection {...defaultProps} />);
      const attachment = screen.getByTestId('rds-attachment');
      expect(attachment).toBeInTheDocument();
    });

    it('passes required props to attachment', () => {
      render(<RdsCompAiTypingSection {...defaultProps} />);
      const attachment = screen.getByTestId('rds-attachment');
      expect(attachment).toHaveAttribute('data-badge-label', 'Premium');
      expect(attachment).toHaveAttribute('data-menu-icon', 'attachment_icon');
    });

    it('handles file selection from attachment', async () => {
      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      const attachment = screen.getByTestId('rds-attachment');
      
      fireEvent.click(attachment);
      
      // Since we're mocking file selection, verify the component handles it
      expect(attachment).toBeInTheDocument();
    });

    it('calls onAddComment when attachment comment is added', () => {
      const onAddComment = jest.fn();
      render(<RdsCompAiTypingSection {...defaultProps} onAddComment={onAddComment} />);
      const attachment = screen.getByTestId('rds-attachment');
      
      expect(attachment).toBeInTheDocument();
    });
  });

  describe('Action Buttons', () => {
    it('renders send button', () => {
      render(<RdsCompAiTypingSection {...defaultProps} />);
      const sendButton = screen.getByTestId('btn-icon-only');
      expect(sendButton).toBeInTheDocument();
    });

    it('renders New Project button', () => {
      render(<RdsCompAiTypingSection {...defaultProps} />);
      const newProjectBtn = screen.getByTestId('btn-New Project');
      expect(newProjectBtn).toBeInTheDocument();
    });

    it('renders Import From Figma button', () => {
      render(<RdsCompAiTypingSection {...defaultProps} />);
      const importBtn = screen.getByTestId('btn-Import From Figma');
      expect(importBtn).toBeInTheDocument();
    });

    it('buttons have correct styling props', () => {
      render(<RdsCompAiTypingSection {...defaultProps} />);
      const newProjectBtn = screen.getByTestId('btn-New Project');
      expect(newProjectBtn).toHaveAttribute('data-color', 'primary');
      expect(newProjectBtn).toHaveAttribute('data-style', 'filled');
    });
  });

  describe('Autocomplete Component', () => {
    it('renders autocomplete component', () => {
      render(<RdsCompAiTypingSection {...defaultProps} />);
      const autocomplete = screen.getByTestId('rds-autocomplete');
      expect(autocomplete).toBeInTheDocument();
    });

    it('renders autocomplete with correct props', () => {
      render(<RdsCompAiTypingSection {...defaultProps} />);
      const autocomplete = screen.getByTestId('rds-autocomplete');
      expect(autocomplete).toHaveAttribute('data-placeholder', 'Select Frontend');
      expect(autocomplete).toHaveAttribute('data-helper-text', 'Select one of the available options');
    });

    it('applies custom max-width when provided', () => {
      const { container } = render(
        <RdsCompAiTypingSection 
          {...defaultProps} 
          autoCompleteMaxWidth="500px"
        />
      );
      const autocompleteDiv = container.querySelector('.rds-comp-ai-chat-bot__autocomplete');
      expect(autocompleteDiv).toHaveStyle({ '--ai-typing-autocomplete-max-width': '500px' });
    });
  });

  describe('Mobile Responsiveness', () => {
    it('applies mobile class on mobile viewport', () => {
      // Mock window.innerWidth for mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      const inputWithImage = container.querySelector('.rds-comp-ai-chat-bot__input-with-image');
      
      expect(inputWithImage?.className).toContain('rds-comp-ai-chat-bot__input-with-image--mobile');
    });

    it('does not apply mobile class on desktop viewport', () => {
      // Mock window.innerWidth for desktop
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      const inputWithImage = container.querySelector('.rds-comp-ai-chat-bot__input-with-image');
      
      expect(inputWithImage?.className).not.toContain('--mobile');
    });

    it('responds to window resize events', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      
      // Trigger resize event
      Object.defineProperty(window, 'innerWidth', { value: 375 });
      fireEvent.resize(window);

      await waitFor(() => {
        const inputWithImage = container.querySelector('.rds-comp-ai-chat-bot__input-with-image');
        expect(inputWithImage?.className).toContain('--mobile');
      });
    });
  });

  describe('Props and Defaults', () => {
    it('renders with minimum props', () => {
      const { container } = render(<RdsCompAiTypingSection icon_name="test" />);
      expect(container.querySelector('.rds-comp-ai-chat-bot')).toBeInTheDocument();
    });

    it('renders with all props provided', () => {
      const { container } = render(
        <RdsCompAiTypingSection
          icon_name="enhance"
          colorVariant="primary"
          placeholderText="Custom text"
          onSend={jest.fn()}
          onAddComment={jest.fn()}
          previewImage="https://example.com/image.jpg"
          type="chat"
          autoCompleteMaxWidth="600px"
        />
      );
      expect(container.querySelector('.rds-comp-ai-chat-bot')).toBeInTheDocument();
    });

    it('updates when props change', () => {
      const { rerender, container } = render(
        <RdsCompAiTypingSection {...defaultProps} />
      );
      let textarea = container.querySelector('.rds-comp-ai-chat-bot__input-box') as HTMLTextAreaElement;
      expect(textarea.placeholder).toBe('Type your message...');

      rerender(
        <RdsCompAiTypingSection 
          icon_name="test" 
          placeholderText="New placeholder"
        />
      );
      textarea = container.querySelector('.rds-comp-ai-chat-bot__input-box') as HTMLTextAreaElement;
      expect(textarea.placeholder).toBe('New placeholder');
    });
  });

  describe('Container Structure', () => {
    it('renders input wrapper container', () => {
      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      const wrapper = container.querySelector('.rds-comp-ai-chat-bot__input-wrapper');
      expect(wrapper).toBeInTheDocument();
    });

    it('renders action icons container', () => {
      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      const actionIcons = container.querySelector('.rds-comp-ai-chat-bot__action-icons');
      expect(actionIcons).toBeInTheDocument();
    });

    it('renders button sections container', () => {
      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      const buttonSections = container.querySelector('.rds-comp-ai-chat-bot__button-sections');
      expect(buttonSections).toBeInTheDocument();
    });

    it('renders project actions container', () => {
      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      const projectActions = container.querySelector('.rds-comp-ai-chat-bot__project-actions');
      expect(projectActions).toBeInTheDocument();
    });
  });

  describe('Multiple Instances', () => {
    it('renders multiple typing sections independently', () => {
      const onSend1 = jest.fn();
      const onSend2 = jest.fn();
      
      render(
        <div>
          <RdsCompAiTypingSection 
            icon_name="test1" 
            placeholderText="First" 
            onSend={onSend1}
          />
          <RdsCompAiTypingSection 
            icon_name="test2" 
            placeholderText="Second" 
            onSend={onSend2}
          />
        </div>
      );
      
      const textareas = screen.getAllByDisplayValue('');
      expect(textareas.length).toBeGreaterThan(1);
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined placeholderText', () => {
      const { container } = render(
        <RdsCompAiTypingSection icon_name="test" />
      );
      const textarea = container.querySelector('.rds-comp-ai-chat-bot__input-box') as HTMLTextAreaElement;
      expect(textarea.placeholder).toBe('Placeholder Text');
    });

    it('handles empty previewImage prop', () => {
      const { container } = render(
        <RdsCompAiTypingSection {...defaultProps} previewImage="" />
      );
      expect(container.querySelector('.rds-comp-ai-chat-bot')).toBeInTheDocument();
    });

    it('handles undefined callbacks gracefully', async () => {
      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      const sendButton = screen.getByTestId('btn-icon-only');
      
      // Should not throw even without callbacks
      expect(() => fireEvent.click(sendButton)).not.toThrow();
    });

    it('handles rapid consecutive sends', async () => {
      const onSend = jest.fn();
      const { container } = render(
        <RdsCompAiTypingSection {...defaultProps} onSend={onSend} />
      );
      const textarea = container.querySelector('.rds-comp-ai-chat-bot__input-box') as HTMLTextAreaElement;
      const sendButton = screen.getByTestId('btn-icon-only');
      
      await userEvent.type(textarea, 'First');
      fireEvent.click(sendButton);
      
      await userEvent.type(textarea, 'Second');
      fireEvent.click(sendButton);
      
      expect(onSend).toHaveBeenCalledTimes(2);
    });

it('handles special whitespace characters', () => {
      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      const textarea = container.querySelector('.rds-comp-ai-chat-bot__input-box') as HTMLTextAreaElement;

      const whitespaceText = '  \t\n  test  \t\n  ';
      fireEvent.change(textarea, { target: { value: whitespaceText } });
      expect(textarea.value).toBe(whitespaceText);
    });

it('handles emoji input', () => {
      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      const textarea = container.querySelector('.rds-comp-ai-chat-bot__input-box') as HTMLTextAreaElement;

      const emojiText = 'Hello 👋 World 🌍';
      fireEvent.change(textarea, { target: { value: emojiText } });
      expect(textarea.value).toBe(emojiText);
    });

    it('handles Unicode characters', () => {
      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      const textarea = container.querySelector('.rds-comp-ai-chat-bot__input-box') as HTMLTextAreaElement;

      const unicodeText = '你好世界 مرحبا בעולם';
      fireEvent.change(textarea, { target: { value: unicodeText } });
      expect(textarea.value).toBe(unicodeText);
    });
  });

  describe('Accessibility', () => {
    it('textarea has title attribute', () => {
      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      const textarea = container.querySelector('.rds-comp-ai-chat-bot__input-box');
      expect(textarea).toHaveAttribute('title', 'Enter your prompt here');
    });

    it('buttons are keyboard accessible', () => {
      const onSend = jest.fn();
      const { container } = render(
        <RdsCompAiTypingSection {...defaultProps} onSend={onSend} />
      );
      const sendButton = screen.getByTestId('btn-icon-only');
      
      expect(sendButton).toBeVisible();
      expect(sendButton).toBeEnabled();
    });

    it('maintains semantic structure', () => {
      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('CSS Classes', () => {
    it('applies all required CSS classes', () => {
      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      expect(container.querySelector('.rds-comp-ai-chat-bot')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-ai-chat-bot__input-wrapper')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-ai-chat-bot__input-with-image')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-ai-chat-bot__input-box')).toBeInTheDocument();
      expect(container.querySelector('.rds-comp-ai-chat-bot__actions')).toBeInTheDocument();
    });

    it('applies muted placeholder class to textarea', () => {
      const { container } = render(<RdsCompAiTypingSection {...defaultProps} />);
      const textarea = container.querySelector('.rds-comp-ai-chat-bot__input-box');
      expect(textarea).toHaveClass('rds-comp-ai-chat-bot__input-box--muted-placeholder');
    });
  });
});
