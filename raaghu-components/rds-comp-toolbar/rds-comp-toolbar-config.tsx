import React from "react";
import ReactDOM from 'react-dom';
import RdsEmojiGenerator from '../rds-comp-emoji-generator/rds-comp-emoji-generator';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatStrikethrough,
  FormatColorText,
  Link,
  Image,
  FormatListBulleted,
  FormatListNumbered,
  FormatIndentIncrease,
  FormatIndentDecrease,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
  Code,
  TableChart,
  InsertEmoticon,
  Undo,
  Redo,
  MoreVert,
  KeyboardArrowDown,
  FormatQuote,
  HorizontalRule,
  Videocam,
  TextFields,
  FontDownload,
  Highlight
} from "@mui/icons-material";
import { getDropdownOptions, findPortalThemeClass } from './rds-comp-toolbar-dropdown-options';import { ToolbarType } from './rds-comp-toolbar';

export interface ToolbarButtonConfig {
  icon: React.ReactNode;
  action: string;
  hasDropdown?: boolean;
  className?: string;
  ariaLabel?: string;
}

export interface ToolbarConfig {
  sections: ToolbarButtonConfig[][];
}

export const ToolbarButton = ({ 
  icon, 
  action, 
  hasDropdown = false, 
  className: buttonClassName = "",
  ariaLabel,
  isActive,
  isDisabled,
  isDropdownOpen,
  onClick,
  onDropdownSelect
}: ToolbarButtonConfig & {
  isActive: boolean;
  isDisabled: boolean;
  isDropdownOpen?: boolean;
  onClick: () => void;
  onDropdownSelect?: (parentAction: string, option: string) => void;
}) => {
  const dropdownOptions = hasDropdown ? getDropdownOptions(action) : [];

  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const [dropdownPos, setDropdownPos] = React.useState<{ top: number; left: number; minWidth?: number } | null>(null);
  const [portalThemeClass, setPortalThemeClass] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (isDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + globalThis.scrollY + 4,
        left: rect.left + globalThis.scrollX,
        minWidth: Math.max(rect.width, 160)
      });
      setPortalThemeClass(findPortalThemeClass(buttonRef.current));
    } else {
      setDropdownPos(null);
    }
  }, [isDropdownOpen]);
  return (
    <div className="rds-comp-toolbar__button-container">
      <button
        ref={buttonRef}
        type="button"
        className={`rds-comp-toolbar__button ${isActive ? 'rds-comp-toolbar__button--active' : ''} ${isDisabled ? 'rds-comp-toolbar__button--disabled' : ''} ${buttonClassName}`}
        onClick={onClick}
        disabled={isDisabled}
        aria-label={ariaLabel || action}
        aria-haspopup={hasDropdown ? true : undefined}
        aria-pressed={isActive}
        aria-expanded={hasDropdown ? isDropdownOpen : undefined}
        data-testid={`toolbar-button-${action}`}
      >
        <span className="rds-comp-toolbar__button-icon">
          {icon}
        </span>
        {hasDropdown && (
          <span className="rds-comp-toolbar__button-dropdown">
            <KeyboardArrowDown />
          </span>
        )}
      </button>

      {hasDropdown && isDropdownOpen && dropdownPos && ReactDOM.createPortal(
        <div
          className={`rds-comp-toolbar__dropdown ${portalThemeClass || ''}`.trim()}
          style={{
            position: 'absolute',
            top: dropdownPos.top,
            left: dropdownPos.left,
            minWidth: dropdownPos.minWidth,
            zIndex: 'var(--rds-z-index-overlay, 1250)'
          }}
          role="menu"
          data-portal-theme={portalThemeClass || undefined}
        >
          {dropdownOptions.length > 0 && dropdownOptions.map((option, index) => (
            <button
              key={option.value}
              className="rds-comp-toolbar__dropdown-item"
              onClick={() => onDropdownSelect?.(action, option.value)}
              disabled={isDisabled}
            >
              {option.label}
            </button>
          ))}

          {(action === 'emoji' || action === 'insertEmoji') && (
            <div className="rds-comp-toolbar__emoji-portal">
              <RdsEmojiGenerator
                Type={undefined}
                onEmojiSelect={(e: string) => {
                  const val = typeof e === 'string' ? e : String(e);
                  onDropdownSelect?.(action, val);
                }}
                maxEmojis={80}
              />
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};

export const Divider = () => <div className="rds-comp-toolbar__divider" />;

export const getToolbarConfig = (type: ToolbarType | string): ToolbarConfig => {
  switch (type) {
    case ToolbarType.InlineEditor:
    case 'inline-editor':
      return {
        sections: [
          [
            { icon: <FormatBold />, action: 'bold', ariaLabel: 'Bold' },
            { icon: <FormatItalic />, action: 'italic', ariaLabel: 'Italic' },
            { icon: <FormatUnderlined />, action: 'underline', ariaLabel: 'Underline' },
            { icon: <FormatStrikethrough />, action: 'strikethrough', ariaLabel: 'Strikethrough' },
            { icon: <span className="rds-comp-toolbar__text-icon">A</span>, action: 'textFormat', hasDropdown: true, ariaLabel: 'Text Format' },
            { icon: <InsertEmoticon />, action: 'emoji', hasDropdown: true, ariaLabel: 'Insert Emoji' },
            { icon: <span className="rds-comp-toolbar__text-icon">¶</span>, action: 'paragraph', hasDropdown: true, ariaLabel: 'Paragraph' },
            { icon: <FormatColorText />, action: 'textColor', hasDropdown: true, ariaLabel: 'Text Color' },
            { icon: <FormatListBulleted />, action: 'bulletList', hasDropdown: true, ariaLabel: 'Bullet List' },
            { icon: <FormatListNumbered />, action: 'numberList', hasDropdown: true, ariaLabel: 'Numbered List' },
            { icon: <FormatIndentIncrease />, action: 'indent', ariaLabel: 'Increase Indent' },
            { icon: <FormatIndentDecrease />, action: 'outdent', ariaLabel: 'Decrease Indent' },
            { icon: <TableChart />, action: 'table', ariaLabel: 'Insert Table' },
            { icon: <Link />, action: 'linkAction', ariaLabel: 'Link Action' },
            { icon: <Image />, action: 'image', ariaLabel: 'Insert Image' },
            { icon: <span className="rds-comp-toolbar__text-icon">📄</span>, action: 'document', ariaLabel: 'Document' },
            { icon: <Videocam />, action: 'video', ariaLabel: 'Insert Video' },
            { icon: <Undo />, action: 'undo', ariaLabel: 'Undo' },
            { icon: <Redo />, action: 'redo', ariaLabel: 'Redo' },
            { icon: <MoreVert />, action: 'more', ariaLabel: 'More Options' }, 
          ]
        ]
      };
    
    case ToolbarType.MoreText:
    case 'more-text':
      return {
        sections: [
          [
            { icon: <FormatBold />, action: 'bold', ariaLabel: 'Bold' },
            { icon: <FormatItalic />, action: 'italic', ariaLabel: 'Italic' },
            { icon: <FormatUnderlined />, action: 'underline', ariaLabel: 'Underline' },
            { icon: <FormatStrikethrough />, action: 'strikethrough', ariaLabel: 'Strikethrough' },
            { icon: <span className="rds-comp-toolbar__text-icon">A</span>, action: 'textFormat', hasDropdown: true, ariaLabel: 'Text Format' },
            { icon: <InsertEmoticon />, action: 'emoji', hasDropdown: true, ariaLabel: 'Insert Emoji' },
            { icon: <span className="rds-comp-toolbar__text-icon">¶</span>, action: 'paragraph', hasDropdown: true, ariaLabel: 'Paragraph' },
            { icon: <FormatColorText />, action: 'textColor', hasDropdown: true, ariaLabel: 'Text Color' },
            { icon: <FormatListBulleted />, action: 'bulletList', hasDropdown: true, ariaLabel: 'Bullet List' },
            { icon: <FormatListNumbered />, action: 'numberList', hasDropdown: true, ariaLabel: 'Numbered List' },
            { icon: <FormatIndentIncrease />, action: 'indent', ariaLabel: 'Increase Indent' },
            { icon: <FormatIndentDecrease />, action: 'outdent', ariaLabel: 'Decrease Indent' },
            { icon: <TableChart />, action: 'table', ariaLabel: 'Insert Table' },
            { icon: <Link />, action: 'linkAction', ariaLabel: 'Link Action' },
            { icon: <Image />, action: 'image', ariaLabel: 'Insert Image' },
            { icon: <span className="rds-comp-toolbar__text-icon">📄</span>, action: 'document', ariaLabel: 'Document' },
            { icon: <Videocam />, action: 'video', ariaLabel: 'Insert Video' },
             { icon: <Undo />, action: 'undo', ariaLabel: 'Undo', className: 'rds-comp-toolbar__button--muted' },
            { icon: <Redo />, action: 'redo', ariaLabel: 'Redo', className: 'rds-comp-toolbar__button--muted' },
            { icon: <MoreVert />, action: 'more', ariaLabel: 'More Options' },
          ],
          [
            { icon: <FormatStrikethrough />, action: 'strikethrough2', ariaLabel: 'Strikethrough' },
            { icon: <span className="rds-comp-toolbar__text-icon">x₂</span>, action: 'subscript', ariaLabel: 'Subscript' },
            { icon: <span className="rds-comp-toolbar__text-icon">x²</span>, action: 'superscript', ariaLabel: 'Superscript' },
            { icon: <FontDownload />, action: 'fontStyle', hasDropdown: true, ariaLabel: 'Font Style' },
            { icon: <TextFields />, action: 'fontSize', hasDropdown: true, ariaLabel: 'Font Size' },
            { icon: <span className="rds-comp-toolbar__text-icon">🖊</span>, action: 'pen', ariaLabel: 'Pen' },
            { icon: <span className="rds-comp-toolbar__text-icon">🖍</span>, action: 'marker', hasDropdown: true, ariaLabel: 'Marker' },
            { icon: <Highlight />, action: 'highlight', hasDropdown: true, ariaLabel: 'Highlight' },
            { icon: <FormatColorText />, action: 'textColor2', ariaLabel: 'Text Color' },
          ]
        ]
      };

    case ToolbarType.MoreParagraph:
    case 'more-paragraph':
      return {
        sections: [
          [
            { icon: <FormatBold />, action: 'bold', ariaLabel: 'Bold' },
            { icon: <FormatItalic />, action: 'italic', ariaLabel: 'Italic' },
            { icon: <FormatUnderlined />, action: 'underline', ariaLabel: 'Underline' },
            { icon: <FormatStrikethrough />, action: 'strikethrough', ariaLabel: 'Strikethrough' },
            { icon: <span className="rds-comp-toolbar__text-icon">A</span>, action: 'textFormat', hasDropdown: true, ariaLabel: 'Text Format' },
            { icon: <InsertEmoticon />, action: 'emoji', hasDropdown: true, ariaLabel: 'Insert Emoji' },
            { icon: <span className="rds-comp-toolbar__text-icon">¶</span>, action: 'paragraph', hasDropdown: true, ariaLabel: 'Paragraph' },
            { icon: <FormatColorText />, action: 'textColor', hasDropdown: true, ariaLabel: 'Text Color' },
            { icon: <FormatListBulleted />, action: 'bulletList', hasDropdown: true, ariaLabel: 'Bullet List' },
            { icon: <FormatListNumbered />, action: 'numberList', hasDropdown: true, ariaLabel: 'Numbered List' },
            { icon: <FormatIndentIncrease />, action: 'indent', ariaLabel: 'Increase Indent' },
            { icon: <FormatIndentDecrease />, action: 'outdent', ariaLabel: 'Decrease Indent' },
            { icon: <TableChart />, action: 'table', ariaLabel: 'Insert Table' },
            { icon: <Link />, action: 'linkAction', ariaLabel: 'Link Action' },
            { icon: <Image />, action: 'image', ariaLabel: 'Insert Image' },
            { icon: <span className="rds-comp-toolbar__text-icon">📄</span>, action: 'document', ariaLabel: 'Document' },
            { icon: <Videocam />, action: 'video', ariaLabel: 'Insert Video' },
            { icon: <Undo />, action: 'undo', ariaLabel: 'Undo' },
            { icon: <Redo />, action: 'redo', ariaLabel: 'Redo' },
            { icon: <MoreVert />, action: 'more', ariaLabel: 'More Options' },
          ],
          [
            { icon: <FormatAlignLeft />, action: 'alignLeft', ariaLabel: 'Align Left' },
            { icon: <FormatAlignCenter />, action: 'alignCenter', ariaLabel: 'Align Center' },
            { icon: <FormatAlignRight />, action: 'alignRight', ariaLabel: 'Align Right' },
            { icon: <FormatAlignJustify />, action: 'alignJustify', ariaLabel: 'Align Justify' },
            { icon: <FormatIndentDecrease />, action: 'outdent2', hasDropdown: true, ariaLabel: 'Decrease Indent' },
            { icon: <FormatIndentIncrease />, action: 'indent2', hasDropdown: true, ariaLabel: 'Increase Indent' },
            { icon: <span className="rds-comp-toolbar__text-icon">¶+</span>, action: 'paragraphPlus', hasDropdown: true, ariaLabel: 'Paragraph Plus' },
            { icon: <span className="rds-comp-toolbar__text-icon">🖍+</span>, action: 'markerPlus', hasDropdown: true, ariaLabel: 'Marker Plus' },
            { icon: <span className="rds-comp-toolbar__text-icon">📋</span>, action: 'clipboard', ariaLabel: 'Clipboard' },
            { icon: <FormatListBulleted />, action: 'bulletList2', ariaLabel: 'Bullet List' },
            { icon: <FormatQuote />, action: 'quote', hasDropdown: true, ariaLabel: 'Quote' },
          ]
        ]
      };

    case ToolbarType.MoreRichContent:
    case 'more-rich-content':
      return {
        sections: [
          [
            { icon: <FormatBold />, action: 'bold', ariaLabel: 'Bold' },
            { icon: <FormatItalic />, action: 'italic', ariaLabel: 'Italic' },
            { icon: <FormatUnderlined />, action: 'underline', ariaLabel: 'Underline' },
            { icon: <FormatStrikethrough />, action: 'strikethrough', ariaLabel: 'Strikethrough' },
            { icon: <span className="rds-comp-toolbar__text-icon">A</span>, action: 'textFormat', hasDropdown: true, ariaLabel: 'Text Format' },
            { icon: <InsertEmoticon />, action: 'emoji', hasDropdown: true, ariaLabel: 'Insert Emoji' },
            { icon: <span className="rds-comp-toolbar__text-icon">¶</span>, action: 'paragraph', hasDropdown: true, ariaLabel: 'Paragraph' },
            { icon: <FormatColorText />, action: 'textColor', hasDropdown: true, ariaLabel: 'Text Color' },
            { icon: <FormatListBulleted />, action: 'bulletList', hasDropdown: true, ariaLabel: 'Bullet List' },
            { icon: <FormatListNumbered />, action: 'numberList', hasDropdown: true, ariaLabel: 'Numbered List' },
            { icon: <FormatIndentIncrease />, action: 'indent', ariaLabel: 'Increase Indent' },
            { icon: <FormatIndentDecrease />, action: 'outdent', ariaLabel: 'Decrease Indent' },
            { icon: <TableChart />, action: 'table', ariaLabel: 'Insert Table' },
            { icon: <Link />, action: 'linkAction', ariaLabel: 'Link Action' },
            { icon: <Image />, action: 'image', ariaLabel: 'Insert Image' },
            { icon: <span className="rds-comp-toolbar__text-icon">📄</span>, action: 'document', ariaLabel: 'Document' },
            { icon: <Videocam />, action: 'video', ariaLabel: 'Insert Video' },
            { icon: <Undo />, action: 'undo', ariaLabel: 'Undo' },
            { icon: <Redo />, action: 'redo', ariaLabel: 'Redo' },
            { icon: <MoreVert />, action: 'more', ariaLabel: 'More Options' },
          ],
          [
            { icon: <TableChart />, action: 'insertTable', ariaLabel: 'Insert Table' },
            { icon: <InsertEmoticon />, action: 'insertEmoji', hasDropdown: true, ariaLabel: 'Insert Emoji' },
            { icon: <span className="rds-comp-toolbar__text-icon">Ω</span>, action: 'omega', ariaLabel: 'Omega' },
            { icon: <span className="rds-comp-toolbar__text-icon">📄</span>, action: 'insertDocument', ariaLabel: 'Insert Document' },
            { icon: <HorizontalRule />, action: 'horizontalRule', ariaLabel: 'Horizontal Rule' },
          ]
        ]
      };

    case ToolbarType.Misc:
    case 'misc':
      return {
        sections: [
          [
            { icon: <FormatBold />, action: 'bold', ariaLabel: 'Bold' },
            { icon: <FormatItalic />, action: 'italic', ariaLabel: 'Italic' },
            { icon: <FormatUnderlined />, action: 'underline', ariaLabel: 'Underline' },
            { icon: <FormatStrikethrough />, action: 'strikethrough', ariaLabel: 'Strikethrough' },
            { icon: <span className="rds-comp-toolbar__text-icon">A</span>, action: 'textFormat', hasDropdown: true, ariaLabel: 'Text Format' },
            { icon: <InsertEmoticon />, action: 'emoji', hasDropdown: true, ariaLabel: 'Insert Emoji' },
            { icon: <span className="rds-comp-toolbar__text-icon">¶</span>, action: 'paragraph', hasDropdown: true, ariaLabel: 'Paragraph' },
            { icon: <FormatColorText />, action: 'textColor', hasDropdown: true, ariaLabel: 'Text Color' },
            { icon: <FormatListBulleted />, action: 'bulletList', hasDropdown: true, ariaLabel: 'Bullet List' },
            { icon: <FormatListNumbered />, action: 'numberList', hasDropdown: true, ariaLabel: 'Numbered List' },
            { icon: <FormatIndentIncrease />, action: 'indent', ariaLabel: 'Increase Indent' },
            { icon: <FormatIndentDecrease />, action: 'outdent', ariaLabel: 'Decrease Indent' },
            { icon: <TableChart />, action: 'table', ariaLabel: 'Insert Table' },
            { icon: <Link />, action: 'linkAction', ariaLabel: 'Link Action' },
            { icon: <Image />, action: 'image', ariaLabel: 'Insert Image' },
            { icon: <span className="rds-comp-toolbar__text-icon">📄</span>, action: 'document', ariaLabel: 'Document' },
            { icon: <Videocam />, action: 'video', ariaLabel: 'Insert Video' },
            { icon: <Undo />, action: 'undo', ariaLabel: 'Undo' },
            { icon: <Redo />, action: 'redo', ariaLabel: 'Redo' },
            { icon: <MoreVert />, action: 'more', ariaLabel: 'More Options' },
          ],
          [
            { icon: <span className="rds-comp-toolbar__text-icon">↶</span>, action: 'rotate', ariaLabel: 'Rotate' },
            { icon: <span className="rds-comp-toolbar__text-icon">🖨</span>, action: 'print', ariaLabel: 'Print' },
            { icon: <span className="rds-comp-toolbar__text-icon">📄</span>, action: 'document2', ariaLabel: 'Document' },
            { icon: <span className="rds-comp-toolbar__text-icon">A</span>, action: 'textTool', ariaLabel: 'Text Tool' },
            { icon: <span className="rds-comp-toolbar__text-icon">#</span>, action: 'hash', ariaLabel: 'Hash' },
            { icon: <Code />, action: 'code', ariaLabel: 'Code' },
            { icon: <span className="rds-comp-toolbar__text-icon">?</span>, action: 'help', ariaLabel: 'Help' },
          ]
        ]
      };

    case ToolbarType.FullFeatured:
    case 'full-featured':
    default:
      return {
        sections: [
          [
            { icon: <FormatBold />, action: 'bold', ariaLabel: 'Bold' },
            { icon: <FormatItalic />, action: 'italic', ariaLabel: 'Italic' },
            { icon: <FormatUnderlined />, action: 'underline', ariaLabel: 'Underline' },
            { icon: <FormatStrikethrough />, action: 'strikethrough', ariaLabel: 'Strikethrough' },
            { icon: <span className="rds-comp-toolbar__text-icon">A</span>, action: 'textFormat', hasDropdown: true, ariaLabel: 'Text Format' },
            { icon: <InsertEmoticon />, action: 'emoji', hasDropdown: true, ariaLabel: 'Insert Emoji' },
            { icon: <span className="rds-comp-toolbar__text-icon">¶</span>, action: 'paragraph', hasDropdown: true, ariaLabel: 'Paragraph' },
            { icon: <FormatColorText />, action: 'textColor', hasDropdown: true, ariaLabel: 'Text Color' },
            { icon: <FormatListBulleted />, action: 'bulletList', hasDropdown: true, ariaLabel: 'Bullet List' },
            { icon: <FormatListNumbered />, action: 'numberList', hasDropdown: true, ariaLabel: 'Numbered List' },
            { icon: <FormatIndentIncrease />, action: 'indent', ariaLabel: 'Increase Indent' },
            { icon: <FormatIndentDecrease />, action: 'outdent', ariaLabel: 'Decrease Indent' },
            { icon: <TableChart />, action: 'table', ariaLabel: 'Insert Table' },
            { icon: <Link />, action: 'linkAction', ariaLabel: 'Link Action' },
            { icon: <Image />, action: 'image', ariaLabel: 'Insert Image' },
            { icon: <span className="rds-comp-toolbar__text-icon">📄</span>, action: 'document', ariaLabel: 'Document' },
            { icon: <Videocam />, action: 'video', ariaLabel: 'Insert Video' },
            { icon: <Undo />, action: 'undo', ariaLabel: 'Undo' },
            { icon: <Redo />, action: 'redo', ariaLabel: 'Redo' },
            { icon: <MoreVert />, action: 'more', ariaLabel: 'More Options' },
          ]
        ]
      };
  }
};

ToolbarButton.displayName = 'ToolbarButton';
Divider.displayName = 'Divider';
