import React, { useState, useEffect, useRef } from "react";
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

const RdsCompToolbar: React.FC<RdsCompToolbarProps> = ({
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
  const isDisabled = state === ToolbarState.DisabledOn || state === ToolbarState.DisabledOff;
  const toolbarConfig = getToolbarConfig(type);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openDropdown]);

  const handleFormatClick = (format: string, hasDropdown?: boolean) => {
    if (isDisabled) return;
    
    if (hasDropdown) {
      // Toggle dropdown for buttons with dropdown
      setOpenDropdown(openDropdown === format ? null : format);
    } else {
      // Close any open dropdowns when clicking non-dropdown buttons
      setOpenDropdown(null);
      // Toggle format state
      setActiveFormats(prev =>
        prev.includes(format)
          ? prev.filter(f => f !== format)
          : [...prev, format]
      );
    }
    onAction?.(format);
  };

  const handleDropdownSelect = (parentAction: string, option: string) => {
    setOpenDropdown(null);
    setActiveFormats(prev => [...prev.filter(f => f !== parentAction), option]);
    onAction?.(option);
  };

  const isActive = (format: string) => activeFormats.includes(format);

  return (
    <div
      ref={toolbarRef}
      className={`rds-comp-toolbar rds-comp-toolbar--${layout} rds-comp-toolbar--${type} rds-comp-toolbar--${state} ${className}`}
      data-testid={testId}
      role="toolbar"
      aria-label={`${type} toolbar`}
      {...props}
    >
      {layout === ToolbarLayout.Primary ? (
        <div className="rds-comp-toolbar__row">
          {toolbarConfig.sections.map((section, sectionIndex) => (
            <React.Fragment key={sectionIndex}>
              {sectionIndex > 0 && <div className="rds-comp-toolbar__divider" />}
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
            </React.Fragment>
          ))}
        </div>
      ) : (
        <>
          {toolbarConfig.sections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className={`rds-comp-toolbar__row ${sectionIndex === 1 ? 'rds-comp-toolbar__row--secondary' : ''}`}
            >
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
            </div>
          ))}
        </>
      )}
    </div>
  );
};
RdsCompToolbar.displayName = "RdsCompToolbar";
export default RdsCompToolbar;