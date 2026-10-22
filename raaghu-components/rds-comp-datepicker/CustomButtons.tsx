import { type Ref } from "react";
import RdsButton from "../../raaghu-elements/rds-button/rds-button";

interface CustomButtonsProps {
  value?: string;
  onClick?: () => void;
}

export const CustomButtons = ({ ref: _ref, value: _value, onClick: _onClick }: CustomButtonsProps & { ref?: Ref<HTMLDivElement> }) => (
    <div className="rds-datepicker__button-wrapper">
      <RdsButton text="Cancel" size="small" variant="outlined" />
      <RdsButton text="Apply" size="small" variant="filled" />
    </div>
  );

CustomButtons.displayName = "CustomButtons";
