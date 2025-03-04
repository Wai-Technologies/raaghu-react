import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCarousel, { RdsCarouselProps } from "../src/rds-carousel/rds-carousel";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

const mockProps: RdsCarouselProps = {
    Indicators: true,
    carouselItems: [
        {
            id: 1,
            imgUrl: "https://example.com/image1.jpg",
            name: "Name 1",
            // roleName: "Role 1",
            subTitle: "Subtitle 1",
        },
        {
            id: 2,
            imgUrl: "https://example.com/image2.jpg",
            name: "Name 2",
            // roleName: "Role 2",
            subTitle: "Subtitle 2",
        },
        {
            id: 3,
            imgUrl: "https://example.com/image3.jpg",
            name: "Name 3",
            // roleName: "Role 3",
            subTitle: "Subtitle 3",
        },
    ],
    type: "Circle",
};

describe("RdsCarousel", () => {
    it("should render carousel items", () => {
        render(<RdsCarousel {...mockProps} />);
        const carouselItems = screen.getAllByRole("img");
        expect(carouselItems).toHaveLength(3);
    });

    it("should render carousel controls", () => {
        render(<RdsCarousel {...mockProps} controls={true} />);
        const prevButton = screen.getByText("Previous");
        const nextButton = screen.getByText("Next");
        expect(prevButton).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();
    });

    it("should render carousel indicators", () => {
        render(<RdsCarousel {...mockProps} Indicators={true} />);
        const indicators = screen.getAllByRole("button", { name: /slide/i });
        expect(indicators).toHaveLength(3);
    });
});
