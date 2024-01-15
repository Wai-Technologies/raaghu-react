import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsProductImage from "../src/rds-product-image/rds-product-image";

describe("RdsProductImage", () => {
    const images = ["image1.jpg", "image2.jpg", "image3.jpg"];
    const itemList = ["item1.jpg", "item2.jpg", "item3.jpg", "item4.jpg", "item5.jpg"];

    it("renders basic display type correctly", () => {
        render(<RdsProductImage displayType="basic" images={images} itemList={itemList} />);
        expect(screen.getByAltText("image1.jpg")).toBeInTheDocument();
        expect(screen.getByAltText("image2.jpg")).toBeInTheDocument();
        expect(screen.getByAltText("image3.jpg")).toBeInTheDocument();
    });

    it("renders product overview 1 display type correctly", () => {
        render(<RdsProductImage displayType="product-overview1" images={images} itemList={itemList} />);
        expect(screen.getByAltText("item1.jpg")).toBeInTheDocument();
        expect(screen.getByAltText("item2.jpg")).toBeInTheDocument();
        expect(screen.getByAltText("item3.jpg")).toBeInTheDocument();
        expect(screen.getByAltText("item4.jpg")).toBeInTheDocument();
    });

    it("renders product overview 2 display type correctly", () => {
        render(<RdsProductImage displayType="product-overview2" images={images} itemList={itemList} />);
        expect(screen.getByAltText("item1.jpg")).toBeInTheDocument();
        expect(screen.getByAltText("item2.jpg")).toBeInTheDocument();
        expect(screen.getByAltText("item3.jpg")).toBeInTheDocument();
    });

    it("renders product overview 3 display type correctly", () => {
        render(<RdsProductImage displayType="product-overview3" images={images} itemList={itemList} />);
        expect(screen.getByAltText("item1.jpg")).toBeInTheDocument();
        expect(screen.getByAltText("item2.jpg")).toBeInTheDocument();
        expect(screen.getByAltText("item3.jpg")).toBeInTheDocument();
        expect(screen.getByAltText("item4.jpg")).toBeInTheDocument();
        expect(screen.getByAltText("item5.jpg")).toBeInTheDocument();
    });
});
