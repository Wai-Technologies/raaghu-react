
import React, { useState } from "react";
import { getToolbarConfig, ToolbarButton } from "./rds-comp-toolbar-config";
import "./rds-comp-toolbar.scss";

export interface RdsCompToolbarProps {
  layout?: 'primary' | 'secondary';
  type?: 'inline-editor' | 'full-featured' | 'more-text' | 'more-paragraph' | 'more-rich-content' | 'misc';
  state?: 'off' | 'on' | 'disabled-on' | 'disabled-off';
  onAction?: (action: string) => void;
  className?: string;
  'data-testid'?: string;
}

const RdsCompToolbar: React.FC<RdsCompToolbarProps> = ({
  layout = 'primary',
  type = 'full-featured',
  state = 'on',
  onAction,
  className = '',
  'data-testid': testId,
  ...props
}) => {
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  const isDisabled = state === 'disabled-on' || state === 'disabled-off';
  const toolbarConfig = getToolbarConfig(type);

  const handleFormatClick = (format: string) => {
    if (isDisabled) return;
    setActiveFormats(prev =>
      prev.includes(format)
        ? prev.filter(f => f !== format)
        : [...prev, format]
    );
    onAction?.(format);
  };

  const isActive = (format: string) => activeFormats.includes(format);

  return (
    <div
      className={`rds-comp-toolbar rds-comp-toolbar--${layout} rds-comp-toolbar--${type} rds-comp-toolbar--${state} ${className}`}
      data-testid={testId}
      role="toolbar"
      aria-label={`${type} toolbar`}
      {...props}
    >
      {layout === 'primary' ? (
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
                    onClick={() => handleFormatClick(button.action)}
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
                    onClick={() => handleFormatClick(button.action)}
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

export default RdsCompToolbar;