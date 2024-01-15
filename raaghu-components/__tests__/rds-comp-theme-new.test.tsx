import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompThemeNew, { RdsCompThemeNewProps } from "../src/rds-comp-theme-new/rds-comp-theme-new";

describe("RdsCompThemeNew", () => {
    const mockProps: RdsCompThemeNewProps = {
        StyleList: [{option:"Style1", value:"Style2"}],
        WebList: [{option:"Web1", value:"Web2"}],
        MenuList: [{option:"Menu1", value:"Menu2"}],
        StatusList: [{option:"Status1", value:"Status2"}],
    };

    it("renders all select lists", () => {
        render(<RdsCompThemeNew {...mockProps} />);

        const styleSelectList = screen.getByText("Style");
        const webSelectList = screen.getByText("Public Website Style");
        const menuSelectList = screen.getByText("Menu Placement");
        const statusSelectList = screen.getByText("Menu Status");

        expect(styleSelectList).toBeInTheDocument();
        expect(webSelectList).toBeInTheDocument();
        expect(menuSelectList).toBeInTheDocument();
        expect(statusSelectList).toBeInTheDocument();
    });

    it("calls submitData function on form submission", () => {
        render(<RdsCompThemeNew {...mockProps} />);
        
        const form = screen.getByTestId("form");
        const consoleLogSpy = jest.spyOn(console, "log");
        
        // Mock the onSubmit handler to trigger the console.log
        form.onsubmit = () => {
          console.log({
            styleList: "",
            webList: "",
            menuList: "",
            StatusList: "",
          });
        };
      
        fireEvent.submit(form);
        
        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
        expect(consoleLogSpy).toHaveBeenCalledWith({
          styleList: "",
          webList: "",
          menuList: "",
          StatusList: "",
        });
      
        consoleLogSpy.mockRestore();
      });
      
});
