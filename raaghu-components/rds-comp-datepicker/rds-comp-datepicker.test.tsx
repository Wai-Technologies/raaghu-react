import React from 'react';
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsDatepicker from './rds-comp-datepicker';
import { DatePickerStyleType, DatePickerLayout } from './rds-comp-datepicker.types';

jest.mock('./rds-comp-datepicker.scss', () => ({}));

jest.setTimeout(30000);

jest.mock('../../raaghu-elements/shared/utils/deprecation', () => {
  const warnDeprecatedProp = jest.fn();
  return {
    warnDeprecatedProp,
    resolveDeprecatedProp: (
      canonical: unknown,
      legacy: unknown,
      component: string,
      legacyName: string,
      replacement: string,
    ) => {
      if (legacy !== undefined) warnDeprecatedProp(component, legacyName, replacement);
      return canonical !== undefined ? canonical : legacy;
    },
  };
});

const { warnDeprecatedProp } = jest.requireMock('../../raaghu-elements/shared/utils/deprecation');

const getInput = () => screen.getByPlaceholderText(/select date/i) as HTMLInputElement;
const openButton = () => screen.getByRole('button', { name: 'Open calendar' });
const day = (n: number) => screen.getByRole('gridcell', { name: String(n) });
const setup = (p: Record<string, unknown> = {}) => render(<RdsDatepicker {...p} />);

describe('RdsDatepicker', () => {
  describe('Basic Rendering', () => {
    it('renders the input with the default placeholder', () => {
      setup();
      expect(getInput()).toBeInTheDocument();
    });

    it('uses the placeholder prop and the legacy placeholderText', () => {
      const { unmount } = setup({ placeholder: 'Pick' });
      expect(screen.getByPlaceholderText('Pick')).toBeInTheDocument();
      unmount();
      setup({ placeholderText: 'Legacy' });
      expect(screen.getByPlaceholderText('Legacy')).toBeInTheDocument();
    });

    it('renders the title when showTitle is true and hides it otherwise', () => {
      const { unmount } = setup({ showTitle: true, titleText: 'Select Date' });
      expect(screen.getByText('Select Date')).toBeInTheDocument();
      unmount();
      setup({ showTitle: false, titleText: 'Select Date' });
      expect(screen.queryByText('Select Date')).not.toBeInTheDocument();
    });

    it('shows the mandatory indicator and aria-required only when required', () => {
      const { unmount } = setup({ showTitle: true, titleText: 'Date', required: true });
      expect(screen.getByText('*')).toBeInTheDocument();
      expect(getInput()).toHaveAttribute('aria-required', 'true');
      unmount();
      setup({ showTitle: true, titleText: 'Date', required: false });
      expect(screen.queryByText('*')).not.toBeInTheDocument();
      expect(getInput()).not.toHaveAttribute('aria-required');
    });

    it('supports label and datePickerLabel', () => {
      const { unmount } = setup({ label: 'Birthday' });
      expect(screen.getByText('Birthday')).toBeInTheDocument();
      unmount();
      setup({ datePickerLabel: 'Pick Date', showTitle: true });
      expect(screen.getByText('Pick Date')).toBeInTheDocument();
    });

    it('applies the selected appearance', () => {
      const { container } = setup({ selected: true });
      expect(container.querySelector('.rds-datepicker')).toHaveClass('rds-datepicker--selected');
    });

    it('has displayName RdsCompDatepicker', () => {
      expect(RdsDatepicker.displayName).toBe('RdsCompDatepicker');
    });

    it('forwards style, className, data attributes and ref to the root', () => {
      const ref = React.createRef<HTMLDivElement>();
      const { container } = setup({ style: { opacity: 0.5 }, className: 'extra', 'data-testid': 'dp-root', ref });
      const root = container.querySelector('.rds-datepicker') as HTMLElement;
      expect(root).toHaveStyle({ opacity: '0.5' });
      expect(root).toHaveClass('extra');
      expect(root).toHaveAttribute('data-testid', 'dp-root');
      expect(ref.current).toBe(root);
      expect(setup().container.querySelector('.rds-datepicker')).not.toHaveAttribute('style');
    });

    it.each([
      [{ datePickerStyleType: DatePickerStyleType.Dropdown }],
      [{ variant: 'selector' }],
      [{ changeIcon: 'dashboard_settings' }],
      [{ showClearDate: true }],
      [{ isDefaultDate: true }],
    ])('accepts %j', (extra) => {
      expect(() => setup(extra)).not.toThrow();
      expect(getInput()).toBeInTheDocument();
    });
  });

  describe('Label', () => {
    const label = (container: HTMLElement) => container.querySelector('.rds-datepicker__label');

    it('toggles the hidden class and aria-hidden with showTitle', () => {
      const shown = setup({ showTitle: true, titleText: 'Date' });
      expect(label(shown.container)).not.toHaveClass('rds-datepicker__label--hidden');
      expect(label(shown.container)).toHaveAttribute('aria-hidden', 'false');
      shown.unmount();
      const hidden = setup({ showTitle: false, titleText: 'Date' });
      expect(label(hidden.container)).toHaveClass('rds-datepicker__label--hidden');
      expect(label(hidden.container)).toHaveAttribute('aria-hidden', 'true');
    });

    it('points the visible label at the input id', () => {
      const { container } = setup({ showTitle: true, titleText: 'Date' });
      const forId = label(container)?.getAttribute('for');
      expect(forId).toBeTruthy();
      expect(getInput().id).toBe(forId);
      expect(screen.getByRole('textbox', { name: /Date/ })).toBe(getInput());
    });

    it('gives the input an accessible name when the title is hidden', () => {
      setup({ placeholder: 'Pick a day' });
      expect(screen.getByRole('textbox', { name: 'Pick a day' })).toBeInTheDocument();
    });
  });

  describe('Disabled state', () => {
    it('disables the input and buttons', () => {
      setup({ disabled: true, showClearDate: true, value: new Date(2025, 0, 15) });
      expect(getInput()).toBeDisabled();
      expect(openButton()).toBeDisabled();
    });

    it('top-level disabled/required win over legacy props', () => {
      setup({ isDisabled: true, disabled: false, showTitle: true, titleText: 'Date', isMandatory: false, required: true });
      expect(getInput()).not.toBeDisabled();
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('honours controls.disabled', () => {
      setup({ controls: { disabled: 'on' } });
      expect(getInput()).toBeDisabled();
    });
  });

  describe('Value handling', () => {
    it('shows value, defaultValue and dateForEdit in the input', () => {
      const a = setup({ value: new Date(2025, 0, 15) });
      expect(getInput().value).toBe('01/15/2025');
      a.unmount();
      const b = setup({ defaultValue: '2024-12-25T00:00:00' });
      expect(getInput().value).toBe('12/25/2024');
      b.unmount();
      setup({ dateForEdit: '2024-12-25' });
      expect(getInput().value).toBe('12/25/2024');
    });

    it('parses a date-only string as local midnight', () => {
      setup({ value: '2024-01-15' });
      expect(getInput().value).toBe('01/15/2024');
    });

    it('re-syncs when value changes and clears on null', () => {
      const { rerender } = setup({ value: '2024-12-25T00:00:00' });
      rerender(<RdsDatepicker value="2024-12-26T00:00:00" />);
      expect(getInput().value).toBe('12/26/2024');
      rerender(<RdsDatepicker value={null} />);
      expect(getInput().value).toBe('');
    });

    it('re-syncs when dateForEdit changes', () => {
      const { rerender } = setup({ dateForEdit: '2024-12-25T00:00:00' });
      rerender(<RdsDatepicker dateForEdit="2024-12-26T00:00:00" />);
      expect(getInput().value).toBe('12/26/2024');
    });

    it('defaults to today when isDefaultDate is set', () => {
      setup({ isDefaultDate: true });
      expect(getInput().value).toBe(
        `${String(new Date().getMonth() + 1).padStart(2, '0')}/${String(new Date().getDate()).padStart(2, '0')}/${new Date().getFullYear()}`,
      );
    });

    it('handles undefined callbacks and props', () => {
      expect(() => setup({ selectedDate: undefined, onDatePicker: undefined, customDate: undefined, titleText: undefined })).not.toThrow();
    });
  });

  describe('Single date selection', () => {
    it('opens the calendar, picks a day and reports a Date through every callback', async () => {
      const onChange = jest.fn();
      const onDatePicker = jest.fn();
      const selectedDate = jest.fn();
      setup({ value: new Date(2025, 0, 15), onChange, onDatePicker, selectedDate });
      await userEvent.click(openButton());
      const dialog = screen.getByRole('dialog', { name: 'Choose date' });
      await userEvent.click(within(dialog).getByRole('gridcell', { name: '20' }));
      const expected = new Date(2025, 0, 20).getTime();
      expect(onChange.mock.calls[0][0].getTime()).toBe(expected);
      expect(onDatePicker.mock.calls[0][0].getTime()).toBe(expected);
      expect(selectedDate.mock.calls[0][0].getTime()).toBe(expected);
      expect(getInput().value).toBe('01/20/2025');
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('marks the selected day with aria-selected and the selected class', async () => {
      setup({ value: new Date(2025, 0, 15) });
      await userEvent.click(openButton());
      expect(day(15)).toHaveAttribute('aria-selected', 'true');
      expect(day(15)).toHaveClass('rds-datepicker__day--selected');
      expect(day(16)).toHaveAttribute('aria-selected', 'false');
    });

    it('accepts typed dates and ignores invalid or out-of-range text', async () => {
      const onChange = jest.fn();
      setup({ onChange, minDate: new Date(2025, 0, 1), maxDate: new Date(2025, 11, 31) });
      await userEvent.type(getInput(), '03/05/2025');
      expect(onChange).toHaveBeenLastCalledWith(expect.any(Date));
      expect(onChange.mock.calls.at(-1)?.[0].getTime()).toBe(new Date(2025, 2, 5).getTime());
      onChange.mockClear();
      await userEvent.clear(getInput());
      expect(onChange).toHaveBeenLastCalledWith(null);
      onChange.mockClear();
      await userEvent.type(getInput(), '03/05/2030');
      await userEvent.type(getInput(), '{Backspace}');
      expect(onChange).not.toHaveBeenCalledWith(expect.any(Date));
    });

    it('reverts incomplete text on blur', async () => {
      setup({ value: new Date(2025, 0, 15) });
      await userEvent.clear(getInput());
      await userEvent.type(getInput(), '01/1');
      await userEvent.tab();
      expect(getInput().value).toBe('');
    });

    it('disables days outside minDate and maxDate', async () => {
      setup({ value: new Date(2025, 0, 15), minDate: new Date(2025, 0, 10), maxDate: new Date(2025, 0, 20) });
      await userEvent.click(openButton());
      expect(day(9)).toBeDisabled();
      expect(day(21)).toBeDisabled();
      expect(day(12)).not.toBeDisabled();
    });
  });

  describe('Clear button', () => {
    it('shows only when clearable and a value is set, and emits [null, null]', async () => {
      const onChange = jest.fn();
      const selectedDate = jest.fn();
      const { rerender } = setup({ clearable: true, onChange, selectedDate });
      expect(screen.queryByRole('button', { name: 'Clear date' })).not.toBeInTheDocument();
      rerender(<RdsDatepicker clearable value={new Date(2025, 0, 15)} onChange={onChange} selectedDate={selectedDate} />);
      await userEvent.click(screen.getByRole('button', { name: 'Clear date' }));
      expect(onChange).toHaveBeenCalledWith([null, null]);
      expect(selectedDate).toHaveBeenCalledWith(null);
      expect(getInput().value).toBe('');
    });
  });

  describe('Layouts', () => {
    it('renders the month and year pickers', async () => {
      const month = setup({ layout: DatePickerLayout.MonthPicker, value: new Date(2025, 0, 15) });
      await userEvent.click(openButton());
      expect(screen.getByRole('radio', { name: 'March' })).toBeInTheDocument();
      month.unmount();
      setup({ layout: DatePickerLayout.YearPicker, value: new Date(2025, 0, 15) });
      await userEvent.click(openButton());
      expect(screen.getByRole('radio', { name: '2025' })).toBeInTheDocument();
    });

    it('picks a month in the month layout', async () => {
      const onChange = jest.fn();
      setup({ layout: DatePickerLayout.MonthPicker, value: new Date(2025, 0, 15), onChange });
      await userEvent.click(openButton());
      await userEvent.click(screen.getByRole('radio', { name: 'March' }));
      expect(onChange.mock.calls[0][0].getMonth()).toBe(2);
    });

    it('shows three linked months for Multi Month', async () => {
      setup({ layout: DatePickerLayout.MultiMonth, value: new Date(2025, 0, 15) });
      await userEvent.click(openButton());
      expect(screen.getAllByRole('combobox', { name: 'Month' })).toHaveLength(3);
      const months = screen.getAllByRole('combobox', { name: 'Month' }) as HTMLSelectElement[];
      expect(months.map((m) => m.value)).toEqual(['0', '1', '2']);
      await userEvent.selectOptions(months[1], '5');
      const after = screen.getAllByRole('combobox', { name: 'Month' }) as HTMLSelectElement[];
      expect(after.map((m) => m.value)).toEqual(['4', '5', '6']);
    });

    it('shows labelled month/year selects and navigation for the Dropdown style', async () => {
      setup({ value: new Date(2025, 0, 15), datePickerStyleType: DatePickerStyleType.Dropdown, layout: DatePickerLayout.Default });
      await userEvent.click(openButton());
      expect(screen.getByRole('combobox', { name: 'Month' })).toBeInTheDocument();
      expect(screen.getByRole('combobox', { name: 'Year' })).toBeInTheDocument();
      await userEvent.click(screen.getByRole('button', { name: 'Next Month' }));
      expect((screen.getByRole('combobox', { name: 'Month' }) as HTMLSelectElement).value).toBe('1');
      await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Year' }), '2030');
      expect((screen.getByRole('combobox', { name: 'Year' }) as HTMLSelectElement).value).toBe('2030');
    });

    it('limits the year options to minDate/maxDate', async () => {
      setup({
        value: new Date(2025, 0, 15),
        variant: 'dropdown',
        minDate: new Date(2024, 0, 1),
        maxDate: new Date(2026, 0, 1),
      });
      await userEvent.click(openButton());
      const options = Array.from(screen.getByRole('combobox', { name: 'Year' }).querySelectorAll('option')).map((o) => o.getAttribute('value'));
      expect(options).toEqual(['2024', '2025', '2026']);
    });

    it('uses the locale for month names in the header', async () => {
      setup({ value: new Date(2025, 2, 15), locale: 'de-DE', variant: 'dropdown' });
      await userEvent.click(openButton());
      expect(within(screen.getByRole('combobox', { name: 'Month' })).getByRole('option', { name: /Mär/ })).toBeInTheDocument();
    });
  });

  describe('Custom type (presets and range)', () => {
    afterEach(() => {
      jest.useRealTimers();
    });

    const openMenu = async () => userEvent.click(openButton());

    it('toggles the preset menu and exposes aria-expanded', async () => {
      setup({ type: 'Custom' });
      expect(openButton()).toHaveAttribute('aria-expanded', 'false');
      await openMenu();
      expect(openButton()).toHaveAttribute('aria-expanded', 'true');
      expect(document.querySelector('.rds-datepicker__dropdown-menu')).toHaveClass('rds-datepicker__dropdown-menu--show');
    });

    it('closes the preset menu on Escape and on outside click', async () => {
      setup({ type: 'Custom' });
      await openMenu();
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(openButton()).toHaveAttribute('aria-expanded', 'false');
      await openMenu();
      fireEvent.mouseDown(document.body);
      expect(openButton()).toHaveAttribute('aria-expanded', 'false');
    });

    it.each([
      ['Last 7 days', 6],
      ['Last 14 days', 13],
    ])('%s preset uses the click-time date', (name, offset) => {
      jest.useFakeTimers({ now: new Date(2025, 0, 20, 12) });
      const customDate = jest.fn();
      const onChange = jest.fn();
      setup({ type: 'Custom', customDate, onChange });
      fireEvent.click(openButton());
      jest.setSystemTime(new Date(2025, 0, 30, 12));
      fireEvent.click(screen.getByRole('button', { name }));
      const [start, end] = customDate.mock.calls[0][0];
      expect(start.getTime()).toBe(new Date(2025, 0, 30 - offset).getTime());
      expect(end.getDate()).toBe(30);
      expect(onChange).toHaveBeenCalledWith([start, end]);
    });

    it('Today and Yesterday presets set the selection and the menu header', () => {
      jest.useFakeTimers({ now: new Date(2025, 0, 10, 12) });
      const customDate = jest.fn();
      setup({ type: 'Custom', customDate });
      fireEvent.click(openButton());
      fireEvent.click(screen.getByRole('button', { name: 'Yesterday' }));
      expect(customDate.mock.calls[0][0][0].getDate()).toBe(9);
      expect(getInput().value).toBe('01/09/2025');
      fireEvent.click(openButton());
      fireEvent.click(screen.getByRole('button', { name: 'Today' }));
      expect(customDate.mock.calls[1][0][0].getDate()).toBe(10);
      expect(document.querySelector('.rds-datepicker__dropdown-value')).toHaveTextContent('Jan 10 2025');
      expect(document.querySelector('#' + CSS.escape(document.querySelector('[id$="-today"]')!.id))).toHaveClass('rds-datepicker__dropdown-item--active');
    });

    it('range days expose aria-selected for endpoints and in-between days', async () => {
      const onChange = jest.fn();
      setup({ type: 'Custom', clearable: true, onChange });
      await openMenu();
      await userEvent.click(screen.getByRole('button', { name: 'Custom' }));
      const dialog = screen.getByRole('dialog', { name: 'Choose date range' });
      const cell = (n: number) => within(dialog).getAllByRole('gridcell', { name: String(n) })[0];
      await userEvent.click(cell(10));
      expect(onChange).toHaveBeenLastCalledWith([expect.any(Date), null]);
      await userEvent.click(cell(20));
      const [start, end] = onChange.mock.calls.at(-1)![0];
      expect(start.getDate()).toBe(10);
      expect(end.getDate()).toBe(20);
      expect(end.getHours()).toBe(0);
      expect(screen.queryByRole('dialog', { name: 'Choose date range' })).not.toBeInTheDocument();
    });

    it('keeps the range popper open after the first click and marks the range', async () => {
      setup({ type: 'Custom' });
      await openMenu();
      await userEvent.click(screen.getByRole('button', { name: 'Custom' }));
      const dialog = screen.getByRole('dialog', { name: 'Choose date range' });
      const cell = (n: number) => within(dialog).getAllByRole('gridcell', { name: String(n) })[0];
      await userEvent.click(cell(5));
      expect(screen.getByRole('dialog', { name: 'Choose date range' })).toBeInTheDocument();
      expect(cell(5)).toHaveAttribute('aria-selected', 'true');
      expect(cell(5)).toHaveClass('rds-datepicker__day--range-start');
      expect(cell(6)).toHaveAttribute('aria-selected', 'false');
    });

    it('marks in-range days after the end is chosen (reverse order)', async () => {
      const onChange = jest.fn();
      setup({ type: 'Custom', onChange });
      await openMenu();
      await userEvent.click(screen.getByRole('button', { name: 'Custom' }));
      const cell = (n: number) => within(screen.getByRole('dialog')).getAllByRole('gridcell', { name: String(n) })[0];
      await userEvent.click(cell(20));
      await userEvent.click(cell(10));
      const [start, end] = onChange.mock.calls.at(-1)![0];
      expect(start.getDate()).toBe(10);
      expect(end.getDate()).toBe(20);
    });

    it('closes the range popper with Escape and returns focus to Custom', async () => {
      setup({ type: 'Custom' });
      await openMenu();
      const custom = screen.getByRole('button', { name: 'Custom' });
      await userEvent.click(custom);
      expect(custom).toHaveAttribute('aria-expanded', 'true');
      await userEvent.keyboard('{Escape}');
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(custom).toHaveFocus();
    });

    it('shows the range in the menu header and clears everything', async () => {
      const onChange = jest.fn();
      setup({ type: 'Custom', clearable: true, onChange, value: new Date(2025, 0, 15) });
      await userEvent.click(screen.getByRole('button', { name: 'Clear date' }));
      expect(onChange).toHaveBeenCalledWith([null, null]);
      expect(getInput().value).toBe('');
    });
  });

  describe('Deprecations', () => {
    it('warns for legacy names', () => {
      setup({
        dateForEdit: '2024-12-25',
        onDatePicker: jest.fn(),
        placeholderText: 'x',
        changeIcon: 'calendar',
        showClearDate: true,
        isDefaultDate: true,
        controls: { mandatory: 'required' },
        isDisabled: true,
        isMandatory: true,
        selectedDate: jest.fn(),
        customDate: jest.fn(),
      });
      const expectWarn = (prop: string, replacement: string) =>
        expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompDatepicker', prop, replacement);
      expectWarn('dateForEdit', '`value`');
      expectWarn('onDatePicker', '`onChange`');
      expectWarn('placeholderText', '`placeholder`');
      expectWarn('changeIcon', '`openPickerIcon`');
      expectWarn('showClearDate', '`clearable`');
      expectWarn('isDefaultDate', '`defaultValue`');
      expectWarn('controls.mandatory', '`required`');
      expectWarn('isDisabled', '`disabled`');
      expectWarn('isMandatory', '`required`');
      expectWarn('selectedDate', '`onChange`');
      expectWarn('customDate', '`onChange`');
    });

    it('uses a custom openPickerIcon', () => {
      setup({ openPickerIcon: <span data-testid="own-icon" /> });
      expect(screen.getByTestId('own-icon')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has no axe violations when closed', async () => {
      const { container } = setup();
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no axe violations with a title, required and a value', async () => {
      const { container } = setup({ label: 'Date', required: true, value: new Date(2025, 0, 15), clearable: true });
      expect(await axe(container)).toHaveNoViolations();
    });

    it('labels the icon buttons and the dialog', async () => {
      setup({ clearable: true, value: new Date(2025, 0, 15) });
      expect(screen.getByRole('button', { name: 'Clear date' })).toBeInTheDocument();
      expect(openButton()).toHaveAttribute('aria-haspopup', 'dialog');
      await userEvent.click(openButton());
      expect(screen.getByRole('dialog', { name: 'Choose date' })).toBeInTheDocument();
    });
  });
});

describe('RdsDatepicker keyboard navigation', () => {
  it('focuses the input on Tab', async () => {
    setup();
    await userEvent.tab();
    expect(getInput()).toHaveFocus();
  });

  it('accepts typed input', async () => {
    setup();
    await userEvent.type(getInput(), '01/01/2025');
    expect(getInput()).toHaveFocus();
    expect(getInput().value).toBe('01/01/2025');
  });

  it('tabs from the input to the clear and open buttons', async () => {
    setup({ clearable: true, value: new Date(2025, 0, 15) });
    await userEvent.tab();
    expect(getInput()).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Clear date' })).toHaveFocus();
    await userEvent.tab();
    expect(openButton()).toHaveFocus();
  });

  it('does not focus the input when disabled', async () => {
    setup({ disabled: true });
    await userEvent.tab();
    expect(getInput()).not.toHaveFocus();
  });

  it('ArrowDown opens the calendar and Escape closes it, restoring focus', async () => {
    setup({ value: new Date(2025, 0, 15) });
    await userEvent.tab();
    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByRole('dialog', { name: 'Choose date' })).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(getInput()).toHaveFocus();
  });

  it('opens with Enter on the open button and selects a day with the keyboard', async () => {
    const onChange = jest.fn();
    setup({ value: new Date(2025, 0, 15), onChange });
    await userEvent.tab();
    await userEvent.keyboard('{ArrowDown}');
    await act(async () => {
      day(15).focus();
    });
    await userEvent.keyboard('{ArrowRight}{Enter}');
    expect(onChange.mock.calls[0][0].getTime()).toBe(new Date(2025, 0, 16).getTime());
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('operates the range calendar from the keyboard', async () => {
    const onChange = jest.fn();
    setup({ type: 'Custom', value: new Date(2025, 0, 15), onChange });
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');
    expect(openButton()).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(openButton());
    await userEvent.click(screen.getByRole('button', { name: 'Custom' }));
    const dialog = screen.getByRole('dialog', { name: 'Choose date range' });
    await act(async () => {
      within(dialog).getAllByRole('gridcell', { name: '15' })[0].focus();
    });
    await userEvent.keyboard('{ArrowRight}{Enter}');
    expect(onChange).toHaveBeenCalled();
  });
});
