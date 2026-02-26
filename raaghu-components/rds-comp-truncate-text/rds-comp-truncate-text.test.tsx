import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RdsCompTruncateText, {
  TruncateTextState,
  RdsCompTruncateTextProps,
} from './rds-comp-truncate-text';
import '@testing-library/jest-dom';

// Mock SCSS
jest.mock('./rds-comp-truncate-text.scss', () => ({}));

// Mock RdsTooltip component
jest.mock('../../raaghu-elements/rds-tooltip/rds-tooltip', () => {
  return function MockRdsTooltip({ children, label, title, style, arrow }: any) {
    return (
      <div
        data-testid="rds-tooltip"
        data-label={label}
        data-title={title}
        data-style={style}
        data-arrow={arrow}
      >
        {children}
      </div>
    );
  };
});

describe('RdsCompTruncateText', () => {
  const defaultProps: RdsCompTruncateTextProps = {
    text: 'This is a longer text that should be truncated',
    maxLength: 15,
    state: TruncateTextState.Default,
  };

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      render(<RdsCompTruncateText {...defaultProps} />);
      expect(screen.getByText(/This is a longer/)).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCompTruncateText.displayName).toBe('RdsCompTruncateText');
    });

    it('should render with base class', () => {
      const { container } = render(<RdsCompTruncateText {...defaultProps} />);
      const element = container.querySelector('.rds-comp-truncate-text');
      expect(element).toBeInTheDocument();
    });

    it('should render text in a span element', () => {
      render(<RdsCompTruncateText {...defaultProps} />);
      const spans = screen.getAllByText(/This is a longer/);
      expect(spans.length).toBeGreaterThan(0);
      expect(spans[0].tagName).toBe('SPAN');
    });
  });

  describe('Default State Behavior', () => {
    it('should display full text in Default state', () => {
      const shortText = 'Short text';
      render(
        <RdsCompTruncateText
          text={shortText}
          maxLength={5}
          state={TruncateTextState.Default}
        />
      );
      expect(screen.getByText(shortText)).toBeInTheDocument();
    });

    it('should display full text even when it exceeds maxLength in Default state', () => {
      const longText = 'This is a very long text that exceeds the maximum length';
      render(
        <RdsCompTruncateText
          text={longText}
          maxLength={10}
          state={TruncateTextState.Default}
        />
      );
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('should not display tooltip in Default state', () => {
      render(
        <RdsCompTruncateText
          text="Long text here"
          maxLength={5}
          state={TruncateTextState.Default}
        />
      );
      const tooltip = screen.queryByTestId('rds-tooltip');
      expect(tooltip).not.toBeInTheDocument();
    });

    it('should not truncate text in Default state regardless of length', () => {
      const text = 'A very long piece of text';
      render(
        <RdsCompTruncateText
          text={text}
          maxLength={5}
          state={TruncateTextState.Default}
        />
      );
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  describe('Hover State Behavior - Short Text', () => {
    it('should display full text when text is shorter than maxLength in Hover state', () => {
      const shortText = 'Short';
      render(
        <RdsCompTruncateText
          text={shortText}
          maxLength={20}
          state={TruncateTextState.Hover}
        />
      );
      expect(screen.getByText(shortText)).toBeInTheDocument();
    });

    it('should not show tooltip for short text in Hover state', () => {
      render(
        <RdsCompTruncateText
          text="Short"
          maxLength={20}
          state={TruncateTextState.Hover}
        />
      );
      const tooltip = screen.queryByTestId('rds-tooltip');
      expect(tooltip).not.toBeInTheDocument();
    });

    it('should display full text without ellipsis when text equals maxLength in Hover state', () => {
      const text = 'Exact';
      render(
        <RdsCompTruncateText
          text={text}
          maxLength={5}
          state={TruncateTextState.Hover}
        />
      );
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  describe('Hover State Behavior - Long Text', () => {
    it('should display truncated text with ellipsis when text exceeds maxLength in Hover state', () => {
      render(
        <RdsCompTruncateText
          text="This is a long text"
          maxLength={7}
          state={TruncateTextState.Hover}
        />
      );
      expect(screen.getByText('This is...')).toBeInTheDocument();
    });

    it('should not display tooltip initially in Hover state when text is long', () => {
      render(
        <RdsCompTruncateText
          text="This is a long text"
          maxLength={7}
          state={TruncateTextState.Hover}
        />
      );
      const tooltip = screen.queryByTestId('rds-tooltip');
      expect(tooltip).not.toBeInTheDocument();
    });

    it('should display tooltip on mouse enter in Hover state when text is long', () => {
      const { container } = render(
        <RdsCompTruncateText
          text="This is a long text"
          maxLength={7}
          state={TruncateTextState.Hover}
        />
      );
      const mainDiv = container.querySelector('.rds-comp-truncate-text');
      fireEvent.mouseEnter(mainDiv!);
      
      const tooltip = screen.getByTestId('rds-tooltip');
      expect(tooltip).toBeInTheDocument();
    });

    it('should hide tooltip on mouse leave in Hover state', () => {
      const { container } = render(
        <RdsCompTruncateText
          text="This is a long text"
          maxLength={7}
          state={TruncateTextState.Hover}
        />
      );
      const mainDiv = container.querySelector('.rds-comp-truncate-text');
      
      fireEvent.mouseEnter(mainDiv!);
      let tooltip: HTMLElement | null = screen.getByTestId('rds-tooltip');
      expect(tooltip).toBeInTheDocument();
      
      fireEvent.mouseLeave(mainDiv!);
      tooltip = screen.queryByTestId('rds-tooltip');
      expect(tooltip).not.toBeInTheDocument();
    });
  });

  describe('Tooltip Configuration', () => {
    it('should pass correct label to tooltip', () => {
      const longText = 'This is a very long text that needs truncation';
      const { container } = render(
        <RdsCompTruncateText
          text={longText}
          maxLength={10}
          state={TruncateTextState.Hover}
        />
      );
      const mainDiv = container.querySelector('.rds-comp-truncate-text');
      fireEvent.mouseEnter(mainDiv!);
      
      const tooltip = screen.getByTestId('rds-tooltip');
      expect(tooltip).toHaveAttribute('data-label', longText);
    });

    it('should pass correct title to tooltip', () => {
      const longText = 'This is a very long text that needs truncation';
      const { container } = render(
        <RdsCompTruncateText
          text={longText}
          maxLength={10}
          state={TruncateTextState.Hover}
        />
      );
      const mainDiv = container.querySelector('.rds-comp-truncate-text');
      fireEvent.mouseEnter(mainDiv!);
      
      const tooltip = screen.getByTestId('rds-tooltip');
      expect(tooltip).toHaveAttribute('data-title', longText);
    });

    it('should pass correct style to tooltip', () => {
      const { container } = render(
        <RdsCompTruncateText
          text="This is a long text"
          maxLength={7}
          state={TruncateTextState.Hover}
        />
      );
      const mainDiv = container.querySelector('.rds-comp-truncate-text');
      fireEvent.mouseEnter(mainDiv!);
      
      const tooltip = screen.getByTestId('rds-tooltip');
      expect(tooltip).toHaveAttribute('data-style', 'bottom');
    });

    it('should pass correct arrow prop to tooltip', () => {
      const { container } = render(
        <RdsCompTruncateText
          text="This is a long text"
          maxLength={7}
          state={TruncateTextState.Hover}
        />
      );
      const mainDiv = container.querySelector('.rds-comp-truncate-text');
      fireEvent.mouseEnter(mainDiv!);
      
      const tooltip = screen.getByTestId('rds-tooltip');
      expect(tooltip).toHaveAttribute('data-arrow', 'true');
    });
  });

  describe('Truncation Logic', () => {
    it('should truncate at exactly maxLength characters', () => {
      render(
        <RdsCompTruncateText
          text="123456789"
          maxLength={5}
          state={TruncateTextState.Hover}
        />
      );
      expect(screen.getByText('12345...')).toBeInTheDocument();
    });

    it('should add ellipsis after truncated text', () => {
      render(
        <RdsCompTruncateText
          text="This is a long text"
          maxLength={4}
          state={TruncateTextState.Hover}
        />
      );
      expect(screen.getByText('This...')).toBeInTheDocument();
    });

    it('should not add ellipsis when text length equals maxLength', () => {
      render(
        <RdsCompTruncateText
          text="Exact"
          maxLength={5}
          state={TruncateTextState.Hover}
        />
      );
      expect(screen.getByText('Exact')).toBeInTheDocument();
      expect(screen.queryByText('Exact...')).not.toBeInTheDocument();
    });

    it('should handle maxLength of 1', () => {
      render(
        <RdsCompTruncateText
          text="Hello"
          maxLength={1}
          state={TruncateTextState.Hover}
        />
      );
      expect(screen.getByText('H...')).toBeInTheDocument();
    });

    it('should handle very long text', () => {
      const longText = 'A'.repeat(1000);
      render(
        <RdsCompTruncateText
          text={longText}
          maxLength={10}
          state={TruncateTextState.Hover}
        />
      );
      const truncated = 'A'.repeat(10) + '...';
      expect(screen.getByText(truncated)).toBeInTheDocument();
    });
  });

  describe('Props Validation', () => {
    it('should render with minimal required props', () => {
      render(
        <RdsCompTruncateText
          text="Test"
          maxLength={10}
          state={TruncateTextState.Default}
        />
      );
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('should handle empty string text', () => {
      render(
        <RdsCompTruncateText
          text=""
          maxLength={10}
          state={TruncateTextState.Default}
        />
      );
      const mainDiv = document.querySelector('.rds-comp-truncate-text');
      expect(mainDiv).toBeInTheDocument();
    });

    it('should handle maxLength of 0', () => {
      render(
        <RdsCompTruncateText
          text="Text"
          maxLength={0}
          state={TruncateTextState.Hover}
        />
      );
      expect(screen.getByText('...')).toBeInTheDocument();
    });

    it('should handle negative maxLength', () => {
      render(
        <RdsCompTruncateText
          text="Text"
          maxLength={-5}
          state={TruncateTextState.Hover}
        />
      );
      // Negative maxLength should behave similar to 0
      expect(screen.getByText('...')).toBeInTheDocument();
    });

    it('should handle text with special characters', () => {
      const specialText = 'Hello @#$% World!';
      render(
        <RdsCompTruncateText
          text={specialText}
          maxLength={10}
          state={TruncateTextState.Default}
        />
      );
      expect(screen.getByText(specialText)).toBeInTheDocument();
    });

    it('should handle text with unicode characters', () => {
      const unicodeText = 'Hello 世界 🌍';
      render(
        <RdsCompTruncateText
          text={unicodeText}
          maxLength={20}
          state={TruncateTextState.Default}
        />
      );
      expect(screen.getByText(unicodeText)).toBeInTheDocument();
    });

    it('should handle text with newlines', () => {
      const textWithNewlines = 'Line 1\nLine 2\nLine 3';
      const { container } = render(
        <RdsCompTruncateText
          text={textWithNewlines}
          maxLength={50}
          state={TruncateTextState.Default}
        />
      );
      const span = container.querySelector('span');
      expect(span?.textContent).toContain('Line 1');
      expect(span?.textContent).toContain('Line 2');
      expect(span?.textContent).toContain('Line 3');
    });

    it('should handle text with multiple spaces', () => {
      const textWithSpaces = 'Multiple    spaces    here';
      const { container } = render(
        <RdsCompTruncateText
          text={textWithSpaces}
          maxLength={50}
          state={TruncateTextState.Default}
        />
      );
      const span = container.querySelector('span');
      expect(span?.textContent).toBe(textWithSpaces);
    });
  });

  describe('State Switching', () => {
    it('should switch from Default to Hover state', () => {
      const { rerender } = render(
        <RdsCompTruncateText
          text="This is a long text"
          maxLength={7}
          state={TruncateTextState.Default}
        />
      );
      
      expect(screen.getByText('This is a long text')).toBeInTheDocument();
      
      rerender(
        <RdsCompTruncateText
          text="This is a long text"
          maxLength={7}
          state={TruncateTextState.Hover}
        />
      );
      
      expect(screen.getByText('This is...')).toBeInTheDocument();
    });

    it('should switch from Hover to Default state', () => {
      const { rerender } = render(
        <RdsCompTruncateText
          text="This is a long text"
          maxLength={7}
          state={TruncateTextState.Hover}
        />
      );
      
      expect(screen.getByText('This is...')).toBeInTheDocument();
      
      rerender(
        <RdsCompTruncateText
          text="This is a long text"
          maxLength={7}
          state={TruncateTextState.Default}
        />
      );
      
      expect(screen.getByText('This is a long text')).toBeInTheDocument();
    });
  });

  describe('Text Updates', () => {
    it('should update display text when text prop changes', () => {
      const { rerender } = render(
        <RdsCompTruncateText
          text="First text"
          maxLength={20}
          state={TruncateTextState.Default}
        />
      );
      
      expect(screen.getByText('First text')).toBeInTheDocument();
      
      rerender(
        <RdsCompTruncateText
          text="Second text"
          maxLength={20}
          state={TruncateTextState.Default}
        />
      );
      
      expect(screen.getByText('Second text')).toBeInTheDocument();
    });

    it('should update truncation when maxLength changes', () => {
      const { rerender } = render(
        <RdsCompTruncateText
          text="This is a long text"
          maxLength={20}
          state={TruncateTextState.Hover}
        />
      );
      
      expect(screen.getByText('This is a long text')).toBeInTheDocument();
      
      rerender(
        <RdsCompTruncateText
          text="This is a long text"
          maxLength={7}
          state={TruncateTextState.Hover}
        />
      );
      
      expect(screen.getByText('This is...')).toBeInTheDocument();
    });
  });

  describe('Mouse Event Handling', () => {
    it('should handle multiple mouse enter/leave cycles', () => {
      const { container } = render(
        <RdsCompTruncateText
          text="This is a long text"
          maxLength={7}
          state={TruncateTextState.Hover}
        />
      );
      const mainDiv = container.querySelector('.rds-comp-truncate-text');
      
      // First cycle
      fireEvent.mouseEnter(mainDiv!);
      expect(screen.getByTestId('rds-tooltip')).toBeInTheDocument();
      
      fireEvent.mouseLeave(mainDiv!);
      expect(screen.queryByTestId('rds-tooltip')).not.toBeInTheDocument();
      
      // Second cycle
      fireEvent.mouseEnter(mainDiv!);
      expect(screen.getByTestId('rds-tooltip')).toBeInTheDocument();
      
      fireEvent.mouseLeave(mainDiv!);
      expect(screen.queryByTestId('rds-tooltip')).not.toBeInTheDocument();
    });

    it('should not toggle tooltip in Default state on mouse events', () => {
      const { container } = render(
        <RdsCompTruncateText
          text="This is a long text"
          maxLength={7}
          state={TruncateTextState.Default}
        />
      );
      const mainDiv = container.querySelector('.rds-comp-truncate-text');
      
      fireEvent.mouseEnter(mainDiv!);
      expect(screen.queryByTestId('rds-tooltip')).not.toBeInTheDocument();
      
      fireEvent.mouseLeave(mainDiv!);
      expect(screen.queryByTestId('rds-tooltip')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases and Integration', () => {
    it('should handle text that is exactly one character longer than maxLength', () => {
      render(
        <RdsCompTruncateText
          text="12345"
          maxLength={4}
          state={TruncateTextState.Hover}
        />
      );
      expect(screen.getByText('1234...')).toBeInTheDocument();
    });

    it('should display full text in tooltip even when truncated in display', () => {
      const fullText = 'This is a very long text that will be truncated';
      const { container } = render(
        <RdsCompTruncateText
          text={fullText}
          maxLength={10}
          state={TruncateTextState.Hover}
        />
      );
      const mainDiv = container.querySelector('.rds-comp-truncate-text');
      fireEvent.mouseEnter(mainDiv!);
      
      const tooltip = screen.getByTestId('rds-tooltip');
      expect(tooltip).toHaveAttribute('data-label', fullText);
      expect(tooltip).toHaveAttribute('data-title', fullText);
    });

    it('should display truncated text even when tooltip is not visible', () => {
      render(
        <RdsCompTruncateText
          text="This is a long text"
          maxLength={7}
          state={TruncateTextState.Hover}
        />
      );
      expect(screen.getByText('This is...')).toBeInTheDocument();
      expect(screen.queryByTestId('rds-tooltip')).not.toBeInTheDocument();
    });

    it('should maintain consistent behavior with rapid state changes', () => {
      const { rerender, container } = render(
        <RdsCompTruncateText
          text="Long text here"
          maxLength={5}
          state={TruncateTextState.Default}
        />
      );
      
      for (let i = 0; i < 5; i++) {
        rerender(
          <RdsCompTruncateText
            text="Long text here"
            maxLength={5}
            state={i % 2 === 0 ? TruncateTextState.Hover : TruncateTextState.Default}
          />
        );
      }
      
      // End state: i=4, 4%2===0, so final state is Hover
      const span = container.querySelector('span');
      expect(span?.textContent).toContain('...');
    });

    it('should render truncated text inside span when in Hover state with long text', () => {
      const { container } = render(
        <RdsCompTruncateText
          text="This is a long text"
          maxLength={7}
          state={TruncateTextState.Hover}
        />
      );
      
      // Before hover - should have span without tooltip
      let spans = container.querySelectorAll('span');
      expect(spans.length).toBeGreaterThan(0);
      
      // After hover - should have span inside tooltip
      const mainDiv = container.querySelector('.rds-comp-truncate-text');
      fireEvent.mouseEnter(mainDiv!);
      
      const tooltip = screen.getByTestId('rds-tooltip');
      spans = tooltip.querySelectorAll('span');
      expect(spans.length).toBeGreaterThan(0);
    });
  });
});
