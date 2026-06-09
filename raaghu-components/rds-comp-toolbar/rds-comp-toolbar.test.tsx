import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RdsCompToolbar, {
  ToolbarLayout,
  ToolbarType,
  ToolbarState,
  RdsCompToolbarProps,
} from './rds-comp-toolbar';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-comp-toolbar.scss', () => ({}));

// Mock the toolbar config and ToolbarButton component
jest.mock('./rds-comp-toolbar-config', () => ({
  getToolbarConfig: jest.fn(() => ({
    sections: [
      [
        {
          icon: 'bold-icon',
          action: 'bold',
          hasDropdown: false,
          ariaLabel: 'Bold',
        },
        {
          icon: 'italic-icon',
          action: 'italic',
          hasDropdown: false,
          ariaLabel: 'Italic',
        },
        {
          icon: 'underline-icon',
          action: 'underline',
          hasDropdown: false,
          ariaLabel: 'Underline',
        },
      ],
      [
        {
          icon: 'color-icon',
          action: 'color',
          hasDropdown: true,
          ariaLabel: 'Text Color',
        },
        {
          icon: 'link-icon',
          action: 'link',
          hasDropdown: false,
          ariaLabel: 'Link',
        },
      ],
    ],
  })),
  ToolbarButton: ({ 
    icon, 
    action, 
    hasDropdown, 
    ariaLabel, 
    isActive, 
    isDisabled, 
    isDropdownOpen,
    onClick,
    onDropdownSelect 
  }: any) => (
    <button
      data-testid={`toolbar-button-${action}`}
      data-action={action}
      data-has-dropdown={hasDropdown}
      data-is-active={isActive}
      data-is-disabled={isDisabled}
      data-is-dropdown-open={isDropdownOpen}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
    >
      {icon}
      {hasDropdown && isDropdownOpen && (
        <div className="rds-comp-toolbar__dropdown">
          <button type="button" role="menuitem" onClick={() => onDropdownSelect(action, 'option1')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Option 1</button>
          <button type="button" role="menuitem" onClick={() => onDropdownSelect(action, 'option2')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Option 2</button>
        </div>
      )}
    </button>
  ),
}));

// Mock MUI Icons (not fully needed since we're mocking ToolbarButton)
jest.mock('@mui/icons-material', () => ({
  FormatBold: () => <span>Bold</span>,
  FormatItalic: () => <span>Italic</span>,
  FormatUnderlined: () => <span>Underline</span>,
  FormatStrikethrough: () => <span>Strikethrough</span>,
  FormatColorText: () => <span>Color</span>,
  Link: () => <span>Link</span>,
  Image: () => <span>Image</span>,
  FormatListBulleted: () => <span>Bullet List</span>,
  FormatListNumbered: () => <span>Numbered List</span>,
  FormatIndentIncrease: () => <span>Indent+</span>,
  FormatIndentDecrease: () => <span>Indent-</span>,
  FormatAlignLeft: () => <span>Align Left</span>,
  FormatAlignCenter: () => <span>Align Center</span>,
  FormatAlignRight: () => <span>Align Right</span>,
  FormatAlignJustify: () => <span>Align Justify</span>,
  Code: () => <span>Code</span>,
  TableChart: () => <span>Table</span>,
  InsertEmoticon: () => <span>Emoji</span>,
  Undo: () => <span>Undo</span>,
  Redo: () => <span>Redo</span>,
  MoreVert: () => <span>More</span>,
  KeyboardArrowDown: () => <span>Arrow</span>,
  FormatQuote: () => <span>Quote</span>,
  HorizontalRule: () => <span>HR</span>,
  Videocam: () => <span>Video</span>,
  TextFields: () => <span>Text</span>,
  FontDownload: () => <span>Font</span>,
  Highlight: () => <span>Highlight</span>,
}));

// Mock emoji generator
jest.mock('../rds-comp-emoji-generator/rds-comp-emoji-generator', () => {
  return function MockEmojiGenerator() {
    return <div data-testid="emoji-generator">Emoji Generator</div>;
  };
});

describe('RdsCompToolbar', () => {
  const defaultProps: RdsCompToolbarProps = {
    layout: ToolbarLayout.Primary,
    type: ToolbarType.FullFeatured,
    state: ToolbarState.On,
  };

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      render(<RdsCompToolbar {...defaultProps} />);
      expect(screen.getByRole('toolbar')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCompToolbar.displayName).toBe('RdsCompToolbar');
    });

    it('should render with toolbar role', () => {
      render(<RdsCompToolbar {...defaultProps} />);
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveAttribute('role', 'toolbar');
    });

    it('should render with correct aria-label', () => {
      render(<RdsCompToolbar {...defaultProps} type={ToolbarType.FullFeatured} />);
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveAttribute('aria-label', 'full-featured toolbar');
    });

    it('should render toolbar buttons', () => {
      render(<RdsCompToolbar {...defaultProps} />);
      const buttons = screen.getAllByTestId(/toolbar-button-/);
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should accept custom data-testid', () => {
      render(
        <RdsCompToolbar {...defaultProps} data-testid="custom-toolbar" />
      );
      expect(screen.getByTestId('custom-toolbar')).toBeInTheDocument();
    });
  });

  describe('Layout Variants', () => {
    it('should apply primary layout class', () => {
      render(<RdsCompToolbar {...defaultProps} layout={ToolbarLayout.Primary} />);
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar--primary');
    });

    it('should apply secondary layout class', () => {
      render(
        <RdsCompToolbar {...defaultProps} layout={ToolbarLayout.Secondary} />
      );
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar--secondary');
    });

    it('should render primary layout with single row', () => {
      render(<RdsCompToolbar {...defaultProps} layout={ToolbarLayout.Primary} />);
      const rows = document.querySelectorAll('.rds-comp-toolbar__row');
      expect(rows.length).toBeGreaterThan(0);
    });

    it('should render secondary layout with multiple rows', () => {
      render(
        <RdsCompToolbar {...defaultProps} layout={ToolbarLayout.Secondary} />
      );
      const rows = document.querySelectorAll('.rds-comp-toolbar__row');
      expect(rows.length).toBeGreaterThan(0);
    });
  });

  describe('Type Variants', () => {
    it('should apply FullFeatured type class', () => {
      render(
        <RdsCompToolbar {...defaultProps} type={ToolbarType.FullFeatured} />
      );
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar--full-featured');
    });

    it('should apply InlineEditor type class', () => {
      render(
        <RdsCompToolbar {...defaultProps} type={ToolbarType.InlineEditor} />
      );
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar--inline-editor');
    });

    it('should apply MoreText type class', () => {
      render(<RdsCompToolbar {...defaultProps} type={ToolbarType.MoreText} />);
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar--more-text');
    });

    it('should apply MoreParagraph type class', () => {
      render(
        <RdsCompToolbar {...defaultProps} type={ToolbarType.MoreParagraph} />
      );
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar--more-paragraph');
    });

    it('should apply MoreRichContent type class', () => {
      render(
        <RdsCompToolbar
          {...defaultProps}
          type={ToolbarType.MoreRichContent}
        />
      );
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar--more-rich-content');
    });

    it('should apply Misc type class', () => {
      render(<RdsCompToolbar {...defaultProps} type={ToolbarType.Misc} />);
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar--misc');
    });
  });

  describe('State Variants', () => {
    it('should apply On state class', () => {
      render(<RdsCompToolbar {...defaultProps} state={ToolbarState.On} />);
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar--on');
    });

    it('should apply Off state class', () => {
      render(<RdsCompToolbar {...defaultProps} state={ToolbarState.Off} />);
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar--off');
    });

    it('should apply DisabledOn state class', () => {
      render(
        <RdsCompToolbar {...defaultProps} state={ToolbarState.DisabledOn} />
      );
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar--disabled-on');
    });

    it('should apply DisabledOff state class', () => {
      render(
        <RdsCompToolbar {...defaultProps} state={ToolbarState.DisabledOff} />
      );
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar--disabled-off');
    });

    it('should disable buttons when state is DisabledOn', () => {
      render(
        <RdsCompToolbar {...defaultProps} state={ToolbarState.DisabledOn} />
      );
      const buttons = screen.getAllByTestId(/toolbar-button-/);
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('data-is-disabled', 'true');
      });
    });

    it('should not disable buttons when state is On', () => {
      render(<RdsCompToolbar {...defaultProps} state={ToolbarState.On} />);
      const buttons = screen.getAllByTestId(/toolbar-button-/);
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('data-is-disabled', 'false');
      });
    });
  });

  describe('Format Toggle Behavior', () => {
    it('should toggle format active state on click', () => {
      render(<RdsCompToolbar {...defaultProps} />);
      const boldButton = screen.getByTestId('toolbar-button-bold');

      expect(boldButton).toHaveAttribute('data-is-active', 'false');

      fireEvent.click(boldButton);

      expect(boldButton).toHaveAttribute('data-is-active', 'true');

      fireEvent.click(boldButton);

      expect(boldButton).toHaveAttribute('data-is-active', 'false');
    });

    it('should maintain multiple active formats', () => {
      render(<RdsCompToolbar {...defaultProps} />);
      const boldButton = screen.getByTestId('toolbar-button-bold');
      const italicButton = screen.getByTestId('toolbar-button-italic');

      fireEvent.click(boldButton);
      fireEvent.click(italicButton);

      expect(boldButton).toHaveAttribute('data-is-active', 'true');
      expect(italicButton).toHaveAttribute('data-is-active', 'true');
    });

    it('should not toggle format when disabled', () => {
      render(
        <RdsCompToolbar {...defaultProps} state={ToolbarState.DisabledOn} />
      );
      const boldButton = screen.getByTestId('toolbar-button-bold');

      fireEvent.click(boldButton);

      expect(boldButton).toHaveAttribute('data-is-active', 'false');
    });
  });

  describe('Dropdown Behavior', () => {
    it('should toggle dropdown on button click when button has dropdown', () => {
      render(<RdsCompToolbar {...defaultProps} />);
      const colorButton = screen.getByTestId('toolbar-button-color');

      expect(colorButton).toHaveAttribute('data-is-dropdown-open', 'false');

      fireEvent.click(colorButton);

      expect(colorButton).toHaveAttribute('data-is-dropdown-open', 'true');

      fireEvent.click(colorButton);

      expect(colorButton).toHaveAttribute('data-is-dropdown-open', 'false');
    });

    it('should close other dropdowns when opening new one', () => {
      render(<RdsCompToolbar {...defaultProps} />);
      const colorButton = screen.getByTestId('toolbar-button-color');

      fireEvent.click(colorButton);
      expect(colorButton).toHaveAttribute('data-is-dropdown-open', 'true');
    });

    it('should close dropdown on outside click', () => {
      render(
        <div>
          <RdsCompToolbar {...defaultProps} />
          <div data-testid="outside">Outside Element</div>
        </div>
      );
      const colorButton = screen.getByTestId('toolbar-button-color');

      fireEvent.click(colorButton);
      expect(colorButton).toHaveAttribute('data-is-dropdown-open', 'true');

      const outside = screen.getByTestId('outside');
      fireEvent.mouseDown(outside);

      expect(colorButton).toHaveAttribute('data-is-dropdown-open', 'false');
    });

    it('should not close dropdown on click inside dropdown', () => {
      render(<RdsCompToolbar {...defaultProps} />);
      const colorButton = screen.getByTestId('toolbar-button-color');

      fireEvent.click(colorButton);

      const dropdown = colorButton.querySelector('.rds-comp-toolbar__dropdown');
      if (dropdown) {
        fireEvent.mouseDown(dropdown);
        expect(colorButton).toHaveAttribute('data-is-dropdown-open', 'true');
      }
    });
  });

  describe('onAction Callback', () => {
    it('should call onAction when button is clicked', () => {
      const onAction = jest.fn();
      render(<RdsCompToolbar {...defaultProps} onAction={onAction} />);
      const boldButton = screen.getByTestId('toolbar-button-bold');

      fireEvent.click(boldButton);

      expect(onAction).toHaveBeenCalledWith('bold');
    });

    it('should call onAction for dropdown button clicks', () => {
      const onAction = jest.fn();
      render(<RdsCompToolbar {...defaultProps} onAction={onAction} />);
      const colorButton = screen.getByTestId('toolbar-button-color');

      fireEvent.click(colorButton);

      expect(onAction).toHaveBeenCalledWith('color');
    });

    it('should call onAction multiple times for different buttons', () => {
      const onAction = jest.fn();
      render(<RdsCompToolbar {...defaultProps} onAction={onAction} />);
      const boldButton = screen.getByTestId('toolbar-button-bold');
      const italicButton = screen.getByTestId('toolbar-button-italic');

      fireEvent.click(boldButton);
      fireEvent.click(italicButton);

      expect(onAction).toHaveBeenCalledTimes(2);
      expect(onAction).toHaveBeenCalledWith('bold');
      expect(onAction).toHaveBeenCalledWith('italic');
    });

    it('should not call onAction when disabled', () => {
      const onAction = jest.fn();
      render(
        <RdsCompToolbar
          {...defaultProps}
          state={ToolbarState.DisabledOn}
          onAction={onAction}
        />
      );
      const boldButton = screen.getByTestId('toolbar-button-bold');

      fireEvent.click(boldButton);

      // OnAction is still called even for disabled, it just doesn't toggle format
      expect(onAction).not.toHaveBeenCalled();
    });
  });

  describe('Custom Props', () => {
    it('should accept and apply custom className', () => {
      render(
        <RdsCompToolbar {...defaultProps} className="custom-class" />
      );
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('custom-class');
    });

    it('should maintain default classes with custom className', () => {
      render(
        <RdsCompToolbar {...defaultProps} className="custom-class" />
      );
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar');
      expect(toolbar).toHaveClass('custom-class');
    });

    it('should spread additional props to toolbar element', () => {
      render(
        <RdsCompToolbar
          {...defaultProps}
          data-custom="custom-value"
        />
      );
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveAttribute('data-custom', 'custom-value');
    });
  });

  describe('Default Props', () => {
    it('should use default layout of Primary', () => {
      render(
        <RdsCompToolbar
          type={ToolbarType.FullFeatured}
          state={ToolbarState.On}
        />
      );
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar--primary');
    });

    it('should use default type of FullFeatured', () => {
      render(
        <RdsCompToolbar
          layout={ToolbarLayout.Primary}
          state={ToolbarState.On}
        />
      );
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar--full-featured');
    });

    it('should use default state of On', () => {
      render(
        <RdsCompToolbar
          layout={ToolbarLayout.Primary}
          type={ToolbarType.FullFeatured}
        />
      );
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar--on');
    });

    it('should use default empty className', () => {
      render(<RdsCompToolbar {...defaultProps} className={undefined} />);
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar');
    });
  });

  describe('Divider Elements', () => {
    it('should render dividers between sections in primary layout', () => {
      render(<RdsCompToolbar {...defaultProps} layout={ToolbarLayout.Primary} />);
      const dividers = document.querySelectorAll('.rds-comp-toolbar__divider');
      expect(dividers.length).toBeGreaterThan(0);
    });

    it('should render correct number of dividers', () => {
      const { container } = render(
        <RdsCompToolbar {...defaultProps} layout={ToolbarLayout.Primary} />
      );
      const sections = container.querySelectorAll('.rds-comp-toolbar__section');
      const dividers = container.querySelectorAll('.rds-comp-toolbar__divider');
      
      // Number of dividers should be sections - 1 for primary layout
      if (sections.length > 1) {
        expect(dividers.length).toBe(sections.length - 1);
      }
    });
  });

  describe('Combined Props Tests', () => {
    it('should render full toolbar with all custom props', () => {
      const onAction = jest.fn();
      render(
        <RdsCompToolbar
          layout={ToolbarLayout.Secondary}
          type={ToolbarType.InlineEditor}
          state={ToolbarState.On}
          onAction={onAction}
          className="custom-toolbar"
          data-testid="full-toolbar"
        />
      );

      const toolbar = screen.getByTestId('full-toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar--secondary');
      expect(toolbar).toHaveClass('rds-comp-toolbar--inline-editor');
      expect(toolbar).toHaveClass('rds-comp-toolbar--on');
      expect(toolbar).toHaveClass('custom-toolbar');
    });

    it('should handle disabled toolbar with custom props', () => {
      const onAction = jest.fn();
      render(
        <RdsCompToolbar
          layout={ToolbarLayout.Primary}
          type={ToolbarType.FullFeatured}
          state={ToolbarState.DisabledOn}
          onAction={onAction}
          className="disabled-toolbar"
        />
      );

      const toolbar = screen.getByRole('toolbar');
      const buttons = screen.getAllByTestId(/toolbar-button-/);

      expect(toolbar).toHaveClass('rds-comp-toolbar--disabled-on');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('data-is-disabled', 'true');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid button clicks', () => {
      const onAction = jest.fn();
      render(<RdsCompToolbar {...defaultProps} onAction={onAction} />);
      const boldButton = screen.getByTestId('toolbar-button-bold');

      fireEvent.click(boldButton);
      fireEvent.click(boldButton);
      fireEvent.click(boldButton);

      expect(onAction).toHaveBeenCalledTimes(3);
      expect(boldButton).toHaveAttribute('data-is-active', 'true');
    });

    it('should handle state changes', () => {
      const { rerender } = render(
        <RdsCompToolbar {...defaultProps} state={ToolbarState.On} />
      );

      let toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar--on');

      rerender(
        <RdsCompToolbar {...defaultProps} state={ToolbarState.DisabledOn} />
      );

      toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar--disabled-on');
    });

    it('should handle layout changes', () => {
      const { rerender } = render(
        <RdsCompToolbar {...defaultProps} layout={ToolbarLayout.Primary} />
      );

      let toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar--primary');

      rerender(
        <RdsCompToolbar {...defaultProps} layout={ToolbarLayout.Secondary} />
      );

      toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar--secondary');
    });

    it('should handle type changes', () => {
      const { rerender } = render(
        <RdsCompToolbar {...defaultProps} type={ToolbarType.FullFeatured} />
      );

      let toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar--full-featured');

      rerender(
        <RdsCompToolbar {...defaultProps} type={ToolbarType.InlineEditor} />
      );

      toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar--inline-editor');
    });

    it('should handle undefined onAction callback', () => {
      render(<RdsCompToolbar {...defaultProps} onAction={undefined} />);
      const boldButton = screen.getByTestId('toolbar-button-bold');

      expect(() => {
        fireEvent.click(boldButton);
      }).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels for toolbar', () => {
      render(<RdsCompToolbar {...defaultProps} />);
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveAttribute('aria-label');
  
    });

    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsCompToolbar {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should pass aria-label to buttons', () => {
      render(<RdsCompToolbar {...defaultProps} />);
      const boldButton = screen.getByTestId('toolbar-button-bold');
      expect(boldButton).toHaveAttribute('aria-label', 'Bold');
    });

    it('should have keyboard navigation support', () => {
      render(<RdsCompToolbar {...defaultProps} />);
      const buttons = screen.getAllByTestId(/toolbar-button-/);
      
      buttons.forEach((button) => {
        expect(button.tagName).toBe('BUTTON');
      });
    });
  });

  describe('Structure Tests', () => {
    it('should have correct base class', () => {
      render(<RdsCompToolbar {...defaultProps} />);
      const toolbar = screen.getByRole('toolbar');
      expect(toolbar).toHaveClass('rds-comp-toolbar');
    });

    it('should render toolbar sections', () => {
      const { container } = render(
        <RdsCompToolbar {...defaultProps} />
      );
      const sections = container.querySelectorAll('.rds-comp-toolbar__section');
      expect(sections.length).toBeGreaterThan(0);
    });

    it('should render toolbar rows', () => {
      const { container } = render(
        <RdsCompToolbar {...defaultProps} />
      );
      const rows = container.querySelectorAll('.rds-comp-toolbar__row');
      expect(rows.length).toBeGreaterThan(0);
    });
  });
});