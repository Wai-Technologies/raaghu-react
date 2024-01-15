import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompBackgroundImage, { RdsCompBackgroundImageProps } from "../src/rds-comp-background-image/rds-comp-background-image";

describe("RdsCompBackgroundImage", () => {
    const props: RdsCompBackgroundImageProps = {
        imageUrl: "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        imageHeight: "500px",
        title: "Example Title",
        btnLabel: "Example Button",
        subtitle: "Example Subtitle",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    };

    test("renders component with props", () => {
        render(<RdsCompBackgroundImage {...props} />);
    
        const imageElement = screen.getByRole("img");
        expect(imageElement).toHaveStyle(`background-image: url(${props.imageUrl});`);
        expect(imageElement).toHaveStyle(`height: ${props.imageHeight};`);
        expect(imageElement).toHaveStyle(`background-repeat: ${props.backgroundRepeat};`);
        expect(imageElement).toHaveStyle(`background-size: ${props.backgroundSize};`);

        const titleElement = screen.getByText(props.title);
        expect(titleElement).toBeInTheDocument();

        const subtitleElement = screen.getByText(props.subtitle);
        expect(subtitleElement).toBeInTheDocument();

        const buttonElement = screen.getByText(props.btnLabel);
        expect(buttonElement).toBeInTheDocument();
    });

    test("renders component with default image height", () => {
        render(<RdsCompBackgroundImage {...props} imageHeight="" />);
    
        const imageElement = screen.getByRole("img");
        expect(imageElement).toHaveStyle("height: 690px;");
    });

    test("renders component without button", () => {
        render(<RdsCompBackgroundImage {...props} btnLabel="" />);
    
        const buttonElement = screen.queryByText(props.btnLabel);
        expect(buttonElement).not.toBeInTheDocument();
    });
});
