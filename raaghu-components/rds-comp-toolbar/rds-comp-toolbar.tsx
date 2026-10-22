import { useState, useEffect, useRef, Fragment } from "react";
import { useForkRef } from "@mui/material/utils";
export { ToolbarLayout, ToolbarType, ToolbarState, type RdsCompToolbarProps } from './rds-comp-toolbar-types';
import { ToolbarLayout, ToolbarType, ToolbarState, type RdsCompToolbarProps } from './rds-comp-toolbar-types';
import clsx from 'clsx';
import { ToolbarButton } from "./rds-comp-toolbar-config";
import { type ToolbarButtonConfig } from "./rds-comp-toolbar-config-types";
export type { ToolbarButtonConfig, ToolbarConfig, ToolbarOption } from "./rds-comp-toolbar-config-types";
import { getToolbarConfig } from "./rds-comp-toolbar-config-data";
import { buttonHasDropdown, isEmojiAction } from "./rds-comp-toolbar-dropdown-options";
import "./rds-comp-toolbar.scss";


function ToolbarSectionButtons({
  section,
  sectionIndex,
  isActive,
  isDisabled,
  openDropdown,
  handleFormatClick,
  handleDropdownSelect,
  closeDropdown,
}: {
  section: ToolbarButtonConfig[];
  sectionIndex: number;
  isActive: (format: string) => boolean;
  isDisabled: boolean;
  openDropdown: string | null;
  handleFormatClick: (format: string, hasDropdown?: boolean) => void;
  handleDropdownSelect: (parentAction: string, option: string) => void;
  closeDropdown: () => void;
}) {
  return (
    <Fragment>
      {sectionIndex > 0 && <div className="rds-comp-toolbar__divider" />}
      <div className="rds-comp-toolbar__section">
        {section.map((button) => {
          const hasDropdown = buttonHasDropdown(button);
          return (
            <ToolbarButton
              key={button.action}
              icon={button.icon}
              action={button.action}
              hasDropdown={hasDropdown}
              options={button.options}
              ariaLabel={button.ariaLabel}
              isActive={isActive(button.action)}
              isDisabled={isDisabled}
              dropdownAction={openDropdown}
              onClick={() => handleFormatClick(button.action, hasDropdown)}
              onDropdownSelect={handleDropdownSelect}
              onDropdownClose={closeDropdown}
            />
          );
        })}
      </div>
    </Fragment>
  );
}

/**
 * Formatting toolbar with preset button sets (`type`) or custom `items`.
 * Active formats can be controlled with `value`/`onChange`.
 */
const RdsCompToolbar = ({
  layout: layoutProp = ToolbarLayout.Primary,
  variant,
  type: typeProp = ToolbarType.FullFeatured,
  preset,
  state = ToolbarState.On,
  disabled,
  items,
  value,
  defaultValue,
  onChange,
  onAction,
  onOptionSelect,
  className = '',
  'data-testid': testId,
  ref,
  ...props
}: RdsCompToolbarProps) => {
  const layout = variant ?? layoutProp;
  const type = preset ?? typeProp;
  const [internalFormats, setInternalFormats] = useState<string[]>(defaultValue ?? []);
  const activeFormats = value ?? internalFormats;
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const isDisabled = disabled ?? (state === ToolbarState.DisabledOn || state === ToolbarState.DisabledOff);
  const sections = items ?? getToolbarConfig(type).sections;

  const handleRef = useForkRef(toolbarRef, ref);

  useEffect(() => {
    if (!openDropdown) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target?.closest?.('.rds-comp-toolbar__dropdown')) return;
      if (toolbarRef.current && !toolbarRef.current.contains(target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  const updateFormats = (next: string[]) => {
    if (value === undefined) setInternalFormats(next);
    onChange?.(next);
  };

  const handleFormatClick = (format: string, hasDropdown?: boolean) => {
    if (isDisabled) return;

    if (hasDropdown) {
      setOpenDropdown(openDropdown === format ? null : format);
    } else {
      setOpenDropdown(null);
      updateFormats(
        activeFormats.includes(format)
          ? activeFormats.filter(f => f !== format)
          : [...activeFormats, format]
      );
    }
    onAction?.(format);
  };

  const handleDropdownSelect = (parentAction: string, option: string) => {
    if (!isEmojiAction(parentAction)) {
      setOpenDropdown(null);
      updateFormats([...activeFormats.filter(f => f !== parentAction), option]);
    }

    onAction?.(option);
    onOptionSelect?.(parentAction, option);
  };

  const closeDropdown = () => setOpenDropdown(null);
  const isActive = (format: string) => activeFormats.includes(format);

  const renderSection = (section: ToolbarButtonConfig[], sectionIndex: number) => (
    <ToolbarSectionButtons
      section={section}
      sectionIndex={sectionIndex}
      isActive={isActive}
      isDisabled={isDisabled}
      openDropdown={openDropdown}
      handleFormatClick={handleFormatClick}
      handleDropdownSelect={handleDropdownSelect}
      closeDropdown={closeDropdown}
    />
  );

  return (
    <div
      ref={handleRef}
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
      aria-disabled={isDisabled || undefined}
      {...props}
    >
      {layout === ToolbarLayout.Primary ? (
        <div className="rds-comp-toolbar__row">
          {sections.map((section, sectionIndex) => (
            <Fragment key={sectionIndex}>{renderSection(section, sectionIndex)}</Fragment>
          ))}
        </div>
      ) : (
        sections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className={clsx("rds-comp-toolbar__row", sectionIndex === 1 && "rds-comp-toolbar__row--secondary")}
          >
            {renderSection(section, sectionIndex)}
          </div>
        ))
      )}
    </div>
  );
};
RdsCompToolbar.displayName = "RdsCompToolbar";
export default RdsCompToolbar;
