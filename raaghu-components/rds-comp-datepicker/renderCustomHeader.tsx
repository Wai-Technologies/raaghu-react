interface CustomHeaderProps {
  date: Date;
  monthDate: Date;
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
}

export const renderCustomHeader = ({
  date,
  monthDate,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: CustomHeaderProps) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 6;
  const endYear = currentYear + 6;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  const displayDate = monthDate || date;

  return (
    <div className="rds-datepicker__custom-header">
      <button
        type="button"
        className="react-datepicker__navigation react-datepicker__navigation--previous"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        aria-label="Previous Month"
      />
      <div className="rds-datepicker__custom-header-controls">
        <select
          value={displayDate.getMonth()}
          onChange={(e) => changeMonth(Number(e.target.value))}
          className="rds-datepicker__header-select rds-datepicker__header-select--month"
        >
          {months.map((m, idx) => (
            <option key={m} value={idx}>
              {m}
            </option>
          ))}
        </select>

        <select
          value={displayDate.getFullYear()}
          onChange={(e) => changeYear(Number(e.target.value))}
          className="rds-datepicker__header-select rds-datepicker__header-select--year"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        className="react-datepicker__navigation react-datepicker__navigation--next"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        aria-label="Next Month"
      />
    </div>
  );
};
