import React from "react";
import { RdsTestimmonialProps } from "../src/rds-testimonial/rds-testimonial";
import { render, screen } from "@testing-library/react";
import RdsTestimonial from "../src/rds-testimonial/rds-testimonial";
import '@testing-library/jest-dom';

// Mock react-lottie-player
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
}));

// Mock the RdsCompIcon component to prevent fetch issues
jest.mock("../src/rds-icon/rds-icon", () => ({
    __esModule: true,
    default: jest.fn(({ name, fill, stroke, height, width }) => (
        <img 
            src="test-icon.svg" 
            alt={name} 
            role="img" 
            data-testid={`icon-${name}`}
            style={{ fill, stroke, height, width }}
        />
    ))
}));

describe("RdsTestimonial", () => {
    const testimonialItems: RdsTestimmonialProps["testimonialItems"] = [
        {
            icon: "check",
            iconFill: "#fff",
            iconStroke: "#000",
            iconHeight: 16,
            iconWidth: 16,
            description: "Testimonial description 1",
            img: "/test-img.png",
            title: "Testimonial title 1",
            subtitle: "Testimonial subtitle 1",
        },
        {
            icon: "circle",
            iconFill: "#000",
            iconStroke: "#fff",
            iconHeight: 20,
            iconWidth: 20,
            description: "Testimonial description 2",
            img: "/test-img-2.png",
            title: "Testimonial title 2",
            subtitle: "Testimonial subtitle 2",
        },
    ];

    it("renders testimonial images", () => {
        render(<RdsTestimonial testimonialItems={testimonialItems} />);
        
        // Get all testimonial images (they should have alt="...")
        const testimonialImages = screen.getAllByRole('img')
            .filter(img => img.getAttribute('alt') === '...');
        
        // Should have one image per testimonial item
        expect(testimonialImages).toHaveLength(testimonialItems.length);
        
        // Check image sources
        expect(testimonialImages[0]).toHaveAttribute('src', '/test-img.png');
        expect(testimonialImages[1]).toHaveAttribute('src', '/test-img-2.png');
    });
    
    it("renders testimonial titles correctly", () => {
        render(<RdsTestimonial testimonialItems={testimonialItems} />);
        
        // Check if titles are rendered
        expect(screen.getByText("Testimonial title 1")).toBeInTheDocument();
        expect(screen.getByText("Testimonial title 2")).toBeInTheDocument();
    });
    
    it("renders testimonial subtitles correctly", () => {
        render(<RdsTestimonial testimonialItems={testimonialItems} />);
        
        // Check if subtitles are rendered
        expect(screen.getByText("Testimonial subtitle 1")).toBeInTheDocument();
        expect(screen.getByText("Testimonial subtitle 2")).toBeInTheDocument();
    });
    
    it("renders testimonial descriptions correctly", () => {
        render(<RdsTestimonial testimonialItems={testimonialItems} />);
        
        // Check if descriptions are rendered
        expect(screen.getByText("Testimonial description 1")).toBeInTheDocument();
        expect(screen.getByText("Testimonial description 2")).toBeInTheDocument();
    });
    
    it("renders icons with correct attributes", () => {
        render(<RdsTestimonial testimonialItems={testimonialItems} />);
        
        // Check if icons are rendered with correct names
        const checkIcon = screen.getByTestId("icon-check");
        const circleIcon = screen.getByTestId("icon-circle");
        
        expect(checkIcon).toBeInTheDocument();
        expect(circleIcon).toBeInTheDocument();
    });
});
