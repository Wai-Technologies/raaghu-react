import React from "react";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import RdsRating from "../src/rds-rating/rds-rating";

jest.mock("lottie-web");
jest.mock("react-lottie-player", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe("RdsRating", () => {
  test("renders correctly with default props", async () => {
    const { container } = render(<RdsRating rating={2.3} />);
    await waitFor(() => {
      expect(container.querySelector(".starrating")).toBeInTheDocument();
    });
  });
  test("renders with provided rating and size props", async () => {
    const { container } = render(<RdsRating rating={4} size="large" />);
    await waitFor(() => {
      const stars = container.querySelector(".starrating") as HTMLElement;
      const styles = window.getComputedStyle(stars);
      console.log("Applied styles:", styles);
      // You can also log individual style properties to inspect them
      console.log("--rating:", styles.getPropertyValue("--rating"));
      console.log("--size:", styles.getPropertyValue("--size"));

      // Uncomment the following lines if you want to assert individual style properties
      // expect(styles.getPropertyValue("--rating")).toBe("4");
      // expect(styles.getPropertyValue("--size")).toBe("large");
    });
  });
});
