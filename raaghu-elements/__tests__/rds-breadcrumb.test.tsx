// import React from "react";
// import { render, fireEvent, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import RdsBreadcrumb, { BreadcrumbProps } from "../src/rds-breadcrumb/rds-breadcrumb";

// jest.mock('react-lottie-player', () => ({
//     __esModule: true,
//     default: jest.fn(),
//   }));

// const defaultProps: BreadcrumbProps = {
//     breadItems: [
//         {
//             id: 1,
//             label: "Home",
//             route: "/home",
//             active: true,
//             disabled: false,
//         },
//         {
//             id: 2,
//             label: "Page 1",
//             route: "/page1",
//             active: false,
//             disabled: false,
//         },
//         {
//             id: 3,
//             label: "Page 2",
//             route: "/page2",
//             active: false,
//             disabled: false,
//         },
//     ],
// };

// describe("RdsBreadcrumb", () => {
//     it("renders correctly with default props", () => {
//         const { container } = render(<RdsBreadcrumb {...defaultProps} />);
//         expect(container).toMatchSnapshot();
//     });

//     //   it("should toggle active state when clicked", () => {
//     //     render(<RdsBreadcrumb {...defaultProps} />);
//     //     const page1 = screen.getByText("Page1");
//     //     const page2 = screen.getByText("Page2");

//     //     fireEvent.click(page1);
//     //     expect(page1).toHaveClass("active");
//     //     expect(page2).not.toHaveClass("active");

// //     fireEvent.click(page2);
// //     expect(page2).toHaveClass("active");
// //     expect(page1).not.toHaveClass("active");
// //   });
// });
