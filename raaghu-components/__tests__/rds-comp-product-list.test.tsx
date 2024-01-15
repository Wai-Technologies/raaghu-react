import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, getByLabelText } from "@testing-library/react";
import RdsCompProductList, { RdsCompProductListProps } from "../src/rds-comp-product-list/rds-comp-product-list";

jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
    useTranslation: () => ({ t: (key: any) => key }),
  }));
describe("RdsCompProductList", () => {
    const sampleItems = [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
        { id: 3, name: "Product 3" },
    ];

    it("renders the component correctly with 'With Tall Images And CTA Link' type", () => {
        const { getByText } = render(
            <RdsCompProductList
        
                type="With Tall Images And CTA Link" items={[]}      />
        );

        expect(getByText("Trending Products")).toBeInTheDocument();
        expect(getByText("Trending Products")).toBeVisible();
    
    });

    it("renders the component correctly with 'With Color Swatches and Horizontal Scrolling' type", () => {
        const { getByText } = render(
            <RdsCompProductList
       
                type="With Color Swatches and Horizontal Scrolling" items={[]}      />
        );

        expect(getByText("Trending Products")).toBeInTheDocument();
        expect(getByText("Shop everything")).toBeInTheDocument();
        expect(getByText("Trending Products")).toBeEnabled();
        expect(getByText("Shop everything")).toBeVisible();
    });


    it("renders the component correctly with other types", () => {
        const { queryByText } = render(
            <RdsCompProductList  type="Some Other Type" items={[]} />
        );

        expect(queryByText("Shop the collection")).toBeNull();
        expect(queryByText("Shop everything")).toBeNull();
    });

 
});



describe("RdsCompProductList", () => {
    const items = [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
        { id: 3, name: "Product 3" },
    ];

    it("renders product list without infinite list", () => {
        const props = {
            items: items,
            type: "With Tall Images And CTA Link",
        };
        const { getByText } = render(<RdsCompProductList items={[]} />);
    });

});
