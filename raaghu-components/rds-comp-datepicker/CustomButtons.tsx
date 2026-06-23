import { forwardRef } from "react";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";

interface CustomButtonsProps {
  value?: string;
  onClick?: () => void;
}

export const CustomButtons = forwardRef<HTMLDivElement, CustomButtonsProps>(
  ({ value: _value, onClick: _onClick }, _ref) => (
    <div className="rds-datepicker__button-wrapper">
      <RdsButton text="Cancel" size="small" style="outlined" />
      <RdsButton text="Apply" size="small" style="filled" />
    </div>
  )
);

CustomButtons.displayName = "CustomButtons";
