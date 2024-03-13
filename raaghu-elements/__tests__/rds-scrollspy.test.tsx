// import React from "react";
// import { render, fireEvent } from "@testing-library/react";
// import { RdsScrollspy } from "../src";
// import "@testing-library/jest-dom";
// jest.mock('lottie-web')
// jest.mock('react-lottie-player', () => ({
//     __esModule: true,
//     default: jest.fn(),
//   }));

   
// // Mock the useTranslation hook
// jest.mock("react-i18next", () => ({
//     useTranslation: () => ({ t: (key: string) => key }),
//   }));

// describe("RdsScrollspy", () => {
//     test("renders six navigation links", () => {
//         const { getAllByRole } = render(<RdsScrollspy />);
//         const navLinks = getAllByRole("link");
//         expect(navLinks.length).toBe(6);
//     });
//     test("clicking a navigation link scrolls to the appropriate section", () => {
//         const { getAllByText, getByText } = render(<RdsScrollspy />);
//         const firstSectionLink = getByText("First");
//         fireEvent.click(firstSectionLink);
//         const secondSection = getAllByText((content, element) => {
//             return content.startsWith("First header");
//         });
//         expect(secondSection[0]).toBeInTheDocument();
//     });


// });
