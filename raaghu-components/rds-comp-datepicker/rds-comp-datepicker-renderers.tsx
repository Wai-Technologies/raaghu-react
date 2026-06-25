import React from "react";
import { renderCustomHeader } from "./rds-comp-datepicker-utils";

interface DatePickerComponentProps {
  SafeDatePicker: React.ComponentType<Record<string, unknown>>;
  placeholderText?: string;
  isDisabled?: boolean;
  showClearDate?: boolean;
  clearDate?: () => void;
  changeIcon?: string;
  layout?: string;
  datePickerStyleType?: string;
}

interface StateViewContext {
  startDate: Date | null;
  handlerDateChange: (date: Date | null) => void;
  handlerDateTimeChange: (date: Date | null) => void;
  props: DatePickerComponentProps;
  datePickerRef: React.RefObject<unknown>;
  expandedDatePickerRef: React.RefObject<unknown>;
  selectedDatePickerRef: React.RefObject<unknown>;
  dayClassName: (date: Date) => string;
  CustomInputWithClear: React.ElementType;
  CustomButtons: React.ElementType;
}

function buildCommonDatePickerProps(
  ctx: StateViewContext,
  ref: React.RefObject<unknown>,
  onChange: (date: Date | null) => void,
  extraProps: Record<string, unknown> = {}
) {
  const { startDate, props, dayClassName, CustomInputWithClear, CustomButtons } = ctx;
  const SafeDatePicker = props.SafeDatePicker;

  return (
    <SafeDatePicker
      selected={startDate || null}
      onChange={onChange}
      customInput={
        <CustomInputWithClear
          placeholder={props.placeholderText || "Select date"}
          isDisabled={props.isDisabled}
          showClearDate={props.showClearDate}
          clearDate={props.clearDate}
          changeIcon={props.changeIcon}
        />
      }
      wrapperClassName="rds-datepicker__wrapper"
      disabled={props.isDisabled}
      placeholderText={props.placeholderText || "Select date"}
      showMonthYearPicker={props.layout === "Month Picker"}
      showYearPicker={props.layout === "Year Picker"}
      showPreviousMonths
      monthsShown={props.layout === "Multi Month" ? 3 : 1}
      scrollableMonthYearDropdown={props.datePickerStyleType === "Dropdown"}
      todayButton={<CustomButtons />}
      peekNextMonth={true}
      showMonthDropdown={props.datePickerStyleType === "Dropdown"}
      showYearDropdown={props.datePickerStyleType === "Dropdown"}
      dropdownMode="select"
      dayClassName={dayClassName}
      ref={ref}
      renderCustomHeader={props.layout === "Multi Month" ? renderCustomHeader : undefined}
      {...extraProps}
    />
  );
}

export function renderDefaultStateView(ctx: StateViewContext) {
  return (
    <div className="rds-datepicker__container rds-datepicker__container--default">
      {buildCommonDatePickerProps(ctx, ctx.datePickerRef, ctx.handlerDateChange)}
    </div>
  );
}

export function renderExpandedStateView(ctx: StateViewContext) {
  return (
    <div className="rds-datepicker__container rds-datepicker__container--expanded">
      {buildCommonDatePickerProps(ctx, ctx.expandedDatePickerRef, ctx.handlerDateTimeChange, {
        timeInputLabel: "Time:",
        dateFormat: "MM/dd/yyyy h:mm aa",
        autoFocus: true,
      })}
    </div>
  );
}

export function renderSelectedStateView(ctx: StateViewContext) {
  return (
    <div className="rds-datepicker__container rds-datepicker__container--selected">
      {buildCommonDatePickerProps(ctx, ctx.selectedDatePickerRef, ctx.handlerDateTimeChange, {
        timeInputLabel: "Time:",
        dateFormat: "MM/dd/yyyy",
      })}
    </div>
  );
}

export const renderDatePickerStateView = (
  state: string,
  startDate: Date | null,
  handlerDateChange: (date: Date | null) => void,
  handlerDateTimeChange: (date: Date | null) => void,
  props: DatePickerComponentProps,
  datePickerRef: React.RefObject<unknown>,
  expandedDatePickerRef: React.RefObject<unknown>,
  selectedDatePickerRef: React.RefObject<unknown>,
  dayClassName: (date: Date) => string,
  CustomInputWithClear: React.ElementType,
  CustomButtons: React.ElementType
) => {
  const ctx: StateViewContext = {
    startDate,
    handlerDateChange,
    handlerDateTimeChange,
    props,
    datePickerRef,
    expandedDatePickerRef,
    selectedDatePickerRef,
    dayClassName,
    CustomInputWithClear,
    CustomButtons,
  };

  if (state === "Default") return renderDefaultStateView(ctx);
  if (state === "Expanded") return renderExpandedStateView(ctx);
  if (state === "Selected") return renderSelectedStateView(ctx);
  return null;
};

interface TypeViewContext extends StateViewContext {
  endDate: Date | null;
  onRangeChange: (dates: [Date | null, Date | null]) => void;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  dropdownDisplayValue: string;
  activeList: string;
  todayClickHandler: () => void;
  yesterdayClickHandler: () => void;
  lastSevenDaysClickHandler: () => void;
  lastFourteenDaysClickHandler: () => void;
  ExampleCustomInput: React.ElementType;
}

export function renderDefaultTypeView(ctx: TypeViewContext) {
  return (
    <div className="rds-datepicker__container rds-datepicker__container--default-type">
      {buildCommonDatePickerProps(ctx, ctx.datePickerRef, ctx.handlerDateChange)}
    </div>
  );
}

export function renderCustomTypeView(ctx: TypeViewContext) {
  const { props, startDate, endDate, onRangeChange, isDropdownOpen, toggleDropdown, dropdownDisplayValue, activeList, dayClassName, CustomInputWithClear, CustomButtons, ExampleCustomInput } = ctx;
  const SafeDatePicker = props.SafeDatePicker;

  return (
    <div className="rds-datepicker__custom-dropdown">
      <SafeDatePicker
        selected={startDate || null}
        onChange={ctx.handlerDateChange}
        customInput={
          <CustomInputWithClear
            placeholder={props.placeholderText || "Select date"}
            isDisabled={props.isDisabled}
            showClearDate={props.showClearDate}
            clearDate={props.clearDate}
            changeIcon={props.changeIcon}
            openCustomPicker={toggleDropdown}
          />
        }
        wrapperClassName="rds-datepicker__wrapper"
        disabled={props.isDisabled}
        placeholderText={props.placeholderText || "Select date"}
        showMonthYearPicker={props.layout === "Month Picker"}
        showYearPicker={props.layout === "Year Picker"}
        showPreviousMonths
        monthsShown={props.layout === "Multi Month" ? 3 : 1}
        scrollableMonthYearDropdown={props.datePickerStyleType === "Dropdown"}
        todayButton={<CustomButtons />}
        peekNextMonth={true}
        showMonthDropdown={props.datePickerStyleType === "Dropdown"}
        showYearDropdown={props.datePickerStyleType === "Dropdown"}
        dropdownMode="select"
        dayClassName={dayClassName}
        ref={ctx.datePickerRef}
        renderCustomHeader={props.layout === "Multi Month" ? renderCustomHeader : undefined}
        open={false}
      />

      <ul className={`rds-datepicker__dropdown-menu ${isDropdownOpen ? "rds-datepicker__dropdown-menu--show" : ""}`}>
        <li className="rds-datepicker__dropdown-item rds-datepicker__dropdown-item--header">
          <strong className="rds-datepicker__dropdown-label">Custom Date</strong>
          <span className="rds-datepicker__dropdown-value">{dropdownDisplayValue}</span>
        </li>
        <li id="today" className={`rds-datepicker__dropdown-item ${activeList === "today" ? "rds-datepicker__dropdown-item--active" : ""}`} onClick={ctx.todayClickHandler}>Today</li>
        <li id="yesterday" className={`rds-datepicker__dropdown-item ${activeList === "yesterday" ? "rds-datepicker__dropdown-item--active" : ""}`} onClick={ctx.yesterdayClickHandler}>Yesterday</li>
        <li id="lastSeven" className={`rds-datepicker__dropdown-item ${activeList === "lastSeven" ? "rds-datepicker__dropdown-item--active" : ""}`} onClick={ctx.lastSevenDaysClickHandler}>Last 7 days</li>
        <li id="lastFourteen" className={`rds-datepicker__dropdown-item ${activeList === "lastFourteen" ? "rds-datepicker__dropdown-item--active" : ""}`} onClick={ctx.lastFourteenDaysClickHandler}>Last 14 days</li>
        <SafeDatePicker
          selected={startDate || null}
          onChange={onRangeChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          popperPlacement="right-start"
          popperModifiers={[
            { name: 'flip', options: { fallbackPlacements: ['left-start', 'bottom-start'] } },
            { name: 'preventOverflow', options: { boundary: 'viewport' } },
            { name: 'offset', options: { offset: [0, 8] } }
          ]}
          popperContainer={({ children }: { children: React.ReactNode }) => <div>{children}</div>}
          popperClassName="rds-datepicker__popper"
          customInput={<ExampleCustomInput changeIcon={props.changeIcon} />}
          disabled={props.isDisabled}
          placeholderText={props.placeholderText || "Select date"}
          showMonthYearPicker={props.layout === "Month Picker"}
          showYearPicker={props.layout === "Year Picker"}
          todayButton={<CustomButtons />}
          peekNextMonth={true}
          showMonthDropdown={props.datePickerStyleType === "Dropdown"}
          showYearDropdown={props.datePickerStyleType === "Dropdown"}
          dropdownMode="select"
          showPreviousMonths
          monthsShown={props.layout === "Multi Month" ? 3 : 1}
          dayClassName={dayClassName}
          autoFocus
          renderCustomHeader={props.layout === "Multi Month" ? renderCustomHeader : undefined}
        />
      </ul>
    </div>
  );
}

export const renderDatePickerTypeView = (
  type: string,
  startDate: Date | null,
  endDate: Date | null,
  handlerDateChange: (date: Date | null) => void,
  onRangeChange: (dates: [Date | null, Date | null]) => void,
  props: DatePickerComponentProps,
  isDropdownOpen: boolean,
  toggleDropdown: () => void,
  dropdownDisplayValue: string,
  datePickerRef: React.RefObject<unknown>,
  activeList: string,
  todayClickHandler: () => void,
  yesterdayClickHandler: () => void,
  lastSevenDaysClickHandler: () => void,
  lastFourteenDaysClickHandler: () => void,
  dayClassName: (date: Date) => string,
  CustomInputWithClear: React.ElementType,
  ExampleCustomInput: React.ElementType,
  CustomButtons: React.ElementType
) => {
  const ctx: TypeViewContext = {
    startDate,
    endDate,
    handlerDateChange,
    handlerDateTimeChange: handlerDateChange,
    onRangeChange,
    props,
    isDropdownOpen,
    toggleDropdown,
    dropdownDisplayValue,
    datePickerRef,
    expandedDatePickerRef: datePickerRef,
    selectedDatePickerRef: datePickerRef,
    activeList,
    todayClickHandler,
    yesterdayClickHandler,
    lastSevenDaysClickHandler,
    lastFourteenDaysClickHandler,
    dayClassName,
    CustomInputWithClear,
    ExampleCustomInput,
    CustomButtons,
  };

  if (type === "Default") return renderDefaultTypeView(ctx);
  if (type === "Custom") return renderCustomTypeView(ctx);
  return null;
};
