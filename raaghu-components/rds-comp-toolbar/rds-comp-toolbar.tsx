import { useState, useEffect, useRef, useCallback, useMemo, Fragment } from "react";
import clsx from 'clsx';
import { getToolbarConfig, ToolbarButton } from "./rds-comp-toolbar-config";
import "./rds-comp-toolbar.scss";

export enum ToolbarLayout {
  Primary = 'primary',
  Secondary = 'secondary'
}

export enum ToolbarType {
  InlineEditor = 'inline-editor',
  FullFeatured = 'full-featured',
  MoreText = 'more-text',
  MoreParagraph = 'more-paragraph',
  MoreRichContent = 'more-rich-content',
  Misc = 'misc'
}

export enum ToolbarState {
  Off = 'off',
  On = 'on',
  DisabledOn = 'disabled-on',
  DisabledOff = 'disabled-off'
}

export interface RdsCompToolbarProps {
  layout?: ToolbarLayout;
  type?: ToolbarType;
  state?: ToolbarState;
  onAction?: (action: string) => void;
  className?: string;
  'data-testid'?: string;
}

const RdsCompToolbar = ({
  layout = ToolbarLayout.Primary,
  type = ToolbarType.FullFeatured,
  state = ToolbarState.On,
  onAction,
  className = '',
  'data-testid': testId,
  ...props
}) => {
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const isDisabled = state === ToolbarState.DisabledOn;
  const toolbarConfig = useMemo(() => getToolbarConfig(type), [type]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      try {
        const el = event.target as Element | null;
        if (el && typeof el.closest === 'function') {
          const closestDropdown = el.closest('.rds-comp-toolbar__dropdown');
          if (closestDropdown) return;
        }
      } catch (e) {
        // handled
      }

      if (toolbarRef.current && !toolbarRef.current.contains(target)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openDropdown]);

  const handleFormatClick = useCallback((format: string, hasDropdown?: boolean) => {
    if (isDisabled) return;
    
    if (hasDropdown) {
      setOpenDropdown(openDropdown === format ? null : format);
    } else {
      setOpenDropdown(null);
      setActiveFormats(prev =>
        prev.includes(format)
          ? prev.filter(f => f !== format)
          : [...prev, format]
      );
    }
    onAction?.(format);
  }, [isDisabled, openDropdown, onAction]);

  const handleDropdownSelect = useCallback((parentAction: string, option: string) => {
    const isEmojiAction = parentAction === 'emoji' || parentAction === 'insertEmoji';

    if (!isEmojiAction) {
      setOpenDropdown(null);
    }

    if (!isEmojiAction) {
      setActiveFormats(prev => [...prev.filter(f => f !== parentAction), option]);
    }

    onAction?.(option);
  }, [onAction]);

  const isActive = useCallback((format: string) => activeFormats.includes(format), [activeFormats]);

  const renderSectionButtons = useCallback((section: ToolbarButton[]) => (
    <div className="rds-comp-toolbar__section">
      {section.map((button, buttonIndex) => (
        <ToolbarButton
          key={buttonIndex}
          icon={button.icon}
          action={button.action}
          hasDropdown={button.hasDropdown}
          ariaLabel={button.ariaLabel}
          isActive={isActive(button.action)}
          isDisabled={isDisabled}
          isDropdownOpen={openDropdown === button.action}
          onClick={() => handleFormatClick(button.action, button.hasDropdown)}
          onDropdownSelect={handleDropdownSelect}
        />
      ))}
    </div>
  ), [isActive, isDisabled, openDropdown, handleFormatClick, handleDropdownSelect]);

  return (
    <div
      ref={toolbarRef}
      className={clsx(
        "rds-comp-toolbar",
        layout === ToolbarLayout.Primary ? "rds-comp-toolbar--primary" : "rds-comp-toolbar--secondary",
        `rds-comp-toolbar--${type}`,
        `rds-comp-toolbar--${state}`,
        className
      )}
      data-testid={testId}
      role="toolbar"
      aria-label={`${type} toolbar`}
      {...props}
    >
      {layout === ToolbarLayout.Primary ? (
        <div className="rds-comp-toolbar__row">
          {toolbarConfig.sections.map((section, sectionIndex) => (
            <Fragment key={sectionIndex}>
              {sectionIndex > 0 && <div className="rds-comp-toolbar__divider" />}
              {renderSectionButtons(section)}
            </Fragment>
          ))}
        </div>
      ) : (
        <>
          {toolbarConfig.sections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className={clsx("rds-comp-toolbar__row", sectionIndex === 1 && "rds-comp-toolbar__row--secondary")}
            >
              {renderSectionButtons(section)}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
RdsCompToolbar.displayName = "RdsCompToolbar";
export default RdsCompToolbar;