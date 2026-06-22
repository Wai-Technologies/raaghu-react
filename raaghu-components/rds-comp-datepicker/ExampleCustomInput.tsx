import { forwardRef } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";

interface ExampleCustomInputProps {
  value?: string;
  onClick?: () => void;
  changeIcon?: string;
}

export const ExampleCustomInput = forwardRef<HTMLButtonElement, ExampleCustomInputProps>(
  ({ value: _value, onClick, changeIcon }, ref) => (
    <button
      type="button"
      className="rds-datepicker__dropdown-action rds-datepicker__dropdown-action--custom"
      onClick={onClick}
      ref={ref}
      style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}
    >
      <span>Custom</span>
      <span style={{ display: "flex", alignItems: "center" }}>
        {changeIcon === "dashboard_settings" ? (
          <SettingsIcon className="rds-datepicker__calendar-icon" />
        ) : (
          <CalendarMonthIcon className="rds-datepicker__calendar-icon" />
        )}
      </span>
    </button>
  )
);

ExampleCustomInput.displayName = "ExampleCustomInput";
