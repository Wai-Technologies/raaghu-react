import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCarousel, { RdsCarouselProps } from "../src/rds-carousel/rds-carousel";

// Set up fetch mock before any imports
if (typeof global.fetch !== 'function') {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      text: () => Promise.resolve("<svg>Mock SVG</svg>"),
    })
  ) as jest.Mock;
}

// Mock RdsIcon component to avoid fetch issues
jest.mock("../src/rds-icon/rds-icon", () => {
  return {
    __esModule: true,
    default: (props: any) => (
      <div 
        data-testid={`mocked-icon-${props.name || 'default'}`} 
        role="img" 
        aria-label={`icon-${props.name || 'default'}`}
        className={props.classes}
      >
        {props.name}
      </div>
    ),
  };
});

jest.mock('react-lottie-player', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock window.URL.createObjectURL if needed
if (typeof window.URL.createObjectURL !== 'function') {
  Object.defineProperty(window.URL, 'createObjectURL', { value: jest.fn() });
}

const mockProps: RdsCarouselProps = {
  Indicators: true,
  carouselItems: [
    {
      id: 1,
      imgUrl: "https://example.com/image1.jpg",
      name: "Name 1",
      subTitle: "Subtitle 1",
    },
    {
      id: 2,
      imgUrl: "https://example.com/image2.jpg",
      name: "Name 2",
      subTitle: "Subtitle 2",
    },
    {
      id: 3,
      imgUrl: "https://example.com/image3.jpg",
      name: "Name 3",
      subTitle: "Subtitle 3",
    },
  ],
  type: "Circle",
};

describe("RdsCarousel", () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    if (global.fetch) {
      (global.fetch as jest.Mock).mockClear();
    }
  });

  it("should render carousel items", () => {
    render(<RdsCarousel {...mockProps} />);
    const carouselItems = screen.getAllByRole("img");
    expect(carouselItems.length).toBeGreaterThan(0);
  });

  it("should render carousel controls", () => {
    const { container } = render(<RdsCarousel {...mockProps} controls={true} />);
    // Use more reliable selectors instead of text content
    const prevButton = container.querySelector('.carousel-control-prev');
    const nextButton = container.querySelector('.carousel-control-next');
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("should render carousel indicators", () => {
    const { container } = render(<RdsCarousel {...mockProps} Indicators={true} />);
    const indicators = container.querySelectorAll('.carousel-indicators button');
    expect(indicators.length).toBe(mockProps.carouselItems.length);
  });

  it("should render correct number of slides", () => {
    const { container } = render(<RdsCarousel {...mockProps} />);
    const slides = container.querySelectorAll('.carousel-item');
    expect(slides.length).toBe(mockProps.carouselItems.length);
  });

  it("should mark first slide as active", () => {
    const { container } = render(<RdsCarousel {...mockProps} />);
    const activeSlide = container.querySelector('.carousel-item.active');
    expect(activeSlide).toBeInTheDocument();
  });
});
