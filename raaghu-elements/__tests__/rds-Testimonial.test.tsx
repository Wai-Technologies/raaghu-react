import React from "react";
//import { RdsTestimonial } from '../src';
import { RdsTestimmonialProps } from "../src/rds-testimonial/rds-testimonial";
import { getAllByTestId, render, screen } from "@testing-library/react";
import RdsTestimonial from "../src/rds-testimonial/rds-testimonial";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
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
        const { getAllByAltText } = render(
            <RdsTestimonial testimonialItems={testimonialItems} />
        );
        expect(getAllByAltText("...")).toHaveLength(testimonialItems.length);
    });
});

interface TestimonialProps {
  testimonials: Array<{
    id: number;
    content: string;
    author: {
      name: string;
      title: string;
    };
  }>;
}

function TestimonialsList({ testimonials }: TestimonialProps) {
    return (
        <>
            {testimonials.map((testimonial) => (
                <div key={testimonial.id} data-testid="testimonial">
                    <div data-testid="content">{testimonial.content}</div>
                    <div data-testid="author-name">{testimonial.author.name}</div>
                    <div data-testid="author-title">{testimonial.author.title}</div>
                </div>
            ))}
        </>
    );
}

test("renders testimonial with all its content", () => {
    const testimonials = [
        {
            id: 1,
            content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae posuere sapien. Curabitur pharetra leo magna, eu congue felis luctus sed.",
            author: {
                name: "John Doe",
                title: "Product Manager",
            },
        },
    ];

    render(<TestimonialsList testimonials={testimonials} />);

    const renderedTestimonials = screen.getAllByTestId("testimonial");
    expect(renderedTestimonials).toHaveLength(testimonials.length);
});
