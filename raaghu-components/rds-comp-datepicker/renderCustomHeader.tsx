interface CustomHeaderProps {
  date: Date;
  monthDate: Date;
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
  decreaseMonth?: () => void;
  increaseMonth?: () => void;
  prevMonthButtonDisabled?: boolean;
  nextMonthButtonDisabled?: boolean;
}

const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const createRenderCustomHeader = (showNavigation: boolean) => {
  const RenderCustomHeader = ({
    date,
    monthDate,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: CustomHeaderProps) => {
    const months = SHORT_MONTHS;
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 6;
    const endYear = currentYear + 6;
    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

    const displayDate = monthDate || date;

    return (
      <div
        className={`rds-datepicker__custom-header${
          showNavigation ? " rds-datepicker__custom-header--with-nav" : ""
        }`}
      >
        {showNavigation ? (
          <div className="rds-datepicker__custom-header-group">
            <button
              type="button"
              className="rds-datepicker__nav-btn rds-datepicker__nav-btn--previous"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              aria-label="Previous Month"
            >
              <span className="rds-datepicker__nav-icon rds-datepicker__nav-icon--previous" aria-hidden="true" />
            </button>
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
            <button
              type="button"
              className="rds-datepicker__nav-btn rds-datepicker__nav-btn--next"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              aria-label="Next Month"
            >
              <span className="rds-datepicker__nav-icon rds-datepicker__nav-icon--next" aria-hidden="true" />
            </button>
          </div>
        ) : (
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
        )}
      </div>
    );
  };

  RenderCustomHeader.displayName = showNavigation
    ? "RenderDefaultDropdownHeader"
    : "RenderMultiMonthHeader";

  return RenderCustomHeader;
};
