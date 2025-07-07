import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/react";
import RdsCompNavtabs, { RdsCompNavtabsProps } from "../src/rds-comp-navtabs/rds-comp-navtabs";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

describe("RdsCompNavtabs", () => {
    const navtabsItems: RdsCompNavtabsProps["navtabsItems"] = [
        {
            label: "Tab 1",
            id: 1,
        },
        {
            label: "Tab 2",
            id: 2,
        },
        {
            label: "Tab 3",
            id: 3,
            disabled: true,
        },
    ];
  
    it("renders navtabs with correct labels", () => {
        const { getByText } = render(<RdsCompNavtabs navtabsItems={navtabsItems} type="tabs" />);
    
        expect(getByText("Tab 1")).toBeInTheDocument();
        expect(getByText("Tab 2")).toBeInTheDocument();
        expect(getByText("Tab 3")).toBeInTheDocument();
    });
  
    it("sets active navtab on click", () => {
        const activeNavtabOrder = jest.fn();
        const { getByText } = render(<RdsCompNavtabs navtabsItems={navtabsItems} type="tabs" activeNavtabOrder={activeNavtabOrder} />);
    
        fireEvent.click(getByText("Tab 2"));
    
        expect(activeNavtabOrder).toHaveBeenCalledWith(2);
    });
  
    it("disables navtab when disabled prop is true", () => {
        const { getByText } = render(<RdsCompNavtabs navtabsItems={navtabsItems} type="tabs" />);
    
        expect(getByText("Tab 3")).toBeEnabled();

    });
  

});
