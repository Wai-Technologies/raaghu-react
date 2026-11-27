import { useRef, useState, type ChangeEvent, type KeyboardEvent, type ReactNode, type RefObject } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { CustomInputWithClear, renderPickerIcon } from "./CustomInputWithClear";
import { DatepickerCalendar } from "./rds-comp-datepicker-calendar";

dayjs.extend(customParseFormat);

const FIELD_FORMAT = "MM/DD/YYYY";
const formatFieldDate = (date: Date | null) => (date ? dayjs(date).format(FIELD_FORMAT) : "");

export interface DatepickerSharedProps {
  layout?: string;
  datePickerStyleType?: string;
  minDate?: Date;
  maxDate?: Date;
  locale?: string;
  isDisabled?: boolean;
  isMandatory?: boolean;
  placeholderText?: string;
  showClearDate?: boolean;
  clearDate?: () => void;
  changeIcon?: string;
  openPickerIcon?: ReactNode;
  inputId?: string;
  idPrefix?: string;
  isCompact?: boolean;
  titleText?: string;
  showTitle?: boolean;
}

const resolveInputAriaLabel = (props: DatepickerSharedProps): string | undefined => {
  if (props.showTitle) return undefined;
  const label = props.titleText?.trim() || props.placeholderText?.trim();
  return label || "Select date";
};

const useTypedDate = (date: Date | null, onDate: (date: Date | null) => void, props: DatepickerSharedProps) => {
  const [draft, setDraft] = useState<string | null>(null);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value;
    setDraft(raw);
    if (raw === "") {
      onDate(null);
      return;
    }
    const parsed = dayjs(raw, FIELD_FORMAT, true);
    if (!parsed.isValid()) return;
    if (props.minDate && parsed.isBefore(props.minDate, "day")) return;
    if (props.maxDate && parsed.isAfter(props.maxDate, "day")) return;
    onDate(parsed.toDate());
  };
  return { value: draft ?? formatFieldDate(date), onChange, onBlur: () => setDraft(null) };
};

interface PopperPanelProps {
  anchorEl: HTMLElement | null;
  placement?: "bottom-start" | "right-start";
  ariaLabel: string;
  onClose: (restoreFocus: boolean) => void;
  children: ReactNode;
  modifiers?: object[];
}

const PopperPanel = ({ anchorEl, placement = "bottom-start", ariaLabel, onClose, children, modifiers }: PopperPanelProps) => (
  <Popper
    open
    anchorEl={anchorEl}
    placement={placement}
    className="rds-datepicker__popper"
    modifiers={[{ name: "offset", options: { offset: [0, 4] } }, ...(modifiers ?? [])]}
  >
    <ClickAwayListener
      onClickAway={(event) => {
        if (anchorEl?.contains(event.target as Node)) return;
        onClose(false);
      }}
    >
      <Paper
        elevation={0}
        role="dialog"
        aria-label={ariaLabel}
        className="rds-datepicker__calendar"
        onKeyDown={(event: KeyboardEvent) => {
          if (event.key === "Escape") {
            event.stopPropagation();
            onClose(true);
          }
        }}
      >
        {children}
      </Paper>
    </ClickAwayListener>
  </Popper>
);

const DefaultTypeView = ({
  startDate,
  onSingleChange,
  props,
}: {
  startDate: Date | null;
  onSingleChange: (date: Date | null) => void;
  props: DatepickerSharedProps;
}) => {
  const [openState, setOpenState] = useState<"closed" | "pointer" | "keyboard">("closed");
  const open = openState !== "closed";
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const typed = useTypedDate(startDate, onSingleChange, props);
  const popupId = `${props.idPrefix}-calendar`;

  const close = (restoreFocus: boolean) => {
    setOpenState("closed");
    if (restoreFocus) inputRef.current?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpenState("keyboard");
    } else if (event.key === "Escape" && open) {
      setOpenState("closed");
    }
  };

  return (
    <div className="rds-datepicker__container rds-datepicker__container--default-type">
      <div className="rds-datepicker__wrapper" ref={setContainerEl}>
        <CustomInputWithClear
          ref={inputRef}
          id={props.inputId}
          value={typed.value}
          onChange={typed.onChange}
          onBlur={typed.onBlur}
          onKeyDown={onKeyDown}
          placeholder={props.placeholderText || "Select date"}
          isDisabled={props.isDisabled}
          aria-required={props.isMandatory ? "true" : undefined}
          aria-label={resolveInputAriaLabel(props)}
          showClearDate={props.showClearDate}
          clearDate={props.clearDate}
          changeIcon={props.changeIcon}
          openPickerIcon={props.openPickerIcon}
          openCustomPicker={() => setOpenState((prev) => (prev === "closed" ? "keyboard" : "closed"))}
          onInputClick={() => setOpenState((prev) => (prev === "closed" ? "pointer" : prev))}
          expanded={open}
          controlsId={popupId}
        />
        {open && !props.isDisabled && (
          <PopperPanel anchorEl={containerEl} ariaLabel="Choose date" onClose={close}>
            <div id={popupId}>
              <DatepickerCalendar
                mode="single"
                start={startDate}
                onSelect={(date) => {
                  onSingleChange(date);
                  close(true);
                }}
                layout={props.layout}
                datePickerStyleType={props.datePickerStyleType}
                minDate={props.minDate}
                maxDate={props.maxDate}
                locale={props.locale}
                autoFocus={openState === "keyboard"}
              />
            </div>
          </PopperPanel>
        )}
      </div>
    </div>
  );
};

export interface DatepickerTypeViewProps {
  type: string;
  startDate: Date | null;
  endDate: Date | null;
  onSingleChange: (date: Date | null) => void;
  onRangeChange: (dates: [Date | null, Date | null]) => void;
  props: DatepickerSharedProps;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  dropdownDisplayValue: string;
  activeList: string;
  todayClickHandler: () => void;
  yesterdayClickHandler: () => void;
  lastSevenDaysClickHandler: () => void;
  lastFourteenDaysClickHandler: () => void;
  customClickHandler: () => void;
  customDropdownRef?: RefObject<HTMLDivElement | null>;
}

const PRESET_MODIFIERS = [
  { name: "flip", options: { fallbackPlacements: ["left-start", "bottom-start"] } },
  { name: "preventOverflow", options: { boundary: "viewport" } },
  { name: "offset", options: { offset: [0, 8] } },
];

const CustomTypeView = ({
  startDate,
  endDate,
  onSingleChange,
  onRangeChange,
  props,
  isDropdownOpen,
  toggleDropdown,
  dropdownDisplayValue,
  activeList,
  todayClickHandler,
  yesterdayClickHandler,
  lastSevenDaysClickHandler,
  lastFourteenDaysClickHandler,
  customClickHandler,
  customDropdownRef,
}: DatepickerTypeViewProps) => {
  const [rangeOpen, setRangeOpen] = useState(false);
  const [customItemEl, setCustomItemEl] = useState<HTMLLIElement | null>(null);
  const customButtonRef = useRef<HTMLButtonElement | null>(null);
  const typed = useTypedDate(startDate, onSingleChange, props);
  const prefix = props.idPrefix;
  const rangeVisible = rangeOpen && isDropdownOpen && !props.isDisabled;

  const preset = (id: string, label: string, handler: () => void) => (
    <li
      id={`${prefix}-${id}`}
      className={`rds-datepicker__dropdown-item ${activeList === id ? "rds-datepicker__dropdown-item--active" : ""}`}
    >
      <button
        type="button"
        className="rds-datepicker__dropdown-action"
        onClick={() => {
          setRangeOpen(false);
          handler();
        }}
      >
        {label}
      </button>
    </li>
  );

  return (
    <div className="rds-datepicker__custom-dropdown" ref={customDropdownRef}>
      <CustomInputWithClear
        id={props.inputId}
        value={typed.value}
        onChange={typed.onChange}
        onBlur={typed.onBlur}
        placeholder={props.placeholderText || "Select date"}
        isDisabled={props.isDisabled}
        aria-required={props.isMandatory ? "true" : undefined}
        aria-label={resolveInputAriaLabel(props)}
        showClearDate={props.showClearDate}
        clearDate={props.clearDate}
        changeIcon={props.changeIcon}
        openPickerIcon={props.openPickerIcon}
        openCustomPicker={toggleDropdown}
        expanded={isDropdownOpen}
        controlsId={`${prefix}-presets`}
      />

      <ul
        id={`${prefix}-presets`}
        className={`rds-datepicker__dropdown-menu ${isDropdownOpen ? "rds-datepicker__dropdown-menu--show" : ""}`}
      >
        <li className="rds-datepicker__dropdown-item rds-datepicker__dropdown-item--header">
          <strong className="rds-datepicker__dropdown-label">Custom Date</strong>
          {dropdownDisplayValue ? <span className="rds-datepicker__dropdown-value">{dropdownDisplayValue}</span> : null}
        </li>
        {preset("today", "Today", todayClickHandler)}
        {preset("yesterday", "Yesterday", yesterdayClickHandler)}
        {preset("lastSeven", "Last 7 days", lastSevenDaysClickHandler)}
        {preset("lastFourteen", "Last 14 days", lastFourteenDaysClickHandler)}
        <li
          id={`${prefix}-custom`}
          ref={setCustomItemEl}
          className={`rds-datepicker__dropdown-item rds-datepicker__dropdown-item--custom ${
            activeList === "custom" ? "rds-datepicker__dropdown-item--active" : ""
          }`}
        >
          <button
            type="button"
            ref={customButtonRef}
            className="rds-datepicker__dropdown-action rds-datepicker__dropdown-action--custom"
            aria-haspopup="dialog"
            aria-expanded={rangeVisible}
            disabled={props.isDisabled}
            onClick={() => {
              customClickHandler();
              setRangeOpen((prev) => !prev);
            }}
          >
            Custom
          </button>
          <span className="rds-datepicker__dropdown-custom-icon" aria-hidden="true">
            {renderPickerIcon(props.changeIcon, props.openPickerIcon)}
          </span>
          {rangeVisible && (
            <PopperPanel
              anchorEl={customItemEl}
              placement={props.isCompact ? "bottom-start" : "right-start"}
              ariaLabel="Choose date range"
              modifiers={PRESET_MODIFIERS}
              onClose={(restoreFocus) => {
                setRangeOpen(false);
                if (restoreFocus) customButtonRef.current?.focus();
              }}
            >
              <DatepickerCalendar
                mode="range"
                start={startDate}
                end={endDate}
                onSelect={(start, end) => {
                  onRangeChange([start, end]);
                  if (end) setRangeOpen(false);
                }}
                layout={props.layout}
                datePickerStyleType={props.datePickerStyleType}
                minDate={props.minDate}
                maxDate={props.maxDate}
                locale={props.locale}
                autoFocus
              />
            </PopperPanel>
          )}
        </li>
      </ul>
    </div>
  );
};

export const DatepickerTypeView = (viewProps: DatepickerTypeViewProps) => {
  if (viewProps.type === "Default") {
    return <DefaultTypeView startDate={viewProps.startDate} onSingleChange={viewProps.onSingleChange} props={viewProps.props} />;
  }
  if (viewProps.type === "Custom") return <CustomTypeView {...viewProps} />;
  return null;
};

