import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { RdsPagination } from "../src";
import '@testing-library/jest-dom';


jest.mock('lottie-web')
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

   
// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));

describe("RdsPagination", () => {
    it("renders correctly with default props", () => {
        const { container } = render(<RdsPagination totalRecords={100} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test("renders the correct number of pages based on total records and records per page", () => {
        const { getByTestId, getByText } = render(
            <RdsPagination totalRecords={50} recordsPerPage={10} />
        );
        expect(getByTestId("page-link")).toHaveTextContent("12345");
        fireEvent.click(getByText("2"));
        expect(getByTestId("page-link")).toHaveTextContent("12345");
    });

});