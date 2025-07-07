import { createContext, useContext } from "react";

const SelectContext = createContext<{
  selectedOption: string;
  isChecked: boolean;
  multiple: boolean;
  changeSelectedOption: (option: string) => void;
}>({
  selectedOption: "",
  isChecked: false,
  multiple: false,
  changeSelectedOption: (option: string) => "",
});

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Error in creating the context");
  }
  return context;
};

export { useSelectContext, SelectContext };
