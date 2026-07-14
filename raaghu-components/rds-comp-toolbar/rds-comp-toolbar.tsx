import { useState, useEffect, useRef, useCallback, useMemo, Fragment } from "react";
export { ToolbarLayout, ToolbarType, ToolbarState, type RdsCompToolbarProps } from './rds-comp-toolbar-types';
import { ToolbarLayout, ToolbarType, ToolbarState, type RdsCompToolbarProps } from './rds-comp-toolbar-types';
import clsx from 'clsx';
import { ToolbarButton } from "./rds-comp-toolbar-config";
import { type ToolbarButtonConfig } from "./rds-comp-toolbar-config-types";
import { getToolbarConfig } from "./rds-comp-toolbar-config-data";
import "./rds-comp-toolbar.scss";


function ToolbarSectionButtons({
  section,
  sectionIndex,
  isActive,
  isDisabled,
  openDropdown,
  handleFormatClick,
  handleDropdownSelect,
}: {
  section: ToolbarButtonConfig[];
  sectionIndex: number;
  isActive: (format: string) => boolean;
  isDisabled: boolean;
  openDropdown: string | null;
  handleFormatClick: (format: string, hasDropdown?: boolean) => void;
  handleDropdownSelect: (parentAction: string, option: string) => void;
}) {
  return (
    <Fragment>
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
            dropdownAction={openDropdown}
            onClick={() => handleFormatClick(button.action, button.hasDropdown)}
            onDropdownSelect={handleDropdownSelect}
          />
        ))}
      </div>
    </Fragment>
  );
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

  const primarySectionsContent = useMemo(
    () => toolbarConfig.sections.map((section, sectionIndex) => (
      <ToolbarSectionButtons
        key={sectionIndex}
        section={section}
        sectionIndex={sectionIndex}
        isActive={isActive}
        isDisabled={isDisabled}
        openDropdown={openDropdown}
        handleFormatClick={handleFormatClick}
        handleDropdownSelect={handleDropdownSelect}
      />
    )),
    [toolbarConfig.sections, isActive, isDisabled, openDropdown, handleFormatClick, handleDropdownSelect]
  );

  const secondarySectionsContent = useMemo(
    () => toolbarConfig.sections.map((section, sectionIndex) => (
      <div
        key={sectionIndex}
        className={clsx("rds-comp-toolbar__row", sectionIndex === 1 && "rds-comp-toolbar__row--secondary")}
      >
        <ToolbarSectionButtons
          section={section}
          sectionIndex={sectionIndex}
          isActive={isActive}
          isDisabled={isDisabled}
          openDropdown={openDropdown}
          handleFormatClick={handleFormatClick}
          handleDropdownSelect={handleDropdownSelect}
        />
      </div>
    )),
    [toolbarConfig.sections, isActive, isDisabled, openDropdown, handleFormatClick, handleDropdownSelect]
  );

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
          {primarySectionsContent}
        </div>
      ) : (
        <>
          {secondarySectionsContent}
        </>
      )}
    </div>
  );
};
RdsCompToolbar.displayName = "RdsCompToolbar";
export default RdsCompToolbar;