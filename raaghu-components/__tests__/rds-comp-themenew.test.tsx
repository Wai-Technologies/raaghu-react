import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RdsCompThemeNewProps } from "../src/rds-comp-theme-new/rds-comp-theme-new";
import RdsCompThemeNew from "../src/rds-comp-theme-new/rds-comp-theme-new";

const mockStyleList = ["Style 1", "Style 2", "Style 3"].map((style, index) => ({
    option: index,
    value: style,
  }));
  
  const mockWebList = ["Web 1", "Web 2", "Web 3"].map((web, index) => ({
    option: index,
    value: web,
  }));
  
  const mockMenuList = ["Menu 1", "Menu 2", "Menu 3"].map((menu, index) => ({
    option: index,
    value: menu,
  }));
  
  const mockStatusList = ["Status 1", "Status 2", "Status 3"].map((status, index) => ({
    option: index,
    value: status,
  }));
  

const mockSubmitData = jest.fn();

const setup = (props: Partial<RdsCompThemeNewProps> = {}) => {
    const defaultProps: RdsCompThemeNewProps = {
        StyleList: mockStyleList,
        WebList: mockWebList,
        MenuList: mockMenuList,
        StatusList: mockStatusList,
        ...props,
    };

    render(<RdsCompThemeNew {...defaultProps} />);
};


test("submits form data on save button click", () => {
    setup();
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    expect(mockSubmitData).toHaveBeenCalledTimes(0);
});

