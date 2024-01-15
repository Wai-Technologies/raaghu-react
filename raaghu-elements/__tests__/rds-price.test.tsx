import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsPrice, { RdsPriceProps } from "../src/rds-price/rds-price";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

describe("RdsPrice", () => {
    const props = {
        mrp: 15,
        currentPrice: 12,
    };

    it("renders properly", () => {
        render(
            <RdsPrice
                mrp={props.mrp}
                currentPrice={props.currentPrice}
                withDiscount={false}
            />
        );
        const mrpElement = screen.getByText(props.mrp);
        const currentPrice = screen.getByText(props.currentPrice);
        expect(mrpElement).toBeInTheDocument();
        expect(currentPrice).toBeInTheDocument();
    });

    it("renders properly when discount id false", () => {
        render(
            <RdsPrice
                mrp={props.mrp}
                currentPrice={props.currentPrice}
                withDiscount={false}
            />
        );
        const mrpElement = screen.getByText(props.mrp);
        const currentPrice = screen.getByText(props.currentPrice);
        const discountElement = screen.queryByText(/[\d]+% off/);
        expect(discountElement).not.toBeInTheDocument();
        expect(mrpElement).toBeInTheDocument();
        expect(currentPrice).toBeInTheDocument();
    });

    it("renders when discount is true", () => {
        render(
            <RdsPrice
                mrp={props.mrp}
                currentPrice={props.currentPrice}
                withDiscount={true}
            />
        );
        const discount = Math.round(
            ((props.mrp - props.currentPrice) * 100) / props.mrp
        );
        const mrpElement = screen.getByText(props.mrp);
        const currentPrice = screen.getByText(props.currentPrice);
        const discountElement = screen.getByText(`${discount}% off`);
        expect(mrpElement).toBeInTheDocument();
        expect(currentPrice).toBeInTheDocument();
        expect(discountElement).toBeInTheDocument();
    });

    it("renders with priceOnLeft props", () => {
        render(
            <RdsPrice
                mrp={props.mrp}
                currentPrice={props.currentPrice}
                withDiscount={true}
                type="priceOnLeft"
            />
        );
        const priceOnLeftElement = screen.getByTestId("price-on-left");
        expect(priceOnLeftElement).toBeInTheDocument();
    });

    it("renders with priceOnRight props", () => {
        render(
            <RdsPrice
                mrp={props.mrp}
                currentPrice={props.currentPrice}
                withDiscount={true}
                type="priceOnRight"
            />
        );
        const priceOnLeftElement = screen.getByTestId("price-on-right");
        expect(priceOnLeftElement).toBeInTheDocument();
    });

    it("renders icons properly", ()=>{
        render(
            <RdsPrice
                mrp={props.mrp}
                currentPrice={props.currentPrice}
                withDiscount={true}
            />
        );
        const iconsElements = screen.getAllByRole("img");
        iconsElements.forEach((item)=>{
            expect(item).toBeInTheDocument();
        });
    });
});
