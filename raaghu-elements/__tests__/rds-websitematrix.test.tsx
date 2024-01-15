import React from "react";
import { render, screen } from "@testing-library/react";
import { RdsWebsiteMatrix } from "../src";

jest.mock('lottie-web')

// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

  afterEach(() => {
    jest.clearAllMocks();
})

const item = {
    title: "John Doe",
    subtitle: "This is a subtitle",
    icon: "right",
    iconHeight: 18,
    iconWidth: 18,
    link: "https://example.com/link",
};

describe("RdsWebsiteMatrix", () => {
    it("should render the component with the correct props", () => {
        const { getByText } = render(<RdsWebsiteMatrix item={item} />);
        expect(getByText("John Doe")).toBeTruthy();
        expect(getByText("This is a subtitle")).toBeTruthy();
        expect(getByText("https://example.com/link")).toBeTruthy();
    });

    it("should render the component with the correct icon", () => {
        const { getByTestId } = render(<RdsWebsiteMatrix item={item} />);
        expect(getByTestId("icon")).toBeTruthy();
    });
});
