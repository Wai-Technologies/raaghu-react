import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/react";
import RdsNavtabs, { RdsNavtabsProps } from "../src/rds-navtabs/rds-navtabs";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

describe("RdsNavtabs", () => {
    const navtabsItems: RdsNavtabsProps["navtabsItems"] = [
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
        const { getByText } = render(<RdsNavtabs navtabsItems={navtabsItems} type="tabs" />);
    
        expect(getByText("Tab 1")).toBeInTheDocument();
        expect(getByText("Tab 2")).toBeInTheDocument();
        expect(getByText("Tab 3")).toBeInTheDocument();
    });
  
    it("sets active navtab on click", () => {
        const activeNavtabOrder = jest.fn();
        const { getByText } = render(<RdsNavtabs navtabsItems={navtabsItems} type="tabs" activeNavtabOrder={activeNavtabOrder} />);
    
        fireEvent.click(getByText("Tab 2"));
    
        expect(activeNavtabOrder).toHaveBeenCalledWith(2);
    });
  
    it("disables navtab when disabled prop is true", () => {
        const { getByText } = render(<RdsNavtabs navtabsItems={navtabsItems} type="tabs" />);
    
        expect(getByText("Tab 3")).toBeEnabled();

    });
  

});
