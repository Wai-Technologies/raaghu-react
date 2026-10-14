import { type MouseEvent, type Ref } from "react";

interface ExampleCustomInputProps {
  value?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  changeIcon?: string;
  onActivate?: () => void;
}

export const ExampleCustomInput = ({ ref, value: _value, onClick, changeIcon: _changeIcon, onActivate }: ExampleCustomInputProps & { ref?: Ref<HTMLButtonElement> }) => {
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
  };

ExampleCustomInput.displayName = "ExampleCustomInput";
