import { forwardRef, type MouseEvent } from "react";

interface ExampleCustomInputProps {
  value?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  changeIcon?: string;
  onActivate?: () => void;
}

export const ExampleCustomInput = forwardRef<HTMLButtonElement, ExampleCustomInputProps>(
  ({ value: _value, onClick, changeIcon: _changeIcon, onActivate }, ref) => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      onActivate?.();
      onClick?.(event);
    };

    return (
      <button
        type="button"
        className="rds-datepicker__dropdown-action rds-datepicker__dropdown-action--custom"
        onClick={handleClick}
        ref={ref}
      >
        Custom
      </button>
    );
  }
);

ExampleCustomInput.displayName = "ExampleCustomInput";
