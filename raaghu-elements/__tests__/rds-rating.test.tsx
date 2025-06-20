import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsRating, { RatingType, RatingStyle } from "../src/rds-rating/rds-rating";

// Mock the RdsIcon component
jest.mock("../src/rds-icon", () => ({
  __esModule: true,
  default: jest.fn(({ name, colorVariant, classes, onClick }) => (
    <span 
      data-testid={`icon-${name}`} 
      data-icon-type={name}
      className={classes} 
      onClick={onClick}
    >
      {name}
    </span>
  ))
}));

jest.mock("lottie-web");
jest.mock("react-lottie-player", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe("RdsRating", () => {
  test("renders star rating correctly with default props", () => {
    render(
      <RdsRating 
        rating={3.5} 
        type={RatingType.Star} 
        style={RatingStyle.Filled} 
      />
    );
    
    // Count full stars (star icons)
    const fullStars = screen.getAllByTestId("icon-star");
    expect(fullStars.length).toBe(3); // 3 full stars
    
    // Check for half star
    const halfStar = screen.getByTestId("icon-starhalf");
    expect(halfStar).toBeInTheDocument();
    
    // Check for empty stars
    const emptyStars = screen.getAllByTestId("icon-starempty");
    expect(emptyStars.length).toBe(1); // Only 1 empty star (for rating 3.5 out of 5)
  });

  test("renders star rating with outline style", () => {
    render(
      <RdsRating 
        rating={4} 
        type={RatingType.Star} 
        style={RatingStyle.Outline} 
      />
    );
    
    // Count full stars
    const fullStars = screen.getAllByTestId("icon-star");
    expect(fullStars.length).toBe(4); // 4 full stars
    
    // Check for empty outline star (only 1 for a rating of 4 out of 5)
    const emptyOutlineStars = screen.getAllByTestId("icon-starempty_outline");
    expect(emptyOutlineStars.length).toBe(1);
  });

  test("renders slider rating correctly", () => {
    const { container } = render(
      <RdsRating 
        rating="mid" 
        type={RatingType.Slider} 
      />
    );
    
    // Check if slider is rendered
    const slider = container.querySelector('input[type="range"]');
    expect(slider).toBeInTheDocument();
    
    // Check if labels are rendered
    const labels = container.querySelectorAll('.labels span');
    expect(labels.length).toBe(3);
    expect(labels[0].textContent).toBe('No');
    expect(labels[1].textContent).toBe('Maybe');
    expect(labels[2].textContent).toBe('Yes');
    
    // Check if 'Maybe' is active (since rating is 'mid')
    expect(labels[1]).toHaveClass('active');
  });  test("clicking on a star updates the rating", () => {
    // Render the rating component with initial rating of 3
    render(
      <RdsRating 
        rating={3} 
        type={RatingType.Star} 
        style={RatingStyle.Filled}
      />
    );
    
    // Check initial state - 3 full stars and 2 empty stars
    expect(screen.getAllByTestId("icon-star").length).toBe(3);
    expect(screen.getAllByTestId("icon-starempty").length).toBe(2);
    
    // Get the 5th star (empty) and click on it
    const emptyStars = screen.getAllByTestId("icon-starempty");
    fireEvent.click(emptyStars[1]); // Click the last empty star (5th star)
    
    // The component should re-render with 5 full stars and 0 empty stars
    expect(screen.getAllByTestId("icon-star").length).toBe(5);
    expect(screen.queryAllByTestId("icon-starempty").length).toBe(0);
  });

  test("changing slider value works correctly", () => {
    const { container } = render(
      <RdsRating 
        rating="left" 
        type={RatingType.Slider}
      />
    );
    
    // Get the slider
    const slider = container.querySelector('input[type="range"]') as HTMLInputElement;
    expect(slider).toBeInTheDocument();
    expect(slider.value).toBe('0'); // 'left' corresponds to value 0
    
    // Change slider value to 2 ('right')
    fireEvent.change(slider, { target: { value: '2' } });
    
    // Check that value is updated
    expect(slider.value).toBe('2');
    
    // Check that 'Yes' label is now active
    const labels = container.querySelectorAll('.labels span');
    expect(labels[2]).toHaveClass('active');
  });
});
