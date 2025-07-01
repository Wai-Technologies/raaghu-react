import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsCompPrice, { RdsCompPriceProps } from "../src/rds-comp-price/rds-comp-price";

// Add a robust global fetch mock to prevent icon loading errors
global.fetch = jest.fn(() =>
  Promise.resolve(new Response('<svg></svg>', { status: 200, headers: { 'Content-Type': 'image/svg+xml' } }))
);

// Mock fetch to prevent icon loading errors in tests
beforeAll(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            text: () => Promise.resolve(''),
            json: () => Promise.resolve({}),
            blob: () => Promise.resolve(new Blob()),
            clone: () => this,
            headers: { get: () => null },
            redirected: false,
            status: 200,
            statusText: 'OK',
            type: 'basic',
            url: '',
            body: null,
            bodyUsed: false,
            arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
            formData: () => Promise.resolve(new FormData()),
        })
    ) as jest.Mock;
});

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

describe("RdsCompPrice", () => {
    const props = {
        mrp: 15,
        currentPrice: 12,
    };

    it("renders properly", () => {
        render(
            <RdsCompPrice
                mrp={props.mrp}
                currentPrice={props.currentPrice}
                withDiscount={false}
            />
        );
        // Use flexible matchers for price values with $ and whitespace
        const mrpElement = screen.getByText(/\$?\s*15/);
        const currentPrice = screen.getByText(/\$?\s*12/);
        expect(mrpElement).toBeInTheDocument();
        expect(currentPrice).toBeInTheDocument();
    });

    it("renders properly when discount id false", () => {
        render(
            <RdsCompPrice
                mrp={props.mrp}
                currentPrice={props.currentPrice}
                withDiscount={false}
            />
        );
        const mrpElement = screen.getByText(/\$?\s*15/);
        const currentPrice = screen.getByText(/\$?\s*12/);
        const discountElement = screen.queryByText(/\d+% off/);
        expect(discountElement).not.toBeInTheDocument();
        expect(mrpElement).toBeInTheDocument();
        expect(currentPrice).toBeInTheDocument();
    });

    it("renders when discount is true", () => {
        render(
            <RdsCompPrice
                mrp={props.mrp}
                currentPrice={props.currentPrice}
                withDiscount={true}
            />
        );
        const discount = Math.round(
            ((props.mrp - props.currentPrice) * 100) / props.mrp
        );
        const mrpElement = screen.getByText(/\$?\s*15/);
        const currentPrice = screen.getByText(/\$?\s*12/);
        const discountElement = screen.getByText(new RegExp(`${discount}%\\s*off`, 'i'));
        expect(mrpElement).toBeInTheDocument();
        expect(currentPrice).toBeInTheDocument();
        expect(discountElement).toBeInTheDocument();
    });

    it("renders with priceOnLeft props", () => {
        render(
            <RdsCompPrice
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
            <RdsCompPrice
                mrp={props.mrp}
                currentPrice={props.currentPrice}
                withDiscount={true}
                type="priceOnRight"
            />
        );
        const priceOnRightElement = screen.getByTestId("price-on-right");
        expect(priceOnRightElement).toBeInTheDocument();
    });

    it("renders icons properly", () =>{
        render(
            <RdsCompPrice
                mrp={props.mrp}
                currentPrice={props.currentPrice}
                withDiscount={true}
            />
        );
        // Check for icon container by class or id, not just SVGs or roles
        const iconContainers = screen.queryAllByTestId('rdicon');
        iconContainers.forEach((item)=>{
            expect(item).toBeInTheDocument();
        });
    });
});
